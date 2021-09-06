import React, { Fragment } from 'react';
import '../../user/dasboard.css';
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
import Nav from "../../user/nav";
import Drawer from "../../user/drawer";
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import TextField from '@material-ui/core/TextField';
 
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
 
import TableRow from '@material-ui/core/TableRow';
 
import AddIcon from '@material-ui/icons/Add';

import axios from "axios";

class addnewcompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            companyName: "",
            address: "",
            address2: "",
            address3: "",
            country: 0,
            state: 0,
            city: "",
            postcode: "",
            phoneno: "",
            website: "",
            createBtnDisabled: true,
            GeneralDetailsExpanded: true,
            AddressDetailsExpanded: true
        };
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
        });
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                display: 'flex',
            },
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
            },
        }));


        const updateFormValue = (id, e) => {
            console.log("updateFormValue > id > ", id);
            console.log("updateFormValue > e.target.value > ", e.target.value);

            if (id === "companyName") this.setState({ companyName: e.target.value });
            if (id === "Address") this.setState({ address: e.target.value });
            if (id === "Address2") this.setState({ address2: e.target.value });
            if (id === "Address3") this.setState({ address3: e.target.value });
            if (id === "country") this.setState({ country: e.target.value });
            if (id === "state") this.setState({ state: e.target.value });
            if (id === "City") this.setState({ city: e.target.value });
            if (id === "Postcode") this.setState({ postcode: e.target.value });
            if (id === "PhoneNo") this.setState({ phoneno: e.target.value });
            if (id === "Website") this.setState({ website: e.target.value });
            processEnableCreateBtn();
        }

        const processEnableCreateBtn = () => {
            if (this.state.companyName !== "" &&
                this.state.address !== "" &&
                this.state.address2 !== "" &&
                this.state.address3 !== "" &&
                this.state.country !== "" &&
                this.state.state !== "" &&
                this.state.city !== "" &&
                this.state.postcode !== "" &&
                this.state.phoneno !== "" &&
                this.state.website !== ""
            ) {
                this.setState({ createBtnDisabled: false });
            } else {
                this.setState({ createBtnDisabled: true });
            }
        }

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


        const handleCreateCompanyClick = (e) => {
            /*
                        let companyName = this.state.companyName;
                        let address = this.state.address;
                        let address2 = this.state.address2;
                        let address3 = this.state.address3;
                        let country = this.state.country;
                        let state = this.state.state;
                        let city = this.state.city;
                        let postcode = this.state.postcode;
                        let phoneno = this.state.phoneno;
                        let website = this.state.website;
            */

            let ValidUser = APIURLS.ValidUser;
            let company = APIURLS.company;

            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            company.CompanyID = 0;
            company.CompanyName = this.state.companyName;
            company.Address = this.state.address;
            company.Address2 = this.state.address2;
            company.Address3 = this.state.address3;
            company.City = this.state.city;
            company.Postcode = this.state.postcode;
            company.CountryID = this.state.country;
            company.StateID = this.state.state;
            company.PhoneNo = this.state.phoneno;
            company.Website = this.state.website;

            let chkFields = true;
            if (chkFields === false) { } else {
                const data = {
                    validUser: ValidUser,
                    company: company
                };
                const headers = {
                    "Content-Type": "application/json"
                };
                let addNewCompanyUrl = APIURLS.APIURL.addNewCompany;
                console.log("In handleCreateCompanyClick > addNewCompanyUrl > ", addNewCompanyUrl);
                console.log("In handleCreateCompanyClick > data > ", data);

                axios.post(addNewCompanyUrl, data, { headers })
                    .then(response => {
                        console.log("response > ", response);
                        if (response.status === 200) {

                        } else {


                        }
                    }
                    ).catch(error => {

                    });
            }
        };


        return (
            <Fragment>
                <Nav />
                <Drawer />
                <main className={useStyles.content}>
                    <Toolbar />
                    <div style={{ marginLeft: 250 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                        Dashboard
                                    </Link>
                                    <Link color="inherit" href={URLS.URLS.companyMaster + this.state.urlparams}>
                                        Company master
                                    </Link>
                                    <Typography color="textPrimary">Add New Company</Typography>
                                </Breadcrumbs>

                            </Grid>
                        </Grid>

                        <div style={{ height: 15 }}></div>

                        <div>
                            <Grid container spacing={0}>
                                <Grid xs={1}>
                                    <Button
                                        style={{ marginLeft: 5 }}
                                        startIcon={<AddIcon />}
                                        onClick={handleCreateCompanyClick}
                                        disabled={this.state.createBtnDisabled}
                                    >
                                        Create
                                    </Button>
                                </Grid>
                            </Grid>
                        </div>
                        <div style={{ height: 5 }}></div>

                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <div style={{ minHeight: '100%', height: 500, overflowY: 'scroll', overflowX: 'hidden' }}>
                                    <Grid container spacing={2}>
                                        <Grid item xs={12}>
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
                                                    <TableContainer>
                                                        <Table stickyHeader size="small" className="" aria-label="company List table">
                                                            <TableBody className="tableBody">
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Company Name</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="companyName"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('companyName', e)}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss"
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b> Phone No</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="PhoneNo"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('PhoneNo', e)}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss"
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Website</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="Website"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('Website', e)}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss"
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>

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
                                                    <Typography key="" className="accordion-Header-Title">Address Details</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails key="">
                                                    <TableContainer>
                                                        <Table stickyHeader size="small" className="" aria-label="company List table">
                                                            <TableBody className="tableBody">
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Country</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <Select
                                                                            style={{ height: 40, marginTop: 14 }}
                                                                            variant="outlined"
                                                                            id="countrySelect"
                                                                            label="Country"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss"
                                                                            }}
                                                                        >
                                                                            <MenuItem value="-">
                                                                                <em>None</em>
                                                                            </MenuItem>
                                                                            <MenuItem value={10}>India</MenuItem>
                                                                            <MenuItem value={20}>UK</MenuItem>
                                                                            <MenuItem value={30}>UAE</MenuItem>
                                                                        </Select>
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>State</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <Select
                                                                            style={{ height: 40, marginTop: 14 }}
                                                                            variant="outlined"
                                                                            id="stateSelect"
                                                                            label="State"
                                                                            fullWidth
                                                                            SelectProps={{
                                                                                className: "textFieldCss"
                                                                            }}

                                                                        >
                                                                            <MenuItem value="-">
                                                                                <em>None</em>
                                                                            </MenuItem>
                                                                            <MenuItem value={10}>Goa</MenuItem>
                                                                            <MenuItem value={20}>Gujrat</MenuItem>
                                                                            <MenuItem value={30}>Delhi</MenuItem>
                                                                        </Select>
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
                                                                                className: "textFieldCss"
                                                                            }}
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
                                                                                className: "textFieldCss"
                                                                            }}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Address</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="Address"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('Address', e)}
                                                                            fullWidth
                                                                            multiline
                                                                            rows={4}

                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Address 2</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="Address2"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('Address2', e)}
                                                                            fullWidth
                                                                            multiline
                                                                            rows={4}

                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Address 3</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="Address3"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('Address3', e)}
                                                                            fullWidth
                                                                            multiline
                                                                            rows={4}

                                                                        />
                                                                    </TableCell>
                                                                </TableRow>

                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </AccordionDetails>

                                            </Accordion>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                            <Grid item xs={4}>

                            </Grid>
                        </Grid>

                    </div>
                </main>
            </Fragment>
        );
    }


}
export default addnewcompany;