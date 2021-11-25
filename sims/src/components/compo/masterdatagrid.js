import React, { Fragment } from 'react';
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import '../user/dasboard.css';


class masterdatagrid extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    // componentDidMount() { }
    render() {
        return (
            <div style={{ height: 520, width: '100%' }}>
                <DataGrid
                    // density="compact"               
                    rows={this.props.rows}
                    columns={this.props.columns}
                    pageSize={12}
                    rowsPerPageOptions={[12]}
                    checkboxSelection={this.props.checkboxSelection}
                    disableSelectionOnClick={this.props.disableSelectionOnClick}
                    onSelectionModelChange={this.props.onSelectionModelChange}
                    onEditRowsModelChange={this.props.onEditRowsModelChange}
                    components={{
                        Toolbar: GridToolbar,
                      }}
                       
                />
            </div>


        )
    }

}
export default masterdatagrid;

