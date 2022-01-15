import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

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

import BackdropLoader from "../../compo/backdrop";
import SuccessSnackBar from "../../compo/successSnackbar";
import ErrorSnackBar from "../../compo/errorSnackbar";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";

import SADIB from "../../compo/gridautocompletedropdowninput";
import SIB from "../../compo/gridtextboxinput";
import SIBSP from "../../compo/specialcompo/gridtextboxinput";
import SDTI from "../../compo/griddateinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";



import TextField from '@mui/material/TextField';



export default function License({ }) {
    let history = useHistory();
    const [ProgressLoader, setProgressLoader] = React.useState(false);
    const [SuccessPrompt, setSuccessPrompt] = React.useState(false);
    const [ErrorPrompt, setErrorPrompt] = React.useState(false);
    const [ErrorMessageProps, setErrorMessageProps] = React.useState("");
    const [typoTitle, settypoTitle] = React.useState("");
    const [urlparams, seturlparams] = React.useState("");

    const [accordion1, setaccordion1] = React.useState(true);
    const [accordion2, setaccordion2] = React.useState(false);
    const [accordion3, setaccordion3] = React.useState(false);
    const [accordion4, setaccordion4] = React.useState(true);

    const [customerList, setcustomerList] = React.useState([]);
    const [selectedCustomerObj, setselectedCustomerObj] = React.useState(null);
    const [CustomerBillingAddress, setCustomerBillingAddress] = React.useState([]);
    const [CustomerShippingAddress, setCustomerShippingAddress] = React.useState([]);
    const [NotifyAddress, setNotifyAddress] = React.useState([]);
    
    
    const [CountryList, setCountryList] = React.useState([]);
    const [StateList, setStateList] = React.useState([]);
    const [WarehouseList, setWarehouseList] = React.useState([]);  
    const [CurrencyList, setCurrencyList] = React.useState([]);
    const [GeneralPostingGroupList, setGeneralPostingGroupList] = React.useState([]);
    const [PaymentTermsList, setPaymentTermsList] = React.useState([]);    
    const [CustomerPostingGroupList, setCustomerPostingGroupList] = React.useState([]);
    
    
   

    
    //--------------------ProformaInvoice----------------------------------------------------

    const [ProformaID, setProformaID] = React.useState(0);  
    const [BranchID, setBranchID] = React.useState(0);  
    const [Status, setStatus] = React.useState(0);
    const [No, setNo] = React.useState("");
    const [ProformaDate, setProformaDate] = React.useState(moment().format("YYYY-MM-DD"));
    const [CustID, setCustID] = React.useState(0);    
    const [BillingID, setBillingID] = React.useState(0);
    const [BillingName, setBillingName] = React.useState("");
    const [BillingAddress, setBillingAddress] = React.useState("");
    const [BillingAddress2, setBillingAddress2] = React.useState("");
    const [BillingAddress3, setBillingAddress3] = React.useState("");
    const [BillingCity, setBillingCity] = React.useState("");
    const [BillingPostCode, setBillingPostCode] = React.useState("");
    const [BillingCountryID, setBillingCountryID] = React.useState(0);
    const [BillingStateID, setBillingStateID] = React.useState(0);

    const [ShippingID, setShippingID] = React.useState(0);
    const [ShippingName, setShippingName] = React.useState("");
    const [ShippingAddress, setShippingAddress] = React.useState("");
    const [ShippingAddress2, setShippingAddress2] = React.useState("");
    const [ShippingAddress3, setShippingAddress3] = React.useState("");
    const [ShippingCity, setShippingCity] = React.useState("");
    const [ShippingPostCode, setShippingPostCode] = React.useState("");
    const [ShippingCountryID, setShippingCountryID] = React.useState(0);
    const [ShippingStateID, setShippingStateID] = React.useState(0);

    const [DispatchDate, setDispatchDate] = React.useState(moment().format("YYYY-MM-DD"));
    const [DeliveryDate, setDeliveryDate] = React.useState(moment().format("YYYY-MM-DD"));
    const [CustomerOrderDate, setCustomerOrderDate] = React.useState(moment().format("YYYY-MM-DD"));
    const [Reference, setReference] = React.useState("");
    const [IsSEZSale, setIsSEZSale] = React.useState(false);
    const [IsRounding, setIsRounding] = React.useState(false);
    const [IsExport, setIsExport] = React.useState(false);
    const [WareHouseID, setWareHouseID] = React.useState(0);
    const [SalesPersonID, setSalesPersonID] = React.useState(0);
    const [IsDeleted, setIsDeleted] = React.useState(false);
    
    
    const [NotifyID, setNotifyID] = React.useState(0);
    const [ShipperID, setShipperID] = React.useState(0);

    const [CurrID, setCurrID] = React.useState(0);
    const [ExchRate, setExchRate] = React.useState(0);
    const [GeneralPostingGroupID, setGeneralPostingGroupID] = React.useState(0);
    const [PaymentTermID, setPaymentTermID] = React.useState(0);
    const [PaymentTerm, setPaymentTerm] = React.useState([]);
    const [CustomerPostingGroupID, setCustomerPostingGroupID] = React.useState(0);
    
   

   
   
    

    

                                  
    

    //-------------------------------------------------------------------------

    const [ProformaInvoice, setProformaInvoice] = React.useState({
        ProformaID: 0,
        BranchID: 0,
        No: "",
        ProformaDate: "",
        IsExport: false,
        CustID: 0,
        BillingID: 0,
        BillingName: "asasasas",
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
        CurrID: 0,
        ExchRate: 0,
        FCValue: 0,
        BaseValue: 0,
        PaymentTermID: 0,
        PaymentTerm: 0,
        Status: 0,
        WareHouseID: 0,
        MODTaxID: 0,
        IsRegistedCustomer: false,
        GSTNo: "",
        VATNo: "",
        IsRounding: false,
        IncoID: 0,
        ShipmentModeID: 0,
        Notes: "",
        IsSEZSale: false,
        IsTaxExempt: false,
        Reason: "",
        GeneralPostingGroupID: 0,
        CustomerPostingGroupID: 0,
        NotifyID: 0,
        Reference: "",
        CustomerOrderDate: "",
        ShipperID: 0,
        DispatchDate: "",
        DeliveryDate: "",
        PackingType: 0,
        PackingSpecification: "",
        NoOfPacket: "",
        ServiceType: 0,
        CountryOfOrigin: "",
        ExitPortID: 0,
        Destination: "",
        FinalDestination: "",
        BankID: 0,
        SalesPersonID: 0,
        IsDeleted: false,
        UserID: 0,
        ModifyDate: "",


    });

    //to disable screen if Status is not Open
    let disableEvents = false;
    // disableEvents = CF.toInt() ===1 ? true : false;
    const disabledStyle = {
        "pointer-events": disableEvents ? "none" : "unset"
    };


    useEffect(() => {
        let params = CF.GET_URL_PARAMS();
        seturlparams(params);
        var url = new URL(window.location.href);
        const type = url.searchParams.get("type");
        let branchId = url.searchParams.get("branchId");
        if (type === "add") {
            settypoTitle("Add");
            setProgressLoader(true);
        } else {
            settypoTitle("Edit");
        }

        getCustomersByBranchID(branchId);


    }, []);


    const getCustomersByBranchID = (branchId) => {
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
                setcustomerList(data.Customer);
                setCountryList(data.Country);
                setStateList(data.State);
                setWarehouseList(data.WareHouse);
                setCurrencyList(data.Currency);
                setGeneralPostingGroupList(data.GeneralPostingGroup);
                setPaymentTermsList(data.PaymentTerms);
                setCustomerPostingGroupList(data.CustomerPostingGroup);
            })
            .catch((error) => {

            });
    }

    const getPaymentTerm=(id)=>{
        let paymentTerm="";

        for(let i=0;i<PaymentTermsList.length;i++){
            if(parseInt(id)===parseInt(PaymentTermsList[i].value)){
                paymentTerm=PaymentTermsList[i].Description;
            }
        }

        return paymentTerm;
    }

    const getExchRate=(id)=>{
        let exchRate=0;

        for(let i=0;i<CurrencyList.length;i++){
            if(parseInt(id)===parseInt(CurrencyList[i].value)){
                exchRate=parseFloat(CurrencyList[i].ExchRate);
            }
        }

        return exchRate;
    }

    const updateFormValue = (key, e) => {
        console.log("key > ",key);
        console.log("e > ",e);
        
        switch (key) {
            case "CustID":   
                if (e) {
                    setselectedCustomerObj(e);
                    setCustomerBillingAddress(e.BillingAddress);
                    setCustomerShippingAddress(e.ShippingAddress);
                    setNotifyAddress(e.NotifyAddress);
                    setCustID(CF.toInt(e.id));
                    
                    setCurrID(CF.toInt(e.CurrID));
                    setExchRate(getExchRate(CF.toInt(e.CurrID)));                   
                    setPaymentTermID(CF.toInt(e.PaymentTermID));                   
                    setPaymentTerm(getPaymentTerm(CF.toInt(e.PaymentTermID)));

                  
                    
                    if(e.BillingAddress){
                        if(e.BillingAddress.length>0){
                            setBillingID(e.BillingAddress[0].value);
                            setBillingName(e.BillingAddress[0].Name);
                            setBillingAddress(e.BillingAddress[0].Address);
                            setBillingAddress2(e.BillingAddress[0].Address2);
                            setBillingAddress3(e.BillingAddress[0].Address3);
                            setBillingCity(e.BillingAddress[0].City);
                            setBillingPostCode(e.BillingAddress[0].PostCode);
                            setBillingCountryID(e.BillingAddress[0].CountryID);
                            setBillingStateID(e.BillingAddress[0].StateID);  
                            setGeneralPostingGroupID(e.BillingAddress[0].GeneralPostingGroupID);
                            setCustomerPostingGroupID(e.BillingAddress[0].CustomerPostingGroupID);
                                                      
                        }
                    }
                    if(e.ShippingAddress){
                        if(e.ShippingAddress.length>0){
                            setShippingID(e.ShippingAddress[0].value);
                            setShippingName(e.ShippingAddress[0].Name);
                            setShippingAddress(e.ShippingAddress[0].Address);
                            setShippingAddress2(e.ShippingAddress[0].Address2);
                            setShippingAddress3(e.ShippingAddress[0].Address3);
                            setShippingCity(e.ShippingAddress[0].City);
                            setShippingPostCode(e.ShippingAddress[0].PostCode);
                            setShippingCountryID(e.ShippingAddress[0].CountryID);
                            setShippingStateID(e.ShippingAddress[0].StateID);  
                                                    
                        }
                    }
                } else {
                    setselectedCustomerObj(null);
                }
                break;               
                case "BillingCountryID":
                    setBillingCountryID(CF.toInt(e));
                break;   
                case "ShippingCountryID":
                    setShippingCountryID(CF.toInt(e));
                break;              
                default:     
                break;
        }
    }

    //-----------------------------------------------------------------------------------------------------------


    const handleAccordionClick = (val, e) => {
        if (val === "accordion1") {
            accordion1 === true ? setaccordion1(false) : setaccordion1(true);
        }
        if (val === "accordion2") {
            accordion2 === true ? setaccordion2(false) : setaccordion2(true);
        }
        if (val === "accordion3") {
            accordion3 === true ? setaccordion3(false) : setaccordion3(true);
        }
        if (val === "accordion4") {
            accordion4 === true ? setaccordion4(false) : setaccordion4(true);
        }


    };

    const breadcrumbHtml = (
        <Fragment>
            <Breadcrumb
                backOnClick={history.goBack}
                linkHref={URLS.URLS.userDashboard + urlparams}
                linkTitle="Dashboard"
                masterHref={URLS.URLS.proformaMaster + urlparams}
                masterLinkTitle="Purchase Invoice"
                typoTitle={typoTitle}
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
                //   onClick={(e) => Add_Update(e)}

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

    return (
        <Fragment>
            <BackdropLoader open={!ProgressLoader} />
            <ErrorSnackBar
                ErrorPrompt={ErrorPrompt}
                closeErrorPrompt={closeErrorPrompt}
                ErrorMessageProps={ErrorMessageProps}
            />
            <SuccessSnackBar
                SuccessPrompt={SuccessPrompt}
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
                                        expanded={accordion1}
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
                                                                            value={No}
                                                                            disabled={true}
                                                                        />

                                                                        <SDTI
                                                                            isMandatory={true}
                                                                            id="ProformaDate"
                                                                            label="Proforma Date"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => setProformaDate(moment(e.target.value).format("YYYY-MM-DD"))}
                                                                            value={ProformaDate}
                                                                        />

                                                                        <SADIB
                                                                            id="CustID"
                                                                            label="Customer"
                                                                            onChange={(e, value) => updateFormValue("CustID", value)}
                                                                            value={selectedCustomerObj}
                                                                            options={customerList}
                                                                            isMandatory={true}

                                                                        />
                                                                        <SDIB
                                                                            id="BillingID"
                                                                            label="Billing"
                                                                            onChange={(e) => updateFormValue("BillingID", e.target.value)}
                                                                            value={BillingID}
                                                                            param={CustomerBillingAddress}
                                                                            isMandatory={true}
                                                                        />

                                                                      
                                                                        <SIB
                                                                            id="BillingName"
                                                                            label="Billing Name"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={BillingName}
                                                                            onChange={(e) =>  setBillingName(e.target.value)}
                                                                        />

                                                                        <SIB
                                                                            id="BillingAddress"
                                                                            label="Billing Address"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={BillingAddress}
                                                                            onChange={(e) => setBillingAddress(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="BillingAddress2"
                                                                            label="Billing Address 2"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={BillingAddress2}
                                                                            onChange={(e) => setBillingAddress2(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="BillingAddress3"
                                                                            label="Billing Address 3"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={BillingAddress3}
                                                                            onChange={(e) => setBillingAddress3(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="BillingCity"
                                                                            label="Billing City"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={BillingCity}
                                                                            onChange={(e) => setBillingCity(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="BillingPostcode"
                                                                            label="Billing Postcode"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={BillingPostCode}
                                                                            onChange={(e) => setBillingPostCode(e.target.value)}
                                                                        />

                                                                        <SDIB
                                                                            id="BillingCountry"
                                                                            label="Billing Country"
                                                                            value={BillingCountryID}
                                                                            param={CountryList}
                                                                            onChange={(e) => updateFormValue("BillingCountryID", e.target.value)}
                                                                        />
                                                                        <SDIB
                                                                            id="BillingState"
                                                                            label="Billing State"
                                                                            value={BillingStateID}
                                                                            param={StateList}
                                                                            onChange={(e) => setBillingStateID(e.target.value)}
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
                                                                            onChange={(e) =>setDispatchDate(moment(e.target.value).format("YYYY-MM-DD"))}
                                                                            value={DispatchDate}
                                                                        />
                                                                        <SDTI
                                                                            isMandatory={true}
                                                                            id="DeliveryDate"
                                                                            label="Delivery Date"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) =>setDeliveryDate(moment(e.target.value).format("YYYY-MM-DD"))}
                                                                            value={DeliveryDate}
                                                                        />

                                                                        <SDTI
                                                                            isMandatory={true}
                                                                            id="CustomerOrderDate"
                                                                            label="Customer Order Date"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            onChange={(e) => setCustomerOrderDate(moment(e.target.value).format("YYYY-MM-DD"))}
                                                                            value={CustomerOrderDate}
                                                                        />

                                                                        <SIB
                                                                            id="Reference"
                                                                            label="Reference"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            defaultValue={Reference}
                                                                            onBlur={(e) => setReference(e.target.value)}
                                                                        />

                                                                        <SDIB
                                                                            id="WareHouseID"
                                                                            label="Warehouse"
                                                                            onChange={(e) => setWareHouseID(e.target.value)}
                                                                            value={WareHouseID}
                                                                            param={WarehouseList}
                                                                            isMandatory={true}

                                                                        />

                                                                        <SSIB
                                                                            key="IsSEZSale"
                                                                            id="IsSEZSale"
                                                                            label="SEZ Sale?"
                                                                            param={IsSEZSale}
                                                                        />

                                                                        <SSIB
                                                                            key="IsRounding"
                                                                            id="IsRounding"
                                                                            label="Rounding?"
                                                                            param={IsRounding}
                                                                        />

                                                                        <SSIB
                                                                            key="IsExport"
                                                                            id="IsExport"
                                                                            label="Export?"
                                                                            param={IsExport}
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
                                        expanded={accordion4}
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
                                                                    </Grid>
                                                                </Grid>
                                                            </Grid>
                                                            <Grid item xs={12} sm={12} md={6} lg={6}>
                                                                <Grid container spacing={0}>
                                                                    <Grid item xs={12} sm={12} md={11} lg={11}>

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
                                        key="a-2"
                                        expanded={accordion2}
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
                                    onChange={(e) => setCurrID(e.target.value)}
                                    value={CurrID}
                                    param={CurrencyList}
                                    isMandatory={true}
                                  />

                                  <SIB
                                  type="number"
                                    id="ExchRate"
                                    label="Exchange Rate"
                                    variant="outlined"
                                    size="small"
                                    value={ExchRate}
                                    onChange={(e) => setExchRate(e.target.value)}
                                    isMandatory={true}
                                  />

                                  <SDIB
                                    id="GeneralPostingGroupID"
                                    label="Gen.Posting Group"
                                    value={GeneralPostingGroupID}
                                    param={GeneralPostingGroupList}
                                    isMandatory={true}
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
                                        setPaymentTermID(e.target.value);
                                        setPaymentTerm(getPaymentTerm(CF.toInt(e.target.value)));
                                    }}
                                    value={PaymentTermID}
                                    param={PaymentTermsList}
                                    isMandatory={true}

                                  />
                                  <SIB
                                    id="PaymentTerm"
                                    label="Pay..Term..Details"
                                    onChange={(e) => setPaymentTerm(e.target.value)}
                                    variant="outlined"
                                    size="small"
                                    value={PaymentTerm}
                                    isMandatory={true}
                                  />
                                  <SDIB
                                    id="CustomerPostingGroupID"
                                    label="Cust.Posting Group"
                                    value={CustomerPostingGroupID}
                                    param={CustomerPostingGroupList}
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
                                                </Grid>
                                            </Fragment>
                                        </AccordionDetails>
                                    </Accordion>
                                    <Accordion
                                        style={disabledStyle}
                                        key="a-3"
                                        expanded={accordion3}
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
                                                                            onChange={(e) => updateFormValue("ShippingID", e.target.value)}
                                                                            value={ShippingID}
                                                                            param={CustomerShippingAddress}
                                                                            isMandatory={true}

                                                                        />
                                                                        
                                                                    <SIB
                                                                            id="ShippingName"
                                                                            label="Shipping Name"
                                                                            variant="outlined"
                                                                            size="small"                 
                                                                            value={ShippingName}
                                                                            onChange={(e) =>  setShippingName(e.target.value)}
                                                                        />

                                                                        <SIB
                                                                            id="ShippingAddress"
                                                                            label="Shipping Address"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={ShippingAddress}
                                                                            onChange={(e) => setShippingAddress(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="ShippingAddress2"
                                                                            label="Shipping Address 2"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={ShippingAddress2}
                                                                            onChange={(e) => setShippingAddress2(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="ShippingAddress3"
                                                                            label="Shipping Address 3"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={ShippingAddress3}
                                                                            onChange={(e) => setShippingAddress3(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="ShippingCity"
                                                                            label="Shipping City"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={ShippingCity}
                                                                            onChange={(e) => setShippingCity(e.target.value)}
                                                                        />
                                                                        <SIB
                                                                            id="ShippingPostcode"
                                                                            label="Shipping Postcode"
                                                                            variant="outlined"
                                                                            size="small"
                                                                            value={ShippingPostCode}
                                                                            onChange={(e) => setShippingPostCode(e.target.value)}
                                                                        />

                                                                        <SDIB
                                                                            id="ShippingCountry"
                                                                            label="Shipping Country"
                                                                            value={ShippingCountryID}
                                                                            param={CountryList}
                                                                            onChange={(e) => updateFormValue("ShippingCountryID", e.target.value)}
                                                                        />
                                                                        <SDIB
                                                                            id="ShippingState"
                                                                            label="Shipping State"
                                                                            value={ShippingStateID}
                                                                            param={StateList}
                                                                            onChange={(e) => setShippingStateID(e.target.value)}
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
                                                                            onChange={(e) => setNotifyID(e.target.value)}
                                                                            value={NotifyID}
                                                                            param={[]}
                                                                        />

                                                                        <SDIB
                                                                            id="ShipperID"
                                                                            label="Shipper"
                                                                            onChange={(e) => setShipperID(e.target.value)}
                                                                            value={ShipperID}
                                                                            param={[]}
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
                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    )
}