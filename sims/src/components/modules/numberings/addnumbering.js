import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";

import moment from "moment";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import BackdropLoader from "../../compo/backdrop";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import * as CF from "../../../services/functions/customfunctions";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";

class addnumbering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      GeneralDetailsExpanded: true,
      NumberingsListExpanded: false,
      ProgressLoader: true,
      initialCss: "",
      branchId: 0,
      numberings: [],
      startdate: "2021-10-06",
      ErrorPrompt: false,
      SuccessPrompt: false,
      noSeries: {
        NoSeriesId: 0,
        Code: "",
        Description: "",
        BranchId: 0,
        UserId: 0,
        CreationDate: null,
      },
      noSeriesDetailList: {
        id: 1,
        NoSeriesId: 0,
        Lno: 1,
        StartDate: null,
        Prefix: "",
        StartNo: 0,
        Suffix: "",
        Increment: 0,
        LastNo: 0,
        LastNoDate: null,
      },
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Description: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    let USERID = getCookie(COOKIE.USERID);
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
    this.setState(
      {
        urlparams: params,
        branchId: branchId,
      },
      () => this.getNumberingList(branchId, USERID)
    );
  }

  getNumberingList(branchId, USERID) {
    let today = moment().format("MM/DD/YYYY");
    let N = [];
    let numberings = this.state.noSeriesDetailList;
    numberings.StartDate = today;
    N.push(numberings);

    let noSeries = this.state.noSeries;
    noSeries.BranchId = parseInt(branchId);
    noSeries.UserId = parseInt(USERID);

    this.setState({ numberings: N, noSeries: noSeries });
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "NumberingsListExpanded") {
        this.state.NumberingsListExpanded === true
          ? this.setState({ NumberingsListExpanded: false })
          : this.setState({ NumberingsListExpanded: true });
      }
    };

    const updateFormValue = (id, e) => {
      let noSeries = this.state.noSeries;
      if (id === "Code") {
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.Code = {
            errorState: true,
            errorMssg: "Only 20 characters allowed!",
          };
          this.setState({ Validations: v });
        } else {
          noSeries.Code = e.target.value;
          let v = this.state.Validations;
          v.Code = { errorState: false, errorMssg: "" };
          this.setState({ noSeries: noSeries, Validations: v });
        }
      }
      if (id === "Description") {
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Description = {
            errorState: true,
            errorMssg: "Only 50 characters allowed!",
          };
          this.setState({ Validations: v });
        } else {
          noSeries.Description = e.target.value;
          let v = this.state.Validations;
          v.Description = { errorState: false, errorMssg: "" };
          this.setState({ noSeries: noSeries, Validations: v });
        }
      }
    };

    const updateStartDate = (date, item) => {
      let numberings = this.state.numberings;
      for (let i = 0; i < numberings.length; i++) {
        if (numberings[i].id === item.id) {
          numberings[i].StartDate = date;
        }
      }
      this.setState({ numberings: numberings });
    };

    const updateListValue = (param, item, id, nextid, e) => {
      if (e.key === "Enter") {
        let value = document.getElementById(id).value;

        if (value === "" || value === null) {
          // alert("Cannot be blank!");
        } else {
          updateNumberingListState(param, item, id, e);

          if (nextid === "newline") {
            // alert("Creating next Line.");
            creatNewLine();
          } else {
            document.getElementById(nextid).focus();
          }
        }
      }
    };

    const updateNumberingListState = (param, item, id, e) => {
      let numberings = this.state.numberings;
      
      
      for (let i = 0; i < numberings.length; i++) {
        console.log("numberings[i].id ----> ",numberings[i].id);
      console.log("item.id ----> ",item.id);
        if (numberings[i].id === item.id) {
          if (param === "Increment") {
            numberings[i][param] = parseInt(e.target.value);
          } else {
            numberings[i][param] = e.target.value;
          }
        }
      }
      this.setState({ numberings: numberings },()=>{
        console.log("numberings ----> ",numberings);
      });
    };

    const creatNewLine = () => {
      let N = this.state.numberings;
      let newID = N.length + 1;
      let numberings = {
        id: newID,
        NoSeriesId: 0,
        Lno: newID,
        StartDate: null,
        Prefix: null,
        StartNo: 0,
        Suffix: null,
        Increment: 0,
        LastNo: 0,
        LastNoDate: null,
      };
      

      N.push(numberings);
      this.setState({ numberings: N }, () => {
        document.getElementById("startdate" + newID).focus();
      });
    };

    const deleteEntry = (e, item) => {
      let numberings = this.state.numberings;
      let newNumberings = [];
      for (let i = 0; i < numberings.length; i++) {
        if (numberings[i].id === item.id) {
        } else {
          newNumberings.push(numberings[i]);
        }
      }
      this.setState({ numberings: newNumberings });
    };

    const formatDate = () => {
      let noSeriesDetailList = this.state.numberings;

      for (let i = 0; i < noSeriesDetailList.length; i++) {
        noSeriesDetailList[i].startdate = moment(
          noSeriesDetailList[i].startdate
        ).format("MM/DD/YYYY");
      }

      return noSeriesDetailList;
    };

    const handleCreate = (e) => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let noSeries = this.state.noSeries;
      let noSeriesDetailList = formatDate();
      let BranchId = this.state.branchId;
       let numberings=this.state.numberings;
      console.log("numberings > ",numberings);
      console.log("noSeriesDetailList > ",noSeriesDetailList);


     
      const data = {
        validUser: ValidUser,
        noSeries: noSeries,
        BranchId: parseInt(BranchId),
        noSeriesDetailList: noSeriesDetailList,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateNoSeries;

      axios
        .post(Url, data, { headers })
        .then((response) => {
          let data = response.data;

          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => { });
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
          masterHref={URLS.URLS.numberingMaster + this.state.urlparams}
          masterLinkTitle="Nos. Series"
          typoTitle="Add Nos. Series"
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
            onClick={(e) => handleCreate(e)}
          >
            {APIURLS.buttonTitle.save.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <BackdropLoader open={!this.state.ProgressLoader} />
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
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Accordion
              key="numbering-General-Details"
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
                onClick={(e) =>
                  handleAccordionClick("GeneralDetailsExpanded", e)
                }
              >
                <Typography key="" className="accordion-Header-Title">
                  General 
                </Typography>
              </AccordionSummary>
              <AccordionDetails key="">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid container spacing={2}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <SIB
                          id="Code"
                          label="Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Code", e)}
                          value={this.state.noSeries.Code}
                          error={this.state.Validations.Code.errorState}
                        />
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <SIB
                          id="Description"
                          label="Description"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Description", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.noSeries.Description}
                          error={
                            this.state.Validations.Description.errorState
                          }

                        />
                      </Grid>
                    </Grid>

                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
            <Accordion
              key="numbering-list-Details"
              expanded={this.state.NumberingsListExpanded}
            >
              <AccordionSummary
                className="accordion-Header-Design"
                expandIcon={
                  <ExpandMoreIcon
                    onClick={(e) =>
                      handleAccordionClick("NumberingsListExpanded", e)
                    }
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ minHeight: 20, height: "100%" }}
                onClick={(e) =>
                  handleAccordionClick("NumberingsListExpanded", e)
                }
              >
                <Typography key="" className="accordion-Header-Title">
                Series
                </Typography>
              </AccordionSummary>
              <AccordionDetails key="" className="AccordionDetails-css">
                <Grid container spacing={1}>
                  <Grid xs={12} sm={12} md={12} lg={12}>
                    <table>
                      <thead>
                        <tr style={{ textAlign: "center" }}>
                          <td className="table-header-font">&nbsp;</td>
                          <td className="table-header-font">Start Date</td>
                          <td className="table-header-font">Prefix</td>
                          <td className="table-header-font">Start No</td>
                          <td className="table-header-font">Suffix</td>

                          <td className="table-header-font">Increment</td>
                          <td className="table-header-font">Last No Used</td>
                          <td className="table-header-font">&nbsp;</td>
                        </tr>
                      </thead>
                      <tbody>
                        {this.state.numberings.map((item, i) => (
                          <tr>
                            <td>
                              <ArrowRightIcon />
                            </td>
                            <td>
                              <TextField
                                type="date"
                                id={"startdate" + item.id}
                                variant="outlined"
                                size="small"
                                defaultValue={item.StartDate}
                                onChange={(e) =>
                                  updateStartDate(e.target.value, item)
                                }
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "StartDate",
                                    item,
                                    "startdate" + item.id,
                                    "prefix" + item.id,
                                    e
                                  )
                                }
                                style={{ width: 150 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                              />
                            </td>
                            <td>
                              <TextField
                                id={"prefix" + item.id}
                                variant="outlined"
                                size="small"
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "Prefix",
                                    item,
                                    "prefix" + item.id,
                                    "startno" + item.id,
                                    e
                                  )
                                }
                                style={{ width: 120 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                              />
                            </td>
                            <td>
                              <TextField
                                type="number"
                                id={"startno" + item.id}
                                variant="outlined"
                                size="small"
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "startno",
                                    item,
                                    "startno" + item.id,
                                    "suffix" + item.id,
                                    e
                                  )
                                }
                                style={{ width: 120 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                              />
                            </td>
                            <td>
                              <TextField
                                id={"suffix" + item.id}
                                variant="outlined"
                                size="small"
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "Suffix",
                                    item,
                                    "suffix" + item.id,
                                    "Increment" + item.id,
                                    e
                                  )
                                }
                                style={{ width: 120 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                              />
                            </td>

                            <td>
                              <TextField
                                type="number"
                                id={"Increment" + item.id}
                                variant="outlined"
                                size="small"
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "Increment",
                                    item,
                                    "Increment" + item.id,
                                    "newline",
                                    e
                                  )
                                }
                                style={{ width: 120 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                              />
                            </td>
                            <td>
                              <TextField
                                type="number"
                                id={"lastno" + item.id}
                                variant="outlined"
                                size="small"
                                style={{ width: 120 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                                disabled={true}
                              />
                            </td>
                            <td>
                              {" "}
                              {i > 0 && item.Lno > 1 ? (
                                <DeleteForeverIcon
                                  fontSize="small"
                                  className="table-delete-icon"
                                  onClick={(e) => deleteEntry(e, item)}
                                />
                              ) : null}

                              {i === this.state.numberings.length - 1 ? (
                                <AddIcon
                                  fontSize="small"
                                  className="table-add-icon"
                                  onClick={(e) => creatNewLine()}
                                />
                              ) : null}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid xs={12} sm={12} md={7} lg={7}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default addnumbering;
