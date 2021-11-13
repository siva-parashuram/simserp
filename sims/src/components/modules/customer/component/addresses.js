import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import IconButton from '@mui/material/IconButton';
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
import OpenInFullIcon from '@mui/icons-material/OpenInFull';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';

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
      FullSmallBtnArea:false,
      mainframeW: 12,
      hideSidePanel: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      countryData: [],
      stateData: [],
      AddressData: [],
      stateForm: null,
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
    console.log("Refreshing");
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };

    let Url = APIURLS.APIURL.GetAllCustomerAddress;

    axios
      .post(Url, ValidUser, { headers })
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
      .catch((error) => { });
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
      .catch((error) => { });
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
                                />
                                <TextboxInput
                                  id="PhoneNo"
                                  label="Phone No "
                                  onChange={(e) =>
                                    this.updateFormValue("PhoneNo", e, "ADD")
                                  }
                                  variant="outlined"
                                  size="small"
                                  value={this.state.CustomerAddress.PhoneNo}
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
        <div style={{ height: 500, overflowY: "scroll", overflowX: 'hidden', width: "100%" }}>
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
                  {this.state.AddressData.map((item, i) => (
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
    let CustomerAddress = {};

    if (process === "EDIT") {
      CustomerAddress = this.state.UpdateCustomerAddress;
    } else {
      CustomerAddress = this.state.CustomerAddress;
    }

    switch (param) {
      case "AddressType":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        break;
      case "Code":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "Name":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "Address":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "Address2":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "Address3":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "City":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "PostCode":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "CountryID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        break;
      case "StateID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        break;
      case "ContactPerson":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "PhoneNo":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "EmailID":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "VATNo":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "GSTNo":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "EORINo":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "TSSNo":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "IsBlock":
        CustomerAddress[param] = e.target.checked;
        this.setParams(CustomerAddress, process);
        break;
      case "IncoID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        break;
      case "ShipmentModeID":
        CustomerAddress[param] = CF.toInt(e.target.value);
        this.setParams(CustomerAddress, process);
        break;
      case "PostOfDischarge":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "FinalDestination":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
        break;
      case "SpecialInstruction":
        CustomerAddress[param] = e.target.value;
        this.setParams(CustomerAddress, process);
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
    this.setState({
      UpdateCustomerAddress: item,
      FullSmallBtnArea:true,
      hideSidePanel:true
    },()=>{
      this.closeExpandFull(null);
    });
    console.log("addressId>>", this.state.CustomerAddress.AddressID);
    this.removeIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  };

  removeIsSelectedRowClasses = () => {
    for (let i = 0; i < this.state.AddressData.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  };

   expandFull = (e) => {
    this.setState({
      mainframeW: 12,
      hideSidePanel: true
    });
  }

   closeExpandFull = (e) => {
    this.setState({
      mainframeW: 8,
      hideSidePanel: false
    });
  }

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
              {this.state.FullSmallBtnArea===true?(
                 <div>
                 {this.state.hideSidePanel === false ? (
                   <IconButton aria-label="OpenInFullIcon" onClick={(e) => this.expandFull(e)}>
                     <OpenInFullIcon className="openfullbtn" fontSize="small" />
                   </IconButton>
 
                 ) : null}
                 {this.state.hideSidePanel === true ? (
                   <IconButton aria-label="CloseFullscreenIcon" onClick={(e) => this.closeExpandFull(e)} >
                     <CloseFullscreenIcon className="openfullbtn" fontSize="small" />
                   </IconButton>
                 ) : null}
               </div>
              ):null}
             
            </Grid>
          </Grid>
          <div style={{ height: 10 }}>&nbsp;</div>
          <Loader ProgressLoader={this.state.ProgressLoader} />
          <div style={{ height: 10 }}>&nbsp;</div>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={this.state.mainframeW} lg={this.state.mainframeW}>

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
                        <div style={{height:20}}>&nbsp;</div>
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
                              value={this.state.UpdateCustomerAddress.AddressType}
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
                              value={this.state.UpdateCustomerAddress.ContactPerson}
                            />
                            <TextboxInput
                              id="PhoneNo"
                              label="Phone No "
                              onChange={(e) =>
                                this.updateFormValue("PhoneNo", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={this.state.UpdateCustomerAddress.PhoneNo}
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
                            />
                            <DropdownInput
                              id="ShipmentModeID"
                              label="ShipmentModeID"
                              onChange={(e) =>
                                this.updateFormValue("ShipmentModeID", e, "EDIT")
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
                                this.updateFormValue("PostOfDischarge", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={
                                this.state.UpdateCustomerAddress.PostOfDischarge
                              }
                            />
                            <TextboxInput
                              id="FinalDestination"
                              label="Final Destination"
                              onChange={(e) =>
                                this.updateFormValue("FinalDestination", e, "EDIT")
                              }
                              variant="outlined"
                              size="small"
                              value={
                                this.state.UpdateCustomerAddress.FinalDestination
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
                                this.state.UpdateCustomerAddress.SpecialInstruction
                              }
                            />
                          </TableBody>
                        </Table>
                        <div style={{height:20}}>&nbsp;</div>
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
