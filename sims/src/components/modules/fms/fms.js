import React, { Fragment } from 'react';
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';

class fms extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };


    }

    componentDidMount() { }

    render() {
        return (
            <Fragment>
                <div style={{ marginLeft: 15, marginRight: 15, marginTop: -10 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>
                            <Typography variant="h6" gutterBottom component="div">
                                Siva File Repository
                            </Typography>

                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={2} lg={2}>
                            COL 1
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10} style={{ backgroundColor: "#fff" }}>
                            <div style={{ marginTop: -10 }}>
                                <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>&nbsp;</Grid>
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <div style={{ marginLeft: 10, marginRight: 10, width: '100%', height: 450, overflowY: 'scroll', overflowX: 'hidden' }}>
                                            <Grid container spacing={0}>
                                                <Button variant="outlined">
                                                   Folder Name                                                
                                                </Button>                                                
                                            </Grid>
                                        </div>
                                    </Grid>
                                </Grid>
                            </div>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }


}
export default fms;