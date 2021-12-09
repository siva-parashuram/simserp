import '../../../components/user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import { Divider, ListItemIcon } from '@material-ui/core';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import TableContainer from "@material-ui/core/TableContainer";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Button from '@mui/material/Button';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";



class attachmentmaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ShowLoader: false,
            ErrorPrompt: false,
            fileuploaded: this.props.fileuploaded,
            OldrowClicked: 1,
            filelist: [],
            fileSizeError: "Upload data not accepted",
        };
    }

    componentDidMount() {

    }

    fetchFileLists = () => {
        console.log("fetchFileLists > this.props > ", this.props);
        if (this.props.category === "company") {
            console.log("fetchFileLists > company > ");
            this.getCompanyFileList(this.props.companyId, 0);
        } else {
            this.getBranchFileList(this.props.companyId, this.props.branchId);
        }

    }

    getCompanyFileList = (companyId, branchId) => {
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
        fd.append('CompanyId', companyId);
        fd.append('BranchID', branchId);
        fd.append('Transaction', APIURLS.TrasactionType.default);
        fd.append('TransactionNo', "");
        fd.append('FileData', "");

        console.log("getCompanyFileList > fd > ", fd);
        axios
            .post(FTPFILELIST, fd, { headers })
            .then((response) => {
                console.log("getCompanyFileList > response > ", response);


                if (response.status === 200) {

                    this.setState({
                        filelist: response.data,
                        fileuploaded: true,
                        ShowLoader: false
                    });
                }

            })
            .catch((error) => {
                console.log("error > ", error);
                this.setState({ filelist: [] });
            });
    }

    getBranchFileList = (companyId, branchId) => {
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
        fd.append('CompanyId', companyId);
        fd.append('BranchID', branchId);
        fd.append('Transaction', APIURLS.TrasactionType.default);
        fd.append('TransactionNo', "");
        fd.append('FileData', "");

        axios
            .post(FTPFILELIST, fd, { headers })
            .then((response) => {
                console.log("getBranchFileList > response > ", response);
                if (response.status === 200) {
                    this.setState({ filelist: response.data, ShowLoader: false, newAdded: true, OldrowClicked: this.props.rowClicked });
                }

            })
            .catch((error) => {
                console.log("error > ", error);

                this.setState({ filelist: [] });
            });
    }

    processUpload = (e, category) => {
        this.setState({ ShowLoader: true });
        var filename = e.target.files[0].name;
        var extension = e.target.files[0].type;
        this.SWITCH(e, category);
    }

    SWITCH = (e, category) => {
        const formData = new FormData();
        let file = e.target.files[0];
        switch (category) {
            case "company":
                let companyId = this.props.companyId;
                formData.append('CompanyId', this.props.companyId);
                formData.append('BranchID', 0);
                formData.append('Transaction', APIURLS.TrasactionType.default);
                formData.append('TransactionNo', "");
                formData.append('FileData', file);
                this.processUploadPost(formData, this.props.companyId, 0, 'company');

                break;
            case "branch":
                formData.append('CompanyId', this.props.companyId);
                formData.append('BranchID', this.props.branchId);
                formData.append('Transaction', APIURLS.TrasactionType.default);
                formData.append('TransactionNo', "");
                formData.append('FileData', file);
                this.processUploadPost(formData, this.props.companyId, this.props.branchId, 'branch');
                break;

        }
    }

    processUploadPost = (formData) => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
        formData.append('Token', getCookie(COOKIE.TOKEN));

        const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
        const headers = {
            "Content-Type": "application/json",
        };


        axios
            .post(FTPUploadUrl, formData, { headers })
            .then((response) => {
                this.reset();
                if (response.status === 200 || response.status === 201) {
                    this.fetchFileLists();
                }
                if (response.status === 403) {
                    this.setState({ ErrorPrompt: true, ShowLoader: false });
                }

            })
            .catch((error) => {
                console.log("error > ", error);
                this.setState({ ErrorPrompt: true, ShowLoader: false });
                this.reset();
            });

    }


    reset = () => {
        document.getElementById("uploadInput").value = "";
    }



    /************************************FILE LISTING******************************************** */

    handleDelete = (e, item) => {
        this.setState({ e: e, item: item, AlertDialog: true });
    }

    processDelete = (e, item) => {
        console.log("e > ", e);
        console.log("item > ", item);
        document.getElementById("fileRow_" + item.fileName).style.display = 'none';
    }

    downloadThisFile = (e, item) => {
        console.log("------------------downloadThisFile----------------");
        console.log("e > ", e);
        console.log("item > ", item);
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.FileDownload;

        const fd = new FormData();
        fd.append('FileName', item.fileName);
        fd.append('companyId', this.props.companyId);
        fd.append('BranchID', this.props.category === "company" ? 0 : this.props.branchId);
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
                link.click();
            });
    }

    CloseAlertDialog = () => {
        this.setState({ AlertDialog: false });
    }
    CloseAlertDialogAndProcess = () => {
        this.setState({ AlertDialog: false });
        this.processDelete(this.state.e, this.state.item);
    }


    /************************************************************************************ */


    render() {


        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

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
                <div style={{ marginLeft: 10 }}>
                    {this.props.upload === true ? (
                        <Fragment>

                            <Snackbar
                                open={this.state.ErrorPrompt}
                                autoHideDuration={3000}
                                onClose={closeErrorPrompt}
                            >
                                <Alert onClose={closeErrorPrompt} severity="error">
                                    Error! {this.state.fileSizeError}
                                </Alert>
                            </Snackbar>

                            <Snackbar
                                open={this.state.SuccessPrompt}
                                autoHideDuration={3000}
                                onClose={closeSuccessPrompt}
                            >
                                <Alert onClose={closeSuccessPrompt} severity="success">
                                    Success!
                                </Alert>
                            </Snackbar>

                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>
                                    <TableContainer>
                                        <Table stickyHeader size="small" className="" aria-label="Attachment Form table">
                                            <TableRow>

                                                <TableCell className="no-border-table">
                                                    <Button
                                                        className="action-btns"
                                                        disabled={this.props.companyId?false:true}
                                                        startIcon={<AttachFileIcon />}
                                                        onClick={(e) => { document.getElementById("uploadInput").click() }}
                                                    >
                                                        Attach File
                                                    </Button>
                                                    <input
                                                        className="file-upload-input"
                                                        id="uploadInput"
                                                        type="file"
                                                        // onChange={(e) => this.processUpload(e, this.props.category)} 
                                                        onChange={this.props.fileUploadonChange}

                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <div style={{ marginLeft: 10, marginTop: 1, marginBottom: 20 }}>
                                <Grid container spacing={0}>
                                    <Grid xs={12} sm={12} md={11} lg={11}>
                                        <Divider />
                                    </Grid>
                                </Grid>                              
                            </div>
                        </Fragment>
                    ) : null}

                    <div style={{ marginLeft: 10, marginBottom: 20 }}>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={11} lg={11}>
                                Attachments
                            </Grid>
                        </Grid>
                    </div>
               
                    <div style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}>
                        <Fragment>
                            <Grid container spacing={0}>
                                <Grid xs={11} sm={11} md={11} lg={11}>
                                    <Table size="small">
                                        <TableBody className="tableBody">
                                            {this.props.filelist}
                                        </TableBody>
                                    </Table>
                                </Grid>
                            </Grid>
                        </Fragment>
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default attachmentmaster;