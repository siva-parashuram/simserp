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
const initialCss = "";
class branchlistbycompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {           
          initialCss: initialCss,
          urlparams: ""
        };
      }

      componentDidMount() {
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");

        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,

        });
      }

    render() {
        return (
            <Fragment>
            {console.log("this.props.data > ",this.props.data)}
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
                                             
                                            >
                                                <TableCell align="left">
                                                <a className="LINK tableLink" href={URLS.URLS.editBranch + this.state.urlparams + "&editbranchId=" + item.branchId} >
                                                B{item.branchId}
                                                </a>
                                                </TableCell>
                                                <TableCell align="left">
                                                <a className="LINK tableLink" href={URLS.URLS.editBranch + this.state.urlparams + "&editbranchId=" + item.branchId} >{item.name}</a>
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