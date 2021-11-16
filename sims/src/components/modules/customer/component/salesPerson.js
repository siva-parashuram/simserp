import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import SwitchInput from "../../../compo/tablerowcellswitchinput";
import IconButton from "@mui/material/IconButton";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Loader from "../../../compo/loader";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";

class salesPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      FullSmallBtnArea: false,
      mainframeW: 12,
      hideSidePanel: true,
      initialCss: "",
      listSalesPerson: null,
      updateSalesPerson: {},
      SalesPersonData: [],
      createNewBtn: false,
      updateBtn: false,
      SalesPerson: {
        SalesPersonID: 0,
        Code: "",
        Name: "",
        JobTitle: "",
        EmailID: "",
        PhoneNo: "",
        IsActive: false,
        CommsionPecentage: "",
      },
    };
  }

  componentDidMount() {
    this.getSalesPerson();
  }

  getSalesPerson = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    // let Url = APIURLS.APIURL.;
    axios
      .post(ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ SalesPersonData: data, ProgressLoader: true }, () => {
          this.setState({
            listSalesPerson: this.listSalesPerson(),
          });
        });
      })
      .catch((error) => {
        this.setState({ SalesPersonData: [], ProgressLoader: true }, () => {
          this.setState({
            listSalesPerson: this.listSalesPerson(),
          });
        });
      });
  };

  handleRowClick = (e, item, id) => {
    try {
      this.setState({
        SalesPerson: item,
        FullSmallBtnArea: true,
        mainframeW: 8,
        hideSidePanel: false,
        updateBtn: true,
        createNewBtn: false,
      });
      this.removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    } catch (ex) {}
  };

  removeIsSelectedRowClasses = () => {
    try {
      for (let i = 0; i < this.state.SalesPersonData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  showAddNewPanel = (e) => {
    this.removeIsSelectedRowClasses();
    let SalesPersonTemplate = {
      SalesPersonID: 0,
        Code: "",
        Name: "",
        JobTitle: "",
        EmailID: "",
        PhoneNo: "",
        IsActive: false,
        CommsionPecentage: "",
    };

    this.setState({
      SalesPerson: SalesPersonTemplate,
      FullSmallBtnArea: true,
      mainframeW: 8,
      hideSidePanel: false,
      createNewBtn: true,
      updateBtn: false,
    });
  };

  listSalesPerson = () => {
    let o = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={10} lg={10}>
            <Button
              className="action-btns"
              style={{ marginLeft: 5, marginBottom: 10 }}
              onClick={(e) => this.showAddNewPanel(e)}
            >
              <span style={{ paddingLeft: 7, paddingRight: 5 }}>
                {APIURLS.buttonTitle.new}
              </span>
            </Button>
          </Grid>
        </Grid>

        <div style={{ height: 350, width: "100%", overflowY: "scroll" }}>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Table
                stickyHeader
                size="small"
                className=""
                aria-label="CustomerCategory List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>
                    <TableCell className="table-header-font" align="left">
                      Name
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody"></TableBody>
              </Table>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
    return o;
  };

  updateFormValue = (param, e, index) => {
    console.log("updateFormValue > index > ", index);
    let SalesPerson = this.state.SalesPerson;
  };

  setParams = (object) => {
    this.setState({ SalesPerson: object });
  };

  expandFull = (e) => {
    this.setState({
      mainframeW: 12,
      hideSidePanel: true,
    });
  };

  closeExpandFull = (e) => {
    this.setState({
      mainframeW: 8,
      hideSidePanel: false,
    });
  };

  
  render() {
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

        <Grid container spacing={6}>
          <Grid item xs={12} sm={12} md={11} lg={11}>
            &nbsp;
          </Grid>
          <Grid item xs={12} sm={12} md={1} lg={1}>
            {this.state.FullSmallBtnArea === true ? (
              <div>
                {this.state.hideSidePanel === false ? (
                  <IconButton
                    aria-label="OpenInFullIcon"
                    onClick={(e) => this.expandFull(e)}
                  >
                    <OpenInFullIcon className="openfullbtn" fontSize="small" />
                  </IconButton>
                ) : null}
                {this.state.hideSidePanel === true ? (
                  <IconButton
                    aria-label="CloseFullscreenIcon"
                    onClick={(e) => this.closeExpandFull(e)}
                  >
                    <CloseFullscreenIcon
                      className="openfullbtn"
                      fontSize="small"
                    />
                  </IconButton>
                ) : null}
              </div>
            ) : null}
          </Grid>
        </Grid>

        <div style={{ height: 10 }}>&nbsp;</div>
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <div style={{ height: 10 }}>&nbsp;</div>

        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={12}
            md={this.state.mainframeW}
            lg={this.state.mainframeW}
          >
            <Grid style={{ marginLeft: 15 }} container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {this.state.listSalesPerson}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {this.state.hideSidePanel === false ? (
            <Grid item xs={12} sm={12} md={4} lg={4}>
              <div
              // style={{ marginLeft: 10, marginTop: 45 }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    <div style={{ marginTop: -12, marginLeft: 1 }}>
                      <h4>Detail view</h4>
                    </div>
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div>
                      {this.state.createNewBtn === true ? (
                        <Button
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          // onClick={(e) => }
                        >
                          {APIURLS.buttonTitle.save}
                        </Button>
                      ) : (
                        <Button
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          // onClick={(e) => }
                        >
                          {APIURLS.buttonTitle.update}
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div
                      style={{
                        height: 300,
                        marginTop: 10,
                        overflowX: "hidden",
                        overflowY: "scroll",
                        width: "100%",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <div style={{ height: 20 }}>&nbsp;</div>
                      <Table
                        stickyHeader
                        size="small"
                        className="accordion-table"
                        aria-label="SalesPerson  table"
                      >
                        <TableBody className="tableBody">
                          <TextboxInput
                            id="Code"
                            label="Code"
                            variant="outlined"
                            size="small"
                            isMandatory={true}
                          />
                          <TextboxInput
                            id="Name"
                            label="Name"
                            variant="outlined"
                            size="small"
                            isMandatory={true}
                          />
                          <TextboxInput
                            id="JobTitle"
                            label="Job Title"
                            variant="outlined"
                            size="small"
                          />
                          <TextboxInput
                            id="EmailID"
                            label="EmailID"
                            variant="outlined"
                            size="small"
                          />

                          <TextboxInput
                            type="number"
                            id="PhoneNo"
                            label="Phone No"
                            variant="outlined"
                            size="small"
                          />
                          <SwitchInput
                            key="IsActive"
                            id="IsActive"
                            label="IsActive"
                            param={this.state.SalesPerson.IsActive}
                            // onChange={(e) => updateFormValue("IsActive", e)}
                          />
                          <TextboxInput
                            id="CommsionPecentage"
                            label="Commsion Pecentage"
                            variant="outlined"
                            size="small"
                          />
                        </TableBody>
                      </Table>
                      <div style={{ height: 20 }}>&nbsp;</div>
                    </div>
                  </Grid>
                </Grid>
              </div>
            </Grid>
          ) : null}
        </Grid>
      </Fragment>
    );
  }
}
export default salesPerson;
