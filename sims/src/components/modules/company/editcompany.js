import React, { Fragment } from 'react';
import '../../user/dasboard.css';
import * as URLS from "../../../routes/constants";
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

import Button from '@material-ui/core/Button';
import CheckIcon from '@material-ui/icons/Check';

class editcompany extends React.Component {
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
      AddressDetailsExpanded: true,
      Validations: {
        companyName: { errorState: false, errorMsg: "" },
        address: { errorState: false, errorMsg: "" },
        country: { errorState: false, errorMsg: "" },
      },
      userIsTyping: false,
      isUserchangesUpdated: false
    };
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let compID = url.searchParams.get("compID");
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
      this.setState({ userIsTyping: false, isUserchangesUpdated: true });
      console.log("updateFormValue > id > ", id);
      console.log("updateFormValue > e.target.value > ", e.target.value);
      
      //get the value and send for update

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

    const userTypingBusyPrompt = (e) => {
      this.setState({ userIsTyping: true,isUserchangesUpdated: false });
    }


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
                  <Typography color="textPrimary">Edit Company</Typography>
                </Breadcrumbs>
              </Grid>
            </Grid>

            <Grid container spacing={0}>
              <Grid item xs={8}>
                <Grid container spacing={0}>
                  <Grid xs={2}>
                    {(this.state.userIsTyping=== true )  ? (
                      <Fragment>
                        <p style={{ color: 'green' }}>
                          <span>
                            Updating...
                          </span>
                        </p>
                      </Fragment>

                    ) : (
                      null
                    )}

                    {this.state.isUserchangesUpdated === true ? (
                      <Fragment>
                        <p style={{ color: 'green' }}>
                          <span>
                            <CheckIcon />
                          </span>
                          <span>
                            Updated
                          </span>
                        </p>
                      </Fragment>
                    ) : null}



                  </Grid>
                  <Grid xs={10}></Grid>
                </Grid>
              </Grid>
            </Grid>

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
                                      onKeyUp={(e) => userTypingBusyPrompt(e)}
                                      onChange={(e) => updateFormValue('companyName', e)}
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss"
                                      }}
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
                                      error={this.state.Validations.address.errorState}
                                      helperText={this.state.Validations.address.errorMsg}
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
export default editcompany;