import React from 'react';
import VisualEditor from './VisualEditor.jsx';
import PropsEditor from './PropsEditor.jsx';
import AddWidgetPanel from './AddWidgetPanel.jsx';
import utils from './utils.js';
import editors from './editors';

export default class ReactLayoutEditor extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            selectedKey: null,
            selectedItem: null,
            selectedSchema: null
        };
    }
    onSelectComponent = (key, item) => {
        let { widgets } = this.props;
        let schema = (widgets.find(w => w.id === item.type) || {}).props;
        this.setState({
            selectedKey: key,
            selectedItem: item,
            selectedSchema: schema || null,
        });
    };
    setProps = (props) => {
        let { selectedKey } = this.state;
        let { value, onChange } = this.props;
        let path = selectedKey.split('/');
        let fullPath = [];
        path.map((id, i) => {
            if(i > 0){
                fullPath.push({id});
            }
            if(i < path.length - 1){
                fullPath.push('children');
            }
        });
        fullPath.push('props');
        let newValue = utils.set(value, fullPath, props);
        onChange && onChange(newValue);
    };
    deleteChild = () => {
        let { selectedKey } = this.state;
        this.visualEditor.deleteChild(selectedKey);
    };
    render(){
        let { style, value, onChange, widgets, inputs } = this.props;
        let { selectedSchema, selectedItem } = this.state;
        return (
            <div style={{ height: '100%', width: '100%', position: 'relative', display: 'flex', ...style }}>
                <div style={{ width: 200, borderRight: '1px solid #ddd' }}>
                    <AddWidgetPanel widgets={ widgets }/>
                </div>
                <VisualEditor
                    ref={ el => this.visualEditor = el }
                    value={ value } 
                    onChange={ onChange } 
                    widgets={ widgets }
                    // editors={ editors }
                    onSelect={ this.onSelectComponent }
                />
                <div style={{ width: 200, borderLeft: '1px solid #ddd' }}>
                    <PropsEditor
                        schema={ selectedSchema }
                        value={ selectedItem?.props || {} }
                        onChange={ this.setProps }
                        onDelete={ this.deleteChild }
                        inputs={ inputs }
                    />
                </div>
            </div>
        );
    }
}