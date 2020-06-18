// test

import React from 'react';
import { ReactLayoutEditor, Input } from '../source';
// import ReactLayoutEditor from '../source';
import Drop from '../source/Drop.jsx';
//hello
export default { title: 'ReactEditor' };
import * as ui from 'ui';

let style = { border: '1px solid #ddd', padding: 10}
// let A = ({ children, testA }) => <div style={ style }><Drop onDrop={ console.log }><p>A { testA || '1' }</p></Drop>{ children }</div>
// let B = ({ children, testB }) => <div style={ style }><Drop onDrop={ console.log }><p>B { testB || '1' }</p></Drop>{ children }</div>
// let components = {A, B};

let components = Object.keys(ui).reduce((components, key) => {
    components[key] = ({ children }) => <div style={style}><Drop onDrop={console.log}>{ui[key]}</Drop>{children}</div>
    return components;
}, {});


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
                type: 'Title',
                children: []
            },
            widgets: [
                {
                    label: 'button'
                },
                {
                    label: 'divider'
                },
                {
                    label: 'image'
                },
                {
                    label: 'paragraph'
                },
                {
                    label: 'title'
                }
            ],
            schemas: {
                // 'A': [
                //     {
                //         key: 'testA',
                //         label: 'testA',
                //         type: 'String'
                //     }
                // ],
                // 'B': [
                //     {
                //         key: 'testB',
                //         label: 'testB',
                //         type: 'Boolean'
                //     }
                // ]
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
        console.log(value, widgets, schemas, components);
        return (
            <div style={{ position: 'fixed', fontFamily: 'Ubuntu Mono', top: 0, left: 0, right: 0, bottom: 0 }}>
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