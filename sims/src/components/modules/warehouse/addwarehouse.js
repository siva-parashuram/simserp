import React, { Fragment } from "react";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import TextField from "@material-ui/core/TextField";
import Switch from "@mui/material/Switch";

import axios from "axios";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";

class addwarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      allotBranch: false,
      allotModule: false,
      ProgressLoader: false,
      GeneralDetailsExpanded: true,
      OtherDetailsExpanded: false,
      initialCss: "",
      branchId: 0,
      branches: [],
      warehouse: {
        WareHouseId: 0,
        BranchId: 0,
        Code: null,
        Description: null,
        Address: null,
        Address2: null,
        Address3: null,
        IsEdi: false,
        Ediurl: null,
        EdiloginId: 0,
        Edipassword: null,
        ContactPerson: null,
        EmailId: null,
        PhoneNo: 0,
        IsActive: false,
      },
    };
  }

  componentDidMount() {
    this.getBranches();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    let warehouse = this.state.warehouse;
    warehouse.BranchId = branchId;
    this.setState({
      urlparams: urlparams,
      branchId: branchId,
    });
  }

  getBranches() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetBrachesUrl = APIURLS.APIURL.GetBraches;

    axios
      .post(GetBrachesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("getBranches > response > data > ", data);

        this.setState({ branches: data, ProgressLoader: true });
      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ branches: [], ProgressLoader: true });
      });
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "OtherDetailsExpanded") {
        this.state.OtherDetailsExpanded === true
          ? this.setState({ OtherDetailsExpanded: false })
          : this.setState({ OtherDetailsExpanded: true });
      }
    };

    const updateFormValue = (id, e) => {
      let warehouse = this.state.warehouse;
      if (id === "isActive") {
        warehouse.IsActive = e.target.checked;
        this.setState({ warehouse: warehouse });
      }
      // if (id === "branch") {
      //     warehouse.BranchId = parseInt(e.target.value);
      //     this.setState({ warehouse: warehouse });
      // }

      if (id === "Code") {
        warehouse.Code = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "Description") {
        warehouse.Description = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "contactPerson") {
        warehouse.ContactPerson = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "phoneNo") {
        warehouse.PhoneNo = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "EmailID") {
        warehouse.EmailId = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "Address") {
        warehouse.Address = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "Address2") {
        warehouse.Address2 = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "Address3") {
        warehouse.Address3 = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "isEDI") {
        warehouse.IsEdi = e.target.checked;
        this.setState({ warehouse: warehouse });
      }
      if (id === "ediurl") {
        warehouse.Ediurl = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "ediloginid") {
        warehouse.EdiloginId = e.target.value;
        this.setState({ warehouse: warehouse });
      }
      if (id === "edipassword") {
        warehouse.Edipassword = e.target.value;
        this.setState({ warehouse: warehouse });
      }
    };

    const handleCreate = () => {
      this.setState({ ProgressLoader: false });

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let warehouse = this.state.warehouse;
      const data = {
        validUser: ValidUser,
        WareHouse: warehouse,
      };
      console.log("data - > ", data);
      let Url = APIURLS.APIURL.CreateWareHouse;
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(Url, data, { headers })
        .then((response) => {
          console.log("response > ", response);
          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            this.props.history.push(
              URLS.URLS.warehouseMaster + this.state.urlparams
            );
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
    };

    return (
      <Fragment>
        <Nav />
        <Menubar />
        <div className="breadcrumb-height">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs className="style-breadcrumb" aria-label="breadcrumb">
                <Link
                  color="inherit"
                  className="backLink"
                  onClick={this.props.history.goBack}
                >
                  Back
                </Link>
                <Link
                  color="inherit"
                  href={URLS.URLS.userDashboard + this.state.urlparams}
                >
                  Dashboard
                </Link>
                <Link
                  color="inherit"
                  href={URLS.URLS.warehouseMaster + this.state.urlparams}
                >
                  Warehouse master
                </Link>
                <Typography color="textPrimary">Add Warehouse</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>
          <Grid container spacing={3}>
            <Grid className="style-buttons" xs={1}>
              <Button style={{ marginLeft: 5 }} onClick={(e) => handleCreate()}>
                Create
              </Button>
            </Grid>
          </Grid>
          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={7} lg={7}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <Accordion
                    key="country-General-Details"
                    expanded={this.state.GeneralDetailsExpanded}
                  >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) =>
                            handleAccordionClick("GeneralDetailsExpanded", e)
                          }
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        General Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="table"
                            >
                              <TableBody className="tableBody">
                                <Tablerowcelltextboxinput
                                  id="Code"
                                  label="Code"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("Code", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />

                                <Tablerowcelltextboxinput
                                  id="Description"
                                  label="Description"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Description", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />
                                <Tablerowcelltextboxinput
                                  id="contactPerson"
                                  label=" Contact Person"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("contactPerson", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />

                                <Tablerowcelltextboxinput
                                  id="phoneNo"
                                  label="Phone No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("phoneNo", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="table"
                            >
                              <TableBody className="tableBody">
                                <Tablerowcelltextboxinput
                                  id="EmailID"
                                  label="Email ID"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("EmailID", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />

                                <Tablerowcelltextboxinput
                                  id="Address"
                                  label="Address Line 1"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />

                                <Tablerowcelltextboxinput
                                  id="Address2"
                                  label="Address Line 2"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address2", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />

                                <Tablerowcelltextboxinput
                                  id="Address3"
                                  label="Address Line 3"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("Address3", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />

                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                  is Active?
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <Switch
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("isActive", e)
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    key="country-General-Details"
                    expanded={this.state.OtherDetailsExpanded}
                  >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) =>
                            handleAccordionClick("OtherDetailsExpanded", e)
                          }
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        More Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="table"
                            >
                              <TableBody className="tableBody">
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                     isEDI?
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <Switch
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("isEDI", e)
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <Tablerowcelltextboxinput
                                  id="ediurl"
                                  label="EDI Url"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("ediurl", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="table"
                            >
                              <TableBody className="tableBody">
                                <Tablerowcelltextboxinput
                                  id="ediloginid"
                                  label="EDI LoginID"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("ediloginid", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />

                                <Tablerowcelltextboxinput
                                  type="password"
                                  id="edipassword"
                                  label="EDI Password"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("edipassword", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 10,
                                  }}
                                  //   value={this.state.CompanyName}
                                  //   error={this.state.Validations.companyName.errorState}
                                  //   helperText={this.state.Validations.companyName.errorMsg}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default addwarehouse;
