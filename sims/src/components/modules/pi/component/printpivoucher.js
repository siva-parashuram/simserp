import React, { Fragment } from "react";
import moment from "moment";
import Grid from '@material-ui/core/Grid';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";



import "../../../user/dasboard.css";
import "../../po/component/po.css";
import * as CF from "../../../../services/functions/customfunctions";


class printpivoucher extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() {
        console.log("-------------------------------------printPI-----------------------------------------------");
         
    }

    inWords =(num)=>{
        console.log("---------------------------------------------inWords----------------------------------------- ");
        // num=parseFloat(this.props.pidata.PO.FCValue);
        var str=CF.numberInWords(num);
     
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
                @page { size: portrait; }
              } `;
        };


        return (
            <div className="po-themeFont">
                <style>{getPageMargins()}</style>            

                <Grid container spacing={0}>
                    <Grid item xs={2}>
                    
                    </Grid>
                    <Grid item xs={8}>
                    <div className="invoiceTitleDiv" style={{ textAlign: 'center' }}>
                            <span className="pi-title">
                            {this.props.pidata.Branch.Name}
                            </span><br />
                            <span className="pi-no-title">
                            {(this.props.pidata.Branch.Address || this.props.pidata.Branch.Address!="")?(
                                <Fragment>
                                    {this.props.pidata.Branch.Address} &nbsp; 
                                </Fragment>
                            ):null} 
                             {(this.props.pidata.Branch.Address2 || this.props.pidata.Branch.Address2!="")?(
                                <Fragment>
                                    {this.props.pidata.Branch.Address2} &nbsp; 
                                </Fragment>
                            ):null} 
                            {(this.props.pidata.Branch.Address3 || this.props.pidata.Branch.Address3!="")?(
                                <Fragment>
                                    {this.props.pidata.Branch.Address3} &nbsp;
                                </Fragment>
                            ):null} 
                            </span><br />
                            <span><b>Purchase Voucher</b></span>                           
                        </div>
                    </Grid>                    
                    <Grid item xs={2}>
                      
                    </Grid>

                </Grid>
                <div style={{ height: 20 }}>&nbsp;</div>

                <Grid container spacing={0}>
                    <Grid item xs={6} style={{
                        textAlign:'left'
                    }}>
                      <b>Voucher No: </b> kakakakakakakakakak
                    </Grid>
                    <Grid item xs={6} style={{
                        textAlign:'right'
                    }}>
                      <b>Date: </b>{moment().format('DD-MMM-YYYY')}
                    </Grid>
                </Grid>
                
                
                <div style={{ marginLeft: -15 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <Table
                                size="small"
                                className="purchase-voucher-table"
                                aria-label="PV table"
                            >
                                <TableHead style={{
                                    borderColor:'black',
                                    borderBottomColor:'black'
                                }}>
                                    <TableRow className="purchase-voucher-table">
                                        <TableCell className="purchase-voucher-table" 
                                            style={{
                                                maxWidth: 500, minWidth: 500,
                                                borderColor: 'black',
                                                borderBottomColor: 'black'
                                            }} 
                                    align="left">Particulars</TableCell>                                       
                                        <TableCell className="purchase-voucher-table" 
                                        style={{ 
                                            maxWidth: 120, 
                                            minWidth: 120,
                                            borderColor: 'black',
                                            borderBottomColor: 'black' 
                                        }} 
                                        align="right">Debit Amount</TableCell>
                                        <TableCell className="purchase-voucher-table" 
                                        style={{ 
                                            maxWidth: 120, 
                                            minWidth: 120,
                                            borderColor: 'black',
                                            borderBottomColor: 'black'  
                                        }} 
                                        align="right">Credit Amount</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody >

                                   <TableRow>
                                        <TableCell className="purchase-voucher-table-tablecell" align="left">-</TableCell>                                       
                                        <TableCell className="purchase-voucher-table-tablecell" align="right">-</TableCell>
                                        <TableCell className="purchase-voucher-table-tablecell" align="right">-</TableCell>
                                    </TableRow>
                                    

                                    <TableRow>
                                        <TableCell className="purchase-voucher-table-tablecell" align="left"
                                         style={{                                           
                                            borderColor: 'black',
                                            borderBottomColor: 'black'  
                                        }} 
                                        >
                                            <div style={{height:250}}>&nbsp;</div>
                                            <span>
                                                <i>
                                                    Some data inputs with come here
                                                </i>
                                            </span>
                                            <br/>
                                        <b>
                                                <span>
                                                    Amount In Words:- {this.getCurrencyName()}. {this.inWords(155)}
                                                </span>
                                            </b>
                                       </TableCell>                                       
                                        <TableCell className="purchase-voucher-table-tablecell" align="right">
                                          
                                        </TableCell>
                                        <TableCell className="purchase-voucher-table-tablecell" align="right">
                                           
                                        </TableCell>
                                    </TableRow>

                                    <TableRow>
                                        <TableCell align="left"
                                         style={{                                           
                                            borderColor: 'black',
                                            borderBottomColor: 'black'  
                                        }} 
                                        >

                                        </TableCell>
                                        <TableCell className="purchase-voucher-table"
                                         style={{                                           
                                            borderColor: 'black',
                                            borderBottomColor: 'black'  
                                        }} 
                                        align="right">
                                            155.00
                                        </TableCell>
                                        <TableCell className="purchase-voucher-table" 
                                        style={{                                           
                                            borderColor: 'black',
                                            borderBottomColor: 'black'  
                                        }} 
                                        align="right">
                                            155.00
                                        </TableCell>
                                    </TableRow>
                               
                                </TableBody>
                            </Table>
                        </Grid>
                    </Grid>
                </div>      

                <div style={{ height: 50 }}>&nbsp;</div>
                <Grid container spacing={0}>
                    <Grid item xs={4}
                     style={{
                         textAlign:'left'
                     }}
                    >
                        <b>Prepared by </b>
                    </Grid>
                    <Grid item xs={4}
                     style={{
                        textAlign:'center'
                    }}
                    >
                        <b>Checked by </b>
                    </Grid>
                    <Grid item xs={4}
                     style={{
                        textAlign:'right'
                    }}
                    >
                        <b>Approved by </b>

                    </Grid>
                </Grid>        
            </div>
        );
    }
}

export default printpivoucher;


