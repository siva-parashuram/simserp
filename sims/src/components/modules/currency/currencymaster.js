import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';


import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";



class currencymaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: true,
            initialCss: "",
            currency: [],

        }
    }

    componentDidMount() {
        this.getList();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
        });
    }

    getList() {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let Url = APIURLS.APIURL.GetCurrencies;

        axios.post(Url, ValidUser, { headers })
            .then(response => {
                let data = response.data;
                console.log("getList > response > data > ", data);
                this.setState({
                    currency: data,
                    ProgressLoader: true
                });
            }
            ).catch(error => {
                console.log("error > ", error);
            });
    }



    render() {

        const handleRowClick = (e, item, id) => {
            console.log("handleRowClick > item > ", item);
            removeIsSelectedRowClasses();
            document.getElementById(id).classList.add('selectedRow');
        }

        const removeIsSelectedRowClasses = () => {
            for (let i = 0; i < this.state.currency.length; i++) {
                document.getElementById('row_' + i).className = '';
            }
        }

        const closeErrorPrompt = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({ SuccessPrompt: false });
        }

        const closeSuccessPrompt = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({ SuccessPrompt: false });
        }

        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

        return (
            <Fragment>
                <Nav />
                <Menubar />

                {this.state.ProgressLoader === false ? (<div style={{ marginTop: 0, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

                <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
                    <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
                </Snackbar>

                <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>  
                    <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
                </Snackbar>

                <div className='breadcrumb-height'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Breadcrumbs className='style-breadcrumb' aria-label="breadcrumb">
                                <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                                    Back
                                </Link>
                                <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                    Dashboard
                                </Link>
                                <Typography color="textPrimary">Currency Master</Typography> 
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <div className="breadcrumb-bottom"></div>
                    <Grid container spacing={0}>
                    <Grid className="style-all-Links"  xs={1}>
                            <Link className="style-link" href={URLS.URLS.addCurrency + this.state.urlparams}>NEW</Link> 

                            {/* <Button
                                style={{ marginLeft: 5 }}
                            >
                                <a className="button-link" href={URLS.URLS.addCurrency + this.state.urlparams}>
                                    New
                                </a>
                            </Button> */}
                        </Grid>
                    </Grid>
                    <div className="New-link-bottom"></div>
                    <Grid className="table-adjust" container spacing={0}>
                        <Grid xs={12} sm={12} md={5} lg={5}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>
                                    <Table stickyHeader size="small" className="" aria-label="Country List table"> 
                                        <TableHead className="table-header-background">
                                            <TableRow>                                           
                                                <TableCell className="table-header-font">#</TableCell>
                                                <TableCell className="table-header-font" align="left">Code</TableCell>
                                                <TableCell className="table-header-font" align="left">Description</TableCell>
                                                <TableCell className="table-header-font" align="left">Symbol</TableCell>
                                                <TableCell className="table-header-font" align="left"> Rounding</TableCell>
                                               
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="tableBody">
                                            {this.state.currency.map((item, i) => (
                                                <TableRow
                                                    id={"row_" + i}
                                                    className={this.state.initialCss}
                                                    hover
                                                    key={i}
                                                    onClick={(event) => handleRowClick(event, item, "row_" + i)}
                                                >
                                                    <TableCell align="left">
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={12} md={7} lg={7}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
export default currencymaster;