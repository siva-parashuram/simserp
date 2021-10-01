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
            initialCss: "",
            roles: [],
            columns: columns,
            rowsPerPageOptions: 5,
            pageSize: 100,
            ModuleRoleList: [],
            branchId: 0,
            selectedList:[],
            roleId:0,
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
            console.log("dropdownChange > e.target.value > ", e.target.value);
            getPageListByRoleId(e.target.value);
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

            let data = APIURLS.GetRoleDetailByRoleIdData;
            data.validUser=ValidUser;
            data.RoleId=parseInt(roleId);    
             
            let GetRoleDetailByRoleIdUrl = APIURLS.APIURL.GetRoleDetailByRoleId;
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
                 if(userPermissionLists[i].isChecked===true){
                    feUserPermissionLists.push(userPermissionLists[i]);
                 }                 
              
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
                        "roleId": this.state.roleId,
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
                        "pageLink": ModuleRoleList[i].pageLink               
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
                    this.setState({ ProgressLoader: true });               
                }
                ).catch(error => {
                    console.log("getRoles > error > ", error);
                    this.setState({ ProgressLoader: true });
                });
                

        }

        return (
            <Fragment>
                {console.log("-------------> this.props.data > ", this.props.data)}

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
                                                            onChange={(e) => this.setState({ branchId: e.target.value })}
                                                        >
                                                            {this.props.data.List.map((item, i) => (
                                                                <option value={item.branchID}>{item.branchName}-({item.companyName})</option>
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
                                                            onChange={(e) => dropdownChange(e)}
                                                        >
                                                            <option value="-" disabled selected>-Choose-</option>
                                                            {this.state.roles.map((item, i) => (
                                                                <option value={item.roleId}>{item.name}</option>
                                                            ))}

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
                                                                {console.log("-----------------> item > ",item)}
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
                ) : 'Please select User to proceed'}


            </Fragment>
        )
    }

}
export default usermoduleassign;