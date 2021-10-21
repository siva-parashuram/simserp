import React, { Fragment } from "react";
import './components/loginPage.css';
import logo from './logo.png';

import Link from '@material-ui/core/Link';
import * as URLS from "./routes/constants";
import PriorityHighIcon from '@mui/icons-material/PriorityHigh';

class pageNotFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            branchName: "",
            branchId: "",
            compName: "",
            urlparams: ""
        };
    }

    componentDidMount() {
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            branchName: branchName,
            branchId: branchId,
            compName: compName,
            urlparams: urlparams,
        });
    }

    render() {
        return (
            <Fragment>
                <div style={{ marginLeft: 20 }}>
                    
                    <p className="pageNotFound-p" style={{ fontSize: 50, textAlign: 'center',marginBottom:-20 }}>
                        Oops!
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        <PriorityHighIcon style={{ fontSize: 350, color: 'red' }} />
                    </p>
                    <p style={{ textAlign: 'center' }}>
                        <img src={logo} className="App-logo" alt="logo" />
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default pageNotFound;