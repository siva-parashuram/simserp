import React, { Fragment } from 'react';


 
export const roleMasterDetail=[
    {
        field: 'moduleId',
        headerName: '#',
        width: 160,
        headerClassName: 'table-header-font',
        renderCell: (params) => (
            <Fragment>
           
            
            </Fragment>
        )
        
    },
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