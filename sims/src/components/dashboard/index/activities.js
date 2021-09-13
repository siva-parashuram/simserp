import '../../user/dasboard.css';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

import CardElement from "./cardelement";

class activities extends React.Component {
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
                            <div>
                                <div className="dash-row-header dash-header">
                                    <h1 className="dash-row-header-title">Activities</h1>
                                </div>
                            </div>
                        </Grid>

                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12} sm={3}>
                            <Card className="dash-activity-card" raised={false}>
                                <CardContent>
                                    <Typography color="textSecondary" style={{ fontSize: 12 }} gutterBottom>
                                        Sales This Month <br/>
                                    </Typography>
                                  
                                    <Typography variant="h4" component="h2" className="dashComp-card-h5">
                                        &#8377; 1,90,000
                                    </Typography>
                                    <div style={{width:'40%'}}>
                                    <Divider/>
                                    </div>
                                    <div style={{ height: 20 }}></div>
                                    <CardActions>
                                        <ChevronRightIcon />
                                        <a href="#" className="LINK">See More</a>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Card className="dash-activity-card" raised={false}>
                                <CardContent>
                                    <Typography color="textSecondary" style={{ fontSize: 12 }} gutterBottom>                                        
                                        Overdue Sales Invoice
                                        Amount
                                    </Typography>
                                   
                                    <Typography variant="h4" component="h2" className="dashComp-card-h5">
                                        &#8377; 21,22,850
                                    </Typography>
                                    <div style={{width:'50%'}}>
                                    <Divider  className="divider-overdue-border"/>
                                    </div>
                                   
                                    <div style={{ height: 20 }}></div>
                                    <CardActions>
                                        <ChevronRightIcon />
                                        <a href="#" className="LINK">See More</a>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={3}>
                            <Card className="dash-activity-card" raised={false}>
                                <CardContent>
                                    <Typography color="textSecondary" style={{ fontSize: 12 }} gutterBottom>
                                    Overdue Purch. Invoice
                                    Amount
                                    </Typography>
                                   
                                    <Typography variant="h4" component="h2" className="dashComp-card-h5">
                                        &#8377; 11,97,990
                                    </Typography>
                                    <div style={{width:'50%'}}>
                                    <Divider className="divider-overdue-border"/>
                                    </div>
                                    
                                    <CardActions>
                                        <ChevronRightIcon />
                                        <a href="#" className="LINK">See More</a>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item xs={12} sm={2}>

                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        );
    }
}

export default activities;