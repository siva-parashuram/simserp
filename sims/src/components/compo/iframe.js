import React, { Fragment } from 'react';
import '../user/dasboard.css';


class iframe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                <iframe
                 style={{height:'100%',width:'100%'}} 
                 src={this.props.src}
                ></iframe>
            </Fragment>
        )
    }

}
export default iframe;

