import React, { Fragment } from 'react';
import LinearProgress from "@material-ui/core/LinearProgress";
import '../user/dasboard.css';


class loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                {this.props.ProgressLoader === false ? (
                    <div style={{ marginTop: 0, marginLeft: -10 }}>
                        <LinearProgress style={{ backgroundColor: "#ffeb3b" }} />{" "}
                    </div>
                ) : null}
            </Fragment>
        )
    }

}
export default loader;

