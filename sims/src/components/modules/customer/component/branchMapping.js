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
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import CloseFullscreenIcon from "@mui/icons-material/CloseFullscreen";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@mui/material/IconButton";

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

class branchMapping extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      FullSmallBtnArea: false,
      mainframeW: 12,
      hideSidePanel: true,
      initialCss: "",
      listBranchMapping: null,
      updateBranchMapping: {},
      BranchMappingData: [],
      GeneralDetailsExpanded: true,
      createNewBtn: false,
      updateBtn: false,
      BranchMapping: {
        CustID: 0,
        BranchID: 0,
        GeneralPostingGroupID: 0,
        CustomerPostingGroupID: 0,
      },
    };
  }

  componentDidMount() {
    this.getBranchMapping();
  }

  getBranchMapping = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllCustomerCategory;
    let data = {
      ValidUser: ValidUser,
    };
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ BranchMappingData: data, ProgressLoader: true }, () => {
          this.setState({
            listBranchMapping: this.listBranchMapping(),
          });
        });
      })
      .catch((error) => {
        this.setState({ BranchMappingData: [], ProgressLoader: true }, () => {
          this.setState({
            listBranchMapping: this.listBranchMapping(),
          });
        });
      });
  };

  handleRowClick = (e, item, id) => {
    try {
      this.setState({
        BranchMapping: item,
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
      for (let i = 0; i < this.state.BranchMappingData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  showAddNewPanel = (e) => {
    this.removeIsSelectedRowClasses();
    let BranchMappingTemplate = {
      CustID: 0,
      BranchID: 0,
      GeneralPostingGroupID: 0,
      CustomerPostingGroupID: 0,
    };

    this.setState({
      BranchMapping: BranchMappingTemplate,
      FullSmallBtnArea: true,
      mainframeW: 8,
      hideSidePanel: false,
      createNewBtn: true,
      updateBtn: false,
    });
  };

  getPageData = (data) => {
    let rows = data;
    let page = parseInt(this.state.pagination.page);
    let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  listBranchMapping = () => {
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
                      Branch
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      General Posting Group
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Customer Posting Group
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

  updateFormValue = (param, e) => {
    let BranchMapping = this.state.BranchMapping;

    switch (param) {
    }
  };

  createBranchMapping = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    //  let Url = APIURLS.APIURL.;
    // let reqData = {
    //   ValidUser: ValidUser,
    //   BranchMapping: [this.state.BranchMapping],
    // };
    // axios
    //   .post(Url, reqData, { headers })
    //   .then((response) => {
    //     if (response.status === 200 || response.status === 201) {
    //       let BranchMappingTemplate = {
    // CustID: 0,
    // BranchID: 0,
    // GeneralPostingGroupID: 0,
    // CustomerPostingGroupID: 0,
    //       };
    //       this.setState(
    //         {
    //           BranchMapping: BranchMappingTemplate,
    //           SuccessPrompt: true,
    //         },
    //         () => {
    //           this.getBranchMapping();
    //           this.expandFull();
    //           this.removeIsSelectedRowClasses();
    //         }
    //       );
    //     } else {
    //       this.setState({ ErrorPrompt: true, SuccessPrompt: false });
    //     }
    //   })
    //   .catch((error) => {
    //     this.setState({ ErrorPrompt: true });
    //   });
  };

  setParams = (object) => {
    this.setState({ CustomerCategory: object });
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
                    {this.state.listBranchMapping}
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
                        aria-label="Customercategory  table"
                      >
                        <TableBody className="tableBody">
                          <DropdownInput
                            id="BranchID"
                            label="BranchID"
                            onChange={(e) =>
                              this.updateFormValue("BranchID", e)
                            }
                            value={this.state.BranchMapping.BranchID}
                            //   options={}
                            isMandatory={true}
                          />
                          <DropdownInput
                            id="GeneralPostingGroupID"
                            label="GeneralPostingGroupID"
                            onChange={(e) =>
                              this.updateFormValue("GeneralPostingGroupID", e)
                            }
                            value={
                              this.state.BranchMapping.GeneralPostingGroupID
                            }
                            //   options={}
                            isMandatory={true}
                          />
                          <DropdownInput
                            id="CustomerPostingGroupID"
                            label="CustomerPostingGroupID"
                            onChange={(e) =>
                              this.updateFormValue("CustomerPostingGroupID", e)
                            }
                            value={
                              this.state.BranchMapping.CustomerPostingGroupID
                            }
                            //   options={}
                            isMandatory={true}
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
export default branchMapping;
