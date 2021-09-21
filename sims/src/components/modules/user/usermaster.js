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
import Divider from '@material-ui/core/Divider';
import Switch from '@mui/material/Switch';

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
import Userbranchalot from '../branch/userbranchalot';


class usermaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: false,
            initialCss: "",
            users: [],
            userId:0,
            passData:[]

        }
    }

    componentDidMount() {
        this.getUsersList();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
        });
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
                
                let passData={
                    userId:this.state.userId,
                    branches:data,
                    userBranches:this.getUserBranches(this.state.userId) 
                };
                this.setState({ 
                    branchData: data, 
                    passData:passData,
                    ProgressLoader: true });
            }
            ).catch(error => {
                //console.log("error > ", error);
                this.setState({ branchData: [], ProgressLoader: true });
            });
    }

    getUserBranches(userId) {
        console.log("getUserBranches > ",userId);
        let userBranches=[];
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let data={
            ValidUser:ValidUser,
            UserID: userId ,
            userBranchMappingList:null
        }
        let GetUserBranchMappedByUserIDUrl = APIURLS.APIURL.GetUserBranchMappedByUserID;

        axios.post(GetUserBranchMappedByUserIDUrl, data, { headers })
            .then(response => {
                console.log("getUserBranches > response.data > ",response.data);
                let data = response.data;
                
                this.processData(data.userBranchMappingList,userId);
                
            }
            ).catch(error => {
                
            });
            return userBranches;
    }

    processData(data,userId){
        let company = [];
        for (let i = 0; i < data.length; i++) {
            let c = {
                companyID: data[i].companyID,
                companyName: data[i].companyName,
                branch:[],
            };
            company.push(c);
        }
        console.log("processData > company > ",company);
        let uniqueCompany=[];
        company.map(x => uniqueCompany.filter(a => a.companyID === x.companyID && a.companyName === x.companyName).length > 0 ? null : uniqueCompany.push(x));
        console.log("processData > uniqueCompany > ",uniqueCompany);

        let branches=[];
        for (let i = 0; i < uniqueCompany.length; i++) {
             let branch=uniqueCompany[i].branch;
            for (let j = 0; j < data.length; j++) {
                // console.log("uniqueCompany[i] > ",uniqueCompany[i]);
                // console.log("uniqueCompany[i] > ",uniqueCompany[i]);
                if(uniqueCompany[i].companyID=== data[j].companyID){
                    let b = {
                        branchID: data[j].branchID,
                        branchName: data[j].branchName,
                        mark:data[j].mark,
                        shortName:data[j].shortName
                    };
                    branch.push(b);
                }
            }
            uniqueCompany[i].branch=branch;             
        }
        console.log("-------> FINAL processData > uniqueCompany > ",uniqueCompany);
        let passData={
            userId:userId,
            companyBranch:uniqueCompany
        };

        this.setState({ passData: passData });
    }

    getUsersList() {
        this.setState({ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let GetUsersUrl = APIURLS.APIURL.GetUsers;

        axios.post(GetUsersUrl, ValidUser, { headers })
            .then(response => {
                let data = response.data;
              console.log("getUsersList > response > data > ", data);
                this.setState({ 
                    users: data,                     
                    ProgressLoader: true 
                });
            }
            ).catch(error => {
                console.log("error > ", error);
            });


    }




    render() {
        const handleRowClick = (e, item, id) => {
            this.setState({ passData: [] });
           console.log("handleRowClick > item > ",item);
            this.setState({userId:item.userId});
            removeIsSelectedRowClasses();
            this.getUserBranches(item.userId);
            document.getElementById(id).classList.add('selectedRow');
        }

        const removeIsSelectedRowClasses = () => {
            for (let i = 0; i < this.state.users.length; i++) {
                document.getElementById('row_' + i).className = '';
            }
        }

        const changeUserStatus=(item,val)=>{
            console.log("==================================");
            console.log("item > ",item);
            console.log("val > ",val);
            let users=this.state.users;
            let index=users.indexOf(item);
            console.log("index > ",index);
            let user=users[index];
            user.isActive=val;
            users[index]=user;
            console.log("New users > ",users);
            this.setState({users:users});
            console.log("==================================");
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

                {this.state.ProgressLoader === false ? (<div style={{ marginTop: -8, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

                <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
                    <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
                </Snackbar>

                <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
                    <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
                </Snackbar>

                <div style={{ marginLeft: 10, marginTop: 10 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                                    Back
                                </Link>
                                <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                    Dashboard
                                </Link>
                                <Typography color="textPrimary">User master</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 5 }}
                                startIcon={<AddIcon />}
                            >
                                <a className="button-link" href={URLS.URLS.addUser + this.state.urlparams}>
                                    New
                                </a>
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={8} lg={8}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={10} lg={10}>
                                    <Table stickyHeader size="small" className="" aria-label="Country List table">
                                        <TableHead className="table-header-background">
                                            <TableRow>
                                                <TableCell className="table-header-font">#</TableCell>
                                                <TableCell className="table-header-font" align="left">Email Id</TableCell>
                                                <TableCell className="table-header-font" align="left">First Name</TableCell>
                                                { /*
                                                <TableCell className="table-header-font" align="left">Last Name</TableCell>
                                                */}
                                                <TableCell className="table-header-font" align="left">Login Id</TableCell>
                                                {/*
                                                <TableCell className="table-header-font" align="left">isAdmin</TableCell>
                                                */}
                                                <TableCell className="table-header-font" align="left">Status</TableCell>
                                             
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="tableBody">
                                        
                                            {this.state.users.map((item, i) => (
                                                <TableRow
                                                    id={"row_" + i}
                                                    className={this.state.initialCss}
                                                    hover
                                                    key={i}
                                                    onClick={(event) => handleRowClick(event, item, "row_" + i)}
                                                >
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editUser + this.state.urlparams+"&userId="+item.userId} >
                                                            U{item.userId}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editUser + this.state.urlparams+"&userId="+item.userId} >
                                                            {item.emailId}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        {item.firstName}
                                                    </TableCell>
                                                    {/*
                                                    <TableCell align="left">
                                                        {item.lastName}
                                                    </TableCell>
                                                    */}
                                                    <TableCell align="left">
                                                        {item.loginId}
                                                    </TableCell>
                                                    {/*
                                                    <TableCell align="left">

                                                        {item.isAdmin?item.isAdmin===true?"True":"False":"-"}
                                                    </TableCell>
                                                */}
                                                
                                                    <TableCell align="left">
                                                        {item.isActive===true?(
                                                            <span style={{color:'green'}}>Active</span> // <Switch defaultChecked size="small" onChange={(e)=>changeUserStatus(item,false)}/>
                                                        ):(
                                                            <span style={{color:'red'}}>In-Active</span> // <Switch size="small" onChange={(e)=>changeUserStatus(item,true)}/>
                                                        )}
                                                    </TableCell>
                                                    

                                                </TableRow>

                                            ))}
                                        </TableBody>
                                    </Table>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={12} md={4} lg={4}>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} md={12} lg={12}>
                                     <Userbranchalot data={
                                        this.state.passData                                         
                                        }/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>


            </Fragment>
        )
    }

}
export default usermaster;