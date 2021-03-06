import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
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
import * as CF from "../../../services/functions/customfunctions";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../compo/backdrop";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";

class addItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BranchID:0,
      GeneralDetailsExpanded: true,
      PlanningDetailsExpanded: false,
      WarehouseDetailsExpanded: false,
      InvoicingDetailsExpanded: false,
      ReplenishmentDetailsExpanded: false,
      ErrorMessageProps:"",
      SuccessPrompt: false,
      ErrorPrompt: false,
      ProgressLoader: true,
      Disablebtn:false,
      urlparams: "",
      ItemTypeMaster: APIURLS.ItemType,
      itemDataList:[],
      ItemType: APIURLS.ItemType[0].value,
      No: "",
      Code: "",
      Alias: "",
      Description1: "",
      Description2: "",
      PackingDesc1: "",
      PackingDesc2: "",
      ItemDeptId: 0,
      CatId: 0,     
      IsActive: true,
      IsTrading: false,
      IsNonStockValuation: false,
      IsCustomized: false,
      IsSaleEvenQuantity: false,
      IsCertified: false,
      CertificateNo: "",
      IsDiscontine: false,
      Reason: "",
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

      ManufacturingPolicy: 0,
      RoutingId: 0,
      Bomid: 0,
      IsLot: false,
      Location: "",
      BarcodeNo: "",
      Price:0.00,
      itemDepartmentMasterData: [],
      ItemCategoryData: [],
      UOMList: [],
      GSTGroupList:[],
      SpecIDList:[],
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
        BaseUom: { errorState: false, errorMssg: "" },
        ItemPostingGroupID: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getItems();
    this.getitemDepartmentMasterData();
    this.getItemCategoryData();
    this.getUOMList();
    this.GSTGroupList();
    this.getSpecIDList();
    this.getAllItemPostingGroup();
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
      BranchID:branchId
    });
  }

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
      .catch((error) => {});
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
      .catch((error) => {});
  };

  getUOMList = () => {
    this.setState({ ProgressLoader: false });
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
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
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

  processItemCategoryData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].IsActive === true) {
        let d = {
          name: data[i].Code,
          value: data[i].CatID,
          HSNCode:data[i].HSNCode,
          IsCustomized:data[i].IsCustomized,
          IsNonStockValuation:data[i].IsNonStockValuation,
          IsTrading:data[i].IsTrading
        };
        newData.push(d);
      }
    }
    this.setState({ ItemCategoryData: newData }, () => {
      let target = document.querySelector("#CatID");
      let CatID = target.options[target.selectedIndex].value;
      console.log("CatID>>", CatID);
    });
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
          name: data[i].code + "-" + data[i].name,
          value: data[i].itemDeptId,
        };
        newData.push(d);
      }
    }
    console.log("processDepartmentList > newData > ", newData);
    this.setState({ itemDepartmentMasterData: newData }, () => {
      let target = document.querySelector("#ItemDeptID");
      let ItemDeptID = target.options[target.selectedIndex].value;

      console.log("ItemDeptID>>", ItemDeptID);
    });
  }

  initializeFormInputs=(CatID)=>{
    let ItemCategoryData=this.state.ItemCategoryData;
    console.log("CatID >>", CatID);
    console.log("ItemCategoryData >>", ItemCategoryData);
    for(let i=0;i<ItemCategoryData.length;i++){
      if(parseInt(ItemCategoryData[i].value)===parseInt(CatID)){
        this.setState({
          Hsncode:ItemCategoryData[i].HSNCode,
          IsTrading: ItemCategoryData[i].IsTrading,
          IsNonStockValuation: ItemCategoryData[i].IsNonStockValuation,
          IsCustomized: ItemCategoryData[i].IsCustomized,
        });
        break;
      }
    }
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

  validateFormData = () => {
    let validate = false;

    let CatId = this.state.CatId;
    let Code = this.state.Code;
    let Description1 = this.state.Description1;
    let PackingDesc1 = this.state.PackingDesc1;
    let Hsncode= this.state.Hsncode;
    let BaseUom= this.state.BaseUom;
    let ItemPostingGroupID= this.state.ItemPostingGroupID;

    let duplicate=this.chkIfDuplicatePresent(Code.trim());

    console.log("CatId > ",CatId);
    console.log("Code > ",Code);
    console.log("Description1 > ",Description1);
    console.log("PackingDesc1 > ",PackingDesc1);
    console.log("Hsncode > ",Hsncode);
    console.log("BaseUom > ",BaseUom);
    console.log("ItemPostingGroupID > ",ItemPostingGroupID);
    console.log("this.state.ItemType > ",this.state.ItemType);
    console.log("duplicate Code > ",duplicate);

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
      netGrossWeightChk===true &&
      duplicate===false      

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

      if(duplicate===true){
        v1.Code = { errorState: true, errorMssg: "" }; 
        this.setState({ ErrorPrompt: true, ErrorMessageProps: "Item Code Already Exist" });
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

  openPage = (url) => {
    this.setState({ ProgressLoader: false });
    window.location = url;
  };

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
          this.initializeFormInputs(e.target.value);
          setStateParam({}, param, e.target.value);
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
            setStateParam({}, param, e.target.value);
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
          this.setFormInputAsPerItemType(data);
          this.setState({ ItemType: data, ProgressLoader: true });
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true });
        });
      console.log(this.state.ItemType);
    };

    const processCreateItem = () => {
     let validate=this.validateFormData();

      if (validate === true) {
        this.setState({ ProgressLoader: false });
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);

        let ItemType = CF.toInt(this.state.ItemType);
        let NoSeriesID = 0;
        if (ItemType === 0) {
          NoSeriesID = 4;
        }
        if (ItemType === 1) {
          NoSeriesID = 5;
        }
        if (ItemType === 2) {
          NoSeriesID = 6;
        }

        const headers = {
          "Content-Type": "application/json",
        };
        let reqData = {
          ValidUser: ValidUser,
          DocumentNumber: {
            NoSeriesID: NoSeriesID,
            TransDate: moment().format("MM-DD-YYYY"),
          },
        };
        let Url1 = APIURLS.APIURL.GetMasterDocumentNumber;

        axios
          .post(Url1, reqData, { headers })
          .then((response) => {
            let NoData = response.data;
            console.log("---> No Series DATA > ", NoData);

            let Item = {
              No: CF.toString(NoData),
              ItemType: CF.toInt(this.state.ItemType),
              Code: CF.toString(this.state.Code).trim(),
              Alias: CF.toString(this.state.Alias).trim(),
              Description1: CF.toString(this.state.Description1).trim(),
              Description2: CF.toString(this.state.Description2).trim(),
              PackingDesc1: CF.toString(this.state.PackingDesc1).trim(),
              PackingDesc2: CF.toString(this.state.PackingDesc2).trim(),
              ItemDeptId: CF.toInt(this.state.ItemDeptId),
              CatId: CF.toInt(this.state.CatId),
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
              Amsf: CF.toFloat(this.state.Amsf),
              Msf: CF.toFloat(this.state.Msf),
              Bsf: CF.toFloat(this.state.Bsf),
              Moq: CF.toFloat(this.state.Moq),
              ShipperQuantiry: CF.toFloat(this.state.ShipperQuantiry),
              CbmperShipper: CF.toFloat(this.state.CbmperShipper),
              IsDiscontine: this.state.IsDiscontine,
              Reason: CF.toString(this.state.Reason).trim(),
              UserId: CF.toInt(getCookie(COOKIE.USERID)),
              ModifyDate: this.state.ModifyDate,
              TolerancePercentage: CF.toFloat(this.state.TolerancePercentage),
              IsQuality: this.state.IsQuality,
              SpecId: CF.toInt(this.state.SpecId),
              AllowNegativeStock: this.state.AllowNegativeStock,
              ItemPostingGroupID: CF.toInt(this.state.ItemPostingGroupID),
              CostingMethod: CF.toInt(this.state.CostingMethod),
              StandardCost: CF.toFloat(this.state.StandardCost),
              IndirectCostPercentage: CF.toFloat(
                this.state.IndirectCostPercentage
              ),
              ProfitPercentage: CF.toFloat(this.state.ProfitPercentage),
              GstgroupId: CF.toInt(this.state.GstgroupId),
              Hsncode: this.state.Hsncode,
              BaseUom: CF.toInt(this.state.BaseUom),
              SalesUom: CF.toInt(this.state.SalesUom),
              PurchaseUom: CF.toInt(this.state.PurchaseUom),
              PackingUom: CF.toInt(this.state.PackingUom),
              Replenishment: CF.toInt(this.state.Replenishment),
              LeadTime: CF.toFloat(this.state.LeadTime),
              IsLot: this.state.IsLot,
              ManufacturingPolicy: CF.toInt(this.state.ManufacturingPolicy),
              RoutingId: CF.toInt(this.state.RoutingId),
              Bomid: CF.toInt(this.state.Bomid),
            };

            let Url = APIURLS.APIURL.CreateItem;
            let ReqData = {
              validUser: ValidUser,
              Item: Item,
            };
            console.log("ReqData > ", ReqData);
            axios
              .post(Url, ReqData, { headers })
              .then((response) => {
                let data = response.data;
                if (

                  response.status === 201 || response.status === 200 ||
                  response.data.status === true ||
                  response.data.status === "true"
                ) {
                  this.setState({ ProgressLoader: true, SuccessPrompt: true });
                  this.openPage(URLS.URLS.editItem + this.state.urlparams + "&edititemId=" + data.ID);
                } else {
                  this.setState({ ProgressLoader: true, ErrorPrompt: true });
                }
              })
              .catch((error) => {
                this.setState({ ProgressLoader: true, ErrorPrompt: true });
              });
          })
          .catch((error) => {
            this.setState({ ErrorPrompt: true, Loader: true });
          });
      } else {
       
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
          typoTitle="Add"
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
            className="action-btns"
            startIcon={APIURLS.buttonTitle.save.icon}
            onClick={(e) => processCreateItem()}
            disabled={this.state.Disablebtn}
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
          <Grid item xs={8}>
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
                                // onChange={(e) => updateFormValue("ItemType", e)}
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
                                label="Certified ?"
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
                                onBlur={(e) =>
                                  updateFormValue("CertificateNo", e)
                                }
                                defaultValue={this.state.CertificateNo}
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
                                disabled={!this.state.IsDiscontine}
                                value={this.state.Reason}
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
                                type="number"
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
                                label="Is Quality ?"
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
                                label="Indirect Cost %"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("IndirectCostPercentage", e)
                                }
                                value={this.state.IndirectCostPercentage}
                              />
                              <SIB
                                id="ProfitPercentage"
                                label="Profit %"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("ProfitPercentage", e)
                                }
                                value={this.state.ProfitPercentage}
                              />

                              <SIB
                                id="ItemPriceDisplay"
                                label="Price"
                                variant="outlined"
                                size="small"                               
                                value={this.state.Price}
                                disabled={true}
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
                                onChange={(e) => updateFormValue("BaseUom", e)}
                                param={this.state.UOMList}
                                value={this.state.BaseUom}
                                isMandatory={true}
                              />
                              <SDIB
                                id="SalesUOM"
                                label="Sales UOM"
                                onChange={(e) => updateFormValue("SalesUom", e)}
                                param={this.state.UOMList}
                                value={this.state.SalesUom}
                              />

                              <SDIB
                                id="PurchaseUOM"
                                label="Purchase UOM"
                                onChange={(e) =>
                                  updateFormValue("PurchaseUom", e)
                                }
                                param={this.state.UOMList}
                                value={this.state.PurchaseUom}
                              />

                              <SDIB
                                id="PackingUOM"
                                label="Packing UOM"
                                onChange={(e) =>
                                  updateFormValue("PackingUom", e)
                                }
                                param={this.state.UOMList}
                                value={this.state.PackingUom}
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
          <Grid item xs={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default addItem;
