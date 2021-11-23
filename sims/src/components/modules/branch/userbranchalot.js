import React, { Fragment } from "react";
import Nav from "../../user/nav";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Checkbox from "@mui/material/Checkbox";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Menubar from "../../user/menubar";

class userbranchalot extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      ProgressLoader: false,
      urlparams: null,
      branchData: [],
      ErrorPrompt: false,
      SuccessPrompt: false,
      UserID: this.props.UserID,
      data: [],
    };
  }

  componentDidMount() {
    this.getUserBranches(this.props.UserID);
    if (getCookie(COOKIE.USERID) != null) {
      this.setState({ isLoggedIn: true });
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
      this.setState(
        {
          urlparams: urlparams,
        },
        () => {
          this.getBranches();
        }
      );
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  getUserBranches(userId) {
    let userBranches = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let data = {
      ValidUser: ValidUser,
      UserID: userId,
      userBranchMappingList: null,
    };
    let GetUserBranchMappedByUserIDUrl =
      APIURLS.APIURL.GetUserBranchMappedByUserID;

    axios
      .post(GetUserBranchMappedByUserIDUrl, data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ userBranchMappingList: data.userBranchMappingList });
        this.processData(data.userBranchMappingList, userId);
      })
      .catch((error) => {});
    return userBranches;
  }

  processData(data, userId) {
    let company = [];
    for (let i = 0; i < data.length; i++) {
      let c = {
        companyID: data[i].companyID,
        companyName: data[i].companyName,
        branch: [],
      };
      company.push(c);
    }
     
    let uniqueCompany = [];
    company.map((x) =>
      uniqueCompany.filter(
        (a) => a.companyID === x.companyID && a.companyName === x.companyName
      ).length > 0
        ? null
        : uniqueCompany.push(x)
    );

    let branches = [];
    for (let i = 0; i < uniqueCompany.length; i++) {
      let branch = uniqueCompany[i].branch;
      for (let j = 0; j < data.length; j++) {
        if (uniqueCompany[i].companyID === data[j].companyID) {
          let b = {
            branchID: data[j].branchID,
            branchName: data[j].branchName,
            mark: data[j].mark,
            shortName: data[j].shortName,
          };
          branch.push(b);
        }
      }
      uniqueCompany[i].branch = branch;
    }

    let passData = {
      userId: userId,
      companyBranch: uniqueCompany,
    };

    this.setState({ data: passData });
  }

  getBranches() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetBrachesUrl = APIURLS.APIURL.GetBraches;

    axios
      .post(GetBrachesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        this.setState({ branchData: data, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ branchData: [], ProgressLoader: true });
      });
  }

  render() {
    const handleRowClick = (e, item, id) => {
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.branchData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    };

    const handleBranchAdd = (userId) => {
      let branch = [];

      let chkboxes = document.querySelectorAll(".branchchecks:checked");

      for (let i = 0; i < chkboxes.length; i++) {
        branch.push(parseInt(chkboxes[i].value));
      }
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let data = {
        validUser: ValidUser,
        UserID: userId,
        BranchID: branch,
      };
      const headers = {
        "Content-Type": "application/json",
      };

      let CreateUserBranchMappingUrl = APIURLS.APIURL.CreateUserBranchMapping;
      axios
        .post(CreateUserBranchMappingUrl, data, { headers })
        .then((response) => {
          console.log("response > ", response);
          this.setState({ ProgressLoader: true, SuccessPrompt: true });
          window.location.reload();
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
          this.setState({ ProgressLoader: true });
        });
    };

    const selectAllBranches = (e) => {
      if (e.target.checked) {
        let chkboxes = document.getElementsByClassName("branchchecks");

        for (let i = 0; i < chkboxes.length; i++) {
          document.getElementById(chkboxes[i].id).checked = true;
        }
      } else {
        let chkboxes = document.getElementsByClassName("branchchecks");

        for (let i = 0; i < chkboxes.length; i++) {
          document.getElementById(chkboxes[i].id).checked = false;
        }
      }
    };

    const checkboxclick = (e, id) => {
      console.log("checkboxclick > id > ", id);
      console.log("checkboxclick > e.target.checked > ", e.target.checked);
      let chkboxes = document.getElementsByClassName("branchchecks");
      if (e.target.checked) {
        for (let i = 0; i < chkboxes.length; i++) {
          if (chkboxes[i].id === id) {
            document.getElementById(chkboxes[i].id).checked = true;
          }
        }
      } else {
        for (let i = 0; i < chkboxes.length; i++) {
          if (chkboxes[i].id === id) {
            document.getElementById(chkboxes[i].id).checked = false;
          }
        }
      }
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    return (
      <Fragment>
        <Snackbar
          open={this.state.SuccessPrompt}
          autoHideDuration={3000}
          onClose={closeSuccessPrompt}
        >
          <Alert onClose={closeSuccessPrompt} severity="success">
            Success!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.ErrorPrompt}
          autoHideDuration={3000}
          onClose={closeErrorPrompt}
        >
          <Alert onClose={closeErrorPrompt} severity="error">
            Error!
          </Alert>
        </Snackbar>

        {this.state.data.companyBranch ? (
          this.state.data.companyBranch.length > 0 ? (
            <div style={{ marginLeft: 10, marginTop: 10 }}>
              {this.state.ProgressLoader === false ? (
                <div style={{ marginTop: -8, marginLeft: -10 }}>
                  <LinearProgress style={{ backgroundColor: "#ffeb3b" }} />{" "}
                </div>
              ) : null}
              <Grid container spacing={1}>
                <Grid xs={6} sm={6} md={6} lg={6}>
                  <Button
                    style={{ marginLeft: 5, }}
                     className="action-btns"
                    onClick={(e) => handleBranchAdd(this.state.UserID)}
                  >
                    Alot
                  </Button>
                </Grid>
              </Grid>
              <div style={{ height: 20 }}></div>

              <div style={{ height: 250 }}>
                <Grid container spacing={0}>
                  <Grid xs={12} sm={12} md={11} lg={11}>
                    <Table
                      stickyHeader
                      size="small"
                      className=""
                      aria-label="company Branch List table"
                    >
                      <TableHead className="table-header-background">
                        <TableRow>
                          <TableCell className="table-header-font">
                            <input
                              type="checkbox"
                              id="selectAllBranch"
                              className="checkbox-css"
                              onClick={(e) => selectAllBranches(e)}
                            />
                          </TableCell>
                          <TableCell className="table-header-font" align="left">
                            &nbsp;
                          </TableCell>
                          <TableCell className="table-header-font" align="left">
                            Branch Short Name
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="tableBody">
                        {this.state.data.companyBranch.map((item, i) => (
                          <Fragment>
                            <TableRow>
                              <TableCell>&nbsp;</TableCell>
                              <TableCell>
                                <h4>{item.companyName} </h4>
                              </TableCell>
                              <TableCell>&nbsp;</TableCell>
                            </TableRow>

                            {item.branch.map((branchItem, j) => (
                              <TableRow>
                                {console.log("branchItem > ", branchItem)}
                                <TableCell>
                                  {parseInt(branchItem.mark) == 1 ? (
                                    <input
                                      type="checkbox"
                                      className="checkbox-css branchchecks"
                                      id={"branch_check_" + branchItem.branchID}
                                      value={branchItem.branchID}
                                      defaultChecked={true}
                                      onChange={(e) =>
                                        checkboxclick(
                                          e,
                                          "branch_check_" + branchItem.branchID
                                        )
                                      }
                                    />
                                  ) : (
                                    <input
                                      type="checkbox"
                                      className="checkbox-css branchchecks"
                                      id={"branch_check_" + branchItem.branchID}
                                      value={branchItem.branchID}
                                      defaultChecked={false}
                                      onChange={(e) =>
                                        checkboxclick(
                                          e,
                                          "branch_check_" + branchItem.branchID
                                        )
                                      }
                                    />
                                  )}
                                </TableCell>

                                <TableCell align="left">
                                  {" "}
                                  {branchItem.branchName}
                                </TableCell>
                                <TableCell align="left">
                                  {" "}
                                  {branchItem.shortName}{" "}
                                </TableCell>
                              </TableRow>
                            ))}
                          </Fragment>
                        ))}
                      </TableBody>
                    </Table>
                  </Grid>
                </Grid>
              </div>
            </div>
          ) : null
        ) : (
          "Nothing Selected."
        )}
      </Fragment>
    );
  }
}
export default userbranchalot;
