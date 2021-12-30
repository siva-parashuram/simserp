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
import * as CF from "../../../services/functions/customfunctions";
import Button from "@material-ui/core/Button";

import MuiAlert from "@material-ui/lab/Alert";
import ButtonGroup from "@mui/material/ButtonGroup";
import UpdateIcon from "@material-ui/icons/Update";
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


class editmodule extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      PagesDetailsExpanded:false,
      updateBtnDisable: false,
      Module: {
        ModuleId: 0,
        Name: "",
        Description: "",
        IconName: "",
      },
      Validations: {
        Name: { errorState: false, errorMsg: "" },
        Description: { errorState: false, errorMsg: "" },
        IconName: { errorState: false, errorMsg: "" },
      },
      ModuleId: 0,
      Name: "",
      Description: "",
      IconName: "",
      modules: [],
      oldName: "",
      duplicate: false,
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
    let moduleId = url.searchParams.get("moduleId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let Module = this.state.Module;
    Module.ModuleId = CF.toInt(moduleId);
    this.setState(
      {
        urlparams: params,
        ModuleId: moduleId,
        Module: Module,
      },
      () => {
        this.getModule(moduleId);
      }
    );
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

  getModule(ModuleId) {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Module = this.state.Module;
    const handleCreateData = {
      validUser: ValidUser,
      Module: Module,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    let GetModuleUrl = APIURLS.APIURL.GetModule;

    axios
      .post(GetModuleUrl, handleCreateData, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;

          this.setState({
            oldName: data.Name,
            Module: data,
            Name: data.Name,
            Description: data.Description,
            IconName: data.IconName,
            ProgressLoader: true,
          });
        } else {
        }
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
      if (val === "PagesDetailsExpanded") {
        this.state.PagesDetailsExpanded === true
          ? this.setState({ PagesDetailsExpanded: false })
          : this.setState({ PagesDetailsExpanded: true });
      }
    };

    const CheckName = () => {
      if (
        this.state.Name === "" ||
        this.state.Name === null ||
        this.state.Name.length > 20 ||
        this.state.duplicate === true
      ) {
        this.setState({ updateBtnDisable: true });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let duplicateExist = CF.chkDuplicateButExcludeName(
          this.state.modules,
          "name",
          this.state.oldName,
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
              updateBtnDisable: true,
              Name: e.target.value,
            });
          }

          if (e.target.value === "") {
            Validations.Name = {
              errorState: true,
              errorMsg: "Blank inputs not allowed!",
            };
            this.setState({
              Name: e.target.value,

              updateBtnDisable: true,
              Validations: Validations,
            });
          }
          if (e.target.value.length > 20) {
            Validations.Name = {
              errorState: true,
              errorMsg: "Maximum 20 characters Allowed!",
            };
          }
          this.setState({
            updateBtnDisable: true,
            Validations: Validations,
            Name: e.target.value,

          });
        } else {
          let Module = this.state.Module;
          Module.Name = e.target.value;
          let Validations = this.state.Validations;
          Validations.Name = { errorState: false, errorMsg: "" };
          this.setState({
            Module: Module,
            Name: e.target.value,
            updateBtnDisable: false,
            Validations: Validations,
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
              Description: e.target.value,

              updateBtnDisable: true,
              Validations: Validations,
            });
          }
          if (e.target.value.length > 20) {
            Validations.Description = {
              errorState: true,
              errorMsg: "Maximum 50 characters Allowed!",
            };
          }
          this.setState({
            updateBtnDisable: true,
            Validations: Validations,
            Description: e.target.value,

          });
        } else {
          let Module = this.state.Module;
          Module.Description = e.target.value;
          let Validations = this.state.Validations;
          Validations.Description = { errorState: false, errorMsg: "" };
          this.setState({
            Module: Module,
            Description: e.target.value,
            updateBtnDisable: false,
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
              IconName: e.target.value,
              updateBtnDisable: true,
              Validations: Validations,
            });
          }
          if (e.target.value.length > 20) {
            Validations.IconName = {
              errorState: true,
              errorMsg: "Maximum 50 characters Allowed!",
            };
            this.setState({
              updateBtnDisable: true,
              Validations: Validations,
              IconName: e.target.value,

            });
          }
        } else {
          let Module = this.state.Module;
          Module.IconName = e.target.value;
          let Validations = this.state.Validations;
          Validations.IconName = { errorState: false, errorMsg: "" };
          this.setState({
            Module: Module,
            IconName: e.target.value,
            updateBtnDisable: false,
          });
        }
      }
      CheckName();
    };

    const handleUpdate = () => {
      CheckName();
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let Module = this.state.Module;
      const handleCreateData = {
        validUser: ValidUser,
        Module: Module,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateModuleUrl = APIURLS.APIURL.UpdateModule;

      axios
        .post(UpdateModuleUrl, handleCreateData, { headers })
        .then((response) => {
          let data = response.data;   
          if(response.status===200){
            this.setState({ErrorPrompt: false,SuccessPrompt: true});
          }else{
            this.setState({ErrorPrompt: true});
          }

        })
        .catch((error) => {
          this.setState({ErrorPrompt: true});
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
          masterHref={URLS.URLS.moduleMaster + this.state.urlparams}
          masterLinkTitle="Module"
          typoTitle="Edit Module"
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
            onClick={handleUpdate}
            disabled={this.state.updateBtnDisable}
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
                onClick={(e) =>
                  handleAccordionClick("GeneralDetailsExpanded", e)
                }
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
                          maxlength: 50,
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
                          maxlength: 50,
                        }}
                        value={this.state.IconName}
                        error={this.state.Validations.IconName.errorState}
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
            <Accordion
              key="country-General-Details"
              expanded={this.state.PagesDetailsExpanded}
            >
              <AccordionSummary
                className="accordion-Header-Design"
                expandIcon={
                  <ExpandMoreIcon
                    onClick={(e) =>
                      handleAccordionClick("PagesDetailsExpanded", e)
                    }
                  />
                }
                aria-controls="panel1a-content"
                id="panel1a-header"
                style={{ minHeight: 20, height: "100%" }}
                onClick={(e) =>
                  handleAccordionClick("PagesDetailsExpanded", e)
                }
              >
                <Typography key="" className="accordion-Header-Title">
                  Pages 
                </Typography>
              </AccordionSummary>
              <AccordionDetails key="" className="AccordionDetails-css">
               
              </AccordionDetails>
            </Accordion>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default editmodule;
