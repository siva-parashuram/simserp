import React, { Fragment } from "react";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

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
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";
import MasterDataGrid from "../../compo/masterdatagrid";


class itemMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      columns:APIURLS.itemMasterColumn,
      ProgressLoader: false,
      isLoggedIn: false,
      editBtnDisable: true,
      initialCss: "",
      urlparams: "",
      editurl: "",
      itemData: [],
      selectedItem: {},
      ItemID:null
    };
  }

  componentDidMount() {
    this.performancecheck();
    let params = CF.GET_URL_PARAMS();
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
      this.setState({ urlparams: params });
      this.getItems();
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  performancecheck = () => {
    var arr = new Array(10000).fill().map((d, i) => ++i)


    let t0 = performance.now();
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i]
    }
    let t1 = performance.now();
    console.log(`For-Loop through array a million times took ${t1 - t0} milliseconds.`);

    let t2 = performance.now();
    arr.map(item => item)

    let t3 = performance.now();
    console.log(`.Map through array a million times took ${t3 - t2} milliseconds.`);

    //An array size of 1,000
    arr = new Array(10000).fill().map((d, i) => ++i)


    t0 = performance.now();
    for (var i = 0; i < arr.length; i++) {
      arr[i] = arr[i]
    }
    t1 = performance.now();
    console.log(`For-Loop through array a thousand times took ${t1 - t0} milliseconds.`);

    t2 = performance.now();
    arr.map(item => item)

    t3 = performance.now();
    console.log(`.Map through array a thousand times took ${t3 - t2} milliseconds.`);
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
        data.map((item,i)=>{
          item.id=i+1;
        })
        // for(let i=0;i<data.length;i++){
        //   data[i].id=i+1;
        // }
        this.setState({ itemData: data }, () => {
          this.handleRowClick([1]);
        });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {});
  }

   handleRowClick = (e) => {

    try {
      let index = e[0];      
      let item = this.state.itemData[index - 1]; 
      let editUrl =
      URLS.URLS.editItem + this.state.urlparams + "&edititemId=" + item.ItemID;

      this.setState({
        ItemID: item.ItemID,
        editurl: editUrl,
        editBtnDisable: false,
        selectedItem: item,
        selectionModel:index
      });

    } catch (e) {}

   
  };

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };
 

  render() {
   

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Item"
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
            className="action-btns"
            startIcon={APIURLS.buttonTitle.add.icon}
            onClick={(e) => this.openPage(URLS.URLS.addItem + this.state.urlparams)}
          >
            {APIURLS.buttonTitle.add.name}
          </Button>
          <Button
            className="action-btns"
            startIcon={APIURLS.buttonTitle.edit.icon}
            onClick={(e) => this.openPage(this.state.editurl)}
            disabled={this.state.editBtnDisable}
          >
            {APIURLS.buttonTitle.edit.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    const handlePageChange = (event, newPage) => {     
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

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
              {this.state.itemData.length > 0 ? (
                  <Fragment>

                    <MasterDataGrid
                      selectionModel={this.state.selectionModel}
                      rows={this.state.itemData}
                      columns={this.state.columns}
                      pagination={this.state.pagination}
                      onSelectionModelChange={(e) => this.handleRowClick(e)}
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
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Itemquickdetails item={this.state.selectedItem} />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default itemMaster;
