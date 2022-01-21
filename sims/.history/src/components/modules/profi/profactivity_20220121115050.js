import React, { Fragment, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Divider } from "@material-ui/core";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

import BackdropLoader from "../../compo/backdrop";
import SuccessSnackBar from "../../compo/successSnackbar";
import ErrorSnackBar from "../../compo/errorSnackbar";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";

import SADIB from "../../compo/gridautocompletedropdowninput";
import SIB from "../../compo/gridtextboxinput";
import SSDV from "../../compo/grid2sectiondisplayview";
import SDTI from "../../compo/griddateinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SCSI from "../../compo/customswitchinput";
import SCADI from "../../compo/customautocompletecomponent";

import CGINPUT from "../../compo/specialcompo/custominputbox";
import CGSELECT from "../../compo/specialcompo/customselectbox";


import POL from "./POL";

const today = moment().format("YYYY-MM-DD");

class profactivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProgressLoader: false,
            SuccessPrompt: false,
            ErrorPrompt: false,
            ErrorMessageProps: "",
            typoTitle: "",
            urlparams: "",
            accordion1: true,
            accordion2: true,
            accordion3: true,
            accordion4: true,
            accordion5: true,
            accordion6: true,
            accordion7: true,
            DialogStatus: false,
            currentDeleteItemLine: {},
            Branch: {},
            customerList: [],
            CustomerBillingAddress: [],
            CustomerShippingAddress: [],
            NotifyAddress: [],
            BankList: [],
            CountryList: [],
            StateList: [],
            WarehouseList: [],
            CurrencyList: [],
            GeneralPostingGroupList: [],
            PaymentTermsList: [],
            CustomerPostingGroupList: [],
            PaymentTermsList: [],
            CustomerPostingGroupList: [],
            ItemPostingGroupList: [],
            GSTGROUPList: [],
            UOMList: [],
            MODTaxList: [],
            IncoTermList: [],
            ShipmentModeList: [],
            FixedAssetList:[],
            GLAccountList:[],
            ChargesList:[],
            ShipperList:[],
            PackingTypeList: APIURLS.PackingType,
            ServiceTypeList: APIURLS.ServiceType,
            PackingSpecificationList: APIURLS.PackingSpecification,
            selectedCustomerObj: null,
            //-----------------ProformaInvoice---------------------
            ProformaID: 0,
            BranchID: 0,
            Status: "",
            No: "",
            ProformaDate: today,
            CustID: 0,
            BillingID: 0,
            BillingName: "",
            BillingAddress: "",
            BillingAddress2: "",
            BillingAddress3: "",
            BillingCity: "",
            BillingPostCode: "",
            BillingCountryID: 0,
            BillingStateID: 0,
            ShippingID: 0,
            ShippingName: "",
            ShippingAddress: "",
            ShippingAddress2: "",
            ShippingAddress3: "",
            ShippingCity: "",
            ShippingPostCode: "",
            ShippingCountryID: 0,
            ShippingStateID: 0,
            DispatchDate: today,
            DeliveryDate: today,
            CustomerOrderDate: today,
            Reference: "",
            IsSEZSale: false,
            IsRounding: false,
            IsExport: false,
            GSTPlaceOfSold: false,
            WareHouseID: 0,
            SalesPersonID: 0,
            IsDeleted: false,
            NotifyID: 0,
            ShipperID: 0,
            CountryOfOrigin: 0,
            ExitPortID: 0,
            Destination: "",
            FinalDestination: "",
            CurrID: 0,
            ExchRate: 0,
            FCValue: 0,
            BaseValue: 0,
            PaymentTermID: 0,
            PaymentTerm: "",
            GeneralPostingGroupID: 0,
            CustomerPostingGroupID: 0,
            BankID: 0,
            Amount: 0,
            DiscountAmount: 0,
            TotalTax: 0,
            GSTNo: "",
            VATNo: "",
            Reason: "",
            IsTaxExempt: 0,
            IsRegistedSupplier: 0,
            MODTaxID: 0,
            PackingType: 0,
            PackingSpecification: 0,
            NoOfPacket: 0,
            ServiceType: 0,
            IncoID: 0,
            ShipmentModeID: 0,
            Notes: "",
            //-------------------------------------------
            ProformaInvoiceLine: [],
        };
    }
    componentDidMount() {
        let params = CF.GET_URL_PARAMS();
        this.setState({ urlparams: params });
        var url = new URL(window.location.href);
        const type = url.searchParams.get("type");
        let branchId = url.searchParams.get("branchId");
        let ProformaID= type === "edit" ? url.searchParams.get("editPIID") : 0;
        if (type === "add") {
            this.setState({
                BranchID:parseInt(branchId),
                typoTitle: "Add",
                ProgressLoader: true
            },()=>{
                this.getCustomersByBranchID(branchId);
            });
        } else {
            this.setState({
                BranchID:parseInt(branchId),
                typoTitle: "Edit",
                ProformaID:parseInt(ProformaID)
            },()=>{
                this.getCustomersByBranchID(branchId);
            });
        }

        
    }

    getCustomersByBranchID = (branchId) => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetCustomersByBranchID;

        let reqObj = {
            ValidUser: ValidUser,
            BranchID: parseInt(branchId)
        };

        axios
            .post(Url, reqObj, { headers })
            .then((response) => {
                let data = response.data;
                this.setState({
                    Branch: data.Branch[0],
                    customerList: data.Customer,
                    CountryList: data.Country,
                    StateList: data.State,
                    CurrencyList: data.Currency,
                    GeneralPostingGroupList: data.GeneralPostingGroup,
                    PaymentTermsList: data.PaymentTerms,
                    CustomerPostingGroupList: data.CustomerPostingGroup,
                    MODTaxList: data.MODTax,
                    IncoTermList: data.IncoTerms,
                    ShipmentModeList: data.ShipmentMode,
                    WarehouseList: data.WareHouse,
                    UOMList: data.UOM,
                    ItemPostingGroupList: data.ItemPostingGroup,
                    GSTGROUPList: data.GSTGROUP,
                    FixedAssetList:data.FixedAsset,
                    GLAccountList:data.GLAccount,
                    ChargesList:data.Charges,
                    ShipperList:data.Shipper
                },()=>{
                 this.GetProformaInvoiceByProformaID();
                });
                for (let i = 0; i < data.WareHouse.length; i++) {
                    if (data.WareHouse[i].IsDefault === true) {
                        this.setState({
                            WareHouseID: data.WareHouse[i].value
                        });
                        break;
                    }
                }

            })
            .catch((error) => {

            });
    }

    GetProformaInvoiceByProformaID=()=>{
      let ProformaID=parseInt(this.state.ProformaID);
      console.log("GetProformaInvoiceByProformaID > ProformaID > ",ProformaID);
     
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
          "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.GetProformaInvoiceByProformaID;

      let reqObj = {
          ValidUser: ValidUser,
          ProformaInvoice:{
            ProformaID: parseInt(ProformaID)
          }          
      };

      axios
      .post(Url, reqObj, { headers })
      .then((response) => { 
          if(response.status===200){
            let data=response.data;
            console.log("data > ",data);

            let CustomerData=this.getCustomerDataCustID(data.CustID);

            this.updateTextField("BillingName",data.BillingName);
            this.updateTextField("BillingAddress",data.BillingAddress);
            this.updateTextField("BillingAddress2",data.BillingAddress2);
            this.updateTextField("BillingAddress3",data.BillingAddress3);
            this.updateTextField("BillingCity",data.BillingCity);
            this.updateTextField("BillingPostCode",data.BillingPostCode);
            this.updateTextField("Reference",data.Reference);

            this.updateTextField("ShippingName",data.ShippingName);
            this.updateTextField("ShippingAddress",data.ShippingAddress);
            this.updateTextField("ShippingAddress2",data.ShippingAddress2);
            this.updateTextField("ShippingAddress3",data.ShippingAddress3);
            this.updateTextField("ShippingCity",data.ShippingCity);
            this.updateTextField("ShippingPostCode",data.ShippingPostCode);

            this.updateTextField("ExchRate",data.ExchRate);
            


            


            this.updateTextField("Notes",data.Notes);
            this.updateTextField("NoOfPacket",data.NoOfPacket);
            this.updateTextField("PaymentTerm",data.PaymentTerm);

            let ProformaInvoiceLine=[];
            let PIL=data.ProformaInvoiceLine;
            try{
                for(let i=0;i<PIL.length;i++){
                    let selectitemListObj=null;
                    let itemList=[];
                    let categoryList=[];
                    if (parseInt(PIL[i].Type) === 0) {
                        selectitemListObj = null;
                        itemList = [];
                        categoryList = this.state.selectedCustomerObj.Category;
                    }
                    if (parseInt(PIL[i].Type) === 1) {
                        itemList = this.state.GLAccountList;
                    }
                    if (parseInt(PIL[i].Type) === 2) {
                        itemList = this.state.FixedAssetList;
                    }
                    if (parseInt(PIL[i].Type) === 3) {
                        itemList = this.state.ChargesList;
                        for(let j=0;j<itemList.length;j++){
                            if(parseInt(itemList[j].value)===parseInt(PIL[i].TypeID)){
                                selectitemListObj=itemList[j];
                                break;
                            }
                        }
                    }
                    let PILobj = {
                        categoryList:categoryList,
                        itemList:itemList,
                        ItemPrice:[],
                        selectitemListObj:selectitemListObj,
                        ProformaID: data.ProformaID,
                        Type: parseInt(PIL[i].Type),
                        CategoryID:PIL[i].CatID,
                        LNo: i+1,
                        TypeID: PIL[i].TypeID,
                        desc:PIL[i].Description1,
                        packDesc:PIL[i].PackingDesc1,
                        CustomerCode: PIL[i].CustomerCode,
                        UOMID: PIL[i].UOMID,
                        TolerancePercentage:PIL[i].TolerancePercentage,
                        Quantity: PIL[i].Quantity,
                        Price: PIL[i].Price,
                        LineDiscPercentage: PIL[i].LineDiscPercentage,
                        LineDiscAmount: PIL[i].LineDiscAmount,
                        ItemPostingGroupID: PIL[i].ItemPostingGroupID,
                        GeneralPostingGroupID: PIL[i].GeneralPostingGroupID,
                        VATPercentage: PIL[i].VATPercentage,
                        VATAmount: PIL[i].VATAmount,
                        HSNCode: PIL[i].HSNCode,
                        GSTGroupID: PIL[i].GSTGroupID,
                        SupplyStateID: PIL[i].SupplyStateID,
                        GSTPercentage: PIL[i].GSTPercentage,
                        GSTJurisdiction: PIL[i].GSTJurisdiction,
                        GSTGroupType: PIL[i].GSTGroupType,
                        GSTPlaceOfSold: PIL[i].GSTPlaceOfSold,
                        SoldToGSTN: PIL[i].SoldToGSTN,
                        NatureOfSupply: PIL[i].NatureOfSupply,
                        GSTBaseAmount: PIL[i].GSTBaseAmount,
                        IGSTRate: PIL[i].IGSTRate,
                        IGSTAmt:PIL[i].IGSTAmt,
                        CGSTRate: PIL[i].CGSTRate,
                        CGSTAmt: PIL[i].CGSTAmt,
                        SGSTRate:PIL[i].SGSTRate,
                        SGSTAmt: PIL[i].SGSTAmt,
                        IsLot: PIL[i].IsLot,
                        isDataProper: true,
                    };
                    
                    ProformaInvoiceLine.push(PILobj);
                }
            }catch(er){
                console.log("Error PIL for loop > er > ",er);
            }
           
            

            this.setState(
                {
            CustomerBillingAddress:CustomerData.BillingAddress,
            CustomerShippingAddress:CustomerData.ShippingAddress,
                //-----------------ProformaInvoice---------------------
            selectedCustomerObj:CustomerData.selectedCustomerObj,
            ProformaID: data.ProformaID,
            BranchID: data.BranchID,
            Status: data.Status,
            No: data.No,
            ProformaDate: moment(data.ProformaDate).format("YYYY-MM-DD"),
            CustID: data.CustID,
            BillingID: data.BillingID,
            BillingName: data.BillingName,
            BillingAddress: data.BillingAddress,
            BillingAddress2: data.BillingAddress2,
            BillingAddress3: data.BillingAddress3,
            BillingCity: data.BillingCity,
            BillingPostCode: data.BillingPostCode,
            BillingCountryID: data.BillingCountryID,
            BillingStateID: data.BillingStateID,
            ShippingID: data.ShippingID,
            ShippingName: data.ShippingName,
            ShippingAddress: data.ShippingAddress,
            ShippingAddress2: data.ShippingAddress2,
            ShippingAddress3: data.ShippingAddress3,
            ShippingCity: data.ShippingCity,
            ShippingPostCode: data.ShippingPostCode,
            ShippingCountryID: data.ShippingCountryID,
            ShippingStateID: data.ShippingStateID,
            DispatchDate: moment(data.DispatchDate).format("YYYY-MM-DD"),
            DeliveryDate: moment(data.DeliveryDate).format("YYYY-MM-DD"),
            CustomerOrderDate: moment(data.CustomerOrderDate).format("YYYY-MM-DD"),
            Reference: data.Reference,
            IsSEZSale: data.IsSEZSale,
            IsRounding: data.IsRounding,
            IsExport: data.IsExport,
            GSTPlaceOfSold: data.GSTPlaceOfSold,
            WareHouseID: data.WareHouseID,
            SalesPersonID: data.SalesPersonID,
            IsDeleted: data.IsDeleted,
            NotifyID: data.NotifyID,
            ShipperID: data.ShipperID,
            CountryOfOrigin: data.CountryOfOrigin,
            ExitPortID: data.ExitPortID,
            Destination: data.Destination,
            FinalDestination: data.FinalDestination,
            CurrID: data.CurrID,
            ExchRate: data.ExchRate,
            FCValue: data.FCValue,
            BaseValue: data.BaseValue,
            PaymentTermID: data.PaymentTermID,
            PaymentTerm: data.PaymentTerm,
            GeneralPostingGroupID: data.GeneralPostingGroupID,
            CustomerPostingGroupID: data.CustomerPostingGroupID,
            BankID: data.BankID,
            Amount: data.Amount,
            DiscountAmount: data.DiscountAmount,
            TotalTax: data.TotalTax,
            GSTNo: data.GSTNo,
            VATNo: data.VATNo,
            Reason: data.Reason,
            IsTaxExempt: data.IsTaxExempt,
            IsRegistedSupplier: data.IsRegistedSupplier,
            MODTaxID: data.MODTaxID,
            PackingType: data.PackingType,
            PackingSpecification: data.PackingSpecification,
            NoOfPacket: data.NoOfPacket,
            ServiceType: data.ServiceType,
            IncoID: data.IncoID,
            ShipmentModeID: data.ShipmentModeID,
            Notes:data.Notes,
            //-------------------------------------------
            ProformaInvoiceLine:ProformaInvoiceLine,
                ProgressLoader:true
            },()=>{
                this.calculateInvoiceDetails();
                let PIL=data.ProformaInvoiceLine;
                for(let i=0;i<PIL.length;i++){
                    this.updateTextField("Type"+i,PIL[i].Type);
                    this.updateTextField("CategoryID"+i,PIL[i].CategoryID);
                    this.updateTextField("CustomerCode"+i,PIL[i].CustomerCode);
                    this.updateTextField("UOMID"+i,PIL[i].UOMID);
                    this.updateTextField("TolerancePercentage"+i,PIL[i].TolerancePercentage);
                    this.updateTextField("Quantity"+i,PIL[i].Quantity);
                    this.updateTextField("Price"+i,PIL[i].Price);
                    this.updateTextField("LineDiscPercentage"+i,PIL[i].LineDiscPercentage);
                    this.updateTextField("ItemPostingGroupID"+i,PIL[i].ItemPostingGroupID);
                    this.updateTextField("HSNCode"+i,PIL[i].HSNCode);
                    this.updateTextField("GSTGroupID"+i,PIL[i].GSTGroupID);
                }
            });
          }
    })
    .catch((error) => {
      console.log("GetProformaInvoiceByProformaID > error > ",error);
    });

    }

    getCustomerDataCustID=(CustID)=>{
        let DATA={
            selectedCustomerObj:null,
            BillingAddress:[],
            ShippingAddress:[],
            Category:[]
        };
        let customerList = this.state.customerList;
        for (let i = 0; i < customerList.length; i++) {
            if (parseInt(customerList[i].value) === parseInt(CustID)) {
                DATA.selectedCustomerObj=customerList[i];
                DATA.BillingAddress=customerList[i].BillingAddress;
                DATA.ShippingAddress=customerList[i].ShippingAddress;
                DATA.Category=customerList[i].Category;
                break;
            }
        }
        return DATA;
    }

   

    createBlankLine = () => {
        let PILobj = {
            categoryList:[],
            itemList:[],
            ItemPrice:[],
            selectitemListObj:null,
            ProformaID: 0,
            Type: 0,
            CategoryID:"",
            LNo: 0,
            TypeID: 0,
            desc:"",
            packDesc:"",
            CustomerCode: "",
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
            GSTJurisdiction: "",
            GSTGroupType: 0,
            GSTPlaceOfSold: 0,
            SoldToGSTN: "",
            NatureOfSupply: 0,
            GSTBaseAmount: 0,
            IGSTRate: 0,
            IGSTAmt: 0,
            CGSTRate: 0,
            CGSTAmt: 0,
            SGSTRate: 0,
            SGSTAmt: 0,
            IsLot: false,
            isDataProper: false,
        };
        let oldProformaInvoiceLine = this.state.ProformaInvoiceLine;
        oldProformaInvoiceLine.push(PILobj);
        this.setState({
            ProformaInvoiceLine: oldProformaInvoiceLine
        });
    }

    getPaymentTerm = (id) => {
        let paymentTerm = "";
        let PaymentTermsList = this.state.PaymentTermsList;
        for (let i = 0; i < PaymentTermsList.length; i++) {
            if (parseInt(id) === parseInt(PaymentTermsList[i].value)) {
                paymentTerm = PaymentTermsList[i].Description;
            }
        }
        return paymentTerm;
    }

    getExchRate = (id) => {
        let exchRate = 0;
        let CurrencyList = this.state.CurrencyList;
        for (let i = 0; i < CurrencyList.length; i++) {
            if (parseInt(id) === parseInt(CurrencyList[i].value)) {
                exchRate = parseFloat(CurrencyList[i].ExchRate);
            }
        }
        return exchRate;
    }

    validateProformaInvoiceLineBeforeCustomkerChange = () => {
        let promptDeleteLine = false;
        for (let i = 0; i < this.state.ProformaInvoiceLine.length; i++) {
            if (this.state.ProformaInvoiceLine[i].isDataProper === true) {
                promptDeleteLine = true;
                break;
            }
        }
        return promptDeleteLine;
    }

    updateFormValue = (key, e) => {
        console.log("key > ", key);
        console.log("e > ", e);

        switch (key) {
            case "CustID":
                if (e) {
                    let promptDeleteLine = false;
                    promptDeleteLine = this.validateProformaInvoiceLineBeforeCustomkerChange();
                    if (promptDeleteLine === true) {
                        this.setState({
                            ErrorPrompt: true,
                            ErrorMessageProps: "Please Delete Line"
                        });
                    } else {
                        this.setState({
                            selectedCustomerObj: e,
                            CustomerBillingAddress: e.BillingAddress,
                            CustomerShippingAddress: e.ShippingAddress,
                            NotifyAddress: e.NotifyAddress,
                            CustID: CF.toInt(e.id),
                            CurrID: CF.toInt(e.CurrID),
                            ExchRate: this.getExchRate(CF.toInt(e.CurrID)),
                            PaymentTermID: CF.toInt(e.PaymentTermID),
                            PaymentTerm: this.getPaymentTerm(CF.toInt(e.PaymentTermID))
                        });

                        if (e.BillingAddress) {
                            if (e.BillingAddress.length > 0) {
                                this.setState({
                                    IsRegistedSupplier: e.BillingAddress[0].IsRegistedSupplier,
                                    IsTaxExempt: e.BillingAddress[0].IsTaxExempt,
                                    GSTNo: e.BillingAddress[0].GSTNo,
                                    VATNo: e.BillingAddress[0].VATNo,
                                    Reason: e.BillingAddress[0].Reason,
                                    BillingID: e.BillingAddress[0].value,
                                    BillingName: e.BillingAddress[0].Name,
                                    BillingAddress: e.BillingAddress[0].Address,
                                    BillingAddress2: e.BillingAddress[0].Address2,
                                    BillingAddress3: e.BillingAddress[0].Address3,
                                    BillingCity: e.BillingAddress[0].City,
                                    BillingPostCode: e.BillingAddress[0].PostCode,
                                    BillingCountryID: e.BillingAddress[0].CountryID,
                                    BillingStateID: e.BillingAddress[0].StateID,
                                    GeneralPostingGroupID: e.BillingAddress[0].GeneralPostingGroupID,
                                    CustomerPostingGroupID: e.BillingAddress[0].CustomerPostingGroupID
                                });

                                //-----setting textboxes-----------
                                this.updateTextField("BillingName", e.BillingAddress[0].Name);
                                this.updateTextField("BillingAddress", e.BillingAddress[0].Address);
                                this.updateTextField("BillingAddress2", e.BillingAddress[0].Address2);
                                this.updateTextField("BillingAddress3", e.BillingAddress[0].Address3);
                                this.updateTextField("BillingCity", e.BillingAddress[0].City);
                                this.updateTextField("BillingPostCode", e.BillingAddress[0].PostCode);
                                this.updateTextField("GSTNo", e.BillingAddress[0].GSTNo);
                                this.updateTextField("VATNo", e.BillingAddress[0].VATNo);
                                this.updateTextField("Reason", e.BillingAddress[0].Reason);
                            }
                        }
                        if (e.ShippingAddress) {
                            if (e.ShippingAddress.length > 0) {
                                this.setState({
                                    ShippingID: e.ShippingAddress[0].value,
                                    ShippingName: e.ShippingAddress[0].Name,
                                    ShippingAddress: e.ShippingAddress[0].Address,
                                    ShippingAddress2: e.ShippingAddress[0].Address2,
                                    ShippingAddress3: e.ShippingAddress[0].Address3,
                                    ShippingCity: e.ShippingAddress[0].City,
                                    ShippingPostCode: e.ShippingAddress[0].PostCode,
                                    ShippingCountryID: e.ShippingAddress[0].CountryID,
                                    ShippingStateID: e.ShippingAddress[0].StateID
                                });
                                //-----setting textboxes-----------
                                this.updateTextField("ShippingName", e.ShippingAddress[0].Name);
                                this.updateTextField("ShippingAddress", e.ShippingAddress[0].Address);
                                this.updateTextField("ShippingAddress2", e.ShippingAddress[0].Address2);
                                this.updateTextField("ShippingAddress3", e.ShippingAddress[0].Address3);
                                this.updateTextField("ShippingCity", e.ShippingAddress[0].City);
                                this.updateTextField("ShippingPostCode", e.ShippingAddress[0].PostCode);
                                this.updateTextField("GSTNo", e.ShippingAddress[0].GSTNo);
                                this.updateTextField("VATNo", e.ShippingAddress[0].VATNo);
                                this.updateTextField("Reason", e.ShippingAddress[0].Reason);
                            }
                        }

                        // will add line only if nothing is present...
                        if (this.state.ProformaInvoiceLine.length === 0) {
                            this.createBlankLine();
                        }

                    }

                } else {
                    this.setState({ selectedCustomerObj: null });
                }
                break;
            case "BillingCountryID":
                this.setState({ BillingCountryID: CF.toInt(e) });
                break;
            case "ShippingCountryID":
                this.setState({ ShippingCountryID: CF.toInt(e) });
                break;
            case "BillingName":
                try {
                    let input = document.querySelector('#BillingName');
                    input.value = e;
                } catch (err) {
                    console.log("BillingName > err > ", err);
                }
                break;
            case "GSTPlaceOfSold":

                if (this.state.selectedCustomerObj) {
                    if (e === false) {
                        try {
                            this.setState({
                                IsRegistedSupplier: this.state.selectedCustomerObj.BillingAddress[0].IsRegistedSupplier,
                                IsTaxExempt: this.state.selectedCustomerObj.BillingAddress[0].IsTaxExempt,
                                GSTNo: this.state.selectedCustomerObj.BillingAddress[0].GSTNo,
                                VATNo: this.state.selectedCustomerObj.BillingAddress[0].VATNo,
                                Reason: this.state.selectedCustomerObj.BillingAddress[0].Reason
                            });

                            this.updateTextField("GSTNo", this.state.selectedCustomerObj.BillingAddress[0].GSTNo);
                            this.updateTextField("VATNo", this.state.selectedCustomerObj.BillingAddress[0].VATNo);
                            this.updateTextField("Reason", this.state.selectedCustomerObj.BillingAddress[0].Reason);

                        } catch (err) {
                            console.log("GSTPlaceOfSold > False > err > ", err);
                        }
                    }
                    if (e === true) {
                        try {
                            this.setState({
                                IsRegistedSupplier: this.state.selectedCustomerObj.ShippingAddress[0].IsRegistedSupplier,
                                IsTaxExempt: this.state.selectedCustomerObj.ShippingAddress[0].IsTaxExempt,
                                GSTNo: this.state.selectedCustomerObj.ShippingAddress[0].GSTNo,
                                VATNo: this.state.selectedCustomerObj.ShippingAddress[0].VATNo,
                                Reason: this.state.selectedCustomerObj.ShippingAddress[0].Reason
                            });

                            this.updateTextField("GSTNo", this.state.selectedCustomerObj.ShippingAddress[0].GSTNo);
                            this.updateTextField("VATNo", this.state.selectedCustomerObj.ShippingAddress[0].VATNo);
                            this.updateTextField("Reason", this.state.selectedCustomerObj.ShippingAddress[0].Reason);
                        } catch (err) {
                            console.log("GSTPlaceOfSold > True > err > ", err);
                        }
                    }
                }
                break;
            default:
                break;
        }
    }

    resetLineItemList=(Type,index)=>{
        try {
            let ProformaInvoiceLine = this.state.ProformaInvoiceLine;
            if(parseInt(Type)===0){
                ProformaInvoiceLine[index].selectitemListObj = null;
                ProformaInvoiceLine[index].itemList = [];   
                ProformaInvoiceLine[index].categoryList=this.state.selectedCustomerObj.Category;
            }
            if(parseInt(Type)===1){
                ProformaInvoiceLine[index].itemList = this.state.GLAccountList;   
            }
            if(parseInt(Type)===2){
                ProformaInvoiceLine[index].itemList = this.state.FixedAssetList;   
            }
            if(parseInt(Type)===3){
                ProformaInvoiceLine[index].itemList = this.state.ChargesList;   
            }
                     
            this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
        } catch (err) { }
    }

    updateTextField = (id, value) => {
        try {
            document.getElementById(id).value = value;
        } catch (err) { }

    }

    getGSTPercentage=(value)=>{
        let GSTPercentage=0;
        for(let i=0;i< this.state.GSTGROUPList.length;i++){
            if( parseInt(this.state.GSTGROUPList[i].value)===parseInt(value)){
                GSTPercentage=parseFloat(this.state.GSTGROUPList[i].GSTPercentage);
                
                break;
            }
        }
        return GSTPercentage;
    }

    getCategoryITEM = (value) => {
        let Item = [];
        try {
            let Category = this.state.selectedCustomerObj.Category;
            for (let i = 0; i < Category.length; i++) {
                if (parseInt(Category[i].value) === parseInt(value)) {
                    Item = Category[i].Item;
                    break;
                }
            }
        } catch (err) { }
        return Item;
    }
    getPrice = (Quantity, o) => {
        console.log("getPrice > o > ",o)
        let UnitPrice = 0.00;
        try {
          let UOMID_i = o.UOMID;
          for (let i = 0; i < o.ItemList.length; i++) {
            if (o.ItemList[i].value === o.TypeID) {
              let ItemPrice = o.ItemList[i]['ItemPrice'];
              for (let j = 0; j < ItemPrice.length; j++) {
                let UOM_j = ItemPrice[j]['UOM'];
                if (parseInt(UOMID_i) === parseInt(UOM_j)) {
                  let jo = ItemPrice[j];
                  if (parseFloat(Quantity) >= parseFloat(jo.MinQty) && parseFloat(Quantity) <= parseFloat(jo.MaxQty)) {
                    UnitPrice = jo.UnitPrice;
                    break;
                  }
                }
              }
            }
          }
        } catch (err) {
          console.log("getPrice > err > ", err)
          UnitPrice = 0.00;
        }
        return UnitPrice;
      }

    updatePILStateOnBlur = (key, index, value, LineItem) => {
        try {
            let ProformaInvoiceLine = this.state.ProformaInvoiceLine;
            switch (key) {
                case "Type":
                    this.resetLineItemList(value, index);
                    ProformaInvoiceLine[index][key] = parseInt(value);
                    ProformaInvoiceLine[index].selectitemListObj = null;
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;
                case "CategoryID":
                    console.log("LineItem > ", LineItem);
                    ProformaInvoiceLine[index].itemList = this.getCategoryITEM(value);
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;
                case "TypeID":
                    console.log("LineItem > ", LineItem);
                    console.log("key > ", key);
                    console.log("index > ", index);
                    console.log("value > ", value);
                    if (parseInt(LineItem.Type === 0)) {
                       

                        try{
                            let obj = ProformaInvoiceLine[index];
                            console.log("ProformaInvoiceLine > obj > ", obj);
                            ProformaInvoiceLine[index].TypeID = parseInt(value.value);
                        ProformaInvoiceLine[index].desc = value.Description1;
                        ProformaInvoiceLine[index].packDesc = value.PackingDesc1;
                        ProformaInvoiceLine[index].VATPercentage = parseFloat(value.VATPercentage);
                        ProformaInvoiceLine[index].GSTGroupID = parseInt(value.GSTGroupID);
                        ProformaInvoiceLine[index].GSTPercentage = parseFloat(value.GSTPercentage);
                        ProformaInvoiceLine[index].HSNCode = value.HSNCode;
                        ProformaInvoiceLine[index].IsLot = value.IsLot;
                        ProformaInvoiceLine[index].IsQuality = value.IsQuality;
                        ProformaInvoiceLine[index].ItemPostingGroupID = parseInt(value.ItemPostingGroupID);
                        ProformaInvoiceLine[index].Quantity = 1;
                        ProformaInvoiceLine[index].Price = parseFloat(this.getPrice(1.00, obj));
                        ProformaInvoiceLine[index].UOMID = parseInt(value.PurchaseUOM);
                        ProformaInvoiceLine[index].TolerancePercentage = parseFloat(value.TolerancePercentage);
                        }catch(err){
                            console.log("Error > err > ",err);
                        }
                        

                        try {
                            // document.getElementById("VATPercentage" + index).value = parseFloat(value.VATPercentage);
                            document.getElementById("UOMID" + index).value = parseInt(value.PurchaseUOM);
                            document.getElementById("GSTGroupID" + index).value = parseInt(value.GSTGroupID);
                            document.getElementById("GSTPercentage" + index).value = parseFloat(value.GSTPercentage);
                            document.getElementById("HSNCode" + index).value = value.HSNCode;
                            document.getElementById("ItemPostingGroupID" + index).value = parseInt(value.ItemPostingGroupID);
                            document.getElementById("Quantity" + index).value = 1;
                            document.getElementById("Price" + index).value = parseFloat(this.getPrice(1.00, obj));
                            document.getElementById("TolerancePercentage" + index).value = parseFloat(value.TolerancePercentage);

                        } catch (err) { console.log("err > ", err); }


                    }
                    else {
                        ProformaInvoiceLine[index].selectitemListObj = value;
                        ProformaInvoiceLine[index].desc = value.Description1;
                        ProformaInvoiceLine[index].TypeID = parseInt(value.value);
                    }

                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;
                case "GSTGroupID":
                    let GSTPercentage = 0;
                    GSTPercentage = this.getGSTPercentage(value);

                    ProformaInvoiceLine[index][key] = value;
                    ProformaInvoiceLine[index].GSTPercentage = GSTPercentage;

                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;
                case "ItemPostingGroupID":
                    ProformaInvoiceLine[index].ItemPostingGroupID = value;
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;
                case "UOMID": 
                    console.log("IN  UOMID > ",value);
                    ProformaInvoiceLine[index]["UOMID"] = parseInt(value);
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    console.log("ProformaInvoiceLine > ",ProformaInvoiceLine);
                    break;
                case "Quantity":
                    ProformaInvoiceLine[index].Quantity = parseFloat(value);
                    if (parseInt(ProformaInvoiceLine[index].Type === 0)) {
                        let Price = this.getPrice(parseFloat(value), ProformaInvoiceLine[index]);
                        document.getElementById("Price" + index).value = parseFloat(Price);
                    }
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;
                case "Price":
                    ProformaInvoiceLine[index].Price = parseFloat(value);
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;
                case "HSNCode":
                    ProformaInvoiceLine[index].HSNCode =value;
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;  
                case "CustomerCode":
                    ProformaInvoiceLine[index].CustomerCode =value;
                    this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
                    break;      
                case "LineDiscPercentage":
                break;
                default:
                break;
            }
            let isDataProper = this.validateLine(ProformaInvoiceLine[index]);
            ProformaInvoiceLine[index].isDataProper = isDataProper;
            this.setState({ ProformaInvoiceLine: ProformaInvoiceLine });
            this.calculateInvoiceDetails();
        } catch (err) {
            console.log("Error : err > ", err);
        }
    }

    triggeronKeyDown = (e, RightID, LeftID, UpID, DownID) => {

        try {
            //enter,right key press
            if (e.key === 'Enter' || e.keyCode === 13 || e.keyCode === 39) {
                if (document.getElementById(RightID)) {
                    document.getElementById(RightID).focus();
                }
            }
            //left keypress
            if (e.keyCode === 37) {
                if (document.getElementById(LeftID)) {
                    document.getElementById(LeftID).focus();
                }
            }
        } catch (err) {
            console.log("triggeronKeyDown > err > ", err);
        }
    }

    validateLine = (o) => {
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
            if ((o.HSNCode.length < 6 || o.HSNCode.length > 8)) { validLine = false; } else { validLine = true; }
          } else {
            validLine = false;
          }
        }
    
       
    
        return validLine;
    }

    itemDelete = (i, params) => {
        console.log("itemDelete > i > ", i);
        console.log("itemDelete > params > ", params);
        this.setState({
            DialogStatus: true,
            currentDeleteItemLine: { index: i, params: params }
        });
    }
    handleDialogClose = () => {
        this.setState({ DialogStatus: false });
    }

    deleteSelectedItem = () => {
        this.handleDialogClose();
        let currentDeleteItemLine = this.state.currentDeleteItemLine;
        let ProformaInvoiceLine = this.state.ProformaInvoiceLine;
        let newProformaInvoiceLine = [];
        for (let i = 0; i < ProformaInvoiceLine.length; i++) {
            if (currentDeleteItemLine.index === i) { } else {
                newProformaInvoiceLine.push(ProformaInvoiceLine[i]);
            }
        }
        this.setState({ ProformaInvoiceLine: newProformaInvoiceLine }, () => {
            this.calculateInvoiceDetails();
        });
    }

    calculateInvoiceDetails = () => {
        let ProformaInvoiceLine = this.state.ProformaInvoiceLine;

        let Amount = 0.00;
        let DiscountAmount = 0.00;
        let TotalTax = 0.00;

        let FCValue = 0.00;
        let BaseValue = 0.00;

        try {
            for (let i = 0; i < ProformaInvoiceLine.length; i++) {
                console.log("PurchaseOrderLine[i] > ", ProformaInvoiceLine[i]);
                let TAX = 0;
                if (this.state.Branch.IsGST === true) {
                    TAX = ProformaInvoiceLine[i].GSTPercentage;
                }
                if (this.state.Branch.IsVAT === true) {
                    TAX = ProformaInvoiceLine[i].VATPercentage;
                }

                let itemQty = parseFloat(ProformaInvoiceLine[i].Quantity);
                let itemPrice = parseFloat(ProformaInvoiceLine[i].Price);
                let itemTotalQtyPrice = parseFloat(itemQty) * parseFloat(itemPrice);
                let itemDiscountPercentage = parseFloat(ProformaInvoiceLine[i].LineDiscPercentage);
                let itemDiscountAmount = (parseFloat(itemTotalQtyPrice) * parseFloat(itemDiscountPercentage)) / 100;
                let itemTax = ((parseFloat(itemTotalQtyPrice) - parseFloat(itemDiscountAmount)) * parseFloat(TAX)) / 100;
                Amount += parseFloat(itemTotalQtyPrice);
                DiscountAmount += parseFloat(itemDiscountAmount);
                TotalTax += parseFloat(itemTax);
            }

            FCValue = (parseFloat(Amount) - parseFloat(DiscountAmount)) + TotalTax
            BaseValue = parseFloat(this.state.ExchRate) * parseFloat(FCValue);

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

            FCValue = this.state.IsRounding === true ? parseInt(FCValue) : FCValue.toFixed(2);
            BaseValue = this.state.IsRounding === true ? parseInt(BaseValue) : BaseValue.toFixed(2);


            if (isNaN(TotalTax)) {
                TotalTax = 0.00;
            } else {
                TotalTax = this.state.IsRounding === true ? parseInt(TotalTax) : TotalTax.toFixed(2);
            }


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


        } catch (e) { }

        this.setState({
            FCValue: FCValue,
            BaseValue: BaseValue,
            Amount: this.state.IsRounding === true ? parseInt(Amount) : Amount.toFixed(2),
            DiscountAmount: this.state.IsRounding === true ? parseInt(DiscountAmount) : DiscountAmount.toFixed(2),
            TotalTax: TotalTax,
        });
    }

    validateFormData = () => {
     let validData=true;

     return validData;
    }

    Add=()=>{
        let validData=false;
        validData=this.validateFormData();
        if(validData===true){
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);
    
            let ProformaInvoice= {
                ProformaID: parseInt(this.state.ProformaID),
                ProformaDate: moment(this.state.ProformaDate).format("MM/DD/YYYY"),
                BranchID: parseInt(this.state.BranchID),
                No: this.state.No,
                IsExport: this.state.IsExport,
                CustID: parseInt(this.state.CustID),
                BillingID: parseInt(this.state.BillingID),
                BillingName: this.state.BillingName,
                BillingAddress: this.state.BillingAddress,
                BillingAddress2: this.state.BillingAddress2,
                BillingAddress3: this.state.BillingAddress3,
                BillingCity: this.state.BillingCity,
                BillingPostCode: this.state.BillingPostCode,
                BillingCountryID: parseInt(this.state.BillingCountryID),
                BillingStateID: (this.state.BillingStateID===null || this.state.BillingStateID==="")?0:parseInt(this.state.BillingStateID),
                ShippingID: parseInt(this.state.ShippingID),
                ShippingName: this.state.ShippingName,
                ShippingAddress: this.state.ShippingAddress,
                ShippingAddress2: this.state.ShippingAddress2,
                ShippingAddress3: this.state.ShippingAddress3,
                ShippingCity: this.state.ShippingCity,
                ShippingPostCode: this.state.ShippingPostCode,
                ShippingCountryID: parseInt(this.state.ShippingCountryID),
                ShippingStateID: (this.state.ShippingStateID===null || this.state.ShippingStateID==="")?0:parseInt(this.state.ShippingStateID),
                CurrID: parseInt(this.state.CurrID),
                ExchRate: parseFloat(this.state.ExchRate),
                FCValue: parseFloat(this.state.FCValue),
                BaseValue: parseFloat(this.state.BaseValue),
                PaymentTermID: parseInt(this.state.PaymentTermID),
                PaymentTerm: this.state.PaymentTerm,
                Status: 0,
                WareHouseID: parseInt(this.state.WareHouseID),
                MODTaxID: parseInt(this.state.MODTaxID),
                IsRegistedCustomer: this.state.IsRegistedCustomer,
                GSTNo: this.state.GSTNo,
                VATNo: this.state.VATNo,
                IsRounding: this.state.IsRounding,
                IncoID: parseInt(this.state.IncoID),
                ShipmentModeID: parseInt(this.state.ShipmentModeID),
                Notes: this.state.Notes,
                IsSEZSale: this.state.IsSEZSale,
                IsTaxExempt: this.state.IsTaxExempt,
                Reason: this.state.Reason,
                GeneralPostingGroupID: parseInt(this.state.GeneralPostingGroupID),
                CustomerPostingGroupID: parseInt(this.state.CustomerPostingGroupID),
                NotifyID: parseInt(this.state.NotifyID),
                Reference: this.state.Reference,
                CustomerOrderDate: moment(this.state.CustomerOrderDate).format("MM/DD/YYYY"),
                ShipperID: parseInt(this.state.ShipperID),
                DispatchDate: moment(this.state.DispatchDate).format("MM/DD/YYYY"),
                DeliveryDate: moment(this.state.DeliveryDate).format("MM/DD/YYYY"),
                PackingType: parseInt(this.state.PackingType),
                PackingSpecification: parseInt(this.state.PackingSpecification),
                NoOfPacket: parseFloat(this.state.NoOfPacket),
                ServiceType: parseInt(this.state.ServiceType),
                CountryOfOrigin: parseInt(this.state.CountryOfOrigin),
                ExitPortID: parseInt(this.state.ExitPortID),
                Destination: this.state.Destination,
                FinalDestination: this.state.FinalDestination,
                BankID: parseInt(this.state.BankID),
                SalesPersonID: parseInt(this.state.SalesPersonID),
                UserID: CF.toInt(getCookie(COOKIE.USERID))
            }
     
            let ProformaInvoiceLineList=[];
            let ProformaInvoiceLine=this.state.ProformaInvoiceLine;
            console.log("ProformaInvoiceLine > ",ProformaInvoiceLine);
            for (let i = 0; i < ProformaInvoiceLine.length; i++) {
                ProformaInvoiceLineList.push({
                    Type: parseInt(ProformaInvoiceLine[i].Type),
                    LNo: (i + 1),
                    TypeID: parseInt(ProformaInvoiceLine[i].TypeID),
                    CustomerCode: ProformaInvoiceLine[i].CustomerCode,
                    UOMID: parseInt(ProformaInvoiceLine[i].UOMID),
                    TolerancePercentage: parseFloat(ProformaInvoiceLine[i].TolerancePercentage),
                    Quantity: parseFloat(ProformaInvoiceLine[i].Quantity),
                    Price: parseFloat(ProformaInvoiceLine[i].Price),
                    LineDiscPercentage: parseFloat(ProformaInvoiceLine[i].LineDiscPercentage),
                    ItemPostingGroupID: parseInt(ProformaInvoiceLine[i].ItemPostingGroupID),
                    VATPercentage: parseFloat(ProformaInvoiceLine[i].VATPercentage),
                    HSNCode: ProformaInvoiceLine[i].HSNCode,
                    GSTGroupID: parseInt(ProformaInvoiceLine[i].GSTGroupID),
                    GSTPercentage: parseFloat(ProformaInvoiceLine[i].GSTPercentage),
                    GSTPlaceOfSold: ProformaInvoiceLine[i].GSTPlaceOfSold,
                    IsLot: ProformaInvoiceLine[i].IsLot,
                });
            }

            let NoSeriesReqData = {
                ValidUser: ValidUser,
                DocumentNumber: {
                  NoSeriesID: this.state.IsExport === true ? CF.toInt(this.state.Branch.EPINo) : CF.toInt(this.state.Branch.LPINo),
                  TransDate: moment().format("MM-DD-YYYY"),
                },
              };

              const headers = {
                "Content-Type": "application/json",
              };

              let Url1 = APIURLS.APIURL.GetMasterDocumentNumber;
              axios
              .post(Url1, NoSeriesReqData, { headers })
              .then((response) => {
                if (response.status === 200) {
                    if(response.data!=""){
                        ProformaInvoice.No = response.data;
                        let reqData = {
                            ValidUser:ValidUser,
                            ProformaInvoice:ProformaInvoice,
                            ProformaInvoiceLineList:ProformaInvoiceLineList
                        };
                        console.log("reqData > ",reqData);
                        let Url2 = APIURLS.APIURL.Add_Update_ProformaInvoice;
                        axios
                        .post(Url2, reqData, { headers })
                        .then((response) => { 
                            if (response.status === 201 || response.status === 200) {
                                this.setState({ SuccessPrompt: true });
                                this.openEditMode(response.data.ID);
                            }else{
                                this.setState({ ErrorPrompt: true, ErrorMessageProps: "Data Error",ProgressLoader: true });
                            }
                        })
                        .catch((error) => {
                          console.log("Main API Error");                           
                          this.setState({ ErrorPrompt: true, ErrorMessageProps: "API Error",ProgressLoader: true });
                        });

                    }else{
                        this.setState({
                            ErrorMessageProps: "No. Series Not Found",
                            ErrorPrompt: true,
                            ProgressLoader: true
                          });
                    }
                    
                }else{
                    this.setState({
                        ErrorMessageProps: "No. Series Not defined.",
                        ErrorPrompt: true,
                        ProgressLoader: true
                      });
                }  

               

              })
              .catch((error) => {
                this.setState({ ErrorPrompt: true, ProgressLoader: true, ErrorMessageProps: "No. Series Not defined.", });
              });
             
            
    
            
        }else{
            this.setState({
                ErrorMessageProps:"Improper Data",
                ErrorPrompt:true
            });
        }

  

    }


    //direct edit once first time entry is made
    openEditMode = (ID) => {
        console.log("-openEditMode-");
        console.log("ID -> ", ID);
        let editUrl =
            URLS.URLS.editProfInv +
            this.state.urlparams +
            "&editPIID=" +
            ID + "&type=edit";
        window.location = editUrl;
    }

    render() {

        let disableEvents = false;
        disableEvents = CF.toInt(this.state.Status) > 1 ? true : false;
        const disabledStyle = {
            "pointer-events": disableEvents ? "none" : "unset"
        };


        const handleAccordionClick = (val, e) => {
            if (val === "accordion1") {
                this.state.accordion1 === true ? this.setState({ accordion1: false }) : this.setState({ accordion1: true });
            }
            if (val === "accordion2") {
                this.state.accordion2 === true ? this.setState({ accordion2: false }) : this.setState({ accordion2: true });
            }
            if (val === "accordion3") {
                this.state.accordion3 === true ? this.setState({ accordion3: false }) : this.setState({ accordion3: true });
            }
            if (val === "accordion4") {
                this.state.accordion4 === true ? this.setState({ accordion4: false }) : this.setState({ accordion4: true });
            }
            if (val === "accordion5") {
                this.state.accordion5 === true ? this.setState({ accordion5: false }) : this.setState({ accordion5: true });
            }
            if (val === "accordion6") {
                this.state.accordion6 === true ? this.setState({ accordion6: false }) : this.setState({ accordion6: true });
            }
            if (val === "accordion7") {
                this.state.accordion7 === true ? this.setState({ accordion7: false }) : this.setState({ accordion7: true });
            }
        };

        const breadcrumbHtml = (
            <Fragment>
                <Breadcrumb
                    backOnClick={this.props.history.goBack}
                    linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                    linkTitle="Dashboard"
                    masterHref={URLS.URLS.proformaMaster + this.state.urlparams}
                    masterLinkTitle="Purchase Invoice"
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

                    <Button
                        style={disabledStyle}
                        startIcon={APIURLS.buttonTitle.save.icon}
                        className="action-btns"
                        onClick={(e) => this.Add(e)}

                    >
                        {APIURLS.buttonTitle.save.name}
                    </Button>

                </ButtonGroup>
            </Fragment>
        );

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

        //-------------------------------------------------------------------------------

        return (
            <Fragment>
                <BackdropLoader open={!this.state.ProgressLoader} />
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

                <Grid container spacing={0} >
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Grid className="table-adjust" container spacing={0}>
                            <Grid item xs={12} sm={12} md={8} lg={8}>
                                <Grid container spacing={0} >
                                    <Grid item xs={12} sm={12} md={12} lg={12}>
                                        <Accordion
                                            style={disabledStyle}
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
                                                                                value={this.state.No}
                                                                                disabled={true}
                                                                            />

                                                                            <SDTI
                                                                                isMandatory={true}
                                                                                id="ProformaDate"
                                                                                label="Proforma Date"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => this.setState({ ProformaDate: moment(e.target.value).format("YYYY-MM-DD") })}
                                                                                value={this.state.ProformaDate}
                                                                            />

                                                                            <SADIB
                                                                                id="CustID"
                                                                                label="Customer"
                                                                                onChange={(e, value) => this.updateFormValue("CustID", value)}
                                                                                value={this.state.selectedCustomerObj}
                                                                                options={this.state.customerList}
                                                                                isMandatory={true}

                                                                            />
                                                                            <SDIB
                                                                                id="BillingID"
                                                                                label="Billing"
                                                                                onChange={(e) => this.updateFormValue("BillingID", e.target.value)}
                                                                                value={this.state.BillingID}
                                                                                param={this.state.CustomerBillingAddress}
                                                                                isMandatory={true}
                                                                            />

                                                                            <SIB
                                                                                id="BillingName"
                                                                                label="Billing Name"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                isMandatory={true}
                                                                                onChange={(e) => {
                                                                                    document.getElementById("BillingName").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ BillingName: e.target.value })}
                                                                            />

                                                                            <SIB
                                                                                id="BillingAddress"
                                                                                label="Billing Address"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("BillingAddress").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ BillingAddress: e.target.value })}
                                                                            />
                                                                            <SIB
                                                                                id="BillingAddress2"
                                                                                label="Billing Address 2"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("BillingAddress2").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ BillingAddress2: e.target.value })}
                                                                            />
                                                                            <SIB
                                                                                id="BillingAddress3"
                                                                                label="Billing Address 3"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("BillingAddress3").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ BillingAddress3: e.target.value })}
                                                                            />
                                                                            <SIB
                                                                                id="BillingCity"
                                                                                label="Billing City"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("BillingCity").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ BillingCity: e.target.value })}
                                                                            />
                                                                            <SIB
                                                                                id="BillingPostCode"
                                                                                label="Billing Postcode"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("BillingPostCode").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ BillingPostCode: e.target.value })}
                                                                            />

                                                                            <SDIB
                                                                                id="BillingCountry"
                                                                                label="Billing Country"
                                                                                value={this.state.BillingCountryID}
                                                                                param={this.state.CountryList}
                                                                                isMandatory={true}
                                                                                onChange={(e) => this.updateFormValue("BillingCountryID", e.target.value)}
                                                                            />
                                                                            <SDIB
                                                                                id="BillingState"
                                                                                label="Billing State"
                                                                                value={this.state.BillingStateID}
                                                                                param={this.state.StateList}
                                                                                onChange={(e) => this.setState({ BillingStateID: e.target.value })}
                                                                            />



                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                    <Grid container spacing={0}>
                                                                        <Grid item xs={12} sm={12} md={11} lg={11}>
                                                                            <SDTI
                                                                                isMandatory={true}
                                                                                id="DispatchDate"
                                                                                label="Dispatch Date"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => this.setState({ DispatchDate: moment(e.target.value).format("YYYY-MM-DD") })}
                                                                                value={this.state.DispatchDate}
                                                                            />
                                                                            <SDTI
                                                                                isMandatory={true}
                                                                                id="DeliveryDate"
                                                                                label="Delivery Date"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => this.setState({ DeliveryDate: moment(e.target.value).format("YYYY-MM-DD") })}
                                                                                value={this.state.DeliveryDate}
                                                                            />

                                                                            <SDTI
                                                                                isMandatory={true}
                                                                                id="CustomerOrderDate"
                                                                                label="Customer Order Date"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => this.setState({ CustomerOrderDate: moment(e.target.value).format("YYYY-MM-DD") })}
                                                                                value={this.state.CustomerOrderDate}
                                                                            />

                                                                            <SIB
                                                                                id="Reference"
                                                                                label="Reference"
                                                                                variant="outlined"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("Reference").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ Reference: e.target.value })}
                                                                            />

                                                                            <SDIB
                                                                                id="WareHouseID"
                                                                                label="Warehouse"
                                                                                onChange={(e) => this.setState({ WareHouseID: e.target.value })}
                                                                                param={this.state.WarehouseList}
                                                                                isMandatory={true}
                                                                                value={this.state.WareHouseID}
                                                                            />

                                                                            <SSIB
                                                                                key="IsSEZSale"
                                                                                id="IsSEZSale"
                                                                                label="SEZ Sale?"
                                                                                param={this.state.IsSEZSale}
                                                                                onChange={(e) => this.setState({ IsSEZSale: e.target.checked })}
                                                                            />

                                                                            <SSIB
                                                                                key="IsRounding"
                                                                                id="IsRounding"
                                                                                label="Rounding?"
                                                                                param={this.state.IsRounding}
                                                                                onChange={(e) => this.setState({ IsRounding: e.target.checked })}
                                                                            />

                                                                            <SSIB
                                                                                key="IsExport"
                                                                                id="IsExport"
                                                                                label="Export?"
                                                                                param={this.state.IsExport}
                                                                                onChange={(e) => this.setState({ IsExport: e.target.checked })}
                                                                            />

                                                                            <SSIB
                                                                                key="GSTPlaceOfSold"
                                                                                id="GSTPlaceOfSold"
                                                                                label="Shipping Address?"
                                                                                param={this.state.GSTPlaceOfSold}
                                                                                onChange={(e) => {
                                                                                    if (this.state.selectedCustomerObj) {
                                                                                        this.setState({ GSTPlaceOfSold: e.target.checked });
                                                                                        this.updateFormValue("GSTPlaceOfSold", e.target.checked);
                                                                                    } else {
                                                                                        this.setState({
                                                                                            ErrorMessageProps: "Customer Not selected",
                                                                                            ErrorPrompt: true
                                                                                        });
                                                                                    }
                                                                                }}
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
                                            style={disabledStyle}
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
                                                    key="GD-Activity"
                                                    className="accordion-Header-Title"
                                                >Lines</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                key="accordion4" className="AccordionDetails-css">
                                                <div style={{ height: 250, width: '100%', overflowY: 'scroll', overflowX: 'scroll' }}>
                                                   <POL 
                                                   state={this.state} 
                                                   updatePILStateOnBlur={this.updatePILStateOnBlur}
                                                   createBlankLine={this.createBlankLine}
                                                   itemDelete={this.itemDelete}
                                                   handleDialogClose={this.handleDialogClose}
                                                   deleteSelectedItem={this.deleteSelectedItem}
                                                   
                                                   />
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion
                                            style={disabledStyle}
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
                                                    key="GD-Activity"
                                                    className="accordion-Header-Title"
                                                >Invoice Details</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                key="accordion2" className="AccordionDetails-css">
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
                                                                                id="CurrID"
                                                                                label="Currency"
                                                                                onChange={(e) => {
                                                                                    this.setState({
                                                                                        CurrID: e.target.value,
                                                                                        ExchRate: this.getExchRate(CF.toInt(e.target.value))
                                                                                    })
                                                                                }
                                                                                }
                                                                                value={this.state.CurrID}
                                                                                param={this.state.CurrencyList}
                                                                                isMandatory={true}
                                                                            />

                                                                            <SIB
                                                                                type="number"
                                                                                id="ExchRate"
                                                                                label="Exchange Rate"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("ExchRate").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ ExchRate: e.target.value },()=>{
                                                                                    this.calculateInvoiceDetails();
                                                                                })}
                                                                                isMandatory={true}
                                                                            />

                                                                            <SDIB
                                                                                id="GeneralPostingGroupID"
                                                                                label="Gen.Posting Group"
                                                                                value={this.state.GeneralPostingGroupID}
                                                                                param={this.state.GeneralPostingGroupList}
                                                                                isMandatory={true}
                                                                                disabled={true}

                                                                            />
                                                                            <SDIB
                                                                                id="BankID"
                                                                                label="Bank"
                                                                                value={this.state.BankID}
                                                                                param={this.state.BankList}
                                                                                disabled={true}
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
                                                                                onChange={(e) => {
                                                                                    document.getElementById("PaymentTerm").value = this.getPaymentTerm(CF.toInt(e.target.value));
                                                                                    this.setState({
                                                                                        PaymentTermID: e.target.value,
                                                                                        PaymentTerm: this.getPaymentTerm(CF.toInt(e.target.value))
                                                                                    });
                                                                                }}
                                                                                value={this.state.PaymentTermID}
                                                                                param={this.state.PaymentTermsList}
                                                                                isMandatory={true}

                                                                            />
                                                                            <SIB
                                                                                id="PaymentTerm"
                                                                                label="Pay..Term..Details"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("PaymentTerm").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ PaymentTerm: e.target.value })}
                                                                                isMandatory={true}
                                                                            />
                                                                            <SDIB
                                                                                id="CustomerPostingGroupID"
                                                                                label="Cust.Posting Group"
                                                                                value={this.state.CustomerPostingGroupID}
                                                                                param={this.state.CustomerPostingGroupList}
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
                                                                                parseInt(this.state.CurrID) === parseInt(item.value) ? (
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
                                                                            value={this.state.DiscountAmount}
                                                                        />
                                                                        {
                                                                            this.state.CurrencyList.map((item, i) => (
                                                                                parseInt(this.state.CurrID) === parseInt(item.value) ? (
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
                                                                                parseInt(this.state.CurrID) === parseInt(item.value) ? (
                                                                                    <Fragment>
                                                                                        <SSDV
                                                                                            label={"Total FC.Value " + "(" + item.name + ")"}
                                                                                            value={this.state.FCValue}
                                                                                        />
                                                                                    </Fragment>
                                                                                )
                                                                                    : null
                                                                            ))
                                                                        }


                                                                        <SSDV
                                                                            label={"Total Base.Value (" + this.state.Branch.CurrencyCode + ")"}
                                                                            value={this.state.BaseValue}
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
                                            style={disabledStyle}
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
                                                    key="GD-Activity"
                                                    className="accordion-Header-Title"
                                                >Shipping Info</Typography>
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

                                                                            <SDIB
                                                                                id="ShippingID"
                                                                                label="Shipping"
                                                                                onChange={(e) => this.updateFormValue("ShippingID", e.target.value)}
                                                                                value={this.state.ShippingID}
                                                                                param={this.state.CustomerShippingAddress}
                                                                                isMandatory={true}

                                                                            />

                                                                            <SIB
                                                                                id="ShippingName"
                                                                                label="Shipping Name"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                isMandatory={true}
                                                                                onChange={(e) => {
                                                                                    document.getElementById("ShippingName").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ ShippingName: e.target.value })}
                                                                            />

                                                                            <SIB
                                                                                id="ShippingAddress"
                                                                                label="Shipping Address"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("ShippingAddress").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ ShippingAddress: e.target.value })}
                                                                            />
                                                                            <SIB
                                                                                id="ShippingAddress2"
                                                                                label="Shipping Address 2"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("ShippingAddress2").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ ShippingAddress2: e.target.value })}
                                                                            />
                                                                            <SIB
                                                                                id="ShippingAddress3"
                                                                                label="Shipping Address 3"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("ShippingAddress3").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ ShippingAddress3: e.target.value })}
                                                                            />
                                                                            <SIB
                                                                                id="ShippingCity"
                                                                                label="Shipping City"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("ShippingCity").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ ShippingCity: e.target.value })}
                                                                            />

                                                                            <SIB
                                                                                id="ShippingPostCode"
                                                                                label="Shipping Postcode"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("ShippingPostCode").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ ShippingPostCode: e.target.value })}
                                                                            />

                                                                            <SDIB
                                                                                id="ShippingCountry"
                                                                                label="Shipping Country"
                                                                                value={this.state.ShippingCountryID}
                                                                                param={this.state.CountryList}
                                                                                isMandatory={true}
                                                                                onChange={(e) => this.updateFormValue("ShippingCountryID", e.target.value)}
                                                                            />
                                                                            <SDIB
                                                                                id="ShippingStateID"
                                                                                label="Shipping State"
                                                                                value={this.state.ShippingStateID}
                                                                                param={this.state.StateList}
                                                                                onChange={(e) => this.setState({ ShippingStateID: e.target.value })}
                                                                            />

                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                    <Grid container spacing={0}>
                                                                        <Grid item xs={12} sm={12} md={11} lg={11}>

                                                                            <SDIB
                                                                                id="NotifyID"
                                                                                label="Notify"
                                                                                onChange={(e) => this.setState({ NotifyID: e.target.value })}
                                                                                value={this.state.NotifyID}
                                                                                param={[]}
                                                                            />

                                                                            <SDIB
                                                                                id="ShipperID"
                                                                                label="Shipper"
                                                                                onChange={(e) => this.setState({ ShipperID: e.target.value })}
                                                                                value={this.state.ShipperID}
                                                                                param={this.state.ShipperList}
                                                                                isMandatory={true}
                                                                                
                                                                            />

                                                                            <SDIB
                                                                                id="CountryOfOrigin"
                                                                                label="Country Of Origin"
                                                                                onChange={(e) => this.setState({ CountryOfOrigin: e.target.value })}
                                                                                value={this.state.CountryOfOrigin}
                                                                                param={this.state.CountryList}
                                                                            />

                                                                            <SDIB
                                                                                id="ExitPortID"
                                                                                label="Exit Port"
                                                                                onChange={(e) => this.setState({ ExitPortID: e.target.value })}
                                                                                value={this.state.ExitPortID}
                                                                                param={[]}
                                                                            />


                                                                            <SIB
                                                                                id="Destination"
                                                                                label="Destination"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("Destination").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ Destination: e.target.value })}
                                                                            />

                                                                            <SIB
                                                                                id="FinalDestination"
                                                                                label="Final Destination"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("FinalDestination").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ FinalDestination: e.target.value })}
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
                                            style={disabledStyle}
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
                                                    key="GD-Activity"
                                                    className="accordion-Header-Title"
                                                >Tax Information</Typography>
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
                                                                    <Grid container spacing={0}>
                                                                        <Grid item xs={12} sm={12} md={11} lg={11}>

                                                                            <SSIB
                                                                                key="IsRegistedSupplier"
                                                                                id="IsRegistedSupplier"
                                                                                label="Registed Supplier?"
                                                                                param={this.state.IsRegistedSupplier}
                                                                            />

                                                                            <SSIB
                                                                                key="IsTaxExempt"
                                                                                id="IsTaxExempt"
                                                                                label="Is TaxExempt?"
                                                                                param={this.state.IsTaxExempt}

                                                                            />

                                                                            <SIB
                                                                                id="GSTNo"
                                                                                label="GST No"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                disabled={true}
                                                                            />

                                                                            <SIB
                                                                                id="VATNo"
                                                                                label="VAT No"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                disabled={true}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                    <Grid container spacing={0}>
                                                                        <Grid item xs={12} sm={12} md={11} lg={11}>



                                                                            <SIB
                                                                                id="Reason"
                                                                                label="Reason"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                disabled={true}
                                                                            />

                                                                            <SDIB
                                                                                id="MODTaxID"
                                                                                label="Mode of Tax"
                                                                                onChange={(e) => this.setState({ MODTaxID: e.target.value })}
                                                                                value={this.state.MODTaxID}
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
                                            style={disabledStyle}
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
                                                    key="GD-Activity"
                                                    className="accordion-Header-Title"
                                                >Packing</Typography>
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
                                                                                id="PackingType"
                                                                                label="Packing Type"
                                                                                onChange={(e) => this.setState({ PackingType: e.target.value })}
                                                                                value={this.state.PackingType}
                                                                                param={this.state.PackingTypeList}
                                                                                isMandatory={true}
                                                                            />
                                                                            <SDIB
                                                                                id="PackingSpecification"
                                                                                label="Packing Specification"
                                                                                onChange={(e) => this.setState({ PackingSpecification: e.target.value })}
                                                                                value={this.state.PackingSpecification}
                                                                                param={this.state.PackingSpecificationList}
                                                                                isMandatory={true}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                    <Grid container spacing={0}>
                                                                        <Grid item xs={12} sm={12} md={11} lg={11}>
                                                                            <SIB
                                                                                type="number"
                                                                                id="NoOfPacket"
                                                                                label="No Of Packet"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("NoOfPacket").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ NoOfPacket: e.target.value })}
                                                                            />
                                                                            <SDIB
                                                                                id="ServiceType"
                                                                                label="ServiceType"
                                                                                onChange={(e) => this.setState({ ServiceType: e.target.value })}
                                                                                value={this.state.ServiceType}
                                                                                param={this.state.ServiceTypeList}
                                                                                isMandatory={true}
                                                                            />
                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                </Fragment>







                                            </AccordionDetails>
                                        </Accordion>

                                        <Accordion
                                            style={disabledStyle}
                                            key="a-7"
                                            expanded={this.state.accordion7}
                                            className="accordionD"
                                        >
                                            <AccordionSummary
                                                className="accordion-Header-Design"
                                                expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("accordion7", e)} />}
                                                aria-controls="panel1a-content"
                                                id="accordion7"
                                                style={{ minHeight: "40px", maxHeight: "40px" }}
                                                onClick={(e) => handleAccordionClick("accordion7", e)}
                                            >
                                                <Typography
                                                    key="GD-Activity"
                                                    className="accordion-Header-Title"
                                                >Terms</Typography>
                                            </AccordionSummary>
                                            <AccordionDetails
                                                key="accordion7" className="AccordionDetails-css">

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
                                                                                onChange={(e) => this.setState({ IncoID: e.target.value })}
                                                                                value={this.state.IncoID}
                                                                                param={this.state.IncoTermList}

                                                                            />
                                                                            <SDIB
                                                                                id="ShipmentModeID"
                                                                                label="Shipment Mode"
                                                                                onChange={(e) => this.setState({ ShipmentModeID: e.target.value })}
                                                                                value={this.state.ShipmentModeID}
                                                                                param={this.state.ShipmentModeList}
                                                                            />




                                                                        </Grid>
                                                                    </Grid>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                    <Grid container spacing={0}>
                                                                        <Grid item xs={12} sm={12} md={11} lg={11}>
                                                                            <SIB
                                                                                multiline={true}
                                                                                rows={2}
                                                                                id="Notes"
                                                                                label="Notes"
                                                                                variant="outlined"
                                                                                size="small"
                                                                                onChange={(e) => {
                                                                                    document.getElementById("Notes").value = e.target.value;
                                                                                }}
                                                                                onBlur={(e) => this.setState({ Notes: e.target.value })}

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


                                    </Grid>
                                </Grid>
                                <br />
                            </Grid>
                            <Grid item xs={12} sm={12} md={4} lg={4}>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }


}
export default profactivity;
