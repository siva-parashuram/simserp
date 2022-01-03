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
import UpdateIcon from "@material-ui/icons/Update";
import ButtonGroup from "@mui/material/ButtonGroup";

import MuiAlert from "@material-ui/lab/Alert";

import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import AddIcon from "@mui/icons-material/Add";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";
import * as CF from "../../../services/functions/customfunctions";

import moment from "moment";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import BackdropLoader from "../../compo/backdrop";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";

class editnumbering extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      lastLno: null,
      urlparams: "",
      GeneralDetailsExpanded: true,
      NumberingsListExpanded: true,
      ProgressLoader: true,
      initialCss: "",
      branchId: 0,
      numberings: [],
      startdate: "2021-10-06",
      SuccessPrompt: false,
      ErrorPrompt: false,
      noSeries: {
        NoSeriesId: 0,
        Code: null,
        Description: null,
        BranchId: 0,
        UserId: 0,
        CreationDate: null,
      },
      noSeriesDetailList: {
        id: 1,
        NoSeriesId: 0,
        Lno: 1,
        StartDate: null,
        Prefix: null,
        StartNo: 0,
        Suffix: null,
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
    let noSeriesId = url.searchParams.get("noSeriesId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    this.setState({
      urlparams: params,
      branchId: branchId,
    });
    this.getNumberingList(branchId, USERID, noSeriesId);
  }

  getNumberingList(branchId, USERID, noSeriesId) {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetNoSeriesByNoSeriesId;

    let data = {
      ValidUser: ValidUser,
      NoSeriesId: parseInt(noSeriesId),
    };
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;

        if (response.status === 200) {
          let d = {
            NoSeriesId: data.NoSeriesID,
            Code: data.Code,
            Description: data.Description,
            BranchId: data.BranchID,
            UserId: data.UserID,
            CreationDate: "",
          };
          let noSeries = d;

          let noSeriesDetailList = [];

          if(data.NoSeriesDetails){
            try{
              for (let i = 0; i < data.NoSeriesDetails.length; i++) {
                let l = {
                  id: i,
                  NoSeriesId: data.NoSeriesDetails[i].noSeriesId,
                  Lno: data.NoSeriesDetails[i].LNo,
                  // StartDate: moment(data.noSeriesDetailList[i].startDate).format(
                  //   "YYYY-MM-DD"
                  // ),
                  StartDate: data.NoSeriesDetails[i].StartDate,
                  Prefix: data.NoSeriesDetails[i].Prefix,
                  StartNo: data.NoSeriesDetails[i].StartNo,
                  Suffix: data.NoSeriesDetails[i].Suffix,
                  Increment: data.NoSeriesDetails[i].Increment,
                  LastNo: data.NoSeriesDetails[i].LastNo,
                  LastNoDate: data.NoSeriesDetails[i].LastNoDate,
                };
                noSeriesDetailList.push(l);
              }
            }catch(ex){
              console.log("ex > ",ex);
            }
          }

          let lastLno = noSeriesDetailList.at(-1).Lno;

          this.setState({
            lastLno: lastLno,
            noSeries: noSeries,
            numberings: noSeriesDetailList,
            ProgressLoader: true,
          });
        } else {
          this.setState({
            numberings: [],
            ProgressLoader: true,
            ErrorPrompt: true,
          });
        }
      })
      .catch((error) => {
        console.log("error > ",error);
        this.setState({
          numberings: [],
          ProgressLoader: true,
          ErrorPrompt: true,
        });
      });

    //    let noSeries=this.state.noSeries;
    //    noSeries.BranchId=parseInt(branchId);
    //    noSeries.UserId=parseInt(USERID);

    // this.setState({ numberings: N,noSeries:noSeries });
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
      console.log("numberings > ",numberings);
      this.setState({ numberings: numberings });
    };

    const updateListValue = (param, item, id, nextid, e) => {
      if (e.key === "Enter") {
        let value = document.getElementById(id).value;

        if (value === "" || value === null) {
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
        if (numberings[i].id === item.id) {
          if (param === "Increment") {
            numberings[i][param] = parseInt(e.target.value);
          } else {
            numberings[i][param] = e.target.value;
          }
        }
      }
      this.setState({ numberings: numberings });
    };

    const creatNewLine = () => {
      let N = this.state.numberings;
      let newLno = N.at(-1).Lno + 1;
      let newID = N.length + 1;
      let numberings = {
        id: newID,
        NoSeriesId: parseInt(this.state.noSeries.NoSeriesId),
        Lno: newLno,
        StartDate: null,
        Prefix: null,
        StartNo: null,
        Suffix: null,
        Increment: null,
        LastNo: null,
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

    const formatData = () => {
      let noSeriesDetailList = this.state.numberings;

      console.log("formatData > noSeriesDetailList > ",noSeriesDetailList);

      
      for (let i = 0; i < noSeriesDetailList.length; i++) {
        noSeriesDetailList[i].StartDate= moment(
          noSeriesDetailList[i].StartDate
        ).format("MM/DD/YYYY");
        noSeriesDetailList[i].startdate = moment(
          noSeriesDetailList[i].StartDate
        ).format("MM/DD/YYYY");
      }

      return noSeriesDetailList;
    };

    const handleUpdate = (e) => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let noSeries = this.state.noSeries;
      let noSeriesDetailList = formatData();

      
      let BranchId = this.state.branchId;
      const data = {
        validUser: ValidUser,
        noSeries: noSeries,
        BranchId: parseInt(BranchId),
        noSeriesDetailList: noSeriesDetailList,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateNoSeries;

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
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        });
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
          typoTitle="Edit"
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
            onClick={(e) => handleUpdate(e)}

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



        <Grid container spacing={0}>
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
              <AccordionDetails key="" className="AccordionDetails-css">
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
              <AccordionDetails key="">
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
                                defaultValue={moment(item.StartDate).format(
                                  "YYYY-MM-DD"
                                )}
                                onChange={(e) =>
                                  updateStartDate(e.target.value, item)
                                }
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "startdate",
                                    item,
                                    "startdate" + item.id,
                                    "startno" + item.id,
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
                                onKeyUp={(e) =>
                                  updateNumberingListState(
                                    "prefix",
                                    item,
                                    "prefix" + item.id,
                                    e
                                  )
                                }
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "prefix",
                                    item,
                                    "prefix" + item.id,
                                    "Increment" + item.id,
                                    e
                                  )
                                }
                                style={{ width: 120 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                                defaultValue={item.Prefix}
                              />
                            </td>
                            <td>
                              <TextField
                                type="number"
                                id={"startno" + item.id}
                                variant="outlined"
                                size="small"
                                onKeyUp={(e) =>
                                  updateNumberingListState(
                                    "startno",
                                    item,
                                    "startno" + item.id,
                                    e
                                  )
                                }
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
                                defaultValue={item.StartNo}
                              />
                            </td>
                            <td>
                              <TextField
                                id={"suffix" + item.id}
                                variant="outlined"
                                size="small"
                                onKeyUp={(e) =>
                                  updateNumberingListState(
                                    "suffix",
                                    item,
                                    "suffix" + item.id,
                                    e
                                  )
                                }
                                onKeyDown={(e) =>
                                  updateListValue(
                                    "suffix",
                                    item,
                                    "suffix" + item.id,
                                    "prefix" + item.id,
                                    e
                                  )
                                }
                                style={{ width: 120 }}
                                InputProps={{
                                  className: "textFieldCss",
                                }}
                                defaultValue={item.Suffix}
                              />
                            </td>
                           
                            <td>
                              <TextField
                                type="number"
                                id={"Increment" + item.id}
                                variant="outlined"
                                size="small"
                                onKeyUp={(e) =>
                                  updateNumberingListState(
                                    "Increment",
                                    item,
                                    "Increment" + item.id,
                                    e
                                  )
                                }
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
                                defaultValue={item.Increment}
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
                                value={item.LastNo}
                              />
                            </td>
                            <td>
                              {item.Lno > this.state.lastLno ? (
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
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default editnumbering;
