import React, { Fragment } from 'react';
import axios from "axios";
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

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Accordioncomponent from "../../compo/accordioncomponent";
import TextboxInput from "../../compo/tablerowcelltextboxinput";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import SwitchInput from "../../compo/tablerowcellswitchinput";


class customeractivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accordion1: true,
            accordion2: false,
            accordion3: false,
            type: "",
            ProgressLoader: false,
            ErrorPrompt: false,
            SuccessPrompt: false,
            DisableCreatebtn: false,
            DisableUpdatebtn: false,
            initialCss: "",
            urlparams: "",
            editurl: "",
            typoTitle: "",
            type: "",
            CreditRating: APIURLS.CreditRating,
            GSTCutomerType: APIURLS.GSTCutomerType,
            GeneralPostingGroupList:[],
            CustomerPostingGroupList:[],
            currencyList:[],
            countryData:[],
            stateData:[],
            CustID: CF.toInt(getCookie(COOKIE.USERID)),
            Customer: {
                CustID: 0,
                Code: "",
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
            }
        }
    }



    componentDidMount() {
        this.getAllGeneralPostingGroup();
        this.getAllCustomerPostingGroup();
        this.getCurrencyList();
        this.getCountryList();
        this.getStateList();
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
        });

         console.log("On load state > ",this.state);
    }

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
                    value: data[i].CustomerPostingGroupID
                };
                newD.push(o);
            }
            this.setState({ CustomerPostingGroupList: newD });
          })
          .catch((error) => { });
      };

      getStateList=()=> {
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
      }

    getCountryList=()=> {
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
      }

    getCurrencyList=()=> {
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
                    value: data[i].currId
                };
                newD.push(o);
            }
    
            this.setState({
              currencyList: newD,
              ProgressLoader: true,
            });
          })
          .catch((error) => {});
      }

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
                        value: data[i].GeneralPostingGroupID
                    };
                    newD.push(o);
                }
                this.setState({ GeneralPostingGroupList: newD });
            })
            .catch((error) => { });
    };


    getCustomerDetails = (Customer) => {
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
                if (response.status === 200 || response.status === 201 ) {
                    this.setState({Customer:data, ErrorPrompt: false, SuccessPrompt: true });
                } else {
                    this.setState({ ErrorPrompt: true, SuccessPrompt: false });
                }
            })
            .catch((error) => {
                this.setState({ ErrorPrompt: true });
            });
    }



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


        const updateFormValue = (param, e) => {
            let Customer = this.state.Customer;
            switch (param) {
                case "Code":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "Name":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "Address":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "Address2":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "Address3":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "City":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "PostCode":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "CountryID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "StateID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "Website":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "PhoneNo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "FaxNo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "IsGroupCompany":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "CreditDays":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "CreditLimit":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "PaymentTermID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "CreditRating":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "GraceDays":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "CurrID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "IsGrowthBonanza":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "IsSlabDiscount":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "IsCarriage":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "IsDueEndOfMonth":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "IsBankCharge":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "BankCharge":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "IsBlock":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "IsEmailAlert":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "SalesPersonID":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "CustomerCategoryID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "GeneralPostingGroupID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "CustomerPostingGroupID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "IsTaxExempt":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "Reason":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "IsEcommerce":
                    Customer[param] = e.target.checked;
                    setParams(Customer);
                    break;
                case "EcommerceGSTNo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "EcommerceB2B":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "EcommerceNoSeries":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "GSTCutomerType":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "GSTNo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "PANNo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "IncoID":
                    Customer[param] = CF.toInt(e.target.value);
                    setParams(Customer);
                    break;
                case "VATNo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "EORINo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "TSSNo":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "ContactPerson":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                case "EmailID":
                    Customer[param] = e.target.value;
                    setParams(Customer);
                    break;
                default:
                    break;
            }
        }

        const setParams = (object) => {
            this.setState({ Customer: object });
        };

        const openPage = (url) => {
            this.setState({ ProgressLoader: false });
            window.location = url;
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
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const headers = {
                "Content-Type": "application/json",
            };
            let Url = APIURLS.APIURL.CreateCustomer;
            let reqData = {
                ValidUser: ValidUser,
                Customer: this.state.Customer,
            };
            console.log("createCoa > reqData >", reqData);
            axios
                .post(Url, reqData, { headers })
                .then((response) => {
                    let data = response.data;                   
                    if (response.status === 200 || response.status === 201 ) {
                        this.setState({ ErrorPrompt: false, SuccessPrompt: true });
                    } else {
                        this.setState({ ErrorPrompt: true, SuccessPrompt: false });
                    }
                })
                .catch((error) => {
                    this.setState({ ErrorPrompt: true });
                });
        }

        const updateCustomer = (e) => {
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const headers = {
                "Content-Type": "application/json",
            };
            let Url = APIURLS.APIURL.UpdateCustomer;
            let reqData = {
                ValidUser: ValidUser,
                Customer: this.state.Customer,
            };
            console.log("updateCustomer > reqData >", reqData);
            axios
                .post(Url, reqData, { headers })
                .then((response) => {
                    let data = response.data;                   
                    if (response.status === 200 || response.status === 201 ) {
                        this.setState({ ErrorPrompt: false, SuccessPrompt: true });
                    } else {
                        this.setState({ ErrorPrompt: true, SuccessPrompt: false });
                    }
                })
                .catch((error) => {
                    this.setState({ ErrorPrompt: true });
                });
        }


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
                                                    id="Code"
                                                    label="Code"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Code", e)}
                                                    value={this.state.Customer.Code}
                                                    isMandatory={true}
                                                />
                                                <TextboxInput
                                                    id="Name"
                                                    label="Name"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Name", e)}
                                                    value={this.state.Customer.Name}
                                                    isMandatory={true}
                                                />
                                                <TextboxInput
                                                    id="Address"
                                                    label="Address"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Address", e)}
                                                    value={this.state.Customer.Address}
                                                />
                                                <TextboxInput
                                                    id="Address2"
                                                    label="Address2"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Address2", e)}
                                                    value={this.state.Customer.Address2}
                                                />
                                                <TextboxInput
                                                    id="Address3"
                                                    label="Address3"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Address3", e)}
                                                    value={this.state.Customer.Address3}
                                                />
                                                <TextboxInput
                                                    id="City"
                                                    label="City"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("City", e)}
                                                    value={this.state.Customer.City}
                                                />
                                                <TextboxInput
                                                    id="PostCode"
                                                    label="PostCode"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("PostCode", e)}
                                                    value={this.state.Customer.PostCode}
                                                />
                                                <DropdownInput
                                                    id="CountryID"
                                                    label="Country"
                                                    onChange={(e) => updateFormValue("CountryID", e)}
                                                    value={this.state.Customer.CountryID}
                                                    options={this.state.countryData}
                                                    isMandatory={true}
                                                />
                                                <DropdownInput
                                                    id="StateID"
                                                    label="State"
                                                    onChange={(e) => updateFormValue("StateID", e)}
                                                    value={this.state.Customer.StateID}
                                                    options={this.state.stateData}
                                                />

                                                <TextboxInput
                                                    id="ContactPerson"
                                                    label="ContactPerson"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("ContactPerson", e)}
                                                    value={this.state.Customer.ContactPerson}
                                                />
                                                <TextboxInput
                                                    id="EmailID"
                                                    label="EmailID"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("EmailID", e)}
                                                    value={this.state.Customer.EmailID}
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
                                                    id="Website"
                                                    label="Website"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Website", e)}
                                                    value={this.state.Customer.Website}
                                                />
                                                <TextboxInput
                                                    id="PhoneNo"
                                                    label="PhoneNo"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("PhoneNo", e)}
                                                    value={this.state.Customer.PhoneNo}
                                                />
                                                <TextboxInput
                                                    id="FaxNo"
                                                    label="FaxNo"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("FaxNo", e)}
                                                    value={this.state.Customer.FaxNo}
                                                />

                                                <TextboxInput
                                                    id="CreditDays"
                                                    label="CreditDays"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("CreditDays", e)}
                                                    value={this.state.Customer.CreditDays}
                                                />
                                                <TextboxInput
                                                    id="CreditLimit"
                                                    label="CreditLimit"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("CreditLimit", e)}
                                                    value={this.state.Customer.CreditLimit}
                                                />

                                                <DropdownInput
                                                    id="CreditRating"
                                                    label="CreditRating"
                                                    onChange={(e) => updateFormValue("CreditRating", e)}
                                                    value={this.state.Customer.CreditRating}
                                                    options={this.state.CreditRating}
                                                />

                                                <TextboxInput
                                                    id="GraceDays"
                                                    label="GraceDays"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("GraceDays", e)}
                                                    value={this.state.Customer.GraceDays}
                                                />


                                                <SwitchInput
                                                    key="IsGroupCompany"
                                                    id="IsGroupCompany"
                                                    label="IsGroupCompany"
                                                    param={this.state.Customer.IsGroupCompany}
                                                    onChange={(e) => updateFormValue("IsGroupCompany", e)}
                                                    
                                                />
                                                
                                                <SwitchInput
                                                    key="IsBlock"
                                                    id="IsBlock"
                                                    label="IsBlock"
                                                    param={this.state.Customer.IsBlock}
                                                    onChange={(e) => updateFormValue("IsBlock", e)}
                                                />
                                                <SwitchInput
                                                    key="IsEmailAlert"
                                                    id="IsEmailAlert"
                                                    label="IsEmailAlert"
                                                    param={this.state.Customer.IsEmailAlert}
                                                    onChange={(e) => updateFormValue("IsEmailAlert", e)}
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
                                                    onChange={(e) => updateFormValue("CurrID", e)}
                                                    value={this.state.Customer.CurrID}
                                                    options={this.state.currencyList}
                                                    isMandatory={true}
                                                />
                                                <SwitchInput
                                                    key="IsGrowthBonanza"
                                                    id="IsGrowthBonanza"
                                                    label="IsGrowthBonanza"
                                                    param={this.state.Customer.IsGrowthBonanza}
                                                    onChange={(e) => updateFormValue("IsGrowthBonanza", e)}
                                                    
                                                />
                                                <SwitchInput
                                                    key="IsSlabDiscount"
                                                    id="IsSlabDiscount"
                                                    label="IsSlabDiscount"
                                                    param={this.state.Customer.IsSlabDiscount}
                                                    onChange={(e) => updateFormValue("IsSlabDiscount", e)}
                                                />
                                                <SwitchInput
                                                    key="IsCarriage"
                                                    id="IsCarriage"
                                                    label="IsCarriage"
                                                    param={this.state.Customer.IsCarriage}
                                                    onChange={(e) => updateFormValue("IsCarriage", e)}
                                                />
                                                <SwitchInput
                                                    key="IsDueEndOfMonth"
                                                    id="IsDueEndOfMonth"
                                                    label="IsDueEndOfMonth"
                                                    param={this.state.Customer.IsDueEndOfMonth}
                                                    onChange={(e) => updateFormValue("IsDueEndOfMonth", e)}
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
                                                    onChange={(e) => updateFormValue("IsBankCharge", e)}
                                                />
                                                <TextboxInput
                                                    id="BankCharge"
                                                    label="BankCharge"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("BankCharge", e)}
                                                    value={this.state.Customer.BankCharge}
                                                />

                                                <DropdownInput
                                                    id="GeneralPostingGroupID"
                                                    label="GeneralPostingGroupID"
                                                    onChange={(e) => updateFormValue("GeneralPostingGroupID", e)}
                                                    value={this.state.Customer.GeneralPostingGroupID}
                                                    options={this.state.GeneralPostingGroupList}
                                                    isMandatory={true}
                                                />
                                                <DropdownInput
                                                    id="CustomerPostingGroupID"
                                                    label="CustomerPostingGroupID"
                                                    onChange={(e) => updateFormValue("CustomerPostingGroupID", e)}
                                                    value={this.state.Customer.CustomerPostingGroupID}
                                                    options={this.state.CustomerPostingGroupList}
                                                    isMandatory={true}
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
                                                    onChange={(e) => updateFormValue("IsTaxExempt", e)}
                                                />
                                                <TextboxInput
                                                    id="Reason"
                                                    label="Reason"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Reason", e)}
                                                    value={this.state.Customer.Reason}
                                                />

                                                <SwitchInput
                                                    key="IsEcommerce"
                                                    id="IsEcommerce"
                                                    label="IsEcommerce"
                                                    param={this.state.Customer.IsEcommerce}
                                                    onChange={(e) => updateFormValue("IsEcommerce", e)}
                                                />
                                                <TextboxInput
                                                    id="EcommerceGSTNo"
                                                    label="EcommerceGSTNo"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("EcommerceGSTNo", e)}
                                                    value={this.state.Customer.EcommerceGSTNo}
                                                />

                                                <SwitchInput
                                                    key="EcommerceB2B"
                                                    id="EcommerceB2B"
                                                    label="EcommerceB2B"
                                                    param={this.state.Customer.EcommerceB2B}
                                                    onChange={(e) => updateFormValue("EcommerceB2B", e)}
                                                />

                                                <DropdownInput
                                                    id="EcommerceNoSeries"
                                                    label="EcommerceNoSeries"
                                                    onChange={(e) => updateFormValue("EcommerceNoSeries", e)}
                                                    value={this.state.Customer.EcommerceNoSeries}
                                                    options={[]}
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
                                                <DropdownInput
                                                    id="GSTCutomerType"
                                                    label="GSTCutomerType"
                                                    onChange={(e) => updateFormValue("GSTCutomerType", e)}
                                                    value={this.state.Customer.GSTCutomerType}
                                                    options={this.state.GSTCutomerType}
                                                />
                                                <DropdownInput
                                                    id="IncoID"
                                                    label="IncoID"
                                                    onChange={(e) => updateFormValue("IncoID", e)}
                                                    value={this.state.Customer.IncoID}
                                                    options={[]}
                                                />
                                                <TextboxInput
                                                    id="VATNo"
                                                    label="VATNo"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("VATNo", e)}
                                                    value={this.state.Customer.VATNo}
                                                />

                                                <TextboxInput
                                                    id="EORINo"
                                                    label="EORINo"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("EORINo", e)}
                                                    value={this.state.Customer.EORINo}
                                                />
                                                <TextboxInput
                                                    id="TSSNo"
                                                    label="TSSNo"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("TSSNo", e)}
                                                    value={this.state.Customer.TSSNo}
                                                />
                                                <TextboxInput
                                                    id="ContactPerson"
                                                    label="ContactPerson"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("ContactPerson", e)}
                                                    value={this.state.Customer.ContactPerson}
                                                />
                                                <TextboxInput
                                                    type="email"
                                                    id="EmailID"
                                                    label="EmailID"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("EmailID", e)}
                                                    value={this.state.Customer.EmailID}
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





        return (
            <Fragment>
                <Loader ProgressLoader={this.state.ProgressLoader} />
                <ErrorSnackBar ErrorPrompt={this.state.ErrorPrompt} closeErrorPrompt={closeErrorPrompt} />
                <SuccessSnackBar SuccessPrompt={this.state.SuccessPrompt} closeSuccessPrompt={closeSuccessPrompt} />

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
                        <Grid xs={12} sm={12} md={8} lg={8}>
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
                                            Create
                                        </Button>
                                    ) : null}
                                    {this.state.type === "edit" ? (
                                        <Fragment>
                                            <Button
                                                className="action-btns"
                                                 onClick={(e) => updateCustomer(e)}
                                                disabled={this.state.DisableUpdatebtn}
                                            >
                                                Update
                                            </Button>
                                            <Button
                                                className="action-btns"                                                 
                                            >
                                                Address
                                            </Button>
                                            <Button
                                                className="action-btns"
                                            >
                                                Contact
                                            </Button>
                                            <Button
                                                className="action-btns"
                                            >
                                                Branch Mapping
                                            </Button>
                                        </Fragment>
                                    ) : null}

                                </ButtonGroup>
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
                                <div style={{ marginLeft: 10 }}>
                                    Hi
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }

}
export default customeractivity;

