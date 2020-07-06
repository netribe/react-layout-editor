import React from 'react';

export default class Row extends React.Component {
    render() {
        const { children } = this.props;

        return (
            <div
                style={{
                    flexDirection: 'row',
                    paddingTop: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    flexWrap: 'wrap',
                    display: 'flex'
                }}
            >
                { children }
            </div>
        );
    }
}