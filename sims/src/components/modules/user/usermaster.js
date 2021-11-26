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

import MasterDataGrid from "../../compo/masterdatagrid";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

import Tableskeleton from "../../compo/tableskeleton";
import Pagination from "../../compo/paginationcomponent";
import BackdropLoader from "../../compo/backdrop";

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
      columns:APIURLS.userMasterColumn,
      selectionModel:1,
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

        for(let i=0;i<data.length;i++){
          data[i].id=i+1;
        }
        
        this.setState(
          {
            users: data,
            ProgressLoader: true,
          },
          () => {
            if (data.length > 0) {
              this.handleRowClick([1]);
            }
          }
        );
      })
      .catch((error) => {});
  }

  handleRowClick=(e)=>{
    let index = e[0];
      
    let item = this.state.users[index - 1]; 
    let editUrl =
      URLS.URLS.editUser + this.state.urlparams + "&userId=" + item.UserID;

    this.setState({ editurl: editUrl,selectionModel:index });
   
  
  }

  

  render() {
    
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
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
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
        <BackdropLoader open={!this.state.ProgressLoader} />
        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                {this.state.users.length > 0 ? (
                  <Fragment>
                    <MasterDataGrid
                      selectionModel={this.state.selectionModel}
                      rows={this.state.users}
                      columns={this.state.columns}
                      pagination={this.state.pagination}
                      onSelectionModelChange={(e) => this.handleRowClick(e)}
                      onPageChange={handlePageChange}
                    />
                  </Fragment>
                ) : (
                  <Tableskeleton />
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default usermaster;
