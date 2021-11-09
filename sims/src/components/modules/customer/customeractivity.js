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


class customeractivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            accordion1: true,
            type: "",
            ProgressLoader: false,
            ErrorPrompt: false,
            SuccessPrompt: false,            
            DisableCreatebtn:true,
            DisableUpdatebtn:true,
            initialCss: "",
            urlparams: "",
            editurl: "",
            typoTitle: "",
            type: "",
            CustID: 0,
            Customer: {
                CustID:0, 
                Code:"", 
                Name :"",
                Address :"",
                Address2 :"",
                Address3 :"",
                City:"", 
                PostCode :"",
                CountryID :0,
                StateID :0,
                Website :"",
                PhoneNo :"", 
                FaxNo  :"",
                IsGroupCompany:false, 
                CreditDays :0,
                CreditLimit :0,
                PaymentTermID :0,
                CreditRating :0,
                GraceDays :0,
                CurrID :0,
                IsGrowthBonanza :false, 
                IsSlabDiscount :false, 
                IsCarriage :false, 
                IsDueEndOfMonth :false, 
                IsBankCharge :false, 
                BankCharge:0, 
                IsBlock :false, 
                IsEmailAlert :false, 
                SalesPersonID :0,
                CustomerCategoryID :0,
                GeneralPostingGroupID :0,
                CustomerPostingGroupID :0,
                IsTaxExempt :false, 
                Reason:"", 
                IsEcommerce :false, 
                EcommerceGSTNo :"",
                EcommerceB2B:false,  
                EcommerceNoSeries :0,
                GSTCutomerType :0,
                GSTNo :"", 
                PANNo :"", 
                IncoID :0,
                VATNo :"", 
                EORINo :"", 
                TSSNo :"", 
                ContactPerson :"",
                EmailID :"", 
                UserID :0,
                ModifyDate:null, 
                BranchID:0,
            }
        }
    }
    componentDidMount() {

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

        this.setState({ urlparams: urlparams });
    }


    getCustomerDetails = (Customer) => {

    }



    render() {

        const handleAccordionClick = (val, e) => {
            if (val === "accordion1") {
                this.state.accordion1 === true
                    ? this.setState({ accordion1: false })
                    : this.setState({ accordion1: true });
            }
        };


        const updateFormValue = (param, e) => {

        }

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


        const form = (
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
                                            aria-label="Coa Activity table"
                                        >
                                             <TableBody className="tableBody">
                                                <TextboxInput
                                                    id="Code"
                                                    label="Code"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Code", e)}
                                                    value={this.state.Customer.Code}                                                    
                                                />
                                                <TextboxInput
                                                    id="Name"
                                                    label="Name"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Name", e)}
                                                    value={this.state.Customer.Name}                                                    
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
                                                    id="CountryID"
                                                    label="Country"
                                                    onChange={(e) => updateFormValue("CountryID", e)}
                                                    value={this.state.Customer.CountryID}
                                                    options={[]}
                                                />
                                                 <DropdownInput
                                                    id="StateID"
                                                    label="State"
                                                    onChange={(e) => updateFormValue("StateID", e)}
                                                    value={this.state.Customer.StateID}
                                                    options={[]}
                                                />

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
                                            // onClick={(e) => createCoa(e)}
                                            disabled={this.state.DisableCreatebtn} 
                                        >
                                            Create
                                        </Button>
                                    ) : null}
                                    {this.state.type === "edit" ? (
                                        <Button
                                            className="action-btns"
                                            // onClick={(e) => updateCoa(e)}
                                            disabled={this.state.DisableUpdatebtn}
                                        >
                                            Update
                                        </Button>
                                    ) : null}

                                </ButtonGroup>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="breadcrumb-bottom"></div>
                <Grid className="table-adjust" container spacing={0}>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <Accordioncomponent
                            accordionKey="a-7"
                            expanded={this.state.accordion1}
                            onClick={(e) => handleAccordionClick("accordion1", e)}
                            id="accordion1"
                            typographyKey="Coa-Activity"
                            typography="General Details"
                            accordiondetailsKey="accordion1"
                            html={form}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={11} lg={11}>
                                <div style={{marginLeft:10}}>
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

