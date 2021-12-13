import React, { Fragment } from "react";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

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
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

 
import MasterDataGrid from "../../compo/masterdatagrid";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Pagination from "../../compo/paginationcomponent";
import BackdropLoader from "../../compo/backdrop";
import DialogCustom from "../../compo/dialogcomponent";

class branchMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      Dialog:{
        open:false
      },
      DeleteAttachment:{
        e:null,
        item:null
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
      columns:APIURLS.branchMasterColumn,
      selectionModel:1,
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
        for(let i=0;i<data.length;i++){
          data[i].id=i+1;
        }
        this.setState({ branchData: data, ProgressLoader: true }, () => {
          if (this.state.branchData.length > 0) {
            this.handleRowClick([1]);
          }
        });
      })
      .catch((error) => {
        this.setState({ branchData: [], ProgressLoader: true });
      });
  }

  handleRowClick(e) {
    try {
      let index = e[0];      
      let item = this.state.branchData[index - 1]; 
      let editUrl =
        URLS.URLS.editBranch +
        this.state.urlparams +
        "&editbranchId=" +
        item.BranchID +
        "&type=edit";
      this.setState({
        branchItem: item,
        editUrl: editUrl,
        selectionModel:index
      });
      this.setParams(item,editUrl,index); 
    } catch (e) {}
  }

  setParams=(item,editUrl,index)=>{
    console.log("item : ",item);
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
    formData.append("CompanyId", item.CompanyID);
    formData.append("BranchID", item.BranchID);
    formData.append("Transaction", APIURLS.TrasactionType.default);
    formData.append("TransactionNo", "");
    formData.append("FileData", "");

    axios
      .post(FTPGetAttachmentsUrl, formData, { headers })
      .then((response) => {
        this.setState({
          branchItem: item,
          editUrl: editUrl,
          selectionModel:index,
          filelist: response.data
        });
        
      })
      .catch((error) => {
        console.log("error > ", error);
        
        
      });
  }

  /*******************FILEUPLOAD STARTS************************** */

  processUpload=(e)=>{
    this.setState({ ShowLoader: true });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const formData = CF.FILE_UPLOAD_FORMDATA(ValidUser,e, "branch", CF.toInt(this.state.branchItem.CompanyID),CF.toInt(this.state.branchItem.BranchID));
   
    const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(FTPUploadUrl, formData, { headers })
      .then((response) => {        
        if (response.status === 200 || response.status === 201) {
          this.refreshFileLists();
        }
        if (response.status === 403) {
          this.setState({ ErrorPrompt: true, ShowLoader: false });
        }

      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ ErrorPrompt: true, ShowLoader: false });
       
      });

  }

  refreshFileLists = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const FTPFILELIST = APIURLS.APIURL.FTPFILELIST;
    const headers = {
      "Content-Type": "application/json",
    };
    const fd = new FormData();
    fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    fd.append('Token', getCookie(COOKIE.TOKEN));
    fd.append('CompanyId', this.state.branchItem.CompanyID);
    fd.append('BranchID', this.state.branchItem.BranchID);
    fd.append('Transaction', APIURLS.TrasactionType.default);
    fd.append('TransactionNo', "");
    fd.append('FileData', "");

    console.log("getCompanyFileList > fd > ", fd);
    axios
      .post(FTPFILELIST, fd, { headers })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            filelist: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ filelist: [] });
      });
  }

  downloadThisFile = (e, item) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.FileDownload;

    const fd = new FormData();
    fd.append('FileName', item.fileName);
    fd.append('companyId', this.state.branchItem.CompanyID);
    fd.append('BranchID', this.state.branchItem.BranchID);
    fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    fd.append('Token', getCookie(COOKIE.TOKEN));

    axios({
      method: 'post',
      url: Url,
      responseType: 'blob',
      data: fd
    })
      .then(function (response) {
       
        const url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", item.fileName);
        document.body.appendChild(link);
        console.log("link > ",link);
        link.click();
      });
  }

  handleDelete = (e, item) => {
    let Dialog=this.state.Dialog;
    Dialog.open=true;
    let DeleteAttachment=this.state.DeleteAttachment;
    DeleteAttachment.e=e;
    DeleteAttachment.item=item;
    this.setState({
      DeleteAttachment:DeleteAttachment,
      Dialog:Dialog
    });
  }

  processDelete = () => {
    let e=this.state.DeleteAttachment.e;
    let item=this.state.DeleteAttachment.item;

    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.DELETEFTPFILE;

    const fd = new FormData();
    fd.append('FileName', item.fileName);
    fd.append('companyId', this.state.branchItem.CompanyID);
    fd.append('BranchID', this.state.branchItem.BranchID);
    fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    fd.append('Token', getCookie(COOKIE.TOKEN));

    axios
    .post(Url, fd, { headers })
    .then((response) => {
      if (response.status === 200) {
        this.refreshFileLists();
        let Dialog=this.state.Dialog;
        Dialog.open=false;
        this.setState({Dialog:Dialog});
      }
    })
    .catch((error) => {
      console.log("error > ", error);
      this.setState({ filelist: [] });
    });
  }

  closeDialog=()=>{
    let Dialog=this.state.Dialog;
    Dialog.open=false;
    this.setState({Dialog:Dialog});
  }

  /*******************FILEUPLOAD ENDS************************** */

  render() {
    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const openPage = (url) => {
      // this.setState({ ProgressLoader: false });
      window.location = url;
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Branch"
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
        <BackdropLoader open={!this.state.ProgressLoader} />
        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

<DialogCustom
        MessageHeader="Delete Attachment!"
        MessageText="Do you want to delete this attachment?"
        open={this.state.Dialog.open}
        onClose={(e)=>this.closeDialog()}
        onOK={(e)=>this.processDelete()}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12} lg={12}>
                {this.state.branchData.length > 0 ? (
                  <Fragment>

                    <MasterDataGrid
                      selectionModel={this.state.selectionModel}
                      rows={this.state.branchData}
                      columns={this.state.columns}
                      pagination={this.state.pagination}
                      onSelectionModelChange={(e) => this.handleRowClick(e)}
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
                      filelist={this.state.filelist.map((item, i) => (
                        <TableRow id={"fileRow_" + item.fileName}>
                            <TableCell align="left"  className="no-border-table">
                                <span className="avatar-hover" onClick={(e) => this.downloadThisFile(e, item)}> {item.fileName} </span> <br />
                                <span style={{ color: '#b0bec5' }}>{"Uploaded on " + item.modifiedDateTime}</span>
                            </TableCell>
                            <TableCell align="left" className="no-border-table">
                                <IconButton size="small" edge="end" aria-label="delete">
                                    <DeleteIcon role={item} fontSize="small" style={{ color: '#f44336' }}
                                        onClick={(e) => this.handleDelete(e, item)} 
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))}
                      rowClicked={this.state.rowClicked}
                      fileUploadonChange={(e)=>this.processUpload(e)}  
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
