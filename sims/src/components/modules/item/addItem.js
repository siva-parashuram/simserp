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

class addItem extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      GeneralDetailsExpanded: true,
      PlanningDetailsExpanded: false,
      WarehouseDetailsExpanded: false,
      InvoicingDetailsExpanded: false,
      ReplenishmentDetailsExpanded: false,
      SuccessPrompt: false,
      ErrorPrompt: false,
      ProgressLoader: true,
      urlparams: "",
      ItemTypeMaster: APIURLS.ItemType,

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
      IsTrading: false,
      IsActive: false,
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
      itemDepartmentMasterData: [],
      ItemCategoryData: [],
      UOMList: [],
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
      },
    };
  }

  componentDidMount() {
    this.getitemDepartmentMasterData();
    this.getItemCategoryData();
    this.getUOMList();
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
      urlparams: urlparams,
    });
  }

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
          name: data[i].code + " - " + data[i].name,
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
          if (e.target.value.length > 20) {
            v1.Code = { errorState: true, errorMssg: "Maximum 20 characters" };
            this.setState({ Validations: v1 });
          } else {
            v1.Code = { errorState: false, errorMssg: "" };
            this.setState({ Validations: v1 });
            setStateParam({}, param, e.target.value);
          }

          break;
        case "Alias":
          let v2 = this.state.Validations;
          if (e.target.value.length > 20) {
            v2.Alias = { errorState: true, errorMssg: "Maximum 20 characters" };
            this.setState({ Validations: v2 });
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
          this.setState({ ItemType: data, ProgressLoader: true });
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true });
        });
      console.log(this.state.ItemType);
    };

    const processCreateItem = () => {
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
            Code: CF.toString(this.state.Code),
            Alias: CF.toString(this.state.Alias),
            Description1: CF.toString(this.state.Description1),
            Description2: CF.toString(this.state.Description2),
            PackingDesc1: CF.toString(this.state.PackingDesc1),
            PackingDesc2: CF.toString(this.state.PackingDesc2),
            ItemDeptId: CF.toInt(this.state.ItemDeptId),
            CatId: CF.toInt(this.state.CatId),
            IsActive: this.state.IsActive,
            IsTrading: this.state.IsTrading,
            IsNonStockValuation: this.state.IsNonStockValuation,
            IsCustomized: this.state.IsCustomized,
            IsCertified: this.state.IsCertified,
            CertificateNo: this.state.CertificateNo,
            IsSaleEvenQuantity: this.state.IsSaleEvenQuantity,
            Location: CF.toString(this.state.Location),
            BarcodeNo: CF.toString(this.state.BarcodeNo),
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
            Reason: CF.toString(this.state.Reason),
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
                response.status === 200 ||
                response.status === 201 ||
                response.status === true ||
                response.status === "true"
              ) {
                this.setState({ ProgressLoader: true, SuccessPrompt: true });
                this.openPage(URLS.URLS.itemMaster + this.state.urlparams);
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
    };

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.itemMaster + this.state.urlparams}
          masterLinkTitle="Item Master"
          typoTitle="Add Item"
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
          >
            {APIURLS.buttonTitle.save.name}
          </Button>
        </ButtonGroup>
      </Fragment>
    );

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
                              onChange={(e) => updateFormValue("CatId", e)}
                              options={this.state.ItemCategoryData}
                              value={this.state.CatId}
                              isMandatory={true}
                            />
                            <DropdownInput
                              id="ItemDeptID"
                              label="ItemDept"
                              onChange={(e) => updateFormValue("ItemDeptId", e)}
                              options={this.state.itemDepartmentMasterData}
                              value={this.state.ItemDeptId}
                              isMandatory={true}
                            />
                            <DropdownInput
                              id="ItemType"
                              label="Item Type"
                              // onChange={(e) => updateFormValue("ItemType", e)}
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
                              value={this.state.No}
                              disabled={true}
                              isMandatory={true}
                            />

                            <TextboxInput
                              id="Code"
                              label="Code"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Code", e)}
                              value={this.state.Code}
                              error={this.state.Validations.Code.errorState}
                              helperText={this.state.Validations.Code.errorMssg}
                              isMandatory={true}
                            />
                            <TextboxInput
                              id="Alias"
                              label="Alias"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Alias", e)}
                              value={this.state.Alias}
                              error={this.state.Validations.Alias.errorState}
                              helperText={
                                this.state.Validations.Alias.errorMssg
                              }
                            />
                            <TextboxInput
                              id="Description1"
                              label="Description 1"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("Description1", e)
                              }
                              value={this.state.Description1}
                              error={
                                this.state.Validations.Description1.errorState
                              }
                              helperText={
                                this.state.Validations.Description1.errorMssg
                              }
                              isMandatory={true}
                            />
                            <TextboxInput
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
                              helperText={
                                this.state.Validations.Description2.errorMssg
                              }
                            />

                            <TextboxInput
                              id="PackingDesc1"
                              label="PackingDesc 1"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("PackingDesc1", e)
                              }
                              value={this.state.PackingDesc1}
                              error={
                                this.state.Validations.PackingDesc1.errorState
                              }
                              helperText={
                                this.state.Validations.PackingDesc1.errorMssg
                              }
                            />
                            <TextboxInput
                              id="PackingDesc2"
                              label="PackingDesc 2"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("PackingDesc2", e)
                              }
                              value={this.state.PackingDesc2}
                              error={
                                this.state.Validations.PackingDesc2.errorState
                              }
                              helperText={
                                this.state.Validations.PackingDesc2.errorMssg
                              }
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
                              value={this.state.CertificateNo}
                              disabled={!this.state.IsCertified}
                              error={
                                this.state.Validations.CertificateNo.errorState
                              }
                              helperText={
                                this.state.Validations.CertificateNo.errorMssg
                              }
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
                              disabled={!this.state.IsDiscontine}
                              value={this.state.Reason}
                              error={this.state.Validations.Reason.errorState}
                              helperText={
                                this.state.Validations.Reason.errorMssg
                              }
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
                              value={this.state.CartonWidth}
                            />
                            <TextboxInput
                              type="number"
                              id="NetWeight"
                              label="Net Weight"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("NetWeight", e)}
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
                              value={this.state.MinStockLevel}
                            />
                            <TextboxInput
                              type="number"
                              id="AMSF"
                              label="AMSF"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Amsf", e)}
                              value={this.state.Amsf}
                            />
                            <TextboxInput
                              type="number"
                              id="MSF"
                              label="MSF"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Msf", e)}
                              value={this.state.Msf}
                            />
                            <TextboxInput
                              type="number"
                              id="BSF"
                              label="BSF"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Bsf", e)}
                              value={this.state.Bsf}
                            />
                            <TextboxInput
                              type="number"
                              id="MOQ"
                              label="MOQ"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Moq", e)}
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
                                updateFormValue("ShipperQuantiry", e)
                              }
                              value={this.state.ShipperQuantiry}
                            />
                            <TextboxInput
                              type="number"
                              id="CBMPerShipper"
                              label="CBMPer Shipper"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("CbmperShipper", e)
                              }
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
                              onChange={(e) => updateFormValue("SpecId", e)}
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
                                updateFormValue("ItemPostingGroupID", e)
                              }
                              options={APIURLS.ItemPostingGroup}
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
                              value={this.state.TolerancePercentage}
                            />

                            <DropdownInput
                              id="GSTGroupID"
                              label="GST GroupID"
                              onChange={(e) => updateFormValue("GstgroupId", e)}
                              options={[]}
                              value={this.state.GstgroupId}
                            />

                            <TextboxInput
                              id="HSNCode"
                              label="HSN Code"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Hsncode", e)}
                              value={this.state.Hsncode}
                              error={this.state.Validations.Hsncode.errorState}
                              helperText={
                                this.state.Validations.Hsncode.errorMssg
                              }
                            />

                            <DropdownInput
                              id="BaseUOM"
                              label="Base UOM "
                              onChange={(e) => updateFormValue("BaseUom", e)}
                              options={this.state.UOMList}
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
                            <DropdownInput
                              id="SalesUOM"
                              label="Sales UOM"
                              onChange={(e) => updateFormValue("SalesUom", e)}
                              options={this.state.UOMList}
                              value={this.state.SalesUom}
                            />

                            <DropdownInput
                              id="PurchaseUOM"
                              label="Purchase UOM"
                              onChange={(e) =>
                                updateFormValue("PurchaseUom", e)
                              }
                              options={this.state.UOMList}
                              value={this.state.PurchaseUom}
                            />

                            <DropdownInput
                              id="PackingUOM"
                              label="Packing UOM"
                              onChange={(e) => updateFormValue("PackingUom", e)}
                              options={this.state.UOMList}
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
                              onChange={(e) => updateFormValue("RoutingId", e)}
                              value={this.state.RoutingId}
                            />
                            <TextboxInput
                              type="number"
                              id="BOMID"
                              label="BOMID "
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("Bomid", e)}
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
                              value={this.state.Location}
                            />

                            <TextboxInput
                              id="BarcodeNo"
                              label="Barcode No"
                              variant="outlined"
                              size="small"
                              onChange={(e) => updateFormValue("BarcodeNo", e)}
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
export default addItem;
