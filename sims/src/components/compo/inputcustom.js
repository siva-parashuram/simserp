import React, { Fragment } from 'react';
import '../user/dasboard.css';


class inputcustom extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <input
                className="table-text-field"
                id={this.props.id}
                size="small"
                defaultValue={this.props.defaultValue}
                value={this.props.value}
                onKeyUp={this.props.onKeyUp}
                style={{width:500}}
                
            />
        )
    }

}
export default inputcustom;

