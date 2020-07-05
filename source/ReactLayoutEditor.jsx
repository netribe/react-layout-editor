import React from 'react';
import VisualEditor from './VisualEditor.jsx';
import WidgetEditor from './WidgetEditor.jsx';
import AddWidgetPanel from './AddWidgetPanel.jsx';
import utils from './utils.js';

export default class ReactLayoutEditor extends React.PureComponent{
    constructor(props){
        super(props);
        this.state = {
            selectedKey: null,
            selectedItem: null,
            selectedSchema: null
        };
    }
    select = (key = null) => {
        let { widgets, value } = this.props;
        let item = key ? utils.get(value, utils.getPath(key)) : null;
        let schema = item ? (widgets.find(w => w.id === item.type) || {}).props : null;
        this.setState({
            selectedKey: key,
            selectedItem: item,
            selectedSchema: schema,
        });
    };
    setWidget = (widget) => {
        let { selectedKey } = this.state;
        this.visualEditor.setWidget(selectedKey, widget);
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
                    onSelect={ this.select }
                />
                <div style={{ width: 200, borderLeft: '1px solid #ddd' }}>
                    <WidgetEditor
                        schema={ selectedSchema }
                        value={ selectedItem || {} }
                        onChange={ this.setWidget }
                        onDelete={ this.deleteChild }
                        inputs={ inputs }
                    />
                </div>
            </div>
        );
    }
}