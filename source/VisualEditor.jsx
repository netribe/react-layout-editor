import React from 'react';
import Widget from './Widget.jsx';
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
        top.editor = this;
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
    applyListeners = (keyA, keyB) => {
        let a = this.listeners[keyA];
        let b = this.listeners[keyB];
        a && a();
        b && b();
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
    
    onHover = (key) => {
        if(Array.isArray(key)){ key = key.join('/')};
        this.draggedOver = null;
        let oldKey = this.hovered;
        if(oldKey === key){ return; }
        this.hovered = key;
        this.applyListeners(oldKey, key);
        this.releasePlaceholder();
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
            console.log(1)
            this.isDropped = false;
            return;
        }
        console.log(2)
        if(Array.isArray(key)){ key = key.join('/')};
        let oldKey = this.draggedOver;
        if(!oldKey){
            this.getPlaceholderBoxes();
        }
        this.draggedOver = key;
        this.applyListeners(oldKey, key);
        if(key && e){
            let nearestPlaceholder = this.getNearestPlaceholder(e);
            let oldPlaceholder = this.activePlaceholder;
            if(this.activePlaceholder !== nearestPlaceholder){
                this.activePlaceholder = nearestPlaceholder;
                this.applyListeners(oldPlaceholder, this.activePlaceholder);
            }
        }
        else{
            this.releasePlaceholder();
        }
        
    };
    
    onDragLeave = (e) => {
        if(!this.el.contains(e.relatedTarget)){
            this.onDragOver(null);
        }
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
        let children = utils.get(this.props.value, query);
        if(children){
            let newChildren = [];
            if(!newChild.id){
                newChild = { ...newChild, id: utils.uuid() }
            }
            children.map((child, i) => {
                if(i === index){
                    newChildren.push(newChild);
                }
                newChildren.push(child);
            });
            if(index > newChildren.length - 1){
                newChildren.push(newChild);
            }
            let newValue = utils.set(this.props.value, query, newChildren);
            console.log(newChildren, newValue, index)
            this.props.onChange(newValue);
        }
        console.log(children)
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
    }

    render(){
        let { value, onChange, components, editors, style } = this.props;
        return (
            <div 
                ref={ el => this.el = el } 
                style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', ...style }}
                onDrop={ this.onDrop }
            >
                <Widget 
                    value={ value } 
                    onChange={ onChange } 
                    components={ components } 
                    editors={ editors }
                    editor={this}
                />
            </div>
        );
    }
}