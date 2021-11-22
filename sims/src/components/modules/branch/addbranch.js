import React, { Fragment } from "react";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DropdownInput from "../../compo/Tablerowcelldropdown";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as CF from "../../../services/functions/customfunctions";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableContainer from "@material-ui/core/TableContainer";
import Tablerowcelldateinput from "../../compo/tablerowcelldateinput";


import TableRow from "@material-ui/core/TableRow";

import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";

class addbranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      ProgressLoader: false,
      urlparams: null,
      GeneralDetailsExpanded: true,
      AddressDetailsExpanded: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      disabledCreatebtn: false,
      companyData: [],
      countryData: [],
      stateData: [],
      branchData: [],
      EffectiveDate: null,
      duplicate: false,
      branch: {
        address: null,
        address2: null,
        address3: null,
        branchId: 0,
        city: null,
        company: null,
        companyId: 0,
        country: null,
        countryId: null,
        emailId: null,
        financialYears: [],
        logoName: null,
        name: null,
        noSeries: [],
        phoneNo: null,
        EffectiveDate: null,
        postcode: null,
        shortName: null,
        state: null,
        stateId: null,
        wareHouses: [],
        website: null,
      },
      address: null,
      address2: null,
      address3: null,
      branchId: 0,
      city: null,
      company: null,
      companyId: 0,
      country: null,
      countryId: null,
      emailId: null,
      financialYears: [],
      logoName: null,
      name: null,
      noSeries: [],
      phoneNo: null,
      postcode: null,
      shortName: null,
      state: null,
      stateId: null,
      wareHouses: [],
      website: null,
      Validations: {
        name: { errorState: false, errorMsg: "" },
        shortName: { errorState: false, errorMsg: "" },
        address: { errorState: false, errorMsg: "" },
        country: { errorState: false, errorMsg: "" },
        address2: { errorState: false, errorMsg: "" },
        address3: { errorState: false, errorMsg: "" },
        city: { errorState: false, errorMsg: "" },
        postcode: { errorState: false, errorMsg: "" },
        phoneNo: { errorState: false, errorMsg: "" },
        website: { errorState: false, errorMsg: "" },
      },
    };
  }

  componentDidMount() {
    this.getBranches();
    if (getCookie(COOKIE.USERID) != null) {
      this.setState({ isLoggedIn: true });
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      let editbranchId = url.searchParams.get("editbranchId");
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
        },
        () => {
          this.getCompanyList();
          this.getStateList();
          this.getCountryList();
        }
      );
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  getBranches() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetBrachesUrl = APIURLS.APIURL.GetBraches;

    axios
      .post(GetBrachesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        this.setState({ branchData: data, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ branchData: [], ProgressLoader: true });
      });
  }

  getCompanyList() {
    let rows = [];

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCompaniesUrl = APIURLS.APIURL.GetCompanies;

    axios
      .post(GetCompaniesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        rows = data;
        this.setState({ companyData: rows, ProgressLoader: true });
      })
      .catch((error) => {});
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

    const ValidateName = () => {
      if (
        this.state.name === "" ||
        this.state.name === null ||
        this.state.name.length > 50 ||
        this.state.duplicate === true
      ) {
        this.setState({ disabledCreatebtn: true });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "shortName") {
        let branch = this.state.branch;
        branch.shortName = e.target.value;
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.shortName = {
            errorState: true,
            errorMsg: "Only 10 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
            
          });
        } else {
          let v = this.state.Validations;
          v.shortName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            shortName: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "Company") {
        let branch = this.state.branch;
        branch.companyId = e.target.value;
        this.setState({ branch: branch, companyId: e.target.value });
      }

      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.branchData,
          "name",
          e.target.value
        );
        this.setState({ duplicate: duplicateExist });
        let branch = this.state.branch;
        branch.name = e.target.value;
        if (
          e.target.value === "" ||
          e.target.value === null ||
          e.target.value.length > 50 ||
          duplicateExist === true
        ) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.name = {
              errorState: true,
              errorMsg: "Branch Name Exists",
            };
            this.setState({
              Validations: v,
              disabledCreatebtn: true,
              name: e.target.value,
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
              disabledCreatebtn: true,
            });
          }
          if (e.target.value === "" || e.target.value === null) {
            let v = this.state.Validations;
            v.name = {
              errorState: true,
              errorMsg: "Branch name cannot be blank",
            };
            this.setState({
              Validations: v,
              disabledCreatebtn: true,
              name: e.target.value,
            });
          }
        } else {
          let v = this.state.Validations;
          v.name = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            name: e.target.value,
            branch: branch,
          });
        }
        ValidateName();
      }

      if (id === "phoneNo") {
        let branch = this.state.branch;
        branch.phoneNo = e.target.value;
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.phoneNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.phoneNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            phoneNo: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "website") {
        let branch = this.state.branch;
        branch.website = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.website = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.website = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            website: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "CountryID") {
        let branch = this.state.branch;
        branch.countryId = e.target.value;
        this.setState({ branch: branch, countryId: e.target.value });
      }
      if (id === "State") {
        let branch = this.state.branch;
        branch.stateId = e.target.value;
        this.setState({ branch: branch, stateId: e.target.value });
      }

      if (id === "City") {
        let branch = this.state.branch;
        branch.city = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.city = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.city = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            city: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "Postcode") {
        let branch = this.state.branch;
        branch.postcode = e.target.value;
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.postcode = {
            errorState: true,
            errorMsg: "Only 10 numbers are allowed",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            postcode: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "Address") {
        let branch = this.state.branch;
        branch.address = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            address: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "Address2") {
        let branch = this.state.branch;
        branch.address2 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address2 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address2 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            address2: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "Address3") {
        let branch = this.state.branch;
        branch.address3 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address3 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address3 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledCreatebtn: false,
            branch: branch,
            address3: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "EffectiveDate") {
        // moment().format("YYYY-MM-DD")
        let branch = this.state.branch;
        branch.EffectiveDate = e.target.value;

        this.setState({ branch: branch, EffectiveDate: e.target.value });
      }
    };

    const handleCreate = () => {
      ValidateName();
      this.setState({ ProgressLoader: false });
      let branch = this.state.branch;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        branch: branch,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let CreateBranchUrl = APIURLS.APIURL.CreateBranch;
      axios
        .post(CreateBranchUrl, data, { headers })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            this.props.history.push(
              URLS.URLS.branchMaster + this.state.urlparams
            );
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
                  masterHref={URLS.URLS.branchMaster + this.state.urlparams}
                  masterLinkTitle="Branch Master"
                  typoTitle="Add Branch"
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
                    startIcon={<AddIcon />}
                    onClick={handleCreate}
                    disabled={this.state.disabledCreatebtn}
                  >
                    {APIURLS.buttonTitle.add}
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>

          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={9} lg={9}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={12} lg={12}>
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
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        General Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="company List table"
                            >
                              <TableBody className="tableBody">
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Company
                                  </TableCell>

                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <select
                                      className="dropdown-css"
                                      id="companySelect"
                                      label="Company"
                                      fullWidth
                                      value={parseInt(this.state.companyId)}
                                      onChange={(e) =>
                                        updateFormValue("Company", e)
                                      }
                                    >
                                      <option value="-">None</option>
                                      {this.state.companyData.map((item, i) => (
                                        <option
                                          value={parseInt(item.companyId)}
                                        >
                                          {item.companyName}
                                        </option>
                                      ))}
                                    </select>
                                  </TableCell>
                                </TableRow>

                                <Tablerowcelltextboxinput
                                  id="Name"
                                  label="Branch Name"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("Name", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.name}
                                  error={this.state.Validations.name.errorState}
                                  helperText={
                                    this.state.Validations.name.errorMsg
                                  }
                                  isMandatory={true}
                                />
                                
                                <Tablerowcelltextboxinput
                                  id="shortName"
                                  label="Short Name"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("shortName", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.shortName}
                                  error={
                                    this.state.Validations.shortName.errorState
                                  }
                                  helperText={
                                    this.state.Validations.shortName.errorMsg
                                  }
                                  isMandatory={true}
                                />
                                
                                <Tablerowcelltextboxinput
                                  type="number"
                                  id="phoneNo"
                                  label="Phone No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("phoneNo", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.phoneNo}
                                  error={
                                    this.state.Validations.phoneNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.phoneNo.errorMsg
                                  }
                                />

                                
                                <Tablerowcelltextboxinput
                                  id="website"
                                  label="Website"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("website", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.website}
                                  error={
                                    this.state.Validations.website.errorState
                                  }
                                  helperText={
                                    this.state.Validations.website.errorMsg
                                  }
                                />
                                <Tablerowcelldateinput
                                  id="EffectiveDate"
                                  label="Effective Date"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("EffectiveDate", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.EffectiveDate}
                                  error={null}
                                  helperText={null}
                                />
                                
                                
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="company List table"
                            >
                              <TableBody className="tableBody">
                                <DropdownInput
                                  id="CountryID"
                                  label="Country"
                                  onChange={(e) =>
                                    updateFormValue("CountryID", e)
                                  }
                                  options={this.state.countryData}
                                  value={this.state.countryId}
                                />
                                <DropdownInput
                                  id="stateSelect"
                                  label="State"
                                  onChange={(e) => updateFormValue("State", e)}
                                  options={this.state.stateData}
                                  value={this.state.stateId}
                                />

                               
                                <Tablerowcelltextboxinput
                                  id="City"
                                  label="City"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("City", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.city}
                                  error={
                                    this.state.Validations.city.errorState
                                  }
                                  helperText={
                                    this.state.Validations.city.errorMsg
                                  }
                                />
                                
                                <Tablerowcelltextboxinput
                                  id="Postcode"
                                  label="Postcode"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Postcode", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.postcode}
                                  error={
                                    this.state.Validations.postcode
                                          .errorState
                                  }
                                  helperText={
                                    this.state.Validations.postcode.errorMsg
                                  }
                                />
                                
                                <Tablerowcelltextboxinput
                                  id="Address"
                                  label="Address Line 1"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.address}
                                  error={
                                    this.state.Validations.address
                                          .errorState
                                  }
                                  helperText={
                                    this.state.Validations.address.errorMsg

                                  }
                                />
                                
                                <Tablerowcelltextboxinput
                                  id="Address2"
                                  label=" Address Line 2"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address2", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.address2}
                                  error={
                                    this.state.Validations.address2
                                    .errorState
                                  }
                                  helperText={
                                    this.state.Validations.address2.errorMsg

                                  }
                                />
                                
                                 <Tablerowcelltextboxinput
                                  id="Address3"
                                  label="  Address Line 3"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address3", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.address3}
                                  error={
                                    this.state.Validations.address3
                                    .errorState
                                  }
                                  helperText={
                                    this.state.Validations.address3.errorMsg

                                  }
                                />
                                
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
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
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        Taxation Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails
                      key=""
                      className="AccordionDetails-css"
                    ></AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3}></Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default addbranch;
