import React, { Fragment } from 'react';
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from '@material-ui/core';

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import Dualtabcomponent from '../../compo/dualtabcomponent';



class customerMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProgressLoader: false,
            editBtnDisable: true,
            initialCss: "",
            urlparams: "",
            editUrl: "",
            customerData: []
        }
    }
    componentDidMount() {
        this.getCustomerList();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams =
            "?branchId=" +
            branchId +
            "&compName=" +
            compName +
            "&branchName=" +
            branchName;
        this.setState({ urlparams: urlparams });
    }

    getCustomerList = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetAllCustomer;
        axios
            .post(Url, ValidUser, { headers })
            .then((response) => {
                let data = response.data; 
                this.setState({ customerData: data, ProgressLoader: true },()=>{
                    this.handleRowClick(null, data[0], "row_0");
                });
            })
            .catch((error) => {
                this.setState({ customerData: [], ProgressLoader: true });
            });
    }

    handleRowClick = (e, item, id) => {

        let editUrl =
            URLS.URLS.editCustomer +
            this.state.urlparams +
            "&editCustID=" +
            item.CustID;
        editUrl = editUrl + "&type=edit";
        this.setState({
            CustID: item.CustID,
            editUrl: editUrl,
            editBtnDisable:false,
        });
       
        this.removeIsSelectedRowClasses();
        document.getElementById(id).classList.add("selectedRow");

    };
  
       removeIsSelectedRowClasses = () => {
        for (let i = 0; i < this.state.customerData.length; i++) {
          document.getElementById("row_" + i).className = "";
        }
      };

    render() {

        


        const openPage = (url) => {
            this.setState({ ProgressLoader: false });
            window.location = url;
        };


        const customerList = (
            <Fragment>
                {this.state.customerData.length > 0 ? (
                    <Fragment>
                        <TableContainer style={{ maxHeight: 440 }}>
                            <Table
                                stickyHeader
                                size="small"
                                className=""
                                aria-label="item List table"
                            >
                                <TableHead className="table-header-background">
                                    <TableRow>
                                        <TableCell className="table-header-font">#</TableCell>
                                        <TableCell className="table-header-font" align="left">
                                            Name
                                        </TableCell>
                                        <TableCell className="table-header-font" align="left">
                                            EmailID
                                        </TableCell>
                                        <TableCell className="table-header-font" align="left">
                                            Contact
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="tableBody">
                                    {this.state.customerData.map((item, i) => (
                                        <TableRow
                                            id={"row_" + i}
                                            className={this.state.initialCss}
                                            hover
                                            key={i}
                                            onClick={(event) =>
                                                this.handleRowClick(event, item, "row_" + i)
                                            }
                                        >
                                            <TableCell align="left">
                                                <a className="LINK tableLink" href={URLS.URLS.editItem +
                                                    this.state.urlparams +
                                                    "&editCustID=" +
                                                    item.CustID}>
                                                    {i + 1}
                                                </a>
                                            </TableCell>
                                            <TableCell align="left">
                                                {item.Name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {item.EmailID}
                                            </TableCell>
                                            <TableCell align="left">
                                                {item.ContactPerson}
                                            </TableCell>
                                        </TableRow>
                                    ))}

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Fragment>
                ) : (
                    <Tableskeleton />
                )}
            </Fragment>
        );

        
        const tab1Html = (
            <Fragment>
                <div className="sidenav-fixedheight-scroll">
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                     <div style={{marginTop:5,marginLeft:15}}>
                        <h4 style={{color:'#000000'}}>Customer Sales history</h4>
                    </div>
                    <TableContainer>
                            <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                <TableBody className="tableBody">
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Customer No</TableCell>
                                        <TableCell align="right" className="no-border-table">123456</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 20 }}></div>
                    </Grid>
                </Grid>
                <Grid container spacing={0} style={{ marginLeft: 10,marginRight:10 }}>
                    <Grid item xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                        <Grid container spacing={1} >
                            <Grid item xs={12} sm={12} md={4} lg={4}  >
                                <div key="paymentPendingLink" to="#" className="card-link">
                                    <Card className="dash-activity-card2" raised={false}>
                                        <CardContent>
                                            <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                Ongoing Sales
                                            </Typography>
                                            <Typography>
                                                000
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}  >
                                <div key="paymentPendingLink" to="#" className="card-link">
                                    <Card className="dash-activity-card2" raised={false}>
                                        <CardContent>
                                            <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                Total Sales &nbsp;&nbsp;&nbsp;
                                            </Typography>
                                            <Typography>
                                                0,000
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}  >
                                <div key="paymentPendingLink" to="#" className="card-link">
                                    <Card className="dash-activity-card2" raised={false}>
                                        <CardContent>
                                            <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                PO Raised &nbsp;&nbsp;&nbsp;
                                            </Typography>
                                            <Typography>
                                                0,000
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </div>
                            </Grid>
                             
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 40 }}></div>
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                    <div style={{ marginLeft:30,marginRight:20 }}>
                    <Divider/>
                    </div> 
                    </Grid>
                </Grid>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 20 }}></div>
                    </Grid>
                </Grid>
                
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={10} lg={10} style={{ backgroundColor: '#fff' }} >
                     <div style={{marginTop:5,marginLeft:15}}>
                        <h4 style={{color:'#000000'}}>Statistics</h4>
                    </div>
                    <TableContainer>
                            <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                <TableBody className="tableBody">
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Balance</TableCell>
                                        <TableCell align="right" className="no-border-table">000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table"><span className="inside-table-cell-bold">Sales</span></TableCell>
                                        <TableCell align="right" className="no-border-table"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Balance</TableCell>
                                        <TableCell align="right" className="no-border-table">000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Balance</TableCell>
                                        <TableCell align="right" className="no-border-table">000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Balance</TableCell>
                                        <TableCell align="right" className="no-border-table">000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table"><span className="inside-table-cell-bold">Payments</span></TableCell>
                                        <TableCell align="right" className="no-border-table"></TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Balance</TableCell>
                                        <TableCell align="right" className="no-border-table">000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Balance</TableCell>
                                        <TableCell align="right" className="no-border-table">000</TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell align="left" className="no-border-table">Balance</TableCell>
                                        <TableCell align="right" className="no-border-table">000</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        
                    </Grid>
                </Grid>
                </div>
               
                
               
            </Fragment>
        );

        const sideDataNavigation = (
            <Fragment>
                  <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: '#fff' }}>
                    <Dualtabcomponent
                    tab1name="Details"
                    tab2name="Attachments"
                    tab1Html={tab1Html}
                    tab2Html={null}
                />
                    </Grid>
                </Grid>
                
            </Fragment>
        );


        return (
            <Fragment>
                <Loader ProgressLoader={this.state.ProgressLoader} />

                <div className="breadcrumb-height">
                    <Grid container spacing={1}>
                        <Grid
                            xs={12}
                            sm={12}
                            md={4}
                            lg={4}
                            style={{
                                borderRightStyle: "solid",
                                borderRightColor: "#bdbdbd",
                                borderRightWidth: 1,
                            }}
                        >
                            <div style={{ marginTop: 8 }}>
                                <Breadcrumb
                                    backOnClick={this.props.history.goBack}
                                    linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                                    linkTitle="Dashboard"
                                    typoTitle="Customer Master"
                                    level={1}
                                />
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={8} lg={8}>
                            <div style={{ marginLeft: 10, marginTop: 1 }}>
                                <ButtonGroup
                                    size="small"
                                    variant="text"
                                    aria-label="Action Menu Button group"
                                >
                                    <Button
                                        className="action-btns"
                                        startIcon={<AddIcon />}
                                        onClick={(e) =>
                                            openPage(URLS.URLS.addCustomer + this.state.urlparams + "&type=add")
                                        }
                                    >
                                        {APIURLS.buttonTitle.add}
                                    </Button>
                                    <Button className="action-btns"
                                        startIcon={<EditIcon />}
                                        onClick={(e) =>
                                            openPage(this.state.editUrl)
                                        }
                                        disabled={this.state.editBtnDisable}
                                    >
                                        {APIURLS.buttonTitle.edit}
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="breadcrumb-bottom"></div>
                <Grid className="table-adjust" container spacing={0}>
                    <Grid xs={12} sm={12} md={8} lg={8}>
                        {customerList}
                    </Grid>
                    <Grid xs={12} sm={12} md={4} lg={4}>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={1} lg={1}>
                                &nbsp;
                            </Grid>
                            <Grid xs={12} sm={12} md={11} lg={11}>
                            <Grid container spacing={0}>                            
                            <Grid xs={12} sm={12} md={11} lg={11}>
                                {sideDataNavigation}
                            </Grid>
                        </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }

}
export default customerMaster;

