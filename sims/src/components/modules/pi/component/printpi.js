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
import "../../po/component/po.css";
import * as CF from "../../../../services/functions/customfunctions";


class printpi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() {
        console.log("-------------------------------------printPI-----------------------------------------------");
        console.log("pidata > ",this.props.pidata);
    }

    inWords =(num)=>{
        console.log("---------------------------------------------inWords----------------------------------------- ");
        num=parseFloat(this.props.pidata.PO.FCValue);
        var str=CF.numberInWords(num);
     /*
        var a = ['','one ','two ','three ','four ', 'five ','six ','seven ','eight ','nine ','ten ','eleven ','twelve ','thirteen ','fourteen ','fifteen ','sixteen ','seventeen ','eighteen ','nineteen '];
        var b = ['', '', 'twenty','thirty','forty','fifty', 'sixty','seventy','eighty','ninety'];
        

        if ((num = num.toString()).length > 9) return 'overflow';
        let n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
        if (!n) return; var str = '';
        str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
        str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
        str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
        str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
        str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
        
        str=str.toUpperCase();
        */
        console.log("inWords > str > ",str);
        return str.toUpperCase();
    }

    getCurrencyName=()=>{
        let name="";
        let CurrencyList=this.props.pidata.CurrencyList;
        let CurrID=this.props.pidata.PO.CurrID;
        try{
            for(let i=0;i<CurrencyList.length;i++) 
            if(parseFloat(CurrencyList[i].value)===parseFloat(CurrID))
            name=CurrencyList[i].name; 
           
        }catch(e){}
       
        return name;
    }

    

    getStateNameByID = () => {
        let id = this.props.pidata.Supplier.StateID;
        try {
            let StateList = this.props.pidata.Supplier.StateList;
            for (let i = 0; i < StateList.length; i++) {
                if (parseFloat(StateList[i].value) === parseFloat(id)) {
                    return StateList[i].name;
                    break;
                }
            }
        } catch (e) { }

    }

 
    
    getPrice = (Price) => {
        let P = 0.00;
        try {
            if (Price) {
                P = parseFloat(Price).toFixed(2);
            }
        } catch (e) { }

        return P;
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

    getCGSTAmt=(CGSTAmt)=>{
        let Amount=0.00;
        try{
            Amount=parseFloat(CGSTAmt); 
        }catch(e){}

      return Amount.toFixed(2); 
    }

    getSGSTAmt=(SGSTAmt)=>{
        let Amount=0.00;
        try{
            Amount=parseFloat(SGSTAmt); 
        }catch(e){}

      return Amount.toFixed(2); 
    }

    getIGSTAmt=(IGSTAmt)=>{
        let Amount=0.00;
        try{
            Amount=parseFloat(IGSTAmt); 
        }catch(e){}

      return Amount.toFixed(2); 
    }
 

    getTotalQuantity=()=>{
        let quantity=0;
        let PurchaseOrderLine=this.props.pidata.PurchaseOrderLine;
        console.log("getTotalAmount > PurchaseOrderLine > ",PurchaseOrderLine);
        for(let i=0;i<PurchaseOrderLine.length;i++){
            quantity=parseFloat(quantity)+parseFloat(PurchaseOrderLine[i].Quantity);
        }
        return quantity;
    }
    
    getTotalAmount=()=>{
        let amount=0.00;
        let PurchaseOrderLine=this.props.pidata.PurchaseOrderLine;
        console.log("getTotalAmount > PurchaseOrderLine > ",PurchaseOrderLine);
        try{
            for(let i=0;i<PurchaseOrderLine.length;i++){
                amount=parseFloat(amount)+(parseFloat(PurchaseOrderLine[i].Price)*parseFloat(PurchaseOrderLine[i].Quantity))
            }
        }catch(e){}
       
        return amount.toFixed(2);
    }

   
    getTotalCGSTSGSTAmount=()=>{
        let totalCGSTSGSTAmount=0.00;
        let POL=this.props.pidata.PurchaseOrderLine;

        try {
            for (let i = 0; i < POL.length; i++) {
                let QP = 0.00;
                let halfGSTPercentage = 0.00;
                let CGSTSGSTAmount = 0.00;
                halfGSTPercentage = parseFloat(POL[i].GSTPercentage) / 2;
                QP = (parseFloat(POL[i].Quantity) * parseFloat(POL[i].Price));
                QP = parseFloat(QP) - ((parseFloat(QP) * parseFloat(POL[i].LineDiscPercentage)) / 100);
                CGSTSGSTAmount=(parseFloat(QP)*parseFloat(halfGSTPercentage))/100;
                totalCGSTSGSTAmount=parseFloat(totalCGSTSGSTAmount)+parseFloat(CGSTSGSTAmount);
            }
        } catch (e) { }

        return totalCGSTSGSTAmount.toFixed(2);
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
                    <Grid item xs={4}>
                        <div className="invoiceTitleDiv" style={{ marginTop: 10 }}>
                            <img src={logo} className="App-logo" alt="logo" />
                        </div>
                    </Grid>
                    <Grid item xs={4}></Grid>                    
                    <Grid item xs={4}>
                        <div className="invoiceTitleDiv" style={{ textAlign: 'left', marginRight: -25 }}>
                            <span className="po-title">
                                <span>Purchase Invoice</span><br />
                                <span className="po-no-title">{this.props.pidata.PO.No}</span><br />
                                <span className="po-no-title">{moment(this.props.pidata.PO.PODate).format('DD-MMM-YYYY')}</span>  
                            </span>
                        </div>
                    </Grid>
                </Grid>
                <div style={{ height: 20 }}>&nbsp;</div>
                <Grid container spacing={0}>
                <Grid item xs={4}>
                        <span><b>Invoice To:</b></span><br />
                        <span><b>{this.props.pidata.Branch.Name}</b></span><br />
                        <span>
                            {(this.props.pidata.Branch.Address || this.props.pidata.Branch.Address!="")?(
                                <Fragment>
                                    {this.props.pidata.Branch.Address}<br/>
                                </Fragment>
                            ):null} 
                             {(this.props.pidata.Branch.Address2 || this.props.pidata.Branch.Address2!="")?(
                                <Fragment>
                                    {this.props.pidata.Branch.Address2}<br/>
                                </Fragment>
                            ):null} 
                            {(this.props.pidata.Branch.Address3 || this.props.pidata.Branch.Address3!="")?(
                                <Fragment>
                                    {this.props.pidata.Branch.Address3}<br/>
                                </Fragment>
                            ):null} 
                          
                        </span> 
                        <span>
                            Tel-{this.props.pidata.Branch.PhoneNo}
                        </span><br />
                        {this.props.pidata.Branch.FAXNo ? (
                            <Fragment>
                                <span>
                                    <b>E-Fax No.:</b> {this.props.pidata.Branch.FAXNo}
                                </span><br />
                            </Fragment>
                        ) : null}
                        {this.props.pidata.Branch.EmailID ? (
                            <Fragment>
                                <span>
                                <b>E-mail:</b> {this.props.pidata.Branch.EmailID}
                                </span><br />
                            </Fragment>
                        ) : null}
                         {this.props.pidata.Branch.TINo ? (
                            <Fragment>
                                <span>
                                <b>T.I.No.:</b> {this.props.pidata.Branch.TINo}
                                </span><br />
                            </Fragment>
                        ) : null}

                        {this.props.pidata.Branch.IsGST === true ? (
                            <Fragment>
                                <span><b>GST No.:</b> {this.props.pidata.Branch.GSTNo}</span><br />
                            </Fragment>

                        ) : null}

                        {this.props.pidata.Branch.IsVAT === true ? (
                            <Fragment>
                                <span ><b>VAT No.:</b> {this.props.pidata.Branch.VATNo}</span> <br />
                            </Fragment>

                        ) : null}
                       
                        
                    </Grid>
                    <Grid item xs={4}>
                        <span><b>Supplier:</b></span><br />
                        <span><b>{this.props.pidata.Supplier.Name}</b></span><br />
                        {(this.props.pidata.Supplier.Address || this.props.pidata.Supplier.Address!="")?(
                                <Fragment>
                                    {this.props.pidata.Supplier.Address}<br/>
                                </Fragment>
                            ):null} 
                             {(this.props.pidata.Supplier.Address2 || this.props.pidata.Supplier.Address2!="")?(
                                <Fragment>
                                    {this.props.pidata.Supplier.Address2}<br/>
                                </Fragment>
                            ):null} 
                            {(this.props.pidata.Supplier.Address3 || this.props.pidata.Supplier.Address3!="")?(
                                <Fragment>
                                    {this.props.pidata.Supplier.Address3}<br/>
                                </Fragment>
                            ):null} 
                             {(this.props.pidata.Supplier.City || this.props.pidata.Supplier.City!="")?(
                                <Fragment>
                                    {this.props.pidata.Supplier.City}<br/>
                                </Fragment>
                            ):null} 
                              {(this.props.pidata.Supplier.PostCode || this.props.pidata.Supplier.PostCode!="")?(
                                <Fragment>
                                    {this.props.pidata.Supplier.PostCode}<br/>
                                </Fragment>
                            ):null} 

                        <span>
                            <b>E-mail:</b> {this.props.pidata.Supplier.EmailID}
                        </span><br />
                        <span ><b>GST No.:</b>  {this.props.pidata.PO.GSTNo}</span><br />
                        <span><b>State:</b>  {this.getStateNameByID()}</span>
                    </Grid>
                    <Grid item xs={4}>
                        <Grid container spacing={0}>
                            <Grid item xs={6}><b>Supplier Invoice No.:</b></Grid>
                            <Grid item xs={6}>{this.props.pidata.MRN.SuplInvNo} </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs={6}><b>Supplier Invoice Date:</b></Grid>
                            <Grid item xs={6}>{moment(this.props.pidata.MRN.SuplInvDate).format('DD-MMM-YYYY')} </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs={6}><b>Due Date:</b></Grid>
                            <Grid item xs={6}>{moment(this.props.pidata.MRN.DueDate).format('DD-MMM-YYYY')} </Grid>
                        </Grid>
                        <Grid container spacing={0}>
                            <Grid item xs={6}><b>Terms of Payment:</b></Grid>
                            <Grid item xs={6}>{this.props.pidata.PO.PaymentTerm} </Grid>
                        </Grid>
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
                                        <TableCell style={{ maxWidth: 280, minWidth: 280 }} align="left">Description</TableCell>
                                        <TableCell style={{ maxWidth: 50, minWidth: 50 }} align="left">HSN</TableCell>
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Qty</TableCell>
                                        <TableCell style={{ maxWidth: 50, minWidth: 50 }} align="left">UOM</TableCell>
                                        <TableCell style={{ maxWidth: 100, minWidth: 100 }} align="right">Unit Price</TableCell>
                                        <TableCell style={{ maxWidth: 100, minWidth: 100 }} align="right">Disc %</TableCell>
                                        <TableCell style={{ maxWidth: 80, minWidth: 80 }} align="right">Amt</TableCell>
                                        {this.props.pidata.Branch.IsGST === true ? (
                                            <Fragment>
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
                                            </Fragment>
                                        ) : null}
                                        
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                {this.props.pidata.PurchaseOrderLine.map((item, i) => (
                                        <TableRow>
                                            <TableCell className="po-print-no-border-table" align="left" style={{verticalAlign:'top'}}>{i + 1}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">
                                                {item.Description}
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">{item.HSNCode}</TableCell>
                                            
                                            <TableCell className="po-print-no-border-table" align="right">{item.Quantity}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="left">
                                                {this.props.pidata.UOMList.map((uom, j) => (
                                                    <Fragment>
                                                        {uom.value === item.UOMID ? uom.name : null}
                                                    </Fragment>
                                                ))}
                                            </TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{this.getPrice(item.Price)}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{this.getPrice(item.LineDiscPercentage)}</TableCell>
                                            <TableCell className="po-print-no-border-table" align="right">{this.QuantityMultiplyPrice(item.Quantity, item.Price)}</TableCell>
                                           
                                        {this.props.pidata.Branch.IsGST === true ? (
                                            <Fragment>
                                                <TableCell className="po-print-no-border-table" align="center">
                                                    <tr>
                                                        <td>{item.CGSTRate}</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>
                                                        {this.getCGSTAmt(item.CGSTAmt)}
                                                        </td>
                                                    </tr>
                                                </TableCell>
                                                <TableCell className="po-print-no-border-table" align="center">
                                                    <tr>
                                                        <td>{item.SGSTRate}</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>{this.getSGSTAmt(item.SGSTAmt)}</td>
                                                    </tr>
                                                </TableCell>
                                                <TableCell className="po-print-no-border-table" align="center">
                                                    <tr>
                                                        <td>{item.IGSTRate}</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>&nbsp;</td>
                                                        <td>{this.getIGSTAmt(item.IGSTAmt)}</td>
                                                    </tr>
                                                </TableCell>
                                            </Fragment>
                                        ) : null}
                                        </TableRow>
                                    ))}
                                     <div style={{ height: 20 }}>&nbsp;</div>
                                    <TableRow>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="left"><b>TOTAL:</b></TableCell>                                         
                                        <TableCell className="po-print-no-border-table" align="right">{this.getTotalQuantity()}</TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">{this.getTotalAmount()}</TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">
                                        {this.getTotalCGSTSGSTAmount()}
                                        </TableCell>
                                        <TableCell className="po-print-no-border-table" align="right">
                                        {this.getTotalCGSTSGSTAmount()}
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
                                                    Amount In Words:- {this.getCurrencyName()}. {this.inWords()}
                                                </span>
                                            </b>
                                        </TableCell>
                                         
                                        <TableCell className="po-print-no-border-table" align="right"></TableCell>
                                        <TableCell className="po-print-no-border-table" align="right" colSpan={2}><b>Grand Total </b> {this.getCurrencyName()}</TableCell>
                                        <TableCell className="po-print-no-border-table" align="right" > {this.props.pidata.PO.FCValue}</TableCell>


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
                                    Computer generated PI does not required signature<br />
                                {this.props.pidata.PO.AuthorizeName ? (
                                    <Fragment>
                                        {this.props.pidata.PO.AuthorizeName === "" ? "Un-Authorized" : "Authorized by " + this.props.pidata.PO.AuthorizeName}
                                    </Fragment>
                                ) : "Un-Authorized"}
                                   
                                    
                                </span>
                            </div>
                        </Grid>
                    </Grid>        

                

            </div>
        );
    }
}

export default printpi;