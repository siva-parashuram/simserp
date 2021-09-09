import './dasboard.css';
import React, { Fragment } from 'react';
// import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
// import * as URLS from "../../routes/constants";


import Grid from '@material-ui/core/Grid';


import SalesDashView from "../../components/dashboard/sales";


class row1 extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FullScreenDialog: false
        };


    }

    componentDidMount() {

    }



    render() {


        return (
            <Fragment>
                <Grid container spacing={0}>
                    <div>
                        <div className="dash-row-header dash-header">
                            <h1 className="dash-row-header-title">Sales</h1>
                        </div>
                        <SalesDashView />
                    </div>

                </Grid>
            </Fragment>
        );
    }
}

export default row1;