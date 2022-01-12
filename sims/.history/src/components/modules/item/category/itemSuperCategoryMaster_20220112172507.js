import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";

import Breadcrumb from "../../../compo/breadcrumb";
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../../compo/backdrop";
import MasterDataGrid from "../../../compo/masterdatagrid";
import Tableskeleton from "../../../compo/tableskeleton";

let rows = [];
class itemSuperCategoryMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      columns:APIURLS.superCategoryMasterColumn,
      urlparams: "",
      ProgressLoader: true,
      selectedItem: {},
      DataList: [],
      editurl: "",
      itemDeptId: 0,
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
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
      urlparams: params,
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
          this.handleRowClick([1]);
          
        });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }


  

  handleRowClick(e) {
    try {
      let index = e[0];      
      let item = this.state.DataList[index - 1]; 
      let editUrl =
      URLS.URLS.editItemSuperCategory +
      this.state.urlparams +
      "&editsuperCatId=" +
      item.superCatId;
      this.setState({
        itemDeptId: item.superCatId,
        editurl: editUrl,
        selectionModel:index
      });
      this.setParams(item,editUrl,index); 
    } catch (e) {}
  }
  

  render() {
   

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
          typoTitle="Super Category"
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

              {this.state.DataList.length > 0 ? (
                  <Fragment>

                    <MasterDataGrid
                      selectionModel={this.state.selectionModel}
                      rows={this.state.DataList}
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
          <Grid xs={12} sm={12} md={4} lg={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default itemSuperCategoryMaster;
