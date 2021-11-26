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
import BackdropLoader from "../../../compo/backdrop";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";
import SIB from "../../../compo/gridtextboxinput";
import SDIB from "../../../compo/griddropdowninput";
import SSIB from "../../../compo/gridswitchinput";
import SDBIB from "../../../compo/griddropdowninputwithbutton";

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
      SupplierData: [],
      countryData: [],
      stateData: [],
      AddressData: [],
      stateForm: null,
      process: "",
      listStateSupplierAddresses: null,
      type: "ADD",

      UpdateSupplierAddress: {
        AddressID: 0,
        SuplID: this.props.SuplID,
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

        IsBlock: false,

        SpecialInstruction: "",
      },
      SupplierAddress: {
        AddressID: 0,
        SuplID: this.props.SuplID,
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

        IsBlock: false,

        SpecialInstruction: "",
      },
      updateBtnDisabled: false,
      Validations: {
        SupplierAddress: {
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

          SpecialInstruction: { errorState: false, errorMssg: "" },
        },
        UpdateSupplierAddress: {
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

          SpecialInstruction: { errorState: false, errorMssg: "" },
        },
      },
    };
  }

  componentDidMount() {
    this.getCountryList();
    this.getStateList();
    this.getSupplierAddress();
    this.getSupplierList();
  }

  getSupplierList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplier;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        if (data.length > 0) {
          this.setState({ SupplierData: data, ProgressLoader: true }, () => {
            this.setState({
              listStateSupplierAddresses: this.listStateSupplierAddresses(),
              stateForm: this.stateForm(),
            });
          });
        } else {
          this.setState({ SupplierData: data, ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ SupplierData: [], ProgressLoader: true });
      });
  };

  getSupplierAddress = () => {
    console.log("Props >CustID > ", this.props.CustID);
    console.log("Refreshing");
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };

    let Url = APIURLS.APIURL.GetAllSupplierAddressBySuplID;
    let data = {
      ValidUser: ValidUser,
      SupplierAddress: {
        SuplID: this.props.SuplID,
      },
    };

    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        console.log("dataAddress>>", data);

        this.setState({ AddressData: data, ProgressLoader: true }, () => {
          this.setState({
            listStateSupplierAddresses: this.listStateSupplierAddresses(),
            stateForm: this.stateForm(),
          });
        });
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
            name: data[i].Name,
            value: data[i].CountryID,
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
                startIcon={APIURLS.buttonTitle.save.icon}
                className="action-btns"
                style={{ marginLeft: 10 }}
                onClick={(e) => this.AddNew(e)}
                disabled={this.state.AddbtnDisable}
              >
                {APIURLS.buttonTitle.save.name}
              </Button>
            </Grid>
          </Grid>
          <div style={{ height: 10 }}>&nbsp;</div>

          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Accordion
                    key="SupplierAddress-General-Details"
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
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <div>
                            <Grid container spacing={0}>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                                <SIB
                                  id="Code"
                                  label="Code"
                                  onChange={(e) =>
                                    this.updateFormValue("Code", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  isMandatory={true}
                                  value={this.state.SupplierAddress.Code}
                                  error={
                                    this.state.Validations.SupplierAddress.Code
                                      .errorState
                                  }
                                />
                                <SIB
                                  id="Name"
                                  label="Name"
                                  onChange={(e) =>
                                    this.updateFormValue("Name", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.Name}
                                  error={
                                    this.state.Validations.SupplierAddress.Name
                                      .errorState
                                  }
                                />
                                <SIB
                                  id="Address"
                                  label="Address"
                                  onChange={(e) =>
                                    this.updateFormValue("Address", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.Address}
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .Address.errorState
                                  }
                                />
                                <SIB
                                  id="Address2"
                                  label="Address2"
                                  onChange={(e) =>
                                    this.updateFormValue("Address2", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.Address2}
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .Address2.errorState
                                  }
                                />
                                <SIB
                                  id="Address3"
                                  label="Address3"
                                  onChange={(e) =>
                                    this.updateFormValue("Address3", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.Address3}
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .Address3.errorState
                                  }
                                />
                                <SIB
                                  id="City"
                                  label="City"
                                  onChange={(e) =>
                                    this.updateFormValue("City", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.City}
                                  error={
                                    this.state.Validations.SupplierAddress.City
                                      .errorState
                                  }
                                />
                                <SIB
                                  id="PostCode"
                                  label="PostCode"
                                  onChange={(e) =>
                                    this.updateFormValue("PostCode", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.PostCode}
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .PostCode.errorState
                                  }
                                />

                                <SSIB
                                  key="IsBlock"
                                  id="IsBlock"
                                  label="IsBlock"
                                  param={this.state.SupplierAddress.IsBlock}
                                  onChange={(e) =>
                                    this.updateFormValue("IsBlock", e, "ADD")
                                  }
                                  value={this.state.SupplierAddress.IsBlock}
                                />
                              </Grid>
                              <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                              <Grid item xs={12} sm={12} md={5} lg={5}>
                                <SDIB
                                  id="CountryID"
                                  label="Country"
                                  onChange={(e) =>
                                    this.updateFormValue("CountryID", e, "ADD")
                                  }
                                  param={this.state.countryData}
                                  isMandatory={true}
                                  value={this.state.SupplierAddress.CountryID}
                                />
                                <SDIB
                                  id="StateID"
                                  label="State"
                                  onChange={(e) =>
                                    this.updateFormValue("StateID", e, "ADD")
                                  }
                                  param={this.state.stateData}
                                  value={this.state.SupplierAddress.StateID}
                                />
                                <SIB
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
                                    this.state.SupplierAddress.ContactPerson
                                  }
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .ContactPerson.errorState
                                  }
                                />
                                <SIB
                                  id="PhoneNo"
                                  label="Phone No "
                                  onChange={(e) =>
                                    this.updateFormValue("PhoneNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.PhoneNo}
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .PhoneNo.errorState
                                  }
                                />

                                <SIB
                                  id="EmailID"
                                  label="Email ID"
                                  onChange={(e) =>
                                    this.updateFormValue("EmailID", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.EmailID}
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .EmailID.errorState
                                  }
                                />

                                <SIB
                                  id="VATNo"
                                  label="VATNo"
                                  onChange={(e) =>
                                    this.updateFormValue("VATNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.VATNo}
                                  error={
                                    this.state.Validations.SupplierAddress.VATNo
                                      .errorState
                                  }
                                />

                                <SIB
                                  id="GSTNo"
                                  label="GSTNo"
                                  onChange={(e) =>
                                    this.updateFormValue("GSTNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.SupplierAddress.GSTNo}
                                  error={
                                    this.state.Validations.SupplierAddress.GSTNo
                                      .errorState
                                  }
                                />

                                <SIB
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
                                    this.state.SupplierAddress
                                      .SpecialInstruction
                                  }
                                  error={
                                    this.state.Validations.SupplierAddress
                                      .SpecialInstruction.errorState
                                  }
                                />
                              </Grid>
                            </Grid>
                          </div>
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

  listStateSupplierAddresses = () => {
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
                aria-label="SupplierAddress List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>

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

                      <TableCell> {item.Name}</TableCell>

                      <TableCell align="left">
                        {item.Address} {item.Address2} {item.Address3}
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

  updateFormValue = (param, e, process) => {
    console.log("Display");
    let SupplierAddress = {};

    if (process === "EDIT") {
      SupplierAddress = this.state.UpdateSupplierAddress;
      this.setState({ process: "EDIT" });
    } else {
      SupplierAddress = this.state.SupplierAddress;
      this.setState({ process: "ADD" });
    }

    switch (param) {
      case "Code":
        SupplierAddress[param] = e.target.value;
        let v1 = this.state.Validations;
        if (e.target.value === "" || e.target.value.length > 10) {
          if (e.target.value === "") {
            if (process === "EDIT") {
              v1.UpdateSupplierAddress.Code = {
                errorState: true,
                errorMssg: "Cannot be blank",
              };
              this.setState({ Validations: v1, updateBtnDisabled: true });
            } else {
              v1.SupplierAddress.Code = {
                errorState: true,
                errorMssg: "Cannot be blank",
              };
              this.setState({ Validations: v1, AddbtnDisable: true });
            }
          }
          if (e.target.value.length > 10) {
            if (process === "EDIT") {
              v1.UpdateSupplierAddress.Code = {
                errorState: true,
                errorMssg: "Maximum 10 characters allowed",
              };
              this.setState({ Validations: v1, updateBtnDisabled: true });
            } else {
              v1.SupplierAddress.Code = {
                errorState: true,
                errorMssg: "Maximum 10 characters allowed",
              };
              this.setState({ Validations: v1, AddbtnDisable: true });
            }
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v1.UpdateSupplierAddress.Code = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v1, updateBtnDisabled: false });
          } else {
            v1.SupplierAddress.Code = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v1, AddbtnDisable: false });
          }
        }
        this.setParams(SupplierAddress, process);

        break;
      case "Name":
        SupplierAddress[param] = e.target.value;
        let v2 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v2.UpdateSupplierAddress.Name = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.SupplierAddress.Name = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v2 });
          }
        } else {
          if (process === "EDIT") {
            v2.UpdateSupplierAddress.Name = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.SupplierAddress.Name = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v2 });
          }
          this.setParams(SupplierAddress, process);
        }

        break;
      case "Address":
        SupplierAddress[param] = e.target.value;
        let v3 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v3.UpdateSupplierAddress.Address = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v3 });
          } else {
            v3.SupplierAddress.Address = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v3 });
          }
        } else {
          if (process === "EDIT") {
            v3.UpdateSupplierAddress.Address = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v3 });
          } else {
            v3.SupplierAddress.Address = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v3 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "Address2":
        SupplierAddress[param] = e.target.value;
        let v4 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v4.UpdateSupplierAddress.Address2 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v4 });
          } else {
            v4.SupplierAddress.Address2 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v4 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v4.UpdateSupplierAddress.Address2 = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v4 });
          } else {
            v4.SupplierAddress.Address2 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v4 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "Address3":
        SupplierAddress[param] = e.target.value;
        let v5 = this.state.Validations;
        if (e.target.value.length > 100) {
          if (process === "EDIT") {
            v5.UpdateSupplierAddress.Address3 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v5 });
          } else {
            v5.SupplierAddress.Address3 = {
              errorState: true,
              errorMssg: "Maximum 100 characters allowed",
            };
            this.setState({ Validations: v5 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v5.UpdateSupplierAddress.Address3 = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v5 });
          } else {
            v5.SupplierAddress.Address3 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v5 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "City":
        SupplierAddress[param] = e.target.value;
        let v6 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v6.UpdateSupplierAddress.City = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v6 });
          } else {
            v6.SupplierAddress.City = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v6 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v6.UpdateSupplierAddress.City = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v6 });
          } else {
            v6.SupplierAddress.City = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v6 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "PostCode":
        SupplierAddress[param] = e.target.value;
        let v7 = this.state.Validations;
        if (e.target.value.length > 10) {
          if (process === "EDIT") {
            v7.UpdateSupplierAddress.PostCode = {
              errorState: true,
              errorMssg: "Maximum 10 characters allowed",
            };
            this.setState({ Validations: v7 });
          } else {
            v7.SupplierAddress.PostCode = {
              errorState: true,
              errorMssg: "Maximum 10 characters allowed",
            };
            this.setState({ Validations: v7 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v7.UpdateSupplierAddress.PostCode = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v7 });
          } else {
            v7.SupplierAddress.PostCode = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v7 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "CountryID":
        SupplierAddress[param] = CF.toInt(e.target.value);
        this.setParams(SupplierAddress, process);

        break;
      case "StateID":
        SupplierAddress[param] = CF.toInt(e.target.value);
        this.setParams(SupplierAddress, process);
        break;
      case "ContactPerson":
        SupplierAddress[param] = e.target.value;
        let v8 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v8.UpdateSupplierAddress.ContactPerson = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v8 });
          } else {
            v8.SupplierAddress.ContactPerson = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v8 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v8.UpdateSupplierAddress.ContactPerson = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v8 });
          } else {
            v8.SupplierAddress.ContactPerson = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v8 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "PhoneNo":
        let num = CF.chkIfNumber(e.target.value);
        if (num) {
          SupplierAddress[param] = e.target.value;
          let v9 = this.state.Validations;
          if (e.target.value.length > 20) {
            SupplierAddress[param] = e.target.value;
            if (process === "EDIT") {
              v9.UpdateSupplierAddress.PhoneNo = {
                errorState: true,
                errorMssg: "Maximum 20 characters allowed",
              };
              this.setState({ Validations: v9 });
            } else {
              v9.SupplierAddress.PhoneNo = {
                errorState: true,
                errorMssg: "Maximum 20 characters allowed",
              };
              this.setState({ Validations: v9 });
            }
          } else {
            SupplierAddress[param] = e.target.value;
            if (process === "EDIT") {
              v9.UpdateSupplierAddress.PhoneNo = {
                errorState: false,
                errorMssg: "",
              };
              this.setState({ Validations: v9 });
            } else {
              v9.SupplierAddress.PhoneNo = { errorState: false, errorMssg: "" };
              this.setState({ Validations: v9 });
              this.setParams(SupplierAddress, process);
            }
          }
        } else {
          switch (process) {
            case "ADD":
              let addNum = this.state.Validations;
              addNum.SupplierAddress.PhoneNo = {
                errorState: true,
                errorMssg: "Enter a number",
              };
              this.setState({ Validations: addNum });
              break;
            case "EDIT":
              let editNum = this.state.Validations;
              editNum.UpdateSupplierAddress.PhoneNo = {
                errorState: true,
                errorMssg: "Enter a number",
              };
              this.setState({ Validations: editNum });
              break;
            default:
              break;
          }
        }
        break;
      case "EmailID":
        SupplierAddress[param] = e.target.value;
        let v10 = this.state.Validations;
        if (e.target.value.length > 50) {
          if (process === "EDIT") {
            v10.UpdateSupplierAddress.EmailID = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v10 });
          } else {
            v10.SupplierAddress.EmailID = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v10 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v10.UpdateSupplierAddress.EmailID = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v10 });
          } else {
            v10.SupplierAddress.EmailID = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v10 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "VATNo":
        SupplierAddress[param] = e.target.value;
        let v11 = this.state.Validations;
        if (e.target.value.length > 20) {
          if (process === "EDIT") {
            v11.UpdateSupplierAddress.VATNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v11 });
          } else {
            v11.SupplierAddress.VATNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v11 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v11.UpdateSupplierAddress.VATNo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v11 });
          } else {
            v11.SupplierAddress.VATNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v11 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;
      case "GSTNo":
        SupplierAddress[param] = e.target.value;
        let v12 = this.state.Validations;
        if (e.target.value.length > 20) {
          if (process === "EDIT") {
            v12.UpdateSupplierAddress.GSTNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v12 });
          } else {
            v12.SupplierAddress.GSTNo = {
              errorState: true,
              errorMssg: "Maximum 20 characters allowed",
            };
            this.setState({ Validations: v12 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v12.UpdateSupplierAddress.GSTNo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v12 });
          } else {
            v12.SupplierAddress.GSTNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v12 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;

      case "IsBlock":
        SupplierAddress[param] = e.target.checked;
        this.setParams(SupplierAddress, process);
        break;
      case "IncoID":
        SupplierAddress[param] = CF.toInt(e.target.value);
        this.setParams(SupplierAddress, process);
        break;
      case "ShipmentModeID":
        SupplierAddress[param] = CF.toInt(e.target.value);
        this.setParams(SupplierAddress, process);
        break;

      case "SpecialInstruction":
        SupplierAddress[param] = e.target.value;
        let v17 = this.state.Validations;
        if (e.target.value.length > 250) {
          if (process === "EDIT") {
            v17.UpdateSupplierAddress.SpecialInstruction = {
              errorState: true,
              errorMssg: "Maximum 250 characters allowed",
            };
            this.setState({ Validations: v17 });
          } else {
            v17.SupplierAddress.SpecialInstruction = {
              errorState: true,
              errorMssg: "Maximum 250 characters allowed",
            };
            this.setState({ Validations: v17 });
          }
        } else {
          SupplierAddress[param] = e.target.value;
          if (process === "EDIT") {
            v17.UpdateSupplierAddress.SpecialInstruction = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v17 });
          } else {
            v17.SupplierAddress.SpecialInstruction = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v17 });
          }
        }
        this.setParams(SupplierAddress, process);
        break;

      default:
        break;
    }
    this.validateBtnEnable(process);
  };

  validateBtnEnable = (process) => {
    switch (process) {
      case "ADD":
        let Validations = this.state.Validations.SupplierAddress;
        if (
          Validations["Code"].errorState === true ||
          Validations["Name"].errorState === true ||
          Validations["Address"].errorState === true ||
          Validations["Address2"].errorState === true ||
          Validations["Address3"].errorState === true ||
          Validations["City"].errorState === true ||
          Validations["PostCode"].errorState === true ||
          Validations["PhoneNo"].errorState === true ||
          Validations["GSTNo"].errorState === true ||
          Validations["VATNo"].errorState === true ||
          Validations["ContactPerson"].errorState === true ||
          Validations["EmailID"].errorState === true ||
          Validations["SpecialInstruction"].errorState === true
        ) {
          this.setState({ AddbtnDisable: true });
        } else {
          this.setState({ AddbtnDisable: false });
        }
        break;
      case "EDIT":
        let V = this.state.Validations.UpdateSupplierAddress;
        if (
          V["Code"].errorState === true ||
          V["Name"].errorState === true ||
          V["Address"].errorState === true ||
          V["Address2"].errorState === true ||
          V["Address3"].errorState === true ||
          V["City"].errorState === true ||
          V["PostCode"].errorState === true ||
          V["PhoneNo"].errorState === true ||
          V["GSTNo"].errorState === true ||
          V["VATNo"].errorState === true ||
          V["ContactPerson"].errorState === true ||
          V["EmailID"].errorState === true ||
          V["SpecialInstruction"].errorState === true
        ) {
          this.setState({ updateBtnDisabled: true });
        } else {
          this.setState({ updateBtnDisabled: false });
        }
    }
  };

  setParams = (object, process) => {
    if (process === "EDIT") {
      this.setState({ UpdateSupplierAddress: object });
    } else {
      this.setState({ SupplierAddress: object }, () => {
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
    let Url = APIURLS.APIURL.CreateSupplierAddress;
    let reqData = {
      ValidUser: ValidUser,
      SupplierAddress: this.state.SupplierAddress,
    };

    console.log("ReqData>>>", reqData);

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          let SupplierAddress = {
            AddressID: 0,
            SuplID: 0,

            Code: "",
            Name: "",
            Address: "",
            Address2: "",
            Address3: "",
            City: "",
            PostCode: "",
            CountryID: "-1",
            StateID: 0,
            ContactPerson: "",
            PhoneNo: "",
            EmailID: "",
            VATNo: "",
            GSTNo: "",

            IsBlock: false,

            SpecialInstruction: "",
          };
          this.setState(
            {
              SupplierAddress: SupplierAddress,
              ErrorPrompt: false,
              SuccessPrompt: true,
            },
            () => {
              this.getSupplierAddress();
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

  UpdateSupplierAddress = (e) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.UpdateSupplierAddress;
    let reqData = {
      ValidUser: ValidUser,
      SupplierAddressList: [this.state.UpdateSupplierAddress],
    };

    console.log("ReqData>>>", reqData);

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          this.setState(
            {
              ErrorPrompt: false,
              SuccessPrompt: true,
            },
            () => this.getSupplierAddress()
          );
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
      UpdateSupplierAddress: item,
    });

    this.removeIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  handleRowClick = (e, item, id) => {
    try {
      this.setState(
        {
          UpdateSupplierAddress: item,
          FullSmallBtnArea: true,
          hideSidePanel: true,
        },
        () => {
          this.closeExpandFull(null);
        }
      );
      // console.log("addressId>>", this.state.SupplierAddress.AddressID);
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
        listStateSupplierAddresses: this.listStateSupplierAddresses(),
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
          <BackdropLoader open={!this.state.ProgressLoader} />
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
                    tab1Html={this.state.listStateSupplierAddresses}
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
                          startIcon={APIURLS.buttonTitle.update.icon}
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          onClick={(e) => this.UpdateSupplierAddress(e)}
                          disabled={this.state.updateBtnDisabled}
                        >
                          {APIURLS.buttonTitle.update.name}
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
                          aria-label="SupplierAddress List table"
                        >
                          <TableBody className="tableBody">
                            <TextboxInput
                              id="Code"
                              label="Code"
                              onChange={(e) =>
                                this.updateFormValue("Code", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              isMandatory={true}
                              value={this.state.UpdateSupplierAddress.Code}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .Code.errorState
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
                              value={this.state.UpdateSupplierAddress.Name}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .Name.errorState
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
                              value={this.state.UpdateSupplierAddress.Address}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .Address.errorState
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
                              value={this.state.UpdateSupplierAddress.Address2}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .Address2.errorState
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
                              value={this.state.UpdateSupplierAddress.Address3}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .Address3.errorState
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
                              value={this.state.UpdateSupplierAddress.City}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .City.errorState
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
                              value={this.state.UpdateSupplierAddress.PostCode}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .PostCode.errorState
                              }
                              
                            />

                            <SwitchInput
                              key="IsBlock"
                              id="IsBlock"
                              label="IsBlock"
                              param={this.state.UpdateSupplierAddress.IsBlock}
                              onChange={(e) =>
                                this.updateFormValue("IsBlock", e, "EDIT")
                              }
                              value={this.state.UpdateSupplierAddress.IsBlock}
                            />

                            <DropdownInput
                              id="CountryID"
                              label="Country"
                              onChange={(e) =>
                                this.updateFormValue("CountryID", e, "EDIT")
                              }
                              options={this.state.countryData}
                              isMandatory={true}
                              value={this.state.UpdateSupplierAddress.CountryID}
                            />
                            <DropdownInput
                              id="StateID"
                              label="State"
                              onChange={(e) =>
                                this.updateFormValue("StateID", e, "EDIT")
                              }
                              options={this.state.stateData}
                              value={this.state.UpdateSupplierAddress.StateID}
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
                                this.state.UpdateSupplierAddress.ContactPerson
                              }
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .ContactPerson.errorState
                              }
                             
                            />
                            <TextboxInput
                              id="PhoneNo"
                              label="Phone No "
                              onChange={(e) =>
                                this.updateFormValue("PhoneNo", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateSupplierAddress.PhoneNo}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .PhoneNo.errorState
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
                              value={this.state.UpdateSupplierAddress.EmailID}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .EmailID.errorState
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
                              value={this.state.UpdateSupplierAddress.VATNo}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .VATNo.errorState
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
                              value={this.state.UpdateSupplierAddress.GSTNo}
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .GSTNo.errorState
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
                                this.state.UpdateSupplierAddress
                                  .SpecialInstruction
                              }
                              error={
                                this.state.Validations.UpdateSupplierAddress
                                  .SpecialInstruction.errorState
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
