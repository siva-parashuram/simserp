import '../../user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Chip from '@material-ui/core/Chip';
import TimelineIcon from '@material-ui/icons/Timeline';

class quickactionsection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            branchName: "",
            branchId: "",
            compName: "",
            userInitial: "",
            firstname: "",
            datetime: "",
            lastSync: "",
            greetings:"",
            ActivityRefresh:false
        };
    }

    componentWillUnmount() {
        clearInterval(this.interval);        
      }

    componentDidMount() {
        let token = getCookie(COOKIE.USERID);
        let FIRSTNAME = getCookie(COOKIE.FIRSTNAME);

        if (token === "null" || token == null) {
            this.setState({ isLoggedIn: false });
        } else {
            let initialName = FIRSTNAME.charAt(0).toUpperCase();
            var url = new URL(window.location.href);
            let branchId = url.searchParams.get("branchId");
            let branchName = url.searchParams.get("branchName");
            let compName = url.searchParams.get("compName");

            var currentdate = new Date();
            var lastSync = "Last Sync: " + currentdate.getDate() + "/"
                + (currentdate.getMonth() + 1) + "/"
                + currentdate.getFullYear() + " @ "
                + currentdate.getHours() + ":"
                + currentdate.getMinutes() + ":"
                + currentdate.getSeconds();

            var datetime = currentdate.toDateString();

            
            var time = currentdate.getHours();
            var greetings="";
            if (time < 12) {
                greetings="Good morning!";  
            }else{
                if(time >= 12){
                    // if (time >= 13 && time<14) {
                    //     greetings="Go eat lunch!"; 
                    // }
                    // if(time>12){
                    //     greetings="Good afternoon!"; 
                    // }
                    if(time>=16){
                        greetings="Good Evening!"; 
                    }else{
                        greetings="Good afternoon!"; 
                    }
                }
            }        
           
           

            this.setState({
                branchName: branchName,
                branchId: branchId,
                compName: compName,
                userInitial: initialName,
                firstname: FIRSTNAME,
                datetime: datetime,
                lastSync: lastSync,
                greetings:greetings
            });
        }


        this.interval = setInterval(() => {
            this.setState({ActivityRefresh:false}); 
            this.refreshActivityList();
                 
          }, 1000);

    }


     refreshActivityList=()=>{
        
        this.setState({ActivityRefresh:true}); 
        this.fetchGreetings();
        //fetch last visited pages
        //fetch recent sales,purchases
    }

    fetchGreetings=()=>{
        var currentdate = new Date();
        var lastSync = "Last Sync: " + currentdate.getDate() + "/"
            + (currentdate.getMonth() + 1) + "/"
            + currentdate.getFullYear() + " @ "
            + currentdate.getHours() + ":"
            + currentdate.getMinutes() + ":"
            + currentdate.getSeconds();

        var datetime = currentdate.toDateString();        
        var time = currentdate.getHours();
        var greetings="";
        if (time < 12) {
            greetings="Good morning!";  
        }else{
            if(time >= 12){
                // if (time >= 13 && time<14) {
                //     greetings="Go eat lunch!"; 
                // }
                // if(time>12){
                //     greetings="Good afternoon!"; 
                // }
                if(time>=16){
                    greetings="Good Evening!"; 
                }else{
                    greetings="Good afternoon!"; 
                }
            }
        }
        this.setState({           
            datetime: datetime,
            lastSync: lastSync,
            greetings:greetings
        });
    }

    render() {
        return (
            <Fragment>
                <div style={{ marginLeft: 0 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12}>
                            <div>
                                <div className="dash-row-header dash-header">
                                    <h1 className="dash-row-header-title">Quick Action Section</h1>
                                </div>
                            </div>
                        </Grid>
                    </Grid>

                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={12} lg={7}>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            {this.state.datetime}
                                            <Typography variant="h3" className="welcome-text" gutterBottom>                                              
                                                <span className="greetings">{this.state.greetings} </span>
                                                <span className="welcome-username-highlight">{this.state.firstname}</span>
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                    {this.state.ActivityRefresh===true?(
                                        <Fragment>
                                        <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Typography className="user-last-activities" gutterBottom>
                                              <TimelineIcon/>  Recent activities were
                                            </Typography>                                            
                                        </Grid>
                                    </Grid>
                                    <Grid container spacing={0}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}> 
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'left',
                                            flexWrap: 'wrap',
                                             
                                        }}>
                                        <Chip className="chip-css"  size="small" label="Sales Order page"  />
                                        <Chip className="chip-css" size="small" label="Monthly Report"/>
                                        <Chip className="chip-css" size="small" label="Create New Purchase" />
                                        </div> 
                                        </Grid>
                                    </Grid>
                                        </Fragment>
                                    ):null}
                                   

                                </Grid>
                                <Grid item xs={12} sm={12} md={12} lg={5}>
                                    <h4>Actions</h4>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Badge variant="standard" badgeContent={3} style={{ color: 'red' }}>
                                                <Link key="quickLinkSalesInvoiceNotification" to="#" className="quick-action-links">Sales Invoice</Link>
                                            </Badge>
                                        </Grid>
                                        <Grid item xs={12} sm={12} md={12} lg={12}>
                                            <Badge badgeContent={3} style={{ color: 'red' }}>
                                                <Link key="quickLinkPurchaseInvoiceNotification" to="#" className="quick-action-links">Purchase Invoice</Link>
                                            </Badge>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>

                        </Grid>
                        <Grid item xs={12} sm={12} md={6} lg={6}>
                            <h4>Quick Links</h4>
                            <Grid container spacing={1}>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <Button
                                        disableElevation={true}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        startIcon={<AddIcon className="quick-action-links" />}
                                        size="small"
                                    >

                                        <Link key="quickLinkSalesQuote" to="#" className="quick-action-links">Sales Quote</Link>

                                    </Button>
                                    <Button
                                        disableElevation={true}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        startIcon={<AddIcon className="quick-action-links" />}
                                        size="small"
                                    >
                                        <Link key="quickLinkSalesOrder" to="#" className="quick-action-links">Sales Order</Link>
                                    </Button>
                                    <Button
                                        disableElevation={true}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        startIcon={<AddIcon className="quick-action-links" />}
                                        size="small"
                                    >
                                        <Link key="quickLinkSalesInvoice" to="#" className="quick-action-links">Sales Invoice</Link>
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <Button
                                        disableElevation={true}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        startIcon={<AddIcon className="quick-action-links" />}
                                        size="small"

                                    >

                                        <Link key="quickLinkPurchaseQuote" to="#" className="quick-action-links">Purchase Quote</Link>

                                    </Button>
                                    <Button
                                        disableElevation={true}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        startIcon={<AddIcon className="quick-action-links" />}
                                        size="small"
                                    >

                                        <Link key="quickLinkPurchaseOrder" to="#" className="quick-action-links">Purchase Order</Link>
                                    </Button>
                                    <Button
                                        disableElevation={true}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        startIcon={<AddIcon className="quick-action-links" />}
                                        size="small"
                                    >
                                        <Link key="quickLinkPurchaseInvoice" to="#" className="quick-action-links">Purchase Invoice</Link>
                                    </Button>
                                </Grid>
                                <Grid item xs={12} sm={12} md={6} lg={4}>
                                    <Button
                                        disableElevation={true}
                                        disableFocusRipple={true}
                                        disableRipple={true}
                                        startIcon={<AddIcon className="quick-action-links" />}
                                        size="small"
                                    >
                                        <Link key="quickLinkReports" to="#" className="quick-action-links">Reports</Link>
                                    </Button>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            <div style={{ height: 20 }}></div>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
export default quickactionsection;