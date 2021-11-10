import "../../user/dasboard.css";
import Header from "../../user/userheaderconstants";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as Customfunctions from "../../../services/functions/customfunctions";

import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";

import ButtonGroup from "@mui/material/ButtonGroup";

import Assignrole from "./assignrole";
import Assignpagestorole from "./assignpagestorole";
import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";

let rows = [];

class rolemaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      roles: [],
      roleId: 0,
      pages: rows,
      editurl: null,
    };
  }

  componentDidMount() {
    this.getRoles();

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

  getRoles() {
    this.setState({ ProgressLoader: false });

    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetRolesUrl = APIURLS.APIURL.GetRoles;

    axios
      .post(GetRolesUrl, ValidUser, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          rows = data;
          this.setState({ roles: rows, ProgressLoader: true }, () => {
            if (rows.length > 0) {
              this.InitialhandleRowClick(null, rows[0], "row_0");
            }
          });
        } else {
        }
      })
      .catch((error) => {
        this.setState({ roles: [], ProgressLoader: true });
      });
  }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editModule + this.state.urlparams + "&roleID=" + item.moduleId;

    this.setState({ roleId: item.roleId, editurl: editUrl }, () => {
      this.InitialgetPageListByRoleId(item.roleId);
    });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.roles.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  InitialgetPageListByRoleId(roleId) {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let data = APIURLS.GetRoleDetailByRoleIdData;
    data.validUser = ValidUser;
    data.RoleId = roleId;

    let GetRoleDetailByRoleIdUrl = APIURLS.APIURL.GetRoleDetailByRoleId;
    axios
      .post(GetRoleDetailByRoleIdUrl, data, { headers })
      .then((response) => {
        if (response.status === 200) {
          this.InitialprocessPageData(response.data.roleDetailLists);
        } else {
        }
      })
      .catch((error) => {
        this.setState({ pages: [], ProgressLoader: true });
      });
  };
  InitialprocessPageData(data) {
    let rows = [];
    var i = 0,
      len = data.length;
    while (i < len) {
      let chkAll = true;
      if (
        data[i].isCreate === true &&
        data[i].isDelete === true &&
        data[i].isPrint === true &&
        data[i].isUpdate === true &&
        data[i].isView === true
      ) {
        chkAll = true;
      } else {
        chkAll = false;
      }
      let row = {
        id: data[i].pageId,
        pageId: data[i].pageId,
        pageName: data[i].pageName,
        pageLink: data[i].pageLink,
        moduleId: data[i].moduleID,
        moduleName: data[i].name,
        chkAll: chkAll,
        IsCreate: data[i].isCreate,
        IsUpdate: data[i].isUpdate,
        IsDelete: data[i].isDelete,
        IsView: data[i].isView,
        IsPrint: data[i].isPrint,
        isChecked: data[i].isChecked,
      };
      rows.push(row);
      i++;
    }
    this.setState({ pages: rows });
  };

  render() {
    const handleRowClick = (e, item, id) => {
      let editUrl =
        URLS.URLS.editModule +
        this.state.urlparams +
        "&roleID=" +
        item.moduleId;
      this.setState({ roleId: item.roleId, editurl: editUrl }, () => {
        getPageListByRoleId(item.roleId);
      });

      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const getPageListByRoleId = (roleId) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let data = APIURLS.GetRoleDetailByRoleIdData;
      data.validUser = ValidUser;
      data.RoleId = roleId;

      let GetRoleDetailByRoleIdUrl = APIURLS.APIURL.GetRoleDetailByRoleId;
      axios
        .post(GetRoleDetailByRoleIdUrl, data, { headers })
        .then((response) => {
          if (response.status === 200) {
            processPageData(response.data.roleDetailLists);
          } else {
          }
        })
        .catch((error) => {
          this.setState({ pages: [], ProgressLoader: true });
        });
    };

    const processPageData = (data) => {
      let rows = [];
      var i = 0,
        len = data.length;
      while (i < len) {
        let chkAll = true;
        if (
          data[i].isCreate === true &&
          data[i].isDelete === true &&
          data[i].isPrint === true &&
          data[i].isUpdate === true &&
          data[i].isView === true
        ) {
          chkAll = true;
        } else {
          chkAll = false;
        }
        let row = {
          id: data[i].pageId,
          pageId: data[i].pageId,
          pageName: data[i].pageName,
          pageLink: data[i].pageLink,
          moduleId: data[i].moduleID,
          moduleName: data[i].name,
          chkAll: chkAll,
          IsCreate: data[i].isCreate,
          IsUpdate: data[i].isUpdate,
          IsDelete: data[i].isDelete,
          IsView: data[i].isView,
          IsPrint: data[i].isPrint,
          isChecked: data[i].isChecked,
        };
        rows.push(row);
        i++;
      }
      this.setState({ pages: rows });
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.roles.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    };


    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />

        <div className="breadcrumb-height">
          <Grid container spacing={3}>
            <Grid
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                borderRightStyle: "solid",
                borderRightColor: "#bdbdbd",
                borderRightWidth: 1,
              }}
            >
              <div style={{ marginTop: 8 }}>
                <Breadcrumb
                  backOnClick={this.props.history.goBack}
                  linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                  linkTitle="Dashboard"
                  typoTitle="Role Master"
                  level={1}
                />
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <div style={{ marginLeft: 10, marginTop: 1 }}>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Action Menu Button group"
                >
                  <Button
                    className="action-btns"
                    startIcon={<AddIcon />}
                    onClick={(e) =>
                      openPage(URLS.URLS.addRole + this.state.urlparams)
                    }
                  >
                    {APIURLS.buttonTitle.add}
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) => openPage(this.state.editurl)}
                  >
                    {APIURLS.buttonTitle.edit}
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}>
                  {this.state.roles.length > 0 ? (
                    <Fragment>
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
                              Role Name
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                          {this.state.roles
                            ? this.state.roles.map((item, i) => (
                              <TableRow
                                id={"row_" + i}
                                className={this.state.initialCss}
                                hover
                                key={i}
                                onClick={(event) =>
                                  handleRowClick(event, item, "row_" + i)
                                }
                              >
                                <TableCell align="left">
                                  <a
                                    className="LINK tableLink"
                                    href={
                                      URLS.URLS.editModule +
                                      this.state.urlparams +
                                      "&roleID=" +
                                      item.moduleId
                                    }
                                  >
                                    {URLS.PREFIX.roleID + item.roleId}
                                  </a>
                                </TableCell>
                                <TableCell align="left">{item.name}</TableCell>
                              </TableRow>
                            ))
                            : null}
                        </TableBody>
                      </Table>
                    </Fragment>
                  ) : (
                    <Tableskeleton />
                  )}

                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <Grid style={{ marginTop: "40px" }} container spacing={0}>
                <Grid xs={12} sm={12} md={12} lg={12}>
                  <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11}>
                      <Assignrole
                        roleId={this.state.roleId}
                        rows={this.state.pages}

                      />
                    </Grid>
                  </Grid>

                  <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11}>
                      <div style={{ height: 100 }}>&nbsp;
                      </div>
                    </Grid>
                  </Grid>


                  {/* <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11}>
                      <Assignpagestorole
                        data={{
                          roleId: this.state.roleId,
                          rows: this.state.pages,
                        }}
                      />
                    </Grid>
                  </Grid> */}
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default rolemaster;
