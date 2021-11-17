import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Accordioncomponent from "../../compo/accordioncomponent";
import TextboxInput from "../../compo/tablerowcelltextboxinput";
import TablecustomInput from "../../compo/tablerowcellcustomhtml";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import SwitchInput from "../../compo/tablerowcellswitchinput";
import Dualtabcomponent from "../../compo/dualtabcomponent";

import Addresses from "./component/addresses";
import Contact from "./component/contact";
import CustomerCategory from "./component/customerCategory";
import PaymentTerms from "./component/paymentTerms";
import SalesPerson from "./component/salesPerson";

class customeractivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: true,
      DisableUpdatebtn: false,
      initialCss: "",
      urlparams: "",
      editurl: "",
      typoTitle: "",
      type: "",
      CreditRating: APIURLS.CreditRating,
      GSTCutomerType: APIURLS.GSTCutomerType,
      customerData: [],
      SalesPersonData: [],
      CustomerCategoryData: [],
      paymentTermsData: [],
      GeneralPostingGroupList: [],
      CustomerPostingGroupList: [],
      currencyList: [],
      countryData: [],
      stateData: [],

      CustID: 0,
      emailVerify: false,
      Customer: {
        CustID: 0,
        No: "",
        Name: "",
        Address: "",
        Address2: "",
        Address3: "",
        City: "",
        PostCode: "",
        CountryID: 0,
        StateID: 12,
        Website: "",
        PhoneNo: "",
        FaxNo: "",
        IsGroupCompany: false,
        CreditDays: 0,
        CreditLimit: 0,
        PaymentTermID: 0,
        CreditRating: 0,
        GraceDays: 0,
        CurrID: 0,
        IsGrowthBonanza: false,
        IsSlabDiscount: false,
        IsCarriage: false,
        IsDueEndOfMonth: false,
        IsBankCharge: false,
        BankCharge: 0,
        IsBlock: false,
        IsEmailAlert: false,
        SalesPersonID: 0,
        CustomerCategoryID: 0,
        GeneralPostingGroupID: 0,
        CustomerPostingGroupID: 0,
        IsTaxExempt: false,
        Reason: "",
        IsEcommerce: false,
        EcommerceGSTNo: "",
        EcommerceB2B: false,
        EcommerceNoSeries: 0,
        GSTCutomerType: 0,
        GSTNo: "",
        PANNo: "",
        IncoID: 0,
        VATNo: "",
        EORINo: "",
        TSSNo: "",
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
        GraceDays: { errorState: false, errorMssg: "" },
        Website: { errorState: false, errorMssg: "" },
        PhoneNo: { errorState: false, errorMssg: "" },
        FaxNo: { errorState: false, errorMssg: "" },
        CreditDays: { errorState: false, errorMssg: "" },
        CreditLimit: { errorState: false, errorMssg: "" },
        Reason: { errorState: false, errorMssg: "" },
        GSTNo: { errorState: false, errorMssg: "" },
        PANNo: { errorState: false, errorMssg: "" },
        VATNo: { errorState: false, errorMssg: "" },
        EORINo: { errorState: false, errorMssg: "" },
        TSSNo: { errorState: false, errorMssg: "" },
        ContactPerson: { errorState: false, errorMssg: "" },
        EmailID: { errorState: false, errorMssg: "" },
        BankCharge: { errorState: false, errorMssg: "" },
        EcommerceGSTNo: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    this.getSalesPerson();
    this.getCustomerCategory();
    this.getCustomerList();
    this.getAllGeneralPostingGroup();
    this.getAllCustomerPostingGroup();
    this.getCurrencyList();
    this.getCountryList();
    this.getStateList();
    this.getPaymentTerms();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let type = url.searchParams.get("type");
    let CustID = type === "edit" ? url.searchParams.get("editCustID") : 0;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let Customer = this.state.Customer;
    Customer.BranchID = CF.toInt(branchId);
    if (type === "edit") {
      Customer.CustID = CF.toInt(CustID);
      this.getCustomerDetails(Customer);
    }

    this.setState({
      Customer: Customer,
      CustID: type === "edit" ? CF.toInt(CustID) : 0,
      urlparams: urlparams,
      type: type,
      typoTitle: typoTitle,
      ProgressLoader: type === "add" ? true : false,
      BranchID: CF.toInt(branchId),
    });

    console.log("On load state > ", this.state);
  }

  getCustomerList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllCustomer;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ customerData: data, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ customerData: [], ProgressLoader: true });
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
            name:
              data[i].Code + "-" + data[i].Description + "-" + data[i].DueDays,
            value: data[i].PaymentTermID,
          };
          newD.push(o);
        }
        this.setState({ paymentTermsData: newD, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ paymentTermsData: [], ProgressLoader: true });
      });
  };

  getAllCustomerPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllCustomerPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code + "-" + data[i].Description,
            value: data[i].CustomerPostingGroupID,
          };
          newD.push(o);
        }
        this.setState({ CustomerPostingGroupList: newD });
      })
      .catch((error) => {});
  };

  getStateList = () => {
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
        let newData = [];
        for (let i = 0; i < data.length; i++) {
          let d = {
            name: data[i].name,
            value: data[i].stateId,
          };
          newData.push(d);
        }
        this.setState({ stateData: newData, ProgressLoader: true });
      })
      .catch((error) => {});
  };

  getCountryList = () => {
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
        let newData = [];
        for (let i = 0; i < data.length; i++) {
          let d = {
            name: data[i].name,
            value: data[i].countryId,
          };
          newData.push(d);
        }
        this.setState({ countryData: newData, ProgressLoader: true });
      })
      .catch((error) => {});
  };

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
            name: data[i].Code + "-" + data[i].Description,
            value: data[i].GeneralPostingGroupID,
          };
          newD.push(o);
          console.log("newD>>", newD);
        }
        this.setState({ GeneralPostingGroupList: newD });
      })
      .catch((error) => {});
  };

  getCustomerCategory = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllCustomerCategory;
    let data={
      ValidUser:ValidUser,      
    };
    axios    
    .post(Url,data, { headers })
      .then((response) => {
        let data = response.data;
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code + "-" + data[i].Description,
            value: data[i].CustomerCategoryID,
          };
          newD.push(o);
          console.log("newD>>", newD);
        }
        this.setState(
          { CustomerCategoryData: newD, ProgressLoader: true }
        );
      })
      .catch((error) => {
        this.setState(
          { CustomerCategoryData: [], ProgressLoader: true });
      });
  };

  getSalesPerson = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSalesPerson;
    axios
      .post(Url,ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code,
            value: data[i].SalesPersonID,
          };
          newD.push(o);
          console.log("newD>>", newD);
        }
        this.setState({ SalesPersonData: newD, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ SalesPersonData: [], ProgressLoader: true });
      });
  };

  getCustomerDetails = (Customer) => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetCustomer;
    let reqData = {
      ValidUser: ValidUser,
      Customer: Customer,
    };
    console.log("getCustomerDetails > getCustomerDetails >", reqData);
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          this.setState({ Customer: data, ProgressLoader: true });
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

  updateFormValue = (param, e) => {
    let Customer = this.state.Customer;
    switch (param) {
      case "Name":
        let v2 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value === "" || e.target.value.length > 100) {
         
          if (e.target.value === "") {
           
            v2.Name = { errorState: true, errorMssg: "Cannot be blank!" };
            if (this.state.type === "add") {
              this.setState({ Validations: v2});
            } else {
              this.setState({ Validations: v2});
            }
          }
          if (e.target.value.length > 100) {
            v2.Name = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed!",
            };
            if (this.state.type === "add") {
              this.setState({ Validations: v2 });
            } else {
              this.setState({ Validations: v2 });
            }
          }
        } else {
         
          v2.Name = { errorState: false, errorMssg: "" };
          if (this.state.type === "add") {
            this.setState({ Validations: v2});
          } else {
            this.setState({ Validations: v2 });
          }
          this.setParams(Customer);
        }

        break;
      case "Address":
        let v3 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 100) {
          v3.Address = {
            errorState: true,
            errorMssg: "Maximum 100 characters allowed!",
          };

          this.setState({ Validations: v3 });
        } else {
          
          v3.Address = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v3 });

          this.setParams(Customer);
        }

        break;
      case "Address2":
        let v4 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 100) {
          v4.Address2 = {
            errorState: true,
            errorMssg: "Maximum 100 characters allowed!",
          };

          this.setState({ Validations: v4 });
        } else {
         
          v4.Address2 = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v4 });

          this.setParams(Customer);
        }
        break;
      case "Address3":
        let v5 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 100) {
          v5.Address3 = {
            errorState: true,
            errorMssg: "Maximum 100 characters allowed!",
          };

          this.setState({ Validations: v5 });
        } else {
         
          v5.Address3 = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v5 });

          this.setParams(Customer);
        }
        break;
      case "City":
        let v6 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 50) {
          v6.City = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed!",
          };

          this.setState({ Validations: v6 });
        } else {
          
          v6.City = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v6 });

          this.setParams(Customer);
        }
        break;
      case "PostCode":
        let v7 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 10) {
          v7.PostCode = {
            errorState: true,
            errorMssg: "Maximum 10 characters allowed!",
          };

          this.setState({ Validations: v7 });
        } else {
          
          v7.PostCode = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v7 });

          this.setParams(Customer);
        }
        break;
      case "CountryID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "StateID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "Website":
        let v8 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 50) {
          v8.Website = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed!",
          };

          this.setState({ Validations: v8 });
        } else {
         
          v8.Website = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v8 });

          this.setParams(Customer);
        }
        break;
      case "PhoneNo":
        let v9 = this.state.Validations;

        let numbers = /^[0-9\b]+$/;
        if (numbers.test(e.target.value)) {
          Customer[param] = e.target.value;
          if (e.target.value.length > 20) {
            v9.PhoneNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed!",
            };

            this.setState({ Validations: v9 });
          } else {
            
            v9.PhoneNo = { errorState: false, errorMssg: "" };

            this.setState({ Validations: v9 });

            this.setParams(Customer);
          }
        }
        break;
      case "FaxNo":
        let v10 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 20) {
          v10.FaxNo = {
            errorState: true,
            errorMssg: "Maximum 20 characters allowed!",
          };

          this.setState({ Validations: v10 });
        } else {
          
          v10.FaxNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v10 });

          this.setParams(Customer);
        }
        break;
      case "IsGroupCompany":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "CreditDays":
        let v11 = this.state.Validations;
        Customer[param] = CF.toInt(e.target.value);
        if (e.target.value.length > 2) {
          v11.CreditDays = {
            errorState: true,
            errorMssg: "Maximum 2 Numbers allowed!",
          };

          this.setState({ Validations: v11 });
        } else {
         
          v11.CreditDays = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v11 });

          this.setParams(Customer);
        }
        break;
      case "CreditLimit":
        let v12 = this.state.Validations;
        Customer[param] = CF.toFloat(e.target.value);
        if (e.target.value.length > 8) {
          v12.CreditLimit = {
            errorState: true,
            errorMssg: "Maximum 8 Numbers allowed!",
          };

          this.setState({ Validations: v12 });
        } else {
         
          v12.CreditLimit = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v12 });

          this.setParams(Customer);
        }
        break;
      case "PaymentTermID":
        console.log("Setting PaymentTermID");
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "CreditRating":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "GraceDays":
        let v13 = this.state.Validations;
        Customer[param] = CF.toInt(e.target.value);
        if (e.target.value.length > 2) {
          v13.GraceDays = {
            errorState: true,
            errorMssg: "Maximum 2 Numbers allowed!",
          };

          this.setState({ Validations: v13 });
        } else {
          
          v13.GraceDays = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v13 });

          this.setParams(Customer);
        }
        break;

      case "CurrID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "IsGrowthBonanza":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "IsSlabDiscount":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "IsCarriage":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "IsDueEndOfMonth":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "IsBankCharge":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "BankCharge":
        let v14 = this.state.Validations;
        Customer[param] = CF.toFloat(e.target.value);
        if (e.target.value.length > 8) {
          v14.BankCharge = {
            errorState: true,
            errorMssg: "Maximum 8 Numbers allowed!",
          };

          this.setState({ Validations: v14 });
        } else {
         
          v14.BankCharge = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v14 });

          this.setParams(Customer);
        }
        break;
      case "IsBlock":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "IsEmailAlert":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "SalesPersonID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "CustomerCategoryID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "GeneralPostingGroupID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "CustomerPostingGroupID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "IsTaxExempt":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "Reason":
        let v15 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 50) {
          v15.Reason = {
            errorState: true,
            errorMssg: "Maximum 50 Characters allowed!",
          };

          this.setState({ Validations: v15 });
        } else {
          
          v15.Reason = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v15 });

          this.setParams(Customer);
        }
        break;
      case "IsEcommerce":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "EcommerceGSTNo":
        let v16 = this.state.Validations;
        if (e.target.value.length > 20) {
          v16.EcommerceGSTNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v16 });
        } else {
          Customer[param] = e.target.value;
          v16.EcommerceGSTNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v16 });

          this.setParams(Customer);
        }
        break;
      case "EcommerceB2B":
        Customer[param] = e.target.checked;
        this.setParams(Customer);
        break;
      case "EcommerceNoSeries":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "GSTCutomerType":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "GSTNo":
        let v17 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 20) {
          v17.GSTNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v17 });
        } else {
          
          v17.GSTNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v17 });

          this.setParams(Customer);
        }
        break;
      case "PANNo":
        let v18 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 20) {
          v18.PANNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v18 });
        } else {
         
          v18.PANNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v18 });

          this.setParams(Customer);
        }
        break;
      case "IncoID":
        Customer[param] = CF.toInt(e.target.value);
        this.setParams(Customer);
        break;
      case "VATNo":
        let v19 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 20) {
          v19.VATNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v19 });
        } else {
         
          v19.VATNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v19 });

          this.setParams(Customer);
        }
        break;
      case "EORINo":
        let v20 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 20) {
          v20.EORINo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v20 });
        } else {
          
          v20.EORINo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v20 });

          this.setParams(Customer);
        }
        break;
      case "TSSNo":
        let v21 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 20) {
          v21.TSSNo = {
            errorState: true,
            errorMssg: "Maximum 20 Characters allowed!",
          };

          this.setState({ Validations: v21 });
        } else {
         
          v21.TSSNo = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v21 });

          this.setParams(Customer);
        }
        break;
      case "ContactPerson":
        let v22 = this.state.Validations;
        Customer[param] = e.target.value;
        if (e.target.value.length > 50) {
          v22.ContactPerson = {
            errorState: true,
            errorMssg: "Maximum 50 Characters allowed!",
          };

          this.setState({ Validations: v22 });
        } else {
          
          v22.ContactPerson = { errorState: false, errorMssg: "" };

          this.setState({ Validations: v22 });

          this.setParams(Customer);
        }
        break;
      case "EmailID":
        Customer[param] = e.target.value;  
        let v23 = this.state.Validations;
        let duplicateExist = CF.chkDuplicateName(
          this.state.customerData,
          "EmailID",
          e.target.value
        );
       console.log("duplicateExist>>",duplicateExist);
        

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

            this.setParams(Customer);
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
      case "SalesPersonID":
        Customer[param] = e.target.value;
        this.setParams(Customer);
        break;
      case "CustomerCategoryID":
        Customer[param] = e.target.value;
        this.setParams(Customer);
        break;
      default:
        break;
    }
    this.validateBtnEnable();
  };

  validateBtnEnable=()=>{
    let Validations=this.state.Validations;    
      if(Validations['Name'].errorState===true||Validations['Address'].errorState===true||Validations['Address2'].errorState===true
      ||Validations['Address3'].errorState===true||Validations['City'].errorState===true||Validations['PostCode'].errorState===true||
      Validations['Website'].errorState===true||Validations['PhoneNo'].errorState===true||Validations['FaxNo'].errorState===true
      ||Validations['CreditDays'].errorState===true||Validations['CreditLimit'].errorState===true||Validations['GraceDays'].errorState===true 
      ||Validations['Reason'].errorState===true||Validations['GSTNo'].errorState===true||Validations['PANNo'].errorState===true ||Validations['VATNo'].errorState===true
      ||Validations['EORINo'].errorState===true||Validations['TSSNo'].errorState===true||Validations['ContactPerson'].errorState===true||Validations['EmailID'].errorState===true 
      ||Validations['BankCharge'].errorState===true||Validations['EcommerceGSTNo'].errorState===true){
      this.setState({DisableCreatebtn: true,DisableUpdatebtn:true});
    }else{
      this.setState({DisableCreatebtn: false,DisableUpdatebtn:false});
    }

  }

  setParams = (object) => {
    this.setState({ Customer: object });
  };

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };

  refreshDropdownList = () => {
    this.getSalesPerson();
    this.getCustomerCategory();
    this.getCustomerList();
    this.getAllGeneralPostingGroup();
    this.getAllCustomerPostingGroup();
    this.getCurrencyList();
    this.getCountryList();
    this.getStateList();
    this.getPaymentTerms();
  };

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
      this.setState({ Loader: false });
      console.log("Adding new");
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };

      let Customer = this.state.Customer;
      let reqData = {
        ValidUser: ValidUser,
        DocumentNumber: {
          NoSeriesID: 1,
          TransDate: moment().format("MM-DD-YYYY"),
        },
      };
      let Url = APIURLS.APIURL.GetMasterDocumentNumber;
      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          let data = response.data;
          console.log("---> No Series DATA > ", data);
          Customer.No = data;
          reqData = {
            ValidUser: ValidUser,
            Customer: Customer,
          };
          console.log("createCoa > reqData >", reqData);
          Url = APIURLS.APIURL.CreateCustomer;
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
                this.openPage(URLS.URLS.customerMaster + this.state.urlparams);
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
    };

    const updateCustomer = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateCustomer;
      let Customer = this.state.Customer;
      Customer.BranchID = CF.toInt(this.state.BranchID);
      Customer.UserID = CF.toInt(getCookie(COOKIE.USERID));

      delete Customer["CustomerAddress"];
      delete Customer["CustomerBranchMapping"];
      delete Customer["CustomerContact"];

      let reqData = {
        ValidUser: ValidUser,
        Customer: Customer,
      };
      console.log("updateCustomer > reqData >", reqData);
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

    const generalform = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="General Activity table"
                    >
                      <TableBody className="tableBody">
                        <TextboxInput
                          id="No"
                          label="No"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("No", e)}
                          value={this.state.Customer.No}
                          isMandatory={true}
                          
                          disabled={true}
                        />
                        <TextboxInput
                          id="Name"
                          label="Name"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("Name", e)}
                          value={this.state.Customer.Name}
                          isMandatory={true}
                          error={this.state.Validations.Name.errorState}
                          helperText={this.state.Validations.Name.errorMssg}
                        />
                        <TextboxInput
                          id="Address"
                          label="Address"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("Address", e)}
                          value={this.state.Customer.Address}
                          error={this.state.Validations.Address.errorState}
                          helperText={this.state.Validations.Address.errorMssg}
                        />
                        <TextboxInput
                          id="Address2"
                          label="Address2"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("Address2", e)}
                          value={this.state.Customer.Address2}
                          error={this.state.Validations.Address2.errorState}
                          helperText={this.state.Validations.Address2.errorMssg}
                        />
                        <TextboxInput
                          id="Address3"
                          label="Address3"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("Address3", e)}
                          value={this.state.Customer.Address3}
                          error={this.state.Validations.Address3.errorState}
                          helperText={this.state.Validations.Address3.errorMssg}
                        />
                        <TextboxInput
                          id="City"
                          label="City"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("City", e)}
                          value={this.state.Customer.City}
                          error={this.state.Validations.City.errorState}
                          helperText={this.state.Validations.City.errorMssg}
                        />
                        <TextboxInput
                          id="PostCode"
                          label="PostCode"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("PostCode", e)}
                          value={this.state.Customer.PostCode}
                          error={this.state.Validations.PostCode.errorState}
                          helperText={this.state.Validations.PostCode.errorMssg}
                        />
                        <DropdownInput
                          id="CountryID"
                          label="Country"
                          onChange={(e) => this.updateFormValue("CountryID", e)}
                          value={this.state.Customer.CountryID}
                          options={this.state.countryData}
                          isMandatory={true}
                        />
                        <DropdownInput
                          id="StateID"
                          label="State"
                          onChange={(e) => this.updateFormValue("StateID", e)}
                          value={this.state.Customer.StateID}
                          options={this.state.stateData}
                        />

                        <TextboxInput
                          id="ContactPerson"
                          label="ContactPerson"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            this.updateFormValue("ContactPerson", e)
                          }
                          value={this.state.Customer.ContactPerson}
                          error={
                            this.state.Validations.ContactPerson.errorState
                          }
                          helperText={
                            this.state.Validations.ContactPerson.errorMssg
                          }
                        />
                        <TextboxInput
                          id="EmailID"
                          label="EmailID"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("EmailID", e)}
                          value={this.state.Customer.EmailID}
                          error={this.state.Validations.EmailID.errorState}
                          helperText={this.state.Validations.EmailID.errorMssg}
                        />

                        <TableRow>
                          <TableCell align="left" className="no-border-table">
                            Sales Person
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={10} lg={10}>
                                <select
                                  className="dropdown-css"
                                  id="SalesPersonID"
                                  onChange={(e) =>
                                    this.updateFormValue("SalesPersonID", e)
                                  }
                                  value={this.state.Customer.SalesPersonID}
                                >
                                  <option value="-" disabled>
                                    Select
                                  </option>

                                  {this.state.SalesPersonData.map((item, i) => (
                                    <option value={parseInt(item.value)}>
                                      {item.name}
                                    </option>
                                  ))}
                                </select>
                              </Grid>
                              <Grid item xs={12} sm={12} md={2} lg={2}>
                                <button
                                  className="dropdowninputbtn"
                                  onClick={(e) => openDialog("SalesPerson")}
                                >
                                  ...
                                </button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>

                        <TableRow>
                          <TableCell align="left" className="no-border-table">
                            Customer Category
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={10} lg={10}>
                                <select
                                  className="dropdown-css"
                                  id="CustomerCategoryID"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "CustomerCategoryID",
                                      e
                                    )
                                  }
                                  value={this.state.Customer.CustomerCategoryID}
                                >
                                  <option value="-" disabled>
                                    Select
                                  </option>

                                  {this.state.CustomerCategoryData.map(
                                    (item, i) => (
                                      <option value={parseInt(item.value)}>
                                        {item.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </Grid>
                              <Grid item xs={12} sm={12} md={2} lg={2}>
                                <button
                                  className="dropdowninputbtn"
                                  onClick={(e) =>
                                    openDialog("CustomerCategory")
                                  }
                                >
                                  ...
                                </button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
           

                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="Coa Activity table"
                    >
                      <TableBody className="tableBody">
                        <TextboxInput
                          id="Website"
                          label="Website"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("Website", e)}
                          value={this.state.Customer.Website}
                          error={this.state.Validations.Website.errorState}
                          helperText={this.state.Validations.Website.errorMssg}
                        />
                        <TextboxInput
                          type="number"
                          id="PhoneNo"
                          label="PhoneNo"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("PhoneNo", e)}
                          value={this.state.Customer.PhoneNo}
                          error={this.state.Validations.PhoneNo.errorState}
                          helperText={this.state.Validations.PhoneNo.errorMssg}
                        />
                        <TextboxInput
                          id="FaxNo"
                          label="FaxNo"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("FaxNo", e)}
                          value={this.state.Customer.FaxNo}
                          error={this.state.Validations.FaxNo.errorState}
                          helperText={this.state.Validations.FaxNo.errorMssg}
                        />

                        <TextboxInput
                          id="CreditDays"
                          label="CreditDays"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            this.updateFormValue("CreditDays", e)
                          }
                          value={this.state.Customer.CreditDays}
                          error={this.state.Validations.CreditDays.errorState}
                          helperText={
                            this.state.Validations.CreditDays.errorMssg
                          }
                        />
                        <TextboxInput
                          id="CreditLimit"
                          label="CreditLimit"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            this.updateFormValue("CreditLimit", e)
                          }
                          value={this.state.Customer.CreditLimit}
                          error={this.state.Validations.CreditLimit.errorState}
                          helperText={
                            this.state.Validations.CreditLimit.errorMssg
                          }
                        />

                        <DropdownInput
                          id="CreditRating"
                          label="CreditRating"
                          onChange={(e) =>
                            this.updateFormValue("CreditRating", e)
                          }
                          value={this.state.Customer.CreditRating}
                          options={this.state.CreditRating}
                        />

                        <TextboxInput
                          id="GraceDays"
                          label="GraceDays"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("GraceDays", e)}
                          value={this.state.Customer.GraceDays}
                          error={this.state.Validations.GraceDays.errorState}
                          helperText={
                            this.state.Validations.GraceDays.errorMssg
                          }
                        />

                        <SwitchInput
                          key="IsGroupCompany"
                          id="IsGroupCompany"
                          label="IsGroupCompany"
                          param={this.state.Customer.IsGroupCompany}
                          onChange={(e) =>
                            this.updateFormValue("IsGroupCompany", e)
                          }
                        />

                        <SwitchInput
                          key="IsBlock"
                          id="IsBlock"
                          label="IsBlock"
                          param={this.state.Customer.IsBlock}
                          onChange={(e) => this.updateFormValue("IsBlock", e)}
                        />
                        <SwitchInput
                          key="IsEmailAlert"
                          id="IsEmailAlert"
                          label="IsEmailAlert"
                          param={this.state.Customer.IsEmailAlert}
                          onChange={(e) =>
                            this.updateFormValue("IsEmailAlert", e)
                          }
                        />
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );

    const invform = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="Inv Activity table"
                    >
                      <TableBody className="tableBody">
                        <DropdownInput
                          id="CurrID"
                          label="CurrID"
                          onChange={(e) => this.updateFormValue("CurrID", e)}
                          value={this.state.Customer.CurrID}
                          options={this.state.currencyList}
                          isMandatory={true}
                        />
                        <SwitchInput
                          key="IsGrowthBonanza"
                          id="IsGrowthBonanza"
                          label="IsGrowthBonanza"
                          param={this.state.Customer.IsGrowthBonanza}
                          onChange={(e) =>
                            this.updateFormValue("IsGrowthBonanza", e)
                          }
                        />
                        <SwitchInput
                          key="IsSlabDiscount"
                          id="IsSlabDiscount"
                          label="IsSlabDiscount"
                          param={this.state.Customer.IsSlabDiscount}
                          onChange={(e) =>
                            this.updateFormValue("IsSlabDiscount", e)
                          }
                        />
                        <SwitchInput
                          key="IsCarriage"
                          id="IsCarriage"
                          label="IsCarriage"
                          param={this.state.Customer.IsCarriage}
                          onChange={(e) =>
                            this.updateFormValue("IsCarriage", e)
                          }
                        />
                        <SwitchInput
                          key="IsDueEndOfMonth"
                          id="IsDueEndOfMonth"
                          label="IsDueEndOfMonth"
                          param={this.state.Customer.IsDueEndOfMonth}
                          onChange={(e) =>
                            this.updateFormValue("IsDueEndOfMonth", e)
                          }
                        />
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="Coa Activity table"
                    >
                      <TableBody className="tableBody">
                        <SwitchInput
                          key="IsBankCharge"
                          id="IsBankCharge"
                          label="IsBankCharge"
                          param={this.state.Customer.IsBankCharge}
                          onChange={(e) =>
                            this.updateFormValue("IsBankCharge", e)
                          }
                        />
                        <TextboxInput
                          id="BankCharge"
                          label="BankCharge"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            this.updateFormValue("BankCharge", e)
                          }
                          value={this.state.Customer.BankCharge}
                          error={this.state.Validations.BankCharge.errorState}
                          helperText={
                            this.state.Validations.BankCharge.errorMssg
                          }
                        />

                        <DropdownInput
                          id="GeneralPostingGroupID"
                          label="GeneralPostingGroupID"
                          onChange={(e) =>
                            this.updateFormValue("GeneralPostingGroupID", e)
                          }
                          value={this.state.Customer.GeneralPostingGroupID}
                          options={this.state.GeneralPostingGroupList}
                          isMandatory={true}
                        />
                        <DropdownInput
                          id="CustomerPostingGroupID"
                          label="CustomerPostingGroupID"
                          onChange={(e) =>
                            this.updateFormValue("CustomerPostingGroupID", e)
                          }
                          value={this.state.Customer.CustomerPostingGroupID}
                          options={this.state.CustomerPostingGroupList}
                          isMandatory={true}
                        />

                        <TableRow>
                          <TableCell align="left" className="no-border-table">
                            Payment Term
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={10} lg={10}>
                                <select
                                  className="dropdown-css"
                                  id="PaymentTermID"
                                  onChange={(e) =>
                                    this.updateFormValue("PaymentTermID", e)
                                  }
                                  value={this.state.Customer.PaymentTermID}
                                >
                                  <option value="-" disabled>
                                    Select
                                  </option>

                                  {this.state.paymentTermsData.map(
                                    (item, i) => (
                                      <option value={parseInt(item.value)}>
                                        {item.name}
                                      </option>
                                    )
                                  )}
                                </select>
                              </Grid>
                              <Grid item xs={12} sm={12} md={2} lg={2}>
                                <button
                                  className="dropdowninputbtn"
                                  onClick={(e) => openDialog("PaymentTerms")}
                                >
                                  ...
                                </button>
                              </Grid>
                            </Grid>
                          </TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );

    const taxinfoform = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="Taxinfo Activity table"
                    >
                      <TableBody className="tableBody">
                        <SwitchInput
                          key="IsTaxExempt"
                          id="IsTaxExempt"
                          label="IsTaxExempt"
                          param={this.state.Customer.IsTaxExempt}
                          onChange={(e) =>
                            this.updateFormValue("IsTaxExempt", e)
                          }
                        />
                        <TextboxInput
                          id="Reason"
                          label="Reason"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("Reason", e)}
                          value={this.state.Customer.Reason}
                          error={this.state.Validations.Reason.errorState}
                          helperText={this.state.Validations.Reason.errorMssg}
                        />

                        <SwitchInput
                          key="IsEcommerce"
                          id="IsEcommerce"
                          label="IsEcommerce"
                          param={this.state.Customer.IsEcommerce}
                          onChange={(e) =>
                            this.updateFormValue("IsEcommerce", e)
                          }
                        />
                        <TextboxInput
                          id="EcommerceGSTNo"
                          label="EcommerceGSTNo"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            this.updateFormValue("EcommerceGSTNo", e)
                          }
                          value={this.state.Customer.EcommerceGSTNo}
                          error={
                            this.state.Validations.EcommerceGSTNo.errorState
                          }
                          helperText={
                            this.state.Validations.EcommerceGSTNo.errorMssg
                          }
                        />

                        <SwitchInput
                          key="EcommerceB2B"
                          id="EcommerceB2B"
                          label="EcommerceB2B"
                          param={this.state.Customer.EcommerceB2B}
                          onChange={(e) =>
                            this.updateFormValue("EcommerceB2B", e)
                          }
                        />

                        <DropdownInput
                          id="EcommerceNoSeries"
                          label="EcommerceNoSeries"
                          onChange={(e) =>
                            this.updateFormValue("EcommerceNoSeries", e)
                          }
                          value={this.state.Customer.EcommerceNoSeries}
                          options={[]}
                        />
                        <DropdownInput
                          id="GSTCutomerType"
                          label="GSTCutomerType"
                          onChange={(e) =>
                            this.updateFormValue("GSTCutomerType", e)
                          }
                          value={this.state.Customer.GSTCutomerType}
                          options={this.state.GSTCutomerType}
                        />
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="Coa Activity table"
                    >
                      <TableBody className="tableBody">
                        <TextboxInput
                          id="GSTNo"
                          label="GST No"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("GSTNo", e)}
                          value={this.state.Customer.GSTNo}
                          error={this.state.Validations.GSTNo.errorState}
                          helperText={this.state.Validations.GSTNo.errorMssg}
                        />
                        <TextboxInput
                          id="PANNo"
                          label="PAN No"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("PANNo", e)}
                          value={this.state.Customer.PANNo}
                          error={this.state.Validations.PANNo.errorState}
                          helperText={this.state.Validations.PANNo.errorMssg}
                        />
                        <DropdownInput
                          id="IncoID"
                          label="IncoID"
                          onChange={(e) => this.updateFormValue("IncoID", e)}
                          value={this.state.Customer.IncoID}
                          options={[]}
                        />
                        <TextboxInput
                          id="VATNo"
                          label="VATNo"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("VATNo", e)}
                          value={this.state.Customer.VATNo}
                          error={this.state.Validations.VATNo.errorState}
                          helperText={this.state.Validations.VATNo.errorMssg}
                        />

                        <TextboxInput
                          id="EORINo"
                          label="EORINo"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("EORINo", e)}
                          value={this.state.Customer.EORINo}
                          error={this.state.Validations.EORINo.errorState}
                          helperText={this.state.Validations.EORINo.errorMssg}
                        />
                        <TextboxInput
                          id="TSSNo"
                          label="TSSNo"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("TSSNo", e)}
                          value={this.state.Customer.TSSNo}
                          error={this.state.Validations.TSSNo.errorState}
                          helperText={this.state.Validations.TSSNo.errorMssg}
                        />
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );

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

    const tab1Html = (
      <Fragment>
        <div className="sidenav-fixedheight-scroll">
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ marginTop: 5, marginLeft: 15 }}>
                <h4 style={{ color: "#000000" }}>Customer Sales history</h4>
              </div>
              <TableContainer>
                <Table
                  stickyHeader
                  size="small"
                  className="accordion-table"
                  aria-label="table"
                >
                  <TableBody className="tableBody">
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Customer No
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        123456
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ height: 20 }}></div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <div key="paymentPendingLink" to="#" className="card-link">
                    <Card className="dash-activity-card2" raised={false}>
                      <CardContent>
                        <Typography
                          color="textSecondary"
                          style={{ fontSize: 12, color: "#fff" }}
                          noWrap={false}
                          gutterBottom
                        >
                          Ongoing Sales
                        </Typography>
                        <Typography>000</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <div key="paymentPendingLink" to="#" className="card-link">
                    <Card className="dash-activity-card2" raised={false}>
                      <CardContent>
                        <Typography
                          color="textSecondary"
                          style={{ fontSize: 12, color: "#fff" }}
                          noWrap={false}
                          gutterBottom
                        >
                          Total Sales &nbsp;&nbsp;&nbsp;
                        </Typography>
                        <Typography>0,000</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <div key="paymentPendingLink" to="#" className="card-link">
                    <Card className="dash-activity-card2" raised={false}>
                      <CardContent>
                        <Typography
                          color="textSecondary"
                          style={{ fontSize: 12, color: "#fff" }}
                          noWrap={false}
                          gutterBottom
                        >
                          PO Raised &nbsp;&nbsp;&nbsp;
                        </Typography>
                        <Typography>0,000</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ height: 40 }}></div>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ marginLeft: 30, marginRight: 20 }}>
                <Divider />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ height: 20 }}></div>
            </Grid>
          </Grid>

          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={10}
              lg={10}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ marginTop: 5, marginLeft: 15 }}>
                <h4 style={{ color: "#000000" }}>Statistics</h4>
              </div>
              <TableContainer>
                <Table
                  stickyHeader
                  size="small"
                  className="accordion-table"
                  aria-label="table"
                >
                  <TableBody className="tableBody">
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
                        <span className="inside-table-cell-bold">Sales</span>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="no-border-table"
                      ></TableCell>
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
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
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
                        <span className="inside-table-cell-bold">Payments</span>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="no-border-table"
                      ></TableCell>
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
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
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
                  </TableBody>
                </Table>
              </TableContainer>
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
            md={12}
            lg={12}
            style={{ backgroundColor: "#fff" }}
          >
            <Dualtabcomponent
              tab1name="Details"
              tab2name="Attachments"
              tab1Html={tab1Html}
              tab2Html={null}
            />
          </Grid>
        </Grid>
      </Fragment>
    );

    const Address = <Addresses CustID={this.state.CustID} />;

    const contact = <Contact CustID={this.state.CustID} />;

    const customerCategory = <CustomerCategory CustID={this.state.CustID} />;

    const paymentTerms = <PaymentTerms CustID={this.state.CustID} />;

    const salesPerson = <SalesPerson CustID={this.state.CustID} />;

    const openDialog = (param) => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = true;
      Dialog.DialogTitle = param;

      switch (param) {
        case "Address":
          Dialog.DialogContent = Address;
          this.setState({ Dialog: Dialog });
          break;
        case "Contact":
          Dialog.DialogContent = contact;
          this.setState({ Dialog: Dialog });
          break;
        case "CustomerCategory":
          Dialog.DialogContent = customerCategory;
          this.setState({ Dialog: Dialog });
          break;
        case "PaymentTerms":
          Dialog.DialogContent = paymentTerms;
          this.setState({ Dialog: Dialog });
          break;
        case "SalesPerson":
          Dialog.DialogContent = salesPerson;
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
      this.refreshDropdownList();
       
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
                  masterHref={URLS.URLS.customerMaster + this.state.urlparams}
                  masterLinkTitle="Customer Master"
                  typoTitle={this.state.typoTitle}
                  level={2}
                />
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={7} lg={7}>
              <div className="btn-area-div-row">
                <div style={{ marginLeft: 10, marginTop: 1 }}>
                  <ButtonGroup
                    size="small"
                    variant="text"
                    aria-label="Action Menu Button group"
                  >
                    {this.state.type === "add" ? (
                      <Button
                        className="action-btns"
                        onClick={(e) => AddNew(e)}
                        disabled={this.state.DisableCreatebtn}
                      >
                        {APIURLS.buttonTitle.add}
                      </Button>
                    ) : null}
                    {this.state.type === "edit" ? (
                      <div>
                        <Button
                          className="action-btns"
                          onClick={(e) => updateCustomer(e)}
                          disabled={this.state.DisableUpdatebtn}
                        >
                          {APIURLS.buttonTitle.update}
                        </Button>
                        <Button
                          className="action-btns"
                          onClick={(e) => openDialog("Address")}
                        >
                          Address
                        </Button>
                        <Button
                          className="action-btns"
                          onClick={(e) => openDialog("Contact")}
                        >
                          Contact
                        </Button>
                        <Button
                          className="action-btns"
                          onClick={(e) => openDialog("Contact")}
                        >
                          Branch Mapping
                        </Button>
                      </div>
                    ) : null}
                  </ButtonGroup>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="breadcrumb-bottom"></div>
        <div className="breadcrumb-bottom"></div>
        <Grid className="table-adjust" container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Accordioncomponent
              accordionKey="a-1"
              expanded={this.state.accordion1}
              onClick={(e) => handleAccordionClick("accordion1", e)}
              id="accordion1"
              typographyKey="GD-Activity"
              typography="General Details"
              accordiondetailsKey="accordion1"
              html={generalform}
            />
            <Accordioncomponent
              accordionKey="a-2"
              expanded={this.state.accordion2}
              onClick={(e) => handleAccordionClick("accordion2", e)}
              id="accordion2"
              typographyKey="Inv-Activity"
              typography="Invoicing"
              accordiondetailsKey="accordion2"
              html={invform}
            />
            <Accordioncomponent
              accordionKey="a-3"
              expanded={this.state.accordion3}
              onClick={(e) => handleAccordionClick("accordion3", e)}
              id="accordion3"
              typographyKey="TaxInf-Activity"
              typography="Tax Information"
              accordiondetailsKey="accordion3"
              html={taxinfoform}
            />
            <div style={{ height: 50 }}></div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={11} lg={11}>
                <div style={{ marginLeft: 10 }}>{sideDataNavigation}</div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {dialog}
      </Fragment>
    );
  }
}
export default customeractivity;
