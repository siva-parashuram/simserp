import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
 
import * as URLS from "../../routes/constants";
import Nav from "./nav"; 
import Row1 from "./row1"; 


class userDashboard extends React.Component {
      componentDidMount() {
         
        if (
          getCookie(COOKIE.USERID) != null 
        ) {
           
        }else{
          this.props.history.push(URLS.URLS.LoginPage);
          
        }
      }

    

    render() {         
        return (
             <div className="navDiv">
               <Nav />
               <Row1/>
             </div>
             
        );
    }
}

export default userDashboard;