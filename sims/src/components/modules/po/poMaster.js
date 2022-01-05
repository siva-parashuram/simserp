import React, { Fragment } from 'react';
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";
import AttachFileIcon from '@mui/icons-material/AttachFile';

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';

import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import BackdropLoader from "../../compo/backdrop";
import MasterDataGrid from "../../compo/masterdatagrid";
import Dualtabcomponent from "../../compo/dualtabcomponent";
import DialogCustom from "../../compo/dialogcomponent";


class poMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pagination: {
                page: 1,
                rowsPerPage: APIURLS.pagination.rowsPerPage,
            },
            Dialog: {
                open: false
              },
              DeleteAttachment: {
                e: null,
                item: null
              },
            ProgressLoader: false,
            editBtnDisable: true,
            initialCss: "",
            urlparams: "",
            item: {},
            editUrl: "",
            BranchID: 0,
            compID: 0,
            columns: APIURLS.poMasterColumn,
            PODataList: [],
            selectionModel: [1],
            filelist: [],
        }
    }
    componentDidMount() {
        let params = CF.GET_URL_PARAMS();
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
        this.setState({
            urlparams: params,
            BranchID: branchId,
            compID: parseInt(compID),
            editBtnDisable: false
        }, () => {
            this.getPOList();

        });
    }

    getPOList = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetPOByBranchID;
        let reqData = {
            ValidUser: ValidUser,
            PurchaseOrder: {
                BranchID: CF.toInt(this.state.BranchID),
                Status: 0
            }
        };
        axios
            .post(Url, reqData, { headers })
            .then((response) => {
                let data = response.data;
                console.log("data > ", data);
                let newData = [];
                for (let i = 0; i < data.length; i++) {
                    data[i].id = i + 1;
                    newData.push(data[i]);
                }
                this.setState({ PODataList: newData, ProgressLoader: true }, () => {
                    if (newData.length > 0) {
                        this.handleRowClick([1]);
                    }
                });
            })
            .catch((error) => {
                console.log("Error > ", error);
                this.setState({ PODataList: [], ProgressLoader: true });
            });
    };


    handleRowClick = (e) => {
        try {
            console.log("handleRowClick > e > ", e);
            let index = e[0];
            console.log("handleRowClick > index > ", index);
            let item = this.state.PODataList[index - 1];
            console.log("handleRowClick > item > ", item);
            let editUrl =
                URLS.URLS.editPO +
                this.state.urlparams +
                "&editPOID=" +
                item.POID + "&type=edit";
            this.setState({
                item: item,
                editUrl: editUrl,
                selectionModel: index,
            }, () => {
                this.getAttachedFileList();
            });

        } catch (e) {
            console.log("Error : ", e);
        }
    }

    //----------------------FILE UPLOAD-----------------------------

    getAttachedFileList = () => {

        const FTPGetAttachmentsUrl = APIURLS.APIURL.FTPFILELIST;
        const headers = {
            "Content-Type": "application/json",
        };
        const formData = new FormData();
        formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
        formData.append('Token', getCookie(COOKIE.TOKEN));
        formData.append("CompanyId", parseInt(this.state.compID));
        formData.append("BranchID", parseInt(this.state.BranchID));
        formData.append("Transaction", APIURLS.TrasactionType.PO);
        formData.append("TransactionNo", parseInt(this.state.item.POID));
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
        formData.append('CompanyId', parseInt(this.state.compID));
        formData.append('BranchID', parseInt(this.state.BranchID));
        formData.append("Transaction", APIURLS.TrasactionType.PO);
        formData.append("TransactionNo", parseInt(this.state.item.POID));
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
        formData.append('CompanyId', parseInt(this.state.compID));
        formData.append('BranchID', parseInt(this.state.BranchID));
        formData.append("Transaction", APIURLS.TrasactionType.PO);
        formData.append("TransactionNo", parseInt(this.state.item.POID));
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
        let Dialog = this.state.Dialog;
        Dialog.open = true;
        let DeleteAttachment = this.state.DeleteAttachment;
        DeleteAttachment.e = e;
        DeleteAttachment.item = item;
        this.setState({
          DeleteAttachment: DeleteAttachment,
          Dialog: Dialog
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
        formData.append('CompanyId', parseInt(this.state.compID));
        formData.append('BranchID', parseInt(this.state.BranchID));
        formData.append("Transaction", APIURLS.TrasactionType.PO);
        formData.append("TransactionNo", parseInt(this.state.item.POID));
        formData.append('FileName', item.fileName);
    
    
        // const fd = new FormData();
        // fd.append('FileName', item.fileName);
        // fd.append('companyId', this.state.branchItem.CompanyID);
        // fd.append('BranchID', this.state.branchItem.BranchID);
        // fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
        // fd.append('Token', getCookie(COOKIE.TOKEN));
    
        axios
          .post(Url, formData, { headers })
          .then((response) => {
            if (response.status === 200) {
              this.getAttachedFileList();
              let Dialog = this.state.Dialog;
              Dialog.open = false;
              this.setState({ Dialog: Dialog });
            }
          })
          .catch((error) => {
            console.log("error > ", error);
            this.setState({ filelist: [] });
          });
      }
    
      closeDialog = () => {
        let Dialog = this.state.Dialog;
        Dialog.open = false;
        this.setState({ Dialog: Dialog });
      }

    //--------------------------------------------------------------

    render() {
        const openPage = (url) => {
            // this.setState({ ProgressLoader: false });
            console.log("url > ", url);
            window.location = url;
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
                    typoTitle="Purchase Order"
                    level={1}
                />
            </Fragment>
        );

        const buttongroupHtml = (
            <Fragment>
                <ButtonGroup
                    size="small"
                    variant="text"
                    aria-label="Action Menu Button group"
                >
                    <Button
                        id="add_New"
                        className="action-btns"
                        startIcon={APIURLS.buttonTitle.add.icon}
                        onClick={(e) =>
                            openPage(URLS.URLS.addPO + this.state.urlparams + "&type=add")
                        }
                    >
                        {APIURLS.buttonTitle.add.name}
                    </Button>
                    <Button className="action-btns"
                        startIcon={APIURLS.buttonTitle.edit.icon}
                        onClick={(e) =>
                            openPage(this.state.editUrl)
                        }
                        disabled={this.state.PODataList.length > 0 ? this.state.editBtnDisable : true}
                    >
                        {APIURLS.buttonTitle.edit.name}
                    </Button>
                </ButtonGroup>
            </Fragment>
        );

        const tab1Html = (
            <Fragment>
                <div className="sidenav-fixedheight-scroll">
                    <Grid container spacing={0}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={11}
                            lg={11}
                            style={{ backgroundColor: "#fff" }}
                        >

                            <TableContainer>
                                <Table
                                    stickyHeader
                                    size="small"
                                    className="accordion-table"
                                    aria-label="table"
                                >
                                    <TableBody className="tableBody">
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">
                                                PO No
                                            </TableCell>
                                            <TableCell align="right" className="no-border-table">
                                                {this.state.item.No}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">
                                                Name
                                            </TableCell>
                                            <TableCell align="right" className="no-border-table">
                                                {this.state.item.SupplierName}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">
                                                Contact Person
                                            </TableCell>
                                            <TableCell align="right" className="no-border-table">
                                                {this.state.item.ContactPerson}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">
                                                Email
                                            </TableCell>
                                            <TableCell align="right" className="no-border-table">
                                                {this.state.item.EmailID}
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">
                                                Phone No.
                                            </TableCell>
                                            <TableCell align="right" className="no-border-table">
                                                {this.state.item.PhoneNo}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={11}
                            lg={11}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <div style={{ height: 20 }}></div>
                        </Grid>
                    </Grid>
                    <Grid
                        container
                        spacing={0}
                        style={{ marginLeft: 10, marginRight: 10 }}
                    >
                        <Grid
                            item
                            xs={12}
                            sm={12}
                            md={11}
                            lg={11}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <div key="paymentPendingLink" to="#" className="card-link">
                                        <Card className="dash-activity-card2" raised={false}>
                                            <CardContent>
                                                <Typography
                                                    color="textSecondary"
                                                    style={{ fontSize: 12, color: "#fff" }}
                                                    noWrap={false}
                                                    gutterBottom
                                                >
                                                    Ongoing Purchases
                                                </Typography>
                                                <Typography>000</Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <div key="paymentPendingLink" to="#" className="card-link">
                                        <Card className="dash-activity-card2" raised={false}>
                                            <CardContent>
                                                <Typography
                                                    color="textSecondary"
                                                    style={{ fontSize: 12, color: "#fff" }}
                                                    noWrap={false}
                                                    gutterBottom
                                                >
                                                    Total Purchases &nbsp;&nbsp;&nbsp;
                                                </Typography>
                                                <Typography>000</Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={4} lg={4}>
                                    <div key="paymentPendingLink" to="#" className="card-link">
                                        <Card className="dash-activity-card2" raised={false}>
                                            <CardContent>
                                                <Typography
                                                    color="textSecondary"
                                                    style={{ fontSize: 12, color: "#fff" }}
                                                    noWrap={false}
                                                    gutterBottom
                                                >
                                                    PO Raised &nbsp;&nbsp;&nbsp;
                                                </Typography>
                                                <Typography>000</Typography>
                                            </CardContent>
                                        </Card>
                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={11}
                            lg={11}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <div style={{ height: 40 }}></div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={11}
                            lg={11}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <div style={{ marginLeft: 30, marginRight: 20 }}>
                                <Divider />
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={11}
                            lg={11}
                            style={{ backgroundColor: "#fff" }}
                        >
                            <div style={{ height: 20 }}></div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={10}
                            lg={10}
                            style={{ backgroundColor: "#fff" }}
                        >

                            {/* <TableContainer>
                      <Table
                        stickyHeader
                        size="small"
                        className="accordion-table"
                        aria-label="table"
                      >
                        <TableBody className="tableBody">
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Balance
                            </TableCell>
                            <TableCell align="right" className="no-border-table">
                              000
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              <span className="inside-table-cell-bold">Sales</span>
                            </TableCell>
                            <TableCell
                              align="right"
                              className="no-border-table"
                            ></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Balance
                            </TableCell>
                            <TableCell align="right" className="no-border-table">
                              000
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Balance
                            </TableCell>
                            <TableCell align="right" className="no-border-table">
                              000
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Balance
                            </TableCell>
                            <TableCell align="right" className="no-border-table">
                              000
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              <span className="inside-table-cell-bold">Payments</span>
                            </TableCell>
                            <TableCell
                              align="right"
                              className="no-border-table"
                            ></TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Balance
                            </TableCell>
                            <TableCell align="right" className="no-border-table">
                              000
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Balance
                            </TableCell>
                            <TableCell align="right" className="no-border-table">
                              000
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell align="left" className="no-border-table">
                              Balance
                            </TableCell>
                            <TableCell align="right" className="no-border-table">
                              000
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </TableContainer> */}
                        </Grid>
                    </Grid>
                </div>
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
                                                    <DeleteIcon role={item} fontSize="small" style={{ color: '#f44336' }}
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
                    onClose={(e) => this.closeDialog()}
                    onOK={(e) => this.processDelete()}
                />

                <Grid className="table-adjust" container spacing={0}>
                    <Grid xs={12} sm={12} md={8} lg={8}>
                        <Fragment>
                            {console.log("this.state.PODataList > ", this.state.PODataList)}
                            {this.state.PODataList.length > 0 ? (
                                <Fragment>
                                    <MasterDataGrid
                                        selectionModel={this.state.selectionModel}
                                        rows={this.state.PODataList}
                                        columns={this.state.columns}
                                        pagination={this.state.pagination}
                                        disableSelectionOnClick={false}
                                        onSelectionModelChange={(e) => this.handleRowClick(e)}
                                        onPageChange={handlePageChange}
                                    />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {this.state.PODataList.length === 0 ? (
                                        <MasterDataGrid
                                            selectionModel={this.state.selectionModel}
                                            rows={[]}
                                            columns={this.state.columns}
                                            pagination={this.state.pagination}
                                            disableSelectionOnClick={false}
                                            onSelectionModelChange={(e) => this.handleRowClick(e)}
                                            onPageChange={handlePageChange}
                                        />
                                    ) : null}

                                </Fragment>

                            )}
                        </Fragment>
                    </Grid>
                    <Grid xs={12} sm={12} md={4} lg={4}>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={1} lg={1}>
                                &nbsp;
                            </Grid>
                            <Grid xs={12} sm={12} md={11} lg={11}>
                                <Grid container spacing={0}>
                                    <Grid xs={12} sm={12} md={11} lg={11}>
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
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }

}
export default poMaster;

