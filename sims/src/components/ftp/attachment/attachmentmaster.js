import '../../../components/user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

import TableContainer from "@material-ui/core/TableContainer";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import LinearProgress from '@mui/material/LinearProgress';
import Getattachments from "./getattachments";
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
            newAdded:false,
            OldrowClicked:1,
            filelist: []
        };
    }
    render() {
        const processUpload = (e, type, category) => {
            this.setState({ ShowLoader: true });
            // let companyId=this.props.companyId;
            // let branchId=this.props.branchId;
            console.log("e.target > ", e.target);
            console.log("e.target.files > ", e.target.files);
            var filename = e.target.files[0].name;
            var extension = e.target.files[0].type;
            console.log("filename > ", filename);
            console.log("extension > ", extension);
            SWITCH(e, type, category);
        }

        const SWITCH = (e, type, category,uploadOrList) => {
            const formData = new FormData();
            let file = e.target.files[0];
            /*
              companyId
              branchId
              file
              transactionType - PO/SO/
              transactionId
            */
            //APIURLS.TrasactionType.default;
            switch (category) {
                case "company":
                    let companyId = this.props.companyId;
                    formData.append('CompanyId', this.props.companyId);
                    formData.append('BranchID', 0);
                    formData.append('Transaction', APIURLS.TrasactionType.default);
                    formData.append('TransactionNo', "");
                    formData.append('FileData', file);
                    processUploadPost(formData,this.props.companyId,0,'company');
                    
                    break;
                case "branch":
                    formData.append('CompanyId', this.props.companyId);
                    formData.append('BranchID', this.props.branchId);
                    formData.append('Transaction', APIURLS.TrasactionType.default);
                    formData.append('TransactionNo', "");
                    formData.append('FileData', file);
                    processUploadPost(formData,this.props.companyId,this.props.branchId,'branch');
                    break;

            }
        }

        const processUploadPost = (formData,companyId,branchId,listing) => {
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
                    if(response.status===200 || response.status===201){
                        if (listing === "branch") {
                            getBranchFileList(companyId,branchId);
                        }
                        if (listing === "company") {
                            getBranchFileList(companyId,0);
                        }
                    }
                   
                })
                .catch((error) => {
                    console.log("error > ", error);
                    this.setState({ ErrorPrompt: true, ShowLoader: false });

                });

        }

    

        const getBranchFileList=(companyId,branchId) =>{
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
                  console.log("getBranchFileList > response > ",response);
                  if(response.status===200){
                    // this.props.filelist=response.data;
                    this.setState({ filelist:response.data, ShowLoader: false,newAdded:true,OldrowClicked:this.props.rowClicked });
                  }
                
              })
              .catch((error) => {
                console.log("error > ", error);
                this.setState({ filelist: [] });
              });
          }

        const reset = () => {
            document.getElementById("uploadInput").value = "";
        }

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
                                    Error!
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
                                                        className="file-browse-btn"

                                                        startIcon={<AttachFileIcon />}
                                                        onClick={(e) => { document.getElementById("uploadInput").click() }}
                                                    >
                                                        Attach File
                                                    </Button>
                                                    <input
                                                        className="file-upload-input"
                                                        id="uploadInput"
                                                        type="file"
                                                        onChange={(e) => processUpload(e, this.props.type, this.props.category)} />
                                                </TableCell>
                                            </TableRow>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                            <div style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}>
                                <Grid container spacing={0}>
                                    <Grid xs={12} sm={12} md={11} lg={11}>
                                        <Divider />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={0}>
                                    <Grid xs={12} sm={12} md={11} lg={11}>
                                        {this.state.ShowLoader === true ? (<LinearProgress />) : null}
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

                    {/*****************************Attachment List as per Props input***********************************************/}
                    <div style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}>
                        {this.props.companyId ? this.props.companyId > 0 ? (
                            <Fragment>
                                {(parseInt(this.props.rowClicked)>parseInt(this.state.OldrowClicked) )?(
                                   <Getattachments filelist={this.props.filelist} />  
                                ):(
                                    this.state.newAdded===true?(<Getattachments filelist={this.state.filelist} />):null
                                    
                                )}
                               
                            </Fragment>

                        ) : null : null}
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default attachmentmaster;