import React from 'react';
import Layout from './Layout.jsx';
import utils from './utils';

export default class VisualEditor extends React.PureComponent{
    constructor(props){
        super(props);
        this.listeners = {};
        this.placeholders = {};
        this.hovered = null;
        this.selected = null;
        this.draggedOver = null;
        this.activePlaceholder = null;
        this.onDragOver = utils.throttle(this.onDragOver, 100);
    }
    componentDidMount(){
        this.el.addEventListener('dragleave', this.onDragLeave, false);
    }
    componentWillUnmount(){
        this.el.removeEventListener('dragleave', this.onDragLeave, false);
    }
    bind = (key, cb) => {
        this.listeners[key] = cb;
    };
    unbind = (key) => {
        delete this.listeners[key];
    };
    applyListeners = (...args) => {
        let listener;
        for(let i = 0; i < args.length; i++){
            listener = this.listeners[args[i]];
            listener && listener();
        }
    };
    getPlaceholderBoxes = () => {
        for(let m in this.placeholders){
            this.placeholders[m].getBox();
        }
    };
    getDistance = (pointA, pointB) => {
        let a = pointA.x - pointB.x;
        let b = pointA.y - pointB.y;
        return Math.sqrt( a*a + b*b );
    };
    getNearestPlaceholder = (mousePoint) => {
        let placeholder,
            point,
            distance,
            nearestPlaceholder,
            shortestDistance = Infinity;
        for(let id in this.placeholders){
            placeholder = this.placeholders[id];
            let {x, y, width, height} = placeholder.box || placeholder.getBox();
            if(!height){
                if(mousePoint.x >= x){
                    if(mousePoint.x <= x + width){
                        point = {x: mousePoint.x, y };
                    }
                    else{
                        point = {x: x + width, y };
                    }
                }
                else{
                    point = {x, y };
                }
            }
            else{
                if(mousePoint.y >= y){
                    if(mousePoint.y <= y + height){
                        point = {x, y: mousePoint.y };
                    }
                    else{
                        point = {x, y: y + height };
                    }
                }
                else{
                    point = {x, y };
                }
            }
            // else{
            //     throw new Error(`placeholder has volume`)
            // }
            distance = this.getDistance(mousePoint, point);
            if(distance < shortestDistance){
                shortestDistance = distance;
                nearestPlaceholder = placeholder;
            }
        }
        return nearestPlaceholder.id;
    };
    releasePlaceholder = () => {
        let oldPlaceholder = this.activePlaceholder;
        this.activePlaceholder = null;
        if(oldPlaceholder){
            this.applyListeners(oldPlaceholder);
        }
    };

    isDraggedOver = () => {
        return this.lastDragOver && (this.lastDragOver > Date.now() - 300);
    };
    
    onHover = (key) => {
        if(Array.isArray(key)){ key = key.join('/')};
        // this.draggedOver = null;
        let oldKey = this.hovered;
        if(oldKey === key){ return; }
        this.hovered = key;
        let ids = [];
        let oldIds = [];
        key && key.split('/').map((id, i) => {
            ids.push(id);
            this.applyListeners(ids.join('/'));
        });
        oldKey && oldKey.split('/').map((id, i) => {
            oldIds.push(id);
            if(ids[i] !== id){
                this.applyListeners(oldIds.join('/'));
            }
        });
        if(!this.isDraggedOver()){
            this.releasePlaceholder();
        }
    };
    onSelect = (key, value) => {
        if(Array.isArray(key)){ key = key.join('/')};
        let oldKey = this.selected;
        if(oldKey === key){ return; }
        this.selected = key;
        this.applyListeners(oldKey, key);
        let onSelect = this.props.onSelect;
        onSelect && onSelect(key, value);
    };
    onDragOver = (key, e) => {
        if(this.isDropped){
            this.isDropped = false;
            return;
        }
        if(Array.isArray(key)){ key = key.join('/')};
        let oldKey = this.draggedOver;
        if(!this.activePlaceholder){
            this.getPlaceholderBoxes();
        }
        
        if(key && e){
            let nearestPlaceholder = this.getNearestPlaceholder(e);
            let oldPlaceholder = this.activePlaceholder;
            if(this.activePlaceholder !== nearestPlaceholder){
                this.activePlaceholder = nearestPlaceholder;
                this.draggedOver = this.activePlaceholder.split(':')[0];
                this.applyListeners(oldPlaceholder, this.activePlaceholder);
            }
        }
        else{
            this.draggedOver = null;
            this.releasePlaceholder();
        }
        this.applyListeners(oldKey, key);
        this.lastDragOver = Date.now();
    };
    
