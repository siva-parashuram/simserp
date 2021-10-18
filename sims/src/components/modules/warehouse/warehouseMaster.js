import React, { Fragment } from "react";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";
import Header from "../../user/userheaderconstants";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

import axios from "axios";

class warehouseMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      allotBranch: false,
      allotModule: false,
      ProgressLoader: false,
      initialCss: "",
      warehouses: [],
      editurl: null,
    };
  }

  componentDidMount() {
    this.getWarehouses();
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

  getWarehouses() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetWareHousesUrl = APIURLS.APIURL.GetWareHouses;

    axios
      .post(GetWareHousesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        if (response.status === 200) {
          let rows = data;
          this.setState(
            {
              warehouses: data,
              ProgressLoader: true,
            },
            () => {
              if (rows.length > 0) {
                this.InitialhandleRowClick(null, rows[0], "row_0");
              }
            }
          );
        } else {
          this.setState({ branchData: [], ProgressLoader: true });
        }
      })
      .catch((error) => {
        //console.log("error > ", error);
      });
  }

  InitialhandleRowClick(e, item, id) {
    console.log("InitialhandleRowClick > id > ", id);
    console.log("InitialhandleRowClick > vitem > ", item);
    let editUrl =
      URLS.URLS.editWarehouse +
      this.state.urlparams +
      "&editwareHouseId=" +
      item.wareHouseId;
    console.log("InitialhandleRowClick   ", editUrl);
    this.setState({ editurl: editUrl });  
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }

  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.warehouses.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  render() {
    const handleRowClick = (e, item, id) => {
      let editUrl =
        URLS.URLS.editWarehouse +
        this.state.urlparams +
        "&editwareHouseId=" +
        item.wareHouseId;
      this.setState({ editurl: editUrl });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.warehouses.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    };

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    return (
      <Fragment>
        <Header />
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
                <Breadcrumbs
                  className="style-breadcrumb"
                  aria-label="breadcrumb"
                >
                  <Link
                    color="inherit"
                    className="backLink"
                    onClick={this.props.history.goBack}
                  >
                    Back
                  </Link>
                  <Link
                    color="inherit"
                    href={URLS.URLS.userDashboard + this.state.urlparams}
                  >
                    Dashboard
                  </Link>
                  <Typography color="textPrimary">Warehouse Master</Typography>
                </Breadcrumbs>
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
                      openPage(URLS.URLS.addWarehouse + this.state.urlparams)
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
            <Grid xs={12} sm={12} md={5} lg={5}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}>
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
                          Status
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                      {this.state.warehouses.map((item, i) => (
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
                                URLS.URLS.editWarehouse +
                                this.state.urlparams +
                                "&editwareHouseId=" +
                                item.wareHouseId
                              }
                            >
                              {URLS.PREFIX.wareHouseId + item.wareHouseId}
                            </a>
                          </TableCell>
                          <TableCell align="left">{item.code}</TableCell>
                          <TableCell align="left">{item.description}</TableCell>
                          <TableCell align="left">
                            {item.isActive === true ? (
                              <CheckIcon style={{ color: "green" }} />
                            ) : (
                              <PriorityHighIcon style={{ color: "red" }} />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default warehouseMaster;
