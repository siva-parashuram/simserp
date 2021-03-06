import React, { Fragment } from "react";
import axios from "axios";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import * as CF from "../../../services/functions/customfunctions";
import { COOKIE, getCookie } from "../../../services/cookie";
import { Divider, TableCell, TableRow } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import AddIcon from "@material-ui/icons/Add";

import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";

import TextboxInput from "../../compo/tablerowcelltextboxinput";
import DropdownInput from "../../compo/Tablerowcelldropdown";
import SwitchInput from "../../compo/tablerowcellswitchinput";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";

import Itemquickdetails from "./itemquickdetails";

class editItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BranchID:0,
      GeneralDetailsExpanded: true,
      PlanningDetailsExpanded: false,
      WarehouseDetailsExpanded: false,
      InvoicingDetailsExpanded: false,
      ReplenishmentDetailsExpanded: false,
      Updatebtn: false,
      SuccessPrompt: false,
      ErrorPrompt: false,
      ErrorMessageProps:"",
      ProgressLoader: true,
      urlparams: "",
      itemDataList:[],
      itemDepartmentMasterData: [],
      ItemTypeMaster: APIURLS.ItemType,
      ItemId: 0,
      No: "",
      ItemType: 0,
      Code: "",
      Alias: "",
      Description1: "",
      Description2: "",
      PackingDesc1: "",
      PackingDesc2: "",
      ItemDeptId: 0,
      CatId: 0,
      IsActive: false,
      IsTrading: false,
      IsNonStockValuation: false,
      IsCustomized: false,
      IsCertified: false,
      CertificateNo: "",
      IsSaleEvenQuantity: false,
      Location: "",
      BarcodeNo: "",
      CartonHeight: 0,
      CartonLength: 0,
      CartonWidth: 0,
      NetWeight: 0,
      GrossWeight: 0,
      WarningLevel: 0,
      MinStockLevel: 0,
      Amsf: 0,
      Msf: 0,
      Bsf: 0,
      Moq: 0,
      ShipperQuantiry: 0,
      CbmperShipper: 0,
      IsDiscontine: false,
      Reason: "",
      UserId: 0,
      ModifyDate: "",
      TolerancePercentage: 0,
      IsQuality: false,
      SpecId: 0,
      AllowNegativeStock: false,
      ItemPostingGroupID: 0,
      CostingMethod: 0,
      StandardCost: 0,
      IndirectCostPercentage: 0,
      ProfitPercentage: 0,
      GstgroupId: 0,
      Hsncode: "",
      BaseUom: 0,
      SalesUom: 0,
      PurchaseUom: 0,
      PackingUom: 0,
      Replenishment: 0,
      LeadTime: 0,
      IsLot: false,
      ManufacturingPolicy: "",
      RoutingId: 0,
      Bomid: 0,
      Item: {},
      ItemCategoryData: [],
      UOMList: [],
      GSTGroupList: [],
      SpecIDList: [],
      ItemPostingGroupList:[],
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Alias: { errorState: false, errorMssg: "" },
        Description1: { errorState: false, errorMssg: "" },
        Description2: { errorState: false, errorMssg: "" },
        PackingDesc1: { errorState: false, errorMssg: "" },
        PackingDesc2: { errorState: false, errorMssg: "" },
        CertificateNo: { errorState: false, errorMssg: "" },
        Reason: { errorState: false, errorMssg: "" },
        Hsncode: { errorState: false, errorMssg: "" },
        NetWeight: { errorState: false, errorMssg: "" },
        GrossWeight: { errorState: false, errorMssg: "" },
        BaseUom: { errorState: false, errorMssg: "" },
        ItemPostingGroupID: { errorState: false, errorMssg: "" },  
      },
      selectedItem:{}
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getItems();
    this.getUOMList();
    this.GSTGroupList();
    this.getItemCategoryData();
    this.getSpecIDList();
    this.getAllItemPostingGroup();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let ItemId = url.searchParams.get("edititemId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    this.setState(
      {
        urlparams: params,
        ItemId: ItemId,
        BranchID:branchId,
      },
      () => {
        this.getItem();
        this.getitemDepartmentMasterData();
      }
    );
  }

  getAllItemPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllItemPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD=[];
        for(let i=0;i<data.length;i++){
          newD.push({name:data[i].Code,value:data[i].ItemPostingGroupID});
        } 
        this.setState({ ItemPostingGroupList: newD });
      })
      .catch((error) => {});
  };

  getSpecIDList = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetSpecification;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        this.setState({
          SpecIDList: data,
          ProgressLoader: true,
        });
      })
      .catch((error) => { });
  };

  GSTGroupList = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetGSTGroup;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code,
            value: data[i].GSTGroupID,
          };
          newD.push(o);
        }

        this.setState({
          GSTGroupList: newD,
          ProgressLoader: true,
        });
      })
      .catch((error) => { });
  };

  getUOMList = () => {

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllUOM;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].name,
            value: data[i].uomid,
          };
          newD.push(o);
        }

        this.setState({
          UOMList: newD,
        });
      })
      .catch((error) => { });
  };

  getItemCategoryData() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetItemCategories;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        // this.setState({ ItemCategoryData: data,ProgressLoader: true });
        this.processItemCategoryData(data);
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  processItemCategoryData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].IsActive === true) {
        let d = {
          name: data[i].Code,
          value: data[i].CatID,
          HSNCode: data[i].HSNCode
        };
        newData.push(d);
      }
    }
    this.setState({ ItemCategoryData: newData, ProgressLoader: true });
  }

  getitemDepartmentMasterData() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetItemDepartments;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ ProgressLoader: true });
        this.processDepartmentList(data);
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  processDepartmentList(data) {
    console.log("processDepartmentList > data > ", data);
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].isActive === true) {
        let d = {
          name: data[i].code + " - " + data[i].name,
          value: data[i].itemDeptId,
        };
        newData.push(d);
      }
    }
    console.log("processDepartmentList > newData > ", newData);
    this.setState({ itemDepartmentMasterData: newData });
  }

  getItem() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Data = {
      validUser: ValidUser,
      // BranchID:parseInt(this.state.BranchID),
      Item: {
        ItemId: parseInt(this.state.ItemId),
      },
    };

    let Url = APIURLS.APIURL.GetItem;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, Data, { headers })
      .then((response) => {
        let data = response.data;
        console.log("getItem > Response data > ", data);
        this.fetchItemType(data.CatID);

        let stateData= {
          selectedItem:data,  
          Item: data,
          ItemId: data.ItemID,
          No: data.No,
          ItemType: parseInt(data.ItemType),
          Code: data.Code,
          Alias: data.Alias,
          Description1: data.Description1,
          Description2: data.Description2,
          PackingDesc1: data.PackingDesc1,
          PackingDesc2: data.PackingDesc2,
          ItemDeptId: parseInt(data.ItemDeptID),
          CatId: parseInt(data.CatID),
          IsActive: data.IsActive,
          IsTrading: data.IsTrading,
          IsNonStockValuation: data.IsNonStockValuation,
          IsCustomized: data.IsCustomized,
          IsCertified: data.IsCertified,
          CertificateNo: data.CertificateNo,
          IsSaleEvenQuantity: data.IsSaleEvenQuantity,
          Location: data.Location,
          BarcodeNo: data.BarcodeNo,
          CartonHeight: data.CartonHeight,
          CartonLength: data.CartonLength,
          CartonWidth: data.CartonWidth,
          NetWeight: data.NetWeight,
          GrossWeight: data.GrossWeight,
          WarningLevel: data.WarningLevel,
          MinStockLevel: data.MinStockLevel,
          Amsf: data.AMSF,
          Msf: data.MSF,
          Bsf: data.BSF,
          Moq: data.MOQ,
          ShipperQuantiry: data.ShipperQuantiry,
          CbmperShipper: data.CBMPerShipper,
          IsDiscontine: data.IsDiscontine,
          Reason: data.Reason,
          UserId: parseInt(getCookie(COOKIE.USERID)),
          ModifyDate: data.ModifyDate,
          TolerancePercentage: data.TolerancePercentage,
          IsQuality: data.IsQuality,
          SpecId: data.SpecID,
          AllowNegativeStock: data.AllowNegativeStock,
          ItemPostingGroupID: data.ItemPostingGroupID,
          CostingMethod: data.CostingMethod,
          StandardCost: data.StandardCost,
          IndirectCostPercentage: data.IndirectCostPercentage,
          ProfitPercentage: data.ProfitPercentage,
          GstgroupId: data.GSTGroupID,
          Hsncode: data.HSNCode,
          BaseUom: data.BaseUOM,
          SalesUom: data.SalesUOM,
          PurchaseUom: data.PurchaseUOM,
          PackingUom: data.PackingUOM,
          Replenishment: data.Replenishment,
          LeadTime: data.LeadTime,
          IsLot: data.IsLot,
          ManufacturingPolicy: data.ManufacturingPolicy,
          RoutingId: data.RoutingID,
          Bomid: data.BOMID,
          ProgressLoader: true,
        };
     
        this.setState(stateData);
      })
      .catch((error) => { });
  }

  fetchItemType(value) {
    console.log("fetchItemType > value > ", value);
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetItemTypeByCatID;
    const headers = {
      "Content-Type": "application/json",
    };
    let Datareq = {
      ValidUser: ValidUser,
      CatID: parseInt(value),
    };
    axios
      .post(Url, Datareq, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ ItemType: data, ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  setFormInputAsPerItemType=(ItemType)=>{
    try{
      if(parseInt(ItemType)===1){
      this.setState({Replenishment:1});
      }else{
        this.setState({Replenishment:0});
      }
    }catch(err){}   
  }

  getItems() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Url = APIURLS.APIURL.GetAllItems;
    const headers = {
      "Content-Type": "application/json",
    };

    
    let reqData={
      ValidUser:ValidUser,
      BranchID:0
    };
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        if (response.status === 200) {
          this.setState({ ProgressLoader: true, itemDataList: response.data });
        }
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true, ErrorPrompt: true });
      });
  }

  chkIfDuplicatePresent=(input)=>{
    let duplicatePresent=false;
    try{
      let itemDataList=this.state.itemDataList;
      for(let i=0;i<itemDataList.length;i++){
        if((itemDataList[i].Code).trim().toUpperCase()===input.toUpperCase()){
          duplicatePresent=true;
        }
      }

    }catch(err){

    }
    return duplicatePresent;
  }

  validateFormData = () => {
    let validate = false;

    let CatId = this.state.CatId;
    let Code = this.state.Code;
    let Description1 = this.state.Description1;
    let PackingDesc1 = this.state.PackingDesc1;
    let Hsncode= this.state.Hsncode;
    let BaseUom= this.state.BaseUom;
    let ItemPostingGroupID= this.state.ItemPostingGroupID;

    console.log("CatId > ",CatId);
    console.log("Code > ",Code);
    console.log("Description1 > ",Description1);
    console.log("PackingDesc1 > ",PackingDesc1);
    console.log("Hsncode > ",Hsncode);
    console.log("BaseUom > ",BaseUom);
    console.log("ItemPostingGroupID > ",ItemPostingGroupID);
    console.log("this.state.ItemType > ",this.state.ItemType);

    let netGrossWeightChk=false;
    if(parseInt(this.state.ItemType)===0){
          if(parseFloat(this.state.NetWeight)>0 && parseFloat(this.state.GrossWeight)>0){
            netGrossWeightChk=true;
          }
    }else{
      netGrossWeightChk=true;
    }

    let v1 = this.state.Validations;
    if (
      parseInt(CatId) > 0 &&
      parseInt(BaseUom) > 0 &&
      parseInt(ItemPostingGroupID) > 0 &&
      Code.trim() != "" &&
      Description1.trim() != "" &&
      PackingDesc1.trim() != "" &&
      Hsncode.trim() != "" &&
      netGrossWeightChk===true
      

    ) {
      validate = true;
    } else {
         
      if(parseInt(BaseUom)===0){
        v1.BaseUom = { errorState: true, errorMssg: "" }; 
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Base UOM Not Selected" });
        try{
          document.getElementById("BaseUom").focus();
        }catch(ex){
          console.log("Error > ex > ",ex);
        }
      }

      if(parseInt(ItemPostingGroupID)===0){
        v1.ItemPostingGroupID = { errorState: true, errorMssg: "" }; 
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Posting Group Not Selected" });
        try{
          document.getElementById("ItemPostingGroupID").focus();
        }catch(ex){
          console.log("Error > ex > ",ex);
        }
      }

      if (Code.trim() === "") { 
        v1.Code = { errorState: true, errorMssg: "" }; 
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Code Not Entered" });
        try{
          document.getElementById("Code").focus();
        }catch(ex){
          console.log("Error > ex > ",ex);
        }
        
        return false;
      }
      if (Description1.trim() === "") {
        v1.Description1 = { errorState: true, errorMssg: "" };
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Description Not Entered" });
        try {
          document.getElementById("Description1").focus();
        } catch (ex) {
          console.log("Error > ex > ", ex);
        }
        return false;
      }
      if (PackingDesc1.trim() === "") {
         v1.PackingDesc1 = { errorState: true, errorMssg: "" }; 
         this.setState({ ErrorPrompt: true, ErrorMessageProps: "PackingDesc Not Entered" });
         try {
           document.getElementById("PackingDesc1").focus();
         } catch (ex) {
           console.log("Error > ex > ", ex);
         }
         return false;
        }
      if (Hsncode.trim() === "") { 
        v1.Hsncode = { errorState: true, errorMssg: "" }; 
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Hsncode Not Entered" });
        try {
          document.getElementById("Hsncode").focus();
        } catch (ex) {
          console.log("Error > ex > ", ex);
        }
        return false;
      }
      this.setState({ Validations: v1 });
    }

    return validate;
  }
 

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "PlanningDetailsExpanded") {
        this.state.PlanningDetailsExpanded === true
          ? this.setState({ PlanningDetailsExpanded: false })
          : this.setState({ PlanningDetailsExpanded: true });
      }
      if (val === "WarehouseDetailsExpanded") {
        this.state.WarehouseDetailsExpanded === true
          ? this.setState({ WarehouseDetailsExpanded: false })
          : this.setState({ WarehouseDetailsExpanded: true });
      }
      if (val === "InvoicingDetailsExpanded") {
        this.state.InvoicingDetailsExpanded === true
          ? this.setState({ InvoicingDetailsExpanded: false })
          : this.setState({ InvoicingDetailsExpanded: true });
      }
      if (val === "ReplenishmentDetailsExpanded") {
        this.state.ReplenishmentDetailsExpanded === true
          ? this.setState({ ReplenishmentDetailsExpanded: false })
          : this.setState({ ReplenishmentDetailsExpanded: true });
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

    const updateFormValue = (param, e) => {
      switch (param) {
        case "ItemType":
          setStateParam({}, param, e.target.value);

          break;
        case "Code":
          let v1 = this.state.Validations;
          let duplicate=false;
          if(e.target.value){
            duplicate=this.chkIfDuplicatePresent(e.target.value.trim());
          }
          if(duplicate===false){
            
            if (e.target.value.length > 20) {
              v1.Code = { errorState: true, errorMssg: "Maximum 20 characters" };
              this.setState({ Validations: v1 });
              setStateParam({}, param, e.target.value)
            } else {
              v1.Code = { errorState: false, errorMssg: "" };
              this.setState({ Validations: v1 });
              setStateParam({}, param, e.target.value);
            }
          }else{
            setStateParam({}, param, e.target.value);
            this.setState({ ErrorPrompt: true, ErrorMessageProps: "Item Code Already Exist" });
            v1.Code = { errorState: true, errorMssg: "" }; 
          }

          break;
        case "Alias":
          let v2 = this.state.Validations;
          if (e.target.value.length > 20) {
            v2.Alias = { errorState: true, errorMssg: "Maximum 20 characters" };
            this.setState({ Validations: v2 });
            setStateParam({}, param, e.target.value);
          } else {
            v2.Alias = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v2 });
            setStateParam({}, param, e.target.value);
          }

          break;
        case "Description1":
          let v3 = this.state.Validations;
          if (e.target.value.length > 250) {
            v3.Description1 = {
              errorState: true,
              errorMssg: "Maximum 250 characters",
            };
            this.setState({ Validations: v3 });
            setStateParam({}, param, e.target.value);
          } else {
            v3.Description1 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v3 });
            setStateParam({}, param, e.target.value);
          }

          break;
        case "Description2":
          let v4 = this.state.Validations;
          if (e.target.value.length > 250) {
            v4.Description2 = {
              errorState: true,
              errorMssg: "Maximum 250 characters",
            };
            this.setState({ Validations: v4 });
            setStateParam({}, param, e.target.value);
          } else {
            v4.Description2 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v4 });
            setStateParam({}, param, e.target.value);
          }
          break;
        case "PackingDesc1":
          let v5 = this.state.Validations;
          if (e.target.value.length > 250) {
            v5.PackingDesc1 = {
              errorState: true,
              errorMssg: "Maximum 250 characters",
            };
            this.setState({ Validations: v5 });
            setStateParam({}, param, e.target.value);
          } else {
            v5.PackingDesc1 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v5 });
            setStateParam({}, param, e.target.value);
          }
          break;
        case "PackingDesc2":
          let v6 = this.state.Validations;
          if (e.target.value.length > 250) {
            v6.PackingDesc2 = {
              errorState: true,
              errorMssg: "Maximum 250 characters",
            };
            this.setState({ Validations: v6 });
            setStateParam({}, param, e.target.value);
          } else {
            v6.PackingDesc2 = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v6 });
            setStateParam({}, param, e.target.value);
          }
          break;
        case "ItemDeptId":
          setStateParam({}, param, e.target.value);
          break;
        case "CatId":
          
          fetchItemType(e.target.value);
          break;
        case "IsTrading":
          setStateParam({}, param, e.target.checked);

          break;
        case "IsActive":
          setStateParam({}, param, e.target.checked);
          break;
        case "IsNonStockValuation":
          setStateParam({}, param, e.target.checked);
          break;
        case "IsCustomized":
          setStateParam({}, param, e.target.checked);
          break;
        case "IsSaleEvenQuantity":
          setStateParam({}, param, e.target.checked);
          break;

        case "CertificateNo":
          this.setState({CertificateNo:e.target.value});
          let v7 = this.state.Validations;
          if (e.target.value.length > 50) {
            v7.CertificateNo = {
              errorState: true,
              errorMssg: "Maximum 50 characters",
            };
            this.setState({ Validations: v7 });
            setStateParam({}, param, e.target.value);
          } else {
            v7.CertificateNo = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v7 });
            setStateParam({}, param, e.target.value);
          }
          break;
        case "Reason":
          let v8 = this.state.Validations;
          if (e.target.value.length > 50) {
            v8.Reason = {
              errorState: true,
              errorMssg: "Maximum 50 characters",
            };
            this.setState({ Validations: v8 });
            setStateParam({}, param, e.target.value);
          } else {
            v8.Reason = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v8 });
            setStateParam({}, param, e.target.value);
          }
          break;
        case "IsDiscontine":
          setStateParam({}, param, e.target.checked);
          if (e.target.checked === true) {
            document.getElementById("Reason").focus();
          }
          break;
        case "IsCertified":
          setStateParam({}, param, e.target.checked);
          if (e.target.checked === true) {
            document.getElementById("CertificateNo").focus();
          }
          break;
        //------------------

        case "CartonHeight":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );
          break;
        case "CartonLength":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;

        case "CartonWidth":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "NetWeight":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "GrossWeight":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "WarningLevel":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "MinStockLevel":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Amsf":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Msf":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Bsf":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Moq":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "ShipperQuantiry":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "CbmperShipper":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "IsQuality":
          setStateParam({}, param, e.target.checked);

          break;
        case "SpecId":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "AllowNegativeStock":
          setStateParam({}, param, e.target.checked);
          break;
        case "ItemPostingGroupID":
          setStateParam({}, param, e.target.value);
          break;
        case "CostingMethod":
          setStateParam({}, param, e.target.value);
          break;
        case "StandardCost":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "IndirectCostPercentage":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;

        case "ProfitPercentage":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;

        case "TolerancePercentage":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;

        case "GstgroupId":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Hsncode":
          let v9 = this.state.Validations;
          if (e.target.value.length > 20) {
            v9.Hsncode = {
              errorState: true,
              errorMssg: "Maximum 20 characters",
            };
            this.setState({ Validations: v9 });
          } else {
            v9.Hsncode = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v9 });
            setStateParam({}, param, e.target.value);
          }
          break;

        case "BaseUom":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "SalesUom":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "PurchaseUom":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "PackingUom":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Replenishment":
          setStateParam({}, param, e.target.value);
          break;
        case "LeadTime":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "ManufacturingPolicy":
          setStateParam({}, param, e.target.value);
          break;
        case "RoutingId":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Bomid":
          setStateParam(
            {
              validate: true,
              isNumber: CF.chkIfNumber(e.target.value),
              isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
            },
            param,
            e.target.value
          );

          break;
        case "Location":
          setStateParam({}, param, e.target.value);
          break;
        case "BarcodeNo":
          setStateParam({}, param, e.target.value);
          break;

        case "IsLot":
          setStateParam({}, param, e.target.checked);
          break;

        //---------------------
        default:
          break;
      }
    };

    const setStateParam = (validations, key, value) => {
      console.log("validations > ", validations);
      console.log("key > ", key);
      console.log("value > ", value);
      if (
        Object.keys(validations).length === 0 &&
        validations.constructor === Object
      ) {
        console.log("validations is Empty ");
        this.setState({ [key]: value });
      } else {
        if (validations.validate) {
          !validations.isEmpty
            ? validations.isNumber
              ? this.setState({ [key]: value })
              : this.setState({ [key]: 0 })
            : this.setState({ [key]: 0 });
        } else {
          this.setState({ [key]: value });
        }
      }
    };

    const fetchItemType = (value) => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let Url = APIURLS.APIURL.GetItemTypeByCatID;
      const headers = {
        "Content-Type": "application/json",
      };
      let Datareq = {
        ValidUser: ValidUser,
        CatID: parseInt(value),
      };
      axios
        .post(Url, Datareq, { headers })
        .then((response) => {
          let data = response.data;
          console.log("data > ", data);
          if(parseInt(data)===parseInt(this.state.ItemType)){
            this.setFormInputAsPerItemType(data);
           this.setState({ 
             CatId:parseInt(value),
             ItemType: data, 
             ProgressLoader: true });
            
          }else{
            this.setState({ ProgressLoader: true,ErrorPrompt:true,ErrorMessageProps:"Category Can be changed as per same Item Type" });
          }
          
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true });
        });
    };

    const processUpdateItem = () => {
      let validate=this.validateFormData();

      if (validate === true) {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
  
        const headers = {
          "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.UpdateItem;
        let Data = {
          validUser: ValidUser,
          Item: {
            ItemID: CF.toInt(this.state.ItemId),
            No: CF.toString(this.state.No),
            ItemType: CF.toInt(this.state.ItemType),
            Code: CF.toString(this.state.Code).trim(),
            Alias: CF.toString(this.state.Alias).trim(),
            Description1: CF.toString(this.state.Description1).trim(),
            Description2: CF.toString(this.state.Description2).trim(),
            PackingDesc1: CF.toString(this.state.PackingDesc1).trim(),
            PackingDesc2: CF.toString(this.state.PackingDesc2).trim(),
            ItemDeptID: CF.toInt(this.state.ItemDeptId),
            CatID: CF.toInt(this.state.CatId),
            IsActive: this.state.IsActive,
            IsTrading: this.state.IsTrading,
            IsNonStockValuation: this.state.IsNonStockValuation,
            IsCustomized: this.state.IsCustomized,
            IsCertified: this.state.IsCertified,
            CertificateNo: this.state.CertificateNo.trim(),
            IsSaleEvenQuantity: this.state.IsSaleEvenQuantity,
            Location: CF.toString(this.state.Location).trim(),
            BarcodeNo: CF.toString(this.state.BarcodeNo).trim(),
            CartonHeight: CF.toFloat(this.state.CartonHeight),
            CartonLength: CF.toFloat(this.state.CartonLength),
            CartonWidth: CF.toFloat(this.state.CartonWidth),
            NetWeight: CF.toFloat(this.state.NetWeight),
            GrossWeight: CF.toFloat(this.state.GrossWeight),
            WarningLevel: CF.toFloat(this.state.WarningLevel),
            MinStockLevel: CF.toFloat(this.state.MinStockLevel),
            AMSF: CF.toFloat(this.state.Amsf),
            MSF: CF.toFloat(this.state.Msf),
            BSF: CF.toFloat(this.state.Bsf),
            MOQ: CF.toFloat(this.state.Moq),
            ShipperQuantiry: CF.toFloat(this.state.ShipperQuantiry),
            CBMPerShipper: CF.toFloat(this.state.CbmperShipper),
            IsDiscontine: this.state.IsDiscontine,
            Reason: CF.toString(this.state.Reason).trim(),
            UserID: CF.toInt(getCookie(COOKIE.USERID)),
            ModifyDate: this.state.ModifyDate,
            TolerancePercentage: CF.toFloat(this.state.TolerancePercentage),
            IsQuality: this.state.IsQuality,
            SpecID: CF.toInt(this.state.SpecId),
            AllowNegativeStock: this.state.AllowNegativeStock,
            ItemPostingGroupID: CF.toInt(this.state.ItemPostingGroupID),
            CostingMethod: CF.toInt(this.state.CostingMethod),
            StandardCost: CF.toFloat(this.state.StandardCost),
            IndirectCostPercentage: CF.toFloat(this.state.IndirectCostPercentage),
            ProfitPercentage: CF.toFloat(this.state.ProfitPercentage),
            GSTGroupID: CF.toInt(this.state.GstgroupId),
            HSNCode: this.state.Hsncode,
            BaseUOM: CF.toInt(this.state.BaseUom),
            SalesUOM: CF.toInt(this.state.SalesUom),
            PurchaseUOM: CF.toInt(this.state.PurchaseUom),
            PackingUOM: CF.toInt(this.state.PackingUom),
            Replenishment: CF.toInt(this.state.Replenishment),
            LeadTime: CF.toFloat(this.state.LeadTime),
            IsLot: this.state.IsLot,
            ManufacturingPolicy: CF.toInt(this.state.ManufacturingPolicy),
            RoutingID: CF.toInt(this.state.RoutingId),
            BOMID: CF.toInt(this.state.Bomid),
          },
        };
  
        console.log("data > ", Data);
  
  
        axios
          .post(Url, Data, { headers })
          .then((response) => {
            let data = response.data;
            if (response.status === 200 || response.status === 201) {
              this.setState({ ProgressLoader: true, SuccessPrompt: true });
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
            }
          })
          .catch((error) => { });
      }else{
        // this.setState({ ErrorPrompt: true, ErrorMessageProps: "Input Data Not Proper" });
      }

    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.itemMaster + this.state.urlparams}
          masterLinkTitle="Item"
          typoTitle="Edit"
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
            onClick={(e) => processUpdateItem()}
            disabled={this.state.Updatebtn}
          >
            {APIURLS.buttonTitle.save.name}
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
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Accordion
                  key="Item-General-Details"
                  expanded={this.state.GeneralDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) =>
                          handleAccordionClick("GeneralDetailsExpanded", e)
                        }
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("GeneralDetailsExpanded", e)
                    }
                  >
                    <Typography key="" className="accordion-Header-Title">
                      General
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                            <SIB
                                id="ItemNo"
                                label="Item No."
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("ItemNo", e)}
                                value={this.state.No}
                                disabled={true}
                                isMandatory={true}
                              />
                              <SDIB
                                id="CatID"
                                label="Category"
                                onChange={(e) => updateFormValue("CatId", e)}
                                param={this.state.ItemCategoryData}
                                value={this.state.CatId}
                                isMandatory={true}

                              />

                              <SDIB
                                id="ItemType"
                                label="Item Type"
                                onChange={(e) => updateFormValue("ItemType", e)}
                                param={APIURLS.ItemType}
                                value={this.state.ItemType}
                                disabled={true}
                              />

                              <SIB
                                id="Code"
                                label="Code"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Code", e)}
                                value={this.state.Code}
                                error={this.state.Validations.Code.errorState}
                                isMandatory={true}
                              />
                              <SIB
                                id="Alias"
                                label="Alias"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Alias", e)}
                                value={this.state.Alias}
                                error={this.state.Validations.Alias.errorState}
                              />
                              <SIB
                                id="Description1"
                                label="Description"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("Description1", e)
                                }
                                value={this.state.Description1}
                                error={
                                  this.state.Validations.Description1.errorState
                                }
                                isMandatory={true}
                              />
                              <SIB
                                id="Description2"
                                label="Description 2"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("Description2", e)
                                }
                                value={this.state.Description2}
                                error={
                                  this.state.Validations.Description2.errorState
                                }
                              />

                              <SIB
                                id="PackingDesc1"
                                label="Packing Desc"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("PackingDesc1", e)
                                }
                                value={this.state.PackingDesc1}
                                error={
                                  this.state.Validations.PackingDesc1.errorState
                                }
                                isMandatory={true}
                              />
                              <SIB
                                id="PackingDesc2"
                                label="Packing Desc 2"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("PackingDesc2", e)
                                }
                                value={this.state.PackingDesc2}
                                error={
                                  this.state.Validations.PackingDesc2.errorState
                                }
                              />
                              <SSIB
                                key="IsSaleEvenQuantity"
                                id="IsSaleEvenQuantity"
                                label="Sale Even Quantity ?"
                                param={this.state.IsSaleEvenQuantity}
                                onChange={(e) =>
                                  updateFormValue("IsSaleEvenQuantity", e)
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>

                              <SDIB
                                id="ItemDeptID"
                                label="Item Department"
                                onChange={(e) =>
                                  updateFormValue("ItemDeptId", e)
                                }
                                param={this.state.itemDepartmentMasterData}
                                value={this.state.ItemDeptId}

                              />

                              <SSIB
                                key="IsTrading"
                                id="IsTrading"
                                label="Trading ?"
                                param={this.state.IsTrading}
                                onChange={(e) =>
                                  updateFormValue("IsTrading", e)
                                }
                              />

                              <SSIB
                                key="IsActive"
                                id="IsActive"
                                label="Active ?"
                                param={this.state.IsActive}
                                onChange={(e) => updateFormValue("IsActive", e)}
                              />
                              <SSIB
                                key="IsNonStockValuation"
                                id="IsNonStockValuation"
                                label="Non Stk Valuation?"
                                param={this.state.IsNonStockValuation}
                                onChange={(e) =>
                                  updateFormValue("IsNonStockValuation", e)
                                }
                              />
                              <SSIB
                                key="IsCustomized"
                                id="IsCustomized"
                                label="Customized ?"
                                param={this.state.IsCustomized}
                                onChange={(e) =>
                                  updateFormValue("IsCustomized", e)
                                }
                              />


                              <SSIB
                                key="IsCertified"
                                id="IsCertified"
                                label="Certified ? "
                                param={this.state.IsCertified}
                                onChange={(e) =>
                                  updateFormValue("IsCertified", e)
                                }
                              />

                              <SIB
                                id="CertificateNo"
                                label="Certificate No."
                                variant="outlined"
                                size="small"                                
                                onChange={(e) =>  updateFormValue("CertificateNo", e)}
                                value={this.state.CertificateNo}
                                disabled={!this.state.IsCertified}
                                error={
                                  this.state.Validations.CertificateNo
                                    .errorState
                                }
                              />

                              <SSIB
                                key="IsDiscontine"
                                id="IsDiscontine"
                                label="Discontinue ?"
                                param={this.state.IsDiscontine}
                                onChange={(e) =>
                                  updateFormValue("IsDiscontine", e)
                                }
                              />

                              <SIB
                                id="Reason"
                                label="Reason"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Reason", e)}
                                value={this.state.Reason}
                                disabled={!this.state.IsDiscontine}
                                error={this.state.Validations.Reason.errorState}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  key="Item-Planing-Details"
                  expanded={this.state.PlanningDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) =>
                          handleAccordionClick("PlanningDetailsExpanded", e)
                        }
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("PlanningDetailsExpanded", e)
                    }
                  >
                    <Typography key="" className="accordion-Header-Title">
                      Planning
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SIB
                                id="CartonHeight"
                                label="Height"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("CartonHeight", e)
                                }
                                value={this.state.CartonHeight}
                              />
                              <SIB
                                id="CartonLength"
                                label="Length"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("CartonLength", e)
                                }
                                value={this.state.CartonLength}
                              />
                              <SIB
                                id="CartonWidth"
                                label="Width"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("CartonWidth", e)
                                }
                                value={this.state.CartonWidth}
                              />

                              <SIB
                                id="WarningLevel"
                                label="Warning Level"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("WarningLevel", e)
                                }
                                value={this.state.WarningLevel}
                              />
                              <SIB
                                id="MinStockLevel"
                                label="MSL"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("MinStockLevel", e)
                                }
                                value={this.state.MinStockLevel}
                              />
                              <SIB
                                id="AMSF"
                                label="AMSF"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Amsf", e)}
                                value={this.state.Amsf}
                              />
                              <SIB
                                id="MSF"
                                label="MSF"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Msf", e)}
                                value={this.state.Msf}
                              />
                              <SIB
                                id="BSF"
                                label="BSF"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Bsf", e)}
                                value={this.state.Bsf}
                              />
                              <SIB
                                id="MOQ"
                                label="MOQ"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Moq", e)}
                                value={this.state.Moq}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SIB
                                id="ShipperQuantity"
                                label="Shipper Quantity"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("ShipperQuantiry", e)
                                }
                                value={this.state.ShipperQuantiry}
                              />
                              <SIB
                                id="CBMPerShipper"
                                label="CBM/Shipper"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("CbmperShipper", e)
                                }
                                value={this.state.CbmperShipper}
                              />
                              <SSIB
                                key="IsQuality"
                                id="IsQuality"
                                label="Quality ?"
                                param={this.state.IsQuality}
                                onChange={(e) =>
                                  updateFormValue("IsQuality", e)
                                }
                              />

                              <SDIB
                                id="SpecID"
                                label="Specification"
                                onChange={(e) => updateFormValue("SpecId", e)}
                                param={this.state.SpecIDList}
                                value={this.state.SpecId}
                              />


                              <SSIB
                                key="AllowNegativeStock"
                                id="AllowNegativeStock"
                                label="Negative Stock ?"
                                param={this.state.AllowNegativeStock}
                                onChange={(e) =>
                                  updateFormValue("AllowNegativeStock", e)
                                }
                              />

                              <SDIB
                                id="PostingGroup"
                                label="Posting Group"
                                onChange={(e) =>
                                  updateFormValue("ItemPostingGroupID", e)
                                }
                                param={this.state.ItemPostingGroupList}
                                value={this.state.ItemPostingGroupID}
                                isMandatory={true}
                              />

                              <SDIB
                                id="CostingMethod"
                                label="Costing Method"
                                onChange={(e) =>
                                  updateFormValue("CostingMethod", e)
                                }
                                param={APIURLS.CostingMethod}
                                value={this.state.CostingMethod}
                              />

                              <SIB
                                id="NetWeight"
                                label="Net Weight"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("NetWeight", e)
                                }
                                value={this.state.NetWeight}
                                isMandatory={this.state.ItemType===0?true:false}
                              />
                              <SIB
                                id="GrossWeight"
                                label="Gross Weight"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("GrossWeight", e)
                                }
                                value={this.state.GrossWeight}
                                isMandatory={this.state.ItemType===0?true:false}
                              />
                              {/* 
                              <SIB
                                id="StandardCost"
                                label="Standard Cost"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("StandardCost", e)
                                }
                                value={this.state.StandardCost}
                              />
                              <SIB
                                id="IndirectCostPercentage"
                                label="Indirect Cost Percentage"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("IndirectCostPercentage", e)
                                }
                                value={this.state.IndirectCostPercentage}
                              />
                              <SIB
                                id="ProfitPercentage"
                                label="Profit Percentage"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("ProfitPercentage", e)
                                }
                                value={this.state.ProfitPercentage}
                              /> */}


                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  key="Item-Planing-Details"
                  expanded={this.state.InvoicingDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) =>
                          handleAccordionClick("InvoicingDetailsExpanded", e)
                        }
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("InvoicingDetailsExpanded", e)
                    }
                  >
                    <Typography key="" className="accordion-Header-Title">
                      Invoicing
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SIB
                                id="TolerancePercentage"
                                label="Tolerance %"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("TolerancePercentage", e)
                                }
                                value={this.state.TolerancePercentage}
                              />

                              {/* <SIB
                                id="GSTGroupID"
                                label="GST GroupID"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("GstgroupId", e)
                                }
                                value={this.state.GstgroupId}
                              /> */}

                              <SDIB
                                id="GSTGroupID"
                                label="GST Group"
                                onChange={(e) =>
                                  updateFormValue("GstgroupId", e)
                                }
                                param={this.state.GSTGroupList}
                                value={this.state.GstgroupId}
                              />

                              <SIB
                                id="HSNCode"
                                label="HSN Code"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Hsncode", e)}
                                value={this.state.Hsncode}
                                error={
                                  this.state.Validations.Hsncode.errorState
                                }
                                isMandatory={true}
                              />



                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SDIB
                                id="BaseUOM"
                                label="Base UOM"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("BaseUom", e)}
                                value={this.state.BaseUom}
                                param={this.state.UOMList}
                                isMandatory={true}
                              />
                              <SDIB
                                id="SalesUOM"
                                label="Sales UOM"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("SalesUom", e)}
                                value={this.state.SalesUom}
                                param={this.state.UOMList}
                              />
                              <SDIB
                                id="PurchaseUOM"
                                label="Purchase UOM"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("PurchaseUom", e)
                                }
                                value={this.state.PurchaseUom}
                                param={this.state.UOMList}
                              />
                              <SDIB
                                id="PackingUOM"
                                label="Packing UOM"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("PackingUom", e)
                                }
                                value={this.state.PackingUom}
                                param={this.state.UOMList}
                              />
                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
                <Accordion
                  key="Item-Planing-Details"
                  expanded={this.state.ReplenishmentDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) =>
                          handleAccordionClick(
                            "ReplenishmentDetailsExpanded",
                            e
                          )
                        }
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("ReplenishmentDetailsExpanded", e)
                    }
                  >
                    <Typography key="" className="accordion-Header-Title">
                      Replenishment
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SDIB
                                id="Replenishment"
                                label="Replenishment"
                                onChange={(e) =>
                                  updateFormValue("Replenishment", e)
                                }
                                param={APIURLS.Replenishment}
                                value={this.state.Replenishment}
                              />

                              <SIB
                                id="LeadTime"
                                label="Lead Time"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("LeadTime", e)}
                                value={this.state.LeadTime}
                              />

                              <SDIB
                                id="ManufacturingPolicy"
                                label="Manuf. Policy"
                                onChange={(e) =>
                                  updateFormValue("ManufacturingPolicy", e)
                                }
                                param={APIURLS.ManufacturingPolicy}
                                value={this.state.ManufacturingPolicy}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>

                              <SDIB
                                id="RoutingID"
                                label="Routing"
                                onChange={(e) =>
                                  updateFormValue("RoutingId", e)
                                }
                                param={[]}
                                value={this.state.RoutingId}
                              />

                              <SDIB
                                id="BOMID"
                                label="BOM"
                                onChange={(e) => updateFormValue("Bomid", e)}
                                param={[]}
                                value={this.state.Bomid}
                              />


                            </Grid>
                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>

                <Accordion
                  key="Item-Planing-Details"
                  expanded={this.state.WarehouseDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={
                      <ExpandMoreIcon
                        onClick={(e) =>
                          handleAccordionClick("WarehouseDetailsExpanded", e)
                        }
                      />
                    }
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("WarehouseDetailsExpanded", e)
                    }
                  >
                    <Typography key="" className="accordion-Header-Title">
                      Warehouse
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div>
                          <Grid container spacing={0}>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SIB
                                id="Location"
                                label="Location"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Location", e)}
                                value={this.state.Location}
                              />


                              <SSIB
                                key="IsLot"
                                id="IsLot"
                                label="Lot Active ?"
                                param={this.state.IsLot}
                                onChange={(e) => updateFormValue("IsLot", e)}
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SIB
                                id="BarcodeNo"
                                label="Barcode"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("BarcodeNo", e)
                                }
                                value={this.state.BarcodeNo}
                              />
                            </Grid>

                          </Grid>
                        </div>
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Grid>
            </Grid>
            <div style={{ height: 50 }}></div>
          </Grid>
          <Grid item  xs={12} sm={12} md={4} lg={4}>
          <Itemquickdetails item={this.state} />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default editItem;
