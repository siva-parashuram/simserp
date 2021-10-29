import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import ButtonGroup from "@mui/material/ButtonGroup";



import EditIcon from "@mui/icons-material/Edit";
import "../../user/dasboard.css";

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import Destination from "./destination";

import Loader from "../../compo/loader";

import Breadcrumb from "../../compo/breadcrumb";

import Tableskeleton from "../../compo/tableskeleton";

class statemaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: false,
      stateData: [],
      destinations: [],
      editurl: null,
    };
  }
  componentDidMount() {
    // this.setState({ ProgressLoader: false });
    this.getStateList();
    
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
         console.log("data > ",data);
        rows = data;
        this.setState({ stateData: rows, ProgressLoader: true }, () => {
          if (rows.length > 0) {
            this.InitialhandleRowClick(null, rows[0], "row_0");
          }
        });
      })
      .catch((error) => {});
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

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editState + this.state.urlparams + "&StateId=" + item.stateId;

    this.setState({ editurl: editUrl });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.stateData.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  render() {
    const handleRowClick = (e, item, id) => {
     // getDestinationsByState(item);
     this.setState({ destinations: item.destinations });
      let editUrl =
        URLS.URLS.editState + this.state.urlparams + "&StateId=" + item.stateId;

      this.setState({ editurl: editUrl });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.stateData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
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
          let data = response.data;

          if (Object.prototype.toString.call(data) === "[object Array]") {
            this.setState({ destinations: data, ProgressLoader: true });
          } else {
            this.setState({ destinations: [], ProgressLoader: true });
          }
        })
        .catch((error) => {});
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
                  typoTitle="State Master"
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
                      openPage(URLS.URLS.addState + this.state.urlparams)
                    }
                  >
                    New
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) => openPage(this.state.editurl)}
                  >
                    Edit
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
                  {this.state.stateData.length > 0 ? (
                    <Fragment>
                      <Table
                        stickyHeader
                        size="small"
                        className=""
                        aria-label="State List table"
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
                              {" "}
                              Name
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Code
                            </TableCell>
                            <TableCell
                              className="table-header-font"
                              align="left"
                            >
                              Gst Code
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                          {this.state.stateData.map((item, i) => (
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
                                    URLS.URLS.editState +
                                    this.state.urlparams +
                                    "&StateId=" +
                                    item.stateId
                                  }
                                >
                                  {URLS.PREFIX.stateID + item.stateId}
                                </a>
                              </TableCell>
                              <TableCell align="left">{item.name}</TableCell>
                              <TableCell align="left">{item.code}</TableCell>
                              <TableCell align="left">{item.gstcode}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
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
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default statemaster;
