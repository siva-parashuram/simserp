import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
 
import Button from "@material-ui/core/Button";

 

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import "../../user/dasboard.css";
import * as CF from "../../../services/functions/customfunctions";

import ButtonGroup from "@mui/material/ButtonGroup";

import ErrorSnackBar from "../../compo/errorSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";
import MasterDataGrid from "../../compo/masterdatagrid";


class numberingmaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      urlparams: "",
      ProgressLoader: true,
      ErrorMessageProps:"",
      ErrorPrompt:false,
      initialCss: "",
      numberings: [],
      editurl: null,
      columns: APIURLS.numberingMasterColumn,
      selectionModel:[1]
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
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
              numberings:data,
              ProgressLoader: true,
            },
            () => {
              if (this.state.numberings.length > 0) {
                this.handleRowClick([1]);
              }
            }
          );
        } else {
          this.setState({
            numberings: [],
            ProgressLoader: true,
            ErrorPrompt: true,
          });
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

   handleRowClick = (e) => {
    try{
      let index = e[0];
      let item = this.state.numberings[index - 1];
      let editUrl =
      URLS.URLS.editNumbering +
      this.state.urlparams +
      "&noSeriesId=" +
      item.NoSeriesID;

    this.setState({ editurl: editUrl,selectionModel: index });
    }catch(err){}
   
   
  
  };

  render() {

    
    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };
    

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const handlePageChange = (event, newPage) => {
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          typoTitle="Nos. Series"
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
              openPage(URLS.URLS.addNumbering + this.state.urlparams)
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

        <ErrorSnackBar
          ErrorMessageProps={this.state.ErrorMessageProps}
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />

        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12} lg={12}>


                {this.state.numberings.length > 0 ? (
                  <Fragment>

                    <MasterDataGrid
                      selectionModel={this.state.selectionModel}
                      rows={this.state.numberings}
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
          <Grid xs={12} sm={12} md={6} lg={6}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}></Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default numberingmaster;
