import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as CF from "../../../services/functions/customfunctions";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
 
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";


import Breadcrumb from "../../compo/breadcrumb";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Accordioncomponent from "../../compo/accordioncomponent";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import TextboxInput from "../../compo/tablerowcelltextboxinput";
import SwitchInput from "../../compo/tablerowcellswitchinput";

let today = moment().format("MM/DD/YYYY");

class coaactivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProgressLoader: false,
            ErrorPrompt: false,
            SuccessPrompt: false,
            accordion1: true,
            urlparams: "",
            type: "",
            typoTitle: "",
            branchData: [],
            ACSubCategory: [],
            ChartOfAccount: {
                CAcID: 0,
                BranchID: "-",
                ACNo: "",
                Name: "",
                ACType: "-",
                IncomeBalance:  "-",
                ACCategory: "-",
                ACSubCategory:  "-",
                DebitCredit:  "-",
                IsBlock: false,
                DirectPosting: false,
                Indentation: 0,
                Totaling: "",
                ModifyDate: today,
                UserID: parseInt(getCookie(COOKIE.USERID)),
            }
        }
    }

    goToCoaMaster=()=>{
        window.location =URLS.URLS.coa + this.state.urlparams;
    }

    urlprocess = () => {
        let urlparams = "";
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let type = url.searchParams.get("type");
        let typoTitle = "";
        type === "add" ? typoTitle = "Add" : typoTitle = "Edit";
        urlparams =
            "?branchId=" +
            branchId +
            "&compName=" +
            compName +
            "&branchName=" +
            branchName;

        this.setState({
            urlparams: urlparams,
            type: type,
            typoTitle: typoTitle,
            ProgressLoader: type === "add" ? true : false
        });
    }

    componentDidMount() {
        this.urlprocess();
        this.getBranches();
        this.getACSubCategory(this.state.ChartOfAccount.ACCategory);
    }

    getBranches = () => {
        this.setState({ProgressLoader: false });
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
                let pData = [];
                for (let i = 0; i < response.data.length; i++) {
                    let d = {
                        name: response.data[i]['name'],
                        value: response.data[i]['branchId']
                    };
                    pData.push(d);
                }
                this.setState({ branchData: pData, ProgressLoader: true });
            })
            .catch((error) => {
                this.setState({ branchData: [], ProgressLoader: true });
            });
    }

    getACSubCategory = (ACCategory) => {
        console.log("getACSubCategory > ACCategory > ", ACCategory);
        ACCategory = parseInt(ACCategory);
        let responseData = [];
        if (responseData.length > 0) {
            this.setState({ ACSubCategory: [] });
        } else {
            this.setSelfDefault(ACCategory);
        }



    }

    setSelfDefault(val) {
        let ACSubCategory = [];
        let ACCategory = APIURLS.ACCategory;
        for (let i = 0; i < ACCategory.length; i++) {
            let o = {};
            if (ACCategory[i].value === val) {
                o = ACCategory[i];
                ACSubCategory.push(o);
            }
        }
        this.setState({ ACSubCategory: ACSubCategory });
    }

    render() {

        const createCoa = (e) => {
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const headers = {
                "Content-Type": "application/json",
            };
            let Url = APIURLS.APIURL.CreateChartOfAccount;

            let reqData = {
                ValidUser: ValidUser,
                ChartOfAccount: this.state.ChartOfAccount
            };
            console.log("createCoa > reqData >", reqData);
            
            axios
                .post(Url, reqData, { headers })
                .then((response) => {
                    let data = response.data;
                    if (response.status === 200 || response.status === 201) {
                        this.setState({ ErrorPrompt: false, SuccessPrompt: true });
                        this.goToCoaMaster();
                    } else {
                        this.setState({ ErrorPrompt: true, SuccessPrompt: false });
                    }

                })
                .catch((error) => {
                    this.setState({ ErrorPrompt: true });
                });

        }


        const setParams = (object) => {
            this.setState({ ChartOfAccount: object });
        }

        const updateFormValue = (param, e) => {
            let COA = this.state.ChartOfAccount;
            switch (param) {
                case "BranchID":
                    COA.BranchID = CF.toInt(e.target.value);
                    setParams(COA);
                    break;
                case "ACNo":
                    COA.ACNo = e.target.value;
                    setParams(COA);
                    break;
                case "Name":
                    COA.Name = e.target.value;
                    setParams(COA);
                    break;
                case "ACType":
                    COA.ACType = CF.toInt(e.target.value);
                    setParams(COA);
                    break;
                case "IncomeBalance":
                    COA.IncomeBalance = CF.toInt(e.target.value);
                    setParams(COA);
                    break;
                case "ACCategory":
                    this.getACSubCategory(e.target.value);
                    COA.ACCategory = CF.toInt(e.target.value);
                    setParams(COA);
                    break;
                case "ACSubCategory":
                    COA.ACSubCategory = CF.toInt(e.target.value);
                    setParams(COA);
                    break;
                case "DebitCredit":
                    COA.DebitCredit = CF.toInt(e.target.value);
                    setParams(COA);
                    break;
                case "IsBlock":
                    COA.IsBlock = e.target.checked;
                    setParams(COA);
                    break;
                case "DirectPosting":
                    COA.DirectPosting = e.target.checked;
                    setParams(COA);
                    break;
                case "Indentation":
                    COA.Indentation = CF.toInt(e.target.value);
                    setParams(COA);
                    break;
                case "Totaling":
                    COA.Totaling = e.target.value;
                    setParams(COA);
                    break;
                default:
                    break;
            }
        }


        const form1 = (
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
                                                {console.log("this.state.branchData > ", this.state.branchData)}
                                                <DropdownInput
                                                    id="BranchID"
                                                    label="Branch"
                                                    onChange={(e) => updateFormValue("BranchID", e)}
                                                    value={this.state.ChartOfAccount.BranchID}
                                                    options={this.state.branchData}
                                                />
                                                <TextboxInput
                                                    id="ACNo"
                                                    label="ACNo"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("ACNo", e)}
                                                    value={this.state.ChartOfAccount.ACNo}
                                                />
                                                <TextboxInput
                                                    id="Name"
                                                    label="Name"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Name", e)}
                                                    value={this.state.ChartOfAccount.Name}
                                                />


                                                <TextboxInput
                                                    id="Indentation"
                                                    label="Indentation"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Indentation", e)}
                                                    value={this.state.ChartOfAccount.Indentation}
                                                />
                                                <TextboxInput
                                                    id="Totaling"
                                                    label="Totaling"
                                                    variant="outlined"
                                                    size="small"
                                                    onChange={(e) => updateFormValue("Totaling", e)}
                                                    value={this.state.ChartOfAccount.Totaling}
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
                                                    id="ACType"
                                                    label="ACType"
                                                    onChange={(e) => updateFormValue("ACType", e)}
                                                    value={this.state.ChartOfAccount.ACType}
                                                    options={APIURLS.ACType}
                                                />
                                                <DropdownInput
                                                    id="IncomeBalance"
                                                    label="IncomeBalance"
                                                    onChange={(e) => updateFormValue("IncomeBalance", e)}
                                                    value={this.state.ChartOfAccount.IncomeBalance}
                                                    options={APIURLS.IncomeBalance}
                                                />
                                                <DropdownInput
                                                    id="ACCategory"
                                                    label="ACCategory"
                                                    onChange={(e) => updateFormValue("ACCategory", e)}
                                                    value={this.state.ChartOfAccount.ACCategory}
                                                    options={APIURLS.ACCategory}
                                                />
                                                <DropdownInput
                                                    id="ACSubCategory"
                                                    label="ACSubCategory"
                                                    onChange={(e) => updateFormValue("ACSubCategory", e)}
                                                    value={this.state.ChartOfAccount.ACSubCategory}
                                                    options={this.state.ACSubCategory}
                                                />
                                                <DropdownInput
                                                    id="DebitCredit"
                                                    label="DebitCredit"
                                                    onChange={(e) => updateFormValue("DebitCredit", e)}
                                                    value={this.state.ChartOfAccount.DebitCredit}
                                                    options={APIURLS.DebitCredit}
                                                />
                                                <SwitchInput
                                                    key="IsBlock"
                                                    id="IsBlock"
                                                    label="IsBlock"
                                                    param={this.state.ChartOfAccount.IsBlock}
                                                    onChange={(e) =>
                                                        updateFormValue("IsBlock", e)
                                                    }
                                                />
                                                <SwitchInput
                                                    key="DirectPosting"
                                                    id="DirectPosting"
                                                    label="DirectPosting"
                                                    param={this.state.ChartOfAccount.DirectPosting}
                                                    onChange={(e) =>
                                                        updateFormValue("DirectPosting", e)
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


        const handleAccordionClick = (val, e) => {
            if (val === "accordion1") {
                this.state.accordion1 === true
                    ? this.setState({ accordion1: false })
                    : this.setState({ accordion1: true });
            }
        }

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
                                    masterHref={URLS.URLS.coa + this.state.urlparams}   
                                    masterLinkTitle="Chart of Accounts"
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
                                            onClick={(e) => createCoa(e)}
                                        >
                                            Create
                                        </Button>
                                    ) : null}
                                    {this.state.type === "edit" ? (
                                        <Button
                                            className="action-btns"


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
                            html={form1}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>

                    </Grid>
                </Grid>


            </Fragment>
        )
    }
}
export default coaactivity;