import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';


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
import Typography from "@material-ui/core/Typography";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { Divider } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";
import TextField from "@mui/material/TextField";

import BackdropLoader from "../../compo/backdrop";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Accordioncomponent from "../../compo/accordioncomponent";

import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";
import SADIB from "../../compo/gridautocompletedropdowninput";
import SSDV from "../../compo/grid2sectiondisplayview";
import SDTI from "../../compo/griddateinput";


class poactivity extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DialogStatus: false,
      BranchID: 0,
      accordion1: true,
      accordion2: false,
      accordion3: false,
      accordion4: false,
      accordion5: false,
      ProgressLoader: false,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: true,
      DisableUpdatebtn: false,
      SnackbarStatus: false,
      currentDeleteItemparams: {},
      initialCss: "",
      urlparams: "",
      editurl: "",
      typoTitle: "",
      type: "",
      POTypeList: APIURLS.POType,
      POItemType: APIURLS.POItemType,
      SupplierAdressList: [],
      ItemLinesRow: [],
      ItemLinesColm: [],
      supplierList: [],
      CurrencyList: [],
      PaymentTermList: [],
      SpecialInstList: [],
      WareHouseList: [],
      MODTaxList: [],
      IncoTermList: [],
      ShipmentModeList: [],
      SpecialInstValue: "",
      BillingIDValue: "",
      ItemDatagrid: null,
      InvoiceDetails: null,
      stepper: {
        MRNSTATUS: 3,
        activeStep: 0,
        steps: ["Open", "Release", "MRN", "Short Close"],
        skipped: new Set(),
      },
      Forms: {
        general: null,
        terms: null,
        taxInfo: null,
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
      PO: {
        POID: 0,
        BranchID: 0,
        No: "",
        PODate: "",
        SuplID: 0,   //on supplier chnage show address(BillingID) dropdown, show 1 address detail in section
        POType: 0,
        BillingID: 0,   //on suplier chnage - show address detail in section
        IsImport: false,
        CurrID: 0,  //on supplier chnage show curr dropdown with preselected of supplier
        ExchRate: "0.0000",   // on chnage of curr show Exchang Rate by calling API of exchnage
        FCValue: "0.00",   //non editable - but calculate as er user entry as per item added       
        BaseValue: "0.00",
        PaymentTermID: 0,     // on supplier chnage dispplay payment term
        PaymentTerm: "",   // show as per dropdown selected of - PaymentTermID
        ContactPerson: "", // on supplier chnage show ContactPerson - but user can change the input data
        Reference: "",   // direct input
        Status: 2,   //non editable but show the status
        DispachDate: "",   // as per  user input - but not less than PO date
        DeliveryDate: "",   // as er user inut - but not less than dispatch date
        WareHouseID: 0,   // show branch warehouse
        SpecialInst: "",   // get list instruction from table, and display initial datat and Also, Accet user input - and select from dropdown
        DeliveryAddress: "",  // as per ware house selected and also Provide user inut, and allow full access to change 
        MODTaxID: 0,   // select from dropdown -> use API
        AmendmentNo: "",  // user input - only integer enable at the time of edit
        AmendmentDate: "",  // user input - enable at the time of edit
        IsRegistedSupplier: false, // if anything of GST/VAT is available as per suplier selection
        GSTNo: "",  //of supplier
        VATNo: "", //of supplier
        IsRounding: false,   //as per branch data (by default false) - if true -> enable the input(but allow user user to chnage) else disable
        IncoID: 0, // from table-> use API
        ShipmentModeID: 0,   // use API and dislay in dropdown
        Notes: "",  // as per user entry
        IsSEZPurchase: false,  // as per branch information
        IsTaxExempt: false,  // as per supplier branch maping API 
        Reason: "",   // as per supplier branch maping API     
        GeneralPostingGroupID: 0,  // Non editable as per supplier branch mapping data
        SupplierPostingGroupID: 0, // Non editable as per supplier branch mapping data
        NotifyTo: "", //dropdown - For Kind Attn. input
        UserID: 0,   // loggind in user 
      }



    };
  }

  refreshStateFormData = () => {
    this.getSupplierList();
    this.getInvoiceDetails();
    this.generalForm();
    this.termsForm();
    this.taxForm();
  }

  componentDidMount() {
    this.getItemLinesColm();
    this.getItemLineList();
    this.refreshStateFormData();

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
    });

    console.log("On load state > ", this.state);
  }


  getSupplierList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllSupplier;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        let newData = [];
        for (let i = 0; i < data.length; i++) {
          let o = { label: data[i].Name, id: data[i].SuplID };
          newData.push(o);
        }
        if (data.length > 0) {
          this.setState({ supplierList: newData }, () => {
            this.generalForm();
          });
        } else {
          this.setState({ supplierList: data, ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ supplierList: [], ProgressLoader: true });
      });
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
          <select
            className="dropdown-css"
            defaultValue={params.value}

          >
            {NoList.map((item, i) => (
              <option value={item.value}> {item.name}</option>
            ))}
          </select>
        </Fragment>
      );
    } catch (err) { }

    return o;
  }

  itemDelete = (e, params) => {
    console.log("itemDelete > e > ", e);
    console.log("itemDelete > params > ", params);
    this.setState({
      DialogStatus: true,
      currentDeleteItemparams: params
    });
  }

  getItemLinesColm = () => {
    const columns = [
      {
        field: 'id',
        headerName: '&nbsp',
        width: 50,
        headerClassName: 'table-header-font',
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
        headerClassName: 'table-header-font',
        renderCell: this.renderType,
      },
      {
        field: 'NO',
        headerName: 'No.',
        width: 150,
        editable: false,
        headerClassName: 'table-header-font',
        renderCell: this.renderTypeItem,
      },

      {
        field: 'Description',
        headerName: 'Description',
        width: 350,
        headerClassName: 'table-header-font',
        editable: true,
      },
      {
        field: 'Qty',
        headerName: 'Qty',
        type: 'number',
        width: 110,
        headerClassName: 'table-header-font',
        editable: true,
      },
      {
        field: 'UOMID',
        headerName: 'Unit of Measurement',
        width: 250,
        headerClassName: 'table-header-font',
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
                  <div style={{ flexGrow: 1 }}>
                    <DataGrid
                      rows={this.state.ItemLinesRow}
                      columns={this.state.ItemLinesColm}
                      pageSize={100}
                      rowsPerPageOptions={[100]}
                      checkboxSelection={false}
                      disableSelectionOnClick={true}
                      hideFooterPagination
                    />
                  </div>
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





  updateFormValue = (param, e) => {

    this.validateBtnEnable();
  };

  validateBtnEnable = () => {

  };

  setParams = (object) => {
    this.setState({ Customer: object });
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
    console.log("deleteSelectedItem > currentDeleteItemparams > ", this.state.currentDeleteItemparams);
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

  generalForm = () => {
    const generalForm = (
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
                      onChange={(e) => this.updateFormValue("SuplID", e)}
                      value={this.state.PO.SuplID}
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
                      id="Address"
                      label="Address 1"
                      variant="outlined"
                      size="small"
                      value={null}
                      disabled={true}
                    />
                    <SIB
                      id="Address2"
                      label="Address 2"
                      variant="outlined"
                      size="small"
                      value={null}
                      disabled={true}
                    />
                    <SIB
                      id="Address3"
                      label="Address 3"
                      variant="outlined"
                      size="small"
                      value={null}
                      disabled={true}
                    />
                    <SIB
                      id="City"
                      label="City"
                      variant="outlined"
                      size="small"
                      value={null}
                      disabled={true}
                    />
                    <SIB
                      id="Postcode"
                      label="Postcode"
                      variant="outlined"
                      size="small"
                      value={null}
                      disabled={true}
                    />
                    <SIB
                      id="Country"
                      label="Country"
                      variant="outlined"
                      size="small"
                      value={null}
                      disabled={true}
                    />
                    <SIB
                      id="State"
                      label="State"
                      variant="outlined"
                      size="small"
                      value={null}
                      disabled={true}
                    />

                    <SDIB
                      id="WareHouseID"
                      label="Ware House"
                      onChange={(e) => this.updateFormValue("WareHouseID", e)}
                      value={this.state.PO.WareHouseID}
                      param={this.state.WareHouseList}
                      isMandatory={true}
                    />


                    <SSIB
                      key="IsImport"
                      id="IsImport"
                      label="Import?"
                      param={this.state.PO.IsImport}
                      onChange={(e) => this.updateFormValue("IsImport", e)}
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

                    />

                    <SIB
                      id="Reference"
                      label="Referance"
                      variant="outlined"
                      size="small"
                      value={this.state.PO.Reference}

                    />


                    <SIB
                      id="NotifyTo"
                      label="Notify To"
                      variant="outlined"
                      size="small"
                      value={this.state.PO.NotifyTo}
                    />

                    <SSIB
                      key="IsSEZPurchase"
                      id="IsSEZPurchase"
                      label="SEZ Purchase?"
                      param={this.state.PO.IsSEZPurchase}
                      onChange={(e) => this.updateFormValue("IsSEZPurchase", e)}
                    />



                    <SSIB
                      key="IsRounding"
                      id="IsRounding"
                      label="Is Rounding?"
                      param={this.state.PO.IsRounding}
                      onChange={(e) => this.updateFormValue("IsRounding", e)}
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
    );
    let Forms = this.state.Forms;
    Forms.general = generalForm;
    this.setState({
      Forms: Forms
    });
  }

  getInvoiceDetails = () => {
    let o = (
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
                      label="CurrID"
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

                    />

                    <SIB
                      id="GeneralPostingGroupID"
                      label="Gen.Posting Group"
                      onChange={(e) => this.updateFormValue("GeneralPostingGroupID", e)}
                      variant="outlined"
                      size="small"
                      value={this.state.PO.GeneralPostingGroupID}
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
                      onChange={(e) => this.updateFormValue("PaymentTermID", e)}
                      value={this.state.PO.PaymentTermID}
                      param={this.state.PaymentTermList}
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

                    <SIB
                      id="SupplierPostingGroupID"
                      label="Sup.Posting Group"
                      onChange={(e) => this.updateFormValue("SupplierPostingGroupID", e)}
                      variant="outlined"
                      size="small"
                      value={this.state.PO.SupplierPostingGroupID}
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
    );
    this.setState({ InvoiceDetails: o });
  }

  taxForm = () => {
    const taxInfo = (
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
    );
    let Forms = this.state.Forms;
    Forms.taxInfo = taxInfo;
    this.setState({
      Forms: Forms
    });
  }

  termsForm = () => {
    const termsForm = (
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

                    <SDIB
                      id="ShipmentModeID"
                      label="Shipment Mode"
                      onChange={(e) => this.updateFormValue("ShipmentModeID", e)}
                      value={this.state.PO.ShipmentModeID}
                      param={this.state.ShipmentModeList}
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
                   <div style={{ height:70 }}>&nbsp;</div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12} sm={12} md={6} lg={6}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={11} lg={11}>
                    <div style={{ height: 40 }}>&nbsp;</div>
                    <SDIB
                      id="SpecialInstList"
                      label="Choose Special Inst"
                      onChange={(e) => this.updateFormValue("SpecialInstList", e)}
                      value={this.state.PO.SpecialInst}
                      param={this.state.SpecialInstList}
                      isMandatory={true}
                    />
                    <SIB
                      id="SpecialInst"
                      label="Special Inst"
                      onChange={(e) => this.updateFormValue("SpecialInst", e)}
                      variant="outlined"
                      size="small"
                      value={this.state.SpecialInstValue}
                      isMandatory={true}
                      multiline={true}
                      rows={5}
                    />
 <div style={{ height:70 }}>&nbsp;</div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          {/* <Grid item xs={12} sm={12} md={12} lg={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            &nbsp;
          </Grid> */}
          {/* <Grid item xs={12} sm={12} md={12} lg={12}>
            &nbsp;
          </Grid>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            &nbsp;
          </Grid>
         
          <Grid item xs={12} sm={12} md={12} lg={12}>
         
          </Grid> 
           */}
          <Grid item xs={12} sm={12} md={11} lg={11}>
          <div style={{ height:30 }}>&nbsp;</div>
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
    );
    let Forms = this.state.Forms;
    Forms.terms = termsForm;
    this.setState({
      Forms: Forms
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
      this.setState({ Loader: false });
      console.log("Adding new");
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
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
              startIcon={APIURLS.buttonTitle.add.icon}
              className="action-btns"
              // onClick={(e) => AddNew(e)}
              disabled={this.state.DisableCreatebtn}
            >
              {APIURLS.buttonTitle.add.name}
            </Button>
          ) : null}

        </ButtonGroup>
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
                <Accordioncomponent
                  accordionKey="a-1"
                  expanded={this.state.accordion1}
                  onClick={(e) => handleAccordionClick("accordion1", e)}
                  id="accordion1"
                  typographyKey="GD-Activity"
                  typography="General"
                  accordiondetailsKey="accordion1"
                  html={this.state.Forms.general}
                />
                <Accordioncomponent
                  accordionKey="a-2"
                  expanded={this.state.accordion2}
                  onClick={(e) => handleAccordionClick("accordion2", e)}
                  id="accordion2"
                  typographyKey="Inv-Activity"
                  typography="Lines"
                  accordiondetailsKey="accordion2"
                  html={this.state.ItemDatagrid}
                />
                <Accordioncomponent
                  accordionKey="a-3"
                  expanded={this.state.accordion3}
                  onClick={(e) => handleAccordionClick("accordion3", e)}
                  id="accordion3"
                  typographyKey="Invoice-Activity"
                  typography="Invoice Details"
                  accordiondetailsKey="accordion3"
                  html={this.state.InvoiceDetails}
                />

                <Accordioncomponent
                  accordionKey="a-4"
                  expanded={this.state.accordion4}
                  onClick={(e) => handleAccordionClick("accordion4", e)}
                  id="accordion4"
                  typographyKey="Tax-Activity"
                  typography="Tax Information"
                  accordiondetailsKey="accordion4"
                  html={this.state.Forms.taxInfo}
                />

                <Accordioncomponent
                  accordionKey="a-5"
                  expanded={this.state.accordion5}
                  onClick={(e) => handleAccordionClick("accordion5", e)}
                  id="accordion5"
                  typographyKey="Terms-Activity"
                  typography="Terms"
                  accordiondetailsKey="accordion5"
                  html={this.state.Forms.terms}
                />

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
                                    value="5000.00"
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
          open={this.state.DialogStatus}
          onClose={() => this.handleDialogClose()}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            <span style={{ color: 'red' }}>Item Delete Request</span>
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {"Do you want to delete this item ?"}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => this.handleDialogClose()}>No</Button>
            <Button onClick={() => this.deleteSelectedItem()} autoFocus>
              Yes
            </Button>
          </DialogActions>
        </Dialog>


      </Fragment>
    );
  }
}
export default poactivity;
