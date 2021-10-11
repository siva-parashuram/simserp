import './dasboard.css';
import React, { Fragment } from 'react';
 
import { COOKIE, getCookie } from "../../services/cookie";
 
import Menubar from "../user/menubar";
import Grid from '@material-ui/core/Grid';
import Nav from "./nav";
import Notify from "../dashboard/index/notification";
import Insights from "../dashboard/index/insights";
import Activities from "../dashboard/index/activities";
import QuickActionSection from "../dashboard/index/quickactionsection";
 


class userheaderconstatnts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      

    };
  }

  
  render() {
    return (
      <Fragment>           
        <Nav />        
        <Menubar />
        <Notify/>       
      </Fragment>
    );
  }
}

export default userheaderconstatnts;