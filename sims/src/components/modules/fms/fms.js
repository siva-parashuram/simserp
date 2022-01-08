import React, { Fragment, useEffect, useMemo } from "react";
import axios from "axios";
import { useDropzone } from 'react-dropzone';

import Grid from "@material-ui/core/Grid";
import { Button, Divider } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';



import AddIcon from '@mui/icons-material/Add';
import FolderIcon from '@mui/icons-material/Folder';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';



import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import ErrorSnackBar from "../../compo/errorSnackbar";


const baseStyle = {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '20px',
    borderWidth: 2,
    borderRadius: 2,
    borderColor: '#eeeeee',
    borderStyle: 'dashed',
    backgroundColor: '#fafafa',
    color: '#bdbdbd',
    outline: 'none',
    transition: 'border .24s ease-in-out'
};

const activeStyle = {
    borderColor: '#1e88e5'
};

const acceptStyle = {
    borderColor: '#1e88e5'
};




export default function Fms() {
    const [ErrorPrompt, setErrorPrompt] = React.useState(false);
    const [ErrorMessageProps, setErrorMessageProps] = React.useState("");

    const [DialogStatus, setDialogStatus] = React.useState(false);
    const [CreateButtonLoading, setCreateButtonLoading] = React.useState(false);
    const [newFolderName, setnewFolderName] = React.useState("");
    const [DirectoryList, setDirectoryList] = React.useState([]);
    const [DirectoryFileList, setDirectoryFileList] = React.useState([]);
    const [currentDirectory, setcurrentDirectory] = React.useState("");
    const [previewItem, setpreviewItem] = React.useState(null);
    const [DirectoryPath, setDirectoryPath] = React.useState("");
    const [DirectortBreadcrumb, setDirectortBreadcrumb] = React.useState([{name:"Home",path:""}]);


    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone(
        {
            onDrop: files => {
                console.log("onDrop > files > ", files)
            }
        }
    );
    const style = useMemo(() => ({
        ...baseStyle,
        ...(isDragActive ? activeStyle : {}),
        ...(isDragAccept ? acceptStyle : {})
    }), [
        isDragActive,
        isDragReject,
        isDragAccept
    ]);

     

    useEffect(() => {
        let ROOT_DIRECTORY = "";
        getDirectoriesList(ROOT_DIRECTORY);
        getDirectoryFileList(ROOT_DIRECTORY);
    }, []);

    const openDirectory=(incomingFolder)=>{
       
        let newPath=DirectoryPath+","+incomingFolder;
        let newD={
            name:incomingFolder,
            path:newPath
        };
        let existingArray=DirectortBreadcrumb;
        existingArray.push(newD);
        setDirectortBreadcrumb(existingArray);
        setDirectoryPath(newPath);
        refreshDirectoryContent(newPath);
    }

    const refreshDirectoryContent = (DIRECTORY) => {
        setpreviewItem(null);
        getDirectoriesList(DIRECTORY);
        getDirectoryFileList(DIRECTORY);
    }

    const getDirectoriesList = (path) => {//note that path should be comma separated
        const formData = new FormData();
        formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
        formData.append('Token', getCookie(COOKIE.TOKEN));
        formData.append("Transaction", path);
        formData.append('FileDataList', []);
        formData.append('isFMS', true);
        const headers = {
            "Content-Type": "application/json",
        };
        const ListOfDirectoryFromFTP = APIURLS.APIURL.ListOfDirectoryFromFTP;
        console.log("ListOfDirectoryFromFTP > ", ListOfDirectoryFromFTP);
        axios
            .post(ListOfDirectoryFromFTP, formData, { headers })
            .then((response) => {
                setDirectoryList(response.data);
            })
            .catch((error) => {
                console.log("error > ", error);
            });


    }

    const getDirectoryFileList = (path) => {
        const formData = new FormData();
        formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
        formData.append('Token', getCookie(COOKIE.TOKEN));
        formData.append("Transaction", path);
        formData.append('FileDataList', []);
        formData.append('isFMS', true);
        const headers = {
            "Content-Type": "application/json",
        };
        const ListOfFilesFromFTP = APIURLS.APIURL.ListOfFilesFromFTP;
        console.log("ListOfFilesFromFTP > ", ListOfFilesFromFTP);
        axios
            .post(ListOfFilesFromFTP, formData, { headers })
            .then((response) => {
                setDirectoryFileList(response.data);
            })
            .catch((error) => {
                console.log("error > ", error);
            });

    }


    const createFolder = (e) => {
        setpreviewItem(null);
        if (newFolderName === "") {

        } else {
            setCreateButtonLoading(true);
            const formData = new FormData();
            formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
            formData.append('Token', getCookie(COOKIE.TOKEN));
            formData.append("Transaction", newFolderName);
            formData.append('FileDataList', []);
            formData.append('isFMS', true);

            const headers = {
                "Content-Type": "application/json",
            };
            const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
            axios
                .post(FTPUploadUrl, formData, { headers })
                .then((response) => {
                    setCreateButtonLoading(false);//disable loading...

                    console.log("createFolder > response > ", response);
                    if (response.status === 200) {
                        setDialogStatus(false);//hide create folder dialog after success
                        refreshDirectoryContent(currentDirectory);




                    } else {
                        setCreateButtonLoading(false);
                        setErrorPrompt(true);
                        setErrorMessageProps("While creating Folder.");
                    }
                })
                .catch((error) => {
                    console.log("error > ", error);
                    setCreateButtonLoading(false);
                    setErrorPrompt(true);
                    setErrorMessageProps("While creating Folder.");
                });
        }



    }

    const initializePreviewItem = (item, isDirectory) => {
        let obj = {
            isDirectory: isDirectory,
            name: isDirectory === true ? item.directory : item.fileName,
            modifiedDateTime: item.modifiedDateTime
        };
        console.log("initializePreviewItem > obj > ", obj);
        setpreviewItem(obj);
    }

    const onBreadcrumbClick=(item,path,index)=>{

       
        let newPath='';
        let DirectoryPathArray=DirectoryPath.split(",");
        for(let i=0;i<DirectoryPathArray.length;i++){
            if(i<=index){
                newPath=newPath+","+DirectoryPathArray[i]
            }
        }
         
        let testArray=newPath.split(",");
        let newString="";
        for(let i=0;i<testArray.length;i++){
            if(i>0){
                if(testArray[i]===""){

                }else{
                    newString=newString+","+testArray[i];
                }
            }else{
                newString=newString+","+testArray[i];
            }
        }

        setDirectoryPath(newString);

        let existingArray=DirectortBreadcrumb;
        let newArray=[]; 
        for(let i=0;i<existingArray.length;i++){
            if(i<=index){
                newArray.push(existingArray[i]);
            }
        }
        setDirectortBreadcrumb(newArray);
        getDirectoriesList(path);
    }

    return (
        <Fragment>

            <ErrorSnackBar
                ErrorPrompt={ErrorPrompt}
                closeErrorPrompt={() => setErrorPrompt(false)}
                ErrorMessageProps={ErrorMessageProps}
            />

            <div style={{ marginLeft: 15, marginRight: 15, marginTop: -10 }}>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                        <br />
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={2} lg={2}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <br /> <br />
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Button
                                    variant="contained"
                                    startIcon={<CreateNewFolderIcon />}
                                    style={{ width: '70%' }}
                                    onClick={(e) => setDialogStatus(true)}
                                >
                                    Create Folder
                                </Button>




                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={11} lg={11}>
                                <br />
                                <Divider />
                                <br />
                            </Grid>
                        </Grid>


                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={11} lg={11}>
                                <section className="container">
                                    <div {...getRootProps({ style })}>
                                        <input {...getInputProps()} />
                                        <p>Drop your files</p>
                                    </div>
                                </section>
                            </Grid>
                        </Grid>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={11} lg={11}>
                                <br />
                                <Divider />
                                <br />
                            </Grid>
                        </Grid>



                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10}>

                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Breadcrumbs className="style-breadcrumb" aria-label="breadcrumb">
                                    {DirectortBreadcrumb.map((item,i)=>(
                                        <Link className="PointerOnHover" 
                                    underline="hover" 
                                    color="inherit" 
                                    onClick={(e)=>onBreadcrumbClick(item,item.path,i)}  >
                                        {item.name}
                                    </Link>
                                    ))}
                                    
                                    {/* <Link
                                        underline="hover"
                                        color="inherit"
                                    >
                                        Folder
                                    </Link>
                                    <Link
                                        underline="hover"
                                        color="inherit"
                                    >
                                        Inside Folder
                                    </Link> */}

                                </Breadcrumbs>
                            </Grid>
                        </Grid>


                        <div style={{ marginTop: -10 }} style={{ backgroundColor: "#fff" }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={9} lg={9}>
                                    <div style={{ height: 450, overflowY: 'scroll' }}>
                                        <Grid container spacing={0}>
                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                <div style={{ marginLeft: 20, marginRight: 2, marginTop: 20 }}>

                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            {DirectoryList.map((item, i) => (
                                                                <Fragment>
                                                                    <Button
                                                                        variant="outlined"
                                                                        startIcon={<FolderIcon />}
                                                                        style={{ marginBottom: 10, marginRight: 2, textTransform: 'initial' }}
                                                                        onClick={(e) => initializePreviewItem(item, true)}
                                                                    >
                                                                        {item.directory}
                                                                    </Button> &nbsp;
                                                                </Fragment>
                                                            ))}
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            <br />
                                                            <Divider />
                                                            <br />
                                                        </Grid>
                                                    </Grid>

                                                    <Grid container spacing={0}>
                                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                                            {DirectoryFileList.map((item, i) => (
                                                                <Fragment>
                                                                    <Button
                                                                        // variant="outlined" 
                                                                        startIcon={<InsertDriveFileIcon />}
                                                                        style={{ marginBottom: 10, marginRight: 2, textTransform: 'initial' }}
                                                                        onClick={(e) => initializePreviewItem(item, false)}
                                                                    >
                                                                        {item.fileName}
                                                                    </Button>
                                                                </Fragment>
                                                            ))}
                                                        </Grid>
                                                    </Grid>
                                                </div>

                                                <br />
                                            </Grid>
                                        </Grid>
                                    </div>


                                    <br /> <br /> <br />
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3} style={{ borderLeftStyle: 'solid', borderLeftWidth: 1, borderLeftColor: '#e0f2f1' }}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <div style={{ marginLeft: 10, marginRight: 10, marginTop: 20, width: '100%', }}>

                                                {previewItem ? (
                                                    <Fragment>
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                                                <h3>{previewItem.name}</h3>
                                                            </Grid>
                                                        </Grid>

                                                        <Grid container spacing={0}>
                                                            <Grid item xs={12} sm={12} md={4} lg={4}><b>Size</b></Grid>
                                                            <Grid item xs={12} sm={12} md={8} lg={8}>-</Grid>
                                                        </Grid>
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={12} sm={12} md={4} lg={4}><b>Modified On</b></Grid>
                                                            <Grid item xs={12} sm={12} md={8} lg={8}>{previewItem.modifiedDateTime}</Grid>
                                                        </Grid>
                                                        <br />
                                                        <Grid container spacing={0}>
                                                            <Grid item xs={12} sm={12} md={4} lg={4}>
                                                                {previewItem.isDirectory ? (
                                                                    <Button 
                                                                    variant="contained" 
                                                                    color="success" 
                                                                    startIcon={<FolderOpenIcon />}
                                                                    onClick={(e)=>openDirectory(previewItem.name)}
                                                                    >
                                                                        Open
                                                                        </Button>
                                                                ) : (
                                                                    <Button variant="contained" color="success" startIcon={<CloudDownloadIcon />}>Download</Button>
                                                                )}

                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={8} lg={8}></Grid>
                                                        </Grid>
                                                    </Fragment>
                                                ) : (
                                                    <Fragment>
                                                        <div style={{ alignItems: 'center', textAlign: 'center' }}>
                                                            <h3>Select Folder/File to preview details</h3>
                                                        </div>
                                                    </Fragment>
                                                )}




                                            </div>
                                        </Grid>
                                    </Grid>
                                    <br /> <br /> <br />
                                </Grid>
                            </Grid>
                        </div>


                    </Grid>
                </Grid>
            </div>

            <Dialog
                className="dialog-prompt-activity"
                open={DialogStatus}
                onClose={(e) => setDialogStatus(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="dialog-area">

                </DialogTitle>
                <DialogContent className="dialog-area">
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField
                                    id="folder-name-input"
                                    variant="outlined"
                                    onChange={(e) => setnewFolderName(e.target.value)} />
                            </Grid>
                        </Grid>
                    </div>
                    <Button onClick={(e) => setDialogStatus(false)}>Cancel</Button>
                    <LoadingButton
                        loading={CreateButtonLoading}
                        loadingPosition="start"
                        startIcon={<CreateNewFolderIcon />}
                        // variant="outlined"
                        onClick={(e) => createFolder()}

                    >
                        Create
                    </LoadingButton>
                </DialogContent>
            </Dialog>


        </Fragment>
    )
}
