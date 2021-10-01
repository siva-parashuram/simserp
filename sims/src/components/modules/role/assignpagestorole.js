import '../../user/dasboard.css';
import axios from "axios";
import React, { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
// import * as URLS from "../../../routes/constants";
import * as Customfunctions from "../../../services/functions/customfunctions";
import * as Tablecolumns from "../../../services/functions/tablecolumns";



let columns=Tablecolumns.roleMasterDetail;

class assignpagestorole extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: true,
            columns: columns,
            PropsRows: [],
            SelectedRows: [],
            isRowSelected: false,
            previousRowSelected: 0,
            pageName: null,
            pageLink: null,
            description: null,

            updateBtnDisable: false,
            refreshPageLinkList: false,
            modules: [],
            rowsPerPageOptions: 5,
            pageSize: 100,
            allRowsChecked:false,

        };
    }

    componentDidMount() {
        this.getColumns();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");

        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
        });
    }

    getColumns() {
        //let columns=Tablecolumns.roleMasterDetail;
        let columns=[
           /* {
                field: 'moduleId',
                headerName: '#',
                width: 70,
                headerClassName: 'table-header-font ',
                sortable: false,
                renderHeader:()=>(
                  this.state.allRowsChecked===true?(
                    <input 
                    type="checkbox"
                    id="chkAllRows"
                    className="checkbox-css"
                    onClick={(e)=>this.processSelectedRow(e,'All',false)}
                    checked={true}
                    />
                  ):(
                    <input 
                    type="checkbox"
                    id="chkAllRows"
                    className="checkbox-css"
                    onClick={(e)=>this.processSelectedRow(e,'All',true)}
                    checked={false}
                    />
                  )   
                ),
                renderCell: (params) => (
                    <Fragment>
                     
                    
                    </Fragment>
                )
                
            },*/
            {
                field: 'moduleName',
                headerName: 'Module',
                width: 160,
                headerClassName: 'table-header-font',
                
            }
            ,
        
            {
                field: 'pageName',
                headerName: 'Page Name',
                width: 160,
                editable: true,
                headerClassName: 'table-header-font',
                 
        
            },         
        
            {
                field: 'chkAll',
                headerName: 'All',
                width: 160,
                headerClassName: 'table-header-font',
                cellClassName: 'chk-all-cell-css',
                align: "center",
                renderCell: (params) => (
                    <Fragment>
                        {params.value === true ? <input
                            id={"chkAll_" + params.id}
                            type="checkbox"
                            checked={true}
                            onClick={(e) => this.performCheckAll(params, e, true)}
                        /> : <input
                            id={"chkAll_" + params.id}
                            type="checkbox"
                            checked={false}
                            onClick={(e) => this.performCheckAll(params, e, false)}
                        />}
                    </Fragment>
                )
            }
            ,
        
            {
                field: 'IsCreate',
                headerName: 'Create',
                width: 160,
                headerClassName: 'table-header-font',
                cellClassName: 'chk-all-cell-css',
                align: "center",
                renderCell: (params) => (
                    <Fragment>
                        {params.value === true ? <input
                            id={"IsCreate_checkbox_" + params.id}
                            type="checkbox"
                            checked={true}
                            onClick={(e) => this.chkPermission(e, params, 'IsCreate', true)}
                        /> : <input
                            id={"IsCreate_checkbox_" + params.id}
                            type="checkbox"
                            checked={false}
                            onClick={(e) => this.chkPermission(e, params, 'IsCreate', false)}
                        />}
                    </Fragment>
                )
            },
        
            {
                field: 'IsUpdate',
                headerName: 'Update',
                width: 160,
                headerClassName: 'table-header-font',
                cellClassName: 'chk-all-cell-css',
                align: "center",
                renderCell: (params) => (
                    <Fragment>
                        {params.value === true ? <input
                            id={"IsUpdate_checkbox_" + params.id}
                            type="checkbox"
                            checked={true}
                            onClick={(e) => this.chkPermission(e, params, 'IsUpdate', true)}
                        /> : <input
                            id={"IsUpdate_checkbox_" + params.id}
                            type="checkbox"
                            checked={false}
                            onClick={(e) => this.chkPermission(e, params, 'IsUpdate', false)}
                        />}
                    </Fragment>
                )
            }
            ,
        
            {
                field: 'IsDelete',
                headerName: 'Delete',
                width: 160,
                headerClassName: 'table-header-font',
                cellClassName: 'chk-all-cell-css',
                align: "center",
                renderCell: (params) => (
                    <Fragment>
                        {params.value === true ? <input
                            id={"IsDelete_checkbox_" + params.id}
                            type="checkbox"
                            checked={true}
                            onClick={(e) => this.chkPermission(e, params, 'IsDelete', true)}
                        /> : <input
                            id={"IsDelete_checkbox_" + params.id}
                            type="checkbox"
                            checked={false}
                            onClick={(e) => this.chkPermission(e, params, 'IsDelete', false)}
                        />}
                    </Fragment>
                )
            },
        
            {
                field: 'IsView',
                headerName: 'View',
                width: 160,
                headerClassName: 'table-header-font',
                cellClassName: 'chk-all-cell-css',
                align: "center",
                renderCell: (params) => (
                    <Fragment>
                        {params.value === true ? <input
                            id={"IsView_checkbox_" + params.id}
                            type="checkbox"
                            checked={true}
                            onClick={(e) => this.chkPermission(e, params, 'IsView', true)}
                        /> : <input
                            id={"IsView_checkbox_" + params.id}
                            type="checkbox"
                            checked={false}
                            onClick={(e) => this.chkPermission(e, params, 'IsView', false)}
                        />}
                    </Fragment>
                )
            },
        
            {
                field: 'IsPrint',
                headerName: 'Print',
                width: 160,
                headerClassName: 'table-header-font',
                cellClassName: 'chk-all-cell-css',
                align: "center",
                renderCell: (params) => (
                    <Fragment>
                        {params.value === true ? <input
                            id={"IsPrint_checkbox_" + params.id}
                            type="checkbox"
                            checked={true}
                            onClick={(e) => this.chkPermission(e, params, 'IsCreate', true)}
                        /> : <input
                            id={"IsPrint_checkbox_" + params.id}
                            type="checkbox"
                            checked={false}
                            onClick={(e) => this.chkPermission(e, params, 'IsCreate', false)}
                        />}
                    </Fragment>
                )
            }
        
        
        ];
        this.setState({ columns: columns });
    }

    chkPermission(e, params, col, bool) {

        if (this.state.refreshPageLinkList === true) {
            let newBool = bool === true ? false : true;
            let rows = this.state.PropsRows;
            console.log("rows > ", rows);
            let newRows = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                if (rows[i].id === params.id) {
                    row[col] = newBool;
                    if (
                        row.IsCreate === false ||
                        row.IsDelete === false ||
                        row.IsPrint === false ||
                        row.IsUpdate === false ||
                        row.IsView === false
                    ) {
                        row.chkAll = false;
                    }
                    if (
                        row.IsCreate === true &&
                        row.IsDelete === true &&
                        row.IsPrint === true &&
                        row.IsUpdate === true &&
                        row.IsView === true
                    ) {
                        row.chkAll = true;
                    }
                    newRows.push(row);

                } else {
                    newRows.push(row)
                }
            }
            this.props.data.rows = newRows;
            this.setState({ refreshPageLinkList: true, PropsRows: newRows });
        } else {
            let newBool = bool === true ? false : true;
            let rows = this.props.data.rows;
            console.log("rows > ", rows);
            let newRows = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                if (rows[i].id === params.id) {
                    row[col] = newBool;
                    if (row.chkAll === false ||
                        row.IsCreate === false ||
                        row.IsDelete === false ||
                        row.IsPrint === false ||
                        row.IsUpdate === false ||
                        row.IsView === false
                    ) {
                        row.chkAll = false;
                    }
                    if (
                        row.IsCreate === true &&
                        row.IsDelete === true &&
                        row.IsPrint === true &&
                        row.IsUpdate === true &&
                        row.IsView === true
                    ) {
                        row.chkAll = true;
                    }

                    newRows.push(row);


                } else {
                    newRows.push(row)
                }
            }
            this.props.data.rows = newRows;
            this.setState({ refreshPageLinkList: true, PropsRows: newRows });
        }


    }


    performCheckAll(params, e, bool) {
        console.log("params > ", params);
        console.log("e > ", e);
        console.log("bool > ", bool);


        if (this.state.refreshPageLinkList === true) {
            let newBool = bool === true ? false : true;
            let rows = this.state.PropsRows;
            let newRows = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                if (rows[i].id === params.id) {
                    if (newBool === true) {
                        row.chkAll = newBool;
                        row.IsCreate = true;
                        row.IsDelete = true;
                        row.IsPrint = true;
                        row.IsUpdate = true;
                        row.IsView = true;
                    } else {
                        row.chkAll = newBool;
                        row.IsCreate = false;
                        row.IsDelete = false;
                        row.IsPrint = false;
                        row.IsUpdate = false;
                        row.IsView = false;
                    }
                    newRows.push(row)
                } else {
                    newRows.push(row)
                }
            }
            this.props.data.rows = newRows;
            this.setState({ refreshPageLinkList: true, PropsRows: newRows });
        } else {
            let newBool = bool === true ? false : true;
            let rows = this.props.data.rows;
            let newRows = [];
            for (let i = 0; i < rows.length; i++) {
                let row = rows[i];
                if (rows[i].id === params.id) {
                    if (newBool === true) {
                        row.chkAll = newBool;
                        row.IsCreate = true;
                        row.IsDelete = true;
                        row.IsPrint = true;
                        row.IsUpdate = true;
                        row.IsView = true;
                    } else {
                        row.chkAll = newBool;
                        row.IsCreate = false;
                        row.IsDelete = false;
                        row.IsPrint = false;
                        row.IsUpdate = false;
                        row.IsView = false;
                    }
                    newRows.push(row)
                } else {
                    newRows.push(row)
                }
            }
            this.props.data.rows = newRows;
            this.setState({ refreshPageLinkList: true, PropsRows: newRows });
        }
    }

    processResetData(data) {
        console.log("processResetData > data > ", data);
    }

    processSelectedRow(e,opt,bool){
        console.log("processSelectedRow > e > ", e);  
        console.log("processSelectedRow > opt > ", opt);  
        this.setState({allRowsChecked:bool});
    }

    render() {

        const selectedRows=()=>{
            let rows=this.props.data.rows;
            console.log("selectedRows > rows > ",rows);
            let selectedRows=[];
            for(let i=0;i<rows.length;i++){
              if(rows[i].chkAll===true){
                selectedRows.push(rows[i]);
              }
            }

            return selectedRows;
        }
         

        const updateSelectedRow = (e) => {
            console.log("updateSelectedRow > e > ", e);
            let SelectedRows = this.state.SelectedRows;
            if (e.length > 0) {
                if (this.state.PropsRows.length === 0) {
                    this.setState({ PropsRows: this.props.data.rows }, () => {
                        console.log("updateSelectedRow > Initialized fresh this.state.PropsRows > ", this.state.PropsRows);
                        let newPropsRow = [];
                        if (this.state.PropsRows.length === e.length) {
                            newPropsRow = this.state.PropsRows;
                        } else {
                            for (let i = 0; i < e.length; i++) {
                                for (let j = 0; j < this.state.PropsRows.length; j++) {
                                    if (this.state.PropsRows[j].id === e[i]) {
                                        newPropsRow.push(this.state.PropsRows[j]);
                                    }
                                }
                            }
                        }

                        SelectedRows.concat(newPropsRow);
                        SelectedRows = Customfunctions.removeDuplicates(SelectedRows, 'id');
                        this.setState({ SelectedRows: newPropsRow });
                    });
                } else {
                    console.log("updateSelectedRow > this.state.PropsRows > ", this.state.PropsRows);
                    let newPropsRow = [];
                    if (this.state.PropsRows.length === e.length) {
                        newPropsRow = this.state.PropsRows;
                    } else {
                        for (let i = 0; i < e.length; i++) {
                            for (let j = 0; j < this.state.PropsRows.length; j++) {
                                if (this.state.PropsRows[j].id === e[i]) {
                                    newPropsRow.push(this.state.PropsRows[j]);
                                }
                            }
                        }
                    }
                    SelectedRows.concat(newPropsRow);
                    SelectedRows = Customfunctions.removeDuplicates(SelectedRows, 'id');
                    this.setState({ SelectedRows: newPropsRow });
                }
            }
        }

        const onSelectionModelChange = (e) => {
            console.log("onSelectionModelChange > ", e);
            updateSelectedRow(e);
        }



        const getProcessedRoleDetailList = () => {
            let rows = this.state.SelectedRows;
            console.log("getProcessedRoleDetailList > rows > ", rows);
            let ROWS = [];
            for (let i = 0; i < rows.length; i++) {
                let r = {
                    RoleId: this.props.data.roleId,
                    PageId: rows[i].pageId,
                    IsCreate: rows[i].IsCreate,
                    IsUpdate: rows[i].IsUpdate,
                    IsDelete: rows[i].IsDelete,
                    IsView: rows[i].IsView,
                    IsPrint: rows[i].IsPrint,
                };
                ROWS.push(r);
            }
            return ROWS;
        }



        const handleUpdate = () => {

            if (this.state.SelectedRows.length > 0) {
                this.setState({ ProgressLoader: false });
                let RoleDetailList = getProcessedRoleDetailList();
                console.log("handleUpdate > RoleDetailList > ", RoleDetailList);
                let ValidUser = APIURLS.ValidUser;
                ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
                ValidUser.Token = getCookie(COOKIE.TOKEN);
                let data = APIURLS.CreateRoleDetailData;
                data.validUser=ValidUser;
                data.RoleId=this.props.data.roleId;
                data.RoleDetailLists=RoleDetailList;
                /*{
                    validUser: ValidUser,
                    RoleId: this.props.data.roleId,
                    RoleDetailLists: RoleDetailList
                };*/
                console.log("processUpdateData > data > ", data);
                const headers = {
                    "Content-Type": "application/json"
                };
                let CreateRoleDetailUrl = APIURLS.APIURL.CreateRoleDetail;


                axios.post(CreateRoleDetailUrl, data, { headers })
                    .then(response => {
                        let data = response.data;
                        if (response.status === 200 || response.status === 201) {
                            console.log("handleUpdate > response > data > ", data);
                            this.setState({ ProgressLoader: true, SuccessPrompt: true });
                        } else {
                            this.setState({ ProgressLoader: true, ErrorPrompt: true });
                        }

                    }
                    ).catch(error => {
                        console.log("handleUpdate > error > ", error);
                        this.setState({ ProgressLoader: true, ErrorPrompt: true });
                    });


            } else {
                alert("Please select from list");
            }
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
                {this.props.data ? (
                    <div style={{ marginTop: -50 }}>
                        {this.state.ProgressLoader === false ? (<div style={{ marginTop: -8, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

                        <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
                            <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
                        </Snackbar>

                        <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
                            <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
                        </Snackbar>
                        <div style={{ height: 20 }}></div>

                        {console.log("this.props.data.rows > ",this.props.data.rows)}

                        <Grid container spacing={3}>
                            <Grid xs={12} sm={12} md={3} lg={3}>
                                <Button
                                    style={{ marginLeft: 10 }}
                                    disabled={this.state.updateBtnDisable}
                                    onClick={handleUpdate}
                                >
                                    Update
                                </Button>
                            </Grid>
                        </Grid>
                        <div style={{ height: 20 }}></div>
                        <div style={{ height: 500, width: '100%' }}>
                            {this.state.refreshPageLinkList === true ? (
                                <DataGrid
                                className="no-border-table"
                                    rows={this.state.PropsRows}
                                    columns={this.state.columns}
                                    pageSize={this.state.pageSize}
                                    rowsPerPageOptions={[this.state.rowsPerPageOptions]}
                                    checkboxSelection={true}
                                    disableSelectionOnClick={true}
                                    onSelectionModelChange={(e) => {
                                        onSelectionModelChange(e)
                                    }}
                                    rowHeight={25}
                                    isRowSelectable={(params) => params.row.IsCreate===true || params.row.IsDelete===true || params.row.IsPrint===true || params.row.IsUpdate===true || params.row.IsView===true}
                                     
                                />
                            ) : (
                                <Fragment>
                                    <DataGrid
                                        className="no-border-table"
                                        rows={this.props.data.rows}
                                        columns={this.state.columns}
                                        pageSize={this.state.pageSize}
                                        rowsPerPageOptions={[this.state.rowsPerPageOptions]}
                                        checkboxSelection={true}
                                        disableSelectionOnClick={true}
                                        onSelectionModelChange={(e) => {
                                            onSelectionModelChange(e)
                                        }}
                                        rowHeight={25}
                                        isRowSelectable={(params) => params.row.IsCreate===true || params.row.IsDelete===true || params.row.IsPrint===true || params.row.IsUpdate===true || params.row.IsView===true}
                                    />
                                </Fragment>

                            )}

                        </div>
                        <div style={{ height: 20 }}></div>
                    </div>
                ) : null}
            </Fragment>
        )
    }
}

export default assignpagestorole;
