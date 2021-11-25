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

import MuiAlert from "@material-ui/lab/Alert";
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
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";

class editcountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: false,
      GeneralDetailsExpanded: true,
      DisableUpdatebtn: true,
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
      Name: null,
      ThreeDitgitCode: null,
      TwoDitgitCode: null,

      zones: [],
      selectedZone: null,
      ErrorPrompt: false,
      SuccessPrompt: false,
      countryData: [],
      duplicate: false,
      oldName: "",
    };
  }

  componentDidMount() {
    this.getCountryList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let countryID = url.searchParams.get("countryID");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let country = this.state.country;
    country.CountryId = parseInt(countryID);
    this.setState(
      {
        urlparams: urlparams,
        country: country,
      },
      () => {
        this.getCountry();
        this.getZones();
      }
    );
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

  getCountry() {
    let country = this.state.country;
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const getCountryDetailsData = {
      validUser: ValidUser,
      country: country,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCountryUrl = APIURLS.APIURL.GetCountry;

    axios
      .post(GetCountryUrl, getCountryDetailsData, { headers })
      .then((response) => {
        let data = response.data;
        console.log("DATA>>", data);
        this.setState({
          oldName: data.Name,
          country: data,
          selectedZone: data.zoneId,
          Name: data.Name,
          ThreeDitgitCode: data.ThreeDitgitCode,
          TwoDitgitCode: data.TwoDitgitCode,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
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
        this.setState({ DisableUpdatebtn: true });
      } else {
        this.setState({ DisableUpdatebtn: false });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateButExcludeName(
          this.state.countryData,
          "name",
          this.state.oldName,
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
              DisableUpdatebtn: true,
              Name: e.target.value,
              duplicate: true,
            });
          }
          if (e.target.value.length > 50) {
            v.Name = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
          }
          if (e.target.value === "" || e.target.value === null) {
            v.Name = { errorState: true, errorMssg: "Name cannot be blank" };
          }
          this.setState({
            Validations: v,
            DisableUpdatebtn: true,
            Name: e.target.value,
          });
        } else {
          let v = this.state.Validations;
          v.Name = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({
            Validations: v,
            DisableUpdatebtn: false,
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

    const handleUpdate = () => {
      CheckName();
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let country = this.state.country;
      const handleUpdateData = {
        validUser: ValidUser,
        country: country,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateCountryUrl = APIURLS.APIURL.UpdateCountry;

      axios
        .post(UpdateCountryUrl, handleUpdateData, { headers })
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.countryMaster + this.state.urlparams}
          masterLinkTitle="Country Master"
          typoTitle="Edit Country"
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
            disabled={this.state.DisableUpdatebtn}
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
                        label="Country Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("Name", e)}
                        InputProps={{
                          className: "textFieldCss",
                          maxlength: 50,
                        }}
                        value={this.state.country.Name}
                        error={this.state.Validations.Name.errorState}
                        helperText={this.state.Validations.Name.errorMssg}
                      />

                      <Tablerowcelltextboxinput
                        id="TwoDitgitCode"
                        label="Two Digit Code"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("TwoDitgitCode", e)}
                        InputProps={{
                          className: "textFieldCss",
                          maxlength: 20,
                        }}
                        value={this.state.country.TwoDitgitCode}
                        error={this.state.Validations.TwoDitgitCode.errorState}
                        helperText={
                          this.state.Validations.TwoDitgitCode.errorMssg
                        }
                      />

                      <Tablerowcelltextboxinput
                        id="ThreeDitgitCode"
                        label="Three Digit Code"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("ThreeDitgitCode", e)}
                        InputProps={{
                          className: "textFieldCss",
                          maxlength: 20,
                        }}
                        value={this.state.country.ThreeDitgitCode}
                        error={
                          this.state.Validations.ThreeDitgitCode.errorState
                        }
                        helperText={
                          this.state.Validations.ThreeDitgitCode.errorMssg
                        }
                      />
                      {/* <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>Country Name</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="Name"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Name', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}
                                                            value={this.state.Name}
                                                            error={this.state.Validations.countryName.errorState}
                                                            helperText={this.state.Validations.countryName.errorMsg}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> Two Digit Code</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="TwoDitgitCode"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('TwoDitgitCode', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 20
                                                            }}
                                                            value={this.state.TwoDitgitCode}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>Three Digit Code</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="ThreeDitgitCode"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('ThreeDitgitCode', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 20
                                                            }}
                                                            value={this.state.ThreeDitgitCode}
                                                        />
                                                    </TableCell>
                                                </TableRow> */}
                      {/* <TableRow>
                          <TableCell align="left" className="no-border-table">
                            <b>Zone</b>
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            <select
                              className="dropdown-css"
                              id="ZoneID"
                              label="Zone"
                              fullWidth
                              InputProps={{
                                className: "textFieldCss",
                              }}
                              value={parseInt(this.state.selectedZone)}
                              onChange={(e) => updateFormValue("ZoneID", e)}
                            >
                              {this.state.zones.map((item, i) => (
                                <option value={item.zoneId}>
                                  {item.description}({item.code})
                                </option>
                              ))}
                            </select>
                          </TableCell>
                        </TableRow> */}
                      <DropdownInput
                        id="ZoneID"
                        label="Zone"
                        onChange={(e) => updateFormValue("ZoneID", e)}
                        options={this.state.zones}
                        value={this.state.selectedZone}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default editcountry;
