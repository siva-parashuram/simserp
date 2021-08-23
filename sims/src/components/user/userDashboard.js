import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
 
import * as URLS from "../../routes/constants";
import Nav from "./nav"; 
import Row1 from "./row1"; 


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
             <div className="navDiv">
               <Nav />
               <Row1/>
             </div>
             
        );
    }
}

export default userDashboard;