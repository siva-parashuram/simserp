import React, { Fragment } from "react";

import CssBaseline from "@material-ui/core/CssBaseline";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Header from "../../user/userheaderconstants";
import LinearProgress from "@material-ui/core/LinearProgress";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";


import Button from "@material-ui/core/Button";


import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@mui/icons-material/Edit';
import Branchlistbycompany from "./branchlistbycompany";

let columns = [];

let rows = [];

const initialCss = "";

class companyMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editUrl:null,
      isLoggedIn: false,
      ProgressLoader: false,
      branchName: "",
      branchId: "",
      compName: "",
      branch: [],
      columns: columns,
      masterCompanyData: rows,
      companyData: rows,
      showSavedAlert: false,
      selectedCompanyId: 0,
      initialCss: initialCss,
      DeleteDisabled: true,
      companyDialogStatus: false,
      UpdateCompany: true,
      urlparams: "",
    };
  }

  componentDidMount() {
    if (getCookie(COOKIE.USERID) != null) {
      this.getCompanyList();
      this.setColumns();
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

  setColumns() {
    let columns = [
      {
        field: "sno",
        headerName: "sno",
        type: "number",
        width: 100,
        editable: false,
        headerClassName: "tbl-hdr-css",
      },
      {
        field: "company",
        headerName: "company",
        width: 300,
        editable: true,
        headerClassName: "tbl-hdr-css",
      },
    ];

    this.setState({ columns: columns });
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
        let data = response.data;
        console.log("getCompanyList > response > data > ", data);
        rows = data;
        this.setState({
          masterCompanyData: rows,
          companyData: rows,
          ProgressLoader: true,
        },()=>{
          if(this.state.companyData.length>0){
            this.InitialhandleRowClick(null,this.state.companyData[0],"row_0");
        }
        });
      })
      .catch((error) => {
        console.log("error > ", error);
      });
  }

  InitialhandleRowClick (e, item, id){
    console.log("handleRowClick > id > ",id);
    console.log("handleRowClick > vitem > ",item);
    let editUrl=URLS.URLS.editCompany+this.state.urlparams + "&compID=" + item.companyId;
    let branches = item.branches;
    this.setState({branch: branches,editUrl:editUrl});
    this.InitialremoveIsSelectedRowClasses();
    document.getElementById(id).classList.add('selectedRow');
}

