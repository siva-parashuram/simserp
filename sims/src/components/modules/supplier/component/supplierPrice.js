import React, { Fragment } from "react";
import axios from "axios";
import moment from "moment";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import BackdropLoader from "../../../compo/backdrop";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import DateTextboxInput from "../../../compo/tablerowcelldateinput";
import Autocomplete from "../../../compo/tablerowcellautocompleteinput";


class supplierPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      BranchID:0,
      pagination: {
        page: 0,
        rowsPerPage: 10,
      },
      ErrorMessageProps:"",
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      FullSmallBtnArea: false,
      mainframeW: 12,
      hideSidePanel: true,
      initialCss: "",
      listSupplierPrice: null,
      updateSupplierPrice: {},
      BranchMappingData:[],
      SupplierPriceData: [],
      GeneralDetailsExpanded: true,
      UpdateActionBtn:false,
      createNewBtn: false,
      updateBtn: false,
      selectedOldItemIndex: null,
      selectedOldItem: null,
      currencyList: [],
      itemDataList: [],
      itemDataListSorted:[],
      UOMList: [],
      SupplierPriceList: [],
      SupplierPriceHistory: [],
      SupplierPrice: {
        SuplID: this.props.SuplID,
        StartDate: "",
        EndDate: "",
        ItemID: 0,
        UOM: 0,
        CurrID: "-1",
        MinQty: 0,
        MaxQty: 0,
        UnitPrice: 0,
        EmailID: "",
        SupplierCode:"",
        BranchID: 0,
      },
      Validations: {
        MinQty: { errorState: false, errorMssg: "" },
        MaxQty: { errorState: false, errorMssg: "" },
        UnitPrice: { errorState: false, errorMssg: "" },
        EmailID: { errorState: false, errorMssg: "" },
      },
      selectedItem:null,
      ItemCategoryData:[],
      CategoryID:0,
       
    };
  }

  componentDidMount() {
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    this.setState({BranchID:parseInt(branchId)},()=>{
      this.getSupplierPrice();
      this.getBranchMapping();
      this.getAllDropdowns();
    });
  }

  getAllDropdowns = () => {
    this.getCurrencyList();
    this.getItems();
    this.getUOMList();
    this.getItemCategoryData();
  };

  getBranchMapping = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetSupplierBranchMappingBySuplID;
    let data = {
      ValidUser: ValidUser,
      SupplierBranchMapping: {
        SuplID: this.props.SuplID,
      },
    };
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        let newD = [];

        
        
        for (let i = 0; i < data.length; i++) {
          
          let o = {
            name: data[i].Name,
            value: data[i].BranchID,
            CurrID:data[i].CurrID
          };
          newD.push(o);
        }
        this.setState(
          {
            BranchMappingData: newD,
            ProgressLoader: true,
          }
        );
      })
      .catch((error) => {
        this.setState({ BranchMappingData: [], ProgressLoader: true }, () => {
          this.setState({
            listBranchMapping: this.listBranchMapping(),
          });
        });
      });
  };

  getCurrencyList = () => {
    this.setState({ ProgressLoader: false });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetCurrencies;

    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let newD = [];
        for (let i = 0; i < data.length; i++) {
          let o = {
            name: data[i].Code,
            value: data[i].CurrID,
          };
          newD.push(o);
        }

        this.setState(
          {
            currencyList: newD,
            ProgressLoader: true,
          },
          () => {
            this.setState({
              listSupplierPrice: this.listSupplierPrice(),
            });
          }
        );
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
       
        let newData=[];
        for(let i=0;i<data.length;i++){
          if(data[i].IsCategoryBranchActive===true){
            let obj={
              name:data[i].Code,
              value:data[i].CatID
            };
            newData.push(obj);
          }
        }        
        this.setState({ ItemCategoryData: newData,ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
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
      BranchID:parseInt(this.state.BranchID)
    };
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        let newD = [];
        for (let i = 0; i < data.length; i++) {
          if(data[i].IsItemBranchActive===true){
            let o = {
              name: data[i].Code,
              value: data[i].ItemID,
              CatID:data[i].CatID
            };
            newD.push(o);
          }
        }
        this.setState({ itemDataList: newD,itemDataListSorted:newD });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {});
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

  getSupplierPrice = () => {
    console.log("-----Price----");
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let data = {
      ValidUser: ValidUser,
      SupplierPrice: {
        SuplID: this.props.SuplID,
      },
    };
    let Url = APIURLS.APIURL.GetSupplierPriceBySuplID;
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;
        this.setState(
          {
            SupplierPriceList: data,
            SupplierPriceData: data,
            ProgressLoader: true,
          },
          () => {
            this.setState({
              listSupplierPrice: this.listSupplierPrice(),
            });
          }
        );
      })
      .catch((error) => {
        this.setState(
          {
            SupplierPriceList: [],
            SupplierPriceData: [],
            ProgressLoader: true,
          },
          () => {
            this.setState({
              listSupplierPrice: this.listSupplierPrice(),
            });
          }
        );
      });
  };

  handleRowClick = (e, item, id, i) => {
    this.removeIsSelectedRowClasses();
    try{
      let SupplierPrice = {
        SuplID: item.SuplID,
        StartDate: moment(item.StartDate).format("YYYY-MM-DD"),
        EndDate: moment(item.EndDate).format("YYYY-MM-DD"),
        ItemID: item.ItemID,
        UOM: item.UOM,
        CurrID: item.CurrID,
        MinQty: item.MinQty,
        MaxQty: item.MaxQty,
        UnitPrice: item.UnitPrice,
        EmailID: item.EmailID,
        SupplierCode: item.SupplierCode,
        BranchID: item.BranchID,
      };
  
      console.log("item > ", item);
      console.log("SupplierPrice > ", SupplierPrice);
  
      let selectedItem=null;
      for(let i=0;i<this.state.itemDataList.length;i++){
        if(parseInt(item.ItemID)===parseInt(this.state.itemDataList[i].value)){
          selectedItem=this.state.itemDataList[i];
          this.setState({selectedItem:selectedItem});
          break;
        }
      }
  
      try {
        this.setState({
          
          SupplierPrice: SupplierPrice,
          FullSmallBtnArea: true,
          mainframeW: 8,
          hideSidePanel: false,
          updateBtn: true,
          createNewBtn: false,
          selectedOldItem: item,
          selectedOldItemIndex: i,
        });
  
       
        document.getElementById(id).classList.add("selectedRow");
      } catch (ex) {}
    }catch(error){}
   
  };

  removeIsSelectedRowClasses = () => {
    try {
      for (let i = 0; i < this.state.SupplierPriceData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) {}
  };

  isCurrentBranchMapped=()=>{
    let isCurrentBranchMapped=false;
    for(let i=0;i<this.state.BranchMappingData.length;i++){
      if(parseInt(this.state.BranchMappingData[i].value)===parseInt(this.state.BranchID)){
        isCurrentBranchMapped=true;
        break;
      }
    }
    return isCurrentBranchMapped;
  }

  showAddNewPanel = (e) => {
     let isCurrentBranchMapped=false;
     isCurrentBranchMapped=this.isCurrentBranchMapped();
    if(isCurrentBranchMapped===true){
      this.setState({ErrorMessageProps:""});
      const today = moment().format(
        "YYYY-MM-DD"
      );
      this.removeIsSelectedRowClasses();
      let SupplierPriceTemplate = {
        SuplID: this.props.SuplID,
        StartDate: today,
        EndDate: today,
        ItemID: 0,
        UOM: 0,
        CurrID: 0,
        MinQty: 0,
        MaxQty: 0,
        UnitPrice: 0,
        EmailID: "",
        SupplierCode:"",
        BranchID:parseInt(this.state.BranchID)
      };

      let BranchMappingData=this.state.BranchMappingData;
      for(let i=0;i<BranchMappingData.length;i++){
        if(parseInt(BranchMappingData[i].value)===parseInt(this.state.BranchID)){
          SupplierPriceTemplate.CurrID=parseInt(BranchMappingData[i].CurrID);
          this.setState({SupplierPrice:SupplierPriceTemplate});//preset the currency as per the mapped branch
          break;
        }
      }
        
      this.setState({
        SupplierPrice: SupplierPriceTemplate,
        FullSmallBtnArea: true,
        mainframeW: 8,
        hideSidePanel: false,
        createNewBtn: true,
        updateBtn: false,
      });
    }else{
       this.setState({ErrorMessageProps:"Kindly Map Branch For this Supplier",ErrorPrompt:true});
    }

   


  };

  getPageData = (data) => {
    let rows = data;
    let page = parseInt(this.state.pagination.page);
    let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
    return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
  };

  listSupplierPrice = () => {
    let o = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Button
             startIcon={APIURLS.buttonTitle.add.icon}
              className="action-btns"
              style={{ marginLeft: 5, marginBottom: 10 }}
              onClick={(e) => this.showAddNewPanel(e)}
            >
              <span style={{ paddingLeft: 7, paddingRight: 5 }}>
                {APIURLS.buttonTitle.add.name}
              </span>
            </Button>
          </Grid>
        </Grid>

        <div style={{ height: 350, width: "100%", overflowY: "scroll" }}>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>
              <Table
                stickyHeader
                size="small"
                className=""
                aria-label="SupplierPrice List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                   
                    <TableCell className="table-header-font" align="left">
                      Start Date
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      End Date
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Item
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      UOM
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Currency
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Min Qty
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Max Qty
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                    Unit Price
                    </TableCell>
                    
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {this.state.SupplierPriceList.map((item, i) => (
                    <Fragment>
                      
                      {parseInt(this.state.BranchID)===parseInt(item.BranchID)?(
                        <TableRow
                        id={"row_" + i}
                        key={i}
                        onClick={(event) =>
                          this.handleRowClick(event, item, "row_" + i, i)
                        }
                      >
                         
                       
                        
                        <TableCell align="left">
                          {moment(item.StartDate).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell align="left">
                          {moment(item.EndDate).format("MM/DD/YYYY")}
                        </TableCell>
                        <TableCell align="left">{item.No}</TableCell>
                        <TableCell align="left">{item.UOMCode}</TableCell>
                        <TableCell align="left">{item.CurrCode}</TableCell>
                        <TableCell align="left">{item.MinQty}</TableCell>
                        <TableCell align="left">{item.MaxQty}</TableCell>
                        <TableCell align="left">{item.UnitPrice}</TableCell>
                      </TableRow>
                      ):null}
                       
                    </Fragment>
                   
                  ))}
                </TableBody>
              </Table>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
    return o;
  };

  updateItemDropdrown=(CategoryID)=>{
    this.setState({ ProgressLoader: false });
    let newD=[];
    for(let i=0;i<this.state.itemDataList.length;i++){
      if(parseInt(CategoryID)===parseInt(this.state.itemDataList[i].CatID)){
        newD.push(this.state.itemDataList[i]);
      }
    }
    this.setState({itemDataListSorted:newD,selectedItem:null,ProgressLoader:true});
  }

  updateFormValue = (param, e) => {
    let SupplierPrice = this.state.SupplierPrice;
    switch (param) {
      case "CategoryID":
        this.setState({CategoryID:CF.toInt(e.target.value)});
        this.updateItemDropdrown(CF.toInt(e.target.value));
        break;
      case "ItemID":
        if(e){         
        this.setState({selectedItem:e});
        SupplierPrice[param] = CF.toInt(e.value);
        this.setParams(SupplierPrice);
        }        
        break;
      case "UOM":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      case "CurrID":
        SupplierPrice[param] = CF.toInt(e.target.value);
        this.setParams(SupplierPrice);
        break;
      case "MinQty":
        SupplierPrice[param] = e.target.value;
        let v1 = this.state.Validations;
        if (isNaN(e.target.value)) {
          v1.MinQty = {
            errorState: true,
            errorMssg: "",
          };
          this.setState({ Validations: v1,UpdateActionBtn:true });
          this.setParams(SupplierPrice);
        }else{
          v1.MinQty = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({ Validations: v1,UpdateActionBtn:false });
          this.setParams(SupplierPrice);
        }

        
        break;
      case "MaxQty":
        SupplierPrice[param] = e.target.value;
        let v2 = this.state.Validations;
        if (isNaN(e.target.value)) {
          v2.MaxQty = {
            errorState: true,
            errorMssg: "",
          };
          this.setState({ Validations: v2,UpdateActionBtn:true });
          this.setParams(SupplierPrice);
        }else{
          v2.MaxQty = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({ Validations: v2,UpdateActionBtn:false });
          this.setParams(SupplierPrice);
        }


        break;
      case "UnitPrice":
        SupplierPrice[param] = e.target.value;
        let v3 = this.state.Validations;
        if (isNaN(e.target.value)) {
          v3.UnitPrice = {
            errorState: true,
            errorMssg: "",
          };
          this.setState({ Validations: v3,UpdateActionBtn:true });
          this.setParams(SupplierPrice);
        } else {
          v3.UnitPrice = {
            errorState: false,
            errorMssg: "",
          };
          this.setState({ Validations: v3,UpdateActionBtn:false });
          this.setParams(SupplierPrice);
        }
        
        // let v3 = this.state.Validations;
        // if (e.target.value === "" || e.target.value.length > 8) {
        //   if (e.target.value === "") {
        //     v3.UnitPrice = {
        //       errorState: true,
        //       errorMssg: "Bank inputs not allowed!",
        //     };
        //     this.setState({ Validations: v3 });
        //   }

        //   if (e.target.value.length > 8) {
        //     v3.UnitPrice = {
        //       errorState: true,
        //       errorMssg: "Maximum 8 numbers allowed!",
        //     };
        //     this.setState({ Validations: v3 });
        //   }
        // } else {
        //   v3.UnitPrice = {
        //     errorState: false,
        //     errorMssg: "",
        //   };
        //   this.setState({ Validations: v3 });
        //  this.setParams(SupplierPrice);
        //}
        break;
      case "EmailID":
        SupplierPrice[param] = e.target.value;
        let email = CF.validateEmail(e.target.value);
        switch (email) {
          case true:
            let validn = this.state.Validations;
            if (e.target.value.length > 50) {
              validn.EmailID = {
                errorState: true,
                errorMssg: "Maximum 50 characters allowed",
              };
              this.setState({ Validations: validn });
            } else {
              validn.EmailID = {
                errorState: false,
                errorMssg: "",
              };
              this.setState({ Validations: validn });
              this.setParams(SupplierPrice);
            }
            break;
          case false:
            let validtn = this.state.Validations;

            validtn.EmailID = {
              errorState: true,
              errorMssg: "Invalid Email",
            };
            this.setState({ Validations: validtn });
        }
      default:
        SupplierPrice[param] = e.target.value;
        this.setParams(SupplierPrice);
        break;
    }
  };

  formatDate = (array) => {
    for (let i = 0; i < array.length; i++) {
      let StartDate = array[i].StartDate;
      let EndDate = array[i].EndDate;
      array[i].StartDate = moment(StartDate).format("MM/DD/YYYY");
      array[i].EndDate = moment(EndDate).format("MM/DD/YYYY");
    }
    return array;
  };

  processSupplierPriceList = (SupplierPriceList) => {
    console.log(
      "processlistSupplierPrice > listSupplierPrice > ",
      SupplierPriceList
    );
    let newCPL = [];
    for (let i = 0; i < SupplierPriceList.length; i++) {
      let item = SupplierPriceList[i];
      let SupplierPrice = {
        SuplID: item.SuplID,
        StartDate: item.StartDate,
        EndDate: item.EndDate,
        ItemID: item.ItemID,
        UOM: item.UOM,
        CurrID: item.CurrID,
        MinQty: item.MinQty,
        MaxQty: item.MaxQty,
        UnitPrice: item.UnitPrice,
        EmailID: item.EmailID,
        UserID: CF.toInt(getCookie(COOKIE.USERID)),
        SupplierCode:item.SupplierCode,
        BranchID: CF.toInt(item.BranchID)===CF.toInt(this.state.BranchID)?CF.toInt(this.state.BranchID):CF.toInt(item.BranchID),  //CF.toInt(this.state.BranchID)
      };
      newCPL.push(SupplierPrice);
    }
    return newCPL;
  };

  createSupplierPrice = (param) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.Add_UpdateSupplierPrice;
    let SupplierPriceList = this.state.SupplierPriceList;
    let SupplierPriceHistory = this.state.SupplierPriceHistory;

    switch (param) {
      case "NEW":
        let SupplierPrice=this.state.SupplierPrice;
        SupplierPrice.BranchID= this.state.BranchID;       
        SupplierPriceList.push(SupplierPrice);
        SupplierPriceHistory = [];
        break;
      case "UPDATE":
        let selectedOldItem = this.state.selectedOldItem;
        let index = this.state.selectedOldItemIndex;
        console.log("IN UPDATE > selectedOldItem > ", selectedOldItem);
        console.log("IN UPDATE > index > ", index);
        SupplierPriceList[index] = this.state.SupplierPrice;
        SupplierPriceHistory.push(selectedOldItem);
        break;
      default:
        break;
    }

    SupplierPriceList = this.formatDate(SupplierPriceList);
    SupplierPriceList = this.processSupplierPriceList(SupplierPriceList);
    SupplierPriceHistory = this.formatDate(SupplierPriceHistory);
    SupplierPriceHistory = this.processSupplierPriceList(SupplierPriceHistory);

    let reqData = {
      ValidUser: ValidUser,
      SupplierPriceList: SupplierPriceList,
      SupplierPriceHistoryList: SupplierPriceHistory,
    };
    console.log("createSupplierPrice > reqData > ", reqData);

    axios
      .post(Url, reqData, { headers })
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          let SupplierPriceTemplate = {
            SuplID: this.props.SuplID,
            StartDate: null,
            EndDate: null,
            ItemID: 0,
            UOM: 0,
            CurrID: 0,
            MinQty: 0,
            MaxQty: 0,
            UnitPrice: 0,
            EmailID: "",
          };
          this.setState(
            {
              SupplierPrice: SupplierPriceTemplate,
              SuccessPrompt: true,
              SupplierPriceHistory: [],
            },
            () => {
              this.getSupplierPrice();
              this.expandFull();
              this.removeIsSelectedRowClasses();
            }
          );
        } else {
          this.setState({ ErrorPrompt: true, SuccessPrompt: false });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true });
      });
  };

  setParams = (object) => {
    this.setState({ SupplierPrice: object });
  };

  expandFull = (e) => {
    this.setState({
      mainframeW: 12,
      hideSidePanel: true,
    });
  };

  closeExpandFull = (e) => {
    this.setState({
      mainframeW: 8,
      hideSidePanel: false,
    });
  };

  render() {
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

        <BackdropLoader open={!this.state.ProgressLoader} />

        <div style={{marginLeft:-10}}>
        <Grid container spacing={0}>
          <Grid
            item
            xs={12}
            sm={12}
            md={this.state.mainframeW}
            lg={this.state.mainframeW}
          >
            <Grid style={{ marginLeft: 15 }} container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    {this.state.listSupplierPrice}
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Grid>

          {this.state.hideSidePanel === false ? (
            <Grid item xs={12} sm={12} md={4} lg={4}>
               <Grid container spacing={0}>
               <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
               <Grid item xs={11} sm={11} md={11} lg={11}>
               <div
               style={{  marginTop: -15 }}
              >
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={8} lg={8}>
                    
                  </Grid>
                  <Grid item xs={12} sm={12} md={4} lg={4}>
                    <div style={{marginTop:12}}>
                      {this.state.createNewBtn === true ? (
                        <Button
                        startIcon={APIURLS.buttonTitle.save.icon}
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          onClick={(e) => this.createSupplierPrice("NEW")}
                        >
                          {APIURLS.buttonTitle.save.name}
                        </Button>
                      ) : (
                        <Button
                         disabled={this.state.UpdateActionBtn}
                          startIcon={APIURLS.buttonTitle.save.icon}
                          className="action-btns"
                          style={{ marginLeft: 10 }}
                          onClick={(e) => this.createSupplierPrice("UPDATE")}
                        >
                          {APIURLS.buttonTitle.save.name}
                        </Button>
                      )}
                    </div>
                  </Grid>
                </Grid>
                <div style={{height:20}}></div>
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div
                      style={{
                        height: 470,
                        marginTop: -6,
                        overflowX: "hidden",
                        overflowY: "scroll",
                        width: "100%",
                        backgroundColor: "#ffffff",
                      }}
                    >
                      
                      <Table
                        stickyHeader
                        size="small"
                        className="accordion-table"
                        aria-label="SupplierPrice  table"
                      >
                        <TableBody className="tableBody">

                            <DropdownInput
                              id="BranchID"
                              label="Branch"
                              onChange={(e) =>
                                this.updateFormValue("BranchID", e)
                              }
                              value={this.state.BranchID}//{this.state.SupplierPrice.BranchID}
                              options={this.state.BranchMappingData}
                              isMandatory={true}
                              disabled={true}
                            />

                          <DateTextboxInput
                            id="StartDate"
                            label="Start Date"
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                              this.updateFormValue("StartDate", e)
                            }
                            value={moment(
                              this.state.SupplierPrice.StartDate
                            ).format("YYYY-MM-DD")}
                          />
                          <DateTextboxInput
                            id="EndDate"
                            label="End Date"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("EndDate", e)}
                            value={moment(
                              this.state.SupplierPrice.EndDate
                            ).format("YYYY-MM-DD")}
                          />
                          {/* <DropdownInput
                            id="ItemID"
                            label="Item"
                            onChange={(e) => this.updateFormValue("ItemID", e)}
                            value={this.state.SupplierPrice.ItemID}
                            options={this.state.itemDataList}
                            isMandatory={true}
                          /> */}

                                <DropdownInput
                                  id="CategoryID"
                                  label="Category"
                                  onChange={(e) => this.updateFormValue("CategoryID", e)}
                                  value={this.state.CategoryID}
                                  options={this.state.ItemCategoryData}
                                  isMandatory={true}
                                />




                                <Autocomplete
                                  id="ItemID"
                                  label="Item"
                                  onChange={(e, value) => this.updateFormValue("ItemID", value)}
                                  value={this.state.selectedItem}
                                  options={this.state.itemDataListSorted}
                                  isMandatory={true}
                                />





                          <DropdownInput
                            id="UOM"
                            label="UOM"
                            onChange={(e) => this.updateFormValue("UOM", e)}
                            value={this.state.SupplierPrice.UOM}
                            options={this.state.UOMList}
                            isMandatory={true}
                          />
                          <DropdownInput
                            id="CurrID"
                            label="Currency"
                            onChange={(e) => this.updateFormValue("CurrID", e)}
                            value={this.state.SupplierPrice.CurrID}
                            options={this.state.currencyList}
                            isMandatory={true}
                          />

                          <TextboxInput
                            id="SupplierCode"
                            label="Supplier Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("SupplierCode", e)}
                            value={this.state.SupplierPrice.SupplierCode}
                             
                          />

                          <TextboxInput
                            id="MinQty"
                            label="MinQty"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("MinQty", e)}
                            value={this.state.SupplierPrice.MinQty}
                            error={this.state.Validations.MinQty.errorState}
                          />
                          <TextboxInput
                            id="MaxQty"
                            label="MaxQty"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("MaxQty", e)}
                            value={this.state.SupplierPrice.MaxQty}
                            error={this.state.Validations.MaxQty.errorState}
                          />
                          <TextboxInput
                            id="UnitPrice"
                            label="UnitPrice"
                            variant="outlined"
                            size="small"
                            onChange={(e) =>
                              this.updateFormValue("UnitPrice", e)
                            }
                            value={this.state.SupplierPrice.UnitPrice}
                            error={this.state.Validations.UnitPrice.errorState}
                          />
                          <TextboxInput
                            id="EmailID"
                            label="EmailID"
                            variant="outlined"
                            size="small"
                            onChange={(e) => this.updateFormValue("EmailID", e)}
                            value={this.state.SupplierPrice.EmailID}
                            error={this.state.Validations.EmailID.errorState}
                          />
                        </TableBody>
                      </Table>
                    
                    </div>
                  </Grid>
                </Grid>
              </div>
               </Grid>
               </Grid>
             
            </Grid>
          ) : null}
        </Grid>

        </div>
      </Fragment>
    );
  }
}
export default supplierPrice;
