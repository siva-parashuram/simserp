import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
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
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

class editstate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: false,
            GeneralDetailsExpanded: true,
            Validations: {
                stateName: { errorState: false, errorMsg: "" },
                 
            },
            state: {
                StateId: null,
                CountryId: 0,
                CreationDate: null,
                Name: null,
                Code: null,
                Gstcode: null,
                UserId: null
            },
            code: null,
            country: null,
            countryId: null,
            creationDate: null,
            gstcode: null,
            name: null,
            StateId: null,
            countryData: [],
            CountryID: null,
            ErrorPrompt: false,
            SuccessPrompt: false,
            disableCreateBtn:true,
        }
    }

    componentDidMount() {
        this.getCountryList();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let StateId = url.searchParams.get("StateId");

        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
            StateId: StateId
        }, () => {
            this.getState();
        });
    }

    getState() {
        let state = this.state.state;
        state.StateId = parseInt(this.state.StateId);
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const getStateDetailsData = {
            validUser: ValidUser,
            state: state,

        };
        const headers = {
            "Content-Type": "application/json"
        };
        let GetSateUrl = APIURLS.APIURL.GetSate;

        axios.post(GetSateUrl, getStateDetailsData, { headers })
            .then(response => {
                let data = response.data;
                console.log("getState > response > data > ", data);


                this.setState({
                    state: data,
                    code: data.code,
                    country: data.country,
                    countryId: data.countryId,
                    creationDate: data.creationDate,
                    gstcode: data.gstcode,
                    name: data.name,
                    ProgressLoader: true
                });
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

            if (val === "GeneralDetailsExpanded") {
                this.state.GeneralDetailsExpanded === true ? this.setState({ GeneralDetailsExpanded: false }) : this.setState({ GeneralDetailsExpanded: true })
            }
            if (val === "AddressDetailsExpanded") {
                this.state.AddressDetailsExpanded === true ? this.setState({ AddressDetailsExpanded: false }) : this.setState({ AddressDetailsExpanded: true })
            }
        }

        const updateFormValue = (id, e) => {  
            if(id==="Name"){
                let state=this.state.state;
                state.Name= e.target.value;
                this.setState({ name: e.target.value,state:state });
                if(e.target.value==="" || e.target.value==null){
                  let Validations={
                    stateName: { errorState: true, errorMsg: "Enter State Name" },
                                };
                     
                    this.setState({disableCreateBtn:true,Validations:Validations});
                }else{
                    let Validations={
                        stateName: { errorState: false, errorMsg: "" },
                                    };
                    this.setState({disableCreateBtn:false,Validations:Validations});
                }   
            }
            if(id==="Code"){
                let state=this.state.state;
                state.Code= e.target.value;
                this.setState({ code: e.target.value,state:state });
            }
            if(id==="GSTCode"){
                let state=this.state.state;
                state.Gstcode= e.target.value;
                this.setState({ gstcode: e.target.value,state:state });
            }
            if(id==="CountryID"){
                let state=this.state.state;
                state.CountryId= e.target.value;
                this.setState({ CountryID: e.target.value,countryId:e.target.value,state:state });
            }            
        }

        const handleUpdate = () => {
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            let state = this.state.state;
            const handleUpdateData = {
                validUser: ValidUser,
                state: state
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let UpdateStateUrl = APIURLS.APIURL.UpdateState;

            axios.post(UpdateStateUrl, handleUpdateData, { headers })
                .then(response => {
                    let data = response.data;
                    if (response.status === 200) {
                        this.setState({ProgressLoader:true,SuccessPrompt: true });  
                    }else{
                        this.setState({ ProgressLoader: true,ErrorPrompt: true  });
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
                                <Link color="inherit" href={URLS.URLS.stateMaster + this.state.urlparams} >
                                    State Master
                                </Link>
                                <Typography color="textPrimary">Edit State</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={3}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 5 }}
                                startIcon={<AddIcon />}
                                onClick={handleUpdate}
                                disabled={this.state.disableCreateBtn}
                            >

                                Update

                            </Button>
                        </Grid>
                    </Grid>

                    <div style={{ height: 40 }}></div>
                    <Grid container spacing={3}>
                        <Grid xs={12} sm={6} md={6} lg={6}>
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
                                    <TableContainer>
                                        <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                                            <TableBody className="tableBody">
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>State Name</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="Name"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Name', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}
                                                            error={this.state.Validations.stateName.errorState}
                                                            helperText={this.state.Validations.stateName.errorMsg}
                                                            value={this.state.name}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> Code</b>
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
                                                                maxlength: 20
                                                            }}
                                                            value={this.state.code}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>GST Code</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="GSTCode"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('GSTCode', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 20
                                                            }}
                                                            value={this.state.gstcode}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>Country</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <select
                                                            className="dropdown-css"
                                                            id="CountryID"
                                                            label="Country"
                                                            fullWidth
                                                            
                                                            value={parseInt(this.state.countryId)}
                                                            onChange={(e) => updateFormValue('CountryID', e)}
                                                        >

                                                            {
                                                                this.state.countryData.map((item, i) => (
                                                                    <option value={item.countryId}>
                                                                        {item.name}
                                                                    </option>
                                                                ))
                                                            }


                                                        </select>
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


            </Fragment>
        )
    }

}
export default editstate;