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

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";



import Loader from "../../../compo/loader";

import Breadcrumb from "../../../compo/breadcrumb";


class itemDepartmentMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        urlparams: "",
        ProgressLoader:true
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
  }

  render() {
    

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
                  typoTitle="Item Department Master"
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
                    onClick={(e) => openPage(URLS.URLS.addItemDepartment + this.state.urlparams)}
                  >
                    New
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) => openPage(URLS.URLS.editItemDepartment + this.state.urlparams)}
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
                  <Table
                    stickyHeader
                    size="small"
                    className=""
                    aria-label="Item-Department List table"
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
                      <TableRow>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={10} lg={11}></Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={10} lg={11}>
                  <Divider className="divider-custom" />
                </Grid>
              </Grid>

              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={10} lg={11}></Grid>
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
export default itemDepartmentMaster;
