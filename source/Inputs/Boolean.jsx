import React, { PureComponent } from 'react';

class BooleanInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: false,
        };
    }

    componentDidMount() {
        const { value } = this.props;
        if (typeof value != 'undefined') {
            this.setState({ isChecked: value })
        }
    }

    onChange = (event) => {
        const { onChange } = this.props;

        let { value } = event.target;
        value = !this.state.isChecked;
        this.setState({ isChecked: value })

        if (onChange) onChange(value)
    }


    render() {
        let { style, name, label, description } = this.props;
        let title = description ? description : null;
        
        return (
            <div style={styles.root}>
                <label htmlFor={name} style={{ marginBottom: 10 }}>{label}</label>
                <label className={'switch'} style={{ ...styles.input, padding: '0 10px', width: 30 }} title={ description }>
                    <input checked={this.state.isChecked} type={'checkbox'} onChange={this.onChange} />
                    <span className={'slider'}></span>
                </label>
            </div>
        );
    }
}

BooleanInput.defaultProps = {
    value: false,
    onChange: e => { console.log('e.target ->', e.target) },
    label: 'Input Label',
    description: undefined
}

const styles = {
    root: {
        display: 'flex',
        flexDirection: 'column',
        height: 'auto',
        width: '100%'
    },
    input: {
        border: 0,
        outline: 0,
        padding: 10,
        boxShadow: '0px 0px 10px -5px rgba(0,0,0,0.25)'
    }
}

export default BooleanInput