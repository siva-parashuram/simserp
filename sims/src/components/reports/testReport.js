
import "./invoice.css";
import React from 'react'; 
import PrintTemplate from 'react-print';
import Invoice from "./invoice";
import PrintIcon from '@material-ui/icons/Print';
import IconButton from '@material-ui/core/IconButton';


class testReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() {


    }


    


    render() {


        return (
            <div>
                <div id="react-no-print">
                    <div className="InvoiceBtns">
                        <IconButton color="primary"
                            aria-label="Print Invoice"
                            component="span"
                            onClick={(e) => window.print()}
                        >
                            <PrintIcon />
                        </IconButton>

                    </div>

                    <Invoice />
                </div>


                <PrintTemplate>
                    <div id="print-mount">
                        <Invoice />
                    </div>
                </PrintTemplate>
            </div>
        );
    }
}

export default testReport;