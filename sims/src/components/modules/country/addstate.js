import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";



import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

import Button from "@material-ui/core/Button";

import ButtonGroup from "@mui/material/ButtonGroup";
import "../../user/dasboard.css";

import * as CF from "../../../services/functions/customfunctions";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import BackdropLoader from "../../compo/backdrop";


class addstate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: false,
      GeneralDetailsExpanded: true,
      stateData: [],
      state: {
        StateId: 0,
        CountryId: 0,
        CreationDate: "",
        Name: "",
        Code: "",
        Gstcode: "",
        UserId: 0,
      },
      code: null,
      country: null,
      countryId: null,
      creationDate: null,
      gstcode: null,
      name: null,
      StateId: null,
      countryData: [],
      CountryID: 0,
      ErrorMessageProps:"",
      ErrorPrompt: false,
      SuccessPrompt: false,
      disableCreateBtn: true,
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
    let CountryID=url.searchParams.get("CountryID");
    let urlparams =params;
      // "?branchId=" +
      // branchId +
      // "&compName=" +
      // compName +
      // "&branchName=" +
      // branchName;

      let state=this.state.state;
      state.CountryId=parseInt(CountryID);
    this.setState({
      urlparams: urlparams,
      state:state,
      CountryID:parseInt(CountryID)
    });
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
        console.log("getStateList > ", data);
        rows = data;
        this.setState({ stateData: data, ProgressLoader: true });
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
        console.log("country list > ", data);

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

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };

   

  isProperData = () => {
    let state = this.state.state;
    let isProperData = false;




    if (
      state.Name != "" &&
      state.Code != "" &&
      
      
      parseInt(state.CountryId) > 0

    ) {
      isProperData = true;
    } else {
      isProperData = false;
      this.setState({ ErrorMessageProps: "Incomplete Data", ErrorPrompt: true });
      return false;
    }
    return isProperData;
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
        this.state.name.length > 50
      ) {
        this.setState({ disableCreateBtn: true });
      } else {
        this.setState({ disableCreateBtn: false });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.stateData,
          "name",
          e.target.value
        );
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
            v.Name = {
              errorState: true,
              errorMsg: "State with same name already exist!",
            };
            this.setState({
              Validations: v,
              name: e.target.value,
              disableCreateBtn: true,
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
              disableCreateBtn: true,
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
              name: e.target.value,
              disableCreateBtn: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.Name = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disableCreateBtn: false,
            name: e.target.value,
            state: state,
          });
        }
      }
      if (id === "Code") {
        let state = this.state.state;
        state.Code = e.target.value;

        if (e.target.value.length > 5) {
          let v = this.state.Validations;
          v.Code = { errorState: true, errorMsg: "Only 5 numbers are allowed" };
          this.setState({
            Validations: v,
            disableCreateBtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.Code = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disableCreateBtn: false,
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

    const handleCreate = () => {
      let isProperData=false;
       isProperData=this.isProperData();
      if(isProperData===true){
        let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let state = this.state.state;
      state.UserId = parseInt(getCookie(COOKIE.USERID));
      state.CountryId = parseInt(document.getElementById("CountryID").value);
      const handleCreateData = {
        validUser: ValidUser,
        state: state,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let CreateStateUrl = APIURLS.APIURL.CreateState;

      axios
        .post(CreateStateUrl, handleCreateData, { headers })
        .then((response) => {
          let data = response.data;
      
          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            this.openPage(URLS.URLS.stateMaster + this.state.urlparams);
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        });
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
          masterHref={URLS.URLS.stateMaster + this.state.urlparams}
          masterLinkTitle="State"
          typoTitle="Add"
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
            disabled={this.state.disableCreateBtn}
            onClick={handleCreate}
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
          ErrorMessageProps={this.state.ErrorMessageProps}
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
                key="AS-1"
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
                <Typography key="typo-1" className="accordion-Header-Title">
                  General 
                </Typography>
              </AccordionSummary>
              <AccordionDetails key="Ac-1" className="AccordionDetails-css">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                            isMandatory={true}
                            id="Name"
                            label="Name"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Name", e)}
                            value={this.state.state.Name}
                            error={this.state.Validations.Name.errorState}
                          />
                          <SIB
                           isMandatory={true}
                            id="Code"
                            label="Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Code", e)}
                            value={this.state.state.Code}
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
                            value={this.state.state.Gstcode}
                            error={this.state.Validations.Gstcode.errorState}
                          />
                          <SDIB
                            isMandatory={true}
                            id="CountryID"
                            label="Country"
                            size="small"
                            onChange={(e) => updateFormValue("CountryID", e)}
                            value={this.state.state.CountryId}
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
        </Grid>
      </Fragment>
    );
  }
}
export default addstate;
