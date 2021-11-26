import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import SwitchInput from "../../../compo/tablerowcellswitchinput";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
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

class contact extends React.Component {
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
      initialCss: "",
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      listStateCustomerContact: null,
      stateCreateContact: null,
      createNewBtn: true,
      updateBtn: false,
      contactData: [],
      CustomerContact: {
        ContactID: 0,
        CustID: this.props.CustID,
        ContactType: "-1",
        Name: "",
        PhoneNo: "",
        EmailID: "",
        IsBlock: false,
      },
      Validations: {
        Name: { errorState: false, errorMssg: "" },
        PhoneNo: { errorState: false, errorMssg: "" },
        EmailID: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
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

    let Url = APIURLS.APIURL.GetAllCustomerContactByCustID;
    let data = {
      ValidUser: ValidUser,
      Customer: {
        CustID: this.props.CustID,
      },
    };

    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ contactData: data, ProgressLoader: true }, () => {
          this.setState({
            listStateCustomerContact: this.listStateCustomerContact(),
          });
        });
        // this.InitialhandleRowClick(null, data[0], "row_0");
      })
      .catch((error) => {
        this.setState({ contactData: [], ProgressLoader: true });
      });
  };

  handleRowClick = (e, item, id) => {
    try {
      this.setState({
        CustomerContact: item,

        FullSmallBtnArea: true,
        mainframeW: 8,
        hideSidePanel: false,
        updateBtn: true,
        createNewBtn: false,
      });
      this.removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    } catch (ex) {}
  };

  removeIsSelectedRowClasses = () => {
    try {
      for (let i = 0; i < this.state.contactData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  showAddNewPanel = (e) => {
    this.removeIsSelectedRowClasses();
    let CustomerContact = {
      ContactID: 0,
      CustID: this.props.CustID,
      ContactType: -1,
      Name: "",
      PhoneNo: "",
      EmailID: "",
      IsBlock: false,
    };

    this.setState({
      CustomerContact: CustomerContact,
      FullSmallBtnArea: true,
      mainframeW: 8,
      hideSidePanel: false,
      createNewBtn: true,
      updateBtn: false,
    });

    //removeall list selected highlight
    //show right panel
    //show create new btn
    //show expandLess btn
  };

  listStateCustomerContact = () => {
    let o = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={10} lg={10}>
              <Button
                startIcon={APIURLS.buttonTitle.add.icon}
                className="action-btns"
                style={{ marginLeft: 5, marginBottom: 10 }}
                onClick={(e) => this.showAddNewPanel(e)}
              >
                <span style={{ paddingLeft: 7, paddingRight: 5 }}>
                  {" "}
                  {APIURLS.buttonTitle.add.name}{" "}
                </span>
              </Button>
            </Grid>
          </Grid>
        </Grid>

        <div style={{ height: 350, width: "100%" }}>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Table
                stickyHeader
                size="small"
                className=""
                aria-label="item List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>
                    <TableCell className="table-header-font" align="left">
                      Code
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Description
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      DueDays
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {this.getPageData(this.state.contactData).map((item, i) => (
                    <TableRow
                      id={"row_" + i}
                      key={i}
                      onClick={(event) =>
                        this.handleRowClick(event, item, "row_" + i)
                      }
                    >
                      <TableCell> {i + 1}</TableCell>
                      <TableCell> {item.Name}</TableCell>
                      <TableCell align="left">{item.EmailID}</TableCell>
                      <TableCell align="left">{item.PhoneNo}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <TablePagination
                rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
                component="div"
                count={this.state.contactData.length}
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
              hideSidePanel: true,
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

  UpdateCustomerContact = (e) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.UpdateCustomerContact;
    let reqData = {
      ValidUser: ValidUser,
      CustomerContactList: [this.state.CustomerContact],
    };

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
            () => {
              let o = {
                ContactID: 0,
                CustID: this.props.CustID,
                ContactType: -1,
                Name: "",
                PhoneNo: "",
                EmailID: "",
                IsBlock: false,
              };
              this.setState({ CustomerContact: o });
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

  updateFormValue = (param, e) => {
    let CustomerContact = this.state.CustomerContact;

    switch (param) {
      case "ContactType":
        CustomerContact[param] = CF.toInt(e.target.value);
        this.setParams(CustomerContact);
        break;
      case "Name":
        CustomerContact[param] = e.target.value;
        let v1 = this.state.Validations;
        if (e.target.value.length > 50) {
          v1.Name = {
            errorState: true,
            errorMssg: "maximum 50 characters allowed",
          };
          this.setState({ Validations: v1 });
        } else {
          v1.Name = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({ Validations: v1 });
          this.setParams(CustomerContact);
        }

        break;
      case "PhoneNo":
        let num = CF.chkIfNumber(e.target.value);
        if (num) {
          CustomerContact[param] = e.target.value;
          let v2 = this.state.Validations;
          if (e.target.value.length > 20) {
            v2.PhoneNo = {
              errorState: true,
              errorMssg: "Maximum 20 numbers allowed",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.PhoneNo = {
              errorState: false,
              errorMssg: "",
            };
            this.setState({ Validations: v2 });
            this.setParams(CustomerContact);
          }
        } else {
          let v = this.state.Validations;
          v.PhoneNo = { errorState: true, errorMssg: "Enter Number" };
          this.setState({ Validations: v });
        }

        break;
      case "EmailID":
        CustomerContact[param] = e.target.value;
        let email = CF.validateEmail(e.target.value);
        switch (email) {
          case true:
            let validn = this.state.Validations;
            if (e.target.value.length > 50) {
              validn.EmailID = {
                errorState: true,
                errorMssg: "Maximum 50 characters allowed",
              };
              this.setState({ Validations: validn });
            } else {
              validn.EmailID = {
                errorState: false,
                errorMssg: "",
              };
              this.setState({ Validations: validn });
              this.setParams(CustomerContact);
            }
            break;
          case false:
            let validtn = this.state.Validations;

            validtn.EmailID = {
              errorState: true,
              errorMssg: "Invalid Email",
            };
            this.setState({ Validations: validtn });
        }

        break;
      case "IsBlock":
        CustomerContact[param] = e.target.checked;
        this.setParams(CustomerContact);
        break;
      default:
        break;
    }
    this.validateBtn();
  };

  validateBtn = () => {
    let v = this.state.Validations;
    if (
      v.Name.errorState === true ||
      v.PhoneNo.errorState === true ||
      v.EmailID.errorState === true
    ) {
      this.setState({ createNewBtn: true, updateBtn: true });
    } else {
      this.setState({ createNewBtn: false, updateBtn: false });
    }
  };

  setParams = (object) => {
    this.setState({ CustomerContact: object });
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
        listStateCustomerContact: this.listStateCustomerContact(),
      });
    });
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
                    <OpenInFullIcon className="openfullbtn" fontSize="small" />
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
            <Grid style={{ marginLeft: 15 }} container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {this.state.listStateCustomerContact}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {this.state.hideSidePanel === false ? (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div
              // style={{ marginLeft: 10, marginTop: 45 }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <div style={{ marginTop: -12, marginLeft: 1 }}>
                      <h4>Detail view</h4>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div>
                      {this.state.createNewBtn === true ? (
                        <Button
                          startIcon={APIURLS.buttonTitle.add.icon}
                          className="action-btns"
                          onClick={(e) => this.AddNew(e)}
                          disabled={this.state.createNewBtn}
                        >
                          {APIURLS.buttonTitle.add.name}
                        </Button>
                      ) : (
                        <Button
                          startIcon={APIURLS.buttonTitle.update.icon}
                          className="action-btns"
                          onClick={(e) => this.UpdateCustomerContact(e)}
                          disabled={this.state.updateBtn}
                        >
                          {APIURLS.buttonTitle.update.name}
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div
                      style={{
                        height: 300,
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
                        aria-label="Contact List table"
                      >
                        <TableBody className="tableBody">
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
                            onChange={(e) => this.updateFormValue("Name", e)}
                            value={this.state.CustomerContact.Name}
                            error={this.state.Validations.Name.errorState}
                          />
                          <TextboxInput
                            id="PhoneNo"
                            label="PhoneNo"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("PhoneNo", e)}
                            value={this.state.CustomerContact.PhoneNo}
                            error={this.state.Validations.PhoneNo.errorState}
                            
                          />
                          <TextboxInput
                            id="EmailID"
                            label="EmailID"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("EmailID", e)}
                            value={this.state.CustomerContact.EmailID}
                            error={this.state.Validations.EmailID.errorState}
                            
                          />
                          <SwitchInput
                            key="IsBlock"
                            id="IsBlock"
                            label="IsBlock"
                            param={this.state.CustomerContact.IsBlock}
                            onChange={(e) => this.updateFormValue("IsBlock", e)}
                            value={this.state.CustomerContact.IsBlock}
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
      </Fragment>
    );
  }
}
export default contact;
