import React, { Fragment } from "react";
import axios from "axios";
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
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
      WarehouseDetailsExpanded:false,
      InvoicingDetailsExpanded: false,
      ReplenishmentDetailsExpanded: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      urlparams: "",
      ItemTypeMaster: APIURLS.ItemType,
      ItemType:0,
      ItemNo: "ITM0001",
      Code: "",
      Alias: "",
      Description1: "",
      Description2: "",
      PackingDesc1: "",
      PackingDesc2: "",
      ItemDeptID: 0,
      CatID: 0,
      IsTrading: false,
      IsActive: false,
      IsNonStockValuation: false,
      IsCustomized: false,
      IsSaleEvenQuantity: false,
      IsCertified: false,
      CertificateNo: "",
      IsDiscontine: false,
      Reason: "",
      ItemId:0,
      Item:{}
    };
  }

  componentDidMount() {

    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let ItemId= url.searchParams.get("edititemId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    this.setState({
      urlparams: urlparams,
      ItemId:ItemId
    },()=>{
      this.getItems();
    });
  }

  getItems() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Data={
      validUser:ValidUser,
      Item:{
        ItemId:parseInt(this.state.ItemId)
      }
    };

    let Url = APIURLS.APIURL.GetItem;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, Data, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({Item:data, ProgressLoader: true });
      })
      .catch((error) => { });
   

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
            document.getElementById("Reason").focus()
          }
          break;
        case "IsCertified":
          this.setState({ IsCertified: e.target.checked });
          if (e.target.checked === true) {            
            document.getElementById("CertificateNo").focus()
          }
          break;
        default:
          break;
      }
    }

    const processUpdateItem=()=>{
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateItem;
      let Data = {
        "validUser": {
          "UserID": 1,
          "Token": "EsNvnXGUkc7fQflQ"
        },
        "Item": {
          ItemId : this.state.ItemId,
          ItemNo : this.state.ItemNo,
          ItemType : parseInt(this.state.ItemType),
          Code : this.state.Code,
          Alias : this.state.Alias,
          Description1 : this.state.Description1,
          Description2 : this.state.Description2,
          PackingDesc1 : this.state.PackingDesc1,
          PackingDesc2 : this.state.PackingDesc2,
          ItemDeptId : this.state.ItemDeptId,
          CatId : this.state.CatId,
          IsActive : this.state.IsActive,
          IsTrading : this.state.IsTrading,
          IsNonStockValuation : this.state.IsNonStockValuation,
          IsCustomized : this.state.IsCustomized,
          IsCertified : this.state.IsCertified,
          CertificateNo : this.state.CertificateNo,
          IsSaleEvenQuantity : this.state.IsSaleEvenQuantity,
          Location : "",
          BarcodeNo : "",
          CartonHeight : 0,
          CartonLength : 0,
          CartonWidth : 0,
          NetWeight : 0,
          GrossWeight : 0,
          WarningLevel : 0,
          MinStockLevel : 0,
          Amsf : 0,
          Msf : 0,
          Bsf : 0,
          Moq : 0,
          ShipperQuantiry : 0,
          CbmperShipper : 0,
          IsDiscontine : this.state.IsDiscontine,
          Reason : this.state.Reason,
          UserId : parseInt(getCookie(COOKIE.USERID)),
          ModifyDate : "",
          TolerancePercentage : 0,
          IsQuality : false,
          SpecId : 0,
          AllowNegativeStock : false,
          PostingGroup : 0,
          CostingMethod : 0,
          StandardCost : 0,
          IndirectCostPercentage : 0,
          ProfitPercentage : 0,
          GstgroupId :0,
          Hsncode : "",
          BaseUom : 0,
          SalesUom : 0,
          PurchaseUom : 0,
          PackingUom : 0,
          Replenishment : 0,
          LeadTime : 0,
          IsLot : false,
          ManufacturingPolicy : 0,
          RoutingId : 0,
          Bomid : 0,
        }
      };

console.log("data > ",Data);

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
          
    }


    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />
        <ErrorSnackBar ErrorPrompt={this.state.ErrorPrompt} closeErrorPrompt={closeErrorPrompt} />
        <SuccessSnackBar SuccessPrompt={this.state.SuccessPrompt} closeSuccessPrompt={closeSuccessPrompt} />



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
                  onClick={(e)=>processUpdateItem()}
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
          <Grid item
           xs={12}
           sm={12}
           md={8}
           lg={8}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <Accordion
                  key="Item-General-Details"
                  expanded={this.state.GeneralDetailsExpanded}
                >
                  <AccordionSummary
                    className="accordion-Header-Design"
                    expandIcon={<ExpandMoreIcon onClick={(e) =>
                      handleAccordionClick("GeneralDetailsExpanded", e)
                    } />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("GeneralDetailsExpanded", e)
                    }
                  >
                    <Typography
                      key=""
                      className="accordion-Header-Title"
                    >General Details</Typography>
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
                              id="ItemType"
                              label="Item Type"
                              onChange={(e) => updateFormValue("ItemType", e)}
                              options={APIURLS.ItemType}
                              value={this.state.Item.itemType?this.state.Item.itemType:0}
                            />

                            <TextboxInput
                              id="ItemNo"
                              label="ItemNo"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("ItemNo", e)
                              }
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
                              onChange={(e) =>
                                updateFormValue("Code", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Item.code}

                            />
                            <TextboxInput
                              id="Alias"
                              label="Alias"
                              variant="outlined"
                              size="small"
                              onChange={(e) =>
                                updateFormValue("Alias", e)
                              }
                              InputProps={{
                                className: "textFieldCss",
                                maxlength: 50,
                              }}
                              value={this.state.Item.alias}

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
                              value={this.state.Item.description1}

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
                              value={this.state.Item.description2}

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

                            <DropdownInput
                              id="ItemDeptID"
                              label="ItemDept"
                              onChange={(e) => updateFormValue("ItemDeptID", e)}
                              options={this.state.ItemDept}
                            />
                            <DropdownInput
                              id="CatID"
                              label="ItemCat"
                              onChange={(e) => updateFormValue("CatID", e)}
                              options={this.state.ItemCat}
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
                              onChange={(e) =>
                                updateFormValue("IsTrading", e)
                              }
                            />   
                           

                            <SwitchInput
                              key="IsActive"
                              id="IsActive"
                              label="IsActive"
                              param={this.state.IsActive}
                              onChange={(e) =>
                                updateFormValue("IsActive", e)
                              }
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
                              onChange={(e) =>
                                updateFormValue("Reason", e)
                              }
                                                          
                              disabled={!this.state.IsDiscontine}
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
                    expandIcon={<ExpandMoreIcon onClick={(e) =>
                      handleAccordionClick("PlanningDetailsExpanded", e)
                    } />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("PlanningDetailsExpanded", e)
                    }
                  >
                    <Typography
                      key=""
                      className="accordion-Header-Title"
                    >Planning Details</Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                          
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
                    expandIcon={<ExpandMoreIcon onClick={(e) =>
                      handleAccordionClick("InvoicingDetailsExpanded", e)
                    } />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("InvoicingDetailsExpanded", e)
                    }
                  >
                    <Typography
                      key=""
                      className="accordion-Header-Title"
                    >Invoicing</Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                          
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
                    expandIcon={<ExpandMoreIcon onClick={(e) =>
                      handleAccordionClick("ReplenishmentDetailsExpanded", e)
                    } />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("ReplenishmentDetailsExpanded", e)
                    }
                  >
                    <Typography
                      key=""
                      className="accordion-Header-Title"
                    >Replenishment</Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                          
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
                    expandIcon={<ExpandMoreIcon onClick={(e) =>
                      handleAccordionClick("WarehouseDetailsExpanded", e)
                    } />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{ minHeight: "40px", maxHeight: "40px" }}
                    onClick={(e) =>
                      handleAccordionClick("WarehouseDetailsExpanded", e)
                    }
                  >
                    <Typography
                      key=""
                      className="accordion-Header-Title"
                    >Warehouse</Typography>
                  </AccordionSummary>
                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={6} lg={6}>
                          
                      </Grid>
                    </Grid>
                  </AccordionDetails>
                </Accordion>


              </Grid>
            </Grid>
            <div style={{height:50}}></div>
          </Grid>
          <Grid item xs={4}></Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default editItem;
