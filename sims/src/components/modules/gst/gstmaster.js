import React, { Fragment } from "react";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import Dualtabcomponent from "../../compo/dualtabcomponent";

class gstMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProgressLoader: true,
      editBtnDisable: false,
      initialCss: "",
      urlparams: "",
      editUrl: "",
      gstData: [],
    };
  }
  componentDidMount() {
    this.getgstList();
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
    this.setState({ urlparams: urlparams });
  }

  getgstList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    // let Url = APIURLS.APIURL.;
    // axios
    //     .post(Url, ValidUser, { headers })
    //     .then((response) => {
    //         let data = response.data;
    //         this.setState({ gstData: data, ProgressLoader: true },()=>{
    //             this.handleRowClick(null, data[0], "row_0");
    //         });
    //     })
    //     .catch((error) => {
    //         this.setState({ gstData: [], ProgressLoader: true });
    //     });
  };

  handleRowClick = (e, item, id) => {
    // let editUrl =
    //     URLS.URLS.editGst +
    //     this.state.urlparams +
    //     "&editGSTGroupID=" +
    //     item.GSTGroupID;
    // editUrl = editUrl + "&type=edit";
    // this.setState({
    //     GSTGroupID: item.GSTGroupID,
    //     editUrl: editUrl,
    //     editBtnDisable:false,
    // });

    this.removeIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  };

  removeIsSelectedRowClasses = () => {
    for (let i = 0; i < this.state.gstData.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  };

  render() {
    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const gstList = (
      //   <Fragment>
      //     {this.state.gstData.length > 0 ? (
      <Fragment>
        <TableContainer style={{ maxHeight: 440 }}>
          <Table
            stickyHeader
            size="small"
            className=""
            aria-label="item List table"
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
            <TableBody className="tableBody"></TableBody>
          </Table>
        </TableContainer>
      </Fragment>
      //     ) : (
      //       <Tableskeleton />
      //     )}
      //   </Fragment>
    );

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />

        <div className="breadcrumb-height">
          <Grid container spacing={1}>
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
                  typoTitle="GST Master"
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
                      openPage(
                        URLS.URLS.addGst + this.state.urlparams + "&type=add"
                      )
                    }
                  >
                    {APIURLS.buttonTitle.add}
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) => openPage(this.state.editUrl)}
                    disabled={this.state.editBtnDisable}
                  >
                    {APIURLS.buttonTitle.edit}
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>
        <div className="breadcrumb-bottom"></div>
        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            {gstList}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default gstMaster;
