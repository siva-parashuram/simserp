import '../../user/dasboard.css';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InfoIcon from '@mui/icons-material/Info';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import moment from "moment";
import Branchlistbycompany from "./branchlistbycompany";

import Attachmentmaster from '../../ftp/attachment/attachmentmaster';
 

class companyquickdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: true,
            showAttachments: false,
            detailsUnderlineBtnCss: "btn-bottom-border-color",  //btn-bottom-border-color
            attachmentUnderlineBtnCss: ""
        };
    }
    render() {
        const customTabButton = (e, params) => {
            if (params === "details") {
                this.setState({ showDetails: true, showAttachments: false, detailsUnderlineBtnCss: "btn-bottom-border-color", attachmentUnderlineBtnCss: "" });
            }
            if (params === "attachments") {
                this.setState({ showDetails: false, showAttachments: true, attachmentUnderlineBtnCss: "btn-bottom-border-color", detailsUnderlineBtnCss: "" });
            }
        }

        const openPage = (url) => {
            console.log("url > ", url);

            this.setState({ ProgressLoader: false });
            window.location = url;
        }

        return (
            <Fragment>
               
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button
                                startIcon={<InfoIcon />}
                                className={this.state.detailsUnderlineBtnCss}
                                onClick={(e) => customTabButton(e, "details")}>Details</Button>
                            <Button
                                startIcon={<AttachFileIcon />}
                                className={this.state.attachmentUnderlineBtnCss}
                                onClick={(e) => customTabButton(e, "attachments")}>Attachments</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 20 }}></div>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    {console.log("----------------> Props > ",this.props)}
                    {this.state.showDetails === true ? (
                        <Fragment>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                                    
                                    {this.props.data.length>0?(
                                        <Branchlistbycompany data={this.props.data} />
                                    ):"No Branches"}
                                    
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
                                        <Grid item xs={12} sm={12} md={3} lg={3}  >
                                            
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}  >
                                             
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}  >
                                             
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Fragment>

                    ) : null}
                    {this.state.showAttachments === true ? (
                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                            <Attachmentmaster 
                            filelist={this.props.filelist}
                            category="company"
                            type="info"
                            companyId={this.props.item.companyId} 
                            upload={true}
                            rowClicked={this.props.rowClicked}
                            />
                        </Grid>
                    ) : null}

                </Grid>
                
            </Fragment>
        )
    }
}
export default companyquickdetails;