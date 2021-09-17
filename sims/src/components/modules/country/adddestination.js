import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

 

import '../../user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

class adddestination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: false,
            destinations: [],

        }
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
             
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={10} lg={10}>
                   
                        <Table stickyHeader size="small" className="accordion-table" aria-label="destination add table">
                            <TableBody className="tableBody">
                                <TableRow>
                                    <TableCell align="left" className="no-border-table">
                                        <b> Destination</b>
                                    </TableCell>
                                    <TableCell align="left" className="no-border-table">
                                        <TextField
                                            id="Name"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                className: "textFieldCss",
                                                maxlength: 50
                                            }}

                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className="no-border-table">
                                        <b> Post Code</b>
                                    </TableCell>
                                    <TableCell align="left" className="no-border-table">
                                        <TextField
                                            id="PostCode"
                                            variant="outlined"
                                            size="small"
                                            fullWidth
                                            InputProps={{
                                                className: "textFieldCss",
                                                maxlength: 50
                                            }}

                                        />
                                    </TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell align="left" className="no-border-table">
                                        <Button
                                            className="add-destination-button"
                                            startIcon={<AddIcon />}
                                        // onClick={handleUpdate}

                                        >
                                            Add
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                      
                        </Grid>


                </Grid>
            </Fragment>
        )
    }

}
export default adddestination;