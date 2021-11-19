import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
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
import DateTextboxInput from "../../../compo/tablerowcelldateinput";

import { Divider } from "@material-ui/core";

class supplierPrice extends React.Component {
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
      listSupplierPrice: null,
      updateSupplierPrice: {},
      SupplierPriceData: [],
      GeneralDetailsExpanded: true,
      createNewBtn: false,
      updateBtn: false,
      selectedOldItemIndex: null,
      selectedOldItem: null,
      currencyList: [],
      itemDataList: [],
      UOMList: [],
      SupplierPriceList: [],
      SupplierPriceHistory: [],
      SupplierPrice: {
        SuplID: this.props.SuplID,
        StartDate: "",
        EndDate: "",
        ItemID: 0,
        UOM: 0,
        CurrID: 0,
        MinQty: 0,
        MaxQty: 0,
        UnitPrice: 0,
        EmailID: "",
      },
    };
  }

  componentDidMount() {
    this.getSupplierPrice();
    
    this.getAllDropdowns();
  }

  getAllDropdowns = () => {
    this.getCurrencyList();
    this.getItems();
    this.getUOMList();
  };

  getCurrencyList = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetCurrencies;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].code,
            value: data[i].currId,
          };
          newD.push(o);
        }

        this.setState({
          currencyList: newD,
          ProgressLoader: true,
        },
        () => {
          this.setState({
            listSupplierPrice: this.listSupplierPrice(),
          });
        }
        );
      })
      .catch((error) => {});
  };

  getItems() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetAllItems;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].code,
            value: data[i].itemId,
          };
          newD.push(o);
        }
        this.setState({ itemDataList: newD });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {});
  }

  getUOMList = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllUOM;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].name,
            value: data[i].uomid,
          };
          newD.push(o);
        }

        this.setState({
          UOMList: newD,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
  };

  getSupplierPrice = () => {
    console.log("-----Price----");
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let data = {
      ValidUser: ValidUser,
      SupplierPrice: {
        SuplID: this.props.SuplID,
      },
    };
    let Url=APIURLS.APIURL.GetSupplierPriceBySuplID;
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState(
          {
            SupplierPriceList: data,
            SupplierPriceData: data,
            ProgressLoader: true,
          },
          () => {
            this.setState({
              listSupplierPrice: this.listSupplierPrice(),
            });
          }
        );
      })
      .catch((error) => {
        this.setState(
          {
            SupplierPriceList: [],
            SupplierPriceData: [],
            ProgressLoader: true,
          },
          () => {
            this.setState({
                listSupplierPrice: this.listSupplierPrice(),
            });
          }
        );
      });
  };

  handleRowClick = (e, item, id, i) => {
    let SupplierPrice = {
      SuplID: item.SuplID,
      StartDate: item.StartDate,
      EndDate: item.EndDate,
      ItemID: item.ItemID,
      UOM: item.UOM,
      CurrID: item.CurrID,
      MinQty: item.MinQty,
      MaxQty: item.MaxQty,
      UnitPrice: item.UnitPrice,
      EmailID: item.EmailID,
    };

    console.log("item > ", item);
    console.log("SupplierPrice > ", SupplierPrice);

    try {
      this.setState({
        SupplierPrice: SupplierPrice,
        FullSmallBtnArea: true,
        mainframeW: 8,
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
      for (let i = 0; i < this.state.SupplierPriceData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  showAddNewPanel = (e) => {
    this.removeIsSelectedRowClasses();
    let SupplierPriceTemplate = {
      SuplID: this.props.SuplID,
      StartDate: moment(),
      EndDate: moment(),
      ItemID: 0,
      UOM: 0,
      CurrID: 0,
      MinQty: 0,
      MaxQty: 0,
      UnitPrice: 0,
      EmailID: "",
    };

    this.setState({
      SupplierPrice: SupplierPriceTemplate,
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

  listSupplierPrice = () => {
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
                aria-label="SupplierPrice List table"
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
                    <TableCell className="table-header-font" align="left">
                      UOM
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Currency
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Min Qty
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Max Qty
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {this.state.SupplierPriceList.map((item, i) => (
                    <TableRow
                      id={"row_" + i}
                      key={i}
                      onClick={(event) =>
                        this.handleRowClick(event, item, "row_" + i, i)
                      }
                    >
                      <TableCell>{i + 1}</TableCell>
                      <TableCell align="left">
                        {moment(item.StartDate).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell align="left">
                        {moment(item.EndDate).format("MM/DD/YYYY")}
                      </TableCell>
                      <TableCell align="left">{item.No}</TableCell>
                      <TableCell align="left">{item.UOMCode}</TableCell>
                      <TableCell align="left">{item.CurrCode}</TableCell>
                      <TableCell align="left">{item.MinQty}</TableCell>
                      <TableCell align="left">{item.MaxQty}</TableCell>
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
    let SupplierPrice = this.state.SupplierPrice;
    switch (param) {
      case "ItemID":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      case "UOM":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      case "CurrID":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      case "MinQty":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      case "MaxQty":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      case "UnitPrice":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      default:
        SupplierPrice[param] = e.target.value;
        this.setParams(SupplierPrice);
        break;
    }
  };

  formatDate = (array) => {
    for (let i = 0; i < array.length; i++) {
      let StartDate = array[i].StartDate;
      let EndDate = array[i].EndDate;
      array[i].StartDate = moment(StartDate).format("MM/DD/YYYY");
      array[i].EndDate = moment(EndDate).format("MM/DD/YYYY");
    }
    return array;
  };

  processSupplierPriceList = (SupplierPriceList) => {
    console.log(
      "processlistSupplierPrice > listSupplierPrice > ",
      SupplierPriceList
    );
    let newCPL = [];
    for (let i = 0; i < SupplierPriceList.length; i++) {
      let item = SupplierPriceList[i];
      let SupplierPrice = {
        SuplID: item.SuplID,
        StartDate: item.StartDate,
        EndDate: item.EndDate,
        ItemID: item.ItemID,
        UOM: item.UOM,
        CurrID: item.CurrID,
        MinQty: item.MinQty,
        MaxQty: item.MaxQty,
        UnitPrice: item.UnitPrice,
        EmailID: item.EmailID,
        UserID: CF.toInt(getCookie(COOKIE.USERID)),
      };
      newCPL.push(SupplierPrice);
    }
    return newCPL;
  };

  createSupplierPrice = (param) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.Add_UpdateSupplierPrice;
    let SupplierPriceList = this.state.SupplierPriceList;
    let SupplierPriceHistory = this.state.SupplierPriceHistory;

    switch (param) {
      case "NEW":
        SupplierPriceList.push(this.state.SupplierPrice);
        SupplierPriceHistory = [];
        break;
      case "UPDATE":
        let selectedOldItem = this.state.selectedOldItem;
        let index = this.state.selectedOldItemIndex;
        console.log("IN UPDATE > selectedOldItem > ", selectedOldItem);
        console.log("IN UPDATE > index > ", index);
        SupplierPriceList[index] = this.state.SupplierPrice;
        SupplierPriceHistory.push(selectedOldItem);
        break;
      default:
        break;
    }

    SupplierPriceList = this.formatDate(SupplierPriceList);
    SupplierPriceList = this.processSupplierPriceList(SupplierPriceList);
    SupplierPriceHistory = this.formatDate(SupplierPriceHistory);
    SupplierPriceHistory = this.processSupplierPriceList(SupplierPriceHistory);

    let reqData = {
      ValidUser: ValidUser,
      SupplierPriceList: SupplierPriceList,
      SupplierPriceHistoryList: SupplierPriceHistory,
    };
    console.log("createSupplierPrice > reqData > ", reqData);

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let SupplierPriceTemplate = {
            SuplID: this.props.SuplID,
            StartDate: null,
            EndDate: null,
            ItemID: 0,
            UOM: 0,
            CurrID: 0,
            MinQty: 0,
            MaxQty: 0,
            UnitPrice: 0,
            EmailID: "",
          };
          this.setState(
            {
              SupplierPrice: SupplierPriceTemplate,
              SuccessPrompt: true,
             SupplierPriceHistory: [],
            },
            () => {
              this.getSupplierPrice();
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

  setParams = (object) => {
    this.setState({ SupplierPrice: object });
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
                    {this.state.listSupplierPrice}
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
                          onClick={(e) => this.createSupplierPrice("NEW")}
                        >
                          {APIURLS.buttonTitle.save}
                        </Button>
                      ) : (
                        <Button
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          onClick={(e) => this.createSupplierPrice("UPDATE")}
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
                      <Table
                        stickyHeader
                        size="small"
                        className="accordion-table"
                        aria-label="SupplierPrice  table"
                      >
                        <TableBody className="tableBody">
                          <DateTextboxInput
                            id="StartDate"
                            label="StartDate"
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                              this.updateFormValue("StartDate", e)
                            }
                            defaultValue={moment(
                              this.state.SupplierPrice.StartDate
                            ).format("YYYY-MM-DD")}
                          />
                          <DateTextboxInput
                            id="EndDate"
                            label="EndDate"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("EndDate", e)}
                            defaultValue={moment(
                              this.state.SupplierPrice.EndDate
                            ).format("YYYY-MM-DD")}
                          />
                          <DropdownInput
                            id="ItemID"
                            label="ItemID"
                            onChange={(e) => this.updateFormValue("ItemID", e)}
                            value={this.state.SupplierPrice.ItemID}
                            options={this.state.itemDataList}
                            isMandatory={true}
                          />
                          <DropdownInput
                            id="UOM"
                            label="UOM"
                            onChange={(e) => this.updateFormValue("UOM", e)}
                            value={this.state.SupplierPrice.UOM}
                            options={this.state.UOMList}
                            isMandatory={true}
                          />
                          <DropdownInput
                            id="CurrID"
                            label="CurrID"
                            onChange={(e) => this.updateFormValue("CurrID", e)}
                            value={this.state.SupplierPrice.CurrID}
                            options={this.state.currencyList}
                            isMandatory={true}
                          />

                          <TextboxInput
                            id="MinQty"
                            label="MinQty"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("MinQty", e)}
                            value={this.state.SupplierPrice.MinQty}
                          />
                          <TextboxInput
                            id="MaxQty"
                            label="MaxQty"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("MaxQty", e)}
                            value={this.state.SupplierPrice.MaxQty}
                          />
                          <TextboxInput
                            id="UnitPrice"
                            label="UnitPrice"
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                              this.updateFormValue("UnitPrice", e)
                            }
                            value={this.state.SupplierPrice.UnitPrice}
                          />
                          <TextboxInput
                            id="EmailID"
                            label="EmailID"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("EmailID", e)}
                            value={this.state.SupplierPrice.EmailID}
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
export default supplierPrice;
