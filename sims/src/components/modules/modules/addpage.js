import '../../user/dasboard.css';
import axios from "axios";
import React, { Fragment } from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

let columns = [
    {
        field: 'pageId',
        headerName: '#',
        width: 100,

    },
    {
        field: 'pageName',
        headerName: 'Page Name',
        width: 150,
        editable: true,

    },
    {
        field: 'pageLink',
        headerName: 'Page Link',
        width: 150,
        editable: true,
        filterable: true
    },
    {
        field: 'description',
        headerName: 'Description',
        width: 250,
        editable: true,
        filterable: true
    },
    {
        field: 'moduleId',
        headerName: 'Module',
        width: 250
    }
];

const rows = [
    // { pageId: 1, pageName: 'Company Master', pageLink: 'companyMaster', description: 'company master page', },
    // { pageId: 2, pageName: 'Country Master', pageLink: 'countryMaster', description: 'country master page' },
    // { pageId: 3, pageName: 'State Master', pageLink: 'stateMaster', description: 'state master page' },
    // { pageId: 4, pageName: 'User Master', pageLink: 'userMaster', description: 'user master page' },
    // { pageId: 5, pageName: 'Branch Master', pageLink: 'companyMaster', description: 'company master page' },
    // { pageId: 6, pageName: 'Module Master', pageLink: 'moduleMaster', description: 'module master page' },

];

