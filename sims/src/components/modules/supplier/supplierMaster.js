import React, { Fragment } from "react";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

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

import BackdropLoader from "../../compo/backdrop";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import Dualtabcomponent from "../../compo/dualtabcomponent";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import MasterDataGrid from "../../compo/masterdatagrid";

class supplierMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      ProgressLoader: false,
      editBtnDisable: true,
      initialCss: "",
      urlparams: "",
      editUrl: "",
      columns: APIURLS.supplierMasterColumn,
      SupplierData: [],
    };
  }
  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getSupplierList();
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
    this.setState({ urlparams: params });
  }

  getSupplierList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplier;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        if (data.length > 0) {
          this.setState({ SupplierData: data, ProgressLoader: true }, () => {
            this.handleRowClick([1]);
          });
        } else {
          this.setState({ SupplierData: data, ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ SupplierData: [], ProgressLoader: true });
      });
  };

  handleRowClick = (e) => {
    try{
      let index = e[0];
      let item = this.state.SupplierData[index - 1];
      let editUrl =
      URLS.URLS.editSupplier +
      this.state.urlparams +
      "&editSuplID=" +
      item.SuplID+"&type=edit";
      this.setState({
        SuplID: item.SuplID,
        editUrl: editUrl,
        editBtnDisable: false,
        selectedItem: item,
        selectionModel: index
      });

    }catch(err){}
     
  };

  

  render() {
    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const handlePageChange = (event, newPage) => {
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const customerList = (
      <Fragment>

        {this.state.SupplierData.length > 0 ? (
          <Fragment>

            <MasterDataGrid
              selectionModel={this.state.selectionModel}
              rows={this.state.SupplierData}
              columns={this.state.columns}
              pagination={this.state.pagination}
              onSelectionModelChange={(e) => this.handleRowClick(e)}
              onPageChange={handlePageChange}


            />


          </Fragment>
        ) : (
          <Tableskeleton />
        )}

      </Fragment>
    );

    const tab1Html = (
      <Fragment>
        <div className="sidenav-fixedheight-scroll">
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              {/* <div style={{ marginTop: 5, marginLeft: 15 }}>
                <h4 style={{ color: "#000000" }}>Customer Sales history</h4>
              </div> */}
              <TableContainer>
                <Table
                  stickyHeader
                  size="small"
                  className="accordion-table"
                  aria-label="table"
                >
                  <TableBody className="tableBody">
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Supplier No
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        123456
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ height: 20 }}></div>
            </Grid>
          </Grid>
          <Grid
            container
            spacing={0}
            style={{ marginLeft: 10, marginRight: 10 }}
          >
            <Grid
              item
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <Grid container spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <div key="paymentPendingLink" to="#" className="card-link">
                    <Card className="dash-activity-card2" raised={false}>
                      <CardContent>
                        <Typography
                          color="textSecondary"
                          style={{ fontSize: 12, color: "#fff" }}
                          noWrap={false}
                          gutterBottom
                        >
                          Ongoing Sales
                        </Typography>
                        <Typography>000</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <div key="paymentPendingLink" to="#" className="card-link">
                    <Card className="dash-activity-card2" raised={false}>
                      <CardContent>
                        <Typography
                          color="textSecondary"
                          style={{ fontSize: 12, color: "#fff" }}
                          noWrap={false}
                          gutterBottom
                        >
                          Total Sales &nbsp;&nbsp;&nbsp;
                        </Typography>
                        <Typography>0,000</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                  <div key="paymentPendingLink" to="#" className="card-link">
                    <Card className="dash-activity-card2" raised={false}>
                      <CardContent>
                        <Typography
                          color="textSecondary"
                          style={{ fontSize: 12, color: "#fff" }}
                          noWrap={false}
                          gutterBottom
                        >
                          PO Raised &nbsp;&nbsp;&nbsp;
                        </Typography>
                        <Typography>0,000</Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ height: 40 }}></div>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ marginLeft: 30, marginRight: 20 }}>
                <Divider />
              </div>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={11}
              lg={11}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ height: 20 }}></div>
            </Grid>
          </Grid>

          <Grid container spacing={0}>
            <Grid
              xs={12}
              sm={12}
              md={10}
              lg={10}
              style={{ backgroundColor: "#fff" }}
            >
              <div style={{ marginTop: 5, marginLeft: 15 }}>
                <h4 style={{ color: "#000000" }}>Statistics</h4>
              </div>
              <TableContainer>
                <Table
                  stickyHeader
                  size="small"
                  className="accordion-table"
                  aria-label="table"
                >
                  <TableBody className="tableBody">
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        <span className="inside-table-cell-bold">Sales</span>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="no-border-table"
                      ></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        <span className="inside-table-cell-bold">Payments</span>
                      </TableCell>
                      <TableCell
                        align="right"
                        className="no-border-table"
                      ></TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">
                        Balance
                      </TableCell>
                      <TableCell align="right" className="no-border-table">
                        000
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );

    

    const sideDataNavigation = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid
            xs={12}
            sm={12}
            md={12}
            lg={12}
            style={{ backgroundColor: "#fff" }}
          >
            <Dualtabcomponent
              tab1name="Details"
              tab2name="Attachments"
              tab1Html={tab1Html}
              tab2Html={null}
            />
          </Grid>
        </Grid>
      </Fragment>
    );

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Supplier"
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
            onClick={(e) =>
              openPage(
                URLS.URLS.addSupplier + this.state.urlparams + "&type=add"
              )
            }
          >
            {APIURLS.buttonTitle.add.name}
          </Button>
          <Button
            startIcon={APIURLS.buttonTitle.edit.icon}
            className="action-btns"
            onClick={(e) => openPage(this.state.editUrl)}
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
            {customerList}
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Grid container spacing={0}>
                  <Grid xs={12} sm={12} md={11} lg={11}>
                    {sideDataNavigation}
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
export default supplierMaster;
