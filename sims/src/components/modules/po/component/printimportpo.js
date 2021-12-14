import "./po.css";
import React, { Fragment } from "react";
import moment from "moment";
import Grid from '@material-ui/core/Grid';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import logo from '../../../../logo.png';
import { Divider } from "@material-ui/core";




class printimportpo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() {
        console.log("-------------------------------------printlocalpo-----------------------------------------------");
    }

    inWords = (num) => {
        num = parseFloat(this.props.podata.PO.FCValue);
        var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
        var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];


        if ((num = num.toString()).length > 9) return 'overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        return str;
    }

    getCurrencyName = () => {
        let name = "";
        let CurrencyList = this.props.podata.CurrencyList;
        let CurrID = this.props.podata.PO.CurrID;
        for (let i = 0; i < CurrencyList.length; i++)
            if (parseFloat(CurrencyList[i].value) === parseFloat(CurrID))
                name = CurrencyList[i].name;

        return name;
    }


    getTotalAmount = () => {
        let amount = 0.00;
        let PurchaseOrderLine = this.props.podata.PurchaseOrderLine;
        try {
            for (let i = 0; i < PurchaseOrderLine.length; i++) {
                let QP = (parseFloat(PurchaseOrderLine[i].Quantity) * parseFloat(PurchaseOrderLine[i].Price));
                QP = parseFloat(QP) - ((parseFloat(QP) * parseFloat(PurchaseOrderLine[i].LineDiscPercentage)) / 100);
                amount = parseFloat(amount) + parseFloat(QP);
            }
        } catch (e) { }

        return amount.toFixed(2);
    }

    getTotalQuantity = () => {
        let quantity = 0.00;
        let PurchaseOrderLine = this.props.podata.PurchaseOrderLine;
        try {
            for (let i = 0; i < PurchaseOrderLine.length; i++) {
                quantity = parseFloat(quantity) + parseFloat(PurchaseOrderLine[i].Quantity);
            }
        } catch (e) { }

        return quantity.toFixed(2);
    }

    getStateNameByID = () => {
        let id = this.props.podata.Supplier.StateID;
        let StateList = this.props.podata.Supplier.StateList;
        try {
            for (let i = 0; i < StateList.length; i++) {
                if (parseFloat(StateList[i].value) === parseFloat(id)) {
                    return StateList[i].name;
                    break;
                }
            }
        } catch (e) { }

    }

    getQuantity = (Quantity) => {
        let Q = 0.00;
        try {
            if (Quantity) {
                Q = parseFloat(Quantity);
            }
        } catch (e) { }

        return Q.toFixed(2);
    }

    getPrice = (Price) => {
        let P = 0.00;
        try {
            if (Price) {
                P = parseFloat(Price);
            }
        } catch (e) { }

        return P.toFixed(2);
    }

    getLineDiscPercentage = (LineDiscPercentage) => {
        let LDP = 0.00;
        try {
            if (LineDiscPercentage) {
                LDP = parseFloat(LineDiscPercentage);
            }
        } catch (e) { }

        return LDP.toFixed(2);
    }

    QuantityMultiplyPrice = (Quantity, Price) => {
        let QP = 0.00;
        try {
            if (Quantity && Price) {
                QP = (parseFloat(Quantity) * parseFloat(Price));

            }
        } catch (e) { }

        return QP.toFixed(2);
    }

    QuantityMultiplyDiscountPrice = (Quantity, Price, LineDiscPercentage) => {
        let QP = 0.00;
        try {
            if (Quantity && Price) {
                QP = (parseFloat(Quantity) * parseFloat(Price));
                QP = parseFloat(QP) - ((parseFloat(QP) * parseFloat(LineDiscPercentage)) / 100);

            }
        } catch (e) { }

        return QP.toFixed(2);
    }


    render() {

        const marginTop = "25px"
        const marginRight = "25px"
        const marginBottom = "25px"
        const marginLeft = "25px"
        const getPageMargins = () => {
            return `@page { margin: ${marginTop} ${marginRight} ${marginBottom} ${marginLeft} !important; }  @media print {
                @page { size: portrait; }
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
                                <span className="po-no-title">{this.props.podata.PO.No}</span><br />
                                <span className="po-no-title">{moment(this.props.podata.PO.PODate).format('DD-MMM-YYYY')}</span>
                            </span>
                        </div>
                    </Grid>
                </Grid>
                <div style={{ height: 20 }}>&nbsp;</div>
                <Grid container spacing={0}>
                    <Grid item xs={3}>
                        <span><b>Invoice To:</b></span><br />
                        <span className="boldHeader" >{this.props.podata.Branch.Name}</span><br />
                        <span>
                            {(this.props.podata.Branch.Address || this.props.podata.Branch.Address != "") ? (
                                <Fragment>
                                    {this.props.podata.Branch.Address}<br />
                                </Fragment>
                            ) : null}
                            {(this.props.podata.Branch.Address2 || this.props.podata.Branch.Address2 != "") ? (
                                <Fragment>
                                    {this.props.podata.Branch.Address2}<br />
                                </Fragment>
                            ) : null}
                            {(this.props.podata.Branch.Address3 || this.props.podata.Branch.Address3 != "") ? (
                                <Fragment>
                                    {this.props.podata.Branch.Address3}<br />
                                </Fragment>
                            ) : null}

                        </span>
                        <span>
                            Tel-{this.props.podata.Branch.PhoneNo}
                        </span><br />
                        {this.props.podata.Branch.FAXNo ? (
                            <Fragment>
                                <span>
                                    E-Fax No. {this.props.podata.Branch.FAXNo}
                                </span><br />
                            </Fragment>
                        ) : null}
                        {this.props.podata.Branch.EmailID ? (
                            <Fragment>
                                <span>
                                    E-mail: {this.props.podata.Branch.EmailID}
                                </span><br />
                            </Fragment>
                        ) : null}

                        {this.props.podata.Branch.IsGST === true ? (
                            <Fragment>
                                <span className="boldHeader">GST No.: {this.props.podata.Branch.GSTNo}</span><br />
                            </Fragment>

                        ) : null}

                        {this.props.podata.Branch.IsVAT === true ? (
                            <span className="boldHeader">VAT No.: {this.props.podata.Branch.IsGST}</span> > <br />
                        ) : null}

                        <span>
                            <span><b>Notify/Despatch To:</b></span> {this.props.podata.Branch.ContactPerson}
                        </span>

                    </Grid>
                    <Grid item xs={3}>
                        <span><b>Supplier:</b></span><br />
                        <span className="boldHeader">{this.props.podata.Supplier.Name}</span><br />
                        {(this.props.podata.Supplier.Address || this.props.podata.Supplier.Address != "") ? (
                            <Fragment>
                                {this.props.podata.Supplier.Address}<br />
                            </Fragment>
                        ) : null}
                        {(this.props.podata.Supplier.Address2 || this.props.podata.Supplier.Address2 != "") ? (
                            <Fragment>
                                {this.props.podata.Supplier.Address2}<br />
                            </Fragment>
                        ) : null}
                        {(this.props.podata.Supplier.Address3 || this.props.podata.Supplier.Address3 != "") ? (
                            <Fragment>
                                {this.props.podata.Supplier.Address3}<br />
                            </Fragment>
                        ) : null}

                        <span>
                            E-mail: sales@sivatec.co
                        </span><br />
                        <span className="boldHeader">GST No.:  {this.props.podata.PO.GSTNo}</span><br />
                        <span><b>State:</b> {this.getStateNameByID()}</span>
                    </Grid>
                    <Grid item xs={3}>
                        <span >
                            <span><b> Despatch Thru:</b></span> Your Own
                        </span><br />
                        <span>
                            <span><b>Final Destination:</b></span><br />
                            <span style={{ whiteSpace: 'pre-wrap' }}> {this.props.podata.PO.DeliveryAddress} </span>
                        </span><br />
                        <span>
                            <span><b>Despatch Date:</b></span> {moment(this.props.podata.PO.DispachDate).format('DD-MMM-YYYY')}
                        </span> <br />
                        <span>
                            <span><b>Delivery Date:</b></span> {moment(this.props.podata.PO.DeliveryDate).format('DD-MMM-YYYY')}
                        </span>
                    </Grid>
                    <Grid item xs={3}>
                        <span>
                            <span><b>Ref:</b></span> {this.props.podata.PO.Reference}
                        </span><br />

                        <span>
                            <span><b>Terms of Payment:</b></span>{this.props.podata.PO.PaymentTerm}
                        </span><br /><br />
                        <span>
                            <span><b>Special Instructions:</b></span><br />
                            {this.props.podata.PO.SpecialInst}
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
                        <span>Dear {this.props.podata.PO.ContactPerson},</span><br />
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
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Disc %</TableCell>
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    {this.props.podata.PurchaseOrderLine.map((item, i) => (
                                        <TableRow>
                                            <TableCell className="po-print-no-border-table" align="left" style={{ verticalAlign: 'top' }}>{i + 1}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">
                                                {item.Description}
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">{item.HSNCode}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">
                                                {this.props.podata.UOMList.map((uom, j) => (
                                                    <Fragment>
                                                        {uom.value === item.UOMID ? uom.name : null}
                                                    </Fragment>
                                                ))}
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{this.getQuantity(item.Quantity)}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{this.getPrice(item.Price)}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{this.getLineDiscPercentage(item.LineDiscPercentage)}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">
                                                {this.QuantityMultiplyDiscountPrice(item.Quantity, item.Price, item.LineDiscPercentage)}

                                            </TableCell>


                                        </TableRow>
                                    ))}

                                    <div style={{ height: 20 }}>&nbsp;</div>
                                    <TableRow>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"><b>TOTAL:</b></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">{this.getTotalQuantity()}</TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">{this.getTotalAmount()}</TableCell>


                                    </TableRow>
                                    <div style={{ height: 20 }}>&nbsp;</div>
                                    <TableRow>
                                        <TableCell className="po-print-no-border-table" align="left" colSpan={5}>
                                            <b>
                                                <span>
                                                    Amount In Words:- {this.getCurrencyName()}. {this.inWords()}
                                                </span>
                                            </b>
                                        </TableCell>
                                        <TableCell className="po-print-no-border-table" align="right" colSpan={3}>Grand Total {this.getCurrencyName()} {this.props.podata.PO.FCValue} </TableCell>

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
                        <div style={{ textAlign: 'center' }}>
                            <span>
                                For Siva Tec Ltd<br />
                                Computer generated PO does not required signature<br />
                                {this.props.podata.PO.Status === 1 ? null : (
                                    <span>Authorized by -</span>
                                )}
                            </span>
                        </div>
                    </Grid>
                </Grid>

            </div>
        );
    }
}

export default printimportpo;