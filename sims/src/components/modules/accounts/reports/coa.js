import '../../../user/dasboard.css'; 
import Nav from "../../../user/nav";
import Menubar from "../../../user/menubar";
import { COOKIE, getCookie } from   "../../../../services/cookie"; 
import * as APIURLS from "../../../../routes/apiconstant"; 
import * as URLS from "../../../../routes/constants"; 
import Header from "../../../user/userheaderconstants";

import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';

class coa extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            list:[]
        };
    }

    componentDidMount() {
        this.getData();
    }

    getData(){
        let d = [
            {
                no: 1000,
                name: "Balance Sheet",
                incomebalance: "",
                accounttype: "Heading",
                totaling: ""
            },
            {
                no: 1002,
                name: "Inventory",
                incomebalance: "",
                accounttype: "Begin-Total",
                totaling: ""
            },
             
            {
                no: 1010,
                name: "Resale",
                incomebalance: "",
                accounttype: "Posting",
                totaling: ""
            },
            {
                no: 1023,
                name: "Finished Goods",
                incomebalance: "",
                accounttype: "Posting",
                totaling: ""
            },
            {
                no: 1100,
                name: "Inventory Total",
                incomebalance: "",
                accounttype: "EndTotal",
                totaling: ""
            },
            {
                no: 5000,
                name: "Current Assets",
                incomebalance: "",
                accounttype: "Begin-Total",
                totaling: ""
            },
        ];
        this.setState({list:d});
    }

    render() {
        return(
            <Fragment>
                  

                  <div className='breadcrumb-height'>
                  <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Breadcrumbs className='style-breadcrumb' aria-label="breadcrumb">
                                <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                                    Back
                                </Link>
                                <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                    Dashboard
                                </Link>
                                <Typography color="textPrimary">Chart of Account</Typography>
                            </Breadcrumbs>
                        </Grid>
                    </Grid>
                    <div className="New-link-bottom"></div>
                    <Grid className="table-adjust" container spacing={0}>
                        <Grid xs={12} sm={12} md={8} lg={8}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={10} lg={10}>
                                <Table stickyHeader size="small" className="" aria-label="table">
                    <TableHead className="table-header-background">
                        <TableRow>
                            <TableCell className="table-header-font">#</TableCell>
                            <TableCell className="table-header-font" align="left">Name</TableCell>
                            <TableCell className="table-header-font" align="left">Income/Balance</TableCell>
                            <TableCell className="table-header-font" align="left">Account type</TableCell>
                            <TableCell className="table-header-font" align="left">Totaling</TableCell>
                        </TableRow>                        
                    </TableHead>
                    <TableBody className="tableBody">
                        {this.state.list.map((item, i) => (
                            <TableRow>
                                <TableCell align="left">{item.no}</TableCell>
                                <TableCell align="left">
                                    {item.accounttype==="Posting"?(
                                        <Fragment>
                                            <div style={{marginLeft:10}}>
                                                {item.name}
                                            </div>
                                        </Fragment>
                                    ):item.accounttype==="Heading" || item.accounttype==="EndTotal"|| item.accounttype==="Begin-Total"?(
                                        <Fragment>
                                        <b>
                                            {item.name}
                                        </b>
                                    </Fragment>
                                    ):item.name}
                                    
                                </TableCell>
                                <TableCell align="left">{item.incomebalance}</TableCell>
                                <TableCell align="left">{item.accounttype}</TableCell>
                                <TableCell align="left">{item.totaling}</TableCell>
                            </TableRow>
                        ))}

                    </TableBody>
                </Table>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                  </div>
                
               
            </Fragment>
        )
    }

}

export default coa;