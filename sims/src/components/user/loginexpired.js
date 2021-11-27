import './dasboard.css';
import React, { Fragment } from 'react';
import * as CF from "../../services/functions/customfunctions"; 

class loginexpired extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branchId:null
        };
    }

    componentDidMount() {
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");     
        this.setState({
            branchId: branchId,
        },()=>{
            CF.UPDATE_BRANCH_OPEN_REMOVE(branchId);  
        });
     }

    render() {
        const closewindow = () => {
            CF.UPDATE_BRANCH_OPEN_REMOVE(this.state.branchId);
            window.close();
        }
        return (
            <Fragment>
                <h4>Login Expired! Close and log in again</h4>
                <a
                    href="#"
                    onClick={closewindow}>
                    Close
                </a>
            </Fragment>
        );
    }
}
export default loginexpired;