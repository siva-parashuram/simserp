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

import Dualtabcomponent from '../../compo/dualtabcomponent';

class branchquickdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: true,
            showAttachments: false,
            detailsUnderlineBtnCss: "btn-bottom-border-color",  //btn-bottom-border-color
            attachmentUnderlineBtnCss: "",
            filelist: this.props.filelist,
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

            this.setState({ ProgressLoader: false });
            window.location = url;
        }


        const tab1Html = (
            <Fragment>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                        <TableContainer>
                            <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                <TableBody className="tableBody">
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Effective Date</TableCell>
                                        <TableCell align="right" className="no-border-table"> {this.props.branchItem.EffectiveDate ? moment(this.props.branchItem.EffectiveDate).format("MM/DD/YYYY") : "-"}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Name</TableCell>
                                        <TableCell align="right" className="no-border-table">{this.props.branchItem.Name}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Address</TableCell>
                                        <TableCell align="right" className="no-border-table">{this.props.branchItem.Address} {this.props.branchItem.Address2} {this.props.branchItem.Address3}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Phone No</TableCell>
                                        <TableCell align="right" className="no-border-table">{this.props.branchItem.PhoneNo}</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Website</TableCell>
                                        <TableCell align="right" className="no-border-table">{this.props.branchItem.Website}</TableCell>
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
        );

        const tab2Html = (
            <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                {console.log("this.props.branchItem > ",this.props.branchItem)}
                <Attachmentmaster
                    companyId={this.props.branchItem.CompanyID}
                    branchId={this.props.branchItem.BranchID}
                    filelist={this.props.filelist}
                    rowClicked={this.props.rowClicked}
                    category="branch"
                    type="info"
                    upload={true}
                />
            </Grid>
        );

        



        return (
            <Fragment>
                <Dualtabcomponent
                    tab1name="Details"
                    tab2name="Attachments"
                    tab1Html={tab1Html}
                    tab2Html={tab2Html}
                />
            </Fragment>
        )
    }
}
export default branchquickdetails;