import "../../user/dasboard.css";
import axios from "axios";
import React, { Fragment } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TablePagination from "@mui/material/TablePagination";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";

class assignrole extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      urlparams: "",
      ProgressLoader: true,
      updateBtnDisable: false,
      rows: [],
      roleId: 0,
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
    const performCheckAll = (item, e, bool) => {
      // this.setState({ roleId: this.props.roleId });
      console.log("performCheckAll > item > ", item);
      let rows = [];
      this.state.rows.length > 0
        ? (rows = this.state.rows)
        : (rows = this.props.rows);
      console.log("performCheckAll > rows > ", rows);
      let newRows = [];
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (rows[i].id === item.id) {
          if (bool === true) {
            row.chkAll = bool;
            row.IsCreate = true;
            row.IsDelete = true;
            row.IsPrint = true;
            row.IsUpdate = true;
            row.IsView = true;
            row.isChecked = bool;
          } else {
            row.isChecked = bool;
            row.chkAll = bool;
            row.IsCreate = false;
            row.IsDelete = false;
            row.IsPrint = false;
            row.IsUpdate = false;
            row.IsView = false;
          }
          newRows.push(row);
        } else {
          newRows.push(row);
        }
      }
      this.setState({ rows: newRows });
    };

    const chkPermission = (e, item, col, bool) => {
      // this.setState({ roleId: this.props.roleId });
      console.log("chkPermission > item > ", item);
      console.log("chkPermission > col > ", col);
      console.log("chkPermission > bool > ", bool);
      let rows = [];
      this.state.rows.length > 0
        ? (rows = this.state.rows)
        : (rows = this.props.rows);
      console.log("chkPermission > rows > ", rows);
      let newRows = [];
      for (let i = 0; i < rows.length; i++) {
        let row = rows[i];
        if (rows[i].id === item.id) {
          row[col] = bool;
          if (
            row.IsCreate === false ||
            row.IsDelete === false ||
            row.IsPrint === false ||
            row.IsUpdate === false ||
            row.IsView === false
          ) {
            row.chkAll = false;
            row.isChecked = false;
          }
          if (
            row.IsCreate === true &&
            row.IsDelete === true &&
            row.IsPrint === true &&
            row.IsUpdate === true &&
            row.IsView === true
          ) {
            row.chkAll = true;
            row.isChecked = true;
          }
          newRows.push(row);
        } else {
          newRows.push(row);
        }
      }
      this.setState({ rows: newRows });
    };

    const getProcessedRoleDetailList = (selectedRows) => {
      let rows = selectedRows;

      let ROWS = [];
      for (let i = 0; i < rows.length; i++) {
        let r = {
          RoleId: this.props.roleId,
          PageId: rows[i].pageId,
          IsCreate: rows[i].IsCreate,
          IsUpdate: rows[i].IsUpdate,
          IsDelete: rows[i].IsDelete,
          IsView: rows[i].IsView,
          IsPrint: rows[i].IsPrint,
        };
        ROWS.push(r);
      }
      return ROWS;
    };

    const getSelectedRows = () => {
      let newRows = [];
      let rows = [];
      this.state.rows.length > 0
        ? (rows = this.state.rows)
        : (rows = this.props.rows);
      for (let i = 0; i < rows.length; i++) {
        if (rows[i].isChecked === true) {
          newRows.push(rows[i]);
        }
      }
      return newRows;
    };

    const handleUpdate = () => {
      let selectedRows = getSelectedRows();
      this.setState({ ProgressLoader: false });
      let RoleDetailList = getProcessedRoleDetailList(selectedRows);

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let data = APIURLS.CreateRoleDetailData;
      data.validUser = ValidUser;
      data.RoleId = this.props.roleId;
      data.RoleDetailLists = RoleDetailList;
      console.log("handleUpdate > data > ", data);

      const headers = {
        "Content-Type": "application/json",
      };
      let CreateRoleDetailUrl = APIURLS.APIURL.CreateRoleDetail;

      axios
        .post(CreateRoleDetailUrl, data, { headers })
        .then((response) => {
          let data = response.data;
          if (response.status === 200 || response.status === 201) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        });
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    const handlePageChange = (event, newPage) => {
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
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        {this.props.rows ? (
          <div style={{ marginTop: -30 }}>
            <Grid container spacing={3}>
              <Grid xs={12} sm={12} md={3} lg={3}>
                <Button
                  className="action-btns"
                  startIcon={APIURLS.buttonTitle.save.icon}
                  style={{ marginLeft: 10 }}
                  disabled={
                    this.props.rows.length > 0 || this.state.rows.length > 0
                      ? false
                      : true
                  }
                  onClick={handleUpdate}
                >
                  {APIURLS.buttonTitle.save.name}
                </Button>
              </Grid>
            </Grid>
            <div style={{ height: 20 }}></div>
            <div style={{ marginLeft: 10 }}>
              <Loader ProgressLoader={this.state.ProgressLoader} />
            </div>

            <div style={{ height: 20 }}></div>
            <Table
              stickyHeader
              size="small"
              className=""
              aria-label="Role List table"
            >
              <TableHead className="table-header-background">
                <TableRow>
                  <TableCell className="table-header-font">#</TableCell>
                  <TableCell className="table-header-font" align="left">
                    Module
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    Page Name
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    All
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    Create
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    Update
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    Delete
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    View
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    Print
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tableBody">
                {this.props.roleId === this.state.roleId &&
                this.state.rows.length > 0 ? (
                  <Fragment>
                    {getPageData(this.state.rows).map((item, i) => (
                      <TableRow id={"row_" + i} hover key={i}>
                        <TableCell align="left">
                          {item.isChecked === true ||
                          item.chkAll === true ||
                          item.IsCreate === true ||
                          item.IsUpdate === true ||
                          item.IsDelete === true ||
                          item.IsView === true ||
                          item.IsPrint === true ? (
                            <input
                              id={"chkRow_" + item.id}
                              type="checkbox"
                              checked={true}
                              onClick={(e) => performCheckAll(item, e, false)}
                            />
                          ) : (
                            <input
                              id={"chkRow_" + item.id}
                              type="checkbox"
                              checked={false}
                              onClick={(e) => performCheckAll(item, e, true)}
                            />
                          )}
                        </TableCell>
                        <TableCell align="left">{item.moduleName}</TableCell>
                        <TableCell align="left">{item.pageName}</TableCell>
                        <TableCell className="chk-all-cell-css" align="left">
                          {item.chkAll === true ? (
                            <input
                              id={"chkAll_" + item.id}
                              type="checkbox"
                              checked={true}
                              onClick={(e) => performCheckAll(item, e, false)}
                            />
                          ) : (
                            <input
                              id={"chkAll_" + item.id}
                              type="checkbox"
                              checked={false}
                              onClick={(e) => performCheckAll(item, e, true)}
                            />
                          )}
                        </TableCell>
                        <TableCell className="chk-all-cell-css" align="left">
                          {item.IsCreate === true ? (
                            <input
                              id={"IsCreate_checkbox_" + item.id}
                              type="checkbox"
                              checked={true}
                              onClick={(e) =>
                                chkPermission(e, item, "IsCreate", false)
                              }
                            />
                          ) : (
                            <input
                              id={"IsCreate_checkbox_" + item.id}
                              type="checkbox"
                              checked={false}
                              onClick={(e) =>
                                chkPermission(e, item, "IsCreate", true)
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell className="chk-all-cell-css" align="left">
                          {item.IsUpdate === true ? (
                            <input
                              id={"IsUpdate_checkbox_" + item.id}
                              type="checkbox"
                              checked={true}
                              onClick={(e) =>
                                chkPermission(e, item, "IsUpdate", false)
                              }
                            />
                          ) : (
                            <input
                              id={"IsUpdate_checkbox_" + item.id}
                              type="checkbox"
                              checked={false}
                              onClick={(e) =>
                                chkPermission(e, item, "IsUpdate", true)
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell className="chk-all-cell-css" align="left">
                          {item.IsDelete === true ? (
                            <input
                              id={"IsDelete_checkbox_" + item.id}
                              type="checkbox"
                              checked={true}
                              onClick={(e) =>
                                chkPermission(e, item, "IsDelete", false)
                              }
                            />
                          ) : (
                            <input
                              id={"IsDelete_checkbox_" + item.id}
                              type="checkbox"
                              checked={false}
                              onClick={(e) =>
                                chkPermission(e, item, "IsDelete", true)
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell className="chk-all-cell-css" align="left">
                          {item.IsView === true ? (
                            <input
                              id={"IsView_checkbox_" + item.id}
                              type="checkbox"
                              checked={true}
                              onClick={(e) =>
                                chkPermission(e, item, "IsView", false)
                              }
                            />
                          ) : (
                            <input
                              id={"IsView_checkbox_" + item.id}
                              type="checkbox"
                              checked={false}
                              onClick={(e) =>
                                chkPermission(e, item, "IsView", true)
                              }
                            />
                          )}
                        </TableCell>
                        <TableCell className="chk-all-cell-css" align="left">
                          {item.IsPrint === true ? (
                            <input
                              id={"IsPrint_checkbox_" + item.id}
                              type="checkbox"
                              checked={true}
                              onClick={(e) =>
                                chkPermission(e, item, "IsPrint", false)
                              }
                            />
                          ) : (
                            <input
                              id={"IsPrint_checkbox_" + item.id}
                              type="checkbox"
                              checked={false}
                              onClick={(e) =>
                                chkPermission(e, item, "IsPrint", true)
                              }
                            />
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </Fragment>
                ) : (
                  <Fragment>
                    {this.props.rows
                      ? this.state.roleId === 0 && this.props.rows.length > 0
                        ? getPageData(this.props.rows).map((item, i) => (
                            <TableRow id={"row_" + i} hover key={i}>
                              <TableCell align="left">
                                {item.isChecked === true ||
                                item.chkAll === true ||
                                item.IsCreate === true ||
                                item.IsUpdate === true ||
                                item.IsDelete === true ||
                                item.IsView === true ||
                                item.IsPrint === true ? (
                                  <input
                                    id={"chkRow_" + item.id}
                                    type="checkbox"
                                    checked={true}
                                    onClick={(e) =>
                                      performCheckAll(item, e, false)
                                    }
                                  />
                                ) : (
                                  <input
                                    id={"chkRow_" + item.id}
                                    type="checkbox"
                                    checked={false}
                                    onClick={(e) =>
                                      performCheckAll(item, e, true)
                                    }
                                  />
                                )}
                              </TableCell>
                              <TableCell align="left">
                                {item.moduleName}
                              </TableCell>
                              <TableCell align="left">
                                {item.pageName}
                              </TableCell>
                              <TableCell
                                className="chk-all-cell-css"
                                align="left"
                              >
                                {item.chkAll === true ? (
                                  <input
                                    id={"chkAll_" + item.id}
                                    type="checkbox"
                                    checked={true}
                                    onClick={(e) =>
                                      performCheckAll(item, e, false)
                                    }
                                  />
                                ) : (
                                  <input
                                    id={"chkAll_" + item.id}
                                    type="checkbox"
                                    checked={false}
                                    onClick={(e) =>
                                      performCheckAll(item, e, true)
                                    }
                                  />
                                )}
                              </TableCell>
                              <TableCell
                                className="chk-all-cell-css"
                                align="left"
                              >
                                {item.IsCreate === true ? (
                                  <input
                                    id={"IsCreate_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={true}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsCreate", false)
                                    }
                                  />
                                ) : (
                                  <input
                                    id={"IsCreate_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={false}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsCreate", true)
                                    }
                                  />
                                )}
                              </TableCell>
                              <TableCell
                                className="chk-all-cell-css"
                                align="left"
                              >
                                {item.IsUpdate === true ? (
                                  <input
                                    id={"IsUpdate_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={true}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsUpdate", false)
                                    }
                                  />
                                ) : (
                                  <input
                                    id={"IsUpdate_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={false}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsUpdate", true)
                                    }
                                  />
                                )}
                              </TableCell>
                              <TableCell
                                className="chk-all-cell-css"
                                align="left"
                              >
                                {item.IsDelete === true ? (
                                  <input
                                    id={"IsDelete_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={true}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsDelete", false)
                                    }
                                  />
                                ) : (
                                  <input
                                    id={"IsDelete_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={false}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsDelete", true)
                                    }
                                  />
                                )}
                              </TableCell>
                              <TableCell
                                className="chk-all-cell-css"
                                align="left"
                              >
                                {item.IsView === true ? (
                                  <input
                                    id={"IsView_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={true}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsView", false)
                                    }
                                  />
                                ) : (
                                  <input
                                    id={"IsView_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={false}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsView", true)
                                    }
                                  />
                                )}
                              </TableCell>
                              <TableCell
                                className="chk-all-cell-css"
                                align="left"
                              >
                                {item.IsPrint === true ? (
                                  <input
                                    id={"IsPrint_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={true}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsPrint", false)
                                    }
                                  />
                                ) : (
                                  <input
                                    id={"IsPrint_checkbox_" + item.id}
                                    type="checkbox"
                                    checked={false}
                                    onClick={(e) =>
                                      chkPermission(e, item, "IsPrint", true)
                                    }
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          ))
                        : null
                      : null}
                  </Fragment>
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
              component="div"
              count={this.props.rows.length}
              rowsPerPage={this.state.pagination.rowsPerPage}
              page={this.state.pagination.page}
              onPageChange={handlePageChange}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default assignrole;
