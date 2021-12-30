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
import AddIcon from "@material-ui/icons/Add";

import MuiAlert from "@material-ui/lab/Alert";
import ButtonGroup from "@mui/material/ButtonGroup";
import * as CF from "../../../services/functions/customfunctions";

import "../../user/dasboard.css";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";

class addmodule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      CreateBtnDisable: true,
      ModuleId: 0,
      modules: [],
      duplicate: false,
      Name: null,
      Description: null,
      IconName: null,
      Module: {
        ModuleId: 0,
        Name: null,
        Description: null,
        IconName: null,
      },
      Validations: {
        Name: { errorState: false, errorMsg: "" },
        Description: { errorState: false, errorMsg: "" },
        IconName: { errorState: false, errorMsg: "" },
      },
      ErrorPrompt: false,
      SuccessPrompt: false,
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getModules();
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
      urlparams: params,
    });
  }

  getModules() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetModulesUrl = APIURLS.APIURL.GetModules;

    axios
      .post(GetModulesUrl, ValidUser, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          rows = data;
          this.setState({ modules: rows, ProgressLoader: true });
        } else {
        }
      })
      .catch((error) => {
        this.setState({ modules: [], ProgressLoader: true });
      });
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "AddressDetailsExpanded") {
        this.state.AddressDetailsExpanded === true
          ? this.setState({ AddressDetailsExpanded: false })
          : this.setState({ AddressDetailsExpanded: true });
      }
    };

    const CheckName = () => {
      if (
        this.state.Name === "" ||
        this.state.Name === null ||
        this.state.Name.length > 20 ||
        this.state.duplicate === true
      ) {
        this.setState({ CreateBtnDisable: true });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.modules,
          "name",
          e.target.value
        );
        this.setState({ duplicate: duplicateExist });
        if (
          e.target.value === "" ||
          e.target.value.length > 20 ||
          duplicateExist === true
        ) {
          let Module = this.state.Module;
          Module.Name = e.target.value;
          let Validations = this.state.Validations;
          if (duplicateExist === true) {
            Validations.Name = {
              errorState: true,
              errorMsg: "Module already exists",
            };
            this.setState({
              Validations: Validations,
              CreateBtnDisable: true,
              Name: e.target.value,
            });
          }
          if (e.target.value === "") {
            Validations.Name = {
              errorState: true,
              errorMsg: "Blank inputs not allowed!",
            };
            this.setState({
              CreateBtnDisable: true,
              Validations: Validations,
              Name: e.target.value,
            });
          }
          if (e.target.value.length > 20) {
            Validations.Name = {
              errorState: true,
              errorMsg: "Maximum 20 characters Allowed!",
            };
            this.setState({
              CreateBtnDisable: true,
              Name: e.target.value,
              Validations: Validations,
            });
          }
        } else {
          let Module = this.state.Module;
          Module.Name = e.target.value;
          let Validations = this.state.Validations;
          Validations.Name = { errorState: false, errorMsg: "" };
          this.setState({
            Module: Module,
            CreateBtnDisable: false,
            Validations: Validations,
            Name: e.target.value,
          });
        }
        CheckName();
      }
      if (id === "Description") {
        if (e.target.value === "" || e.target.value.length > 50) {
          let Module = this.state.Module;
          Module.Description = e.target.value;
          let Validations = this.state.Validations;
          if (e.target.value === "") {
            Validations.Description = {
              errorState: true,
              errorMsg: "Blank inputs not allowed!",
            };
            this.setState({
              Validations: Validations,
              Description: e.target.value,
              CreateBtnDisable: true,
            });
          }
          if (e.target.value.length > 20) {
            Validations.Description = {
              errorState: true,
              errorMsg: "Maximum 50 characters Allowed!",
            };
            this.setState({
              Validations: Validations,
              Description: e.target.value,

              CreateBtnDisable: true,
            });
          }
        } else {
          let Module = this.state.Module;
          Module.Description = e.target.value;
          let Validations = this.state.Validations;
          Validations.Description = { errorState: false, errorMsg: "" };
          this.setState({
            Module: Module,
            CreateBtnDisable: false,
            Description: e.target.value,
          });
        }
        CheckName();
      }
      if (id === "IconName") {
        if (e.target.value === "" || e.target.value.length > 50) {
          let Module = this.state.Module;
          Module.IconName = e.target.value;
          let Validations = this.state.Validations;
          if (e.target.value === "") {
            Validations.IconName = {
              errorState: true,
              errorMsg: "Blank inputs not allowed!",
            };
            this.setState({
              Validations: Validations,
              IconName: e.target.value,
            });
          }
          if (e.target.value.length > 20) {
            Validations.IconName = {
              errorState: true,
              errorMsg: "Maximum 50 characters Allowed!",
            };
          }
          this.setState({
            Validations: Validations,
            IconName: e.target.value,

          });
        } else {
          let Module = this.state.Module;
          Module.IconName = e.target.value;
          let Validations = this.state.Validations;
          Validations.IconName = { errorState: false, errorMsg: "" };
          this.setState({
            Module: Module,
            CreateBtnDisable: false,
            IconName: e.target.value,
          });
        }
      }
      CheckName();
    };

    const handleCreate = () => {
      CheckName();
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let Module = this.state.Module;
      const data = APIURLS.CreateModuleData;
      data.validUser = ValidUser;
      data.Module = Module;
      // {
      //     validUser: ValidUser,
      //     Module: Module
      // };
      const headers = {
        "Content-Type": "application/json",
      };
      let CreateModuleUrl = APIURLS.APIURL.CreateModule;

      axios
        .post(CreateModuleUrl, data, { headers })
        .then((response) => {
          let data = response.data;
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
          masterHref={URLS.URLS.moduleMaster + this.state.urlparams}
          masterLinkTitle="Module"
          typoTitle="Add Module"
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
            className="action-btns"
            startIcon={APIURLS.buttonTitle.save.icon}
            onClick={handleCreate}
            disabled={this.state.CreateBtnDisable}
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
              key="country-General-Details"
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
                  General 
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
                        id="Name"
                        label="Module Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("Name", e)}
                        InputProps={{
                          className: "textFieldCss",
                          maxlength: 20,
                        }}
                        value={this.state.Name}
                        error={this.state.Validations.Name.errorState}
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
                      />
                      <Tablerowcelltextboxinput
                        id="IconName"
                        label="IconName"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("IconName", e)}
                        InputProps={{
                          className: "textFieldCss",
                        }}
                        value={this.state.IconName}
                        error={this.state.Validations.IconName.errorState}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default addmodule;
