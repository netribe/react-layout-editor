import React, { PureComponent } from 'react';

class StringInput extends PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            value: undefined,
        };
    }

    componentDidMount() {
        const { value } = this.props;
        if (typeof value != 'undefined') {
            this.setState({ value })
        }
    }

    onChange = (event) => {
        const { onChange } = this.props;

        let { value } = event.target;

        this.setState({ value })

        if (onChange) onChange(value)
    }


    render() {
        let { style, name, label, description } = this.props;
        let title = description ? description : null;
        
        return (
            <div style={styles.root}>
                <label htmlFor={name} style={{ marginBottom: 10 }}>{label}</label>
                <input
                    title={ title }
                    type={'text'}
                    name={ name }
                    style={styles.input}
                    onChange={this.onChange}
                    value={this.state.value} />
            </div>
        );
    }
}

StringInput.defaultProps = {
    value: undefined,
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
        borderRadius: 2,
        border: '1px solid #dedede',
        outline: 0,
        padding: 10,
        boxShadow: '0px 0px 10px -5px rgba(0,0,0,0.25)'
    }
}

export default StringInput