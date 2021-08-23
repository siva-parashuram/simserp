import "./invoice.css";
import React from 'react';

// import ReactDOM from 'react-dom'; 
// import PrintTemplate from 'react-print';

import Grid from '@material-ui/core/Grid';
 


class testReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            invoiceData: {}
        };


    }

    componentDidMount() {


    }


    render() {




        return (
            <div className="invoiceArea">

                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <div className="invoiceTitleDiv">
                            <h5 className="invoiceTitle">Siva Tec Ltd., INVOICE</h5>
                        </div>
                    </Grid>
                    
                        <Grid item xs={7}>
                            <Grid item xs={9}>
                                <span className="boldHeader">Siva Tec Ltd</span><br />
                                <span>
                                    Unit 3, Princess Drive Industrial Estate, Princes Drive, Kenilworth, Warwichshire,CV8 2FD, UK.
                                </span>
                                <span>
                                    Tel-01926 857777 : E-Fax No. 0870 133 5693
                                </span>
                                <span>
                                    e-mail: sales@sivatec.co
                                </span>
                            </Grid>
                            <Grid item xs={9}>
                                <br /><br />
                                <span className="boldHeader">Consignee:-</span><br />
                                <span>
                                    Sarl AHB
                                </span><br />
                                <span>
                                    123 rue Bannier 45000 Orleans France
                                </span><br />
                                <span>
                                    Tel-01926 857777
                                </span> <br />
                                <span>
                                    VAT No.:  <span>FR89528763063</span>
                                </span>
                                <span>
                                    EORI No.:  <span>FR52876306300013</span>
                                </span>

                            </Grid>
                        </Grid>
                        <Grid item xs={5}>
                            <span className="">Invoice Number </span> <span className="boldtext padding-left-20"> INV-42162</span><br />
                            <span className="">Invoice Date <span className="boldHeader padding-left-45"> 27-Jul-2021</span></span><br />
                            <br />
                            <br />
                            <span className="">Cust. ord. No. </span> <span className=" padding-left-35"> Email</span><br />
                            <span className="">SRN </span> <span className=" padding-left-100"> 40298/1</span><br />
                            <span className="">Due Date </span> <span className="boldtext padding-left-63"> 27-Jul-2021</span><br />
                            <span className="">Ship Date </span> <span className=" padding-left-60"> 27-Jul-2021</span><br />
                            <span className="">Shipped Via </span> <span className=" padding-left-45"> DSV</span><br />
                        </Grid>
                    


                </Grid>
            </div>
        );
    }
}

export default testReport;