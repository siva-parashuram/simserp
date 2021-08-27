import './dasboard.css';
import React, { Fragment } from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';

import Modules from "./modules";


class drawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };


  }

  componentDidMount() {

    if (
      getCookie(COOKIE.USERID) != null
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
      if (token == "null" || token == null) {
        this.setState({ isLoggedIn: false });
      }
    }, 1000);
  }

  render() {
    const drawerWidth = 900;
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
      drawerPaper:{width:'inherit', }

    }));
    return (
      <Fragment>
        <Drawer
        style={{width:'240px'}}
        variant="persistent"
        anchor="left"
        open={true}
        classes={{paper:useStyles.drawerPaper}}
        >
          <Typography variant="h6" style={{ marginTop: 11, textAlign: 'center' }}>
            <span style={{
              letterSpacing: 3,
              fontWeight: 500, textDecorationLine: 'underline',
              textDecorationColor: '#39b54a', color: '#000'
            }}>
              {this.state.branchName}
            </span>
          </Typography>
          <Toolbar />
          <div className={useStyles.drawerContainer}>
            <Modules />
          </div>
        </Drawer>         
      </Fragment>
    );
  }
}

export default drawer;