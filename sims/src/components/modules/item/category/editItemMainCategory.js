import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";

import TableContainer from "@material-ui/core/TableContainer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import Button from "@material-ui/core/Button";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import ButtonGroup from "@mui/material/ButtonGroup";
import UpdateIcon from "@material-ui/icons/Update";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";

import SwitchInput from "../../../compo/tablerowcellswitchinput";
import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import Loader from "../../../compo/loader";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Breadcrumb from "../../../compo/breadcrumb";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../../compo/backdrop";
import SIB from "../../../compo/gridtextboxinput";
import SDIB from "../../../compo/griddropdowninput";
import SSIB from "../../../compo/gridswitchinput";

class editItemMainCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorMessageProps:"",
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableUpdatebtn: true,
      MainCategoryData:[],
      SuperCategoryDataList: [],
      IsActive: false,
      mainCatId: 0,
      Code: "",
      Description: "",
      HSNCode: "",
      SuperCatID: 0,
      IsTrading: false,
      IsNonStockV: false,
      IsPriceRange: false,
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Description: { errorState: false, errorMssg: "" },
        HSNCode: { errorState: false, errorMssg: "" },
      },
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getSuperCategoryDataList();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let mainCatId = url.searchParams.get("editmainCatId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
      this.getMainCategoryData();
    this.setState(
      {
        urlparams: urlparams,
        mainCatId: mainCatId,
      },
      () => {
        this.getMainCategory();
      }
    );
  }


  getMainCategoryData() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetItemMainCategories;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);        
        this.setState({ MainCategoryData: data });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  getSuperCategoryDataList() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);

    let Url = APIURLS.APIURL.GetItemSuperCategories;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.processSuperCategoryData(data);
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  processSuperCategoryData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].code + "-" + data[i].hsncode,
        value: data[i].superCatId,
      };
      newData.push(d);
    }
    this.setState({ SuperCategoryDataList: newData });
  }

  getMainCategory() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Data = {
      validUser: ValidUser,
      ItemMainCategory: {
        mainCatId: this.state.mainCatId,
      },
    };

    let Url = APIURLS.APIURL.GetItemMainCategory;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, Data, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);

        let duplicateExist=this.checkDuplicate(data.code,data.mainCatId);
        let v1 = this.state.Validations;
        if(duplicateExist){
          v1.Code = {
            errorState: true,
          };
          this.setState({
            Validations: v1,
            ErrorPrompt:true,             
            ErrorMessageProps:"Duplicate Code Exist",
            DisableCreatebtn: true,
          });
        }

        this.setState({
          ItemMainCategory: data,
          mainCatId: data.mainCatId,
          Code: data.code,
          Description: data.description,
          HSNCode: data.hsncode,
          SuperCatID: data.superCatId,
          IsTrading: data.isTrading,
          IsNonStockV: data.isNonStockValuation,
          IsPriceRange: data.isPriceRange,
          IsActive: data.isActive,
          DisableUpdatebtn: duplicateExist===true?true:false,
          ProgressLoader: true,
        });
      })
      .catch((error) => {
        console.log(" error > ",error);
      });
  }

  checkDuplicate=(value,id)=>{
    let duplicateExist=false;
    let MainCategoryData=this.state.MainCategoryData;
    for(let i=0;i<MainCategoryData.length;i++){
      if( (MainCategoryData[i].Code.toUpperCase()===value.toUpperCase()) && (MainCategoryData[i].MainCatID!=id)){
        duplicateExist=true;
        break;
      }
    }
    return duplicateExist;
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
    };
    const updateFormValue = (param, e) => {
      switch (param) {
        case "Code":

          let v1 = this.state.Validations;
          let duplicateExist=this.checkDuplicate(e.target.value,this.state.mainCatId);
          if(duplicateExist){
            v1.Code = {
              errorState: true,
            };
            this.setState({
              Validations: v1,
              ErrorPrompt:true,
              Code: e.target.value.toUpperCase(),
              ErrorMessageProps:"Duplicate Code Exist",
              DisableCreatebtn: true,
            });
          }else{
            if (e.target.value === "" || e.target.value.length > 20) {
              if (e.target.value === "") {
                v1.Code = {
                  errorState: true,
                  errorMssg: "Blank inputs not allowed",
                };
                this.setState({
                  Validations: v1,
                  Code: e.target.value,
                  DisableUpdatebtn: true,
                });
              }
              if (e.target.value.length > 20) {
                v1.Code = {
                  errorState: true,
                  errorMssg: "Maximum 20 characters allowed",
                };
                this.setState({ Validations: v1, DisableUpdatebtn: true });
              }
            } else {
              v1.Code = { errorState: false, errorMssg: "" };
              this.setState({
                Validations: v1,
                Code: e.target.value.toUpperCase(),
                DisableUpdatebtn: false,
              });
            }
          }
          break;
        case "SuperCatID":
          if(e.target.options[e.target.selectedIndex].text){
            let text=e.target.options[e.target.selectedIndex].text;
            let A=text.split("-");
            let HSNCode=A[1];
            this.setState({ HSNCode: HSNCode });
          }
          this.setState({ SuperCatID: e.target.value });
          break;
        case "Description":
          let v2 = this.state.Validations;
          if (e.target.value.length > 50) {
            v2.Description = {
              errorState: true,
              errorMssg: "Maximum 50 characters allowed",
            };
            this.setState({ Validations: v2 });
          } else {
            v2.Description = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v2,
              Description: e.target.value,
            });
          }
          break;
        case "HSNCode":
          let v3 = this.state.Validations;
          if (e.target.value.length > 10) {
            v3.HSNCode = {
              errorState: true,
              errorMssg: "Maximum 10 characters allowed",
            };
            this.setState({ Validations: v3 });
          } else {
            v3.HSNCode = { errorState: false, errorMssg: "" };
            this.setState({
              Validations: v3,
              HSNCode: e.target.value,
            });
          }
          break;
        case "IsActive":
          this.setState({ IsActive: e.target.checked });
          break;
        case "IsTrading":
          this.setState({ IsTrading: e.target.checked });
          break;
        case "IsNonStockV":
          this.setState({ IsNonStockV: e.target.checked });
          break;
        case "IsPriceRange":
          this.setState({ IsPriceRange: e.target.checked });
          break;
        default:
          break;
      }
    };

    const update = () => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.UpdateItemMainCategory;
      let ReqData = {
        validUser: ValidUser,
        ItemMainCategory: {
          IsActive: this.state.IsActive,
          mainCatId: this.state.mainCatId,
          Code: this.state.Code,
          Description: this.state.Description,
          HSNCode: this.state.HSNCode,
          SuperCatID: this.state.SuperCatID,
          IsTrading: this.state.IsTrading,
          IsNonStockValuation: this.state.IsNonStockV,
          IsPriceRange: this.state.IsPriceRange,
        },
      };
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
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        });
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

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          backOnClick={this.props.history.goBack}
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="Dashboard"
          masterHref={URLS.URLS.itemMainCategoryMaster + this.state.urlparams}
          masterLinkTitle="Main Category"
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
            onClick={update}
            disabled={this.state.DisableUpdatebtn}
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
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Accordion
              key="itemCategory-General-Details"
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
                style={{ minHeight: 20, height: "100%" }}
              >
                <Typography key="" className="accordion-Header-Title">
                  General Details
                </Typography>
              </AccordionSummary>
              <AccordionDetails key="" className="AccordionDetails-css">
                <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div>
                      <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SDIB
                            id="SuperCatID"
                            label="Super Category"
                            onChange={(e) => updateFormValue("SuperCatID", e)}
                            param={this.state.SuperCategoryDataList}
                            value={this.state.SuperCatID}
                            isMandatory={true}
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
                            id="Description"
                            label="Description"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("Description", e)}
                            value={this.state.Description}
                            error={
                              this.state.Validations.Description.errorState
                            }
                          />
                          <SIB
                            id="HSNCode"
                            label="HSN Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("HSNCode", e)}
                            value={this.state.HSNCode}
                            error={this.state.Validations.HSNCode.errorState}
                          />
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          
                          <SSIB
                            key="IsTrading"
                            id="IsTrading"
                            label="Is Trading? "
                            param={this.state.IsTrading}
                            onChange={(e) => updateFormValue("IsTrading", e)}
                          />
                          <SSIB
                            key="IsNonStockV"
                            id="IsNonStockV"
                            label="Non Stk Valuaion?"
                            param={this.state.IsNonStockV}
                            onChange={(e) => updateFormValue("IsNonStockV", e)}
                          />
                          <SSIB
                            key="IsPriceRange"
                            id="IsPriceRange"
                            label="Is Price Range?"
                            param={this.state.IsPriceRange}
                            onChange={(e) => updateFormValue("IsPriceRange", e)}
                          />
                          <SSIB
                            key="IsActive"
                            id="IsActive"
                            label="Is Active?"
                            param={this.state.IsActive}
                            onChange={(e) => updateFormValue("IsActive", e)}
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
      </Fragment>
    );
  }
}
export default editItemMainCategory;
