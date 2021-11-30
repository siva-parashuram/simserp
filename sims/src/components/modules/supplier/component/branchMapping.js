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
      BranchMappingDataList: [],
      BranchMappingDataHistory: [],
      BranchMappingData: [],
      GeneralDetailsExpanded: true,
      createNewBtn: false,
      updateBtn: false,
      SupplierPostingGroupList: [],
      GeneralPostingGroupList: [],
      branchData: [],
      selectedOldItem: null,
      selectedOldItemIndex: null,
      BranchMapping: {
        ID: 0,
        SuplID: this.props.CustID,
        BranchID: "-1",
        GeneralPostingGroupID: "-1",
        SupplierPostingGroupID: "-1",
        IsTaxExempt: false,
        Reason: "",
      },
    };
  }

  getDropdownValues = () => {
    this.getBranches();
    this.getAllSupplierPostingGroup();
    this.getAllGeneralPostingGroup();
  };

  componentDidMount() {
    this.getDropdownValues();
    this.getBranchMapping();
  }

  getAllSupplierPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplierPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code + "-" + data[i].Description,
            value: data[i].SupplierPostingGroupID,
          };
          newD.push(o);
        }
        this.setState({ SupplierPostingGroupList: newD });
      })
      .catch((error) => {});
  };

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
            name: data[i].Name,
            value: data[i].BranchID,
          };
          newD.push(o);
        }
        this.setState({ branchData: newD, ProgressLoader: true }, () => {
          this.setState({
            listBranchMapping: this.listBranchMapping(),
          });
        });
      })
      .catch((error) => {
        this.setState({ branchData: [], ProgressLoader: true });
      });
  }

  getAllGeneralPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllGeneralPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code,
            value: data[i].GeneralPostingGroupID,
          };
          newD.push(o);
        }
        this.setState({ GeneralPostingGroupList: newD }, () => {
          this.setState({
            listBranchMapping: this.listBranchMapping(),
          });
        });
      })
      .catch((error) => {});
  };

  getBranchMapping = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetSupplierBranchMappingBySuplID;
    let data = {
      ValidUser: ValidUser,
      SupplierBranchMapping: {
        SuplID: this.props.SuplID,
      },
    };
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState(
          {
            BranchMappingData: data,
            BranchMappingDataList: data,
            ProgressLoader: true,
          },
          () => {
            this.setState({
              listBranchMapping: this.listBranchMapping(),
            });
          }
        );
      })
      .catch((error) => {
        this.setState({ BranchMappingData: [], ProgressLoader: true }, () => {
          this.setState({
            listBranchMapping: this.listBranchMapping(),
          });
        });
      });
  };

  handleRowClick = (e, item, id, i) => {
    try {
      this.setState({
        BranchMapping: item,
        FullSmallBtnArea: true,
        mainframeW: 7,
        hideSidePanel: false,
        updateBtn: true,
        createNewBtn: false,
        selectedOldItem: item,
        selectedOldItemIndex: i,
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
      ID: 0,
      SuplID: this.props.SuplID,
      BranchID: "-1",
      GeneralPostingGroupID: "-1",
      SupplierPostingGroupID: "-1",
      IsTaxExempt: false,
      Reason: "",
    };

    this.setState({
      BranchMapping: BranchMappingTemplate,
      FullSmallBtnArea: true,
      mainframeW: 7,
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
                aria-label="SupplierCategory List table"
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
                      Supplier Posting Group
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {this.state.BranchMappingDataList.map((item, i) => (
                    <TableRow
                      id={"row_" + i}
                      key={i}
                      onClick={(event) =>
                        this.handleRowClick(event, item, "row_" + i, i)
                      }
                    >
                      <TableCell align="left">{i + 1}</TableCell>
                      <TableCell align="left">
                        {this.getNameByID("Branch", item.BranchID)}
                      </TableCell>
                      <TableCell align="left">
                        {this.getNameByID(
                          "GeneralPostingGroup",
                          item.GeneralPostingGroupID
                        )}
                      </TableCell>
                      <TableCell align="left">
                        {this.getNameByID(
                          "SupplierPostingGroup",
                          item.SupplierPostingGroupID
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
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
      case "IsTaxExempt":
        BranchMapping[param] = e.target.checked;
        this.setParams(BranchMapping);
        break;
      case "Reason":
        BranchMapping[param] = e.target.value;
        this.setParams(BranchMapping);
        break;
      default:
        BranchMapping[param] = CF.toInt(e.target.value);
        this.setParams(BranchMapping);
        break;
    }
  };
  setParams = (object) => {
    this.setState({ BranchMapping: object });
  };

  createBranchMapping = (param) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.CreateSupplierBranchMapping;
    let BranchMappingDataList = this.state.BranchMappingDataList;
    let BranchMappingDataHistory = this.state.BranchMappingDataHistory;
    switch (param) {
      case "NEW":
        BranchMappingDataList.push(this.state.BranchMapping);
        BranchMappingDataHistory = [];
        break;
      case "UPDATE":
        let selectedOldItem = this.state.selectedOldItem;
        let index = this.state.selectedOldItemIndex;
        BranchMappingDataList[index] = this.state.BranchMapping;
        BranchMappingDataHistory.push(selectedOldItem);
        break;
      default:
        break;
    }

    let reqData = {
      ValidUser: ValidUser,
      SupplierBranchMappingList: BranchMappingDataList,
    };

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let BranchMapping = {
            ID: 0,
            SuplID: this.props.CustID,
            BranchID: "-1",
            GeneralPostingGroupID: "-1",
            SupplierPostingGroupID: "-1",
            IsTaxExempt: false,
            Reason: "",
          };
          this.setState(
            {
              BranchMapping: BranchMapping,
              SuccessPrompt: true,
              SupplierPriceHistory: [],
            },
            () => {
              this.getBranchMapping();
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

  getNameByID = (type, id) => {
    console.log("getNameByID > type > ", type);
    console.log("getNameByID > id > ", id);
    let name = "";
    let array = [];
    switch (type) {
      case "Branch":
        array = this.state.branchData;
        console.log("In Branch > array > ", array);
        for (let i = 0; i < array.length; i++) {
          if (array[i].value === CF.toInt(id)) {
            name = array[i].name;
            break;
          }
        }
        break;
      case "SupplierPostingGroup":
        array = this.state.SupplierPostingGroupList;
        console.log("In SupplierPostingGroup > array > ", array);
        for (let i = 0; i < array.length; i++) {
          if (array[i].value === CF.toInt(id)) {
            name = array[i].name;
            break;
          }
        }
        break;
      case "GeneralPostingGroup":
        array = this.state.GeneralPostingGroupList;
        console.log("In GeneralPostingGroup > array > ", array);
        for (let i = 0; i < array.length; i++) {
          if (array[i].value === CF.toInt(id)) {
            name = array[i].name;
            break;
          }
        }
        break;
      default:
        break;
    }
    console.log("getNameByID > name > ", name);
    return name;
  };

  expandFull = (e) => {
    this.setState({
      mainframeW: 12,
      hideSidePanel: true,
    });
  };

  closeExpandFull = (e) => {
    this.setState({
      mainframeW: 7,
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
                    {this.state.listBranchMapping}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {this.state.hideSidePanel === false ? (
            <Grid item xs={12} sm={12} md={5} lg={5}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={12} lg={12}>
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
                              onClick={(e) => this.createBranchMapping("NEW")}
                            >
                              {APIURLS.buttonTitle.add.name}
                            </Button>
                          ) : (
                            <Button
                            startIcon={APIURLS.buttonTitle.update.icon}
                              className="action-btns"
                              style={{ marginLeft: 10 }}
                              onClick={(e) =>
                                this.createBranchMapping("UPDATE")
                              }
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
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                              <Table
                                stickyHeader
                                size="small"
                                className="accordion-table"
                                aria-label="Branch Mapping Form  table"
                              >
                                <TableBody className="tableBody">
                                  <DropdownInput
                                    id="BranchID"
                                    label="Branch"
                                    onChange={(e) =>
                                      this.updateFormValue("BranchID", e)
                                    }
                                    value={this.state.BranchMapping.BranchID}
                                    options={this.state.branchData}
                                    isMandatory={true}
                                  />
                                  <DropdownInput
                                    id="GeneralPostingGroupID"
                                    label="Gen Post Group"
                                    onChange={(e) =>
                                      this.updateFormValue(
                                        "GeneralPostingGroupID",
                                        e
                                      )
                                    }
                                    value={
                                      this.state.BranchMapping
                                        .GeneralPostingGroupID
                                    }
                                    options={this.state.GeneralPostingGroupList}
                                    isMandatory={true}
                                  />
                                  <DropdownInput
                                    id="SupplierPostingGroupID"
                                    label="Sup Post"
                                    onChange={(e) =>
                                      this.updateFormValue(
                                        "SupplierPostingGroupID",
                                        e
                                      )
                                    }
                                    value={
                                      this.state.BranchMapping
                                        .SupplierPostingGroupID
                                    }
                                    options={
                                      this.state.SupplierPostingGroupList
                                    }
                                    isMandatory={true}
                                  />

                                  <SwitchInput
                                    key="IsTaxExempt"
                                    id="IsTaxExempt"
                                    label="Tax Exempt"
                                    param={this.state.BranchMapping.IsTaxExempt}
                                    onChange={(e) =>
                                      this.updateFormValue("IsTaxExempt", e)
                                    }
                                  />

                                  <TextboxInput
                                    id="Reason"
                                    label="Reason"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("Reason", e)
                                    }
                                    value={this.state.BranchMapping.Reason}
                                    disabled={!this.state.BranchMapping.IsTaxExempt}
                                  />
                                </TableBody>
                              </Table>
                            </Grid>
                          </Grid>

                          <div style={{ height: 20 }}>&nbsp;</div>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          ) : null}
        </Grid>
      </Fragment>
    );
  }
}
export default branchMapping;
