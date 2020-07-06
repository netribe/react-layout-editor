import React from 'react';

export default class Section extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { children, style } = this.props;

        return (
            <div style={{ display: 'flex', flexDirection: 'column', ...style }}>
                { children }
            </div>
        )
    }
}