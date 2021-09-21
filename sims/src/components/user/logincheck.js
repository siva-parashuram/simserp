import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, getCookie,deleteCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

class logincheck extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            urlparams: "",
            isLoggedIn: false 
        };
    }

    componentDidMount() {
        this.interval = setInterval(() => {
            let token = getCookie(COOKIE.USERID);
            if (token === "null" || token == null) {
              if (this.state.isLoggedIn === false) { } else {
                this.setState({ isLoggedIn: false });              
                this.props.history.push(URLS.URLS.LoginPage);
              }
            }
      
          }, 1000);
    }

    componentWillUnmount() {
        clearInterval(this.interval);
      }

    render() {
        return (
            <Fragment >
                
            </Fragment>
        );
    }
}
export default logincheck;