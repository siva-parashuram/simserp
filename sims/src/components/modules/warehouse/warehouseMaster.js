import React, { Fragment } from "react";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import Grid from "@material-ui/core/Grid";
 
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Button from "@material-ui/core/Button";
import CheckIcon from "@mui/icons-material/Check";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";


import axios from "axios";
import Loader from "../../compo/loader";

import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import BackdropLoader from "../../compo/backdrop";



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
      BranchID:parseInt(branchId),
    },()=>{
      this.getWarehouses();
    });
  }

  getWarehouses() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetWareHousesUrl = APIURLS.APIURL.GetWareHouseByBranchID;//APIURLS.APIURL.GetWareHouses;

    let reqData = {
      ValidUser: ValidUser,
      WareHouse: {
        BranchID: this.state.BranchID
      }
    };
    

    axios
      .post(GetWareHousesUrl, reqData, { headers })
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
      .catch((error) => {});
  }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editWarehouse +
      this.state.urlparams +
      "&editwareHouseId=" +
      item.WareHouseID;

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
        item.WareHouseID;
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
                  backOnClick={this.props.history.goBack}
                  linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                  linkTitle="Dashboard"
                  typoTitle="Warehouse"
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
              openPage(URLS.URLS.addWarehouse + this.state.urlparams)
            }
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
                <Grid xs={12} sm={12} md={12} lg={12}>
                  {this.state.warehouses.length>0?(
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
                          Default
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
                            {i+1}
                          </TableCell>
                          <TableCell align="left">{item.Code}</TableCell>
                          <TableCell align="left">{item.Description}</TableCell>
                          <TableCell align="left">
                            {item.IsDefault === true ? (
                              <CheckIcon style={{ color: "blue" }} />
                            ) :null}
                          </TableCell>
                          <TableCell align="left">
                            {item.IsActive === true ? (
                              <CheckIcon style={{ color: "green" }} />
                            ) : (
                              <PriorityHighIcon style={{ color: "red" }} />
                            )}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                   </Fragment>
                  ):(
                    <Tableskeleton/>
                  )}
                  
                </Grid>
              </Grid>
            </Grid>
          </Grid>
      </Fragment>
    );
  }
}
export default warehouseMaster;
