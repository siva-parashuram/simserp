import React, { Fragment } from 'react';
import TablePagination from "@mui/material/TablePagination";
import '../user/dasboard.css';


class paginationcomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                 {this.props.data.length>this.props.pagination.rowsPerPage?(
                  <TablePagination
                  rowsPerPageOptions={this.props.rowsPerPageOptions}
                  component="div"
                  count={this.props.data.length}
                  rowsPerPage={this.props.pagination.rowsPerPage}
                  page={this.props.pagination.page}
                  onPageChange={this.props.onPageChange}
                />
                ):null}
            </Fragment>
           
        )
    }

}
export default paginationcomponent;

