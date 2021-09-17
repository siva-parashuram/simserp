import React, { Fragment } from 'react';
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

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";

import Destination from "./destination";
import Statesbycountry from "./statesbycountry";

let rows = [];
class countryMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            masterCountryData: rows,
            countryData: rows,
            ProgressLoader: true,
            initialCss: "",
            destinationParam: [],
            destinations: [],
            states: [],
        }
    }

    componentDidMount() {
        this.getStateList();
        this.getCountryList();
        this.getAllDestinations();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
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
                this.setState({ masterCountryData: rows, countryData: rows, ProgressLoader: true });
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
                this.setState({ states: rows, ProgressLoader: true });
            }
            ).catch(error => {
                console.log("error > ", error);
            });


    }




    render() {
        const handleRowClick = (e, item, id) => {
            getDestinationsByState(item);
            getStatesByCountry(item);
            removeIsSelectedRowClasses();
            document.getElementById(id).classList.add('selectedRow');
        }

        const removeIsSelectedRowClasses = () => {
            for (let i = 0; i < this.state.countryData.length; i++) {
                document.getElementById('row_' + i).className = '';
            }
        }

        const getDestinationsByState = (item) => {
            this.setState({ ProgressLoader: false });
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);

            let data = {
                Destination: {
                    DestinationId: 0,
                    CountryId: item.countryId,
                    DestinationName: null,
                    Postcode: null
                },
                validUser: ValidUser
            };


            const headers = {
                "Content-Type": "application/json"
            };
            let GetDestinationByCountryIdUrl = APIURLS.APIURL.GetDestinationByCountryId;

            axios.post(GetDestinationByCountryIdUrl, data, { headers })
                .then(response => {
                    let data = response.data;
                    console.log("getStateList > response > data > ", data);
                    if (Object.prototype.toString.call(data) === '[object Array]') {
                        this.setState({ destinations: data, ProgressLoader: true });
                    } else {
                        this.setState({ destinations: [], ProgressLoader: true });
                    }

                }
                ).catch(error => {
                    console.log("error > ", error);
                });
        }

        const getStatesByCountry = (item) => {
            this.setState({ ProgressLoader: false });
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);

            let data = {
                state: {
                    StateId: 0,
                    CountryId: item.countryId,
                    CreationDate: null,
                    Name: null,
                    Code: null,
                    Gstcode: null,
                    UserId: parseInt(getCookie(COOKIE.USERID))
                },
                validUser: ValidUser
            };


            const headers = {
                "Content-Type": "application/json"
            };
            let GetStateByCountryIdUrl = APIURLS.APIURL.GetStateByCountryId;

            axios.post(GetStateByCountryIdUrl, data, { headers })
                .then(response => {
                    let data = response.data;
                    console.log("getStatesByCountry > response > data > ", data);
                    if (Object.prototype.toString.call(data) === '[object Array]') {
                        this.setState({ states: data, ProgressLoader: true });
                    } else {
                        this.setState({ states: [], ProgressLoader: true });
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
                                <Typography color="textPrimary">Country master</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 5 }}
                                startIcon={<AddIcon />}
                            >
                                <a className="button-link" href={URLS.URLS.addCountry + this.state.urlparams}>
                                    New
                                </a>
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={8} lg={8}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={10} lg={10}>
                                    <Table stickyHeader size="small" className="" aria-label="Country List table">
                                        <TableHead className="table-header-background">
                                            <TableRow>
                                                <TableCell className="table-header-font">#</TableCell>
                                                <TableCell className="table-header-font" align="left">Country Name</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="tableBody">
                                            {this.state.countryData.map((item, i) => (
                                                <TableRow
                                                    id={"row_" + i}
                                                    className={this.state.initialCss}
                                                    hover
                                                    key={i}
                                                    onClick={(event) => handleRowClick(event, item, "row_" + i)}
                                                >
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editCountry + this.state.urlparams + "&countryID=" + item.countryId} >CO{item.countryId}</a>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editCountry + this.state.urlparams + "&countryID=" + item.countryId} >{item.name}</a>
                                                    </TableCell>

                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={12} md={4} lg={4}>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} md={10} lg={11}>
                                    <Destination destinations={this.state.destinations} />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} md={10} lg={11}>
                                    &nbsp;
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} md={10} lg={11}>
                                    <Divider className="divider-custom" />
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} md={10} lg={11}>
                                    &nbsp;
                                </Grid>
                            </Grid>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} md={10} lg={11}>
                                    <Statesbycountry states={this.state.states} />
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>


            </Fragment>
        )
    }

}
export default countryMaster;