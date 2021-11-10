import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Divider from "@material-ui/core/Divider";
import ButtonGroup from "@mui/material/ButtonGroup";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";

import TablePagination from "@mui/material/TablePagination";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";

import Destination from "./destination";
import Statesbycountry from "./statesbycountry";
import Loader from "../../compo/loader";

import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";

let rows = [];
class countryMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      urlparams: "",
      masterCountryData: rows,
      countryData: rows,
      ProgressLoader: true,
      initialCss: "",
      destinationParam: [],
      destinations: [],
      states: [],
      editurl: null,
    };
  }

  componentDidMount() {
    this.getCountryList();

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

  getAllDestinations = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    const headers = {
      "Content-Type": "application/json",
    };
    let GetDestinationsUrl = APIURLS.APIURL.GetDestinations;

    axios
      .post(GetDestinationsUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        this.setState({ destinations: data, ProgressLoader: true });
      })
      .catch((error) => {});
  };

  getCountryList() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCountryUrl = APIURLS.APIURL.GetCountries;

    axios
      .post(GetCountryUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data>", data);
        rows = data;
        this.setState(
          {
            masterCountryData: rows,
            countryData: rows,
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

  getStateList() {
    let rows = [];
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
        let data = response.data;

        rows = data;
        this.setState({ states: rows, ProgressLoader: true });
      })
      .catch((error) => {});
  }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editCountry +
      this.state.urlparams +
      "&countryID=" +
      item.countryId;
    this.setState({ editurl: editUrl, destinations: item.destinations });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  InitialremoveIsSelectedRowClasses() {
    try {
      for (let i = 0; i < this.state.countryData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (e) {}
  }

  render() {
    const handleRowClick = (e, item, id) => {
      // getDestinationsByState(item);
      let editUrl =
        URLS.URLS.editCountry +
        this.state.urlparams +
        "&countryID=" +
        item.countryId;
      this.setState({ editurl: editUrl, destinations: item.destinations });
      getStatesByCountry(item);
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      try {
        for (let i = 0; i < this.state.countryData.length; i++) {
          document.getElementById("row_" + i).className = "";
        }
      } catch (e) {}
    };

    const getDestinationsByState = (item) => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let data = {
        Destination: {
          DestinationId: 0,
          CountryId: item.countryId,
          DestinationName: null,
          Postcode: null,
        },
        validUser: ValidUser,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let GetDestinationByCountryIdUrl =
        APIURLS.APIURL.GetDestinationByCountryId;

      axios
        .post(GetDestinationByCountryIdUrl, data, { headers })
        .then((response) => {
          let data = response.data;

          if (Object.prototype.toString.call(data) === "[object Array]") {
            this.setState({ destinations: data, ProgressLoader: true });
          } else {
            this.setState({ destinations: [], ProgressLoader: true });
          }
        })
        .catch((error) => {});
    };

    const getStatesByCountry = (item) => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let data = {
        state: {
          StateId: 0,
          CountryId: item.countryId,
          CreationDate: null,
          Name: null,
          Code: null,
          Gstcode: null,
          UserId: parseInt(getCookie(COOKIE.USERID)),
        },
        validUser: ValidUser,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let GetStateByCountryIdUrl = APIURLS.APIURL.GetStateByCountryId;

      axios
        .post(GetStateByCountryIdUrl, data, { headers })
        .then((response) => {
          let data = response.data;

          if (Object.prototype.toString.call(data) === "[object Array]") {
            this.setState({ states: data, ProgressLoader: true });
          } else {
            this.setState({ states: [], ProgressLoader: true });
          }
        })
        .catch((error) => {});
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
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
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
                  typoTitle="Country Master"
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
                      openPage(URLS.URLS.addCountry + this.state.urlparams)
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
            <Grid xs={12} sm={12} md={8} lg={8}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={10} lg={10}>
                  {this.state.countryData.length > 0 ? (
                    <Fragment>
                      <Table
                        stickyHeader
                        size="small"
                        className=""
                        aria-label="Country List table"
                      >
                        <TableHead className="table-header-background">
                          <TableRow>
                            <TableCell className="table-header-font">
                              #
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Country Name
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                          {getPageData(this.state.countryData).map(
                            (item, i) => (
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
                                      URLS.URLS.editCountry +
                                      this.state.urlparams +
                                      "&countryID=" +
                                      item.countryId
                                    }
                                  >
                                    {URLS.PREFIX.countryID + item.countryId}
                                  </a>
                                </TableCell>
                                <TableCell align="left">{item.name}</TableCell>
                              </TableRow>
                            )
                          )}
                        </TableBody>
                      </Table>
                      <TablePagination
                        rowsPerPageOptions={[this.state.pagination.rowsPerPage]}
                        component="div"
                        count={this.state.countryData.length}
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
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={10} lg={11}>
                  <Destination destinations={this.state.destinations} />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={10} lg={11}>
                  <Divider className="divider-custom" />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={10} lg={11}>
                  <Statesbycountry states={this.state.states} />
                </Grid>
              </Grid>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={10} lg={11}>
                  &nbsp;
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default countryMaster;
