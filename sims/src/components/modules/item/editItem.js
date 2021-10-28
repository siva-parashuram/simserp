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

class editItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GeneralDetailsExpanded: true,
      PlanningDetailsExpanded: false,
      WarehouseDetailsExpanded: false,
      InvoicingDetailsExpanded: false,
      ReplenishmentDetailsExpanded: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      urlparams: "",
      itemDepartmentMasterData: [],
      ItemTypeMaster: APIURLS.ItemType,
      ItemId: 0,
      ItemNo: 0,
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
      CostingMethod: "-",
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
      
    };
  }

  componentDidMount() {
    this.getItemCategoryData();
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
        urlparams: urlparams,
        ItemId: ItemId,
      },
      () => {
        this.getItem();
        this.getitemDepartmentMasterData();
      }
    );
  }

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
      if (data[i].isActive === true) {
        let d = {
          name: data[i].code + " - " + data[i].hsncode,
          value: data[i].catId,
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
        this.fetchItemType(data.catId);
        this.setState({
          Item: data,
          ItemId: data.itemId,
          ItemNo: data.itemNo,
          ItemType: parseInt(data.itemType),
          Code: data.code,
          Alias: data.alias,
          Description1: data.description1,
          Description2: data.description2,
          PackingDesc1: data.packingDesc1,
          PackingDesc2: data.packingDesc2,
          ItemDeptId: data.itemDeptID,
          CatId: data.catId,
          IsActive: data.isActive,
          IsTrading: data.isTrading,
          IsNonStockValuation: data.isNonStockValuation,
          IsCustomized: data.isCustomized,
          IsCertified: data.isCertified,
          CertificateNo: data.certificateNo,
          IsSaleEvenQuantity: data.isSaleEvenQuantity,
          Location: data.location,
          BarcodeNo: data.barcodeNo,
          CartonHeight: data.cartonHeight,
          CartonLength: data.cartonLength,
          CartonWidth: data.cartonWidth,
          NetWeight: data.netWeight,
          GrossWeight: data.grossWeight,
          WarningLevel: data.warningLevel,
          MinStockLevel: data.minStockLevel,
          Amsf: data.amsf,
          Msf: data.msf,
          Bsf: data.bsf,
          Moq: data.moq,
          ShipperQuantiry: data.shipperQuantiry,
          CbmperShipper: data.cbmperShipper,
          IsDiscontine: data.isDiscontine,
          Reason: data.Reason,
          UserId: parseInt(getCookie(COOKIE.USERID)),
          ModifyDate: data.modifyDate,
          TolerancePercentage: data.tolerancePercentage,
          IsQuality: data.isQuality,
          SpecId: data.specId,
          AllowNegativeStock: data.allowNegativeStock,
          ItemPostingGroupID: data.itemPostingGroupID,
          CostingMethod: data.costingMethod,
          StandardCost: data.standardCost,
          IndirectCostPercentage: data.indirectCostPercentage,
          ProfitPercentage: data.profitPercentage,
          GstgroupId: data.gstgroupId,
          Hsncode: data.hsncode,
          BaseUom: data.baseUom,
          SalesUom: data.salesUom,
          PurchaseUom: data.purchaseUom,
          PackingUom: data.packingUom,
          Replenishment: data.replenishment,
          LeadTime: data.leadTime,
          IsLot: data.isLot,
          ManufacturingPolicy: data.manufacturingPolicy,
          RoutingId: data.routingId,
          Bomid: data.bomid,
          ProgressLoader: true,
        });
      })
      .catch((error) => {});
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
          this.setState({ ItemType: e.target.value });
          break;
        case "Code":
          this.setState({ Code: e.target.value });
          break;
        case "Alias":
          this.setState({ Alias: e.target.value });
          break;
        case "Description1":
          this.setState({ Description1: e.target.value });
          break;
        case "Description2":
          this.setState({ Description2: e.target.value });
          break;
        case "PackingDesc1":
          this.setState({ PackingDesc1: e.target.value });
          break;
        case "PackingDesc2":
          this.setState({ PackingDesc2: e.target.value });
          break;
        case "ItemDeptID":
          this.setState({ ItemDeptID: e.target.value });
          break;
        case "CatID":
          this.setState({ CatID: e.target.value });
          fetchItemType(e.target.value);
          break;
        case "IsTrading":
          this.setState({ IsTrading: e.target.checked });
          break;
        case "IsActive":
          this.setState({ IsActive: e.target.checked });
          break;
        case "IsNonStockValuation":
          this.setState({ IsNonStockValuation: e.target.checked });
          break;
        case "IsCustomized":
          this.setState({ IsCustomized: e.target.checked });
          break;
        case "IsSaleEvenQuantity":
          this.setState({ IsSaleEvenQuantity: e.target.checked });
          break;

        case "CertificateNo":
          this.setState({ CertificateNo: e.target.value });
          break;
        case "Reason":
          this.setState({ Reason: e.target.value });
          break;
        case "IsDiscontine":
          this.setState({ IsDiscontine: e.target.checked });
          if (e.target.checked === true) {
            document.getElementById("Reason").focus();
          }
          break;
        case "IsCertified":
          setStateParam({},param,e.target.checked);
          if (e.target.checked === true) {
            document.getElementById("CertificateNo").focus();
          }
          break;
        //------------------
        
        case "CartonHeight":          
          setStateParam({
            validate: true,
            isNumber: CF.chkIfNumber(e.target.value),
            isEmpty: CF.chkIfBlankOrEmpty(e.target.value),
          }, param, e.target.value);
          break;
        case "CartonLength":
          
          
          this.setState({ CartonLength: e.target.value });
          break;

        case "CartonWidth":
          this.setState({ CartonWidth: e.target.value });
          break;
        case "NetWeight":
          this.setState({ NetWeight: e.target.value });
          break;
        case "GrossWeight":
          this.setState({ GrossWeight: e.target.value });
          break;
        case "WarningLevel":
          this.setState({ WarningLevel: e.target.value });
          break;
        case "MinStockLevel":
          this.setState({ MinStockLevel: e.target.value });
          break;
        case "AMSF":
          this.setState({ Amsf: e.target.value });
          break;
        case "MSF":
          this.setState({ Msf: e.target.value });
          break;
        case "BSF":
          this.setState({ Bsf: e.target.value });
          break;
        case "MOQ":
          this.setState({ Moq: e.target.value });
          break;
        case "ShipperQuantity":
          this.setState({ ShipperQuantiry: e.target.value });
          break;
        case "CBMPerShipper":
          this.setState({ CbmperShipper: e.target.value });
          break;
        case "IsQuality":
          this.setState({ IsQuality: e.target.checked });
          break;
        case "SpecID":
          this.setState({ SpecId: e.target.value });
          break;
        case "AllowNegativeStock":
          this.setState({ AllowNegativeStock: e.target.checked });
          break;
        case "PostingGroup":
          this.setState({ ItemPostingGroupID: e.target.value });
          break;
        case "CostingMethod":
          this.setState({ CostingMethod: e.target.value });
          break;
        case "StandardCost":
          this.setState({ StandardCost: e.target.value });
          break;
        case "IndirectCostPercentage":
          this.setState({ IndirectCostPercentage: e.target.value });
          break;

        case "ProfitPercentage":
          this.setState({ ProfitPercentage: e.target.value });
          break;

        case "TolerancePercentage":
          this.setState({ TolerancePercentage: e.target.value });
          break;

        case "GSTGroupID":
          this.setState({ GstgroupId: e.target.value });
          break;
        case "HSNCode":
          this.setState({ Hsncode: e.target.value });
          break;

        case "BaseUOM":
          this.setState({ BaseUom: e.target.value });
          break;
        case "SalesUOM":
          this.setState({ SalesUom: e.target.value });
          break;
        case "PurchaseUOM":
          this.setState({ PurchaseUom: e.target.value });
          break;
        case "PackingUOM":
          this.setState({ PackingUom: e.target.value });
          break;
        case "Replenishment":
          this.setState({ Replenishment: e.target.value });
          break;
        case "LeadTime":
          this.setState({ LeadTime: e.target.value });
          break;
        case "ManufacturingPolicy":
          this.setState({ ManufacturingPolicy: e.target.value });
          break;
        case "RoutingID":
          this.setState({ RoutingId: e.target.value });
          break;
        case "BOMID":
          this.setState({ Bomid: e.target.value });
          break;
        case "Location":
          this.setState({ Location: e.target.value });
          break;
        case "BarcodeNo":
          this.setState({ BarcodeNo: e.target.value });
          break;

        case "IsLot":
          this.setState({ IsLot: e.target.checked });
          break;

        //---------------------
        default:
          break;
      }
    };

    const setStateParam=(validations,key,value)=>{
      console.log("validations > ",validations);      
      console.log("key > ",key);      
      console.log("value > ",value);      
      if(Object.keys(validations).length === 0 && validations.constructor === Object){
        console.log("validations is Empty "); 
        this.setState({[key]:value}); 
      }else{        
        if(validations.validate){
          !validations.isEmpty?validations.isNumber?this.setState({[key]:value}):this.setState({[key]:0}):this.setState({[key]:0});        
        }else{
          this.setState({[key]:value});        
        }  
      }            
    }

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
          this.setState({ ItemType: data, ProgressLoader: true });
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true });
        });
    };

    const processUpdateItem = () => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateItem;
      let Data = {
        validUser: {
          UserID: 1,
          Token: "EsNvnXGUkc7fQflQ",
        },
        Item: {
          ItemId: this.state.ItemId,
          ItemNo: this.state.ItemNo,
          ItemType: parseInt(this.state.ItemType),
          Code: this.state.Code,
          Alias: this.state.Alias,
          Description1: this.state.Description1,
          Description2: this.state.Description2,
          PackingDesc1: this.state.PackingDesc1,
          PackingDesc2: this.state.PackingDesc2,
          ItemDeptId: this.state.ItemDeptId,
          CatId: this.state.CatId,
          IsActive: this.state.IsActive,
          IsTrading: this.state.IsTrading,
          IsNonStockValuation: this.state.IsNonStockValuation,
          IsCustomized: this.state.IsCustomized,
          IsCertified: this.state.IsCertified,
          CertificateNo: this.state.CertificateNo,
          IsSaleEvenQuantity: this.state.IsSaleEvenQuantity,
          Location: this.state.Location,
          BarcodeNo: this.state.BarcodeNo,
          CartonHeight: this.state.CartonHeight,
          CartonLength: this.state.CartonLength,
          CartonWidth: this.state.CartonWidth,
          NetWeight: this.state.NetWeight,
          GrossWeight: this.state.GrossWeight,
          WarningLevel: this.state.WarningLevel,
          MinStockLevel: this.state.MinStockLevel,
          Amsf: this.state.Amsf,
          Msf: this.state.Msf,
          Bsf: this.state.Bsf,
          Moq: this.state.Moq,
          ShipperQuantiry: this.state.ShipperQuantiry,
          CbmperShipper: this.state.CbmperShipper,
          IsDiscontine: this.state.IsDiscontine,
          Reason: this.state.Reason,
          UserId: parseInt(getCookie(COOKIE.USERID)),
          ModifyDate: this.state.ModifyDate,
          TolerancePercentage: this.state.TolerancePercentage,
          IsQuality: this.state.IsQuality,
          SpecId: this.state.SpecId,
          AllowNegativeStock: this.state.AllowNegativeStock,
          ItemPostingGroupID: this.state.ItemPostingGroupID,
          CostingMethod: this.state.CostingMethod,
          StandardCost: this.state.StandardCost,
          IndirectCostPercentage: this.state.IndirectCostPercentage,
          ProfitPercentage: this.state.ProfitPercentage,
          GstgroupId: this.state.GstgroupId,
          Hsncode: this.state.Hsncode,
          BaseUom: this.state.BaseUom,
          SalesUom: this.state.SalesUom,
          PurchaseUom: this.state.PurchaseUom,
          PackingUom: this.state.PackingUom,
          Replenishment: this.state.Replenishment,
          LeadTime: this.state.LeadTime,
          IsLot: this.state.IsLot,
          ManufacturingPolicy: this.state.ManufacturingPolicy,
          RoutingId: this.state.RoutingId,
          Bomid: this.state.Bomid,
        },
      };

      console.log("data > ", Data);

      /*
      axios
        .post(Url, Data, { headers })
        .then((response) => {
          let data = response.data;
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
        */
    };

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <div className="breadcrumb-height">
          <Grid container spacing={1}>
            <Grid
              xs={12}
              sm={12}
              md={4}
              lg={4}
              style={{
                borderRightStyle: "solid",
                borderRightColor: "#bdbdbd",
                borderRightWidth: 1,
              }}
            >
              <div style={{ marginTop: 8 }}>
                <Breadcrumb
                  backOnClick={this.props.history.goBack}
                  linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                  linkTitle="Dashboard"
                  masterHref={URLS.URLS.itemMaster + this.state.urlparams}
                  masterLinkTitle="Item Master"
                  typoTitle="Edit Item"
                  level={2}
                />
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={8} lg={8}>
              <div style={{ marginLeft: 10, marginTop: 1 }}>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Action Menu Button group"
                >
                  <Button
                    className="action-btns"
                    startIcon={<AddIcon />}
                    onClick={(e) => processUpdateItem()}
                  >
                    Update
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
        </div>

        <div className="breadcrumb-bottom"></div>

        <div className="New-link-bottom"></div>

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
                      General Details
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <DropdownInput
                              id="CatID"
                              label="ItemCat"
                              onChange={(e) => updateFormValue("CatID", e)}
                              options={this.state.ItemCategoryData}
                              value={this.state.CatId}
                            />

                            <DropdownInput
                              id="ItemDeptID"
                              label="ItemDept"
                              onChange={(e) => updateFormValue("ItemDeptID", e)}
                              options={this.state.itemDepartmentMasterData}
                              value={this.state.ItemDeptId}
                            />

                            <DropdownInput
                              id="ItemType"
                              label="Item Type"
                              onChange={(e) => updateFormValue("ItemType", e)}
                              options={APIURLS.ItemType}
                              value={this.state.ItemType}
                              disabled={true}
                            />

                            <TextboxInput
                              id="ItemNo"
                              label="ItemNo"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("ItemNo", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.ItemNo}
                              disabled={true}
                            />

                            <TextboxInput
                              id="Code"
                              label="Code"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Code", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Code}
                            />
                            <TextboxInput
                              id="Alias"
                              label="Alias"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Alias", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Alias}
                            />
                            <TextboxInput
                              id="Description1"
                              label="Description 1"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("Description1", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Description1}
                            />
                            <TextboxInput
                              id="Description2"
                              label="Description 2"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("Description2", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Description2}
                            />

                            <TextboxInput
                              id="PackingDesc1"
                              label="PackingDesc 1"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("PackingDesc1", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.PackingDesc1}
                            />
                            <TextboxInput
                              id="PackingDesc2"
                              label="PackingDesc 2"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("PackingDesc2", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.PackingDesc2}
                            />
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <SwitchInput
                              key="IsTrading"
                              id="IsTrading"
                              label="IsTrading"
                              param={this.state.IsTrading}
                              onChange={(e) => updateFormValue("IsTrading", e)}
                            />

                            <SwitchInput
                              key="IsActive"
                              id="IsActive"
                              label="IsActive"
                              param={this.state.IsActive}
                              onChange={(e) => updateFormValue("IsActive", e)}
                            />
                            <SwitchInput
                              key="IsNonStockValuation"
                              id="IsNonStockValuation"
                              label="IsNonStockValuation"
                              param={this.state.IsNonStockValuation}
                              onChange={(e) =>
                                updateFormValue("IsNonStockValuation", e)
                              }
                            />
                            <SwitchInput
                              key="IsCustomized"
                              id="IsCustomized"
                              label="IsCustomized"
                              param={this.state.IsCustomized}
                              onChange={(e) =>
                                updateFormValue("IsCustomized", e)
                              }
                            />
                            <SwitchInput
                              key="IsSaleEvenQuantity"
                              id="IsSaleEvenQuantity"
                              label="IsSaleEvenQuantity"
                              param={this.state.IsSaleEvenQuantity}
                              onChange={(e) =>
                                updateFormValue("IsSaleEvenQuantity", e)
                              }
                            />

                            <SwitchInput
                              key="IsCertified"
                              id="IsCertified"
                              label="IsCertified"
                              param={this.state.IsCertified}
                              onChange={(e) =>
                                updateFormValue("IsCertified", e)
                              }
                            />

                            <TextboxInput
                              id="CertificateNo"
                              label="CertificateNo"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("CertificateNo", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.CertificateNo}
                              disabled={!this.state.IsCertified}
                            />

                            <SwitchInput
                              key="IsDiscontine"
                              id="IsDiscontine"
                              label="IsDiscontine"
                              param={this.state.IsDiscontine}
                              onChange={(e) =>
                                updateFormValue("IsDiscontine", e)
                              }
                            />

                            <TextboxInput
                              id="Reason"
                              label="Reason"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Reason", e)}
                              value={this.state.Reason}
                              disabled={!this.state.IsDiscontine}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                            />
                          </TableBody>
                        </Table>
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
                      Planning Details
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <TextboxInput
                              id="CartonHeight"
                              label="Carton Height"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("CartonHeight", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.CartonHeight}
                            />
                            <TextboxInput
                              type="number"
                              id="CartonLength"
                              label="Carton Length"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("CartonLength", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.CartonLength}
                            />
                            <TextboxInput
                              type="number"
                              id="CartonWidth"
                              label="Carton Width"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("CartonWidth", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.CartonWidth}
                            />
                            <TextboxInput
                              type="number"
                              id="NetWeight"
                              label="Net Weight"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("NetWeight", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.NetWeight}
                            />
                            <TextboxInput
                              type="number"
                              id="GrossWeight"
                              label="Gross Weight"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("GrossWeight", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.GrossWeight}
                            />
                            <TextboxInput
                              type="number"
                              id="WarningLevel"
                              label="Warning Level"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("WarningLevel", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.WarningLevel}
                            />
                            <TextboxInput
                              type="number"
                              id="MinStockLevel"
                              label="MinStock Level"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("MinStockLevel", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.MinStockLevel}
                            />
                            <TextboxInput
                              type="number"
                              id="AMSF"
                              label="AMSF"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("AMSF", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Amsf}
                            />
                            <TextboxInput
                              type="number"
                              id="MSF"
                              label="MSF"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("MSF", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Msf}
                            />
                            <TextboxInput
                              type="number"
                              id="BSF"
                              label="BSF"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("BSF", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Bsf}
                            />
                            <TextboxInput
                              type="number"
                              id="MOQ"
                              label="MOQ"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("MOQ", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Moq}
                            />
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <TextboxInput
                              type="number"
                              id="ShipperQuantity"
                              label="Shipper Quantity"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("ShipperQuantity", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.ShipperQuantiry}
                            />
                            <TextboxInput
                              type="number"
                              id="CBMPerShipper"
                              label="CBMPer Shipper"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("CBMPerShipper", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.CbmperShipper}
                            />
                            <SwitchInput
                              key="IsQuality"
                              id="IsQuality"
                              label="IsQuality"
                              param={this.state.IsQuality}
                              onChange={(e) => updateFormValue("IsQuality", e)}
                            />
                            <TextboxInput
                              type="number"
                              id="SpecID"
                              label="SpecID"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("SpecID", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.SpecId}
                            />
                            <SwitchInput
                              key="AllowNegativeStock"
                              id="AllowNegativeStock"
                              label="AllowNegativeStock"
                              param={this.state.AllowNegativeStock}
                              onChange={(e) =>
                                updateFormValue("AllowNegativeStock", e)
                              }
                            />

                            <DropdownInput
                              id="PostingGroup"
                              label="Posting Group"
                              onChange={(e) =>
                                updateFormValue("PostingGroup", e)
                              }
                              // options={}
                              value={this.state.ItemPostingGroupID}
                            />

                            <DropdownInput
                              id="CostingMethod"
                              label="Costing Method"
                              onChange={(e) =>
                                updateFormValue("CostingMethod", e)
                              }
                              options={APIURLS.CostingMethod}
                              value={this.state.CostingMethod}
                            />

                            <TextboxInput
                              type="number"
                              id="StandardCost"
                              label="Standard Cost"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("StandardCost", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.StandardCost}
                            />
                            <TextboxInput
                              type="number"
                              id="IndirectCostPercentage"
                              label="Indirect Cost Percentage"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("IndirectCostPercentage", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.IndirectCostPercentage}
                            />
                            <TextboxInput
                              type="number"
                              id="ProfitPercentage"
                              label="Profit Percentage"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("ProfitPercentage", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.ProfitPercentage}
                            />
                          </TableBody>
                        </Table>
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
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <TextboxInput
                              type="number"
                              id="TolerancePercentage"
                              label="Tolerance Percentage"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("TolerancePercentage", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.TolerancePercentage}
                            />

                            <TextboxInput
                              type="number"
                              id="GSTGroupID"
                              label="GST GroupID"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("GSTGroupID", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.GstgroupId}
                            />
                            <TextboxInput
                              id="HSNCode"
                              label="HSN Code"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("HSNCode", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Hsncode}
                            />
                            <TextboxInput
                              type="number"
                              id="BaseUOM"
                              label="Base UOM "
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("BaseUOM", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.BaseUom}
                            />
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <TextboxInput
                              type="number"
                              id="SalesUOM"
                              label="Sales UOM"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("SalesUOM", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.SalesUom}
                            />
                            <TextboxInput
                              type="number"
                              id="PurchaseUOM"
                              label="Purchase UOM"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("PurchaseUOM", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.PurchaseUom}
                            />
                            <TextboxInput
                              type="number"
                              id="PackingUOM"
                              label="Packing UOM"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("PackingUOM", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.PackingUom}
                            />
                          </TableBody>
                        </Table>
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
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <DropdownInput
                              id="Replenishment"
                              label="Replenishment"
                              onChange={(e) =>
                                updateFormValue("Replenishment", e)
                              }
                              options={APIURLS.Replenishment}
                              value={this.state.Replenishment}
                            />

                            <TextboxInput
                              type="number"
                              id="LeadTime"
                              label="Lead Time"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("LeadTime", e)}
                              
                              value={this.state.LeadTime}
                            />

                            <DropdownInput
                              id="ManufacturingPolicy"
                              label="Manufacturing Policy"
                              onChange={(e) =>
                                updateFormValue("ManufacturingPolicy", e)
                              }
                              options={APIURLS.ManufacturingPolicy}
                              value={this.state.ManufacturingPolicy}
                            />
                          </TableBody>
                        </Table>
                      </Grid>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <TextboxInput                            
                              type="number"
                              id="RoutingID"
                              label="RoutingID "
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("RoutingID", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.RoutingId}
                            />
                            <TextboxInput
                              type="number"
                              id="BOMID"
                              label="BOMID "
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("BOMID", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Bomid}
                            />
                          </TableBody>
                        </Table>
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
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Table
                          stickyHeader
                          size="small"
                          className="accordion-table"
                          aria-label="Item List table"
                        >
                          <TableBody className="tableBody">
                            <TextboxInput
                              id="Location"
                              label="Location"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Location", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Location}
                            />

                            <TextboxInput
                              id="BarcodeNo"
                              label="Barcode No"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("BarcodeNo", e)}
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.BarcodeNo}
                            />
                            <SwitchInput
                              key="IsLot"
                              id="IsLot"
                              label="IsLot"
                              param={this.state.IsLot}
                              onChange={(e) => updateFormValue("IsLot", e)}
                            />
                          </TableBody>
                        </Table>
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
export default editItem;
