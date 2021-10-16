import '../../../components/user/dasboard.css';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import { Divider } from '@material-ui/core';

import TableContainer from "@material-ui/core/TableContainer";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@mui/material/Input';


class attachmentmaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: ""
        };
    }
    render() {
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
                                                    <span style={{ fontSize: 15 }}> Attach File</span>
                                                </TableCell>
                                                <TableCell className="no-border-table">
                                                    <input type="file" />
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
                            </div>
                        </Fragment>
                    ) : null}

                    <div style={{ marginLeft: 10, marginBottom: 20 }}>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={11} lg={11}>
                                <b>Attached Files</b>
                            </Grid>
                        </Grid>
                    </div>

                    {/*****************************Attachment List as per Props input***********************************************/}
                    <div style={{ marginLeft: 10, marginTop: 20, marginBottom: 20 }}>
                        {this.props.companyId ? this.props.companyId > 0 ? (
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>
                                    <a href="#">File 1</a> <br />
                                    <a href="#">File 2</a> <br />
                                    <a href="#">File 3</a> <br />
                                </Grid>
                            </Grid>
                        ) : null : null}
                    </div>
                </div>
            </Fragment>
        )
    }
}
export default attachmentmaster;