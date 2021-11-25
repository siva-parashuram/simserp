import React, { Fragment } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
 

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Branchlistbycompany from "./branchlistbycompany";

import CompanyQuickDetails from "./companyquickdetails";

import Csvexport from "../../compo/csvexport";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Pagination from "../../compo/paginationcomponent";
import BackdropLoader from "../../compo/backdrop";



import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

let columns = [];

let rows = [];

const initialCss = "";

class companyMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: APIURLS.pagination.rowsPerPage,
      },
      page: 1,
      rowsPerPage: 10,
      item: null,
      editUrl: null,
      isLoggedIn: false,
      BackdropLoader:true,
      ProgressLoader: false,
      branchName: "",
      branchId: "",
      compName: "",
      branch: [],
      columns: columns,
      masterCompanyData: rows,
      companyData: rows,
      showSavedAlert: false,
      selectedCompanyId: 0,
      initialCss: initialCss,
      DeleteDisabled: true,
      companyDialogStatus: false,
      UpdateCompany: true,
      urlparams: "",
      filelist: [],
      rowClicked: 1,
    };
  }

  componentDidMount() {
    if (getCookie(COOKIE.USERID) != null) {
      this.getCompanyList();
      this.setColumns();
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
      this.setState({
        branchName: branchName,
        branchId: branchId,
        compName: compName,
        urlparams: urlparams,
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  handleCheckboxChange = (e, id) => {
    console.log("handleCheckboxChange > e > ", e);
    console.log("handleCheckboxChange > e.target > ", e.target);
    var elementCheckedChk = document.getElementById(id).checked;
    console.log(
      "handleCheckboxChange > elementCheckedChk > ",
      elementCheckedChk
    );
    if (elementCheckedChk === true) {
      document.getElementById(id).checked = true;
    }
    if (elementCheckedChk === false) {
      document.getElementById(id).checked = false;
    }
  };

  setColumns() {
    let columns = [
      {
        field: "sno",
        headerName: "sno",
        type: "number",
        width: 100,
        editable: false,
        headerClassName: "tbl-hdr-css",
      },
      {
        field: "company",
        headerName: "company",
        width: 300,
        editable: true,
        headerClassName: "tbl-hdr-css",
      },
    ];

    this.setState({ columns: columns });
  }

  getCompanyList() {
    let rows = [];

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCompaniesUrl = APIURLS.APIURL.GetCompanies;

    axios
      .post(GetCompaniesUrl, ValidUser, { headers })
      .then((response) => {
        console.log("getCompanyList > response >  ", response);
        if (response.status === 200) {
          if (response.data === "Invalid User") {
            alert("Un-Authorized Access Found!");
            window.close();
          } else {
            let data = response.data;

            rows = data;
            this.setState(
              {
                masterCompanyData: rows,
                companyData: rows,
                ProgressLoader: true,
              },
              () => {
                if (this.state.companyData.length > 0) {
                  this.InitialhandleRowClick(
                    null,
                    this.state.companyData[0],
                    "row_0"
                  );
                }
              }
            );
          }
        } else {
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        }
      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });
  }

  InitialhandleRowClick(e, item, id) {
    try {
      console.log("handleRowClick > id > ", id);
      console.log("handleRowClick > vitem > ", item);
      let editUrl =
        URLS.URLS.editCompany +
        this.state.urlparams +
        "&compID=" +
        item.CompanyID;
      let branches = item.Branch;
      this.setState({
        item: item,
        branch: branches,
        editUrl: editUrl,
        rowClicked: parseInt(this.state.rowClicked) + 1,
      });
      this.InitialremoveIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
      this.getAttachments(item.CompanyID);
    } catch (e) {
      console.log("Error : ", e);
    }
  }

  InitialremoveIsSelectedRowClasses() {
    try {
      for (let i = 0; i < this.state.companyData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (e) {
      console.log("Error : ", e);
    }
  }

  getAttachments(companyId) {
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
    formData.append("BranchID", 0);
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
        console.log("handleRowClick > e > ", e);
        console.log("handleRowClick > item > ", item);
        let branches = item.Branch;
        let editUrl =
          URLS.URLS.editCompany +
          this.state.urlparams +
          "&compID=" +
          item.CompanyID;
        // getCompanyBranchList(item.companyId);
        this.setState({
          item: item,
          branch: branches,
          editUrl: editUrl,
          rowClicked: parseInt(this.state.rowClicked) + 1,
        });
        removeIsSelectedRowClasses();
        document.getElementById(id).classList.add("selectedRow");
        getAttachments(item.CompanyID);
      } catch (e) {
        console.log("Error : ", e);
      }
    };

    const removeIsSelectedRowClasses = () => {
      try {
        for (let i = 0; i < this.state.companyData.length; i++) {
          document.getElementById("row_" + i).className = "";
        }
      } catch (e) {
        console.log("Error : ", e);
      }
    };

    const getAttachments = (companyId) => {
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
      formData.append("BranchID", 0);
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
    };

    const getCompanyBranchList = (companyId) => {};

    const searchInput = (e) => {
      removeIsSelectedRowClasses();
      console.log("searchInput > e > ", e);
      console.log("searchInput > e.target > ", e.target);
      console.log("searchInput > e.value > ", e.value);
      let key = document.getElementById("searchBox").value;
      console.log("searchInput > key > ", key);
      sortAsPerKey(key);
    };

    const sortAsPerKey = (key) => {
      key = key.toLowerCase();
      let rows = [];
      let masterCompanyData = this.state.masterCompanyData;
      if (key === "" || key == null) {
        this.setState({ companyData: masterCompanyData });
      } else {
        for (let i = 0; i < masterCompanyData.length; i++) {
          if (
            masterCompanyData[i].companyName != null
              ? masterCompanyData[i].companyName.toLowerCase().includes(key)
              : null || masterCompanyData[i].address != null
              ? masterCompanyData[i].address.toLowerCase().includes(key)
              : null || masterCompanyData[i].companyId != null
              ? masterCompanyData[i].companyId
                  .toString()
                  .toLowerCase()
                  .includes(key)
              : null
          ) {
            rows.push(masterCompanyData[i]);
          }
        }
        this.setState({ companyData: rows });
      }
    };

    const handlePageChange = (event, newPage) => {
      this.InitialremoveIsSelectedRowClasses();
      console.log("handlePageChange > event > ", event);
      console.log("handlePageChange > newPage > ", newPage);
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);

      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const openCompanyDetail = (e, item) => {
      console.log("openCompanyDetail > e > ", e);
      console.log("openCompanyDetail > item > ", item);
    };

    const handleClose = (reason) => {
      if (reason === "YES") {
        this.setState({ companyDialogStatus: false });
      }
    };

    const updateCompanyMasterDetail = (key, e) => {
      console.log("updateCompanyMasterDetail > key > ", key);
      console.log("updateCompanyMasterDetail > e > ", e.target);
    };

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Company Master"
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
              openPage(URLS.URLS.addNewCompany + this.state.urlparams)
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
        <CssBaseline />
        <BackdropLoader open={!this.state.ProgressLoader} />

       

        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            {this.state.companyData.length > 0 ? (
              <Fragment>
                <TableContainer style={{ maxHeight: 450, minHeight: 450 }}>
                  <Table
                    stickyHeader
                    size="small"
                    className=""
                    aria-label="company List table"
                  >
                    <TableHead className="table-header-background">
                      <TableRow>
                        <TableCell className="table-header-font">#</TableCell>
                        <TableCell className="table-header-font" align="left">
                          Company Name
                        </TableCell>
                        <TableCell className="table-header-font" align="left">
                          Address
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                      {
                        //this.state.companyData
                        getPageData(this.state.companyData).map((item, i) => (
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
                                  URLS.URLS.editCompany +
                                  this.state.urlparams +
                                  "&compID=" +
                                  item.CompanyID
                                }
                                onClick={(e) => openCompanyDetail(e, item)}
                              >
                                {URLS.PREFIX.companyID + item.CompanyID}
                              </a>
                            </TableCell>
                            <TableCell align="left">
                              {item.CompanyName}
                            </TableCell>
                            <TableCell align="left">{item.Address}</TableCell>
                          </TableRow>
                        ))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>

                <Pagination
                data={this.state.companyData}
                pagination={this.state.pagination}                
                onPageChange={handlePageChange}
                />

                 
              </Fragment>
            ) : (
              <Tableskeleton />
            )}
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                {/*<Branchlistbycompany data={this.state.branch} />*/}
                {this.state.item === null || this.state.item === {} ? null : (
                  <CompanyQuickDetails
                    data={this.state.branch}
                    item={this.state.item}
                    filelist={this.state.filelist}
                    rowClicked={this.state.rowClicked}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default companyMaster;
