import React from 'react';

export default class Text extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount(){
        console.log(8)
        this.value = this.props.value;
        this.el.innerHTML = this.value;
    }
    
    componentDidUpdate(){
        if(this.props.value !== this.value){
            console.log(2)
            this.el.innerHTML = this.props.value;
        }
    }

    onInput = (e) => {
        let { _onChange, _value } = this.props;
        this.value = this.el.innerHTML;
        _onChange({
            ..._value,
            props: {
                ..._value.props,
                value: this.value
            }
        });
    };

    render() {
        const { children, value, _onChange, _value, ...props } = this.props;

        return (
            <span 
                ref={el => this.el = el } 
                contentEditable="true" 
                onInput={ this.onInput }
                {...props}>
            </span>
        )
    }
}