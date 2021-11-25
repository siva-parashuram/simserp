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
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import SwitchInput from "../../../compo/tablerowcellswitchinput";

import ButtonGroup from "@mui/material/ButtonGroup";
import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import "../../../user/dasboard.css";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import Loader from "../../../compo/loader";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Breadcrumb from "../../../compo/breadcrumb";
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";

class addItemDepartment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: true,
      Code: "",
      Name: "",
      IsActive: false,
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Name: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
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

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
    };

    const createNew = () => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateItemDepartment;
      let ReqData = {
        validUser: ValidUser,
        ItemDepartment: {
          ItemDeptID: 0,
          Code: this.state.Code,
          Name: this.state.Name,
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

    const updateFormValue = (param, e) => {
      switch (param) {
        case "Code":
          let v1 = this.state.Validations;
          if (e.target.value === "" || e.target.value.length > 4) {
            if (e.target.value === "") {
              v1.Code = {
                errorState: true,
                errorMssg: "Blank inputs not allowed",
              };
              this.setState({
                Validations: v1,
                Code: e.target.value,
                DisableCreatebtn: true,
              });
            }
            if (e.target.value.length > 4) {
              v1.Code = {
                errorState: true,
                errorMssg: "Maximum 4 characters allowed",
              };
              this.setState({ Validations: v1, DisableCreatebtn: true });
            }
          } else {
            v1.Code = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v1,
              Code: e.target.value,
              DisableCreatebtn: false,
            });
          }
          break;
        case "Name":
          let v2 = this.state.Validations;
          if (e.target.value.length > 50) {
            v2.Name = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.Name = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v2,
              Name: e.target.value,
            });
          }

          break;
        case "IsActive":
          this.setState({ IsActive: e.target.checked });
          break;
        default:
          break;
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
          masterHref={URLS.URLS.itemDepartmentMaster + this.state.urlparams}
          masterLinkTitle="Item Department Master"
          typoTitle="Add..."
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
            onClick={createNew}
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
          <Grid xs={12} sm={6} md={6} lg={6}>
            <Accordion
              key="Item-catagory-General-Details"
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
                    aria-label=" Item-catagory List table"
                  >
                    <TableBody className="tableBody">
                      <TextboxInput
                        id="Code"
                        label="Code"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("Code", e)}
                        InputProps={{
                          className: "textFieldCss",
                          maxlength: 20,
                        }}
                        value={this.state.Code}
                        error={this.state.Validations.Code.errorState}
                        helperText={this.state.Validations.Code.errorMssg}
                      />
                      <TextboxInput
                        id="Name"
                        label="Name"
                        variant="outlined"
                        size="small"
                        onChange={(e) => updateFormValue("Name", e)}
                        InputProps={{
                          className: "textFieldCss",
                          maxlength: 50,
                        }}
                        value={this.state.Name}
                        error={this.state.Validations.Name.errorState}
                        helperText={this.state.Validations.Name.errorMssg}
                      />
                      <SwitchInput
                        key="IsActive"
                        id="IsActive"
                        label="IsActive"
                        param={this.state.IsActive}
                        onChange={(e) => updateFormValue("IsActive", e)}
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
export default addItemDepartment;
