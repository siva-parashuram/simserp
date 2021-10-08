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
import Switch from '@mui/material/Switch';


import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

class adduser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: true,
            GeneralDetailsExpanded: true,
            ErrorPrompt: false,
            SuccessPrompt: false,
            user: {
                UserID: 0,
                LoginID: null,
                Password: null,
                FirstName: null,
                LastName: null,
                EmailID: null,
                IsAdmin: false,
                isActive:true,
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
            if (val === "AddressDetailsExpanded") {
                this.state.AddressDetailsExpanded === true ? this.setState({ AddressDetailsExpanded: false }) : this.setState({ AddressDetailsExpanded: true })
            }
        }

        const updateFormValue = (id, e) => {
            console.log("====================================");
            console.log("id > ",id);
            console.log("e > ",e);
            console.log("e.target.value > ",e.target.checked);
            console.log("====================================");

            if(id==="isActive"){
                let user=this.state.user;
                user.isActive=e.target.checked;
                this.setState({user:user});
            }

            if(id==="isAdmin"){
                let user=this.state.user;
                user.IsAdmin=e.target.checked;
                this.setState({user:user});
            }

            if(id==="FirstName"){
                let user=this.state.user;
                user.FirstName=e.target.value;
                this.setState({user:user});
            }
            if(id==="LastName"){
                let user=this.state.user;
                user.LastName=e.target.value;
                this.setState({user:user});
            }
            if(id==="EmailID"){
                let user=this.state.user;
                user.EmailID=e.target.value;
                this.setState({user:user});
            }  
            if(id==="LoginID"){
                let user=this.state.user;
                user.LoginID=e.target.value;
                this.setState({user:user});
            }if(id==="Password"){
                let user=this.state.user;
                user.Password=e.target.value;
                this.setState({user:user});
            }
        }

        const handleCreate = () => {
            this.setState({ProgressLoader:false});
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            let user = this.state.user;
            const handleCreateData = {
                validUser: ValidUser,
                users: user
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let AddUserUrl = APIURLS.APIURL.AddUser;
            console.log("handleCreateData >   ", handleCreateData);

            

            axios.post(AddUserUrl, handleCreateData, { headers })
                .then(response => {
                    let data = response.data;
                    console.log("handleCreate > response > data > ", data);
                    if (response.status === 200 ||response.status === 201) {
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
            this.setState({ ErrorPrompt: false });
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
                                <Link color="inherit" href={URLS.URLS.userMaster + this.state.urlparams} >
                                    User Master
                                </Link>
                                <Typography color="textPrimary">Add New User</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <div className="breadcrumb-bottom"></div> 
                    <Grid container spacing={3}>
                        <Grid className="style-buttons" xs={1}>
                            <Button
                                style={{ marginLeft: 5 }}
                                
                                onClick={handleCreate}
                            >

                                Create

                            </Button>
                        </Grid>
                    </Grid>

                    <div className="New-link-bottom"></div>
                    <Grid className="table-adjust"  container spacing={0}>
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
                                                        <b> FirstName</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="FirstName"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('FirstName', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}
                                                            
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> LastName</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="LastName"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('LastName', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}

                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> EmailID</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="EmailID"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('EmailID', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}

                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> LoginID</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="LoginID"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('LoginID', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}

                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> Password</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField                                                        
                                                            id="Password"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Password', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}

                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                <TableCell align="left" className="no-border-table">
                                                    <b> is Admin?</b>
                                                </TableCell>
                                                <TableCell align="left" className="no-border-table">
                                                <Switch 
                                                size="small"
                                                onChange={(e) => updateFormValue('isAdmin', e)}
                                                />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                            <TableCell align="left" className="no-border-table">
                                                <b> is Active?</b>
                                            </TableCell>
                                            <TableCell align="left" className="no-border-table">
                                            <Switch 
                                            size="small"
                                            onChange={(e) => updateFormValue('isActive', e)}
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
            </Fragment>
        )
    }

}
export default adduser;