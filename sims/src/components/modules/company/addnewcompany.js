import React, { Fragment } from "react";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";

import { Divider } from "@material-ui/core";

import Grid from "@material-ui/core/Grid";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";

import TextField from "@material-ui/core/TextField";

import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";

import AddIcon from "@material-ui/icons/Add";

import axios from "axios";

import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";

import Header from "../../user/userheaderconstants";
import { withStyles } from "@material-ui/styles";

import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";

class addnewcompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      urlparams: "",
      companyName: "",
      address: "",
      address2: "",
      address3: "",
      country: 0,
      state: 0,
      city: "",
      postcode: "",
      phoneno: "",
      website: "",
      countryData: [],
      createBtnDisabled: true,
      GeneralDetailsExpanded: true,
      AddressDetailsExpanded: true,
      Validations: {
        companyName: { errorState: false, errorMsg: "" },
        address: { errorState: false, errorMsg: "" },
        country: { errorState: false, errorMsg: "" },
        address2: { errorState: false, errorMsg: "" },
        address3: { errorState: false, errorMsg: "" },
        city: { errorState: false, errorMsg: "" },
        postcode: { errorState: false, errorMsg: "" },
        phoneno: { errorState: false, errorMsg: "" },
        website: { errorState: false, errorMsg: "" },
      },
    };
    this.wrapper = React.createRef();
  }

  componentDidMount() {
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
    // let urlparams = "?branchId=" + null + "&compName=" + null + "&branchName=" + null; //for testing null values
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

        rows = data;
        this.setState({ countryData: rows });
      })
      .catch((error) => {});
  }

  render() {
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const Checktrue = () => {
      if (
        this.state.companyName === "" ||
        this.state.companyName === null ||
        this.state.companyName.length > 50
      ) {
        this.setState({ createBtnDisabled: true });
      } else {
        this.setState({ createBtnDisabled: false });
      }
      return;
    };

    const updateFormValue = (id, e) => {
      if (id === "companyName") {
        if (
          e.target.value === "" ||
          e.target.value == null ||
          e.target.value.length > 50
        ) {
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.companyName = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v,
              updateBtnDisabled: true,
              createBtnDisabled: true,
            });
          }
          if (e.target.value === "" || e.target.value == null) {
            let v = this.state.Validations;
            v.companyName = {
              errorState: true,
              errorMsg: "Company Name Cannot be blank!",
            };
            this.setState({
              Validations: v,
              updateBtnDisabled: true,
              createBtnDisabled: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.companyName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            companyName: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }
      if (id === "Address") {
        if (
          e.target.value === "" ||
          e.target.value == null ||
          e.target.value.length > 50
        ) {
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.address = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v,
              updateBtnDisabled: true,
              createBtnDisabled: true,
            });
          }
          if (e.target.value === "" || e.target.value == null) {
            let v = this.state.Validations;
            v.address = {
              errorState: true,
              errorMsg: "Address Cannot be blank!",
            };
            this.setState({
              Validations: v,
              updateBtnDisabled: true,
              createBtnDisabled: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            address: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }

      if (id === "Address2") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address2 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            createBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.address2 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            address2: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }

      if (id === "Address3") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address3 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({ Validations: v, createBtnDisabled: true });
        } else {
          let v = this.state.Validations;
          v.address3 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            address3: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }

      if (id === "City") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.city = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({ Validations: v, createBtnDisabled: true });
        } else {
          let v = this.state.Validations;
          v.city = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            city: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }

      if (id === "Postcode") {
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.postcode = {
            errorState: true,
            errorMsg: "Only 10 Characters are Allowed!",
          };
          this.setState({ Validations: v, createBtnDisabled: true });
        } else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            postcode: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }

      if (id === "PhoneNo") {
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.phoneno = {
            errorState: true,
            errorMsg: "Only 20 digits are Allowed!",
          };
          this.setState({ Validations: v, createBtnDisabled: true });
        } else {
          let v = this.state.Validations;
          v.phoneno = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            phoneno: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }

      if (id === "Website") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.website = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({ Validations: v, createBtnDisabled: true });
        } else {
          let v = this.state.Validations;
          v.website = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            website: e.target.value,
            createBtnDisabled: false,
          });
        }
        Checktrue();
      }
    };

    // if (id === "country") this.setState({ country: e.target.value });
    // if (id === "state") this.setState({ state: e.target.value });

    // //processEnableCreateBtn();

    // const processEnableCreateBtn = () => {
    //     if (this.state.companyName !== "" &&
    //         this.state.address !== "" &&
    //         this.state.address2 !== "" &&
    //         this.state.address3 !== "" &&
    //         this.state.country !== "" &&
    //         this.state.state !== "" &&
    //         this.state.city !== "" &&
    //         this.state.postcode !== "" &&
    //         this.state.phoneno !== "" &&
    //         this.state.website !== ""
    //     ) {
    //         this.setState({ createBtnDisabled: false });
    //     } else {
    //         this.setState({ createBtnDisabled: true });
    //     }
    // }

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

    const handleCreateCompanyClick = (e) => {
      this.setState({ ProgressLoader: false });

      let ValidUser = APIURLS.ValidUser;
      let company = APIURLS.company;

      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      company.CompanyID = 0;
      company.CompanyName = this.state.companyName;
      company.Address = this.state.address;
      company.Address2 = this.state.address2;
      company.Address3 = this.state.address3;
      company.City = this.state.city;
      company.Postcode = this.state.postcode;
      company.CountryID = this.state.country;
      company.StateID = this.state.state;
      company.PhoneNo = this.state.phoneno;
      company.Website = this.state.website;

      let chkFields = true;
      if (chkFields === false) {
      } else {
        const data = {
          validUser: ValidUser,
          company: company,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        let addNewCompanyUrl = APIURLS.APIURL.addNewCompany;

        axios
          .post(addNewCompanyUrl, data, { headers })
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              this.setState({ ProgressLoader: true, SuccessPrompt: true });
              let gobackURL = URLS.URLS.companyMaster + this.state.urlparams;
              this.props.history.push(gobackURL);
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
            }
          })
          .catch((error) => {
            // this.setState({ ProgressLoader: true, ErrorPrompt: true });
          });
      }
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    // const StyledAccordionSummary = withStyles({
    //     root: {
    //         minHeight:"40px",
    //         maxHeight: "40px",

    //         '&.Mui-expanded': {
    //           minHeight: '50px',
    //           maxHeight: '50px',

    //         }
    //     },

    //     })(AccordionSummary);

    return (
      <Fragment>
        
        {this.state.ProgressLoader === false ? (
          <div style={{ marginTop: -8, marginLeft: -10 }}>
            <LinearProgress style={{ backgroundColor: "#ffeb3b" }} />{" "}
          </div>
        ) : null}

        <Snackbar
          open={this.state.SuccessPrompt}
          autoHideDuration={3000}
          onClose={closeSuccessPrompt}
        >
          <Alert onClose={closeSuccessPrompt} severity="success">
            Company Details Updated!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.ErrorPrompt}
          autoHideDuration={3000}
          onClose={closeErrorPrompt}
        >
          <Alert onClose={closeErrorPrompt} severity="error">
            Error!
          </Alert>
        </Snackbar>

        <div className="breadcrumb-height">
          <Grid container spacing={1}>
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
                <Breadcrumbs
                  className="style-breadcrumb"
                  aria-label="breadcrumb"
                >
                  <Link
                    color="inherit"
                    className="backLink"
                    onClick={this.props.history.goBack}
                  >
                    Back
                  </Link>
                  <Link
                    color="inherit"
                    href={URLS.URLS.userDashboard + this.state.urlparams}
                  >
                    Dashboard
                  </Link>
                  <Link
                    color="inherit"
                    className="backLink"
                    href={URLS.URLS.companyMaster + this.state.urlparams}
                  >
                    Company Master
                  </Link>

                  <Typography color="textPrimary">Add Company </Typography>
                </Breadcrumbs>
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
                    disabled={this.state.createBtnDisabled}
                    onClick={handleCreateCompanyClick}
                  >
                    Add
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="breadcrumb-bottom"></div>

        <div className="New-link-bottom"></div>

        <Grid className="table-adjust" container spacing={0}>
          <Grid item xs={8}>
            {/* <div style={{ minHeight: '100%', height: 500, overflowY: 'scroll', overflowX: 'hidden' }}> */}
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Accordion
                  key="company-General-Details"
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
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                  >
                    <Typography key="" className="accordion-Header-Title">
                      General Details
                    </Typography>
                  </AccordionSummary>
                  {/* <Divider  className="accordion-Header-underline"/> */}
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
                            id="companyName"
                            label="Company Name"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("companyName", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 50,
                            }}
                            value={this.state.companyName}
                            error={
                              this.state.Validations.companyName.errorState
                            }
                            helperText={
                              this.state.Validations.companyName.errorMsg
                            }
                          />

                          <Tablerowcelltextboxinput
                            id="PhoneNo"
                            type="number"
                            label="Phone No"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("PhoneNo", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 20,
                            }}
                            value={this.state.phoneno}
                            error={this.state.Validations.phoneno.errorState}
                            helperText={this.state.Validations.phoneno.errorMsg}
                          />

                          <Tablerowcelltextboxinput
                            id="Website"
                            label="Website"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Website", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 50,
                            }}
                            value={this.state.website}
                            error={this.state.Validations.website.errorState}
                            helperText={this.state.Validations.website.errorMsg}
                          />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  key="company-Address-Details"
                  expanded={this.state.AddressDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) =>
                          handleAccordionClick("AddressDetailsExpanded", e)
                        }
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                  >
                    <Typography key="" className="accordion-Header-Title">
                      Address Details
                    </Typography>
                  </AccordionSummary>
                  {/* <Divider   className="accordion-Header-underline"/> */}
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <TableContainer>
                      <Table
                        stickyHeader
                        size="small"
                        className="accordion-table"
                        aria-label="company List table"
                      >
                        <TableBody className="tableBody">
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Country
                            </TableCell>
                            <TableCell align="left" className="no-border-table">
                              <select
                                className="dropdown-css"
                                id="countrySelect"
                                label="Country"
                                fullWidth
                              >
                                <option value="-">None</option>
                                {this.state.countryData.map((item, i) => (
                                  <option value={item.countryId}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              State
                            </TableCell>
                            <TableCell align="left" className="no-border-table">
                              <select
                                className="dropdown-css"
                                id="stateSelect"
                                label="State"
                                fullWidth
                              >
                                <option value="-">None</option>
                                <option value={10}>Goa</option>
                                <option value={20}>Gujrat</option>
                                <option value={30}>Delhi</option>
                              </select>
                            </TableCell>
                          </TableRow>
                          <Tablerowcelltextboxinput
                            id="City"
                            label="City"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("City", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 50,
                            }}
                            value={this.state.city}
                            error={this.state.Validations.city.errorState}
                            helperText={this.state.Validations.city.errorMsg}
                          />

                          <Tablerowcelltextboxinput
                            id="Postcode"
                            label="Postcode"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Postcode", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 10,
                            }}
                            value={this.state.postcode}
                            error={this.state.Validations.postcode.errorState}
                            helperText={
                              this.state.Validations.postcode.errorMsg
                            }
                          />

                          <Tablerowcelltextboxinput
                            id="Address"
                            label="Address"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Address", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 50,
                            }}
                            value={this.state.address}
                            error={this.state.Validations.address.errorState}
                            helperText={this.state.Validations.address.errorMsg}
                          />

                          <Tablerowcelltextboxinput
                            id="Address2"
                            label="Address 2"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Address2", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 50,
                            }}
                            value={this.state.address2}
                            error={this.state.Validations.address2.errorState}
                            helperText={
                              this.state.Validations.address2.errorMsg
                            }
                          />

                          <Tablerowcelltextboxinput
                            id="Address3"
                            label="Address 3"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Address3", e)}
                            InputProps={{
                              className: "textFieldCss",
                              maxlength: 50,
                            }}
                            value={this.state.address3}
                            error={this.state.Validations.address3.errorState}
                            helperText={
                              this.state.Validations.address3.errorMsg
                            }
                          />
                        </TableBody>
                      </Table>
                    </TableContainer>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            {/* </div> */}
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default addnewcompany;
