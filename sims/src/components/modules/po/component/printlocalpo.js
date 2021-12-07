import "./po.css";
import React, { Fragment } from "react";
import Grid from '@material-ui/core/Grid';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import logo from '../../../../logo.png';
import { Divider } from "@material-ui/core";




class printlocalpo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() {
    }


    render() {

        const marginTop = "25px"
        const marginRight = "25px"
        const marginBottom = "25px"
        const marginLeft = "25px"
        const getPageMargins = () => {
            return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }  @media print {
                @page { size: landscape; }
              } `;
        };


        return (
            <div className="po-themeFont">
                <style>{getPageMargins()}</style>

                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <div className="invoiceTitleDiv" style={{ marginTop: 10 }}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                    </Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}></Grid>
                    <Grid item xs={3}>
                        <div className="invoiceTitleDiv" style={{ textAlign: 'left', marginRight: -25 }}>
                            <span className="po-title">
                                <span>Purchase Order</span><br />
                                <span className="po-no-title">LPO/0004/21-22</span><br />
                                <span className="po-no-title">26-March-2018</span>
                            </span>
                        </div>
                    </Grid>
                </Grid>
                <div style={{ height: 20 }}>&nbsp;</div>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <span><b>Invoice To:</b></span><br />
                        <span className="boldHeader" >Siva Tec Ltd</span><br />
                        <span>
                            Unit 3, Princess Drive Industrial Estate, Princes Drive, Kenilworth, Warwichshire,CV8 2FD, UK.
                        </span><br /><br />
                        <span>
                            Tel-01926 857777
                        </span><br />
                        <span>
                            E-Fax No. 0870 133 5693
                        </span><br />
                        <span>
                            E-mail: sales@sivatec.co
                        </span><br />
                        <span className="boldHeader">GST No.: 30ABCGTRAEWDP</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span><b>Supplier:</b></span><br />
                        <span className="boldHeader">Vijay Lakshmi Electrical and Hardware</span><br />
                        <span>
                            Unit 3, Princess Drive Industrial Estate, Princes Drive, Kenilworth, Warwichshire,CV8 2FD, UK.
                        </span><br />

                        <span>
                            E-mail: sales@sivatec.co
                        </span><br />
                        <span className="boldHeader">GST No.: 30ABCGTRAEWDP</span><br />
                        <span><b>State:</b> Goa 30</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span >
                            <span><b> Despatch Thru:</b></span> Your Own
                        </span><br />
                        <span>
                            <span><b>Final Destination:</b></span> Siva Tec Ltd
                        </span><br /><br /><br />
                        <span>
                            <span><b>Despatch Date:</b></span> 26-March-2018
                        </span> <br />
                        <span>
                            <span><b>Delivery Date:</b></span> 28-March-2018
                        </span>
                    </Grid>
                    <Grid item xs={3}>
                        <span>
                            <span><b>Ref:</b></span> Samihan
                        </span><br />
                        <span>
                            <span><b>Notify/Despatch To:</b></span> Pratap Nadkarni
                        </span><br />
                        <span>
                            <span><b>Terms of Payment:</b></span> 30 Days
                        </span><br /><br />
                        <span>
                            <span><b>Special Instructions:</b></span><br />
                            2Nos. original invoice affixed with Co's stamp
                        </span><br />
                        <span>
                            <span><b>Terms of Deleivery:</b></span><br />
                            Delivered at our factory
                        </span>
                    </Grid>
                </Grid>
                <div style={{ height: 20 }}>&nbsp;</div>
                <Grid container spacing={0}>
                    <Grid item xs={12}>
                        <span>Dear Contact Person,</span><br />
                        <span>We are pleased to place our order as per the details given below:</span>
                    </Grid>
                </Grid>
                <div style={{ height: 20 }}>&nbsp;</div>
                <div style={{ marginLeft: -15 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Table
                                size="small"
                                className="po-themeFont"
                                aria-label="Lines List table"
                            >
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ maxWidth: 30, minWidth: 30 }} align="left">Sr.No</TableCell>
                                        <TableCell style={{ maxWidth: 350, minWidth: 350 }} align="left">Description of Goods</TableCell>
                                        <TableCell style={{ maxWidth: 50, minWidth: 50 }} align="left">HSN</TableCell>
                                        <TableCell style={{ maxWidth: 50, minWidth: 50 }} align="left">Unit</TableCell>
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Quantity</TableCell>
                                        <TableCell style={{ maxWidth: 100, minWidth: 100 }} align="right">Unit Price</TableCell>
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Amount</TableCell>
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Disc %</TableCell>
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Taxable</TableCell>
                                        <TableCell style={{ maxWidth: 100, minWidth: 100 }} align="center">
                                            <tr>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>CGST</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <Divider />
                                            <tr>
                                                <td>%</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>Amt.</td>
                                            </tr>
                                        </TableCell>
                                        <TableCell style={{ maxWidth: 100, minWidth: 100 }} align="center">
                                            <tr>
                                            <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>SCGST</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <Divider />
                                            <tr>
                                                <td>%</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>Amt.</td>
                                            </tr>
                                        </TableCell>
                                        <TableCell style={{ maxWidth: 100, minWidth: 100 }} align="center">
                                            <tr>
                                            <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>ICGST</td>
                                                <td>&nbsp;</td>
                                            </tr>
                                            <Divider />
                                            <tr>
                                                <td>%</td>                                                
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>Amt.</td>
                                            </tr>
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {console.log("++++++++++++++++++++++++++++++++this.props.podata.PurchaseOrderLine ", this.props.podata.PurchaseOrderLine)}
                                    {this.props.podata.PurchaseOrderLine.map((item, i) => (
                                        <TableRow>
                                            <TableCell className="po-print-no-border-table" align="left" style={{verticalAlign:'top'}}>{i + 1}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">
                                                {item.Description} zxzxmnaskas x zx ,zxzxmnaskaszxknzx
                                                zxknzzzzzzzzzzzzzzzzzzzzzz
                                                zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">{item.HSNCode}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">
                                                {this.props.podata.UOMList.map((uom, j) => (
                                                    <Fragment>
                                                        {uom.value === item.UOMID ? uom.name : null}
                                                    </Fragment>
                                                ))}
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{item.Quantity}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{item.Price}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{parseFloat(item.Quantity) * parseFloat(item.Price)}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{item.LineDiscPercentage}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{item.GSTPercentage}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">
                                            <tr>
                                                <td>0.00</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>0.00</td>
                                            </tr>
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">
                                            <tr>
                                                <td>0.00</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>0.00</td>
                                            </tr>
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">
                                            <tr>
                                                <td>0.00</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>&nbsp;</td>
                                                <td>0.00</td>
                                            </tr>
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                    <div style={{ height: 20 }}>&nbsp;</div>


                                    <TableRow>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"><b>TOTAL:</b></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">{0}</TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">{0}</TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">{0.00}</TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">
                                            00.00
                                        </TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">
                                            00.00
                                        </TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">
                                            00.00
                                        </TableCell>
                                    </TableRow>
                                    <div style={{ height: 20 }}>&nbsp;</div>
                                    <TableRow>
                                        <TableCell className="po-print-no-border-table" align="left" colSpan={7}>
                                            <b>
                                                <span>
                                                    Amount In Words:- INR. one thousand nine hundred ninety-one and 84/100 only
                                                </span>
                                            </b>
                                        </TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"> </TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"> </TableCell>
                                        <TableCell className="po-print-no-border-table" align="right" colSpan={2}>Grand Total INR 1991.84</TableCell>


                                    </TableRow>
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </div>              

                <div style={{ height: 50 }}>&nbsp;</div>
                <Grid container spacing={0}>
                        <Grid item xs={8}></Grid>
                        <Grid item xs={4}>
                            <div style={{ textAlign: 'center', marginRight: -50 }}>
                                <span>
                                    For Siva Tec Ltd<br />
                                    Computer generated PO does not required signature<br />
                                    Authorized by Vipul Thakkar
                                </span>
                            </div>
                        </Grid>
                    </Grid>

            </div>
        );
    }
}

export default printlocalpo;