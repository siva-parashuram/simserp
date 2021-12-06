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
      isDataFetched: false,
      BranchID: 0,
      accordion1: false,
      accordion2: true,
      accordion3: false,
      accordion4: false,
      accordion5: false,
      ProgressLoader: false,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: false,
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
      GLAccount: [],
      Charges: [],
      FixedAsset:[],
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
        MRNSTATUS: 3,
        activeStep: 0,
        steps: ["Open", "Release", "MRN", "Short Close"],
        skipped: new Set(),
      },
      CurrencyCode:"",
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
      POID: this.state.type==="edit"?this.state.PO.POID:0,
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
    this.setState({ PurchaseOrderLine: PurchaseOrderLine },()=>{
      console.log("New Just Added PurchaseOrderLine > ",PurchaseOrderLine);
    });
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

      this.getSupplierList(CF.toInt(branchId),PO.POID);  
      this.setState({BranchID: CF.toInt(branchId)},()=>{ 
        this.getSupplierList(CF.toInt(branchId));  
        
      });      
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
     if(type==="add"){this.getSupplierList(CF.toInt(branchId)); }   
    });
  }

  getPODetails = (PO) => { 
    this.setState({ ProgressLoader: false });
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
      if(response.status===200){
        let ResonsePO=response.data;       
        let PO=ResonsePO;
        let PurchaseOrderLine=ResonsePO.PurchaseOrderLine;  
        PO.BillingID=CF.toInt(ResonsePO.BillingID); 
        PO.PODate = moment(PO.PODate).format("YYYY-MM-DD");
        PO.DispachDate = moment(PO.DispachDate).format("YYYY-MM-DD");
        PO.DeliveryDate = moment(PO.DeliveryDate).format("YYYY-MM-DD");
        if(PO.AmendmentNo>0){
          PO.AmendmentDate=moment(PO.AmendmentDate).format("YYYY-MM-DD");
        }else{
          PO.AmendmentDate="";
        }        

        let newPOL=[];//this.getProcessedPurchaseOrderLineList(PurchaseOrderLine);
        for (let i = 0; i < PurchaseOrderLine.length; i++) {
          let EL = {
            POID: PO.POID,
            Type: PurchaseOrderLine[i].Type,
            LNo: PurchaseOrderLine[i].LNo,
            TypeIDList: [],
            CategoryList: PurchaseOrderLine[i].Type === 0 ? this.state.SupplierItemCategory : [],
            isCategoryDisabled: PurchaseOrderLine[i].Type === 0 ? false : true,
            CategoryId: PurchaseOrderLine[i].CatID,
            ItemList: [],//PurchaseOrderLine[i].Type === 0?[{name:PurchaseOrderLine[i].name,value:PurchaseOrderLine[i].value}]:[],
            ItemListSelected: {name:PurchaseOrderLine[i].name,value:PurchaseOrderLine[i].value},
            TypeID: PurchaseOrderLine[i].value,
            Description: PurchaseOrderLine[i].Description1,
            packingDescription: PurchaseOrderLine[i].PackingDesc1,
            SupplierCode: PurchaseOrderLine[i].SupplierCode,
            Narration: PurchaseOrderLine[i].Narration,
            UOMID: PurchaseOrderLine[i].UOMID,
            TolerancePercentage: PurchaseOrderLine[i].TolerancePercentage,
            Quantity: PurchaseOrderLine[i].Quantity,
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
            isDataProper: true,
          };
          newPOL.push(EL);
        }
                
        this.setState({
          PO:PO,
          PurchaseOrderLine:newPOL,
          ProgressLoader: true
        },()=>{
          
          this.presetSetSupplierDropdown(PO);
          this.setFieldValuesOnSuplierChange(CF.toInt(PO.SuplID),null);
        });
        
      } else{
        this.setState({ ErrorPrompt:true,  ProgressLoader: true });
      }
    })
    .catch((error) => {   
      console.log("Error > ",error);      
        this.setState({ ErrorPrompt:true,  ProgressLoader: true });
    }); 
  };

  getCategoryList=()=>{}

  presetSetSupplierDropdown = (PO) => {
    for (let i = 0; i < this.state.supplierList.length; i++) {
      if (this.state.supplierList[i].id === PO.SuplID) {
        this.setState({ SADIB_VALUE: this.state.supplierList[i], isDataFetched: true });
      }
    }
  }

  getProcessedPurchaseOrderLineList=(PurchaseOrderLine)=>{
    console.log("getProcessedPurchaseOrderLineList > PurchaseOrderLine > ",PurchaseOrderLine);
    let newPOL=[];
     for(let i=0;i<PurchaseOrderLine.length;i++){
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
        TolerancePercentage: (PurchaseOrderLine[i].TolerancePercentage===null || PurchaseOrderLine[i].TolerancePercentage==="NaN") ?0:PurchaseOrderLine[i].TolerancePercentage,
        Quantity: PurchaseOrderLine[i].Quantity,
        Price: PurchaseOrderLine[i].Price,
        LineDiscPercentage: PurchaseOrderLine[i].LineDiscPercentage,
        LineDiscAmount: PurchaseOrderLine[i].LineDiscAmount,
        ItemPostingGroupID: PurchaseOrderLine[i].ItemPostingGroupID,
        GeneralPostingGroupList:[],
        GeneralPostingGroupID: PurchaseOrderLine[i].GeneralPostingGroupID,
        VATPercentage:PurchaseOrderLine[i].VATPercentage,
        VATAmount: PurchaseOrderLine[i].VATAmount,
        HSNCode: PurchaseOrderLine[i].HSNCode,
        GSTGroupID: PurchaseOrderLine[i].GSTGroupID,
        SupplyStateID: this.state.StateID,
        GSTPercentage: PurchaseOrderLine[i].GSTPercentage,
        BuyFromGSTN: PurchaseOrderLine[i].BuyFromGSTN,
        NatureOfSupply: PurchaseOrderLine[i].NatureOfSupply,
        DValueID: PurchaseOrderLine[i].DValueID,
        IsQuality: PurchaseOrderLine[i].IsQuality,
        IsLot: PurchaseOrderLine[i].IsLot,
        isDataProper: true,
      };
      newPOL.push(EL);
     }
    return newPOL;
  }

  getSupplierList = (BranchID) => {
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
          let FixedAsset=data.FixedAsset;
          let DimensionsList = data.DimensionValue;
          let IncoTermList=data.IncoTerms;

          // let newSupplierData = [];
          // for (let i = 0; i < Supplier.length; i++) {
          //   let o =Supplier[i];
          //   o.label=Supplier[i].Name;
          //   o.id=Supplier[i].SuplID;             
          //   newSupplierData.push(o);
          // }

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
            supplierList: Supplier,
            SupplierPostingGroupList: SupplierPostingGroup,
            WarehouseList: WareHouse,
            UOMList: UOM,
            ItemPostingGroupList: ItemPostingGroup,
            GSTGroupIDList: GSTGROUP,
            GLAccount: GLAccount,
            Charges: Charges,
            FixedAsset:FixedAsset,
            DimensionsList: DimensionsList,
            IncoTermList:IncoTermList,
            ProgressLoader: this.state.type==="edit"?false:true
          },()=>{
            if(this.state.type==="edit"){
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

  setFieldValuesOnSuplierChange = (SuplID,event) => {
    console.log();
    let PO = this.state.PO;
    let data = this.getSupplierDataList(SuplID);
    PO.CurrID = data.CurrID;
    // UOMList
    if (data.SupplierAdressList.length > 0) {
      let BillingID=null;
      if(this.state.type==="add" || event==="dropdownChange"){
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
        if (this.state.type === "add"|| event==="dropdownChange") {
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
        if (this.state.type === "edit" && event!="dropdownChange") {
          BCdata = this.getDataToSetOnBillingChange(CF.toInt(this.state.PO.BillingID));
        }

        console.log("#####################3-----------------------------------> BCdata > ",BCdata);

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
    switch (param) {
      case "SuplID":
        if (e) {
          this.setState({ SADIB_VALUE: e, isDataFetched: true }, () => {
            console.log("e > ",e);
            let CurrencyCode="";
            for(let i=0;i<this.state.CurrencyList.length;i++){
              if(this.state.CurrencyList[i].value===CF.toInt(e.CurrID)){
                PO.ExchRate=this.state.CurrencyList[i].ExchRate;
                CurrencyCode=" ("+this.state.CurrencyList[i].name+")";
                break;
              }
            }
            this.setState({CurrencyCode:CurrencyCode});
            PO.SuplID = CF.toInt(e.id);
            this.setFieldValuesOnSuplierChange(CF.toInt(e.id),"dropdownChange");
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
        PO.CurrID = CF.toInt(e.target.value);
        let CurrencyCode="";
        for(let i=0;i<this.state.CurrencyList.length;i++){
          if(this.state.CurrencyList[i].value===CF.toInt(e.target.value)){
            PO.ExchRate=this.state.CurrencyList[i].ExchRate;
            CurrencyCode=" ("+this.state.CurrencyList[i].name+")";
            break;
          }
        }
        this.setState({CurrencyCode:CurrencyCode});
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
        let AmendmentInput=this.state.AmendmentInput;
        AmendmentInput.status=e.target.checked;
        if(e.target.checked===true){
          let old={
            AmendmentNo:PO.AmendmentNo,
            AmendmentDate:PO.AmendmentDate
          };  
          AmendmentInput.old=old; 
        }       
        this.setState({AmendmentInput:AmendmentInput},()=>{
          if(e.target.checked===true){
            PO.AmendmentNo=CF.toInt(PO.AmendmentNo)+1;
            PO.AmendmentDate=today;
          }else{
            PO.AmendmentNo=AmendmentInput.old['AmendmentNo'];
            PO.AmendmentDate=AmendmentInput.old['AmendmentDate'];
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
    let currentDeleteItemLine = this.state.currentDeleteItemLine;
    let PurchaseOrderLine = this.state.PurchaseOrderLine;
    let newPurchaseOrderLine = [];
    for (let i = 0; i < PurchaseOrderLine.length; i++) {
      if (currentDeleteItemLine.index === i) { } else {
        newPurchaseOrderLine.push(PurchaseOrderLine[i]);
      }
    }
    this.setState({ PurchaseOrderLine: newPurchaseOrderLine });
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
    try{
      let UOMID_i=o.UOMID;
      for (let i = 0; i < o.ItemList.length; i++) {     
        if (o.ItemList[i].value === o.TypeID) {
          let ItemPrice=o.ItemList[i]['ItemPrice'];
          for (let j = 0; j < ItemPrice.length; j++) {
            let UOM_j=ItemPrice[j]['UOM'];
            if (UOMID_i === UOM_j) {
              let jo=ItemPrice[j];
              if (parseFloat(Quantity) >= parseFloat(jo.MinQty) && parseFloat(Quantity) <= parseFloat(jo.MaxQty)) {
                return jo.UnitPrice;
                break;
              }
            }
          }
        }
      }
    }catch(err){
      return 0;
    }   
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
        o.HSNCode="";
        o.CategoryId = null;
        o.SupplierCode=null;
        o.Narration=null;
        o.TolerancePercentage=0;
        o.LineDiscPercentage=0;
        o.ItemPostingGroupID=null;
        o.GeneralPostingGroupID=null;
        o.VATPercentage=0;
        o.VATAmount=0;
        o.GSTGroupID=0;
        o.SupplyStateID=0;
        o.DValueID=0;
        o.GSTPercentage=0;
        switch (CF.toInt(e.target.value)) {
          case 0://item
            o.Quantity = 0;
            o.CategoryList = this.state.SupplierItemCategory;
            o.isCategoryDisabled = false;
            o.ItemList = [];
            o.UOMID="";
            break;
          case 1://G/L Account
            o.Quantity = 1;
            o.ItemListSelected = null;
            o.CategoryList = [];
            o.CategoryId = null;
            o.isCategoryDisabled = true;
            o.ItemList = this.state.GLAccount;
            o.UOMID=this.getNOSvalue();
            break;
          case 2://Fixed Asset        
            o.Quantity = 1;
            o.ItemListSelected = null;
            o.CategoryList = [];
            o.CategoryId = null;
            o.isCategoryDisabled = true;
            o.ItemList = this.state.FixedAsset;
            o.UOMID=this.getNOSvalue();
            break;
          case 3://Charge          
            o.Quantity = 1;
            o.ItemListSelected = null;
            o.CategoryList = [];
            o.CategoryId = null;
            o.isCategoryDisabled = true;
            o.ItemList = this.state.Charges;
            o.UOMID=this.getNOSvalue();
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
          if(o.Type===0){
          o.Description = e.Description1;
          o.packingDescription = e.PackingDesc1;
          o.HSNCode = e.HSNCode;          
          o.GSTPercentage = e.GSTPercentage;
          o.UOMID = e.PurchaseUOM;
          o.ItemPostingGroupID = e.ItemPostingGroupID;
          o.TolerancePercentage = e.TolerancePercentage;
          o.IsLot = e.IsLot;
          o.IsQuality = e.IsQuality;          
          }else{
            o.packingDescription = "";
            o.UOMID=this.getNOSvalue();
            o.ItemPostingGroupID = 0;
            o.IsLot = false;
            o.IsQuality = false;
          }
          PurchaseOrderLine[i] = o;
          this.setLineParams(PurchaseOrderLine);
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
        let price=0;
        price=this.fetchPrice(e.target.value,o);
        console.log("IN Quantity > price slab value > ",price);
        if(price){
          o.Price=price;
        }else{
          o.Price=0;
        }        
        o[key] = e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
        break;
      case "Price":
        o[key] =  e.target.value;
        PurchaseOrderLine[i] = o;
        this.setLineParams(PurchaseOrderLine);
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
        for (let i = 0; i < GSTGroupIDList.length; i++) {
          if (GSTGroupIDList[i].value === CF.toInt(e.target.value)) {
            o.GSTPercentage = GSTGroupIDList[i].GSTPercentage;
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
    console.log("validLine > ",validLine);
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

  setLineParams = (object) => { this.setState({ PurchaseOrderLine: object }) };

  validateLine = (o) => {
    let validLine = false;

    //---------------------------
    if(
      o.Type==="" || o.Type===null ||
      o.TypeID==="" || o.TypeID===null ||
      o.Quantity===0 ||
      o.Price===0           
    ){
      validLine = false;
    }else{
      validLine = true; 
    }

    if(o.HSNCode){
      if(( o.HSNCode.length<6|| o.HSNCode.length>8) ){validLine = false;}else{validLine = true;}
    }else{
      validLine = false;
    }

    //----------------------




    return validLine;
  }

  
  getProcessedPurchaseOrderLineListUpdate=()=>{
    let PurchaseOrderLineList=[];
    let POL=this.state.PurchaseOrderLine;
    console.log("> getProcessedPurchaseOrderLineListUpdate POL > ",POL);
    for(let i=0;i<POL.length;i++){
      let o = {
        POID: this.state.PO.POID,
        Type: POL[i].Type,
        LNo: POL[i].LNo,
        TypeID: POL[i].TypeID,
        SupplierCode: POL[i].SupplierCode===null?"":POL[i].SupplierCode,
        Narration: POL[i].Narration===null?"":POL[i].Narration,
        UOMID: POL[i].UOMID,
        TolerancePercentage: parseFloat(POL[i].TolerancePercentage),
        Quantity: parseFloat(POL[i].Quantity) ,
        Price: POL[i].Price,
        LineDiscPercentage: parseFloat(POL[i].LineDiscPercentage),
        // LineDiscAmount: POL[i].LineDiscAmount,
        ItemPostingGroupID:POL[i].ItemPostingGroupID,
        // GeneralPostingGroupID: POL[i].GeneralPostingGroupID,
        VATPercentage: parseFloat(POL[i].VATPercentage),
        // VATAmount: POL[i].VATAmount,
        HSNCode:POL[i].HSNCode,
        GSTGroupID: POL[i].GSTGroupID,
        SupplyStateID: this.state.StateID,
        GSTPercentage:POL[i].GSTPercentage,
        // BuyFromGSTN: POL[i].BuyFromGSTN,
        // NatureOfSupply: POL[i].NatureOfSupply,
        DValueID: POL[i].DValueID==="" ?0:CF.toInt(POL[i].DValueID),
        IsQuality: POL[i].IsQuality,
        IsLot: POL[i].IsLot
      };
      PurchaseOrderLineList.push(o);
    }
    return PurchaseOrderLineList;
  }

  validatePOData=(PurchaseOrder)=>{
    let isProperData=false;
     

    return isProperData;   
  }

//direct edit once first time entry is made
  openEditMode=(ID)=>{
    console.log("-openEditMode-");
    console.log("ID -> ",ID);
     
    let type = "edit";
    let POID = ID;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");

    let PO = this.state.PO;
    PO.POID = CF.toInt(POID);

    this.setState({
      PO: PO,
      type: type,
      typoTitle: typoTitle,
    });

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
      this.setState({ ProgressLoader: false });
      console.log("Adding new");
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };

      let PurchaseOrder=this.state.PO; 
      PurchaseOrder.UserID=CF.toInt(getCookie(COOKIE.USERID));
      PurchaseOrder.BranchID=this.state.BranchID;
      PurchaseOrder.AmendmentDate=moment(PurchaseOrder.AmendmentDate).format("MM/DD/YYYY"); 
      PurchaseOrder.PODate=moment(PurchaseOrder.PODate).format("MM/DD/YYYY"); 
      PurchaseOrder.DeliveryDate=moment(PurchaseOrder.DeliveryDate).format("MM/DD/YYYY");
      PurchaseOrder.DispachDate=moment(PurchaseOrder.DispachDate).format("MM/DD/YYYY");
      let PurchaseOrderLineList=this.getProcessedPurchaseOrderLineList(this.state.PurchaseOrderLine);

      let isProperData=this.validatePOData(PurchaseOrder);

      let NoSeriesReqData = {
        ValidUser: ValidUser,
        DocumentNumber: {
          NoSeriesID: this.state.PO.IsImport===true?CF.toInt(this.state.Branch.IPONo):CF.toInt(this.state.Branch.LPONo),
          // BranchID:this.state.BranchID,
          TransDate: moment().format("MM-DD-YYYY"),
        },
      };

      let Url1=APIURLS.APIURL.GetMasterDocumentNumber;
      axios
        .post(Url1, NoSeriesReqData, { headers })
        .then((response) => {
          if (response.status === 200) {
            PurchaseOrder.No = response.data;
            let reqData = {
              ValidUser: ValidUser,
              PurchaseOrder: PurchaseOrder,
              PurchaseOrderLineList: PurchaseOrderLineList
            };
            let Url2 = APIURLS.APIURL.Add_Update_PO;
            axios
              .post(Url2, reqData, { headers })
              .then((response) => {
                console.log("response > ",response);
                if(response.status===201 || response.status===200){                  
                  this.setState({ SuccessPrompt: true, ProgressLoader: true });
                  //change to Edit mode
                  this.openEditMode(response.data.ID);
                }
               
              })
              .catch((error) => {
                console.log("Main API Error");
                this.setState({ ErrorPrompt: true, ProgressLoader: true });
              });
          } else {
            console.log("No series Error IF");
            this.setState({ ErrorPrompt: true, ProgressLoader: true });
          }
        })
        .catch((error) => {
          console.log("No series Error");
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        });


      
     


    };

    const updatePO = (e) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };


      let PurchaseOrder=this.state.PO; 
    try{delete PurchaseOrder['PurchaseOrderLine']; }catch(err){}
      PurchaseOrder.UserID=CF.toInt(getCookie(COOKIE.USERID));
      PurchaseOrder.BranchID=this.state.BranchID;
      PurchaseOrder.AmendmentDate=moment(PurchaseOrder.AmendmentDate).format("MM/DD/YYYY")==="Invalid date"?moment().format("MM/DD/YYYY"):moment(PurchaseOrder.AmendmentDate).format("MM/DD/YYYY"); 
      PurchaseOrder.PODate=moment(PurchaseOrder.PODate).format("MM/DD/YYYY"); 
      PurchaseOrder.DeliveryDate=moment(PurchaseOrder.DeliveryDate).format("MM/DD/YYYY");
      PurchaseOrder.DispachDate=moment(PurchaseOrder.DispachDate).format("MM/DD/YYYY");

      let PurchaseOrderLine=this.state.PurchaseOrderLine;
      console.log("##############33 PurchaseOrderLine > ",PurchaseOrderLine);
       
      let PurchaseOrderLineList=[];
     //  PurchaseOrderLineList=this.getProcessedPurchaseOrderLineListUpdate();
      let newPOL=[];
     for(let i=0;i<PurchaseOrderLine.length;i++){
       let o={
        "POID": PurchaseOrderLine[i].POID,
        "Type": PurchaseOrderLine[i].Type,
        "LNo": PurchaseOrderLine[i].LNo,
        "TypeID": PurchaseOrderLine[i].TypeID,
        "SupplierCode": PurchaseOrderLine[i].SupplierCode===null?"":PurchaseOrderLine[i].SupplierCode,
        "Narration": PurchaseOrderLine[i].Narration===null?"":PurchaseOrderLine[i].Narration,
        "UOMID": PurchaseOrderLine[i].UOMID,
        "TolerancePercentage": PurchaseOrderLine[i].TolerancePercentage,
        "Quantity": PurchaseOrderLine[i].Quantity,
        "Price": PurchaseOrderLine[i].Price,
        "LineDiscPercentage": PurchaseOrderLine[i].LineDiscPercentage,
        "ItemPostingGroupID": PurchaseOrderLine[i].ItemPostingGroupID,
        "VATPercentage": PurchaseOrderLine[i].VATPercentage,
        "HSNCode": PurchaseOrderLine[i].HSNCode,
        "GSTGroupID": PurchaseOrderLine[i].GSTGroupID,
        "SupplyStateID": this.state.StateID,
        "GSTPercentage": PurchaseOrderLine[i].GSTPercentage,
        "DValueID": PurchaseOrderLine[i].DValueID,
        "IsQuality": PurchaseOrderLine[i].IsQuality,
        "IsLot": PurchaseOrderLine[i].IsLot
      };
       newPOL.push(o);
     }
      console.log("PurchaseOrderLineList > ",PurchaseOrderLineList);
      console.log("newPOL > ",newPOL);
  

      let isProperData=this.validatePOData(PurchaseOrder);
      let reqData = {
        ValidUser: ValidUser,
        PurchaseOrder: PurchaseOrder,
        PurchaseOrderLineList: newPOL
      };
      let Url = APIURLS.APIURL.Add_Update_PO;
      axios
      .post(Url, reqData, { headers })
      .then((response) => {
        console.log("response > ",response);
        if(response.status===201 || response.status===200){                  
          this.setState({ SuccessPrompt: true, ProgressLoader: true });          
          
        }
       
      })
      .catch((error) => {      
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });


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
              onClick={(e) => AddNew(e)}
              disabled={this.state.DisableCreatebtn}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}

          {this.state.type === "edit" ? (
            <Button
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              onClick={(e) => updatePO(e)}
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

                                  {this.state.type === "add"?(
                                    <SSIB
                                    key="amendEvent"
                                    id="AmendmentInput"
                                    label="Amending?"
                                    param={false}
                                    // onChange={(e) => this.updateFormValue("AmendmentInput", e)}
                                    disabled={true}
                                  />
                                  ):null}

                                  {this.state.type === "edit" ? (
                                    <SSIB
                                      key="amendEvent"
                                      id="AmendmentInput"
                                      label="Amending?"
                                      param={this.state.AmendmentInput.status}
                                      onChange={(e) => this.updateFormValue("AmendmentInput", e)}
                                      disabled={false}
                                    />
                                  ) : null}
                                 

                                  <SIB
                                    id="AmendmentNo"
                                    label="Amendment No"
                                    variant="outlined"
                                    size="small"
                                    value={this.state.PO.AmendmentNo}
                                    disabled={true}
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
                                    disabled={true}
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
                          <div style={{ marginRight: 20 }}>
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
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Category</TableCell>
                                  <TableCell style={{ maxWidth: 350, minWidth: 350 }} className="line-table-header-font" align="center">Item</TableCell>

                                  <TableCell style={{ maxWidth: 250, minWidth: 250 }} className="line-table-header-font" align="left">Desc</TableCell>
                                  <TableCell style={{ maxWidth: 250, minWidth: 250 }} className="line-table-header-font" align="left">Pack.Desc</TableCell>
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Sup.Code</TableCell>
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Narration</TableCell>
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">UOM</TableCell>
                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Tolerance %</TableCell>
                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Quantity </TableCell>
                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Unit Price </TableCell>
                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Line.Disc %</TableCell>
                                  {/* <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center"> Line Disc Amount</TableCell> */}
                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Item Posting Group </TableCell>

                                  {this.state.Branch.IsVAT === true ? (
                                    <Fragment>
                                      <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">VAT % </TableCell>
                                      <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">VAT Amount </TableCell>
                                    </Fragment>
                                  ) : null}

                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">HSN </TableCell>

                                  {
                                    this.state.Branch.IsGST === true ? (
                                      <Fragment>
                                        <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">GST Group </TableCell>
                                        <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center"> GST %</TableCell>
                                      </Fragment>
                                    ) : null
                                  }

                                  <TableCell style={{ maxWidth: 200, minWidth: 200 }} className="line-table-header-font" align="center">Dim.Value </TableCell>
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Is Quality? </TableCell>
                                  <TableCell style={{ maxWidth: 150, minWidth: 150 }} className="line-table-header-font" align="center">Is Lot? </TableCell>
                                </TableRow>
                              </TableHead>
                              <TableBody className="tableBody">

                                {console.log("this.state.PurchaseOrderLine > ",this.state.PurchaseOrderLine)}
                                {this.state.PurchaseOrderLine.length > 0 ? (
                                  <Fragment>
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
                                            id={"Type_" + i}
                                            style={{ width: '100%' }}
                                            className="dropdown-css"
                                            value={item.Type}
                                            onChange={(e) => this.updateLineDetail(i, "Type", e)}
                                          >
                                            <option value="" >Select</option>
                                            {APIURLS.POItemType.map((op, i) => (
                                              <option value={op.value} > {op.name}</option>

                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell align="center">
                                          {console.log("this.state.PurchaseOrderLine > ", this.state.PurchaseOrderLine)}
                                          <select
                                            id={"Category_" + i}
                                            style={{ width: '100%' }}
                                            className="dropdown-css"
                                            value={item.CategoryId}
                                            onChange={(e) => this.updateLineDetail(i, "CategoryId", e)}
                                            disabled={item.isCategoryDisabled}
                                          >
                                            <option value="" >Select</option>
                                            {item.CategoryList.map((op, i) => (
                                              <option value={op.value} > {op.name}</option>
                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell align="center">
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
  
                                        <TableCell align="center">
                                          <SCI
                                            id={"Naration_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.SupplierCode}
                                            onChange={(e) => this.updateLineDetail(i, "SupplierCode", e)}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <SCI
                                            id={"Naration_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.Narration}
                                            onChange={(e) => this.updateLineDetail(i, "Narration", e)}
                                          />
                                        </TableCell>
                                        <TableCell align="center">

                                          <select
                                            style={{ width: '100%' }}
                                            className="dropdown-css"
                                            value={item.UOMID}
                                            onChange={(e) => this.updateLineDetail(i, "UOMID", e)}
                                          >
                                             <option value=""> Select</option>
                                            {this.state.UOMList.map((op, i) => (
                                              <option value={op.value}> {op.name}</option>
                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell align="center">
                                          <SCI
                                            id={"TolerancePercentage_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.TolerancePercentage}
                                            onChange={(e) => this.updateLineDetail(i, "TolerancePercentage", e)}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <SCI
                                            id={"Quantity_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.Quantity}
                                            onChange={(e) => this.updateLineDetail(i, "Quantity", e)}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <SCI
                                            id={"Price_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.Price}
                                            onChange={(e) => this.updateLineDetail(i, "Price", e)}
                                            disabled={item.Type===0?true:false}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <SCI
                                            id={"LineDiscPercentage_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.LineDiscPercentage}
                                            onChange={(e) => this.updateLineDetail(i, "LineDiscPercentage", e)}
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
                                        <TableCell align="center">
                                          <select
                                            style={{ width: '100%' }}
                                            className="dropdown-css"
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
                                        {this.state.Branch.IsVAT === true ? (
                                          <Fragment>
                                            <TableCell align="center">
                                              <SCI
                                                id={"VATPercentage_" + i}
                                                variant="outlined"
                                                size="small"
                                                value={item.VATPercentage}
                                                onChange={(e) => this.updateLineDetail(i, "VATPercentage", e)}
                                              />
                                            </TableCell>
                                            <TableCell align="center">
                                              <SCI
                                                id={"VATAmount_" + i}
                                                variant="outlined"
                                                size="small"
                                                value={item.VATAmount}
                                                onChange={(e) => this.updateLineDetail(i, "VATAmount", e)}
                                              />
                                            </TableCell>
                                          </Fragment>
                                        ) : null}


                                        <TableCell align="center">
                                          <SCI
                                            id={"HSNCode_" + i}
                                            variant="outlined"
                                            size="small"
                                            value={item.HSNCode}
                                            onChange={(e) => this.updateLineDetail(i, "HSNCode", e)}
                                          />
                                        </TableCell>

                                        {
                                          this.state.Branch.IsGST === true ? (
                                            <Fragment>
                                              <TableCell align="center">
                                                <select
                                                  style={{ width: '100%' }}
                                                  className="dropdown-css"
                                                  value={item.GSTGroupID}
                                                  onChange={(e) => this.updateLineDetail(i, "GSTGroupID", e)}
                                                >
                                                  <option value=""> Select</option>
                                                  {this.state.GSTGroupIDList.map((op, i) => (
                                                    <option value={op.value}> {op.name}</option>
                                                  ))}
                                                </select>
                                              </TableCell>
                                              <TableCell align="center">
                                                <SCI
                                                  id={"GSTPercentage_" + i}
                                                  variant="outlined"
                                                  size="small"
                                                  value={item.GSTPercentage}
                                                  onChange={(e) => this.updateLineDetail(i, "GSTPercentage", e)}
                                                  disabled={true}
                                                />
                                              </TableCell>
                                            </Fragment>
                                          ) : null
                                        }




                                        <TableCell align="center">
                                          <select
                                            style={{ width: '100%' }}
                                            className="dropdown-css"
                                            value={item.DValueID}
                                            onChange={(e) => this.updateLineDetail(i, "DValueID", e)}
                                          >
                                            <option value="0">Select</option>
                                            {this.state.DimensionsList.map((op, i) => (
                                              <option value={op.value}> {op.name}</option>
                                            ))}
                                          </select>
                                        </TableCell>
                                        <TableCell align="center">
                                          <SCSI
                                            key={"IsQuality_+i"}
                                            id={"IsQuality_+i"}
                                            param={item.IsQuality}
                                            onChange={(e) => this.updateLineDetail(i, "IsQuality", e)}
                                          />
                                        </TableCell>
                                        <TableCell align="center">
                                          <SCSI
                                            key={"IsLot_+i"}
                                            id={"IsLot_+i"}
                                            param={item.IsLot}
                                            onChange={(e) => this.updateLineDetail(i, "IsLot", e)}

                                          />
                                        </TableCell>

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

                                          label={"Total Excl. " + (this.state.Branch.IsGST === true ? "GST" : "VAT") +"("+item.name+")"}
                                          value={"0.00"}
                                        />
                                      </Fragment>
                                    )
                                      : null
                                  ))
                                }
                                {/* <SSDV
                                  label={"Total Excl. "+(this.state.Branch.IsGST === true?"GST":"VAT")  +
                                  this.state.CurrencyCode }
                                  value={"0.00"}
                                /> */}
                                <SSDV
                                  label="Invoice Discount %"
                                  value="0.00"
                                />

                                {
                                  this.state.CurrencyList.map((item, i) => (
                                    this.state.PO.CurrID === item.value ? (
                                      <Fragment>
                                        <SSDV
                                          label={"Total " + (this.state.Branch.IsGST === true ? "GST" : "VAT") + "(" + item.name + ")"}
                                          value="0.00"
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
                                          value="0.00"
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


        {dialog}
      </Fragment>
    );
  }
}
export default poactivity;
