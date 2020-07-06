import React from 'react';

export default class Title extends React.Component {
    render() {
        const { children, element = 'h1', ...props } = this.props;
        return (
            <div>
                { 
                    React.createElement(
                        element, 
                        props, 
                        ...React.Children.toArray(children)
                    ) 
                }
            </div>
        );
    }
}