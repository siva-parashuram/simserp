import React, { Fragment } from 'react';
import Drawer from "../../user/drawer";
import Nav from "../../user/nav";
import BreadCrumb from '../../user/BreadCrumb';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import '../../user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";

import Companymasterdatagrid from "./datagrids/companymasterdatagrid";

// import Grid from '@material-ui/core/Grid';


class companyMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      branchName: "",
      branchId: "",
      compName: "",
      countryData:[],
      
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
        compName: compName,
       
       
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
        <div className="marginTop">
          <Drawer />
        </div>
        <main className={useStyles.content}>
          <Toolbar />
          <div style={{ marginLeft: 250 }}>
            <BreadCrumb data="companyMaster" />
              <Companymasterdatagrid/>
          </div>
        </main>
      </Fragment>
    );
  }


}
export default companyMaster;