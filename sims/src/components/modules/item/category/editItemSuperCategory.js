import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Button from "@material-ui/core/Button";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import ButtonGroup from "@mui/material/ButtonGroup";
import UpdateIcon from "@material-ui/icons/Update";
import "../../../user/dasboard.css";

import SwitchInput from "../../../compo/tablerowcellswitchinput";
import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Breadcrumb from "../../../compo/breadcrumb";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../../compo/backdrop";
import SIB from "../../../compo/gridtextboxinput";
import SDIB from "../../../compo/griddropdowninput";
import SSIB from "../../../compo/gridswitchinput";

class editItemSuperCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableUpdatebtn: true,
      IsActive: false,
      Code: "",
      Description: "",
      HSNCode: "",
      SuperCatID: 0,
      ItemSuperCategory: {},
      ItemTypeMaster: APIURLS.ItemType,
      ItemType: 0,
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Description: { errorState: false, errorMssg: "" },
        HSNCode: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let SuperCatID = url.searchParams.get("editsuperCatId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    this.setState(
      {
        urlparams: urlparams,
        SuperCatID: SuperCatID,
      },
      () => this.getSuperCategory()
    );
  }

  getSuperCategory() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Data = {
      validUser: ValidUser,
      ItemSuperCategory: {
        SuperCatID: this.state.SuperCatID,
      },
    };

    let Url = APIURLS.APIURL.GetItemSuperCategory;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, Data, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);

        this.setState({
          ItemSuperCategory: data,
          Code: data.code,
          Description: data.description,
          HSNCode: data.hsncode,
          ItemType: data.itemType,
          IsActive: data.isActive,
          DisableUpdatebtn: false,
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
    const updateFormValue = (param, e) => {
      switch (param) {
        case "Code":
          let v1 = this.state.Validations;
          if (e.target.value === "" || e.target.value.length > 10) {
            if (e.target.value === "") {
              v1.Code = {
                errorState: true,
                errorMssg: "Blank inputs not allowed",
              };
              this.setState({
                Validations: v1,
                Code: e.target.value,
                DisableUpdatebtn: true,
              });
            }
            if (e.target.value.length > 10) {
              v1.Code = {
                errorState: true,
                errorMssg: "Maximum 10 characters allowed",
              };
              this.setState({ Validations: v1, DisableUpdatebtn: true });
            }
          } else {
            v1.Code = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v1,
              Code: e.target.value,
              DisableUpdatebtn: false,
            });
          }
          break;
        case "Name":
          this.setState({ Name: e.target.value });
          break;
        case "Description":
          let v2 = this.state.Validations;
          if (e.target.value.length > 50) {
            v2.Description = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.Description = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v2,
              Description: e.target.value,
            });
          }
          break;
        case "HSNCode":
          let v3 = this.state.Validations;
          if (e.target.value.length > 10) {
            v3.HSNCode = {
              errorState: true,
              errorMssg: "Maximum 10 characters allowed",
            };
            this.setState({ Validations: v3 });
          } else {
            v3.HSNCode = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v3,
              HSNCode: e.target.value,
            });
          }
          break;
        case "IsActive":
          this.setState({ IsActive: e.target.checked });
          break;
        case "ItemType":
          this.setState({ ItemType: e.target.value });
          break;
        default:
          break;
      }
    };

    const update = () => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateItemSuperCategory;
      let ReqData = {
        validUser: ValidUser,
        ItemSuperCategory: {
          SuperCatID: this.state.SuperCatID,
          ItemType: this.state.ItemType,
          Code: this.state.Code,
          Description: this.state.Description,
          HSNCode: this.state.HSNCode,
          IsActive: this.state.IsActive,
        },
      };
      axios
        .post(Url, ReqData, { headers })
        .then((response) => {
          let data = response.data;
          if (
            response.status === 200 ||
            response.status === 201 ||
            response.status === true ||
            response.status === "true"
          ) {
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
          masterHref={URLS.URLS.itemSuperCategoryMaster + this.state.urlparams}
          masterLinkTitle="Item Super-Category Master"
          typoTitle="Edit..."
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
            onClick={update}
            disabled={this.state.DisableUpdatebtn}
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
          <Grid xs={12} sm={6} md={6} lg={6}>
            <Accordion
              key="itemCategory-General-Details"
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
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SDIB
                            id="ItemType"
                            label="Item Type"
                            onChange={(e) => updateFormValue("ItemType", e)}
                            param={this.state.ItemTypeMaster}
                            value={this.state.ItemType}
                            isMandatory={true}
                          />

                          <SIB
                            id="Code"
                            label="Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Code", e)}
                            value={this.state.Code}
                            error={this.state.Validations.Code.errorState}
                            isMandatory={true}
                          />
                          <SIB
                            id="Description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Description", e)}
                            value={this.state.Description}
                            error={
                              this.state.Validations.Description.errorState
                            }
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                            id="HSNCode"
                            label="HSN Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("HSNCode", e)}
                            value={this.state.HSNCode}
                            error={this.state.Validations.HSNCode.errorState}
                          />
                          <SSIB
                            key="IsActive"
                            id="IsActive"
                            label="IsActive"
                            param={this.state.IsActive}
                            onChange={(e) => updateFormValue("IsActive", e)}
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
      </Fragment>
    );
  }
}
export default editItemSuperCategory;
