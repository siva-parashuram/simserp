import React, { Fragment } from 'react';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import '../user/dasboard.css';


class errorSnackbar extends React.Component {
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
                    open={this.props.ErrorPrompt}
                    autoHideDuration={3000}
                    onClose={this.props.closeErrorPrompt}
                >
                    <Alert onClose={this.props.closeErrorPrompt} severity="error">
                        Error!
                    </Alert>
                </Snackbar>
            </Fragment>
        )
    }

}
export default errorSnackbar;

