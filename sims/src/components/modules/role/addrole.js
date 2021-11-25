import "../../user/dasboard.css";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import * as CF from "../../../services/functions/customfunctions";

import TableBody from "@material-ui/core/TableBody";

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import BackdropLoader from "../../compo/backdrop";

class addrole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roles: [],
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      SuccessPrompt: false,
      ErrorPrompt: false,
      Role: {
        RoleId: 0,
        Name: null,
        UserId: 0,
        CreationDate: null,
      },
      CreateBtnDisable: true,
      Name: null,
      Validations: {
        Name: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    this.getRoles();
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

  getRoles() {
    this.setState({ ProgressLoader: false });

    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetRolesUrl = APIURLS.APIURL.GetRoles;

    axios
      .post(GetRolesUrl, ValidUser, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          rows = data;
          this.setState({ roles: rows, ProgressLoader: true });
        } else {
        }
      })
      .catch((error) => {
        this.setState({ roles: [], ProgressLoader: true });
      });
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
      if (id == "name") {
        let duplicateExist = CF.chkDuplicateName(
          this.state.roles,
          "name",
          e.target.value
        );
        if (
          e.target.value === "" ||
          e.target.value.length > 50 ||
          duplicateExist === true
        ) {
          let Role = this.state.Role;
          Role.Name = e.target.value;
          if (duplicateExist === true) {
            let v = this.state.Validations;
            v.Name = {
              errorState: true,
              errorMssg: "Role Master Exists ",
            };
            this.setState({
              Validations: v,
              CreateBtnDisable: true,
              Name: e.target.value,
            });
          }
          {
          }
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.Name = {
              errorState: true,
              errorMssg: "Maximum 50 characters are allowed ",
            };
            this.setState({
              Validations: v,
              CreateBtnDisable: true,
            });
          }
          if (e.target.value === "" || e.target.value === null) {
            let v = this.state.Validations;
            v.Name = { errorState: true, errorMssg: "Name cannot be blank " };
            this.setState({
              Validations: v,
              CreateBtnDisable: true,
              Name: e.target.value,
            });
          }
        } else {
          let Role = this.state.Role;
          Role.Name = e.target.value;
          let v = this.state.Validations;
          v.Name = { errorState: false, errorMssg: " " };
          this.setState({
            Validations: v,
            Role: Role,
            CreateBtnDisable: false,
            Name: e.target.value,
          });
        }
      }
    };

    const handleCreate = (e) => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let Role = this.state.Role;
      Role.UserId = parseInt(getCookie(COOKIE.USERID));
      const headers = {
        "Content-Type": "application/json",
      };
      let data = APIURLS.CreateRoleData;
      data.validUser = ValidUser;
      data.Role = this.state.Role;

      // {
      //     validUser:ValidUser,
      //     Role:this.state.Role
      // };
      let CreateRoleUrl = APIURLS.APIURL.CreateRole;

      axios
        .post(CreateRoleUrl, data, { headers })
        .then((response) => {
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
          masterHref={URLS.URLS.roleMaster + this.state.urlparams}
          masterLinkTitle="Role Master"
          typoTitle="Add Role"
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
            onClick={(e) => handleCreate(e)}
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
          <Grid xs={12} sm={12} md={6} lg={6}>
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
                  Create New Role
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
                        id="name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("name", e)}
                        InputProps={{
                          className: "textFieldCss",
                          maxlength: 50,
                        }}
                        value={this.state.Name}
                        error={this.state.Validations.Name.errorState}
                        helperText={this.state.Validations.Name.errorMssg}
                      />

                      {/* <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        Name
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="name"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('name', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                            }}

                                                        />
                                                    </TableCell>
                                                </TableRow> */}
                    </TableBody>
                  </Table>
                </TableContainer>
              </AccordionDetails>
            </Accordion>
          </Grid>
          <Grid xs={12} sm={12} md={6} lg={6}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default addrole;
