import "../../user/dasboard.css";
import React, { Fragment } from "react";
import Header from "../../user/userheaderconstants";
import moment from "moment";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TableContainer from "@material-ui/core/TableContainer";
import TextField from "@material-ui/core/TextField";
import TableRow from "@material-ui/core/TableRow";
import ButtonGroup from "@mui/material/ButtonGroup";
import Tablerowcelldropdowninput from "../../compo/tablerowcelldropdowninput";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";
import Tablerowcelldateinput from "../../compo/tablerowcelldateinput";
import UpdateIcon from "@material-ui/icons/Update";

import Loader from "../../compo/loader";
import ErrorSnackBar from "../../compo/errorSnackbar";
import SuccessSnackBar from "../../compo/successSnackbar";

class editbranch extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      ProgressLoader: false,
      urlparams: null,
      ErrorPrompt: false,
      SuccessPrompt: false,
      GeneralDetailsExpanded: true,
      TaxationDetailsExpanded: false,
      NumberingExpanded: false,
      disabledUpdatebtn: false,
      numberSeries: [],
      companyData: [],
      countryData: [],
      stateData: [],
      branch: {
        address: null,
        address2: null,
        address3: null,
        branchId: 0,
        city: null,
        company: null,
        companyId: 0,
        country: null,
        countryId: null,
        emailId: null,
        financialYears: [],
        logoName: null,
        name: null,
        noSeries: [],
        phoneNo: null,
        postcode: null,
        shortName: null,
        state: null,
        stateId: null,
        wareHouses: [],
        website: null,
        PINo: null,
        SONo: null,
        SINo: null,
        PSNo: null,
        CPSNo: null,
        CNNo: null,
        DNNo: null,
        PRNo: null,
        PONo: null,
        PurInvNo: null,
        GITNo: null,
        SRNo: null,
        SIssueNo: null,
        JVNo: null,
        PVNo: null,
        CENo: null,
        BankNo: null,
        CashNo: null,
        FGQCNo: null,
        RMQCNo: null,
        IJCNo: null,
        EffectiveDate: null,
        IsVat: false,
        VATNo: null,
        VATRegistrationNo: null,
        VATPercentage: null,
        IsGST: false,
        GSTNo: null,

        PANNo: null,
        TANNo: null,
        CINNo: null,
        IECNo: null,
        ARNNo: null,
        IsSEZ: false,
        IsExportUnit: false,
        CurrID: null,
      },
      address: null,
      address2: null,
      address3: null,
      branchId: 0,
      city: null,
      company: null,
      companyId: 0,
      country: null,
      countryId: null,
      emailId: null,
      financialYears: [],
      logoName: null,
      name: null,
      noSeries: [],
      phoneNo: null,
      postcode: null,
      shortName: null,
      state: null,
      stateId: null,
      wareHouses: [],
      website: null,
      PINo: null,
      SONo: null,
      SINo: null,
      PSNo: null,
      CPSNo: null,
      CNNo: null,
      DNNo: null,
      PRNo: null,
      PONo: null,
      PurInvNo: null,
      GITNo: null,
      SRNo: null,
      SIssueNo: null,
      JVNo: null,
      PVNo: null,
      CENo: null,
      BankNo: null,
      CashNo: null,
      FGQCNo: null,
      RMQCNo: null,
      IJCNo: null,
      EffectiveDate: null,
      IsVat: false,
      VATNo: null,
      VATRegistrationNo: null,
      VATPercentage: null,
      IsGST: false,
      GSTNo: null,

      PANNo: null,
      TANNo: null,
      CINNo: null,
      IECNo: null,
      ARNNo: null,
      IsSEZ: false,
      IsExportUnit: false,
      CurrID: null,

      VATNoDisabled: true,
      VATPercentageDisabled: true,
      GSTNoDisabled: true,

      Validations: {
        name: { errorState: false, errorMsg: "" },
        shortName: { errorState: false, errorMsg: "" },
        address: { errorState: false, errorMsg: "" },
        country: { errorState: false, errorMsg: "" },
        address2: { errorState: false, errorMsg: "" },
        address3: { errorState: false, errorMsg: "" },
        city: { errorState: false, errorMsg: "" },
        postcode: { errorState: false, errorMsg: "" },
        phoneNo: { errorState: false, errorMsg: "" },
        website: { errorState: false, errorMsg: "" },
        PANNo: { errorState: false, errorMsg: "" },
        TANNo: { errorState: false, errorMsg: "" },
        CINNo: { errorState: false, errorMsg: "" },
        IECNo: { errorState: false, errorMsg: "" },
        ARNNo: { errorState: false, errorMsg: "" },
        VATNo: { errorState: false, errorMsg: "" },
        VATPercentage: { errorState: false, errorMsg: "" },
        GSTNo: { errorState: false, errorMsg: "" },
        PINo: { errorState: false, errorMsg: "" },
        SONo: { errorState: false, errorMsg: "" },
        SINo: { errorState: false, errorMsg: "" },
        PSNo: { errorState: false, errorMsg: "" },
        CPSNo: { errorState: false, errorMsg: "" },
        CNNo: { errorState: false, errorMsg: "" },
        DNNo: { errorState: false, errorMsg: "" },
        PRNo: { errorState: false, errorMsg: "" },
        PONo: { errorState: false, errorMsg: "" },
        PurInvNo: { errorState: false, errorMsg: "" },
        GITNo: { errorState: false, errorMsg: "" },
        SRNo: { errorState: false, errorMsg: "" },
        SIssueNo: { errorState: false, errorMsg: "" },
        JVNo: { errorState: false, errorMsg: "" },
        CENo: { errorState: false, errorMsg: "" },
        BankNo: { errorState: false, errorMsg: "" },
        CashNo: { errorState: false, errorMsg: "" },
        FGQCNo: { errorState: false, errorMsg: "" },
        RMQCNo: { errorState: false, errorMsg: "" },
        IJCNo: { errorState: false, errorMsg: "" },
      },
    };
  }

  componentDidMount() {
    if (getCookie(COOKIE.USERID) != null) {
      this.setState({ isLoggedIn: true });
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      let editbranchId = url.searchParams.get("editbranchId");
      let urlparams =
        "?branchId=" +
        branchId +
        "&compName=" +
        compName +
        "&branchName=" +
        branchName;
      let branch = this.state.branch;
      branch.branchId = editbranchId;
      this.setState(
        {
          urlparams: urlparams,
          branchId: editbranchId,
          branch: branch,
        },
        () => {
          this.getCompanyList();
          this.getCountryList();
          this.getStateList();
          this.getBranchDetail();
          this.getNumberSeries(editbranchId);
        }
      );
    } else {
      this.setState({ isLoggedIn: false });
    }
  }
  getCompanyList() {
    let rows = [];

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
        let data = response.data;

        rows = data;
        this.setState({ companyData: rows, ProgressLoader: true });
      })
      .catch((error) => {});
  }

  getStateList() {
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetStatesUrl = APIURLS.APIURL.GetStates;

    axios
      .post(GetStatesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;

        rows = data;
        this.setState({ stateData: rows, ProgressLoader: true });
      })
      .catch((error) => {});
  }

  getCountryList() {
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
        this.setState({ countryData: rows });
      })
      .catch((error) => {});
  }

  getBranchDetail() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };

    const data = {
      validUser: ValidUser,
      branch: this.state.branch,
    };

    let GetBranchUrl = APIURLS.APIURL.GetBranch;

    axios
      .post(GetBranchUrl, data, { headers })
      .then((response) => {
        let data = response.data;

        this.setStateParams(data);
      })
      .catch((error) => {
        this.setState({ branch: null, ProgressLoader: true });
      });
  }

  setStateParams(data) {
    this.setState({
      branch: data,
      address: data.address,
      address2: data.address2,
      address3: data.address3,
      branchId: data.branchId,
      city: data.city,
      company: data.company,
      companyId: data.companyId,
      country: data.country,
      countryId: data.countryId,
      emailId: data.emailId,
      financialYears: data.financialYears,
      logoName: data.logoName,
      name: data.name,
      noSeries: data.noSeries,
      phoneNo: data.phoneNo,
      postcode: data.postcode,
      shortName: data.shortName,
      state: data.state,
      stateId: data.stateId,
      wareHouses: data.wareHouses,
      website: data.website,
      PINo: data.pino,
      SONo: data.sono,
      SINo: data.sino,
      PSNo: data.psno,
      CPSNo: data.cpsno,
      CNNo: data.cnno,
      DNNo: data.dnno,
      PRNo: data.prno,
      PONo: data.pono,
      PurInvNo: data.purInvNo,
      GITNo: data.gitno,
      SRNo: data.srno,
      SIssueNo: data.sissueno,
      JVNo: data.jvno,
      PVNo: data.pvno,
      CENo: data.ceno,
      BankNo: data.bankno,
      CashNo: data.cashno,
      FGQCNo: data.fgqcno,
      RMQCNo: data.rmqcno,
      IJCNo: data.ijcno,
      RVNo: data.rvno,
      EffectiveDate: moment(data.effectiveDate).format("YYYY-MM-DD"),
      IsVat: data.isVat === null ? false : data.isVat,
      isGst: data.isGst === null ? false : data.isGst,
      VATNo: data.vatno,
      VATRegistrationNo: null,
      VATPercentage: data.vatpercentage,
      IsGST: data.isGst === null ? false : data.isGst,
      GSTNo: data.gstno,

      PANNo: data.panno,
      TANNo: data.tanno,
      CINNo: data.cinno,
      IECNo: data.iecno,
      ARNNo: data.arnno,
      IsSEZ: data.isSez === null ? false : data.isSez,
      IsExportUnit: data.isExportUnit === null ? false : data.isExportUnit,
      CurrID: data.currId,
      ProgressLoader: true,
    });
  }

  getNumberSeries(branchId) {
    let numberSeries = [];

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllNoSeriesByBranchId;
    let data = {
      ValidUser: ValidUser,
      BranchId: parseInt(branchId),
    };
    axios
      .post(Url, data, { headers })
      .then((response) => {
        let data = response.data;

        if (response.status === 200) {
          let newData = [];
          let responseData = data.noSeriesDetailList;
          for (let i = 0; i < responseData.length; i++) {
            let d = {
              id: responseData[i].noSeriesId,
              value: responseData[i].noSeriesId,
              text: responseData[i].code,
            };
            newData.push(d);
          }
          this.setState({
            numberSeries: newData,
            ProgressLoader: true,
          });
        } else {
          this.setState({
            numberSeries: [],
            ProgressLoader: true,
            ErrorPrompt: true,
          });
        }
      })
      .catch((error) => {
        this.setState({
          numberSeries: [],
          ProgressLoader: true,
          ErrorPrompt: true,
        });
      });

    this.setState({ numberSeries: numberSeries });
  }

  render() {
    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
      }
      if (val === "TaxationDetailsExpanded") {
        this.state.TaxationDetailsExpanded === true
          ? this.setState({ TaxationDetailsExpanded: false })
          : this.setState({ TaxationDetailsExpanded: true });
      }
      if (val === "NumberingExpanded") {
        this.state.NumberingExpanded === true
          ? this.setState({ NumberingExpanded: false })
          : this.setState({ NumberingExpanded: true });
      }
    };

    const ValidateName = () => {
      if (
        this.state.name === "" ||
        this.state.name === null ||
        this.state.name.length > 50
      ) {
        this.setState({ disabledUpdatebtn: true });
      } else {
        this.setState({ disabledUpdatebtn: false });
      }
    };

    const updateFormValue = (id, e) => {
      if (id === "shortName") {
        let branch = this.state.branch;
        branch.shortName = e.target.value;
        if (
          e.target.value === "" ||
          e.target.value === null ||
          e.target.value.length > 10
        ) {
          let v = this.state.Validations;
          if (e.target.value.length > 10) {
            v.shortName = {
              errorState: true,
              errorMsg: "Only 10 Characters are Allowed!",
            };
          }
          if (e.target.value === "" || e.target.value === null) {
            v.shortName = {
              errorState: true,
              errorMsg: "Shortname cannot be blank",
            };
          }
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.shortName = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            shortName: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "Company") {
        let branch = this.state.branch;
        branch.companyId = e.target.value;
        this.setState({ branch: branch, companyId: e.target.value });
      }

      if (id === "Name") {
        let branch = this.state.branch;
        branch.name = e.target.value;
        if (
          e.target.value === "" ||
          e.target.value === null ||
          e.target.value.length > 50
        ) {
          if (e.target.value.length > 50) {
            let v = this.state.Validations;
            v.name = {
              errorState: true,
              errorMsg: "Only 50 Characters are Allowed!",
            };
            this.setState({
              Validations: v,
              disabledUpdatebtn: true,
            });
          }
          if (e.target.value === "" || e.target.value === null) {
            let v = this.state.Validations;
            v.name = {
              errorState: true,
              errorMsg: "Branch name cannot be blank",
            };
            this.setState({
              Validations: v,
              disabledUpdatebtn: true,
            });
          }
        } else {
          let v = this.state.Validations;
          v.name = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            name: e.target.value,
            branch: branch,

            disabledUpdatebtn: false,
          });
        }
      }
      if (id === "phoneNo") {
        let branch = this.state.branch;
        branch.phoneNo = e.target.value;
        if (e.target.value.length > 20) {
          let v = this.state.Validations;
          v.phoneNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.phoneNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            phoneNo: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "website") {
        let branch = this.state.branch;
        branch.website = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.website = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.website = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            website: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "Country") {
        let branch = this.state.branch;
        branch.countryId = e.target.value;
        this.setState({ branch: branch, countryId: e.target.value });
      }
      if (id === "State") {
        let branch = this.state.branch;
        branch.stateId = e.target.value;
        this.setState({ branch: branch, stateId: e.target.value });
      }

      if (id === "City") {
        let branch = this.state.branch;
        branch.city = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.city = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.city = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            city: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "Postcode") {
        let branch = this.state.branch;
        branch.postcode = e.target.value;
        if (e.target.value.length > 10) {
          let v = this.state.Validations;
          v.postcode = {
            errorState: true,
            errorMsg: "Only 10 numbers are allowed",
          };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.postcode = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            postcode: e.target.value,
          });
        }
        ValidateName();
      }

      if (id === "Address") {
        let branch = this.state.branch;
        branch.address = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            address: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "Address2") {
        let branch = this.state.branch;
        branch.address2 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address2 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address2 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            address2: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "Address3") {
        let branch = this.state.branch;
        branch.address3 = e.target.value;
        if (e.target.value.length > 50) {
          let v = this.state.Validations;
          v.address3 = {
            errorState: true,
            errorMsg: "Only 50 Characters are Allowed!",
          };
          this.setState({
            Validations: v,
            disabledUpdatebtn: true,
          });
        } else {
          let v = this.state.Validations;
          v.address3 = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,
            disabledUpdatebtn: false,
            branch: branch,
            address3: e.target.value,
          });
        }
        ValidateName();
      }

      //----------------TAXATION------------

      if (id === "VATNo") {
        let branch = this.state.branch;
        branch.VATNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.VATNo = {
            errorState: true,
            errorMsg: "Only 20 chatracters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.VATNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            VATNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "VATPercentage") {
        let branch = this.state.branch;
        branch.VATPercentage = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 8) {
          v.VATPercentage = {
            errorState: true,
            errorMsg: "Only 8 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.VATPercentage = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            VATPercentage: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "GSTNo") {
        let branch = this.state.branch;
        branch.GSTNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.GSTNo = {
            errorState: true,
            errorMsg: "Only 20 characters are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.GSTNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            GSTNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "PANNo") {
        let branch = this.state.branch;
        branch.PANNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.PANNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.PANNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            PANNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "TANNo") {
        let branch = this.state.branch;
        branch.TANNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.TANNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.TANNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            TANNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "CINNo") {
        let branch = this.state.branch;
        branch.CINNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.CINNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.CINNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            CINNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "IECNo") {
        let branch = this.state.branch;
        branch.IECNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.IECNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.IECNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            IECNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "ARNNo") {
        let branch = this.state.branch;
        branch.ARNNo = e.target.value;
        let v = this.state.Validations;
        if (e.target.value.length > 20) {
          v.ARNNo = {
            errorState: true,
            errorMsg: "Only 20 numbers are allowed",
          };
          this.setState({
            Validations: v,
          });
        } else {
          v.ARNNo = { errorState: false, errorMsg: "" };
          this.setState({
            Validations: v,

            branch: branch,
            ARNNo: e.target.value,
          });
        }
        ValidateName();
      }
      if (id === "IsSEZ") {
        let branch = this.state.branch;

        branch.IsSEZ = e.target.checked;
        this.setState({ branch: branch, IsSEZ: e.target.checked });
      }
      if (id === "IsExportUnit") {
        let branch = this.state.branch;
        branch.IsExportUnit = e.target.checked;
        this.setState({ branch: branch, IsExportUnit: e.target.checked });
      }

      //---------------Numbering-----------
      if (id === "PINo") {
        let branch = this.state.branch;
        branch.PINo = e.target.value;
        this.setState({ branch: branch, PINo: e.target.value });
      }
      if (id === "SONo") {
        let branch = this.state.branch;
        branch.SONo = e.target.value;
        this.setState({ branch: branch, SONo: e.target.value });
      }
      if (id === "SINo") {
        let branch = this.state.branch;
        branch.SINo = e.target.value;
        this.setState({ branch: branch, SINo: e.target.value });
      }
      if (id === "PSNo") {
        let branch = this.state.branch;
        branch.PSNo = e.target.value;

        this.setState({ branch: branch, PSNo: e.target.value });
      }
      if (id === "CPSNo") {
        let branch = this.state.branch;
        branch.CPSNo = e.target.value;

        this.setState({ branch: branch, CPSNo: e.target.value });
      }
      if (id === "CNNo") {
        let branch = this.state.branch;
        branch.CNNo = e.target.value;

        this.setState({ branch: branch, CNNo: e.target.value });
      }
      if (id === "DNNo") {
        let branch = this.state.branch;
        branch.DNNo = e.target.value;

        this.setState({ branch: branch, DNNo: e.target.value });
      }
      if (id === "PRNo") {
        let branch = this.state.branch;
        branch.PRNo = e.target.value;

        this.setState({ branch: branch, PRNo: e.target.value });
      }
      if (id === "PONo") {
        let branch = this.state.branch;
        branch.PONo = e.target.value;

        this.setState({ branch: branch, PONo: e.target.value });
      }
      if (id === "PurInvNo") {
        let branch = this.state.branch;
        branch.PurInvNo = e.target.value;

        this.setState({ branch: branch, PurInvNo: e.target.value });
      }
      if (id === "GITNo") {
        let branch = this.state.branch;
        branch.GITNo = e.target.value;

        this.setState({ branch: branch, GITNo: e.target.value });
      }
      if (id === "SRNo") {
        let branch = this.state.branch;
        branch.SRNo = e.target.value;

        this.setState({ branch: branch, SRNo: e.target.value });
      }
      if (id === "SIssueNo") {
        let branch = this.state.branch;
        branch.SIssueNo = e.target.value;

        this.setState({ branch: branch, SIssueNo: e.target.value });
      }
      if (id === "JVNo") {
        let branch = this.state.branch;
        branch.JVNo = e.target.value;
        this.setState({ branch: branch, JVNo: e.target.value });
      }
      if (id === "PVNo") {
        let branch = this.state.branch;
        branch.PVNo = e.target.value;

        this.setState({ branch: branch, PVNo: e.target.value });
      }
      if (id === "CENo") {
        let branch = this.state.branch;
        branch.CENo = e.target.value;

        this.setState({ branch: branch, CENo: e.target.value });
      }
      if (id === "BankNo") {
        let branch = this.state.branch;
        branch.BankNo = e.target.value;

        this.setState({ branch: branch, BankNo: e.target.value });
      }
      if (id === "CashNo") {
        let branch = this.state.branch;
        branch.CashNo = e.target.value;

        this.setState({ branch: branch, CashNo: e.target.value });
      }
      if (id === "FGQCNo") {
        let branch = this.state.branch;
        branch.FGQCNo = e.target.value;

        this.setState({ branch: branch, FGQCNo: e.target.value });
      }
      if (id === "RMQCNo") {
        let branch = this.state.branch;
        branch.RMQCNo = e.target.value;

        this.setState({ branch: branch, RMQCNo: e.target.value });
      }
      if (id === "IJCNo") {
        let branch = this.state.branch;
        branch.IJCNo = e.target.value;

        this.setState({ branch: branch, IJCNo: e.target.value });
      }
      if (id === "RVNo") {
        let branch = this.state.branch;
        branch.RVNo = e.target.value;
      }

      if (id === "EffectiveDate") {
        // moment().format("YYYY-MM-DD")
        let branch = this.state.branch;
        branch.EffectiveDate = e.target.value;

        this.setState({ branch: branch, EffectiveDate: e.target.value });
      }
    };

    // VATNoDisabled:true,
    //   VATPercentageDisabled:true,

    const VAT_GST_Checkbox_Click = (e, param) => {
      if (param === "isvat") {
        let branch = this.state.branch;

        if (e.target.checked === true) {
          branch.IsVat = true;
          this.setState({
            VATNoDisabled: false,
            VATPercentageDisabled: false,
            branch: branch,
            IsVat: true,
          });
        }
        if (e.target.checked === false) {
          branch.IsVat = false;
          this.setState({
            VATNoDisabled: true,
            VATPercentageDisabled: true,
            branch: branch,
            IsVat: false,
          });
        }
      }
      if (param === "isgst") {
        let branch = this.state.branch;
        if (e.target.checked === true) {
          branch.IsGST = true;
          this.setState({ GSTNoDisabled: false, IsGST: true, branch: branch });
        }
        if (e.target.checked === false) {
          branch.IsGST = false;
          this.setState({ GSTNoDisabled: true, IsGST: false, branch: branch });
        }
      }
    };

    const handleupdate = () => {
      ValidateName();
      this.setState({ ProgressLoader: false });
      let branch = this.state.branch;
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const data = {
        validUser: ValidUser,
        branch: branch,
      };

      const headers = {
        "Content-Type": "application/json",
      };
      let UpdateBranchUrl = APIURLS.APIURL.UpdateBranch;
      axios
        .post(UpdateBranchUrl, data, { headers })
        .then((response) => {
          if (response.status === 200) {
            this.setState({ ProgressLoader: true, SuccessPrompt: true });
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }
        })
        .catch((error) => {});
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

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

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
          <Grid container spacing={3}>
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
                <Breadcrumbs
                  className="style-breadcrumb"
                  aria-label="breadcrumb"
                >
                  <Link
                    color="inherit"
                    className="backLink"
                    onClick={this.props.history.goBack}
                  >
                    Back
                  </Link>
                  <Link
                    color="inherit"
                    href={URLS.URLS.userDashboard + this.state.urlparams}
                  >
                    Dashboard
                  </Link>
                  <Link
                    color="inherit"
                    href={URLS.URLS.branchMaster + this.state.urlparams}
                  >
                    Branch Master
                  </Link>
                  <Typography color="textPrimary">Edit Branch </Typography>
                </Breadcrumbs>
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
                    startIcon={<UpdateIcon />}
                    onClick={handleupdate}
                  >
                    Update
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={9} lg={9}>
              <Grid container spacing={1}>
                <Grid xs={12} sm={12} md={12} lg={12}>
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
                      style={{ minHeight: 30, maxHeight: 30, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        General Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={1}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="company List table"
                            >
                              <TableBody className="tableBody">
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Company
                                  </TableCell>

                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <select
                                      className="dropdown-css"
                                      id="companySelect"
                                      label="Company"
                                      fullWidth
                                      value={parseInt(this.state.companyId)}
                                      onChange={(e) =>
                                        updateFormValue("Company", e)
                                      }
                                    >
                                      <option value="-">None</option>
                                      {this.state.companyData.map((item, i) => (
                                        <option
                                          value={parseInt(item.companyId)}
                                        >
                                          {item.companyName}
                                        </option>
                                      ))}
                                    </select>
                                  </TableCell>
                                </TableRow>
                                <Tablerowcelltextboxinput
                                  id="Name"
                                  label="Name"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("Name", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.name}
                                  error={this.state.Validations.name.errorState}
                                  helperText={
                                    this.state.Validations.name.errorMsg
                                  }
                                />

                                <Tablerowcelltextboxinput
                                  id="shortName"
                                  label="ShortName"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("shortName", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.shortName}
                                  error={
                                    this.state.Validations.shortName.errorState
                                  }
                                  helperText={
                                    this.state.Validations.shortName.errorMsg
                                  }
                                />

                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Phone No
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <TextField
                                      type="number"
                                      id="phoneNo"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("phoneNo", e)
                                      }
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 20,
                                      }}
                                      value={this.state.phoneNo}
                                      error={
                                        this.state.Validations.phoneNo
                                          .errorState
                                      }
                                      helperText={
                                        this.state.Validations.phoneNo.errorMsg
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Website
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <TextField
                                      id="website"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("website", e)
                                      }
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 20,
                                      }}
                                      value={this.state.website}
                                      error={
                                        this.state.Validations.website
                                          .errorState
                                      }
                                      helperText={
                                        this.state.Validations.website.errorMsg
                                      }
                                    />
                                  </TableCell>
                                </TableRow>

                                <Tablerowcelldateinput
                                  id="EffectiveDate"
                                  label="Effective Date"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("EffectiveDate", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.EffectiveDate}
                                  error={null}
                                  helperText={null}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="company List table"
                            >
                              <TableBody className="tableBody">
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Country
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <select
                                      className="dropdown-css"
                                      id="countrySelect"
                                      label="Country"
                                      fullWidth
                                      value={parseInt(this.state.countryId)}
                                      onChange={(e) =>
                                        updateFormValue("Country", e)
                                      }
                                    >
                                      <option value="-">None</option>
                                      {this.state.countryData.map((item, i) => (
                                        <option
                                          value={parseInt(item.countryId)}
                                        >
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    State
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <select
                                      className="dropdown-css"
                                      id="stateSelect"
                                      label="State"
                                      fullWidth
                                      value={parseInt(this.state.stateId)}
                                      onChange={(e) =>
                                        updateFormValue("State", e)
                                      }
                                    >
                                      <option value="-">None</option>
                                      {this.state.stateData.map((item, i) => (
                                        <option value={parseInt(item.stateId)}>
                                          {item.name}
                                        </option>
                                      ))}
                                    </select>
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    City
                                  </TableCell>

                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <TextField
                                      id="City"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("City", e)
                                      }
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50,
                                      }}
                                      value={this.state.city}
                                      error={
                                        this.state.Validations.city.errorState
                                      }
                                      helperText={
                                        this.state.Validations.city.errorMsg
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Postcode
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <TextField
                                      id="Postcode"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("Postcode", e)
                                      }
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 10,
                                      }}
                                      value={this.state.postcode}
                                      error={
                                        this.state.Validations.postcode
                                          .errorState
                                      }
                                      helperText={
                                        this.state.Validations.postcode.errorMsg
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Address Line 1
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <TextField
                                      id="Address"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("Address", e)
                                      }
                                      value={this.state.address}
                                      fullWidth
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50,
                                      }}
                                      error={
                                        this.state.Validations.address
                                          .errorState
                                      }
                                      helperText={
                                        this.state.Validations.address.errorMsg
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Address Line 2
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <TextField
                                      id="Address2"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("Address2", e)
                                      }
                                      fullWidth
                                      value={this.state.address2}
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50,
                                      }}
                                      error={
                                        this.state.Validations.address2
                                          .errorState
                                      }
                                      helperText={
                                        this.state.Validations.address2.errorMsg
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Address Line 3
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <TextField
                                      id="Address3"
                                      variant="outlined"
                                      size="small"
                                      onChange={(e) =>
                                        updateFormValue("Address3", e)
                                      }
                                      fullWidth
                                      value={this.state.address3}
                                      InputProps={{
                                        className: "textFieldCss",
                                        maxlength: 50,
                                      }}
                                      error={
                                        this.state.Validations.address3
                                          .errorState
                                      }
                                      helperText={
                                        this.state.Validations.address3.errorMsg
                                      }
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    key="company-Taxation-Details"
                    expanded={this.state.TaxationDetailsExpanded}
                  >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) =>
                            handleAccordionClick("TaxationDetailsExpanded", e)
                          }
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        Taxation Details
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={2}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="Taxation table"
                            >
                              <TableBody className="tableBody">
                                <Tablerowcelltextboxinput
                                  id="PANNo"
                                  label="PAN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("PANNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.PANNo}
                                  error={
                                    this.state.Validations.PANNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.PANNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="TANNo"
                                  label="TAN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("TANNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.TANNo}
                                  error={
                                    this.state.Validations.TANNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.TANNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="CINNo"
                                  label="CIN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("CINNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.CINNo}
                                  error={
                                    this.state.Validations.CINNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.CINNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="IECNo"
                                  label="IEC No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("IECNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.IECNo}
                                  error={
                                    this.state.Validations.IECNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.IECNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  id="ARNNo"
                                  label="ARN No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("ARNNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.ARNNo}
                                  error={
                                    this.state.Validations.ARNNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.ARNNo.errorMsg
                                  }
                                />

                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Is SEZ?
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <input
                                      type="checkbox"
                                      onChange={(e) =>
                                        updateFormValue("IsSEZ", e)
                                      }
                                      checked={this.state.IsSEZ}
                                    />
                                  </TableCell>
                                </TableRow>
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Is Export Unit?
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <input
                                      type="checkbox"
                                      onChange={(e) =>
                                        updateFormValue("IsExportUnit", e)
                                      }
                                      checked={this.state.IsExportUnit}
                                    />
                                  </TableCell>
                                </TableRow>
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="Taxation table"
                            >
                              <TableBody className="tableBody">
                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Is VAT?
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <input
                                      type="checkbox"
                                      onClick={(e) =>
                                        VAT_GST_Checkbox_Click(e, "isvat")
                                      }
                                      checked={this.state.IsVat}
                                    />
                                  </TableCell>
                                </TableRow>

                                <Tablerowcelltextboxinput
                                  id="VATNo"
                                  label="VAT No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("VATNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 20,
                                  }}
                                  value={this.state.VATNo}
                                  disabled={this.state.VATNoDisabled}
                                  error={
                                    this.state.Validations.VATNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.VATNo.errorMsg
                                  }
                                />
                                <Tablerowcelltextboxinput
                                  type="number"
                                  id="VATPercentage"
                                  label="VAT Percentage"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) =>
                                    updateFormValue("VATPercentage", e)
                                  }
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 8,
                                  }}
                                  value={this.state.VATPercentage}
                                  disabled={this.state.VATPercentageDisabled}
                                  error={
                                    this.state.Validations.VATPercentage
                                      .errorState
                                  }
                                  helperText={
                                    this.state.Validations.VATPercentage
                                      .errorMsg
                                  }
                                />

                                <TableRow>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    Is GST?
                                  </TableCell>
                                  <TableCell
                                    align="left"
                                    className="no-border-table"
                                  >
                                    <input
                                      type="checkbox"
                                      onClick={(e) =>
                                        VAT_GST_Checkbox_Click(e, "isgst")
                                      }
                                      checked={this.state.IsGST}
                                    />
                                  </TableCell>
                                </TableRow>

                                <Tablerowcelltextboxinput
                                  id="GSTNo"
                                  label="GST No"
                                  variant="outlined"
                                  size="small"
                                  onChange={(e) => updateFormValue("GSTNo", e)}
                                  InputProps={{
                                    className: "textFieldCss",
                                    maxlength: 50,
                                  }}
                                  value={this.state.GSTNo}
                                  disabled={this.state.GSTNoDisabled}
                                  error={
                                    this.state.Validations.GSTNo.errorState
                                  }
                                  helperText={
                                    this.state.Validations.GSTNo.errorMsg
                                  }
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                  <Accordion
                    key="company-Numbering"
                    expanded={this.state.NumberingExpanded}
                  >
                    <AccordionSummary
                      className="accordion-Header-Design"
                      expandIcon={
                        <ExpandMoreIcon
                          onClick={(e) =>
                            handleAccordionClick("NumberingExpanded", e)
                          }
                        />
                      }
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      style={{ minHeight: 20, height: "100%" }}
                    >
                      <Typography key="" className="accordion-Header-Title">
                        Numbering
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails key="" className="AccordionDetails-css">
                      <Grid container spacing={1}>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="Numbering table"
                            >
                              <TableBody className="tableBody">
                                <Tablerowcelldropdowninput
                                  id="PINo"
                                  label="Proforma Invoice"
                                  value={this.state.PINo}
                                  onChange={(e) => updateFormValue("PINo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="SONo"
                                  label="Sales Order"
                                  value={this.state.SONo}
                                  onChange={(e) => updateFormValue("SONo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="SINo"
                                  label="Sales Invoice"
                                  value={this.state.SINo}
                                  onChange={(e) => updateFormValue("SINo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PSNo"
                                  label="Pack slip"
                                  value={this.state.PSNo}
                                  onChange={(e) => updateFormValue("PSNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CPSNo"
                                  label="Combine Pack Slip"
                                  value={this.state.CPSNo}
                                  onChange={(e) => updateFormValue("CPSNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CNNo"
                                  label="Credit Note"
                                  value={this.state.CNNo}
                                  onChange={(e) => updateFormValue("CNNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="DNNo"
                                  label="Debit Note"
                                  value={this.state.DNNo}
                                  onChange={(e) => updateFormValue("DNNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PRNo"
                                  label="Purchase Request"
                                  value={this.state.PRNo}
                                  onChange={(e) => updateFormValue("PRNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PONo"
                                  label="Purchase Order"
                                  value={this.state.PONo}
                                  onChange={(e) => updateFormValue("PONo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PurInvNo"
                                  label="Purchase Invoice"
                                  value={this.state.PurInvNo}
                                  onChange={(e) =>
                                    updateFormValue("PurInvNo", e)
                                  }
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="GITNo"
                                  label="GIT"
                                  value={this.state.GITNo}
                                  onChange={(e) => updateFormValue("GITNo", e)}
                                  options={this.state.numberSeries}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                        <Grid xs={12} sm={12} md={6} lg={6}>
                          <TableContainer>
                            <Table
                              stickyHeader
                              size="small"
                              className="accordion-table"
                              aria-label="Numbering table"
                            >
                              <TableBody className="tableBody">
                                <Tablerowcelldropdowninput
                                  id="SRNo"
                                  label="Store Requisition"
                                  value={this.state.SRNo}
                                  onChange={(e) => updateFormValue("SRNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="SIssueNo"
                                  label="Store Issue"
                                  value={this.state.SIssueNo}
                                  onChange={(e) =>
                                    updateFormValue("SIssueNo", e)
                                  }
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="JVNo"
                                  label="Journal Voucher"
                                  value={this.state.JVNo}
                                  onChange={(e) => updateFormValue("JVNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="PVNo"
                                  label="Payment Voucher"
                                  value={this.state.PVNo}
                                  onChange={(e) => updateFormValue("PVNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="RVNo"
                                  label="Receipt Voucher"
                                  value={this.state.RVNo}
                                  onChange={(e) => updateFormValue("RVNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CENo"
                                  label="Contra Entry"
                                  value={this.state.CENo}
                                  onChange={(e) => updateFormValue("CENo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="BankNo"
                                  label="Bank"
                                  value={this.state.BankNo}
                                  onChange={(e) => updateFormValue("BankNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="CashNo"
                                  label="Cash"
                                  value={this.state.CashNo}
                                  onChange={(e) => updateFormValue("CashNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="FGQCNo"
                                  label="FG QC No"
                                  value={this.state.FGQCNo}
                                  onChange={(e) => updateFormValue("FGQCNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="RMQCNo"
                                  label="RM QC No"
                                  value={this.state.RMQCNo}
                                  onChange={(e) => updateFormValue("RMQCNo", e)}
                                  options={this.state.numberSeries}
                                />
                                <Tablerowcelldropdowninput
                                  id="IJCNo"
                                  label="IJC"
                                  value={this.state.IJCNo}
                                  onChange={(e) => updateFormValue("IJCNo", e)}
                                  options={this.state.numberSeries}
                                />
                              </TableBody>
                            </Table>
                          </TableContainer>
                        </Grid>
                      </Grid>
                    </AccordionDetails>
                  </Accordion>
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={3} lg={3}></Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default editbranch;
