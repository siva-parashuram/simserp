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
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import Switch from "@mui/material/Switch";
import ButtonGroup from "@mui/material/ButtonGroup";
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
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";
import BackdropLoader from "../../compo/backdrop";


class adduser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duplicate: false,
      users: [],
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorMessageProps: "",
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisabledCreatebtn: true,

      user: {
        UserID: 0,
        LoginID: "",
        Password: "",
        FirstName: "",
        LastName: "",
        EmailID: "",
        IsAdmin: false,
        isActive: true,
      },
      UserID: 0,
      LoginID: "",
      Password: "",
      FirstName: "",
      LastName: "",
      EmailID: "",
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
      .catch((error) => { });
  }


  validateData = () => {
    let validate = false;
    let user = this.state.user;

    if (
      user.LoginID === "" || user.LoginID.length < 5 ||
      user.Password === "" || user.Password.length < 5 ||
      user.FirstName === "" ||
      user.EmailID === ""
    ) {
      validate = false;
      

      if (user.LoginID === "" || user.LoginID.length < 5) {
        let v = this.state.Validations;
        v.LoginID = {
          errorState: true,
          errorMssg: "",
        };
        this.setState({
          Validations: v,
        });
      }
      if (user.Password === "" || user.Password.length < 5) {
        let v = this.state.Validations;
        v.Password = {
          errorState: true,
          errorMssg: "",
        };
        this.setState({
          Validations: v,
        });
      }
      if (user.FirstName === "") {
        let v = this.state.Validations;
        v.FirstName = {
          errorState: true,
          errorMssg: "",
        };
        this.setState({
          Validations: v,
        });
      }
      if (user.EmailID === "") {
        let v = this.state.Validations;
        v.EmailID = {
          errorState: true,
          errorMssg: "Email  Already exist!",
        };
        this.setState({
          Validations: v,
        });
      }

     

    } else {
      validate = true;
    }

    return validate;
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
            this.setState({
              Validations: v,
              DisabledCreatebtn: true,
            });
          }
          if (e.target.value === "" || e.target.value === null) {
            v.FirstName = {
              errorState: true,
              errorMssg: "FirstName cannot be blank!",
            };
            this.setState({
              Validations: v,
              DisabledCreatebtn: true,
              FirstName: e.target.value,
            });
          }
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
            DisabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.LastName = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            DisabledCreatebtn: false,
            LastName: e.target.value,
            user: user,
          });
        }
      }
      if (id === "EmailID") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.users,
          "EmailID",
          e.target.value
        );
        let user = this.state.user;
        user.EmailID = e.target.value;
        if (e.target.value.length > 50 || duplicateExist === true) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.EmailID = {
              errorState: true,
              errorMssg: "Email with same name already exist!",
            };
            this.setState({
              Validations: v,
              EmailID: e.target.value,
              DisabledCreatebtn: true,
              duplicate: true,
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
              DisabledCreatebtn: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.EmailID = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            DisabledCreatebtn: false,
            duplicateExist: false,
            EmailID: e.target.value,
            user: user,
          });
        }
      }
      if (id === "LoginID") {
        let user = this.state.user;
        user.LoginID = e.target.value;
        let duplicateLoginIDExist = CF.chkDuplicateName(
          this.state.users,
          "LoginID",
          user.LoginID
        );
        console.log("duplicateLoginIDExist > ", duplicateLoginIDExist);
        if (duplicateLoginIDExist === false) {
          if (e.target.value.length > 10 || e.target.value.length < 5) {
            let v = this.state.Validations;
            v.LoginID = {
              errorState: true,
              errorMssg: "",
            };
            this.setState({
              Validations: v,
              DisabledCreatebtn: true
            });
          } else {
            let v = this.state.Validations;
            v.LoginID = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v,
              LoginID: e.target.value,
              user: user,
              DisabledCreatebtn: false
            });
          }
        } else {
          let v = this.state.Validations;
          v.LoginID = {
            errorState: true,
            errorMssg: "",
          };
          this.setState({
            Validations: v,
            DisabledCreatebtn: true
          });
        }

      }

      if (id === "Password") {
        let user = this.state.user;
        user.Password = e.target.value;

        if (e.target.value.length > 10 || e.target.value.length < 5) {
          let v = this.state.Validations;
          v.Password = {
            errorState: true,
            errorMssg: "",
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
      if (id === "IsAdmin") {
        let user = this.state.user;
        user.IsAdmin = e.target.checked
        this.setState({ user: user, IsAdmin: e.target.checked })
      }
      if (id === "isActive") {
        let user = this.state.user;
        user.isActive = e.target.checked
        this.setState({ user: user, isActive: e.target.checked })
      }

      this.state.duplicate === true
        ? this.setState({ DisabledCreatebtn: true })
        : this.setState({ DisabledCreatebtn: false });
    };

    const handleCreate = () => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let user = this.state.user;

      let validate = this.validateData();

      if (validate === true) {
        const handleCreateData = {
          validUser: ValidUser,
          users: user,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        let AddUserUrl = APIURLS.APIURL.AddUser;

        axios
          .post(AddUserUrl, handleCreateData, { headers })
          .then((response) => {
            let data = response.data;

            if (response.status === 200 || response.status === 201) {
              this.setState({ ProgressLoader: true, SuccessPrompt: true }, () => {
                window.location = URLS.URLS.userMaster + this.state.urlparams;
              });

            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true, ErrorMessageProps: "" });
            }
          })
          .catch((error) => {
            this.setState({ ProgressLoader: true, ErrorPrompt: true, ErrorMessageProps: "" });
          });
      } else {
        this.setState({ ProgressLoader: true, ErrorPrompt: true, ErrorMessageProps: "Incorrect Inputs" });
      }


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
          masterLinkTitle="User"
          typoTitle="Add User"
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
            className="action-btns"
            startIcon={APIURLS.buttonTitle.save.icon}
            onClick={handleCreate}
            disabled={this.state.DisabledCreatebtn}
          >
            {APIURLS.buttonTitle.save.name}
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
          ErrorMessageProps={this.state.ErrorMessageProps}
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
          <Grid xs={12} sm={12} md={8} lg={8}>
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
                  General
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
                            label="Last Name"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("LastName", e)}
                            value={this.state.user.LastName}
                            error={this.state.Validations.LastName.errorState}
                          />

                          <SIB
                            isMandatory={true}
                            id="LoginID"
                            label="Login ID"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("LoginID", e)}
                            value={this.state.user.LoginID}
                            error={this.state.Validations.LoginID.errorState}
                          />
                          <SIB
                            isMandatory={true}
                            type="password"
                            id="Password"
                            label="Password"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Password", e)}
                            value={this.state.user.Password}
                            error={this.state.Validations.Password.errorState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                            isMandatory={true}
                            id="EmailID"
                            label="Email"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("EmailID", e)}
                            value={this.state.user.EmailID}
                            error={this.state.Validations.EmailID.errorState}
                          />

                          <SSIB
                            key="isAdmin"
                            id="isAdmin"
                            label="Is Admin?"
                            param={this.state.user.IsAdmin}
                            onChange={(e) => updateFormValue("IsAdmin", e)}
                          />
                          <SSIB
                            key="isActive"
                            id="isActive"
                            label="Is Active?"
                            param={this.state.user.isActive}
                            onChange={(e) => updateFormValue("isActive", e)}
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

      </Fragment>
    );
  }
}
export default adduser;
