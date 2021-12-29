import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from '@mui/material/Checkbox';
import CardActions from '@mui/material/CardActions';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Button from "@material-ui/core/Button";

import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";

import SwitchInput from "../../../compo/tablerowcellswitchinput";
import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Breadcrumb from "../../../compo/breadcrumb";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";
import BackdropLoader from "../../../compo/backdrop";
import SIB from "../../../compo/gridtextboxinput";
import SDIB from "../../../compo/griddropdowninput";
import SSIB from "../../../compo/gridswitchinput";

class editItemSuperCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DialogStatus: false,
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorMessageProps:"",
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableUpdatebtn: true,
      IsActive: false,
      Code: "",
      Description: "",
      HSNCode: "",
      SuperCatID: 0,
      ItemSuperCategory: {},
      ItemTypeMaster: APIURLS.ItemType,
      ItemType: 0,
      Validations: {
        Code: { errorState: false, errorMssg: "" },
        Description: { errorState: false, errorMssg: "" },
        HSNCode: { errorState: false, errorMssg: "" },
      },
      branchList: [],
      checkedBranchList:[],
      DataList:[],
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();//constant branch parameters
    this.getBranches();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let SuperCatID = url.searchParams.get("editsuperCatId");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
      this.getDataList();
    this.setState(
      {
        urlparams: params,
        SuperCatID: parseInt(SuperCatID),
      },
      () => this.getSuperCategory()
    );
  }

  
  getDataList() {
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
        this.setState({ DataList: data });
        this.setState({ ProgressLoader: true });
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  getBranches() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetBrachesUrl = APIURLS.APIURL.GetBraches;

    axios
      .post(GetBrachesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        let companies = [];


        for (let i = 0; i < data.length; i++) {
          companies.push({
            CompanyId: data[i].company.CompanyId,
            CompanyName: data[i].company.CompanyName,
            branchList: []
          });
        }
        let removeDuplicateCompanies = companies.filter((ele, ind) => ind === companies.findIndex(elem => elem.CompanyId === ele.CompanyId))
        companies = removeDuplicateCompanies;
        console.log("$$$$$$$$$ companies > ", companies);

        for (let i = 0; i < data.length; i++) {
          let obj = {
            BranchID: data[i].BranchID,
            Name: data[i].Name,
            isSelected:false
          };
          for (let j = 0; j < companies.length; j++) {
            if(data[i].company.CompanyId===companies[j].CompanyId){             
              companies[j].branchList.push(obj);
            }
          }
        }
        this.setState({ branchList: companies, ProgressLoader: true },()=>{
          this.getRestrictedBranches();
        });
      })
      .catch((error) => {
        console.log("$$$$$$$$$ companies Error > ", error);
        this.setState({ branchList: [], ProgressLoader: true });
      });
  }

  getRestrictedBranches=()=>{   
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetBrachesUrl = APIURLS.APIURL.GetItemSuperCategoryRestrictedBranchID;

    let reqData={
      ValidUser:ValidUser,
      ItemSuperCategory: {
        SuperCatID: parseInt(this.state.SuperCatID),
      }
    };

    axios
      .post(GetBrachesUrl, reqData, { headers })
      .then((response) => {
        if(response.status===200){
         
          let data=JSON.parse(response.data);
          
         let checkedBranchList=data;
         console.log("checkedBranchList > ",checkedBranchList);
          let branchList=this.state.branchList; 
          for (let i = 0; i < branchList.length; i++) {
            let BL = branchList[i].branchList;
            for (let j = 0; j < checkedBranchList.length; j++) {
              for (let k = 0; k < BL.length; k++) {
                if (BL[k].BranchID === checkedBranchList[j].BranchID) {
                  BL[k].isSelected = true;
                }
              }
            }
          }
        }
      })
      .catch((error) => {
        this.setState({ checkedBranchList: [], ProgressLoader: true });
      });
  }

  getSuperCategory() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let Data = {
      validUser: ValidUser,
      ItemSuperCategory: {
        SuperCatID: parseInt(this.state.SuperCatID),
      },
    };

    let Url = APIURLS.APIURL.GetItemSuperCategory;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(Url, Data, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);

        this.setState({
          ItemSuperCategory: data,
          Code: data.code,
          Description: data.description,
          HSNCode: data.hsncode,
          ItemType: data.itemType,
          IsActive: data.isActive,
          DisableUpdatebtn: false,         
          ProgressLoader: true,

        });
      })
      .catch((error) => { });
  }

  chooseBranch=(item, e,index1,index2)=>{
   let branchList=this.state.branchList;
   branchList[index1]['branchList'][index2]['isSelected']=e.target.checked;
   this.setState({branchList:branchList});
  }

  restrictBranch = () => {
    this.setState({ ProgressLoader: false });
    let branchList=this.state.branchList;
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };

    let restrictList=[];
    for (let i = 0; i < branchList.length; i++) {
      let BL = branchList[i].branchList;
      for (let j = 0; j < BL.length; j++) {       
        if(BL[j].isSelected===true){
          let obj = {
            CatID:parseInt(this.state.SuperCatID),
            BranchID:parseInt(BL[j].BranchID)
          };
          restrictList.push(obj);
        }
      }
    }

    let reqData={
      validUser:ValidUser,
      CatID:parseInt(this.state.SuperCatID),
      itemSuperCategoryrestrictedBranchList:restrictList 
    };
    console.log("restrictBranch > reqData > ",reqData);

    let Url=APIURLS.APIURL.UpdateItemSuperCategoryRestrictedBranch;
    axios
      .post(Url, reqData, { headers })
      .then((response) => {
          if(response.status===200 && response.data===true){
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          }else{
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
      })
      .catch((error) => {
        console.log("restrictBranch Error > ", error);
        this.setState({ ProgressLoader: true, ErrorPrompt: true });
      });

  }

  checkDuplicate=(value,id)=>{

    let duplicateExist=false;
    let DataList=this.state.DataList;
    for(let i=0;i<DataList.length;i++){
      if( (DataList[i].code.toUpperCase()===value.toUpperCase())  && (DataList[i].superCatId!=id)){
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
          let duplicateExist=this.checkDuplicate(e.target.value,this.state.SuperCatID);
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
            if (e.target.value === "" || e.target.value.length > 10) {
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
              if (e.target.value.length > 10) {
                v1.Code = {
                  errorState: true,
                  errorMssg: "Maximum 10 characters allowed",
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
        case "Name":
          this.setState({ Name: e.target.value });
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
        case "ItemType":
          this.setState({ ItemType: e.target.value });
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
      let Url = APIURLS.APIURL.UpdateItemSuperCategory;
      let ReqData = {
        validUser: ValidUser,
        ItemSuperCategory: {
          SuperCatID: this.state.SuperCatID,
          ItemType: this.state.ItemType,
          Code: this.state.Code,
          Description: this.state.Description,
          HSNCode: this.state.HSNCode,
          IsActive: this.state.IsActive,
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
          masterHref={URLS.URLS.itemSuperCategoryMaster + this.state.urlparams}
          masterLinkTitle="Super Category"
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
          <Button
            startIcon={APIURLS.buttonTitle.restrictBranch.icon}
            className="action-btns"
            onClick={(e) => this.setState({ DialogStatus: true })}

          >
            {APIURLS.buttonTitle.restrictBranch.name}
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
                            id="ItemType"
                            label="Item Type"
                            onChange={(e) => updateFormValue("ItemType", e)}
                            param={this.state.ItemTypeMaster}
                            value={this.state.ItemType}
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
                        </Grid>
                        <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                        <Grid item xs={12} sm={12} md={5} lg={5}>
                          <SIB
                            id="HSNCode"
                            label="HSN Code"
                            variant="outlined"
                            size="small"
                            onChange={(e) => updateFormValue("HSNCode", e)}
                            value={this.state.HSNCode}
                            error={this.state.Validations.HSNCode.errorState}
                          />
                          <SSIB
                            key="IsActive"
                            id="IsActive"
                            label="IsActive"
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


        <Dialog
          fullWidth={true}
          maxWidth="lg"
          className="dialog-prompt-activity"
          open={this.state.DialogStatus}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title" className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={1} lg={1}>
                <IconButton
                  aria-label="ArrowBackIcon"
                >
                  <ArrowBackIcon onClick={(e) => this.setState({ DialogStatus: false })} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <div style={{ marginLeft: -50 }}>
                  {" "}
                  <span style={{ fontSize: 18, color: "rgb(80, 92, 109)" }}>
                    {" "}
                    Restrict Branch
                  </span>{" "}
                </div>
              </Grid>
            </Grid>

          </DialogTitle>
          <DialogContent className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <ButtonGroup
                  size="small"
                  variant="text"
                  aria-label="Action Menu Button group"
                >
                  <Button
                    startIcon={APIURLS.buttonTitle.save.icon}
                    className="action-btns"
                    onClick={(e) => this.restrictBranch()}
                  >
                    {APIURLS.buttonTitle.save.name}
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}></Grid>
            </Grid>
            <div style={{height:20}}>&nbsp;</div>

            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Grid container spacing={1}>
                {this.state.branchList.map((item, i) => (
                  <Grid item xs={12} sm={4} md={3} lg={3}>
                    <Card  key={"card_"+i} sx={{ minWidth: 150 }}>
                      <CardContent  key={"cardContent_"+i}>
                        <Typography key={"Typo1_"+i} sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                          <b>{item.CompanyName}</b>
                        </Typography>

                        {item.branchList.map((branchItem, j) => (
                          <Fragment>
                            <span>
                              <Checkbox
                                key={"chooseCheckbox_"+i+"_"+j}
                                onClick={(e) => this.chooseBranch(branchItem, e,i,j)}
                                checked={
                                  branchItem.isSelected
                                } />  
                                {branchItem.Name} 
                               
                            </span> <br />
                          </Fragment>
                        ))}
 
                      </CardContent>
                       
                    </Card>
                  </Grid>
                   ))}
                </Grid>
              </Grid>
            </Grid>

        


          </DialogContent>
        </Dialog>

      </Fragment>
    );
  }
}
export default editItemSuperCategory;
