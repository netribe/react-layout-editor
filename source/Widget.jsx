import React from 'react';
import ReactDom from 'react-dom';
import utils from './utils';

class Placeholder extends React.Component{
    constructor(props){
        super(props);
        this.id = props.id;
    }
    componentDidMount(){
        let {editor, id} = this.props;
        editor.placeholders[id] = this;
        editor.bind(this.id, this.update);
    }
    componentWillUnmount(){
        let {editor, id} = this.props;
        editor.placeholders[id] = null;
    }
    update = () => {
        this.forceUpdate();
    };
    getBox = () => {
        this.box = this.refs.el.getBoundingClientRect();
        return this.box;
    };
    render(){
        let { style, direction = "vertical", children, editor, id, ...props } = this.props;
        let isOpen = editor.activePlaceholder === id;
        let s = {
            background: 'red',
            transition: '0.4s ease',
            ...style
        }
        if(direction === 'vertical'){
            s.height = isOpen ? 20 : 0;
        }
        else{
            s.width = isOpen ? 20 : 0;
        }
        return (
            <div style={s} { ...props } ref="el">{children}</div>
        );
    }
}

export default class Widget extends React.PureComponent{
    constructor(props){
        super(props);
        this.path = (props.path || []).concat(props.value.id);
        this.key = this.path.join('/');
        this.children = [];
        this.state = {
            error: null
        };
    }
    componentDidMount(){
        let {editor} = this.props;
        this.el = this.el || ReactDom.findDOMNode(this);
        editor.bind(this.key, this.update);
        this.box = this.el.getBoundingClientRect();
    }
    componentWillUnmount(){
        let {editor} = this.props;
        editor.unbind(this.key);
    }
    componentDidCatch(error){
        console.error(error);
        this.setState({ error });
    }
    update = () => {
        this.forceUpdate();
    };
    onMouseEnter = (e) => {
        let { editor } = this.props;
        editor.onHover(this.key);
    };
    onMouseLeave = (e) => {
        let { editor, parent } = this.props;
        if(parent){
            parent.onMouseEnter(e);
        }
        else{
            editor.onHover(null);
        }
    };
    
    onDragOver = (e) => {
        let { editor } = this.props;
        e.preventDefault();
        e.stopPropagation();
        return editor.onDragOver(this.key, {x: e.clientX, y: e.clientY});
    };
    onDragLeave = (e) => {
        e.stopPropagation();
    };
    onClick = (e) => {
        let { editor, value } = this.props;
        e.stopPropagation();
        editor.onSelect(this.key, value);
    };
    render(){
        let { style, value, components, editor, parent, path, index, ...props } = this.props;
        let Component = components[value.type];
        let key = this.key;

        if(this.state.error){
            return (
            <div style={{ color: 'red'}}>
                <div>{this.state.error.toString()}</div>
                <div>{this.state.error.stack.toString()}</div>
            </div>
            );
        }
        if(value.type && !Component){
            return (
                <div>Component "{value.type}" is missing</div>
            );
        }
        
        let isHovered = editor.hovered === key;
        let isSelected = editor.selected === key;
        let isDraggedOver = editor.draggedOver === key;
        let children = [];
        let lastIndex = (value.children || []).length + 1;
        (value.children || []).map((child, i) => {
            children.push(
                <Placeholder 
                    editor={ editor }
                    id={ `${this.key}:${i}` }
                    key={`placeholder-${i}`}/>)
            children.push(
                <Widget
                    ref={ `child-${i}` }
                    key={ child.id }
                    index={i}
                    value={ child } 
                    components={ components } 
                    editor={ editor }
                    path={ this.path }
                    parent={this}
                />
            );
        });
        children.push(
            <Placeholder 
                editor={ editor }
                id={ `${this.key}:${lastIndex}` }
                key={`placeholder-${lastIndex}`}/>)
        return (
            <div
                ref={ el => this.el = el }
                onMouseEnter={this.onMouseEnter}
                onMouseLeave={this.onMouseLeave}
                onDragOver={this.onDragOver}
                onDragLeave={this.onDragLeave}
                onClick={this.onClick}
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    ...value.layout
                }} 
                { ...props }
            >
                {
                    Component ? (
                        <Component { ...value.props }>
                            {children}
                        </Component>
                    ) : children
                }
                
                <div 
                    style={{ 
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        border: isDraggedOver ? '2px solid #a22' : isSelected ? '2px solid #2a2' : isHovered ? '2px solid #22a' : 0,
                        pointerEvents: 'none'}}>
                            <div style={{ position: 'absolute', bottom: 0}}>
                                {this.placeholderIndex}
                            </div>
                        </div>
            </div>
        );
    }
}