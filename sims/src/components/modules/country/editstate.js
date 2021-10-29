import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import DropdownInput from "../../compo/Tablerowcelldropdown";

import Button from "@material-ui/core/Button";

import UpdateIcon from "@material-ui/icons/Update";
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

class editstate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: false,
      GeneralDetailsExpanded: true,

      state: {
        StateId: null,
        CountryId: 0,
        CreationDate: null,
        Name: null,
        Code: null,
        Gstcode: null,
        UserId: null,
      },
      code: null,
      country: null,
      countryId: null,
      creationDate: null,
      gstcode: null,
      name: null,
      stateData: [],
      oldName: "",
      StateId: null,
      countryData: [],
      CountryID: null,
      ErrorPrompt: false,
      SuccessPrompt: false,
      disableUpdateBtn: true,
      duplicate: false,
      Validations: {
        name: { errorState: false, errorMsg: "" },
        gstcode: { errorState: false, errorMsg: "" },
        code: { errorState: false, errorMsg: "" },
      },
    };
  }

  componentDidMount() {
    this.getStateList();
    this.getCountryList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let StateId = url.searchParams.get("StateId");

    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    this.setState(
      {
        urlparams: urlparams,
        StateId: StateId,
      },
      () => {
        this.getState();
      }
    );
  }

  getStateList() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetStatesUrl = APIURLS.APIURL.GetStates;

    axios
      .post(GetStatesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        rows = data;
        this.setState({ stateData: rows, ProgressLoader: true });
      })
      .catch((error) => {});
  }

  getState() {
    let state = this.state.state;
    state.StateId = parseInt(this.state.StateId);
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const getStateDetailsData = {
      validUser: ValidUser,
      state: state,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    let GetSateUrl = APIURLS.APIURL.GetSate;

    axios
      .post(GetSateUrl, getStateDetailsData, { headers })
      .then((response) => {
        let data = response.data;

        this.setState({
          oldName: data.name,
          state: data,
          code: data.code,
          country: data.country,
          countryId: data.countryId,
          creationDate: data.creationDate,
          gstcode: data.gstcode,
          name: data.name,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
  }

  getCountryList() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCountryUrl = APIURLS.APIURL.GetCountries;

    axios
      .post(GetCountryUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        rows = data;
        this.getStateList();
        this.processCountryData(data);
      })
      .catch((error) => {});
  }

  processCountryData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].name,
        value: data[i].countryId,
      };
      newData.push(d);
    }
    this.setState({ countryData: newData, ProgressLoader: true });
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

    const checkName = () => {
      if (
        this.state.name === "" ||
        this.state.name == null ||
        this.state.name.length > 50 ||
        this.state.duplicate === true
      ) {
        this.setState({ disableUpdateBtn: true });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateButExcludeName(
          this.state.stateData,
          "name",
          this.state.oldName,
          e.target.value
        );
        this.setState({ duplicate: duplicateExist });
        let state = this.state.state;
        state.Name = e.target.value;

        if (
          e.target.value === "" ||
          e.target.value == null ||
          e.target.value.length > 50 ||
          duplicateExist === true
        ) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.name = { errorState: true, errorMsg: "State already exist" };
            this.setState({
              Validations: v,
              name: e.target.value,
              disableUpdateBtn: true,
            });
          }
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.name = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v,
              disableUpdateBtn: true,
              name: e.target.value,
            });
          }
          if (e.target.value === "" || e.target.value == null) {
            let v = this.state.Validations;
            v.name = {
              errorState: true,
              errorMsg: "State Name Cannot be blank",
            };
            this.setState({
              Validations: v,
              disableUpdateBtn: true,
              name: e.target.value,
            });
          }
        } else {
          let v = this.state.Validations;
          v.name = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disableUpdateBtn: false,
            name: e.target.value,
            state: state,
          });
        }
        checkName();
      }
      if (id === "Code") {
        let state = this.state.state;
        state.Code = e.target.value;

        if (e.target.value.length > 5) {
          let v = this.state.Validations;
          v.code = { errorState: true, errorMsg: "Only 5 numbers are allowed" };
          this.setState({
            Validations: v,
            disableUpdateBtn: true,
            code: e.target.value,
          });
        } else {
          let v = this.state.Validations;
          v.code = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disableUpdateBtn: false,
            code: e.target.value,
            state: state,
          });
        }
        checkName();
      }

      if (id === "GSTCode") {
        let state = this.state.state;
        state.Gstcode = e.target.value;

        if (e.target.value.length > 2) {
          let v = this.state.Validations;
          v.gstcode = {
            errorState: true,
            errorMsg: "Only 2 numbers are allowed",
          };
          this.setState({
            Validations: v,
            disableCreateBtn: true,
            gstcode: e.target.value,
          });
        } else {
          let v = this.state.Validations;
          v.gstcode = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disableCreateBtn: false,
            gstcode: e.target.value,
            state: state,
          });
        }
        checkName();
      }

      if (id === "CountryID") {
        let state = this.state.state;
        state.CountryId = e.target.value;
        this.setState({
          CountryID: e.target.value,
          countryId: e.target.value,
          state: state,
        });
      }
    };

    const handleUpdate = () => {
      checkName();
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let state = this.state.state;
      const handleUpdateData = {
        validUser: ValidUser,
        state: state,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateStateUrl = APIURLS.APIURL.UpdateState;

      axios
        .post(UpdateStateUrl, handleUpdateData, { headers })
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
                  masterHref={URLS.URLS.stateMaster + this.state.urlparams}
                  masterLinkTitle="State Master"
                  typoTitle="Edit State"
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
                    startIcon={<UpdateIcon />}
                    onClick={handleUpdate}
                    disabled={this.state.disableUpdateBtn}
                  >
                    Update
                  </Button>
                </ButtonGroup>
              </div>
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
                          id="Name"
                          label="State Name"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Name", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.name}
                          error={this.state.Validations.name.errorState}
                          helperText={this.state.Validations.name.errorMsg}
                        />
                        <Tablerowcelltextboxinput
                          id="Code"
                          label="Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Code", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 5,
                          }}
                          value={this.state.code}
                          error={this.state.Validations.code.errorState}
                          helperText={this.state.Validations.code.errorMsg}
                        />
                        <Tablerowcelltextboxinput
                          id="GSTCode"
                          label="GST Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("GSTCode", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 2,
                          }}
                          value={this.state.gstcode}
                          error={this.state.Validations.gstcode.errorState}
                          helperText={this.state.Validations.gstcode.errorMsg}
                        />

                        <DropdownInput
                          id="CountryID"
                          label="Country"
                          onChange={(e) => updateFormValue("CountryID", e)}
                          options={this.state.countryData}
                          value={this.state.countryId}
                        />

                        
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
export default editstate;
