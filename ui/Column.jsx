import React from 'react';

export default class Column extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <div
                style={{
                    flexDirection: 'column',
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                }}
            >
                { children }
            </div>
        );
    }
}