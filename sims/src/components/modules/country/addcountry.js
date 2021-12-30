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
import DropdownInput from "../../compo/Tablerowcelldropdown";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";

import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as CF from "../../../services/functions/customfunctions";

import "../../user/dasboard.css";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";

class addcountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: false,
      GeneralDetailsExpanded: true,
      DisableCreatebtn: true,
      Validations: {
        Name: { errorState: false, errorMssg: "" },
        TwoDitgitCode: { errorState: false, errorMssg: "" },
        ThreeDitgitCode: { errorState: false, errorMssg: "" },
      },
      country: {
        CountryId: 0,
        CreationDate: null,
        Name: "",
        ThreeDitgitCode: "",
        TwoDitgitCode: "",
        ZoneID: 0,
        UserID: 0,
      },
      Name: "",
      ThreeDitgitCode: "",
      TwoDitgitCode: "",
      zones: [],
      countryData: [],
      selectedZone: null,
      ErrorPrompt: false,
      SuccessPrompt: false,
      duplicate: false,
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getZones();
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
    this.setState({
      urlparams: params,
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

        rows = data;
        this.setState({
          countryData: rows,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
  }

  initializeZone() {
    let country = this.state.country;
    country.ZoneID = document.getElementById("ZoneID").value;
    this.setState({
      country: country,
      selectedZone: document.getElementById("ZoneID").value,
    });
  }

  getZones() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetZonesUrl = APIURLS.APIURL.GetZones;

    axios
      .post(GetZonesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        this.processZones(data);
        this.initializeZone();
      })
      .catch((error) => {});
  }

  processZones(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].description,
        value: data[i].zoneId,
      };
      newData.push(d);
    }
    this.setState({ zones: newData, ProgressLoader: true });
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

    const CheckName = () => {
      if (
        this.state.Name === "" ||
        this.state.Name === null ||
        this.state.Name.length > 50 ||
        this.state.duplicate === true
      ) {
        this.setState({ DisableCreatebtn: true });
      } else {
        this.setState({ DisableCreatebtn: false });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.countryData,
          "name",
          e.target.value
        );
        let country = this.state.country;
        country.Name = e.target.value;
        if (
          e.target.value === "" ||
          e.target.value === null ||
          e.target.value.length > 50 ||
          duplicateExist === true
        ) {
          let v = this.state.Validations;
          if (duplicateExist === true) {
            v.Name = {
              errorState: true,
              errorMssg: "Country Master Exists",
            };
            this.setState({
              Validations: v,
              DisableCreatebtn: true,
              Name: e.target.value,
              duplicate: true,
            });
          }
          if (e.target.value.length > 50) {
            v.Name = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({
              Validations: v,
              DisableCreatebtn: true,
            });
          }
          if (e.target.value === "" || e.target.value === null) {
            v.Name = { errorState: true, errorMssg: "Name cannot be blank" };
            this.setState({
              Validations: v,
              DisableCreatebtn: true,
              Name: e.target.value,
            });
          }
        } else {
          let v = this.state.Validations;
          v.Name = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({
            Validations: v,
            DisableCreatebtn: false,
            Name: e.target.value,
            country: country,
          });
        }
      }
      if (id === "TwoDitgitCode") {
        let country = this.state.country;
        country.TwoDitgitCode = e.target.value;
        if (e.target.value.length > 2) {
          let v = this.state.Validations;
          v.TwoDitgitCode = {
            errorState: true,
            errorMssg: "Maximum 2 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.TwoDitgitCode = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({
            Validations: v,
            TwoDitgitCode: e.target.value,
            country: country,
          });
        }
        CheckName();
      }
      if (id === "ThreeDitgitCode") {
        let country = this.state.country;
        country.ThreeDitgitCode = e.target.value;
        if (e.target.value.length > 3) {
          let v = this.state.Validations;
          v.ThreeDitgitCode = {
            errorState: true,
            errorMssg: "Maximum 3 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.ThreeDitgitCode = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({
            Validations: v,
            ThreeDitgitCode: e.target.value,
            country: country,
          });
        }
        CheckName();
      }
      if (id === "ZoneID") {
        let country = this.state.country;
        country.ZoneID = e.target.value;

        this.setState({ country: country, selectedZone: e.target.value });
      }
    };

    const handleCreate = () => {
      CheckName();
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let country = this.state.country;
      const handleCreateData = {
        validUser: ValidUser,
        country: country,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let CreateCountryUrl = APIURLS.APIURL.CreateCountry;

      axios
        .post(CreateCountryUrl, handleCreateData, { headers })
        .then((response) => {
          let data = response.data;
          if (response.status === 200 || response.status === 201) {
            this.setState({ SuccessPrompt: true });
          } else {
            this.setState({ ErrorPrompt: true });
          }
        })
        .catch((error) => {
          this.setState({ ErrorPrompt: true });
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.countryMaster + this.state.urlparams}
          masterLinkTitle="Country Master"
          typoTitle="Add Country"
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
            disabled={this.state.DisableCreatebtn}
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
                            id="Name"
                            label="Country Name"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Name", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 50,
                            }}
                            value={this.state.Name}
                            error={this.state.Validations.Name.errorState}
                          />

                          <SIB
                            id="TwoDitgitCode"
                            label="Two Digit Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                              updateFormValue("TwoDitgitCode", e)
                            }
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 20,
                            }}
                            value={this.state.TwoDitgitCode}
                            error={
                              this.state.Validations.TwoDitgitCode.errorState
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                            id="ThreeDitgitCode"
                            label="Three Digit Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                              updateFormValue("ThreeDitgitCode", e)
                            }
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 20,
                            }}
                            value={this.state.ThreeDitgitCode}
                            error={
                              this.state.Validations.ThreeDitgitCode.errorState
                            }
                           
                          />
                          <SDIB
                            id="ZoneID"
                            label="Zone"
                            onChange={(e) => updateFormValue("ZoneID", e)}
                            param={this.state.zones}
                            value={this.state.selectedZone}
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
export default addcountry;
