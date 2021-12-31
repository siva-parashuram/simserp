import React, { Fragment } from 'react';
import { 
    DataGrid, 
    GridToolbar,
    GridToolbarContainer,
    GridToolbarColumnsButton,
    GridToolbarFilterButton,
    GridToolbarExport,
    GridToolbarDensitySelector,
    gridClasses } from '@mui/x-data-grid';
import '../user/dasboard.css';


function CustomToolbar() {
    return (
      <GridToolbarContainer className={gridClasses.toolbarContainer}>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            {/* <GridToolbarExport /> */}
            
      </GridToolbarContainer>
    );
  }


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
                    selectionModel={this.props.selectionModel}            
                    rows={this.props.rows}
                    columns={this.props.columns}
                    pageSize={10}                   
                    checkboxSelection={this.props.checkboxSelection}
                    disableSelectionOnClick={this.props.disableSelectionOnClick}
                    onSelectionModelChange={this.props.onSelectionModelChange}
                    // onEditRowsModelChange={this.props.onEditRowsModelChange}
                    components={{
                        Toolbar:   CustomToolbar,                        
                      }}
                    onPageChange={this.props.onPageChange}   
                     
                />
            </div>


        )
    }

}
export default masterdatagrid;

