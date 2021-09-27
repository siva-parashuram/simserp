import React, { Fragment } from 'react';
import axios from "axios";
import { DataGrid } from '@material-ui/data-grid';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

let columns = [
    {
        field: 'moduleId',
        headerName: '#',
        width: 100,

    },
    {
        field: 'name',
        headerName: 'Module Name',
        width: 150,
        editable: true,

    },
    {
        field: 'description',
        headerName: 'Description',
        width: 250,
        editable: true,
        filterable: true
    }
];

class usermoduleassign extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
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

     


        const onSelectionModelChange = (e) => {
            console.log("onSelectionModelChange > ", e);
        }

        return (
            <Fragment>

                {this.props.data ? (
                    <Fragment>
                        {getModulesByUserID(this.props.data)}

                        <DataGrid
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


                    </Fragment>
                ) : 'Please select User to proceed'}


            </Fragment>
        )
    }

}
export default usermoduleassign;