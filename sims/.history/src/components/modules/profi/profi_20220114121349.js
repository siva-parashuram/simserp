import React, { Fragment } from 'react';
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
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import BackdropLoader from "../../compo/backdrop";
import MasterDataGrid from "../../compo/masterdatagrid";

import Dualtabcomponent from '../../compo/dualtabcomponent';
import DialogCustom from "../../compo/dialogcomponent";


class profi extends React.Component {
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
            Dialog: {
                DialogTitle: "",
                DialogStatus: false,
                DialogContent: null,
            },
            pagination: {
                page: 1,
                rowsPerPage: APIURLS.pagination.rowsPerPage,
            },
            ProgressLoader: false,
            editBtnDisable: true,
            initialCss: "",
            urlparams: "",
            item: {},
            editUrl: "",
            BranchID: 0,
            compID:0,
            columns: APIURLS.MRNMasterColumn,
            DataList: [],
            selectionModel: [0],
            filelist: [],
        }
    }
    componentDidMount() {
        var url = new URL(window.location.href);
        let params = CF.GET_URL_PARAMS();
        console.log("Menusection params > ", params);
        let branchId = url.searchParams.get("branchId");
        let compID = url.searchParams.get("compID");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = params;
        
        this.setState({ urlparams: urlparams, BranchID: branchId, compID: parseInt(compID), editBtnDisable: false }, () => {
            this.getProformaInvoiceList();
        });
    }

    getProformaInvoiceList = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetProformaInvoiceByBranchID;
        let reqData = {
            ValidUser: ValidUser,
            PI: {
                BranchID: CF.toInt(this.state.BranchID)

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
                this.setState({ DataList: newData, ProgressLoader: true }, () => {
                    if (newData.length > 0) {
                        this.handleRowClick([1]);
                    }
                });
            })
            .catch((error) => {
                console.log("Error > ", error);
                this.setState({ DataList: [], ProgressLoader: true });
            });
    };


    handleRowClick = (e) => {
        try {
            console.log("handleRowClick > e > ", e);
            let index = e[0];
            console.log("handleRowClick > index > ", index);
            let item = this.state.DataList[index - 1];
            console.log("handleRowClick > item > ", item);


            let editUrl =
                URLS.URLS.editPI +
                this.state.urlparams +
                "&editPIID=" +
                item.PIID +
                "&type=edit";
            this.setState({
                item: item,
                editUrl: editUrl,
                selectionModel: index,
            },()=>{
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
        formData.append("Transaction", APIURLS.TrasactionType.PI);
        formData.append("TransactionNo", parseInt(this.state.item.PIID));
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
        formData.append("Transaction", APIURLS.TrasactionType.PI);
        formData.append("TransactionNo", parseInt(this.state.item.PIID));
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
        formData.append("Transaction", APIURLS.TrasactionType.PI);
        formData.append("TransactionNo", parseInt(this.state.item.PIID));
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
        formData.append('CompanyId', parseInt(this.state.compID));
        formData.append('BranchID', parseInt(this.state.BranchID));
        formData.append("Transaction", APIURLS.TrasactionType.PI);
        formData.append("TransactionNo", parseInt(this.state.item.PIID));
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
                    typoTitle="Purchase Invoice"
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

                        startIcon={APIURLS.buttonTitle.add.icon}
                        className="action-btns"
                        onClick={(e) => openPage(URLS.URLS.addPI + this.state.urlparams + "&type=add")}
                        disabled={this.state.DisableCreatebtn}
                    >
                        {APIURLS.buttonTitle.add.name}
                    </Button>

                    <Button className="action-btns"
                        startIcon={APIURLS.buttonTitle.edit.icon}
                        onClick={(e) =>
                            openPage(this.state.editUrl)
                        }
                        disabled={this.state.DataList.length > 0 ? this.state.editBtnDisable : true}
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
                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                            <TableContainer>
                                <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                    <TableBody className="tableBody">
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">No.</TableCell>
                                            <TableCell align="right" className="no-border-table"> {this.state.item.No}</TableCell>
                                        </TableRow>
                                       
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">PI Date.</TableCell>
                                            <TableCell align="right" className="no-border-table">{moment(this.state.item.PIDate).format("MM/DD/YYYY")}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">Supplier Name</TableCell>
                                            <TableCell align="right" className="no-border-table">{this.state.item.SupplierName}</TableCell>
                                        </TableRow>
                                        <TableRow>
                                            <TableCell align="left" className="no-border-table">Country</TableCell>
                                            <TableCell align="right" className="no-border-table">{this.state.item.CountryName}</TableCell>
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
                                                    FC Value
                                                </Typography>
                                                <Typography >
                                                    {this.state.item.FCValue ? this.state.item.FCValue.toFixed(2) : null}
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
                                                    Base Value
                                                </Typography>
                                                <Typography>
                                                    {this.state.item.BaseValue ? this.state.item.BaseValue.toFixed(2) : null}
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
                                                    Exch Rate
                                                </Typography>
                                                <Typography>
                                                    {this.state.item.ExchRate ? this.state.item.ExchRate.toFixed(2) : null}
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
                                                disabled={this.state.item.Status === 0 ? false : true}
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
                                                        onClick={this.state.item.Status === 0 ? (e) => this.handleDelete(e, item) : null}

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
                    open={this.state.CustomDialog.open}
                    onClose={(e) => this.closeDialog()}
                    onOK={(e) => this.processDelete()}
                />

                <Grid className="table-adjust" container spacing={0}>
                    <Grid xs={12} sm={12} md={8} lg={8}>
                        <Fragment>
                           
                            {this.state.DataList.length > 0 ? (
                                <Fragment>
                                    <MasterDataGrid
                                        selectionModel={this.state.selectionModel}
                                        rows={this.state.DataList}
                                        columns={this.state.columns}
                                        pagination={this.state.pagination}
                                        disableSelectionOnClick={false}
                                        onSelectionModelChange={(e) => this.handleRowClick(e)}
                                        onPageChange={handlePageChange}
                                    />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {this.state.DataList.length === 0 ? (
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
                                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: "#fff" }}>
                                        <Grid container spacing={0}>
                                            <Grid xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: "#fff" }}>
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
export default profi;

