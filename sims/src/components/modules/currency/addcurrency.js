import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';


import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';


import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";

import moment from "moment";

const Dformat = APIURLS.DFormat;
const viewDate = "yyyy-mm-dd";
const todayDate = new Date(); //moment().format(viewDate);
console.log("Dformat > ", Dformat);
console.log("todayDate > ", todayDate);



class addcurrency extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            GeneralDetailsExpanded: true,          
            ProgressLoader: true,
            initialCss: "",
            Currency: {
                CurrId: 0,
                Code: null,
                Description: null,
                Symbol: null,
                RealizedGainId: 0,
                RealizedLossId: 0,
                Rounding: 0,
            }
            
        }
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


        const handleAccordionClick = (val, e) => {

            if (val === "GeneralDetailsExpanded") {
                this.state.GeneralDetailsExpanded === true ? this.setState({ GeneralDetailsExpanded: false }) : this.setState({ GeneralDetailsExpanded: true })
            }
          
        }

        const updateFormValue = (id, e) => {
            console.log("In updateFormValue");
            let Currency=this.state.Currency;



        }
 

        const handleCreate = (e) => {
            this.setState({ ProgressLoader: false });
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const data = {
                validUser: ValidUser,
                Currency: this.state.Currency
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let Url = APIURLS.APIURL.CreateCurrency;
            axios.post(Url, data, { headers })
                .then(response => {
                    let data = response.data;
                    console.log("handleCreate > response > data > ", data);
                    if (response.status === 200 || response.status === 201) {
                        this.setState({ ProgressLoader: true, SuccessPrompt: true });
                        let gobackURL=URLS.URLS.currencyMaster + this.state.urlparams;
                        this.props.history.push(gobackURL);
                    } else {
                        this.setState({ ProgressLoader: true, ErrorPrompt: true });
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

                {this.state.ProgressLoader === false ? (<div style={{ marginTop: 0, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

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
                                <Link color="inherit" href={URLS.URLS.currencyMaster + this.state.urlparams} >
                                    Currency Master
                                </Link>
                                <Typography color="textPrimary">Add Currency </Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 5 }}
                                onClick={(e)=>handleCreate(e)}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={8} lg={8}>
                            <Accordion key="numbering-General-Details" expanded={this.state.GeneralDetailsExpanded} >
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
                                        <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                                            <TableBody className="tableBody">
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>Code</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="Code"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Code', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                 
                                                            }}

                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> Description</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="Description"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Description', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                              
                                                            }}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell align="left" className="no-border-table">
                                                    <b> Symbol</b>
                                                </TableCell>
                                                <TableCell align="left" className="no-border-table">
                                                    <TextField
                                                        id="Symbol"
                                                        variant="outlined"
                                                        size="small"
                                                        onChange={(e) => updateFormValue('Symbol', e)}
                                                        fullWidth
                                                        InputProps={{
                                                            className: "textFieldCss",
                                                            
                                                        }}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </AccordionDetails>
                            </Accordion>
                            
                        </Grid>
                        <Grid xs={12} sm={12} md={7} lg={7}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
export default addcurrency;