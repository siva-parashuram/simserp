import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@mui/material/TablePagination";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";
import Pagination from "../../compo/paginationcomponent";



class statesbycountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 5,
      },
      urlparams: "",
      ProgressLoader: false,
      destinations: [],
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    this.setState({
      urlparams: params,
    });
  }

  render() {
    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const handlePageChange = (event, newPage) => {
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    return (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <h5 className="destination-title">States</h5>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={6} lg={6}>
            <a
              className="LINK tableLink"
              href={URLS.URLS.addState + this.state.urlparams}
            >
              + Add New
            </a>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            {this.props.states ? (
              this.props.states.length > 0 ? (
                <Fragment>
                  <Table
                    stickyHeader
                    size="small"
                    className=""
                    aria-label="Destination & Postcode List table"
                  >
                    <TableHead className="table-header-background">
                      <TableRow>
                        <TableCell className="table-header-font">#</TableCell>
                        <TableCell className="table-header-font" align="left">
                          Name
                        </TableCell>
                        <TableCell className="table-header-font" align="left">
                          Code
                        </TableCell>
                        <TableCell className="table-header-font" align="left">
                          Gst Code
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                      {this.props.states
                        ? getPageData(this.props.states).map((item, i) => (
                            <TableRow>
                              <TableCell>
                                <a
                                  className="LINK tableLink"
                                  href={
                                    URLS.URLS.editState +
                                    this.state.urlparams +
                                    "&StateId=" +
                                    item.stateId
                                  }
                                >
                                  {URLS.PREFIX.stateID + item.stateId}
                                </a>
                              </TableCell>
                              <TableCell>
                                <a
                                  className="LINK tableLink"
                                  href={
                                    URLS.URLS.editState +
                                    this.state.urlparams +
                                    "&StateId=" +
                                    item.stateId
                                  }
                                >
                                  {item.name}
                                </a>
                              </TableCell>
                              <TableCell> {item.code} </TableCell>
                              <TableCell> {item.gstcode} </TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                  <Pagination
                    data={this.props.states}
                    pagination={this.state.pagination}
                    onPageChange={handlePageChange}
                  />
                </Fragment>
              ) : (
                <h5>No States!</h5>
              )
            ) : null}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default statesbycountry;
