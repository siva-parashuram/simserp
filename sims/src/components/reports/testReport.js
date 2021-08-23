
import "./invoice.css";
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import PrintTemplate from 'react-print';

import Invoice from "./invoice";
import PrintIcon from '@material-ui/icons/Print';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';


class testReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() {


    }


    printReport() {
        //window.print()
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

                        { /*
                <Button
                    variant="contained"
                    startIcon={<PrintIcon />}
                >
                    Print
                </Button>

            */}
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