import React, { Fragment, useEffect, useMemo } from "react";
import axios from "axios";
import { useDropzone } from 'react-dropzone';
 
import Grid from "@material-ui/core/Grid";
import { Button, Divider } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";



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
    const [DialogStatus, setDialogStatus] = React.useState(false);

    const { acceptedFiles, getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject } = useDropzone(
        {
            onDrop: files=>{
                console.log("onDrop > files > ",files)
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

    }, []);

    
    

   

    return (
        <Fragment>

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
                                startIcon={<AddIcon />} 
                                style={{width:'90%'}} 
                                onClick={(e) =>setDialogStatus(true)}
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
                    </Grid>
                    <Grid item xs={12} sm={12} md={10} lg={10}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link underline="hover" color="inherit">
                                        Home
                                    </Link>
                                    <Link
                                        underline="hover"
                                        color="inherit"                                         
                                    >
                                        Folder 1
                                    </Link>
                                    <Typography color="text.primary">Inside Folder 1</Typography>
                                </Breadcrumbs>
                            </Grid>
                        </Grid>

                        <div style={{ marginTop: -10 }} style={{ backgroundColor: "#fff" }}>
                            <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <div style={{ marginLeft: 10, marginRight: 10, marginTop: 20, width: '100%', height: 450, overflowY: 'scroll', overflowX: 'hidden' }}>
                                        <Grid container spacing={0}>
                                            <Button variant="outlined">
                                                Folder Name
                                            </Button>
                                        </Grid>
                                    </div>
                                </Grid>
                            </Grid>
                        </div>


                    </Grid>
                </Grid>
            </div>

            <Dialog
                className="dialog-prompt-activity"
                open={DialogStatus}
                onClose={(e) =>setDialogStatus(false)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title" className="dialog-area">
                    
                </DialogTitle>
                <DialogContent className="dialog-area">
                    <div style={{ marginTop: 10, marginBottom: 10 }}>
                        <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={12} lg={12}>
                                <TextField id="folder-name-input" variant="outlined" />
                            </Grid>
                        </Grid>
                    </div>     
                    <Button onClick={(e) =>setDialogStatus(false)}>Cancel</Button>
                    <Button onClick={null} >
                        Create
                    </Button>                                  
                </DialogContent>
            </Dialog>


        </Fragment>
    )
}
