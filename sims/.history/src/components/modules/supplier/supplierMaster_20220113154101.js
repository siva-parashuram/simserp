import React, { Fragment } from "react";
import axios from "axios";
import moment from 'moment';
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import IconButton from "@mui/material/IconButton";

import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';


import BackdropLoader from "../../compo/backdrop";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import Dualtabcomponent from "../../compo/dualtabcomponent";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import MasterDataGrid from "../../compo/masterdatagrid";

import DialogCustom from "../../compo/dialogcomponent";

class supplierMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomDialog: {
        open: false
    },
    DeleteAttachment: {
        e: null,
        item: null
    },
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      ProgressLoader: false,
      editBtnDisable: true,
      initialCss: "",
      urlparams: "",
      editUrl: "",
      columns: APIURLS.supplierMasterColumn,
      SupplierData: [],
      selectedItem:{},
      filelist: [],
      compID:0,
      BranchID:0,
    };
  }
  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getSupplierList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let compID = url.searchParams.get("compID");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    this.setState({ urlparams: params,compID:parseInt(compID),BranchID:parseInt(branchId) });
  }

  getSupplierList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplier;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        if (data.length > 0) {
          this.setState({ SupplierData: data, ProgressLoader: true }, () => {
            this.handleRowClick([1]);
          });
        } else {
          this.setState({ SupplierData: data, ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ SupplierData: [], ProgressLoader: true });
      });
  };

  handleRowClick = (e) => {
    try{
      let index = e[0];
      let item = this.state.SupplierData[index - 1];
      let editUrl =
      URLS.URLS.editSupplier +
      this.state.urlparams +
      "&editSuplID=" +
      item.SuplID+"&type=edit";

      item.DetailsInfo = {
        Balance: 0,
        BalanceLCY: 0,
        BranchID: 0,
        DebitNote: 0,
        Invoices: 0,
        Orders: 0,
        OverdueAmountLCY: 0,
        PaymentLCY: 0
      };

      for(let i=0;i<item.Details.length;i++){
        if(parseInt(this.state.BranchID)===parseInt(item.Details[i].BranchID)){
         item.DetailsInfo=item.Details[i];
         break;
        }
      }

      

      this.setState({
        SuplID: item.SuplID,
        editUrl: editUrl,
        editBtnDisable: false,
        selectedItem: item,
        selectionModel: index
      },()=>{
        this.getAttachedFileList();
      });

    }catch(err){}
     
  };

//----------------------FILE UPLOAD-----------------------------

   getAttachedFileList = () => {

    const FTPGetAttachmentsUrl = APIURLS.APIURL.FTPFILELIST;
    const headers = {
        "Content-Type": "application/json",
    };
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append("CompanyId", 0);
    formData.append("BranchID", 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.selectedItem.SuplID));
    formData.append("FileData", "");
    axios
        .post(FTPGetAttachmentsUrl, formData, { headers })
        .then((response) => {
            this.setState({
                filelist: response.data
            });

        })
        .catch((error) => {
            console.log("error > ", error);
        });

}

