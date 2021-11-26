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
import Userbranchalot from "../branch/userbranchalot";
import Usermoduleassign from "../modules/usermoduleassign";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";
import BackdropLoader from "../../compo/backdrop";


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
      userBranchMappingList:[],
      oldEMAILID: "",
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
      user: {
        CreationDate: "",
        EmailID: "",
        FirstName: "",
        IsActive: true,
        IsAdmin: true,
        LastName: "",
        LoginID: "",
        Password: "",
        UserID: 0
        // UserID: 0,
        // LoginID: null,
        // Password: null,
        // FirstName: null,
        // LastName: null,
        // EmailID: null,
        // isActive: null,
        // IsAdmin: false,
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
        this.getUserBranches(parseInt(userId))
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
        user.IsActive = data.isActive;
        user.IsAdmin = data.isAdmin;


        this.setState({
          oldEMAILID: data.emailId,
          user: data,
          country: data,
          LoginID: data.loginId,
          Password: data.password,
          FirstName: data.firstName,
          LastName: data.lastName,
          EmailID: data.emailId,
          IsAdmin: data.isAdmin,
          isActive: data.isActive,
          ProgressLoader: true,
          DisableUpdatebtn:false,
        });
      })
      .catch((error) => {});
  }

  getUserBranches(userId) {
    let userBranches = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let data = {
      ValidUser: ValidUser,
      UserID: userId,
      userBranchMappingList: null,
    };
    let GetUserBranchMappedByUserIDUrl =
      APIURLS.APIURL.GetUserBranchMappedByUserID;

    axios
      .post(GetUserBranchMappedByUserIDUrl, data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ userBranchMappingList: data.userBranchMappingList });
        this.processData(data.userBranchMappingList, userId);
      })
      .catch((error) => {});
    return userBranches;
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
    
    const updateFormValue = (id, e) => {
      if (id === "IsActive") {
        let user = this.state.user;
        user.IsActive = e.target.checked;
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
        // CheckFirstName();
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
        // CheckFirstName();
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
        // CheckFirstName();
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
        // CheckFirstName();
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

      if (id === "IsAdmin"){
        let user = this.state.user;
        user.IsAdmin=e.target.checked
        this.setState({user:user,IsAdmin:e.target.checked})
      }
      if (id === "isActive"){
        let user = this.state.user;
        user.isActive=e.target.checked
        this.setState({user:user,isActive:e.target.checked})
      }
      // CheckFirstName();
      // this.state.duplicateExist === true
      //   ? this.setState({ DisableUpdatebtn: true })
      //   : this.setState({ DisableUpdatebtn: false });
    };

    const handleUpdate = () => {
      // CheckFirstName();
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
            style={{ maxHeight: 90 }}
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

    const userBranch = <Userbranchalot UserID={this.state.user.UserID} />;

    const userModuleAssign=<Usermoduleassign data={{userId:this.state.user.UserID,List:this.state.userBranchMappingList}}   />

    

    const openDialog = (param) => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = true;
      Dialog.DialogTitle = param;

      switch (param) {
        case "Assign Branch":
          Dialog.DialogContent = userBranch;
          this.setState({ Dialog: Dialog });
          break;
        case "Assign Role":
           Dialog.DialogContent = userModuleAssign;
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.userMaster + this.state.urlparams}
          masterLinkTitle="User Master"
          typoTitle="Edit User"
          level={2}
        />
      </Fragment>
    );

    const buttongroupHtml = (
      <Fragment>
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="Action Menu Button group"
        >
          <Button
            startIcon={APIURLS.buttonTitle.save.icon}
            className="action-btns"
            onClick={handleUpdate}
            disabled={this.state.DisableUpdatebtn}
          >
            {APIURLS.buttonTitle.save.name}
          </Button>
          <Button
            startIcon={APIURLS.buttonTitle.assignBranch.icon}
            className="action-btns"
            onClick={(e) => openDialog("Assign Branch")}
          >
           {APIURLS.buttonTitle.assignBranch.name}
          </Button>
          <Button
           startIcon={APIURLS.buttonTitle.assignRole.icon}
            className="action-btns"
            onClick={(e) => openDialog("Assign Role")}
          >
             {APIURLS.buttonTitle.assignRole.name}
            
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <BackdropLoader open={!this.state.ProgressLoader} />
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

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
              <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                            isMandatory={true}
                            id="FirstName"
                            label="First Name"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("FirstName", e)}
                            value={this.state.user.FirstName}
                            error={this.state.Validations.FirstName.errorState}
                          />
                          <SIB
                           
                            id="LastName"
                            label="LastName"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("LastName", e)}
                            value={this.state.user.LastName}
                            error={this.state.Validations.LastName.errorState}
                          />
                          <SIB
                           
                           id="EmailID"
                           label="EmailID"
                           variant="outlined"
                           size="small"
                           onChange={(e) => updateFormValue("EmailID", e)}
                           value={this.state.user.EmailID}
                           error={this.state.Validations.EmailID.errorState}
                         />
                         <SIB
                           
                           id="LoginID"
                           label="LoginID"
                           variant="outlined"
                           size="small"
                           onChange={(e) => updateFormValue("LoginID", e)}
                           value={this.state.user.LoginID}
                           error={this.state.Validations.LoginID.errorState}
                         />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                           type="password"
                            id="Password"
                            label="Password"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Password", e)}
                            value={this.state.user.Password}
                            error={this.state.Validations.Password.errorState}
                          />
                          <SSIB
                                key="isAdmin"
                                id="isAdmin"
                                label="isAdmin"
                                param={this.state.user.IsAdmin}
                                onChange={(e) => updateFormValue("IsAdmin", e)}
                              />
                               <SSIB
                                key="isActive"
                                id="IsActive"
                                label="Active"
                                param={this.state.user.IsActive}
                                onChange={(e) => updateFormValue("IsActive", e)}
                              />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
                
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
        {dialog}
      </Fragment>
    );
  }
}
export default edituser;
