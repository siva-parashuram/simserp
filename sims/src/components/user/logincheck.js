import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, getCookie, deleteCookie } from "../../services/cookie";


class logincheck extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let token = getCookie(COOKIE.USERID);
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