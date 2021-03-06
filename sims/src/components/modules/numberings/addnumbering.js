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
      NoSeriesMstData:[],
      urlparams: "",
      GeneralDetailsExpanded: true,
      NumberingsListExpanded: true,
      ProgressLoader: true,
      initialCss: "",
      branchId: 0,
      numberings: [],
      startdate: null,
      ErrorMessageProps: "",
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
      this.getList(parseInt(branchId));
    this.setState(
      {
        urlparams: params,
        branchId: branchId,
      },
      () => this.getNumberingList(branchId, USERID)
    );
  }

  getList(branchId) {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllNoSeriesByBranchId;

    let data = {
      ValidUser: ValidUser,
      BranchId: parseInt(branchId),
    };

    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200) {
          this.setState({NoSeriesMstData:data,ProgressLoader: true});
        } else {
          this.setState({
            NoSeriesMstData: [],
            ProgressLoader: true,
            ErrorPrompt: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          NoSeriesMstData: [],
          ProgressLoader: true,
          ErrorPrompt: true,
        });
      });
  }

  getNumberingList(branchId, USERID) {
    let today = null;//moment().format("MM/DD/YYYY");
    let N = [];
    let numberings = this.state.noSeriesDetailList;
    numberings.StartDate = today;
    N.push(numberings);

    let noSeries = this.state.noSeries;
    noSeries.BranchId = parseInt(branchId);
    noSeries.UserId = parseInt(USERID);

    this.setState({ numberings: N, noSeries: noSeries });
  }

  validateNumberLineEntry = () => {
    let numberings = this.state.numberings;
    let isProper = true;
    for (let i = 0; i < numberings.length; i++) {
      if (
        numberings[i].StartDate === null ||
        parseInt(numberings[i].StartNo) === 0 || numberings[i].StartNo === "" ||
        parseInt(numberings[i].Increment) === 0 || numberings[i].Increment === ""
      ) {
        isProper = false;
        break;
      } else {
        isProper = true;
      }
    }
    return isProper;
  }

  updateNumbering = (key, item, e, index) => {

    switch (key) {
      case "StartDate":
        this.updateNumberingList(key, e.target.value, index);
        break;
      case "Prefix":
        this.updateNumberingList(key, e.target.value, index);
        break;
      case "StartNo":
        this.updateNumberingList(key, e.target.value, index);
        break;
      case "Suffix":
        this.updateNumberingList(key, e.target.value, index);
        break;
      case "Increment":
        this.updateNumberingList(key, e.target.value, index);
        break;
      default:
        break;
    }

  }

  updateNumberingList = (key, value, index) => {
    let numberings = this.state.numberings;
    for (let i = 0; i < numberings.length; i++) {
      if (i === index) {
        numberings[i][key] = value;
      }
    }
    this.setState({ numberings: numberings });
  }

  onEnterMovement = (param, item, id, nextid, e) => {
    let mandatory = ["StartDate", "startno", "Increment"];
    if (e.keyCode === 9) {
      console.log("--------------------STOP HERE----------------------");
      e.preventDefault();
    }
    try {
      if (e.key === "Enter" || e.keyCode === 18) {
        let value = e.target.value; //document.getElementById(id).value;
        if (mandatory.includes(param) === true) {
          if (value === "" || value === null || value === 0 || value < 0 || value.toString().trim() === "") {
            this.setState({ ErrorMessageProps: "Input Cannot be Blank", ErrorPrompt: true });
          }
          else {
            if (nextid === "newline") {
              this.creatNewLine();
            } else {
              document.getElementById(nextid).focus();
            }
          }
        } else {
          this.setState({ ErrorMessageProps: "" });
          if (nextid === "newline") {
            this.creatNewLine();
          } else {
            document.getElementById(nextid).focus();
          }
        }
      }
    } catch (err) {
      console.log("onEnterMovement > err > ", err);
    }
  };

  creatNewLine = () => {

    let N = this.state.numberings;

    let isProper = true;
    isProper = this.validateNumberLineEntry();
    if (isProper === true) {
      this.setState({ ErrorMessageProps: "" });
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
    } else {
      this.setState({ ErrorMessageProps: "Start Date,Start No & Increment is required", ErrorPrompt: true });
    }

  };

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };


  chkIfDuplicateExist=(value)=>{
    let isPresent=false;
    let NoSeriesMstData=this.state.NoSeriesMstData;
    for(let i=0;i<NoSeriesMstData.length;i++){
      if(NoSeriesMstData[i].Code.toUpperCase()===value.trim().toUpperCase()){
        isPresent=true;
        break;
      }
    }
    return isPresent;
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
        let v = this.state.Validations;
        let isPresent=false;
        isPresent=this.chkIfDuplicateExist(e.target.value);
        if(isPresent===false){
          if (e.target.value.length > 20) {           
            v.Code = {
              errorState: true,
              errorMssg: "Only 20 characters allowed!",
            };
            this.setState({ Validations: v });
          } else {
            noSeries.Code = e.target.value;            
            v.Code = { errorState: false, errorMssg: "" };
            this.setState({ noSeries: noSeries, Validations: v });
          }
        }else{
          noSeries.Code = e.target.value;   
          v.Code = {
            errorState: true,
            errorMssg: "",
          };
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



    const creatNewLine = () => {

      let N = this.state.numberings;

      let isProper = true;
      isProper = this.validateNumberLineEntry();
      console.log("II > isProper > ", isProper);
      if (isProper === true) {
        this.setState({ ErrorMessageProps: "" });
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
      } else {
        this.setState({ ErrorMessageProps: "Start Date,Start No & Increment is required", ErrorPrompt: true });
      }

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
      let v = this.state.Validations;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let isProper = true;
      isProper = this.validateNumberLineEntry();
      if (isProper === true) {
        this.setState({ ErrorMessageProps: "" });
        let noSeries = this.state.noSeries;
        let noSeriesDetailList = formatDate();
        let BranchId = this.state.branchId;
        let numberings = this.state.numberings;
        if (noSeries.Code !== "") {

          let isPresent=false;
          isPresent=this.chkIfDuplicateExist(noSeries.Code);
          if(isPresent===false){
            this.setState({ ProgressLoader: false });
          let newList = [];
          for (let i = 0; i < noSeriesDetailList.length; i++) {
            let obj = {
              "NoSeriesId": 0,
              "Lno": noSeriesDetailList[i].Lno,
              "StartDate": noSeriesDetailList[i].StartDate,
              "Prefix": noSeriesDetailList[i].Prefix,
              "StartNo": noSeriesDetailList[i].StartNo,
              "Suffix": noSeriesDetailList[i].Suffix,
              "Increment": noSeriesDetailList[i].Increment
            };
            newList.push(obj);
          }
          const data = {
            validUser: ValidUser,
            noSeries: noSeries,
            BranchId: parseInt(BranchId),
            noSeriesDetailList: newList,
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
                this.openPage(URLS.URLS.editNumbering +
                  this.state.urlparams +
                  "&noSeriesId=" +
                  data.ID + "&type=edit");
              } else {
                this.setState({ ProgressLoader: true, ErrorPrompt: true });
              }
            })
            .catch((error) => { });
          }else{
            v.Code = {
              errorState: true,
              errorMssg: "",
            };
            this.setState({ Validations: v });
            this.setState({ ErrorMessageProps: "Code Already Exist", ErrorPrompt: true });
          }
          
        } else {
          
          v.Code = {
            errorState: true,
            errorMssg: "",
          };
          this.setState({ Validations: v });
          this.setState({ ErrorMessageProps: "Code is Mandatory", ErrorPrompt: true });
        }

      } else {
        this.setState({ ErrorMessageProps: "Number Series List is Invalid", ErrorPrompt: true });
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
    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.numberingMaster + this.state.urlparams}
          masterLinkTitle="Nos. Series"
          typoTitle="Add"
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
          ErrorMessageProps={this.state.ErrorMessageProps}
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
                                onKeyDown={(e) => this.onEnterMovement("StartDate", item, "startdate" + item.id, "prefix" + item.id, e)}
                                onChange={(e) => this.updateNumbering("StartDate", item, e, i)}
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
                                onKeyDown={(e) => this.onEnterMovement("Prefix", item, "prefix" + item.id, "startno" + item.id, e)}
                                onChange={(e) => this.updateNumbering("Prefix", item, e, i)}
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
                                onKeyDown={(e) => this.onEnterMovement("startno", item, "startno" + item.id, "suffix" + item.id, e)}
                                onChange={(e) => this.updateNumbering("StartNo", item, e, i)}
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
                                onKeyDown={(e) => this.onEnterMovement("Suffix", item, "suffix" + item.id, "Increment" + item.id, e)}
                                onChange={(e) => this.updateNumbering("Suffix", item, e, i)}
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
                                onKeyDown={(e) => this.onEnterMovement("Increment", item, "Increment" + item.id, "newline", e)}
                                onChange={(e) => this.updateNumbering("Increment", item, e, i)}
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