InitialremoveIsSelectedRowClasses(){
    for (let i = 0; i < this.state.companyData.length; i++) {
        document.getElementById('row_' + i).className = '';
    }
}



  render() {
    const handleRowClick = (e, item, id) => {
      console.log("handleRowClick > e > ", e);
      console.log("handleRowClick > item > ", item);
      let branches = item.branches;
      let editUrl=URLS.URLS.editCompany+this.state.urlparams + "&compID=" + item.companyId;
      // getCompanyBranchList(item.companyId);
      this.setState({ branch: branches,editUrl:editUrl });
      removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    };

    const removeIsSelectedRowClasses = () => {
      for (let i = 0; i < this.state.companyData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    };

    const getCompanyBranchList = (companyId) => { };

    const searchInput = (e) => {
      removeIsSelectedRowClasses();
      console.log("searchInput > e > ", e);
      console.log("searchInput > e.target > ", e.target);
      console.log("searchInput > e.value > ", e.value);
      let key = document.getElementById("searchBox").value;
      console.log("searchInput > key > ", key);
      sortAsPerKey(key);
    };

    const sortAsPerKey = (key) => {
      key = key.toLowerCase();
      let rows = [];
      let masterCompanyData = this.state.masterCompanyData;
      if (key === "" || key == null) {
        this.setState({ companyData: masterCompanyData });
      } else {
        for (let i = 0; i < masterCompanyData.length; i++) {
          if (
            masterCompanyData[i].companyName != null
              ? masterCompanyData[i].companyName.toLowerCase().includes(key)
              : null || masterCompanyData[i].address != null
                ? masterCompanyData[i].address.toLowerCase().includes(key)
                : null || masterCompanyData[i].companyId != null
                  ? masterCompanyData[i].companyId
                    .toString()
                    .toLowerCase()
                    .includes(key)
                  : null
          ) {
            rows.push(masterCompanyData[i]);
          }
        }
        this.setState({ companyData: rows });
      }
    };

    // const createNewCompanyRow=()=>{
    //      this.setState({UpdateCompany:false,companyDialogStatus:true});
    // }

    const openCompanyDetail = (e, item) => {
      console.log("openCompanyDetail > e > ", e);
      console.log("openCompanyDetail > item > ", item);
    };

    const handleClose = (reason) => {
      if (reason === "YES") {
        this.setState({ companyDialogStatus: false });
      }
    };

    const updateCompanyMasterDetail = (key, e) => {
      console.log("updateCompanyMasterDetail > key > ", key);
      console.log("updateCompanyMasterDetail > e > ", e.target);
    };

    const openPage = (url) => {             
      this.setState({ ProgressLoader: false });
      window.location = url;
  }

    return (
      <Fragment>
        <CssBaseline />
        <Header />
        {this.state.ProgressLoader === false ? (<div style={{ marginTop: 5, marginLeft: -10 }}><LinearProgress
          className="linearProgress-css"
        /> </div>) : null}

        <div className="breadcrumb-height">
          <Grid container spacing={1}>
            <Grid xs={12} sm={12} md={4} lg={4} style={{ borderRightStyle: 'solid', borderRightColor: '#bdbdbd', borderRightWidth: 1 }}>
              <div style={{ marginTop: 8 }}>
                <Breadcrumbs className='style-breadcrumb' aria-label="breadcrumb">
                  <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                    Back
                  </Link>
                  <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                    Dashboard
                  </Link>
                  <Typography color="textPrimary"> Company master</Typography>
                </Breadcrumbs>
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <div style={{ marginLeft: 10, marginTop: 1 }}>
                <ButtonGroup size="small" variant="text" aria-label="Action Menu Button group">
                  <Button
                    className="action-btns"
                    startIcon={<AddIcon />}
                   onClick={(e) => openPage(URLS.URLS.addNewCompany + this.state.urlparams)}                                     
                  >
                    
                      NEW
                   
                  </Button>
                  <Button
                    className="action-btns"
                    startIcon={<EditIcon />}
                  onClick={(e) => openPage(this.state.editUrl)}
                  >Edit</Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>

           
          <div className="breadcrumb-bottom"></div>
          <Grid container spacing={0}>
            <Grid className="style-all-Links" xs={1}>
              <Link
                className="style-link"
                href={URLS.URLS.addNewCompany + this.state.urlparams}
              >
                NEW
              </Link>
            </Grid>
          </Grid>
          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <TableContainer style={{ maxHeight: 440 }}>
                <Table
                  stickyHeader
                  size="small"
                  className=""
                  aria-label="company List table"
                >
                  <TableHead className="table-header-background">
                    <TableRow>
                      <TableCell className="table-header-font">#</TableCell>
                      <TableCell className="table-header-font" align="left">
                        Company Name
                      </TableCell>
                      <TableCell className="table-header-font" align="left">
                        Address
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {this.state.companyData.map((item, i) => (
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
                              URLS.URLS.editCompany +
                              this.state.urlparams +
                              "&compID=" +
                              item.companyId
                            }
                            onClick={(e) => openCompanyDetail(e, item)}
                          >
                            {URLS.PREFIX.companyID + item.companyId}
                          </a>
                        </TableCell>
                        <TableCell align="left">{item.companyName}</TableCell>
                        <TableCell align="left">{item.address}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={10} lg={10}>
                  <Branchlistbycompany data={this.state.branch} />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default companyMaster;
