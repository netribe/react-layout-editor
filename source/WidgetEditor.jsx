import React from 'react';
import JSONEditor from './Inputs/JSONEditor';

export default class WidgetEditor extends React.PureComponent{
    state = {
        tab: 'props'
    };
    setLayout = (layoutChanges) => {
        let { value, onChange } = this.props;
        let layout = {
            ...(value.layout || {}),
        };
        for(let m in layoutChanges){
            let v = layoutChanges[m];
            if((v === undefined) || (v === '')){
                delete layout[m];
            }
            else{
                layout[m] = layoutChanges[m];
            }
        }
        onChange({
            ...value,
            layout
        });
    };
    render(){
        let { value, onChange, inputs, schema, style, onDelete } = this.props;
        let { tab } = this.state;
        let layout = value.layout || {};
        if(!schema){
            return null;
        }
        // console.log(layout)
        return (
            <div style={{ height: '100%', width: '100%', position: 'relative', ...style }}>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div style={{ height: 30, display: 'flex', flexDirection: 'row', borderBottom: '1px solid #ddd' }}>
                        <div style={{ color: tab === 'props' ? 'blue' : 'grey', padding: 6, cursor: 'pointer' }} onClick={ e => this.setState({ tab: 'props'}) }>Props</div>
                        <div style={{ color: tab === 'layout' ? 'blue' : 'grey', padding: 6, cursor: 'pointer'}} onClick={ e => this.setState({ tab: 'layout'}) }>Layout</div>
                    </div>
                    {
                        tab === 'props' ? (
                            <div style={{ display: 'flex', flexDirection: 'column', padding: 10 }}>
                                <button onClick={ onDelete }>Delete</button>
                                {
                                    schema.map((item, i) => {
                                        let Input = inputs[item.type];
                                        if(Input){
                                            return (
                                                <Input
                                                    key={i}
                                                    onChange={ v => onChange({ ...value, [item.key]: v }) }
                                                    value={ value[item.key] }
                                                    label={ item.label }
                                                    description={ item.description }/>
                                            );
                                        }
                                        return <div>111</div>;
                                    })
                                }
                            </div>
                        ) : (
                            <div>
                                <JSONEditor value={ layout } onChange={ this.setLayout }/>
                                {/* <div>
                                    Container
                                </div>
                                <div style={{ padding: 4 }}>
                                    <div style={{ display: 'flex', padding: 4, justifyContent: 'space-between' }}>
                                        <div 
                                            onChange={ e => this.setLayout({ justifyContent: undefined, alignItems: undefined, flexDirection: undefined }) } 
                                            className={"rle-pe-layout-button" + (((layout.alignItems === 'flex-start' || !layout.alignItems) && (layout.flexDirection === 'row' || !layout.flexDirection)) ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                        <div style={{ justifyContent: 'center' }} className={"rle-pe-layout-button" + (((layout.alignItems === 'flex-start' || !layout.alignItems) && (layout.justifyContent === 'center') && (layout.flexDirection === 'row')) ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                        <div style={{ flexDirection: 'row-reverse'}} className={"rle-pe-layout-button" + (layout.flexDirection === 'row-reverse' ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', padding: 4, justifyContent: 'space-between' }}>
                                        <div style={{ alignItems: 'center' }} className={"rle-pe-layout-button" + (layout.alignItems === 'center' ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                        <div style={{ justifyContent: 'center', alignItems: 'center' }} className={"rle-pe-layout-button" + (layout.justifyContent === 'center' ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                        <div style={{ alignItems: 'center', flexDirection: 'row-reverse' }} className={"rle-pe-layout-button" + (layout.flexDirection === 'row-reverse' ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', padding: 4, justifyContent: 'space-between' }}>
                                        <div style={{ alignItems: 'flex-end' }} className={"rle-pe-layout-button" + (layout.alignItems === 'center' ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                        <div style={{ justifyContent: 'center', alignItems: 'flex-end' }} className={"rle-pe-layout-button" + (layout.justifyContent === 'center' ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                        <div style={{ alignItems: 'flex-end', flexDirection: 'row-reverse' }} className={"rle-pe-layout-button" + (layout.flexDirection === 'row-reverse' ? ' active' : '')}>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                            <div className={"rle-pe-layout-button-item"}></div>
                                        </div>
                                    </div>
                                </div> */}
                            </div>
                        )
                    }
                </div>
                <style>
                    {
                        `
                        .rle-pe-layout-button{
                            color: grey;
                            width: 26px;
                            height: 20px;
                            display: flex;
                            border: 2px solid #ddd;
                            cursor: pointer;
                        }
                        .rle-pe-layout-button:hover{
                            border: 2px solid blue;
                        }
                        .rle-pe-layout-button:hover .rle-pe-layout-button-item{
                            background: blue;
                        }
                        .rle-pe-layout-button.active{
                            color: red;
                        }
                        .rle-pe-layout-button-item{
                            color: grey;
                            width: 6px;
                            height: 4px;
                            background: grey;
                            margin: 1px;
                        }
                        `
                    }
                </style>
            </div>
        );
    }
}