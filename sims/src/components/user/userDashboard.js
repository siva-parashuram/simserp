import './dasboard.css';
import React, { Fragment } from 'react';
 
import { COOKIE, getCookie } from "../../services/cookie";
 
import Grid from '@material-ui/core/Grid';

import Insights from "../dashboard/index/insights";
import Activities from "../dashboard/index/activities";
import QuickActionSection from "../dashboard/index/quickactionsection";
import Notify from "../dashboard/index/notification";

 


class userDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,

    };
  }

  componentDidMount() {
    if (
      getCookie(COOKIE.TOKEN) != null
    ) {
      this.setState({ isLoggedIn: true });
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      this.setState({
        branchName: branchName,
        branchId: branchId,
        compName: compName
      });
    } else {
      this.setState({ isLoggedIn: false });
    }

    this.interval = setInterval(() => {
      let token = getCookie(COOKIE.USERID);
      if (token === "null" || token == null) {
        this.setState({ isLoggedIn: false });
      }
    }, 1000);
  }

  render() {
     

    return (
      <Fragment>
         <div style={{ height: 20 }}></div>

          


        <Notify/>   
       
        <div style={{ height: 20 }}></div>
        <div style={{ marginTop: -10 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
            <Grid item xs={12} sm={12} md={10} lg={10}>
             
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <QuickActionSection />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Activities />
                </Grid>
              </Grid>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Insights />
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}

export default userDashboard;