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

import Attachmentmaster from '../../ftp/attachment/attachmentmaster';

class itemquickdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            showDetails: true,
            showAttachments: false,
            detailsUnderlineBtnCss: "btn-bottom-border-color",
            attachmentUnderlineBtnCss: "",

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

                                    <TableContainer>
                                        <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                            <TableBody className="tableBody">
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Alias</TableCell>
                                                    <TableCell align="right" className="no-border-table">{this.props.item.Alias} </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">No.</TableCell>
                                                    <TableCell align="right" className="no-border-table"> {this.props.item.No}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Description1</TableCell>
                                                    <TableCell align="right" className="no-border-table">
                                                        {this.props.item.Description1}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Description2</TableCell>
                                                    <TableCell align="right" className="no-border-table">
                                                        {this.props.item.Description2}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Packing Description1</TableCell>
                                                    <TableCell align="right" className="no-border-table">
                                                        {this.props.item.PackingDesc1}
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Packing Description2</TableCell>
                                                    <TableCell align="right" className="no-border-table">
                                                        {this.props.item.PackingDesc2}
                                                    </TableCell>
                                                </TableRow>
                                                {this.props.item.CertificateNo === "" ? null : (
                                                    <TableRow>
                                                        <TableCell align="left" className="no-border-table">Certificate No</TableCell>
                                                        <TableCell align="right" className="no-border-table">
                                                            {this.props.item.CertificateNo}
                                                        </TableCell>
                                                    </TableRow>
                                                )}

                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">UOM</TableCell>
                                                    <TableCell align="right" className="no-border-table">
                                                        {this.props.item.UOMCode}
                                                    </TableCell>
                                                </TableRow>

                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Standard Cost</TableCell>
                                                    <TableCell align="right" className="no-border-table">
                                                        {this.props.item.StandardCost}
                                                    </TableCell>
                                                </TableRow>





                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">Modified On</TableCell>
                                                    <TableCell align="right" className="no-border-table">

                                                        {this.props.item.ModifyDate?moment(this.props.item.ModifyDate).format("MM/DD/YYYY HH:mm:ss"):null}
                                                    </TableCell>
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

                        </Fragment>

                    ) : null}
                    {this.state.showAttachments === true ? (
                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                            Attachments comes here
                        </Grid>
                    ) : null}

                </Grid>
            </Fragment>
        )
    }
}
export default itemquickdetails;