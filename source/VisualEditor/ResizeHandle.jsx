import React from 'react';

export default class ResizeHandle extends React.Component{
    renderHorizontal = (isVisible) => {
        return (
            <div 
                style={{
                    width: 10,
                    top: 0,
                    bottom: 0,
                    right: -5,
                    position: 'absolute',
                    cursor: 'ew-resize',
                    overflow: 'visible',
                }}
                draggable={true}
                onMouseDown={ e => { e.stopPropagation(); this.props.onStartResize(e) }}
                onDragStart={e => { e.stopPropagation(); e.preventDefault(); }}
            >
                {
                    isVisible ? 
                    <div 
                        style={{ 
                            position: 'absolute',
                            left: 1,
                            width: 4,
                            top: 10,
                            bottom: 10,
                            border: '1px solid #22a',
                            background: '#fff',
                            zIndex: 1,
                            borderRadius: 2
                        }}>
                    </div> 
                    : null 
                }
            </div>
        );
    };
    renderVertical = (isVisible) => {
        return (
            <div 
                style={{
                    height: 10,
                    left: 0,
                    right: 0,
                    bottom: -5,
                    position: 'absolute',
                    cursor: 'ns-resize',
                    overflow: 'visible',
                }}
                draggable={true}
                onMouseDown={ e => { e.stopPropagation(); this.props.onStartResize(e) }}
                onDragStart={e => { e.stopPropagation(); e.preventDefault(); }}
                onMouseEnter={ this.props.onMouseEnter }
            >
                {
                    isVisible ? 
                    <div 
                        style={{ 
                            position: 'absolute',
                            bottom: 2,
                            height: 4,
                            left: 10,
                            right: 10,
                            border: '1px solid #22a',
                            background: '#fff',
                            zIndex: 1,
                            borderRadius: 2
                        }}>

                    </div>
                    : null 
                }
                    
            </div>
        );
    };
    render(){
        let { isHorizontal, isVisible } = this.props;
        return isHorizontal ? this.renderHorizontal(isVisible) : this.renderVertical(isVisible);
    }
}