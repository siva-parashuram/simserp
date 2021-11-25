import React, { Fragment } from "react";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";

import UpdateIcon from "@material-ui/icons/Update";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
import * as CF from "../../../services/functions/customfunctions";

import Switch from "@mui/material/Switch";

import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

class editwarehouse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      allotBranch: false,
      allotModule: false,
      ProgressLoader: false,
      GeneralDetailsExpanded: true,
      OtherDetailsExpanded: false,
      SuccessPrompt: false,
      ErrorPrompt: false,
      DisableUpdatebtn: false,
      initialCss: "",
      branchId: 0,
      branches: [],
      duplicate: false,
      warehouses: [],
      oldCode: 0,
      editwareHouseId: 0,
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
      PhoneNo: null,
      IsActive: false,
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Description: { errorState: false, errorMssg: "" },
        Address: { errorState: false, errorMssg: "" },
        Address2: { errorState: false, errorMssg: "" },
        Address3: { errorState: false, errorMssg: "" },
        Ediurl: { errorState: false, errorMssg: "" },
        EdiloginId: { errorState: false, errorMssg: "" },
        Edipassword: { errorState: false, errorMssg: "" },
        ContactPerson: { errorState: false, errorMssg: "" },
        EmailId: { errorState: false, errorMssg: "" },
        PhoneNo: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    this.getWarehouses();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let editwareHouseId = url.searchParams.get("editwareHouseId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    let warehouse = this.state.warehouse;
    warehouse.WareHouseId = editwareHouseId;
    warehouse.BranchId = branchId;
    this.setState(
      {
        urlparams: urlparams,
        editwareHouseId: editwareHouseId,
        warehouse: warehouse,
      },
      () => {
        this.getWarehouseByID(editwareHouseId);
      }
    );
  }

  getWarehouses() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetWareHousesUrl = APIURLS.APIURL.GetWareHouses;

    axios
      .post(GetWareHousesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200) {
          let rows = data;
          this.setState({
            warehouses: data,
            ProgressLoader: true,
          });
        } else {
          this.setState({ warehouses: [], ProgressLoader: true });
        }
      })
      .catch((error) => {});
  }

  getWarehouseByID(wareHouseId) {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let warehouse = this.state.warehouse;
    const data = {
      validUser: ValidUser,
      WareHouse: warehouse,
    };

    let Url = APIURLS.APIURL.GetWareHouse;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let warehouse = {
          WareHouseId: wareHouseId,
          BranchId: response.data.branchId,
          Code: response.data.code,
          Description: response.data.description,
          Address: response.data.address,
          Address2: response.data.address2,
          Address3: response.data.address3,
          IsEdi: response.data.isEdi,
          Ediurl: response.data.ediurl,
          EdiloginId: response.data.ediloginId,
          Edipassword: response.data.edipassword,
          ContactPerson: response.data.contactPerson,
          EmailId: response.data.emailId,
          PhoneNo: response.data.phoneNo,
          IsActive: response.data.isActive,
        };
        this.setState({
          oldCode: response.data.code,
          warehouse: warehouse,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
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

      if (id === "Code") {
        let duplicateExist = CF.chkDuplicateButExcludeName(
          this.state.warehouses,
          "code",
          this.state.oldCode,
          e.target.value
        );
        warehouse.Code = e.target.value;
        if (e.target.value.length > 10 || duplicateExist === true) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.Code = {
              errorState: true,
              errorMssg: "Code Exists",
            };
            this.setState({
              Validations: v,
              duplicate: true,
              DisableUpdatebtn: true,
              Code: e.target.value,
            });
          }
          if (e.target.value.length > 10) {
            let v = this.state.Validations;
            v.Code = {
              errorState: true,
              errorMssg: "Maximum 10 characters allowed",
            };
            this.setState({
              Validations: v,
              DisableUpdatebtn: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.Code = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            Code: e.target.value,
            DisableUpdatebtn: false,
          });
        }
      }
      if (id === "Description") {
        warehouse.Description = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Description = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Description = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            Description: e.target.value,
          });
        }
      }
      if (id === "contactPerson") {
        warehouse.ContactPerson = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.ContactPerson = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.ContactPerson = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            ContactPerson: e.target.value,
          });
        }
      }
      if (id === "phoneNo") {
        warehouse.PhoneNo = e.target.value;
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.PhoneNo = {
            errorState: true,
            errorMssg: "Maximum 20 Numbers allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.PhoneNo = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            PhoneNo: e.target.value,
          });
        }
      }
      if (id === "EmailID") {
        warehouse.EmailId = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.EmailId = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.EmailId = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            EmailId: e.target.value,
          });
        }
      }
      if (id === "Address") {
        warehouse.Address = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Address = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Address = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            Address: e.target.value,
          });
        }
      }
      if (id === "Address2") {
        warehouse.Address2 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Address2 = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Address2 = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            Address2: e.target.value,
          });
        }
      }
      if (id === "Address3") {
        warehouse.Address3 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Address3 = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Address3 = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            Address3: e.target.value,
          });
        }
      }
      if (id === "isEDI") {
        warehouse.IsEdi = e.target.checked;
        this.setState({ warehouse: warehouse });
      }
      if (id === "ediurl") {
        warehouse.Ediurl = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Ediurl = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Ediurl = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            Ediurl: e.target.value,
          });
        }
      }
      if (id === "ediloginid") {
        warehouse.EdiloginId = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.EdiloginId = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.EdiloginId = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            EdiloginId: e.target.value,
          });
        }
      }
      if (id === "edipassword") {
        warehouse.Edipassword = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Edipassword = {
            errorState: true,
            errorMssg: "Maximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Edipassword = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            warehouse: warehouse,
            Edipassword: e.target.value,
          });
        }
      }
    };

    const handleUpdate = () => {
      this.setState({ ProgressLoader: false });

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let warehouse = this.state.warehouse;
      const data = {
        validUser: ValidUser,
        WareHouse: warehouse,
      };

      let Url = APIURLS.APIURL.UpdateWareHouse;
      const headers = {
        "Content-Type": "application/json",
      };
      axios
        .post(Url, data, { headers })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.warehouseMaster + this.state.urlparams}
          masterLinkTitle="Warehouse Master"
          typoTitle="Edit Warehouse"
          level={2}
        />
      </Fragment>
    );

    const buttongroupHtml = (
      <Fragment>
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="Action Menu Button group"
        >
          <Button
            startIcon={APIURLS.buttonTitle.save.icon}
            className="action-btns"
            onClick={(e) => handleUpdate()}
            disabled={this.state.DisableUpdatebtn}
          >
            {APIURLS.buttonTitle.save.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />
        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

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
                                value={this.state.warehouse.Code}
                                // defaultValue={this.state.Code}
                                error={this.state.Validations.Code.errorState}
                                helperText={
                                  this.state.Validations.Code.errorMssg
                                }
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
                                value={this.state.warehouse.Description}
                                error={
                                  this.state.Validations.Description.errorState
                                }
                                helperText={
                                  this.state.Validations.Description.errorMssg
                                }
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
                                value={this.state.warehouse.ContactPerson}
                                error={
                                  this.state.Validations.ContactPerson
                                    .errorState
                                }
                                helperText={
                                  this.state.Validations.ContactPerson.errorMssg
                                }
                              />

                              <Tablerowcelltextboxinput
                                type="number"
                                id="phoneNo"
                                label="Phone No"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("phoneNo", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.warehouse.PhoneNo}
                                error={
                                  this.state.Validations.PhoneNo.errorState
                                }
                                helperText={
                                  this.state.Validations.PhoneNo.errorMssg
                                }
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
                                onChange={(e) => updateFormValue("EmailID", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.warehouse.EmailId}
                                error={
                                  this.state.Validations.EmailId.errorState
                                }
                                helperText={
                                  this.state.Validations.EmailId.errorMssg
                                }
                              />

                              <Tablerowcelltextboxinput
                                id="Address"
                                label="Address Line 1"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 10,
                                }}
                                value={this.state.warehouse.Address}
                                error={
                                  this.state.Validations.Address.errorState
                                }
                                helperText={
                                  this.state.Validations.Address.errorMssg
                                }
                              />

                              <Tablerowcelltextboxinput
                                id="Address2"
                                label="Address Line 2"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address2", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 10,
                                }}
                                value={this.state.warehouse.Address2}
                                error={
                                  this.state.Validations.Address2.errorState
                                }
                                helperText={
                                  this.state.Validations.Address2.errorMssg
                                }
                              />

                              <Tablerowcelltextboxinput
                                id="Address3"
                                label="Address Line 3"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address3", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 10,
                                }}
                                value={this.state.warehouse.Address3}
                                error={
                                  this.state.Validations.Address3.errorState
                                }
                                helperText={
                                  this.state.Validations.Address3.errorMssg
                                }
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
                                    checked={
                                      this.state.warehouse.IsActive
                                        ? this.state.warehouse.IsActive === true
                                          ? "checked"
                                          : "unchecked"
                                        : null
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
                                    checked={
                                      this.state.warehouse.IsEdi
                                        ? this.state.warehouse.IsEdi === true
                                          ? "checked"
                                          : "unchecked"
                                        : null
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
                                value={this.state.warehouse.Ediurl}
                                error={this.state.Validations.Ediurl.errorState}
                                helperText={
                                  this.state.Validations.Ediurl.errorMssg
                                }
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
                                value={this.state.warehouse.EdiloginId}
                                error={
                                  this.state.Validations.EdiloginId.errorState
                                }
                                helperText={
                                  this.state.Validations.EdiloginId.errorMssg
                                }
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
                                value={this.state.warehouse.Edipassword}
                                error={
                                  this.state.Validations.Edipassword.errorState
                                }
                                helperText={
                                  this.state.Validations.Edipassword.errorMssg
                                }
                              />
                              {/*<TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b> EDI Url</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="ediurl"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('ediurl', e)}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss",
                                                                                maxlength: 10
                                                                            }}
                                                                            value={this.state.warehouse.Ediurl}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                            </TableBody>
                                                        </Table>
                                                    </TableContainer>
                                                </Grid>
                                                <Grid xs={12} sm={12} md={6} lg={6}>
                                                    <TableContainer>
                                                        <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                                            <TableBody className="tableBody">
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b> EDI LoginID</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="ediloginid"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('ediloginid', e)}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss",
                                                                                maxlength: 10
                                                                            }}
                                                                            value={this.state.warehouse.EdiloginId}

                                                                        />
                                                                    </TableCell>
                                                                </TableRow>
                                                                <TableRow>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <b> EDI Password</b>
                                                                    </TableCell>
                                                                    <TableCell align="left" className="no-border-table">
                                                                        <TextField
                                                                            id="edipassword"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => updateFormValue('edipassword', e)}
                                                                            fullWidth
                                                                            InputProps={{
                                                                                className: "textFieldCss",
                                                                                maxlength: 10
                                                                            }}
                                                                            value={this.state.warehouse.Edipassword}
                                                                        />
                                                                    </TableCell>
                                                                </TableRow> */}
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
      </Fragment>
    );
  }
}
export default editwarehouse;
