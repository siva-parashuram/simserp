import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

 

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";
 
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";

import Loader from "../../compo/loader";

import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";

class numberingmaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      initialCss: "",
      numberings: [],
      editurl: null,
    };
  }

  componentDidMount() {
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
    this.getList(branchId);
  }

  getList(branchId) {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllNoSeriesByBranchId;

    let data = {
      ValidUser: ValidUser,
      BranchId: parseInt(branchId),
    };

    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;

        if (response.status === 200) {
          this.setState(
            {
              numberings: data.noSeriesDetailList,
              ProgressLoader: true,
            },
            () => {
              if (this.state.numberings.length > 0) {
                this.InitialhandleRowClick(
                  null,
                  this.state.numberings[0],
                  "row_0"
                );
              }
            }
          );
        } else {
        }
      })
      .catch((error) => {
        this.setState({
          numberings: [],
          ProgressLoader: true,
          ErrorPrompt: true,
        });
      });
  }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editNumbering +
      this.state.urlparams +
      "&noSeriesId=" +
      item.noSeriesId;

    this.setState({ editurl: editUrl });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.numberings.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  render() {
    const handleRowClick = (e, item, id) => {
      let editUrl =
        URLS.URLS.editNumbering +
        this.state.urlparams +
        "&noSeriesId=" +
        item.noSeriesId;
      this.setState({ editurl: editUrl });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.numberings.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
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
                  typoTitle="Numbering Master"
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
                      openPage(URLS.URLS.addNumbering + this.state.urlparams)
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
            <Grid xs={12} sm={12} md={5} lg={5}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}>
                  {this.state.numberings.length > 0?(
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
                          Code
                        </TableCell>
                        <TableCell className="table-header-font" align="left">
                          Description
                        </TableCell>
                        <TableCell className="table-header-font" align="left">
                          Starting No
                        </TableCell>
                        <TableCell className="table-header-font" align="left">
                          {" "}
                          Ending No
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                      {this.state.numberings.length > 0
                        ? this.state.numberings.map((item, i) => (
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
                                    URLS.URLS.editNumbering +
                                    this.state.urlparams +
                                    "&noSeriesId=" +
                                    item.noSeriesId
                                  }
                                >
                                  {URLS.PREFIX.noSeriesId + item.noSeriesId}
                                </a>
                              </TableCell>
                              <TableCell align="left">{item.code}</TableCell>
                              <TableCell align="left">
                                {item.description}
                              </TableCell>
                              <TableCell align="left">{item.startNo}</TableCell>
                              <TableCell align="left">{item.lastNo}</TableCell>
                            </TableRow>
                          ))
                        : null}
                    </TableBody>
                  </Table>
                    </Fragment>
                  ):(
                    <Tableskeleton/>
                  )}
                  
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
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
export default numberingmaster;
