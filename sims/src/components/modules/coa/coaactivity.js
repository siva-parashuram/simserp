import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as CF from "../../../services/functions/customfunctions";

import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import Breadcrumb from "../../compo/breadcrumb";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Accordioncomponent from "../../compo/accordioncomponent";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import TextboxInput from "../../compo/tablerowcelltextboxinput";
import SwitchInput from "../../compo/tablerowcellswitchinput";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";



let today = moment().format("MM/DD/YYYY");

class coaactivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProgressLoader: false,
      ErrorPrompt: false,
      SuccessPrompt: false,
      accordion1: true,
      urlparams: "",
      type: "",
      typoTitle: "",
      COAList: [],
      DisableCreatebtn: true,
      DisableUpdatebtn: true,
      ACSubCategory: [],
      ChartOfAccount: {
        CAcID: 0,
        // BranchID: "-",
        ACNo: "",
        Name: "",
        ACType: "-",
        IncomeBalance: "-",
        ACCategory: "-",
        ACSubCategory: 0,
        DebitCredit: "-",
        IsBlock: false,
        DirectPosting: false,
        Indentation: 0,
        Totaling: "",
        ModifyDate: today,
        UserID: parseInt(getCookie(COOKIE.USERID)),
      },
      Validations: {
        ACNo: { errorState: false, errorMssg: "" },
        Name: { errorState: false, errorMssg: "" },
        Totaling: { errorState: false, errorMssg: "" },
      },
    };
  }

  goToCoaMaster = () => {
    window.location = URLS.URLS.coa + this.state.urlparams;
  };

  urlprocess = () => {
    let urlparams = "";
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let type = url.searchParams.get("type");
    let CAcID = type === "edit" ? url.searchParams.get("editCAcID") : 0;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");
    urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let ChartOfAccount = this.state.ChartOfAccount;
    if (type === "edit") {
      ChartOfAccount.CAcID = CF.toInt(CAcID);
      this.GetChartOfAccount(CF.toInt(CAcID));
    }

    this.setState({
      ChartOfAccount: ChartOfAccount,
      CAcID: type === "edit" ? CF.toInt(CAcID) : 0,
      urlparams: urlparams,
      type: type,
      typoTitle: typoTitle,
      ProgressLoader: type === "add" ? true : false,
    });
  };

  componentDidMount() {
    this.urlprocess();
    this.getCOAList();
    this.getACSubCategory(this.state.ChartOfAccount.ACCategory);
  }

  getCOAList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetChartOfAccounts;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ COAList: data });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {});
  };

  GetChartOfAccount = (CAcID) => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let url = APIURLS.APIURL.GetChartOfAccount;
    let reqData = {
      ValidUser: ValidUser,
      ChartOfAccount: {
        CAcID: CAcID,
      },
    };
    axios
      .post(url, reqData, { headers })
      .then((response) => {
        this.setState({ ChartOfAccount: response.data, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  };

  getACSubCategory = (ACCategory) => {
    console.log("getACSubCategory > ACCategory > ", ACCategory);
    ACCategory = parseInt(ACCategory);
    let ACSubCategory = [];
    let COAList = this.state.COAList;
    let ACType = CF.toInt(this.state.ChartOfAccount.ACType);

    if (ACType > 0) {
      for (let i = 0; COAList.length; i++) {
        if (COAList[i] === "" && COAList[i] === "") {
          let d = {
            name: "",
            value: 0,
          };
          ACSubCategory.push(d);
        }
      }
    }

    /*
        if (responseData.length > 0) {
            this.setState({ ACSubCategory: [] });
        } else {
            this.setSelfDefault(ACCategory);
        }
        */
  };

  setSelfDefault(val) {
    let ACSubCategory = [];
    let ACCategory = APIURLS.ACCategory;
    for (let i = 0; i < ACCategory.length; i++) {
      let o = {};
      if (ACCategory[i].value === val) {
        o = ACCategory[i];
        ACSubCategory.push(o);
      }
    }
    this.setState({ ACSubCategory: ACSubCategory });
  }

  render() {
    const createCoa = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateChartOfAccount;

      let reqData = {
        ValidUser: ValidUser,
        ChartOfAccount: this.state.ChartOfAccount,
      };
      console.log("createCoa > reqData >", reqData);

      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          let data = response.data;
          if (response.status === 200 || response.status === 201) {
            this.setState({ ErrorPrompt: false, SuccessPrompt: true });
            this.goToCoaMaster();
          } else {
            this.setState({ ErrorPrompt: true, SuccessPrompt: false });
          }
        })
        .catch((error) => {
          this.setState({ ErrorPrompt: true });
        });
    };

    const updateCoa = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateChartOfAccount;

      let reqData = {
        ValidUser: ValidUser,
        ChartOfAccount: this.state.ChartOfAccount,
      };
      console.log("createCoa > reqData >", reqData);

      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          let data = response.data;
          if (response.status === 200 || response.status === 201) {
            this.setState({ ErrorPrompt: false, SuccessPrompt: true });
          } else {
            this.setState({ ErrorPrompt: true, SuccessPrompt: false });
          }
        })
        .catch((error) => {
          this.setState({ ErrorPrompt: true });
        });
    };

    const setParams = (object) => {
      this.setState({ ChartOfAccount: object });
    };

    const check = () => {
      if (
        this.state.ChartOfAccount.ACNo === "" ||
        this.state.ChartOfAccount.ACNo.length > 10
      ) {
        if (this.state.type === "add") {
          this.setState({ DisableCreatebtn: true });
        } else {
          this.setState({ DisableUpdatebtn: true });
        }
      }
    };

    const updateFormValue = (param, e) => {
      let COA = this.state.ChartOfAccount;
      switch (param) {
        case "ACNo":
          let v1 = this.state.Validations;
          if (e.target.value === "" || e.target.value.length > 10) {
            if (e.target.value === "") {
              v1.ACNo = {
                errorState: true,
                errorMssg: "Blank inputs not allowed",
              };
              if (this.state.type === "add") {
                this.setState({
                  Validations: v1,
                  DisableCreatebtn: true,
                });
              } else {
                this.setState({
                  Validations: v1,
                  DisableUpdatebtn: true,
                });
              }
              COA.ACNo = e.target.value;
            }
            if (e.target.value.length > 10) {
              v1.ACNo = {
                errorState: true,
                errorMssg: "Maximum 10 characters allowed",
              };
              if (this.state.type === "add") {
                this.setState({
                  Validations: v1,
                  DisableCreatebtn: true,
                });
              } else {
                this.setState({
                  Validations: v1,
                  DisableUpdatebtn: true,
                });
              }
            }
          } else {
            v1.ACNo = { errorState: false, errorMssg: "" };
            if (this.state.type === "add") {
              this.setState({
                Validations: v1,
                DisableCreatebtn: false,
              });
            } else {
              this.setState({
                Validations: v1,
                DisableUpdatebtn: false,
              });
            }
            COA.ACNo = e.target.value;
            setParams(COA);
          }
          check();
          break;
        case "Name":
          let v2 = this.state.Validations;
          if (e.target.value === "" || e.target.value.length > 50) {
            if (e.target.value === "") {
              v2.Name = {
                errorState: true,
                errorMssg: "Blank inputs not allowed",
              };
              if (this.state.type === "add") {
                this.setState({
                  Validations: v2,
                  DisableCreatebtn: true,
                });
              } else {
                this.setState({
                  Validations: v2,
                  DisableUpdatebtn: true,
                });
              }
              COA.Name = e.target.value;
            }
            if (e.target.value.length > 50) {
              v2.Name = {
                errorState: true,
                errorMssg: "Maximum 50 characters allowed",
              };
              if (this.state.type === "add") {
                this.setState({
                  Validations: v2,
                  DisableCreatebtn: true,
                });
              } else {
                this.setState({
                  Validations: v2,
                  DisableUpdatebtn: true,
                });
              }
            }
          } else {
            v2.Name = { errorState: false, errorMssg: "" };
            if (this.state.type === "add") {
              this.setState({
                Validations: v2,
                DisableCreatebtn: false,
              });
            } else {
              this.setState({
                Validations: v2,
                DisableUpdatebtn: false,
              });
            }
            COA.Name = e.target.value;
            setParams(COA);
          }
          check();
          break;
        case "ACType":
          COA.ACType = CF.toInt(e.target.value);
          setParams(COA);
          check();
          break;
        case "IncomeBalance":
          COA.IncomeBalance = CF.toInt(e.target.value);
          setParams(COA);
          check();
          break;
        case "ACCategory":
          this.getACSubCategory(e.target.value);
          COA.ACCategory = CF.toInt(e.target.value);
          setParams(COA);
          check();
          break;
        case "ACSubCategory":
          COA.ACSubCategory = CF.toInt(e.target.value);
          setParams(COA);
          check();
          break;
        case "DebitCredit":
          COA.DebitCredit = CF.toInt(e.target.value);
          setParams(COA);
          check();
          break;
        case "IsBlock":
          COA.IsBlock = e.target.checked;
          setParams(COA);
          check();
          break;
        case "DirectPosting":
          COA.DirectPosting = e.target.checked;
          setParams(COA);
          check();
          break;
        case "Indentation":
          COA.Indentation = CF.toInt(e.target.value);
          setParams(COA);
          check();
          break;
        case "Totaling":
          let v3 = this.state.Validations;
          if (e.target.value.length > 150) {
            v3.Totaling = {
              errorState: true,
              errorMssg: "Maximum 150 characters allowed",
            };
            this.setState({ Validations: v3 });
          } else {
            v3.Totaling = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v3 });
            COA.Totaling = e.target.value;
            setParams(COA);
          }
          check();

          break;
        default:
          break;
      }
    };

    const form1 = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <div>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={5} lg={5}>
                {/* <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}> */}
                    
                        <SIB
                          id="ACNo"
                          label="ACNo"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("ACNo", e)}
                          value={this.state.ChartOfAccount.ACNo}
                          error={this.state.Validations.ACNo.errorState}
                          isMandatory={true}
                        />
                        <SIB
                          id="Name"
                          label="Name"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Name", e)}
                          value={this.state.ChartOfAccount.Name}
                          error={this.state.Validations.Name.errorState}
                          isMandatory={true}
                        />

                        <SIB
                          id="Indentation"
                          label="Indentation"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Indentation", e)}
                          value={this.state.ChartOfAccount.Indentation}
                        />
                        <SIB
                          id="Totaling"
                          label="Totaling"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Totaling", e)}
                          value={this.state.ChartOfAccount.Totaling}
                          error={this.state.Validations.Totaling.errorState}
                        />
                     
                  {/* </Grid>
                </Grid> */}
              </Grid>
              <Grid item xs={12} sm={12} md={1} lg={1}> </Grid>
                {/* <Grid container spacing={0}> */}
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                   
                        <SDIB
                          id="ACType"
                          label="ACType"
                          onChange={(e) => updateFormValue("ACType", e)}
                          value={this.state.ChartOfAccount.ACType}
                          param={APIURLS.ACType}
                          isMandatory={true}
                        />
                        <SDIB
                          id="IncomeBalance"
                          label="IncomeBalance"
                          onChange={(e) => updateFormValue("IncomeBalance", e)}
                          value={this.state.ChartOfAccount.IncomeBalance}
                          param={APIURLS.IncomeBalance}
                          isMandatory={true}
                        />
                        <SDIB
                          id="ACCategory"
                          label="ACCategory"
                          onChange={(e) => updateFormValue("ACCategory", e)}
                          value={this.state.ChartOfAccount.ACCategory}
                          param={APIURLS.ACCategory}
                          isMandatory={true}
                        />
                        <SDIB
                          id="ACSubCategory"
                          label="ACSubCategory"
                          onChange={(e) => updateFormValue("ACSubCategory", e)}
                          value={this.state.ChartOfAccount.ACSubCategory}
                          param={this.state.ACSubCategory}
                        />
                        <SDIB
                          id="DebitCredit"
                          label="DebitCredit"
                          onChange={(e) => updateFormValue("DebitCredit", e)}
                          value={this.state.ChartOfAccount.DebitCredit}
                          param={APIURLS.DebitCredit}
                          isMandatory={true}
                        />
                        <SSIB
                          key="IsBlock"
                          id="IsBlock"
                          label="IsBlock"
                          param={this.state.ChartOfAccount.IsBlock}
                          onChange={(e) => updateFormValue("IsBlock", e)}
                        />
                        <SSIB
                          key="DirectPosting"
                          id="DirectPosting"
                          label="DirectPosting"
                          param={this.state.ChartOfAccount.DirectPosting}
                          onChange={(e) => updateFormValue("DirectPosting", e)}
                        />
                     
                  {/* </Grid>
                </Grid> */}
              </Grid>
            </Grid>
            </div>
          </Grid>
        </Grid>
      </Fragment>
    );

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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.coa + this.state.urlparams}
          masterLinkTitle="Chart of Accounts"
          typoTitle={this.state.typoTitle}
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
          {this.state.type === "add" ? (
            <Button
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              onClick={(e) => createCoa(e)}
              disabled={this.state.DisableCreatebtn}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}
          {this.state.type === "edit" ? (
            <Button
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              onClick={(e) => updateCoa(e)}
              disabled={this.state.DisableUpdatebtn}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}
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
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Accordioncomponent
              accordionKey="a-7"
              expanded={this.state.accordion1}
              onClick={(e) => handleAccordionClick("accordion1", e)}
              id="accordion1"
              typographyKey="Coa-Activity"
              typography="General Details"
              accordiondetailsKey="accordion1"
              html={form1}
            />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default coaactivity;