processUpload = (e) => {
    this.setState({ ShowLoader: true });
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', 0);
    formData.append('BranchID', 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.selectedItem.SuplID));
    formData.append('FileData', file);

    const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
    const headers = {
        "Content-Type": "application/json",
    };
    axios
        .post(FTPUploadUrl, formData, { headers })
        .then((response) => {
            if (response.status === 200 || response.status === 201) {
                this.getAttachedFileList();
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

downloadThisFile = (e, item) => {

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
        "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.FileDownload;
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', 0);
    formData.append('BranchID', 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.selectedItem.SuplID));
    formData.append('FileName', item.fileName);

    axios({
        method: 'post',
        url: Url,
        responseType: 'blob',
        data: formData
    })
        .then(function (response) {

            const url = window.URL.createObjectURL(new Blob([response.data]));
            let link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", item.fileName);
            document.body.appendChild(link);
            console.log("link > ", link);
            link.click();
        });
}

handleDelete = (e, item) => {
    let Dialog = this.state.CustomDialog;
    Dialog.open = true;
    let DeleteAttachment = this.state.DeleteAttachment;
    DeleteAttachment.e = e;
    DeleteAttachment.item = item;
    this.setState({
        DeleteAttachment: DeleteAttachment,
        CustomDialog: Dialog
    });
}

processDelete = () => {
    let e = this.state.DeleteAttachment.e;
    let item = this.state.DeleteAttachment.item;

    const headers = {
        "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.DELETEFTPFILE;

    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', 0);
    formData.append('BranchID', 0);
    formData.append("Transaction", APIURLS.TrasactionType.Supplier);
    formData.append("TransactionNo", parseInt(this.state.selectedItem.SuplID));
    formData.append('FileName', item.fileName);


    axios
        .post(Url, formData, { headers })
        .then((response) => {
            if (response.status === 200) {
                this.getAttachedFileList();
                this.closeDialog();
            }
        })
        .catch((error) => {
            console.log("error > ", error);
            this.setState({ filelist: [] });
        });
}

closeDialog = () => {
    let Dialog = this.state.CustomDialog;
    Dialog.open = false;
    this.setState({ CustomDialog: Dialog });
}

//--------------------------------------------------------------
  

  render() {
    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const handlePageChange = (event, newPage) => {
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const customerList = (
      <Fragment>

        {this.state.SupplierData.length > 0 ? (
          <Fragment>

            <MasterDataGrid
              selectionModel={this.state.selectionModel}
              rows={this.state.SupplierData}
              columns={this.state.columns}
              pagination={this.state.pagination}
              onSelectionModelChange={(e) => this.handleRowClick(e)}
              onPageChange={handlePageChange}


            />


          </Fragment>
        ) : (
          <Tableskeleton />
        )}

      </Fragment>
    );

    const tab1Html = (
      <Fragment>
         <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: "#fff" }} >
            <div style={{ marginTop: 5, marginLeft: 15 }}>
              <h4 style={{ color: "#000000" }}>Supplier Statistics</h4>
            </div>
            <TableContainer>
              <Table stickyHeader size="small" className="accordion-table" aria-label="table" >
                <TableBody className="tableBody">
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Supplier No.
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      {this.state.selectedItem.No}
                    </TableCell>
                  </TableRow>                  
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Balance
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                      {this.state.selectedItem.DetailsInfo?this.state.selectedItem.DetailsInfo.Balance:0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Balance(LCY)
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                    {this.state.selectedItem.DetailsInfo?this.state.selectedItem.DetailsInfo.BalanceLCY:0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Overdue Amount(LCY)
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                    {this.state.selectedItem.DetailsInfo?this.state.selectedItem.DetailsInfo.OverdueAmountLCY:0}
                    </TableCell>
                  </TableRow>                
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Payment(LCY)
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                    {this.state.selectedItem.DetailsInfo?this.state.selectedItem.DetailsInfo.PaymentLCY:0}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" className="no-border-table">
                      Last Payment Date
                    </TableCell>
                    <TableCell align="right" className="no-border-table">
                    {this.state.selectedItem.DetailsInfo?moment(this.state.selectedItem.DetailsInfo.Balance).format("MM/DD/YYYY"):"-"}
                      {moment().format("MM/DD/YYYY")}
                    </TableCell>
                  </TableRow>
                  
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
            <div style={{ height: 20 }}></div>
          </Grid>
        </Grid>
        <Grid container spacing={0} style={{ marginLeft: 15 }}>
          <Grid item xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
            <Grid container spacing={1} >
              <Grid item xs={12} sm={12} md={4} lg={4}  >
                <div key="paymentPendingLink" to="#" className="card-link">
                  <Card className="dash-activity-card2" raised={false}>
                    <CardContent>
                      <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                        Orders
                      </Typography>
                      <Typography >
                      {this.state.selectedItem.DetailsInfo?this.state.selectedItem.DetailsInfo.Orders:0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}  >
                <div key="paymentPendingLink" to="#" className="card-link">
                  <Card className="dash-activity-card2" raised={false}>
                    <CardContent>
                      <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                        Invoices
                      </Typography>
                      <Typography>
                      {this.state.selectedItem.DetailsInfo?this.state.selectedItem.DetailsInfo.Invoices:0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}  >
                <div key="paymentPendingLink" to="#" className="card-link">
                  <Card className="dash-activity-card2" raised={false}>
                    <CardContent>
                      <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                        Debit Note
                      </Typography>
                      <Typography>
                      {this.state.selectedItem.DetailsInfo?this.state.selectedItem.DetailsInfo.DebitNote:0}
                      </Typography>
                    </CardContent>
                  </Card>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
            <div style={{ height: 20 }}></div>
          </Grid>
        </Grid>
      </Fragment>
    );

    const tab2Html = (
      <Fragment>
          <div className="sidenav-fixedheight-scroll">
              <Grid container spacing={0}>
                  <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: "#fff" }} >
                      <TableContainer>
                          <Table stickyHeader size="small" className="" aria-label="Attachment Form table">
                              <TableRow>
                                  <TableCell className="no-border-table">
                                      <Button
                                          className="action-btns"
                                          startIcon={<AttachFileIcon />}
                                          onClick={(e) => { document.getElementById("uploadInput").click() }}
                                      >
                                          Attach File
                                      </Button>
                                      <input
                                          className="file-upload-input"
                                          id="uploadInput"
                                          type="file"
                                          onChange={(e) => this.processUpload(e)}
                                      />

                                  </TableCell>
                              </TableRow>
                          </Table>
                      </TableContainer>
                  </Grid>
              </Grid>
              <Grid container spacing={0}>

                  <Grid xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: "#fff" }} >
                      <Table size="small">
                          <TableBody className="tableBody">
                              {this.state.filelist.map((item, i) => (
                                  <TableRow id={"fileRow_" + item.fileName}>
                                      <TableCell align="left" className="no-border-table">
                                          <span className="avatar-hover" onClick={(e) => this.downloadThisFile(e, item)}> {item.fileName} </span> <br />
                                          <span style={{ color: '#b0bec5' }}>{"Uploaded on " + item.modifiedDateTime}</span>
                                      </TableCell>
                                      <TableCell align="left" className="no-border-table">
                                          <IconButton size="small" edge="end" aria-label="delete">
                                              <DeleteIcon
                                                  role={item} fontSize="small" style={{ color: '#f44336' }}
                                                  onClick={(e) => this.handleDelete(e, item)}

                                              />
                                          </IconButton>
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

    const sideDataNavigation = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ backgroundColor: "#fff" }}
          >
            <Dualtabcomponent
              tab1name="Details"
              tab2name="Attachments"
              tab1Html={tab1Html}
              tab2Html={tab2Html}
            />
          </Grid>
        </Grid>
      </Fragment>
    );

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Supplier"
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
              openPage(
                URLS.URLS.addSupplier + this.state.urlparams + "&type=add"
              )
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
          open={this.state.CustomDialog.open}
          onClose={(e) => this.closeDialog()}
          onOK={(e) => this.processDelete()}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            {customerList}
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Grid container spacing={0}>
                  <Grid xs={12} sm={12} md={11} lg={11}>
                    {sideDataNavigation}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default supplierMaster;
