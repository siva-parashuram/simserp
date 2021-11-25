import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

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
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../../compo/backdrop";


let rows = [];
class itemSuperCategoryMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      selectedItem: {},
      DataList: [],
      editurl: "",
      itemDeptId: 0,
    };
  }

  componentDidMount() {
    this.getDataList();
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

  getDataList() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetItemSuperCategories;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ DataList: data }, () => {
          this.InitialhandleRowClick(null, data[0], "row_0");
        });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  InitialhandleRowClick(e, item, id) {
    let editUrl =
      URLS.URLS.editItemSuperCategory +
      this.state.urlparams +
      "&editsuperCatId=" +
      item.superCatId;
    this.setState({
      itemDeptId: item.superCatId,
      editurl: editUrl,
      selectedItem: item,
      editBtnDisable: false,
    });
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add("selectedRow");
  }
  InitialremoveIsSelectedRowClasses() {
    for (let i = 0; i < this.state.DataList.length; i++) {
      document.getElementById("row_" + i).className = "";
    }
  }

  render() {
    const handleRowClick = (e, item, id) => {
      let editUrl =
        URLS.URLS.editItemSuperCategory +
        this.state.urlparams +
        "&editsuperCatId=" +
        item.superCatId;
      this.setState({
        itemDeptId: item.superCatId,
        editurl: editUrl,
        selectedItem: item,
        editBtnDisable: false,
      });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.DataList.length; i++) {
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
          typoTitle="Item Super-Category Master"
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
              openPage(URLS.URLS.addItemSuperCategory + this.state.urlparams)
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
              <Grid xs={12} sm={12} md={10} lg={10}>
                <Table
                  stickyHeader
                  size="small"
                  className=""
                  aria-label="Item-catagory List table"
                >
                  <TableHead className="table-header-background">
                    <TableRow>
                      <TableCell className="table-header-font">#</TableCell>
                      <TableCell className="table-header-font" align="left">
                        Code
                      </TableCell>
                      <TableCell className="table-header-font" align="left">
                        HSNcode
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
                    {this.state.DataList.map((item, i) => (
                      <TableRow
                        id={"row_" + i}
                        className={this.state.initialCss}
                        hover
                        key={i}
                        onClick={(event) =>
                          handleRowClick(event, item, "row_" + i)
                        }
                      >
                        <TableCell align="left">{i + 1}</TableCell>
                        <TableCell align="left">
                          <a
                            className="LINK tableLink"
                            href={
                              URLS.URLS.editItemSuperCategory +
                              this.state.urlparams +
                              "&editsuperCatId=" +
                              item.superCatId
                            }
                          >
                            {item.code}
                          </a>
                        </TableCell>
                        <TableCell align="left">{item.hsncode}</TableCell>
                        <TableCell align="left">{item.description}</TableCell>
                        <TableCell align="left">
                          {item.isActive === true ? (
                            <span style={{ color: "green" }}>Active</span>
                          ) : (
                            <span style={{ color: "red" }}>In-Active</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Grid>
            </Grid>
          </Grid>
          <Grid xs={12} sm={12} md={4} lg={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default itemSuperCategoryMaster;
