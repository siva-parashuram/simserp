import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import IconButton from "@mui/material/IconButton";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import SwitchInput from "../../../compo/tablerowcellswitchinput";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";

import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Loader from "../../../compo/loader";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";

class addresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      FullSmallBtnArea: false,
      mainframeW: 12,
      hideSidePanel: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      AddbtnDisable: true,
      GeneralDetailsExpanded: true,
      countryData: [],
      stateData: [],
      AddressData: [],
      stateForm: null,
      process: "",
      listStateCustomerAddresses: null,
      type: "ADD",

      UpdateCustomerAddress: {
        AddressID: 0,
        CustID: this.props.CustID,
        AddressType: 0,
        Code: "",
        Name: "",
        Address: "",
        Address2: "",
        Address3: "",
        City: "",
        PostCode: "",
        CountryID: 0,
        StateID: 0,
        ContactPerson: "",
        PhoneNo: "",
        EmailID: "",
        VATNo: "",
        GSTNo: "",
        EORINo: "",
        TSSNo: "",
        IsBlock: false,
        IncoID: 0,
        ShipmentModeID: 0,
        PostOfDischarge: "",
        FinalDestination: "",
        SpecialInstruction: "",
      },
      CustomerAddress: {
        AddressID: 0,
        CustID: this.props.CustID,
        AddressType: 0,
        Code: "",
        Name: "",
        Address: "",
        Address2: "",
        Address3: "",
        City: "",
        PostCode: "",
        CountryID: 0,
        StateID: 0,
        ContactPerson: "",
        PhoneNo: "",
        EmailID: "",
        VATNo: "",
        GSTNo: "",
        EORINo: "",
        TSSNo: "",
        IsBlock: false,
        IncoID: 0,
        ShipmentModeID: 0,
        PostOfDischarge: "",
        FinalDestination: "",
        SpecialInstruction: "",
      },
      updateBtnDisabled: false,
      Validations: {
        CustomerAddress: {
          Code: { errorState: false, errorMssg: "" },
          Name: { errorState: false, errorMssg: "" },
          Address: { errorState: false, errorMssg: "" },
          Address2: { errorState: false, errorMssg: "" },
          Address3: { errorState: false, errorMssg: "" },
          City: { errorState: false, errorMssg: "" },
          PostCode: { errorState: false, errorMssg: "" },

          ContactPerson: { errorState: false, errorMssg: "" },
          PhoneNo: { errorState: false, errorMssg: "" },
          EmailID: { errorState: false, errorMssg: "" },
          VATNo: { errorState: false, errorMssg: "" },
          GSTNo: { errorState: false, errorMssg: "" },
          EORINo: { errorState: false, errorMssg: "" },
          TSSNo: { errorState: false, errorMssg: "" },

          PostOfDischarge: { errorState: false, errorMssg: "" },
          FinalDestination: { errorState: false, errorMssg: "" },
          SpecialInstruction: { errorState: false, errorMssg: "" },
        },
        UpdateCustomerAddress: {
          Code: { errorState: false, errorMssg: "" },
          Name: { errorState: false, errorMssg: "" },
          Address: { errorState: false, errorMssg: "" },
          Address2: { errorState: false, errorMssg: "" },
          Address3: { errorState: false, errorMssg: "" },
          City: { errorState: false, errorMssg: "" },
          PostCode: { errorState: false, errorMssg: "" },

          ContactPerson: { errorState: false, errorMssg: "" },
          PhoneNo: { errorState: false, errorMssg: "" },
          EmailID: { errorState: false, errorMssg: "" },
          VATNo: { errorState: false, errorMssg: "" },
          GSTNo: { errorState: false, errorMssg: "" },
          EORINo: { errorState: false, errorMssg: "" },
          TSSNo: { errorState: false, errorMssg: "" },

          PostOfDischarge: { errorState: false, errorMssg: "" },
          FinalDestination: { errorState: false, errorMssg: "" },
          SpecialInstruction: { errorState: false, errorMssg: "" },
        },
      },
    };
  }

  componentDidMount() {
    this.getCountryList();
    this.getStateList();
    this.getCustomerAddress();
    this.getCustomers();
  }

  getCustomers = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllCustomer;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Name,
            value: data[i].CustID,
          };
          newD.push(o);
        }
        this.setState({ customerData: newD, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ customerData: [], ProgressLoader: true });
      });
  };

  getCustomerAddress = () => {
    console.log("Props >CustID > ",this.props.CustID);
    console.log("Refreshing");
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };

    let Url = APIURLS.APIURL.GetAllCustomerAddressByCustID;
    let data={
      ValidUser:ValidUser,
      Customer:{
        CustID:this.props.CustID
      }
    };

    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        console.log("dataAddress>>", data);

        this.setState({ AddressData: data, ProgressLoader: true }, () => {
          this.setState({
            listStateCustomerAddresses: this.listCustomerAddresses(),
            stateForm: this.stateForm(),
          });
        });
        // this.InitialhandleRowClick(null, data[0], "row_0");
      })
      .catch((error) => {
        this.setState({ AddressData: [], ProgressLoader: true });
      });
  };

  getCountryList = () => {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCountryUrl = APIURLS.APIURL.GetCountries;

    axios
      .post(GetCountryUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        let newData = [];
        for (let i = 0; i < data.length; i++) {
          let d = {
            name: data[i].name,
            value: data[i].countryId,
          };
          newData.push(d);
        }
        this.setState({ countryData: newData, ProgressLoader: true });
      })
      .catch((error) => {});
  };

  getStateList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetStatesUrl = APIURLS.APIURL.GetStates;

    axios
      .post(GetStatesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        let newData = [];
        for (let i = 0; i < data.length; i++) {
          let d = {
            name: data[i].name,
            value: data[i].stateId,
          };
          newData.push(d);
        }
        this.setState({ stateData: newData, ProgressLoader: true });
      })
      .catch((error) => {});
  };

  stateForm = () => {
    let o = (
      <div
        style={{
          height: 500,
          overflowY: "scroll",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        <Grid container spacing={0}>
          <Grid style={{ paddingTop: 10 }} container spacing={0}>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <Button
                className="action-btns"
                style={{ marginLeft: 10 }}
                onClick={(e) => this.AddNew(e)}
                disabled={this.state.AddbtnDisable}
              >
                {APIURLS.buttonTitle.add}
              </Button>
            </Grid>
          </Grid>
          <div style={{ height: 10 }}>&nbsp;</div>

          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Accordion
                    key="customerAddress-General-Details"
                    expanded={this.state.GeneralDetailsExpanded}
                  >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) =>
                            this.handleAccordionClick(
                              "GeneralDetailsExpanded",
                              e
                            )
                          }
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: "40px", maxHeight: "40px" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        General Details
                      </Typography>
                    </AccordionSummary>

                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="customerAddress List table"
                            >
                              <TableBody className="tableBody">
                                <DropdownInput
                                  id="AddressType"
                                  label="AddressType"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "AddressType",
                                      e,
                                      "ADD"
                                    )
                                  }
                                  value={this.state.CustomerAddress.AddressType}
                                  options={APIURLS.AddressType}
                                  isMandatory={true}
                                />
                                <TextboxInput
                                  id="Code"
                                  label="Code"
                                  onChange={(e) =>
                                    this.updateFormValue("Code", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  isMandatory={true}
                                  value={this.state.CustomerAddress.Code}
                                  error={
                                    this.state.Validations.CustomerAddress.Code
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress.Code
                                      .errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="Name"
                                  label="Name"
                                  onChange={(e) =>
                                    this.updateFormValue("Name", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.Name}
                                  error={
                                    this.state.Validations.CustomerAddress.Name
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress.Name
                                      .errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="Address"
                                  label="Address"
                                  onChange={(e) =>
                                    this.updateFormValue("Address", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.Address}
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .Address.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .Address.errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="Address2"
                                  label="Address2"
                                  onChange={(e) =>
                                    this.updateFormValue("Address2", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.Address2}
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .Address2.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .Address2.errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="Address3"
                                  label="Address3"
                                  onChange={(e) =>
                                    this.updateFormValue("Address3", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.Address3}
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .Address3.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .Address3.errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="City"
                                  label="City"
                                  onChange={(e) =>
                                    this.updateFormValue("City", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.City}
                                  error={
                                    this.state.Validations.CustomerAddress.City
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress.City
                                      .errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="PostCode"
                                  label="PostCode"
                                  onChange={(e) =>
                                    this.updateFormValue("PostCode", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.PostCode}
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .PostCode.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .PostCode.errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="TSSNo"
                                  label="TSSNo"
                                  onChange={(e) =>
                                    this.updateFormValue("TSSNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.TSSNo}
                                  error={
                                    this.state.Validations.CustomerAddress.TSSNo
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress.TSSNo
                                      .errorMssg
                                  }
                                />
                                <SwitchInput
                                  key="IsBlock"
                                  id="IsBlock"
                                  label="IsBlock"
                                  param={this.state.CustomerAddress.IsBlock}
                                  onChange={(e) =>
                                    this.updateFormValue("IsBlock", e, "ADD")
                                  }
                                  value={this.state.CustomerAddress.IsBlock}
                                />
                                <DropdownInput
                                  id="IncoID"
                                  label="IncoID"
                                  onChange={(e) =>
                                    this.updateFormValue("IncoID", e, "ADD")
                                  }
                                  // options={}
                                  value={this.state.CustomerAddress.IncoID}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="customerAddress List table"
                            >
                              <TableBody className="tableBody">
                                <DropdownInput
                                  id="CountryID"
                                  label="Country"
                                  onChange={(e) =>
                                    this.updateFormValue("CountryID", e, "ADD")
                                  }
                                  options={this.state.countryData}
                                  isMandatory={true}
                                  value={this.state.CustomerAddress.CountryID}
                                />
                                <DropdownInput
                                  id="StateID"
                                  label="State"
                                  onChange={(e) =>
                                    this.updateFormValue("StateID", e, "ADD")
                                  }
                                  options={this.state.stateData}
                                  value={this.state.CustomerAddress.StateID}
                                />
                                <TextboxInput
                                  id="ContactPerson"
                                  label="Contact Person"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "ContactPerson",
                                      e,
                                      "ADD"
                                    )
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={
                                    this.state.CustomerAddress.ContactPerson
                                  }
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .ContactPerson.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .ContactPerson.errorMssg
                                  }
                                />
                                <TextboxInput
                                  type="number"
                                  id="PhoneNo"
                                  label="Phone No "
                                  onChange={(e) =>
                                    this.updateFormValue("PhoneNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.PhoneNo}
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .PhoneNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .PhoneNo.errorMssg
                                  }
                                />

                                <TextboxInput
                                  id="EmailID"
                                  label="Email ID"
                                  onChange={(e) =>
                                    this.updateFormValue("EmailID", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.EmailID}
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .EmailID.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .EmailID.errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="VATNo"
                                  label="VATNo"
                                  onChange={(e) =>
                                    this.updateFormValue("VATNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.VATNo}
                                  error={
                                    this.state.Validations.CustomerAddress.VATNo
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress.VATNo
                                      .errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="GSTNo"
                                  label="GSTNo"
                                  onChange={(e) =>
                                    this.updateFormValue("GSTNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.GSTNo}
                                  error={
                                    this.state.Validations.CustomerAddress.GSTNo
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress.GSTNo
                                      .errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="EORINo"
                                  label="EORINo"
                                  onChange={(e) =>
                                    this.updateFormValue("EORINo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.EORINo}
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .EORINo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .EORINo.errorMssg
                                  }
                                />
                                <DropdownInput
                                  id="ShipmentModeID"
                                  label="ShipmentModeID"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "ShipmentModeID",
                                      e,
                                      "ADD"
                                    )
                                  }
                                  // options={}
                                  value={
                                    this.state.CustomerAddress.ShipmentModeID
                                  }
                                />
                                <TextboxInput
                                  id="PostOfDischarge"
                                  label="Post Of Discharge"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "PostOfDischarge",
                                      e,
                                      "ADD"
                                    )
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={
                                    this.state.CustomerAddress.PostOfDischarge
                                  }
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .PostOfDischarge.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .PostOfDischarge.errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="FinalDestination"
                                  label="Final Destination"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "FinalDestination",
                                      e,
                                      "ADD"
                                    )
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={
                                    this.state.CustomerAddress.FinalDestination
                                  }
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .FinalDestination.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .FinalDestination.errorMssg
                                  }
                                />
                                <TextboxInput
                                  id="SpecialInstruction"
                                  label="Special Instruction"
                                  onChange={(e) =>
                                    this.updateFormValue(
                                      "SpecialInstruction",
                                      e,
                                      "ADD"
                                    )
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={
                                    this.state.CustomerAddress
                                      .SpecialInstruction
                                  }
                                  error={
                                    this.state.Validations.CustomerAddress
                                      .SpecialInstruction.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CustomerAddress
                                      .SpecialInstruction.errorMssg
                                  }
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
        </Grid>
      </div>
    );
    return o;
  };

  listCustomerAddresses = () => {
    let o = (
      <Fragment>
        <div
          style={{
            height: 500,
            overflowY: "scroll",
            overflowX: "hidden",
            width: "100%",
          }}
        >
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Table
                stickyHeader
                size="small"
                className=""
                aria-label="CustomerAddress List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>
                    <TableCell className="table-header-font">
                      Address Type
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Name
                    </TableCell>
                    <TableCell className="table-header-font">Address</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {this.getPageData(this.state.AddressData).map((item, i) => (
                    <TableRow
                      id={"row_" + i}
                      key={i}
                      onClick={(event) =>
                        this.handleRowClick(event, item, "row_" + i)
                      }
                    >
                      <TableCell> {i + 1}</TableCell>
                      <TableCell align="left">
                        {this.getAddressTypeName(item.AddressType)}
                      </TableCell>
                      <TableCell> {item.Name}</TableCell>

                      <TableCell align="left">
                        {item.Address},{item.Address2},{item.Address3}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              <TablePagination
                rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
                component="div"
                count={this.state.AddressData.length}
                rowsPerPage={this.state.pagination.rowsPerPage}
                page={this.state.pagination.page}
                onPageChange={this.handlePageChange}
              />
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );

    return o;
  };

  getAddressTypeName = (id) => {
    let name = APIURLS.AddressType;
    for (let i = 0; i < name.length; i++) {
      if (id === name[i].value) {
        return name[i].name;
      }
    }
  };

  handleAccordionClick = (val, e) => {
    if (val === "GeneralDetailsExpanded") {
      this.state.GeneralDetailsExpanded === true
        ? this.setState({ GeneralDetailsExpanded: false })
        : this.setState({ GeneralDetailsExpanded: true });
    }
  };

  checkCode = () => {
    if (this.state.process === "EDIT") {
      if (
        this.state.UpdateCustomerAddress.Code === "" ||
        this.state.UpdateCustomerAddress.Code.length > 10
      ) {
        this.setState({ updateBtnDisabled: true });
      }
    } else if (this.state.process === "ADD") {
      if (
        this.state.CustomerAddress.Code === "" ||
        this.state.CustomerAddress.Code.length > 10
      ) {
        this.setState({ AddbtnDisable: true });
      }
    } else {
    }
  };

  updateFormValue = (param, e, process) => {
    console.log("Display");
    let CustomerAddress = {};

    if (process === "EDIT") {
      CustomerAddress = this.state.UpdateCustomerAddress;
      this.setState({ process: "EDIT" });
    } else {
      CustomerAddress = this.state.CustomerAddress;
      this.setState({ process: "ADD" });
    }

    switch (param) {
      case "AddressType":
        CustomerAddress[param] = CF.toInt(e.target.value);

        break;
      case "Code":
        CustomerAddress[param] = e.target.value;
        let v1 = this.state.Validations;
        if (e.target.value === "" || e.target.value.length > 10) {
          if (e.target.value === "") {
            if (process === "EDIT") {
              v1.UpdateCustomerAddress.Code = {
                errorState: true,
                errorMssg: "Cannot be blank",
              };
              this.setState({ Validations: v1, updateBtnDisabled: true });
            } else {
              v1.CustomerAddress.Code = {
                errorState: true,
                errorMssg: "Cannot be blank",
              };
              this.setState({ Validations: v1, AddbtnDisable: true });
            }
          }
          if (e.target.value.length > 10) {
            if (process === "EDIT") {
              v1.UpdateCustomerAddress.Code = {
                errorState: true,
                errorMssg: "Maximum 10 characters allowed",
              };
              this.setState({ Validations: v1, updateBtnDisabled: true });
            } else {
              v1.CustomerAddress.Code = {
                errorState: true,
                errorMssg: "Maximum 10 characters allowed",
              };
              this.setState({ Validations: v1, AddbtnDisable: true });
            }
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v1.UpdateCustomerAddress.Code = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v1, updateBtnDisabled: false });
          } else {
            v1.CustomerAddress.Code = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v1, AddbtnDisable: false });
          }
        }
        this.setParams(CustomerAddress, process);

        break;
      case "Name":
        CustomerAddress[param] = e.target.value;
        let v2 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v2.UpdateCustomerAddress.Name = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.CustomerAddress.Name = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v2 });
          }
        } else {
          if (process === "EDIT") {
            v2.UpdateCustomerAddress.Name = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.CustomerAddress.Name = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v2 });
          }
          this.setParams(CustomerAddress, process);
        }
       
        this.checkCode();
        break;
      case "Address":
        CustomerAddress[param] = e.target.value;
        let v3 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v3.UpdateCustomerAddress.Address = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v3 });
          } else {
            v3.CustomerAddress.Address = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v3 });
          }
        } else {
          if (process === "EDIT") {
            v3.UpdateCustomerAddress.Address = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v3 });
          } else {
            v3.CustomerAddress.Address = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v3 });
          }
        }
        this.setParams(CustomerAddress, process);
        break;
        this.checkCode();
      case "Address2":
        CustomerAddress[param] = e.target.value;
        let v4 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v4.UpdateCustomerAddress.Address2 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v4 });
          } else {
            v4.CustomerAddress.Address2 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v4 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v4.UpdateCustomerAddress.Address2 = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v4 });
          } else {
            v4.CustomerAddress.Address2 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v4 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "Address3":
        CustomerAddress[param] = e.target.value;
        let v5 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v5.UpdateCustomerAddress.Address3 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v5 });
          } else {
            v5.CustomerAddress.Address3 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v5 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v5.UpdateCustomerAddress.Address3 = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v5 });
          } else {
            v5.CustomerAddress.Address3 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v5 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "City":
        CustomerAddress[param] = e.target.value;
        let v6 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v6.UpdateCustomerAddress.City = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v6 });
          } else {
            v6.CustomerAddress.City = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v6 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v6.UpdateCustomerAddress.City = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v6 });
          } else {
            v6.CustomerAddress.City = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v6 });
          }
        }
        this.setParams(CustomerAddress, process);
        break;
        this.checkCode();
      case "PostCode":
        CustomerAddress[param] = e.target.value;
        let v7 = this.state.Validations;
        if (e.target.value.length > 10) {
          if (process === "EDIT") {
            v7.UpdateCustomerAddress.PostCode = {
              errorState: true,
              errorMssg: "Maximum 10 characters allowed",
            };
            this.setState({ Validations: v7 });
          } else {
            v7.CustomerAddress.PostCode = {
              errorState: true,
              errorMssg: "Maximum 10 characters allowed",
            };
            this.setState({ Validations: v7 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v7.UpdateCustomerAddress.PostCode = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v7 });
          } else {
            v7.CustomerAddress.PostCode = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v7 });
          }
        }
        this.setParams(CustomerAddress, process);
        break;
        this.checkCode();
      case "CountryID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "StateID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "ContactPerson":
        CustomerAddress[param] = e.target.value;
        let v8 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v8.UpdateCustomerAddress.ContactPerson = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v8 });
          } else {
            v8.CustomerAddress.ContactPerson = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v8 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v8.UpdateCustomerAddress.ContactPerson = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v8 });
          } else {
            v8.CustomerAddress.ContactPerson = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v8 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "PhoneNo":
        CustomerAddress[param] = CF.toInt(e.target.value);
        let v9 = this.state.Validations;
        if (e.target.value.length > 20) {
          if (process === "EDIT") {
            v9.UpdateCustomerAddress.PhoneNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v9 });
          } else {
            v9.CustomerAddress.PhoneNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v9 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v9.UpdateCustomerAddress.PhoneNo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v9 });
          } else {
            v9.CustomerAddress.PhoneNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v9 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "EmailID":
        CustomerAddress[param] = e.target.value;
        let v10 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v10.UpdateCustomerAddress.EmailID = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v10 });
          } else {
            v10.CustomerAddress.EmailID = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v10 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v10.UpdateCustomerAddress.EmailID = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v10 });
          } else {
            v10.CustomerAddress.EmailID = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v10 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "VATNo":
        CustomerAddress[param] = e.target.value;
        let v11 = this.state.Validations;
        if (e.target.value.length > 20) {
          if (process === "EDIT") {
            v11.UpdateCustomerAddress.VATNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v11 });
          } else {
            v11.CustomerAddress.VATNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v11 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v11.UpdateCustomerAddress.VATNo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v11 });
          } else {
            v11.CustomerAddress.VATNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v11 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "GSTNo":
        CustomerAddress[param] = e.target.value;
        let v12 = this.state.Validations;
        if (e.target.value.length > 20) {
          if (process === "EDIT") {
            v12.UpdateCustomerAddress.GSTNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v12 });
          } else {
            v12.CustomerAddress.GSTNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v12 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v12.UpdateCustomerAddress.GSTNo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v12 });
          } else {
            v12.CustomerAddress.GSTNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v12 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "EORINo":
        CustomerAddress[param] = e.target.value;
        let v13 = this.state.Validations;
        if (e.target.value.length > 20) {
          if (process === "EDIT") {
            v13.UpdateCustomerAddress.EORINo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v13 });
          } else {
            v13.CustomerAddress.EORINo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v13 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v13.UpdateCustomerAddress.EORINo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v13 });
          } else {
            v13.CustomerAddress.EORINo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v13 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "TSSNo":
        CustomerAddress[param] = e.target.value;
        let v14 = this.state.Validations;
        if (e.target.value.length > 20) {
          if (process === "EDIT") {
            v14.UpdateCustomerAddress.TSSNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v14 });
          } else {
            v14.CustomerAddress.TSSNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v14 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v14.UpdateCustomerAddress.TSSNo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v14 });
          } else {
            v14.CustomerAddress.TSSNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v14 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "IsBlock":
        CustomerAddress[param] = e.target.checked;
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "IncoID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "ShipmentModeID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "PostOfDischarge":
        CustomerAddress[param] = e.target.value;
        let v15 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v15.UpdateCustomerAddress.PostOfDischarge = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v15 });
          } else {
            v15.CustomerAddress.PostOfDischarge = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v15 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v15.UpdateCustomerAddress.PostOfDischarge = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v15 });
          } else {
            v15.CustomerAddress.PostOfDischarge = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v15 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "FinalDestination":
        CustomerAddress[param] = e.target.value;
        let v16 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v16.UpdateCustomerAddress.FinalDestination = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v16 });
          } else {
            v16.CustomerAddress.FinalDestination = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v16 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v16.UpdateCustomerAddress.FinalDestination = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v16 });
          } else {
            v16.CustomerAddress.FinalDestination = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v16 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;
      case "SpecialInstruction":
        CustomerAddress[param] = e.target.value;
        let v17 = this.state.Validations;
        if (e.target.value.length > 250) {
          if (process === "EDIT") {
            v17.UpdateCustomerAddress.SpecialInstruction = {
              errorState: true,
              errorMssg: "Maximum 250 characters allowed",
            };
            this.setState({ Validations: v17 });
          } else {
            v17.CustomerAddress.SpecialInstruction = {
              errorState: true,
              errorMssg: "Maximum 250 characters allowed",
            };
            this.setState({ Validations: v17 });
          }
        } else {
          CustomerAddress[param] = e.target.value;
          if (process === "EDIT") {
            v17.UpdateCustomerAddress.SpecialInstruction = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v17 });
          } else {
            v17.CustomerAddress.SpecialInstruction = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v17 });
          }
        }
        this.setParams(CustomerAddress, process);
        this.checkCode();
        break;

      default:
        break;
    }
  };

  setParams = (object, process) => {
    if (process === "EDIT") {
      this.setState({ UpdateCustomerAddress: object });
    } else {
      this.setState({ CustomerAddress: object }, () => {
        this.setState({
          stateForm: this.stateForm(),
        });
      });
    }
  };

  AddNew = (e) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.CreateCustomerAddress;
    let reqData = {
      ValidUser: ValidUser,
      CustomerAddress: this.state.CustomerAddress,
    };

    console.log("ReqData>>>", reqData);

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          let CustomerAddress = {
            AddressID: 0,
            CustID: 0,
            AddressType: 0,
            Code: "",
            Name: "",
            Address: "",
            Address2: "",
            Address3: "",
            City: "",
            PostCode: "",
            CountryID: 0,
            StateID: 0,
            ContactPerson: "",
            PhoneNo: "",
            EmailID: "",
            VATNo: "",
            GSTNo: "",
            EORINo: "",
            TSSNo: "",
            IsBlock: false,
            IncoID: 0,
            ShipmentModeID: 0,
            PostOfDischarge: "",
            FinalDestination: "",
            SpecialInstruction: "",
          };
          this.setState(
            {
              CustomerAddress: CustomerAddress,
              ErrorPrompt: false,
              SuccessPrompt: true,
            },
            () => {
              this.getCustomerAddress();
            }
          );
        } else {
          this.setState({ ErrorPrompt: true, SuccessPrompt: false });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true });
      });
  };

  //  setStateParam = (validations, key, value) => {
  //   console.log("validations > ", validations);
  //   console.log("key > ", key);
  //   console.log("value > ", value);
  //   if (
  //     Object.keys(validations).length === 0 &&
  //     validations.constructor === Object
  //   ) {
  //     console.log("validations is Empty ");
  //     this.setState({ [key]: value });
  //   } else {
  //     if (validations.validate) {
  //       !validations.isEmpty
  //         ? validations.isNumber
  //           ? this.setState({ [key]: value })
  //           : this.setState({ [key]: 0 })
  //         : this.setState({ [key]: 0 });
  //     } else {
  //       this.setState({ [key]: value });
  //     }
  //   }
  // };

  UpdateCustomerAddress = (e) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.UpdateCustomerAddress;
    let reqData = {
      ValidUser: ValidUser,
      CustomerAddress: this.state.UpdateCustomerAddress,
    };

    console.log("ReqData>>>", reqData);

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          this.setState({
            ErrorPrompt: false,
            SuccessPrompt: true,
          });
        } else {
          this.setState({ ErrorPrompt: true, SuccessPrompt: false });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true });
      });
  };

  InitialhandleRowClick(e, item, id) {
    this.setState({
      UpdateCustomerAddress: item,
    });

    this.removeIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  handleRowClick = (e, item, id) => {
    try {
      this.setState(
        {
          UpdateCustomerAddress: item,
          FullSmallBtnArea: true,
          hideSidePanel: true,
        },
        () => {
          this.closeExpandFull(null);
        }
      );
      console.log("addressId>>", this.state.CustomerAddress.AddressID);
      this.removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    } catch (ex) {}
  };

  removeIsSelectedRowClasses = () => {
    try {
      for (let i = 0; i < this.state.AddressData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  expandFull = (e) => {
    this.setState({
      mainframeW: 12,
      hideSidePanel: true,
    });
  };

  closeExpandFull = (e) => {
    this.setState({
      mainframeW: 8,
      hideSidePanel: false,
    });
  };

  getPageData = (data) => {
    let rows = data;
    let page = parseInt(this.state.pagination.page);
    let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  handlePageChange = (event, newPage) => {
    console.log("handlePageChange > event > ", event);
    console.log("handlePageChange > newPage > ", newPage);
    let pagination = this.state.pagination;
    pagination.page = newPage;
    this.setState({ pagination: pagination }, () => {
      this.setState({
        listStateCustomerAddresses: this.listCustomerAddresses(),
      });
    });
  };

  render() {
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

    return (
      <Fragment>
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <div style={{ marginTop: -25 }}>
          <Grid container spacing={6}>
            <Grid item xs={12} sm={12} md={11} lg={11}>
              &nbsp;
            </Grid>
            <Grid item xs={12} sm={12} md={1} lg={1}>
              {this.state.FullSmallBtnArea === true ? (
                <div>
                  {this.state.hideSidePanel === false ? (
                    <IconButton
                      aria-label="OpenInFullIcon"
                      onClick={(e) => this.expandFull(e)}
                    >
                      <OpenInFullIcon
                        className="openfullbtn"
                        fontSize="small"
                      />
                    </IconButton>
                  ) : null}
                  {this.state.hideSidePanel === true ? (
                    <IconButton
                      aria-label="CloseFullscreenIcon"
                      onClick={(e) => this.closeExpandFull(e)}
                    >
                      <CloseFullscreenIcon
                        className="openfullbtn"
                        fontSize="small"
                      />
                    </IconButton>
                  ) : null}
                </div>
              ) : null}
            </Grid>
          </Grid>
          <div style={{ height: 10 }}>&nbsp;</div>
          <Loader ProgressLoader={this.state.ProgressLoader} />
          <div style={{ height: 10 }}>&nbsp;</div>
          <Grid container spacing={0}>
            <Grid
              item
              xs={12}
              sm={12}
              md={this.state.mainframeW}
              lg={this.state.mainframeW}
            >
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Dualtabcomponent
                    tab1name="List"
                    tab2name={this.state.type === "EDIT" ? "EDIT" : "ADD"}
                    tab1Html={this.state.listStateCustomerAddresses}
                    tab2Html={this.state.stateForm}
                  />
                </Grid>
              </Grid>
            </Grid>
            {this.state.hideSidePanel === false ? (
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <div style={{ marginLeft: 10, marginTop: -5 }}>
                  <Grid container spacing={6}>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                      <div style={{ marginTop: -12, marginLeft: 1 }}>
                        <h4>Detail view</h4>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <div>
                        <Button
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          onClick={(e) => this.UpdateCustomerAddress(e)}
                          disabled={this.state.updateBtnDisabled}
                        >
                          {APIURLS.buttonTitle.update}
                        </Button>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <div
                        style={{
                          height: 500,
                          marginTop: 10,
                          overflowX: "hidden",
                          overflowY: "scroll",
                          width: "100%",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <div style={{ height: 20 }}>&nbsp;</div>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="customerAddress List table"
                        >
                          <TableBody className="tableBody">
                            <DropdownInput
                              id="AddressType"
                              label="AddressType"
                              onChange={(e) =>
                                this.updateFormValue("AddressType", e, "EDIT")
                              }
                              value={
                                this.state.UpdateCustomerAddress.AddressType
                              }
                              options={APIURLS.AddressType}
                              isMandatory={true}
                            />
                            <TextboxInput
                              id="Code"
                              label="Code"
                              onChange={(e) =>
                                this.updateFormValue("Code", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              isMandatory={true}
                              value={this.state.UpdateCustomerAddress.Code}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .Code.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .Code.errorMssg
                              }
                            />
                            <TextboxInput
                              id="Name"
                              label="Name"
                              onChange={(e) =>
                                this.updateFormValue("Name", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.Name}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .Name.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .Name.errorMssg
                              }
                            />
                            <TextboxInput
                              id="Address"
                              label="Address"
                              onChange={(e) =>
                                this.updateFormValue("Address", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.Address}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .Address.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .Address.errorMssg
                              }
                            />
                            <TextboxInput
                              id="Address2"
                              label="Address2"
                              onChange={(e) =>
                                this.updateFormValue("Address2", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.Address2}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .Address2.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .Address2.errorMssg
                              }
                            />
                            <TextboxInput
                              id="Address3"
                              label="Address3"
                              onChange={(e) =>
                                this.updateFormValue("Address3", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.Address3}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .Address3.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .Address3.errorMssg
                              }
                            />
                            <TextboxInput
                              id="City"
                              label="City"
                              onChange={(e) =>
                                this.updateFormValue("City", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.City}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .City.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .City.errorMssg
                              }
                            />
                            <TextboxInput
                              id="PostCode"
                              label="PostCode"
                              onChange={(e) =>
                                this.updateFormValue("PostCode", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.PostCode}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .PostCode.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .PostCode.errorMssg
                              }
                            />
                            <TextboxInput
                              id="TSSNo"
                              label="TSSNo"
                              onChange={(e) =>
                                this.updateFormValue("TSSNo", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.TSSNo}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .TSSNo.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .TSSNo.errorMssg
                              }
                            />
                            <SwitchInput
                              key="IsBlock"
                              id="IsBlock"
                              label="IsBlock"
                              param={this.state.UpdateCustomerAddress.IsBlock}
                              onChange={(e) =>
                                this.updateFormValue("IsBlock", e, "EDIT")
                              }
                              value={this.state.UpdateCustomerAddress.IsBlock}
                            />
                            <DropdownInput
                              id="IncoID"
                              label="IncoID"
                              onChange={(e) =>
                                this.updateFormValue("IncoID", e, "EDIT")
                              }
                              // options={}
                              value={this.state.UpdateCustomerAddress.IncoID}
                            />
                            <DropdownInput
                              id="CountryID"
                              label="Country"
                              onChange={(e) =>
                                this.updateFormValue("CountryID", e, "EDIT")
                              }
                              options={this.state.countryData}
                              isMandatory={true}
                              value={this.state.UpdateCustomerAddress.CountryID}
                            />
                            <DropdownInput
                              id="StateID"
                              label="State"
                              onChange={(e) =>
                                this.updateFormValue("StateID", e, "EDIT")
                              }
                              options={this.state.stateData}
                              value={this.state.UpdateCustomerAddress.StateID}
                            />
                            <TextboxInput
                              id="ContactPerson"
                              label="Contact Person"
                              onChange={(e) =>
                                this.updateFormValue("ContactPerson", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={
                                this.state.UpdateCustomerAddress.ContactPerson
                              }
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .ContactPerson.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .ContactPerson.errorMssg
                              }
                            />
                            <TextboxInput
                              type="number"
                              id="PhoneNo"
                              label="Phone No "
                              onChange={(e) =>
                                this.updateFormValue("PhoneNo", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.PhoneNo}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .PhoneNo.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .PhoneNo.errorMssg
                              }
                            />

                            <TextboxInput
                              id="EmailID"
                              label="Email ID"
                              onChange={(e) =>
                                this.updateFormValue("EmailID", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.EmailID}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .EmailID.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .EmailID.errorMssg
                              }
                            />
                            <TextboxInput
                              id="VATNo"
                              label="VATNo"
                              onChange={(e) =>
                                this.updateFormValue("VATNo", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.VATNo}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .VATNo.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .VATNo.errorMssg
                              }
                            />
                            <TextboxInput
                              id="GSTNo"
                              label="GSTNo"
                              onChange={(e) =>
                                this.updateFormValue("GSTNo", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.GSTNo}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .GSTNo.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .GSTNo.errorMssg
                              }
                            />
                            <TextboxInput
                              id="EORINo"
                              label="EORINo"
                              onChange={(e) =>
                                this.updateFormValue("EORINo", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.EORINo}
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .EORINo.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .EORINo.errorMssg
                              }
                            />
                            <DropdownInput
                              id="ShipmentModeID"
                              label="ShipmentModeID"
                              onChange={(e) =>
                                this.updateFormValue(
                                  "ShipmentModeID",
                                  e,
                                  "EDIT"
                                )
                              }
                              // options={}
                              value={
                                this.state.UpdateCustomerAddress.ShipmentModeID
                              }
                            />
                            <TextboxInput
                              id="PostOfDischarge"
                              label="Post Of Discharge"
                              onChange={(e) =>
                                this.updateFormValue(
                                  "PostOfDischarge",
                                  e,
                                  "EDIT"
                                )
                              }
                              variant="outlined"
                              size="small"
                              value={
                                this.state.UpdateCustomerAddress.PostOfDischarge
                              }
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .PostOfDischarge.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .PostOfDischarge.errorMssg
                              }
                            />
                            <TextboxInput
                              id="FinalDestination"
                              label="Final Destination"
                              onChange={(e) =>
                                this.updateFormValue(
                                  "FinalDestination",
                                  e,
                                  "EDIT"
                                )
                              }
                              variant="outlined"
                              size="small"
                              value={
                                this.state.UpdateCustomerAddress
                                  .FinalDestination
                              }
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .FinalDestination.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .FinalDestination.errorMssg
                              }
                            />
                            <TextboxInput
                              id="SpecialInstruction"
                              label="Special Instruction"
                              onChange={(e) =>
                                this.updateFormValue(
                                  "SpecialInstruction",
                                  e,
                                  "EDIT"
                                )
                              }
                              variant="outlined"
                              size="small"
                              value={
                                this.state.UpdateCustomerAddress
                                  .SpecialInstruction
                              }
                              error={
                                this.state.Validations.UpdateCustomerAddress
                                  .SpecialInstruction.errorState
                              }
                              helperText={
                                this.state.Validations.UpdateCustomerAddress
                                  .SpecialInstruction.errorMssg
                              }
                            />
                          </TableBody>
                        </Table>
                        <div style={{ height: 20 }}>&nbsp;</div>
                      </div>
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            ) : null}
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default addresses;
