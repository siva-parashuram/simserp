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
import BackdropLoader from "../../../compo/backdrop";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";

class customerCategory extends React.Component {
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
      listCustomerCategory: null,
      updateCustomerCategory: {},
      CustomerCategoryData: [],
      GeneralDetailsExpanded: true,
      createNewBtn: false,
      updateBtn: false,
      CustomerCategory: {
        CustomerCategoryID: 0,
        Code: "",
        Description: "",
        IsActive: false,
      },
    };
  }

  componentDidMount() {
    this.getCustomerCategory();
  }

  getCustomerCategory = () => {
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
        this.setState(
          { CustomerCategoryData: data, ProgressLoader: true },
          () => {
            this.setState({
              listCustomerCategory: this.listCustomerCategory(),
            });
          }
        );
      })
      .catch((error) => {
        this.setState(
          { CustomerCategoryData: [], ProgressLoader: true },
          () => {
            this.setState({
              listCustomerCategory: this.listCustomerCategory(),
            });
          }
        );
      });
  };

  handleRowClick = (e, item, id) => {
    try {
      this.setState({
        CustomerCategory: item,
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
      for (let i = 0; i < this.state.CustomerCategoryData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  showAddNewPanel = (e) => {
    this.removeIsSelectedRowClasses();
    let CustomerCategoryTemplate = {
      CustomerCategoryID: 0,
      Code: "",
      Description: "",
      IsActive: false,
    };

    this.setState({
      CustomerCategory: CustomerCategoryTemplate,
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

  listCustomerCategory = () => {
    let o = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={10} lg={10}>
            <Button
              startIcon={APIURLS.buttonTitle.add.icon}
              className="action-btns"
              style={{ marginLeft: 5, marginBottom: 10 }}
              onClick={(e) => this.showAddNewPanel(e)}
            >
              <span style={{ paddingLeft: 7, paddingRight: 5 }}>
                {APIURLS.buttonTitle.add.name}
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
                      Code
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Description
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Status
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {this.getPageData(this.state.CustomerCategoryData).map(
                    (item, i) => (
                      <TableRow
                        id={"row_" + i}
                        key={i}
                        onClick={(event) =>
                          this.handleRowClick(event, item, "row_" + i)
                        }
                      >
                        <TableCell> {i + 1}</TableCell>
                        <TableCell align="left">{item.Code}</TableCell>
                        <TableCell> {item.Description}</TableCell>

                        <TableCell align="left">
                          {item.IsActive === true ? (
                            <span>Active</span>
                          ) : (
                            <span>Not Active</span>
                          )}
                        </TableCell>
                      </TableRow>
                    )
                  )}
                </TableBody>
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
    let CustomerCategory = this.state.CustomerCategory;

    switch (param) {
      case "Code":
        CustomerCategory[param] = e.target.value;
        this.setParams(CustomerCategory);
        break;
      case "Description":
        CustomerCategory[param] = e.target.value;
        this.setParams(CustomerCategory);
        break;
      case "IsActive":
        CustomerCategory[param] = e.target.checked;
        this.setParams(CustomerCategory);
        break;
      default:
        break;
    }
  };

  createCustomerCategory = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.CreateCustomerCategory;
    let reqData = {
      ValidUser: ValidUser,
      CustomerCategory: this.state.CustomerCategory,
    };
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let CustomerCategoryTemplate = {
            CustomerCategoryID: 0,
            Code: "",
            Description: "",
            IsActive: false,
          };
          this.setState(
            {
              CustomerCategory: CustomerCategoryTemplate,
              SuccessPrompt: true,
            },
            () => {
              this.getCustomerCategory();
              this.expandFull();
              this.removeIsSelectedRowClasses();
            }
          );
        } else {
          this.setState({ ErrorPrompt: true, SuccessPrompt: false });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true });
      });
  };

  UpdateCustomerCategory = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.UpdateCustomerCategory;
    let reqData = {
      ValidUser: ValidUser,
      CustomerCategoryList: [this.state.CustomerCategory],
    };
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.setState(
            {
              SuccessPrompt: true,
              ErrorPrompt: false,
            },
            () => {
              this.getCustomerCategory();

              this.removeIsSelectedRowClasses();
            }
          );
        } else {
          this.setState({ ErrorPrompt: true, SuccessPrompt: false });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true });
      });
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
        <BackdropLoader open={!this.state.ProgressLoader} />

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
        <BackdropLoader open={!this.state.ProgressLoader} />
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
                    {this.state.listCustomerCategory}
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
                        startIcon={APIURLS.buttonTitle.add.icon}
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          onClick={(e) => this.createCustomerCategory(e)}
                        >
                          {APIURLS.buttonTitle.add.name}
                        </Button>
                      ) : (
                        <Button
                        startIcon={APIURLS.buttonTitle.update.icon}
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          onClick={(e) => this.UpdateCustomerCategory(e)}
                        >
                          {APIURLS.buttonTitle.update.name}
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
                          <TextboxInput
                            id="Code"
                            label="Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("Code", e)}
                            value={this.state.CustomerCategory.Code}
                          />
                          <TextboxInput
                            id="Description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                              this.updateFormValue("Description", e)
                            }
                            value={this.state.CustomerCategory.Description}
                          />
                          <SwitchInput
                            key="IsActive"
                            label="IsActive"
                            param={this.state.CustomerCategory.IsActive}
                            onChange={(e) =>
                              this.updateFormValue("IsActive", e)
                            }
                            value={this.state.CustomerCategory.IsActive}
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
export default customerCategory;
