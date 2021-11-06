import React, { Fragment } from 'react';
import TablePagination from "@mui/material/TablePagination";
import '../user/dasboard.css';


class pagination extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                <TablePagination
                    rowsPerPageOptions={[this.props.rowsPerPageOptions]}
                    component="div"
                    count={this.props.count}
                    rowsPerPage={this.props.rowsPerPage}
                    page={this.props.page}
                    onPageChange={this.props.onPageChange}
                />
            </Fragment>
           
        )
    }

}
export default pagination;

