import React, { Fragment } from 'react';
import '../../user/dasboard.css';
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
import Nav from "../../user/nav";
 
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';

import TableRow from '@material-ui/core/TableRow';
import Divider from '@mui/material/Divider';


import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import DeleteIcon from '@material-ui/icons/Delete';
import UpdateIcon from '@material-ui/icons/Update';
import Button from '@material-ui/core/Button';
// import CheckIcon from '@material-ui/icons/Check';
import axios from "axios";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Menubar from "../../user/menubar";
import { withStyles } from '@material-ui/styles';


class editcompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: false,
      updateBtnDisabled: false,
      urlparams: "",
      CompanyName: "",
      Address: "",
      Address2: "",
      Address3: "",
      CountryID: 0,
      StateID: 0,
      City: "",
      PostCode: "",
      PhoneNo: "",
      Website: "",
      countryData: [],
      selectedCountry: "",
      createBtnDisabled: true,
      GeneralDetailsExpanded: true,
      AddressDetailsExpanded: true,
      Validations: {
        companyName: { errorState: false, errorMsg: "" },
        address: { errorState: false, errorMsg: "" },
        country: { errorState: false, errorMsg: "" },
        address2: { errorState: false, errorMsg: "" },
        address3: { errorState: false, errorMsg: "" },
        city: { errorState: false, errorMsg: "" },
        postcode: { errorState: false, errorMsg: "" },
        phoneno: { errorState: false, errorMsg: "" },
        website: { errorState: false, errorMsg: "" },
      },
      userIsTyping: false,
      isUserchangesUpdated: false,
      CompanyID: null,
      company: APIURLS.company
    };
    this.wrapper = React.createRef();

  }



  componentDidMount() {
    this.getCountryList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let CompanyID = url.searchParams.get("compID");
    let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
    this.setState({
      urlparams: urlparams,
      CompanyID: CompanyID
    }, () => {
      this.getCompanyDetails(CompanyID);
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

  getCompanyDetails(CompanyID) {
    console.log("getCompanyDetails > CompanyID > ", CompanyID);
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let company = APIURLS.company;
    company.CompanyID = parseInt(CompanyID);           
    const data = {
      validUser: ValidUser,
      company: company
    };
    console.log("data - > ", data);
    const headers = {
      "Content-Type": "application/json"
    };
    let GetCompanyUrl = APIURLS.APIURL.GetCompany;
    axios.post(GetCompanyUrl, data, { headers })
      .then(response => {
        console.log("response > ", response);
        if (response.status === 200) {
          console.log("response.data.CompanyName > ", response.data.companyName);
          company.CompanyName = response.data.companyName;
          company.Address = response.data.address;
          company.Address2 = response.data.address2;
          company.Address3 = response.data.address3;
          company.City = response.data.city;
          company.Postcode = response.data.postcode;
          company.CountryID = response.data.countryId;
          company.StateID = response.data.stateId;
          company.PhoneNo = response.data.phoneNo;
          company.Website = response.data.website;
          this.setState({
            company: company,
            CompanyName: response.data.companyName,
            Address: response.data.address,
            Address2: response.data.address2,
            Address3: response.data.address3,
            CountryID: response.data.countryId,
            state: response.data.stateId,
            City: response.data.city,
            PostCode: response.data.postcode,
            PhoneNo: response.data.phoneNo,
            Website: response.data.website,
            selectedCountry: response.data.countryId,
            ProgressLoader: true
          }, () => {
            console.log("=============================");
            console.log("State > ", this.state);
            console.log("=============================");
          });
        } else {

        }
      }
      ).catch(error => {

      });

  }

  render() {
    

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }


    const CheckTrue=()=>{
      if(this.state.CompanyName===''||this.state.CompanyName===null||this.state.CompanyName.length>50){
          this.setState({updateBtnDisabled: true})
      }else{
          this.setState({updateBtnDisabled:false})
      }
  }

    const updateFormValue = (id, e) => {
      console.log("value >", e.target.value);
      console.log("Length >", e.target.value.length);
      let company = this.state.company;
      // if (id === "PhoneNo") {
      //   if (e.target.value.length > 20) {
      //     let v = this.state.Validations;
      //     v.phoneno = { errorState: true, errorMsg: "Only 20 digits are Allowed!" }
      //     this.setState({ Validations: v,updateBtnDisabled : true })
      // }else{
      //     let v = this.state.Validations;
      //     v.phoneno= { errorState: false, errorMsg: "" };
      //     this.setState({ Validations: v, PhoneNo: e.target.value, updateBtnDisabled: false });
      // }
        
        // company.PhoneNo = e.target.value;
        // this.setState({ PhoneNo: e.target.value, company: company });
      // }
      if (id === "companyName") {
        // company.CompanyName = e.target.value;
        // this.setState({ CompanyName: e.target.value, company: company });
        if (e.target.value === "" || e.target.value == null||e.target.value.length>50) {
          if(e.target.value.length>50){
            let v=this.state.Validations;
            v.companyName={errorState:true,errorMsg: "Only 50 characters are allowed"}
            this.setState({
              Validations:v,
              updateBtnDisabled: true
            });
          }
          if(e.target.value === "" || e.target.value == null){
            console.log("----------->  Blank ");
          let v = this.state.Validations;
          v.companyName = { errorState: true, errorMsg: "Company Name Cannot be blank!" };
          this.setState({
            Validations: v,
            //CompanyName:e.target.value,
            updateBtnDisabled: true
          });

          }
          
        } else {
          console.log("-----------> Not Blank ");
          let v = this.state.Validations;
          v.companyName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            updateBtnDisabled: false,
            CompanyName:e.target.value,

          });
        }
        CheckTrue();

      }

      if (id === "Address") {
        company.Address = e.target.value;
        this.setState({ Address: e.target.value, company: company });
        if (e.target.value === "" || e.target.value == null || e.target.value.length > 50) {
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.address = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" };
            this.setState({
              Validations: v,
              updateBtnDisabled: true
            });
          } else {

            let v = this.state.Validations;
            v.address = { errorState: true, errorMsg: "Address Cannot be blank!" };
            this.setState({
              Validations: v,
              updateBtnDisabled: true
            });
          }

        } else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            updateBtnDisabled: false
            
          });
        }
        CheckTrue();
      }
      if (id === "Address2") {
        if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.address2 = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" }
            this.setState({ 
                Validations: v, 
                //createBtnDisabled: true, 
                updateBtnDisabled: true
            });
        } 
        else{
            let v = this.state.Validations;
            v.address2 = { errorState: false, errorMsg: "" };
            this.setState({
                 Validations: v, 
                 Address2: e.target.value,
                  //createBtnDisabled: false ,
                  updateBtnDisabled: false
                });
        }
        CheckTrue();
    }

    if (id === "Address3"){
        if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.address3 = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" }
            this.setState({
               Validations: v, 
               //createBtnDisabled: true ,
               updateBtnDisabled: true
              })
        }else{
            let v = this.state.Validations;
            v.address3 = { errorState: false, errorMsg: "" };
            this.setState({ Validations: v,
               Address3: e.target.value, 
              //createBtnDisabled: false,
              updateBtnDisabled: false
             });
        }
        CheckTrue();
    }


    if (id === "City"){
        if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.city = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" }
            this.setState({ 
              Validations: v, 
              //createBtnDisabled: true,
              updateBtnDisabled: true
            
            })
        }else{
            let v = this.state.Validations;
            v.city= { errorState: false, errorMsg: "" };
            this.setState({ 
              Validations: v, 
              City: e.target.value, 
              //createBtnDisabled: false 
              updateBtnDisabled: false
            });
        }
        CheckTrue();

    }

    if (id === "Postcode"){
        if (e.target.value.length > 10) {
            let v = this.state.Validations;
            v.postcode = { errorState: true, errorMsg: "Only 10 Characters are Allowed!" }
            this.setState({ 
              Validations: v, 
              //createBtnDisabled: true 
              updateBtnDisabled: true
            })
        }else{
            let v = this.state.Validations;
            v.postcode= { errorState: false, errorMsg: "" };
            this.setState({ 
              Validations: v, 
              PostCode: e.target.value, 
              //createBtnDisabled: false
              updateBtnDisabled: false 
            });
        }
        CheckTrue();

    }

     if (id === "PhoneNo"){
        if (e.target.value.length > 20) {
            let v = this.state.Validations;
            v.phoneno = { errorState: true, errorMsg: "Only 20 digits are Allowed!" }
            this.setState({
               Validations: v, 
               //createBtnDisabled: true 
               updateBtnDisabled: true

              })
        }else{
            let v = this.state.Validations;
            v.phoneno= { errorState: false, errorMsg: "" };
            this.setState({ 
              Validations: v, 
              PhoneNo: e.target.value, 
              //createBtnDisabled: false
              updateBtnDisabled: false
             });
        }
        CheckTrue();


     } 

     if (id === "Website") {
        if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.website = { errorState: true, errorMsg: "Only 50 Characters are Allowed!" }
            this.setState({ 
              Validations: v,
               //createBtnDisabled: true,
               updateBtnDisabled: true
              })
        }else{
            let v = this.state.Validations;
            v.website= { errorState: false, errorMsg: "" };
            this.setState({ 
              Validations: v, 
              Website: e.target.value, 
              //createBtnDisabled: false 
              updateBtnDisabled: false
            });
        }
        CheckTrue();
     }


      


    }

    const updateCompanyDetails = () => {
      CheckTrue();

      

      this.setState({ ProgressLoader: false });
      let company = this.state.company;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        company: company
      };
      console.log("data - > ", data);
      const headers = {
        "Content-Type": "application/json"
      };
      let UpdateCompanyUrl = APIURLS.APIURL.UpdateCompany;
      axios.post(UpdateCompanyUrl, data, { headers })
        .then(response => {
          console.log("response > ", response);
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            //this.props.history.push(gobackURL);
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        }
        ).catch(error => {

        });


    }

    const deleteCompany = () => {
      let gobackURL = URLS.URLS.companyMaster + this.state.urlparams;
      console.log("deleteCompany > gobackURL > ", gobackURL);
      this.setState({ ProgressLoader: false });
      let company = this.state.company;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        company: company
      };
      const headers = {
        "Content-Type": "application/json"
      };
      let DeleteCompanyUrl = APIURLS.APIURL.DeleteCompany;

      axios.post(DeleteCompanyUrl, data, { headers })
        .then(response => {
          console.log("response > ", response);
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            this.props.history.push(gobackURL);
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        }
        ).catch(error => {

        });


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

    // const userTypingBusyPrompt = (e) => {
    //   this.setState({ userIsTyping: true,isUserchangesUpdated: false });
    // }

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

    // const StyledAccordionSummary = withStyles({
    //   root: {
    //       minHeight:"40px",
    //       maxHeight: "40px",
          
    //       '&.Mui-expanded': {
    //         minHeight: '50px',
    //         maxHeight: '50px',
            
    //       }
    //   },
      
    //   })(AccordionSummary);


    return (
      <Fragment>
        <Nav />
        <Menubar />
        
        <div>

          {this.state.ProgressLoader === false ? (<div style={{ marginTop: -8, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

          <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
            <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
          </Snackbar>

          <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
            <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
          </Snackbar>



          <div className='breadcrumb-height'>
            <Grid  container spacing={3}>
              <Grid  item xs={12}>
                <Breadcrumbs className='style-breadcrumb' aria-label="breadcrumb">
                  <Link color="inherit" className="backLink" href="javascript:history.go(-1)">
                    Back
                  </Link>
                  <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                    Dashboard
                  </Link>
                  <Link color="inherit" href={URLS.URLS.companyMaster + this.state.urlparams}>
                    Company master
                  </Link>
                  <Typography color="textPrimary">Edit Company</Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>
          </div>

          <div className="breadcrumb-bottom"></div>

          <div >
            <Grid container spacing={0}>
              <Grid className="style-buttons"   xs={1}>   
                 <Button   
                 
                  onClick={(e) => updateCompanyDetails()} 
                  disabled={this.state.updateBtnDisabled}
                 
                >
                  Update
                </Button>       
                {/* <Link className="style-Links"  onClick={(e) => updateCompanyDetails()} disabled={this.state.updateBtnDisabled}>Update</Link> */}
              </Grid>
             
            </Grid>
            
          </div>
          

          <div className="New-link-bottom"></div>

          <Grid className="table-adjust"  container spacing={0}>  
            <Grid   item xs={8}>
              <div style={{ minHeight: '100%', height: 500, overflowY: 'scroll', overflowX: 'hidden' }}> 
                <Grid  container spacing={2}>
                  <Grid  item xs={12}>  
                    <Accordion   key="company-General-Details" expanded={this.state.GeneralDetailsExpanded} >
                      <AccordionSummary
                        className="accordion-Header-Design"
                        expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("GeneralDetailsExpanded", e)} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                         style={{ minHeight:'40px', maxHeight:'40px' }}
                      >
                        <Typography key="" className="accordion-Header-Title">General Details</Typography>
                      </AccordionSummary>
                      {/* <Divider   className="accordion-Header-underline"/> */}
                      <AccordionDetails key="">
                        <TableContainer>
                          <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                            <TableBody className="tableBody">
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  Company Name 
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="companyName"
                                    variant="outlined"
                                    size="small"
                                    // onKeyUp={(e) => userTypingBusyPrompt(e)}
                                    onChange={(e) => updateFormValue('companyName', e)}
                                    fullWidth
                                    value={this.state.CompanyName}
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 50
                                    }}

                                    
                                    error={this.state.Validations.companyName.errorState}
                                    helperText={this.state.Validations.companyName.errorMsg}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                   Phone No
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                  type='number'
                                    id="PhoneNo"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PhoneNo}
                                    onChange={(e) => updateFormValue('PhoneNo', e)}
                                    fullWidth
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 20
                                    }}
                                    
                                    error={this.state.Validations.phoneno.errorState}
                                    helperText={this.state.Validations.phoneno.errorMsg}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  Website
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="Website"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.Website}
                                    onChange={(e) => updateFormValue('Website', e)}
                                    fullWidth
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 20
                                    }}
                                    
                                    error={this.state.Validations.website.errorState}
                                    helperText={this.state.Validations.website.errorMsg}
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
                        style={{minHeight:'40px', maxHeight:'40px' }}
                      >
                        <Typography key="" className="accordion-Header-Title">
                          Address Details
                          
                          </Typography>
                          
                          

                      </AccordionSummary>
                      {/* <Divider   className="accordion-Header-underline"/> */}
                      <AccordionDetails key="">
                        <TableContainer>
                          <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                            <TableBody className="tableBody">
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  Country
                                </TableCell>

                                <TableCell align="left" className="no-border-table">
                                  <select
                                  className="dropdown-css"
                                    id="countrySelect"
                                    label="Country"
                                    fullWidth
                                   
                                    value={parseInt(this.state.selectedCountry)}
                                    onChange={(e) => updateFormValue('Country', e)}
                                  >
                                    <option value="-">
                                      None
                                    </option>
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
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  State
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <select
                                  className="dropdown-css"
                                    id="stateSelect"
                                    label="State"
                                    fullWidth
                                     

                                  >
                                    <option value="-">
                                       None 
                                    </option>
                                    <option value={10}>Goa</option>
                                    <option value={20}>Gujrat</option>
                                    <option value={30}>Delhi</option>
                                  </select>
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  City
                                </TableCell>

                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="City"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => updateFormValue('City', e)}
                                    fullWidth
                                    value={this.state.City}
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 50
                                    }}
                                    
                                    error={this.state.Validations.city.errorState}
                                    helperText={this.state.Validations.city.errorMsg}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  Postcode
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="Postcode"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => updateFormValue('Postcode', e)}
                                    fullWidth
                                    value={this.state.PostCode}
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 10
                                    }}
                                    
                                    error={this.state.Validations.postcode.errorState}
                                    helperText={this.state.Validations.postcode.errorMsg}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  Address Line 1
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="Address"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => updateFormValue('Address', e)}
                                    value={this.state.Address}
                                    fullWidth
                                    error={this.state.Validations.address.errorState}
                                    helperText={this.state.Validations.address.errorMsg}
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 50
                                    }}
                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  Address Line 2
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="Address2"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => updateFormValue('Address2', e)}
                                    fullWidth
                                    value={this.state.Address2}
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 50
                                    }}
                                    error={this.state.Validations.address2.errorState}
                                    helperText={this.state.Validations.address2.errorMsg}

                                  />
                                </TableCell>
                              </TableRow>
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  Address Line 3
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="Address3"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) => updateFormValue('Address3', e)}
                                    fullWidth
                                    value={this.state.Address3}
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 50
                                    }}
                                    error={this.state.Validations.address3.errorState}
                                    helperText={this.state.Validations.address3.errorMsg}
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
      </Fragment>
    );
  }


}
export default editcompany;