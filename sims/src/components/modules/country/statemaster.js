import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@mui/material/TablePagination";



import EditIcon from "@mui/icons-material/Edit";
import "../../user/dasboard.css";
import * as CF from "../../../services/functions/customfunctions";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import Destination from "./destination";

import Loader from "../../compo/loader";

import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";

import Tableskeleton from "../../compo/tableskeleton";
import ErrorSnackBar from "../../compo/errorSnackbar";
import BackdropLoader from "../../compo/backdrop";
import MasterDataGrid from "../../compo/masterdatagrid";

class statemaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: APIURLS.pagination.rowsPerPage,
      },
      page: 1,
      rowsPerPage: 10,
      urlparams: "",
      ProgressLoader: false,
      ErrorPrompt: false,
      stateData: [],
      destinations: [],
      editurl: null,
      columns: APIURLS.stateMasterColumn,
      selectionModel: 1,
      item: {}
    };
  }
  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getStateList();

    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let urlparams = params;
    // "?branchId=" +
    // branchId +
    // "&compName=" +
    // compName +
    // "&branchName=" +
    // branchName;
    this.setState({
      urlparams: urlparams,
    });
  }

  getStateList() {

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetStatesUrl = APIURLS.APIURL.GetStates;

    axios
      .post(GetStatesUrl, ValidUser, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          this.setState({ stateData: data, ProgressLoader: true }, () => {
            if (data.length > 0) {
              this.handleRowClick([this.state.selectionModel]);
            }
          });
        } else {
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        }

      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });
  }



  handleRowClick = (e) => {
    try {
      let index = e[0];
      let item = this.state.stateData[index - 1];
      let editUrl =
        URLS.URLS.editState + this.state.urlparams + "&StateId=" + item.StateID;
      this.setState({ editurl: editUrl, selectionModel: index, item: item });
      // this.getDestinationsByState(item); 
    } catch (e) {
      console.log("Error : ", e);
    }
  }

  getDestinationsByState = (item) => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let data = {
      Destination: {
        // DestinationId: 0,
        CountryId: item.countryId,
        // DestinationName: null,
        // Postcode: null,
        StateID: item.stateId,
      },
      validUser: ValidUser,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    let GetDestinationByCountryIdAndStateIdUrl =
      APIURLS.APIURL.GetDestinationByCountryIdAndStateId;

    axios
      .post(GetDestinationByCountryIdAndStateIdUrl, data, { headers })
      .then((response) => {
        console.log("getDestinationsByState > Fetching.....Fetched.....");
        if (response.status === 200) {
          let data = response.data;
          if (Object.prototype.toString.call(data) === "[object Array]") {
            this.setState({ destinations: data, ProgressLoader: true });
          } else {
            this.setState({ destinations: [], ProgressLoader: true, ErrorPrompt: true });
          }
        } else {
          this.setState({ destinations: [], ProgressLoader: true, ErrorPrompt: true });
        }

      })
      .catch((error) => {
        this.setState({ destinations: [], ProgressLoader: true, ErrorPrompt: true });
      });
  };



  render() {


    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const handlePageChange = (event, newPage) => {
      console.log("handlePageChange > event > ", event);
      console.log("handlePageChange > newPage > ", newPage);
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
          typoTitle="State"
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
            startIcon={APIURLS.buttonTitle.add.icon}
            className="action-btns"
            onClick={(e) => openPage(URLS.URLS.addState + this.state.urlparams)}
          >
            {APIURLS.buttonTitle.add.name}
          </Button>
          <Button
            startIcon={APIURLS.buttonTitle.edit.icon}
            className="action-btns"
            onClick={(e) => openPage(this.state.editurl)}
          >
            {APIURLS.buttonTitle.edit.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );


    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };

    return (
      <Fragment>
        <BackdropLoader open={!this.state.ProgressLoader} />
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />


        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12} lg={12}>
                {this.state.stateData.length > 0 ? (
                  <Fragment>

                    <MasterDataGrid
                      selectionModel={this.state.selectionModel}
                      rows={this.state.stateData}
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
            <Grid xs={12} sm={12} md={1} lg={1}></Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Grid container spacing={0}>
                  <Grid xs={12} sm={12} md={11} lg={11}>
                    <Destination destinations={this.state.item.Destinations} CountryID={this.state.item.CountryID} />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default statemaster;
