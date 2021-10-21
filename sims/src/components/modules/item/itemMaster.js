import React, { Fragment } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Header from "../../user/userheaderconstants";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@mui/icons-material/Edit';
import TablePagination from '@mui/material/TablePagination';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import FileDownloadIcon from '@mui/icons-material/FileDownload';

import Branchlistbycompany from "./branchlistbycompany";

import CompanyQuickDetails from "./companyquickdetails";

 
import Csvexport from "../../compo/csvexport";


let columns = [];

let rows = [];

const initialCss = "";

class itemMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      page: 1,
      rowsPerPage: 10,
      item: null,
      editUrl: null,
      isLoggedIn: false,
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
            this.setState({
              masterCompanyData: rows,
              companyData: rows,
              ProgressLoader: true,
            }, () => {
              if (this.state.companyData.length > 0) {
                this.InitialhandleRowClick(null, this.state.companyData[0], "row_0");
              }
            });
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
    console.log("handleRowClick > id > ", id);
    console.log("handleRowClick > vitem > ", item);
    let editUrl = URLS.URLS.editCompany + this.state.urlparams + "&compID=" + item.companyId;
    let branches = item.branches;
    this.setState({ item: item, branch: branches, editUrl: editUrl, rowClicked: parseInt(this.state.rowClicked) + 1 });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add('selectedRow');
    this.getAttachments(item.companyId);
  }

  InitialremoveIsSelectedRowClasses() {
    try {
      for (let i = 0; i < this.state.companyData.length; i++) {
        document.getElementById('row_' + i).className = '';
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
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', companyId);
    formData.append('BranchID', 0);
    formData.append('Transaction', APIURLS.TrasactionType.default);
    formData.append('TransactionNo', "");
    formData.append('FileData', "");

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
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleRowClick = (e, item, id) => {
      console.log("handleRowClick > e > ", e);
      console.log("handleRowClick > item > ", item);
      let branches = item.branches;
      let editUrl = URLS.URLS.editCompany + this.state.urlparams + "&compID=" + item.companyId;
      // getCompanyBranchList(item.companyId);
      this.setState({ item: item, branch: branches, editUrl: editUrl, rowClicked: parseInt(this.state.rowClicked) + 1 });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
      getAttachments(item.companyId);
    };

    const removeIsSelectedRowClasses = () => {
      try {
        for (let i = 0; i < this.state.companyData.length; i++) {
          document.getElementById('row_' + i).className = '';
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
      formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
      formData.append('Token', getCookie(COOKIE.TOKEN));
      formData.append('CompanyId', companyId);
      formData.append('BranchID', 0);
      formData.append('Transaction', APIURLS.TrasactionType.default);
      formData.append('TransactionNo', "");
      formData.append('FileData', "");

      axios
        .post(FTPGetAttachmentsUrl, formData, { headers })
        .then((response) => {
          this.setState({ filelist: response.data });
        })
        .catch((error) => {
          console.log("error > ", error);
        });
    }

    const getCompanyBranchList = (companyId) => { };

    const searchInput = (e) => {
      removeIsSelectedRowClasses();
      console.log("searchInput > e > ", e);
      console.log("searchInput > e.target > ", e.target);
      console.log("searchInput > e.value > ", e.value);
      let key = document.getElementById("searchBox").value;
      console.log("searchInput > key > ", key);
      sortAsPerKey(key);
    };

    

    const handlePageChange = (event, newPage) => {
       
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    }

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }
   

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    }

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };

    return (
      <Fragment>
        <CssBaseline />
        
        {this.state.ProgressLoader === false ? (<div style={{ marginTop: 5, marginLeft: -10 }}><LinearProgress
          className="linearProgress-css"
        /> </div>) : null}

        <Snackbar
          open={this.state.ErrorPrompt}
          autoHideDuration={3000}
          onClose={closeErrorPrompt}
        >
          <Alert onClose={closeErrorPrompt} severity="error">
            Error!
          </Alert>
        </Snackbar>

        <div className="breadcrumb-height">
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} md={4} lg={4} style={{ borderRightStyle: 'solid', borderRightColor: '#bdbdbd', borderRightWidth: 1 }}>
              <div style={{ marginTop: 8 }}>
                <Breadcrumbs className='style-breadcrumb' aria-label="breadcrumb">
                  <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                    Back
                  </Link>
                  <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                    Dashboard
                  </Link>
                  <Typography color="textPrimary"> Item master</Typography>
                </Breadcrumbs>
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <div style={{ marginLeft: 10, marginTop: 1 }}>
                <ButtonGroup size="small" variant="text" aria-label="Action Menu Button group">
                  <Button
                    className="action-btns"
                    startIcon={<AddIcon />}
                    onClick={(e) => openPage(URLS.URLS.addNewItem + this.state.urlparams)}
                  >

                    NEW

                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) => openPage(this.state.editUrl)}
                  >Edit</Button>

                   

                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>


        <div className="breadcrumb-bottom"></div>

        <div className="New-link-bottom"></div>
        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <TableContainer style={{ maxHeight: 440 }}>
              <Table
                stickyHeader
                size="small"
                className=""
                aria-label="item List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>
                    <TableCell
                      className="table-header-font"
                      align="left"

                    >
                      Item Name
                    </TableCell>
                   
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">


                  {//this.state.companyData 
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
                              item.companyId
                            }
                            onClick={(e) => openCompanyDetail(e, item)}
                          >
                            {URLS.PREFIX.companyID + item.companyId}
                          </a>
                        </TableCell>
                        <TableCell align="left">{item.companyName}</TableCell>
                       
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
              component="div"
              count={this.state.companyData.length}
              rowsPerPage={this.state.pagination.rowsPerPage}
              page={this.state.pagination.page}
              onPageChange={handlePageChange}
            />

          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>&nbsp;</Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>


              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Fragment>
    );
  }
}
export default itemMaster;