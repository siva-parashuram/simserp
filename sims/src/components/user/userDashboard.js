import React, { Fragment } from 'react';
 
 
import * as URLS from "../../routes/constants";

import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie"; 


class userDashboard extends React.Component {
      componentDidMount() {
        console.log("COOKIE.ID_TOKEN > ",getCookie(COOKIE.ID_TOKEN));
        if (
          getCookie(COOKIE.ID_TOKEN) != null 
        ) {
           
        }else{
          this.props.history.push(URLS.URLS.LoginPage);
          
        }
      }

    

    render() {         
        return (
            <Fragment>
               <h1 style={{color:'#000'}}>Hi</h1>  
            </Fragment>
        );
    }
}

export default userDashboard;