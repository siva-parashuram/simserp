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
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
    }));

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const updateFormValue = (id, e) => {
      console.log("value >", e.target.value);
      console.log("Length >", e.target.value.length);
      let company = this.state.company;
      if (id === "PhoneNo") {
        company.PhoneNo = e.target.value;
        this.setState({ PhoneNo: e.target.value, company: company });
      }
      if (id === "companyName") {
        company.CompanyName = e.target.value;
        this.setState({ CompanyName: e.target.value, company: company });
        if (e.target.value === "" || e.target.value == null) {
          console.log("----------->  Blank ");
          let v = this.state.Validations;
          v.companyName = { errorState: true, errorMsg: "Company Name Cannot be blank!" };
          this.setState({
            Validations: v,
            updateBtnDisabled: true
          });
        } else {
          console.log("-----------> Not Blank ");
          let v = this.state.Validations;
          v.companyName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            updateBtnDisabled: false
          });
        }
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
      }
      if (id === "Address2") {
        company.Address2 = e.target.value;
        this.setState({ Address2: e.target.value, company: company });
      }
      if (id === "Address3") {
        company.Address3 = e.target.value;
        this.setState({ Address3: e.target.value, company: company });
      }
      if (id === "Website") {
        company.Website = e.target.value;
        this.setState({ Website: e.target.value, company: company });
      }
      if (id === "City") {
        company.City = e.target.value;
        this.setState({ City: e.target.value, company: company });
      }
      if (id === "Postcode") {
        company.Postcode = e.target.value;
        this.setState({ PostCode: e.target.value, company: company });
      }
      if (id === "Website") {
        company.Website = e.target.value;
        this.setState({ Website: e.target.value, company: company });
      } if (id === "Country") {
        company.countryId = e.target.value;
        this.setState({ selectedCountry: e.target.value, company: company });
      }



    }

    const updateCompanyDetails = () => {
      let gobackURL = URLS.URLS.companyMaster + this.state.urlparams;

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


    return (
      <Fragment>
        <Nav />
        <Menubar />
        <div style={{ height: 20 }}></div>
        <div>

          {this.state.ProgressLoader === false ? (<div style={{ marginTop: -8, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

          <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
            <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
          </Snackbar>

          <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
            <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
          </Snackbar>



          <div style={{ marginLeft: 3 }}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
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

          <div style={{ height: 10 }}></div>

          <div >
            <Grid container spacing={0}>
              <Grid xs={1}>
                <Button
                  style={{ marginLeft: 5 }}
                  onClick={(e) => updateCompanyDetails()}
                  disabled={this.state.updateBtnDisabled}
                  startIcon={<UpdateIcon />}
                >
                  Update
                </Button>
              </Grid>
              <Grid xs={1}>
                <Button
                  style={{ marginLeft: 0 }}
                  startIcon={<DeleteIcon />}
                  disabled={this.state.DeleteDisabled}
                  onClick={(e) => deleteCompany()}
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>

          <div style={{ height: 5 }}> </div>

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
                          <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                            <TableBody className="tableBody">
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  <b>Company Name </b>
                                </TableCell>
                                <TableCell align="left" className="no-border-table">
                                  <TextField
                                    id="companyName"
                                    variant="outlined"
                                    size="small"
                                    // onKeyUp={(e) => userTypingBusyPrompt(e)}
                                    onChange={(e) => updateFormValue('companyName', e)}
                                    fullWidth
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 50
                                    }}

                                    value={this.state.CompanyName}
                                    error={this.state.Validations.companyName.errorState}
                                    helperText={this.state.Validations.companyName.errorMsg}
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
                                      className: "textFieldCss",
                                      maxlength: 20
                                    }}
                                    value={this.state.PhoneNo}
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
                                      className: "textFieldCss",
                                      maxlength: 20
                                    }}
                                    value={this.state.Website}
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
                          <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                            <TableBody className="tableBody">
                              <TableRow>
                                <TableCell align="left" className="no-border-table">
                                  <b>Country</b>
                                </TableCell>

                                <TableCell align="left" className="no-border-table">
                                  <Select
                                    style={{ height: 40, marginTop: 14 }}
                                    // variant="outlined"
                                    id="countrySelect"
                                    label="Country"
                                    fullWidth
                                    InputProps={{
                                      className: "textFieldCss"
                                    }}
                                    value={parseInt(this.state.selectedCountry)}
                                    onChange={(e) => updateFormValue('Country', e)}
                                  >
                                    <MenuItem value="-">
                                      <em>None</em>
                                    </MenuItem>
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
                                    // variant="outlined"
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
                                      className: "textFieldCss",
                                      maxlength: 50
                                    }}
                                    value={this.state.City}
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
                                    value={this.state.PostCode}
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
                                  <b>Address Line 2</b>
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
                                    value={this.state.Address3}
                                    InputProps={{
                                      className: "textFieldCss",
                                      maxlength: 50
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