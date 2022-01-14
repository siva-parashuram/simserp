import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Dialog from "@mui/material/Dialog";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";

import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import DeleteIcon from '@mui/icons-material/Delete';

/* Custom components and support imports*/
import "../../user/dasboard.css";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as CF from "../../../services/functions/customfunctions";
import BackdropLoader from "../../compo/backdrop";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";
import Breadcrumb from "../../compo/breadcrumb";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import SIB from "../../compo/gridtextboxinput";
import SDIB from "../../compo/griddropdowninput";
import SSIB from "../../compo/gridswitchinput";
import SDBIB from "../../compo/griddropdowninputwithbutton";
import DialogCustom from "../../compo/dialogcomponent";

import CompanyQuickDetails from "./companyquickdetails";

class addnewcompany extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: null,
      typoTitle: null,
      companyData: [],
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      urlparams: "",
      companyName: "",
      address: "",
      address2: "",
      address3: "",
      country: 0,
      state: 0,
      city: "",
      postcode: "",
      phoneno: "",
      website: "",
      IsActive: true,
      MasterCountryData: [],
      countryData: [],
      stateData: [],
      BtnDisable: true,
      GeneralDetailsExpanded: true,
      duplicate: false,
      filelist: [],
      Dialog: {
        DialogTitle: "",
        DialogStatus: false,
        DialogContent: null,
      },
      AttachmentDialog:{
        open:false
      },
      DeleteAttachment:{
        e:null,
        item:null
      },
      company: {
        CompanyID: 0,
        CompanyName: "",
        Address: "",
        Address2: "",
        Address3: "",
        City: "",
        Postcode: "",
        CountryID: 0,
        StateID: 0,
        PhoneNo: "",
        Website: "",
        IsActive: true,
      },
      Validations: {
        companyName: { errorState: false, errorMsg: "" },
        address: { errorState: false, errorMsg: "" },
        country: { errorState: false, errorMsg: "" },
        address2: { errorState: false, errorMsg: "" },
        address3: { errorState: false, errorMsg: "" },
        city: { errorState: false, errorMsg: "" },
        postcode: { errorState: false, errorMsg: "" },
        phoneno: { errorState: false, errorMsg: "" },
        website: { errorState: false, errorMsg: "" },
      },
    };
    this.wrapper = React.createRef();
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    this.getCompanyList();
    this.getCountryList();

    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let type = url.searchParams.get("type");
    let CompanyID = type === "edit" ? url.searchParams.get("compID") : 0;
    let typoTitle = "";
    type === "add" ? (typoTitle = "Add") : (typoTitle = "Edit");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;

    let company = this.state.company;
    company.CompanyID = CF.toInt(CompanyID);

    if (type === "edit") {  console.log("CompanyID > ",CompanyID);
      company.CompanyID = CF.toInt(CompanyID);
      this.getCompanyDetails(CompanyID);
      this.setState({ BtnDisable: false });
    }

    this.setState({
      urlparams: params,
      company: company,
      CompanyID: CompanyID,
      type: type,
      typoTitle: typoTitle,
      ProgressLoader: type === "add" ? true : false,
    });
  }

  getCompanyList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCompaniesUrl = APIURLS.APIURL.GetCompanies;

    axios
      .post(GetCompaniesUrl, ValidUser, { headers })
      .then((response) => {
        console.log("getCompanyList > response >  ", response);
        if (response.status === 200) {
          if (response.data === "Invalid User") {
            alert("Un-Authorized Access Found!");
            window.close();
          } else {
            let data = response.data;

            this.setState({ companyData: data, ProgressLoader: true });
          }
        } else {
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        }
      })
      .catch((error) => {
        this.setState({ ErrorPrompt: true, ProgressLoader: true });
      });
  };

  getCompanyDetails = (CompanyID) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    let company = APIURLS.company;
    company.CompanyID = parseInt(CompanyID);
    const data = {
      validUser: ValidUser,
      company: company,
    };

    const headers = {
      "Content-Type": "application/json",
    };
    let GetCompanyUrl = APIURLS.APIURL.GetCompany;
    axios
      .post(GetCompanyUrl, data, { headers })
      .then((response) => {
        if (response.status === 200) {
          let data = response.data;
          if (data.Branch === null) data.Branch = [];
          this.setState(
            {
              company: response.data,
              selectedCountry: response.data.countryId,
              ProgressLoader: true,
              BtnDisable: false
            },
            () => {
              this.setInitialParamsForEdit();
              this.getStateByCountry(this.state.company.CountryID);
              this.refreshFileLists();
            }
          );
        } else {
          this.setState({ ErrorPrompt: true, ProgressLoader: true });
        }
      })
      .catch((error) => {});
  };

  setInitialParamsForEdit = () => {
    let CountryID = this.state.company.CountryID;
    console.log("unitialCountryID", CountryID);
    this.getStateByCountry(CountryID);
  };

  getCountryList = () => {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetCountryUrl = APIURLS.APIURL.GetCountries;

    axios
      .post(GetCountryUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        rows = data;
        this.setState({ MasterCountryData: data });
        this.processCountryData(data);
      })
      .catch((error) => {});
  };

  getStateByCountry = (CountryID) => {
    console.log("getStateByCountry > CountryID > ", CountryID);
    let MasterCountryData = this.state.MasterCountryData;
    console.log("getStateByCountry > MasterCountryData > ", MasterCountryData);
    let stateData = [];
    for (let i = 0; i < MasterCountryData.length; i++) {
      if (MasterCountryData[i].CountryID === CountryID) {
        if (MasterCountryData[i].State) {
          stateData = MasterCountryData[i].State;
        }
        break;
      }
    }
    console.log("getStateByCountry > stateData > ", stateData);
    let newData = [];
    for (let i = 0; i < stateData.length; i++) {
      let d = {
        name: stateData[i].Name,
        value: stateData[i].StateID,
      };
      newData.push(d);
    }
    console.log("getStateByCountry > stateData > newData > ", newData);

    this.setState({ stateData: newData, ProgressLoader: true });
  };

 

  processCountryData = (data) => {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      let d = {
        name: data[i].Name,
        value: data[i].CountryID,
      };
      newData.push(d);
    }
    this.setState({ countryData: newData, ProgressLoader: true });
  };

  setParams = (object) => {
    this.setState({ company: object });
  };

  downloadThisFile = (e, item) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.FileDownload;

    const fd = new FormData();
    fd.append('FileName', item.fileName);
    fd.append('companyId', this.state.company.CompanyID);
    fd.append('BranchID', 0);
    fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    fd.append('Token', getCookie(COOKIE.TOKEN));

    axios({
      method: 'post',
      url: Url,
      responseType: 'blob',
      data: fd
    })
      .then(function (response) {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        let link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", item.fileName);
        document.body.appendChild(link);
        link.click();
      });
  }

  handleDelete = (e, item) => {
    let Dialog=this.state.AttachmentDialog;
    Dialog.open=true;
    let DeleteAttachment=this.state.DeleteAttachment;
    DeleteAttachment.e=e;
    DeleteAttachment.item=item;
    this.setState({
      DeleteAttachment:DeleteAttachment,
      AttachmentDialog:Dialog
    });
  }

  processDelete = () => {
    let e=this.state.DeleteAttachment.e;
    let item=this.state.DeleteAttachment.item;

    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.DELETEFTPFILE;

    const fd = new FormData();
    fd.append('FileName', item.fileName);
    fd.append('companyId', this.state.company.CompanyID);
    fd.append('BranchID', 0);
    fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    fd.append('Token', getCookie(COOKIE.TOKEN));

    axios
    .post(Url, fd, { headers })
    .then((response) => {
      if (response.status === 200) {
        this.refreshFileLists();
        let Dialog=this.state.AttachmentDialog;
        Dialog.open=false;
        this.setState({AttachmentDialog:Dialog});
      }
    })
    .catch((error) => {
      console.log("error > ", error);
      this.setState({ filelist: [] });
    });
  }

  /*******************FILEUPLOAD STARTS************************** */

  refreshFileLists = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const FTPFILELIST = APIURLS.APIURL.FTPFILELIST;
    const headers = {
      "Content-Type": "application/json",
    };
    const fd = new FormData();
    fd.append('UserID', parseInt(getCookie(COOKIE.USERID)));
    fd.append('Token', getCookie(COOKIE.TOKEN));
    fd.append('CompanyId', this.state.company.CompanyID);
    fd.append('BranchID', 0);
    fd.append('Transaction', APIURLS.TrasactionType.default);
    fd.append('TransactionNo', "");
    fd.append('FileData', "");

    console.log("getCompanyFileList > fd > ", fd);
    axios
      .post(FTPFILELIST, fd, { headers })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            filelist: response.data,
          });
        }
      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ filelist: [] });
      });
  }

  processUpload=(e)=>{
    this.setState({ ShowLoader: true });
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const formData = CF.FILE_UPLOAD_FORMDATA(ValidUser,e, "company",  this.state.company.CompanyID);
   
    const FTPUploadUrl = APIURLS.APIURL.FTPUPLOAD;
    const headers = {
      "Content-Type": "application/json",
    };
    axios
      .post(FTPUploadUrl, formData, { headers })
      .then((response) => {        
        if (response.status === 200 || response.status === 201) {
          this.refreshFileLists();
        }
        if (response.status === 403) {
          this.setState({ ErrorPrompt: true, ShowLoader: false });
        }

      })
      .catch((error) => {
        console.log("error > ", error);
        this.setState({ ErrorPrompt: true, ShowLoader: false });
       
      });

  }
 
 

  

  /*******************FILEUPLOAD ENDS************************** */

  closeDialog=()=>{
    let Dialog=this.state.AttachmentDialog;
    Dialog.open=false;
    this.setState({AttachmentDialog:Dialog});
  }

  render() {
    const updateFormValue = (param, e) => {
      console.log("param > ",param);
      console.log("value > ", e.target.value);
      let company = this.state.company;
      let v = this.state.Validations;

      switch (param) {
        case "CompanyName":
          let duplicateExist = false;
          if (e.target.value) {
            duplicateExist = CF.chkDuplicateName(
              this.state.companyData,
              "CompanyName",
              e.target.value.toLowerCase()
            );
          }
          if (duplicateExist === true) {
            v.companyName = {
              errorState: true,
              errorMsg: "Company with same name already exist!",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            if (
              e.target.value === "" ||
              e.target.value == null ||
              e.target.value.length > 50
            ) {
              v.companyName = {
                errorState: true,
                errorMsg: "Inproper data",
              };
              company[param] = e.target.value;
              this.setParams(company);
              this.setState({ Validations: v });
            } else {
              v.companyName = {
                errorState: false,
                errorMsg: "",
              };
              company[param] = e.target.value;
              this.setParams(company);
              this.setState({ Validations: v });
            }
          }
          break;
        case "Address":
          if (
            e.target.value === "" ||
            e.target.value == null ||
            e.target.value.length > 50
          ) {
            v.address = {
              errorState: true,
              errorMsg: "Inproper data",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            v.address = {
              errorState: false,
              errorMsg: "",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          }

          break;
        case "Address2":
          if (e.target.value.length > 50) {
            v.address2 = {
              errorState: true,
              errorMsg: "Inproper data",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            v.address2 = {
              errorState: false,
              errorMsg: "",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          }
          break;
        case "Address3":
          if (e.target.value.length > 50) {
            v.address3 = {
              errorState: true,
              errorMsg: "Inproper data",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            v.address3 = {
              errorState: false,
              errorMsg: "",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          }
          break;
        case "City":
          if (e.target.value.length > 50) {
            v.city = {
              errorState: true,
              errorMsg: "Inproper data",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            v.city = {
              errorState: false,
              errorMsg: "",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          }
          break;
        case "Postcode":
          if (e.target.value.length > 10) {
            v.postcode = {
              errorState: true,
              errorMsg: "Inproper data",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            v.postcode = {
              errorState: false,
              errorMsg: "",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          }
          break;
        case "CountryID":
          if(e.target.value==="-"){
            v.country = {
              errorState: true,
              errorMsg: "Select Country",
            };
            company[param] = e.target.value.trim();
            this.setParams(company);
            this.setState({Validations:v});
          }else{
            this.getStateByCountry(CF.toInt(e.target.value));
            company[param] = CF.toInt(e.target.value);
  
            v.country = {
              errorState: false,
              errorMsg: "",
            };
            
            this.setParams(company);
            this.setState({Validations:v});
          }
          break;
        case "StateID":
          let StateID=CF.toInt(e.target.value);
          if(StateID===null){
            StateID=0;
          }
          company[param] = (StateID===null || StateID==='null')?0:StateID;
          this.setParams(company);
          break;
        case "PhoneNo":
          if (e.target.value.length > 20) {
            v.phoneno = {
              errorState: true,
              errorMsg: "Inproper data",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            v.phoneno = {
              errorState: false,
              errorMsg: "",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          }
          break;
        case "Website":
          if (e.target.value.length > 50) {
            v.website = {
              errorState: true,
              errorMsg: "Inproper data",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          } else {
            v.website = {
              errorState: false,
              errorMsg: "",
            };
            company[param] = e.target.value;
            this.setParams(company);
            this.setState({ Validations: v });
          }
          break;

        default:
          company[param] = e.target.checked;
          this.setParams(company);
          break;
      }

      validate();
    };

    const validate = () => {
      let company = this.state.company;
      let v=this.state.Validations;
      console.log("v > ",this.state.Validations);
      console.log("company > ",company);
      let chkerrorState=false;


      if(
        v.address.errorState===true ||
        v.address2.errorState===true ||
        v.address3.errorState===true ||
        v.city.errorState===true ||
        v.companyName.errorState===true ||
        v.country.errorState===true ||
        v.phoneno.errorState===true ||
        v.postcode.errorState===true ||
        v.website.errorState===true 

      ){
        chkerrorState=true;
      }

      console.log("chkerrorState > ",chkerrorState);
      if (company.CompanyName!="" &&             
          company.Address !=""   && 
          (company.CountryID!=0 || company.CountryID!="-" ) &&          
          chkerrorState===false) {
         this.setState({ BtnDisable: false });   
       } else {
         this.setState({ BtnDisable: true });
       }      
    };

    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "AddressDetailsExpanded") {
        this.state.AddressDetailsExpanded === true
          ? this.setState({ AddressDetailsExpanded: false })
          : this.setState({ AddressDetailsExpanded: true });
      }
    };

    const handleCreateCompanyClick = (e) => {
      this.setState({ ProgressLoader: false });

      let ValidUser = APIURLS.ValidUser;
      let company = APIURLS.company;

      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      let chkFields = true;
      if (chkFields === false) {
      } else {
        const data = {
          validUser: ValidUser,
          company: this.state.company,
        };
        const headers = {
          "Content-Type": "application/json",
        };
        let addNewCompanyUrl = APIURLS.APIURL.addNewCompany;

        axios
          .post(addNewCompanyUrl, data, { headers })
          .then((response) => {
            if (response.status === 200 || response.status === 201) {
              this.setState({ ProgressLoader: true, SuccessPrompt: true });
              let gobackURL = URLS.URLS.companyMaster + this.state.urlparams;
              this.props.history.push(gobackURL);
            } else {
              this.setState({ ProgressLoader: true, ErrorPrompt: true });
            }
          })
          .catch((error) => {
            // this.setState({ ProgressLoader: true, ErrorPrompt: true });
          });
      }
    };

    const updateCompanyDetails = () => {
      this.setState({ ProgressLoader: false });
      let company = this.state.company;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);

      const data = {
        validUser: ValidUser,
        company: company,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateCompanyUrl = APIURLS.APIURL.UpdateCompany;
      axios
        .post(UpdateCompanyUrl, data, { headers })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
    };

    const dialog = (
      <Fragment>
        <Dialog
          fullWidth={true}
          maxWidth="lg"
          open={this.state.Dialog.DialogStatus}
          aria-labelledby="dialog-title"
          aria-describedby="dialog-description"
          className="dialog-prompt-activity"
        >
          <DialogTitle
            id="dialog-title"
            className="dialog-area"
            style={{ maxHeight: 50 }}
          >
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={1} lg={1}>
                <IconButton
                  aria-label="ArrowBackIcon"
                  // style={{ textAlign: 'left', marginTop: 8 }}
                >
                  <ArrowBackIcon onClick={(e) => handleClose()} />
                </IconButton>
              </Grid>
              <Grid item xs={12} sm={12} md={2} lg={2}>
                <div style={{ marginLeft: -50 }}>
                  {" "}
                  <span style={{ fontSize: 18, color: "rgb(80, 92, 109)" }}>
                    {" "}
                    {this.state.Dialog.DialogTitle}{" "}
                  </span>{" "}
                </div>
              </Grid>
            </Grid>
          </DialogTitle>
          <DialogContent className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                {this.state.Dialog.DialogContent}
              </Grid>
            </Grid>
            <div style={{ height: 50 }}>&nbsp;</div>
          </DialogContent>
        </Dialog>
      </Fragment>
    );

    const openDialog = (param) => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = true;
      Dialog.DialogTitle = param;

      switch (param) {
        case "Country":
          // Dialog.DialogContent =;
          this.setState({ Dialog: Dialog });
          break;
        case "State":
          // Dialog.DialogContent = ;
          this.setState({ Dialog: Dialog });
          break;

          break;
        default:
          break;
      }

      this.setState({ Dialog: Dialog });
    };

    const handleClose = () => {
      let Dialog = this.state.Dialog;
      Dialog.DialogStatus = false;
      this.setState({ Dialog: Dialog });
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
          masterHref={URLS.URLS.companyMaster + this.state.urlparams}
          masterLinkTitle="Companies"
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
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              disabled={this.state.BtnDisable}
              onClick={(e) => handleCreateCompanyClick()}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}

          {this.state.type === "edit" ? (
            <Button
              startIcon={APIURLS.buttonTitle.save.icon}
              className="action-btns"
              onClick={(e) => updateCompanyDetails()}
              disabled={this.state.BtnDisable}
            >
              {APIURLS.buttonTitle.save.name}
            </Button>
          ) : null}
        </ButtonGroup>
      </Fragment>
    );

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

        <DialogCustom
          MessageHeader="Delete Attachment!"
          MessageText="Do you want to delete this attachment?"
          open={this.state.AttachmentDialog.open}
          onClose={(e) => this.closeDialog()}
          onOK={(e) => this.processDelete()}
        />

        <Grid className="table-adjust" container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Accordion
                  key="company-General-Details"
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
                                isMandatory={true}
                                id="companyName"
                                label="Company Name"
                                variant="outlined"
                                size="small"
                                onChange={(e) =>
                                  updateFormValue("CompanyName", e)
                                }
                                value={this.state.company.CompanyName}
                                error={
                                  this.state.Validations.companyName.errorState
                                }
                              />

                              <SIB
                                isMandatory={true}
                                id="Address"
                                label="Address"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.company.Address}
                                error={
                                  this.state.Validations.address.errorState
                                }
                              />

                              <SIB
                                id="Address2"
                                label="Address 2"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address2", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.company.Address2}
                                error={
                                  this.state.Validations.address2.errorState
                                }
                              />
                              <SIB
                                id="Address3"
                                label="Address 3"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Address3", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.company.Address3}
                                error={
                                  this.state.Validations.address3.errorState
                                }
                              />
                              <SIB
                                id="City"
                                label="City"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("City", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 50,
                                }}
                                value={this.state.company.City}
                                error={this.state.Validations.city.errorState}
                              />
                              <SIB
                                id="Postcode"
                                label="Postcode"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Postcode", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 10,
                                }}
                                value={this.state.company.Postcode}
                                error={
                                  this.state.Validations.postcode.errorState
                                }
                              />
                            </Grid>
                            <Grid item xs={12} sm={12} md={1} lg={1}></Grid>
                            <Grid item xs={12} sm={12} md={5} lg={5}>
                              <SDBIB
                                isMandatory={true}
                                id="countrySelect"
                                label="Country"
                                onChange={(e) =>
                                  updateFormValue("CountryID", e)
                                }
                                value={this.state.company.CountryID}
                                param={this.state.countryData}
                                onClick={(e) => openDialog("Country")}
                              />

                              <SDBIB
                                id="stateSelect"
                                label="State"
                                onChange={(e) => updateFormValue("StateID", e)}
                                value={this.state.company.StateID}
                                param={this.state.stateData}
                                onClick={(e) => openDialog("State")}
                              />

                              <SIB
                                id="PhoneNo"
                                label="Phone No"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("PhoneNo", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 10,
                                }}
                                value={this.state.company.PhoneNo}
                                error={
                                  this.state.Validations.phoneno.errorState
                                }
                              />
                              <SIB
                                id="Website"
                                label="Website"
                                variant="outlined"
                                size="small"
                                onChange={(e) => updateFormValue("Website", e)}
                                InputProps={{
                                  className: "textFieldCss",
                                  maxlength: 10,
                                }}
                                value={this.state.company.Website}
                                error={
                                  this.state.Validations.website.errorState
                                }
                              />

                              <SSIB
                                key="IsActive"
                                id="IsActive"
                                label="IsActive"
                                param={this.state.company.IsActive}
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
            {/* </div> */}
          </Grid>
          <Grid  item xs={12} sm={12} md={4} lg={4}>
          <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={1} lg={1}>
                &nbsp;
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                {/*<Branchlistbycompany data={this.state.branch} />*/}
                {this.state.item === null || this.state.item === {} ? null : (
                  <CompanyQuickDetails
                    data={this.state.company.Branch}
                    item={this.state.type==="edit"?{CompanyID:this.state.company.CompanyID}:null}
                    filelist={
                      this.state.filelist.map((item, i) => (
                        <TableRow id={"fileRow_" + item.fileName}>
                            <TableCell align="left" className="no-border-table">
                                <span className="avatar-hover" onClick={(e) => this.downloadThisFile(e, item)}> {item.fileName} </span> <br />
                                <span style={{ color: '#b0bec5' }}>{"Uploaded on " + item.modifiedDateTime}</span>
                            </TableCell>
                            <TableCell align="left" className="no-border-table">
                                <IconButton size="small" edge="end" aria-label="delete">
                                    <DeleteIcon role={item} fontSize="small" style={{ color: '#f44336' }}
                                        onClick={(e) => this.handleDelete(e, item)} 
                                    />
                                </IconButton>
                            </TableCell>
                        </TableRow>
                    ))
                    }
                    fileUploadonChange={(e)=>this.processUpload(e)}     
                  />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        {dialog}
      </Fragment>
    );
  }
}
export default addnewcompany;
