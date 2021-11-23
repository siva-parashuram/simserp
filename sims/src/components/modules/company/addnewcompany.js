import React, { Fragment } from "react";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import Dialog from "@mui/material/Dialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import SwitchInput from "../../compo/tablerowcellswitchinput";

import DialogTitle from "@mui/material/DialogTitle";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Typography from "@material-ui/core/Typography";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";

import AddIcon from "@material-ui/icons/Add";

import axios from "axios";

import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";

import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

class addnewcompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
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
      IsActive:false,
      MasterCountryData: [],
      countryData: [],
      stateData: [],
      createBtnDisabled: true,
      GeneralDetailsExpanded: true,

      duplicate: false,
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
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
    this.getCompanyList();
    this.getCountryList();

    // this.getStateList();
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

  getCompanyList() {
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
        console.log("getCompanyList > response >  ", response);
        if (response.status === 200) {
          if (response.data === "Invalid User") {
            alert("Un-Authorized Access Found!");
            window.close();
          } else {
            let data = response.data;

            this.setState({ companyData: data, ProgressLoader: true });
          }
        } else {
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });
  }

  // getCountryList() {
  //   let rows = [];
  //   let ValidUser = APIURLS.ValidUser;
  //   ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
  //   ValidUser.Token = getCookie(COOKIE.TOKEN);
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   let GetCountryUrl = APIURLS.APIURL.GetCountries;

  //   axios
  //     .post(GetCountryUrl, ValidUser, { headers })
  //     .then((response) => {
  //       let data = response.data;

  //       rows = data;
  //       this.processCountryData(data);
  //     })
  //     .catch((error) => {});
  // }

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
        this.setState({ MasterCountryData: data });
        this.processCountryData(data);
      })
      .catch((error) => {});
  }

  getStateByCountry = (CountryID) => {
    console.log("getStateByCountry > CountryID > ", CountryID);
    let MasterCountryData = this.state.MasterCountryData;
    console.log("getStateByCountry > MasterCountryData > ", MasterCountryData);
    let stateData = [];
    for (let i = 0; i < MasterCountryData.length; i++) {
      if (MasterCountryData[i].CountryID === CountryID) {
        if (MasterCountryData[i].State) {
          stateData = MasterCountryData[i].State;
        }
        break;
      }
    }
    console.log("getStateByCountry > stateData > ", stateData);
    let newData = [];
    for (let i = 0; i < stateData.length; i++) {
      let d = {
        name: stateData[i].Name,
        value: stateData[i].StateID,
      };
      newData.push(d);
    }
    console.log("getStateByCountry > stateData > newData > ", newData);

    this.setState({ stateData: newData, ProgressLoader: true });
  };

  // getStateList = () => {
  //   let ValidUser = APIURLS.ValidUser;
  //   ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
  //   ValidUser.Token = getCookie(COOKIE.TOKEN);
  //   const headers = {
  //     "Content-Type": "application/json",
  //   };
  //   let GetStatesUrl = APIURLS.APIURL.GetStates;

  //   axios
  //     .post(GetStatesUrl, ValidUser, { headers })
  //     .then((response) => {
  //       let data = response.data;
  //       let newData = [];
  //       for (let i = 0; i < data.length; i++) {
  //         let d = {
  //           name: data[i].name,
  //           value: data[i].stateId,
  //         };
  //         newData.push(d);
  //       }
  //       this.setState({ stateData: newData, ProgressLoader: true });
  //     })
  //     .catch((error) => {});
  // };

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
    // const Checktrue = () => {
    //   if (
    //     this.state.companyName === "" ||
    //     this.state.companyName === null ||
    //     this.state.companyName.length > 50 ||
    //     this.state.duplicate === true
    //   ) {
    //     this.setState({ createBtnDisabled: true });
    //   }else{
    //     this.setState({ createBtnDisabled: false })
    //   }
    // };

    const updateFormValue = (id, e) => {
      if (id === "companyName") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.companyData,
          "companyName",
          e.target.value
        );

        if (
          e.target.value === "" ||
          e.target.value == null ||
          e.target.value.length > 50 ||
          duplicateExist === true
        ) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.companyName = {
              errorState: true,
              errorMsg: "Company with same name already exist!",
            };
            this.setState({
              Validations: v,
              companyName: e.target.value,

              // createBtnDisabled: true,
              duplicate: true,
            });
          }
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.companyName = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v,
              companyName: e.target.value,
              // createBtnDisabled: true,
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
              companyName: e.target.value,

              // createBtnDisabled: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.companyName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            companyName: e.target.value,
            // createBtnDisabled: false,
          });
        }
        // Checktrue();
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
              address: e.target.value,

              // createBtnDisabled: true,
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
              address: e.target.value,

              // createBtnDisabled: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            address: e.target.value,
            // createBtnDisabled: false,
          });
        }
        // Checktrue();
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

            address2: e.target.value,
          });
        } else {
          let v = this.state.Validations;
          v.address2 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            address2: e.target.value,
          });
        }
        // Checktrue();
      }

      if (id === "Address3") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address3 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            address3: e.target.value,
          });
        } else {
          let v = this.state.Validations;
          v.address3 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            address3: e.target.value,
          });
        }
        // Checktrue();
      }

      if (id === "City") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.city = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            city: e.target.value,

            // createBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.city = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            city: e.target.value,
            // createBtnDisabled: false,
          });
        }
        // Checktrue();
      }

      if (id === "Postcode") {
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.postcode = {
            errorState: true,
            errorMsg: "Only 10 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            postcode: e.target.value,
            // createBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            postcode: e.target.value,
            // createBtnDisabled: false,
          });
        }
        // Checktrue();
      }

      if (id === "PhoneNo") {
        let number = CF.chkIfNumber(e.target.value);
        if (number) {
          //let v=CF.getInutLen("PhoneNo",e.target.value.length);
          //if(v)
          if (e.target.value.length > 20) {
            let v = this.state.Validations;
            v.phoneno = {
              errorState: true,
              errorMsg: "Only 20 digits are Allowed!",
            };
            this.setState({
              Validations: v,
              // createBtnDisabled: true,
              phoneno: e.target.value,
            });
          } else {
            let v = this.state.Validations;
            v.phoneno = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v,
              phoneno: e.target.value,
              // createBtnDisabled: false,
            });
          }
        } else {
          let v = this.state.Validations;
          v.phoneno = {
            errorState: true,
            errorMsg: "Enter Number!",
          };
          this.setState({
            Validations: v,
            // createBtnDisabled: true,
          });
        }
        // Checktrue();
      }

      if (id === "Website") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.website = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            website: e.target.value,

            // createBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.website = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            website: e.target.value,
            createBtnDisabled: false,
          });
        }
        // Checktrue();
      }
      if (id === "Country") {
        this.getStateByCountry(CF.toInt(e.target.value));
        console.log("countryID>>", e.target.value);
        this.setState({ country: CF.toInt(e.target.value) });
      }
      if (id === "State") {
        this.setState({ state: CF.toInt(e.target.value) });
      }
      if(id==="IsActive"){
        this.setState({IsActive:e.target.checked})
      }

      validate();
      // Checktrue();
    };

    const validate = () => {
      let v = this.state.Validations;
      if (
        this.state.companyName === "" ||
        this.state.address === "" ||
        v["companyName"].errorState === true ||
        v["address"].errorState === true ||
        v["address2"].errorState === true ||
        v["address3"].errorState === true ||
        v["city"].errorState === true ||
        v["postcode"].errorState === true ||
        v["phoneno"].errorState === true ||
        v["website"].errorState === true
      ) {
        this.setState({ createBtnDisabled: true });
      } else {
        this.setState({ createBtnDisabled: false });
      }
    };

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

    const dialog = (
      <Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={this.state.Dialog.DialogStatus}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          className="dialog-prompt-activity"
        >
          <DialogTitle
            id="dialog-title"
            className="dialog-area"
            style={{ maxHeight: 50 }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={1} lg={1}>
                <IconButton
                  aria-label="ArrowBackIcon"
                  // style={{ textAlign: 'left', marginTop: 8 }}
                >
                  <ArrowBackIcon onClick={(e) => handleClose()} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <div style={{ marginLeft: -50 }}>
                  {" "}
                  <span style={{ fontSize: 18, color: "rgb(80, 92, 109)" }}>
                    {" "}
                    {this.state.Dialog.DialogTitle}{" "}
                  </span>{" "}
                </div>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {this.state.Dialog.DialogContent}
              </Grid>
            </Grid>
            <div style={{ height: 50 }}>&nbsp;</div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );

    const openDialog = (param) => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = true;
      Dialog.DialogTitle = param;

      switch (param) {
        case "Country":
          // Dialog.DialogContent = Address;
          this.setState({ Dialog: Dialog });
          break;
        case "State":
          // Dialog.DialogContent = contact;
          this.setState({ Dialog: Dialog });
          break;

          break;
        default:
          break;
      }

      this.setState({ Dialog: Dialog });
    };

    const handleClose = () => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = false;
      this.setState({ Dialog: Dialog });
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
          masterHref={URLS.URLS.companyMaster + this.state.urlparams}
          masterLinkTitle="Company Master"
          typoTitle="Add Company"
          level={2}
        />
      </Fragment>
    );

    const buttongroupHtml=(
      <Fragment>
         <ButtonGroup
                    size="small"
                    variant="text"
                    aria-label="Action Menu Button group"
                  >
                    <Button
                    startIcon={APIURLS.buttonTitle.save.icon}
                      className="action-btns"
                      disabled={this.state.createBtnDisabled}
                      onClick={handleCreateCompanyClick}
                    >
                      {APIURLS.buttonTitle.save.name}
                    </Button>
                  </ButtonGroup>
      </Fragment>
    );

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
          <TopFixedRow3 breadcrumb={breadcrumbHtml} buttongroup={buttongroupHtml} />


        <Grid className="table-adjust" container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            {/* <div style={{ minHeight: '100%', height: 500, overflowY: 'scroll', overflowX: 'hidden' }}> */}
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
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
                    <Typography
                       
                      key=""
                      className="accordion-Header-Title"
                    >
                      General
                    </Typography>
                  </AccordionSummary>
                  {/* <Divider  className="accordion-Header-underline"/> */}
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div style={{ marginLeft: -14 }}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                    onChange={(e) =>
                                      updateFormValue("companyName", e)
                                    }
                                    value={this.state.companyName}
                                    error={
                                      this.state.Validations.companyName
                                        .errorState
                                    }
                                    helperText={
                                      this.state.Validations.companyName
                                        .errorMsg
                                    }
                                  />

                                  <Tablerowcelltextboxinput
                                    id="Address"
                                    label="Address"
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
                                      this.state.Validations.address.errorState
                                    }
                                    helperText={
                                      this.state.Validations.address.errorMsg
                                    }
                                  />

                                  <Tablerowcelltextboxinput
                                    id="Address2"
                                    label="Address 2"
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
                                      this.state.Validations.address2.errorState
                                    }
                                    helperText={
                                      this.state.Validations.address2.errorMsg
                                    }
                                  />
                                  <Tablerowcelltextboxinput
                                    id="Address3"
                                    label="Address 3"
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
                                      this.state.Validations.address3.errorState
                                    }
                                    helperText={
                                      this.state.Validations.address3.errorMsg
                                    }
                                  />
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
                                      maxlength: 10,
                                    }}
                                    value={this.state.postcode}
                                    error={
                                      this.state.Validations.postcode.errorState
                                    }
                                    helperText={
                                      this.state.Validations.postcode.errorMsg
                                    }
                                  />
                                </TableBody>
                              </Table>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
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
                                      Country
                                    </TableCell>
                                    <TableCell
                                      align="left"
                                      className="no-border-table"
                                    >
                                      <select
                                        style={{ width: "90%", height: 30 }}
                                        className="dropdown-css"
                                        id="countrySelect"
                                        onChange={(e) =>
                                          updateFormValue("Country", e)
                                        }
                                        value={this.state.country}
                                      >
                                        <option value="-">Select</option>

                                        {this.state.countryData.map(
                                          (item, i) => (
                                            <option
                                              value={parseInt(item.value)}
                                            >
                                              {item.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                      <button
                                        className="dropdowninputbtn"
                                        onClick={(e) => openDialog("Country")}
                                      >
                                        ...
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                 
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
                                      <select
                                        style={{ width: "90%", height: 30 }}
                                        className="dropdown-css"
                                        id="stateSelect"
                                        onChange={(e) =>
                                          updateFormValue("State", e)
                                        }
                                        value={this.state.state}
                                      >
                                        <option value="-">Select</option>

                                        {this.state.stateData.map((item, i) => (
                                          <option value={parseInt(item.value)}>
                                            {item.name}
                                          </option>
                                        ))}
                                      </select>
                                      <button
                                        className="dropdowninputbtn"
                                        onClick={(e) => openDialog("State")}
                                      >
                                        ...
                                      </button>
                                    </TableCell>
                                  </TableRow>
                                  <Tablerowcelltextboxinput
                                    id="PhoneNo"
                                    label="Phone No"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      updateFormValue("PhoneNo", e)
                                    }
                                    // InputProps={{

                                    value={this.state.phoneno}
                                    error={
                                      this.state.Validations.phoneno.errorState
                                    }
                                    helperText={
                                      this.state.Validations.phoneno.errorMsg
                                    }
                                  />

                                  <Tablerowcelltextboxinput
                                    id="Website"
                                    label="Website"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      updateFormValue("Website", e)
                                    }
                                    value={this.state.website}
                                    error={
                                      this.state.Validations.website.errorState
                                    }
                                    helperText={
                                      this.state.Validations.website.errorMsg
                                    }
                                  />
                                 
                                  <SwitchInput
                                    key="IsActive"
                                    id="IsActive"
                                    label="IsActive"
                                    param={this.state.IsActive}
                                    onChange={(e) =>
                                      updateFormValue("IsActive", e)
                                    }
                                  />

                            
                                </TableBody>
                              </Table>
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            {/* </div> */}
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
        {dialog}
      </Fragment>
    );
  }
}
export default addnewcompany;
