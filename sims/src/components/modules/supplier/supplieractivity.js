import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";

import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

import BackdropLoader from "../../compo/backdrop";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Dualtabcomponent from "../../compo/dualtabcomponent";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

import Addresses from "./component/addresses";
import PaymentTerms from "./component/paymentTerms";
import BranchMapping from "./component/branchMapping";
import SupplierPrice from "./component/supplierPrice";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";

import DialogCustom from "../../compo/dialogcomponent";

class supplieractivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomDialog: {
        open: false
    },
    DeleteAttachment: {
        e: null,
        item: null
    },
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
      BranchID: 0,
      accordion1: true,
      accordion2: false,
      accordion3: false,
      ProgressLoader: false,
      ErrorMessageProps:"",
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: true,
      DisableUpdatebtn: false,
      initialCss: "",
      urlparams: "",
      editurl: "",
      typoTitle: "",
      type: "",
      TypeOfEnterprise: APIURLS.TypeOfEnterprise,
      GSTSupplierType: APIURLS.GSTSupplierType,
      MasterCountryData: [],
      SupplierData: [],
      DropdownSupplierData: [],
      SalesPersonData: [],
      paymentTermsData: [],
      GeneralPostingGroupList: [],
      SupplierPostingGroupList: [],
      currencyList: [],
      countryData: [],
      stateData: [],
      SuplID: 0,
      Supplier: {
        SuplID: 0,
        No: "",
        Name: "",
        Address: "",
        Address2: "",
        Address3: "",
        City: "",
        PostCode: "",
        CountryID: 0,
        StateID: 0,
        Website: "",
        PhoneNo: "",
        FaxNo: "",
        IsGroupCompany: false,
        SupplierClasification: 0,
        PaymentTermID: 0,
        TypeOfEnterprise: 0,
        GSTSupplierType: 0,
        CurrID: 0,
        PayToSuplID: 0,
        DueDays: 0,
        IsBlock: false,
        SalesPersonID: 0,
        GeneralPostingGroupID: 0,
        SupplierPostingGroupID: 0,
        IsTaxExempt: false,
        Reason: "",
        GSTSupplierType: 0,
        GSTNo: "",
        PANNo: "",
        VATNo: "",
        ContactPerson: "",
        EmailID: "",
        UserID: CF.toInt(getCookie(COOKIE.USERID)),
        BranchID: 0,
      },
      Validations: {
        Name: { errorState: false, errorMssg: "" },
        Address: { errorState: false, errorMssg: "" },
        Address2: { errorState: false, errorMssg: "" },
        Address3: { errorState: false, errorMssg: "" },
        City: { errorState: false, errorMssg: "" },
        PostCode: { errorState: false, errorMssg: "" },
        Website: { errorState: false, errorMssg: "" },
        PhoneNo: { errorState: false, errorMssg: "" },
        FaxNo: { errorState: false, errorMssg: "" },
        DueDays: { errorState: false, errorMssg: "" },
        Reason: { errorState: false, errorMssg: "" },
        GSTNo: { errorState: false, errorMssg: "" },
        CurrID: { errorState: false, errorMssg: "" },
        PANNo: { errorState: false, errorMssg: "" },
        VATNo: { errorState: false, errorMssg: "" },
        ContactPerson: { errorState: false, errorMssg: "" },
        EmailID: { errorState: false, errorMssg: "" },
      },
      filelist: [],
      compID:0,
    };
  }

  loadDropdowns = () => {
    this.getAllGeneralPostingGroup();
    this.getAllSupplierPostingGroup();
    this.getCurrencyList();
    this.getCountryList();
    // this.getStateList();
    this.getPaymentTerms();
  };

  componentDidMount() {
    console.log("-----------------supplieractivity--------------");
    let params = CF.GET_URL_PARAMS();
    this.loadDropdowns();
    this.getSupplierList();
    var url = new URL(window.location.href);
    let compID = url.searchParams.get("compID");
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let type = url.searchParams.get("type");
    let SuplID = type === "edit" ? url.searchParams.get("editSuplID") : 0;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let Supplier = this.state.Supplier;
    Supplier.BranchID = CF.toInt(branchId);
    if (type === "edit") {
      Supplier.SuplID = CF.toInt(SuplID);
      this.getSupplierDetails(Supplier);
    }

    this.setState({
      compID:parseInt(compID),
      Supplier: Supplier,
      SuplID: type === "edit" ? CF.toInt(SuplID) : 0,
      urlparams: params,
      type: type,
      typoTitle: typoTitle,
      ProgressLoader: type === "add" ? true : false,
      BranchID: CF.toInt(branchId),
    },()=>{
      this.getAttachedFileList();
    });


    console.log("On load state > ", this.state);
  }

  getSupplierList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplier;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        if (data.length > 0) {
          let newD = [];
          for (let i = 0; i < data.length; i++) {
            let o = {
              name: data[i].Name,
              value: data[i].SuplID,
            };
            newD.push(o);
          }
          this.setState({
            DropdownSupplierData: newD,
            SupplierData: data,
            ProgressLoader: true
          });

        } else {
          this.setState({ SupplierData: data, ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ SupplierData: [], ProgressLoader: true });
      });
  };

  getAllSupplierPostingGroup = () => {
    console.log("getAllSupplierPostingGroup > ");
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplierPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("getAllSupplierPostingGroup > data > ", data);
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code,
            value: data[i].SupplierPostingGroupID,
          };
          newD.push(o);
          console.log("newD>>", newD);
        }
        this.setState({ SupplierPostingGroupList: newD });
      })
      .catch((error) => {
        console.log("getAllSupplierPostingGroup > error > ", error);
      });
  };

  getPaymentTerms = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllPaymentTerms;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name:data[i].Code,
            value: data[i].PaymentTermID,
            DueDays:data[i].DueDays
          };
          newD.push(o);
        }
        this.setState({
          paymentTermsData: newD,
          ProgressLoader: true
        });
      })
      .catch((error) => {
        this.setState({ paymentTermsData: [], ProgressLoader: true });
      });
  };


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
    this.setState({ countryData: newData, ProgressLoader: true });
  }

  getCurrencyList = () => {
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

  getAllGeneralPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllGeneralPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code ,
            value: data[i].GeneralPostingGroupID,
          };
          newD.push(o);
          console.log("newD>>", newD);
        }
        this.setState({ GeneralPostingGroupList: newD });
      })
      .catch((error) => { });
  };

  getSupplierDetails = (Supplier) => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetSupplier;
    let reqData = {
      ValidUser: ValidUser,
      Supplier: Supplier,
    };
    console.log("getSupplierDetails > getSupplierDetails >", reqData);
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          console.log("getSupplierDetails > Supplier >", data);
          this.setState({ Supplier: data, ProgressLoader: true });
          this.setInitialParamsForEdit();
        } else {
          this.setState({
            ErrorPrompt: true,
            SuccessPrompt: false,
            ProgressLoader: true,
          });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });
  };

  setInitialParamsForEdit = () => {
    let CountryID = this.state.Supplier.CountryID;
    this.getStateByCountry(CountryID);
  };

  chkIfDuplicatePresent=(input)=>{
    let duplicatePresent=false;
    try{
      let itemDataList=this.state.SupplierData;
      for(let i=0;i<itemDataList.length;i++){
        if((itemDataList[i].Name).trim().toUpperCase()===input.toUpperCase()){
          duplicatePresent=true;
        }
      }

    }catch(err){

    }
    return duplicatePresent;
  }

  setDueDate=(paymentTermID)=>{
    let paymentTermsData=this.state.paymentTermsData;
    for(let i=0;i<paymentTermsData.length;i++){
      if(parseInt(paymentTermsData[i].value)===parseInt(paymentTermID)){
        let Supplier = this.state.Supplier;
        Supplier.DueDays=parseInt(paymentTermsData[i].DueDays);
        this.setState({Supplier:Supplier});
        break;
      }
    }
  }

  updateFormValue = (param, e) => {
    let Supplier = this.state.Supplier;
    switch (param) {
      case "Name":
        let duplicate=false;
          if(e.target.value){
            duplicate=this.chkIfDuplicatePresent(e.target.value.trim());
          }

          if(duplicate===false){
            this.setState({ErrorMessageProps:""});
            let v2 = this.state.Validations;
            Supplier[param] = e.target.value;
            if (e.target.value === "" || e.target.value.length > 100) {
              if (e.target.value === "") {
                v2.Name = { errorState: true, errorMssg: "Cannot be blank!" };
    
                this.setState({
                  Validations: v2,
                  DisableCreatebtn: true,
                  DisableUpdatebtn: true,
                });
              }
              if (e.target.value.length > 100) {
                v2.Name = {
                  errorState: true,
                  errorMssg: "Maximum 100 characters allowed!",
                };
    
                this.setState({ Validations: v2 });
              }
            } else {
              v2.Name = { errorState: false, errorMssg: "" };
    
              this.setState({ Validations: v2 });
    
              this.setParams(Supplier);
            }
          }else{
            let vdup = this.state.Validations;
            Supplier[param] = e.target.value;
            this.setParams(Supplier);
            this.setState({ ErrorPrompt: true, ErrorMessageProps: "Name Already Exist" });
            vdup.Name = { errorState: true, errorMssg: "" }; 
          }
       
       

        break;

      case "Address":
        let v3 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 100) {
          v3.Address = {
            errorState: true,
            errorMssg: "Maximum 100 characters allowed!",
          };

          this.setState({ Validations: v3 });
        } else {
          v3.Address = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v3 });

          this.setParams(Supplier);
        }

        break;
      case "Address2":
        let v4 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 100) {
          v4.Address2 = {
            errorState: true,
            errorMssg: "Maximum 100 characters allowed!",
          };

          this.setState({ Validations: v4 });
        } else {
          v4.Address2 = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v4 });

          this.setParams(Supplier);
        }
        break;
      case "Address3":
        let v5 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 100) {
          v5.Address3 = {
            errorState: true,
            errorMssg: "Maximum 100 characters allowed!",
          };

          this.setState({ Validations: v5 });
        } else {
          v5.Address3 = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v5 });

          this.setParams(Supplier);
        }
        break;
      case "City":
        let v6 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 50) {
          v6.City = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed!",
          };

          this.setState({ Validations: v6 });
        } else {
          v6.City = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v6 });

          this.setParams(Supplier);
        }
        break;
      case "PostCode":
        let v7 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 10) {
          v7.PostCode = {
            errorState: true,
            errorMssg: "Maximum 10 characters allowed!",
          };

          this.setState({ Validations: v7 });
        } else {
          v7.PostCode = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v7 });

          this.setParams(Supplier);
        }
        break;
      case "CountryID":
        this.getStateByCountry(CF.toInt(e.target.value));
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "StateID":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "Website":
        let v8 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 50) {
          v8.Website = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed!",
          };

          this.setState({ Validations: v8 });
        } else {
          v8.Website = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v8 });

          this.setParams(Supplier);
        }
        break;
      case "PhoneNo":
        let v9 = this.state.Validations;
        let number = CF.chkIfNumber(e.target.value);
        if (number) {
          Supplier[param] = e.target.value;
          if (e.target.value.length > 20) {
            v9.PhoneNo = {
              errorState: true,
              errorMssg: "Maximum 20 numbers allowed!",
            };
            this.setState({ Validations: v9 });
          } else {
            v9.PhoneNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v9 });
            this.setParams(Supplier);
          }
        } else {
          v9.PhoneNo = { errorState: true, errorMssg: "Enter number" };
          this.setState({ Validations: v9 });
        }

        break;
      case "FaxNo":
        let v10 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 20) {
          v10.FaxNo = {
            errorState: true,
            errorMssg: "Maximum 20 characters allowed!",
          };

          this.setState({ Validations: v10 });
        } else {
          v10.FaxNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v10 });

          this.setParams(Supplier);
        }
        break;
      case "IsGroupCompany":
        Supplier[param] = e.target.checked;
        this.setParams(Supplier);
        break;
      case "DueDays":
        let v11 = this.state.Validations;
        if(isNaN(CF.toInt(e.target.value))){          
          
          if(e.target.value.trim()===""){
            Supplier[param] = e.target.value;
          }          
          this.setParams(Supplier);
        }else{
          Supplier[param] = CF.toInt(e.target.value);
          if (e.target.value.length > 3) {
            v11.DueDays = {
              errorState: true,
              errorMssg: "",
            };
  
            this.setState({ Validations: v11 });
          } else {
            v11.DueDays = { errorState: false, errorMssg: "" };
  
            this.setState({ Validations: v11 });
  
            this.setParams(Supplier);
          }
        }
       
        break;
      case "ContactPerson":
        let v22 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 50) {
          v22.ContactPerson = {
            errorState: true,
            errorMssg: "Maximum 50 Characters allowed!",
          };

          this.setState({ Validations: v22 });
        } else {
          v22.ContactPerson = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v22 });

          this.setParams(Supplier);
        }
        break;
      case "EmailID":
        Supplier[param] = e.target.value;
        let v23 = this.state.Validations;
        let duplicateExist = CF.chkDuplicateName(
          this.state.SupplierData,
          "EmailID",
          e.target.value
        );
        console.log("duplicateExist>>", duplicateExist);

        if (duplicateExist) {
          switch (duplicateExist) {
            case true:
              let ev23T = this.state.Validations;
              ev23T.EmailID = {
                errorState: true,
                errorMssg: "Email already Exists",
              };

              this.setState({
                Validations: ev23T,
              });
              break;
            case false:
              let ev23F = this.state.Validations;
              ev23F.EmailID = {
                errorState: false,
                errorMssg: "",
              };
              this.setState({
                Validations: ev23F,
              });
              break;
            default:
              break;
          }
        } else {
          let email = CF.validateEmail(e.target.value);

          if (email === true) {
            if (e.target.value.length > 50) {
              v23.EmailID = {
                errorState: true,
                errorMssg: "Maximum 50 Characters allowed!",
              };

              this.setState({ Validations: v23 });
            } else {
              v23.EmailID = { errorState: false, errorMssg: "" };

              this.setState({
                Validations: v23,
              });

              this.setParams(Supplier);
            }
          } else {
            v23.EmailID = {
              errorState: true,
              errorMssg: "Incorrect EmailID",
            };

            this.setState({
              Validations: v23,
            });
          }
        }

        break;

      case "PaymentTermID":
        console.log("-------------Setting PaymentTermID----------------");
        console.log("e.target.value > ",e.target.value);
        this.setDueDate(e.target.value);
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;

      case "CurrID":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);

        break;
      case "PayToSuplID":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "IsBlock":
        Supplier[param] = e.target.checked;
        this.setParams(Supplier);
        break;
      case "SupplierClasification":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "TypeOfEnterprise":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "GeneralPostingGroupID":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "SupplierPostingGroupID":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "IsTaxExempt":
        Supplier[param] = e.target.checked;
        this.setParams(Supplier);
        break;
      case "Reason":
        let v15 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 50) {
          v15.Reason = {
            errorState: true,
            errorMssg: "Maximum 50 Characters allowed!",
          };

          this.setState({ Validations: v15 });
        } else {
          v15.Reason = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v15 });

          this.setParams(Supplier);
        }
        break;

      case "GSTSupplierType":
        Supplier[param] = CF.toInt(e.target.value);
        this.setParams(Supplier);
        break;
      case "GSTNo":
        let v17 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 20) {
          v17.GSTNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v17 });
        } else {
          v17.GSTNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v17 });

          this.setParams(Supplier);
        }

        break;
      case "PANNo":
        let v18 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 20) {
          v18.PANNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v18 });
        } else {
          v18.PANNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v18 });

          this.setParams(Supplier);
        }
        break;

      case "VATNo":
        let v19 = this.state.Validations;
        Supplier[param] = e.target.value;
        if (e.target.value.length > 20) {
          v19.VATNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v19 });
        } else {
          v19.VATNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v19 });

          this.setParams(Supplier);
        }
        break;

      default:
        Supplier[param] = e.target.value;
        this.setParams(Supplier);
        break;
    }
    this.validateBtnEnable();
  };

  setParams = (object) => {
    this.setState({ Supplier: object });
  };

  validateBtnEnable = () => {
    let Validations = this.state.Validations;
    if (
      Validations["Name"].errorState === true ||
      Validations["Address"].errorState === true ||
      Validations["Address2"].errorState === true ||
      Validations["Address3"].errorState === true ||
      Validations["City"].errorState === true ||
      Validations["PostCode"].errorState === true ||
      Validations["Website"].errorState === true ||
      Validations["PhoneNo"].errorState === true ||
      Validations["FaxNo"].errorState === true ||
      Validations["DueDays"].errorState === true ||
      Validations["Reason"].errorState === true ||
      Validations["GSTNo"].errorState === true ||
      Validations["PANNo"].errorState === true ||
      Validations["VATNo"].errorState === true ||
      Validations["ContactPerson"].errorState === true ||
      Validations["EmailID"].errorState === true ||
      Validations["CurrID"].errorState === true
    ) {
      this.setState({ DisableCreatebtn: true, DisableUpdatebtn: true });
    } else {
      this.setState({ DisableCreatebtn: false, DisableUpdatebtn: false });
    }
  };

  validateData=()=>{
    let isvalidData=true;
    let Name=this.state.Supplier.Name;
    let CountryID=this.state.Supplier.CountryID;
    let CurrID=this.state.Supplier.CurrID;
    let GeneralPostingGroupID=this.state.Supplier.GeneralPostingGroupID;
    let SupplierPostingGroupID=this.state.Supplier.SupplierPostingGroupID;



    let Nameduplicate=this.chkIfDuplicatePresent(Name.trim());
    let Validations = this.state.Validations;

    console.log("Name > ",Name);
    console.log("CountryID > ",CountryID);
    console.log("CurrID > ",CurrID);
    console.log("GeneralPostingGroupID > ",GeneralPostingGroupID);
    console.log("SupplierPostingGroupID > ",SupplierPostingGroupID);
    console.log("Nameduplicate > ",Nameduplicate);

    console.log("parseInt(CountryID) > ",parseInt(CountryID));
    
    if(
      Name!==""  &&
      parseInt(CountryID)>0 &&
      parseInt(CurrID)>0 &&
      parseInt(GeneralPostingGroupID)>0 &&
      parseInt(SupplierPostingGroupID)>0  &&
      Nameduplicate===false
    ){
      isvalidData=true;
    }else{
      
      if(Name===""){
        Validations.Name.errorState=true;
        this.setState({Validations:Validations,ErrorPrompt: true,ErrorMessageProps:"Name is Mandatory"});
      }
      if(parseInt(CountryID)===0 || parseInt(CountryID)===-1){        
        this.setState({ErrorMessageProps:"Country is Mandatory",ErrorPrompt: true});
        return false;
      }
      if(parseInt(CurrID)===0 || parseInt(CurrID)===-1){        
        this.setState({ErrorMessageProps:"Currency is Mandatory",ErrorPrompt: true});
        return false;
      }
      if(parseInt(GeneralPostingGroupID)===0 || parseInt(GeneralPostingGroupID)===-1){
        this.setState({ErrorMessageProps:"General Posting Group is Mandatory",ErrorPrompt: true});
        return false;
      }
      if(parseInt(SupplierPostingGroupID)===0 || parseInt(SupplierPostingGroupID)===-1){
        this.setState({ErrorMessageProps:"Supplier Posting Group is Mandatory",ErrorPrompt: true});
        return false;
      }
      if( Nameduplicate===true){
        let Validations = this.state.Validations;
        Validations.Name.errorState=true;
        this.setState({Validations:Validations,ErrorPrompt: true,ErrorMessageProps:"Duplicate Name Already Exist"});
        return false;
      }
      isvalidData=false;
    }

    console.log("isvalidData > ",isvalidData);


  return isvalidData;
  }

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };

  //----------------------FILE UPLOAD-----------------------------

  getAttachedFileList = () => {

    const FTPGetAttachmentsUrl = APIURLS.APIURL.FTPFILELIST;
    const headers = {
        "Content-Type": "application/json",
    };
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append("CompanyId", 0);
    formData.append("BranchID", 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.SuplID));
    formData.append("FileData", "");
    axios
        .post(FTPGetAttachmentsUrl, formData, { headers })
        .then((response) => {
            this.setState({
                filelist: response.data
            });

        })
        .catch((error) => {
            console.log("error > ", error);
        });

}

