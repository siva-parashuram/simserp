import React, { Fragment } from "react";
import { COOKIE, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

class BreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      parentBreadcrumb: true,
      companyMaster: false,
      addNewCompany: false,
    };
  }

  componentDidMount() {
    if (getCookie(COOKIE.TOKEN) != null) {
      this.setState({ isLoggedIn: true });
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      let urlparams =
        "?branchId=" +
        branchId +
        "&compName=" +
        compName +
        "&branchName=" +
        branchName;
      this.setState({
        branchName: branchName,
        branchId: branchId,
        compName: compName,
        urlparams: urlparams,
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
    let data = this.props.data;

    if (data === "companyMaster") this.setState({ companyMaster: true });
    if (data === "addNewCompany") this.setState({ addNewCompany: true });
  }

  render() {
    // function handleClick(event) {
    //     event.preventDefault();
    //     console.info('You clicked a breadcrumb.');
    //   }

    return (
      <Fragment style={{ marginTop: 50 }}>
        <Breadcrumbs aria-label="breadcrumb">
          {this.state.parentBreadcrumb ? (
            <Link
              color="inherit"
              href={URLS.URLS.userDashboard + this.state.urlparams}
            >
              Dashboard
            </Link>
          ) : null}
          {this.state.companyMaster ? (
            <Typography color="textPrimary">Company Master</Typography>
          ) : null}
          {this.state.addNewCompany ? (
            <Fragment>
              <Link
                color="inherit"
                href={URLS.URLS.userDashboard + this.state.urlparams}
              >
                Company master
              </Link>
              <Typography color="textPrimary">Add New Company</Typography>
            </Fragment>
          ) : null}
        </Breadcrumbs>
      </Fragment>
    );
  }
}

export default BreadCrumb;
