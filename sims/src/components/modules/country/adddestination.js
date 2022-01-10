import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableRow from "@material-ui/core/TableRow";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";
import * as CF from "../../../services/functions/customfunctions";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Select from "@material-ui/core/Select";

import ButtonGroup from "@mui/material/ButtonGroup";
import DropdownInput from "../../compo/Tablerowcelldropdown";

import Destination from "./destination";

import "../../user/dasboard.css";

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


class adddestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      GeneralDetailsExpanded: true,
      ProgressLoader: true,
      destinations: [],
      ErrorMessageProps:"",
      ErrorPrompt: false,
      SuccessPrompt: false,
      countryData: [],
      stateData: [],
      destinationName: null,
      postcode: null,
      stateId: 0,
      countryId: 0,
      DisabledCreatebtn: true,
      Validations: {
        destinationName: { errorState: false, errorMssg: "" },
        postcode: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getAllDestinations();
    this.getCountryList();
    this.getStateList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let CountryID=url.searchParams.get("CountryID");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    this.setState({
      urlparams: params,
      countryId:parseInt(CountryID)
    });
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
        this.processCountryData(data);
        rows = data;
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
       this. processstateData(data)
      })
      .catch((error) => {});
  }

  processstateData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i]. name,
        value: data[i].stateId,
      };
      newData.push(d);
    }
    this.setState({ stateData: newData, ProgressLoader: true });
  }

  getAllDestinations = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    const headers = {
      "Content-Type": "application/json",
    };
    let GetDestinationsUrl = APIURLS.APIURL.GetDestinations;

    axios
      .post(GetDestinationsUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        this.setState({ destinations: data, ProgressLoader: true });
      })
      .catch((error) => {});
  };

  isProperData = () => {
    let isProperData = false;

    if (
      this.state.destinationName != "" &&
      this.state.postcode != "" &&
      parseInt(this.state.countryId) > 0
    ) {
      isProperData = true;
    } else {
      isProperData = false;
      this.setState({ErrorPrompt:true,ErrorMessageProps:"Improper Data"});
      
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

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.destinations,
          "destinationName",
          e.target.value
        );
        if (
          e.target.value === "" ||
          e.target.value === null ||
          e.target.value.length > 50 ||
          duplicateExist === true
        ) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.destinationName = {
              errorState: true,
              errorMssg: "Destination already exists",
            };
            this.setState({
              Validations: v,
              destinationName: e.target.value,
              DisabledCreatebtn: true,
            });
          }
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.destinationName = {
              errorState: true,
              errorMssg: "Maximum 50 characters are allowed",
            };
            this.setState({
              Validations: v,
              DisabledCreatebtn: true,
            });
          }
          if (e.target.value === "" || e.target.value === null) {
            let v = this.state.Validations;
            v.destinationName = {
              errorState: true,
              errorMssg: "Name cannot be blank",
            };
            this.setState({
              Validations: v,
              DisabledCreatebtn: true,
              destinationName: e.target.value,
            });
          }
        } else {
          let v = this.state.Validations;
          v.destinationName = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            DisabledCreatebtn: false,
            destinationName: e.target.value,
          });
        }
      }
      if (id === "PostCode") {
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.postcode = {
            errorState: true,
            errorMssg: "Maximum 20 characters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            postcode: e.target.value,
          });
        }
      }
      if (id === "CountryID") {
        this.setState({
          countryId: CF.toInt(e.target.value),
        });
      }
      if (id === "stateID") {
        console.log("stateID",e.target.value)
        this.setState({
          stateId: CF.toInt(e.target.value),
         
        });
      }
    };

    const addDestination = () => {

      let isProperData=false;
      isProperData=this.isProperData();
      
      if(isProperData===true){
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
  
        let data = {
          Destination: {
            DestinationId: 0,
            CountryId: parseInt(this.state.countryId),
            DestinationName: this.state.destinationName,
            stateId: parseInt(this.state.stateId),
            Postcode: this.state.postcode,
          },
          validUser: ValidUser,
        };
  
        const headers = {
          "Content-Type": "application/json",
        };
        let CreateDestinationUrl = APIURLS.APIURL.CreateDestination;
  
        axios
          .post(CreateDestinationUrl, data, { headers })
          .then((response) => {
            let data = response.data;
  
            if (response.status === 200 || response.status === 201) {
              this.setState({ ProgressLoader: true, SuccessPrompt: true });
              this.getAllDestinations();
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
              this.getAllDestinations();
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
          typoTitle="Add Destination"
          level={1}
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
            disabled={this.state.DisabledCreatebtn}
            onClick={addDestination}
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
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12} lg={12}>
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
                                label="Destination"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Name", e)}
                                value={this.state.destinationName}
                                error={
                                  this.state.Validations.destinationName
                                    .errorState
                                }
                              />
                              <SIB
                                id="PostCode"
                                label="PostCode"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("PostCode", e)}
                                value={this.state.postcode}
                                error={
                                  this.state.Validations.postcode.errorState
                                }
                              />
                               </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                               <SDIB
                            id="CountryID"
                            label="Country"
                            size="small"
                            onChange={(e) => updateFormValue("CountryID", e)}
                            value={this.state.countryId}
                            param={this.state.countryData}
                          />
                               <SDIB
                            id="stateID"
                            label="state"
                            size="small"
                            onChange={(e) => updateFormValue("stateID", e)}
                            value={this.state.stateId}
                            param={this.state.stateData}
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
          </Grid>

          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={1} lg={1}></Grid>
              <Grid xs={12} sm={12} md={10} lg={10}>
                <Destination destinations={this.state.destinations} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default adddestination;
