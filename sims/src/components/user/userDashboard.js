import './dasboard.css';
import React, { Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { COOKIE, getCookie } from "../../services/cookie";
import CssBaseline from '@material-ui/core/CssBaseline';
import Menubar from "../user/menubar";
import Grid from '@material-ui/core/Grid';
import Nav from "./nav";
import Row1 from "../dashboard/index/row1";
import Activities from "../dashboard/index/activities";
import QuickActionSection from "../dashboard/index/quickactionsection";


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
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
    }));



    return (
      <Fragment>
        <CssBaseline />
        <Nav />
        <div style={{ marginTop: 42 }}>
          <Menubar />
        </div>
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
                  <Row1 />
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