import React, { Fragment } from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import '../user/dasboard.css';


class loader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }
        return (
            <Fragment>
                <Snackbar
                    open={this.props.SuccessPrompt}
                    autoHideDuration={3000}
                    onClose={this.props.closeSuccessPrompt}
                >
                    <Alert onClose={this.props.closeSuccessPrompt} severity="success">
                        Success!
                    </Alert>
                </Snackbar>
            </Fragment>
        )
    }

}
export default loader;

