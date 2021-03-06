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
import * as CF from "../../../../services/functions/customfunctions";

import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Loader from "../../../compo/loader";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography } from "@material-ui/core";
import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../../compo/backdrop";
import SIB from "../../../compo/gridtextboxinput";
import SDIB from "../../../compo/griddropdowninput";
import SSIB from "../../../compo/gridswitchinput";

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

      SPGpagination: {
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
      COAList: [],
      ItemPostingGroupList: [],
      selectedItemPostingGroupList: [],
      GeneralPostingGroupList: [],
      selectedGeneralPostingGroupList: [],
      CustomerPostingGroupList: [],
      SupplierPostingGroupList: [],
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
      CustomerPostingGroup: {
        CustomerPostingGroupID: 0,
        Code: "",
        Description: "",
        PayableAccount: 0,
        ReceivableAccount: 0,
        RoundingAmount: 0,
      },
      SupplierPostingGroup: {
        SupplierPostingGroupID: 0,
        Code: "",
        Description: "",
        PayableAccount: 0,
        ReceivableAccount: 0,
        RoundingAmount: 0,
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
    this.getAllCustomerPostingGroup();
    this.getAllSupplierPostingGroup();
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
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          if (data[i].ACType === 0) {
            let o = {
              name: data[i].Name,
              value: data[i].CAcID,
            };
            newD.push(o);
          }
        }

        this.setState({ COAList: newD });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {});
  };

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

  getAllCustomerPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllCustomerPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ CustomerPostingGroupList: data });
      })
      .catch((error) => {});
  };

  getAllSupplierPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplierPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ SupplierPostingGroupList: data });
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
        case "SupplierPostingGroup":
          stateParent = this.state.SupplierPostingGroup;
          if (key === "Code" || key === "Description") {
            stateParent[key] = e.target.value;
          }
          if (
            key === "PayableAccount" ||
            key === "ReceivableAccount" ||
            key === "RoundingAmount"
          ) {
            stateParent[key] = CF.toInt(e.target.value);
          }
          setStateParam({}, parent, stateParent);
          break;
        default:
          break;
      }
    };

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
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

    const createCustomerPostingGroup = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateCustomerPostingGroup;
      let reqData = {
        validUser: ValidUser,
        CustomerPostingGroup: this.state.CustomerPostingGroup,
      };
      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            let CustomerPostingGroup = {
              CustomerPostingGroupID: 0,
              Code: "",
              Description: "",
              PayableAccount: 0,
              ReceivableAccount: 0,
              RoundingAmount: 0,
            };
            let data = response.data;
            console.log("data > ", data);
            this.setState({
              ProgressLoader: true,
              SuccessPrompt: true,
              CustomerPostingGroup: CustomerPostingGroup,
            });
            this.getAllCustomerPostingGroup();
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        });
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

    const createSupplierPostingGroup = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateSupplierPostingGroup;
      let reqData = {
        validUser: ValidUser,
        SupplierPostingGroup: this.state.SupplierPostingGroup,
      };
      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            let SupplierPostingGroup = {
              SupplierPostingGroupID: 0,
              Code: "",
              Description: "",
              PayableAccount: 0,
              ReceivableAccount: 0,
              RoundingAmount: 0,
            };
            let data = response.data;
            console.log("data > ", data);
            this.setState({
              ProgressLoader: true,
              SuccessPrompt: true,
              SupplierPostingGroup: SupplierPostingGroup,
            });
            this.getAllSupplierPostingGroup();
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        });
    };

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
    };

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
              className="action-btns"
              // style={{ marginLeft: 5 }}
              startIcon={APIURLS.buttonTitle.update.icon}
              onClick={(e) => updateItemPostingGroup(e)}
            >
              {APIURLS.buttonTitle.update.name}
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
              className="action-btns"
              startIcon={APIURLS.buttonTitle.update.icon}
              // style={{ marginLeft: 5 }}
              onClick={(e) => updateGeneralPostingGroup(e)}
            >
              {APIURLS.buttonTitle.update.name}
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
              className="action-btns"
              startIcon={APIURLS.buttonTitle.update.icon}
              style={{ marginLeft: 5 }}
              onClick={(e) => updateGeneralPostingGroupSetup(e)}
            >
              {APIURLS.buttonTitle.update.name}
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
      <Fragment>
        <Grid container spacing={0} style={{ marginTop: 20 }}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Button
              className="action-btns"
              startIcon={APIURLS.buttonTitle.update.icon}
              // style={{ marginLeft: 5 }}
              // onClick={(e) =>}
            >
              {APIURLS.buttonTitle.update.name}
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
                {getIPGPageData(this.state.SupplierPostingGroupList).map(
                  (item, i) => (
                    <TableRow id={"row_" + i} key={i}>
                      <TableCell> {i + 1}</TableCell>
                      <TableCell align="left">{item.Code}</TableCell>
                      <TableCell> {item.Description}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>

            <TablePagination
              rowsPerPageOptions={[this.state.SPGpagination.rowsPerPage]}
              component="div"
              count={this.state.SupplierPostingGroupList.length}
              rowsPerPage={this.state.SPGpagination.rowsPerPage}
              page={this.state.SPGpagination.page}
              onPageChange={handleGPGPageChange}
            />
          </Grid>
        </Grid>
      </Fragment>
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

        <TableBody className="tableBody">
          {this.state.CustomerPostingGroupList.length > 0
            ? getIPGPageData(this.state.CustomerPostingGroupList).map(
                (item, i) => (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell align="left">
                      <Inputcustom
                        id={
                          "CustomerPostingGroup_code_" +
                          item.CustomerPostingGroupID
                        }
                        defaultValue={item.Code}
                        onKeyUp={(e) =>
                          updateList(
                            "CustomerPostingGroupList",
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
                          "CustomerPostingGroup_description_" +
                          item.CustomerPostingGroupID
                        }
                        defaultValue={item.Description}
                        onKeyUp={(e) =>
                          updateList(
                            "CustomerPostingGroupList",
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
            className="action-btns"
            startIcon={APIURLS.buttonTitle.save.icon}
            onClick={(e) => createItemPostingGroup(e)}
          >
            {APIURLS.buttonTitle.save.name}
          </Button>
        </Grid>

        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <SIB
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
                    />
                    <SIB
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
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

    const formGeneralPostingGroup = (
      <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button
            className="action-btns"
            startIcon={APIURLS.buttonTitle.save.icon}
            onClick={(e) => createGeneralPostingGroup(e)}
          >
            {APIURLS.buttonTitle.save.name}
          </Button>
        </Grid>
        <Grid item xs={12} sm={12} md={7} lg={7}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <SIB
                      id="codeGeneralPostingGroup"
                      label="Code"
                      variant="outlined"
                      size="small"
                      value={this.state.GeneralPostingGroup.Code}
                      onChange={(e) =>
                        updateFormValue("GeneralPostingGroup", "Code", e)
                      }
                      error={
                        this.state.Validations.GeneralPostingGroup.Code
                          .errorState
                      }
                    />
                    <SIB
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
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
    const formGeneralPostingGroupSetup = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button
              className="action-btns"
              startIcon={APIURLS.buttonTitle.save.icon}
              onClick={(e) => {}}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    {console.log(
                      "processDropdownList > GeneralPostingGroupSetup > ",
                      processDropdownList(
                        "GeneralPostingGroupSetup",
                        this.state.GeneralPostingGroupList
                      )
                    )}
                    <SDIB
                      id="GeneralPostingGroupID"
                      label="General Posting GroupID"
                      onChange={(e) =>
                        updateFormValue(
                          "GeneralPostingGroupSetup",
                          "GeneralPostingGroupID",
                          e
                        )
                      }
                      param={processDropdownList(
                        "GeneralPostingGroupID",
                        this.state.GeneralPostingGroupList
                      )}
                    />
                    <SDIB
                      id="ItemPostingGroupID"
                      label="Item Posting GroupID"
                      onChange={(e) =>
                        updateFormValue(
                          "GeneralPostingGroupSetup",
                          "ItemPostingGroupID",
                          e
                        )
                      }
                      param={processDropdownList(
                        "ItemPostingGroupID",
                        this.state.ItemPostingGroupList
                      )}
                    />

                    <SDIB
                      id="SalesAccount"
                      label="Sales Account"
                      // onChange={(e) => updateFormValue("SalesAccount", e)}
                      param={this.state.COAList}
                    />
                    <SDIB
                      id="SalesCNAccount"
                      label="SalesCNAccount"
                      // onChange={(e) => updateFormValue("SalesCNAccount", e)}
                      param={this.state.COAList}
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <SDIB
                      id="SalesDNAccount"
                      label="SalesDNAccount"
                      // onChange={(e) => updateFormValue("SalesDNAccount", e)}
                      param={this.state.COAList}
                    />
                    <SDIB
                      id="PurchaseAccount"
                      label="Purchase Account"
                      // onChange={(e) => updateFormValue("PurchaseAccount", e)}
                      param={this.state.COAList}
                    />
                    <SDIB
                      id="PurchaseCNAccount"
                      label="PurchaseCNAccount"
                      // onChange={(e) => updateFormValue("PurchaseCNAccount", e)}
                      param={this.state.COAList}
                    />
                    <SDIB
                      id="PurchaseDNAccount"
                      label="PurchaseDNAccount"
                      // onChange={(e) => updateFormValue("PurchaseDNAccount", e)}
                      param={this.state.COAList}
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
    const formSupplierPostingGroup = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button
              className="action-btns"
              startIcon={APIURLS.buttonTitle.save.icon}
              onClick={(e) => createSupplierPostingGroup(e)}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <SIB
                      id="codeSupplierPostingGroup"
                      label="Code"
                      variant="outlined"
                      size="small"
                      isMandatory={true}
                      value={this.state.SupplierPostingGroup.Code}
                      onChange={(e) =>
                        updateFormValue("SupplierPostingGroup", "Code", e)
                      }
                    />
                    <SIB
                      id="descriptionSupplierPostingGroup"
                      label="Description"
                      variant="outlined"
                      size="small"
                      value={this.state.SupplierPostingGroup.Description}
                      onChange={(e) =>
                        updateFormValue(
                          "SupplierPostingGroup",
                          "Description",
                          e
                        )
                      }
                    />
                    <SDIB
                      id="PayableAccount"
                      label="Payable Account"
                      param={this.state.COAList}
                      value={this.state.SupplierPostingGroup.PayableAccount}
                      onChange={(e) =>
                        updateFormValue(
                          "SupplierPostingGroup",
                          "PayableAccount",
                          e
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <SDIB
                      id="ReceivableAccount"
                      label="Receivable Account"
                      param={this.state.COAList}
                      value={this.state.SupplierPostingGroup.ReceivableAccount}
                      onChange={(e) =>
                        updateFormValue(
                          "SupplierPostingGroup",
                          "ReceivableAccount",
                          e
                        )
                      }
                    />
                    <SDIB
                      id="RoundingAmount"
                      label="Rounding Amount"
                      param={this.state.COAList}
                      value={this.state.SupplierPostingGroup.RoundingAmount}
                      onChange={(e) =>
                        updateFormValue(
                          "SupplierPostingGroup",
                          "RoundingAmount",
                          e
                        )
                      }
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

    const formSupplierBranchMapping = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button
              className="action-btns"
              startIcon={APIURLS.buttonTitle.save.icon}
              onClick={(e) => {}}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={10} lg={10}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                      <SDIB
                        id="SuplID"
                        label="SuplID"
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                        isMandatory={true}
                      />
                      <SDIB
                        id="BranchID"
                        label="BranchID"
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                        isMandatory={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                      <SDIB
                        id="GeneralPostingGroupID"
                        label="General Posting "
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                      />
                      <SDIB
                        id="SupplierPostingGroupID"
                        label="Supplier Posting "
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                      />
                    </Grid>
                  </Grid>
                </div>
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
            <Button
              className="action-btns"
              startIcon={APIURLS.buttonTitle.save.icon}
              onClick={(e) => {}}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <div>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <SIB
                      id="Code"
                      label="Code"
                      variant="outlined"
                      size="small"
                      value={this.state.CustomerPostingGroup.Code}
                      onChange={(e) =>
                        updateFormValue("CustomerPostingGroup", "Code", e)
                      }
                      isMandatory={true}
                    />
                    <SIB
                      id="Description"
                      label="Description"
                      variant="outlined"
                      size="small"
                      value={this.state.CustomerPostingGroup.Description}
                      onChange={(e) =>
                        updateFormValue(
                          "CustomerPostingGroup",
                          "Description",
                          e
                        )
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                  <Grid item xs={12} sm={12} md={5} lg={5}>
                    <SDIB
                      id="PayableAccount"
                      label="Payable Account"
                      onChange={(e) =>
                        updateFormValue(
                          "CustomerPostingGroup",
                          "PayableAccount",
                          e
                        )
                      }
                      value={this.state.CustomerPostingGroup.PayableAccount}
                      param={this.state.COAList}
                    />
                    <SDIB
                      id="ReceivableAccount"
                      label="Receivable Account"
                      value={this.state.CustomerPostingGroup.ReceivableAccount}
                      onChange={(e) =>
                        updateFormValue(
                          "CustomerPostingGroup",
                          "ReceivableAccount",
                          e
                        )
                      }
                      param={this.state.COAList}
                    />
                    <SDIB
                      id="RoundingAmount"
                      label="Rounding Amount"
                      value={this.state.CustomerPostingGroup.RoundingAmount}
                      onChange={(e) =>
                        updateFormValue(
                          "CustomerPostingGroup",
                          "RoundingAmount",
                          e
                        )
                      }
                      param={this.state.COAList}
                    />
                  </Grid>
                </Grid>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
    const formCustomerBranchMapping = (
      <Grid container spacing={0}>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button
              className="action-btns"
              startIcon={APIURLS.buttonTitle.save.icon}
              onClick={(e) => {}}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={10} lg={10}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div>
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                      <SDIB
                        id="CustID"
                        label="CustID"
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                        isMandatory={true}
                      />
                      <SDIB
                        id="BranchID"
                        label="BranchID"
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                        isMandatory={true}
                      />
                    </Grid>
                    <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                    <Grid item xs={12} sm={12} md={5} lg={5}>
                      <SDIB
                        id="GeneralPostingGroupID"
                        label="General Posting"
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                      />
                      <SDIB
                        id="CustomerPostingGroupID"
                        label="Customer Posting"
                        // onChange={(e) => updateFormValue("PayableAccount", e)}
                        param={[]}
                      />
                    </Grid>
                  </Grid>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

    // const section1 = (
    //   <Fragment>
    //     <Grid container spacing={0} style={{ marginTop: 20, marginBottom: 20 }}>
    //       <Grid item xs={12} sm={12} md={12} lg={12}>
    //         <Dualtabcomponent
    //           tab1name="List"
    //           tab2name="New"
    //           tab1Html={tableItemPostingGroup}
    //           tab2Html={formItemPostingGroup}
    //         />
    //       </Grid>
    //     </Grid>
    //   </Fragment>
    // );

    // const section2 = (
    //   <Grid container spacing={0}>
    //     <Grid item xs={12} sm={12} md={11} lg={11}>
    //       <Dualtabcomponent
    //         tab1name="List"
    //         tab2name="New"
    //         tab1Html={tableGeneralPostingGroup}
    //         tab2Html={formGeneralPostingGroup}
    //       />
    //     </Grid>
    //   </Grid>
    // );

    // const section3 = (
    //   <Grid container spacing={0}>
    //     <Grid item xs={12} sm={12} md={11} lg={11}>
    //       <Dualtabcomponent
    //         tab1name="List"
    //         tab2name="New"
    //         tab1Html={tableGeneralPostingGroupSetup}
    //         tab2Html={formGeneralPostingGroupSetup}
    //       />
    //     </Grid>
    //   </Grid>
    // );

    // const section4 = (
    //   <Grid container spacing={0}>
    //     <Grid item xs={12} sm={12} md={11} lg={11}>
    //       <Dualtabcomponent
    //         tab1name="List"
    //         tab2name="New"
    //         tab1Html={tableSupplierPostingGroup}
    //         tab2Html={formSupplierPostingGroup}
    //       />
    //     </Grid>
    //   </Grid>
    // );
    // const section5 = (
    //   <Grid container spacing={0}>
    //     <Grid item xs={12} sm={12} md={11} lg={11}>
    //       <Dualtabcomponent
    //         tab1name="List"
    //         tab2name="New"
    //         tab1Html={tableSupplierBranchMapping}
    //         tab2Html={formSupplierBranchMapping}
    //       />
    //     </Grid>
    //   </Grid>
    // );
    // const section6 = (
    //   <Grid container spacing={0}>
    //     <Grid item xs={12} sm={12} md={11} lg={11}>
    //       <Dualtabcomponent
    //         tab1name="List"
    //         tab2name="New"
    //         tab1Html={tableCustomerPostingGroup}
    //         tab2Html={formCustomerPostingGroup}
    //       />
    //     </Grid>
    //   </Grid>
    // );

    // const section7 = (
    //   <Grid container spacing={0}>
    //     <Grid item xs={12} sm={12} md={11} lg={11}>
    //       <Dualtabcomponent
    //         tab1name="List"
    //         tab2name="New"
    //         tab1Html={tableCustomerBranchMapping}
    //         tab2Html={formCustomerBranchMapping}
    //       />
    //     </Grid>
    //   </Grid>
    // );
    
    
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Posting Group Setup"
          level={1}
        />
      </Fragment>
    );

    return (
      <Fragment>
        <BackdropLoader open={!this.state.ProgressLoader} />

        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />
        <TopFixedRow3 breadcrumb={breadcrumbHtml} />

        <div style={{ marginLeft: 50, marginRight: 50 }}>
          <Sectiontitle title="Item" />
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Accordion
                key="PostingGroup-Details"
                expanded={this.state.accordion1}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => handleAccordionClick("accordion1", e)}
                    />
                  }
                  onClick={(e) => handleAccordionClick("accordion1", e)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    Item Posting Group
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
                  <Grid
                    container
                    spacing={0}
                    // style={{ marginTop: 20, marginBottom: 20 }}
                  >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                      <Dualtabcomponent
                        tab1name="List"
                        tab2name="New"
                        tab1Html={tableItemPostingGroup}
                        tab2Html={formItemPostingGroup}
                      />
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Accordion
                key="PostingGroup-Details"
                expanded={this.state.accordion2}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => handleAccordionClick("accordion2", e)}
                    />
                  }
                  onClick={(e) => handleAccordionClick("accordion2", e)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    General Posting Group
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
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
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Accordion
                key="PostingGroup-Details"
                expanded={this.state.accordion3}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => handleAccordionClick("accordion3", e)}
                    />
                  }
                  onClick={(e) => handleAccordionClick("accordion3", e)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    General Posting Group Setup
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
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
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
          <Sectiontitle title="Supplier" />
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Accordion
                key="PostingGroup-Details"
                expanded={this.state.accordion4}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => handleAccordionClick("accordion4", e)}
                    />
                  }
                  onClick={(e) => handleAccordionClick("accordion4", e)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    Supplier-Posting-Group
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
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
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Accordion
                key="PostingGroup-Details"
                expanded={this.state.accordion5}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => handleAccordionClick("accordion5", e)}
                    />
                  }
                  onClick={(e) => handleAccordionClick("accordion5", e)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    Supplier Branch Mapping
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
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
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>

          <Sectiontitle title="Customer" />
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Accordion
                key="PostingGroup-Details"
                expanded={this.state.accordion6}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => handleAccordionClick("accordion6", e)}
                    />
                  }
                  onClick={(e) => handleAccordionClick("accordion6", e)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    Customer Posting Group
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
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
                </AccordionDetails>
              </Accordion>
            </Grid>
            <Grid xs={12} sm={12} md={11} lg={11}>
              <Accordion
                key="PostingGroup-Details"
                expanded={this.state.accordion7}
              >
                <AccordionSummary
                  className="accordion-Header-Design"
                  expandIcon={
                    <ExpandMoreIcon
                      onClick={(e) => handleAccordionClick("accordion7", e)}
                    />
                  }
                  onClick={(e) => handleAccordionClick("accordion7", e)}
                  aria-controls="panel1a-content"
                  id="panel1a-header"
                  style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                >
                  <Typography key="" className="accordion-Header-Title">
                    Customer Branch Mapping
                  </Typography>
                </AccordionSummary>
                <AccordionDetails key="" className="AccordionDetails-css">
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
                </AccordionDetails>
              </Accordion>
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
      </Fragment>
    );
  }
}
export default postingGroupMaster;
