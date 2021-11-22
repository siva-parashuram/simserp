import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Button from "@material-ui/core/Button";

import Switch from "@mui/material/Switch";
import ButtonGroup from "@mui/material/ButtonGroup";
import UpdateIcon from "@material-ui/icons/Update";
import "../../user/dasboard.css";

import * as CF from "../../../services/functions/customfunctions";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";

class edituser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableUpdatebtn: true,
      duplicateExist: false,
      users: [],
      oldEMAILID: "",
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
      user: {
        UserID: 0,
        LoginID: null,
        Password: null,
        FirstName: null,
        LastName: null,
        EmailID: null,
        isActive: null,
        IsAdmin: false,
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
    this.getUsersList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let userId = url.searchParams.get("userId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    let user = this.state.user;
    user.UserID = parseInt(userId);
    this.setState(
      {
        urlparams: urlparams,
        UserID: parseInt(userId),
      },
      () => {
        this.getUserDetails();
      }
    );
  }
  getUsersList() {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetUsersUrl = APIURLS.APIURL.GetUsers;

    axios
      .post(GetUsersUrl, ValidUser, { headers })
      .then((response) => {
        console.log("getUsersList >  response.data > ", response.data);
        let data = response.data;
        let rows = data;
        this.setState({ users: data, ProgressLoader: true });
      })
      .catch((error) => {});
  }

  getUserDetails() {
    let user = this.state.user;
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const getUserDetailsData = {
      validUser: ValidUser,
      users: user,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    let GetUserUrl = APIURLS.APIURL.GetUser;

    axios
      .post(GetUserUrl, getUserDetailsData, { headers })
      .then((response) => {
        let data = response.data;

        let user = this.state.user;

        user.UserID = parseInt(this.state.UserID);
        user.LoginID = data.loginId;
        user.Password = data.password;
        user.FirstName = data.firstName;
        user.LastName = data.lastName;
        user.EmailID = data.emailId;
        user.isActive = data.isActive;
        user.IsAdmin = data.isAdmin;

        this.setState({
          oldEMAILID: data.emailId,
          user: user,
          country: data,
          LoginID: data.loginId,
          Password: data.password,
          FirstName: data.firstName,
          LastName: data.lastName,
          EmailID: data.emailId,
          IsAdmin: data.isAdmin,
          isActive: data.isActive,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
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
      //  if(this.state.duplicateExist===true||this.state.EmailID.length>50){
      //    if(this.state.FirstName.length>20){
      //      this.setState({DisableUpdatebtn:true})
      //    }else{
      //     this.setState({DisableUpdatebtn:true})
      //    }
      //  }else if(this.state.FirstName.length>20){
      //   this.setState({DisableUpdatebtn:true})
      // }
      if (this.state.FirstName.length > 20) {
        if (
          this.state.duplicateExist === true ||
          this.state.EmailID.length > 50
        ) {
          this.setState({ DisableUpdatebtn: true });
        }
      } else if (
        this.state.duplicateExist === true ||
        this.state.EmailID.length > 50
      ) {
        this.setState({ DisableUpdatebtn: true });
      } else {
        this.setState({ DisableUpdatebtn: false });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "isActive") {
        let user = this.state.user;
        user.isActive = e.target.checked;
        this.setState({ user: user, isActive: e.target.checked });
      }

      if (id === "isAdmin") {
        let user = this.state.user;
        user.IsAdmin = e.target.checked;
        this.setState({ user: user, IsAdmin: e.target.checked });
      }

      if (id === "FirstName") {
        let user = this.state.user;
        user.FirstName = e.target.value;
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.FirstName = {
            errorState: true,
            errorMssg: "only 20 characters are allowed",
          };
          this.setState({
            Validations: v,
            DisableUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.FirstName = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            DisableUpdatebtn: false,
            FirstName: e.target.value,
            user: user,
          });
        }
        CheckFirstName();
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
        let duplicateExist = CF.chkDuplicateButExcludeName(
          this.state.users,
          "emailId",
          this.state.oldEMAILID,
          e.target.value
        );
        let user = this.state.user;
        user.EmailID = e.target.value;
        if (e.target.value.length > 50 || duplicateExist === true) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.EmailID = {
              errorState: true,
              errorMssg: "Email  Already exist!",
            };
            this.setState({
              Validations: v,
              EmailID: e.target.value,
              DisableUpdatebtn: true,
              duplicateExist: true,
            });
          }
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.EmailID = {
              errorState: true,
              errorMssg: "only 50 characters are allowed",
            };
            this.setState({
              Validations: v,
              DisableUpdatebtn: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.EmailID = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            DisableUpdatebtn: false,
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
        // this.setState({user:user});
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
      }
      CheckFirstName();
      // this.state.duplicateExist === true
      //   ? this.setState({ DisableUpdatebtn: true })
      //   : this.setState({ DisableUpdatebtn: false });
    };

    const handleUpdate = () => {
      CheckFirstName();
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let user = this.state.user;
      const handleUpdateData = {
        validUser: ValidUser,
        users: user,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateUserUrl = APIURLS.APIURL.UpdateUser;

      axios
        .post(UpdateUserUrl, handleUpdateData, { headers })
        .then((response) => {
          let data = response.data;

          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
    };


    const dialog = (
      <Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={this.state.Dialog.DialogStatus}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          className="dialog-prompt-activity"
        >
          <DialogTitle
            id="dialog-title"
            className="dialog-area"
            style={{ maxHeight: 50 }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={1} lg={1}>
                <IconButton
                  aria-label="ArrowBackIcon"
                  // style={{ textAlign: 'left', marginTop: 8 }}
                >
                  <ArrowBackIcon onClick={(e) => handleClose()} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <div style={{ marginLeft: -50 }}>
                  {" "}
                  <span style={{ fontSize: 18, color: "rgb(80, 92, 109)" }}>
                    {" "}
                    {this.state.Dialog.DialogTitle}{" "}
                  </span>{" "}
                </div>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {this.state.Dialog.DialogContent}
              </Grid>
            </Grid>
            <div style={{ height: 50 }}>&nbsp;</div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );

    const openDialog = (param) => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = true;
      Dialog.DialogTitle = param;

      switch (param) {
        case "AssignBranch":
          // Dialog.DialogContent = ;
          this.setState({ Dialog: Dialog });
          break;
        case "AssignRole":
          // Dialog.DialogContent = ;
          this.setState({ Dialog: Dialog });
          break;
       
        default:
          break;
      }

      this.setState({ Dialog: Dialog });
    };

    const handleClose = () => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = false;
      this.setState({ Dialog: Dialog });
    
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

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <div className="breadcrumb-height">
          <Grid container spacing={3}>
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
                <Breadcrumb
                  backOnClick={this.props.history.goBack}
                  linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                  linkTitle="Dashboard"
                  masterHref={URLS.URLS.userMaster + this.state.urlparams}
                  masterLinkTitle="User Master"
                  typoTitle="Edit User"
                  level={2}
                />
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <div style={{ marginLeft: 10, marginTop: 1 }}>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Action Menu Button group"
                >
                  <Button
                    className="action-btns"
                    onClick={handleUpdate}
                    disabled={this.state.DisableUpdatebtn}
                  >
                    {APIURLS.buttonTitle.update}
                  </Button>
                  <Button
                    className="action-btns"

                    onClick={(e)=>openDialog("AssignBranch")}
                  >
                    ASSIGN BRANCH
                  </Button>
                  <Button
                    className="action-btns"

                    onClick={(e)=>openDialog("AssignRole")}
                  >
                    ASSIGN ROLE
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

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
                          label="First Name"
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
                              key="isadminswitch"
                              size="small"
                              checked={
                                this.state.IsAdmin
                                  ? this.state.IsAdmin === true
                                    ? "checked"
                                    : "unchecked"
                                  : null
                              }
                              onChange={(e) => updateFormValue("isAdmin", e)}
                            />
                          </TableCell>
                        </TableRow>
                        <TableRow>
                          <TableCell align="left" className="no-border-table">
                            is Active?
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            {this.state.isActive === true ? (
                              <Switch
                                key="isactiuveswitch"
                                size="small"
                                checked={
                                  this.state.IsActive === true
                                    ? "checked"
                                    : "unchecked"
                                }
                                onChange={(e) => updateFormValue("isActive", e)}
                              />
                            ) : (
                              <Switch
                                key="isactiuveswitch"
                                size="small"
                                checked={false}
                                onChange={(e) => updateFormValue("isActive", e)}
                              />
                            )}
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
        {dialog}
      </Fragment>
    );
  }
}
export default edituser;
