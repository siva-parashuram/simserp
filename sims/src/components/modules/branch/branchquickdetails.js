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
import branchlogo from "../../../logo.png";
import { formGroupClasses } from '@mui/material';
import Attachmentmaster from '../../ftp/attachment/attachmentmaster';

class branchquickdetails extends React.Component {
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
                    {this.state.showDetails === true ? (
                        <Fragment>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                                    {console.log("props > branchItem > ", this.props.branchItem)}
                                    <TableContainer>
                                        <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                            <TableBody className="tableBody">
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Effective Date</TableCell>
                                                    <TableCell align="right" className="no-border-table"> {this.props.branchItem.effectiveDate ? moment(this.props.branchItem.effectiveDate).format("MM/DD/YYYY") : "-"}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Name</TableCell>
                                                    <TableCell align="right" className="no-border-table">{this.props.branchItem.name}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Address</TableCell>
                                                    <TableCell align="right" className="no-border-table">{this.props.branchItem.address} {this.props.branchItem.address2} {this.props.branchItem.address3}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Phone No</TableCell>
                                                    <TableCell align="right" className="no-border-table">{this.props.branchItem.phoneNo}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Website</TableCell>
                                                    <TableCell align="right" className="no-border-table">{this.props.branchItem.website}</TableCell>
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
                                        <Grid item xs={12} sm={12} md={3} lg={3}  >
                                            <div key="paymentPendingLink" to="#" className="card-link">
                                                <Card className="dash-activity-card2" raised={false}>
                                                    <CardContent>
                                                        <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                            Total Customers
                                                        </Typography>
                                                        <Typography >
                                                            870
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}  >
                                            <div key="paymentPendingLink" to="#" className="card-link">
                                                <Card className="dash-activity-card2" raised={false}>
                                                    <CardContent>
                                                        <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                            Total Sales &nbsp;&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography>
                                                            5,735
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={3} lg={3}  >
                                            <div key="paymentPendingLink" to="#" className="card-link">
                                                <Card className="dash-activity-card2" raised={false}>
                                                    <CardContent>
                                                        <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                            PO Raised &nbsp;&nbsp;&nbsp;
                                                        </Typography>
                                                        <Typography>
                                                            1,766
                                                        </Typography>
                                                    </CardContent>
                                                </Card>
                                            </div>
                                        </Grid>
                                    </Grid>
                                </Grid>

                            </Grid>
                        </Fragment>

                    ) : null}
                    {this.state.showAttachments === true ? (
                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                             <Attachmentmaster companyId={0} branchId={0}/>
                        </Grid>
                    ) : null}

                </Grid>
            </Fragment>
        )
    }
}
export default branchquickdetails;