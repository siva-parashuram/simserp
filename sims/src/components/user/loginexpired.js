import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, getCookie,deleteCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

class loginexpired extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            urlparams: "",
            isLoggedIn: false 
        };
    }

    componentDidMount() {
         
    }

  

    render() {

        const closewindow=()=>{
            window.close();
        }

        return (
            <Fragment >
                <h4>Login Expired! Close and log in again</h4>
                <a 
                href="#" 
                onClick={closewindow}>
                Close</a>
            </Fragment>
        );
    }
}
export default loginexpired;