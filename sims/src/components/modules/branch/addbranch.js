import React, { Fragment } from 'react';
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
import Menubar from "../../user/menubar";


class addbranch extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            ProgressLoader: false,
            urlparams: null,
            GeneralDetailsExpanded: true,
            AddressDetailsExpanded: true,
            ErrorPrompt: false,
            SuccessPrompt: false,
            disabledCreatebtn: false,
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



        };
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
            this.setState({
                urlparams: urlparams

            }, () => {
                this.getCompanyList();
                this.getStateList();
                this.getCountryList();
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





    render() {

        const handleAccordionClick = (val, e) => {
            console.log("handleAccordionClick > val > ", val);
            console.log("handleAccordionClick > e > ", e);
            if (val === "GeneralDetailsExpanded") {
                this.state.GeneralDetailsExpanded === true ? this.setState({ GeneralDetailsExpanded: false }) : this.setState({ GeneralDetailsExpanded: true })
            }
            if (val === "AddressDetailsExpanded") {
                this.state.AddressDetailsExpanded === true ? this.setState({ AddressDetailsExpanded: false }) : this.setState({ AddressDetailsExpanded: true })
            }
        }

        const ValidateName = () => {
            if (this.state.name === "" || this.state.name === null || this.state.name.length > 50) {
                this.setState({ disabledCreatebtn: true });
            } else {
                this.setState({ disabledCreatebtn: false });
            }
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
                        disabledCreatebtn: true,
                    });
                } else {
                    let v = this.state.Validations;
                    v.shortName = { errorState: false, errorMsg: "" };
                    this.setState({
                        Validations: v,
                        disabledCreatebtn: false,
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
                            disabledCreatebtn: true,
                           
                        });

                    }
                    if (e.target.value === "" || e.target.value === null) {
                        let v = this.state.Validations;
                        v.name = { errorState: true, errorMsg: "Branch name cannot be blank" };
                        this.setState({
                            Validations: v,
                            disabledCreatebtn: true,
                           
                        });

                    }
                }
                else {
                    let v = this.state.Validations;
                    v.name = { errorState: false, errorMsg: "" };
                    this.setState({
                        Validations: v,
                        disabledCreatebtn: false,
                        name: e.target.value,
                        branch: branch,
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
                        disabledCreatebtn: true,
                    })
                }
                else {
                    let v = this.state.Validations;
                    v.phoneNo = { errorState: false, errorMsg: "" }
                    this.setState({
                        Validations: v,
                        disabledCreatebtn: false,
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
                        disabledCreatebtn: true,
                    });

                } else {
                    let v = this.state.Validations;
                    v.website = { errorState: false, errorMsg: "" };   
                    this.setState({
                        Validations: v,
                        disabledCreatebtn: false,
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
                    disabledCreatebtn: true,
                  });
        
                } else {
                  let v = this.state.Validations;
                  v.city = { errorState: false, errorMsg: "" };
                  this.setState({
                    Validations: v,
                    disabledCreatebtn: false,
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
                    disabledCreatebtn: true,
                  })
                }
                else {
                  let v = this.state.Validations;
                  v.postcode = { errorState: false, errorMsg: "" }
                  this.setState({
                    Validations: v,
                    disabledCreatebtn: false,
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
                    disabledCreatebtn: true,
                  });
        
                }
                else {
                  let v = this.state.Validations;
                  v.address = { errorState: false, errorMsg: "" };
                  this.setState({
                    Validations: v,
                    disabledCreatebtn: false,
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
                    disabledCreatebtn: true,
                  });
        
                }
                else {
                  let v = this.state.Validations;
                  v.address2 = { errorState: false, errorMsg: "" };
                  this.setState({
                    Validations: v,
                    disabledCreatebtn: false,
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
                    disabledCreatebtn: true,
                  });
        
                }
                else {
                  let v = this.state.Validations;
                  v.address3 = { errorState: false, errorMsg: "" };
                  this.setState({
                    Validations: v,
                    disabledCreatebtn: false,
                    branch: branch,
                    address3: e.target.value
                  });
        
                };
                ValidateName();
              }
        }

        const handleCreate = () => {
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
            let CreateBranchUrl = APIURLS.APIURL.CreateBranch;
            axios.post(CreateBranchUrl, data, { headers })
                .then(response => {
                    console.log("response > ", response);
                    if (response.status === 200 || response.status === 201) {
                        this.setState({ ProgressLoader: true, SuccessPrompt: true });
                        this.props.history.push(URLS.URLS.branchMaster + this.state.urlparams);
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
            this.setState({ SuccessPrompt: false });
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
                <Nav />
                <Menubar />
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
                                <Typography color="textPrimary">Add Branch </Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <div className="breadcrumb-bottom"></div>
                    <Grid container spacing={3}>
                        <Grid className="style-buttons" xs={1}>
                            <Button
                                style={{ marginLeft: 5 }}
                                onClick={handleCreate}
                                disabled={this.state.disabledCreatebtn}
                            >
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                    <div className="New-link-bottom"></div>
                    <Grid className="table-adjust" container spacing={0}>
                        <Grid xs={12} sm={12} md={9} lg={9}>
                            <Grid container spacing={0}>
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

                                            <Grid container spacing={0}>
                                                <Grid xs={12} sm={12} md={6} lg={6}>
                                                    <TableContainer>
                                                        <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                                                            <TableBody className="tableBody">
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Company</b>
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
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Branch Name </b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="Name"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            maxlength={10}
                                                                            onChange={(e) => updateFormValue('Name', e)}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss",

                                                                            }}

                                                                             value={this.state.name}
                                                                            error={this.state.Validations.name.errorState}
                                                                            helperText={this.state.Validations.name.errorMsg}

                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Short Name </b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="shortName"
                                                                            variant="outlined"
                                                                            size="small"

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
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Phone No</b>
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
                                                                        <b>Website</b>
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
                                                                        <b>Country</b>
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
                                                                        <b>State</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <select
                                                                            style={{ height: 40, marginTop: 14 }}
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
                                                                        <b>City</b>
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
                                                                        <b>Postcode</b>
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
                                                                        <b>Address Line 1</b>
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
                                                                            value={this.state.address}
                                                                            error={this.state.Validations.address.errorState}
                                                                            helperText={this.state.Validations.address.errorMsg}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Address Line 2</b>
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
                                                                            value={this.state.address2}
                                                                            error={this.state.Validations.address2.errorState}
                                                                            helperText={this.state.Validations.address2.errorMsg}

                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Address Line 3</b>
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
                                                                            value={this.state.address3}
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
                                    <Accordion key="company-Address-Details" expanded={this.state.AddressDetailsExpanded} >
                                        <AccordionSummary
                                            className="accordion-Header-Design"
                                            expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("AddressDetailsExpanded", e)} />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                            style={{ minHeight: 20, height: '100%' }}
                                        >
                                            <Typography key="" className="accordion-Header-Title">Taxation Details</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails key="">
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
export default addbranch;