processUpload = (e) => {
    this.setState({ ShowLoader: true });
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', 0);
    formData.append('BranchID', 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.SuplID));
    formData.append('FileData', file);

    const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
    const headers = {
        "Content-Type": "application/json",
    };
    axios
        .post(FTPUploadUrl, formData, { headers })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                this.getAttachedFileList();
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

downloadThisFile = (e, item) => {

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
        "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.FileDownload;
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', 0);
    formData.append('BranchID', 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.SuplID));
    formData.append('FileName', item.fileName);

    axios({
        method: 'post',
        url: Url,
        responseType: 'blob',
        data: formData
    })
        .then(function (response) {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.fileName);
            document.body.appendChild(link);
            console.log("link > ", link);
            link.click();
        });
}

handleDelete = (e, item) => {
    let Dialog = this.state.CustomDialog;
    Dialog.open = true;
    let DeleteAttachment = this.state.DeleteAttachment;
    DeleteAttachment.e = e;
    DeleteAttachment.item = item;
    this.setState({
        DeleteAttachment: DeleteAttachment,
        CustomDialog: Dialog
    });
}

processDelete = () => {
    let e = this.state.DeleteAttachment.e;
    let item = this.state.DeleteAttachment.item;

    const headers = {
        "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.DELETEFTPFILE;

    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', 0);
    formData.append('BranchID', 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.SuplID));
    formData.append('FileName', item.fileName);


    axios
        .post(Url, formData, { headers })
        .then((response) => {
            if (response.status === 200) {
                this.getAttachedFileList();
                this.closeDialog();
            }
        })
        .catch((error) => {
            console.log("error > ", error);
            this.setState({ filelist: [] });
        });
}

