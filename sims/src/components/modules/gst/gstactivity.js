import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import Dialog from "@mui/material/Dialog";

import DialogContent from "@mui/material/DialogContent";

import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Accordioncomponent from "../../compo/accordioncomponent";
import TextboxInput from "../../compo/tablerowcelltextboxinput";
import TablecustomInput from "../../compo/tablerowcellcustomhtml";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import SwitchInput from "../../compo/tablerowcellswitchinput";
import Dualtabcomponent from "../../compo/dualtabcomponent";

class gstactivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
      BranchID: 0,
      accordion1: true,

      ProgressLoader: false,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: false,
      DisableUpdatebtn: false,
      initialCss: "",
      urlparams: "",
      editurl: "",
      typoTitle: "",
      type: "",

      GSTCutomerType: APIURLS.GSTCutomerType,
      gstData: [],
      currencyList: [],
      countryData: [],
      stateData: [],

      GSTGroupID: 0,

      GST: {
        GSTGroupID: 0,
        Code: "",
        Description: "",
        GSTPercentage: 0,
        IsActive: false,
        BranchID: 0,
      },
      Validations: {},
    };
  }

  componentDidMount() {
    this.getGstDetails();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let type = url.searchParams.get("type");
    let GSTGroupID =
      type === "edit" ? url.searchParams.get("editGSTGroupID") : 0;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let GST = this.state.GST;
    GST.BranchID = CF.toInt(branchId);
    if (type === "edit") {
      GST.GSTGroupID = CF.toInt(GSTGroupID);
      this.getGstDetails(GST);
    }

    this.setState({
      GST: GST,
      GSTGroupID: type === "edit" ? CF.toInt(GSTGroupID) : 0,
      urlparams: urlparams,
      type: type,
      typoTitle: typoTitle,
      ProgressLoader: type === "add" ? true : false,
      BranchID: CF.toInt(branchId),
    });

    console.log("On load state > ", this.state);
  }

  getGstDetails = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    // let Url = APIURLS.APIURL.;
    // axios
    //   .post(Url, ValidUser, { headers })
    //   .then((response) => {
    //     let data = response.data;
    //     this.setState({ gstData: data, ProgressLoader: true });
    //   })
    //   .catch((error) => {
    //     this.setState({ gstData: [], ProgressLoader: true });
    //   });
  };

  updateFormValue = (param, e) => {
    let GST = this.state.GST;
    switch (param) {
      case "Code":
        GST[param] = e.target.value;
        this.setParams(GST);
        break;
      case "Description":
        GST[param] = e.target.value;
        this.setParams(GST);
        break;
      case "GSTPercentage":
        GST[param] = CF.toFloat(e.target.value);
        this.setParams(GST);
        break;

      case "IsActive":
        GST[param] = e.target.checked;
        this.setParams(GST);
        break;
      default:
        break;
    }
  };

  validateBtnEnable = () => {
    // let Validations = this.state.Validations;
    // if (
    //   Validations["Name"].errorState === true ||
    //   Validations["Address"].errorState === true ||
    //   Validations["Address2"].errorState === true ||
    //   Validations["Address3"].errorState === true ||
    //   Validations["City"].errorState === true ||
    //   Validations["PostCode"].errorState === true ||
    //   Validations["Website"].errorState === true ||
    //   Validations["PhoneNo"].errorState === true ||
    //   Validations["FaxNo"].errorState === true ||
    //   Validations["CreditDays"].errorState === true ||
    //   Validations["CreditLimit"].errorState === true ||
    //   Validations["GraceDays"].errorState === true ||
    //   Validations["Reason"].errorState === true ||
    //   Validations["GSTNo"].errorState === true ||
    //   Validations["PANNo"].errorState === true ||
    //   Validations["VATNo"].errorState === true ||
    //   Validations["EORINo"].errorState === true ||
    //   Validations["TSSNo"].errorState === true ||
    //   Validations["ContactPerson"].errorState === true ||
    //   Validations["EmailID"].errorState === true ||
    //   Validations["BankCharge"].errorState === true ||
    //   Validations["EcommerceGSTNo"].errorState === true
    // ) {
    //   this.setState({ DisableCreatebtn: true, DisableUpdatebtn: true });
    // } else {
    //   this.setState({ DisableCreatebtn: false, DisableUpdatebtn: false });
    // }
  };

  setParams = (object) => {
    this.setState({ GST: object });
  };

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };

  refreshDropdownList = () => {};

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "accordion1") {
        this.state.accordion1 === true
          ? this.setState({ accordion1: false })
          : this.setState({ accordion1: true });
      }
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

    const AddNew = (e) => {
      this.setState({ Loader: false });
      console.log("Adding new");
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };

      let GST = this.state.GST;
      //   let reqData = {

      //     },
      //   };
      //   let Url = APIURLS.APIURL.;
      //   axios
      //     .post(Url, reqData, { headers })
      //     .then((response) => {
      //       let data = response.data;
      //       console.log("---> No Series DATA > ", data);
      //       Customer.No = data;
      //       reqData = {
      //         ValidUser: ValidUser,
      //         GST: GST,
      //       };
      //       console.log("createCoa > reqData >", reqData);
      //       Url = APIURLS.APIURL.;
      //       axios
      //         .post(Url, reqData, { headers })
      //         .then((response) => {
      //           let data = response.data;
      //           console.log("DATA>>", data);
      //           if (response.status === 200 || response.status === 201) {
      //             this.setState({
      //               ErrorPrompt: false,
      //               SuccessPrompt: true,
      //               Loader: true,
      //             });
      //             this.openPage(URLS.URLS.customerMaster + this.state.urlparams);
      //           } else {
      //             this.setState({
      //               ErrorPrompt: true,
      //               SuccessPrompt: false,
      //               Loader: true,
      //             });
      //           }
      //         })
      //         .catch((error) => {
      //           this.setState({ ErrorPrompt: true, Loader: true });
      //         });
      //     })
      //     .catch((error) => {
      //       this.setState({ ErrorPrompt: true, Loader: true });
      //     });
    };

    const updateGst = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      //   let Url = APIURLS.APIURL.;
      //   let GST = this.state.GST;

      //   let reqData = {
      //     ValidUser: ValidUser,
      //     GST: GST,
      //   };
      //   console.log("updateCustomer > reqData >", reqData);
      //   axios
      //     .post(Url, reqData, { headers })
      //     .then((response) => {
      //       let data = response.data;
      //       if (response.status === 200 || response.status === 201) {
      //         this.setState({ ErrorPrompt: false, SuccessPrompt: true });
      //       } else {
      //         this.setState({ ErrorPrompt: true, SuccessPrompt: false });
      //       }
      //     })
      //     .catch((error) => {
      //       this.setState({ ErrorPrompt: true });
      //     });
    };

    const generalform = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="General Activity table"
                    >
                      <TableBody className="tableBody">
                        <TextboxInput
                          id="Code"
                          label="Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) => this.updateFormValue("Code", e)}
                          value={this.state.GST.Code}
                          isMandatory={true}
                        />
                        <TextboxInput
                          id="Description"
                          label="Description"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            this.updateFormValue("Description", e)
                          }
                          value={this.state.GST.Description}
                        />
                        <TextboxInput
                          id="GSTPercentage"
                          label="GST Percentage"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            this.updateFormValue("GSTPercentage", e)
                          }
                          value={this.state.GST.GSTPercentage}
                        />

                        <SwitchInput
                          key="IsActive"
                          id="IsActive"
                          label="IsActive"
                          param={this.state.GST.IsActive}
                          onChange={(e) => this.updateFormValue("IsActive", e)}
                        />
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );

    // const dialog = (
    //   <Fragment>
    //     {/* <Dialog
    //       fullWidth={true}
    //       maxWidth="lg"
    //       open={this.state.Dialog.DialogStatus}
    //       aria-labelledby="dialog-title"
    //       aria-describedby="dialog-description"
    //       className="dialog-prompt-activity"
    //     >
    //       <DialogTitle
    //         id="dialog-title"
    //         className="dialog-area"
    //         style={{ maxHeight: 50 }}
    //       >
    //         <Grid container spacing={0}>
    //           <Grid item xs={12} sm={12} md={1} lg={1}>
    //             <IconButton
    //               aria-label="ArrowBackIcon"
    //               // style={{ textAlign: 'left', marginTop: 8 }}
    //             >
    //               <ArrowBackIcon onClick={(e) => handleClose()} />
    //             </IconButton>
    //           </Grid>
    //           <Grid item xs={12} sm={12} md={2} lg={2}>
    //             <div style={{ marginLeft: -50 }}>
    //               {" "}
    //               <span style={{ fontSize: 18, color: "rgb(80, 92, 109)" }}>
    //                 {" "}
    //                 {this.state.Dialog.DialogTitle}{" "}
    //               </span>{" "}
    //             </div>
    //           </Grid>
    //         </Grid>
    //       </DialogTitle>
    //       <DialogContent className="dialog-area">
    //         <Grid container spacing={0}>
    //           <Grid item xs={12} sm={12} md={12} lg={12}>
    //             {this.state.Dialog.DialogContent}
    //           </Grid>
    //         </Grid>
    //         <div style={{ height: 50 }}>&nbsp;</div>
    //       </DialogContent>
    //     </Dialog> */}
    //   </Fragment>
    // );

    // const openDialog = (param) => {
    //   let Dialog = this.state.Dialog;
    //   Dialog.DialogStatus = true;
    //   Dialog.DialogTitle = param;

    //   //   switch (param) {

    //   //     default:
    //   //       break;
    //   //   }

    //   this.setState({ Dialog: Dialog });
    // };

    // const handleClose = () => {
    //   let Dialog = this.state.Dialog;
    //   Dialog.DialogStatus = false;
    //   this.setState({ Dialog: Dialog });
    //   this.refreshDropdownList();
    // };

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

        <div className="breadcrumb-height">
          <Grid container spacing={1}>
            <Grid
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                borderRightStyle: "solid",
                borderRightColor: "#bdbdbd",
                borderRightWidth: 1,
              }}
            >
              <div style={{ marginTop: 8 }}>
                <Breadcrumb
                  backOnClick={this.props.history.goBack}
                  linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                  linkTitle="Dashboard"
                  masterHref={URLS.URLS.gstMaster + this.state.urlparams}
                  masterLinkTitle="GST Master "
                  typoTitle={this.state.typoTitle}
                  level={2}
                />
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={7} lg={7}>
              <div className="btn-area-div-row">
                <div style={{ marginLeft: 10, marginTop: 1 }}>
                  <ButtonGroup
                    size="small"
                    variant="text"
                    aria-label="Action Menu Button group"
                  >
                    {this.state.type === "add" ? (
                      <Button
                        className="action-btns"
                        onClick={(e) => AddNew(e)}
                        disabled={this.state.DisableCreatebtn}
                      >
                        {APIURLS.buttonTitle.add}
                      </Button>
                    ) : null}
                    {this.state.type === "edit" ? (
                      <div>
                        <Button
                          className="action-btns"
                          onClick={(e) => updateGst(e)}
                          disabled={this.state.DisableUpdatebtn}
                        >
                          {APIURLS.buttonTitle.update}
                        </Button>
                      </div>
                    ) : null}
                  </ButtonGroup>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="breadcrumb-bottom"></div>
        <div className="breadcrumb-bottom"></div>
        <Grid className="table-adjust" container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Accordioncomponent
              accordionKey="a-1"
              expanded={this.state.accordion1}
              onClick={(e) => handleAccordionClick("accordion1", e)}
              id="accordion1"
              typographyKey="GD-Activity"
              typography="General Details"
              accordiondetailsKey="accordion1"
              html={generalform}
            />

            <div style={{ height: 50 }}></div>
          </Grid>
        </Grid>

        {/* {dialog} */}
      </Fragment>
    );
  }
}
export default gstactivity;
