import "../../user/dasboard.css";
import React, { Fragment } from "react";

import moment from "moment";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import BlankLogo from '../../../blank-logo.png';
import BranchLogo from '../../../branches/1/logo.png';


import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import AttachFileIcon from '@mui/icons-material/AttachFile';
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";


import * as CF from "../../../services/functions/customfunctions";
import BackdropLoader from "../../compo/backdrop";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import SwitchInput from "../../compo/tablerowcellswitchinput";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";
import SDTI from "../../compo/griddateinput";

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
      LogoExpanded:false,
      disabledUpdatebtn: false,
      disabledCreatebtn: true,
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
      type: "",
      PageType: "",
      LogoPath:"",
      branch: {
        IsActive: true,
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
        EffectiveDate: null,
        ContactPerson: "",
        IsTrading: false,
        IsVAT: false,
        VATNo: "",
        VATRegistationDate: null,
        VATPercentage: 0,
        IsGST: false,
        GSTNo: "",
        GSTRegistationDate: null,
        PANNo: "",
        TANNo: "",
        CINNo: "",
        IECNo: "",
        ARNNo: "",
        IsSEZ: true,
        IsExportUnit: true,
        CurrID: 0,
        IsGIT: false,
        IsQuality: false,
        IsLot: false,
        IsTCS: false,
        IsTDS: false,
        AllowRounding: false,
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
        FAXNo: { errorState: false, errorMsg: "" },
        website: { errorState: false, errorMsg: "" },
        EmailID: { errorState: false, errorMsg: "" },
        LogoName: { errorState: false, errorMsg: "" },
        ContactPerson: { errorState: false, errorMsg: "" },
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
    let params = CF.GET_URL_PARAMS();
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
      let PageType= url.searchParams.get("type");
      console.log("url > ",url);
      console.log("type > ",type);
      let editbranchId =
        type === "edit" ? url.searchParams.get("editbranchId") : 0;

      let typoTitle = "";
     type === "edit" ? (typoTitle = "Edit") : (typoTitle = "Add");

      let urlparams =
        "?branchId=" +
        branchId +
        "&compName=" +
        compName +
        "&branchName=" +
        branchName;

      let branch = this.state.branch;

      if (type === "edit") {
        branch.BranchID = CF.toInt(editbranchId);
        this.getNumberSeries(CF.toInt(editbranchId));
      }

      this.setState(
        {
          PageType:PageType,
          branch: branch,
          branchId: editbranchId,
          urlparams: params,
          type: type,
          typoTitle: typoTitle,
          ProgressLoader: type === "add" ? true : false,
        },
        () => {
          if(PageType==='edit'){
            this.getBranchDetail(branch);
          }
          
        }
      );
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
            name: data[i].Code,
            value: data[i].CurrID,
          };
          newD.push(o);
        }

        this.setState({
          currencyList: newD,
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

        this.setState({ branchData: data });
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
        this.processCompanyData(data);
      })
      .catch((error) => { });
  }

  // getStateList() {
  //   let rows = [];
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

  //       rows = data;
  //       this.processStateData(data);
  //     })
  //     .catch((error) => { });
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
      .catch((error) => { });
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

  processCountryData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].Name,
        value: data[i].CountryID,
      };
      newData.push(d);
    }
    this.setState({ countryData: newData});
  }

  processCompanyData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].CompanyName,
        value: data[i].CompanyID,
      };
      newData.push(d);
    }
    this.setState({ companyData: newData });
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
          BranchId: branch.BranchID,
        },
      };

      let GetBranchUrl = APIURLS.APIURL.GetBranch;

      axios
        .post(GetBranchUrl, data, { headers })
        .then((response) => {
          let data = response.data;
          this.setState({ branch: data }, () => {
            this.setInitialParamsForEdit();
          });
        })
        .catch((error) => {
          this.setState({ branch: null, ProgressLoader: true });
        });
    } catch (ex) {
      console.log("ex");
    }
  }

  setInitialParamsForEdit = () => {
    let branch = this.state.branch;
    let CountryID = branch.CountryID;
    branch.EffectiveDate = moment(branch.EffectiveDate).format("YYYY-MM-DD");
    branch.VATRegistationDate = moment(branch.VATRegistationDate).format(
      "YYYY-MM-DD"
    );
    branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format(
      "YYYY-MM-DD"
    );
    this.setState({ branch: branch });
    this.getStateByCountry(CountryID);
    if(branch.LogoName===""){}else{
      this.getLogoPath(branch.LogoName);
    }
    
  };

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
          let responseData = data; //.noSeriesDetailList;
          for (let i = 0; i < responseData.length; i++) {
            let d = {
              id: responseData[i].NoSeriesID,
              value: responseData[i].NoSeriesID,
              name: responseData[i].Code,
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
        console.log("getNumberSeries > error > ",error);
        this.setState({
          numberSeries: [],
          ProgressLoader: true,
          ErrorPrompt: true,
        });
      });

    this.setState({ numberSeries: numberSeries });
  }

  chkDuplicateName = (inputArray, parameter, value) => {
    let duplicateExist = false;
    try {
      for (let i = 0; i < inputArray.length; i++) {
        let v = inputArray[i][parameter];
        v = v.toLowerCase();
        if (v === value.toLowerCase()) {
          if (parseInt(inputArray[i].BranchID) === parseInt(this.state.branch.BranchID)) {
            break;
          } else {
            duplicateExist = true;
            break;
          }

        }
        
      }
    } catch (err) { }
    return duplicateExist;
  }

  processUpload=(e)=>{
    this.setState({ ShowLoader: true });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const formData = CF.FILE_UPLOAD_FORMDATA(ValidUser,e, "branch", CF.toInt(this.state.branch.CompanyID),CF.toInt(this.state.branch.BranchID));
    let file = e.target.files[0];
    console.log("file > ",file);
    let fileName="";
    if(file){
      fileName=file.name;
    }

    const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(FTPUploadUrl, formData, { headers })
      .then((response) => {        
        if (response.status === 200 || response.status === 201) {
         if(file){
          let branch = this.state.branch;
          branch.LogoName = fileName;          
          this.setState({
            branch: branch
          },()=>{
            this.handleupdate();
            this.getLogoPath(fileName);
          });
           
         }
        }
        if (response.status === 403) {
          this.setState({ ErrorPrompt: true, ShowLoader: false });
        }

      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ ErrorPrompt: true, ShowLoader: false });
      });

  }

  getLogoPath=(fileName)=>{
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      headers:{
        "Content-Type": "application/json",
        'Content-Disposition': 'file; filename='+fileName
      } ,
      responseType: 'arraybuffer'//'blob',
      
    };
    let Url = APIURLS.APIURL.FileDownload;
    const fd = new FormData();
    fd.append('FileName', fileName);
    fd.append('companyId', this.state.branch.CompanyID);
    fd.append('BranchID', this.state.branch.BranchID);
    fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    fd.append('Token', getCookie(COOKIE.TOKEN));
    axios
    .post(Url, fd, { headers })
    .then((response) => {   
     // console.log("response > ",response);    
      let data=response.data;
      const blob = new Blob([response.data], {type: 'image/PNG'});
      //console.log("blob > ",blob); 
      const url = URL.createObjectURL(blob);
      //console.log("blob > url > ",url); 

     
      let preUrl="data:image/png;base64"+url;
     // console.log("blob > preUrl > ",preUrl); 
      //document.querySelector("#branchLogoImage").src = preUrl;
      
      let base64ImageString = Buffer.from(response.data, 'binary').toString('base64')
      //console.log("base64ImageString > ",base64ImageString); 

      let srcValue = "data:image/png;base64,"+base64ImageString;

      const img = new Buffer.from(response.data).toString("ascii");
      //console.log("img > ",img); 

    //  document.querySelector("#branchLogoImage").src = srcValue;

      // this.setState({
      //   LogoPath:responseUrl
      // });

    })
    .catch((error) => {
      console.log("error > ", error);
      this.setState({ ErrorPrompt: true, ShowLoader: false });
     
    });

  }

   handleupdate = () => {
    this.setState({ ProgressLoader: false });

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let branch = this.state.branch;

    branch.EffectiveDate = moment(branch.EffectiveDate).format("MM/DD/YYYY");
    branch.VATRegistationDate = moment(branch.VATRegistationDate).format(
      "MM/DD/YYYY"
    );
    branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format(
      "MM/DD/YYYY"
    );

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
        if (
          response.status === 200 ||
          response.data === true ||
          response.data === "true"
        ) {
          this.setState({ ProgressLoader: true, SuccessPrompt: true });
        } else {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        }

        branch.EffectiveDate = moment(branch.EffectiveDate).format(
          "YYYY-MM-DD"
        );
        branch.VATRegistationDate = moment(branch.VATRegistationDate).format(
          "YYYY-MM-DD"
        );
        branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format(
          "YYYY-MM-DD"
        );

        this.setState({ branch: branch });
      })
      .catch((error) => { });
  };
  


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
      if (val === "LogoExpanded") {
        this.state.LogoExpanded === true
          ? this.setState({ LogoExpanded: false })
          : this.setState({ LogoExpanded: true });
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
          let v1 = this.state.Validations;
          let duplicateExist =false;
          // let duplicateExist = this.chkDuplicateName(
          //   this.state.branchData,
          //   "Name",
          //   e.target.value.trim().toLowerCase()
          // );
          // this.setState({ duplicate: duplicateExist });
          if (
            e.target.value === "" ||
            e.target.value === null ||
            e.target.value.length > 50 ||
            duplicateExist === true
          ) {
            if (duplicateExist === true) {
              v1.name = {
                errorState: true,
                errorMsg: "Branch Name Exists",
              };
              this.setState({
                Validations: v1,
                // disabledCreatebtn: true,
                name: e.target.value,
              });
            }

            if (e.target.value.length > 50) {
              let v1 = this.state.Validations;
              v1.name = {
                errorState: true,
                errorMsg: "Only 50 Characters are Allowed!",
              };
              this.setState({
                Validations: v1,
                // disabledCreatebtn: true,
              });
            }
            if (e.target.value === "" || e.target.value === null) {
              v1.name = {
                errorState: true,
                errorMsg: "Branch name cannot be blank",
              };
              this.setState({
                Validations: v1,
                // disabledCreatebtn: true,
                name: e.target.value,
              });
            }
          } else {
            v1.name = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v1,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

          break;
        case "ShortName":
          branch[param] = e.target.value;
          let v2 = this.state.Validations;
          if (e.target.value === "" || e.target.value.length > 10) {
            if (e.target.value.length > 10) {
              v2.shortName = {
                errorState: true,
                errorMsg: "Only 10 Characters are Allowed!",
              };
              this.setState({
                Validations: v2,
                // disabledCreatebtn: true,
              });
              if (e.target.value === "") {
                v2.shortName = {
                  errorState: true,
                  errorMsg: "Input cannot be blank!",
                };
                this.setState({
                  Validations: v2,
                });
              }
            }
          } else {
            v2.shortName = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v2,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "Address":
          branch[param] = e.target.value;
          let v3 = this.state.Validations;
          if (e.target.value.length > 50) {
            v3.address = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v3,
              // disabledCreatebtn: true,
            });
          } else {
            let v3 = this.state.Validations;
            v3.address = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v3,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

          break;
        case "Address2":
          branch[param] = e.target.value;
          let v6 = this.state.Validations;
          if (e.target.value.length > 50) {
            v6.address2 = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v6,
              // disabledCreatebtn: true,
            });
          } else {
            v6.address2 = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v6,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

          break;
        case "Address3":
          branch[param] = e.target.value;
          let v4 = this.state.Validations;
          if (e.target.value.length > 50) {
            v4.address3 = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v4,
              // disabledCreatebtn: true,
            });
          } else {
            v4.address3 = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v4,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

          break;
        case "City":
          branch[param] = e.target.value;
          let v5 = this.state.Validations;
          if (e.target.value.length > 50) {
            v5.city = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v5,
              // disabledCreatebtn: true,
            });
          } else {
            v5.city = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v5,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

          break;
        case "Postcode":
          branch[param] = e.target.value;
          let v7 = this.state.Validations;

          if (e.target.value.length > 10) {
            v7.postcode = {
              errorState: true,
              errorMsg: "Only 10 numbers are allowed",
            };
            this.setState({
              Validations: v7,
              // disabledCreatebtn: true,
            });
          } else {
            v7.postcode = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v7,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

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
          let v8 = this.state.Validations;
          let number = CF.chkIfNumber(e.target.value);
          if (number) {
            branch[param] = e.target.value;
            if (e.target.value.length > 20) {
              v8.phoneNo = {
                errorState: true,
                errorMsg: "Only 20 digits are Allowed!",
              };
              this.setState({
                Validations: v8,
                // createBtnDisabled: true,
              });
            } else {
              v8.phoneNo = { errorState: false, errorMsg: "" };
              this.setState({
                Validations: v8,

                // createBtnDisabled: false,
              });
              setParams(branch);
            }
          } else {
            v8.phoneNo = {
              errorState: true,
              errorMsg: "Enter Number!",
            };
            this.setState({
              Validations: v8,
              // createBtnDisabled: true,
            });
          }

          break;
        case "FAXNo":
          branch[param] = e.target.value;
          let v9 = this.state.Validations;

          if (e.target.value.length > 20) {
            v9.FAXNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v9,
              // disabledCreatebtn: true,
            });
          } else {
            v9.FAXNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v9,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

          break;
        case "Website":
          branch[param] = e.target.value;
          let v10 = this.state.Validations;

          if (e.target.value.length > 50) {
            v10.website = {
              errorState: true,
              errorMsg: "Only 50 characters  allowed",
            };
            this.setState({
              Validations: v10,
              // disabledCreatebtn: true,
            });
          } else {
            v10.website = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v10,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "EmailID":
          branch[param] = e.target.value;
          let v11 = this.state.Validations;

          let email = CF.validateEmail(e.target.value);

          if (email === true) {
            if (e.target.value.length > 50) {
              v11.EmailID = {
                errorState: true,
                errorMssg: "Maximum 50 Characters allowed!",
              };

              this.setState({ Validations: v11 });
            } else {
              v11.EmailID = { errorState: false, errorMssg: "" };

              this.setState({
                Validations: v11,
              });

              setParams(branch);
            }
          } else {
            v11.EmailID = {
              errorState: true,
              errorMssg: "Incorrect EmailID",
            };

            this.setState({
              Validations: v11,
            });
          }
          break;
        case "LogoName":
          branch[param] = e.target.value;
          let v12 = this.state.Validations;

          if (e.target.value.length > 50) {
            v12.LogoName = {
              errorState: true,
              errorMsg: "Only 50 characters  allowed",
            };
            this.setState({
              Validations: v12,
              // disabledCreatebtn: true,
            });
          } else {
            v12.LogoName = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v12,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;

        case "EffectiveDate":
          branch[param] = moment(e.target.value).format("YYYY-MM-DD");
          setParams(branch);
          break;
        case "ContactPerson":
          branch[param] = e.target.value;
          let v13 = this.state.Validations;

          if (e.target.value.length > 50) {
            v13.ContactPerson = {
              errorState: true,
              errorMsg: "Only 50 characters  allowed",
            };
            this.setState({
              Validations: v13,
              // disabledCreatebtn: true,
            });
          } else {
            v13.LogoName = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v13,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "VATNo":
          branch[param] = e.target.value;
          let v14 = this.state.Validations;

          if (e.target.value.length > 20) {
            v14.VATNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v14,
              // disabledCreatebtn: true,
            });
          } else {
            v14.VATNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v14,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "VATRegistationDate":
          branch[param] = moment(e.target.value).format("YYYY-MM-DD");
          setParams(branch);
          break;
        case "VATPercentage":
          branch[param] = CF.toFloat(e.target.value);
          let v15 = this.state.Validations;

          if (e.target.value.length > 8) {
            v15.VATPercentage = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v15,
              // disabledCreatebtn: true,
            });
          } else {
            v15.VATPercentage = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v15,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }

          setParams(branch);
          break;
        case "GSTNo":
          branch[param] = e.target.value;
          let v16 = this.state.Validations;

          if (e.target.value.length > 20) {
            v16.GSTNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v16,
              // disabledCreatebtn: true,
            });
          } else {
            v16.GSTNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v16,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "GSTRegistationDate":
          branch[param] = moment(e.target.value).format("YYYY-MM-DD");
          setParams(branch);
          break;
        case "PANNo":
          branch[param] = e.target.value;
          let v17 = this.state.Validations;

          if (e.target.value.length > 20) {
            v17.PANNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v17,
              // disabledCreatebtn: true,
            });
          } else {
            v17.PANNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v17,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "TANNo":
          branch[param] = e.target.value;
          let v18 = this.state.Validations;

          if (e.target.value.length > 20) {
            v18.TANNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v18,
              // disabledCreatebtn: true,
            });
          } else {
            v18.TANNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v18,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "CINNo":
          branch[param] = e.target.value;
          let v19 = this.state.Validations;

          if (e.target.value.length > 20) {
            v19.CINNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v19,
              // disabledCreatebtn: true,
            });
          } else {
            v19.CINNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v19,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "IECNo":
          branch[param] = e.target.value;
          let v20 = this.state.Validations;

          if (e.target.value.length > 20) {
            v20.IECNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v20,
              // disabledCreatebtn: true,
            });
          } else {
            v20.IECNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v20,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
          break;
        case "ARNNo":
          branch[param] = e.target.value;
          let v21 = this.state.Validations;

          if (e.target.value.length > 20) {
            v21.ARNNo = {
              errorState: true,
              errorMsg: "Only 20 characters  allowed",
            };
            this.setState({
              Validations: v21,
              // disabledCreatebtn: true,
            });
          } else {
            v21.ARNNo = { errorState: false, errorMsg: "" };
            this.setState({
              Validations: v21,
              // disabledCreatebtn: false,
            });
            setParams(branch);
          }
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
      Validate();
    };

    const Validate = () => {
      let v = this.state.Validations;
      if (
        this.state.branch.Name === "" ||
        this.state.branch.ShortName === "" ||
        v["name"].errorState === true ||
        v["shortName"].errorState === true ||
        v["address"].errorState === true ||
        v["address2"].errorState === true ||
        v["address3"].errorState === true ||
        v["city"].errorState === true ||
        v["postcode"].errorState === true ||
        v["phoneNo"].errorState === true ||
        v["FAXNo"].errorState === true ||
        v["website"].errorState === true ||
        v["EmailID"].errorState === true ||
        v["LogoName"].errorState === true ||
        v["ContactPerson"].errorState === true ||
        v["PANNo"].errorState === true ||
        v["TANNo"].errorState === true ||
        v["CINNo"].errorState === true ||
        v["IECNo"].errorState === true ||
        v["ARNNo"].errorState === true ||
        v["VATNo"].errorState === true ||
        v["VATPercentage"].errorState === true ||
        v["GSTNo"].errorState === true
      ) {
        this.setState({ disabledUpdatebtn: true, disabledCreatebtn: true });
      } else {
        this.setState({ disabledUpdatebtn: false, disabledCreatebtn: false });
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
      branch.VATRegistationDate = moment(branch.VATRegistationDate).format(
        "MM/DD/YYYY"
      );
      branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format(
        "MM/DD/YYYY"
      );

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
      this.setState({ ProgressLoader: false });

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let branch = this.state.branch;

      branch.EffectiveDate = moment(branch.EffectiveDate).format("MM/DD/YYYY");
      branch.VATRegistationDate = moment(branch.VATRegistationDate).format(
        "MM/DD/YYYY"
      );
      branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format(
        "MM/DD/YYYY"
      );

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
          if (
            response.status === 200 ||
            response.data === true ||
            response.data === "true"
          ) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }

          branch.EffectiveDate = moment(branch.EffectiveDate).format(
            "YYYY-MM-DD"
          );
          branch.VATRegistationDate = moment(branch.VATRegistationDate).format(
            "YYYY-MM-DD"
          );
          branch.GSTRegistationDate = moment(branch.GSTRegistationDate).format(
            "YYYY-MM-DD"
          );

          this.setState({ branch: branch });
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.branchMaster + this.state.urlparams}
          masterLinkTitle="Branch"
          typoTitle={this.state.typoTitle}
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
          {console.log("++++++++++++++++++++++++++++this.state > ",this.state)}
          {(this.state.PageType === "edit"|| this.state.type==="edit") ? (
            <Button
              className="action-btns"
              startIcon={APIURLS.buttonTitle.save.icon}
              onClick={handleupdate}
              disabled={this.state.disabledUpdatebtn}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}

          {(this.state.PageType === "add" || this.state.type==="add")? (
            <Button
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              onClick={handleCreate}
              disabled={this.state.disabledCreatebtn}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}
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
                      General
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              {console.log(
                                "this.state.branch > ",
                                this.state.branch
                              )}
                              <SDIB
                                isMandatory={true}
                                id="CompanyID"
                                label="Company"
                                onChange={(e) =>
                                  updateFormValue("CompanyID", e)
                                }
                                param={this.state.companyData}
                                value={this.state.branch.CompanyID}
                              />

                              <SIB
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
                                isMandatory={true}
                              />

                              <SIB
                                id="ShortName"
                                label="ShortName"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("ShortName", e)
                                }
                                // InputProps={{
                                //   className: "textFieldCss",
                                //   maxlength: 50,
                                // }}
                                value={this.state.branch.ShortName}
                                error={
                                  this.state.Validations.shortName.errorState
                                }
                                isMandatory={true}
                              />
                              <SIB
                                isMandatory={true}
                                id="Address"
                                label="Address Line 1"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.Address}
                                error={
                                  this.state.Validations.address.errorState
                                }
                              />

                              <SIB
                                id="Address2"
                                label="Address Line 2"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address2", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.Address2}
                                error={
                                  this.state.Validations.address2.errorState
                                }
                              />

                              <SIB
                                id="Address3"
                                label="Address Line 3"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address3", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.Address3}
                                error={
                                  this.state.Validations.address3.errorState
                                }
                              />
                              <SIB
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
                              />

                              <SIB
                                id="Postcode"
                                label="Postcode"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Postcode", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.Postcode}
                                error={
                                  this.state.Validations.postcode.errorState
                                }
                              />
                              <SDIB
                                isMandatory={true}
                                id="CountryID"
                                label="Country"
                                onChange={(e) =>
                                  updateFormValue("CountryID", e)
                                }
                                param={this.state.countryData}
                                value={this.state.branch.CountryID}
                              />
                              <SDIB
                                id="StateID"
                                label="State"
                                onChange={(e) => updateFormValue("StateID", e)}
                                param={this.state.stateData}
                                value={this.state.branch.StateID}
                              />
                            </Grid>
                            <Grid xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid xs={12} sm={12} md={5} lg={5}>
                              <SIB
                                id="PhoneNo"
                                label="Phone No"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("PhoneNo", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.PhoneNo}
                                error={
                                  this.state.Validations.phoneNo.errorState
                                }
                              />
                              <SIB
                                id="FAXNo"
                                label="FAXNo "
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("FAXNo", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.FAXNo}
                                error={this.state.Validations.FAXNo.errorState}
                              />

                              <SIB
                                id="Website"
                                label="Website"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Website", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.Website}
                                error={
                                  this.state.Validations.website.errorState
                                }
                              />

                              <SIB
                                id="ContactPerson"
                                label="ContactPerson"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("ContactPerson", e)
                                }
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.ContactPerson}
                                error={
                                  this.state.Validations.ContactPerson
                                    .errorState
                                }
                              />

                              <SIB
                                id="EmailID"
                                label="EmailID"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("EmailID", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.EmailID}
                                error={
                                  this.state.Validations.EmailID.errorState
                                }
                              />
                              {/* <SIB
                                id="LogoName"
                                label="LogoName"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("LogoName", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.branch.LogoName}
                                error={
                                  this.state.Validations.LogoName.errorState
                                }
                              /> */}

                              <SDTI
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
                              />
                              


                              <div style={{ borderStyle: 'solid', borderWidth: 1, borderColor: 'rgba(224, 224, 224, 1)' }}>
                                <div style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                  <Grid container spacing={0}>
                                    <Grid item xs={4} sm={4} md={4} lg={4}>
                                      <SSIB
                                        key="IsLot"
                                        id="IsLot"
                                        label="Lot?"
                                        param={this.state.branch.IsLot}
                                        onChange={(e) =>
                                          updateFormValue("IsLot", e)
                                        }
                                      />
                                      <SSIB
                                        key="IsGIT"
                                        id="IsGIT"
                                        label="GIT?"
                                        param={this.state.branch.IsGIT}
                                        onChange={(e) =>
                                          updateFormValue("IsGIT", e)
                                        }
                                      />
                                       <SSIB
                                            key="IsActive"
                                            id="IsActive"
                                            label="Active?"
                                            param={this.state.branch.IsActive}
                                            onChange={(e) =>
                                              updateFormValue("IsActive", e)
                                            }
                                          />
                                    </Grid>
                                    <Grid item xs={8} sm={8} md={8} lg={8}>
                                      <Grid container spacing={0}>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                          <SSIB
                                            isSpacing={true}
                                            space={5}
                                            key="IsQuality"
                                            id="IsQuality"
                                            label="Quality?"
                                            param={this.state.branch.IsQuality}
                                            onChange={(e) =>
                                              updateFormValue("IsQuality", e)
                                            }
                                          />
                                        </Grid>
                                        <Grid item xs={6} sm={6} md={6} lg={6}>
                                          <SSIB
                                            key="IsTrading"
                                            id="IsTrading"
                                            label="Trading?"
                                            param={this.state.branch.IsTrading}
                                            onChange={(e) =>
                                              updateFormValue("IsTrading", e)
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                      <Grid container spacing={0}>
                                        <Grid item xs={8} sm={8} md={8} lg={8}>
                                          <SSIB
                                            key="AllowRounding"
                                            id="AllowRounding"
                                            label="Rounding?"
                                            param={this.state.branch.AllowRounding}
                                            onChange={(e) =>
                                              updateFormValue("AllowRounding", e)
                                            }
                                          />
                                        </Grid>
                                      </Grid>
                                       
                                      


                                    </Grid>
                                  </Grid>
                                </div>
                              </div>

                              
                            


                            </Grid>
                          </Grid>
                        </div>
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
                      Taxation
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SDIB
                                isMandatory={true}
                                id="CurrID"
                                label="Currency"
                                onChange={(e) => updateFormValue("CurrID", e)}
                                param={this.state.currencyList}
                                value={this.state.branch.CurrID}
                              />

                              <SIB
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
                                error={this.state.Validations.PANNo.errorState}
                              />
                              <SIB
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
                                error={this.state.Validations.TANNo.errorState}
                              />
                              <SIB
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
                                error={this.state.Validations.CINNo.errorState}
                              />
                              <SIB
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
                                error={this.state.Validations.IECNo.errorState}
                              />
                              <SIB
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
                                error={this.state.Validations.ARNNo.errorState}
                              />

                              <div style={{ borderStyle: 'solid', borderWidth: 1, borderColor: 'rgba(224, 224, 224, 1)' }}>
                                <div style={{ marginLeft: 10, marginRight: 10, marginTop: 10 }}>
                                  <Grid container spacing={0}>
                                    <Grid item xs={12} sm={12} md={3} lg={3}>
                                      <SSIB
                                        key="IsSEZ"
                                        id="IsSEZ"
                                        label="SEZ?"
                                        param={this.state.branch.IsSEZ}
                                        onChange={(e) => updateFormValue("IsSEZ", e)}
                                      />
                                      <SSIB
                                        key="IsTCS"
                                        id="IsTCS"
                                        label="TCS?"
                                        param={this.state.branch.IsTCS}
                                        onChange={(e) => updateFormValue("IsTCS", e)}
                                      />

                                    </Grid>
                                    <Grid item xs={12} sm={12} md={9} lg={9}>
                                      <SSIB
                                        key="IsExportUnit"
                                        id="IsExportUnit"
                                        label="Is Export Unit?"
                                        param={this.state.branch.IsExportUnit}
                                        onChange={(e) =>
                                          updateFormValue("IsExportUnit", e)
                                        }
                                      />
                                      <SSIB
                                        key="IsTDS"
                                        id="IsTDS"
                                        label="TDS?"
                                        param={this.state.branch.IsTDS}
                                        onChange={(e) => updateFormValue("IsTDS", e)}
                                      />

                                    </Grid>
                                  </Grid>
                                </div>
                              </div>




                            </Grid>
                            <Grid xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid xs={12} sm={12} md={5} lg={5}>
                              <SSIB
                                key="IsVAT"
                                id="IsVAT"
                                label="Is VAT?"
                                param={this.state.branch.IsVAT}
                                onChange={(e) => updateFormValue("IsVAT", e)}
                              />

                              {/* Addd this -> above   VAT_GST_Checkbox_Click(e, "isvat") */}

                              <SDTI
                                id="VATRegistationDate"
                                label="VAT Registation Date"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("VATRegistationDate", e)
                                }
                                value={this.state.branch.VATRegistationDate}
                              />

                              <SIB
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
                                disabled={!this.state.branch.IsVAT}
                                error={this.state.Validations.VATNo.errorState}
                              />
                              <SIB
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
                              />

                              <SSIB
                                key="IsGST"
                                id="IsGST"
                                label="Is GST?"
                                param={this.state.branch.IsGST}
                                onChange={(e) => updateFormValue("IsGST", e)}
                              />
                              {/*  Add this criteria above  ->   VAT_GST_Checkbox_Click(e, "isgst") */}

                              <SIB
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
                                disabled={!this.state.branch.IsGST}
                                error={this.state.Validations.GSTNo.errorState}
                              />

                              <SDTI
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
                            </Grid>
                          </Grid>
                        </div>
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
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              {console.log("this.state.numberSeries > ", this.state.numberSeries)}
                              <SDIB
                                id="LPINo"
                                label="Local Proforma Invoice"
                                value={this.state.branch.LPINo}
                                onChange={(e) => updateFormValue("LPINo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="EPINo"
                                label="Export Proforma Invoice"
                                value={this.state.branch.EPINo}
                                onChange={(e) => updateFormValue("EPINo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="SPINo"
                                label="Sample Proforma Invoice"
                                value={this.state.branch.SPINo}
                                onChange={(e) => updateFormValue("SPINo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="TPINo"
                                label="Trading Proforma Invoice"
                                value={this.state.branch.TPINo}
                                onChange={(e) => updateFormValue("TPINo", e)}
                                param={this.state.numberSeries}
                              />

                              <SDIB
                                id="LSONo"
                                label="Local Sales Order"
                                value={this.state.branch.LSONo}
                                onChange={(e) => updateFormValue("LSONo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="ESONo"
                                label="Export Sales Order"
                                value={this.state.branch.ESONo}
                                onChange={(e) => updateFormValue("ESONo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="SSONo"
                                label="Sample Sales Order"
                                value={this.state.branch.SSONo}
                                onChange={(e) => updateFormValue("SSONo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="TSONo"
                                label="Trading Sales Order"
                                value={this.state.branch.TSONo}
                                onChange={(e) => updateFormValue("TSONo", e)}
                                param={this.state.numberSeries}
                              />

                              <SDIB
                                id="LSINo"
                                label="Local Sales Invoice"
                                value={this.state.LSINo}
                                onChange={(e) => updateFormValue("LSINo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="ESINo"
                                label="Export Sales Invoice"
                                value={this.state.branch.ESINo}
                                onChange={(e) => updateFormValue("ESINo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="SSINo"
                                label="Sample Sales Invoice"
                                value={this.state.branch.SSINo}
                                onChange={(e) => updateFormValue("SSINo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="TSINo"
                                label="Trading Sales Invoice"
                                value={this.state.branch.TSINo}
                                onChange={(e) => updateFormValue("TSINo", e)}
                                param={this.state.numberSeries}
                              />

                              <SDIB
                                id="PSNo"
                                label="Pack slip"
                                value={this.state.branch.PSNo}
                                onChange={(e) => updateFormValue("PSNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="CPSNo"
                                label="Combine Pack Slip"
                                value={this.state.branch.CPSNo}
                                onChange={(e) => updateFormValue("CPSNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="CNNo"
                                label="Credit Note"
                                value={this.state.branch.CNNo}
                                onChange={(e) => updateFormValue("CNNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="DNNo"
                                label="Debit Note"
                                value={this.state.branch.DNNo}
                                onChange={(e) => updateFormValue("DNNo", e)}
                                param={this.state.numberSeries}
                              />
                            </Grid>
                            <Grid xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid xs={12} sm={12} md={5} lg={5}>
                              <SDIB
                                id="PRNo"
                                label="Purchase Request"
                                value={this.state.branch.PRNo}
                                onChange={(e) => updateFormValue("PRNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="LPONo"
                                label="Local Purchase Order"
                                value={this.state.branch.LPONo}
                                onChange={(e) => updateFormValue("LPONo", e)}
                                param={this.state.numberSeries}
                              />

                              <SDIB
                                id="IPONo"
                                label="Import Purchase Order"
                                value={this.state.branch.IPONo}
                                onChange={(e) => updateFormValue("IPONo", e)}
                                param={this.state.numberSeries}
                              />

                              <SDIB
                                id="PurInvNo"
                                label="Purchase Invoice"
                                value={this.state.branch.PurInvNo}
                                onChange={(e) => updateFormValue("PurInvNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="GITNo"
                                label="GIT"
                                value={this.state.branch.GITNo}
                                onChange={(e) => updateFormValue("GITNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="SRNo"
                                label="Store Requisition"
                                value={this.state.branch.SRNo}
                                onChange={(e) => updateFormValue("SRNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="SIssueNo"
                                label="Store Issue"
                                value={this.state.branch.SIssueNo}
                                onChange={(e) => updateFormValue("SIssueNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="JVNo"
                                label="Journal Voucher"
                                value={this.state.branch.JVNo}
                                onChange={(e) => updateFormValue("JVNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="PVNo"
                                label="Payment Voucher"
                                value={this.state.branch.PVNo}
                                onChange={(e) => updateFormValue("PVNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="RVNo"
                                label="Receipt Voucher"
                                value={this.state.branch.RVNo}
                                onChange={(e) => updateFormValue("RVNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="CENo"
                                label="Contra Entry"
                                value={this.state.branch.CENo}
                                onChange={(e) => updateFormValue("CENo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="BankNo"
                                label="Bank"
                                value={this.state.branch.BankNo}
                                onChange={(e) => updateFormValue("BankNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="CashNo"
                                label="Cash"
                                value={this.state.branch.CashNo}
                                onChange={(e) => updateFormValue("CashNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="FGQCNo"
                                label="FG QC No"
                                value={this.state.branch.FGQCNo}
                                onChange={(e) => updateFormValue("FGQCNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="RMQCNo"
                                label="RM QC No"
                                value={this.state.branch.RMQCNo}
                                onChange={(e) => updateFormValue("RMQCNo", e)}
                                param={this.state.numberSeries}
                              />
                              <SDIB
                                id="IJCNo"
                                label="IJC"
                                value={this.state.branch.IJCNo}
                                onChange={(e) => updateFormValue("IJCNo", e)}
                                param={this.state.numberSeries}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                {this.state.PageType = "edit" ? (
                  <Fragment>
                    <Accordion
                      key="branch-logo"
                      expanded={this.state.LogoExpanded}
                    >
                      <AccordionSummary
                        className="accordion-Header-Design"
                        expandIcon={
                          <ExpandMoreIcon
                            onClick={(e) =>
                              handleAccordionClick("LogoExpanded", e)
                            }
                          />
                        }
                        onClick={(e) =>
                          handleAccordionClick("LogoExpanded", e)
                        }
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        style={{ minHeight: 20, height: "100%" }}
                      >
                        <Typography key="" className="accordion-Header-Title">
                          Logo
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails key="" className="AccordionDetails-css">
                        <Grid container spacing={0}>
                        <Grid item xs={2} sm={2} md={2} lg={2}></Grid>
                          <Grid item xs={4} sm={4} md={4} lg={4}>
{/* 
                            <Button
                              className="action-btns"
                              startIcon={<AttachFileIcon />}
                              onClick={(e) => { document.getElementById("uploadInput").click() }}
                            >

                              Attach File
                            </Button> */}
                            <input
                              className="file-upload-input"
                              id="uploadInput"
                              type="file"
                            onChange={(e)=>this.processUpload(e)}
                            />
                          </Grid>
                          <Grid item xs={6} sm={6} md={6} lg={6}>
                            <div>
                              <div>
                                {this.state.branch.LogoName===""?(
                                  <img src={BlankLogo} className="App-logo" alt="logo" />
                                ):(
                                  <Fragment>
                                  <img id="branchLogoImage" src={BlankLogo} className="App-logo" alt="logo" />


                                  <IconButton aria-label="delete" size="small">
                                    <DeleteIcon fontSize="inherit" />
                                  </IconButton>
                                  <IconButton aria-label="delete" size="small"
                                  style={{color: 'color: rgb(0, 126, 135)'}}
                                  onClick={(e) => { document.getElementById("uploadInput").click() }}
                                  >
                                    <AttachFileIcon fontSize="inherit" sx={{ color: 'color: rgb(0, 126, 135)'}}/>
                                  </IconButton>
                                   
                                 
                                  </Fragment>


                                  
                                )}                              
                              </div>

                           
                               
                            </div>
                          </Grid>
                        </Grid>
                      </AccordionDetails>
                    </Accordion>
                  </Fragment>
                ) : null}

                

              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default editbranch;
