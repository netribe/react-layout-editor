import React from 'react';

export default class Placeholder extends React.Component{
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
        editor.unbind(this.id);
        delete editor.placeholders[id];
    }
    update = () => {
        this.forceUpdate();
    };
    getBox = () => {
        this.box = this.el.getBoundingClientRect();
        return this.box;
    };
    render(){
        let { style, children, editor, id, isButton, ...props } = this.props;
        let isOpen = editor.activePlaceholder === id;
        let s = {
            // background: isOpen ? 'red' : '#d99',
            background: 'red',
            opacity: isOpen ? 1 : 0.25,
            transition: '0.4s ease',
            minWidth: isOpen ? 20 : (isButton ? 14 : 0),
            minHeight: isOpen ? 20 : (isButton ? 14 : 0),
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            margin: isButton ? 4 : 0,
            ...style
        }
        return (
            <div 
                style={s} {
                 ...props }
                 data-placeholder={id} 
                 ref={el => this.el = el}
            >
                {isButton ? (
                    <div style={{ lineHeight: '14px', position: 'relative', top: -1, color: '#fff' }}>
                        +
                    </div>
                ) : null}
            </div>
        );
    }
}