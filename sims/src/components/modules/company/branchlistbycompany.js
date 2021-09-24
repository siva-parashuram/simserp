import '../../user/dasboard.css';


import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import axios from "axios";
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
class branchlistbycompany extends React.Component {

    render() {
        return (
            <Fragment>
                {this.props.data ? (
                    <div style={{marginLeft:50,marginTop:-56}}>
                        <Grid container spacing={0}>
                            
                            <Grid xs={12} sm={12} md={11} xl={11}>
                                <h4>Branch Lists</h4>
                            </Grid>
                        </Grid>
                        <Grid>
                            <Grid>
                                <Table stickyHeader size="small" className="" aria-label="company List table">
                                    <TableHead className="table-header-background">
                                        <TableRow>
                                            <TableCell className="table-header-font">#</TableCell>
                                            <TableCell className="table-header-font" align="left">Branch</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="tableBody">
                                        {this.props.data.map((item, i) => (
                                            <TableRow
                                                id={"row_" + i}
                                                className={this.state.initialCss}
                                                hover
                                                key={i}
                                            //onClick={(event) => handleRowClick(event,item,"row_"+i)}
                                            >
                                                <TableCell align="left">

                                                </TableCell>
                                                <TableCell align="left">

                                                </TableCell>

                                            </TableRow>

                                        ))}
                                    </TableBody>
                                </Table>
                            </Grid>
                        </Grid>

                    </div>

                ) : null}
            </Fragment>
        )
    }
}
export default branchlistbycompany;