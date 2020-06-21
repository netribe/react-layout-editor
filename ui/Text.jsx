import React from 'react';

export default class Title extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, value, ...props } = this.props;

        return (
            <span {...props}>
                {value}
                {children}
            </span>
        )
    }
}