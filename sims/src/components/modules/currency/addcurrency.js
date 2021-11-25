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

import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";

import * as CF from "../../../services/functions/customfunctions";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";

import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

const Dformat = APIURLS.DFormat;
const viewDate = "yyyy-mm-dd";
const todayDate = new Date(); //moment().format(viewDate);

class addcurrency extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      GeneralDetailsExpanded: true,
      ProgressLoader: true,
      initialCss: "",
      SuccessPrompt: false,
      ErrorPrompt: false,
      DisableCreatebtn: false,
      COAList: [],
      Currency: {
        CurrId: 0,
        Code: null,
        Description: null,
        Symbol: null,
        RealizedGainId: 0,
        RealizedLossId: 0,
        Rounding: 0,
      },
      currency: [],
      Code: null,
      Description: null,
      Symbol: null,
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Description: { errorState: false, errorMssg: "" },
        Symbol: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    this.getCOAList();
    this.getList();
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
    this.setState({
      urlparams: urlparams,
    });
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
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].ACType === 0) {
            let o = {
              name: data[i].Name,
              value: data[i].CAcID,
            };
            newD.push(o);
          }
        }

        this.setState({ COAList: newD });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {});
  };

  getList() {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetCurrencies;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        this.setState({
          currency: data,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
    };

    const updateFormValue = (id, e) => {
      let Currency = this.state.Currency;

      if (id === "Code") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.currency,
          "code",
          e.target.value
        );
        Currency.Code = e.target.value;
        if (e.target.value.length > 10 || duplicateExist === true) {
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.Code = {
              errorState: true,
              errorMssg: "Code Exists",
            };
            this.setState({
              Validations: v,
              DisableCreatebtn: true,
              Code: e.target.value,
            });
          }
          if (e.target.value.length > 10) {
            let v = this.state.Validations;
            v.Code = {
              errorState: true,
              errorMssg: "MAximum 10 characters allowed",
            };
            this.setState({
              Validations: v,
              DisableCreatebtn: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.Code = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            Currency: Currency,
            Code: e.target.value,
            DisableCreatebtn: false,
          });
        }
      }
      if (id === "Description") {
        Currency.Description = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.Description = {
            errorState: true,
            errorMssg: "MAximum 50 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Description = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            Currency: Currency,
            Description: e.target.value,
          });
        }
      }
      if (id === "Symbol") {
        Currency.Symbol = e.target.value;
        if (e.target.value.length > 5) {
          let v = this.state.Validations;
          v.Symbol = {
            errorState: true,
            errorMssg: "MAximum 5 characters allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          let v = this.state.Validations;
          v.Symbol = { errorState: false, errorMssg: "" };
          this.setState({
            Validations: v,
            Currency: Currency,
            Symbol: e.target.value,
          });
        }
      }

      if (id === "RealizedGainId") {
        Currency.RealizedGainId = e.target.value;
        this.setState({ Currency: Currency });
      }
      if (id === "RealizedLossId") {
        Currency.RealizedLossId = e.target.value;
        this.setState({ Currency: Currency });
      }
    };

    const handleCreate = (e) => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        Currency: this.state.Currency,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateCurrency;
      axios
        .post(Url, data, { headers })
        .then((response) => {
          let data = response.data;

          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
            let gobackURL = URLS.URLS.currencyMaster + this.state.urlparams;
            this.props.history.push(gobackURL);
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
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
          masterHref={URLS.URLS.currencyMaster + this.state.urlparams}
          masterLinkTitle="Currency Master"
          typoTitle="Add Currency"
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
            disabled={this.state.DisableCreatebtn}
          >
            {APIURLS.buttonTitle.save.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

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
              >
                <Typography key="" className="accordion-Header-Title">
                  General Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails key="" className="AccordionDetails-css">
                <TableContainer>
                  <Table
                    stickyHeader
                    size="small"
                    className="accordion-table"
                    aria-label="company List table"
                  >
                    <TableBody className="tableBody">
                      <Tablerowcelltextboxinput
                        id="Code"
                        label="Code"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("Code", e)}
                        InputProps={{
                          className: "textFieldCss",
                        }}
                        value={this.state.Code}
                        error={this.state.Validations.Code.errorState}
                        helperText={this.state.Validations.Code.errorMssg}
                      />

                      <Tablerowcelltextboxinput
                        id="Description"
                        label="Description"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("Description", e)}
                        InputProps={{
                          className: "textFieldCss",
                        }}
                        value={this.state.Description}
                        error={this.state.Validations.Description.errorState}
                        helperText={
                          this.state.Validations.Description.errorMssg
                        }
                      />

                      <Tablerowcelltextboxinput
                        id="Symbol"
                        label="Symbol"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("Symbol", e)}
                        InputProps={{
                          className: "textFieldCss",
                        }}
                        value={this.state.Symbol}
                        error={this.state.Validations.Symbol.errorState}
                        helperText={this.state.Validations.Symbol.errorMssg}
                      />

                      <DropdownInput
                        id="RealizedGainId"
                        label="Realized Gain"
                        onChange={(e) => updateFormValue("RealizedGainId", e)}
                        value={this.state.Currency.RealizedGainId}
                        options={this.state.COAList}
                      />

                      <DropdownInput
                        id="RealizedLossId"
                        label="Realized Loss "
                        onChange={(e) => updateFormValue("RealizedLossId", e)}
                        value={this.state.Currency.RealizedLossId}
                        options={this.state.COAList}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
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
export default addcurrency;
