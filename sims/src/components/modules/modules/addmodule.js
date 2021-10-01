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

class addmodule extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: true,
            GeneralDetailsExpanded: true,
            Module:
            {
               ModuleId :0,
               Name :null,
               Description :null,
               IconName:null,
            },
            Validations: {
                Name: { errorState: false, errorMsg: "" },
                Description: { errorState: false, errorMsg: "" },
                IconName: { errorState: false, errorMsg: "" },
              },
            ErrorPrompt:false,
            SuccessPrompt:false,

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
            if (id === "Name") {           
                if(e.target.value==="" || e.target.value.length>20){
                    let Module = this.state.Module;
                    Module.Name = e.target.value;
                    let Validations=this.state.Validations;
                    if(e.target.value===""){
                        Validations.Name={  errorState: true, errorMsg: "Blank inputs not allowed!" }
                    }
                    if(e.target.value.length>20){
                        Validations.Name={  errorState: true, errorMsg: "Maximum 20 characters Allowed!" }
                    }
                    this.setState({ Module: Module,updateBtnDisable:true,Validations:Validations });
                }else{
                    let Module = this.state.Module;                    
                    Module.Name = e.target.value;
                    let Validations=this.state.Validations;
                    Validations.Name={ errorState: false, errorMsg: "" };
                    this.setState({ Module: Module,updateBtnDisable:false,Validations:Validations  });
                }               
            }
            if (id === "Description") {
                if(e.target.value==="" || e.target.value.length>50){
                    let Module = this.state.Module;
                    Module.Description = e.target.value;
                    let Validations=this.state.Validations;
                    if(e.target.value===""){
                        Validations.Description={  errorState: true, errorMsg: "Blank inputs not allowed!" }
                    }
                    if(e.target.value.length>20){
                        Validations.Description={  errorState: true, errorMsg: "Maximum 50 characters Allowed!" }
                    }
                    this.setState({ Module: Module,updateBtnDisable:true,Validations:Validations });
                }else{
                    let Module = this.state.Module;
                    Module.Description = e.target.value;
                    let Validations=this.state.Validations;
                    Validations.Description={ errorState: false, errorMsg: "" };
                    this.setState({ Module: Module,updateBtnDisable:false });
                }               
            }
            if (id === "IconName") {
                if(e.target.value==="" || e.target.value.length>50){
                    let Module = this.state.Module;
                    Module.IconName = e.target.value;
                    let Validations=this.state.Validations;
                    if(e.target.value===""){
                        Validations.IconName={  errorState: true, errorMsg: "Blank inputs not allowed!" }
                    }
                    if(e.target.value.length>20){
                        Validations.IconName={  errorState: true, errorMsg: "Maximum 50 characters Allowed!" }
                    }
                    this.setState({ Module: Module,updateBtnDisable:true,Validations:Validations });
                }else{
                    let Module = this.state.Module;
                    Module.IconName = e.target.value;
                    this.setState({ Module: Module,updateBtnDisable:false });
                }                
            }                                 
         }

         const handleCreate=()=>{
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            let Module=this.state.Module;
            const data = APIURLS.CreateModuleData;
            data.validUser=ValidUser;
            data.Module=Module;
            // {
            //     validUser: ValidUser,
            //     Module: Module
            // };
            const headers = {
              "Content-Type": "application/json"
            };
            let CreateModuleUrl = APIURLS.APIURL.CreateModule;       
           
            axios.post(CreateModuleUrl, data, { headers })
              .then(response => {           
                let data=response.data;
                console.log("handleCreate > response > data > ",data);
               
                 
              }
              ).catch(error => {            
                console.log("error > ",error);
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
                                <Link color="inherit" href={URLS.URLS.moduleMaster + this.state.urlparams} >
                                    Module Master
                                </Link>
                                <Typography color="textPrimary">Add New Module</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={3}>
                    <Grid xs={1}>
                        <Button
                            style={{ marginLeft: 5 }}
                            startIcon={<AddIcon />}
                            onClick={handleCreate}
                        >
                             
                            Create
                           
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
                                                        <b>Module Name</b>
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
                                                                 
                                                            }}
                                                            error={this.state.Validations.Name.errorState}
                                                            helperText={this.state.Validations.Name.errorMsg}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> Description </b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="Description "
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Description', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                
                                                            }}
                                                            error={this.state.Validations.Description.errorState}
                                                            helperText={this.state.Validations.Description.errorMsg}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>IconName</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="IconName"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('IconName', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                               
                                                            }}
                                                            error={this.state.Validations.IconName.errorState}
                                                            helperText={this.state.Validations.IconName.errorMsg}
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
export default addmodule;