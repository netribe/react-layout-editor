import React from 'react';
import Drag from './Drag.jsx';

export default class AddWidgetPanel extends React.PureComponent{
    render(){
        let { widgets = [], style } = this.props;
        return (
            <div 
                style={{ 
                    height: '100%',
                    width: '100%',
                    position: 'relative',
                    overflow: 'auto',
                    ...style
                }}>
                <div 
                    style={{ 
                        display: 'flex',
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: '10px',
                        ...style
                    }}>
                    {
                        widgets.map((item, i) => {
                            return (
                                <Drag 
                                    data={item.data}
                                    key={i} 
                                    style={{ 
                                        width: 60,
                                        height: 60,
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        border: '1px solid #ddd',
                                        margin: 10,
                                        }}>
                                    { item.label }
                                </Drag>
                            );
                        })
                    }
                </div>
            </div>
        );
    }
}