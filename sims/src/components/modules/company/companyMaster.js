import React, { Fragment } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

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
 

import FileDownloadIcon from "@mui/icons-material/FileDownload";

import Branchlistbycompany from "./branchlistbycompany";

import CompanyQuickDetails from "./companyquickdetails";

import MasterDataGrid from "../../compo/masterdatagrid";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Pagination from "../../compo/paginationcomponent";
import BackdropLoader from "../../compo/backdrop";



import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

 
 

const initialCss = "";

class companyMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 1,
        rowsPerPage: APIURLS.pagination.rowsPerPage,
      },
      page: 1,
      rowsPerPage: 10,
      item: null,
      editUrl: null,
      isLoggedIn: false,
      BackdropLoader:true,
      ProgressLoader: false,
      branchName: "",
      branchId: "",
      compName: "",
      branch: [],  
      columns: APIURLS.companyMasterColumn,
      masterCompanyData: [],
      companyData: [],
      showSavedAlert: false,
      selectedCompanyId: 0,
      initialCss: initialCss,
      DeleteDisabled: true,
      companyDialogStatus: false,
      UpdateCompany: true,
      urlparams: "",
      filelist: [],
      rowClicked: 1,
      selectionModel:1,
    };
  }

  componentDidMount() {
    if (getCookie(COOKIE.USERID) != null) {
      this.getCompanyList();
       
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
      this.setState({
        branchName: branchName,
        branchId: branchId,
        compName: compName,
        urlparams: urlparams,
      });
    } else {
      this.setState({ isLoggedIn: false });
    }
  }

  handleCheckboxChange = (e, id) => {
    console.log("handleCheckboxChange > e > ", e);
    console.log("handleCheckboxChange > e.target > ", e.target);
    var elementCheckedChk = document.getElementById(id).checked;
    console.log(
      "handleCheckboxChange > elementCheckedChk > ",
      elementCheckedChk
    );
    if (elementCheckedChk === true) {
      document.getElementById(id).checked = true;
    }
    if (elementCheckedChk === false) {
      document.getElementById(id).checked = false;
    }
  };

  

  initializeRows=(data)=>{
    let rows=[];
    for(let i=0;i<data.length;i++){
      let r = {
        id: data[i].CompanyID,
        Address: data[i].Address,
        Address2: data[i].Address2,
        Address3: data[i].Address3,
        Branch:data[i].Branch ,
        City: data[i].City,
        CompanyID: data[i].CompanyID,
        CompanyName: data[i].CompanyName,
        CountryID: data[i].CountryID,
        IsActive: data[i].IsActive,
        PhoneNo: data[i].PhoneNo,
        Postcode: data[i].Postcode,
        StateID: data[i].StateID,
        Website: data[i].Website,
      };
      rows.push(r);
    }

    

    this.setState({companyData:rows,ProgressLoader: true});
  }

  getCompanyList() {
    let rows = [];

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCompaniesUrl = APIURLS.APIURL.GetCompanies;

    axios
      .post(GetCompaniesUrl, ValidUser, { headers })
      .then((response) => {
        console.log("getCompanyList > response >  ", response);
        if (response.status === 200) {
          if (response.data === "Invalid User") {
            alert("Un-Authorized Access Found!");
            window.close();
          } else {
            let data = response.data;
            // rows = data;
             rows=[];
            for(let i=0;i<data.length;i++){
              data[i].id=i+1;              
            }
            this.setState({companyData:data,ProgressLoader: true},()=>{
              if(data.length>0){
                this.handleRowClick([this.state.selectionModel]);
              }
            });            
          }
        } else {
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        }
      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });
  }


  handleRowClick=(e)=> {
    try {
      console.log("handleRowClick > e > ", e);
      let index = e[0];
      
      let item = this.state.companyData[index - 1];     
      let branches = item.Branch;
      let editUrl =
        URLS.URLS.editCompany +
        this.state.urlparams +
        "&compID=" +
        item.CompanyID+ "&type=edit";
      this.setState({
        item: item,
        branch: branches,
        editUrl: editUrl,
        selectionModel:index,
      });
      this.getAttachments(item.CompanyID);
    } catch (e) {
      console.log("Error : ", e);
    } 
  }  

  getAttachments=(companyId) =>{
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const FTPGetAttachmentsUrl = APIURLS.APIURL.FTPFILELIST;
    const headers = {
      "Content-Type": "application/json",
    };

    const formData = new FormData();
    formData.append("UserID", parseInt(getCookie(COOKIE.USERID)));
    formData.append("Token", getCookie(COOKIE.TOKEN));
    formData.append("CompanyId", companyId);
    formData.append("BranchID", 0);
    formData.append("Transaction", APIURLS.TrasactionType.default);
    formData.append("TransactionNo", "");
    formData.append("FileData", "");

    axios
      .post(FTPGetAttachmentsUrl, formData, { headers })
      .then((response) => {
        this.setState({ filelist: response.data });
      })
      .catch((error) => {
        console.log("error > ", error);
      });
  }

   openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };

  render() {    


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
          typoTitle="Company Master"
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
              this.openPage(URLS.URLS.addNewCompany + this.state.urlparams+ "&type=add")
            }
          >
            {APIURLS.buttonTitle.add.name}
          </Button>
          <Button
            startIcon={APIURLS.buttonTitle.edit.icon}
            className="action-btns"
            onClick={(e) => this.openPage(this.state.editUrl)}
          >
            {APIURLS.buttonTitle.edit.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <CssBaseline />
        <BackdropLoader open={!this.state.ProgressLoader} />

       

        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            {this.state.companyData.length > 0  ? (
              <Fragment> 
                         
                <MasterDataGrid
                 selectionModel={this.state.selectionModel}
                 rows={this.state.companyData}
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
          <Grid xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                {/*<Branchlistbycompany data={this.state.branch} />*/}
                {this.state.item === null || this.state.item === {} ? null : (
                  <CompanyQuickDetails
                    data={this.state.branch===null?[]:this.state.branch}
                    item={this.state.item}
                    filelist={this.state.filelist}
                    rowClicked={this.state.rowClicked}
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default companyMaster;
