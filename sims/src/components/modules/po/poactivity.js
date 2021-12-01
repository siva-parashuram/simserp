import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';

import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@mui/material/TextField";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import BackdropLoader from "../../compo/backdrop";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";

import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SADIB from "../../compo/gridautocompletedropdowninput";
import SSDV from "../../compo/grid2sectiondisplayview";
import SDTI from "../../compo/griddateinput";
import SCADI from "../../compo/customautocompletecomponent";
import SCI from "../../compo/customtextboxinput";
import SCSI from "../../compo/customswitchinput";

/* supporting components */
import Viewpo from "./component/viewpo";

const today = moment().format(
  "YYYY-MM-DD"
);





class poactivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
      DialogStatus: false,
      BranchID: 0,
      accordion1: false,
      accordion2: true,
      accordion3: false,
      accordion4: false,
      accordion5: false,
      ProgressLoader: false,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: true,
      DisableUpdatebtn: false,
      SnackbarStatus: false,
      currentDeleteItemLine: {},
      initialCss: "",
      urlparams: "",
      editurl: "",
      typoTitle: "",
      type: "",
      POTypeList: APIURLS.POType,
      POItemType: APIURLS.POItemType,
      MODTaxList: [],
      ShipmentModeList: [],
      WarehouseList: [],
      SupplierPostingGroupList: [],
      GeneralPostingGroupList: [],
      CountryList: [],
      StateList: [],
      PaymentTermsMasterList: [],
      PaymentTermsList: [],
      SupplierAddressMasterList: [],
      SupplierAdressList: [],
      ItemLinesRow: [],
      ItemLinesColm: [],
      supplierMasterList: [],
      supplierList: [],
      CurrencyMasterList: [],
      CurrencyList: [],
      PaymentTermList: [],
      SpecialInstList: [],
      WareHouseList: [],
      MODTaxList: [],
      IncoTermList: [],
      SpecialInstValue: "",
      BillingIDValue: "",
      ItemDatagrid: null,
      InvoiceDetails: null,
      SADIB_VALUE: null,
      stepper: {
        MRNSTATUS: 3,
        activeStep: 0,
        steps: ["Open", "Release", "MRN", "Short Close"],
        skipped: new Set(),
      },

      AmendmentInput: {
        status: false,
        old: {},
        new: {}
      },
      branchCurrency: {
        CurrID: 0,
        Code: "INR"
      },
      supplierCurrency: {
        CurrID: 0,
        Code: "$"
      },
      branchTaxType: {
        name: "VAT",
      },
      Name: "",
      Address: "",
      Address2: "",
      Address3: "",
      City: "",
      PostCode: "",
      CountryID: "",
      StateID: "",
      Branch: {},
      PO: {
        POID: 0,
        BranchID: 0,
        No: "",
        PODate: today,
        SuplID: 0,
        POType: 0,
        BillingID: 0,
        IsImport: false,
        CurrID: 0,
        ExchRate: "0.0000",
        FCValue: "0.00",
        BaseValue: "0.00",
        PaymentTermID: 0,
        PaymentTerm: "",
        ContactPerson: "",
        Reference: "",
        Status: 2,
        DispachDate: today,
        DeliveryDate: today,
        WareHouseID: 0,
        SpecialInst: "",
        DeliveryAddress: "",
        MODTaxID: 0,
        AmendmentNo: "",
        AmendmentDate: today,
        IsRegistedSupplier: false,
        GSTNo: "",
        VATNo: "",
        IsRounding: false,
        IncoID: 0,
        ShipmentModeID: 0,
        Notes: "",
        IsSEZPurchase: false,
        IsTaxExempt: false,
        Reason: "",
        GeneralPostingGroupID: 0,
        SupplierPostingGroupID: 0,
        NotifyTo: "",
        UserID: CF.toInt(getCookie(COOKIE.USERID)),
      },
      PurchaseOrderLine: [

      ],   
      emptyLine: {
        POID: 0,
        Type: 0,
        LNo: 1,
        TypeID: 0,
        SupplierCode: "",
        Narration: "",
        UOMID: 0,
        TolerancePercentage: 0,
        Quantity: 0,
        Price: 0,
        LineDiscPercentage: 0,
        LineDiscAmount: 0,
        ItemPostingGroupID: 0,
        GeneralPostingGroupID: 0,
        VATPercentage: 0,
        VATAmount: 0,
        HSNCode: "",
        GSTGroupID: 0,
        SupplyStateID: 0,
        GSTPercentage: 0,
        BuyFromGSTN: "",
        NatureOfSupply: "",
        DValueID: 0,
        IsQuality: false,
        IsLot: false,
        isDataProper: false,
      },

    };
  }

  onKeyDownHandler = e => {
    console.log("onKeyDownHandler > e > ", e);
    console.log("onKeyDownHandler > e.shiftKey > ", e.shiftKey);
    if (e.shiftKey === true) {
      switch (e.keyCode) {
        case 13:
          console.log("SHIFT+ENTER > ");
          this.createNewBlankLine();
          break;
        default:
          break;
      }
    }
  };


  createNewBlankLine = () => {
    console.log("-createNewBlankLine-");
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    PurchaseOrderLine.push(this.state.emptyLine);
    this.setState({ PurchaseOrderLine: PurchaseOrderLine });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDownHandler);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.onKeyDownHandler);

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
    }, () => {


      this.getSupplierList();
    });

    console.log("On load state > ", this.state);
  }

  getSupplierList = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetSuppliersByBranchID;
    let reqData = {
      ValidUser: ValidUser,
      Supplier: {
        BranchID: CF.toInt(this.state.BranchID)
      }
    };
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        let Branch = data.Branch[0];
        let Country = this.getCountryList(data.Country);
        let Currency = this.getCurrencyList(data.Currency);
        let GeneralPostingGroup = this.getAllGeneralPostingGroup(data.GeneralPostingGroup);
        let MODTax = data.MODTax;
        let PaymentTerms = this.getPaymentTerms(data.PaymentTerms);
        let ShipmentMode = data.ShipmentMode;
        let State = this.getStateList(data.State);
        let Supplier = data.Supplier;
        let SupplierPostingGroup = this.getAllSupplierPostingGroup(data.SupplierPostingGroup);
        let WareHouse = this.getWarehouseList(data.WareHouse);

        let newSupplierData = [];
        for (let i = 0; i < Supplier.length; i++) {
          let o = { label: Supplier[i].Name, id: Supplier[i].SuplID };
          newSupplierData.push(o);
        }

        let PO = this.state.PO;

        if (Branch.IsSEZ === true) {
          PO.IsSEZPurchase = true;
        } else {
          PO.IsSEZPurchase = false;
        }
        if (Branch.AllowRounding === true) {
          PO.IsRounding = true;
        } else {
          PO.IsRounding = false;
        }



        this.setState({
          PO: PO,
          Branch: Branch,
          CountryList: Country,
          CurrencyMasterList: data.Currency,
          CurrencyList: Currency,
          GeneralPostingGroupList: GeneralPostingGroup,
          MODTaxList: MODTax,
          PaymentTermsMasterList: data.PaymentTerms,
          PaymentTermsList: PaymentTerms,
          ShipmentModeList: ShipmentMode,
          StateList: State,
          supplierMasterList: Supplier,
          supplierList: newSupplierData,
          SupplierPostingGroupList: SupplierPostingGroup,
          WarehouseList: WareHouse,
          ProgressLoader: true
        });

      })
      .catch((error) => {
        this.setState({
          CountryList: [],
          CurrencyMasterList: [],
          CurrencyList: [],
          GeneralPostingGroupList: [],
          MODTaxList: [],
          PaymentTermsMasterList: [],
          PaymentTermsList: [],
          ShipmentModeList: [],
          StateList: [],
          supplierMasterList: [],
          supplierList: [],
          SupplierPostingGroupList: [],
          WarehouseList: [],
          ProgressLoader: true
        });
      });
  }

  getWarehouseList = (data) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      var add2, add3, ContactPerson, EmailID, PhoneNo;
      add2 = add3 = ContactPerson = EmailID = PhoneNo = "";
      if (data[i].Address2) {
        add2 = data[i].Address2 + "\n";
      }
      if (data[i].Address3) {
        add3 = data[i].Address3 + "\n";
      }
      if (data[i].ContactPerson) {
        ContactPerson = data[i].ContactPerson + "\n";
      }
      if (data[i].EmailID) {
        EmailID = data[i].EmailID + "\n";
      }
      if (data[i].PhoneNo) {
        PhoneNo = data[i].PhoneNo + "\n";
      }

      let deliveryAddress = data[i].Address + "\n" +
        add2 +
        add3 +
        ContactPerson +
        EmailID +
        PhoneNo;
      let o = {
        name: data[i].Code,
        value: data[i].WareHouseID,
        deliveryAddress: deliveryAddress
      };
      newData.push(o);
    }

    return newData;
  }


  getCurrencyList = (data) => {
    let newD = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Code,
        value: data[i].CurrID,
      };
      newD.push(o);
    }
    return newD
  }

  getCountryList = (data) => {
    let newD = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Name,
        value: data[i].CountryID,
      };
      newD.push(o);
    }
    return newD
  }

  getStateList = (data) => {
    let newD = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Name,
        value: data[i].StateID,
      };
      newD.push(o);
    }
    return newD
  }



  getPaymentTerms = (data) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Code + " - " + data[i].Description,
        value: data[i].PaymentTermID,
      };
      newData.push(o);
    }
    return newData;
  };

  getAllSupplierPostingGroup = (data) => {
    let newD = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Code,
        value: data[i].SupplierPostingGroupID,
      };
      newD.push(o);
    }

    return newD;
  };

  getAllGeneralPostingGroup = (data) => {
    let newD = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Code + "-" + data[i].Description,
        value: data[i].GeneralPostingGroupID,
      };
      newD.push(o);
    }
    return newD;
  };

  setFieldValuesOnSuplierChange = (SuplID) => {
    let PO = this.state.PO;
    let data = this.getSupplierAddressList(SuplID);
    PO.CurrID = data.CurrID;
    if (data.SupplierAdressList.length > 0) {
      PO.BillingID = data.SupplierAdressList[0].value;
      let BillingID = data.SupplierAdressList[0].value;
      PO.CurrID = data.CurrID;
      PO.PaymentTermID = data.PaymentTermID;
      PO.PaymentTerm = this.getPaymentTermsDescriptionByID(data.PaymentTermID);




      this.setState({
        PO: PO
      }, () => {
        console.log("setFieldValuesOnSuplierChange > BillingID > ", BillingID);
        let BCdata = this.getDataToSetOnBillingChange(CF.toInt(BillingID));
        console.log("setFieldValuesOnSuplierChange > BCdata > ", BCdata);
        let PO = this.state.PO;
        PO.ContactPerson = BCdata.ContactPerson;
        PO.GSTNo = BCdata.GSTNo;
        PO.GeneralPostingGroupID = CF.toInt(BCdata.GeneralPostingGroupID);
        PO.SupplierPostingGroupID = CF.toInt(BCdata.SupplierPostingGroupID);
        PO.IsTaxExempt = BCdata.IsTaxExempt;
        PO.Reason = BCdata.Reason;
        PO.VATNo = BCdata.VATNo;
        PO.SpecialInst = BCdata.SpecialInstruction;
        if (BCdata.GSTNo === "" || BCdata.VATNo === "") {
          PO.IsRegistedSupplier = false;
        } else {
          PO.IsRegistedSupplier = true;
        }

        if (BCdata.CountryID === this.state.Branch.CountryID) {
          PO.IsImport = false;
        } else {
          PO.IsImport = true;
        }

        this.setState({
          PO: PO,
          Name: BCdata.Name,
          Address: BCdata.Address,
          Address2: BCdata.Address2,
          Address3: BCdata.Address3,
          City: BCdata.City,
          PostCode: BCdata.PostCode,
          CountryID: BCdata.CountryID,
          StateID: BCdata.StateID,
        });
      });
    }
    this.setState({
      SupplierAdressList: data.SupplierAdressList,
      SupplierAddressMasterList: data.SupplierAddressMasterList,
      PO: PO
    });
  }

  getSupplierAddressList = (SuplID) => {
    let dropdownData = [];
    let Address = [];
    let CurrID = 0;
    let PaymentTermID = 0;

    for (let i = 0; i < this.state.supplierMasterList.length; i++) {
      if (this.state.supplierMasterList[i].SuplID === SuplID) {
        Address = this.state.supplierMasterList[i].Address;
        CurrID = this.state.supplierMasterList[i].CurrID;
        PaymentTermID = this.state.supplierMasterList[i].PaymentTermID;

        break;
      }
    }
    for (let i = 0; i < Address.length; i++) {
      let o = { name: Address[i].Code, value: Address[i].AddressID };
      dropdownData.push(o);
    }

    return {
      SupplierAdressList: dropdownData,
      SupplierAddressMasterList: Address,
      CurrID: CurrID,
      PaymentTermID: PaymentTermID,

    };


  }

  getDataToSetOnBillingChange = (AddressID) => {
    console.log("getDataToSetOnBillingChange -> AddressID > ", AddressID);
    console.log("getDataToSetOnBillingChange -> this.state.SupplierAddressMasterList > ", this.state.SupplierAddressMasterList);
    let data = {};
    for (let i = 0; i < this.state.SupplierAddressMasterList.length; i++) {
      if (this.state.SupplierAddressMasterList[i].AddressID === AddressID) {
        data = {
          Name: this.state.SupplierAddressMasterList[i].Name,
          Address: this.state.SupplierAddressMasterList[i].Address,
          Address2: this.state.SupplierAddressMasterList[i].Address2,
          Address3: this.state.SupplierAddressMasterList[i].Address3,
          City: this.state.SupplierAddressMasterList[i].City,
          ContactPerson: this.state.SupplierAddressMasterList[i].ContactPerson,
          GSTNo: this.state.SupplierAddressMasterList[i].GSTNo,
          GeneralPostingGroupID: this.state.SupplierAddressMasterList[i].GeneralPostingGroupID,
          IsTaxExempt: this.state.SupplierAddressMasterList[i].IsTaxExempt,
          PostCode: this.state.SupplierAddressMasterList[i].PostCode,
          Reason: this.state.SupplierAddressMasterList[i].Reason,
          SpecialInstruction: this.state.SupplierAddressMasterList[i].SpecialInstruction,
          CountryID: this.state.SupplierAddressMasterList[i].CountryID,
          StateID: this.state.SupplierAddressMasterList[i].StateID,
          SupplierPostingGroupID: this.state.SupplierAddressMasterList[i].SupplierPostingGroupID,
          VATNo: this.state.SupplierAddressMasterList[i].VATNo,
        };
        break;
      }
    }
    return data;
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
            style={{ width: '100%' }}
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
          <SCADI
            id={"ID_" + params.value}
            // onChange={(e, value) => this.updateFormValue("SuplID", value)}
            value={null}
            options={NoList}
          />
          {/* <select
           style={{width:'100%'}}
            className="dropdown-css"
            defaultValue={params.value}
          >
            {NoList.map((item, i) => (
              <option value={item.value}> {item.name}</option>
            ))}
          </select> */}
        </Fragment>
      );
    } catch (err) { }

    return o;
  }

  itemDelete = (i, params) => {
    console.log("itemDelete > i > ", i);
    console.log("itemDelete > params > ", params);
    this.setState({
      DialogStatus: true,
      currentDeleteItemLine: {index:i,params:params}
    });
  }

  getItemLinesColm = () => {
    const columns = [
      {
        field: 'id',
        headerName: '&nbsp',
        width: 50,
        headerClassName: 'line-table-header-font',
        // cellClassName:'no-border-table',
        renderCell: (params) => (
          <Fragment>
            <DeleteForeverIcon
              fontSize="small"
              className="table-delete-icon"

              onClick={(e) => this.itemDelete(e, params)}
            />
          </Fragment>
        ),
      },

      {
        field: 'Type',
        headerName: 'Type',
        width: 150,
        editable: false,
        headerClassName: 'line-table-header-font',
        cellClassName: 'lineDatagridCell',
        renderCell: this.renderType,

      },
      {
        field: 'NO',
        headerName: 'Item',
        width: 150,
        editable: false,
        headerClassName: 'line-table-header-font',
        // cellClassName:'no-border-table',
        renderCell: (param) => {
          return (
            <Fragment>
              {this.renderTypeItem(param)}
            </Fragment>
          )
        },
      },

      {
        field: 'Description',
        headerName: 'Description',
        width: 350,
        headerClassName: 'line-table-header-font',
        // cellClassName:'no-border-table',
        editable: true,
      },
      {
        field: 'Qty',
        headerName: 'Qty',
        type: 'number',
        width: 110,
        headerClassName: 'line-table-header-font',
        // cellClassName:'no-border-table',
        editable: true,
      },
      {
        field: 'UOMID',
        headerName: 'Unit of Measurement',
        width: 250,
        headerClassName: 'line-table-header-font',
        // cellClassName:'no-border-table',
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
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <div style={{ display: 'flex', height: 350, width: '100%' }}>
                  {/* <div style={{ flexGrow: 1 }}> */}
                  <DataGrid
                    rows={this.state.ItemLinesRow}
                    columns={this.state.ItemLinesColm}
                    pageSize={100}
                    rowsPerPageOptions={[100]}
                    checkboxSelection={false}
                    disableSelectionOnClick={true}
                    hideFooterPagination
                  />
                  {/* </div> */}
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


  setFieldValuesOnBillingSelect = (data) => {
    let PO = this.state.PO;
    PO.ContactPerson = data.ContactPerson;
    PO.GSTNo = data.GSTNo;
    PO.GeneralPostingGroupID = data.GeneralPostingGroupID;
    PO.SupplierPostingGroupID = data.SupplierPostingGroupID;
    PO.IsTaxExempt = data.IsTaxExempt;
    PO.Reason = data.Reason;
    PO.SpecialInstruction = data.SpecialInstruction;
    PO.VATNo = data.VATNo;
    this.setState({
      PO: PO,
      Address: data.Address,
      Address2: data.Address2,
      Address3: data.Address3,
      City: data.City,
      PostCode: data.PostCode,
      CountryID: this.getCountryNameByID(data.CountryID),
      StateID: this.getStateNameByID(data.StateID),

    }, () => {
      this.generalForm();
      this.getInvoiceDetails();
      this.termsForm();
      this.taxForm();
    });
  }

  getCountryNameByID = (id) => {
    for (let i = 0; i < this.state.CountryList.length; i++) {
      if (this.state.CountryList[i].CountryID === id) {
        return this.state.CountryList[i].Name;
        break;
      }
    }
  }

  getStateNameByID = (id) => {
    for (let i = 0; i < this.state.StateList.length; i++) {
      if (this.state.StateList[i].stateId === id) {
        return this.state.StateList[i].name;
        break;
      }
    }
  }

  getPaymentTermsDescriptionByID = (id) => {
    for (let i = 0; i < this.state.PaymentTermsMasterList.length; i++) {
      if (this.state.PaymentTermsMasterList[i].PaymentTermID === id) {
        return this.state.PaymentTermsMasterList[i].Description;
        break;
      }
    }
  }

  getWareHousedeliveryAddressById = (id) => {
    for (let i = 0; i < this.state.WarehouseList.length; i++) {
      if (this.state.WarehouseList[i].value === id) {
        return this.state.WarehouseList[i].deliveryAddress;
        break;
      }
    }
  }



  updateFormValue = (param, e) => {
    let PO = this.state.PO;
    console.log("- IN updateFormValue - ");
    switch (param) {
      case "SuplID":
        console.log("- IN SuplID - ");
        console.log("e -> ", e);
        if (e) {
          this.setState({ SADIB_VALUE: e }, () => {
            PO.SuplID = CF.toInt(e.id);
            this.setFieldValuesOnSuplierChange(CF.toInt(e.id));
            this.setParams(PO);
          });
        }

        break;
      case "BillingID":
        PO.BillingID = CF.toInt(e.target.value);
        this.setFieldValuesOnBillingSelect(
          this.getDataToSetOnBillingChange(CF.toInt(e.target.value))
        );
        this.setParams(PO);
        break;
      case "WareHouseID":
        PO.WareHouseID = CF.toInt(e.target.value);
        PO.DeliveryAddress = this.getWareHousedeliveryAddressById(CF.toInt(e.target.value));
        this.setParams(PO);
        break;
      case "PaymentTermID":
        PO.PaymentTermID = CF.toInt(e.target.value);
        PO.PaymentTerm = this.getPaymentTermsDescriptionByID(CF.toInt(e.target.value));
        this.setParams(PO);
        break;
      case "POType":
        PO.POType = CF.toInt(e.target.value);
        this.setParams(PO);
        break;
      case "PODate":
        PO.PODate = moment(e.target.value).format("YYYY-MM-DD");
        this.setParams(PO);
        break;
      case "DispachDate":
        PO.DispachDate = moment(e.target.value).format("YYYY-MM-DD");
        this.setParams(PO);
        break;
      case "DeliveryDate":
        PO.DeliveryDate = moment(e.target.value).format("YYYY-MM-DD");
        this.setParams(PO);
        break;
      case "ContactPerson":
        PO.ContactPerson = e.target.value;
        this.setParams(PO);
        break;
      case "Reference":
        PO.Reference = e.target.value;
        this.setParams(PO);
        break;
      case "NotifyTo":
        PO.NotifyTo = e.target.value;
        this.setParams(PO);
        break;
      case "CurrID":
        PO.CurrID = e.target.value;
        this.setParams(PO);
        break;
      case "ExchRate":
        PO.ExchRate = e.target.value;
        this.setParams(PO);
        break;
      case "PaymentTerm":
        PO.PaymentTerm = e.target.value;
        this.setParams(PO);
        break;
      case "MODTaxID":
        PO.MODTaxID = e.target.value;
        this.setParams(PO);
        break;
      case "IncoID":
        PO.IncoID = e.target.value;
        this.setParams(PO);
        break;
      case "DeliveryAddress":
        PO.DeliveryAddress = e.target.value;
        this.setParams(PO);
        break;
      case "ShipmentModeID":
        PO.ShipmentModeID = e.target.value;
        this.setParams(PO);
        break;
      case "SpecialInst":
        PO.SpecialInst = e.target.value;
        this.setParams(PO);
        break;
      case "Notes":
        PO.Notes = e.target.value;
        this.setParams(PO);
        break;
      case "IsSEZPurchase":
        PO.IsSEZPurchase = e.target.checked;
        this.setParams(PO);
        break;
      case "IsRounding":
        PO.IsRounding = e.target.checked;
        this.setParams(PO);
        break;
      default:
        break;
    }

    this.validateBtnEnable();
  };



  validateBtnEnable = () => {

  };

  setParams = (object) => { this.setState({ PO: object }) };



  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };


  handleDialogClose = () => {
    this.setState({ DialogStatus: false });
  }

  deleteSelectedItem = () => {
    this.handleDialogClose();
    let currentDeleteItemLine=this.state.currentDeleteItemLine;
    let PurchaseOrderLine=this.state.PurchaseOrderLine;
    let newPurchaseOrderLine=[];
    for(let i=0;i<PurchaseOrderLine.length;i++){
      if(currentDeleteItemLine.index===i){}else{
        newPurchaseOrderLine.push(PurchaseOrderLine[i]);
      }
    }
    this.setState({PurchaseOrderLine:newPurchaseOrderLine});
  }

  getMRNStatus = () => {
    let MRNSTATUS = "";
    let status = this.state.PO.Status;
    switch (status) {
      case 3:
        MRNSTATUS = "Complete";
        break;
      case 4:
        MRNSTATUS = "Partially";
        break;
      default:
        break;
    }
    return MRNSTATUS;
  }


  handleClose = () => {
    let Dialog = this.state.Dialog;
    Dialog.DialogStatus = false;
    this.setState({ Dialog: Dialog });
  };

  openDialog = (param) => {
    let Dialog = this.state.Dialog;
    Dialog.DialogStatus = true;
    Dialog.DialogTitle = param;

    switch (param) {
      case "View":
        Dialog.DialogContent = <Viewpo />;
        this.setState({ Dialog: Dialog });
        break;

      default:
        break;
    }

    this.setState({ Dialog: Dialog });
  };

  updateLineDetail=(i,key,e)=>{
    console.log("i > ",i);
    console.log("key > ",key);
    console.log("e.target.value > ",e.target.value);
    let PurchaseOrderLine=this.state.PurchaseOrderLine;
    switch(key){
      case "Type":
           let o=PurchaseOrderLine[i];
           console.log("o > ",o);
           o[key]=CF.toInt(e.target.value);
          //  PurchaseOrderLine[i]=o;
          let newP=[];
          for(let c=0;c<PurchaseOrderLine.length;c++){
            if(c===i){
              newP.push(o);
            }else{
              newP.push(PurchaseOrderLine[c]);
            }
          }
           this.setLineParams(newP);
      break;
      default:
        break;
    }
  }

  setLineParams = (object) => { this.setState({ PurchaseOrderLine: object }) };

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

      if (val === "accordion4") {
        this.state.accordion4 === true
          ? this.setState({ accordion4: false })
          : this.setState({ accordion4: true });
      }

      if (val === "accordion5") {
        this.state.accordion5 === true
          ? this.setState({ accordion5: false })
          : this.setState({ accordion5: true });
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
      ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
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
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              // onClick={(e) => AddNew(e)}
              disabled={this.state.DisableCreatebtn}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}

          <Button
            startIcon={APIURLS.buttonTitle.view.icon}
            className="action-btns"
            onClick={(e) => this.openDialog("View")}
          >
            {APIURLS.buttonTitle.view.name}
          </Button>


        </ButtonGroup>
      </Fragment>
    );

    const dialog = (
      <Fragment>
        <Dialog

          fullWidth={true}
          maxWidth="lg"
          open={this.state.Dialog.DialogStatus}
          aria-labelledby="PO-page-dialog-title"
          aria-describedby="PO-page-dialog"
          className="dialog-prompt-activity"
        >
          <DialogTitle
            id="dialog-title"
            className="dialog-area"
            style={{ maxHeight: 50 }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={1} lg={1}>
                <IconButton
                  aria-label="ArrowBackIcon"
                // style={{ textAlign: 'left', marginTop: 8 }}
                >
                  <ArrowBackIcon onClick={(e) => this.handleClose()} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <div style={{ marginLeft: -50 }}>
                  {" "}
                  <span style={{ fontSize: 18, color: "rgb(80, 92, 109)" }}>
                    {" "}
                    {this.state.Dialog.DialogTitle}{" "}
                  </span>{" "}
                </div>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {this.state.Dialog.DialogContent}

              </Grid>
            </Grid>
            <div style={{ height: 50 }}>&nbsp;</div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );



    const isStepOptional = (step) => {
      return step === 1;
    };

    const isStepSkipped = (step) => {
      return this.state.stepper.skipped.has(step);
    };




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


        <Fragment>
          <div style={{ height: 10 }}>&nbsp;</div>
          <div style={{ height: 10 }}>&nbsp;</div>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                  <Stepper activeStep={this.state.stepper.activeStep}>
                    {this.state.stepper.steps.map((label, index) => {
                      const stepProps = {};
                      const labelProps = {};
                      return (
                        <Step key={label} {...stepProps}>
                          <StepLabel {...labelProps}>
                            {index === 2 ? this.getMRNStatus(this.state.stepper.MRNSTATUS) : null} {label}
                          </StepLabel>
                        </Step>
                      );
                    })}
                  </Stepper>
                </Grid>
                <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
              </Grid>
            </Grid>
          </Grid>
          <div style={{ height: 10 }}>&nbsp;</div>
          <div style={{ height: 10 }}>&nbsp;</div>

        </Fragment>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Grid className="table-adjust" container spacing={0}>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Accordion
                  key="a-1"
                  expanded={this.state.accordion1}
                  className="accordionD"
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("accordion1", e)} />}
                    aria-controls="panel1a-content"
                    id="accordion1"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) => handleAccordionClick("accordion1", e)}
                  >
                    <Typography
                      key="GD-Activity"
                      className="accordion-Header-Title"
                    >General</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    key="accordion1" className="AccordionDetails-css">
                    <Fragment>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <SIB
                                    id="No"
                                    label="No"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.No}
                                    disabled={true}
                                  />

                                  <SADIB
                                    id="SuplID"
                                    label="Supplier"
                                    onChange={(e, value) => this.updateFormValue("SuplID", value)}
                                    value={this.state.SADIB_VALUE}
                                    options={this.state.supplierList}
                                    isMandatory={true}
                                  />

                                  <SDIB
                                    id="BillingID"
                                    label="Billing"
                                    onChange={(e) => this.updateFormValue("BillingID", e)}
                                    value={this.state.PO.BillingID}
                                    param={this.state.SupplierAdressList}
                                    isMandatory={true}
                                  />

                                  <SIB
                                    id="Name"
                                    label="Name"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.Name}
                                    disabled={true}
                                  />


                                  <SIB
                                    id="Address"
                                    label="Address"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.Address}
                                    disabled={true}
                                  />
                                  <SIB
                                    id="Address2"
                                    label="Address 2"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.Address2}
                                    disabled={true}
                                  />
                                  <SIB
                                    id="Address3"
                                    label="Address 3"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.Address3}
                                    disabled={true}
                                  />
                                  <SIB
                                    id="City"
                                    label="City"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.City}
                                    disabled={true}
                                  />
                                  <SIB
                                    id="Postcode"
                                    label="Postcode"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PostCode}
                                    disabled={true}
                                  />


                                  <SDIB
                                    id="Country"
                                    label="Country"
                                    value={this.state.CountryID}
                                    param={this.state.CountryList}
                                    disabled={true}
                                  />


                                  <SDIB
                                    id="State"
                                    label="State"
                                    value={this.state.StateID}
                                    param={this.state.StateList}
                                    disabled={true}
                                  />

                                  <SDIB
                                    id="WareHouseID"
                                    label="Warehouse"
                                    onChange={(e) => this.updateFormValue("WareHouseID", e)}
                                    value={this.state.PO.WareHouseID}
                                    param={this.state.WarehouseList}
                                    isMandatory={true}
                                  />


                                  <SSIB
                                    key="IsImport"
                                    id="IsImport"
                                    label="Import?"
                                    param={this.state.PO.IsImport}
                                    disabled={true}
                                  />



                                </Grid>
                              </Grid>



                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>

                                  <SDTI
                                    isMandatory={true}
                                    id="PODate"
                                    label="PO Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("PODate", e)
                                    }
                                    value={this.state.PO.PODate}
                                  />
                                  <SDIB
                                    id="POType"
                                    label="PO Type"
                                    onChange={(e) => this.updateFormValue("POType", e)}
                                    value={this.state.PO.POType}
                                    param={this.state.POTypeList}
                                    isMandatory={true}
                                  />

                                  <SSIB
                                    key="amendEvent"
                                    id="AmendmentInput"
                                    label="Amending?"
                                    param={this.state.type === "add" ? false : this.state.AmendmentInput.status}
                                    onChange={(e) => this.updateFormValue("AmendmentInput", e)}
                                  />

                                  <SIB
                                    id="AmendmentNo"
                                    label="Amendment No"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.AmendmentNo}
                                    disabled={this.state.type === "add" ? true : false}
                                  />
                                  <SDTI
                                    id="AmendmentDate"
                                    label="Amendment Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("AmendmentDate", e)
                                    }
                                    value={this.state.PO.AmendmentDate}
                                    disabled={this.state.type === "add" ? true : false}
                                  />

                                  <SDTI
                                    isMandatory={true}
                                    id="DispachDate"
                                    label="Dispach Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("DispachDate", e)
                                    }
                                    value={this.state.PO.DispachDate}
                                  />

                                  <SDTI
                                    isMandatory={true}
                                    id="DeliveryDate"
                                    label="Delivery Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("DeliveryDate", e)
                                    }
                                    value={this.state.PO.DeliveryDate}
                                  />

                                  <SIB
                                    id="ContactPerson"
                                    label="Contact Person"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.ContactPerson}
                                    onChange={(e) =>
                                      this.updateFormValue("ContactPerson", e)
                                    }
                                  />

                                  <SIB
                                    id="Reference"
                                    label="Referance"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.Reference}
                                    onChange={(e) =>
                                      this.updateFormValue("Reference", e)
                                    }
                                  />


                                  <SIB
                                    id="NotifyTo"
                                    label="Notify To"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.NotifyTo}
                                    onChange={(e) =>
                                      this.updateFormValue("NotifyTo", e)
                                    }
                                  />

                                  {/* check this section as per branch details */}
                                  {/* Start */}
                                  <SSIB
                                    key="IsSEZPurchase"
                                    id="IsSEZPurchase"
                                    label="SEZ Purchase?"
                                    param={this.state.PO.IsSEZPurchase}
                                    onChange={(e) => this.updateFormValue("IsSEZPurchase", e)}
                                    disabled={this.state.Branch.IsSEZ === true ? false : true}
                                  />

                                  <SSIB
                                    key="IsRounding"
                                    id="IsRounding"
                                    label="Is Rounding?"
                                    param={this.state.PO.IsRounding}
                                    onChange={(e) => this.updateFormValue("IsRounding", e)}
                                    disabled={this.state.Branch.AllowRounding === true ? false : true}
                                  />
                                  {/* End */}

                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                      </Grid>


                    </Fragment>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  key="a-2"
                  expanded={this.state.accordion2}
                  className="accordionD"
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("accordion2", e)} />}
                    aria-controls="panel1a-content"
                    id="accordion2"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) => handleAccordionClick("accordion2", e)}
                  >
                    <Typography
                      key="Lines-Activity"
                      className="accordion-Header-Title"
                    >Lines</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    key="accordion2" className="AccordionDetails-css">

                    <div style={{ height: 250, width: '100%', overflowY: 'scroll', overflowX: 'scroll' }}>
                      <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                          <Table
                            stickyHeader
                            size="small"
                            className=""
                            aria-label="Lines List table"
                          >
                            <TableHead className="table-header-background">
                              <TableRow>
                                <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="center">&nbsp;</TableCell>
                                <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Type</TableCell>
                                <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Item</TableCell>
                                <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Sup.Code</TableCell>
                                <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Narration</TableCell>
                                <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">UOM</TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Tolerance %</TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Quantity </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Price </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Line.Disc %</TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center"> Line Disc Amount</TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Item Posting Group </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Gen Posting Group</TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">VAT % </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">VAT Amount </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">HSN </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">GST Group </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Supply State </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center"> GST %</TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center"> Buy From GSTN</TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Nature Of Supply </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Dim.Value </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Is Quality? </TableCell>
                                <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Is Lot? </TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody className="tableBody">
                              {this.state.PurchaseOrderLine.map((item, i) => (
                                <TableRow className={item.isDataProper === true ? "selectedRow" : "selectedRowError"}>
                                  <TableCell align="left">
                                    <ButtonGroup
                                      size="small"
                                      variant="text"
                                      aria-label="Action Menu Button group"
                                    >
                                      <DeleteForeverIcon
                                        fontSize="small"
                                        style={{
                                          color: '#e53935'
                                        }}
                                        onClick={(e) => this.itemDelete(i, item)}
                                      />

                                      {
                                        (i + 1) === this.state.PurchaseOrderLine.length ? (
                                          <Fragment>
                                            <AddCircleOutlineIcon
                                              fontSize="small"
                                              style={{
                                                color: '#00897b',
                                                marginLeft: 10
                                              }}
                                              onClick={(e) => this.createNewBlankLine()}
                                            />
                                          </Fragment>
                                        ) : null
                                      }

                                    </ButtonGroup>
                                  </TableCell>
                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      // value={item.Type}
                                      onChange={(e)=>this.updateLineDetail(i,"Type",e)}
                                    >
                                      {APIURLS.POItemType.map((op, i) => (
                                        <Fragment>
                                          {item.Type === op.value ? (
                                            <option value={op.value} selected> {op.name}-{op.value}</option>
                                          ) : (
                                            <option value={op.value} > {op.name}</option>
                                          )}
                                          
                                        </Fragment>
                                        
                                      ))}
                                    </select>
                                  </TableCell>
                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      value={item.TypeID}
                                    >
                                      {APIURLS.POItemType.map((item, i) => (
                                        <option value={item.value}> {item.name}</option>
                                      ))}
                                    </select>
                                  </TableCell>
                                  <TableCell align="center">
                                    <b>S00012</b>
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"Naration_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.Narration}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      value={item.UOMID}
                                    >
                                      {APIURLS.POItemType.map((item, i) => (
                                        <option value={item.value}> {item.name}</option>
                                      ))}
                                    </select>
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"TolerancePercentage_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.TolerancePercentage}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"Quantity_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.Quantity}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"Price_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.Price}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"LineDiscPercentage_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.LineDiscPercentage}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"LineDiscAmount_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.LineDiscAmount}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      value={item.ItemPostingGroupID}
                                    >
                                      {APIURLS.POItemType.map((item, i) => (
                                        <option value={item.value}> {item.name}</option>
                                      ))}
                                    </select>
                                  </TableCell>
                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      value={item.GeneralPostingGroupID}
                                    >
                                      {APIURLS.POItemType.map((item, i) => (
                                        <option value={item.value}> {item.name}</option>
                                      ))}
                                    </select>
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"VATPercentage_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.VATPercentage}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"VATAmount_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.VATAmount}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"HSNCode_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.HSNCode}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      value={item.GSTGroupID}
                                    >
                                      {APIURLS.POItemType.map((item, i) => (
                                        <option value={item.value}> {item.name}</option>
                                      ))}
                                    </select>
                                  </TableCell>

                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      value={item.SupplyStateID}
                                    >
                                      {APIURLS.POItemType.map((item, i) => (
                                        <option value={item.value}> {item.name}</option>
                                      ))}
                                    </select>
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"GSTPercentage_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.GSTPercentage}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"BuyFromGSTN_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.BuyFromGSTN}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCI
                                      id={"NatureOfSupply_" + i}
                                      variant="outlined"
                                      size="small"
                                      value={item.NatureOfSupply}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <select
                                      style={{ width: '100%' }}
                                      className="dropdown-css"
                                      value={item.DValueID}
                                    >
                                      {APIURLS.POItemType.map((item, i) => (
                                        <option value={item.value}> {item.name}</option>
                                      ))}
                                    </select>
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCSI
                                      key={"IsQuality_+i"}
                                      id={"IsQuality_+i"}
                                      param={item.IsQuality}
                                    />
                                  </TableCell>
                                  <TableCell align="center">
                                    <SCSI
                                      key={"IsLot_+i"}
                                      id={"IsLot_+i"}
                                      param={item.IsLot}
                                    />
                                  </TableCell>

                                </TableRow>
                              ))}

                            </TableBody>

                          </Table>
                        </Grid>
                      </Grid>
                    </div>

                  </AccordionDetails>
                </Accordion>

                <Accordion
                  key="a-3"
                  expanded={this.state.accordion3}
                  className="accordionD"
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("accordion3", e)} />}
                    aria-controls="panel1a-content"
                    id="accordion3"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) => handleAccordionClick("accordion3", e)}
                  >
                    <Typography
                      key="Lines-Activity"
                      className="accordion-Header-Title"
                    >Invoice Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    key="accordion3" className="AccordionDetails-css">
                    <Fragment>


                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>


                                  {/* show Currency as per supplier selected */}
                                  <SDIB
                                    id="CurrID"
                                    label="Currency"
                                    onChange={(e) => this.updateFormValue("CurrID", e)}
                                    value={this.state.PO.CurrID}
                                    param={this.state.CurrencyList}
                                    isMandatory={true}
                                  />

                                  <SIB
                                    id="ExchRate"
                                    label="Exchange Rate"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.ExchRate}
                                    onChange={(e) => this.updateFormValue("ExchRate", e)}
                                  />

                                  <SDIB
                                    id="GeneralPostingGroupID"
                                    label="Gen.Posting Group"
                                    value={this.state.PO.GeneralPostingGroupID}
                                    param={this.state.GeneralPostingGroupList}
                                    isMandatory={true}
                                    disabled={true}
                                    onChange={(e) => this.updateFormValue("GeneralPostingGroupID", e)}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <SDIB
                                    id="PaymentTermID"
                                    label="Payment Term"
                                    onChange={(e) => this.updateFormValue("PaymentTermID", e)}
                                    value={this.state.PO.PaymentTermID}
                                    param={this.state.PaymentTermsList}
                                    isMandatory={true}

                                  />
                                  <SIB
                                    id="PaymentTerm"
                                    label="Pay..Term..Details"
                                    onChange={(e) => this.updateFormValue("PaymentTerm", e)}
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.PaymentTerm}
                                    isMandatory={true}
                                  />
                                  <SDIB
                                    id="SupplierPostingGroupID"
                                    label="Sup.Posting Group"
                                    value={this.state.PO.SupplierPostingGroupID}
                                    param={this.state.SupplierPostingGroupList}
                                    isMandatory={true}
                                    disabled={true}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Divider />
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid item xs={12} sm={12} md={11} lg={11}>
                                <SSDV
                                  label={"Total Excl. " + this.state.branchTaxType.name + " (" + this.state.supplierCurrency.Code + ")"}
                                  value={"0.00"}
                                />
                                <SSDV
                                  label="Invoice Discount %"
                                  value="0.00"
                                />
                                <SSDV
                                  label={"Total " + this.state.branchTaxType.name + " (" + this.state.supplierCurrency.Code + ")"}
                                  value="0.00"
                                />
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid item xs={12} sm={12} md={11} lg={11}>
                                <SSDV
                                  label={"Total FC.Value (" + this.state.supplierCurrency.Code + ")"}
                                  value={this.state.PO.FCValue}
                                />

                                <SSDV
                                  label={"Total Base.Value (" + this.state.branchCurrency.Code + ")"}
                                  value={this.state.PO.BaseValue}
                                />
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                      </Grid>


                    </Fragment>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  key="a-4"
                  expanded={this.state.accordion4}
                  className="accordionD"
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("accordion4", e)} />}
                    aria-controls="panel1a-content"
                    id="accordion4"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) => handleAccordionClick("accordion4", e)}
                  >
                    <Typography
                      key="Tax-Activity"
                      className="accordion-Header-Title"
                    >Tax Information</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    key="accordion4" className="AccordionDetails-css">
                    <Fragment>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <SSIB
                                    key="IsRegistedSupplier"
                                    id="IsRegistedSupplier"
                                    label="Registed Supplier?"
                                    param={this.state.PO.IsRegistedSupplier}

                                  />

                                  <SIB
                                    id="GSTNo"
                                    label="GST No"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.GSTNo}
                                    disabled={true}
                                  />

                                  <SIB
                                    id="VATNo"
                                    label="VAT No"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.VATNo}
                                    disabled={true}
                                  />
                                </Grid>
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>

                                  <SSIB
                                    key="IsTaxExempt"
                                    id="IsTaxExempt"
                                    label="Is TaxExempt?"
                                    param={this.state.PO.IsTaxExempt}

                                  />

                                  <SIB
                                    id="Reason"
                                    label="Reason"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.Reason}
                                    disabled={true}
                                  />

                                  <SDIB
                                    id="MODTaxID"
                                    label="Mode of Tax"
                                    onChange={(e) => this.updateFormValue("MODTaxID", e)}
                                    value={this.state.PO.MODTaxID}
                                    param={this.state.MODTaxList}
                                    isMandatory={true}
                                  />

                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                      </Grid>
                    </Fragment>
                  </AccordionDetails>
                </Accordion>


                <Accordion
                  key="a-5"
                  expanded={this.state.accordion5}
                  className="accordionD"
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("accordion5", e)} />}
                    aria-controls="panel1a-content"
                    id="accordion5"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) => handleAccordionClick("accordion5", e)}
                  >
                    <Typography
                      key="Terms-Activity"
                      className="accordion-Header-Title"
                    >Terms</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    key="accordion5" className="AccordionDetails-css">
                    <Fragment>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <SDIB
                                    id="IncoID"
                                    label="Inco Term"
                                    onChange={(e) => this.updateFormValue("IncoID", e)}
                                    value={this.state.PO.IncoID}
                                    param={this.state.IncoTermList}

                                  />

                                  <SIB
                                    id="DeliveryAddress"
                                    label="Delivery Address"
                                    onChange={(e) => this.updateFormValue("DeliveryAddress", e)}
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.DeliveryAddress}
                                    multiline={true}
                                    rows={5}
                                  />
                                  <div style={{ height: 70 }}>&nbsp;</div>
                                </Grid>
                              </Grid>
                            </Grid>

                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>

                                  <SDIB
                                    id="ShipmentModeID"
                                    label="Shipment Mode"
                                    onChange={(e) => this.updateFormValue("ShipmentModeID", e)}
                                    value={this.state.PO.ShipmentModeID}
                                    param={this.state.ShipmentModeList}
                                  />

                                  <SIB
                                    id="SpecialInst"
                                    label="Special Inst"
                                    onChange={(e) => this.updateFormValue("SpecialInst", e)}
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.SpecialInst}
                                    multiline={true}
                                    rows={5}
                                  />
                                  <div style={{ height: 70 }}>&nbsp;</div>
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        </Grid>

                        <Grid item xs={12} sm={12} md={11} lg={11}>
                          <div style={{ height: 30 }}>&nbsp;</div>
                          <Grid container spacing={0}>
                            <Grid item xs={5} sm={5} md={2} lg={2}>
                              <span className="themeFont" style={{ color: '#212121' }}>
                                Remarks
                              </span>
                            </Grid>
                            <Grid item xs={5} sm={5} md={10} lg={10}>
                              <TextField
                                style={
                                  { width: '100%', fontSize: 14 }
                                }
                                className="textFieldCss"
                                id="Notes"
                                onChange={(e) => this.updateFormValue("Notes", e)}
                                variant="outlined"
                                size="small"
                                value={this.state.PO.Notes}
                                multiline={true}
                                rows={3}
                              />
                            </Grid>
                          </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>

                      </Grid>

                    </Fragment>
                  </AccordionDetails>
                </Accordion>
                <div style={{ height: 50 }}></div>
              </Grid>
              <Grid item xs={12} sm={12} md={4} lg={4}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={11} lg={11}>
                    <div style={{ marginLeft: 10, backgroundColor: '#ffffff', height: 550, overflowY: 'scroll' }}>
                      <div style={{ marginLeft: 10 }}>
                        <Grid container spacing={0}>
                          <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                          <Grid item xs={12} sm={12} md={10} lg={10}>
                            <div style={{ marginTop: 10 }}>

                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <h3>Supplier Statistics</h3>
                                </Grid>
                              </Grid>
                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <SSDV
                                    label="Supplier No."
                                    value="S0001"
                                  />
                                  <SSDV
                                    label="Balance"
                                    value="00000.00"
                                  />
                                  <SSDV
                                    label="Outstanding Orders"
                                    value="00000.00"
                                  />
                                  <SSDV
                                    label="Outstanding Invoices"
                                    value="00000.00"
                                  />
                                  <SSDV
                                    label="Total"
                                    value="00000.00"
                                  />
                                  <SSDV
                                    label="Invoice Prepaid Amount"
                                    value="00000.00"
                                  />
                                  <SSDV
                                    label="Payments"
                                    value="00000.00"
                                  />
                                  <SSDV
                                    label="Last payment Date"
                                    value="30/11/2021"
                                  />
                                </Grid>
                              </Grid>

                              <Grid container spacing={0} style={{ marginTop: 20 }}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <Divider />
                                </Grid>
                              </Grid>

                              <Grid container spacing={0}>
                                <Grid item xs={12} sm={12} md={11} lg={11}>
                                  <h3>Supplier History</h3>
                                </Grid>
                              </Grid>

                              <Grid container spacing={1} >
                                <Grid item xs={12} sm={12} md={3} lg={3}  >
                                  <div key="paymentPendingLink" to="#" className="card-link">
                                    <Card className="dash-activity-card2" raised={false}>
                                      <CardContent>
                                        <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                          Orders
                                        </Typography>
                                        <Typography >
                                          870
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}  >
                                  <div key="paymentPendingLink" to="#" className="card-link">
                                    <Card className="dash-activity-card2" raised={false}>
                                      <CardContent>
                                        <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                          Quotes
                                        </Typography>
                                        <Typography>
                                          5
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </Grid>
                                <Grid item xs={12} sm={12} md={3} lg={3}  >
                                  <div key="paymentPendingLink" to="#" className="card-link">
                                    <Card className="dash-activity-card2" raised={false}>
                                      <CardContent>
                                        <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                          Com. Pur..
                                        </Typography>
                                        <Typography>
                                          1,766
                                        </Typography>
                                      </CardContent>
                                    </Card>
                                  </div>
                                </Grid>
                              </Grid>
                            </div>
                          </Grid>
                          <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        </Grid>
                      </div>
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Grid>



        <Dialog
          className="dialog-prompt-activity"
          open={this.state.DialogStatus}
          onClose={() => this.handleDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title"   className="dialog-area">
            <span style={{ color: 'red' }}>Line Delete Request</span>
          </DialogTitle>
          <DialogContent   className="dialog-area">
            <DialogContentText id="alert-dialog-description">
              {"Do you want to delete this Line ?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions   className="dialog-area">
            <Button onClick={() => this.handleDialogClose()}>No</Button>
            <Button onClick={() => this.deleteSelectedItem()} >
              Yes
            </Button>
          </DialogActions>
        </Dialog>


        {dialog}
      </Fragment>
    );
  }
}
export default poactivity;
