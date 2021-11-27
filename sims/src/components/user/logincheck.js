import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, getCookie, deleteCookie } from "../../services/cookie";
import * as CF from "../../services/functions/customfunctions"; 

class logincheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let token = getCookie(COOKIE.USERID);
            var url = new URL(window.location.href);
            let branchId = url.searchParams.get("branchId");
            let isPresent = false;
            isPresent=CF.CHECK_IF_BRANCH_IS_OPEN(branchId);
            if(isPresent===false){
                window.close();
            }
            if (token === "null" || token == null) {
                window.location.href = "/loginExpired";
            }

            
        }, 1000);
    }



    componentWillUnmount() {
        clearInterval(this.interval);
    }

    render() { return (<Fragment ></Fragment>); }
}
export default logincheck;