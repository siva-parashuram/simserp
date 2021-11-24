import React, { Fragment } from "react";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import BranchQuickDetails from "./branchquickdetails";
import ButtonGroup from "@mui/material/ButtonGroup";
import TablePagination from "@mui/material/TablePagination";

import Loader from "../../compo/loader";

import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

class branchMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      initialCss: "",
      isLoggedIn: false,
      ProgressLoader: false,
      urlparams: null,
      branchData: [],
      branchItem: {},
      editUrl: null,
      filelist: [],
      rowClicked: 1,
    };
  }

  componentDidMount() {
    if (getCookie(COOKIE.USERID) != null) {
      this.setState({ isLoggedIn: true });
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
      this.setState(
        {
          urlparams: urlparams,
        },
        () => {
          this.getBranches();
        }
      );
    } else {
      this.setState({ isLoggedIn: false });
    }
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

        this.setState({ branchData: data, ProgressLoader: true }, () => {
          if (this.state.branchData.length > 0) {
            this.InitialhandleRowClick(null, data[0], "row_0");
          }
        });
      })
      .catch((error) => {
        this.setState({ branchData: [], ProgressLoader: true });
      });
  }

  InitialhandleRowClick(e, item, id) {
    try {
      let editUrl =
        URLS.URLS.editBranch +
        this.state.urlparams +
        "&editbranchId=" +
        item.BranchID +
        "&type=edit";
      this.setState({
        branchItem: item,
        editUrl: editUrl,
        rowClicked: parseInt(this.state.rowClicked) + 1,
      });
      this.InitialremoveIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
      this.getAttachments(item.CompanyID, item.BranchID);
    } catch (e) {}
  }

  InitialremoveIsSelectedRowClasses() {
    try {
      for (let i = 0; i < this.state.branchData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (e) {}
  }

  getAttachments(companyId, branchId) {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const FTPGetAttachmentsUrl = APIURLS.APIURL.FTPFILELIST;
    const headers = {
      "Content-Type": "application/json",
    };

    const formData = new FormData();
    formData.append("UserID", parseInt(getCookie(COOKIE.USERID)));
    formData.append("Token", getCookie(COOKIE.TOKEN));
    formData.append("CompanyId", companyId);
    formData.append("BranchID", branchId);
    formData.append("Transaction", APIURLS.TrasactionType.default);
    formData.append("TransactionNo", "");
    formData.append("FileData", "");

    axios
      .post(FTPGetAttachmentsUrl, formData, { headers })
      .then((response) => {
        this.setState({ filelist: response.data });
      })
      .catch((error) => {
        console.log("error > ", error);
      });
  }

  render() {
    const handleRowClick = (e, item, id) => {
      try {
        this.setState({ selectedRow: id });

        let editUrl =
          URLS.URLS.editBranch +
          this.state.urlparams +
          "&editbranchId=" +
          item.BranchID +
          "&type=edit";
        this.setState({
          branchItem: item,
          editUrl: editUrl,
          rowClicked: parseInt(this.state.rowClicked) + 1,
        });
        removeIsSelectedRowClasses();
        document.getElementById(id).classList.add("selectedRow");
        getAttachments(item.CompanyID, item.BranchID);
      } catch (e) {}
    };

    const removeIsSelectedRowClasses = () => {
      try {
        for (let i = 0; i < this.state.branchData.length; i++) {
          document.getElementById("row_" + i).className = "";
        }
      } catch (e) {}
    };

    const getAttachments = (companyId, branchId) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const FTPGetAttachmentsUrl = APIURLS.APIURL.FTPFILELIST;
      const headers = {
        "Content-Type": "application/json",
      };

      const formData = new FormData();
      formData.append("UserID", parseInt(getCookie(COOKIE.USERID)));
      formData.append("Token", getCookie(COOKIE.TOKEN));
      formData.append("CompanyId", companyId);
      formData.append("BranchID", branchId);
      formData.append("Transaction", APIURLS.TrasactionType.default);
      formData.append("TransactionNo", "");
      formData.append("FileData", "");

      axios
        .post(FTPGetAttachmentsUrl, formData, { headers })
        .then((response) => {
          this.setState({ filelist: response.data });
        })
        .catch((error) => {
          this.setState({ filelist: [] });
        });
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const handlePageChange = (event, newPage) => {
      removeIsSelectedRowClasses();
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Branch Master"
          level={1}
        />
      </Fragment>
    );

    const buttongroupHtml = (
      <Fragment>
        {console.log("APIURLS.buttonTitle > ", APIURLS.buttonTitle)}
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="Action Menu Button group"
        >
          <Button
            startIcon={APIURLS.buttonTitle.add.icon}
            className="action-btns"
            onClick={(e) =>
              openPage(URLS.URLS.addBranch + this.state.urlparams + "&type=add")
            }
          >
            {APIURLS.buttonTitle.add.name}
          </Button>
          <Button
            startIcon={APIURLS.buttonTitle.edit.icon}
            className="action-btns"
            onClick={(e) => openPage(this.state.editUrl)}
          >
            {APIURLS.buttonTitle.edit.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12} lg={12}>
                {this.state.branchData.length > 0 ? (
                  <Fragment>
                    <Table
                      stickyHeader
                      size="small"
                      className=""
                      aria-label="Country List table"
                    >
                      <TableHead className="table-header-background">
                        <TableRow>
                          <TableCell className="table-header-font">#</TableCell>
                          <TableCell className="table-header-font" align="left">
                            Branch Name
                          </TableCell>
                          <TableCell className="table-header-font" align="left">
                            Short Name
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="tableBody">
                        {getPageData(this.state.branchData).map((item, i) => (
                          <TableRow
                            id={"row_" + i}
                            className={this.state.initialCss}
                            hover
                            key={i}
                            onClick={(event) =>
                              handleRowClick(event, item, "row_" + i)
                            }
                          >
                            <TableCell align="left">
                              <a
                                className="LINK tableLink"
                                href={
                                  URLS.URLS.editBranch +
                                  this.state.urlparams +
                                  "&editbranchId=" +
                                  item.BranchID +
                                  "&type=edit"
                                }
                              >
                                {URLS.PREFIX.branchId + item.BranchID}
                              </a>
                            </TableCell>
                            <TableCell align="left">{item.Name}</TableCell>
                            <TableCell align="left">{item.ShortName}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
                      component="div"
                      count={this.state.branchData.length}
                      rowsPerPage={this.state.pagination.rowsPerPage}
                      page={this.state.pagination.page}
                      onPageChange={handlePageChange}
                    />
                  </Fragment>
                ) : (
                  <Tableskeleton />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                {this.state.branchItem &&
                Object.keys(this.state.branchItem).length === 0 &&
                Object.getPrototypeOf(this.state.branchItem) ===
                  Object.prototype ? null : (
                  <Fragment>
                    <BranchQuickDetails
                      new={URLS.URLS.addBranch + this.state.urlparams}
                      edit={this.state.editUrl}
                      branchItem={this.state.branchItem}
                      filelist={this.state.filelist}
                      rowClicked={this.state.rowClicked}
                    />
                  </Fragment>
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default branchMaster;
