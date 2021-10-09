import '../../../user/dasboard.css'; 
import Nav from "../../../user/nav";
import Menubar from "../../../user/menubar";
import { COOKIE, getCookie } from   "../../../../services/cookie"; 
import * as APIURLS from "../../../../routes/apiconstant"; 
import * as URLS from "../../../../routes/constants"; 

import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

class testformat extends React.Component {
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

            </Fragment>
        )
    }

}

export default testformat;