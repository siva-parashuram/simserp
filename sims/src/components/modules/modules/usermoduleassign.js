import '../../user/dasboard.css';
import React, { Fragment } from 'react';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

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
            rows: [],
            columns: columns,
            rowsPerPageOptions: 5,
            pageSize: 100,
        }
    }
    componentDidMount() { }



    render() {
        const insitiateState = (userId) => {
            this.setState({ userId: userId });
        }

        const getModulesByUserID = (userId) => {
            console.log("getModulesByUserID > userId > ", userId);
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
                        rows = data;
                        this.setState({ modules: rows }, () => {
                            setupDatagrid();
                        });
                    } else {

                    }

                }
                ).catch(error => {
                    console.log("error > ", error);
                });
        }

        const setupDatagrid = () => {
            let rows = [
                { id: 1, moduleId: 1, name: 'Admin' },
            ];
            this.setState({ rows: rows });
        }


        const onSelectionModelChange = (e) => {
            console.log("onSelectionModelChange > ", e);
        }

        const handleUpdate = () => { }

        return (
            <Fragment>

                {this.props.data ? (
                    <Fragment>

                        <div style={{ height: 20 }}></div>

                        <Grid container spacing={3}>
                            <Grid xs={12} sm={12} md={3} lg={3}>
                                <Button
                                    style={{ marginLeft: 10 }}
                                    disabled={this.state.updateBtnDisable}
                                    onClick={handleUpdate}
                                >
                                    Alot
                                </Button>
                            </Grid>
                        </Grid>

                        <div style={{ height: 20 }}></div>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={6} lg={6}>
                                <div style={{ height: 300, width: '100%' }}>
                                    <DataGrid
                                        className="border-less-datagrid"
                                        rows={this.state.rows}
                                        columns={this.state.columns}                                         
                                        checkboxSelection={true}
                                        // onRowClick={(e) => {                            
                                        //     handleRowClick(e)
                                        // }}
                                        onSelectionModelChange={(e) => {
                                            onSelectionModelChange(e)
                                        }}
                                    />
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