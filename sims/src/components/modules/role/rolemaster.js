import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as Customfunctions from "../../../services/functions/customfunctions";
 

import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import Assignpagestorole from './assignpagestorole';



let rows = [


];

class rolemaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: true,
            roles: [],
            roleId: 0,
            pages: rows
        };
    }

    componentDidMount() {
        this.getRoles();

        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");

        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,

        });
    }

     



    getRoles() {
        this.setState({ ProgressLoader: false });
        
 
        let rows = [];
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let GetRolesUrl = APIURLS.APIURL.GetRoles;  

        axios.post(GetRolesUrl, ValidUser, { headers })
            .then(response => {
                console.log("getRoles > response > ", response);
                if (response.status === 200) {
                    let data = response.data;
                    rows = data;
                    this.setState({ roles: rows, ProgressLoader: true });
                } else {

                }
            }
            ).catch(error => {
                console.log("getRoles > error > ", error);
                this.setState({ roles: [], ProgressLoader: true });
            });
          

    }

    render() {

        const handleRowClick = (e, item, id) => {
            console.log("id > ", id);
            console.log("item > ", item);
            this.setState({ roleId: item.roleId }, () => {
                getPageListByRoleId(item.roleId);
            });

            removeIsSelectedRowClasses();
            document.getElementById(id).classList.add('selectedRow');
        }

        const getPageListByRoleId = (roleId) => {
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const headers = {
                "Content-Type": "application/json"
            };
            let data = APIURLS.GetRoleDetailByRoleIdData;
                data.validUser=ValidUser;
                data.RoleId=roleId;          

            let GetRoleDetailByRoleIdUrl = APIURLS.APIURL.GetRoleDetailByRoleId;
            axios.post(GetRoleDetailByRoleIdUrl, data, { headers })
                .then(response => {
                    console.log("getPageListByRoleId > response > ", response);
                    if (response.status === 200) {
                        processPageData(response.data.roleDetailLists)
                    } else {

                    }
                }
                ).catch(error => {
                    console.log("getRoles > error > ", error);
                    this.setState({ pages: [], ProgressLoader: true });
                });
        }

        const processPageData = (data) => {
            console.log("processPageData > ", data);
            let rows = [];
            var i = 0, len = data.length;
            while (i < len) {
                let chkAll= true;
                if (
                    data[i].isCreate === true &&
                    data[i].isDelete === true &&
                    data[i].isPrint === true &&
                    data[i].isUpdate === true &&
                    data[i].isView === true
                ) {
                    chkAll= true;
                }else{
                    chkAll= false;
                }
                let row = {
                    id: data[i].pageId,
                    pageId: data[i].pageId,
                    pageName: data[i].pageName,
                    pageLink: data[i].pageLink,
                    moduleId: data[i].moduleID,
                    moduleName: data[i].name,
                    chkAll: chkAll,
                    IsCreate: data[i].isCreate,
                    IsUpdate: data[i].isUpdate,
                    IsDelete: data[i].isDelete,
                    IsView: data[i].isView,
                    IsPrint: data[i].isPrint,
                    isChecked: data[i].isChecked
                };
                rows.push(row);
                i++
            }
            this.setState({ pages: rows });

        }

        const removeIsSelectedRowClasses = () => {
            for (let i = 0; i < this.state.roles.length; i++) {
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

                {this.state.ProgressLoader === false ? (<div style={{ marginTop: -5, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

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
                                <Typography color="textPrimary">Role master</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 6 }}
                            >
                                <a className="button-link" href={URLS.URLS.addRole + this.state.urlparams}>
                                    New
                                </a>
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={2} lg={2}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>
                                    <Table stickyHeader size="small" className="" aria-label="Role List table">
                                        <TableHead className="table-header-background">
                                            <TableRow>
                                                <TableCell className="table-header-font">#</TableCell>
                                                <TableCell className="table-header-font" align="left">Role Name</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="tableBody">
                                            {this.state.roles ? this.state.roles.map((item, i) => (
                                                <TableRow
                                                    id={"row_" + i}
                                                    className={this.state.initialCss}
                                                    hover
                                                    key={i}
                                                    onClick={(event) => handleRowClick(event, item, "row_" + i)}
                                                >
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editModule + this.state.urlparams + "&roleID=" + item.moduleId} >
                                                            {URLS.PREFIX.roleID + item.roleId}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editModule + this.state.urlparams + "&roleID=" + item.moduleId} >
                                                            {item.name}
                                                        </a>
                                                    </TableCell>
                                                </TableRow>
                                            )) : null}
                                        </TableBody>
                                    </Table>

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={12} md={10} lg={10}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={12} lg={12}>
                                    <Grid container spacing={0}>
                                        <Grid xs={12} sm={12} md={11} lg={11}>
                                            <Assignpagestorole data={{
                                                roleId: this.state.roleId,
                                                rows: this.state.pages
                                            }} />
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>

                    </Grid>

                </div>
            </Fragment>
        )
    }

}
export default rolemaster;