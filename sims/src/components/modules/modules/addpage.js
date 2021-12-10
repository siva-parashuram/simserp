import "../../user/dasboard.css";
import axios from "axios";
import React, { Fragment } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";

import TextboxInput from "../../compo/tablerowcelltextboxinput";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Dualtabcomponent from "../../compo/dualtabcomponent";
import BackdropLoader from "../../compo/backdrop";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";

let columns = [
  {
    field: "pageId",
    headerName: "#",
    width: 100,
  },
  {
    field: "pageName",
    headerName: "Page Name",
    width: 150,
    editable: true,
  },
  {
    field: "pageLink",
    headerName: "Page Link",
    width: 150,
    editable: true,
    filterable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 250,
    editable: true,
    filterable: true,
  },
  {
    field: "moduleId",
    headerName: "Module",
    width: 250,
  },
];

const rows = [];

class addpage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      updateBtnDisable: true,
      urlparams: "",
      showDetails: true,
      addNewPageSection: false,
      detailsUnderlineBtnCss: "btn-bottom-border-color",
      attachmentUnderlineBtnCss: "",
      ProgressLoader: true,
      columns: columns,
      rows: rows,
      isRowSelected: false,
      previousRowSelected: 0,
      pageName: null,
      pageLink: null,
      description: null,
      PageType: null,
      createBtnDisable: true,
      moduleId: null,
      ErrorPrompt: false,
      SuccessPrompt: false,
      GeneralDetailsExpanded: false,
      refreshPageLinkList: false,
      modules: [],
      rowsPerPageOptions: 5,
      pageSize: 5,
      Validations: {
        pageName: { errorState: false, errorMsg: "" },
        pageLink: { errorState: false, errorMsg: "" },
        description: { errorState: false, errorMsg: "" },
      },
    };
  }

  componentDidMount() {
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
      urlparams: urlparams,
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
        if (response.status === 200) {
          let data = response.data;
          rows = data;
          this.setState({ modules: rows, updateBtnDisable: false });
          this.updateColumns(rows);
        } else {
          this.setState({ modules: [], ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ modules: [], ProgressLoader: true });
      });
  }

  updateColumns(modules) {
    let columns = [
      {
        field: "pageId",
        headerName: "#",
        width: 100,
        headerClassName: "table-header-font",
      },
      {
        field: "pageName",
        headerName: "Page Name",
        width: 180,
        editable: true,
        headerClassName: "table-header-font",
      },
      {
        field: "pageLink",
        headerName: "Page Link",
        width: 180,
        cellClassName: "pageLink-css",
        editable: true,
        filterable: true,
        headerClassName: "table-header-font",
      },
      {
        field: "moduleId",
        headerName: "Module",
        width: 150,
        headerClassName: "table-header-font",
        renderCell: (params) => (
          <Fragment>
            <select
              className="dropdown-css"
              defaultValue={params.value}
              onChange={(e) => this.handleDropdownChange(e, params)}
            >
              {modules.map((item, i) => (
                <option value={item.ModuleID}> {item.Name}</option>
              ))}
            </select>
          </Fragment>
        ),
      },
      {
        field: "description",
        headerName: "Description",
        width: 320,
        headerClassName: "table-header-font",
        editable: true,
        filterable: true,
      },
    ];

    this.setState({ columns: columns });
    this.setState({ ProgressLoader: true });
  }

  handleDropdownChange(e, params) {
    this.setState({ ProgressLoader: false });

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let PageId = parseInt(params.id);
    let moduleId = this.props.data.moduleId;
    let page = APIURLS.page;
    page.PageId = PageId;
    page.ModuleId = parseInt(e.target.value);

    const data = APIURLS.UpdateModuleIdByPageID;
    data.validUser = ValidUser;
    data.page = page;

    const headers = {
      "Content-Type": "application/json",
    };
    let UpdateModuleIdByPageIDUrl = APIURLS.APIURL.UpdateModuleIdByPageID;
    axios
      .post(UpdateModuleIdByPageIDUrl, data, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          this.refreshPageListByModuleId(moduleId);
          this.setState({ ProgressLoader: true });
        } else {
        }
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  refreshPageListByModuleId(moduleId) {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let page = APIURLS.page;
    page.PageId = 0;
    page.ModuleId = moduleId;

    const data = APIURLS.UpdateModuleIdByPageID;
    data.validUser = ValidUser;
    data.page = page;

    const headers = {
      "Content-Type": "application/json",
    };
    let GetPageByModuleIdUrl = APIURLS.APIURL.GetPageByModuleId;
    axios
      .post(GetPageByModuleIdUrl, data, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;

          this.refreshDataList(data);
          let rows = data;
          this.setState({ ProgressLoader: true });
        } else {
        }
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  refreshDataList(data) {
    this.setState({ ProgressLoader: false });
    let rows = [];
    for (let i = 0; i < data.length; i++) {
      let r = {
        id: data[i].pageId,
        pageId: URLS.PREFIX.pageID + data[i].pageId,
        pageName: data[i].pageName,
        pageLink: data[i].pageLink,
        description: data[i].description,
      };
      rows.push(r);
    }
    this.props.data.rows = rows;
  }

  processResetData(data) { }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editModule +
      this.state.urlparams +
      "&moduleId=" +
      item.moduleId;
    let previousRowSelected = this.state.previousRowSelected;
    if (parseInt(previousRowSelected) != parseInt(e.id)) {
      this.setState({ isRowSelected: true, previousRowSelected: item });
    }
    this.setState({ editurl: editUrl });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.modules.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  render() {
    const handleRowClick = (e) => {
      let previousRowSelected = this.state.previousRowSelected;

      if (parseInt(previousRowSelected) != parseInt(e.id)) {
        this.setState({ isRowSelected: true, previousRowSelected: e.id });
      } else {
        this.setState({ isRowSelected: false, previousRowSelected: e.id });
      }
    };



    const onEditRowsModelChange = (e) => {
      var keys = Object.keys(e);
      if (keys.length === 0) {
      } else {
        let rowID = parseInt(keys[0]);
        let data = e[keys[0]];
        var DataKeys = Object.keys(data);
        let col = DataKeys[0];
        let colEditValue = data[col].value;
        if (col === "pageName") {
          processUpdateData(rowID, col, colEditValue);
        }
        if (col === "pageLink") {
          processUpdateData(rowID, col, colEditValue);
        }
        if (col === "description") {
          processUpdateData(rowID, col, colEditValue);
        }
      }
    };

    const processUpdateData = (rowID, col, colEditValue) => {
      let rows = this.props.data.rows;
      let moduleId = this.props.data.moduleId;

      for (let i = 0; i < rows.length; i++) {
        if (rows[i].id === rowID) {
          rows[i][col] = colEditValue;
          rows[i]["moduleId"] = moduleId;
        }
      }
      this.props.data.rows = rows;
      this.setState({ rows: rows, updateBtnDisable: false });
    };

    const handleUpdate = () => {
      this.setState({ ProgressLoader: false });
      let rows = this.state.rows;
      let moduleId = this.props.data.moduleId;
      let page = [];
      for (let i = 0; i < rows.length; i++) {
        let p = {
          PageId: rows[i].id,
          ModuleId: rows[i].moduleId,
          PageName: rows[i].pageName,
          PageLink: rows[i].pageLink,
          Description: rows[i].description,
        };
        page.push(p);
      }

      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        pageLists: page,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateUrl = APIURLS.APIURL.UpdatePageByModuleIdAndPageID;

      axios
        .post(UpdateUrl, data, { headers })
        .then((response) => {
          let data = response.data;

          this.setState({ updateBtnDisable: true }, () => {
            getPageListByModuleId(moduleId);
          });
          this.setState({ ProgressLoader: true });
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true });
        });
    };

    const updateFormValue = (id, e) => {
      if (id === "pageName") {
        if (e.target.value === "" || e.target.value.length > 20) {
          let Validations = this.state.Validations;
          if (e.target.value === "") {
            Validations.pageName = {
              errorState: true,
              errorMsg: "Pagename cannot be blank",
            };
            this.setState({
              createBtnDisable: true,
              Validations: Validations,
              pageName: e.target.value,
            });
          }
          if (e.target.value.length > 20) {
            Validations.pageName = {
              errorState: true,
              errorMsg: "Maximum 20 characters Allowed!",
            };
            this.setState({
              createBtnDisable: true,
              Validations: Validations,
            });
          }
        } else {
          let Validations = this.state.Validations;
          Validations.pageName = { errorState: false, errorMsg: "" };
          this.setState({
            pageName: e.target.value,
            Validations: Validations,
            createBtnDisable: false,
          });
        }
      }
      if (id === "pageLink") {
        if (e.target.value === "" || e.target.value.length > 100) {
          let Validations = this.state.Validations;
          if (e.target.value === "" || e.target.value === null) {
            Validations.pageLink = {
              errorState: true,
              errorMsg: "Blank inputs not allowed!",
            };
            this.setState({
              pageLink: e.target.value,
              Validations: Validations,
            });
          }
          if (e.target.value.length > 100) {
            Validations.pageLink = {
              errorState: true,
              errorMsg: "Maximum 100 characters Allowed!",
            };
            this.setState({ Validations: Validations });
          }
        } else {
          let Validations = this.state.Validations;
          Validations.pageLink = { errorState: false, errorMsg: "" };
          this.setState({ pageLink: e.target.value, Validations: Validations });
        }
      }
      if (id === "description") {
        let Validations = this.state.Validations;

        if (e.target.value.length > 50) {
          Validations.description = {
            errorState: true,
            errorMsg: "Maximum 50 characters Allowed!",
          };
          this.setState({
            Validations: Validations,
          });
        } else {
          let Validations = this.state.Validations;
          Validations.description = { errorState: false, errorMsg: "" };
          this.setState({
            description: e.target.value,
            Validations: Validations,
          });
        }
      }
      if (id == "PageType") {
        this.setState({ PageType: e.target.value });
      }

    };

    const enableCreateBtn = () => {
      if (
        (this.state.pageName !== "" || this.state.pageName != null) &&
        (this.state.pageLink !== "" || this.state.pageLink != null)
      ) {
        this.setState({ createBtnDisable: true });
        if (this.state.pageName != null && this.state.pageLink != null) {
          if (this.state.pageName.length > 20 || this.state.pageName !== "") {
            this.setState({ createBtnDisable: true });
          } else if (
            this.state.pageLink.length > 100 ||
            this.state.pageLink !== ""
          ) {
            this.setState({ createBtnDisable: true });
          } else {
            this.setState({ createBtnDisable: false });
          }
        } else {
          this.setState({ createBtnDisable: false });
        }
      }
    };

    const handlecreate = (moduleId) => {
      this.setState({ ProgressLoader: false });
      if (
        (this.state.pageName !== "" || this.state.pageName != null) &&
        (this.state.pageLink !== "" || this.state.pageLink != null)
      ) {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const data = {
          validUser: ValidUser,
          page: {
            PageId: 0,
            ModuleId: moduleId,
            PageName: this.state.pageName,
            PageLink: this.state.pageLink,
            Description: this.state.description,
            PageType: parseInt(this.state.PageType)
          },
        };
        const headers = {
          "Content-Type": "application/json",
        };
        let CreatePageUrl = APIURLS.APIURL.CreatePage;

        axios
          .post(CreatePageUrl, data, { headers })
          .then((response) => {
            if (response.status === 201 || response.status === 200 || response.data === true || response.data === "true") {
              getPageListByModuleId(moduleId);
              this.setState({
                pageName: null,
                pageLink: null,
                description: null,
                PageType: null,
                ProgressLoader: true,
                SuccessPrompt: true
              });
            }



          })
          .catch((error) => {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          });
      }
    };

    const getPageListByModuleId = (moduleId) => {
      this.setState({ ProgressLoader: false });
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
            let data = response.data;
            resetDataList(data);
          } else {
          }
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true });
        });
    };

    const resetDataList = (data) => {
      let rows = [];
      for (let i = 0; i < data.length; i++) {
        let r = {
          id: data[i].pageId,
          pageId: URLS.PREFIX.pageID + data[i].pageId,
          pageName: data[i].pageName,
          pageLink: data[i].pageLink,
          description: data[i].description,
        };
        rows.push(r);
      }
      this.props.data.rows = rows;
      this.setState({ ProgressLoader: true });
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

    const customTabButton = (e, params) => {
      if (params === "details") {
        this.setState({
          showDetails: true,
          addNewPageSection: false,
          detailsUnderlineBtnCss: "btn-bottom-border-color",
          attachmentUnderlineBtnCss: "",
        });
      }
      if (params === "addNewPage") {
        this.setState({
          showDetails: false,
          addNewPageSection: true,
          attachmentUnderlineBtnCss: "btn-bottom-border-color",
          detailsUnderlineBtnCss: "",
        });
      }
    };

    const tab1Html = (
      <Fragment>

        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <div style={{ marginLeft: 10 }}>
              <Grid container spacing={0}>
                <Grid xs={8} sm={8} md={8} lg={8}>
                  <Button
                    className="action-btns"
                    startIcon={APIURLS.buttonTitle.save.icon}
                    style={{ marginLeft: 10, marginTop: 20 }}
                    disabled={this.state.updateBtnDisable}
                    onClick={handleUpdate}
                  >
                    {APIURLS.buttonTitle.save.name}
                  </Button>
                </Grid>
              </Grid>
              <div style={{ height: 20 }}></div>
              <Grid container spacing={0}>
                <Grid xs={11} sm={11} md={11} lg={11}>
                  <div style={{ height: 400, width: "100%" }}>
                    {this.state.refreshPageLinkList ? (
                      <DataGrid
                        rows={this.state.rows}
                        columns={this.state.columns}
                        pageSize={this.state.pageSize}
                        rowsPerPageOptions={[this.state.rowsPerPageOptions]}
                        onEditRowsModelChange={(e) => {
                          onEditRowsModelChange(e);
                        }}
                      />
                    ) : (
                      <Fragment>
                        <DataGrid
                          rows={this.props.data.rows}
                          columns={this.state.columns}
                          pageSize={this.state.pageSize}
                          rowsPerPageOptions={[this.state.rowsPerPageOptions]}
                          onEditRowsModelChange={(e) => {
                            onEditRowsModelChange(e);
                          }}
                        />
                      </Fragment>
                    )}
                  </div>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>


      </Fragment>
    );

    const tab2Html = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <div style={{ marginLeft: 60 }}>
              <Grid container spacing={0}>
                <Grid xs={8} sm={8} md={8} lg={8}>
                  <Button
                    className="action-btns"
                    startIcon={APIURLS.buttonTitle.save.icon}
                    style={{ marginLeft: 5 }}
                    onClick={(e) => {
                      handlecreate(this.props.data.moduleId);
                    }}
                    disabled={this.state.createBtnDisable}
                  >
                    {APIURLS.buttonTitle.save.name}
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Grid>
        </Grid>

        <div style={{ height: 30 }}></div>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={11} lg={11}>
            <div style={{ backgroundColor: '#fff' }}>
              <div style={{ height: 20 }}></div>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <SIB
                    id="pageName"
                    label="Page Name"
                    variant="outlined"
                    size="small"
                    onChange={(e) => updateFormValue("pageName", e)}
                    fullWidth
                    error={this.state.Validations.pageName.errorState}
                  />
                  <SIB
                    id="pageLink"
                    label="Page Link"
                    variant="outlined"
                    size="small"
                    onChange={(e) => updateFormValue("pageLink", e)}
                    fullWidth
                    value={this.state.pageLink}
                    error={this.state.Validations.pageLink.errorState}
                  />
                  <SIB
                    id="description"
                    label="Description"
                    variant="outlined"
                    size="small"
                    onChange={(e) => updateFormValue("description", e)}
                    fullWidth
                    value={this.state.description}
                    error={this.state.Validations.description.errorState}
                    maxlength={20}
                  />
                  <SDIB
                    id="PageType"
                    label="Page Type"
                    size="small"
                    onChange={(e) => updateFormValue("PageType", e)}
                    value={this.state.PageType}
                    param={APIURLS.PageType}
                  />
                </Grid>
              </Grid>

              <div style={{ height: 20 }}></div>
            </div>
          </Grid>
        </Grid>

      </Fragment>
    );

    return (
      <Fragment>
        {this.props.data ? (
          <div style={{ marginTop: -30 }}>
            <BackdropLoader open={!this.state.ProgressLoader} />
            <ErrorSnackBar
              ErrorPrompt={this.state.ErrorPrompt}
              closeErrorPrompt={closeErrorPrompt}
            />
            <SuccessSnackBar
              SuccessPrompt={this.state.SuccessPrompt}
              closeSuccessPrompt={closeSuccessPrompt}
            />
            <div style={{ height: 20 }}></div>

            <Dualtabcomponent
              tab1name="Details"
              tab2name="Create Page"
              tab1Html={tab1Html}
              tab2Html={tab2Html}
            />
          </div>
        ) : null}
      </Fragment>
    );
  }
}

export default addpage;
