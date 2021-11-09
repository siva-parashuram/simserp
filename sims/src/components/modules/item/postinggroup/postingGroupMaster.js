import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";

import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Loader from "../../../compo/loader";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";

class postingGroupMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      IPGpagination: {
        page: 0,
        rowsPerPage: 10,
      },
      GPGpagination: {
        page: 0,
        rowsPerPage: 10,
      },
      urlparams: "",
      ProgressLoader: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      editurl: "",
      accordion1: false,
      accordion2: false,
      accordion3: false,
      accordion4: false,
      accordion5: false,
      accordion6: false,
      accordion7: false,
      COAList:[],
      ItemPostingGroupList: [],
      selectedItemPostingGroupList: [],
      GeneralPostingGroupList: [],
      selectedGeneralPostingGroupList: [],
      ItemPostingGroup: {
        ItemPostingGroupID: 0,
        Code: "",
        Description: "",
      },
      GeneralPostingGroup: {
        GeneratPostingGroupID: 0,
        Code: "",
        Description: "",
      },
      Validations: {
        ItemPostingGroup: {
          Code: { errorState: false, errorMssg: "" },
          Description: { errorState: false, errorMssg: "" },
        },
        GeneralPostingGroup: {
          Code: { errorState: false, errorMssg: "" },
          Description: { errorState: false, errorMssg: "" },
        },
      },
    };
  }

  componentDidMount() {
    this.getCOAList();
    this.getAllItemPostingGroup();
    this.getAllGeneralPostingGroup();
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

  getCOAList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Url = APIURLS.APIURL.GetChartOfAccounts;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD=[];
        for(let i=0;i<data.length;i++){
          if(data[i].ACType===0){
            let o={
              name:data[i].Name,
              value:data[i].CAcID
            };
            newD.push(o);
          }
        }

        this.setState({ COAList: newD });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => { });
  }

  getAllItemPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllItemPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ ItemPostingGroupList: data });
      })
      .catch((error) => {});
  };

  getAllGeneralPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllGeneralPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ GeneralPostingGroupList: data });
      })
      .catch((error) => {});
  };

  render() {
    const updateFormValue = (parent, key, e) => {
      let stateParent = {};
      switch (parent) {
        case "ItemPostingGroup":
          switch (key) {
            case "Code":
              stateParent = this.state.ItemPostingGroup;

              let v1 = this.state.Validations;
              if (e.target.value.length > 20) {
                v1.ItemPostingGroup.Code = {
                  errorState: true,
                  errorMssg: "Maximum 20 characters allowed",
                };
                this.setState({ Validations: v1 });
              } else {
                v1.ItemPostingGroup.Code = { errorState: false, errorMssg: "" };
                this.setState({ Validations: v1 });
                stateParent[key] = e.target.value;
                setStateParam({}, parent, stateParent);
              }

              break;
            case "Description":
              stateParent = this.state.ItemPostingGroup;
              let v2 = this.state.Validations;
              if (e.target.value.length > 50) {
                v2.ItemPostingGroup.Description = {
                  errorState: true,
                  errorMssg: "Maximum 50 characters allowed",
                };
                this.setState({ Validations: v2 });
              } else {
                v2.ItemPostingGroup.Description = {
                  errorState: false,
                  errorMssg: "",
                };
                this.setState({ Validations: v2 });
                stateParent[key] = e.target.value;
                setStateParam({}, parent, stateParent);
              }

              break;
            default:
              break;
          }
          break;
        case "GeneralPostingGroup":
          switch (key) {
            case "Code":
              stateParent = this.state.GeneralPostingGroup;
              let v1 = this.state.Validations;
              if (e.target.value.length > 20) {
                v1.GeneralPostingGroup.Code = {
                  errorState: true,
                  errorMssg: "Maximum 20 characters allowed",
                };
                this.setState({ Validations: v1 });
              } else {
                v1.GeneralPostingGroup.Code = {
                  errorState: false,
                  errorMssg: "",
                };
                this.setState({ Validations: v1 });
                stateParent[key] = e.target.value;
                setStateParam({}, parent, stateParent);
              }

              break;
            case "Description":
              stateParent = this.state.GeneralPostingGroup;
              let v2 = this.state.Validations;
              if (e.target.value.length > 50) {
                v2.GeneralPostingGroup.Description = {
                  errorState: true,
                  errorMssg: "Maximum 50 characters allowed",
                };
                this.setState({ Validations: v2 });
              } else {
                v2.GeneralPostingGroup.Description = {
                  errorState: false,
                  errorMssg: "",
                };
                this.setState({ Validations: v2 });
                stateParent[key] = e.target.value;
                setStateParam({}, parent, stateParent);
              }

              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
    };

    const setStateParam = (validations, key, value) => {
      console.log("validations > ", validations);
      console.log("key > ", key);
      console.log("value > ", value);
      if (
        Object.keys(validations).length === 0 &&
        validations.constructor === Object
      ) {
        console.log("validations is Empty ");
        this.setState({ [key]: value });
      } else {
        if (validations.validate) {
          !validations.isEmpty
            ? validations.isNumber
              ? this.setState({ [key]: value })
              : this.setState({ [key]: 0 })
            : this.setState({ [key]: 0 });
        } else {
          this.setState({ [key]: value });
        }
      }
    };

    const createItemPostingGroup = (e) => {
      let ItemPostingGroup = this.state.ItemPostingGroup;
      let Code = ItemPostingGroup.Code.trim();
      let Description = ItemPostingGroup.Description.trim();
      console.log("createItemPostingGroup > Code > ", Code);
      console.log("createItemPostingGroup > Description > ", Description);
      if (Code === "" || Description === "") {
        alert("Empty data found");
      } else {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
          "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.CreateItemPostingGroup;
        let reqData = {
          validUser: ValidUser,
          ItemPostingGroup: this.state.ItemPostingGroup,
        };
        console.log("createItemPostingGroup > reqData > ", reqData);
        axios
          .post(Url, reqData, { headers })
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              let ItemPostingGroup = {
                ItemPostingGroupID: 0,
                Code: "",
                Description: "",
              };
              let data = response.data;
              console.log("data > ", data);
              this.setState({
                ProgressLoader: true,
                SuccessPrompt: true,
                ItemPostingGroup: ItemPostingGroup,
              });
              this.getAllItemPostingGroup();
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
            }
          })
          .catch((error) => {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          });
      }
    };

    const createGeneralPostingGroup = (e) => {
      let GeneralPostingGroup = this.state.GeneralPostingGroup;
      let Code = GeneralPostingGroup.Code.trim();
      let Description = GeneralPostingGroup.Description.trim();
      console.log("createGeneralPostingGroup > Code > ", Code);
      console.log("createGeneralPostingGroup > Description > ", Description);
      if (Code === "" || Description === "") {
        alert("Empty data found");
      } else {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
          "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.CreateGeneralPostingGroup;
        let reqData = {
          validUser: ValidUser,
          GeneralPostingGroup: this.state.GeneralPostingGroup,
        };
        console.log("createGeneralPostingGroup > reqData > ", reqData);
        axios
          .post(Url, reqData, { headers })
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              let GeneralPostingGroup = {
                ItemPostingGroupID: 0,
                Code: "",
                Description: "",
              };
              let data = response.data;
              console.log("data > ", data);
              this.setState({
                ProgressLoader: true,
                SuccessPrompt: true,
                GeneralPostingGroup: GeneralPostingGroup,
              });
              this.getAllGeneralPostingGroup();
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
            }
          })
          .catch((error) => {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          });
      }
    };

    const updateItemPostingGroup = (e) => {
      if (this.state.selectedItemPostingGroupList.length > 0) {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
          "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.UpdateItemPostingGroup;
        let reqData = {
          validUser: ValidUser,
          ItemPostingGroupList: this.state.selectedItemPostingGroupList,
        };
        console.log("updateItemPostingGroup > reqData > ", reqData);
        axios
          .post(Url, reqData, { headers })
          .then((response) => {
            let data = response.data;
            if (response.status === 200 || response.status === 201) {
              this.setState({
                selectedItemPostingGroupList: [],
                ProgressLoader: true,
                SuccessPrompt: true,
              });
              this.getAllItemPostingGroup();
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
            }
          })
          .catch((error) => {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          });
      }
    };

    const updateGeneralPostingGroup = (e) => {
      if (this.state.selectedGeneralPostingGroupList.length > 0) {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
          "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.UpdateGeneralPostingGroup;
        let reqData = {
          validUser: ValidUser,
          GeneralPostingGroupList: this.state.selectedGeneralPostingGroupList,
        };
        console.log("updateItemPostingGroup > reqData > ", reqData);
        axios
          .post(Url, reqData, { headers })
          .then((response) => {
            let data = response.data;
            if (response.status === 200 || response.status === 201) {
              this.setState({
                selectedGeneralPostingGroupList: [],
                ProgressLoader: true,
                SuccessPrompt: true,
              });
              this.getAllGeneralPostingGroup();
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
            }
          })
          .catch((error) => {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          });
      }
    };

    const updateGeneralPostingGroupSetup = (e) => {};

    const removeOldIfExist = (parent, item, stateArray) => {
      let newArray = [];
      if (parent === "ItemPostingGroupList") {
        for (let i = 0; i < stateArray.length; i++) {
          if (stateArray[i].ItemPostingGroupID === item.ItemPostingGroupID) {
          } else {
            newArray.push(stateArray[i]);
          }
        }
      }
      if (parent === "GeneralPostingGroupList") {
        for (let i = 0; i < stateArray.length; i++) {
          if (
            stateArray[i].GeneralPostingGroupID === item.GeneralPostingGroupID
          ) {
          } else {
            newArray.push(stateArray[i]);
          }
        }
      }
      return newArray;
    };

    const updateList = (parent, key, item, e) => {
      switch (parent) {
        case "ItemPostingGroupList":
          let selectedItemPostingGroupList =
            this.state.selectedItemPostingGroupList;
          if (selectedItemPostingGroupList.length > 0) {
            selectedItemPostingGroupList = removeOldIfExist(
              "ItemPostingGroupList",
              item,
              selectedItemPostingGroupList
            );
            item[key] = e.target.value;
            selectedItemPostingGroupList.push(item);
          } else {
            item[key] = e.target.value;
            selectedItemPostingGroupList.push(item);
          }
          this.setState({
            selectedItemPostingGroupList: selectedItemPostingGroupList,
          });
          break;
        case "GeneralPostingGroupList":
          let selectedGeneralPostingGroupList =
            this.state.selectedGeneralPostingGroupList;
          if (selectedGeneralPostingGroupList.length > 0) {
            selectedGeneralPostingGroupList = removeOldIfExist(
              "GeneralPostingGroupList",
              item,
              selectedGeneralPostingGroupList
            );
            item[key] = e.target.value;
            selectedGeneralPostingGroupList.push(item);
          } else {
            item[key] = e.target.value;
            selectedGeneralPostingGroupList.push(item);
          }
          this.setState({
            selectedGeneralPostingGroupList: selectedGeneralPostingGroupList,
          });
          break;
        default:
          break;
      }
    };

    const processDropdownList = (type, array) => {
      let returnArray = [];
      if (type === "GeneralPostingGroupID") {
        for (let i = 0; i < array.length; i++) {
          let o = {
            name: array[i].Code,
            value: array[i].GeneralPostingGroupID,
          };
          returnArray.push(o);
        }
      }
      if (type === "ItemPostingGroupID") {
        for (let i = 0; i < array.length; i++) {
          let o = {
            name: array[i].Code,
            value: array[i].ItemPostingGroupID,
          };
          returnArray.push(o);
        }
      }
      console.log("processDropdownList > returnArray > ", returnArray);
      return returnArray;
    }

    const handleIPGPageChange = (event, newPage) => {
      let IPGpagination = this.state.IPGpagination;
      IPGpagination.page = newPage;
      this.setState({ IPGpagination: IPGpagination });
    };
    const handleGPGPageChange = (event, newPage) => {
      let IPGpagination = this.state.IPGpagination;
      IPGpagination.page = newPage;
      this.setState({ IPGpagination: IPGpagination });
    };

    const getIPGPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.IPGpagination.page);
      let rowsPerPage = parseInt(this.state.IPGpagination.rowsPerPage);
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };



    const tableItemPostingGroup = (
      <Fragment>
        <Grid container spacing={0} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              style={{ marginLeft: 5 }}
              onClick={(e) => updateItemPostingGroup(e)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Table
              stickyHeader
              size="small"
              className=""
              aria-label="Item-catagory List table"
              style={{ marginTop: 20 }}
            >
              <TableHead className="table-header-background">
                <TableRow>
                  <TableCell className="table-header-font">#</TableCell>
                  <TableCell className="table-header-font" align="left">
                    Code
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tableBody">
                {this.state.ItemPostingGroupList.length > 0
                  ? getIPGPageData(this.state.ItemPostingGroupList).map(
                      (item, i) => (
                        <TableRow>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell align="left">
                            <Inputcustom
                              id={
                                "itemPostingGroup_code_" +
                                item.ItemPostingGroupID
                              }
                              defaultValue={item.Code}
                              onKeyUp={(e) =>
                                updateList(
                                  "ItemPostingGroupList",
                                  "Code",
                                  item,
                                  e
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Inputcustom
                              id={
                                "itemPostingGroup_description_" +
                                item.ItemPostingGroupID
                              }
                              defaultValue={item.Description}
                              onKeyUp={(e) =>
                                updateList(
                                  "ItemPostingGroupList",
                                  "Description",
                                  item,
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
            <TablePagination
              rowsPerPageOptions={[this.state.IPGpagination.rowsPerPage]}
              component="div"
              count={this.state.ItemPostingGroupList.length}
              rowsPerPage={this.state.IPGpagination.rowsPerPage}
              page={this.state.IPGpagination.page}
              onPageChange={handleIPGPageChange}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
    const tableGeneralPostingGroup = (
      <Fragment>
        <Grid container spacing={0} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              style={{ marginLeft: 5 }}
              onClick={(e) => updateGeneralPostingGroup(e)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Table
              stickyHeader
              size="small"
              className=""
              aria-label="PostingGroup List table"
            >
              <TableHead className="table-header-background">
                <TableRow>
                  <TableCell className="table-header-font">#</TableCell>
                  <TableCell className="table-header-font" align="left">
                    Code
                  </TableCell>
                  <TableCell className="table-header-font" align="left">
                    Description
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tableBody">
                {this.state.GeneralPostingGroupList.length > 0
                  ? getIPGPageData(this.state.GeneralPostingGroupList).map(
                      (item, i) => (
                        <TableRow>
                          <TableCell>{i + 1}</TableCell>
                          <TableCell align="left">
                            <Inputcustom
                              id={
                                "GeneralPostingGroup_code_" +
                                item.GeneralPostingGroupID
                              }
                              defaultValue={item.Code}
                              onKeyUp={(e) =>
                                updateList(
                                  "GeneralPostingGroupList",
                                  "Code",
                                  item,
                                  e
                                )
                              }
                            />
                          </TableCell>
                          <TableCell align="left">
                            <Inputcustom
                              id={
                                "GeneralPostingGroup_description_" +
                                item.GeneralPostingGroupID
                              }
                              defaultValue={item.Description}
                              onKeyUp={(e) =>
                                updateList(
                                  "GeneralPostingGroupList",
                                  "Description",
                                  item,
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
            <TablePagination
              rowsPerPageOptions={[this.state.GPGpagination.rowsPerPage]}
              component="div"
              count={this.state.GeneralPostingGroupList.length}
              rowsPerPage={this.state.GPGpagination.rowsPerPage}
              page={this.state.GPGpagination.page}
              onPageChange={handleGPGPageChange}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
    const tableGeneralPostingGroupSetup = (
      <Fragment>
        <Grid container spacing={0} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              style={{ marginLeft: 5 }}
              onClick={(e) => updateGeneralPostingGroupSetup(e)}
            >
              Update
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Table
              stickyHeader
              size="small"
              className=""
              aria-label="PostingGroup List table"
            >
              <TableHead className="table-header-background">
                <TableRow>
                  <TableCell className="table-header-font">#</TableCell>
                  <TableCell className="table-header-font" align="left">
                    Name
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody className="tableBody"></TableBody>
            </Table>
          </Grid>
        </Grid>
      </Fragment>
    );
    const tableSupplierPostingGroup = (
      <Table
        stickyHeader
        size="small"
        className=""
        aria-label="PostingGroup List table"
      >
        <TableHead className="table-header-background">
          <TableRow>
            <TableCell className="table-header-font">#</TableCell>
            <TableCell className="table-header-font" align="left">
              Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody"></TableBody>
      </Table>
    );
    const tableSupplierBranchMapping = (
      <Table
        stickyHeader
        size="small"
        className=""
        aria-label="PostingGroup List table"
      >
        <TableHead className="table-header-background">
          <TableRow>
            <TableCell className="table-header-font">#</TableCell>
            <TableCell className="table-header-font" align="left">
              Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody"></TableBody>
      </Table>
    );
    const tableCustomerPostingGroup = (
      <Table
        stickyHeader
        size="small"
        className=""
        aria-label="PostingGroup List table"
      >
        <TableHead className="table-header-background">
          <TableRow>
            <TableCell className="table-header-font">#</TableCell>
            <TableCell className="table-header-font" align="left">
              Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody"></TableBody>
      </Table>
    );
    const tableCustomerBranchMapping = (
      <Table
        stickyHeader
        size="small"
        className=""
        aria-label="PostingGroup List table"
      >
        <TableHead className="table-header-background">
          <TableRow>
            <TableCell className="table-header-font">#</TableCell>
            <TableCell className="table-header-font" align="left">
              Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody"></TableBody>
      </Table>
    );

    const formItemPostingGroup = (
      <Grid container spacing={0} style={{ marginTop: 20 }}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button
            style={{ marginLeft: 5 }}
            onClick={(e) => createItemPostingGroup(e)}
          >
            Create
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={7} lg={7}>
          <TableContainer>
            <Table
              stickyHeader
              size="small"
              className="accordion-table"
              aria-label="PostingGroup List table"
            >
              <TableBody className="tableBody">
                <TextboxInput
                  id="codeItemPostingGroup"
                  label="Code"
                  variant="outlined"
                  size="small"
                  value={this.state.ItemPostingGroup.Code}
                  onChange={(e) =>
                    updateFormValue("ItemPostingGroup", "Code", e)
                  }
                  error={
                    this.state.Validations.ItemPostingGroup.Code.errorState
                  }
                  helperText={
                    this.state.Validations.ItemPostingGroup.Code.errorMssg
                  }
                />
                <TextboxInput
                  id="descriptionItemPostingGroup"
                  label="Description"
                  variant="outlined"
                  size="small"
                  value={this.state.ItemPostingGroup.Description}
                  onChange={(e) =>
                    updateFormValue("ItemPostingGroup", "Description", e)
                  }
                  error={
                    this.state.Validations.ItemPostingGroup.Description
                      .errorState
                  }
                  helperText={
                    this.state.Validations.ItemPostingGroup.Description
                      .errorMssg
                  }
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );

    const formGeneralPostingGroup = (
      <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button
            style={{ marginLeft: 5 }}
            onClick={(e) => createGeneralPostingGroup(e)}
          >
            Create
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <TableContainer>
            <Table
              stickyHeader
              size="small"
              className="accordion-table"
              aria-label="PostingGroup List table"
            >
              <TableBody className="tableBody">
                <TextboxInput
                  id="codeGeneralPostingGroup"
                  label="Code"
                  variant="outlined"
                  size="small"
                  value={this.state.GeneralPostingGroup.Code}
                  onChange={(e) =>
                    updateFormValue("GeneralPostingGroup", "Code", e)
                  }
                  error={
                    this.state.Validations.GeneralPostingGroup.Code.errorState
                  }
                  helperText={
                    this.state.Validations.GeneralPostingGroup.Code.errorMssg
                  }
                />
                <TextboxInput
                  id="descriptionGeneralPostingGroup"
                  label="Description"
                  variant="outlined"
                  size="small"
                  value={this.state.GeneralPostingGroup.Description}
                  onChange={(e) =>
                    updateFormValue("GeneralPostingGroup", "Description", e)
                  }
                  error={
                    this.state.Validations.GeneralPostingGroup.Description
                      .errorState
                  }
                  helperText={
                    this.state.Validations.GeneralPostingGroup.Description
                      .errorMssg
                  }
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
    const formGeneralPostingGroupSetup = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button style={{ marginLeft: 5 }} onClick={(e) => {}}>
              Create
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <TableContainer>
            <Table
              stickyHeader
              size="small"
              className="accordion-table"
              aria-label="PostingGroup List table"
            >
              <TableBody className="tableBody">
                {console.log("processDropdownList > GeneralPostingGroupSetup > ",processDropdownList("GeneralPostingGroupSetup",this.state.GeneralPostingGroupList))}
                <DropdownInput
                  id="GeneralPostingGroupID"
                  label="General Posting GroupID"
                  onChange={(e) => updateFormValue("GeneralPostingGroupSetup","GeneralPostingGroupID", e)}
                  options={processDropdownList("GeneralPostingGroupID",this.state.GeneralPostingGroupList)}
                />
                <DropdownInput
                  id="ItemPostingGroupID"
                  label="Item Posting GroupID"
                  onChange={(e) => updateFormValue("GeneralPostingGroupSetup","ItemPostingGroupID", e)}
                  options={processDropdownList("ItemPostingGroupID",this.state.ItemPostingGroupList)}
                />

                <DropdownInput
                  id="SalesAccount"
                  label="Sales Account"
                  // onChange={(e) => updateFormValue("SalesAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="SalesCNAccount"
                  label="SalesCNAccount"
                  // onChange={(e) => updateFormValue("SalesCNAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="SalesDNAccount"
                  label="SalesDNAccount"
                  // onChange={(e) => updateFormValue("SalesDNAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="PurchaseAccount"
                  label="Purchase Account"
                  // onChange={(e) => updateFormValue("PurchaseAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="PurchaseCNAccount"
                  label="PurchaseCNAccount"
                  // onChange={(e) => updateFormValue("PurchaseCNAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="PurchaseDNAccount"
                  label="PurchaseDNAccount"
                  // onChange={(e) => updateFormValue("PurchaseDNAccount", e)}
                  options={this.state.COAList}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
    const formSupplierPostingGroup = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button style={{ marginLeft: 5 }} onClick={(e) => {}}>
              Create
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <TableContainer>
            <Table
              stickyHeader
              size="small"
              className="accordion-table"
              aria-label="PostingGroup List table"
            >
              <TableBody className="tableBody">
                <TextboxInput
                  id="codeSupplierPostingGroup"
                  label="Code"
                  variant="outlined"
                  size="small"
                />
                <TextboxInput
                  id="descriptionSupplierPostingGroup"
                  label="Description"
                  variant="outlined"
                  size="small"
                />
                <DropdownInput
                  id="PayableAccount"
                  label="Payable Account"
                  // onChange={(e) => updateFormValue("PayableAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="ReceivableAccount"
                  label="Receivable Account"
                  // onChange={(e) => updateFormValue("ReceivableAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="RoundingAmount"
                  label="Rounding Amount"
                  // onChange={(e) => updateFormValue("ReceivableAccount", e)}
                  options={this.state.COAList}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );

    const formSupplierBranchMapping = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button style={{ marginLeft: 5 }} onClick={(e) => {}}>
            Create
          </Button>
        </Grid>
        </Grid>
        <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={8} lg={8} >
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <TableContainer>
              <Table
                stickyHeader
                size="small"
                className="accordion-table"
                aria-label="PostingGroup List table"
              >
                <TableBody className="tableBody">
                  <DropdownInput
                    id="SuplID"
                    label="SuplID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                  <DropdownInput
                    id="BranchID"
                    label="BranchID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
         
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <TableContainer>
              <Table
                stickyHeader
                size="small"
                className="accordion-table"
                aria-label="PostingGroup List table"
              >
                <TableBody className="tableBody">
                  <DropdownInput
                    id="GeneralPostingGroupID"
                    label="General Posting GroupID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                  <DropdownInput
                    id="SupplierPostingGroupID"
                    label="Supplier Posting GroupID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
        </Grid>
        </Grid>
      </Grid>
    );
    const formCustomerPostingGroup = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button style={{ marginLeft: 5 }} onClick={(e) => {}}>
              Create
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <TableContainer>
            <Table
              stickyHeader
              size="small"
              className="accordion-table"
              aria-label="PostingGroup List table"
            >
              <TableBody className="tableBody">
                <TextboxInput
                  id="codeCustomerPostingGroup"
                  label="Code"
                  variant="outlined"
                  size="small"
                />
                <TextboxInput
                  id="descriptionCustomerPostingGroup"
                  label="Description"
                  variant="outlined"
                  size="small"
                />
                <DropdownInput
                  id="PayableAccountCustomerPostingGroup"
                  id="PayableAccount"
                  label="Payable Account"
                  // onChange={(e) => updateFormValue("PayableAccount", e)}
                  options={this.state.COAList}
                />
                <DropdownInput
                  id="ReceivableAccountCustomerPostingGroup"
                  label="Receivable Account"
                  // onChange={(e) => updateFormValue("ReceivableAccount", e)}
                  // options={}
                />
                <DropdownInput
                  id="RoundingAmountCustomerPostingGroup"
                  label="Rounding Amount"
                  // onChange={(e) => updateFormValue("ReceivableAccount", e)}
                  options={this.state.COAList}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
    const formCustomerBranchMapping = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button style={{ marginLeft: 5 }} onClick={(e) => {}}>
            Create
          </Button>
        </Grid>
        </Grid>
        <Grid container spacing={0}>
        <Grid  xs={12} sm={12} md={8} lg={8}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={12} md={5} lg={5}>
            <TableContainer>
              <Table
                stickyHeader
                size="small"
                className="accordion-table"
                aria-label="PostingGroup List table"
              >
                <TableBody className="tableBody">
                  <DropdownInput
                    id="CustID"
                    label="CustID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                  <DropdownInput
                    id="BranchID"
                    label="BranchID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
         
          <Grid item xs={12} sm={12} md={7} lg={7}>
            <TableContainer>
              <Table
                stickyHeader
                size="small"
                className="accordion-table"
                aria-label="PostingGroup List table"
              >
                <TableBody className="tableBody">
                  <DropdownInput
                    id="GeneralPostingGroupID"
                    label="General Posting GroupID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                  <DropdownInput
                    id="CustomerPostingGroupID"
                    label="Customer Posting GroupID"
                    // onChange={(e) => updateFormValue("PayableAccount", e)}
                    // options={}
                  />
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
          </Grid>
          </Grid>

        </Grid>
      </Grid>
    );

    const section1 = (
      <Fragment>
        <Grid container spacing={0} style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Dualtabcomponent
              tab1name="List"
              tab2name="New"
              tab1Html={tableItemPostingGroup}
              tab2Html={formItemPostingGroup}
            />
          </Grid>
        </Grid>
      </Fragment>
    );

    const section2 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableGeneralPostingGroup}
            tab2Html={formGeneralPostingGroup}
          />
        </Grid>
      </Grid>
    );

    const section3 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableGeneralPostingGroupSetup}
            tab2Html={formGeneralPostingGroupSetup}
          />
        </Grid>
      </Grid>
    );
    const section4 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableSupplierPostingGroup}
            tab2Html={formSupplierPostingGroup}
          />
        </Grid>
      </Grid>
    );
    const section5 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableSupplierBranchMapping}
            tab2Html={formSupplierBranchMapping}
          />
        </Grid>
      </Grid>
    );
    const section6 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableCustomerPostingGroup}
            tab2Html={formCustomerPostingGroup}
          />
        </Grid>
      </Grid>
    );
    const section7 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableCustomerBranchMapping}
            tab2Html={formCustomerBranchMapping}
          />
        </Grid>
      </Grid>
    );
    const handleAccordionClick = (val, e) => {
      if (val === "accordion1") {
        this.state.accordion1 === true
          ? this.setState({ accordion1: false })
          : this.setState({ accordion1: true });
      }
      if (val === "accordion2") {
        this.state.accordion2 === true
          ? this.setState({ accordion2: false })
          : this.setState({ accordion2: true });
      }
      if (val === "accordion3") {
        this.state.accordion3 === true
          ? this.setState({ accordion3: false })
          : this.setState({ accordion3: true });
      }
      if (val === "accordion4") {
        this.state.accordion4 === true
          ? this.setState({ accordion4: false })
          : this.setState({ accordion4: true });
      }
      if (val === "accordion5") {
        this.state.accordion5 === true
          ? this.setState({ accordion5: false })
          : this.setState({ accordion5: true });
      }
      if (val === "accordion6") {
        this.state.accordion6 === true
          ? this.setState({ accordion6: false })
          : this.setState({ accordion6: true });
      }
      if (val === "accordion7") {
        this.state.accordion7 === true
          ? this.setState({ accordion7: false })
          : this.setState({ accordion7: true });
      }
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

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />

        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

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
                  typoTitle="Posting Group Setup"
                  level={1}
                />
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

          <div style={{ marginLeft: 50, marginRight: 50 }}>
            <Sectiontitle title="Item" />
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  style={{ backgroundColor: "#fafafa" }}
                  accordionKey="a-1"
                  expanded={this.state.accordion1}
                  onClick={(e) => handleAccordionClick("accordion1", e)}
                  id="accordion1"
                  typographyKey="Item-Posting-Group"
                  typography="Item Posting Group"
                  accordiondetailsKey="accordion1"
                  html={section1}
                />
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  accordionKey="a-2"
                  expanded={this.state.accordion2}
                  onClick={(e) => handleAccordionClick("accordion2", e)}
                  id="accordion2"
                  typographyKey="General-Posting-Group"
                  typography="General Posting Group"
                  accordiondetailsKey="accordion2"
                  html={section2}
                />
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  accordionKey="a-3"
                  expanded={this.state.accordion3}
                  onClick={(e) => handleAccordionClick("accordion3", e)}
                  id="accordion3"
                  typographyKey="General-Posting-Group-Setup"
                  typography="General Posting Group Setup"
                  accordiondetailsKey="accordion3"
                  html={section3}
                />
              </Grid>
            </Grid>
            <Sectiontitle title="Supplier" />
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  accordionKey="a-4"
                  expanded={this.state.accordion4}
                  onClick={(e) => handleAccordionClick("accordion4", e)}
                  id="accordion4"
                  typographyKey="Supplier-Posting-Group"
                  typography="Supplier-Posting-Group"
                  accordiondetailsKey="accordion4"
                  html={section4}
                />
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  accordionKey="a-5"
                  expanded={this.state.accordion5}
                  onClick={(e) => handleAccordionClick("accordion5", e)}
                  id="accordion5"
                  typographyKey="SupplierBranchMapping"
                  typography="Supplier Branch Mapping"
                  accordiondetailsKey="accordion5"
                  html={section5}
                />
              </Grid>
            </Grid>

            <Sectiontitle title="Customer" />
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  accordionKey="a-6"
                  expanded={this.state.accordion6}
                  onClick={(e) => handleAccordionClick("accordion6", e)}
                  id="accordion6"
                  typographyKey="Customer-Posting-Group"
                  typography=" Customer Posting Group"
                  accordiondetailsKey="accordion6"
                  html={section6}
                />
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  accordionKey="a-7"
                  expanded={this.state.accordion7}
                  onClick={(e) => handleAccordionClick("accordion7", e)}
                  id="accordion7"
                  typographyKey="Customer-Branch-Mapping"
                  typography="Customer Branch Mapping"
                  accordiondetailsKey="accordion7"
                  html={section7}
                />
              </Grid>
            </Grid>
          </div>

          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={4} lg={4}></Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}></Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default postingGroupMaster;