    onDragLeave = (e) => {
        if(!this.el.contains(e.relatedTarget)){
            this.onDragOver(null);
        }
    };

    onChange = (key, value) => {
        if(typeof key === 'string'){
            key = key.split('/');
        }
        let query = [];
        key.map((id, i) => {
            if(i > 0){
                query.push({ id });
            }
            query.push('children');
        });
        query.pop();
        let newValue = utils.set(this.props.value, query, value);
        this.props.onChange(newValue);
    };
    
    setChildId = (child, overrideExistingId) => {
        if(!child){ return child; }
        let newChild = { ...child, id: child.id && !overrideExistingId ? child.id : utils.uuid() }
        if(child.children){
            newChild.children = child.children.map(c => this.setChildId(c, overrideExistingId));
        }
        return newChild;
    };

    addChild = (key, index, newChild) => {
        if(typeof key === 'string'){
            key = key.split('/');
        }
        index = Number(index);
        let query = [];
        key.map((id, i) => {
            if(i > 0){
                query.push({ id });
            }
            query.push('children');
        });
        let children = utils.get(this.props.value, query) || [];
        let newChildren = [];
        let pushed = false;
        newChild = this.setChildId(newChild);
        children.map((child, i) => {
            if(i === index){
                newChildren.push(newChild);
                pushed = true;
            }
            if(child || (child === null)){
                newChildren.push(child);
            }
        });
        if(!pushed){
            newChildren.push(newChild);
        }
        let newValue = utils.set(this.props.value, query, newChildren);
        let newKey = `${key.join('/')}/${newChild.id}`;
        this.addedChild = newKey;
        this.props.onChange(newValue);
        this.onSelect(newKey, newChild);
        this.onHover(newKey, newChild);
    };

    deleteChild = (childKey) => {
        let { value, onChange } = this.props;
        let path = utils.getPath(childKey);
        let id = path.pop().id;
        let children = utils.get(value, path);
        children = children.filter(c => !c || c.id !== id)
        let newValue = utils.set(value, path, children);
        this.removed = childKey;
        this.applyListeners(childKey);
        onChange && setTimeout(e => onChange(newValue), 440)
    };

    onDrop = (e) => {
        let { types, onDrop, type = 'react-drag' } = this.props;
        e.preventDefault();
        if(types){

        }
        else{
            let text = e.dataTransfer.getData(type);
            try{
                let data = JSON.parse(text);
                if(data){
                    if(this.activePlaceholder){
                        let [key, index] = this.activePlaceholder.split(':');
                        this.addChild(key, index, data);
                    }
                    onDrop && onDrop(data);
                }
            }
            catch(err){
                console.error(err);
            }
        }
        this.isDropped = true;
        this.releasePlaceholder();
        setTimeout(e => this.onDragOver(null), 100)
    }

    render(){
        top.editor = this;
        let { value, onChange, widgets, editors, style } = this.props;
        return (
            <div 
                ref={ el => this.el = el } 
                style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', overflow: 'auto', ...style }}
                onDrop={ this.onDrop }
            >
                <Layout 
                    value={ value } 
                    onChange={ onChange } 
                    widgets={ widgets } 
                    editors={ editors } 
                    editor={this}
                />
            </div>
        );
    }
}