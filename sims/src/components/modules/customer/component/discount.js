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
import DateTextboxInput from "../../../compo/tablerowcelldateinput";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";

class discount extends React.Component {
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
      listDiscount: null,
      updateDiscount: {},
      branchData: [],
      DiscountData: [],
      GeneralDetailsExpanded: true,
      createNewBtn: false,
      updateBtn: false,
      Discount: {
        ID: 0,
        CustID: 0,
        BranchID: 0,
        LowerLimit1: 0,
        LowerLimit2: 0,
        LowerLimit3: 0,
        LowerLimit4: 0,
        UpperLimit1: 0,
        UpperLimit2: 0,
        UpperLimit3: 0,
        Percentage1: 0,
        Percentage2: 0,
        Percentage3: 0,
        Percentage4: 0,
        Surcharge1: 0,
        Surcharge2: 0,
        Surcharge3: 0,
        Surcharge4: 0,
        StartDate: "",
        EndDate: "",
        IsActive: false,
      },
    };
  }

  componentDidMount() {
    this.getDiscount();
    this.getBranches();
  }

  getBranches() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetBrachesUrl = APIURLS.APIURL.GetBraches;

    axios
      .post(GetBrachesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].name,
            value: data[i].branchId,
          };
          newD.push(o);
        }
        this.setState({ branchData: newD, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ branchData: [], ProgressLoader: true });
      });
  }

  getDiscount = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let data = {
      ValidUser: ValidUser,
    };
    axios
      .post(data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ DiscountData: data, ProgressLoader: true }, () => {
          this.setState({
            listDiscount: this.listDiscount(),
          });
        });
      })
      .catch((error) => {
        this.setState({ CustomerPriceData: [], ProgressLoader: true }, () => {
          this.setState({
            listDiscount: this.listDiscount(),
          });
        });
      });
  };

  handleRowClick = (e, item, id) => {
    try {
      this.setState({
        Discount: item,
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
      for (let i = 0; i < this.state.DiscountData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  showAddNewPanel = (e) => {
    this.removeIsSelectedRowClasses();
    let DiscountTemplate = {
      ID: 0,
      CustID: 0,
      BranchID: 0,
      LowerLimit1: 0,
      LowerLimit2: 0,
      LowerLimit3: 0,
      LowerLimit4: 0,
      UpperLimit1: 0,
      UpperLimit2: 0,
      UpperLimit3: 0,
      Percentage1: 0,
      Percentage2: 0,
      Percentage3: 0,
      Percentage4: 0,
      Surcharge1: 0,
      Surcharge2: 0,
      Surcharge3: 0,
      Surcharge4: 0,
      StartDate: "",
      EndDate: "",
      IsActive: false,
    };

    this.setState({
      Discount: DiscountTemplate,
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

  listDiscount = () => {
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
                aria-label="CustomerDiscount List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>
                    <TableCell className="table-header-font" align="left">
                      Start Date
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      End Date
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Item
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
    let Discount = this.state.Discount;

    switch (param) {
      case "BranchID":
        Discount[param] = CF.toInt(e.target.value);
        this.setParams(Discount);
        break;
      case "IsActive":
        Discount[param] = e.target.checked;
        this.setParams(Discount);
        break;
      case "LowerLimit1":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "LowerLimit2":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "LowerLimit3":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "LowerLimit4":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "UpperLimit1":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "UpperLimit2":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "UpperLimit3":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Percentage1":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Percentage2":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Percentage3":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Percentage4":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Surcharge1":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Surcharge2":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Surcharge3":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      case "Surcharge4":
        Discount[param] = CF.toFloat(e.target.value);
        this.setParams(Discount);
        break;
      default:
        break;
    }
  };

  createDiscount = () => {
    // let ValidUser = APIURLS.ValidUser;
    // ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    // ValidUser.Token = getCookie(COOKIE.TOKEN);
    // const headers = {
    //   "Content-Type": "application/json",
    // };
      //  let Url = APIURLS.APIURL.;
    // let reqData = {
    //   ValidUser: ValidUser,
    // };
    // axios
    //   .post(Url, reqData, { headers })
    //   .then((response) => {
    //     if (response.status === 200 || response.status === 201) {
    //       let Discount = {
    //         ID: 0,
    //         CustID: 0,
    //         BranchID: 0,
    //         LowerLimit1: 0,
    //         LowerLimit2: 0,
    //         LowerLimit3: 0,
    //         LowerLimit4: 0,
    //         UpperLimit1: 0,
    //         UpperLimit2: 0,
    //         UpperLimit3: 0,
    //         Percentage1: 0,
    //         Percentage2: 0,
    //         Percentage3: 0,
    //         Percentage4: 0,
    //         Surcharge1: 0,
    //         Surcharge2: 0,
    //         Surcharge3: 0,
    //         Surcharge4: 0,
    //         StartDate: "",
    //         EndDate: "",
    //         IsActive: false,
    //       };
    //       this.setState(
    //         {
    //           Discount: DiscountTemplate,
    //           SuccessPrompt: true,
    //         },
    //         () => {
    //           this.getDiscount();
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
    this.setState({ Discount: object });
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
                    {this.state.listDiscount}
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
                          //   onClick={(e) => this.createDiscount(e)}
                        >
                          {APIURLS.buttonTitle.save}
                        </Button>
                      ) : (
                        <Button
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          //   onClick={(e) => this.createDiscount(e)}
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
                        height: 400,
                        marginTop: 10,
                        overflowX: "hidden",
                        overflowY: "scroll",
                        width: "100%",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      <div style={{ height: 20 }}>&nbsp;</div>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
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
                                    value={this.state.Discount.BranchID}
                                    options={this.state.branchData}
                                    isMandatory={true}
                                  />

                                  <DateTextboxInput
                                    id="StartDate"
                                    label="StartDate"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("StartDate", e)
                                    }
                                    value={this.state.Discount.StartDate}
                                  />
                                  <DateTextboxInput
                                    id="EndDate"
                                    label="EndDate"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("EndDate", e)
                                    }
                                    value={this.state.Discount.EndDate}
                                  />

                                  <SwitchInput
                                    key="IsActive"
                                    id="IsActive"
                                    label="IsActive"
                                    param={this.state.Discount.IsActive}
                                    onChange={(e) =>
                                      this.updateFormValue("IsActive", e)
                                    }
                                    value={this.state.Discount.IsActive}
                                  />
                                </TableBody>
                              </Table>
                            </Grid>
                          </Grid>

                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={10} lg={10}>
                              <Table
                                stickyHeader
                                size="small"
                                className="accordion-table"
                                aria-label="Customercategory  table"
                              >
                                <TableHead className="table-header-background">
                                  <TableCell
                                    className="table-header-font"
                                    align="left"
                                  >
                                    LowerLimit
                                  </TableCell>
                                  <TableCell
                                    className="table-header-font"
                                    align="left"
                                  >
                                    UpperLimit
                                  </TableCell>
                                  <TableCell
                                    className="table-header-font"
                                    align="left"
                                  >
                                    Percentage
                                  </TableCell>
                                  <TableCell
                                    className="table-header-font"
                                    align="left"
                                  >
                                    Surcharge
                                  </TableCell>
                                </TableHead>
                                <TableBody className="tableBody">
                                  <TableRow>
                                    <TableCell>
                                      <Inputcustom
                                        id="LowerLimit1"
                                        // label="Lower Limit1"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("LowerLimit1", e)
                                        }
                                        value={this.state.Discount.LowerLimit1}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="UpperLimit1"
                                        // label="Upper Limit1"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("UpperLimit1", e)
                                        }
                                        value={this.state.Discount.UpperLimit1}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="Percentage1"
                                        // label="Percentage1"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Percentage1", e)
                                        }
                                        value={this.state.Discount.Percentage1}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      {" "}
                                      <Inputcustom
                                        id="Surcharge1"
                                        // label="Surcharge1"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Surcharge1", e)
                                        }
                                        value={this.state.Discount.Surcharge1}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>
                                      <Inputcustom
                                        id="LowerLimit2"
                                        // label="LowerLimit2"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("LowerLimit2", e)
                                        }
                                        value={this.state.Discount.LowerLimit2}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="UpperLimit2"
                                        // label="Upper Limit2"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("UpperLimit2", e)
                                        }
                                        value={this.state.Discount.UpperLimit2}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="Percentage2"
                                        // label="Percentage2"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Percentage2", e)
                                        }
                                        value={this.state.Discount.Percentage2}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="Surcharge2"
                                        // label="Surcharge2"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Surcharge2", e)
                                        }
                                        value={this.state.Discount.Surcharge2}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>
                                      <Inputcustom
                                        id="LowerLimit3"
                                        // label="Lower Limit3"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("LowerLimit3", e)
                                        }
                                        value={this.state.Discount.LowerLimit3}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="UpperLimit3"
                                        // label="Upper Limit3"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("UpperLimit3", e)
                                        }
                                        value={this.state.Discount.UpperLimit3}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="Percentage3"
                                        // label="Percentage3"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Percentage3", e)
                                        }
                                        value={this.state.Discount.Percentage3}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="Surcharge3"
                                        // label="Surcharge3"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Surcharge3", e)
                                        }
                                        value={this.state.Discount.Surcharge3}
                                      />
                                    </TableCell>
                                  </TableRow>
                                  <TableRow>
                                    <TableCell>
                                      <Inputcustom
                                        id="LowerLimit4"
                                        // label="Lower Limit4"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("LowerLimit4", e)
                                        }
                                        value={this.state.Discount.LowerLimit4}
                                      />
                                    </TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="Percentage4"
                                        // label="Percentage4"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Percentage4", e)
                                        }
                                        value={this.state.Discount.Percentage4}
                                      />
                                    </TableCell>
                                    <TableCell></TableCell>
                                    <TableCell>
                                      <Inputcustom
                                        id="Surcharge4"
                                        // label="Surcharge4"
                                        variant="outlined"
                                        size="small"
                                        onChange={(e) =>
                                          this.updateFormValue("Surcharge4", e)
                                        }
                                        value={this.state.Discount.Surcharge4}
                                      />
                                    </TableCell>
                                  </TableRow>
                                </TableBody>
                              </Table>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>

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
export default discount;
