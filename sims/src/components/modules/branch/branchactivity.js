import "../../user/dasboard.css";
import React, { Fragment } from "react";

import moment from "moment";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import DropdownInput from "../../compo/Tablerowcelldropdown";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableContainer from "@material-ui/core/TableContainer";

import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
 
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Tablerowcelldateinput from "../../compo/tablerowcelldateinput";
import UpdateIcon from "@material-ui/icons/Update";
import * as CF from "../../../services/functions/customfunctions";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import SwitchInput from "../../compo/tablerowcellswitchinput";

class editbranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      ProgressLoader: false,
      urlparams: null,
      ErrorPrompt: false,
      SuccessPrompt: false,
      GeneralDetailsExpanded: true,
      TaxationDetailsExpanded: false,
      NumberingExpanded: false,
      disabledUpdatebtn: false,
      disabledCreatebtn: true,
      numberSeries: [],
      companyData: [],
      countryData: [],
      stateData: [],
      branchData: [],
      currencyList: [],
      oldName: "",
      duplicate: false,
      typoTitle: "",
      type: null,
      branch: {
        IsTrading: true,
        AllowRounding:true,
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
        LPINo:null,
        EPINo:null,
        SPINo:null,
        TPINo:null,
        LSONo:null,
        ESONo:null,
        SSONo:null,
        TSONo:null,
        LSINo:null,
        ESINo:null,
        SSINo:null,
        TSINo:null,
        PSNo: 0,
        CPSNo:0,
        CNNo: 0,
        DNNo: 0,
        PRNo: 0,
        PONo: 0,
        PurInvNo: 0,
        GITNo: 0,
        SRNo: 0,
        SIssueNo: 0,
        JVNo: 0,
        PVNo: 0,
        CENo: 0,
        BankNo: 0,
        CashNo: 0,
        FGQCNo: 0,
        RMQCNo: 0,
        IJCNo: 0,
        LPONo:0,
IPONo:0,
        EffectiveDate: "",
        IsVat: false,
        VATNo: null,
        VATRegistrationNo: null,
        VATPercentage: null,
        IsGST: false,
        GSTNo: null,
        GSTRegistationDate:null,
        VATRegistationDate:null,
        RVNo: 0,
        PANNo: "",
        TANNo: "",
        CINNo: null,
        IECNo: null,
        ARNNo: null,
        IsSEZ: false,
        IsExportUnit: false,
        CurrID: 0,
      },
     /*
      IsTrading: true,
      AllowRounding:true,
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
      PINo: 0,
      SONo: 0,
      SINo: 0,
      PSNo: 0,
      CPSNo: 0,
      CNNo: 0,
      DNNo: 0,
      PRNo: 0,
      PONo: 0,
      PurInvNo: 0,
      GITNo: 0,
      SRNo: 0,
      SIssueNo: 0,
      JVNo: 0,
      PVNo: 0,
      CENo: 0,
      BankNo: 0,
      CashNo: 0,
      FGQCNo: 0,
      RMQCNo: 0,
      IJCNo: 0,
      EffectiveDate: null,
      IsVat: false,
      VATNo: null,
      VATRegistrationNo: null,
      VATPercentage: null,
      IsGST: false,
      GSTNo: null,

      PANNo: null,
      TANNo: null,
      CINNo: null,
      IECNo: null,
      ARNNo: null,
      IsSEZ: false,
      IsExportUnit: false,
      CurrID: 0,

      VATNoDisabled: true,
      VATPercentageDisabled: true,
      GSTNoDisabled: true,
*/
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
        PANNo: { errorState: false, errorMsg: "" },
        TANNo: { errorState: false, errorMsg: "" },
        CINNo: { errorState: false, errorMsg: "" },
        IECNo: { errorState: false, errorMsg: "" },
        ARNNo: { errorState: false, errorMsg: "" },
        VATNo: { errorState: false, errorMsg: "" },
        VATPercentage: { errorState: false, errorMsg: "" },
        GSTNo: { errorState: false, errorMsg: "" },
        PINo: { errorState: false, errorMsg: "" },
        SONo: { errorState: false, errorMsg: "" },
        SINo: { errorState: false, errorMsg: "" },
        PSNo: { errorState: false, errorMsg: "" },
        CPSNo: { errorState: false, errorMsg: "" },
        CNNo: { errorState: false, errorMsg: "" },
        DNNo: { errorState: false, errorMsg: "" },
        PRNo: { errorState: false, errorMsg: "" },
        PONo: { errorState: false, errorMsg: "" },
        PurInvNo: { errorState: false, errorMsg: "" },
        GITNo: { errorState: false, errorMsg: "" },
        SRNo: { errorState: false, errorMsg: "" },
        SIssueNo: { errorState: false, errorMsg: "" },
        JVNo: { errorState: false, errorMsg: "" },
        CENo: { errorState: false, errorMsg: "" },
        BankNo: { errorState: false, errorMsg: "" },
        CashNo: { errorState: false, errorMsg: "" },
        FGQCNo: { errorState: false, errorMsg: "" },
        RMQCNo: { errorState: false, errorMsg: "" },
        IJCNo: { errorState: false, errorMsg: "" },
      },
    };
  }

  componentDidMount() {
    this.getBranches();
    this.getCompanyList();
    this.getCountryList();
    this.getStateList();
    this.getCurrencyList();
    if (getCookie(COOKIE.USERID) != null) {
      this.setState({ isLoggedIn: true });
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      let type = url.searchParams.get("type");
      let editbranchId =
        type === "edit" ? url.searchParams.get("editbranchId") : 0;

      let typoTitle = "";
      type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");

      let urlparams =
        "?branchId=" +
        branchId +
        "&compName=" +
        compName +
        "&branchName=" +
        branchName;

      let branch = this.state.branch;

      if (type === "edit") {
        branch.branchId = CF.toInt(editbranchId);
        this.getBranchDetail(branch);
        this.getNumberSeries(CF.toInt(editbranchId));
      }

      this.setState({
        branch: branch,
        branchId: editbranchId,
        urlparams: urlparams,
        type: type,
        typoTitle: typoTitle,
        ProgressLoader: type === "add" ? true : false,
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  getCurrencyList = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetCurrencies;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].code,
            value: data[i].currId,
          };
          newD.push(o);
        }

        this.setState({
          currencyList: newD,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
  };

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
        this.processCompanyData(data)
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
        this.processStateData(data);
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

  processCompanyData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].companyName,
        value: data[i].companyId,
      };
      newData.push(d);
    }
    this.setState({ companyData: newData, ProgressLoader: true });
  }

  processStateData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].name,
        value: data[i].stateId,
      };
      newData.push(d);
    }
    this.setState({ stateData: newData, ProgressLoader: true });
  }

  getBranchDetail(branch) {
    try{
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
  
      const data = {
        validUser: ValidUser,
        branch: {
          branchId:branch.branchId
        },
      };
  
      let GetBranchUrl = APIURLS.APIURL.GetBranch;
  
      axios
        .post(GetBranchUrl, data, { headers })
        .then((response) => {
          let data = response.data;
  
          this.setStateParams(data);
        })
        .catch((error) => {
          this.setState({ branch: null, ProgressLoader: true });
        });
    }catch(ex){
      console.log("ex");
    }
    
  }

  setStateParams(data) {
    this.setState({
      oldName: data.name,
      branch: data,
      address: data.address,
      address2: data.address2,
      address3: data.address3,
      branchId: data.branchId,
      city: data.city,
      company: data.company,
      companyId: data.companyId,
      country: data.country,
      countryId: data.countryId,
      emailId: data.emailId,
      financialYears: data.financialYears,
      logoName: data.logoName,
      name: data.name,
      noSeries: data.noSeries,
      phoneNo: data.phoneNo,
      postcode: data.postcode,
      shortName: data.shortName,
      state: data.state,
      stateId: data.stateId,
      wareHouses: data.wareHouses,
      website: data.website,
      PINo: data.pino,
      SONo: data.sono,
      SINo: data.sino,
      PSNo: data.psno,
      CPSNo: data.cpsno,
      CNNo: data.cnno,
      DNNo: data.dnno,
      PRNo: data.prno,
      PONo: data.pono,
      PurInvNo: data.purInvNo,
      GITNo: data.gitno,
      SRNo: data.srno,
      SIssueNo: data.sissueno,
      JVNo: data.jvno,
      PVNo: data.pvno,
      CENo: data.ceno,
      BankNo: data.bankno,
      CashNo: data.cashno,
      FGQCNo: data.fgqcno,
      RMQCNo: data.rmqcno,
      IJCNo: data.ijcno,
      RVNo: data.rvno,
      EffectiveDate: moment(data.effectiveDate).format("YYYY-MM-DD"),
      IsVat: data.isVat === null ? false : data.isVat,
      isGst: data.isGst === null ? false : data.isGst,
      VATNo: data.vatno,
      VATRegistrationNo: null,
      VATPercentage: data.vatpercentage,
      IsGST: data.isGst === null ? false : data.isGst,
      GSTNo: data.gstno,
      IsTrading: data.isTrading === null ? false : data.isTrading,
      PANNo: data.panno,
      TANNo: data.tanno,
      CINNo: data.cinno,
      IECNo: data.iecno,
      ARNNo: data.arnno,
      IsSEZ: data.isSez === null ? false : data.isSez,
      IsExportUnit: data.isExportUnit === null ? false : data.isExportUnit,
      CurrID: data.currId,
      ProgressLoader: true,
    });
  }

  getNumberSeries(branchId) {
    let numberSeries = [];

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllNoSeriesByBranchId;
    let data = {
      ValidUser: ValidUser,
      BranchId: parseInt(branchId),
    };
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;

        if (response.status === 200) {
          let newData = [];
          let responseData = data.noSeriesDetailList;
          for (let i = 0; i < responseData.length; i++) {
            let d = {
              id: responseData[i].noSeriesId,
              value: responseData[i].noSeriesId,
              text: responseData[i].code,
            };
            newData.push(d);
          }
          this.setState({
            numberSeries: newData,
            ProgressLoader: true,
          });
        } else {
          this.setState({
            numberSeries: [],
            ProgressLoader: true,
            ErrorPrompt: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          numberSeries: [],
          ProgressLoader: true,
          ErrorPrompt: true,
        });
      });

    this.setState({ numberSeries: numberSeries });
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "TaxationDetailsExpanded") {
        this.state.TaxationDetailsExpanded === true
          ? this.setState({ TaxationDetailsExpanded: false })
          : this.setState({ TaxationDetailsExpanded: true });
      }
      if (val === "NumberingExpanded") {
        this.state.NumberingExpanded === true
          ? this.setState({ NumberingExpanded: false })
          : this.setState({ NumberingExpanded: true });
      }
    };

    const ValidateName = () => {
      if (
        this.state.name === "" ||
        this.state.name === null ||
        this.state.name.length > 50 ||
        this.state.duplicate === true
      ) {
        this.setState({ disabledUpdatebtn: true });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "shortName") {
        let branch = this.state.branch;
        branch.shortName = e.target.value;
        if (
          e.target.value === "" ||
          e.target.value === null ||
          e.target.value.length > 10
        ) {
          let v = this.state.Validations;
          if (e.target.value.length > 10) {
            v.shortName = {
              errorState: true,
              errorMsg: "Only 10 Characters are Allowed!",
            };
            this.setState({
              Validations: v,
              disabledUpdatebtn: true,
              disabledCreatebtn: true,
            });
          }
          if (e.target.value === "" || e.target.value === null) {
            v.shortName = {
              errorState: true,
              errorMsg: "Shortname cannot be blank",
            };
            this.setState({
              Validations: v,
              disabledUpdatebtn: true,
              disabledCreatebtn: true,
              shortName: e.target.value,
            });
          }
        } else {
          let v = this.state.Validations;
          v.shortName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            disabledCreatebtn: false,
            branch: branch,
            shortName: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "Company") {
        let branch = this.state.branch;
        branch.companyId = CF.toInt(e.target.value);
        this.setState({ branch: branch, companyId: e.target.value });
      }

      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateButExcludeName(
          this.state.branchData,
          "name",
          this.state.oldName,
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
              disabledUpdatebtn: true,
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
              disabledUpdatebtn: true,
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
              disabledUpdatebtn: true,
              disabledCreatebtn: true,
              name: e.target.value,
            });
          }
        } else {
          let v = this.state.Validations;
          v.name = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            name: e.target.value,
            branch: branch,
            disabledCreatebtn: false,
            disabledUpdatebtn: false,
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
            disabledUpdatebtn: true,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.phoneNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
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
            disabledUpdatebtn: true,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.website = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            disabledCreatebtn: false,
            branch: branch,
            website: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "CountryID") {
        let branch = this.state.branch;
        branch.countryId = CF.toInt(e.target.value);
        this.setState({ branch: branch, countryId: e.target.value });
      }
      if (id === "State") {
        let branch = this.state.branch;
        branch.stateId = CF.toInt(e.target.value);
        this.setState({ branch: branch, stateId: CF.toInt(e.target.value) });
      }

      if (id === "CurrID") {
        let branch = this.state.branch;
        branch.CurrID = CF.toInt(e.target.value);
        this.setState({ branch: branch, CurrID: CF.toInt(e.target.value) });
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
            disabledUpdatebtn: true,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.city = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
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
            disabledUpdatebtn: true,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
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
            disabledUpdatebtn: true,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
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
            disabledUpdatebtn: true,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address2 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
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
            disabledUpdatebtn: true,
            disabledCreatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address3 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            disabledCreatebtn: false,
            branch: branch,
            address3: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "IsTrading") {
        console.log("In is trading");
        let branch = this.state.branch;
        branch.IsTrading = e.target.checked;
        this.setState({
          branch: branch,
          IsTrading: e.target.checked,
        });
      }

      //----------------TAXATION------------

      if (id === "VATNo") {
        let branch = this.state.branch;
        branch.VATNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.VATNo = {
            errorState: true,
            errorMsg: "Only 20 chatracters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.VATNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            VATNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "VATPercentage") {
        let branch = this.state.branch;
        branch.VATPercentage = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 8) {
          v.VATPercentage = {
            errorState: true,
            errorMsg: "Only 8 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.VATPercentage = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            VATPercentage: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "GSTNo") {
        let branch = this.state.branch;
        branch.GSTNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.GSTNo = {
            errorState: true,
            errorMsg: "Only 20 characters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.GSTNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            GSTNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "PANNo") {
        let branch = this.state.branch;
        branch.PANNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.PANNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.PANNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            PANNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "TANNo") {
        let branch = this.state.branch;
        branch.TANNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.TANNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.TANNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            TANNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "CINNo") {
        let branch = this.state.branch;
        branch.CINNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.CINNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.CINNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            CINNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "IECNo") {
        let branch = this.state.branch;
        branch.IECNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.IECNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.IECNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            IECNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "ARNNo") {
        let branch = this.state.branch;
        branch.ARNNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.ARNNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.ARNNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            ARNNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "IsSEZ") {
        let branch = this.state.branch;

        branch.IsSEZ = e.target.checked;
        this.setState({ branch: branch, IsSEZ: e.target.checked });
      }
      if (id === "IsExportUnit") {
        let branch = this.state.branch;
        branch.IsExportUnit = e.target.checked;
        this.setState({ branch: branch, IsExportUnit: e.target.checked });
      }

      //---------------Numbering-----------
      if (id === "PINo") {
        let branch = this.state.branch;
        branch.PINo = CF.toInt(e.target.value);
        this.setState({ branch: branch, PINo: e.target.value });
      }
      if (id === "SONo") {
        let branch = this.state.branch;
        branch.SONo = CF.toInt(e.target.value);
        this.setState({ branch: branch, SONo: e.target.value });
      }
      if (id === "SINo") {
        let branch = this.state.branch;
        branch.SINo = CF.toInt(e.target.value);
        this.setState({ branch: branch, SINo: e.target.value });
      }
      if (id === "PSNo") {
        let branch = this.state.branch;
        branch.PSNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, PSNo: e.target.value });
      }
      if (id === "CPSNo") {
        let branch = this.state.branch;
        branch.CPSNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, CPSNo: e.target.value });
      }
      if (id === "CNNo") {
        let branch = this.state.branch;
        branch.CNNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, CNNo: e.target.value });
      }
      if (id === "DNNo") {
        let branch = this.state.branch;
        branch.DNNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, DNNo: e.target.value });
      }
      if (id === "PRNo") {
        let branch = this.state.branch;
        branch.PRNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, PRNo: e.target.value });
      }
      if (id === "PONo") {
        let branch = this.state.branch;
        branch.PONo = CF.toInt(e.target.value);

        this.setState({ branch: branch, PONo: e.target.value });
      }
      if (id === "PurInvNo") {
        let branch = this.state.branch;
        branch.PurInvNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, PurInvNo: e.target.value });
      }
      if (id === "GITNo") {
        let branch = this.state.branch;
        branch.GITNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, GITNo: e.target.value });
      }
      if (id === "SRNo") {
        let branch = this.state.branch;
        branch.SRNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, SRNo: e.target.value });
      }
      if (id === "SIssueNo") {
        let branch = this.state.branch;
        branch.SIssueNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, SIssueNo: e.target.value });
      }
      if (id === "JVNo") {
        let branch = this.state.branch;
        branch.JVNo = CF.toInt(e.target.value);
        this.setState({ branch: branch, JVNo: e.target.value });
      }
      if (id === "PVNo") {
        let branch = this.state.branch;
        branch.PVNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, PVNo: e.target.value });
      }
      if (id === "CENo") {
        let branch = this.state.branch;
        branch.CENo = CF.toInt(e.target.value);

        this.setState({ branch: branch, CENo: e.target.value });
      }
      if (id === "BankNo") {
        let branch = this.state.branch;
        branch.BankNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, BankNo: e.target.value });
      }
      if (id === "CashNo") {
        let branch = this.state.branch;
        branch.CashNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, CashNo: e.target.value });
      }
      if (id === "FGQCNo") {
        let branch = this.state.branch;
        branch.FGQCNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, FGQCNo: e.target.value });
      }
      if (id === "RMQCNo") {
        let branch = this.state.branch;
        branch.RMQCNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, RMQCNo: e.target.value });
      }
      if (id === "IJCNo") {
        let branch = this.state.branch;
        branch.IJCNo = CF.toInt(e.target.value);

        this.setState({ branch: branch, IJCNo: e.target.value });
      }
      if (id === "RVNo") {
        let branch = this.state.branch;
        branch.RVNo = CF.toInt(e.target.value);
      }
      if (id === "EffectiveDate") {
        // moment().format("YYYY-MM-DD")
        let branch = this.state.branch;
        branch.EffectiveDate = e.target.value;
        this.setState({ branch: branch, EffectiveDate: e.target.value });
      }
    };

     

    const VAT_GST_Checkbox_Click = (e, param) => {
      if (param === "isvat") {
        let branch = this.state.branch;

        if (e.target.checked === true) {
          branch.IsVat = true;
          this.setState({
            VATNoDisabled: false,
            VATPercentageDisabled: false,
            branch: branch,
            IsVat: true,
          });
        }
        if (e.target.checked === false) {
          branch.IsVat = false;
          this.setState({
            VATNoDisabled: true,
            VATPercentageDisabled: true,
            branch: branch,
            IsVat: false,
          });
        }
      }
      if (param === "isgst") {
        let branch = this.state.branch;
        if (e.target.checked === true) {
          branch.IsGST = true;
          this.setState({ GSTNoDisabled: false, IsGST: true, branch: branch });
        }
        if (e.target.checked === false) {
          branch.IsGST = false;
          this.setState({ GSTNoDisabled: true, IsGST: false, branch: branch });
        }
      }
    };

    const handleCreate = () => {
      ValidateName();
      this.setState({ ProgressLoader: false });
      let branch = this.state.branch;
      branch.EffectiveDate = moment(branch.EffectiveDate).format("MM/DD/YYYY");

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

    const handleupdate = () => {
      ValidateName();
      this.setState({ ProgressLoader: false });

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let branch = this.state.branch;
      branch.EffectiveDate = moment(branch.EffectiveDate).format("MM/DD/YYYY");
      let dup = "isTrading";
      delete branch[dup];

      const data = {
        validUser: ValidUser,
        branch: branch,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateBranchUrl = APIURLS.APIURL.UpdateBranch;
      axios
        .post(UpdateBranchUrl, data, { headers })
        .then((response) => {
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
                  typoTitle="Edit Branch"
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
                  {this.state.type === "edit" ? (
                    <Button
                      className="action-btns"
                      onClick={handleupdate}
                      disabled={this.state.disabledUpdatebtn}
                    >
                      {APIURLS.buttonTitle.update}
                    </Button>
                  ) : null}

                  {this.state.type === "add" ? (
                    <Button
                      className="action-btns"
                      onClick={handleCreate}
                      disabled={this.state.disabledCreatebtn}
                    >
                      {APIURLS.buttonTitle.save}
                    </Button>
                  ) : null}
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={9} lg={9}>
              <Grid container spacing={1}>
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
                      onClick={(e) =>
                        handleAccordionClick("GeneralDetailsExpanded", e)
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        General Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={1}>
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
                                  id="companySelect"
                                  label="Company"
                                  onChange={(e) =>
                                    updateFormValue("Company", e)
                                  }
                                  options={this.state.companyData}
                                  value={this.state.branch.companyId}
                                />
                               
                                <Tablerowcelltextboxinput
                                  id="Name"
                                  label="Name"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("Name", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.name}
                                  error={this.state.Validations.name.errorState}
                                  helperText={
                                    this.state.Validations.name.errorMsg
                                  }
                                  isMandatory={true}
                                />

                                <Tablerowcelltextboxinput
                                  id="shortName"
                                  label="ShortName"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("shortName", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.shortName}
                                  error={
                                    this.state.Validations.shortName.errorState
                                  }
                                  helperText={
                                    this.state.Validations.shortName.errorMsg
                                  }
                                  isMandatory={true}
                                />

                                <Tablerowcelltextboxinput
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
                                  value={this.state.branch.phoneNo}
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
                                  value={this.state.branch.website}
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
                                 
                                  value={this.state.branch.EffectiveDate}
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
                                  value={this.state.branch.countryId}
                                />
                                <DropdownInput
                                  id="stateSelect"
                                  label="State"
                                  onChange={(e) => updateFormValue("State", e)}
                                  options={this.state.stateData}
                                  value={this.state.branch.stateId}
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
                                  value={this.state.branch.city}
                                  error={this.state.Validations.city.errorState}
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
                                  value={this.state.branch.postcode}
                                  error={
                                    this.state.Validations.postcode.errorState
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
                                  value={this.state.branch.address}
                                  error={
                                    this.state.Validations.address.errorState
                                  }
                                  helperText={
                                    this.state.Validations.address.errorMsg
                                  }
                                />

                                <Tablerowcelltextboxinput
                                  id="Address2"
                                  label="Address Line 2"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address2", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.address2}
                                  error={
                                    this.state.Validations.address2.errorState
                                  }
                                  helperText={
                                    this.state.Validations.address2.errorMsg
                                  }
                                />

                                <Tablerowcelltextboxinput
                                  id="Address3"
                                  label="Address Line 3"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address3", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.address3}
                                  error={
                                    this.state.Validations.address3.errorState
                                  }
                                  helperText={
                                    this.state.Validations.address3.errorMsg
                                  }
                                />

                                <SwitchInput
                                  key="IsTrading"
                                  id="IsTrading"
                                  label="IsTrading"
                                  param={this.state.branch.IsTrading}
                                  onChange={(e) =>
                                    updateFormValue("IsTrading", e)
                                  }
                                />

                                <SwitchInput
                                  key="AllowRounding"
                                  id="AllowRounding"
                                  label="Allow Rounding"
                                  param={this.state.branch.AllowRounding}
                                  onChange={(e) =>
                                    updateFormValue("AllowRounding", e)
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
                    key="company-Taxation-Details"
                    expanded={this.state.TaxationDetailsExpanded}
                  >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) =>
                            handleAccordionClick("TaxationDetailsExpanded", e)
                          }
                        />
                      }
                      onClick={(e) =>
                        handleAccordionClick("TaxationDetailsExpanded", e)
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        Taxation Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={2}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="Taxation table"
                            >
                              <TableBody className="tableBody">
                                <DropdownInput
                                  id="CurrID"
                                  label="Currency"
                                  onChange={(e) => updateFormValue("CurrID", e)}
                                  options={this.state.currencyList}
                                  value={this.state.branch.CurrID}
                                />

                                <Tablerowcelltextboxinput
                                  id="PANNo"
                                  label="PAN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("PANNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.branch.PANNo}
                                  error={
                                    this.state.Validations.PANNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.PANNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="TANNo"
                                  label="TAN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("TANNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.branch.TANNo}
                                  error={
                                    this.state.Validations.TANNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.TANNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="CINNo"
                                  label="CIN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("CINNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.branch.CINNo}
                                  error={
                                    this.state.Validations.CINNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CINNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="IECNo"
                                  label="IEC No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("IECNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.branch.IECNo}
                                  error={
                                    this.state.Validations.IECNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.IECNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="ARNNo"
                                  label="ARN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("ARNNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.branch.ARNNo}
                                  error={
                                    this.state.Validations.ARNNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.ARNNo.errorMsg
                                  }
                                />

                                <SwitchInput
                                  key="IsSEZ"
                                  id="IsSEZ"
                                  label="Is SEZ?"
                                  param={this.state.branch.IsSEZ}
                                  onChange={(e) =>
                                    updateFormValue("IsSEZ", e)
                                  }
                                />

                               <SwitchInput
                                  key="IsExportUnit"
                                  id="IsExportUnit"
                                  label="Is Export Unit?"
                                  param={this.state.branch.IsExportUnit}
                                  onChange={(e) =>
                                    updateFormValue("IsExportUnit", e)
                                  }
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
                              aria-label="Taxation table"
                            >
                              <TableBody className="tableBody">
                              <SwitchInput
                                  key="IsVat"
                                  id="IsVat"
                                  label="Is VAT?"
                                  param={this.state.branch.IsVat}
                                  onChange={(e) =>
                                    updateFormValue("isvat", e)
                                  }
                                />


{/* Addd this -> above   VAT_GST_Checkbox_Click(e, "isvat") */}

                                <Tablerowcelldateinput
                                  id="VATRegistationDate"
                                  label="VAT Registation Date"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("VATRegistationDate", e)
                                  }

                                  value={this.state.branch.GSTRegistationDate}
                                  error={null}
                                  helperText={null}
                                />

                               

                                <Tablerowcelltextboxinput
                                  id="VATNo"
                                  label="VAT No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("VATNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.branch.VATNo}
                                  disabled={this.state.VATNoDisabled}
                                  error={
                                    this.state.Validations.VATNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.VATNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  type="number"
                                  id="VATPercentage"
                                  label="VAT Percentage"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("VATPercentage", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 8,
                                  }}
                                  value={this.state.branch.VATPercentage}
                                  disabled={this.state.VATPercentageDisabled}
                                  error={
                                    this.state.Validations.VATPercentage
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.VATPercentage
                                      .errorMsg
                                  }
                                />


                                <SwitchInput
                                  key="isgst"
                                  id="isgst"
                                  label="Is GST?"
                                  param={this.state.branch.IsGST}
                                  onChange={(e) =>
                                    updateFormValue("isgst", e)
                                  }
                                />
                                 {/*  Add this criteria above  ->   VAT_GST_Checkbox_Click(e, "isgst") */}

                                 

                                <Tablerowcelltextboxinput
                                  id="GSTNo"
                                  label="GST No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("GSTNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.GSTNo}
                                  disabled={this.state.GSTNoDisabled}
                                  error={
                                    this.state.Validations.GSTNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.GSTNo.errorMsg
                                  }
                                />

                                <Tablerowcelldateinput
                                  id="GSTRegistationDate"
                                  label="GST Registation Date"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("GSTRegistationDate", e)
                                  }

                                  value={this.state.branch.GSTRegistationDate}
                                  error={null}
                                  helperText={null}
                                />





                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    key="company-Numbering"
                    expanded={this.state.NumberingExpanded}
                  >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) =>
                            handleAccordionClick("NumberingExpanded", e)
                          }
                        />
                      }
                      onClick={(e) =>
                        handleAccordionClick("NumberingExpanded", e)
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        Numbering
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={1}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="Numbering table"
                            >
                              <TableBody className="tableBody">
                               
                                <DropdownInput
                                  id="LPINo"
                                  label="Local Proforma Invoice"
                                  value={this.state.branch.LPINo}
                                  onChange={(e) => updateFormValue("LPINo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="EPINo"
                                  label="Export Proforma Invoice"
                                  value={this.state.branch.EPINo}
                                  onChange={(e) => updateFormValue("EPINo", e)}
                                  options={this.state.numberSeries}
                                />
                                 <DropdownInput
                                  id="SPINo"
                                  label="Sample Proforma Invoice"
                                  value={this.state.branch.SPINo}
                                  onChange={(e) => updateFormValue("SPINo", e)}
                                  options={this.state.numberSeries}
                                />
                                 <DropdownInput
                                  id="TPINo"
                                  label="Trading Proforma Invoice"
                                  value={this.state.branch.TPINo}
                                  onChange={(e) => updateFormValue("TPINo", e)}
                                  options={this.state.numberSeries}
                                />


                                <DropdownInput
                                  id="LSONo"
                                  label="Local Sales Order"
                                  value={this.state.branch.LSONo}
                                  onChange={(e) => updateFormValue("LSONo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="ESONo"
                                  label="Export Sales Order"
                                  value={this.state.branch.ESONo}
                                  onChange={(e) => updateFormValue("ESONo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="SSONo"
                                  label="Sample Sales Order"
                                  value={this.state.branch.SSONo}
                                  onChange={(e) => updateFormValue("SSONo", e)}
                                  options={this.state.numberSeries}
                                />
                                 <DropdownInput
                                  id="TSONo"
                                  label="Trading Sales Order"
                                  value={this.state.branch.TSONo}
                                  onChange={(e) => updateFormValue("TSONo", e)}
                                  options={this.state.numberSeries}
                                />




                                <DropdownInput
                                  id="LSINo"
                                  label="Local Sales Invoice"
                                  value={this.state.LSINo}
                                  onChange={(e) => updateFormValue("LSINo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="ESINo"
                                  label="Export Sales Invoice"
                                  value={this.state.branch.ESINo}
                                  onChange={(e) => updateFormValue("ESINo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="SSINo"
                                  label="Sample Sales Invoice"
                                  value={this.state.branch.SSINo}
                                  onChange={(e) => updateFormValue("SSINo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="TSINo"
                                  label="Trading Sales Invoice"
                                  value={this.state.branch.TSINo}
                                  onChange={(e) => updateFormValue("TSINo", e)}
                                  options={this.state.numberSeries}
                                />



                                <DropdownInput
                                  id="PSNo"
                                  label="Pack slip"
                                  value={this.state.branch.PSNo}
                                  onChange={(e) => updateFormValue("PSNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="CPSNo"
                                  label="Combine Pack Slip"
                                  value={this.state.branch.CPSNo}
                                  onChange={(e) => updateFormValue("CPSNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="CNNo"
                                  label="Credit Note"
                                  value={this.state.branch.CNNo}
                                  onChange={(e) => updateFormValue("CNNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="DNNo"
                                  label="Debit Note"
                                  value={this.state.branch.DNNo}
                                  onChange={(e) => updateFormValue("DNNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="PRNo"
                                  label="Purchase Request"
                                  value={this.state.branch.PRNo}
                                  onChange={(e) => updateFormValue("PRNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="LPONo"
                                  label="Local Purchase Order"
                                  value={this.state.branch.LPONo}
                                  onChange={(e) => updateFormValue("LPONo", e)}
                                  options={this.state.numberSeries}
                                />

<DropdownInput
                                  id="IPONo"
                                  label="Import Purchase Order"
                                  value={this.state.branch.IPONo}
                                  onChange={(e) => updateFormValue("IPONo", e)}
                                  options={this.state.numberSeries}
                                />




                                <DropdownInput
                                  id="PurInvNo"
                                  label="Purchase Invoice"
                                  value={this.state.branch.PurInvNo}
                                  onChange={(e) =>
                                    updateFormValue("PurInvNo", e)
                                  }
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="GITNo"
                                  label="GIT"
                                  value={this.state.branch.GITNo}
                                  onChange={(e) => updateFormValue("GITNo", e)}
                                  options={this.state.numberSeries}
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
                              aria-label="Numbering table"
                            >
                              <TableBody className="tableBody">
                                <DropdownInput
                                  id="SRNo"
                                  label="Store Requisition"
                                  value={this.state.branch.SRNo}
                                  onChange={(e) => updateFormValue("SRNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="SIssueNo"
                                  label="Store Issue"
                                  value={this.state.branch.SIssueNo}
                                  onChange={(e) =>
                                    updateFormValue("SIssueNo", e)
                                  }
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="JVNo"
                                  label="Journal Voucher"
                                  value={this.state.branch.JVNo}
                                  onChange={(e) => updateFormValue("JVNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="PVNo"
                                  label="Payment Voucher"
                                  value={this.state.branch.PVNo}
                                  onChange={(e) => updateFormValue("PVNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="RVNo"
                                  label="Receipt Voucher"
                                  value={this.state.branch.RVNo}
                                  onChange={(e) => updateFormValue("RVNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="CENo"
                                  label="Contra Entry"
                                  value={this.state.branch.CENo}
                                  onChange={(e) => updateFormValue("CENo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="BankNo"
                                  label="Bank"
                                  value={this.state.branch.BankNo}
                                  onChange={(e) => updateFormValue("BankNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="CashNo"
                                  label="Cash"
                                  value={this.state.branch.CashNo}
                                  onChange={(e) => updateFormValue("CashNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="FGQCNo"
                                  label="FG QC No"
                                  value={this.state.branch.FGQCNo}
                                  onChange={(e) => updateFormValue("FGQCNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="RMQCNo"
                                  label="RM QC No"
                                  value={this.state.branch.RMQCNo}
                                  onChange={(e) => updateFormValue("RMQCNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <DropdownInput
                                  id="IJCNo"
                                  label="IJC"
                                  value={this.state.branch.IJCNo}
                                  onChange={(e) => updateFormValue("IJCNo", e)}
                                  options={this.state.numberSeries}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
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
export default editbranch;
