import React, { Fragment } from 'react';
import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';

import Addpage from "./addpage";

class modulemasters extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: false,
            modules:[],
            moduleId:null,
            pageLinkRow:[]
        };

    }

    componentDidMount() {
        
        this.getModules();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");

        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,

        });
    }


    getModules(){
        let rows = [];
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let GetModulesUrl = APIURLS.APIURL.GetModules;

        axios.post(GetModulesUrl, ValidUser, { headers })
            .then(response => {
                console.log("getModules > response > ", response);
                if(response.status===200){
                    let data = response.data;
                    rows = data;
                    this.setState({ modules: rows, ProgressLoader: true });
                }else{
                    
                }
               
            }
            ).catch(error => {
                console.log("getModules > error > ", error);
                this.setState({ modules: [], ProgressLoader: true });
            });
    }


    render() {

        const handleRowClick = (e, item, id) => {
            console.log("id > ",id);
            console.log("item > ",item);
            this.setState({moduleId:item.moduleId});
            getPageList(item.moduleId);
            
            removeIsSelectedRowClasses();            
            document.getElementById(id).classList.add('selectedRow');
        }

        const removeIsSelectedRowClasses = () => {
            for (let i = 0; i < this.state.modules.length; i++) {
                document.getElementById('row_' + i).className = '';
            }
        }

        const getPageList=(moduleId)=>{
        
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const data = {
                "validUser": ValidUser,
                "page": {
                    PageId: 0,
                    ModuleId: moduleId,
                    PageName: null,
                    PageLink: null,
                    Description: null,
                }
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let GetPageByModuleIdUrl = APIURLS.APIURL.GetPageByModuleId;
    
            axios.post(GetPageByModuleIdUrl, data, { headers })
                .then(response => {
                    if(response.status===200){
                        let data = response.data;
                        resetDataList(data);
                                     
                    }else{
                        
                    }
                   
                }
                ).catch(error => {
                    console.log("getPageList > error > ", error);
                });
        }

        const resetDataList = (data) => {
            let rows = [];
            for (let i = 0; i < data.length; i++) {
                let r = {
                    id:data[i].pageId,
                    moduleId:data[i].moduleId,
                    pageId: "PL"+data[i].pageId,
                    pageName: data[i].pageName,
                    pageLink: data[i].pageLink,
                    description: data[i].description
                };
                rows.push(r);
            }
            console.log("rows > ",rows);
            this.setState({ pageLinkRow: rows });
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

                <div sclassName='breadcrumb-height'>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Breadcrumbs className='style-breadcrumb' aria-label="breadcrumb">
                                <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                                    Back
                                </Link>
                                <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                    Dashboard
                                </Link>
                                <Typography color="textPrimary">Module master</Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <div className="breadcrumb-bottom"></div>
                    <Grid container spacing={0}>
                    <Grid className="style-all-Links"  xs={1}>
                            <Link className="style-link" href={URLS.URLS.addModule + this.state.urlparams}>NEW</Link>
                            {/* <Button
                                style={{ marginLeft: 5 }}
                                startIcon={<AddIcon />}
                            >
                                <a className="button-link" href={URLS.URLS.addModule + this.state.urlparams}>
                                    New
                                </a>
                            </Button> */}
                        </Grid>
                    </Grid>
                    <div className="New-link-bottom"></div> 
                    <Grid className="table-adjust" container spacing={0}>
                        <Grid xs={12} sm={12} md={4} lg={4}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={10} lg={10}>
                                    <Table stickyHeader size="small" className="" aria-label="Country List table">
                                        <TableHead className="table-header-background">
                                            <TableRow>
                                                <TableCell className="table-header-font">#</TableCell>                                                
                                                <TableCell className="table-header-font" align="left">Module Name</TableCell>
                                                <TableCell className="table-header-font" align="left">Module Description</TableCell>
                                             
                                            </TableRow>
                                        </TableHead>
                                        <TableBody className="tableBody">
                                        
                                            {this.state.modules?this.state.modules.map((item, i) => (
                                                <TableRow
                                                    id={"row_" + i}
                                                    className={this.state.initialCss}
                                                    hover
                                                    key={i}
                                                    onClick={(event) => handleRowClick(event, item, "row_" + i)}
                                                >
                                                    <TableCell align="left">
                                                        <a className="LINK tableLink" href={URLS.URLS.editModule + this.state.urlparams+"&moduleId="+item.moduleId} >
                                                            {URLS.PREFIX.moduleID+item.moduleId}
                                                        </a>
                                                    </TableCell>
                                                    <TableCell align="left">
                                                    {item.name}
                                                    </TableCell>
                                                    <TableCell align="left">{item.description}</TableCell>
                                                </TableRow>

                                            )):null}
                                        </TableBody>
                                    </Table> 

                                </Grid>
                            </Grid>
                        </Grid>
                        <Grid xs={12} sm={12} md={8} lg={8}>
                            <Grid container spacing={1}>
                                <Grid xs={12} sm={12} md={11} lg={11}>                                
                                      <Addpage data={{
                                        moduleId:this.state.moduleId,
                                        rows: this.state.pageLinkRow
                                     }}/>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                
                </div>


            </Fragment>
        )
    }

}
export default modulemasters;