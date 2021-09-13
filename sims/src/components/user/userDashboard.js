import './dasboard.css';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { COOKIE, getCookie } from "../../services/cookie";
import Nav from "./nav";

import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from "./drawer";
import Menubar from "../user/menubar";
import Grid from '@material-ui/core/Grid';

import Row1 from "../dashboard/index/row1";
import Activities from "../dashboard/index/activities";

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
      <div>
        <CssBaseline />
        <Nav />
        <div style={{ marginTop: 42 }}>
          <Menubar />
        </div>
        <div style={{ height: 20 }}></div>
        <div style={{ marginTop: -10 }}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={1}></Grid>
            <Grid item xs={12} sm={10}>
              
              <Activities />
              <Row1 />
            </Grid>
            <Grid item xs={12} sm={1}></Grid>
          </Grid>

        </div>

      </div>
    );
  }
}

export default userDashboard;