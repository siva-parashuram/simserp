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
      disabledCreatebtn: false,
      numberSeries: [],
      companyData: [],
      MasterCountryData: [],
      countryData: [],
      stateData: [],
      branchData: [],
      currencyList: [],
      oldName: "",
      duplicate: false,
      typoTitle: "",
      type: null,
      branch: {
        BranchID: 0,
        CompanyID: 0,
        Name: "",
        ShortName: "",
        Address: "",
        Address2: "",
        Address3: "",
        City: "",
        Postcode: "",
        CountryID: 0,
        StateID: 0,
        PhoneNo: "",
        FAXNo: "",
        Website: "",
        EmailID: "",
        LogoName: "",
        EffectiveDate: "",
        ContactPerson: "",
        IsTrading: true,
        IsVAT: false,
        VATNo: "",
        VATRegistationDate: "",
        VATPercentage: 0,
        IsGST: false,
        GSTNo: "",
        GSTRegistationDate: "",
        PANNo: "",
        TANNo: "",
        CINNo: "",
        IECNo: "",
        ARNNo: "",
        IsSEZ: true,
        IsExportUnit: true,
        CurrID: 0,
        AllowRounding: true,
        LPINo: 0,
        EPINo: 0,
        SPINo: 0,
        TPINo: 0,
        LSONo: 0,
        ESONo: 0,
        SSONo: 0,
        TSONo: 0,
        LSINo: 0,
        ESINo: 0,
        SSINo: 0,
        TSINo: 0,
        PSNo: 0,
        CPSNo: 0,
        CNNo: 0,
        DNNo: 0,
        PRNo: 0,
        LPONo: 0,
        IPONo: 0,
        PurInvNo: 0,
        GITNo: 0,
        SRNo: 0,
        SIssueNo: 0,
        JVNo: 0,
        PVNo: 0,
        RVNo: 0,
        CENo: 0,
        BankNo: 0,
        CashNo: 0,
        FGQCNo: 0,
        RMQCNo: 0,
        IJCNo: 0,
      },
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
    // this.getStateList();
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
      .catch((error) => { });
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
      .catch((error) => { });
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
      .catch((error) => { });
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
    try {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };

      const data = {
        validUser: ValidUser,
        branch: {
          branchId: branch.branchId
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
    } catch (ex) {
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


    const updateFormValue = (param, e) => {
      let branch = this.state.branch;
      switch (param) {
        case "CompanyID":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "Name":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "ShortName":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "Address":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "Address2":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "Address3":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "City":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "Postcode":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "CountryID":
          this.getStateByCountry(CF.toInt(e.target.value));
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "StateID":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "PhoneNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "FAXNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "Website":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "EmailID":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "EffectiveDate":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "ContactPerson":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "VATNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "VATRegistationDate":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "VATPercentage":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "GSTNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "GSTRegistationDate":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "PANNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "TANNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "CINNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "IECNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "ARNNo":
          branch[param] = e.target.value;
          setParams(branch);
          break;
        case "CurrID":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "LPINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "EPINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "SPINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "TPINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "LSONo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "ESONo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "SSONo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "TSONo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "LSINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "ESINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "SSINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "TSINo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "PSNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "CPSNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;

        case "CNNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;

        case "DNNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;

        case "PRNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;

        case "LPONo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "IPONo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "PurInvNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "GITNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "SRNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "SIssueNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "JVNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "PVNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "RVNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "CENo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "BankNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "CashNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "FGQCNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "RMQCNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        case "IJCNo":
          branch[param] = CF.toInt(e.target.value);
          setParams(branch);
          break;
        default:
          branch[param] = e.target.checked;
          setParams(branch);
          break;

      }

    };

    const setParams = (object) => {
      this.setState({ Customer: object });
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
     
      this.setState({ ProgressLoader: false });
      let branch = this.state.branch;
      branch.EffectiveDate = moment(branch.EffectiveDate).format("MM/DD/YYYY");
      branch.VATRegistationDate = moment(branch.VATRegistationDate).format("MM/DD/YYYY");
      branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format("MM/DD/YYYY");
      

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        Branch: branch,
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
        .catch((error) => { });
    };

    const handleupdate = () => {
      ValidateName();
      this.setState({ ProgressLoader: false });

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let branch = this.state.branch;
      branch.EffectiveDate = moment(branch.EffectiveDate).format("MM/DD/YYYY");
      branch.VATRegistationDate = moment(branch.VATRegistationDate).format("MM/DD/YYYY");
      branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format("MM/DD/YYYY");
      

      const data = {
        validUser: ValidUser,
        Branch: branch,
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
        .catch((error) => { });
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
                                  isMandatory={true}
                                  id="CompanyID"
                                  label="Company"
                                  onChange={(e) =>
                                    updateFormValue("CompanyID", e)
                                  }
                                  options={this.state.companyData}
                                  value={this.state.branch.CompanyID}
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
                                  value={this.state.branch.Name}
                                  error={this.state.Validations.name.errorState}
                                  helperText={
                                    this.state.Validations.name.errorMsg
                                  }
                                  isMandatory={true}
                                />

                                <Tablerowcelltextboxinput
                                  id="ShortName"
                                  label="ShortName"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("ShortName", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.ShortName}
                                  error={
                                    this.state.Validations.shortName.errorState
                                  }
                                  helperText={
                                    this.state.Validations.shortName.errorMsg
                                  }
                                  isMandatory={true}
                                />

                                <Tablerowcelltextboxinput
                                  id="PhoneNo"
                                  label="Phone No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("PhoneNo", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.PhoneNo}
                                  error={
                                    this.state.Validations.phoneNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.phoneNo.errorMsg
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
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.branch.Website}
                                  error={
                                    this.state.Validations.website.errorState
                                  }
                                  helperText={
                                    this.state.Validations.website.errorMsg
                                  }
                                />

                                <Tablerowcelldateinput
                                  isMandatory={true}
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
                                <SwitchInput
                                  key="IsTrading"
                                  id="IsTrading"
                                  label="Is Trading?"
                                  param={this.state.branch.IsTrading}
                                  onChange={(e) =>
                                    updateFormValue("IsTrading", e)
                                  }
                                />

                                <SwitchInput
                                  key="AllowRounding"
                                  id="AllowRounding"
                                  label="Allow Rounding?"
                                  param={this.state.branch.AllowRounding}
                                  onChange={(e) =>
                                    updateFormValue("AllowRounding", e)
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
                              aria-label="company List table"
                            >
                              <TableBody className="tableBody">
                                <DropdownInput
                                  isMandatory={true}
                                  id="CountryID"
                                  label="Country"
                                  onChange={(e) =>
                                    updateFormValue("CountryID", e)
                                  }
                                  options={this.state.countryData}
                                  value={this.state.branch.CountryID}
                                />
                                <DropdownInput
                                  id="StateID"
                                  label="State"
                                  onChange={(e) => updateFormValue("StateID", e)}
                                  options={this.state.stateData}
                                  value={this.state.branch.StateID}
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
                                  value={this.state.branch.City}
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
                                  value={this.state.branch.Postcode}
                                  error={
                                    this.state.Validations.postcode.errorState
                                  }
                                  helperText={
                                    this.state.Validations.postcode.errorMsg
                                  }
                                />

                                <Tablerowcelltextboxinput
                                  isMandatory={true}
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
                                  value={this.state.branch.Address}
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
                                  value={this.state.branch.Address2}
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
                                  value={this.state.branch.Address3}
                                  error={
                                    this.state.Validations.address3.errorState
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
                                  isMandatory={true}
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
                                  key="IsVAT"
                                  id="IsVAT"
                                  label="Is VAT?"
                                  param={this.state.branch.IsVAT}
                                  onChange={(e) =>
                                    updateFormValue("IsVAT", e)
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

                                  value={this.state.branch.VATRegistationDate}
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
                                  key="IsGST"
                                  id="IsGST"
                                  label="Is GST?"
                                  param={this.state.branch.IsGST}
                                  onChange={(e) =>
                                    updateFormValue("IsGST", e)
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
