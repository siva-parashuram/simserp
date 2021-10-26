import React, { Fragment } from "react";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";

import Itemquickdetails from "./itemquickdetails";

class itemMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ProgressLoader: false,
      isLoggedIn: false,
      editBtnDisable:true,
      initialCss: "",
      urlparams: "",
      editUrl:"",
      itemData: [],
      selectedItem:{},
    };
  }


  componentDidMount() {
    if (getCookie(COOKIE.USERID) != null) {
      this.setState({ isLoggedIn: true });
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
      this.getItems();
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  getItems() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetAllItems;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({itemData:data},()=>{this.InitialhandleRowClick(null, data[0], "row_0");});
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => { });
  }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
    URLS.URLS.editItem +
    this.state.urlparams +
    "&edititemId=" +
    item.itemId;
    this.setState({ moduleId: item.moduleId, editurl: editUrl,selectedItem:item,editBtnDisable:false });
    this.InitialremoveIsSelectedRowClasses(); 
    document.getElementById(id).classList.add("selectedRow");
  }
  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.itemData.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  render() {

    const handleRowClick = (e, item, id) => {
      let editUrl =
      URLS.URLS.editItem +
      this.state.urlparams +
      "&edititemId=" +
      item.itemId;
      this.setState({ moduleId: item.moduleId, editurl: editUrl,editBtnDisable:false,selectedItem:item });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.itemData.length; i++) {
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
                  typoTitle="Item Master"
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
                      openPage(URLS.URLS.addItem + this.state.urlparams)
                    }
                  >
                    NEW
                  </Button>
                  <Button className="action-btns"
                    startIcon={<EditIcon />}
                    onClick={(e) =>
                      openPage(this.state.editurl)
                    }
                    disabled={this.state.editBtnDisable}
                  >
                    Edit
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="breadcrumb-bottom"></div>

        <div className="New-link-bottom"></div>
        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            {this.state.itemData.length > 0 ? (
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
                          Item Code
                        </TableCell>
                        <TableCell className="table-header-font" align="left">
                          Alias
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody className="tableBody">
                      {this.state.itemData.map((item, i) => (
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
                            <a className="LINK tableLink" href={ URLS.URLS.editItem +
                                this.state.urlparams +
                                "&edititemId=" +
                                item.itemId}>
                              {item.itemNo}
                            </a>
                          </TableCell>
                          <TableCell align="left">
                            {item.code}
                          </TableCell>
                          <TableCell align="left">
                            {item.alias}
                          </TableCell>
                        </TableRow>
                      ))}

                    </TableBody>
                  </Table>
                </TableContainer>
              </Fragment>
            ) : (
              <Tableskeleton />
            )}

          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                  <Itemquickdetails item={this.state.selectedItem}/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default itemMaster;
