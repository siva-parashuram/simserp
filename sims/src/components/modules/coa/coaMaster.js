import "../../user/dasboard.css";

import jsPDF from "jspdf";
import "jspdf-autotable";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";
import axios from "axios";
import React, { Fragment } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

import FormatIndentIncreaseIcon from "@mui/icons-material/FormatIndentIncrease";

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import Pagination from "../../compo/pagination";

class coaMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: APIURLS.pagination,
      ProgressLoader: false,
      editBtnDisable: true,
      initialCss: "",
      urlparams: "",
      editurl: "",
      COAList: [],
      CAcID: 0,
      selectedItem: {},
      click: 0,
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
    this.setState({ urlparams: urlparams });
    this.getCOAList();
  }

  getCOAList() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetChartOfAccounts;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ COAList: data }, () => {
          if (data.length > 0) {
            this.handleRowClick(null, data[0], "row_0", "row_arrow_0");
            this.performDoubleClickOperation(data[0].CAcID);
          }
        });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {});
  }

  handleRowClick = (e, item, id) => {
    try {
      let editUrl =
        URLS.URLS.editCoa + this.state.urlparams + "&editCAcID=" + item.CAcID;
      editUrl = editUrl + "&type=edit";
      this.setState({
        CAcID: item.CAcID,
        editurl: editUrl,
        editBtnDisable: false,
        selectedItem: item,
      });
      this.removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
      this.performDoubleClickOperation(item.CAcID);
    } catch (e) {}
  };

  performDoubleClickOperation = (CAcID) => {
    let c = CF.toInt(this.state.click);
    console.log("c-1 : ", c);
    if (this.state.CAcID === CAcID) {
      c = CF.toInt(this.state.click) + 1;
      console.log("c-2 : ", c);
      this.setState({ click: c });
    } else {
      this.setState({ click: 0 });
    }
    if (c === 2) {
      this.openPage(this.state.editurl);
    }
  };

  removeIsSelectedRowClasses = () => {
    try {
      for (let i = 0; i < this.state.COAList.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (e) {}
  };

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };

  exportToPdf = () => {
    // const doc = new jsPDF();

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "landscape"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.autoTable({
      html: "#coa-table",
      theme: "striped",
      styles: { fillColor: null, lineColor: "#000000" },
    });
    doc.setFontSize(12);
    doc.save("coa.pdf");
  };

  render() {
    const getAccoutTypeValue = (ACType) => {
      let actype = APIURLS.ACType;
      let name = "";
      for (let i = 0; i < actype.length; i++) {
        if (actype[i].value === ACType) {
          name = actype[i].name;
          break;
        }
      }
      return name;
    };

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const handlePageChange = (event, newPage) => {
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <div className="breadcrumb-height">
          <Grid container spacing={1}>
            <Grid
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                borderRightStyle: "solid",
                borderRightColor: "#bdbdbd",
                borderRightWidth: 1,
              }}
            >
              <div style={{ marginTop: 8 }}>
                <Breadcrumb
                  backOnClick={this.props.history.goBack}
                  linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                  linkTitle="Dashboard"
                  typoTitle="Chart Of Accounts"
                  level={1}
                />
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <div style={{ marginLeft: 10, marginTop: 1 }}>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Action Menu Button group"
                >
                  <Button
                    className="action-btns"
                    startIcon={<AddIcon />}
                    onClick={(e) =>
                      this.openPage(
                        URLS.URLS.addCoa + this.state.urlparams + "&type=add"
                      )
                    }
                  >
                    {APIURLS.buttonTitle.add}
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) => this.openPage(this.state.editurl)}
                  >
                    {APIURLS.buttonTitle.edit}
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<FormatIndentIncreaseIcon />}
                  >
                    Indent List
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={(e) => this.exportToPdf()}
                  >
                    Export as Pdf
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="breadcrumb-bottom"></div>
        <div className="breadcrumb-bottom"></div>
        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <div style={{ width: "100%", overflowX: "scroll" }}>
                  {this.state.COAList.length > 0 ? (
                    <Fragment>
                      <Table
                        id="coa-table"
                        stickyHeader
                        size="small"
                        className=""
                        aria-label="table"
                      >
                        <TableHead className="table-header-background">
                          <TableRow>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              No
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Name
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Income/Balance
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Account Type
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Acc.Sub.Cat
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Totaling
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                          {getPageData(this.state.COAList).map((item, i) => (
                            <TableRow
                              id={"row_" + i}
                              className={this.state.initialCss}
                              hover
                              key={i}
                              onClick={(event) =>
                                this.handleRowClick(event, item, "row_" + i)
                              }
                            >
                              <TableCell
                                className="table-header-font"
                                align="left"
                              >
                                {item.ACNo}{" "}
                              </TableCell>
                              <TableCell align="left">
                                {i % 2 === 0 ? (
                                  <fragment>&nbsp;&nbsp;</fragment>
                                ) : null}
                                {item.Name}{" "}
                              </TableCell>
                              <TableCell align="left">
                                {item.IncomeBalance}{" "}
                              </TableCell>
                              <TableCell align="left">
                                {getAccoutTypeValue(item.ACType)}
                              </TableCell>
                              <TableCell align="left">-</TableCell>
                              <TableCell align="left">
                                {item.Totaling}
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </Fragment>
                  ) : (
                    <Tableskeleton />
                  )}
                </div>
                <Pagination
                  rowsPerPageOptions={this.state.pagination.rowsPerPage}
                  count={this.state.COAList.length}
                  rowsPerPage={this.state.pagination.rowsPerPage}
                  page={this.state.pagination.page}
                  onPageChange={handlePageChange}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default coaMaster;
