import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import SwitchInput from "../../../compo/tablerowcellswitchinput";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Typography from "@material-ui/core/Typography";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Loader from "../../../compo/loader";

import Dualtabcomponent from "../../../compo/dualtabcomponent";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";

class contact extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      listStateCustomerContact: null,
      stateCreateContact: null,
      contactData: [],
      CustomerContact: {
        ContactID: 0,
        CustID: this.props.CustID,
        ContactType: -1,
        Name: "",
        PhoneNo: "",
        EmailID: "",
        IsBlock: false,
      },
    };
  }

  componentDidMount() {
    // this.getCustomers();
    this.getCustomerContact();
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

  getCustomerContact = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };

    let Url = APIURLS.APIURL.GetAllCustomerContact;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ contactData: data, ProgressLoader: true }, () => {
          this.setState({
            listStateCustomerContact: this.listStateCustomerContact(),
            stateCreateContact: this.stateCreateContact(),
          });
        });
      })
      .catch((error) => {
        this.setState({ contactData: [], ProgressLoader: true });
      });
  };

  listStateCustomerContact = () => {
    let o = (
      <Fragment>
        <Table
          stickyHeader
          size="small"
          className=""
          aria-label="CustomerContact List table"
        >
          <TableHead className="table-header-background">
            <TableRow>
              <TableCell className="table-header-font">#</TableCell>
              <TableCell className="table-header-font">Name</TableCell>
              <TableCell className="table-header-font" align="left">
                Email
              </TableCell>
              <TableCell className="table-header-font" align="left">
                Phone No
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="tableBody">
            {this.state.contactData.map((item, i) => (
              <TableRow>
                <TableCell> {i + 1}</TableCell>
                <TableCell> {item.Name}</TableCell>
                <TableCell align="left">{item.EmailID}</TableCell>
                <TableCell align="left">{item.PhoneNo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Fragment>
    );
    return o;
  };

  stateCreateContact = () => {
    let o = (
      <Grid container spacing={0}>
        <Grid style={{ paddingTop: 10 }} container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button
              className="action-btns"
              style={{ marginLeft: 5 }}
              onClick={(e) => this.AddNew(e)}
            >
              {APIURLS.buttonTitle.add}
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={10} lg={10}>
            &nbsp;
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Accordion
                  key="customerContact-General-Details"
                  expanded={this.state.GeneralDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) =>
                          this.handleAccordionClick("GeneralDetailsExpanded", e)
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
                            aria-label="CustomerContact List table"
                          >
                            <TableBody className="tableBody">
                              {/* <DropdownInput
                                id="CustID"
                                label="Customer"
                                onChange={(e) => updateFormValue("CustID", e)}
                                options={this.state.customerData}
                                isMandatory={true}
                                value={this.state.CustomerContact.CustID}
                              /> */}
                              <DropdownInput
                                id="ContactType"
                                label="ContactType"
                                onChange={(e) =>
                                  this.updateFormValue("ContactType", e)
                                }
                                options={APIURLS.ContactType}
                                isMandatory={true}
                                value={this.state.CustomerContact.ContactType}
                              />
                              <TextboxInput
                                id="Name"
                                label="Name"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  this.updateFormValue("Name", e)
                                }
                                value={this.state.CustomerContact.Name}
                              />
                              <TextboxInput
                                id="PhoneNo"
                                label="PhoneNo"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  this.updateFormValue("PhoneNo", e)
                                }
                                value={this.state.CustomerContact.PhoneNo}
                              />
                              <TextboxInput
                                id="EmailID"
                                label="EmailID"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  this.updateFormValue("EmailID", e)
                                }
                                value={this.state.CustomerContact.EmailID}
                              />
                              <SwitchInput
                                key="IsBlock"
                                id="IsBlock"
                                label="IsBlock"
                                param={this.state.CustomerContact.IsBlock}
                                onChange={(e) =>
                                  this.updateFormValue("IsBlock", e)
                                }
                                value={this.state.CustomerContact.IsBlock}
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
    );
    return o;
  };

  updateFormValue = (param, e) => {
    let CustomerContact = this.state.CustomerContact;
    switch (param) {
      // case "CustID":
      //   CustomerContact[param] = e.target.value;
      //   setParams(CustomerContact);
      //   break;
      case "ContactType":
        CustomerContact[param] = e.target.value;
        this.setParams(CustomerContact);
        break;
      case "Name":
        CustomerContact[param] = e.target.value;
        this.setParams(CustomerContact);
        break;
      case "PhoneNo":
        CustomerContact[param] = e.target.value;
        this.setParams(CustomerContact);
        break;
      case "EmailID":
        CustomerContact[param] = e.target.value;
        this.setParams(CustomerContact);
        break;
      case "IsBlock":
        CustomerContact[param] = e.target.checked;
        this.setParams(CustomerContact);
        break;

      default:
        break;
    }
  };
  setParams = (object) => {
    this.setState({ CustomerContact: object }, () => {
      this.setState({
        stateCreateContact: this.stateCreateContact(),
      });
    });
  };

  handleAccordionClick = (val, e) => {
    if (val === "GeneralDetailsExpanded") {
      this.state.GeneralDetailsExpanded === true
        ? this.setState({ GeneralDetailsExpanded: false })
        : this.setState({ GeneralDetailsExpanded: true });
    }
  };

  AddNew = (e) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.CreateCustomerContact;
    let reqData = {
      ValidUser: ValidUser,
      CustomerContact: this.state.CustomerContact,
    };

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200 || response.status === 201) {
          let CustomerContact = {
            ContactID: 0,
            CustID: 0,
            ContactType: 0,
            Name: "",
            PhoneNo: "",
            EmailID: "",
            IsBlock: false,
          };
          this.setState(
            {
              CustomerContact: CustomerContact,
              ErrorPrompt: false,
              SuccessPrompt: true,
            },
            () => {
              this.getCustomerContact();
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

  InitialhandleRowClick(e, item, id) {
    this.setState(
      {
        // CustomerAddress: item,
      },
      () => {
        // this.setState({ stateForm: this.stateForm() });
      }
    );

    this.removeIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  handleRowClick = (e, item, id) => {
    this.setState(
      {
        CustomerAddress: item,
        type: "EDIT",
      },
      () => {
        this.setState({ stateForm: this.stateForm() });
      }
    );
    console.log("addressId>>", this.state.CustomerContact.ContactID);
    this.removeIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  };

  removeIsSelectedRowClasses = () => {
    for (let i = 0; i < this.state.AddressData.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
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
        <Loader ProgressLoader={this.state.ProgressLoader} />

        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Grid style={{ marginLeft: 15 }} container spacing={0}>
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <Dualtabcomponent
                  tab1name="List"
                  tab2name="New"
                  tab1Html={this.state.listStateCustomerContact}
                  tab2Html={this.state.stateCreateContact}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default contact;
