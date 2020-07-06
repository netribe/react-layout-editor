import React from 'react';

export default class Scroll extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <div style={{ flex: 1, overflow: 'auto', display: 'flex', flexDirection: 'column' }}>
                {children}
            </div>
        );
    }
}