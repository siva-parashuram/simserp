import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import ReactToPrint from 'react-to-print';
import readXlsxFile from 'read-excel-file';
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import ListAltIcon from '@mui/icons-material/ListAlt';
import FileUploadIcon from '@mui/icons-material/FileUpload';

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

import TableContainer from '@material-ui/core/TableContainer';
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import Tooltip from '@mui/material/Tooltip';

import DeleteIcon from '@mui/icons-material/Delete';
import AttachFileIcon from '@mui/icons-material/AttachFile';

import BackdropLoader from "../../compo/backdrop";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Dualtabcomponent from '../../compo/dualtabcomponent';
import DialogCustom from "../../compo/dialogcomponent";

import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SADIB from "../../compo/gridautocompletedropdowninput";
import SSDV from "../../compo/grid2sectiondisplayview";
import SDTI from "../../compo/griddateinput";
import SCADI from "../../compo/customautocompletecomponent";
import SCI from "../../compo/customtextboxinput";
import SCSI from "../../compo/customswitchinput";





const today = moment().format(
  "YYYY-MM-DD"
);


class pogitactivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      CustomDialog: {
        open: false
      },
      DeleteAttachment: {
        e: null,
        item: null
      },
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
      DialogStatus: false,
      isDataFetched: false,
      BranchID: 0,
      compID: 0,
      accordion1: true,
      accordion2: true,
      accordion3: false,
      accordion4: false,
      accordion5: false,
      accordion6: false,
      ProgressLoader: false,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: true,
      DisableUpdatebtn: false,
      SnackbarStatus: false,
      branchName: "",
      ErrorMessageProps: "",
      currentDeleteItemLine: {},
      initialCss: "",
      urlparams: "",
      editurl: "",
      typoTitle: "",
      type: "",
      PayToSuplList: [],
      ShipmentTypeList: [],
      PortList: [],
      POTypeList: APIURLS.POType,
      POItemType: APIURLS.POItemType,
      GLAccount: [],
      Charges: [],
      FixedAsset: [],
      Category: [],
      SupplierItemCategory: [],
      GSTGroupIDList: [],
      UOMList: [],
      DimensionsList: [],
      MODTaxList: [],
      ShipmentModeList: [],
      WarehouseList: [],
      SupplierPostingGroupList: [],
      GeneralPostingGroupList: [],
      ItemPostingGroupList: [],
      CountryList: [],
      StateList: [],
      PaymentTerms: [],
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
      SupplierItemList: [],
      SpecialInstValue: "",
      BillingIDValue: "",
      ItemDatagrid: null,
      InvoiceDetails: null,
      SADIB_VALUE: null,
      stepper: {
        MRNSTATUS: 1,
        activeStep: 0,
        steps: ["Open", "Release", "MRN", "Short Close"],
        skipped: new Set(),
      },
      CurrencyCode: "",
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
      Amount: 0.00,
      DiscountAmount: 0.00,
      TotalTax: 0.00,
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
        ExchRate: 0.00,
        FCValue: 0.00,
        BaseValue: 0.00,
        PaymentTermID: 0,
        PaymentTerm: "",
        ContactPerson: "",
        Reference: "",
        Status: 1,
        DispachDate: today,
        DeliveryDate: today,
        WareHouseID: 0,
        SpecialInst: "",
        DeliveryAddress: "",
        MODTaxID: 0,
        AmendmentNo: 0,
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

      },
      PurchaseOrderLine: [],
      emptyLine: {
        POID: 0,
        Type: 0,
        LNo: 0,
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
      MRN: {
        MRNDate: today,
        SuplInvNo: "",
        SuplInvDate: today,
        DueDate: null,
        PayToSuplID: 0,
        EWayBillNo: "",

        DutyFogone: 0,
        DutyPaid: 0,
        GSTOrVATPaid: 0,
        AssableValue: 0,
        BillOfEntryNo: "",
        BillOfEntryDate: null,
        BillOfEntryValue: 0,
        BLOrAWBNo: "",
        BLOrAWBDate: null,
        PortID: 0,

        GateEntryNo: "",
        GateEntryDate: null,
      },
      ContainerInfo: [],
      SelectedLotItem: {},
      filelist: [],
    };
  }

  onKeyDownHandler = e => {
    if (this.state.isDataFetched === true) {
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
    }
  };


  createNewBlankLine = () => {
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    let length = PurchaseOrderLine.length;
    let EL = {
      POID: this.state.type === "edit" ? this.state.PO.POID : 0,
      Type: null,
      LNo: length + 1,
      TypeIDList: [],
      CategoryList: [],
      isCategoryDisabled: true,
      CategoryId: null,
      ItemList: [],
      ItemListSelected: null,//{name:"",value:""}
      TypeID: null,
      Description: "",
      packingDescription: "",
      SupplierCode: "",
      Narration: "",
      UOMID: null,
      TolerancePercentage: 0,
      Quantity: 0,
      Price: 0,
      LineDiscPercentage: 0,
      LineDiscAmount: 0,
      ItemPostingGroupID: null,
      GeneralPostingGroupList: [],
      GeneralPostingGroupID: 0,
      VATPercentage: CF.toFloat(this.state.Branch.VATPercentage),
      VATAmount: 0,
      HSNCode: "",
      GSTGroupID: null,
      SupplyStateID: this.state.StateID,
      GSTPercentage: 0,
      BuyFromGSTN: "",
      NatureOfSupply: "",
      DValueID: 0,
      IsQuality: false,
      IsLot: false,
      isDataProper: false,
    };

    PurchaseOrderLine.push(EL);
    this.setState({ PurchaseOrderLine: PurchaseOrderLine }, () => {
      this.calculateInvoiceDetails();
    });
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.onKeyDownHandler);
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    document.addEventListener('keydown', this.onKeyDownHandler);
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let compID = url.searchParams.get("compID");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let type = url.searchParams.get("type");
    let POID = type === "edit" ? url.searchParams.get("editPOID") : 0;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");
    let urlparams = params;
    // let urlparams =
    //   "?branchId=" +
    //   branchId +
    //   "&compName=" +
    //   compName +
    //   "&branchName=" +
    //   branchName;


    let PO = this.state.PO;
    PO.POID = CF.toInt(POID);
    if (type === "edit") {
      PO.POID = CF.toInt(POID);
      this.setState({
        compID: parseInt(compID),
        branchName: branchName,
        PO: PO,
        POID: CF.toInt(POID),
        urlparams: urlparams,
        BranchID: CF.toInt(branchId),
        type: type,
        typoTitle: typoTitle,

      }, () => {
        this.getSupplierList(CF.toInt(branchId), PO.POID);
      });
    }


  }

  getPODetails = (PO) => {
    // this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetPOByPOID;
    let reqData = {
      ValidUser: ValidUser,
      PurchaseOrder: {
        POID: CF.toInt(PO.POID)
      }
    };
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        if (response.status === 200) {
          let ResonsePO = response.data;
          let PO = ResonsePO;

          PO.FCValue = 0.00;//resetting to update later on user change
          PO.BaseValue = 0.00;//resetting to update later on user change

          let PurchaseOrderLine = ResonsePO.PurchaseOrderLine;
          PO.BillingID = CF.toInt(ResonsePO.BillingID);

          PO.PODate = moment(PO.PODate).format("YYYY-MM-DD");
          PO.DispachDate = moment(PO.DispachDate).format("YYYY-MM-DD");
          PO.DeliveryDate = moment(PO.DeliveryDate).format("YYYY-MM-DD");
          if (PO.AmendmentNo > 0) {
            PO.AmendmentDate = moment(PO.AmendmentDate).format("YYYY-MM-DD");
          } else {
            PO.AmendmentDate = "";
          }

          let newPOL = [];//this.getProcessedPurchaseOrderLineList(PurchaseOrderLine);

          let SupplierItemCategoryArray = [];
          let data = this.getSupplierDataList(PO.SuplID);
          SupplierItemCategoryArray = data.SupplierItemCategory
          console.log("------------------------------> SupplierItemCategoryArray > ", SupplierItemCategoryArray);

          for (let i = 0; i < PurchaseOrderLine.length; i++) {

            let EL = {
              POID: PO.POID,
              Type: PurchaseOrderLine[i].Type,
              LNo: PurchaseOrderLine[i].LNo,
              TypeIDList: [],
              CategoryList: PurchaseOrderLine[i].Type === 0 ? SupplierItemCategoryArray : [],
              isCategoryDisabled: PurchaseOrderLine[i].Type === 0 ? false : true,
              CategoryId: PurchaseOrderLine[i].CatID,
              ItemList: this.getItemList(PurchaseOrderLine[i].Type, PO.SuplID, PurchaseOrderLine[i].CatID),
              ItemListSelected: { name: PurchaseOrderLine[i].name, value: PurchaseOrderLine[i].value },
              TypeID: PurchaseOrderLine[i].value,
              Description: PurchaseOrderLine[i].Description1,
              packingDescription: PurchaseOrderLine[i].PackingDesc1,
              SupplierCode: PurchaseOrderLine[i].SupplierCode,
              Narration: PurchaseOrderLine[i].Narration,
              UOMID: PurchaseOrderLine[i].UOMID,
              TolerancePercentage: PurchaseOrderLine[i].TolerancePercentage,
              Quantity: PurchaseOrderLine[i].Quantity,
              MRNQuantity: 0,
              LotDetails: [],
              Price: PurchaseOrderLine[i].Price,
              LineDiscPercentage: PurchaseOrderLine[i].LineDiscPercentage,
              LineDiscAmount: PurchaseOrderLine[i].LineDiscAmount,
              ItemPostingGroupID: PurchaseOrderLine[i].ItemPostingGroupID,
              GeneralPostingGroupList: [],
              GeneralPostingGroupID: null,
              VATPercentage: PurchaseOrderLine[i].VATPercentage,
              VATAmount: PurchaseOrderLine[i].VATAmount,
              HSNCode: PurchaseOrderLine[i].HSNCode,
              GSTGroupID: PurchaseOrderLine[i].GSTGroupID,
              SupplyStateID: this.state.StateID,
              GSTPercentage: PurchaseOrderLine[i].GSTPercentage,
              BuyFromGSTN: PO.GSTNo,
              NatureOfSupply: PurchaseOrderLine[i].NatureOfSupply,
              DValueID: PurchaseOrderLine[i].DValueID,
              IsQuality: PurchaseOrderLine[i].IsQuality,
              IsLot: PurchaseOrderLine[i].IsLot,
              CGSTAmt: PurchaseOrderLine[i].CGSTAmt,
              CGSTRate: PurchaseOrderLine[i].CGSTRate,
              SGSTAmt: PurchaseOrderLine[i].SGSTAmt,
              SGSTRate: PurchaseOrderLine[i].SGSTRate,
              GSTBaseAmount: PurchaseOrderLine[i].GSTBaseAmount,
              IGSTAmt: PurchaseOrderLine[i].IGSTAmt,
              IGSTRate: PurchaseOrderLine[i].IGSTRate,
              isDataProper: false,
            };
            newPOL.push(EL);
          }

          this.setState({
            PO: PO,
            PurchaseOrderLine: newPOL,
            Name: PO.Name,
            Address: PO.Address,
            Address2: PO.Address2,
            Address3: PO.Address3,
            City: PO.City,
            PostCode: PO.PostCode,
            CountryID: PO.CountryID,
            StateID: PO.StateID,
            ProgressLoader: true
          }, () => {
            // this.calculateInvoiceDetails();
            this.calculateDueDate();
            this.presetSetSupplierDropdown(PO);
            this.setFieldValuesOnSuplierChange(CF.toInt(PO.SuplID), "IG"); //initialIgnore to not set address to stateID
          });

        } else {
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        }
      })
      .catch((error) => {
        console.log("Error > ", error);
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });
  };

  getItemList = (Type, SuplID, CategoryId) => {
    let Supplier = this.state.supplierList;
    let CategoryList = [];
    let ItemList = [];

    switch (Type) {
      case 0:
        for (let i = 0; i < Supplier.length; i++) {
          if (Supplier[i].SuplID === SuplID) {
            CategoryList = Supplier[i].Category;

          }
        }

        for (let i = 0; i < CategoryList.length; i++) {
          if (CategoryList[i].value === CF.toInt(CategoryId)) {
            ItemList = CategoryList[i].Item;
            break;
          }
        }
        break;
      case 1:
        ItemList = this.state.GLAccount;
        break;
      case 2:
        ItemList = this.state.FixedAsset;
        break;
      case 3:
        ItemList = this.state.Charges
        break;
      default:
        break;
    }
    return ItemList;
  }

  presetSetSupplierDropdown = (PO) => {
    for (let i = 0; i < this.state.supplierList.length; i++) {
      if (this.state.supplierList[i].id === PO.SuplID) {
        this.setState({ SADIB_VALUE: this.state.supplierList[i], isDataFetched: true });
      }
    }
  }

  getProcessedPurchaseOrderLineList = (PurchaseOrderLine) => {
    console.log("getProcessedPurchaseOrderLineList > PurchaseOrderLine > ", PurchaseOrderLine);
    let newPOL = [];
    for (let i = 0; i < PurchaseOrderLine.length; i++) {
      let EL = {
        POID: PurchaseOrderLine[i].POID,
        Type: PurchaseOrderLine[i].Type,
        LNo: PurchaseOrderLine[i].LNo,
        TypeIDList: [],
        CategoryList: [],
        isCategoryDisabled: true,
        CategoryId: null,
        ItemList: [],
        ItemListSelected: null,
        TypeID: PurchaseOrderLine[i].TypeID,
        Description: null,
        packingDescription: null,
        SupplierCode: PurchaseOrderLine[i].SupplierCode,
        Narration: PurchaseOrderLine[i].Narration,
        UOMID: PurchaseOrderLine[i].UOMID,
        TolerancePercentage: (PurchaseOrderLine[i].TolerancePercentage === null || PurchaseOrderLine[i].TolerancePercentage === "NaN") ? 0 : PurchaseOrderLine[i].TolerancePercentage,
        Quantity: parseFloat(PurchaseOrderLine[i].Quantity),
        Price: parseFloat(PurchaseOrderLine[i].Price),
        LineDiscPercentage: PurchaseOrderLine[i].LineDiscPercentage,
        LineDiscAmount: PurchaseOrderLine[i].LineDiscAmount,
        ItemPostingGroupID: PurchaseOrderLine[i].ItemPostingGroupID,
        GeneralPostingGroupList: [],
        GeneralPostingGroupID: PurchaseOrderLine[i].GeneralPostingGroupID,
        VATPercentage: PurchaseOrderLine[i].VATPercentage,
        VATAmount: PurchaseOrderLine[i].VATAmount,
        HSNCode: PurchaseOrderLine[i].HSNCode,
        GSTGroupID: PurchaseOrderLine[i].GSTGroupID,
        SupplyStateID: this.state.StateID,
        GSTPercentage: PurchaseOrderLine[i].GSTPercentage,
        BuyFromGSTN: PurchaseOrderLine[i].BuyFromGSTN,
        NatureOfSupply: PurchaseOrderLine[i].NatureOfSupply,
        DValueID: PurchaseOrderLine[i].DValueID,
        IsQuality: this.state.Branch.IsQuality === false ? false : PurchaseOrderLine[i].IsQuality,//if branch is false- send false OR if branch is true - send actual value
        IsLot: this.state.Branch.IsLot === false ? false : PurchaseOrderLine[i].IsLot,//if branch is false- send false OR if branch is true - send actual value
        isDataProper: true,
      };
      newPOL.push(EL);
    }
    return newPOL;
  }

  getSupplierList = (BranchID) => {
    // this.setState({ ProgressLoader: false });
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
        BranchID: CF.toInt(BranchID)
      }
    };
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;

        if (response.status === 200) {
          let Branch = data.Branch[0];
          let Country = this.getCountryList(data.Country);
          let Currency = data.Currency;
          let GeneralPostingGroup = this.getAllGeneralPostingGroup(data.GeneralPostingGroup);
          let MODTax = data.MODTax;
          let PaymentTerms = this.getPaymentTerms(data.PaymentTerms);
          let ShipmentMode = data.ShipmentMode;
          let State = this.getStateList(data.State);
          let Supplier = data.Supplier;
          let SupplierPostingGroup = this.getAllSupplierPostingGroup(data.SupplierPostingGroup);
          let WareHouse = this.getWarehouseList(data.WareHouse);
          let UOM = data.UOM;
          let ItemPostingGroup = this.getAllItemPostingGroup(data.ItemPostingGroup);
          let GSTGROUP = data.GSTGROUP;
          let GLAccount = data.GLAccount;
          let Charges = data.Charges;
          let FixedAsset = data.FixedAsset;
          let DimensionsList = data.DimensionValue;
          let IncoTermList = data.IncoTerms;
          let PortList = data.Port;

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

          for (let i = 0; i < WareHouse.length; i++) {
            if (WareHouse[i].IsDefault === true) {
              PO.WareHouseID = CF.toInt(WareHouse[i].value);
              PO.DeliveryAddress = WareHouse[i].deliveryAddress;
              break;
            }
          }


          this.setState({
            PaymentTerms: data.PaymentTerms,
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
            supplierList: Supplier,
            SupplierPostingGroupList: SupplierPostingGroup,
            WarehouseList: WareHouse,
            UOMList: UOM,
            ItemPostingGroupList: ItemPostingGroup,
            GSTGroupIDList: GSTGROUP,
            GLAccount: GLAccount,
            Charges: Charges,
            FixedAsset: FixedAsset,
            DimensionsList: DimensionsList,
            IncoTermList: IncoTermList,
            PortList: PortList
            // ProgressLoader: this.state.type === "edit" ? false : true
          }, () => {

            if (this.state.type === "edit") {
              this.getPODetails(this.state.PO);
            }
          });
        } else {
          // this.setState({isDataFetched:false});
        }


      })
      .catch((error) => {
        console.log("Error - supplier fetch > ", error);
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
        deliveryAddress: deliveryAddress,
        IsDefault: data[i].IsDefault
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

  setFieldValuesOnSuplierChange = (SuplID, event) => {
    console.log();
    let PO = this.state.PO;
    let data = this.getSupplierDataList(SuplID);
    PO.CurrID = data.CurrID;
    // UOMList
    if (data.SupplierAdressList.length > 0) {
      let BillingID = null;
      if (this.state.type === "add" || event === "dropdownChange") {
        PO.BillingID = data.SupplierAdressList[0].value;
        BillingID = data.SupplierAdressList[0].value;
        PO.CurrID = data.CurrID;
        PO.PaymentTermID = data.PaymentTermID;
        PO.PaymentTerm = this.getPaymentTermsDescriptionByID(data.PaymentTermID);
      }



      this.setState({
        PO: PO,
        // SupplierItemList:data.Item
        SupplierItemCategory: data.SupplierItemCategory
      }, () => {
        let PO = this.state.PO;
        let BCdata = null;
        if (this.state.type === "add" || event === "dropdownChange") {
          BCdata = this.getDataToSetOnBillingChange(CF.toInt(BillingID));
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
        }
        if (this.state.type === "edit" && event != "dropdownChange") {
          BCdata = this.getDataToSetOnBillingChange(CF.toInt(this.state.PO.BillingID));
        }

        console.log("#####################3-----------------------------------> BCdata > ", BCdata);

        if (event === "IG") {
          this.setState({
            PO: PO,
            // Name: BCdata.Name,
            // Address: BCdata.Address,
            // Address2: BCdata.Address2,
            // Address3: BCdata.Address3,
            // City: BCdata.City,
            // PostCode: BCdata.PostCode,
            // CountryID: BCdata.CountryID,
            // StateID: BCdata.StateID,
          });
        } else {
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
        }


      });
    }
    this.setState({
      SupplierAdressList: data.SupplierAdressList,
      SupplierAddressMasterList: data.SupplierAddressMasterList,
      PO: PO
    });
  }

  getSupplierDataList = (SuplID) => {
    let dropdownData = [];
    let SupplierItemCategory = [];
    // let Item = [];
    let Address = [];
    let CurrID = 0;
    let PaymentTermID = 0;

    for (let i = 0; i < this.state.supplierMasterList.length; i++) {
      if (this.state.supplierMasterList[i].SuplID === SuplID) {
        SupplierItemCategory = this.state.supplierMasterList[i].Category
        // Item = this.state.supplierMasterList[i].Item;
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
      SupplierItemCategory: SupplierItemCategory,
      // Item:Item,
      SupplierAdressList: dropdownData,
      SupplierAddressMasterList: Address,
      CurrID: CurrID,
      PaymentTermID: PaymentTermID,

    };


  }

  getDataToSetOnBillingChange = (AddressID) => {
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

  getAllItemPostingGroup = (data) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Code + " - " + data[i].Description,
        value: data[i].ItemPostingGroupID,
      };
      newData.push(o);
    }

    return newData;
  };

  getDimensions = (data) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let o = {
        name: data[i].Name + " - " + data[i].Description,
        value: data[i].DimensionID,
      };
      newData.push(o);
    }
    return newData;
  }

  itemDelete = (i, params) => {
    console.log("itemDelete > i > ", i);
    console.log("itemDelete > params > ", params);
    this.setState({
      DialogStatus: true,
      currentDeleteItemLine: { index: i, params: params }
    });
  }

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
      CountryID: data.CountryID,
      StateID: data.StateID,

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
    let MRN = this.state.MRN;
    switch (param) {
      case "SuplID":
        if (e) {
          this.setState({ SADIB_VALUE: e, isDataFetched: true }, () => {
            console.log("e > ", e);
            let CurrencyCode = "";
            for (let i = 0; i < this.state.CurrencyList.length; i++) {
              if (this.state.CurrencyList[i].value === CF.toInt(e.CurrID)) {
                PO.ExchRate = this.state.CurrencyList[i].ExchRate;
                CurrencyCode = " (" + this.state.CurrencyList[i].name + ")";
                break;
              }
            }
            this.setState({ CurrencyCode: CurrencyCode });
            PO.SuplID = CF.toInt(e.id);
            this.setFieldValuesOnSuplierChange(CF.toInt(e.id), "dropdownChange");
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
      //----------MRN Parameters------------------------
      case "SuplInvDate":
        MRN[param] = moment(e.target.value).format("YYYY-MM-DD");
        this.setState({ MRN: MRN });
        break;
      case "DueDate":
        MRN[param] = moment(e.target.value).format("YYYY-MM-DD");
        this.setState({ MRN: MRN });
        break;
      case "BillOfEntryDate":
        MRN[param] = moment(e.target.value).format("YYYY-MM-DD");
        this.setState({ MRN: MRN });
        break;
      case "BLOrAWBDate":
        MRN[param] = moment(e.target.value).format("YYYY-MM-DD");
        this.setState({ MRN: MRN });
        break;
      case "GateEntryDate":
        MRN[param] = moment(e.target.value).format("YYYY-MM-DD");
        this.setState({ MRN: MRN });
        break;
      case "MRNDate":
        MRN[param] = moment(e.target.value).format("YYYY-MM-DD");
        this.setState({ MRN: MRN });
        break;
      case "SuplInvNo":
        MRN[param] = e.target.value;
        this.setState({ MRN: MRN });
        break;
      case "EWayBillNo":
        MRN[param] = e.target.value;
        this.setState({ MRN: MRN });
        break;

      case "BillOfEntryNo":
        MRN[param] = e.target.value;
        this.setState({ MRN: MRN });
        break;
      case "BLOrAWBNo":
        MRN[param] = e.target.value;
        this.setState({ MRN: MRN });
        break;
      case "GateEntryNo":
        MRN[param] = e.target.value;
        this.setState({ MRN: MRN });
        break;
      case "PayToSuplID":
        MRN[param] = e.target.value;
        this.setState({ MRN: MRN });
        break;
      case "DutyFogone":
        MRN[param] = parseFloat(e.target.value);
        this.setState({ MRN: MRN });
        break;
      case "DutyPaid":
        MRN[param] = parseFloat(e.target.value);
        this.setState({ MRN: MRN });
        break;
      case "GSTOrVATPaid":
        MRN[param] = parseFloat(e.target.value);
        this.setState({ MRN: MRN });
        break;
      case "AssableValue":
        MRN[param] = parseFloat(e.target.value);
        this.setState({ MRN: MRN });
        break;
      case "BillOfEntryValue":
        MRN[param] = parseFloat(e.target.value);
        this.setState({ MRN: MRN });
        break;
      case "PortID":
        MRN[param] = parseInt(e.target.value);
        this.setState({ MRN: MRN });
        break;

      //-----------------------------------------    
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
        PO.CurrID = CF.toInt(e.target.value);
        let CurrencyCode = "";
        for (let i = 0; i < this.state.CurrencyList.length; i++) {
          if (this.state.CurrencyList[i].value === CF.toInt(e.target.value)) {
            PO.ExchRate = this.state.CurrencyList[i].ExchRate;
            CurrencyCode = " (" + this.state.CurrencyList[i].name + ")";
            break;
          }
        }
        this.setState({ CurrencyCode: CurrencyCode });
        this.setParams(PO);
        break;
      case "ExchRate":
        PO.ExchRate = e.target.value;
        this.setParams(PO);
        break;
      case "PaymentTerm":
        PO.PaymentTerm = CF.toInt(e.target.value);
        this.setParams(PO);
        break;
      case "MODTaxID":
        PO.MODTaxID = CF.toInt(e.target.value);
        this.setParams(PO);
        break;
      case "IncoID":
        PO.IncoID = CF.toInt(e.target.value);
        this.setParams(PO);
        break;
      case "DeliveryAddress":
        PO.DeliveryAddress = e.target.value;
        this.setParams(PO);
        break;
      case "ShipmentModeID":
        PO.ShipmentModeID = CF.toInt(e.target.value);
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
      case "AmendmentInput":
        let AmendmentInput = this.state.AmendmentInput;
        AmendmentInput.status = e.target.checked;
        if (e.target.checked === true) {
          let old = {
            AmendmentNo: PO.AmendmentNo,
            AmendmentDate: PO.AmendmentDate
          };
          AmendmentInput.old = old;
        }
        this.setState({ AmendmentInput: AmendmentInput }, () => {
          if (e.target.checked === true) {
            PO.AmendmentNo = CF.toInt(PO.AmendmentNo) + 1;
            PO.AmendmentDate = today;
          } else {
            PO.AmendmentNo = AmendmentInput.old['AmendmentNo'];
            PO.AmendmentDate = AmendmentInput.old['AmendmentDate'];
          }

          this.setParams(PO);
        });
      default:
        break;
    }

    this.validateBtnEnable();
  };

  validateBtnEnable = () => {

  };

  setParams = (object) => {
    this.setState({ PO: object }, () => {
      this.calculateInvoiceDetails();
    })
  };

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };


  handleDialogClose = () => {
    this.setState({ DialogStatus: false });
  }

  deleteSelectedItem = () => {
    this.handleDialogClose();
    let currentDeleteItemLine = this.state.currentDeleteItemLine;
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    let newPurchaseOrderLine = [];
    for (let i = 0; i < PurchaseOrderLine.length; i++) {
      if (currentDeleteItemLine.index === i) { } else {
        newPurchaseOrderLine.push(PurchaseOrderLine[i]);
      }
    }
    this.setState({ PurchaseOrderLine: newPurchaseOrderLine }, () => {
      this.calculateInvoiceDetails();
      this.validateLineItems();
    });
  }




  handleClose = () => {
    this.clearLotDetails();
    let Dialog = this.state.Dialog;
    Dialog.DialogStatus = false;
    this.setState({ Dialog: Dialog });
  };


  CloseLotDialog = () => {
    let Dialog = this.state.Dialog;
    Dialog.DialogStatus = false;
    this.setState({ Dialog: Dialog });
  };



  openDialog = (item) => {

    if (parseFloat(item.MRNQuantity) > 0) {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = true;
      Dialog.DialogTitle = "Add Lot Details";
      console.log("openDialog > item > ", item);

      this.setState({
        SelectedLotItem: item,
        Dialog: Dialog
      });
    } else {
      this.setState({ ErrorMessageProps: "Pls enter GIT Quantity", ErrorPrompt: true });
    }


  };

  getNOSvalue = () => {
    let UOMList = this.state.UOMList;
    for (let i = 0; i < UOMList.length; i++) {
      if (UOMList[i].name === "NOS") {
        return UOMList[i].value;
        break;
      }
    }
  }

  fetchPrice = (Quantity, o) => {
    console.log("#######################  fetchPrice > Quantity > ", Quantity);
    console.log("#######################  fetchPrice > o > ", o);
    let UnitPrice = 0.00;
    try {
      let UOMID_i = o.UOMID;
      for (let i = 0; i < o.ItemList.length; i++) {
        if (o.ItemList[i].value === o.TypeID) {
          let ItemPrice = o.ItemList[i]['ItemPrice'];
          for (let j = 0; j < ItemPrice.length; j++) {
            let UOM_j = ItemPrice[j]['UOM'];
            if (UOMID_i === UOM_j) {
              let jo = ItemPrice[j];
              console.log("#######################  fetchPrice > jo > ", jo);
              if (parseFloat(Quantity) >= parseFloat(jo.MinQty) && parseFloat(Quantity) <= parseFloat(jo.MaxQty)) {
                console.log("#######################  fetchPrice > jo.UnitPrice > ", jo.UnitPrice);
                UnitPrice = jo.UnitPrice;
                break;
              }
            }
          }
        }
      }
    } catch (err) {
      console.log("err > ", err)
      UnitPrice = 0.00;
    }
    return UnitPrice;
  }

  updateLineDetail = (i, key, e) => {
    // console.log("i > ", i);
    // console.log("key > ", key);
    // console.log("e.target.value > ", e.target.value);
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    let o = PurchaseOrderLine[i];
    switch (key) {
      case "Type":
        o[key] = CF.toInt(e.target.value);//setting the dropdown value.
        o.Price = 0;
        o.HSNCode = "";
        o.CategoryId = null;
        o.SupplierCode = null;
        o.Narration = null;
        o.TolerancePercentage = 0;
        o.LineDiscPercentage = 0;
        o.ItemPostingGroupID = null;
        o.GeneralPostingGroupID = null;
        o.VATPercentage = 0;
        o.VATAmount = 0;
        o.GSTGroupID = 0;
        o.SupplyStateID = 0;
        o.DValueID = 0;
        o.GSTPercentage = 0;
        switch (CF.toInt(e.target.value)) {
          case 0://item
            o.Quantity = 0;
            o.CategoryList = this.state.SupplierItemCategory;
            o.isCategoryDisabled = false;
            o.ItemList = [];
            o.UOMID = "";
            break;
          case 1://G/L Account
            o.Quantity = 1;
            o.ItemListSelected = null;
            o.CategoryList = [];
            o.CategoryId = null;
            o.isCategoryDisabled = true;
            o.ItemList = this.state.GLAccount;
            o.UOMID = this.getNOSvalue();
            break;
          case 2://Fixed Asset        
            o.Quantity = 1;
            o.ItemListSelected = null;
            o.CategoryList = [];
            o.CategoryId = null;
            o.isCategoryDisabled = true;
            o.ItemList = this.state.FixedAsset;
            o.UOMID = this.getNOSvalue();
            break;
          case 3://Charge          
            o.Quantity = 1;
            o.ItemListSelected = null;
            o.CategoryList = [];
            o.CategoryId = null;
            o.isCategoryDisabled = true;
            o.ItemList = this.state.Charges;
            o.UOMID = this.getNOSvalue();
            break;
          default:
            break;
        }
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "CategoryId":
        o[key] = CF.toInt(e.target.value);
        let CategoryList = o.CategoryList;
        console.log("--> CategoryList > ", CategoryList);
        for (let i = 0; i < CategoryList.length; i++) {
          if (CategoryList[i].value === CF.toInt(e.target.value)) {
            o.ItemList = CategoryList[i].Item;
            break;
          }
        }
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "SupplierCode":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "Narration":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "TypeID":
        if (e) {
          console.log("TypeID > e > ", e);
          o.ItemListSelected = e;
          o.TypeID = CF.toInt(e.value);
          o.GSTGroupID = e.GSTGroupID;

          if (o.Type === 0) {

            o.Description = e.Description1;
            o.packingDescription = e.PackingDesc1;
            o.HSNCode = e.HSNCode;


            if (this.state.PO.IsTaxExempt === true || this.state.PO.IsImport === true || this.state.PO.IsSEZPurchase === true) {
              o.GSTPercentage = 0.00;
              o.VATPercentage = 0.00;
            } else {
              o.GSTPercentage = e.GSTPercentage;
              o.VATPercentage = this.state.Branch.VATPercentage;
            }


            o.UOMID = e.PurchaseUOM;
            o.ItemPostingGroupID = e.ItemPostingGroupID;
            o.TolerancePercentage = e.TolerancePercentage;
            o.IsLot = e.IsLot;
            o.IsQuality = e.IsQuality;
            o.Quantity = 1.00;
            let Price = this.fetchPrice(1, o);
            o.Price = parseFloat(Price);
          } else {

            if (this.state.PO.IsTaxExempt === true || this.state.PO.IsImport === true || this.state.PO.IsSEZPurchase === true) {
              o.GSTPercentage = 0.00;
              o.VATPercentage = 0.00;
            } else {
              o.GSTPercentage = e.GSTPercentage;
              o.VATPercentage = this.state.Branch.VATPercentage;
            }

            /*
            if(this.state.Branch.IsGST===true){
              o.GSTPercentage = (this.state.PO.IsTaxExempt===false || this.state.PO.IsImport===false || this.state.PO.IsSEZPurchase===false)?e.GSTPercentage:0;
             }
             if(this.state.Branch.IsVAT===true){
              o.VATPercentage=(this.state.PO.IsTaxExempt===false || this.state.PO.IsImport===false || this.state.PO.IsSEZPurchase===false)?this.state.Branch.VATPercentage:0;
             } 
*/


            o.packingDescription = "";
            o.UOMID = this.getNOSvalue();
            o.ItemPostingGroupID = 0;
            o.IsLot = false;
            o.IsQuality = false;
          }
          PurchaseOrderLine[i] = o;
          this.setLineParams(PurchaseOrderLine);
        } else {
          o.TypeID = "";
          o.ItemListSelected = null;
          o.GSTGroupID = "";
          o.Description = "";
          o.packingDescription = "";
          o.HSNCode = "";
          o.GSTPercentage = 0;
          o.UOMID = "";
          o.ItemPostingGroupID = "";
          o.TolerancePercentage = 0;
          o.IsLot = false;
          o.IsQuality = false;
        }
        break;
      case "UOMID":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "TolerancePercentage":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "Quantity":
        let price = 0;
        price = this.fetchPrice(e.target.value, o);
        console.log("IN Quantity > price slab value > ", price);
        if (price) {
          o.Price = parseFloat(price);
        } else {
          o.Price = 0;
        }
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "MRNQuantity":
        let Quantity = parseFloat(o.Quantity);
        let TolerancePercentage = parseFloat(o.TolerancePercentage);
        let maxQuantity = parseFloat(Quantity) + (parseFloat(Quantity) * parseFloat(TolerancePercentage));
        if (parseFloat(e.target.value) > maxQuantity) {
          this.setState({ ErrorMessageProps: "MRN Quantity Exceeds Tolerance Quantity", ErrorPrompt: true });
        } else {
          if (isNaN(e.target.value)) {
            this.setState({ ErrorMessageProps: "MRN Quantity should be Number", ErrorPrompt: true });
            return false;
          } else {
            o[key] = parseFloat(e.target.value);
            PurchaseOrderLine[i] = o;
            this.setLineParams(PurchaseOrderLine);
          }

        }

        break;
      case "Price":
        if (isNaN(e.target.value)) {
          this.setState({ ErrorMessageProps: "Price should be currency", ErrorPrompt: true });
          return false;
        } else {
          o[key] = parseFloat(e.target.value);
          PurchaseOrderLine[i] = o;
          this.setLineParams(PurchaseOrderLine);
        }

        break;
      case "LineDiscPercentage":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "ItemPostingGroupID":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "GeneralPostingGroupID":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "VATPercentage":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "VATAmount":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "HSNCode":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "GSTGroupID":
        o[key] = CF.toInt(e.target.value);
        let GSTGroupIDList = this.state.GSTGroupIDList;
        if (this.state.PO.IsTaxExempt === true || this.state.PO.IsImport === true || this.state.PO.IsSEZPurchase === true) {
          o.GSTPercentage = 0.00;
        } else {
          if (this.state.PO.IsTaxExempt === true) {
            o.GSTPercentage = 0;
          } else {
            for (let i = 0; i < GSTGroupIDList.length; i++) {
              if (GSTGroupIDList[i].value === CF.toInt(e.target.value)) {
                o.GSTPercentage = GSTGroupIDList[i].GSTPercentage;
              }
            }
          }
        }
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "SupplyStateID":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "GSTPercentage":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "NatureOfSupply":
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "DValueID":
        o[key] = CF.toInt(e.target.value);
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "IsQuality":
        o[key] = e.target.checked;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "IsLot":
        o[key] = e.target.checked;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      default:
        break;
    }

    let validLine = this.validateLine(o);
    console.log("validLine > ", validLine);
    if (validLine === true) {
      o.isDataProper = true;
      PurchaseOrderLine[i] = o;
      this.setLineParams(PurchaseOrderLine);
    } else {
      o.isDataProper = false;
      PurchaseOrderLine[i] = o;
      this.setLineParams(PurchaseOrderLine);
    }


  }

  setLineParams = (object) => {
    this.setState({ PurchaseOrderLine: object }, () => {
      this.calculateInvoiceDetails();
    })
  };

  validateLine = (o) => {
    let validLine = false;

    if (
      o.Type === "" || o.Type === null ||
      o.TypeID === "" || o.TypeID === null ||
      o.Quantity === 0 ||
      o.Price === 0 ||
      o.MRNQuantity === 0
    ) {
      validLine = false;
    } else {
      if (o.HSNCode) {
        if ((o.HSNCode.length < 6 || o.HSNCode.length > 8)) { validLine = false; } else { validLine = true; }
      } else {
        validLine = false;
      }
    }

    this.processAddUpdateStatus(validLine);

    return validLine;
  }

  validateLineItems = () => {
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    let totalLines = PurchaseOrderLine.length;
    let totalValids = 0;
    for (let i = 0; i < PurchaseOrderLine.length; i++) {
      let o = PurchaseOrderLine[i];
      let validLine = false;
      if (
        o.Type === "" || o.Type === null ||
        o.TypeID === "" || o.TypeID === null ||
        o.Quantity === 0 ||
        o.Price === 0
      ) {
        validLine = false;
      } else {
        if (o.HSNCode) {
          if ((o.HSNCode.length < 6 || o.HSNCode.length > 8)) { validLine = false; } else {
            validLine = true;
            totalValids++;
          }
        } else {
          validLine = false;
        }
      }
    }

    let validLine = false;
    totalLines === totalValids ? validLine = true : validLine = false;

    this.processAddUpdateStatus(validLine);
  }

  processAddUpdateStatus = (validLine) => {
    validLine === true ? this.setState({ DisableUpdatebtn: false, DisableCreatebtn: false }) : this.setState({ DisableUpdatebtn: true, DisableCreatebtn: false });
  }

  getProcessedPurchaseOrderLineListUpdate = () => {
    let PurchaseOrderLineList = [];
    let POL = this.state.PurchaseOrderLine;
    console.log("> getProcessedPurchaseOrderLineListUpdate POL > ", POL);
    for (let i = 0; i < POL.length; i++) {
      let o = {
        POID: this.state.PO.POID,
        Type: POL[i].Type,
        LNo: POL[i].LNo,
        TypeID: POL[i].TypeID,
        SupplierCode: POL[i].SupplierCode === null ? "" : POL[i].SupplierCode,
        Narration: POL[i].Narration === null ? "" : POL[i].Narration,
        UOMID: POL[i].UOMID,
        TolerancePercentage: parseFloat(POL[i].TolerancePercentage),
        Quantity: parseFloat(POL[i].Quantity),
        Price: POL[i].Price,
        LineDiscPercentage: parseFloat(POL[i].LineDiscPercentage),
        // LineDiscAmount: POL[i].LineDiscAmount,
        ItemPostingGroupID: POL[i].ItemPostingGroupID,
        // GeneralPostingGroupID: POL[i].GeneralPostingGroupID,
        VATPercentage: parseFloat(POL[i].VATPercentage),
        // VATAmount: POL[i].VATAmount,
        HSNCode: POL[i].HSNCode,
        GSTGroupID: POL[i].GSTGroupID,
        SupplyStateID: this.state.StateID,
        GSTPercentage: POL[i].GSTPercentage,
        // BuyFromGSTN: POL[i].BuyFromGSTN,
        // NatureOfSupply: POL[i].NatureOfSupply,
        DValueID: POL[i].DValueID === "" ? 0 : CF.toInt(POL[i].DValueID),
        IsQuality: POL[i].IsQuality,
        IsLot: POL[i].IsLot
      };
      PurchaseOrderLineList.push(o);
    }
    return PurchaseOrderLineList;
  }

  validatePOData = (PurchaseOrder) => {
    let isProperData = false;


    return isProperData;
  }



  calculateInvoiceDetails = () => {
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    let PO = this.state.PO;

    let Amount = 0.00;
    let DiscountAmount = 0.00;
    let TotalTax = 0.00;

    let FCValue = 0.00;
    let BaseValue = 0.00;

    try {
      for (let i = 0; i < PurchaseOrderLine.length; i++) {
        console.log("PurchaseOrderLine[i] > ", PurchaseOrderLine[i]);
        let TAX = 0;
        if (this.state.Branch.IsGST === true) {
          TAX = PurchaseOrderLine[i].GSTPercentage;
        }
        if (this.state.Branch.IsVAT === true) {
          TAX = PurchaseOrderLine[i].VATPercentage;
        }

        let itemQty = parseFloat(PurchaseOrderLine[i].MRNQuantity);
        let itemPrice = parseFloat(PurchaseOrderLine[i].Price);
        let itemTotalQtyPrice = parseFloat(itemQty) * parseFloat(itemPrice);
        let itemDiscountPercentage = parseFloat(PurchaseOrderLine[i].LineDiscPercentage);
        let itemDiscountAmount = (parseFloat(itemTotalQtyPrice) * parseFloat(itemDiscountPercentage)) / 100;
        let itemTax = ((parseFloat(itemTotalQtyPrice) - parseFloat(itemDiscountAmount)) * parseFloat(TAX)) / 100;
        Amount += parseFloat(itemTotalQtyPrice);
        DiscountAmount += parseFloat(itemDiscountAmount);
        TotalTax += parseFloat(itemTax);
      }

      FCValue = (parseFloat(Amount) - parseFloat(DiscountAmount)) + TotalTax
      BaseValue = parseFloat(PO.ExchRate) * parseFloat(FCValue);

      if (isNaN(Amount)) {
        Amount = 0.00;
      }

      if (isNaN(DiscountAmount)) {
        DiscountAmount = 0.00;
      }

      if (isNaN(TotalTax)) {
        TotalTax = 0.00;
      }

      if (isNaN(FCValue)) {
        FCValue = 0.00;
      }
      if (isNaN(BaseValue)) {
        BaseValue = 0.00;
      }

      PO.FCValue = PO.IsRounding === true ? parseInt(FCValue) : FCValue.toFixed(2);
      PO.BaseValue = PO.IsRounding === true ? parseInt(BaseValue) : BaseValue.toFixed(2);
    } catch (e) { }

    this.setState({
      PO: PO,
      Amount: PO.IsRounding === true ? parseInt(Amount) : Amount.toFixed(2),
      DiscountAmount: PO.IsRounding === true ? parseInt(DiscountAmount) : DiscountAmount.toFixed(2),
      TotalTax: PO.IsRounding === true ? parseInt(TotalTax) : TotalTax.toFixed(2),
    });
  }


  getCurrencyString = (price) => {
    // return new Intl.NumberFormat(undefined, { maximumSignificantDigits: 3 }).format(price);
    return price;
  }

  getSupplierName = () => {
    let supplierList = this.state.supplierList;
    console.log("getSupplierName > supplierList > ", supplierList);
    for (let i = 0; i < supplierList.length; i++) {
      if (supplierList[i].SuplID === this.state.PO.SuplID) {
        return supplierList[i].Name
      }
    }
  }





  calculateDueDate = () => {

    let POPaymentTerm = this.state.PO.PaymentTermID;
    let PaymentTerms = this.state.PaymentTerms;
    let SuplInvDate = this.state.MRN.SuplInvDate;
    let DueDays = 0;

    for (let i = 0; i < PaymentTerms.length; i++) {
      if (parseInt(PaymentTerms[i].PaymentTermID) === parseInt(POPaymentTerm)) {
        DueDays = parseInt(PaymentTerms[i].DueDays);
        break;
      }
    }
    let calculatedNewDate = moment(SuplInvDate).add(DueDays, 'day');
    let newDate = moment(calculatedNewDate).format("YYYY-MM-DD");

    //------Setting for state referance----------
    let MRN = this.state.MRN;
    MRN.DueDate = newDate;
    this.setState({ MRN: MRN });
    //-------------------------------------------

  }


  //------------------------------------------LOT Details--------------------------------------------------------

  updateLotDetail = (key, e, index) => {
    let SelectedLotItem = this.state.SelectedLotItem;
    let LotDetails = SelectedLotItem.LotDetails;
    let newD = [];
    let total = 0.00;
    for (let i = 0; i < LotDetails.length; i++) {


      if (i === index) {
        let ldobj = LotDetails[i];
        switch (key) {
          case "LotNo":
            ldobj[key] = e.target.value;
            newD.push(ldobj);
            break;
          case "Quantity":
            ldobj[key] = parseFloat(e.target.value);
            newD.push(ldobj);

            break;
          case "PackingUOM":
            ldobj[key] = parseInt(e.target.value);
            newD.push(ldobj);
            break;
          case "Location":
            ldobj[key] = e.target.value;
            newD.push(ldobj);
            break;
          default:
            break;
        }
      } else {
        total = parseFloat(total) + parseFloat(LotDetails[i].Quantity);
        newD.push(LotDetails[i]);
      }
    }
    SelectedLotItem.LotDetails = newD;
    this.setState({ SelectedLotItem: SelectedLotItem });
  }

  resetFileInput = () => {
    document.getElementById("uploadInput").value = "";
  }

  ValidateLotFile = (filename) => {
    var _validFileExtensions = [".xlsx", ".xls"];
    var sFileName = filename;
    if (sFileName.length > 0) {
      var blnValid = false;
      for (var j = 0; j < _validFileExtensions.length; j++) {
        var sCurExtension = _validFileExtensions[j];
        if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
          blnValid = true;
          break;
        }
      }

      if (!blnValid) {
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", ") });
        this.resetFileInput();
        return false;
      }
    }

    return true;
  }

  importLotFromExcel = (e) => {
    let SelectedLotItem = this.state.SelectedLotItem;
    if (parseFloat(SelectedLotItem.MRNQuantity) > 0) {
      if (e.target.files[0]) {
        let file = e.target.files[0];
        let chk = this.ValidateLotFile(file.name);

        if (chk) {
          let ItemRows = [];
          let total = 0.00;
          let processNext = true;
          readXlsxFile(file).then((rows) => {
            for (let i = 1; i < rows.length; i++) {
              total = parseFloat(total) + parseFloat(rows[i][1]);
              if (total > parseFloat(SelectedLotItem.MRNQuantity)) {
                this.setState({ ErrorPrompt: true, ErrorMessageProps: "Total Quantity exceeds GIT Quantity." });
                SelectedLotItem.LotDetails = [];
                this.setState({ SelectedLotItem: SelectedLotItem });
                processNext = false;
                break;
              }
            }
            if (processNext === true) {
              for (let i = 1; i < rows.length; i++) {
                let itemRow = {
                  LotID: 0,
                  LNo: i,
                  TypeID: CF.toInt(this.state.SelectedLotItem.TypeID),

                  LotNo: rows[i][0],
                  Quantity: rows[i][1],

                  PackingUOM: rows[i][2],
                  Location: rows[i][3],
                };


                ItemRows.push(itemRow);
              }
              SelectedLotItem.LotDetails = ItemRows;
              this.setState({ SelectedLotItem: SelectedLotItem });
            }
          })
          this.resetFileInput();
        } else {
          this.resetFileInput();
          return false;
        }
      }
    } else {
      this.resetFileInput();
      this.setState({ ErrorMessageProps: "Pls enter GIT Quantity", ErrorPrompt: true });
    }

  }

  clearLotDetails = () => {
    let SelectedLotItem = this.state.SelectedLotItem;
    if (SelectedLotItem.LotDetails) {
      SelectedLotItem.LotDetails = [];
      this.setState({ SelectedLotItem: SelectedLotItem });
    }
  }


  AddLotLine = (item) => {
    console.log("AddLotLine > item > ", item);
    let lotobj = {
      LotID: 0,
      TypeID: item.TypeID,
      LNo: 0,

      LotNo: "",
      Quantity: 0,

      PackingUOM: "",
      Location: ""
    };
    let LD = item.LotDetails ? item.LotDetails : [];
    LD.push(lotobj);
    item.LotDetails = LD;
    this.setState({ SelectedLotItem: item });
  }

  LotItemDelete = (index, item) => {
    let SelectedLotItem = this.state.SelectedLotItem;
    let LotDetails = SelectedLotItem.LotDetails;
    let newD = [];
    for (let i = 0; i < LotDetails.length; i++) {
      if (i === index) { } else {
        newD.push(LotDetails[i]);
      }
    }
    SelectedLotItem.LotDetails = newD;
    this.setState({ SelectedLotItem: SelectedLotItem });
  }

  getTotalLotQuantity = () => {
    let total = 0.00;
    if (this.state.SelectedLotItem.LotDetails) {
      let SelectedLotItem = this.state.SelectedLotItem;
      let LotDetails = SelectedLotItem.LotDetails;

      for (let i = 0; i < LotDetails.length; i++) {
        total = parseFloat(total) + parseFloat(LotDetails[i].Quantity);
      }
      total = total.toFixed(2);
    }

    return total;
  }



  SaveLotDetailsOfLine = () => {
    let SelectedLotItem = this.state.SelectedLotItem;
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    let totalLotQuantity = this.getTotalLotQuantity();
    if (parseFloat(totalLotQuantity) !== parseFloat(SelectedLotItem.MRNQuantity)) {
      this.setState({ ErrorPrompt: true, ErrorMessageProps: "Total Lot Quantity does not match MRN Quantity." });
      return false;
    } else {
      let newD = [];
      for (let i = 0; i < PurchaseOrderLine.length; i++) {
        if (PurchaseOrderLine[i].LNo === SelectedLotItem.LNo) {
          newD.push(SelectedLotItem);
        } else {
          newD.push(PurchaseOrderLine[i]);
        }
      }
      this.setState({ PurchaseOrderLine: PurchaseOrderLine });
      this.CloseLotDialog();
    }
  }

  //--------------------------------------------------------------------------------------------------------

  updateContainerDetail = (key, e, index) => {
    this.setState({ PostBtnStatus: true });//disabling post for saving
    let ContainerInfo = this.state.ContainerInfo;
    let newD = [];
    for (let i = 0; i < ContainerInfo.length; i++) {
      if (i === index) {
        let obj = ContainerInfo[i];
        if (key === "ContainerType") {
          obj[key] = parseInt(e.target.value);
        } else {
          obj[key] = e.target.value;
        }

        newD.push(obj);
      } else {
        newD.push(ContainerInfo[i]);
      }
    }
    this.setState({ ContainerInfo: newD });
  }

  clearContainerDetails = () => {
    let ContainerInfo = this.state.ContainerInfo;
    if (ContainerInfo) {
      ContainerInfo = [];
      this.setState({ ContainerInfo: ContainerInfo });
    }
  }

  AddContainerLine = (item) => {
    console.log("AddLotLine > item > ", item);
    let contobj = {
      ID: 0,
      LNo: 0,

      ContainerType: "",
      ContainerNo: "",
      Remarks: ""
    };
    let List = item ? item : [];
    List.push(contobj);

    this.setState({ ContainerInfo: List });
  }

  ContainerItemDelete = (index, item) => {
    let ContainerInfo = this.state.ContainerInfo;

    let newD = [];
    for (let i = 0; i < ContainerInfo.length; i++) {
      if (i === index) { } else {
        newD.push(ContainerInfo[i]);
      }
    }
    this.setState({ ContainerInfo: newD });
  }


  importContainerFromExcel = (e) => {

    if (e.target.files[0]) {
      let file = e.target.files[0];
      let chk = this.ValidateLotFile(file.name);

      if (chk) {
        let ItemRows = [];
        readXlsxFile(file).then((rows) => {
          for (let i = 1; i < rows.length; i++) {
            let itemRow = {
              ID: 0,
              LNo: i,

              ContainerType: rows[i][0],
              ContainerNo: rows[i][1],
              Remarks: rows[i][2]
            };
            ItemRows.push(itemRow);
          }
          this.setState({ ContainerInfo: ItemRows });
        })
        this.resetFileInput();
      } else {
        this.resetFileInput();
        return false;
      }
    }

  }

  resetFileInput = () => {
    document.getElementById("ContainerUploadInput").value = "";
  }
  //---------------------------------------------------------------------------------------------------------

  validateMRNData = () => {
    let validateMRNData = true;

    //validate MRN data

    return validateMRNData;
  }

  openEditMode = (editUrl) => {
    window.location = editUrl;
  }

  //----------------------FILE UPLOAD-----------------------------

  getAttachedFileList = () => {

    const FTPGetAttachmentsUrl = APIURLS.APIURL.FTPFILELIST;
    const headers = {
      "Content-Type": "application/json",
    };
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append("CompanyId", parseInt(this.state.compID));
    formData.append("BranchID", parseInt(this.state.BranchID));
    formData.append("Transaction", APIURLS.TrasactionType.GIT);
    formData.append("TransactionNo", parseInt(this.state.item.GITID));
    formData.append("FileData", "");
    axios
      .post(FTPGetAttachmentsUrl, formData, { headers })
      .then((response) => {
        this.setState({
          filelist: response.data
        });

      })
      .catch((error) => {
        console.log("error > ", error);
      });

  }

  processUpload = (e) => {
    this.setState({ ShowLoader: true });
    let file = e.target.files[0];
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', parseInt(this.state.compID));
    formData.append('BranchID', parseInt(this.state.BranchID));
    formData.append("Transaction", APIURLS.TrasactionType.GIT);
    formData.append("TransactionNo", parseInt(this.state.item.GITID));
    formData.append('FileData', file);

    const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(FTPUploadUrl, formData, { headers })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          this.getAttachedFileList();
        }
        if (response.status === 403) {
          this.setState({ ErrorPrompt: true, ShowLoader: false });
        }

      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ ErrorPrompt: true, ShowLoader: false });

      });

  }

  downloadThisFile = (e, item) => {

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.FileDownload;
    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', parseInt(this.state.compID));
    formData.append('BranchID', parseInt(this.state.BranchID));
    formData.append("Transaction", APIURLS.TrasactionType.GIT);
    formData.append("TransactionNo", parseInt(this.state.item.GITID));
    formData.append('FileName', item.fileName);

    axios({
      method: 'post',
      url: Url,
      responseType: 'blob',
      data: formData
    })
      .then(function (response) {

        const url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", item.fileName);
        document.body.appendChild(link);
        console.log("link > ", link);
        link.click();
      });
  }

  handleDelete = (e, item) => {
    let Dialog = this.state.CustomDialog;
    Dialog.open = true;
    let DeleteAttachment = this.state.DeleteAttachment;
    DeleteAttachment.e = e;
    DeleteAttachment.item = item;
    this.setState({
      DeleteAttachment: DeleteAttachment,
      CustomDialog: Dialog
    });
  }

  processDelete = () => {
    let e = this.state.DeleteAttachment.e;
    let item = this.state.DeleteAttachment.item;

    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.DELETEFTPFILE;

    const formData = new FormData();
    formData.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    formData.append('Token', getCookie(COOKIE.TOKEN));
    formData.append('CompanyId', parseInt(this.state.compID));
    formData.append('BranchID', parseInt(this.state.BranchID));
    formData.append("Transaction", APIURLS.TrasactionType.GIT);
    formData.append("TransactionNo", parseInt(this.state.item.GITID));
    formData.append('FileName', item.fileName);


    axios
      .post(Url, formData, { headers })
      .then((response) => {
        if (response.status === 200) {
          this.getAttachedFileList();
          this.closeDialog();
        }
      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ filelist: [] });
      });
  }

  closeDialog = () => {
    let Dialog = this.state.CustomDialog;
    Dialog.open = false;
    this.setState({ CustomDialog: Dialog });
  }

  //--------------------------------------------------------------

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

      if (val === "accordion6") {
        this.state.accordion6 === true
          ? this.setState({ accordion6: false })
          : this.setState({ accordion6: true });
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
      this.setState({ ProgressLoader: false, ErrorMessageProps: "" });
      console.log("Adding new");
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };

      let validateMRNData = true;

      validateMRNData = this.validateMRNData();

      if (validateMRNData === true) {

        let Status = 2;
        let MRNLineList = [];
        let MRNLotDetailsList = [];
        let PurchaseOrderLine = this.state.PurchaseOrderLine;
        for (let i = 0; i < PurchaseOrderLine.length; i++) {

          if (PurchaseOrderLine[i].isDataProper === true) {

            // if (parseFloat(Status) === 3) {
            //   if (parseFloat(PurchaseOrderLine[i].MRNQuantity) < parseFloat(PurchaseOrderLine[i].Quantity)) {
            //     Status = 4;
            //   }
            // }

            let obj = {
              Type: PurchaseOrderLine[i].Type,
              LNo: (i + 1),
              TypeID: PurchaseOrderLine[i].TypeID,
              SupplierCode: (PurchaseOrderLine[i].SupplierCode === "" || PurchaseOrderLine[i].SupplierCode === null) ? "" : PurchaseOrderLine[i].SupplierCode,
              Narration: (PurchaseOrderLine[i].Narration === "" || PurchaseOrderLine[i].Narration === null) ? "" : PurchaseOrderLine[i].Narration,
              UOMID: PurchaseOrderLine[i]['UOMID'],
              TolerancePercentage: PurchaseOrderLine[i].TolerancePercentage,
              POQuantity: PurchaseOrderLine[i].Quantity,
              GITQuantity: PurchaseOrderLine[i].MRNQuantity,
              Price: PurchaseOrderLine[i].Price,
              LineDiscPercentage: PurchaseOrderLine[i].LineDiscPercentage,
              ItemPostingGroupID: PurchaseOrderLine[i].ItemPostingGroupID,
              VATPercentage: PurchaseOrderLine[i].VATPercentage,
              HSNCode: PurchaseOrderLine[i].HSNCode,
              GSTGroupID: PurchaseOrderLine[i].GSTGroupID,
              GSTPercentage: PurchaseOrderLine[i].GSTPercentage,
              DValueID: PurchaseOrderLine[i].DValueID,
              IsQuality: PurchaseOrderLine[i].IsQuality,
              IsLot: PurchaseOrderLine[i].IsLot,

            };
            MRNLineList.push(obj);
            if (PurchaseOrderLine[i].LotDetails) {
              let LotDetails = PurchaseOrderLine[i].LotDetails;
              for (let j = 0; j < LotDetails.length; j++) {
                let obj = LotDetails[j];
                obj.LNo = j + 1;
                MRNLotDetailsList.push(obj);
              }
            }

            // Array.prototype.push.apply(MRNLotDetailsList, LotDetails);

          } else {
            this.setState({ ErrorPrompt: true, ErrorMessageProps: "Improper Line Data Found.", ProgressLoader: true });
            return false;
          }

        }

        console.log("MRNLotDetailsList > ", MRNLotDetailsList);

        let ContainerInfo = this.state.ContainerInfo;
        let newContainerInfo = [];
        for (let i = 0; i < ContainerInfo.length; i++) {
          let obj = {
            ID: 0,
            LNo: i + 1,
            Type: ContainerInfo[i].ContainerType,
            ContainerNo: ContainerInfo[i].ContainerNo,
            Remarks: ContainerInfo[i].Remarks
          };
          newContainerInfo.push(obj);
        }

        let MRN = {
          GITID: 0,
          No: "",
          POID: this.state.PO.POID,
          BranchID: this.state.PO.BranchID,
          GITDate: moment(this.state.MRN.MRNDate).format("MM/DD/YYYY"),
          SuplID: this.state.PO.SuplID,
          POType: this.state.PO.POType,
          BillingID: this.state.PO.BillingID,
          Name: this.state.PO.Name,
          Address: this.state.PO.Address,
          Address2: this.state.PO.Address2,
          Address3: this.state.PO.Address3,
          City: this.state.PO.City,
          PostCode: this.state.PO.PostCode,
          CountryID: this.state.PO.CountryID,
          StateID: this.state.PO.StateID,
          IsImport: this.state.PO.IsImport,
          CurrID: this.state.PO.CurrID,
          ExchRate: parseFloat(this.state.PO.ExchRate),
          FCValue: parseFloat(this.state.PO.FCValue),
          BaseValue: parseFloat(this.state.PO.BaseValue),
          PaymentTermID: this.state.PO.PaymentTermID,
          PaymentTerm: this.state.PO.PaymentTerm,
          Status: parseInt(Status),
          WareHouseID: this.state.PO.WareHouseID,
          MODTaxID: this.state.PO.MODTaxID,
          IsRegistedSupplier: this.state.PO.IsRegistedSupplier,
          GSTNo: this.state.PO.GSTNo,
          VATNo: this.state.PO.VATNo,
          IsRounding: this.state.PO.IsRounding,
          IncoID: this.state.PO.IncoID,
          ShipmentModeID: this.state.PO.ShipmentModeID,
          Notes: this.state.PO.Notes,
          IsSEZPurchase: this.state.PO.IsSEZPurchase,
          IsTaxExempt: this.state.PO.IsTaxExempt,
          Reason: this.state.PO.Reason,
          GeneralPostingGroupID: this.state.PO.GeneralPostingGroupID,
          SupplierPostingGroupID: this.state.PO.SupplierPostingGroupID,
          SuplInvNo: this.state.MRN.SuplInvNo,
          SuplInvDate: moment(this.state.MRN.SuplInvDate).format("MM/DD/YYYY"),
          DueDate: moment(this.state.MRN.DueDate).format("MM/DD/YYYY"),
          PayToSuplID: this.state.MRN.PayToSuplID,
          EWayBillNo: this.state.MRN.EWayBillNo,
          DutyFogone: this.state.MRN.DutyFogone,
          DutyPaid: this.state.MRN.DutyPaid,
          GSTOrVATPaid: this.state.MRN.GSTOrVATPaid,
          AssableValue: this.state.MRN.AssableValue,
          BillOfEntryNo: this.state.MRN.BillOfEntryNo,
          BillOfEntryDate: moment(this.state.MRN.BillOfEntryDate).format("MM/DD/YYYY") === "Invalid date" ? today : moment(this.state.MRN.BillOfEntryDate).format("MM/DD/YYYY"),
          BillOfEntryValue: this.state.MRN.BillOfEntryValue,
          BLOrAWBNo: this.state.MRN.BLOrAWBNo,
          BLOrAWBDate: moment(this.state.MRN.BLOrAWBDate).format("MM/DD/YYYY") === "Invalid date" ? today : moment(this.state.MRN.BLOrAWBDate).format("MM/DD/YYYY"),
          PortID: this.state.MRN.PortID,

          GateEntryNo: this.state.MRN.GateEntryNo,
          GateEntryDate: moment(this.state.MRN.GateEntryDate).format("MM/DD/YYYY") === "Invalid date" ? today : moment(this.state.MRN.GateEntryDate).format("MM/DD/YYYY"),
          Remarks: this.state.PO.Notes,
          UserID: CF.toInt(getCookie(COOKIE.USERID)),
        };

        if (MRNLotDetailsList.length === 0) {
          let lotobj = {
            LotID: 0,
            TypeID: 0,
            LNo: 0,
            LotNo: "",
            Quantity: 0,
            PackingUOM: 0,
            Location: ""
          };
          MRNLotDetailsList.push(lotobj);
        }
        if (newContainerInfo.length === 0) {
          let contobj = {
            ID: 0,
            LNo: 0,
            ContainerType: 0,
            ContainerNo: "",
            Remarks: ""
          };
          newContainerInfo.push(contobj);
        }



        let NoSeriesReqData = {
          ValidUser: ValidUser,
          DocumentNumber: {
            NoSeriesID: CF.toInt(this.state.Branch.GITNo),
            TransDate: moment().format("MM-DD-YYYY"),
          },
        };
        console.log("AddNew > NoSeriesReqData > ", NoSeriesReqData);


        let Url1 = APIURLS.APIURL.GetMasterDocumentNumber;
        axios
          .post(Url1, NoSeriesReqData, { headers })
          .then((response) => {
            if (response.status === 200) {
              MRN.No = response.data;
              let reqData = {
                ValidUser: ValidUser,
                GIT: MRN,
                GITLineList: MRNLineList,
                GITLotDetailsList: MRNLotDetailsList,
                GITContainerInfoList: newContainerInfo
              };
              console.log("AddNew > reqData > ", reqData);
              let Url2 = APIURLS.APIURL.Add_Update_GIT;
              axios
                .post(Url2, reqData, { headers })
                .then((response) => {
                  console.log("response > ", response);
                  if (response.status === 201 || response.status === 200) {
                    this.setState({ SuccessPrompt: true, ProgressLoader: true });
                    // let editUrl =
                    //   URLS.URLS.editMRN +
                    //   this.state.urlparams +
                    //   "&editMRNID=" +
                    //   response.data.ID + "&type=edit";
                    // this.openEditMode(editUrl);
                  } else {
                    this.setState({ ErrorPrompt: true, ProgressLoader: true, ErrorMessageProps: "", });
                  }
                })
                .catch((error) => {
                  console.log("Main API Error");
                  this.setState({ ErrorPrompt: true, ProgressLoader: true, ErrorMessageProps: "GIT Not saved", });
                });

            } else {
              this.setState({ ErrorPrompt: true, ProgressLoader: true, ErrorMessageProps: "No. Series Not fetched.", });
            }


          })
          .catch((error) => {
            console.log("No series Error");
            this.setState({ ErrorPrompt: true, ProgressLoader: true, ErrorMessageProps: "No. Series Not defined.", });
          });



      } else {
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Invalid GIT Data", ProgressLoader: true });
        return false;
      }

    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.git + this.state.urlparams}
          masterLinkTitle="GIT"
          typoTitle={"Add"}
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

          <Button
            startIcon={APIURLS.buttonTitle.save.icon}
            className="action-btns"
            onClick={(e) => AddNew(e)}

          >
            {APIURLS.buttonTitle.save.name}
          </Button>

        </ButtonGroup>
      </Fragment>
    );

    const dialog = (
      <Fragment>

      </Fragment>
    );

    const tab1Html = (
      <Fragment>
        <div className="sidenav-fixedheight-scroll">
          <Grid container spacing={0}>

            <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
              <TableContainer>
                <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                  <TableBody className="tableBody">
                    <TableRow>
                      <TableCell align="left" className="no-border-table">PO No.</TableCell>
                      <TableCell align="right" className="no-border-table"> {this.state.PO.No}</TableCell>
                    </TableRow>

                    <TableRow>
                      <TableCell align="left" className="no-border-table">PO Date.</TableCell>
                      <TableCell align="right" className="no-border-table">{moment(this.state.PO.PODate).format("MM/DD/YYYY")}</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell align="left" className="no-border-table">Supplier Name</TableCell>
                      <TableCell align="right" className="no-border-table">{this.state.PO.SupplierName}</TableCell>
                    </TableRow>


                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
              <div style={{ height: 20 }}></div>
            </Grid>
          </Grid>
          <Grid container spacing={0} style={{ marginLeft: 15 }}>
            <Grid item xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
              <Grid container spacing={1} >
                <Grid item xs={12} sm={12} md={3} lg={3}  >
                  <div key="paymentPendingLink" to="#" className="card-link">
                    <Card className="dash-activity-card2" raised={false}>
                      <CardContent>
                        <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                          FC Value
                        </Typography>
                        <Typography >
                          {this.state.PO.FCValue ? this.state.PO.FCValue : null}
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
                          Base Value
                        </Typography>
                        <Typography>
                          {this.state.PO.BaseValue ? this.state.PO.BaseValue : null}
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
                          Exch Rate
                        </Typography>
                        <Typography>
                          {this.state.PO.ExchRate ? this.state.PO.ExchRate : null}
                        </Typography>
                      </CardContent>
                    </Card>
                  </div>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
              <div style={{ height: 20 }}></div>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );

    const tab2Html = (
      <Fragment>
        <div className="sidenav-fixedheight-scroll">
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: "#fff" }} >
              <TableContainer>
                <Table stickyHeader size="small" className="" aria-label="Attachment Form table">
                  <TableRow>
                    <TableCell className="no-border-table">
                      <Button
                        disabled={this.state.PO.Status === 0 ? false : true}
                        className="action-btns"
                        startIcon={<AttachFileIcon />}
                        onClick={(e) => { document.getElementById("uploadInput").click() }}
                      >
                        Attach File
                      </Button>
                      <input
                        className="file-upload-input"
                        id="uploadInput"
                        type="file"
                        onChange={(e) => this.processUpload(e)}
                      />

                    </TableCell>
                  </TableRow>
                </Table>
              </TableContainer>
            </Grid>
          </Grid>
          <Grid container spacing={0}>

            <Grid xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: "#fff" }} >
              <Table size="small">
                <TableBody className="tableBody">
                  {this.state.filelist.map((item, i) => (
                    <TableRow id={"fileRow_" + item.fileName}>
                      <TableCell align="left" className="no-border-table">
                        <span className="avatar-hover" onClick={(e) => this.downloadThisFile(e, item)}> {item.fileName} </span> <br />
                        <span style={{ color: '#b0bec5' }}>{"Uploaded on " + item.modifiedDateTime}</span>
                      </TableCell>
                      <TableCell align="left" className="no-border-table">
                        <IconButton size="small" edge="end" aria-label="delete">
                          <DeleteIcon
                            role={item} fontSize="small" style={{ color: '#f44336' }}
                            onClick={this.state.PO.Status === 0 ? (e) => this.handleDelete(e, item) : null}

                          />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

            </Grid>
          </Grid>

        </div>
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

        <DialogCustom
          MessageHeader="Delete Attachment!"
          MessageText="Do you want to delete this attachment?"
          open={this.state.CustomDialog.open}
          onClose={(e) => this.closeDialog()}
          onOK={(e) => this.processDelete()}
        />


        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
          ErrorMessageProps={this.state.ErrorMessageProps}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <TopFixedRow3
          breadcrumb={breadcrumbHtml}
          buttongroup={buttongroupHtml}
        />





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
                                    id="MRNNo"
                                    label="No"
                                    variant="outlined"
                                    size="small"
                                    value={null}
                                    disabled={true}
                                  />



                                  <SADIB
                                    id="SuplID"
                                    label="Supplier"
                                    onChange={(e, value) => this.updateFormValue("SuplID", value)}
                                    value={this.state.SADIB_VALUE}
                                    options={this.state.supplierList}
                                    isMandatory={true}
                                    disabled={true}
                                  />

                                  <SDIB
                                    id="BillingID"
                                    label="Billing"
                                    onChange={(e) => this.updateFormValue("BillingID", e)}
                                    value={this.state.PO.BillingID}
                                    param={this.state.SupplierAdressList}
                                    isMandatory={true}
                                    disabled={true}
                                  />

                                  <SIB
                                    id="Name"
                                    label="Name"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.Name}
                                    disabled={true}
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
                                    id="MRNDate"
                                    label="GIT Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("MRNDate", e)
                                    }
                                    value={this.state.MRN.MRNDate}
                                  />

                                  <SIB
                                    id="No"
                                    label="PO No"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.No}
                                    disabled={true}
                                  />

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
                                    disabled={true}
                                  />
                                  <SDIB
                                    id="POType"
                                    label="PO Type"
                                    onChange={(e) => this.updateFormValue("POType", e)}
                                    value={this.state.PO.POType}
                                    param={this.state.POTypeList}
                                    isMandatory={true}
                                    disabled={true}
                                  />

                                  <SIB
                                    isMandatory={true}
                                    id="SuplInvNo"
                                    label="Supplier Invoice No."
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.SuplInvNo}
                                    onChange={(e) =>
                                      this.updateFormValue("SuplInvNo", e)
                                    }
                                  />

                                  <SDTI
                                    isMandatory={true}
                                    id="SuplInvDate"
                                    label="Supplier Invoice Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("SuplInvDate", e)
                                    }
                                    value={this.state.MRN.SuplInvDate}
                                  />

                                  <SDTI
                                    isMandatory={true}
                                    id="DueDate"
                                    label="Due Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("DueDate", e)
                                    }
                                    value={this.state.MRN.DueDate}
                                  />


                                  <SIB
                                    id="GateEntryNo"
                                    label="Gate Entry No."
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.GateEntryNo}
                                    onChange={(e) =>
                                      this.updateFormValue("GateEntryNo", e)
                                    }
                                  />


                                  <SDTI
                                    isMandatory={true}
                                    id="GateEntryDate"
                                    label="Gate Entry Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("GateEntryDate", e)
                                    }
                                    value={this.state.MRN.GateEntryDate}
                                  />


                                  <SDIB
                                    id="PortID"
                                    label="Entry Port"
                                    value={this.state.MRN.PortID}
                                    param={this.state.PortList}
                                    onChange={(e) =>
                                      this.updateFormValue("PortID", e)
                                    }
                                  />



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
                          <div style={{ marginRight: 20 }}>
                            <Table
                              stickyHeader
                              size="small"
                              className=""
                              aria-label="Lines List table"
                            >
                              <TableHead className="table-header-background">
                                <TableRow>
                                  <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="left">&nbsp;</TableCell>
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Type</TableCell>
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Category</TableCell>
                                  <TableCell style={{ maxWidth: 250, minWidth: 250 }} className="line-table-header-font" align="left">Item</TableCell>

                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="left">Desc</TableCell>
                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="left">Pack.Desc</TableCell>
                                  <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="left">Sup.Code</TableCell>
                                  <TableCell style={{ maxWidth: 250, minWidth: 250 }} className="line-table-header-font" align="left">Narration</TableCell>
                                  <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="left">UOM</TableCell>
                                  <TableCell style={{ maxWidth: 120, minWidth: 120 }} className="line-table-header-font" align="right">Tolerance %</TableCell>
                                  <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="right">PO Quantity </TableCell>
                                  <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="right">GIT Quantity </TableCell>
                                  <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="right">Unit Price </TableCell>
                                  <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="right">Disc %</TableCell>
                                  {/* <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center"> Line Disc Amount</TableCell> */}
                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="left">Item Posting Group </TableCell>

                                  <TableCell style={{ maxWidth: 120, minWidth: 120 }} className="line-table-header-font" align="left">HSN </TableCell>
                                  {this.state.Branch.IsVAT === true ? (
                                    <Fragment>
                                      <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="right">VAT % </TableCell>
                                      {/* <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">VAT Amount </TableCell> */}
                                    </Fragment>
                                  ) : null}

                                  {
                                    this.state.Branch.IsGST === true ? (
                                      <Fragment>
                                        <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">GST Group </TableCell>
                                        <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="right"> GST %</TableCell>
                                      </Fragment>
                                    ) : null
                                  }

                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Dim.Value </TableCell>

                                  {this.state.Branch.IsQuality === true ? (
                                    <TableCell style={{ maxWidth: 120, minWidth: 120 }} className="line-table-header-font" align="left">Is Quality? </TableCell>
                                  ) : null}


                                  {this.state.Branch.IsLot === true ? (
                                    <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="left">Is Lot? </TableCell>
                                  ) : null}

                                </TableRow>
                              </TableHead>
                              <TableBody className="tableBody">



                                {console.log("this.state.PurchaseOrderLine > ", this.state.PurchaseOrderLine)}
                                {this.state.PurchaseOrderLine.length > 0 ? (
                                  <Fragment>
                                    {this.state.PurchaseOrderLine.map((item, i) => (
                                      <TableRow className={item.isDataProper === true ? "lineSelectedRow" : "selectedRowError"}>
                                        <TableCell align="left" >
                                          <ButtonGroup
                                            size="small"
                                            variant="text"
                                            aria-label="Action Menu Button group"
                                          >
                                            <Fragment>
                                              <Tooltip title="Delete Line">
                                                <DeleteForeverIcon
                                                  fontSize="small"
                                                  style={{
                                                    color: '#e53935'
                                                  }}
                                                  onClick={(e) => this.itemDelete(i, item)}
                                                />
                                              </Tooltip>
                                            </Fragment>


                                            {item.IsLot === true ? (
                                              <Fragment>
                                                <Tooltip title="Add Lot">
                                                  <ListAltIcon
                                                    fontSize="small"
                                                    style={{
                                                      color: '#2196f3',
                                                      marginLeft: 10
                                                    }}
                                                    onClick={(e) => this.openDialog(item)}
                                                  />
                                                </Tooltip>
                                              </Fragment>
                                            ) : null}



                                            {
                                              (i + 1) === this.state.PurchaseOrderLine.length ? (
                                                <Fragment>
                                                  <Tooltip title="Add New Line">
                                                    <AddCircleOutlineIcon
                                                      fontSize="small"
                                                      style={{
                                                        color: '#00897b',
                                                        marginLeft: 10
                                                      }}
                                                      onClick={(e) => this.createNewBlankLine()}
                                                    />
                                                  </Tooltip>
                                                </Fragment>
                                              ) : null
                                            }



                                          </ButtonGroup>
                                        </TableCell>
                                        <TableCell align="left">
                                          <select
                                            id={"Type_" + i}
                                            style={{ width: '100%' }}
                                            className="line-dropdown-css"
                                            value={item.Type}
                                            onChange={(e) => this.updateLineDetail(i, "Type", e)}
                                            disabled={item.Type === 0 ? true : false}
                                          >
                                            <option value="" >Select</option>
                                            {APIURLS.POItemType.map((op, i) => (
                                              <option value={op.value} disabled={CF.toInt(op.value) < 3 ? true : false} > {op.name}</option>

                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell align="left">
                                          {console.log("this.state.PurchaseOrderLine > ", this.state.PurchaseOrderLine)}
                                          <select
                                            // style={{backgroundColor:'#e0f2f1'}}
                                            id={"Category_" + i}
                                            style={{ width: '100%' }}
                                            className="line-dropdown-css"
                                            value={item.CategoryId}
                                            onChange={(e) => this.updateLineDetail(i, "CategoryId", e)}
                                            // disabled={item.isCategoryDisabled}
                                            disabled={true}
                                          >
                                            <option value="" >Select</option>
                                            {item.CategoryList.map((op, i) => (
                                              <option value={op.value} > {op.name}</option>
                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell align="left">
                                          <SCADI

                                            style={{ width: '100%' }}
                                            id={"TypeID_" + i}
                                            onChange={(e, value) => this.updateLineDetail(i, "TypeID", value)}
                                            value={item.ItemListSelected}
                                            options={item.ItemList}
                                            isMandatory={true}
                                          />
                                        </TableCell>
                                        <TableCell align="left">
                                          {item.Description}
                                        </TableCell>
                                        <TableCell align="left">
                                          {item.packingDescription}
                                        </TableCell>

                                        <TableCell align="left">
                                          <SCI
                                            id={"SupplierCode_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.SupplierCode}
                                            onChange={(e) => this.updateLineDetail(i, "SupplierCode", e)}
                                            disabled={true}
                                          />
                                        </TableCell>
                                        <TableCell align="left">
                                          <SCI
                                            id={"Naration_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.Narration}
                                            onChange={(e) => this.updateLineDetail(i, "Narration", e)}
                                            disabled={true}
                                          />
                                        </TableCell>
                                        <TableCell align="left">

                                          <select
                                            style={{ width: '100%' }}
                                            className="line-dropdown-css"
                                            value={item.UOMID}
                                            onChange={(e) => this.updateLineDetail(i, "UOMID", e)}
                                          >
                                            <option value=""> Select</option>
                                            {this.state.UOMList.map((op, i) => (
                                              <option value={op.value}> {op.name}</option>
                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell align="right">
                                          <SCI
                                            id={"TolerancePercentage_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.TolerancePercentage}
                                            onChange={(e) => this.updateLineDetail(i, "TolerancePercentage", e)}
                                            align="right"
                                            disabled={true}
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          <SCI
                                            id={"Quantity_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.Quantity}
                                            onChange={(e) => this.updateLineDetail(i, "Quantity", e)}
                                            align="right"
                                            disabled={true}
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          <SCI
                                            id={"MRNQuantity_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.MRNQuantity}
                                            onChange={(e) => this.updateLineDetail(i, "MRNQuantity", e)}
                                            align="right"
                                            disabled={item.LotDetails ? item.LotDetails.length > 0 ? true : false : false}
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          <SCI
                                            id={"Price_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.Price}
                                            onChange={(e) => this.updateLineDetail(i, "Price", e)}
                                            disabled={item.Type === 0 ? true : false}
                                            align="right"
                                          />
                                        </TableCell>
                                        <TableCell align="right">
                                          <SCI
                                            id={"LineDiscPercentage_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.LineDiscPercentage}
                                            onChange={(e) => this.updateLineDetail(i, "LineDiscPercentage", e)}
                                            align="right"
                                          />
                                        </TableCell>
                                        {/* <TableCell align="center">
                                          <SCI
                                            id={"LineDiscAmount_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.LineDiscAmount}
                                            onChange={(e) => this.updateLineDetail(i, "LineDiscAmount", e)}
                                            disabled={true}
                                          />
                                        </TableCell> */}
                                        <TableCell align="left">
                                          <select
                                            style={{ width: '100%' }}
                                            className="line-dropdown-css"
                                            value={item.ItemPostingGroupID}
                                            onChange={(e) => this.updateLineDetail(i, "ItemPostingGroupID", e)}
                                            disabled={true}
                                          >
                                            <option value="0"> Select</option>
                                            {this.state.ItemPostingGroupList.map((op, i) => (
                                              <option value={op.value}> {op.name}</option>
                                            ))}
                                          </select>
                                        </TableCell>

                                        <TableCell align="left">
                                          <SCI
                                            id={"HSNCode_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.HSNCode}
                                            onChange={(e) => this.updateLineDetail(i, "HSNCode", e)}

                                          />
                                        </TableCell>

                                        {this.state.Branch.IsVAT === true ? (
                                          <Fragment>
                                            <TableCell align="right">
                                              <SCI
                                                id={"VATPercentage_" + i}
                                                variant="outlined"
                                                size="small"
                                                value={item.VATPercentage}
                                                onChange={(e) => this.updateLineDetail(i, "VATPercentage", e)}
                                                disabled={true}
                                                align="right"
                                              />
                                            </TableCell>
                                            {/* <TableCell align="center">
                                              <SCI
                                                id={"VATAmount_" + i}
                                                variant="outlined"
                                                size="small"
                                                value={item.VATAmount}
                                                onChange={(e) => this.updateLineDetail(i, "VATAmount", e)}
                                                disabled={true}
                                              />
                                            </TableCell> */}
                                          </Fragment>
                                        ) : null}




                                        {
                                          this.state.Branch.IsGST === true ? (
                                            <Fragment>
                                              <TableCell align="left">
                                                <select
                                                  style={{ width: '100%' }}
                                                  className="line-dropdown-css"
                                                  value={item.GSTGroupID}
                                                  onChange={(e) => this.updateLineDetail(i, "GSTGroupID", e)}
                                                >
                                                  <option value=""> Select</option>
                                                  {this.state.GSTGroupIDList.map((op, i) => (
                                                    <option value={op.value}> {op.name}</option>
                                                  ))}
                                                </select>
                                              </TableCell>
                                              <TableCell align="right">
                                                <SCI
                                                  id={"GSTPercentage_" + i}
                                                  variant="outlined"
                                                  size="small"
                                                  value={item.GSTPercentage}
                                                  onChange={(e) => this.updateLineDetail(i, "GSTPercentage", e)}
                                                  disabled={true}
                                                  align="right"
                                                />
                                              </TableCell>
                                            </Fragment>
                                          ) : null
                                        }




                                        <TableCell align="left">
                                          <select
                                            style={{ width: '100%' }}
                                            className="line-dropdown-css"
                                            value={item.DValueID}
                                            onChange={(e) => this.updateLineDetail(i, "DValueID", e)}
                                          >
                                            <option value="0">Select</option>
                                            {this.state.DimensionsList.map((op, i) => (
                                              <option value={op.value}> {op.name}</option>
                                            ))}
                                          </select>
                                        </TableCell>
                                        {this.state.Branch.IsQuality === true ? (
                                          <TableCell align="left">
                                            <SCSI
                                              key={"IsQuality_+i"}
                                              id={"IsQuality_+i"}
                                              param={item.IsQuality}
                                              onChange={(e) => this.updateLineDetail(i, "IsQuality", e)}

                                            />
                                          </TableCell>
                                        ) : null}

                                        {this.state.Branch.IsLot === true ? (
                                          <TableCell align="left">
                                            <SCSI
                                              key={"IsLot_+i"}
                                              id={"IsLot_+i"}
                                              param={item.IsLot}
                                              onChange={(e) => this.updateLineDetail(i, "IsLot", e)}

                                            />
                                          </TableCell>
                                        ) : null}



                                      </TableRow>
                                    ))}
                                  </Fragment>
                                ) : (
                                  <Fragment>
                                    <TableRow>
                                      <TableCell style={{ borderBottomStyle: 'none' }} colSpan={2} align="center">
                                        <span style={{ color: '#1976d2' }}>Press <b>SHIFT+ENTER</b> to start...</span>
                                      </TableCell>
                                    </TableRow>
                                  </Fragment>
                                )}

                              </TableBody>

                            </Table>
                          </div>
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
                    >Invoice</Typography>
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
                                    isMandatory={true}

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

                                  <SDIB
                                    id="PayToSuplID"
                                    label="Pay To Supllier"
                                    value={this.state.MRN.PayToSuplID}
                                    param={this.state.PayToSuplList}
                                    onChange={(e) =>
                                      this.updateFormValue("PayToSuplID", e)
                                    }
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
                                {
                                  this.state.CurrencyList.map((item, i) => (
                                    this.state.PO.CurrID === item.value ? (
                                      <Fragment>
                                        <SSDV

                                          label={"Amount" + "(" + item.name + ")"}
                                          value={this.state.Amount}
                                        />
                                      </Fragment>
                                    )
                                      : null
                                  ))
                                }
                                <SSDV
                                  label="Discount Amount"
                                  value={this.getCurrencyString(this.state.DiscountAmount)}
                                />
                                {
                                  this.state.CurrencyList.map((item, i) => (
                                    this.state.PO.CurrID === item.value ? (
                                      <Fragment>
                                        <SSDV
                                          label={"Total " + (this.state.Branch.IsGST === true ? "GST" : "VAT") + "(" + item.name + ")"}
                                          value={this.state.TotalTax}
                                        />
                                      </Fragment>
                                    )
                                      : null
                                  ))
                                }
                              </Grid>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <Grid item xs={12} sm={12} md={11} lg={11}>
                                {
                                  this.state.CurrencyList.map((item, i) => (
                                    this.state.PO.CurrID === item.value ? (
                                      <Fragment>
                                        <SSDV
                                          label={"Total FC.Value " + "(" + item.name + ")"}
                                          value={this.state.PO.FCValue}
                                        />
                                      </Fragment>
                                    )
                                      : null
                                  ))
                                }
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
                                    disabled={true}

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
                                  <SIB
                                    id="BillOfEntryValue"
                                    label="Bill Of Entry Value"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.BillOfEntryValue}
                                    onChange={(e) =>
                                      this.updateFormValue("BillOfEntryValue", e)
                                    }
                                  />
                                  <SIB
                                    id="BillOfEntryNo"
                                    label="Bill Of Entry No."
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.BillOfEntryNo}
                                    onChange={(e) =>
                                      this.updateFormValue("BillOfEntryNo", e)
                                    }
                                  />
                                  <SDTI

                                    id="BillOfEntryDate"
                                    label="Bill Of Entry Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("BillOfEntryDate", e)
                                    }
                                    value={this.state.MRN.BillOfEntryDate}
                                  />
                                  <SIB
                                    id="BLOrAWBNo"
                                    label="BL/AWB No."
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.BLOrAWBNo}
                                    onChange={(e) =>
                                      this.updateFormValue("BLOrAWBNo", e)
                                    }
                                  />
                                  <SDTI

                                    id="BLOrAWBDate"
                                    label="BL/AWB Date"
                                    variant="outlined"
                                    size="small"
                                    onChange={(e) =>
                                      this.updateFormValue("BLOrAWBDate", e)
                                    }
                                    value={this.state.MRN.BLOrAWBDate}
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
                                    disabled={true}
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
                                  <SIB
                                    id="EWayBillNo"
                                    label="EWay Bill No."
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.EWayBillNo}
                                    onChange={(e) =>
                                      this.updateFormValue("EWayBillNo", e)
                                    }
                                  />

                                  <SIB
                                    id="DutyFogone"
                                    label="DutyFogone"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.DutyFogone}
                                    onChange={(e) =>
                                      this.updateFormValue("DutyFogone", e)
                                    }
                                  />
                                  <SIB
                                    id="DutyPaid"
                                    label="DutyPaid"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.DutyPaid}
                                    onChange={(e) =>
                                      this.updateFormValue("DutyPaid", e)
                                    }
                                  />


                                  <SIB
                                    id="GSTOrVATPaid"
                                    label="GSTOrVATPaid"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.GSTOrVATPaid}
                                    onChange={(e) =>
                                      this.updateFormValue("GSTOrVATPaid", e)
                                    }
                                  />
                                  <SIB
                                    id="AssableValue"
                                    label="AssableValue"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.MRN.AssableValue}
                                    onChange={(e) =>
                                      this.updateFormValue("AssableValue", e)
                                    }
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
                  key="a-6"
                  expanded={this.state.accordion6}
                  className="accordionD"
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("accordion6", e)} />}
                    aria-controls="panel1a-content"
                    id="accordion6"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) => handleAccordionClick("accordion6", e)}
                  >
                    <Typography
                      key="Tax-Activity"
                      className="accordion-Header-Title"
                    >Container Info</Typography>
                  </AccordionSummary>
                  <AccordionDetails
                    key="accordion6" className="AccordionDetails-css">
                    <Fragment>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={6} lg={6}>
                              <ButtonGroup
                                size="small"
                                variant="text"
                                aria-label="Action Menu Button group"
                              >


                                <Button
                                  startIcon={APIURLS.buttonTitle.clear.icon}
                                  className="action-btns"
                                  onClick={(e) => this.clearContainerDetails()}
                                >
                                  {APIURLS.buttonTitle.clear.name}
                                </Button>



                                <Button
                                  className="action-btns"
                                  startIcon={<FileUploadIcon />}
                                  onClick={(e) => { document.getElementById("ContainerUploadInput").click() }}
                                >
                                  Attach File
                                </Button>
                                <input
                                  className="file-upload-input"
                                  id="ContainerUploadInput"
                                  type="file"
                                  onChange={(e) => this.importContainerFromExcel(e)}

                                />

                                <Button
                                  startIcon={APIURLS.buttonTitle.addline.icon}
                                  className="action-btns"
                                  onClick={(e) => this.AddContainerLine(this.state.ContainerInfo)}
                                >
                                  {APIURLS.buttonTitle.addline.name}
                                </Button>

                              </ButtonGroup>
                            </Grid>
                            <Grid item xs={12} sm={12} md={6} lg={6}>


                            </Grid>
                          </Grid>
                          <Grid container spacing={0}>
                            {/* <Grid item xs={1} sm={1} md={1} lg={1}></Grid> */}
                            <Grid item xs={10} sm={10} md={10} lg={10}>

                              <Table
                                stickyHeader
                                size="small"
                                className=""
                                aria-label="Lines List table"
                              >
                                <TableHead className="table-header-background">
                                  <TableRow>
                                    <TableCell style={{ maxWidth: 50, minWidth: 50 }} className="line-table-header-font" align="left">&nbsp;</TableCell>
                                    <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Container Type</TableCell>
                                    <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Container No.</TableCell>
                                    <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Remarks</TableCell>
                                  </TableRow>
                                </TableHead>
                                <TableBody className="tableBody">

                                  {this.state.ContainerInfo ? this.state.ContainerInfo.map((item, i) => (
                                    <TableRow>
                                      <TableCell align="left">
                                        <ButtonGroup
                                          size="small"
                                          variant="text"
                                          aria-label="Action Menu Button group"
                                        >
                                          <Fragment>
                                            <Tooltip title="Delete Line">
                                              <DeleteForeverIcon
                                                fontSize="small"
                                                style={{
                                                  color: '#e53935'
                                                }}
                                                onClick={(e) => this.ContainerItemDelete(i, item)}
                                              />
                                            </Tooltip>
                                          </Fragment>

                                        </ButtonGroup>
                                      </TableCell>
                                      <TableCell>
                                        <select
                                          id={"ContainerType_" + i}
                                          style={{ width: '100%' }}
                                          className="line-dropdown-css"
                                          value={item.ContainerType}
                                          onChange={(e) => this.updateContainerDetail("ContainerType", e, i)}
                                        >
                                          <option value="" >Select</option>
                                          {this.state.UOMList.map((op, i) => (
                                            <option value={op.value}> {op.name}</option>
                                          ))}
                                        </select>
                                      </TableCell>
                                      <TableCell align="left">

                                        <SCI
                                          id={"ContainerNo_" + i}
                                          variant="outlined"
                                          size="small"
                                          value={item.ContainerNo}
                                          onChange={(e) => this.updateContainerDetail("ContainerNo", e, i)}
                                        />
                                      </TableCell>

                                      <TableCell align="left">
                                        <SCI
                                          id={"Remarks_" + i}
                                          variant="outlined"
                                          size="small"
                                          value={item.Remarks}
                                          onChange={(e) => this.updateContainerDetail("Remarks", e, i)}
                                        />
                                      </TableCell>
                                    </TableRow>
                                  )) : null}

                                </TableBody>
                              </Table>

                            </Grid>
                            <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
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
                  <Grid xs={12} sm={12} md={1} lg={1}>
                    &nbsp;
                  </Grid>
                  <Grid xs={12} sm={12} md={11} lg={11}>
                    <Grid container spacing={0}>
                      <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: "#fff" }}>
                        <Grid container spacing={0}>
                          <Grid xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: "#fff" }}>
                            <Dualtabcomponent
                              tab1name="Details"
                              tab2name="Attachments"
                              tab1Html={tab1Html}
                              tab2Html={tab2Html}
                            />
                          </Grid>
                        </Grid>
                      </Grid>
                    </Grid>
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
          <DialogTitle id="alert-dialog-title" className="dialog-area">
            <span style={{ color: 'red' }}>Line Delete Request</span>
          </DialogTitle>
          <DialogContent className="dialog-area">
            <DialogContentText id="alert-dialog-description">
              {"Do you want to delete this Line ?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions className="dialog-area">
            <Button onClick={() => this.handleDialogClose()}>No</Button>
            <Button onClick={() => this.deleteSelectedItem()} >
              Yes
            </Button>
          </DialogActions>
        </Dialog>


        <Dialog

          fullWidth={true}
          maxWidth="md"
          open={this.state.Dialog.DialogStatus}
          aria-labelledby="PO-page-dialog-title"
          aria-describedby="PO-page-dialog"
          className="dialog-prompt-activity"
        >
          <DialogTitle
            id="dialog-title"
            className="dialog-area" >

            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={1} lg={1}>
                <IconButton
                  aria-label="ArrowBackIcon"
                >
                  <ArrowBackIcon onClick={(e) => this.handleClose()} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                {this.state.Dialog.DialogTitle}
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Action Menu Button group"
                >
                  <Button
                    startIcon={APIURLS.buttonTitle.save.icon}
                    className="action-btns"
                    onClick={(e) => this.SaveLotDetailsOfLine()}
                  >
                    {APIURLS.buttonTitle.save.name}
                  </Button>

                  <Button
                    startIcon={APIURLS.buttonTitle.clear.icon}
                    className="action-btns"
                    onClick={(e) => this.clearLotDetails()}
                  >
                    {APIURLS.buttonTitle.clear.name}
                  </Button>



                  <Button
                    className="action-btns"
                    startIcon={<FileUploadIcon />}
                    onClick={(e) => { document.getElementById("uploadInput").click() }}
                  >
                    Attach File
                  </Button>
                  <input
                    className="file-upload-input"
                    id="uploadInput"
                    type="file"
                    onChange={(e) => this.importLotFromExcel(e)}

                  />

                  <Button
                    startIcon={APIURLS.buttonTitle.addline.icon}
                    className="action-btns"
                    onClick={(e) => this.AddLotLine(this.state.SelectedLotItem)}
                  >
                    {APIURLS.buttonTitle.addline.name}
                  </Button>

                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                {this.state.SelectedLotItem.ItemListSelected ? (
                  <Fragment>
                    <table>
                      <tr>
                        <td><span className="themeFont" style={{ color: '#212121' }}>Item:</span></td>
                        <td>{this.state.SelectedLotItem.ItemListSelected.name}</td>
                        <td>&nbsp;</td>
                        <td>&nbsp;</td>
                        <td><span className="themeFont" style={{ color: '#212121' }}>MRN Quantity:</span></td>
                        <td>{this.state.SelectedLotItem.MRNQuantity}</td>
                      </tr>
                    </table>
                  </Fragment>
                ) : null}

              </Grid>
            </Grid>



            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>

                <Table
                  stickyHeader
                  size="small"
                  className=""
                  aria-label="Lines List table"
                >
                  <TableHead className="table-header-background">
                    <TableRow>
                      <TableCell style={{ maxWidth: 50, minWidth: 50 }} className="line-table-header-font" align="left">&nbsp;</TableCell>
                      <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Lot No.</TableCell>
                      <TableCell style={{ maxWidth: 100, minWidth: 100 }} className="line-table-header-font" align="left">Quantity</TableCell>
                      <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Packing UOM</TableCell>
                      <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="left">Location</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody className="tableBody">
                    {console.log("+++++++++++++ --------------------- > this.state.SelectedLotItem > ", this.state.SelectedLotItem)}
                    {this.state.SelectedLotItem['LotDetails'] ? this.state.SelectedLotItem['LotDetails'].map((item, i) => (
                      <TableRow>
                        <TableCell align="left">
                          <ButtonGroup
                            size="small"
                            variant="text"
                            aria-label="Action Menu Button group"
                          >
                            <Fragment>
                              <Tooltip title="Delete Line">
                                <DeleteForeverIcon
                                  fontSize="small"
                                  style={{
                                    color: '#e53935'
                                  }}
                                  onClick={(e) => this.LotItemDelete(i, item)}
                                />
                              </Tooltip>
                            </Fragment>

                          </ButtonGroup>
                        </TableCell>
                        <TableCell align="left">
                          <SCI
                            id={"LotNo_" + i}
                            variant="outlined"
                            size="small"
                            value={item.LotNo}
                            onChange={(e) => this.updateLotDetail("LotNo", e, i)}
                          />
                        </TableCell>
                        <TableCell align="right">
                          <SCI
                            id={"Quantity_" + i}
                            variant="outlined"
                            size="small"
                            value={item.Quantity}
                            onChange={(e) => this.updateLotDetail("Quantity", e, i)}
                          />
                        </TableCell>
                        <TableCell>
                          <select
                            id={"PackingUOM_" + i}
                            style={{ width: '100%' }}
                            className="line-dropdown-css"
                            value={item.PackingUOM}
                            onChange={(e) => this.updateLotDetail("PackingUOM", e, i)}
                          >
                            <option value="" >Select</option>
                            {this.state.UOMList.map((op, i) => (
                              <option value={op.value}> {op.name}</option>
                            ))}
                          </select>
                        </TableCell>
                        <TableCell align="left">
                          <SCI
                            id={"Location_" + i}
                            variant="outlined"
                            size="small"
                            value={item.Location}
                            onChange={(e) => this.updateLotDetail("Location", e, i)}
                          />
                        </TableCell>
                      </TableRow>
                    )) : null}

                    {this.state.SelectedLotItem['LotDetails'] ? (
                      <TableRow>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"><span className="themeFont" style={{ color: '#212121', fontWeight: 'bold' }}>Total</span></TableCell>
                        <TableCell align="left">{this.getTotalLotQuantity()}</TableCell>
                        <TableCell align="left"></TableCell>
                        <TableCell align="left"></TableCell>
                      </TableRow>
                    ) : null}


                  </TableBody>
                </Table>

              </Grid>
            </Grid>




            <div style={{ height: 50 }}>&nbsp;</div>
          </DialogContent>
        </Dialog>





      </Fragment>
    );
  }
}
export default pogitactivity;
