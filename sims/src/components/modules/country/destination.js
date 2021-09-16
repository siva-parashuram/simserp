import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import '../../user/dasboard.css'; 
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

class destination extends React.Component {
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
        return(
            <Fragment>
            <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <h5 className="destination-title">Destinations</h5>
            </Grid>
            </Grid>
            <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>
                <Table stickyHeader size="small" className="" aria-label="Destination & Postcode List table">
                    <TableHead className="table-header-background">
                        <TableRow>
                            <TableCell className="table-header-font">#</TableCell>
                            <TableCell className="table-header-font" align="left">Destination</TableCell>
                            <TableCell className="table-header-font" align="left">PostCode</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                    {
                        console.log("this.props.destinations > ",this.props.destinations)
                    }
                    {
                        this.props.destinations?this.props.destinations.map((item, i) => (
                            <TableRow>
                            <TableCell className="table-header-font">D{item.destinationId} </TableCell>
                            <TableCell className="table-header-font" align="left">  {item.destinationName} </TableCell>
                            <TableCell className="table-header-font" align="left"> {item.postcode} </TableCell>
                        </TableRow>
                        )):null
                    }
                        
                    </TableBody>
                </Table>
            </Grid>
        </Grid>
            </Fragment>
        )
    }

}
export default destination;