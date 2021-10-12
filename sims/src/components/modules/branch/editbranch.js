import React, { Fragment } from 'react';
import Header from "../../user/userheaderconstants";
 


import moment from "moment";
import Nav from "../../user/nav";
import '../../user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Divider from '@material-ui/core/Divider';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TableContainer from '@material-ui/core/TableContainer';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';



import Tablerowcelldropdowninput from "../../compo/tablerowcelldropdowninput";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Tablerowcelldateinput from "../../compo/tablerowcelldateinput";


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
      numberSeries: [],
      companyData: [],
      countryData: [],
      stateData: [],
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
        postcode: null,
        shortName: null,
        state: null,
        stateId: null,
        wareHouses: [],
        website: null,
        PINo: null,
        SONo: null,
        SINo: null,
        PSNo: null,
        CPSNo: null,
        CNNo: null,
        DNNo: null,
        PRNo: null,
        PONo: null,
        PurInvNo: null,
        GITNo: null,
        SRNo: null,
        SIssueNo: null,
        JVNo: null,
        PVNo: null,
        CENo: null,
        BankNo: null,
        CashNo: null,
        FGQCNo: null,
        RMQCNo: null,
        IJCNo: null,
        EffectiveDate:null,
        IsVat:false,
        VATNo:null,
        VATRegistrationNo:null,
        VATPercentage:null,
        IsGST:false,
        GSTNo:null,
       
        PANNo:null,
        TANNo:null,
        CINNo:null,
        IECNo:null,
        ARNNo:null,
        IsSEZ:false,
        IsExportUnit:false,
        CurrID:null,
      }
      ,
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
      PINo: null,
      SONo: null,
      SINo: null,
      PSNo: null,
      CPSNo: null,
      CNNo: null,
      DNNo: null,
      PRNo: null,
      PONo: null,
      PurInvNo: null,
      GITNo: null,
      SRNo: null,
      SIssueNo: null,
      JVNo: null,
      PVNo: null,
      CENo: null,
      BankNo: null,
      CashNo: null,
      FGQCNo: null,
      RMQCNo: null,
      IJCNo: null,
      EffectiveDate:null,
      IsVat:false,
      VATNo:null,
      VATRegistrationNo:null,
      VATPercentage:null,
      IsGST:false,
      GSTNo:null,
      
      PANNo:null,
      TANNo:null,
      CINNo:null,
      IECNo:null,
      ARNNo:null,
      IsSEZ:false,
      IsExportUnit:false,
      CurrID:null,
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

    }

  }

  componentDidMount() {
    if (
      getCookie(COOKIE.USERID) != null
    ) {

      this.setState({ isLoggedIn: true });
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      let editbranchId = url.searchParams.get("editbranchId");
      let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
      let branch = this.state.branch;
      branch.branchId = editbranchId;
      this.setState({
        urlparams: urlparams,
        branchId: editbranchId,
        branch: branch
      }, () => {
        this.getCompanyList();
        this.getCountryList();
        this.getStateList();
        this.getBranchDetail();
        this.getNumberSeries(editbranchId);
      });
    } else {
      this.setState({ isLoggedIn: false });
    }


  }
  getCompanyList() {
    let rows = [];

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json"
    };
    let GetCompaniesUrl = APIURLS.APIURL.GetCompanies;

    axios.post(GetCompaniesUrl, ValidUser, { headers })
      .then(response => {
        let data = response.data;
        console.log("getCompanyList > response > data > ", data);
        rows = data;
        this.setState({ companyData: rows, ProgressLoader: true });
      }
      ).catch(error => {
        console.log("error > ", error);
      });


  }

  getStateList() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json"
    };
    let GetStatesUrl = APIURLS.APIURL.GetStates;

    axios.post(GetStatesUrl, ValidUser, { headers })
      .then(response => {
        let data = response.data;
        console.log("getStateList > response > data > ", data);
        rows = data;
        this.setState({ stateData: rows, ProgressLoader: true });
      }
      ).catch(error => {
        console.log("error > ", error);
      });
  }

  getCountryList() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json"
    };
    let GetCountryUrl = APIURLS.APIURL.GetCountries;

    axios.post(GetCountryUrl, ValidUser, { headers })
      .then(response => {
        let data = response.data;
        console.log("getCountryList > response > data > ", data);
        rows = data;
        this.setState({ countryData: rows });
      }
      ).catch(error => {
        console.log("error > ", error);
      });
  }


  getBranchDetail() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json"
    };

    const data = {
      validUser: ValidUser,
      branch: this.state.branch
    };

    let GetBranchUrl = APIURLS.APIURL.GetBranch;

    axios.post(GetBranchUrl, data, { headers })
      .then(response => {
        let data = response.data;
        console.log("getBranchDetail > response > data > ", data);
        this.setStateParams(data);

      }
      ).catch(error => {
        console.log("error > ", error);
        this.setState({ branch: null, ProgressLoader: true });
      });

  }


  setStateParams(data) {
    console.log("-> data : ",data);
    this.setState({
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
      EffectiveDate:moment(data.effectiveDate).format("YYYY-MM-DD"),
      IsVat:data.isVat===null?false:data.isVat,
      VATNo:data.vatno,
      VATRegistrationNo:null,
      VATPercentage:data.vatpercentage,
      IsGST:data.isGst===null?false:data.isGst,
      GSTNo:data.gstno,
      
      PANNo:data.panno,
      TANNo:data.tanno,
      CINNo:data.cinno,
      IECNo:data.iecno,
      ARNNo:data.arnno,
      IsSEZ:data.isSez===null?false:data.isSez,
      IsExportUnit:data.isExportUnit===null?false:data.isExportUnit,
      CurrID:data.currId,
      ProgressLoader: true
    });
  }

  getNumberSeries(branchId) {
    let numberSeries = [];

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json"
    };
    let Url = APIURLS.APIURL.GetAllNoSeriesByBranchId;
    let data = {
      ValidUser: ValidUser,
      BranchId: parseInt(branchId)
    };
    axios.post(Url, data, { headers })
      .then(response => {
        let data = response.data;
        console.log("getNumberSeries > response > data > ", data);
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
            ProgressLoader: true
          });
        } else {
          this.setState({
            numberSeries: [],
            ProgressLoader: true,
            ErrorPrompt: true
          });
        }

      }
      ).catch(error => {
        console.log("error > ", error);
        this.setState({
          numberSeries: [],
          ProgressLoader: true,
          ErrorPrompt: true
        });
      });

    this.setState({ numberSeries: numberSeries });
  }

  render() {

    const handleAccordionClick = (val, e) => {
      console.log("handleAccordionClick > val > ", val);
      console.log("handleAccordionClick > e > ", e);
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true ? this.setState({ GeneralDetailsExpanded: false }) : this.setState({ GeneralDetailsExpanded: true })
      }
      if (val === "TaxationDetailsExpanded") {
        this.state.TaxationDetailsExpanded === true ? this.setState({ TaxationDetailsExpanded: false }) : this.setState({ TaxationDetailsExpanded: true })
      }
      if (val === "NumberingExpanded") {
        this.state.NumberingExpanded === true ? this.setState({ NumberingExpanded: false }) : this.setState({ NumberingExpanded: true })
      }



    }

    const ValidateName = () => {
      if (this.state.name === "" || this.state.name === null || this.state.name.length > 50) {
        this.setState({ disabledUpdatebtn: true });
      } else {
        this.setState({ disabledUpdatebtn: false });
      }
      return;
    }

    const updateFormValue = (id, e) => {
      
      if (id === "shortName") {
        let branch = this.state.branch;
        branch.shortName = e.target.value;
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.shortName = { errorState: true, errorMsg: "Only 10 Characters are Allowed!" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.shortName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            shortName: e.target.value
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
        let branch = this.state.branch;
        branch.name = e.target.value;
        if (e.target.value === "" || e.target.value === null || e.target.value.length > 50) {
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.name = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" };
            this.setState({
              Validations: v,
              disabledUpdatebtn: true,
            });

          }
          if (e.target.value === "" || e.target.value === null) {
            let v = this.state.Validations;
            v.name = { errorState: true, errorMsg: "Branch name cannot be blank" };
            this.setState({
              Validations: v,
              disabledUpdatebtn: true,
            });

          }
        }
        else {
          let v = this.state.Validations;
          v.name = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            name: e.target.value,
            branch: branch,

            disabledUpdatebtn: false

          });
        }
      }
      if (id === "phoneNo") {
        let branch = this.state.branch;
        branch.phoneNo = e.target.value;
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.phoneNo = { errorState: true, errorMsg: "Only 20 numbers are allowed" }
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          })
        }
        else {
          let v = this.state.Validations;
          v.phoneNo = { errorState: false, errorMsg: "" }
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            phoneNo: e.target.value
          });
        }
        ValidateName();

      }

      if (id === "website") {
        let branch = this.state.branch;
        branch.website = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.website = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });

        } else {
          let v = this.state.Validations;
          v.website = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            website: e.target.value
          });
        }
        ValidateName();

      }
      if (id === "Country") {
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
          v.city = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });

        } else {
          let v = this.state.Validations;
          v.city = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            city: e.target.value
          });
        }
        ValidateName();
      }


      if (id === "Postcode") {
        let branch = this.state.branch;
        branch.postcode = e.target.value;
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.postcode = { errorState: true, errorMsg: "Only 10 numbers are allowed" }
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          })
        }
        else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMsg: "" }
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            postcode: e.target.value
          });
        }
        ValidateName();

      }


      if (id === "Address") {
        let branch = this.state.branch;
        branch.address = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });

        }
        else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            address: e.target.value
          });

        }
        ValidateName();

      }
      if (id === "Address2") {
        let branch = this.state.branch;
        branch.address2 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address2 = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });

        }
        else {
          let v = this.state.Validations;
          v.address2 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            address2: e.target.value
          });

        }
        ValidateName();
      }
      if (id === "Address3") {
        let branch = this.state.branch;
        branch.address3 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address3 = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });

        }
        else {
          let v = this.state.Validations;
          v.address3 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            address3: e.target.value
          });

        };
        ValidateName();
      }


       //---------------Numbering-----------
      if (id === "PINo") {
        let branch = this.state.branch;
        branch.PINo = e.target.value;
        this.setState({ branch: branch, PINo: e.target.value });
      }
      if (id === "SONo") {
        let branch = this.state.branch;
        branch.SONo = e.target.value;
        this.setState({ branch: branch, SONo: e.target.value });
      }
      if (id === "SINo") {
        let branch = this.state.branch;
        branch.SINo = e.target.value;
        this.setState({ branch: branch, SINo: e.target.value });
      }
      if (id === "PSNo") {
        let branch = this.state.branch;
        branch.PSNo = e.target.value;
        this.setState({ branch: branch, PSNo: e.target.value });
      }
      if (id === "CPSNo") {
        let branch = this.state.branch;
        branch.CPSNo = e.target.value;
        this.setState({ branch: branch, CPSNo: e.target.value });
      }
      if (id === "CNNo") {
        let branch = this.state.branch;
        branch.CNNo = e.target.value;
        this.setState({ branch: branch, CNNo: e.target.value });
      }
      if (id === "DNNo") {
        let branch = this.state.branch;
        branch.DNNo = e.target.value;
        this.setState({ branch: branch, DNNo: e.target.value });
      }
      if (id === "PRNo") {
        let branch = this.state.branch;
        branch.PRNo = e.target.value;
        this.setState({ branch: branch, PRNo: e.target.value });
      }
      if (id === "PONo") {
        let branch = this.state.branch;
        branch.PONo = e.target.value;
        this.setState({ branch: branch, PONo: e.target.value });
      }
      if (id === "PurInvNo") {
        let branch = this.state.branch;
        branch.PurInvNo = e.target.value;
        this.setState({ branch: branch, PurInvNo: e.target.value });
      }
      if (id === "GITNo") {
        let branch = this.state.branch;
        branch.GITNo = e.target.value;
        this.setState({ branch: branch, GITNo: e.target.value });
      }
      if (id === "SRNo") {
        let branch = this.state.branch;
        branch.SRNo = e.target.value;
        this.setState({ branch: branch, SRNo: e.target.value });
      }
      if (id === "SIssueNo") {
        let branch = this.state.branch;
        branch.SIssueNo = e.target.value;
        this.setState({ branch: branch, SIssueNo: e.target.value });
      }
      if (id === "JVNo") {
        let branch = this.state.branch;
        branch.JVNo = e.target.value;
        this.setState({ branch: branch, JVNo: e.target.value });
      }
      if (id === "PVNo") {
        let branch = this.state.branch;
        branch.PVNo = e.target.value;
        this.setState({ branch: branch, PVNo: e.target.value });
      }
      if (id === "CENo") {
        let branch = this.state.branch;
        branch.CENo = e.target.value;
        this.setState({ branch: branch, CENo: e.target.value });
      }
      if (id === "BankNo") {
        let branch = this.state.branch;
        branch.BankNo = e.target.value;
        this.setState({ branch: branch, BankNo: e.target.value });
      }
      if (id === "CashNo") {
        let branch = this.state.branch;
        branch.CashNo = e.target.value;
        this.setState({ branch: branch, CashNo: e.target.value });
      }
      if (id === "FGQCNo") {
        let branch = this.state.branch;
        branch.FGQCNo = e.target.value;
        this.setState({ branch: branch, FGQCNo: e.target.value });
      }
      if (id === "RMQCNo") {
        let branch = this.state.branch;
        branch.RMQCNo = e.target.value;
        this.setState({ branch: branch, RMQCNo: e.target.value });
      }
      if (id === "IJCNo") {
        let branch = this.state.branch;
        branch.IJCNo = e.target.value;
        this.setState({ branch: branch, IJCNo: e.target.value });
      }
      if (id === "RVNo") {
        let branch = this.state.branch;
        branch.RVNo = e.target.value;
        this.setState({ branch: branch, RVNo: e.target.value });
      }

      if(id==="EffectiveDate"){
        // moment().format("YYYY-MM-DD")
        let branch = this.state.branch;
        branch.EffectiveDate = e.target.value;
        this.setState({ branch: branch, EffectiveDate: e.target.value });
      }
      
       


    }

    const handleupdate = () => {
      ValidateName();
      this.setState({ ProgressLoader: false });
      let branch = this.state.branch;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        branch: branch
      };
      console.log("data - > ", data);


      const headers = {
        "Content-Type": "application/json"
      };
      let UpdateBranchUrl = APIURLS.APIURL.UpdateBranch;
      axios.post(UpdateBranchUrl, data, { headers })
        .then(response => {
          console.log("response > ", response);
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });

          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        }
        ).catch(error => {

        });
    }


    const closeErrorPrompt = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ ErrorPrompt: false });
    }

    const closeSuccessPrompt = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ SuccessPrompt: false });
    }

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    return (
      <Fragment>
        <Header/>
        {this.state.ProgressLoader === false ? (<div style={{ marginTop: -8, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

        <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
          <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
        </Snackbar>

        <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
          <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
        </Snackbar>

        <div className='breadcrumb-height'>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs className='style-breadcrumb' aria-label="breadcrumb">
                <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                  Back
                </Link>
                <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                  Dashboard
                </Link>
                <Link color="inherit" href={URLS.URLS.branchMaster + this.state.urlparams}>
                  Branch master
                </Link>
                <Typography color="textPrimary">Edit Branch </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>
          <Grid container spacing={3}>
            <Grid className="style-buttons" xs={1}>
              <Button
                style={{ marginLeft: 5 }}
                onClick={handleupdate}
                disabled={this.state.disabledUpdatebtn}
              >
                Update
              </Button>
            </Grid>
          </Grid>
          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={9} lg={9}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <Accordion key="company-General-Details" expanded={this.state.GeneralDetailsExpanded} >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("GeneralDetailsExpanded", e)} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: '100%' }}
                    >
                      <Typography key="" className="accordion-Header-Title">General Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails key="">
                      <Grid container spacing={1}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                              <TableBody className="tableBody">

                              
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                  Company
                                  </TableCell>

                                  {console.log("this.state.countryId > ", this.state.countryId)}
                                  <TableCell align="left" className="no-border-table">
                                    <select
                                      className="dropdown-css"
                                      id="companySelect"
                                      label="Company"
                                      fullWidth

                                      value={parseInt(this.state.companyId)}
                                      onChange={(e) => updateFormValue('Company', e)}
                                    >
                                      <option value="-">
                                        None
                                      </option>
                                      {
                                        this.state.companyData.map((item, i) => (
                                          <option value={parseInt(item.companyId)}>
                                            {item.companyName}
                                          </option>
                                        ))
                                      }
                                    </select>
                                  </TableCell>
                                </TableRow>
                                <Tablerowcelltextboxinput
                                  id="Name"
                                  label="Name"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue('Name', e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50
                                  }}
                                  value={this.state.name}
                                  error={this.state.Validations.name.errorState}
                                  helperText={this.state.Validations.name.errorMsg}
                                />
                                {/*
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Name 
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

                                      value={this.state.name}
                                      error={this.state.Validations.name.errorState}
                                      helperText={this.state.Validations.name.errorMsg}

                                    />
                                  </TableCell>
                                </TableRow>
                                */}
                                <Tablerowcelltextboxinput
                                  id="shortName"
                                  label="ShortName"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue('shortName', e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50
                                  }}
                                  value={this.state.shortName}
                                  error={this.state.Validations.shortName.errorState}
                                  helperText={this.state.Validations.shortName.errorMsg}
                                />
                                {/* <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Short Name 
                                  </TableCell>
                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      id="shortName"
                                      variant="outlined"
                                      size="small"
                                      maxlength={10}
                                      onChange={(e) => updateFormValue('shortName', e)}
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50
                                      }}

                                      value={this.state.shortName}
                                      error={this.state.Validations.shortName.errorState}
                                      helperText={this.state.Validations.shortName.errorMsg}

                                    />
                                  </TableCell>
                                </TableRow> */}


                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                     Phone No
                                  </TableCell>
                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      type="number"
                                      id="phoneNo"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) => updateFormValue('phoneNo', e)}
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 20
                                      }}
                                      value={this.state.phoneNo}
                                      error={this.state.Validations.phoneNo.errorState}
                                      helperText={this.state.Validations.phoneNo.errorMsg}

                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Website
                                  </TableCell>
                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      id="website"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) => updateFormValue('website', e)}
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 20
                                      }}
                                      value={this.state.website}
                                      error={this.state.Validations.website.errorState}
                                      helperText={this.state.Validations.website.errorMsg}
                                    />
                                  </TableCell>
                                </TableRow>
                               
                                <Tablerowcelldateinput
                                  id="EffectiveDate"
                                  label="Effective Date"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue('EffectiveDate', e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50
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
                            <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                              <TableBody className="tableBody">
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Country
                                  </TableCell>

                                  {console.log("this.state.countryId > ", this.state.countryId)}
                                  <TableCell align="left" className="no-border-table">
                                    <select
                                      className="dropdown-css"
                                      id="countrySelect"
                                      label="Country"
                                      fullWidth

                                      value={parseInt(this.state.countryId)}
                                      onChange={(e) => updateFormValue('Country', e)}
                                    >
                                      <option value="-">
                                        None
                                      </option>
                                      {
                                        this.state.countryData.map((item, i) => (
                                          <option value={parseInt(item.countryId)}>
                                            {item.name}
                                          </option>
                                        ))
                                      }
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

                                      value={parseInt(this.state.stateId)}
                                      onChange={(e) => updateFormValue('State', e)}
                                    >
                                      <option value="-">
                                        None
                                      </option>
                                      {
                                        this.state.stateData.map((item, i) => (
                                          <option value={parseInt(item.stateId)}>
                                            {item.name}
                                          </option>
                                        ))
                                      }

                                    </select>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    City
                                  </TableCell>

                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      id="City"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) => updateFormValue('City', e)}
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50
                                      }}
                                      value={this.state.city}
                                      error={this.state.Validations.city.errorState}
                                      helperText={this.state.Validations.city.errorMsg}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Postcode
                                  </TableCell>
                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      id="Postcode"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) => updateFormValue('Postcode', e)}
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 10
                                      }}
                                      value={this.state.postcode}
                                      error={this.state.Validations.postcode.errorState}
                                      helperText={this.state.Validations.postcode.errorMsg}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Address Line 1
                                  </TableCell>
                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      id="Address"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) => updateFormValue('Address', e)}
                                      value={this.state.address}
                                      fullWidth

                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50
                                      }}
                                      error={this.state.Validations.address.errorState}
                                      helperText={this.state.Validations.address.errorMsg}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Address Line 2
                                  </TableCell>
                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      id="Address2"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) => updateFormValue('Address2', e)}
                                      fullWidth
                                      value={this.state.address2}
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50
                                      }}
                                      error={this.state.Validations.address2.errorState}
                                      helperText={this.state.Validations.address2.errorMsg}

                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell align="left" className="no-border-table">
                                    Address Line 3
                                  </TableCell>
                                  <TableCell align="left" className="no-border-table">
                                    <TextField
                                      id="Address3"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) => updateFormValue('Address3', e)}
                                      fullWidth
                                      value={this.state.address3}
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50
                                      }}
                                      error={this.state.Validations.address3.errorState}
                                      helperText={this.state.Validations.address3.errorMsg}
                                    />
                                  </TableCell>
                                </TableRow>

                              </TableBody>
                            </Table>
                          </TableContainer>

                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion key="company-Taxation-Details" expanded={this.state.TaxationDetailsExpanded} >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("TaxationDetailsExpanded", e)} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: '100%' }}
                    >
                      <Typography key="" className="accordion-Header-Title">Taxation Details</Typography>
                    </AccordionSummary>
                    <AccordionDetails key="">
                      <TableContainer>
                        <Table stickyHeader size="small" className="accordion-table" aria-label="Taxation table">
                          <TableBody className="tableBody">

                          </TableBody>
                        </Table>
                      </TableContainer>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion key="company-Numbering" expanded={this.state.NumberingExpanded} >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("NumberingExpanded", e)} />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: '100%' }}
                    >
                      <Typography key="" className="accordion-Header-Title">Numbering</Typography>
                    </AccordionSummary>
                    <AccordionDetails key="">
                      <Grid container spacing={1}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table stickyHeader size="small" className="accordion-table" aria-label="Numbering table">
                              <TableBody className="tableBody">
                                <Tablerowcelldropdowninput
                                  id="PINo"
                                  label="Proforma Invoice"
                                  value={this.state.PINo}
                                  onChange={(e) => updateFormValue('PINo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="SONo"
                                  label="Sales Order"
                                  value={this.state.SONo}
                                  onChange={(e) => updateFormValue('SONo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="SINo"
                                  label="Sales Invoice"
                                  value={this.state.SINo}
                                  onChange={(e) => updateFormValue('SINo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PSNo"
                                  label="Pack slip"
                                  value={this.state.PSNo}
                                  onChange={(e) => updateFormValue('PSNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CPSNo"
                                  label="Combine Pack Slip"
                                  value={this.state.CPSNo}
                                  onChange={(e) => updateFormValue('CPSNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CNNo"
                                  label="Credit Note"
                                  value={this.state.CNNo}
                                  onChange={(e) => updateFormValue('CNNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="DNNo"
                                  label="Debit Note"
                                  value={this.state.DNNo}
                                  onChange={(e) => updateFormValue('DNNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PRNo"
                                  label="Purchase Request"
                                  value={this.state.PRNo}
                                  onChange={(e) => updateFormValue('PRNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PONo"
                                  label="Purchase Order"
                                  value={this.state.PONo}
                                  onChange={(e) => updateFormValue('PONo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PurInvNo"
                                  label="Purchase Invoice"
                                  value={this.state.PurInvNo}
                                  onChange={(e) => updateFormValue('PurInvNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="GITNo"
                                  label="GIT"
                                  value={this.state.GITNo}
                                  onChange={(e) => updateFormValue('GITNo', e)}
                                  options={this.state.numberSeries}
                                />
                                


                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table stickyHeader size="small" className="accordion-table" aria-label="Numbering table">
                              <TableBody className="tableBody">
                              <Tablerowcelldropdowninput
                                  id="SRNo"
                                  label="Store Requisition"
                                  value={this.state.SRNo}
                                  onChange={(e) => updateFormValue('SRNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="SIssueNo"
                                  label="Store Issue"
                                  value={this.state.SIssueNo}
                                  onChange={(e) => updateFormValue('SIssueNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="JVNo"
                                  label="Journal Voucher"
                                  value={this.state.JVNo}
                                  onChange={(e) => updateFormValue('JVNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PVNo"
                                  label="Payment Voucher"
                                  value={this.state.PVNo}
                                  onChange={(e) => updateFormValue('PVNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="RVNo"
                                  label="Receipt Voucher"
                                  value={this.state.RVNo}
                                  onChange={(e) => updateFormValue('RVNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CENo"
                                  label="Contra Entry"
                                  value={this.state.CENo}
                                  onChange={(e) => updateFormValue('CENo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="BankNo"
                                  label="Bank"
                                  value={this.state.BankNo}
                                  onChange={(e) => updateFormValue('BankNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CashNo"
                                  label="Cash"
                                  value={this.state.CashNo}
                                  onChange={(e) => updateFormValue('CashNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="FGQCNo"
                                  label="FG QC No"
                                  value={this.state.FGQCNo}
                                  onChange={(e) => updateFormValue('FGQCNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="RMQCNo"
                                  label="RM QC No"
                                  value={this.state.RMQCNo}
                                  onChange={(e) => updateFormValue('RMQCNo', e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="IJCNo"
                                  label="IJC"
                                  value={this.state.IJCNo}
                                  onChange={(e) => updateFormValue('IJCNo', e)}
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
            <Grid xs={12} sm={12} md={3} lg={3}>

            </Grid>
          </Grid>



        </div>

      </Fragment>
    );
  }


}
export default editbranch;