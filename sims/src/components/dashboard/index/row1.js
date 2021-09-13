import '../../user/dasboard.css';
import React, { Fragment } from 'react';
// import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
// import * as URLS from "../../routes/constants";


import Grid from '@material-ui/core/Grid';


import Component1 from "../sales/component1";
import Component2 from "../sales/component2";



const userComponents = ["component1", "component2"];

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
                <div style={{ marginLeft: 15 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12}>

                            <div className="dash-row-header dash-header">
                                <h1 className="dash-row-header-title">Insights</h1>
                            </div>

                        </Grid>

                        {userComponents.includes("component1") ? <Component1 /> : null}
                        {userComponents.includes("component2") ? <Component2 /> : null}

                        

                    </Grid>
                </div>

            </Fragment>
        );
    }
}

export default row1;