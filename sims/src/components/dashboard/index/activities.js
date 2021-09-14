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
import Tooltip from '@material-ui/core/Tooltip';
import { Link } from "react-router-dom";

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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={4} lg={3}>
                            <Card className="dash-activity-card" raised={false}>
                                <CardContent>
                                    <Typography color="textSecondary" style={{ fontSize: 12 }} gutterBottom>
                                        Sales This Month <br />
                                    </Typography>

                                    <Typography variant="h4" component="h2" className="dashComp-card-h5">
                                        &#8377; 1,90,000
                                    </Typography>
                                    <div style={{ width: '40%' }}>
                                        <Divider />
                                    </div>
                                    <div style={{ height: 20 }}></div>
                                    <CardActions>
                                        <ChevronRightIcon />
                                        <a href="#" className="LINK">See More</a>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item  xs={12} sm={6} md={4} lg={3}>
                            <Card className="dash-activity-card" raised={false}>
                                <CardContent>
                                    <Typography color="textSecondary" style={{ fontSize: 12 }} gutterBottom>
                                        Overdue Sales Invoice
                                        Amount
                                    </Typography>

                                    <Typography variant="h4" component="h2" className="dashComp-card-h5">
                                        &#8377; 21,22,850
                                    </Typography>
                                    <div style={{ width: '50%' }}>
                                        <Divider className="divider-overdue-border" />
                                    </div>

                                    <div style={{ height: 20 }}></div>
                                    <CardActions>
                                        <ChevronRightIcon />
                                        <a href="#" className="LINK">See More</a>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item  xs={12} sm={6} md={4} lg={3}>
                            <Card className="dash-activity-card" raised={false}>
                                <CardContent>
                                    <Typography color="textSecondary" style={{ fontSize: 12 }} gutterBottom>
                                        Overdue Purch. Invoice
                                        Amount
                                    </Typography>

                                    <Typography variant="h4" component="h2" className="dashComp-card-h5">
                                        &#8377; 11,97,990
                                    </Typography>
                                    <div style={{ width: '50%' }}>
                                        <Divider className="divider-overdue-border" />
                                    </div>
                                    <div style={{ height: 20 }}></div>
                                    <CardActions>
                                        <ChevronRightIcon />
                                        <a href="#" className="LINK">See More</a>
                                    </CardActions>
                                </CardContent>
                            </Card>
                        </Grid>
                        <Grid item  xs={12} sm={6} md={4} lg={3}>

                        </Grid>
                    </Grid>

                    <br />
                    <Divider />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} md={6} lg={3} >
                            <h4>Ongoing Sales</h4>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12} >
                                    <Tooltip title="This month's Sales Quotes" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Sales Quotes
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        5000
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Tooltip title="Sales Orders generated this month" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Sales Orders
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        320
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Tooltip title="Sales Invoices generated this month" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Sales Invoices
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        290
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                            <h4>Ongoing Purchases</h4>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Tooltip title="Purchase Orders this month" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Purchase Orders
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        10
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Tooltip title="Ongoing Purchases this month" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Ongoing Purchases
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        3
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={6} md={6} lg={6}>
                                    <Tooltip title="Completed Purchases this month" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Completed Purchases
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        4
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6} lg={3}>
                            <h4>Payments</h4>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={12}>
                                    <Tooltip title="Payment collected this month" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Payment Collected
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        2,47,540
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                                <Grid item xs={12} sm={8} md={8} lg={8}>
                                    <Tooltip title="Payment pending this month" placement="top-start">
                                        <Link key="paymentPendingLink" to="#" className="card-link">
                                            <Card className="dash-activity-card2" raised={false}>
                                                <CardContent>
                                                    <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={true} gutterBottom>
                                                        Payment Pending
                                                    </Typography>
                                                    <Typography variant="h4" component="h2" className="dashComp-card2-h5">
                                                        4,35,390
                                                    </Typography>
                                                </CardContent>
                                            </Card>
                                        </Link>
                                    </Tooltip>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>

                </div>
            </Fragment>
        );
    }
}

export default activities;