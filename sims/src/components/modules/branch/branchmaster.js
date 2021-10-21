import React, { Fragment } from "react";
import Header from "../../user/userheaderconstants";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Divider from "@material-ui/core/Divider";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ButtonGroup from "@mui/material/ButtonGroup";
import BranchQuickDetails from "./branchquickdetails";

import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";

class branchMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      ProgressLoader: false,
      urlparams: null,
      branchData: [],
      ErrorPrompt: false,
      SuccessPrompt: false,
      branchItem: {},
      editUrl: null,
      filelist:[],
      rowClicked:1,
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
   
    let editUrl =
      URLS.URLS.editBranch +
      this.state.urlparams +
      "&editbranchId=" +
      item.branchId;
    this.setState({ branchItem: item, editUrl: editUrl,rowClicked:parseInt(this.state.rowClicked)+1 });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
    this.getAttachments(item.companyId,item.branchId);
  }

  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.branchData.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  getAttachments(companyId,branchId) {
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
    formData.append('BranchID', branchId);
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
    const handleRowClick = (e, item, id) => {
      this.setState({ selectedRow: id });
     
      let editUrl =
        URLS.URLS.editBranch +
        this.state.urlparams +
        "&editbranchId=" +
        item.branchId;
      this.setState({ branchItem: item, editUrl: editUrl,rowClicked:parseInt(this.state.rowClicked)+1 });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
      getAttachments(item.companyId,item.branchId);
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.branchData.length; i++) {      
        document.getElementById("row_" + i).className = "";
      }
    };

    const getAttachments=(companyId,branchId) =>{
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
      formData.append('BranchID', branchId);
      formData.append('Transaction', APIURLS.TrasactionType.default);
      formData.append('TransactionNo', "");
      formData.append('FileData', "");
  
      axios
        .post(FTPGetAttachmentsUrl, formData, { headers })
        .then((response) => {
          this.setState({ filelist: response.data });
        })
        .catch((error) => {
          
          this.setState({ filelist: [] });
        });
    }

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    return (
      <Fragment>

        <Loader ProgressLoader={this.state.ProgressLoader} />
        <ErrorSnackBar ErrorPrompt={this.state.ErrorPrompt} closeErrorPrompt={closeSuccessPrompt} />
        <SuccessSnackBar SuccessPrompt={this.state.SuccessPrompt} closeSuccessPrompt={closeSuccessPrompt} />
         
        {/* {this.state.ProgressLoader === false ? (
          <div style={{ marginTop: 5, marginLeft: -10 }}>
            <LinearProgress className="linearProgress-css" />{" "}
          </div>
        ) : null} */}

        {/* <Snackbar
          open={this.state.SuccessPrompt}
          autoHideDuration={3000}
          onClose={closeSuccessPrompt}
        >
          <Alert onClose={closeSuccessPrompt} severity="success">
            Success!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.ErrorPrompt}
          autoHideDuration={3000}
          onClose={closeErrorPrompt}
        >
          <Alert onClose={closeErrorPrompt} severity="error">
            Error!
          </Alert>
        </Snackbar> */}

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
                <Breadcrumbs
                  className="style-breadcrumb"
                  aria-label="breadcrumb"
                >
                  <Link
                    color="inherit"
                    className="backLink"
                    onClick={this.props.history.goBack}
                  >
                    Back
                  </Link>
                  <Link
                    color="inherit"
                    href={URLS.URLS.userDashboard + this.state.urlparams}
                  >
                    Dashboard
                  </Link>
                  <Typography color="textPrimary">Branch master</Typography>
                </Breadcrumbs>
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
                      openPage(URLS.URLS.addBranch + this.state.urlparams)
                    }
                  >
                    New
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) => openPage(this.state.editUrl)}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>

          <div className="breadcrumb-bottom"></div>
          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={12} lg={12}>
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
                          Company
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                      {this.state.branchData.map((item, i) => (
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
                                item.branchId
                              }
                            >
                              {URLS.PREFIX.branchId + item.branchId}
                            </a>
                          </TableCell>
                          <TableCell align="left">{item.name}</TableCell>
                          <TableCell align="left">
                            {item.company
                              ? item.company.companyName
                                ? item.company.companyName
                                : "-"
                              : "-"}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
        </div>
      </Fragment>
    );
  }
}
export default branchMaster;
