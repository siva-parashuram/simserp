import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table'; 
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';


class addrole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: true,
            GeneralDetailsExpanded: true,
            Role: {
                RoleId: 0,
                Name: null,
                UserId: 0,
                CreationDate: null
            },
            CreateBtnDisable:true

        };
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
            if (e.target.value === "" || e.target.value.length > 20) {
                let Role=this.state.Role;
                Role.Name=e.target.value;
                this.setState({Role:Role,CreateBtnDisable:true});
            }else{
                let Role=this.state.Role;
                Role.Name=e.target.value;
                this.setState({Role:Role,CreateBtnDisable:false});
            }
            

        }

        const handleCreate = (e) => {
            this.setState({ ProgressLoader: false });
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);

            let Role=this.state.Role;
            Role.UserId=parseInt(getCookie(COOKIE.USERID));
            const headers = {
                "Content-Type": "application/json"
            };
            let data=APIURLS.CreateRoleData;
            data.validUser=ValidUser;
            data.Role=this.state.Role;
            
            // {
            //     validUser:ValidUser,
            //     Role:this.state.Role
            // };
            let CreateRoleUrl = APIURLS.APIURL.CreateRole;
            console.log("CreateRoleUrl > ", CreateRoleUrl);
            axios.post(CreateRoleUrl, data, { headers })
            .then(response => {
                if (response.status === 200 || response.status === 201) {                                
                    this.setState({ ProgressLoader: true, SuccessPrompt: true });
                } else {
                    this.setState({ ProgressLoader: true, ErrorPrompt: true });
                }
            }
            ).catch(error => {
                console.log("error > ", error);
                this.setState({ ProgressLoader: true, ErrorPrompt: true });
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

                {this.state.ProgressLoader === false ? (<div style={{ marginTop: -5, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

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
                                <Link color="inherit" href={URLS.URLS.roleMaster + this.state.urlparams} >
                                    Role Master
                                </Link>
                                <Typography color="textPrimary">Add Role Master</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 6 }}
                                onClick={(e) => handleCreate(e)}
                                disabled={this.state.CreateBtnDisable}
                            >
                                Create
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                            <Accordion key="country-General-Details" expanded={this.state.GeneralDetailsExpanded} >
                                <AccordionSummary
                                    className="accordion-Header-Design"
                                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("GeneralDetailsExpanded", e)} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ minHeight: 20, height: '100%' }}
                                >
                                    <Typography key="" className="accordion-Header-Title">Create New Role</Typography>
                                </AccordionSummary>
                                <AccordionDetails key="">
                                    <TableContainer>
                                        <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                                            <TableBody className="tableBody">

                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>Name</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="name"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('name', e)}
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
                        <Grid xs={12} sm={12} md={6} lg={6}></Grid>

                    </Grid>
                </div>
            </Fragment>
        )
    }

}
export default addrole;