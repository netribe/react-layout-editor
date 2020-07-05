
import React from 'react';

let styles = {
    
}

export default class JSONEditor extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            value: '',
            error: null
        };
    }
    componentDidMount(){        

    }

    onChange = (e) => {
        let { onChange, label } = this.props;
        try{
            let value = JSON.parse(e.target.value);
            onChange(value);
            this.setState({
                error: null
            });
        }
        catch(err){
            this.setState({
                value: e.target.value,
                error: err.toString()
            });
        }
    }


    render(){
        let { value = {}, onChange, label } = this.props;
        return (
            <div>
                <textarea value={ this.state.error ? this.state.value : JSON.stringify(value) } onChange={ this.onChange }>

                </textarea>
            </div>
        );
    }
}