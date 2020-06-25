// test

import React from 'react';
import { ReactLayoutEditor, Input } from '../source';
import * as ui from 'ui';

export default { title: 'ReactEditor' };

let style = { border: '1px solid #ddd', padding: 10}
let A = ({ children, testA }) => <div style={ style }><p>A { testA || '1' }</p>{ children }</div>
let B = ({ children, testB }) => {
    children = React.Children.toArray(children);
    // console.log('render', children)
    return (
        <div style={ style }>
            <div style={{ display: 'flex' }}>
                {children[0] || null}
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    {children[1] || null}
                    <p>B { testB || '1' }</p>
                    {children[2] || null}
                </div>
                {children[3] || null}
            </div>
        </div>
    );
}

let StringInput = ({ children, value, onChange, label }) => 
    <Input
        label={ label }
        name={ label }
        value={ value }
        onChange={ onChange }
        type={ 'String' } />
    // <div style={ style }>
    //     <div>{label}</div>
    //     <div>
    //         <input value={value} onChange={e => onChange(e.target.value)} style={{ width: 80 }}/>
    //     </div>
    // </div>
let BooleanInput = ({ children, value, onChange, label }) => <div style={ style }>{label}<input type="checkbox" value={String(value)} onChange={e => onChange(e.target.checked)}/></div>
let inputs = {String: StringInput, Boolean: BooleanInput};
class EditorStory extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: {
                id: '1',
                layout: {
                    flex: 1
                },
                children: [
                    {
                        id: '2',
                        layout: {},
                        type: 'A',
                        children: []
                    },
                    {
                        id: '3',
                        layout: {},
                        type: 'A',
                        children: []
                    },
                    {
                        id: '4',
                        layout: {
                            padding: '10px 0'
                        },
                        props: {
                            variant: 'fullWidth'
                        },
                        type: 'Divider',
                    }
                ]
            },
            widgets: [
                {
                    id: 'A',
                    label: 'A',
                    body: {
                        type: 'A',
                        props: {},
                        children: []
                    },
                    component: A,
                    props: [
                        {
                            key: 'testA',
                            label: 'testA',
                            type: 'String'
                        }
                    ]
                },
                {
                    id: 'Section',
                    label: 'Section',
                    body: {
                        layout: {
                            padding: 20
                        },
                        children: []
                    },
                    component: B,
                    props: [
                        {
                            key: 'testB',
                            label: 'testB',
                            type: 'Boolean'
                        }
                    ]
                },
                {
                    id: 'Row',
                    label: 'Row',
                    body: {
                        layout: {
                            flexDirection: 'row',
                            padding: '20px 10px'
                        },
                        props: {},
                        children: []
                    },
                    props: []
                },
                {
                    id: 'Column',
                    label: 'Column',
                    body: {
                        layout: {
                            flexDirection: 'column',
                            padding: '20px 10px'
                        },
                        props: {},
                        children: []
                    },
                    props: []
                },
                {
                    id: 'Button',
                    label: 'Button',
                    component: ui.Button,
                    body: {
                        type: 'Button',
                        props: {
                            variant: 'outlined'
                        },
                        children: [
                            {
                                type: 'Text',
                                props: {
                                    value: 'Button'
                                }
                            }
                        ]
                    },
                    props: [
                        {
                            key: 'variant',
                            label: 'Variant',
                            type: 'String'
                        }
                    ]
                },
                {
                    id: 'Divider',
                    label: 'Divider',
                    component: ui.Divider,
                    body: {
                        type: 'Divider',
                        layout: {
                            padding: '10px 0'
                        },
                        props: {
                            variant: 'fullWidth'
                        }
                    },
                    props: [
                        {
                            key: 'variant',
                            label: 'Variant',
                            type: 'Boolean'
                        }
                    ]
                },
                {
                    id: 'Image',
                    label: 'Image',
                    component: ui.Image,
                    body: {
                        type: 'Image',
                        props: {
                            src: ''
                        }
                    },
                    props: [
                        {
                            key: 'src',
                            label: 'Source',
                            type: 'String'
                        }
                    ]
                },
                {
                    id: 'Text',
                    label: 'Text',
                    component: ui.Text,
                    body: {
                        type: 'Text',
                        props: {
                            value: 'Some Text'
                        }
                    },
                    props: [
                        {
                            key: 'value',
                            label: 'Value',
                            type: 'String'
                        }
                    ]
                },
                {
                    id: 'Title',
                    label: 'Title',
                    component: ui.Title,
                    body: {
                        type: 'Title',
                        props: {
                            src: ''
                        },
                        children: [
                            {
                                type: 'Text',
                                props: {
                                    value: 'Title text'
                                }
                            }
                        ]
                    },
                    props: [
                        {
                            key: 'color',
                            label: 'Color',
                            type: 'String'
                        }
                    ]
                }
            ]
        };
    }
    render(){
        let { value, widgets } = this.state;
        return (
            <div style={{ position: 'fixed', fontFamily: 'Ubuntu Mono', top: 0, left: 0, right: 0, bottom: 0 }}>
                <ReactLayoutEditor 
                    value={ value } 
                    widgets={widgets}
                    inputs={inputs}
                    onChange={value => this.setState({value})}
                />
            </div>
        );
    }
}

export const editor = () => <EditorStory/>;