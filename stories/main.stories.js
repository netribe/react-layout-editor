// test

import React from 'react';
import { ReactLayoutEditor, Input } from '../source';
import widgets from 'ui/widgets';

export default { title: 'ReactEditor' };

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
                type: 'Scroll',
                resize: false,
                layout: {
                    flex: 1
                },
                children: [
                    {
                        id: '2',
                        type: 'Section',
                        layout: {},
                        children: []
                    },
                    {
                        id: '3',
                        type: 'Section',
                        layout: {},
                        children: []
                    },
                    {
                        id: '4',
                        type: 'Divider',
                        layout: {
                            padding: '10px 0'
                        },
                        props: {
                            variant: 'fullWidth'
                        },
                    }
                ]
            },
            widgets: widgets
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