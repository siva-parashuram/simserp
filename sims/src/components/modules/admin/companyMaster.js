import React, { Fragment } from 'react';
 
import Nav from "../../user/nav";
 
import CssBaseline from '@material-ui/core/CssBaseline';
 
 
import '../../user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";

import Companymasterdatagrid from "../admin/datagrids/companymasterdatagrid";

import Menubar from "../../user/menubar";


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
     


    return (
      <Fragment>
        <CssBaseline />
        <Nav />
        <Menubar/>
        <Companymasterdatagrid/>
      </Fragment>
    );
  }


}
export default companyMaster;