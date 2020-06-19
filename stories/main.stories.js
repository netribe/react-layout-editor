// test

import React from 'react';
import ReactLayoutEditor from '../source';
import Drop from '../source/Drop.jsx';
//hello
export default { title: 'ReactEditor' };
import * as ui from 'ui';

let style = { border: '1px solid #ddd', padding: 10}
let A = ({ children, testA }) => <div style={ style }><p>A { testA || '1' }</p>{ children }</div>
let B = ({ children, testB }) => <div style={ style }><p>B { testB || '1' }</p>{ children }</div>

let components = Object.keys(ui).reduce((components, key) => {
    components[key] = ({ children }) => <div style={style}><Drop onDrop={console.log}>{ui[key]}</Drop>{children}</div>
    return components;
}, {A, B});
let StringInput = ({ children, value, onChange, label }) => 
    <div style={ style }>
        <div>{label}</div>
        <div>
            <input value={value} onChange={e => onChange(e.target.value)} style={{ width: 80 }}/>
        </div>
    </div>
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
                        children: [
                            {
                                id: '4',
                                layout: {},
                                type: 'B'
                            }
                        ]
                    }
                ]
            },
            widgets: [
                {
                    label: 'Button',
                    data: {
                        type: 'Button',
                        children: [
                            {
                                type: 'Text',
                                props: {
                                    value: 'Button'
                                }
                            }
                        ]
                    }
                },
                {
                    label: 'Divider'
                },
                {
                    label: 'Image'
                },
                {
                    label: 'Text'
                },
                {
                    label: 'Title'
                }
            ],
            schemas: {
                'A': [
                    {
                        key: 'testA',
                        label: 'testA',
                        type: 'String'
                    }
                ],
                'B': [
                    {
                        key: 'testB',
                        label: 'testB',
                        type: 'Boolean'
                    }
                ],
                'Button': [
                    {
                        key: 'variant',
                        label: 'Variant',
                        type: 'String'
                    }
                ],
                'Divider': [
                    {
                        key: 'variant',
                        label: 'Variant',
                        type: 'Boolean'
                    }
                ],
                'Image': [
                    {
                        key: 'src',
                        label: 'Source',
                        type: 'String'
                    }
                ],
                'Paragraph': [
                    {
                        key: 'fontSize',
                        label: 'Font Size',
                        type: 'String'
                    }
                ],
                'Title': [
                    {
                        key: 'color',
                        label: 'Color',
                        type: 'String'
                    }
                ]
            }
        };
    }
    render(){
        let { value, widgets, schemas } = this.state;
        return (
            <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
                <ReactLayoutEditor 
                    value={ value } 
                    components={ components } 
                    widgets={widgets}
                    inputs={inputs}
                    schemas={schemas}
                    onChange={value => this.setState({value})}
                />
            </div>
        );
    }
}

export const editor = () => <EditorStory/>;