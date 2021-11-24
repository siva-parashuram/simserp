import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import ButtonGroup from "@mui/material/ButtonGroup";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";

import TablePagination from "@mui/material/TablePagination";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";

import Userbranchalot from "../branch/userbranchalot";
import Usermoduleassign from "../modules/usermoduleassign";
import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

import Tableskeleton from "../../compo/tableskeleton";

class usermaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      urlparams: "",
      allotBranch: false,
      allotModule: false,
      ProgressLoader: false,
      initialCss: "",
      users: [],
      userId: 0,
      passData: [],
      userBranchMappingList: [],
      editurl: null,
    };
  }

  componentDidMount() {
    this.getUsersList();
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

        let passData = {
          userId: this.state.userId,
          branches: data,
          userBranches: this.getUserBranches(this.state.userId),
        };
        this.setState({
          branchData: data,
          passData: passData,
          ProgressLoader: true,
        });
      })
      .catch((error) => {
        this.setState({ branchData: [], ProgressLoader: true });
      });
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

    this.setState({ passData: passData });
  }

  getUsersList() {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetUsersUrl = APIURLS.APIURL.GetUsers;

    axios
      .post(GetUsersUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let rows = data;
        this.setState(
          {
            users: data,
            ProgressLoader: true,
          },
          () => {
            if (rows.length > 0) {
              this.InitialhandleRowClick(null, rows[0], "row_0");
            }
          }
        );
      })
      .catch((error) => {});
  }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editUser + this.state.urlparams + "&userId=" + item.userId;

    this.setState({ editurl: editUrl });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  InitialremoveIsSelectedRowClasses() {
    try {
      for (let i = 0; i < this.state.users.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (e) {}
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "allotBranch") {
        this.state.allotBranch === true
          ? this.setState({ allotBranch: false })
          : this.setState({ allotBranch: true });
      }
      if (val === "allotModule") {
        this.state.allotModule === true
          ? this.setState({ allotModule: false })
          : this.setState({ allotModule: true });
      }
    };

    const handleRowClick = (e, item, id) => {
      try {
        this.setState({ passData: [] });

        let editUrl =
          URLS.URLS.editUser + this.state.urlparams + "&userId=" + item.userId;

        this.setState({ userId: item.userId, editurl: editUrl });
        removeIsSelectedRowClasses();
        this.getUserBranches(item.userId);
        document.getElementById(id).classList.add("selectedRow");
      } catch (e) {}
    };

    const removeIsSelectedRowClasses = () => {
      try {
        for (let i = 0; i < this.state.users.length; i++) {
          document.getElementById("row_" + i).className = "";
        }
      } catch (e) {}
    };

    const changeUserStatus = (item, val) => {
      let users = this.state.users;
      let index = users.indexOf(item);

      let user = users[index];
      user.isActive = val;
      users[index] = user;

      this.setState({ users: users });
    };

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);

      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const handlePageChange = (event, newPage) => {
      removeSelected();

      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const removeSelected = () => {
      removeIsSelectedRowClasses();
      this.setState({ userBranchMappingList: [], passData: [] });
    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="User Master"
          level={1}
        />
      </Fragment>
    );

    const buttongroupHtml = (
      <Fragment>
        {console.log("APIURLS.buttonTitle > ", APIURLS.buttonTitle)}
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="Action Menu Button group"
        >
          <Button
            className="action-btns"
            startIcon={APIURLS.buttonTitle.add.icon}
            onClick={(e) => openPage(URLS.URLS.addUser + this.state.urlparams)}
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
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={5} lg={5}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                {this.state.users.length > 0 ? (
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
                            Email Id
                          </TableCell>
                          <TableCell className="table-header-font" align="left">
                            First Name
                          </TableCell>

                          <TableCell className="table-header-font" align="left">
                            Login Id
                          </TableCell>

                          <TableCell className="table-header-font" align="left">
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody className="tableBody">
                        {getPageData(this.state.users).map((item, i) => (
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
                                  URLS.URLS.editUser +
                                  this.state.urlparams +
                                  "&userId=" +
                                  item.userId
                                }
                              >
                                {URLS.PREFIX.userID + item.userId}
                              </a>
                            </TableCell>
                            <TableCell align="left">{item.emailId}</TableCell>
                            <TableCell align="left">{item.firstName}</TableCell>

                            <TableCell align="left">{item.loginId}</TableCell>

                            <TableCell align="left">
                              {item.isActive === true ? (
                                <span style={{ color: "green" }}>Active</span>
                              ) : (
                                <span style={{ color: "red" }}>In-Active</span>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                    <TablePagination
                      rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
                      component="div"
                      count={this.state.users.length}
                      rowsPerPage={this.state.pagination.rowsPerPage}
                      page={this.state.pagination.page}
                      onPageChange={handlePageChange}
                    />
                  </Fragment>
                ) : (
                  <Tableskeleton />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={7} lg={7}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordion key="allotBranch" expanded={this.state.allotBranch}>
                  <AccordionSummary
                    className="side-display-accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) => handleAccordionClick("allotBranch", e)}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: 20, height: "100%" }}
                  >
                    <Typography key="" className="side-display-header-css">
                      Assign Branch
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="">
                    <Grid container spacing={1}>
                      <Grid xs={12} sm={12} md={11} lg={11}>
                        <Userbranchalot data={this.state.passData} />
                        {/* User Branch Allotment section */}
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion key="allotModule" expanded={this.state.allotModule}>
                  <AccordionSummary
                    className="side-display-accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) => handleAccordionClick("allotModule", e)}
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: 20, height: "100%" }}
                  >
                    <Typography key="" className="side-display-header-css">
                      Assign Role
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="">
                    <Grid container spacing={1}>
                      <Grid xs={12} sm={12} md={12} lg={12}>
                        <Usermoduleassign
                          data={{
                            userId: this.state.userId,
                            List: this.state.userBranchMappingList,
                          }}
                        />
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default usermaster;
