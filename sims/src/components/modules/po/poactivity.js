import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
 

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";



import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";


import BackdropLoader from "../../compo/backdrop";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Accordioncomponent from "../../compo/accordioncomponent";
import TextboxInput from "../../compo/tablerowcelltextboxinput";
import TablecustomInput from "../../compo/tablerowcellcustomhtml";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import SwitchInput from "../../compo/tablerowcellswitchinput";
import Dualtabcomponent from "../../compo/dualtabcomponent";


class poactivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DialogStatus:false,
      BranchID: 0,
      accordion1: true,
      accordion2: true,
      accordion3: false,
      ProgressLoader: false,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: true,
      DisableUpdatebtn: false,
      SnackbarStatus:false,
      currentDeleteItemparams:{},
      initialCss: "",
      urlparams: "",
      editurl: "",
      typoTitle: "",
      type: "",
      POItemType: APIURLS.POItemType,
      ItemLinesRow: [],
      ItemLinesColm: [],
      ItemDatagrid: null,
      PO: {
        POID:0,
        BranchID:0,
        No:"",
        PODate:"",
        SuplID:0,   //on supplier chnage show address(BillingID) dropdown, show 1 address detail in section
        POType:0,
        BillingID:0,   //on suplier chnage - show address detail in section
        IsImport:false,
        CurrID:0,  //on supplier chnage show curr dropdown with preselected of supplier
        ExchRate:0,   // on chnage of curr show Exchang Rate by calling API of exchnage
        FCValue:0,   //non editable - but calculate as er user entry as per item added
       
        PaymentTermID:0,     // on supplier chnage dispplay payment term
        PaymentTerm:"",
        ContactPerson:"",
        Reference:"",
        Status:0,
        DispachDate:"",
        DeliveryDate:"",
        WareHouseID:0,
        SpecialInst:"",
        DeliveryAddress:"",
        MODTaxID:0,
        AmendmentNo:"",
        AmendmentDate:"",
        IsRegistedSupplier:false,
        GSTNo:"",
        VATNo:"",
        IsRounding:false,
        IncoID:0,
        ShipmentModeID:0,
        Notes:"",
        IsSEZPurchase:false,
        IsTaxExempt:false,
        Reason:"",
        GeneralPostingGroupID:0,
        SupplierPostingGroupID:0,
        EmployeeID:0, 
        UserID:0,
      }



    };
  }

  componentDidMount() {
    this.getItemLinesColm();
    this.getItemLineList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let type = url.searchParams.get("type");
    let POID = type === "edit" ? url.searchParams.get("editPOID") : 0;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let PO = this.state.PO;
    PO.POID = CF.toInt(POID);
    if (type === "edit") {
      PO.POID = CF.toInt(POID);
      this.getPODetails(PO);
    }

    this.setState({
      PO: PO,
      POID: type === "edit" ? CF.toInt(POID) : 0,
      urlparams: urlparams,
      type: type,
      typoTitle: typoTitle,
      ProgressLoader: type === "add" ? true : false,
      BranchID: CF.toInt(branchId),
    });

    console.log("On load state > ", this.state);
  }

  renderType(params) {
    console.log("renderType > params > ", params);
    let POItemType = APIURLS.POItemType;
    console.log("POItemType > ", POItemType);
    let o = null;
    try {
      o = (
        <Fragment>
          <select
            className="dropdown-css"
            defaultValue={params.value}
          >
            {POItemType.map((item, i) => (
              <option value={item.value}> {item.name}</option>
            ))}
          </select>
        </Fragment>
      );
    } catch (err) { }

    return o;
  }

  renderTypeItem(params) {
    console.log("renderTypeItem > params > ", params);
    let NoList = [];

    if (params.value > 1) {
      NoList = [
        { name: "A", value: 0 },
        { name: "B", value: 1 },
        { name: "C", value: 2 },
        { name: "D", value: 3 },
      ];
    } else {
      NoList = [
        { name: "X", value: 0 },
        { name: "Y", value: 1 },
        { name: "Z", value: 2 },
        { name: "T", value: 3 },
      ];
    }

    console.log("NoList > ", NoList);
    let o = null;
    try {
      o = (
        <Fragment>
          <select
            className="dropdown-css"
            defaultValue={params.value}

          >
            {NoList.map((item, i) => (
              <option value={item.value}> {item.name}</option>
            ))}
          </select>
        </Fragment>
      );
    } catch (err) { }

    return o;
  }

  itemDelete=(e,params)=>{
    console.log("itemDelete > e > ",e);
    console.log("itemDelete > params > ",params);
    this.setState({   
      DialogStatus:true,   
      currentDeleteItemparams:params
    });
  }

  getItemLinesColm = () => {
    const columns = [
      {
        field: 'id',
        headerName: '&nbsp',
        width: 50,
        headerClassName: 'table-header-font',
        renderCell: (params) => (
          <Fragment>
            <DeleteForeverIcon 
            fontSize="small" 
            className="table-delete-icon" 
            onClick={(e)=>this.itemDelete(e,params)}
            />
          </Fragment>
        ),
      },
      
      {
        field: 'Type',
        headerName: 'Type',
        width: 150,
        editable: false,
        headerClassName: 'table-header-font',
        renderCell: this.renderType,
      },
      {
        field: 'NO',
        headerName: 'No.',
        width: 150,
        editable: false,
        headerClassName: 'table-header-font',
        renderCell: this.renderTypeItem,
      },

      {
        field: 'Description',
        headerName: 'Description',
        width: 350,
        headerClassName: 'table-header-font',
        editable: true,
      },
      {
        field: 'Qty',
        headerName: 'Qty',
        type: 'number',
        width: 110,
        headerClassName: 'table-header-font',
        editable: true,
      },
      {
        field: 'UOMID',
        headerName: 'Unit of Measurement',
        width: 250,
        headerClassName: 'table-header-font',
        editable: true,
      },

    ];
    this.setState({ ItemLinesColm: columns }, () => {
      this.setItemLinesListToState();
    });
  }

  setItemLinesListToState = () => {
    let datagrid = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            {/* <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div style={{ height: 50 }}>&nbsp;</div>
              </Grid>
            </Grid> */}
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div style={{ display: 'flex', height: 350, width: '100%' }}>
                  <div style={{ flexGrow: 1 }}>
                    <DataGrid
                      rows={this.state.ItemLinesRow}
                      columns={this.state.ItemLinesColm}
                      pageSize={100}
                      rowsPerPageOptions={[100]}
                      checkboxSelection={false}
                      disableSelectionOnClick={true}
                      hideFooterPagination
                    />
                  </div>
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
    this.setState({ ItemDatagrid: datagrid });
  }

  getItemLineList = () => {
    const rows = [
      { id: 1, Type: 0, NO: 101, Description: 'This is example descript', Qty: 12, UOMID: 1 },
      { id: 2, Type: 1, NO: 225, Description: 'This is example descript - 2 ', Qty: 5, UOMID: 3 },

    ];
    this.setState({ ItemLinesRow: rows });
  }

  getPODetails = () => {

  };





  updateFormValue = (param, e) => {

    this.validateBtnEnable();
  };

  validateBtnEnable = () => {

  };

  setParams = (object) => {
    this.setState({ Customer: object });
  };

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };


  handleDialogClose=()=>{
    this.setState({DialogStatus:false});
  }

  deleteSelectedItem=()=>{
    this.handleDialogClose();
     console.log("deleteSelectedItem > currentDeleteItemparams > ",this.state.currentDeleteItemparams);
  }



  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "accordion1") {
        this.state.accordion1 === true
          ? this.setState({ accordion1: false })
          : this.setState({ accordion1: true });
      }
      if (val === "accordion2") {
        this.state.accordion2 === true
          ? this.setState({ accordion2: false })
          : this.setState({ accordion2: true });
      }
      if (val === "accordion3") {
        this.state.accordion3 === true
          ? this.setState({ accordion3: false })
          : this.setState({ accordion3: true });
      }
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ ErrorPrompt: false });
    };

    const closeSuccessPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
    };

    const AddNew = (e) => {
      this.setState({ Loader: false });
      console.log("Adding new");
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };


    };

    const updatePO = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };

    };


    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.poMaster + this.state.urlparams}
          masterLinkTitle="PO Master"
          typoTitle={this.state.typoTitle}
          level={2}
        />
      </Fragment>
    );

    const buttongroupHtml = (
      <Fragment>
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="Action Menu Button group"
        >
          {this.state.type === "add" ? (
            <Button
            startIcon={APIURLS.buttonTitle.add.icon}
              className="action-btns"
              // onClick={(e) => AddNew(e)}
              disabled={this.state.DisableCreatebtn}
            >
              {APIURLS.buttonTitle.add.name}
            </Button>
          ) : null}

        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
         <BackdropLoader open={!this.state.ProgressLoader} />
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />


        <Grid className="table-adjust" container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Accordioncomponent
              accordionKey="a-1"
              expanded={this.state.accordion1}
              onClick={(e) => handleAccordionClick("accordion1", e)}
              id="accordion1"
              typographyKey="GD-Activity"
              typography="General Details"
              accordiondetailsKey="accordion1"
              html={null}
            />
            <Accordioncomponent
              accordionKey="a-2"
              expanded={this.state.accordion2}
              onClick={(e) => handleAccordionClick("accordion2", e)}
              id="accordion2"
              typographyKey="Inv-Activity"
              typography="Item Lines"
              accordiondetailsKey="accordion2"
              html={this.state.ItemDatagrid}
            />
            {/* <Accordioncomponent
              accordionKey="a-3"
              expanded={this.state.accordion3}
              onClick={(e) => handleAccordionClick("accordion3", e)}
              id="accordion3"
              typographyKey="TaxInf-Activity"
              typography="Tax Information"
              accordiondetailsKey="accordion3"
              html={null}
            /> */}
            <div style={{ height: 50 }}></div>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={11} lg={11}>
                <div style={{ marginLeft: 10 }}>
                  {/* {sideDataNavigation} */}
                </div>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

       

        <Dialog
        open={this.state.DialogStatus}
        onClose={()=>this.handleDialogClose()}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          <span style={{color:'red'}}>Item Delete Request</span>
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {"Do you want to delete this item ?"}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={()=>this.handleDialogClose()}>No</Button>
          <Button onClick={()=>this.deleteSelectedItem()} autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>


      </Fragment>
    );
  }
}
export default poactivity;
