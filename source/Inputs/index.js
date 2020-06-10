import React, { PureComponent } from 'react';
import './switch.scss'

class Input extends PureComponent{
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
            isChecked: false
        };
    }

    componentDidMount() {
        const { type, value } = this.props;
        if (typeof value != 'undefined') {
            if (typeof value == 'boolean') this.setState({ isChecked: value })
            else this.setState({ value })
        }
        
    }

    onChange = (event) => {
        const { type } = this.props;
        const isBoolean = type == 'Boolean';
        const isNumber = type == 'Number';

        let value = event.target.value;
        if (isBoolean) {
            value = !this.state.isChecked;
            this.setState({ isChecked: value  })

        } else {
            if (isNumber && !Number(value)) return;
            this.setState({ value })
        }
        if (this.props.onChange) this.props.onChange(event, value)
    }

    renderInput = type => {
        switch (type) {
            case 'Select':
                return (
                    <select style={ styles.input } name={ this.props.name  } onChange={ this.onChange } value={ this.state.value }>
                        {
                            this.props.options.map((opt, idx) => <option key={ idx } value={ opt } >{ opt.toUpperCase()  }</option>)
                        }
                    </select>
                );
            
            case 'Boolean':
                return (
                    <label className={'switch'} style={ styles.input }> 
                        <input checked={ this.state.sisChecked } type={ 'checkbox' } onChange={ this.onChange } />
                        <span className={ 'slider' }></span>
                    </label>
                ) 
            case 'String':
                return (
                    <input
                        type={'text'}
                        name={ this.props.name }
                        style={ styles.input }
                        onChange={ this.onChange }
                        value={this.state.value} />
                )
            case 'Number':
                return (
                    <input
                        type={'number'}
                        name={ this.props.name }
                        style={ styles.input }
                        onChange={ this.onChange }
                        value={this.state.value} />
                )
            default:
                return null;
        }

    }

    render() {
        let { type, style, name, label, description } = this.props;
        return (
            <div style={ styles.root }>
                <label htmlFor={ name } style={{ marginBottom: 10 }}>{ label }</label>
                {
                    this.renderInput(type)
                }
                <p style={ styles.descrpition } >
                    {description}
                </p>
            </div>
        );
    }
}

Input.defaultProps = {
    type: 'text',
    value: undefined,
    onChange: e => { console.log('e.target ->', e.target) },
    label: 'Input Label',
    description: 'Input description'
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        width: 'max-content',
        height: 'auto',
    },
    input: {
        boxShadow: '0px 3px 6px -5px rgba(0,0,0,0.25)'
    },
    descrpition: {
        margin: '10px 0 0 0',
        color: '#017C8E'
    }
}

export default Input