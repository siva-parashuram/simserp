import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Destination from "./destination";

import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

class adddestination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            GeneralDetailsExpanded: true,
            ProgressLoader: true,
            destinations: [],
            ErrorPrompt: false,
            SuccessPrompt: false,
            countryData: [],
            stateData: [],
            destinationName:null,            
            postcode:null,
            stateId:0,
            countryId:0

        }
    }

    componentDidMount() {
        this.getAllDestinations();
        this.getCountryList();
        this.getStateList();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
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

    getAllDestinations = () => {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);




        const headers = {
            "Content-Type": "application/json"
        };
        let GetDestinationsUrl = APIURLS.APIURL.GetDestinations;

        axios.post(GetDestinationsUrl, ValidUser, { headers })
            .then(response => {
                let data = response.data;
                console.log("getStateList > response > data > ", data);
                this.setState({ destinations: data, ProgressLoader: true });
            }
            ).catch(error => {
                console.log("error > ", error);
            });
    }

    render() {

        const handleAccordionClick = (val, e) => {

            if (val === "GeneralDetailsExpanded") {
                this.state.GeneralDetailsExpanded === true ? this.setState({ GeneralDetailsExpanded: false }) : this.setState({ GeneralDetailsExpanded: true })
            }
            if (val === "AddressDetailsExpanded") {
                this.state.AddressDetailsExpanded === true ? this.setState({ AddressDetailsExpanded: false }) : this.setState({ AddressDetailsExpanded: true })
            }
        }

        const updateFormValue = (id, e) => {
            if (id === "Name") {
                this.setState({
                    destinationName: e.target.value
                });
            }
            if (id === "PostCode") {
                this.setState({
                    postcode: e.target.value
                });
            }
            if (id === "CountryID") {
                this.setState({
                    countryId: e.target.value
                });
            }
            if (id === "stateID") {
                this.setState({
                    stateId: e.target.value
                });
            }

            console.log("updated > ",this.state);


            
        }

        
        const addDestination = () => {
            console.log("Starting addDestination");
            this.setState({ ProgressLoader: false });
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);

            let data = {
                Destination: {
                    DestinationId: 0,
                    CountryId: parseInt(this.state.countryId),
                    DestinationName: this.state.destinationName,
                    stateId:parseInt(this.state.stateId),
                    Postcode: this.state.postcode
                },
                validUser: ValidUser
            };
            console.log("state > ",this.state);
            console.log("data > ",data);
        
            const headers = {
                "Content-Type": "application/json"
            };
            let CreateDestinationUrl = APIURLS.APIURL.CreateDestination;

           

            axios.post(CreateDestinationUrl, data, { headers })
                .then(response => {
                    let data = response.data;
                    console.log("updateDestination > response > data > ", data);
                    if (response.status === 200|| response.status === 201) {
                        this.setState({ ProgressLoader: true, SuccessPrompt: true });
                        this.getAllDestinations();
                    } else {
                        this.setState({ ProgressLoader: true, ErrorPrompt: true });
                        this.getAllDestinations();
                    }

                }
                ).catch(error => {
                    console.log("error > ", error);
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
                <div style={{ marginLeft: 10, marginTop: 10 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                                    Back
                                </Link>
                                <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                    Dashboard
                                </Link>
                                <Typography color="textPrimary">Add Destination</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 10 }}
                                startIcon={<AddIcon />}
                                onClick={addDestination}
                            >
                                Create
                            </Button>

                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>

                    <div style={{ marginLeft: 10 }}>
                        <Grid container spacing={1}>
                            <Grid xs={12} sm={12} md={7} lg={7}>
                            <Grid container spacing={0}>
                                    <Grid xs={12} sm={12} md={9} lg={9}>
                                    <Accordion key="country-General-Details" expanded={this.state.GeneralDetailsExpanded} >
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
                                            <Grid xs={12} sm={12} md={12} lg={12}>
                                                <Table stickyHeader size="small" className="accordion-table" aria-label="destination add table">
                                                    <TableBody className="tableBody">
                                                        <TableRow>
                                                            <TableCell align="left" className="no-border-table">
                                                                <b> Destination</b>
                                                            </TableCell>
                                                            <TableCell align="left" className="no-border-table">
                                                                <TextField
                                                                    id="Name"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    fullWidth
                                                                    InputProps={{
                                                                        className: "textFieldCss",
                                                                        maxlength: 50
                                                                    }}
                                                                    onChange={(e) => updateFormValue('Name', e)}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                            <TableCell align="left" className="no-border-table">
                                                                <b> Post Code</b>
                                                            </TableCell>
                                                            <TableCell align="left" className="no-border-table">
                                                                <TextField
                                                                    id="PostCode"
                                                                    variant="outlined"
                                                                    size="small"
                                                                    fullWidth
                                                                    InputProps={{
                                                                        className: "textFieldCss",
                                                                        maxlength: 50
                                                                    }}
                                                                    onChange={(e) => updateFormValue('PostCode', e)}
                                                                />
                                                            </TableCell>
                                                        </TableRow>
                                                        <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b>Country</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <Select
                                                                            style={{ height: 40, marginTop: 14 }}

                                                                            id="CountryID"
                                                                            label="Country"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss"
                                                                            }}
                                                                            value={parseInt(this.state.countryId)}
                                                                            onChange={(e) => updateFormValue('CountryID', e)}
                                                                        >

                                                                            {
                                                                                this.state.countryData.map((item, i) => (
                                                                                    <MenuItem value={item.countryId}>
                                                                                        {item.name}
                                                                                    </MenuItem>
                                                                                ))
                                                                            }


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

                                                                            id="stateID"
                                                                            label="State"
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss"
                                                                            }}
                                                                            value={parseInt(this.state.stateId)}
                                                                            onChange={(e) => updateFormValue('stateID', e)}
                                                                        >

                                                                            {
                                                                                this.state.stateData.map((item, i) => (
                                                                                    <MenuItem value={item.stateId}>
                                                                                        {item.name}
                                                                                    </MenuItem>
                                                                                ))
                                                                            }


                                                                        </Select>
                                                                    </TableCell>
                                                                </TableRow>

                                                    </TableBody>
                                                </Table>

                                            </Grid>


                                        </Grid>

                                    </AccordionDetails>
                                </Accordion>
                           
                                    </Grid>
                                </Grid>
                              
                                </Grid>

                            <Grid xs={12} sm={12} md={5} lg={5}>
                                <Grid container spacing={0}>
                                    <Grid xs={12} sm={12} md={10} lg={10}>
                                    <Destination destinations={this.state.destinations} />
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>
                </div>

            </Fragment>
        )
    }

}
export default adddestination;