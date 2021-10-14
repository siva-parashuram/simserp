import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Switch from "@mui/material/Switch";

import "../../user/dasboard.css";
import Header from "../../user/userheaderconstants";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";

class adduser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisabledCreatebtn: true,
      user: {
        UserID: 0,
        LoginID: null,
        Password: null,
        FirstName: null,
        LastName: null,
        EmailID: null,
        IsAdmin: false,
        isActive: true,
      },
      UserID: 0,
      LoginID: null,
      Password: null,
      FirstName: null,
      LastName: null,
      EmailID: null,
      IsAdmin: false,
      isActive: true,
      Validations: {
        LoginID: { errorState: false, errorMssg: "" },
        Password: { errorState: false, errorMssg: "" },
        FirstName: { errorState: false, errorMssg: "" },
        LastName: { errorState: false, errorMssg: "" },
        EmailID: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
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
      urlparams: urlparams,
    });
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "AddressDetailsExpanded") {
        this.state.AddressDetailsExpanded === true
          ? this.setState({ AddressDetailsExpanded: false })
          : this.setState({ AddressDetailsExpanded: true });
      }
    };

    const CheckFirstName = () => {
      if (
        this.state.FirstName === "" ||
        this.state.FirstName === null ||
        this.state.FirstName.length > 20
      ) {
        this.setState({ DisabledCreatebtn: true });
      } else {
        this.setState({ DisabledCreatebtn: false });
      }
    };

    const updateFormValue = (id, e) => {
      console.log("====================================");
      console.log("id > ", id);
      console.log("e > ", e);
      console.log("e.target.value > ", e.target.checked);
      console.log("====================================");

      if (id === "isActive") {
        let user = this.state.user;
        user.isActive = e.target.checked;
        this.setState({ user: user });
      }

      if (id === "isAdmin") {
        let user = this.state.user;
        user.IsAdmin = e.target.checked;
        this.setState({ user: user });
      }

      if (id === "FirstName") {
        let user = this.state.user;
        user.FirstName = e.target.value;
        if (
          e.target.value === "" ||
          (e.target.value === null) | (e.target.value.length > 20)
        ) {
          let v = this.state.Validations;
          if (e.target.value.length > 20) {
            v.FirstName = {
              errorState: true,
              errorMssg: "only 20 characters are allowed",
            };
          }
          if (e.target.value === "" || e.target.value === null) {
            v.FirstName = {
              errorState: true,
              errorMssg: "FirstName cannot be blank!",
            };
          }
          this.setState({
            Validations: v,
            DisabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.FirstName = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            DisabledCreatebtn: false,
            FirstName: e.target.value,
            user: user,
          });
        }
      }
      if (id === "LastName") {
        let user = this.state.user;
        user.LastName = e.target.value;
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.LastName = {
            errorState: true,
            errorMssg: "only 20 characters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.LastName = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,

            LastName: e.target.value,
            user: user,
          });
        }
        CheckFirstName();
      }
      if (id === "EmailID") {
        let user = this.state.user;
        user.EmailID = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.EmailID = {
            errorState: true,
            errorMssg: "only 50 characters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.EmailID = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,

            EmailID: e.target.value,
            user: user,
          });
        }
        CheckFirstName();
      }
      if (id === "LoginID") {
        let user = this.state.user;
        user.LoginID = e.target.value;
        // this.setState({user:user});
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.LoginID = {
            errorState: true,
            errorMssg: "only 10 characters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.LoginID = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,

            LoginID: e.target.value,
            user: user,
          });
        }
        CheckFirstName();
      }

      if (id === "Password") {
        let user = this.state.user;
        user.Password = e.target.value;

        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.Password = {
            errorState: true,
            errorMssg: "only 10 characters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Password = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,

            Password: e.target.value,
            user: user,
          });
        }
        CheckFirstName();
      }
    };

    const handleCreate = () => {
      CheckFirstName();
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let user = this.state.user;
      const handleCreateData = {
        validUser: ValidUser,
        users: user,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let AddUserUrl = APIURLS.APIURL.AddUser;
      console.log("handleCreateData >   ", handleCreateData);

      axios
        .post(AddUserUrl, handleCreateData, { headers })
        .then((response) => {
          let data = response.data;
          console.log("handleCreate > response > data > ", data);
          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {
          console.log("error > ", error);
        });
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
      <Fragment>
        <Header />
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
            Success!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.ErrorPrompt}
          autoHideDuration={3000}
          onClose={closeErrorPrompt}
        >
          <Alert onClose={closeErrorPrompt} severity="error">
            Error!
          </Alert>
        </Snackbar>

        <div className="breadcrumb-height">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs className="style-breadcrumb" aria-label="breadcrumb">
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
                <Link
                  color="inherit"
                  href={URLS.URLS.userMaster + this.state.urlparams}
                >
                  User Master
                </Link>
                <Typography color="textPrimary">Add New User</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>
          <Grid container spacing={3}>
            <Grid className="style-buttons" xs={1}>
              <Button
                style={{ marginLeft: 5 }}
                onClick={handleCreate}
                disabled={this.state.DisabledCreatebtn}
              >
                Create
              </Button>
            </Grid>
          </Grid>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={6} md={6} lg={6}>
              <Accordion
                key="country-General-Details"
                expanded={this.state.GeneralDetailsExpanded}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) =>
                        handleAccordionClick("GeneralDetailsExpanded", e)
                      }
                    />
                  }
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 20, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    General Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
                  <TableContainer>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="company List table"
                    >
                      <TableBody className="tableBody">
                        <Tablerowcelltextboxinput
                          id="FirstName"
                          label="FirstName"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("FirstName", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.FirstName}
                          error={this.state.Validations.FirstName.errorState}
                          helperText={
                            this.state.Validations.FirstName.errorMssg
                          }
                        />

                        <Tablerowcelltextboxinput
                          id="LastName"
                          label="LastName"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("LastName", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.LastName}
                          error={this.state.Validations.LastName.errorState}
                          helperText={this.state.Validations.LastName.errorMssg}
                        />
                        <Tablerowcelltextboxinput
                          id="EmailID"
                          label="Email ID"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("EmailID", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.EmailID}
                          error={this.state.Validations.EmailID.errorState}
                          helperText={this.state.Validations.EmailID.errorMssg}
                        />

                        <Tablerowcelltextboxinput
                          id="LoginID"
                          label="Login ID"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("LoginID", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.LoginID}
                          error={this.state.Validations.LoginID.errorState}
                          helperText={this.state.Validations.LoginID.errorMssg}
                        />

                        <Tablerowcelltextboxinput
                          type="password"
                          id="Password"
                          label="Password"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Password", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.Password}
                          error={this.state.Validations.Password.errorState}
                          helperText={this.state.Validations.Password.errorMssg}
                        />

                        <TableRow>
                          <TableCell align="left" className="no-border-table">
                            is Admin?
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            <Switch
                              size="small"
                              onChange={(e) => updateFormValue("isAdmin", e)}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left" className="no-border-table">
                            is Active?
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            <Switch
                              size="small"
                              onChange={(e) => updateFormValue("isActive", e)}
                            />
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default adduser;
