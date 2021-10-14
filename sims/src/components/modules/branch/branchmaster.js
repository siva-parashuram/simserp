import React, { Fragment } from 'react';
import Header from "../../user/userheaderconstants";
 


import '../../user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
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
import Divider from '@material-ui/core/Divider';

import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import BranchQuickDetails from "./branchquickdetails";



class branchMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoggedIn: false,
            ProgressLoader: false,
            urlparams: null,
            branchData: [],
            ErrorPrompt: false,
            SuccessPrompt: false,
            branchItem:{},
            editUrl:null,
        };
    }

    componentDidMount() {
        if (
            getCookie(COOKIE.USERID) != null
        ) {

            this.setState({ isLoggedIn: true });
            var url = new URL(window.location.href);
            let branchId = url.searchParams.get("branchId");
            let branchName = url.searchParams.get("branchName");
            let compName = url.searchParams.get("compName");
            let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
            this.setState({
                urlparams: urlparams
            }, () => {
                this.getBranches();
            });
        } else {
            this.setState({ isLoggedIn: false });
        }


    }


    getBranches() {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let GetBrachesUrl = APIURLS.APIURL.GetBraches;

        axios.post(GetBrachesUrl, ValidUser, { headers })
            .then(response => {
                let data = response.data;
                console.log("getBranches > response > data > ", data);
                this.setState({ branchData: data, ProgressLoader: true },()=>{
                    if(this.state.branchData.length>0){
                        this.InitialhandleRowClick(null,data[0],"row_0");
                    }
                    
                });
            }
            ).catch(error => {
                console.log("error > ", error);
                this.setState({ branchData: [], ProgressLoader: true });
            });

    }

    InitialhandleRowClick (e, item, id){
        console.log("handleRowClick > id > ",id);
        console.log("handleRowClick > vitem > ",item);
        let editUrl=URLS.URLS.editBranch+this.state.urlparams + "&editbranchId=" + item.branchId;
        this.setState({branchItem:item,editUrl:editUrl});
        this.InitialremoveIsSelectedRowClasses();
        document.getElementById(id).classList.add('selectedRow');
    }

    InitialremoveIsSelectedRowClasses(){
        for (let i = 0; i < this.state.branchData.length; i++) {
            document.getElementById('row_' + i).className = '';
        }
    }

    render() {

        const handleRowClick = (e, item, id) => {
            console.log("handleRowClick > id > ",id);
            console.log("handleRowClick > vitem > ",item);
            let editUrl=URLS.URLS.editBranch+this.state.urlparams + "&editbranchId=" + item.branchId;
            this.setState({branchItem:item,editUrl:editUrl});
            removeIsSelectedRowClasses();
            document.getElementById(id).classList.add('selectedRow');
        }

        const removeIsSelectedRowClasses = () => {
            for (let i = 0; i < this.state.branchData.length; i++) {
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
                <Header/>
                {this.state.ProgressLoader === false ? (<div style={{ marginTop: 5, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

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
                                <Typography color="textPrimary">Branch master</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <div className="breadcrumb-bottom"></div>
                    {/*
                    <Grid container spacing={0}>
                        <Grid className="style-all-Links" xs={1}>                           
                         <Link className="style-link" href={URLS.URLS.addBranch + this.state.urlparams}>NEW</Link>
                        </Grid>
                    </Grid>
                    */}
                    <div className="New-link-bottom"></div>
                    <Grid className="table-adjust" container spacing={0}>
                        <Grid   xs={12} sm={12} md={7} lg={7}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>
                                    <Table stickyHeader size="small" className="" aria-label="Country List table">
                                        <TableHead className="table-header-background">
                                            <TableRow>
                                                <TableCell className="table-header-font">#</TableCell>
                                                <TableCell className="table-header-font" align="left">Branch Name</TableCell>
                                                <TableCell className="table-header-font" align="left">Company</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="tableBody">
                                            {this.state.branchData.map((item, i) => (
                                                <TableRow
                                                    id={"row_" + i}
                                                    className={this.state.initialCss}
                                                    hover
                                                    key={i}
                                                    onClick={(event) => handleRowClick(event, item, "row_" + i)}
                                                >
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editBranch + this.state.urlparams + "&editbranchId=" + item.branchId} >
                                                            {URLS.PREFIX.branchId + item.branchId}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    {item.name}
                                                    </TableCell>
                                                    <TableCell align="left">

                                                        {item.company ? item.company.companyName ? item.company.companyName : "-" : "-"}
                                                    </TableCell>

                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={12} md={5} lg={5}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>
                                    {this.state.branchItem && Object.keys(this.state.branchItem).length === 0 && Object.getPrototypeOf(this.state.branchItem) === Object.prototype ?null:(
                                        <Fragment>
                                             <BranchQuickDetails new={URLS.URLS.addBranch + this.state.urlparams} edit={this.state.editUrl} branchItem={this.state.branchItem}/>
                                             
                                        </Fragment>
                                       
                                    )}
                                   
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>



                </div>

            </Fragment>
        );
    }


}
export default branchMaster;