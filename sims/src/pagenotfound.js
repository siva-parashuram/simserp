import React, { Fragment } from "react";
import './components/loginPage.css';

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
                <p className="pageNotFound-p"  style={{ textAlign:'right',marginRight:20 }}>
                        
                        <Link color="inherit" style={{ color: 'blue' }} href={URLS.URLS.userDashboard + this.state.urlparams} >
                            Dashboard
                        </Link>
                    </p>
                    <p className="pageNotFound-p"  style={{ fontSize:50,textAlign:'center'}}>
                        Oops! Page not found. 
                    </p>
                    <p style={{ textAlign:'center' }}>
                       <PriorityHighIcon style={{fontSize:400,color:'red'}}/>
                    </p>
                </div>
            </Fragment>
        );
    }
}

export default pageNotFound;