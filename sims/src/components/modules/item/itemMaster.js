import React, { Fragment } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Header from "../../user/userheaderconstants";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

class itemMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProgressLoader: false,
      isLoggedIn: false,
      urlparams: "",
    };
  }

  componentDidMount() {
    if (getCookie(COOKIE.USERID) != null) {
      this.getCompanyList();
      this.setColumns();
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
  }

  render() {
    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };

    return (
      <Fragment>
        <CssBaseline />

        {this.state.ProgressLoader === false ? (
          <div style={{ marginTop: 5, marginLeft: -10 }}>
            <LinearProgress className="linearProgress-css" />{" "}
          </div>
        ) : null}

        <Snackbar
          // open={this.state.ErrorPrompt}
          autoHideDuration={3000}
          onClose={closeErrorPrompt}
        >
          <Alert onClose={closeErrorPrompt} severity="error">
            Error!
          </Alert>
        </Snackbar>

        <div className="breadcrumb-height">
          <Grid container spacing={1}>
            <Grid
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                borderRightStyle: "solid",
                borderRightColor: "#bdbdbd",
                borderRightWidth: 1,
              }}
            >
              <div style={{ marginTop: 8 }}>
                <Breadcrumbs
                  className="style-breadcrumb"
                  aria-label="breadcrumb"
                >
                  <Link
                    color="inherit"
                    className="backLink"
                    onClick={this.props.history.goBack}
                  >
                    Back
                  </Link>
                  <Link
                    color="inherit"
                    href={URLS.URLS.userDashboard + this.state.urlparams}
                  >
                    Dashboard
                  </Link>
                  <Typography color="textPrimary"> Item master</Typography>
                </Breadcrumbs>
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <div style={{ marginLeft: 10, marginTop: 1 }}>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Action Menu Button group"
                >
                  <Button className="action-btns" startIcon={<AddIcon />}>
                    NEW
                  </Button>
                  <Button className="action-btns" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="breadcrumb-bottom"></div>

        <div className="New-link-bottom"></div>
        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table
                stickyHeader
                size="small"
                className=""
                aria-label="item List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>
                    <TableCell className="table-header-font" align="left">
                      Item Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  <TableRow>
                    <TableCell align="left"></TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default itemMaster;
