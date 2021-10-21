import React, { Fragment } from "react";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";

import { Divider } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import TextField from "@material-ui/core/TextField";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";

import AddIcon from "@material-ui/icons/Add";

import axios from "axios";

import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Header from "../../user/userheaderconstants";
import { withStyles } from "@material-ui/styles";

import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";

class addnewcompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GeneralDetailsExpanded: false,
      SuccessPrompt: false,
      ProgressLoader: false,
      urlparams: "",
    };
  }

  componentDidMount() {
    this.getCountryList();
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
    // let urlparams = "?branchId=" + null + "&compName=" + null + "&branchName=" + null; //for testing null values
    this.setState({
      urlparams: urlparams,
    });
  }

  render() {
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    return (
      <Fragment>
        {this.state.ProgressLoader === false ? (
          <div style={{ marginTop: -8, marginLeft: -10 }}>
            <LinearProgress style={{ backgroundColor: "#ffeb3b" }} />{" "}
          </div>
        ) : null}

        <Snackbar
          open={this.state.SuccessPrompt}
          autoHideDuration={3000}
          onClose={closeSuccessPrompt}
        >
          <Alert onClose={closeSuccessPrompt} severity="success">
            Items Details Updated!
          </Alert>
        </Snackbar>

        <Snackbar
          //   open={this.state.ErrorPrompt}
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
                  <Link color="inherit" className="backLink">
                    Item Master
                  </Link>

                  <Typography color="textPrimary">Add Item </Typography>
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
                    Add
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="breadcrumb-bottom"></div>

        <div className="New-link-bottom"></div>

        <Grid className="table-adjust" container spacing={0}>
          <Grid item xs={8}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Accordion
                  key="Item-General-Details"
                  expanded={this.state.GeneralDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                  >
                    <Typography
                      key=""
                      className="accordion-Header-Title"
                    ></Typography>
                  </AccordionSummary>

                  <AccordionDetails key="" className="AccordionDetails-css">
                    <TableContainer>
                      <Table
                        stickyHeader
                        size="small"
                        className="accordion-table"
                        aria-label="Item List table"
                      >
                        <TableBody className="tableBody">
                          <tableCell></tableCell>
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default addnewcompany;
