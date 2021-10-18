import '../../../components/user/dasboard.css';
import * as APIURLS from  "../../../routes/apiconstant";  
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
 


class attachmentmaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ShowLoader:false,
            filelist:this.props.filelist
        };
    }
    render() {
        const processUpload=(e,type,category)=>{
            this.setState({ShowLoader:true});
            // let companyId=this.props.companyId;
            // let branchId=this.props.branchId;
            console.log("e.target > ",e.target);
            console.log("e.target.files > ",e.target.files);
            var filename = e.target.files[0].name;
            var extension = e.target.files[0].type;
            console.log("filename > ",filename);
            console.log("extension > ",extension);
            SWITCH(e,type,category);
        }

        const SWITCH = (e,type,category) => {
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
                    formData.append('companyId', companyId);
                    formData.append('transactionType',APIURLS.TrasactionType.default);                    
                    formData.append('file', file);
                    processUploadPost(formData); 
                    break;
                case "branch":           
                    formData.append('companyId', this.props.companyId);
                    formData.append('branchId', this.props.branchId);
                    formData.append('transactionType',APIURLS.TrasactionType.default);
                    formData.append('file', file);
                    processUploadPost(formData); 
                    break;
               
            }
        }

        const processUploadPost=(formData)=>{                   
    
                const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;              
                const headers = {
                    "Content-Type": "application/json",
                };
                getFileList();
                reset();
                this.setState({ShowLoader:false});
                /*
                axios
                    .post(FTPUploadUrl, formData, { headers })
                    .then((response) => {
                         
                    })
                    .catch((error) => {
                        console.log("error > ", error);
                    });
                    */
        }

        const getFileList=()=>{
            let filelist=[
                {id:1,name:"This is Attachment File 1",link:"#"},
                {id:2,name:"This is Attachment - File 2",link:"#"},
            ];
            this.setState({filelist:filelist});
        }

        const reset=()=>{
            document.getElementById("uploadInput").value = "";
        }

        return (
            <Fragment>
                <div style={{ marginLeft: 10 }}>
                    {this.props.upload === true ? (
                        <Fragment>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>
                                    <TableContainer>
                                        <Table stickyHeader size="small" className="" aria-label="Attachment Form table">                                            
                                            <TableRow>
                                                 
                                                <TableCell className="no-border-table">
                                                    <Button
                                                    className="file-browse-btn"
                                                    
                                                     startIcon={<AttachFileIcon />}
                                                     onClick={(e)=>{document.getElementById("uploadInput").click()}}
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
                                        {this.state.ShowLoader===true?(<LinearProgress />):null}                                      
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
                            <Getattachments filelist={this.state.filelist}/>
                        ) : null : null}
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default attachmentmaster;