closeDialog = () => {
    let Dialog = this.state.CustomDialog;
    Dialog.open = false;
    this.setState({ CustomDialog: Dialog });
}

//--------------------------------------------------------------

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "accordion1") {
        this.state.accordion1 === true
          ? this.setState({ accordion1: false })
          : this.setState({ accordion1: true });
      }
      if (val === "accordion2") {
        this.state.accordion2 === true
          ? this.setState({ accordion2: false })
          : this.setState({ accordion2: true });
      }
      if (val === "accordion3") {
        this.state.accordion3 === true
          ? this.setState({ accordion3: false })
          : this.setState({ accordion3: true });
      }
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

    const AddNew = (e) => {

     let isvalidData=true;
     isvalidData=this.validateData();
      

     if(isvalidData===true){
      this.setState({ Loader: false });
      console.log("Adding new");
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };

      let Supplier = this.state.Supplier;
      let reqData = {
        ValidUser: ValidUser,
        DocumentNumber: {
          NoSeriesID: 2,
          TransDate: moment().format("MM-DD-YYYY"),
        },
      };
      let Url = APIURLS.APIURL.GetMasterDocumentNumber;
      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          let data = response.data;
          console.log("---> No Series DATA > ", data);
          Supplier.No = data;
          reqData = {
            ValidUser: ValidUser,
            Supplier: Supplier,
          };
          console.log("createCoa > reqData >", reqData);
          Url = APIURLS.APIURL.CreateSupplier;
          axios
            .post(Url, reqData, { headers })
            .then((response) => {
              let data = response.data;
              console.log("DATA>>", data);
              if (response.status === 200 || response.status === 201) {
                this.setState({
                  ErrorPrompt: false,
                  SuccessPrompt: true,
                  Loader: true,
                });
                this.openPage(URLS.URLS.editSupplier +
                  this.state.urlparams +
                  "&editSuplID=" +
                  data.ID + "&type=edit");
              } else {
                this.setState({
                  ErrorPrompt: true,
                  SuccessPrompt: false,
                  Loader: true,
                });
              }
            })
            .catch((error) => {
              this.setState({ ErrorPrompt: true, Loader: true });
            });
        })
        .catch((error) => {
          this.setState({ ErrorPrompt: true, Loader: true });
        });
     }else{
      
     }

  
    };

    const updateSupplier = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateSupplier;
      let Supplier = this.state.Supplier;
      let reqData = {
        ValidUser: ValidUser,
        Supplier: Supplier,
      };
      console.log("updateSupplier > reqData >", reqData);
      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          let data = response.data;
          if (response.status === 200 || response.status === 201) {
            this.setState({ ErrorPrompt: false, SuccessPrompt: true });
          } else {
            this.setState({ ErrorPrompt: true, SuccessPrompt: false });
          }
        })
        .catch((error) => {
          this.setState({ ErrorPrompt: true });
        });
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

          </DialogContent>
        </Dialog>
      </Fragment>
    );

    const tab1Html = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: "#fff" }} >
            <div style={{ marginTop: 5, marginLeft: 15 }}>
              <h4 style={{ color: "#000000" }}>Supplier Statistics</h4>
            </div>
            <TableContainer>
              <Table stickyHeader size="small" className="accordion-table" aria-label="table" >
                <TableBody className="tableBody">
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Supplier No.
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      {this.state.Supplier.No}
                    </TableCell>
                  </TableRow>                  
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Balance
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Balance(LCY)
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Overdue Amount(LCY)
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      000
                    </TableCell>
                  </TableRow>                
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Payment(LCY)
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      000
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Last Payment Date
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      {moment().format("MM/DD/YYYY")}
                    </TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
            <div style={{ height: 20 }}></div>
          </Grid>
        </Grid>
        <Grid container spacing={0} style={{ marginLeft: 15 }}>
          <Grid item xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
            <Grid container spacing={1} >
              <Grid item xs={12} sm={12} md={4} lg={4}  >
                <div key="paymentPendingLink" to="#" className="card-link">
                  <Card className="dash-activity-card2" raised={false}>
                    <CardContent>
                      <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                        Orders
                      </Typography>
                      <Typography >
                        000
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}  >
                <div key="paymentPendingLink" to="#" className="card-link">
                  <Card className="dash-activity-card2" raised={false}>
                    <CardContent>
                      <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                        Invoices
                      </Typography>
                      <Typography>
                        0000
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}  >
                <div key="paymentPendingLink" to="#" className="card-link">
                  <Card className="dash-activity-card2" raised={false}>
                    <CardContent>
                      <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                        Debit Note
                      </Typography>
                      <Typography>
                        0000
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
            <div style={{ height: 20 }}></div>
          </Grid>
        </Grid>
      </Fragment>
    );

    const tab2Html = (
      <Fragment>
          <div className="sidenav-fixedheight-scroll">
              <Grid container spacing={0}>
                  <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: "#fff" }} >
                      <TableContainer>
                          <Table stickyHeader size="small" className="" aria-label="Attachment Form table">
                              <TableRow>
                                  <TableCell className="no-border-table">
                                      <Button
                                          className="action-btns"
                                          startIcon={<AttachFileIcon />}
                                          onClick={(e) => { document.getElementById("uploadInput").click() }}
                                      >
                                          Attach File
                                      </Button>
                                      <input
                                          className="file-upload-input"
                                          id="uploadInput"
                                          type="file"
                                          onChange={(e) => this.processUpload(e)}
                                      />

                                  </TableCell>
                              </TableRow>
                          </Table>
                      </TableContainer>
                  </Grid>
              </Grid>
              <Grid container spacing={0}>

                  <Grid xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: "#fff" }} >
                      <Table size="small">
                          <TableBody className="tableBody">
                              {this.state.filelist.map((item, i) => (
                                  <TableRow id={"fileRow_" + item.fileName}>
                                      <TableCell align="left" className="no-border-table">
                                          <span className="avatar-hover" onClick={(e) => this.downloadThisFile(e, item)}> {item.fileName} </span> <br />
                                          <span style={{ color: '#b0bec5' }}>{"Uploaded on " + item.modifiedDateTime}</span>
                                      </TableCell>
                                      <TableCell align="left" className="no-border-table">
                                          <IconButton size="small" edge="end" aria-label="delete">
                                              <DeleteIcon
                                                  role={item} fontSize="small" style={{ color: '#f44336' }}
                                                  onClick={(e) => this.handleDelete(e, item)}

                                              />
                                          </IconButton>
                                      </TableCell>
                                  </TableRow>
                              ))}
                          </TableBody>
                      </Table>

                  </Grid>
              </Grid>

          </div>
      </Fragment>
  );

    const sideDataNavigation = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid
            xs={12}
            sm={12}
            md={11}
            lg={11}
            style={{ backgroundColor: "#fff" }}
          >
            <Dualtabcomponent
              tab1name="Details"
              tab2name="Attachments"
              tab1Html={tab1Html}
              tab2Html={tab2Html}
            />
          </Grid>
        </Grid>
      </Fragment>
    );

    const Address = <Addresses SuplID={this.state.SuplID} />;
    const branchMapping = <BranchMapping SuplID={this.state.SuplID} />;

    const paymentTerms = <PaymentTerms SuplID={this.state.SuplID} />;
    const supplierPrice = <SupplierPrice SuplID={this.state.SuplID} />;

    const openDialog = (param) => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = true;


      switch (param) {
        case "Address":
          Dialog.DialogTitle = "Address";
          Dialog.DialogContent = Address;
          this.setState({ Dialog: Dialog });
          break;

        case "PaymentTerms":
          Dialog.DialogTitle = "Payment Terms";
          Dialog.DialogContent = paymentTerms;
          this.setState({ Dialog: Dialog });
          break;

        case "BranchMapping":
          Dialog.DialogTitle = "Branch Mapping";
          Dialog.DialogContent = branchMapping;
          this.setState({ Dialog: Dialog });
          break;
        case "SupplierPrice":
          Dialog.DialogTitle = "Supplier Price";
          Dialog.DialogContent = supplierPrice;
          this.setState({ Dialog: Dialog });
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
      refreshDropdownList();
      this.getPaymentTerms();
    };

    const refreshDropdownList = () => {
      //refresh dropdown list
    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.supplierMaster + this.state.urlparams}
          masterLinkTitle="Supplier"
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
          {this.state.type === "add" ? (
            <Button
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              onClick={(e) => AddNew(e)}
              disabled={this.state.DisableCreatebtn}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}
          {this.state.type === "edit" ? (
            <div>
              <Button
                startIcon={APIURLS.buttonTitle.save.icon}
                className="action-btns"
                onClick={(e) => updateSupplier(e)}
                disabled={this.state.DisableUpdatebtn}
              >
                {APIURLS.buttonTitle.save.name}
              </Button>
              <Button
                startIcon={APIURLS.buttonTitle.address.icon}
                className="action-btns"
                onClick={(e) => openDialog("Address")}
              >
                {APIURLS.buttonTitle.address.name}
                
              </Button>
              <Button
                startIcon={APIURLS.buttonTitle.branchmapping.icon}
                className="action-btns"
                onClick={(e) => openDialog("BranchMapping")}
              >
               {APIURLS.buttonTitle.branchmapping.name}
              </Button>
              <Button
                startIcon={APIURLS.buttonTitle.supplierprice.icon}
                className="action-btns"
                onClick={(e) => openDialog("SupplierPrice")}
              >
                {APIURLS.buttonTitle.supplierprice.name}
              </Button>
            </div>
          ) : null}
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <BackdropLoader open={!this.state.ProgressLoader} />

        <DialogCustom
          MessageHeader="Delete Attachment!"
          MessageText="Do you want to delete this attachment?"
          open={this.state.CustomDialog.open}
          onClose={(e) => this.closeDialog()}
          onOK={(e) => this.processDelete()}
        />

        <ErrorSnackBar
          ErrorMessageProps={this.state.ErrorMessageProps}
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
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={1}>
              <Grid xs={12} sm={12} md={12} lg={12}>
                <Accordion
                  key="Supplier-General-Details"
                  expanded={this.state.accordion1}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) => handleAccordionClick("accordion1", e)}
                      />
                    }
                    onClick={(e) => handleAccordionClick("accordion1", e)}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                  >
                    <Typography key="" className="accordion-Header-Title">
                      General
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Fragment>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <div>
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                                <SIB
                                  id="No"
                                  label="No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("No", e)
                                  }
                                  value={this.state.Supplier.No}
                                  disabled={true}
                                />
                                <SIB
                                  id="Name"
                                  label="Name"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("Name", e)
                                  }
                                  value={this.state.Supplier.Name}
                                  isMandatory={true}
                                  error={this.state.Validations.Name.errorState}
                                />
                                <SIB
                                  id="Address"
                                  label="Address Line 1"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("Address", e)
                                  }
                                  value={this.state.Supplier.Address}
                                  error={
                                    this.state.Validations.Address.errorState
                                  }
                                />
                                <SIB
                                  id="Address2"
                                  label="Address Line 2"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("Address2", e)
                                  }
                                  value={this.state.Supplier.Address2}
                                  error={
                                    this.state.Validations.Address2.errorState
                                  }
                                />
                                <SIB
                                  id="Address3"
                                  label="Address Line 3"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("Address3", e)
                                  }
                                  value={this.state.Supplier.Address3}
                                  error={
                                    this.state.Validations.Address3.errorState
                                  }
                                />
                                <SIB
                                  id="City"
                                  label="City"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("City", e)
                                  }
                                  value={this.state.Supplier.City}
                                  error={this.state.Validations.City.errorState}
                                />
                                <SIB
                                  id="PostCode"
                                  label="Postcode"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("PostCode", e)
                                  }
                                  value={this.state.Supplier.PostCode}
                                  error={
                                    this.state.Validations.PostCode.errorState
                                  }
                                />
                                <SSIB
                                  key="IsGroupCompany"
                                  id="IsGroupCompany"
                                  label="Group Company?"
                                  param={this.state.Supplier.IsGroupCompany}
                                  onChange={(e) =>
                                    this.updateFormValue("IsGroupCompany", e)
                                  }
                                />

                              </Grid>
                              <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                                <SDIB
                                  id="CountryID"
                                  label="Country"
                                  onChange={(e) =>
                                    this.updateFormValue("CountryID", e)
                                  }
                                  value={this.state.Supplier.CountryID}
                                  param={this.state.countryData}
                                  isMandatory={true}
                                />  {console.log("$$ ---------------------------> this.state.Supplier.StateID > ",this.state.Supplier.StateID)}
                                <SDIB
                                  id="StateID"
                                  label="State"
                                  onChange={(e) =>
                                    this.updateFormValue("StateID", e)
                                  }
                                  value={this.state.Supplier.StateID}
                                  param={this.state.stateData}
                                />
                                <SIB
                                  id="ContactPerson"
                                  label="Contact Person"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("ContactPerson", e)
                                  }
                                  value={this.state.Supplier.ContactPerson}
                                  error={
                                    this.state.Validations.ContactPerson
                                      .errorState
                                  }
                                />
                                <SIB
                                  id="EmailID"
                                  label="Email"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("EmailID", e)
                                  }
                                  value={this.state.Supplier.EmailID}
                                  error={
                                    this.state.Validations.EmailID.errorState
                                  }
                                />

                                <SIB
                                  id="Website"
                                  label="Website"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("Website", e)
                                  }
                                  value={this.state.Supplier.Website}
                                  error={
                                    this.state.Validations.Website.errorState
                                  }
                                />

                                <SIB
                                  id="PhoneNo"
                                  label="Phone No."
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("PhoneNo", e)
                                  }
                                  value={this.state.Supplier.PhoneNo}
                                  error={
                                    this.state.Validations.PhoneNo.errorState
                                  }
                                />
                                <SIB
                                  id="FaxNo"
                                  label="Fax No."
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("FaxNo", e)
                                  }
                                  value={this.state.Supplier.FaxNo}
                                  error={
                                    this.state.Validations.FaxNo.errorState
                                  }
                                />


                                <SSIB
                                  key="IsBlock"
                                  id="IsBlock"
                                  label="Block?"
                                  param={this.state.Supplier.IsBlock}
                                  onChange={(e) =>
                                    this.updateFormValue("IsBlock", e)
                                  }
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </Fragment>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  key="Supplier-General-Details"
                  expanded={this.state.accordion2}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) => handleAccordionClick("accordion2", e)}
                      />
                    }
                    onClick={(e) => handleAccordionClick("accordion2", e)}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                  >
                    <Typography key="" className="accordion-Header-Title">
                      Invoicing
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Fragment>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <div>
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                                <SDIB
                                  id="CurrID"
                                  label="Currency"
                                  onChange={(e) =>
                                    this.updateFormValue("CurrID", e)
                                  }
                                  value={this.state.Supplier.CurrID}
                                  param={this.state.currencyList}
                                  isMandatory={true}
                                />
                                <SDIB
                                  id="GeneralPostingGroupID"
                                  label="Gen.Posting Group"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "GeneralPostingGroupID",
                                      e
                                    )
                                  }
                                  value={
                                    this.state.Supplier.GeneralPostingGroupID
                                  }
                                  param={this.state.GeneralPostingGroupList}
                                  isMandatory={true}
                                />

                                <SDIB
                                  id="SupplierPostingGroupID"
                                  label="Sup.Posting Group"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "SupplierPostingGroupID",
                                      e
                                    )
                                  }
                                  value={
                                    this.state.Supplier.SupplierPostingGroupID
                                  }
                                  param={this.state.SupplierPostingGroupList}
                                  isMandatory={true}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                              <Grid item xs={12} sm={12} md={5} lg={5}>

                                <SDBIB
                                  id="PaymentTermID"
                                  label="Payment Term"
                                  onChange={(e) =>
                                    this.updateFormValue("PaymentTermID", e)
                                  }
                                  value={this.state.Supplier.PaymentTermID}
                                  param={this.state.paymentTermsData}
                                  onClick={(e) => openDialog("PaymentTerms")}
                                />

                                <SIB
                                  id="DueDays"
                                  label="Due Days"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("DueDays", e)
                                  }
                                  value={this.state.Supplier.DueDays}
                                  error={
                                    this.state.Validations.DueDays.errorState
                                  }
                                />

                                <SDIB
                                  id="PayToSuplID"
                                  label="Pay to Supplier"
                                  onChange={(e) =>
                                    this.updateFormValue("PayToSuplID", e)
                                  }
                                  value={this.state.Supplier.PayToSuplID}
                                  param={this.state.DropdownSupplierData}

                                />
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </Fragment>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  key="Supplier-General-Details"
                  expanded={this.state.accordion3}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) => handleAccordionClick("accordion3", e)}
                      />
                    }
                    onClick={(e) => handleAccordionClick("accordion3", e)}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                  >
                    <Typography key="" className="accordion-Header-Title">
                      Tax
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Fragment>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <div>
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                                <SDIB
                                  id="SupplierClasification"
                                  label="Supplier Clasification"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "SupplierClasification",
                                      e
                                    )
                                  }
                                  value={
                                    this.state.Supplier.SupplierClasification
                                  }
                                  param={APIURLS.SupplierClasification}
                                />
                                <SDIB
                                  id="TypeOfEnterprise"
                                  label="Enterprise Type"
                                  onChange={(e) =>
                                    this.updateFormValue("TypeOfEnterprise", e)
                                  }
                                  value={this.state.Supplier.TypeOfEnterprise}
                                  param={this.state.TypeOfEnterprise}
                                />


                                <SIB
                                  id="GSTNo"
                                  label="GST No."
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("GSTNo", e)
                                  }
                                  value={this.state.Supplier.GSTNo}
                                  error={
                                    this.state.Validations.GSTNo.errorState
                                  }
                                />

                                <SDIB
                                  id="GSTSupplierType"
                                  label="GST Sup.Type"
                                  onChange={(e) =>
                                    this.updateFormValue("GSTSupplierType", e)
                                  }
                                  value={this.state.Supplier.GSTSupplierType}
                                  param={this.state.GSTSupplierType}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                              <Grid item xs={12} sm={12} md={5} lg={5}>

                                <SIB
                                  id="PANNo"
                                  label="PAN No."
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("PANNo", e)
                                  }
                                  value={this.state.Supplier.PANNo}
                                  error={
                                    this.state.Validations.PANNo.errorState
                                  }
                                />

                                <SIB
                                  id="VATNo"
                                  label="VAT No."
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("VATNo", e)
                                  }
                                  value={this.state.Supplier.VATNo}
                                  error={
                                    this.state.Validations.VATNo.errorState
                                  }
                                />

                                <SSIB
                                  key="IsTaxExempt"
                                  id="IsTaxExempt"
                                  label="Tax Exempted?"
                                  param={this.state.Supplier.IsTaxExempt}
                                  onChange={(e) =>
                                    this.updateFormValue("IsTaxExempt", e)
                                  }
                                />
                                <SIB
                                  id="Reason"
                                  label="Reason"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    this.updateFormValue("Reason", e)
                                  }
                                  value={this.state.Supplier.Reason}
                                  error={
                                    this.state.Validations.Reason.errorState
                                  }
                                />
                              </Grid>
                            </Grid>
                          </div>
                        </Grid>
                      </Grid>
                    </Fragment>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>

            <div style={{ height: 50 }}></div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
              <Grid item xs={12} sm={12} md={11} lg={11}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                   {sideDataNavigation}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {dialog}
      </Fragment>
    );
  }
}
export default supplieractivity;
