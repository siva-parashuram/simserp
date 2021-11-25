import "../../user/dasboard.css";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import axios from "axios";
import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Pagination from "../../compo/paginationcomponent";

const initialCss = "";
class branchlistbycompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: APIURLS.pagination.rowsPerPage,
      },
      // page: 1,
      // rowsPerPage: 10,
      initialCss: initialCss,
      urlparams: "",
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
    const handlePageChange = (event, newPage) => {
      this.InitialremoveIsSelectedRowClasses();
      console.log("handlePageChange > event > ", event);
      console.log("handlePageChange > newPage > ", newPage);
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);

      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };
    return (
      <Fragment>
        {this.props.data ? (
          <div style={{ marginLeft: 10 }}>
            <Grid container spacing={0}>
              <Grid xs={11} sm={11} md={11} xl={11}>
                <Table
                  stickyHeader
                  size="small"
                  className=""
                  aria-label="company List table"
                >
                  <TableHead className="table-header-background">
                    <TableRow>
                      <TableCell className="table-header-font">#</TableCell>
                      <TableCell className="table-header-font" align="left">
                        Branch
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {this.props.data.map((item, i) => (
                      <TableRow
                        id={"row_" + i}
                        className={this.state.initialCss}
                        hover
                        key={i}
                      >
                        <TableCell align="left">
                          <a
                            className="LINK tableLink"
                            href={
                              URLS.URLS.editBranch +
                              this.state.urlparams +
                              "&editbranchId=" +
                              item.BranchID +
                              "&type=edit"
                            }
                          >
                            B{item.BranchID}
                          </a>
                        </TableCell>
                        <TableCell align="left">
                          <a
                            className="LINK tableLink"
                            href={
                              URLS.URLS.editBranch +
                              this.state.urlparams +
                              "&editbranchId=" +
                              item.BranchID +
                              "&type=edit"
                            }
                          >
                            {item.Name}
                          </a>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>

                <Pagination
                data={this.props.data}
                pagination={this.state.pagination}
                rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
                onPageChange={handlePageChange}
                />
                 
                
              </Grid>
            </Grid>
          </div>
        ) : null}
      </Fragment>
    );
  }
}
export default branchlistbycompany;
