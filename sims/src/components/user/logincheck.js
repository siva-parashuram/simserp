import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, getCookie,deleteCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";
import  { Redirect } from 'react-router-dom';

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
              this.setState({ isLoggedIn: false });              
              window.location.href="/loginExpired";
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