import React from 'react';
import utils from './utils';

class FlexLayoutItem extends React.Component{
    render(){
        let { style, children, ...props } = this.props;
        return (
            <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                ...style
            }} { ...props }>{ children }</div>
        );
    }
}

class Placeholder extends React.Component{
    render(){
        let { style, isOpen, direction = "vertical", children, ...props } = this.props;
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
            <div style={s} { ...props }>{children}</div>
        );
    }
}

export default class FlexLayout extends React.Component{
    state = {
        placeholderIndex: -1
    };
    onDragOver = utils.throttle((childKey, e, target) => {
        let { clientX, clientY } = e;
        let thisBox = this.el.getBoundingClientRect();
        this.setState({
            placeholderIndex: 0
        })
        this.lastEvent = e;
    }, 500);
    render(){
        let { style, ...props } = this.props;
        let { placeholderIndex } = this.state;
        let children = [];
        React.Children.map(props.children, (child, i) => {
            children.push(<Placeholder isOpen={i === placeholderIndex} key="placeholder"/>)
            children.push(child);
        });
        return (
            <div
                ref={ el => this.el = el } 
                style={{
                display: 'flex',
                flexDirection: 'column'
            }} { ...props }>{children}</div>
        );
    }
}