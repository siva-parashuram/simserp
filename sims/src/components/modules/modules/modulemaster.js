import React, { Fragment } from "react";
import "../../user/dasboard.css";
import * as CF from "../../../services/functions/customfunctions";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import ButtonGroup from "@mui/material/ButtonGroup";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import TablePagination from "@mui/material/TablePagination";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import Addpage from "./addpage";
import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Pagination from "../../compo/paginationcomponent";
import BackdropLoader from "../../compo/backdrop";

class modulemasters extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: APIURLS.pagination.rowsPerPage,
      },
      page: 1,
      rowsPerPage: 10,
      initialCss: "",
      urlparams: "",
      ProgressLoader: false,
      modules: [],
      moduleId: null,
      pageLinkRow: [],
      editurl: null,
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getModules();
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

  getModules() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetModulesUrl = APIURLS.APIURL.GetModules;
    axios
      .post(GetModulesUrl, ValidUser, { headers })
      .then((response) => {
        console.log("getModules > response > ",response);
        if (response.status === 200) {
          let data = response.data;
          rows = data;
          this.setState({ modules: rows, ProgressLoader: true }, () => {
            if (rows.length > 0) {
              this.handleRowClick(null, rows[0], "row_0");
            }
          });
        } else {
          this.setState({ modules: [], ProgressLoader: true });
        }
      })
      .catch((error) => {
        console.log("getModules > error > ",error);
        this.setState({ modules: [], ProgressLoader: true });
      });
  }

   handleRowClick = (e, item, id) => {
    try {
      let editUrl =
        URLS.URLS.editModule +
        this.state.urlparams +
        "&moduleId=" +
        item.ModuleID;

      this.setState({ moduleId: item.ModuleID, editurl: editUrl });
      this.getPageList(item.ModuleID);

      this.removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    } catch (err) {}
  };

   removeIsSelectedRowClasses = () => {
    try {
      for (let i = 0; i < this.state.modules.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (err) {}
  };

   getPageList = (moduleId) => {
    console.log("getPageList > moduleId ",moduleId);
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const data = {
      validUser: ValidUser,
      page: {
        PageId: 0,
        ModuleId: moduleId,
        PageName: null,
        PageLink: null,
        Description: null,
      },
    };
    const headers = {
      "Content-Type": "application/json",
    };
    let GetPageByModuleIdUrl = APIURLS.APIURL.GetPageByModuleId;

    axios
      .post(GetPageByModuleIdUrl, data, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data.Pages;

          console.log("getPageList > moduleId > data > ",data);
          this.resetDataList(moduleId,data);
        } else {
        }
      })
      .catch((error) => {});
  };

   resetDataList = (moduleId,data) => {
    let rows = [];
    for (let i = 0; i < data.length; i++) {
      let r = {
        id: data[i].PageID,
        moduleId: moduleId,
        pageId: data[i].PageID,
        pageName: data[i].PageName,
        pageLink: data[i].PageLink,
        description: data[i].Description,
        PageType:data[i].PageType
      };
      rows.push(r);
    }

    this.setState({ pageLinkRow: rows });
  };

  render() {
   

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const handlePageChange = (event, newPage) => {
      this.removeIsSelectedRowClasses();
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Module"
          level={1}
        />
      </Fragment>
    );

    const buttongroupHtml = (
      <Fragment>
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="Action Menu Button group"
        >
          <Button
            className="action-btns"
            startIcon={APIURLS.buttonTitle.add.icon}
            onClick={(e) =>
              openPage(URLS.URLS.addModule + this.state.urlparams)
            }
          >
            {APIURLS.buttonTitle.add.name}
          </Button>
          <Button
            className="action-btns"
            startIcon={APIURLS.buttonTitle.edit.icon}
            onClick={(e) => openPage(this.state.editurl)}
          >
            {APIURLS.buttonTitle.edit.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <BackdropLoader open={!this.state.ProgressLoader} />
        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={10} lg={10}>
                {this.state.modules.length > 0 ? (
                  <Fragment>
                    <Table
                      stickyHeader
                      size="small"
                      className=""
                      aria-label="Country List table"
                    >
                      <TableHead className="table-header-background">
                        <TableRow>
                          <TableCell className="table-header-font">#</TableCell>
                          <TableCell className="table-header-font" align="left">
                            Name
                          </TableCell>
                          <TableCell className="table-header-font" align="left">
                            Description
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="tableBody">
                        {this.state.modules
                          ? getPageData(this.state.modules).map((item, i) => (
                              <TableRow
                                id={"row_" + i}
                                className={this.state.initialCss}
                                hover
                                key={i}
                                onClick={(event) =>
                                  this.handleRowClick(event, item, "row_" + i)
                                }
                              >
                                <TableCell align="left">
                                  {i+1}
                                </TableCell>
                                <TableCell align="left">{item.Name}</TableCell>
                                <TableCell align="left">
                                  {item.Description}
                                </TableCell>
                              </TableRow>
                            ))
                          : null}
                      </TableBody>
                    </Table>

                    <Pagination
                      data={this.state.modules}
                      pagination={this.state.pagination}
                      onPageChange={handlePageChange}
                    />
                  </Fragment>
                ) : (
                  <Tableskeleton />
                )}
              </Grid>
            </Grid>
          </Grid>

          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid style={{ marginTop: "20px" }} container spacing={1}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Addpage
                  data={{
                    moduleId: this.state.moduleId,
                    rows: this.state.pageLinkRow,
                  }}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default modulemasters;
