import React, { Fragment } from "react";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import Dialog from "@mui/material/Dialog";

import DialogTitle from "@mui/material/DialogTitle";
import Typography from "@material-ui/core/Typography";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";

import ButtonGroup from "@mui/material/ButtonGroup";

import UpdateIcon from "@material-ui/icons/Update";
import Button from "@material-ui/core/Button";
// import CheckIcon from '@material-ui/icons/Check';
import axios from "axios";

import { withStyles } from "@material-ui/styles";

import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";

class editcompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyData: [],
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: false,
      updateBtnDisabled: false,
      urlparams: "",
      CompanyName: "",
      Address: "",
      Address2: "",
      Address3: "",
      CountryID: 0,
      StateID: 0,
      City: "",
      PostCode: "",
      PhoneNo: "",
      Website: "",
      MasterCountryData:[],
      countryData: [],
      stateData: [],
      selectedCountry: "",
      createBtnDisabled: true,
      GeneralDetailsExpanded: true,
      AddressDetailsExpanded: false,
      duplicate: "",
      oldName: "",
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
      userIsTyping: false,
      isUserchangesUpdated: false,
      CompanyID: null,
      company: APIURLS.company,
    };
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    this.getCountryList();
    this.getCompanyList();
    // this.getStateList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let CompanyID = url.searchParams.get("compID");
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
        CompanyID: CompanyID,
      },
      () => {
        this.getCompanyDetails(CompanyID);
      }
    );
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
        this.setState({MasterCountryData:data});
        this.processCountryData(data);
       
      })
      .catch((error) => { });
  }

  getStateByCountry = (CountryID) => {
    console.log("getStateByCountry > CountryID > ",CountryID);
    let MasterCountryData = this.state.MasterCountryData;
    console.log("getStateByCountry > MasterCountryData > ",MasterCountryData);
    let stateData = [];
    for (let i=0; i < MasterCountryData.length; i++) {
      if (MasterCountryData[i].CountryID === CountryID) {
        if( MasterCountryData[i].State){
          stateData = MasterCountryData[i].State;
        }        
        break;
      }
    }
    console.log("getStateByCountry > stateData > ",stateData);
    let newData = [];
    for (let i = 0; i < stateData.length; i++) {
      let d = {
        name: stateData[i].Name,
        value: stateData[i].StateID,
      };
      newData.push(d);
    }
    console.log("getStateByCountry > stateData > newData > ",newData);

    this.setState({ stateData: newData, ProgressLoader: true });

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

  getCompanyDetails(CompanyID) {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let company = APIURLS.company;
    company.CompanyID = parseInt(CompanyID);
    const data = {
      validUser: ValidUser,
      company: company,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    let GetCompanyUrl = APIURLS.APIURL.GetCompany;
    axios
      .post(GetCompanyUrl, data, { headers })
      .then((response) => {
        if (response.status === 200) {
          console.log("CompanyState>>",response.data)
          company.CompanyName = response.data.companyName;
          company.Address = response.data.address;
          company.Address2 = response.data.address2;
          company.Address3 = response.data.address3;
          company.City = response.data.city;
          company.Postcode = response.data.postcode;
          company.CountryID = response.data.countryId;
          company.StateID = response.data.stateId;
          company.PhoneNo = response.data.phoneNo;
          company.Website = response.data.website;
          this.setState(
            {
              oldName: response.data.companyName,
              company: company,
              CompanyName: response.data.companyName,
              Address: response.data.address,
              Address2: response.data.address2,
              Address3: response.data.address3,
              CountryID: response.data.countryId,
              StateID: response.data.stateId,
              City: response.data.city,
              PostCode: response.data.postcode,
              PhoneNo: response.data.phoneNo,
              Website: response.data.website,
              selectedCountry: response.data.countryId,
              ProgressLoader: true,
            },
            () => {}




          );
        } else {
        }
      })
      .catch((error) => {});
  }

  render() {
    // const CheckTrue = () => {
    //   if (
    //     this.state.CompanyName === "" ||
    //     this.state.CompanyName === null ||
    //     this.state.CompanyName.length > 50 ||
    //     this.state.duplicate === true
    //   ) {
    //     if (
    //       this.state.Address === "" ||
    //       this.state.Address === null ||
    //       this.state.Address.length > 50
    //     ) {
    //       this.setState({ updateBtnDisabled: true });
    //     } else {
    //       this.setState({ updateBtnDisabled: true });
    //     }
    //   } else if (
    //     this.state.Address === "" ||
    //     this.state.Address === null ||
    //     this.state.Address.length > 50
    //   ) {
    //     this.setState({ updateBtnDisabled: true });
    //   }
    // };

    const updateFormValue = (id, e) => {
      let company = this.state.company;

      if (id === "companyName") {
        let duplicateExist = CF.chkDuplicateButExcludeName(
          this.state.companyData,
          "companyName",
          this.state.oldName,
          e.target.value
        );
        this.state.duplicate = duplicateExist;
        company.CompanyName = e.target.value;

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
              CompanyName: e.target.value,
              // updateBtnDisabled: true,
            });
          }

          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.companyName = {
              errorState: true,
              errorMsg: "Only 50 characters are allowed",
            };
            this.setState({
              Validations: v,
              // updateBtnDisabled: true,
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
              CompanyName: e.target.value,
              // updateBtnDisabled: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.companyName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            // updateBtnDisabled: false,
            CompanyName: e.target.value,
            company: company,
          });
        }
        // CheckTrue();
      }

      if (id === "Address") {
        company.Address = e.target.value;

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
              // updateBtnDisabled: true,
            });
          } else {
            let v = this.state.Validations;
            v.address = {
              errorState: true,
              errorMsg: "Address Cannot be blank!",
            };
            this.setState({
              Validations: v,
              // updateBtnDisabled: true,
              Address: e.target.value,
            });
          }
        } else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            // updateBtnDisabled: false,
            Address: e.target.value,
            company: company,
          });
        }
        // CheckTrue();
      }
      if (id === "Address2") {
        company.Address2 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address2 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            //createBtnDisabled: true,
            // updateBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.address2 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            Address2: e.target.value,
            //createBtnDisabled: false ,
            // updateBtnDisabled: false,
            company: company,
          });
        }
        // CheckTrue();
      }

      if (id === "Address3") {
        company.Address3 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address3 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            //createBtnDisabled: true ,
            // updateBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.address3 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            Address3: e.target.value,
            //createBtnDisabled: false,
            // updateBtnDisabled: false,
            company: company,
          });
        }
        // CheckTrue();
      }

      if (id === "City") {
        company.City = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.city = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            //createBtnDisabled: true,
            // updateBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.city = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            City: e.target.value,
            //createBtnDisabled: false
            // updateBtnDisabled: false,
            company: company,
          });
        }
        // CheckTrue();
      }

      if (id === "Postcode") {
        company.Postcode = e.target.value;
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.postcode = {
            errorState: true,
            errorMsg: "Only 10 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            //createBtnDisabled: true
            // updateBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            PostCode: e.target.value,
            //createBtnDisabled: false
            // updateBtnDisabled: false,
            company: company,
          });
        }
        // CheckTrue();
      }

      if (id === "PhoneNo") {
        let number = CF.chkIfNumber(e.target.value);
        if (number) {
          // company.PhoneNo = e.target.value;
          if (e.target.value.length > 20) {
            let v = this.state.Validations;
            v.phoneno = {
              errorState: true,
              errorMsg: "Only 20 digits are Allowed!",
            };
            this.setState({
              Validations: v,
              // createBtnDisabled: true,
              PhoneNo: e.target.value,
            });
          } else {
            let v = this.state.Validations;
            v.phoneno = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v,
              PhoneNo: e.target.value,
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
        // CheckTrue();
      }

      if (id === "Website") {
        company.Website = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.website = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            //createBtnDisabled: true,
            // updateBtnDisabled: true,
          });
        } else {
          let v = this.state.Validations;
          v.website = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            Website: e.target.value,
            //createBtnDisabled: false
            // updateBtnDisabled: false,
            company: company,
          });
        }
        // CheckTrue();
      }
      if (id === "Country") {
        this.getStateByCountry(CF.toInt(e.target.value));
        this.setState({ CountryID: CF.toInt(e.target.value) });
      }

      if (id === "State") {
        this.setState({ StateID: CF.toInt(e.target.value) });
      }
      validate();
    };

    const validate = () => {
      let v = this.state.Validations;
      if (
        v["companyName"].errorState === true ||
        v["address"].errorState === true ||
        v["address2"].errorState === true ||
        v["address3"].errorState === true ||
        v["city"].errorState === true ||
        v["postcode"].errorState === true ||
        v["phoneno"].errorState === true ||
        v["website"].errorState === true
      ) {
        this.setState({ updateBtnDisabled: true });
      } else {
        this.setState({ updateBtnDisabled: false });
      }
    };

    const updateCompanyDetails = () => {
      // CheckTrue();

      this.setState({ ProgressLoader: false });
      let company = this.state.company;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        company: company,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateCompanyUrl = APIURLS.APIURL.UpdateCompany;
      axios
        .post(UpdateCompanyUrl, data, { headers })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            //this.props.history.push(gobackURL);
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
    };

    const deleteCompany = () => {
      let gobackURL = URLS.URLS.companyMaster + this.state.urlparams;

      this.setState({ ProgressLoader: false });
      let company = this.state.company;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        company: company,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let DeleteCompanyUrl = APIURLS.APIURL.DeleteCompany;

      axios
        .post(DeleteCompanyUrl, data, { headers })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            this.props.history.push(gobackURL);
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
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

    // const userTypingBusyPrompt = (e) => {
    //   this.setState({ userIsTyping: true,isUserchangesUpdated: false });
    // }

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
          // Dialog.DialogContent =;
          this.setState({ Dialog: Dialog });
          break;
        case "State":
          // Dialog.DialogContent = ;
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

    // const StyledAccordionSummary = withStyles({
    //   root: {
    //       minHeight:"40px",
    //       maxHeight: "40px",

    //       '&.Mui-expanded': {
    //         minHeight: '50px',
    //         maxHeight: '50px',

    //       }
    //   },

    //   })(AccordionSummary);

    return (
      <Fragment>
        <div>
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
                  <Breadcrumb
                    backOnClick={this.props.history.goBack}
                    linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                    linkTitle="Dashboard"
                    masterHref={URLS.URLS.companyMaster + this.state.urlparams}
                    masterLinkTitle="Company  Master"
                    typoTitle="Edit Company"
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
                      onClick={(e) => updateCompanyDetails()}
                      disabled={this.state.updateBtnDisabled}
                    >
                      {APIURLS.buttonTitle.update}
                    </Button>
                  </ButtonGroup>
                </div>
              </Grid>
            </Grid>
          </div>

          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>

          <Grid className="table-adjust" container spacing={0}>
            <Grid item xs={12} sm={12} md={8} lg={8}>
              <Grid container spacing={2}>
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
                      <Typography key="" className="accordion-Header-Title">
                        General Details
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails key="" className="AccordionDetails-css">
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
                                value={this.state.CompanyName}
                                error={
                                  this.state.Validations.companyName.errorState
                                }
                                helperText={
                                  this.state.Validations.companyName.errorMsg
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
                                value={this.state.Address}
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
                                onChange={(e) => updateFormValue("Address2", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.Address2}
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
                                onChange={(e) => updateFormValue("Address3", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.Address3}
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
                                value={this.state.City}
                                error={this.state.Validations.city.errorState}
                                helperText={
                                  this.state.Validations.city.errorMsg
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
                                value={this.state.PostCode}
                                error={
                                  this.state.Validations.postcode.errorState
                                }
                                helperText={
                                  this.state.Validations.postcode.errorMsg
                                }
                              />
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
                                    style={{ width: "80%", height: 30 }}
                                    className="dropdown-css"
                                    id="countrySelect"
                                    onChange={(e) =>
                                      updateFormValue("Country", e)
                                    }
                                    value={this.state.CountryID}
                                  >
                                    <option value="-" disabled>
                                      Select
                                    </option>

                                    {this.state.countryData.map((item, i) => (
                                      <option value={parseInt(item.value)}>
                                        {item.name}
                                      </option>
                                    ))}
                                  </select>
                                  <button
                                    className="dropdowninputbtn"
                                    onClick={(e) => openDialog("Country")}
                                  >
                                    ...
                                  </button>
                                </TableCell>
                              </TableRow>
                              {/* <DropdownInput
                              id="countrySelect"
                              label="Country"
                              onChange={(e) => updateFormValue("Country", e)}
                              options={this.state.countryData}
                              value={this.state.country}
                            /> */}

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
                                    style={{ width: "80%", height: 30 }}
                                    className="dropdown-css"
                                    id="stateSelect"
                                    onChange={(e) =>
                                      updateFormValue("State", e)
                                    }
                                    value={this.state.StateID}
                                  >
                                    <option value="-" disabled>
                                      Select
                                    </option>

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
                              {/* <DropdownInput
                              id="countrySelect"
                              label="Country"
                              onChange={(e) => updateFormValue("Country", e)}
                              options={this.state.countryData}
                              value={this.state.country}
                            />
                            <DropdownInput
                              id="stateSelect"
                              label="State"
                              onChange={(e) => updateFormValue("State", e)}
                              options={this.state.stateData}
                              value={this.state.state}
                            /> */}

                              <Tablerowcelltextboxinput
                                id="PhoneNo"
                                label="Phone No"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("PhoneNo", e)}
                                // InputProps={{

                                value={this.state.PhoneNo}
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
                                onChange={(e) => updateFormValue("Website", e)}
                                value={this.state.Website}
                                error={
                                  this.state.Validations.website.errorState
                                }
                                helperText={
                                  this.state.Validations.website.errorMsg
                                }
                              />
                            </TableBody>
                          </Table>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
          </Grid>
        </div>
        {dialog}
      </Fragment>
    );
  }
}
export default editcompany;
