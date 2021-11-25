import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import { Button } from "@material-ui/core";

import TablePagination from "@mui/material/TablePagination";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Adddestination from "./adddestination";
import Pagination from "../../compo/paginationcomponent";


class destination extends React.Component {
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
      urlparams: urlparams,
    });
  }

  render() {
    const updatePostcode = (id, e) => {
      document.getElementById(id).value = e.target.value;
    };

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

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    return (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <h5 className="destination-title">Destinations</h5>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={6} lg={6}>
            <a
              className="LINK tableLink"
              href={URLS.URLS.addDestination + this.state.urlparams}
            >
              + Add New
            </a>
            {/* <Button
              startIcon={APIURLS.buttonTitle.add.icon}
              className="action-btns"
              onClick={(e) =>
                openPage(URLS.URLS.addDestination + this.state.urlparams)
              }
            >
              {APIURLS.buttonTitle.add.name}
            </Button> */}
          </Grid>
        </Grid>
        <div>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              {this.props.destinations ? (
                this.props.destinations.length > 0 ? (
                  <Fragment>
                    <TableContainer sx={{ maxHeight: 400 }}>
                      <Table
                        stickyHeader
                        size="small"
                        className=""
                        aria-label="Destination & Postcode List table"
                      >
                        <TableHead className="table-header-background">
                          <TableRow>
                            <TableCell className="table-header-font">
                              #
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Destination
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              PostCode
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                          {this.props.destinations
                            ? getPageData(this.props.destinations).map(
                                (item, i) => (
                                  <TableRow>
                                    <TableCell>
                                      <a
                                        className="LINK tableLink"
                                        href={
                                          URLS.URLS.editDestination +
                                          this.state.urlparams +
                                          "&&destinationId=" +
                                          item.destinationId +
                                          "&&countryId=" +
                                          item.countryId
                                        }
                                      >
                                        {URLS.PREFIX.destinationID +
                                          item.destinationId}{" "}
                                      </a>
                                    </TableCell>
                                    <TableCell>
                                      <a
                                        className="LINK tableLink"
                                        href={
                                          URLS.URLS.editDestination +
                                          this.state.urlparams +
                                          "&&destinationId=" +
                                          item.destinationId +
                                          "&&countryId=" +
                                          item.countryId
                                        }
                                      >
                                        {item.destinationName}{" "}
                                      </a>
                                    </TableCell>
                                    <TableCell>
                                      <input
                                        className="table-text-field"
                                        id={"postcode_" + item.destinationId}
                                        size="small"
                                        defaultValue={item.postcode}
                                        onKeyUp={(e) =>
                                          updatePostcode(
                                            "postcode_" + item.destinationId,
                                            e
                                          )
                                        }
                                      />
                                    </TableCell>
                                  </TableRow>
                                )
                              )
                            : null}
                        </TableBody>
                      </Table>
                    </TableContainer>

                    <Pagination
                      data={this.props.destinations}
                      pagination={this.state.pagination}
                      onPageChange={handlePageChange}
                    />
                  </Fragment>
                ) : (
                  <h5>No Destinations!</h5>
                )
              ) : null}
            </Grid>
          </Grid>
        </div>

        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            &nbsp;
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default destination;