class addpage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            ProgressLoader: false,
            columns: columns,
            rows: rows,
            isRowSelected: false,
            previousRowSelected: 0,
            pageName: null,
            pageLink: null,
            description: null,
            createBtnDisable: true,
            updateBtnDisable: true,
            refreshPageLinkList: false,
            modules: [],
            rowsPerPageOptions: 5,
            pageSize: 100,
            Validations: {
                pageName: { errorState: false, errorMsg: "" },
                pageLink: { errorState: false, errorMsg: "" },

            }

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

    getModules() {
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
                if (response.status === 200) {
                    let data = response.data;
                    console.log("getModules > response > data > ", data);
                    rows = data;
                    this.setState({ modules: rows, ProgressLoader: true });
                    this.updateColumns(rows);
                } else {

                }

            }
            ).catch(error => {
                console.log("error > ", error);
            });
    }

    updateColumns(modules) {
        let columns = [
            {
                field: 'pageId',
                headerName: '#',
                width: 100,

            },
            {
                field: 'pageName',
                headerName: 'Page Name',
                width: 150,
                editable: true,

            },
            {
                field: 'pageLink',
                headerName: 'Page Link',
                width: 150,
                editable: true,
                filterable: true
            },
            {
                field: 'description',
                headerName: 'Description',
                width: 250,
                editable: true,
                filterable: true
            },
            {
                field: 'moduleId',
                headerName: 'Module',
                width: 250,
                renderCell: (params) => (
                    <Fragment>
                        {console.log("params > ", params)}
                        <select
                            className="dropdown-css"
                            defaultValue={params.value}
                            onChange={(e) => this.handleDropdownChange(e, params)}
                        >
                            {modules.map((item, i) => (
                                <option value={item.moduleId}> {item.name}</option>
                            ))}

                        </select>
                    </Fragment>
                )
            }
        ];
        this.setState({ columns: columns });
    }

    handleDropdownChange(e, params) {
        console.log("handleDropdownChange > e > ", e);
        console.log("handleDropdownChange > params > ", params);
        this.setState({updateBtnDisable:false});
    }


    processResetData(data) {
        console.log("processResetData > data > ", data);
    }

    render() {

        const handleRowClick = (e) => {
            console.log("e > ", e);
            let previousRowSelected = this.state.previousRowSelected;
            console.log("previousRowSelected > ", previousRowSelected);
            console.log("e.id > ", e.id);
            if (parseInt(previousRowSelected) != parseInt(e.id)) {
                this.setState({ isRowSelected: true, previousRowSelected: e.id });
                console.log("NOT EQUAL");
                console.log("Perform operations here...");
            } else {
                this.setState({ isRowSelected: false, previousRowSelected: e.id });
            }
        }

        const onSelectionModelChange = (e) => {
            console.log("onSelectionModelChange > ", e);
        }

        const onEditRowsModelChange = (e) => {
            console.log("onEditRowsModelChange > ", e);
            var keys = Object.keys(e);
            if (keys.length === 0) {
            } else {
                let rowID = parseInt(keys[0]);
                let data = e[keys[0]];
                var DataKeys = Object.keys(data);
                let col = DataKeys[0];
                let colEditValue = data[col].value;
                if (col === "pageName") {
                    processUpdateData(rowID, col, colEditValue);
                }
                if (col === "pageLink") {
                    processUpdateData(rowID, col, colEditValue);
                }
                if (col === "description") {
                    processUpdateData(rowID, col, colEditValue);
                }
            }
        }

        const processUpdateData = (rowID, col, colEditValue) => {

            let rows = this.props.data.rows;
            let moduleId = this.props.data.moduleId;

            console.log("processUpdateData > rows > ", rows);
            console.log("processUpdateData > moduleId > ", moduleId);
            for (let i = 0; i < rows.length; i++) {
                if (rows[i].id === rowID) {
                    rows[i][col] = colEditValue;
                    rows[i]['moduleId'] = moduleId;
                }
            }
            this.setState({ rows: rows, updateBtnDisable: false });

        }

        const handleUpdate = () => {
            let rows = this.state.rows;
            let moduleId = this.props.data.moduleId;
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
            const data = {
                "validUser": ValidUser,
                "page": rows
            };
            console.log("processUpdateData > data > ", data);
            this.setState({ updateBtnDisable: true }, () => {
                getPageListByModuleId(moduleId);
            });
        }



        const updateFormValue = (id, e) => {

            if (id === "pageName") {
                if (e.target.value === "" || e.target.value.length > 20) {
                    let Validations = this.state.Validations;
                    if (e.target.value === "") {
                        Validations.pageName = { errorState: true, errorMsg: "Blank inputs not allowed!" }
                    }
                    if (e.target.value.length > 20) {
                        Validations.pageName = { errorState: true, errorMsg: "Maximum 20 characters Allowed!" }
                    }
                    this.setState({ pageName: e.target.value, Validations: Validations }); 
                } else {
                    let Validations = this.state.Validations;
                    Validations.Description = { errorState: false, errorMsg: "" };
                    this.setState({ pageName: e.target.value, Validations: Validations });
                }
            }
            if (id === "pageLink") {
                if (e.target.value === "" || e.target.value.length > 100) {
                    let Validations = this.state.Validations;
                    if (e.target.value === "") {
                        Validations.pageLink = { errorState: true, errorMsg: "Blank inputs not allowed!" }
                    }
                    if (e.target.value.length > 100) {
                        Validations.pageLink = { errorState: true, errorMsg: "Maximum 100 characters Allowed!" }
                    }
                    this.setState({ pageLink: e.target.value, Validations: Validations });
                } else {
                    let Validations = this.state.Validations;
                    Validations.pageLink = { errorState: false, errorMsg: "" };
                    this.setState({ pageLink: e.target.value, Validations: Validations });
                }
            }
            if (id === "description") {
                this.setState({ description: e.target.value });
            }
        }

        const enableCreateBtn = () => {
            if ((this.state.pageName !== "" || this.state.pageName != null) && (this.state.pageLink !== "" || this.state.pageLink != null)) {
                this.setState({ createBtnDisable: true });
                if(this.state.pageName!=null && this.state.pageLink != null){
                    if(this.state.pageName.length>20 || this.state.pageName !== ""){
                        this.setState({ createBtnDisable: true });
                     }else if(this.state.pageLink.length>100 || this.state.pageLink !== ""){
                        this.setState({ createBtnDisable: true });
                     }else{
                        this.setState({ createBtnDisable: false });
                     }
                }else{
                    this.setState({ createBtnDisable: false });
                }
            }
        }


        const handlecreate = (moduleId) => {
            console.log("handlecreate > moduleId > ", moduleId);
            let pageName = this.state.pageName;
            let pageLink = this.state.pageLink;
            let description = this.state.description;

            if ((pageName !== "" || pageName != null) && (pageLink !== "" || pageLink != null)) {
                let ValidUser = APIURLS.ValidUser;
                ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
                ValidUser.Token = getCookie(COOKIE.TOKEN);
                const data = {
                    "validUser": ValidUser,
                    "page": {
                        PageId: 0,
                        ModuleId: moduleId,
                        PageName: pageName,
                        PageLink: pageLink,
                        Description: description,
                    }
                };
                const headers = {
                    "Content-Type": "application/json"
                };
                let CreatePageUrl = APIURLS.APIURL.CreatePage;
                console.log("handlecreate > data > ", data);
                axios.post(CreatePageUrl, data, { headers })
                    .then(response => {
                        let data = response.data;
                        console.log("handleUpdate > response > data > ", data);
                        getPageListByModuleId(moduleId);
                    }
                    ).catch(error => {
                        console.log("error > ", error);
                    });
            }
        }

        const getPageListByModuleId = (moduleId) => {
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
                    if (response.status === 200) {
                        let data = response.data;
                        console.log("getPageList > response > data > ", data);
                        resetDataList(data);
                    } else {
                    }
                }
                ).catch(error => {
                    console.log("error > ", error);
                });
        }

        const resetDataList = (data) => {
            let rows = [];
            for (let i = 0; i < data.length; i++) {
                let r = {
                    id: data[i].pageId,
                    pageId: URLS.PREFIX.pageID + data[i].pageId,
                    pageName: data[i].pageName,
                    pageLink: data[i].pageLink,
                    description: data[i].description
                };
                rows.push(r);
            }
            console.log("rows > ", rows);
            this.setState({ rows: rows }, () => {
                this.setState({ refreshPageLinkList: true });
            });

        }

        const handleAccordionClick = (val, e) => {

            if (val === "GeneralDetailsExpanded") {
                this.state.GeneralDetailsExpanded === true ? this.setState({ GeneralDetailsExpanded: false }) : this.setState({ GeneralDetailsExpanded: true })
            }

        }

        return (
            <Fragment>
                {this.props.data ? (
                    <div style={{marginTop:-50}}>
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

                        <div style={{ height: 300, width: '100%' }}>

                            {this.state.refreshPageLinkList ? (
                                <DataGrid
                                    rows={this.state.rows}
                                    columns={this.state.columns}
                                    pageSize={this.state.pageSize}
                                    rowsPerPageOptions={[this.state.rowsPerPageOptions]}
                                    // checkboxSelection={true}
                                    // onRowClick={(e) => {                            
                                    //     handleRowClick(e)
                                    // }}
                                    // onSelectionModelChange={(e) => {
                                    //     onSelectionModelChange(e)
                                    // }}
                                    onEditRowsModelChange={(e) => {
                                        onEditRowsModelChange(e)
                                    }}
                                />
                            ) : (
                                <Fragment>

                                    <DataGrid
                                        rows={this.props.data.rows}
                                        columns={this.state.columns}
                                        pageSize={this.state.pageSize}
                                        rowsPerPageOptions={[this.state.rowsPerPageOptions]}
                                        // checkboxSelection={true}
                                        // onRowClick={(e) => {                            
                                        //     handleRowClick(e)
                                        // }}
                                        // onSelectionModelChange={(e) => {
                                        //     onSelectionModelChange(e)
                                        // }}
                                        onEditRowsModelChange={(e) => {
                                            onEditRowsModelChange(e)
                                        }}
                                    />
                                </Fragment>

                            )}



                        </div>


                        <div style={{ height: 20 }}></div>
                        <Accordion key="country-General-Details" expanded={this.state.GeneralDetailsExpanded} >
                            <AccordionSummary
                                className="accordion-Header-Design"
                                expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("GeneralDetailsExpanded", e)} />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                style={{ minHeight: 20, height: '100%' }}
                            >
                                <Typography key="" className="accordion-Header-Title">Create New Page</Typography>
                            </AccordionSummary>
                            <AccordionDetails key="">
                                <TableContainer>
                                    <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                                        <TableBody className="tableBody">
                                            <TableRow>
                                                <TableCell align="left" className="no-border-table">
                                                    <Button
                                                        style={{ marginLeft: 5 }}
                                                        startIcon={<AddIcon />}
                                                        onClick={(e) => {
                                                            handlecreate(this.props.data.moduleId);
                                                        }}
                                                        disabled={this.state.createBtnDisable}
                                                    >
                                                        Create
                                                    </Button>
                                                </TableCell>
                                                <TableCell align="left" className="no-border-table">
                                                    &nbsp;
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left" className="no-border-table">
                                                    <b>Page Name</b>
                                                </TableCell>
                                                <TableCell align="left" className="no-border-table">
                                                    <TextField
                                                        id="pageName"
                                                        variant="outlined"
                                                        size="small"
                                                        onChange={(e) => updateFormValue('pageName', e)}
                                                        fullWidth
                                                        InputProps={{
                                                            className: "textFieldCss",
                                                        }}
                                                        maxlength={20}
                                                        value={this.state.pageName}
                                                        error={this.state.Validations.pageName.errorState}
                                                        helperText={this.state.Validations.pageName.errorMsg}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left" className="no-border-table">
                                                    <b> Page Link</b>
                                                </TableCell>
                                                <TableCell align="left" className="no-border-table">
                                                    <TextField
                                                        id="pageLink"
                                                        variant="outlined"
                                                        size="small"
                                                        onChange={(e) => updateFormValue('pageLink', e)}
                                                        fullWidth
                                                        InputProps={{
                                                            className: "textFieldCss",
                                                        }}
                                                        maxlength={20}
                                                        value={this.state.pageLink}
                                                        error={this.state.Validations.pageLink.errorState}
                                                        helperText={this.state.Validations.pageLink.errorMsg}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="left" className="no-border-table">
                                                    <b> Description</b>
                                                </TableCell>
                                                <TableCell align="left" className="no-border-table">
                                                    <TextField
                                                        id="description"
                                                        variant="outlined"
                                                        size="small"
                                                        onChange={(e) => updateFormValue('description', e)}
                                                        fullWidth
                                                        InputProps={{
                                                            className: "textFieldCss",
                                                        }}
                                                        maxlength={20}
                                                        value={this.state.description}
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </AccordionDetails>
                        </Accordion>
                    </div>
                ) : null}
            </Fragment>
        )
    }
}

export default addpage;
