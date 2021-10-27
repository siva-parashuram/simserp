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

class adddestination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      GeneralDetailsExpanded: true,
      ProgressLoader: true,
      destinations: [],
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
    this.getAllDestinations();
    this.getCountryList();
    this.getStateList();
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
        name: data[i].name,
        value: data[i].countryId,
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
        this.setState({ stateData: rows, ProgressLoader: true });
      })
      .catch((error) => {});
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
              destinationName: e.target.value,
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
            postcode: e.target.value,
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
          countryId: e.target.value,
        });
      }
      if (id === "stateID") {
        this.setState({
          stateId: e.target.value,
        });
      }
    };

    const addDestination = () => {
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
                  typoTitle="Add Destination"
                  level={1}
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
                    startIcon={<AddIcon />}
                    disabled={this.state.DisabledCreatebtn}
                    onClick={addDestination}
                  >
                    Add
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>

          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={7} lg={7}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={9} lg={9}>
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
                        <Grid xs={12} sm={12} md={12} lg={12}>
                          <Table
                            stickyHeader
                            size="small"
                            className="accordion-table"
                            aria-label="destination add table"
                          >
                            <TableBody className="tableBody">
                              <Tablerowcelltextboxinput
                                id="Name"
                                label="Destination"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Name", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.destinationName}
                                error={
                                  this.state.Validations.destinationName
                                    .errorState
                                }
                                helperText={
                                  this.state.Validations.destinationName
                                    .errorMssg
                                }
                              />

                              <Tablerowcelltextboxinput
                                id="PostCode"
                                label="Post Code"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("PostCode", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.postcode}
                                error={
                                  this.state.Validations.postcode.errorState
                                }
                                helperText={
                                  this.state.Validations.postcode.errorMssg
                                }
                              />
                              <DropdownInput
                                id="CountryID"
                                label="Country"
                                onChange={(e) =>
                                  updateFormValue("CountryID", e)
                                }
                                options={this.state.countryData}
                                value={this.state.countryId}
                              />

                              
                              <TableRow>
                                <TableCell
                                  align="left"
                                  className="no-border-table"
                                >
                                  State
                                </TableCell>
                                <TableCell
                                  align="left"
                                  className="no-border-table"
                                >
                                  <Select
                                    style={{ height: 40, marginTop: 14 }}
                                    id="stateID"
                                    label="State"
                                    fullWidth
                                    InputProps={{
                                      className: "textFieldCss",
                                    }}
                                    value={parseInt(this.state.stateId)}
                                    onChange={(e) =>
                                      updateFormValue("stateID", e)
                                    }
                                  >
                                     {this.state.stateData.map((item, i) => (
                                        <option value={parseInt(item.stateId)}>
                                          {item.name}
                                        </option>
                                      ))}
                                  </Select>
                                </TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>

            <Grid xs={12} sm={12} md={5} lg={5}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={10} lg={10}>
                  <Destination destinations={this.state.destinations} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default adddestination;
