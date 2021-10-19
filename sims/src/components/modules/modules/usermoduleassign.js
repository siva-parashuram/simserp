import '../../user/dasboard.css';
import React, { Fragment } from 'react';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid'; 
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LinearProgress from '@material-ui/core/LinearProgress';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

let columns = [
    {
        field: 'moduleId',
        headerName: '#',
        width: 100,
        headerClassName: 'table-header-font'

    },
    {
        field: 'name',
        headerName: 'Module Name',
        width: 250,
        editable: true,
        headerClassName: 'table-header-font'

    }
];

class usermoduleassign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            userId: 0,
            ProgressLoader: false,
            ErrorPrompt: false,
            SuccessPrompt: false,
            initialCss: "",
            roles: [],
            columns: columns,
            rowsPerPageOptions: 5,
            pageSize: 100,
            ModuleRoleList: [],
            branchId: 0,
            selectedList:[],
            roleId:0,
            UserAllotedRoleByBranch:0,
        }
    }
    componentDidMount() {
        this.getRoles();
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
        const insitiateState = (userId) => {
            this.setState({ userId: userId });
        }

        const dropdownChange = (e) => {            
            getPageListByRoleId(e);
        }

        const getPageListByRoleId = (roleId) => {
            this.setState({  ProgressLoader: false,roleId:roleId });
            let branchId = document.querySelector("#branchList option:checked").value;
            console.log("getPageListByRoleId > branchId > ", branchId);
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const headers = {
                "Content-Type": "application/json"
            };
            // let userPermissionLists = APIURLS.userPermissionLists;
            // userPermissionLists.UserId = this.props.data.userId;
            // userPermissionLists.RoleId = parseInt(roleId);
            // let data = APIURLS.GetAllUserPermissionData;
            // data.validUser = ValidUser;
            // data.BranchId =parseInt(branchId);
            // data.UserId = this.props.data.userId;

            // let data={
            //     validUser:ValidUser,
            //     BranchId: parseInt(branchId),
            //     UserId:parseInt(this.props.data.userId),
            //     userPermissionLists:[]
            // };  

            let data = APIURLS.GetRoleDetailByRoleIdData;
            data.validUser=ValidUser;
            data.RoleId=parseInt(roleId);    
             
            let GetRoleDetailByRoleIdUrl = APIURLS.APIURL.GetRoleDetailByRoleId;
            // let Url=APIURLS.APIURL.GetUserPermissionByUserIDAndBranchID;
            axios.post(GetRoleDetailByRoleIdUrl, data, { headers })
                .then(response => {
                    console.log("getPageListByRoleId > response > ", response);
                    processData(response.data.roleDetailLists);
                    
                }
                ).catch(error => {
                    console.log("getRoles > error > ", error);
                    this.setState({ ModuleRoleList: [], ProgressLoader: true });
                });
        }

        const processData=(userPermissionLists)=>{
            let feUserPermissionLists=[];
            for(let i=0;i<userPermissionLists.length;i++){
                //  if(userPermissionLists[i].isChecked===true){
                //     feUserPermissionLists.push(userPermissionLists[i]);
                //  }     
                 feUserPermissionLists.push(userPermissionLists[i]);                        
              
            }
            this.setState({ ModuleRoleListMst:userPermissionLists,ModuleRoleList: feUserPermissionLists, ProgressLoader: true });
        }

        const checkBoxClicked=(param,type,bool)=>{            

            if(type==='All'){
                let ModuleRoleList=this.state.ModuleRoleList;
                for(let i=0;i<ModuleRoleList.length;i++){
                    ModuleRoleList[i].isChecked=bool;
                }
                this.setState({ModuleRoleList:ModuleRoleList});
            }else{
                 let ModuleRoleList=this.state.ModuleRoleList;
                 for(let i=0;i<ModuleRoleList.length;i++){
                     if(ModuleRoleList[i].pageId===param.pageId){
                        ModuleRoleList[i].isChecked=bool;
                     }
                 }
                 this.setState({ModuleRoleList:ModuleRoleList});
            }

        }

        const processUpdateData =(userId)=>{
            let branchId = document.querySelector("#branchList option:checked").value;
            let userPermissionLists=[];
            let ModuleRoleList=this.state.ModuleRoleList;
            for(let i=0;i<ModuleRoleList.length;i++){
                if(ModuleRoleList[i].isChecked===true){
                    let obj={
                        "userId": userId,
                        "roleId": parseInt(this.state.roleId),
                        "pageId": ModuleRoleList[i].pageId,
                        "branchId": parseInt(branchId),
                        "isCreate": ModuleRoleList[i].isCreate,
                        "isUpdate": ModuleRoleList[i].isUpdate,
                        "isDelete": ModuleRoleList[i].isDelete,
                        "isView": ModuleRoleList[i].isView,
                        "isPrint": ModuleRoleList[i].isPrint,
                        "creationDate": null,
                        "moduleID": ModuleRoleList[i].moduleID,
                        "name": ModuleRoleList[i].name,
                        "pageName": ModuleRoleList[i].pageName,
                        "pageLink": ModuleRoleList[i].pageLink,
                        "isChecked": ModuleRoleList[i].isChecked               
                      };
                      userPermissionLists.push(obj);
                }
               
            }
            

              return userPermissionLists;
        }



        const handleUpdate = (userId) => {
            this.setState({ ProgressLoader: false });
            let branchId = document.querySelector("#branchList option:checked").value;
             let userPermissionLists=processUpdateData(userId);
             let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const headers = {
                "Content-Type": "application/json"
            };
            let data={
                validUser:ValidUser,
                BranchId:parseInt(branchId),
                UserId:parseInt(userId), 
                userPermissionLists:userPermissionLists
            };
            let URL=APIURLS.APIURL.CreateUserPermission; 
            axios.post(URL, data, { headers })
                .then(response => {
                    console.log("handleUpdate > response > ", response);
                    console.log("handleUpdate > response.status > ", response.status);
                    if(response.status===200 || response.status===201){
                        this.setState({ ProgressLoader: true,SuccessPrompt:true });          
                    }else{
                        this.setState({ ProgressLoader: true,ErrorPrompt:true });     
                    }
                          
                }
                ).catch(error => {
                    console.log("getRoles > error > ", error);
                    this.setState({ ProgressLoader: true,ErrorPrompt:true });      
                });
                

        }

        const selectBranchDropdown=(e,userId)=>{
            this.setState({ branchId: e.target.value }, () => {
                let ValidUser = APIURLS.ValidUser;
                ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
                ValidUser.Token = getCookie(COOKIE.TOKEN);
                const headers = {
                    "Content-Type": "application/json"
                };
                let data={
                    validUser:ValidUser,
                    BranchId:parseInt(e.target.value),
                    UserId:parseInt(userId)
                };
                let URL=APIURLS.APIURL.GetUserPermissionByRoleId; 
                axios.post(URL, data, { headers })
                .then(response => {
                    console.log("selectBranchDropdown > response.data > ", response.data);     
                    this.setState({UserAllotedRoleByBranch:response.data},()=>{
                        if(response.data===0){
                            this.setState({ ModuleRoleList: [], ProgressLoader: true });
                        }else{
                            dropdownChange(response.data);
                        }
                        
                    }); 
                }
                ).catch(error => {
                    console.log("selectBranchDropdown > error > ", error);
                         
                });

            })
        }

        const closeErrorPrompt = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({ ErrorPrompt: false });
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
                {console.log("-------------> this.props.data > ", this.props.data)}
                {this.state.ProgressLoader === false ? (<div style={{ marginTop: -8, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

                <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
                    <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
                </Snackbar>

                <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
                    <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
                </Snackbar>

                {this.props.data.userId ? (
                    <Fragment>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={12} lg={12}>
                                <div>
                                    <Grid container spacing={0}>
                                        <Grid xs={12} sm={12} md={11} lg={11}>
                                            <table>
                                                <tr>
                                                    <td><b>Select Branch</b></td>
                                                    <td>&nbsp;</td>
                                                    <td>
                                                        <select
                                                            className="dropdown-css"
                                                            id="branchList"
                                                            onChange={(e) => selectBranchDropdown(e,this.props.data.userId)}

                                                           

                                                        >
                                                        <option value="0" disabled selected>-Choose-</option>
                                                            {this.props.data.List.map((item, i) => (
                                                               item.mark===1?(
                                                                <option value={item.branchID}>{item.branchName}-({item.companyName})</option>
                                                               ):(
                                                                null
                                                               ) 
                                                            ))}
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td><b>Select Role</b></td>
                                                    <td>&nbsp;</td>
                                                    <td>
                                                        <select
                                                            className="dropdown-css"
                                                            id="roleList"
                                                            onChange={(e) => dropdownChange(e.target.value)}
                                                            value={this.state.UserAllotedRoleByBranch}
                                                        >
                                                            <option value="0" disabled >-Choose-</option>
                                                            {this.props.data.List.length>0?this.state.roles.map((item, i) => (
                                                                <option value={item.roleId}>{item.name}</option>
                                                            )):null}
                                                             
                                                        </select>
                                                    </td>
                                                </tr>
                                            </table>
                                        </Grid>
                                    </Grid>
                                    <div style={{ height: 15 }}></div>
                                    <Grid container spacing={3}>
                                        <Grid xs={12} sm={12} md={3} lg={3}>
                                            <Button
                                                style={{ marginLeft: 10 }}
                                                disabled={this.state.updateBtnDisable}
                                                onClick={(e)=>handleUpdate(this.props.data.userId)}
                                            >
                                                Assign
                                            </Button>
                                        </Grid>
                                    </Grid>
                                    <div style={{ height: 15 }}></div>
                                    <Grid container spacing={0}>
                                        <Grid xs={12} sm={12} md={12} lg={12}>
                                            <div style={{ height: 300, width: '90%', overflowY: 'scroll', overflowX: 'hidden' }}>
                                                <Table stickyHeader size="small" className="" aria-label="List table">
                                                    <TableHead className="table-header-background">
                                                        <TableRow>
                                                            <TableCell className="table-header-font">
                                                                <input
                                                                    type="checkbox"
                                                                    id="selectAllList"
                                                                    className="checkbox-css"
                                                                    onClick={(e)=>checkBoxClicked({},'All',e.target.checked)}
                                                                />
                                                            </TableCell>

                                                            <TableCell className="table-header-font" align="left">Module Name</TableCell>
                                                            <TableCell className="table-header-font" align="left">Page Name</TableCell>
                                                        </TableRow>
                                                        {
                                                            this.state.ModuleRoleList ? this.state.ModuleRoleList.map((item, i) => (
                                                                <TableRow>
                                                                
                                                                    <TableCell align="left">
                                                                
                                                                    {item.isChecked===true?(
                                                                        <input
                                                                        type="checkbox"
                                                                        id={"role_" + item.roleId}
                                                                        className="checkbox-css"
                                                                        onClick={(e)=>checkBoxClicked(item,'individual',false)}
                                                                        checked={true}
                                                                    />
                                                                    ):(
                                                                        <input
                                                                        type="checkbox"
                                                                        id={"role_" + item.roleId}
                                                                        className="checkbox-css"
                                                                        onClick={(e)=>checkBoxClicked(item,'individual',true)}
                                                                        checked={false}
                                                                    />
                                                                    )}                                                                       
                                                                         
                                                                    </TableCell>
                                                                    <TableCell align="left">{item.name}</TableCell>
                                                                    <TableCell align="left">{item.pageName}</TableCell>
                                                                </TableRow>
                                                            )) : null
                                                        }
                                                    </TableHead>
                                                </Table>

                                            </div>
                                        </Grid>
                                    </Grid>
                                </div>
                            </Grid>
                        </Grid>
                    </Fragment>
                ) : 'Nothing Selected.'}


            </Fragment>
        )
    }

}
export default usermoduleassign;