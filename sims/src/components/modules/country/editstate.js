import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Button from "@material-ui/core/Button";

import ButtonGroup from "@mui/material/ButtonGroup";
import "../../user/dasboard.css";

import * as CF from "../../../services/functions/customfunctions";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import BackdropLoader from "../../compo/backdrop";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";

import Destination from "./destination";

class editstate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: false,
      GeneralDetailsExpanded: true,

      state: {
        stateId: 0,
        CountryId: 0,
        CreationDate: "",
        Name: "",
        Code: "",
        Gstcode: "",
        UserId: 0,
      },
      code: "",
      country: "",
      countryId: "",
      creationDate: "",
      gstcode: "",
      name: "",
      stateData: [],
      oldName: "",
      StateId: 0,
      countryData: [],
      CountryID: 0,
      Destinations:[],
      ErrorPrompt: false,
      SuccessPrompt: false,
      disableUpdateBtn: false,
      duplicate: false,
      Validations: {
        Name: { errorState: false, errorMsg: "" },
        Gstcode: { errorState: false, errorMsg: "" },
        Code: { errorState: false, errorMsg: "" },
      },
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getStateList();
    this.getCountryList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let StateId = url.searchParams.get("StateId");

    let urlparams =params;
      // "?branchId=" +
      // branchId +
      // "&compName=" +
      // compName +
      // "&branchName=" +
      // branchName;
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
    let GetSateUrl = APIURLS.APIURL.GetState;

    axios
      .post(GetSateUrl, getStateDetailsData, { headers })
      .then((response) => {
        let data = response.data;
        console.log("StateData>>", data);
        this.setState({
          oldName: data.Name,
          state: data,
          code: data.Code,
          country: data.country,
          countryId: data.CountryID,
          creationDate: data.CreationDate,
          gstcode: data.GSTCode,
          name: data.Name,
          Destinations:data.Destinations,
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
        name: data[i].Name,
        value: data[i].CountryID,
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
            v.Name = { errorState: true, errorMsg: "State already exist" };
            this.setState({
              Validations: v,
              name: e.target.value,
              disableUpdateBtn: true,
            });
          }
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.Name = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v,
              disableUpdateBtn: true,
            });
          }
          if (e.target.value === "" || e.target.value == null) {
            let v = this.state.Validations;
            v.Name = {
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
          v.Name = { errorState: false, errorMsg: "" };
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
          v.Code = { errorState: true, errorMsg: "Only 5 numbers are allowed" };
          this.setState({
            Validations: v,
            disableUpdateBtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.Code = { errorState: false, errorMsg: "" };
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
          v.Gstcode = {
            errorState: true,
            errorMsg: "Only 2 numbers are allowed",
          };
          this.setState({
            Validations: v,
            gstcode: e.target.value,
            disableCreateBtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.Gstcode = { errorState: false, errorMsg: "" };
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
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let state = this.state.state;
      const handleUpdateData = {
        validUser: ValidUser,
        state: {
          stateId:parseInt(this.state.StateId),
          countryId:parseInt(this.state.countryId),
          name:this.state.name,
          code:this.state.code,
          gstcode:this.state.gstcode,
          creationDate:"",
          userId:parseInt(getCookie(COOKIE.USERID)),
        },
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateStateUrl = APIURLS.APIURL.UpdateState;

      axios
        .post(UpdateStateUrl, handleUpdateData, { headers })
        .then((response) => {
          let data = response.data;
          console.log("dataState>>", data);
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.stateMaster + this.state.urlparams}
          masterLinkTitle="State"
          typoTitle="Edit"
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
            onClick={handleUpdate}
            disabled={this.state.disableUpdateBtn}
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
                            id="Name"
                            label="State Name"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Name", e)}
                            value={this.state.name}
                            error={this.state.Validations.Name.errorState}
                          />
                          <SIB
                            id="Code"
                            label="Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Code", e)}
                            value={this.state.code}
                            error={this.state.Validations.Code.errorState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                           onKeyDown={ e => ( e.keyCode === 69 || e.keyCode === 190 || e.key == "." || e.key == "-" ) && e.preventDefault() }
                           type="number"
                            id="GSTCode"
                            label="GST Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("GSTCode", e)}
                            value={this.state.gstcode}
                            error={this.state.Validations.Gstcode.errorState}
                          />
                          <SDIB
                            id="CountryID"
                            label="Country"
                            size="small"
                            onChange={(e) => updateFormValue("CountryID", e)}
                            value={this.state.countryId}
                            param={this.state.countryData}
                          />
                        </Grid>
                      </Grid>
                    </div>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={1} lg={1}></Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Grid container spacing={0}>
                  <Grid xs={12} sm={12} md={11} lg={11}>
                    <Destination destinations={this.state.Destinations} CountryID={this.state.countryId} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default editstate;
