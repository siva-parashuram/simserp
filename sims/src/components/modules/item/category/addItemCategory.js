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
import AddIcon from "@material-ui/icons/Add";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import ButtonGroup from "@mui/material/ButtonGroup";
import SwitchInput from "../../../compo/tablerowcellswitchinput";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import "../../../user/dasboard.css";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import Loader from "../../../compo/loader";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Breadcrumb from "../../../compo/breadcrumb";

class addItemCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      DisableCreatebtn: false,
      IsActive: false,
      Code: "",
      Description: "",
      HSNCode: "",
      CatID: 0,
      IsTrading: false,
      IsNonStockValuation: false,
      IsPriceRange: false,
      MainCategoryData: [],
      MainCatID: 0,
      IsCustomized: false,
      IsCustomized: false,
    };
  }

  componentDidMount() {
    this.getMainCategoryData();
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
        this.setState({ ProgressLoader: true });
        this.processMainCategoryData(data);
      })
      .catch((error) => {
        this.setState({ ProgressLoader: true });
      });
  }

  processMainCategoryData(data) {
    let newData = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].isActive === true) {
        let d = {
          name: data[i].code + " - " + data[i].hsncode,
          value: data[i].mainCatId,
        };
        newData.push(d);
      }
    }
    this.setState({ MainCategoryData: newData, ProgressLoader: true });
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
          if (e.target.value === "") {
            this.setState({ Code: e.target.value, DisableUpdatebtn: true });
          } else {
            this.setState({ Code: e.target.value, DisableUpdatebtn: false });
          }
          break;
        case "MainCatID":
          this.setState({ MainCatID: e.target.value });
          break;
        case "Description":
          this.setState({ Description: e.target.value });
          break;
        case "HSNCode":
          this.setState({ HSNCode: e.target.value });
          break;
        case "IsActive":
          this.setState({ IsActive: e.target.checked });
          break;
        case "ItemType":
          this.setState({ ItemType: e.target.value });
          break;
        case "IsTrading":
          this.setState({ IsTrading: e.target.checked });
          break;
        case "IsNonStockValuation":
          this.setState({ IsNonStockValuation: e.target.checked });
          break;
        case "IsPriceRange":
          this.setState({ IsPriceRange: e.target.checked });
          break;
        case "IsCustomized":
          this.setState({ IsCustomized: e.target.checked });
          break;
        default:
          break;
      }
    };

    const createNew = () => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateItemCategory;
      let ReqData = {
        validUser: ValidUser,
        ItemCategory: {
          CatID: 0,
          IsActive: this.state.IsActive,
          mainCatId: this.state.MainCatID,
          Code: this.state.Code,
          Description: this.state.Description,
          HSNCode: this.state.HSNCode,
          IsTrading: this.state.IsTrading,
          IsNonStockValuation: this.state.IsNonStockValuation,
          IsPriceRange: this.state.IsPriceRange,
          IsCustomized: this.state.IsCustomized,
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
                <Breadcrumb
                  backOnClick={this.props.history.goBack}
                  linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                  linkTitle="Dashboard"
                  masterHref={
                    URLS.URLS.itemCategoryMaster + this.state.urlparams
                  }
                  masterLinkTitle="Item Category Master"
                  typoTitle="Add Item Category"
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
                    onClick={createNew}
                    disabled={this.state.DisableCreatebtn}
                  >
                    ADD
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={6} md={6} lg={6}>
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
                  <TableContainer>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label=" Item-category List table"
                    >
                      <TableBody className="tableBody">
                        <DropdownInput
                          id="MainCatID"
                          label="MainCatID"
                          onChange={(e) => updateFormValue("MainCatID", e)}
                          options={this.state.MainCategoryData}
                          value={this.state.MainCatID}
                        />
                        <TextboxInput
                          id="Code"
                          label="Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Code", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 20,
                          }}
                          value={this.state.Code}
                        />
                        <TextboxInput
                          id="Description"
                          label="Description"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Description", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          value={this.state.Description}
                        />
                        <TextboxInput
                          id="HSNCode"
                          label="HSN Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("HSNCode", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 10,
                          }}
                          value={this.state.HSNCode}
                        />
                        <SwitchInput
                          key="IsActive"
                          id="IsActive"
                          label="IsActive"
                          param={this.state.IsActive}
                          onChange={(e) => updateFormValue("IsActive", e)}
                        />
                        <SwitchInput
                          key="IsTrading"
                          id="IsTrading"
                          label="IsTrading"
                          param={this.state.IsTrading}
                          onChange={(e) => updateFormValue("IsTrading", e)}
                        />
                        <SwitchInput
                          key="IsNonStockV"
                          id="IsNonStockV"
                          label="IsNonStockV"
                          param={this.state.IsNonStockValuation}
                          onChange={(e) =>
                            updateFormValue("IsNonStockValuation", e)
                          }
                        />
                        <SwitchInput
                          key="IsPriceRange"
                          id="IsPriceRange"
                          label="IsPriceRange"
                          param={this.state.IsPriceRange}
                          onChange={(e) => updateFormValue("IsPriceRange", e)}
                        />
                        <SwitchInput
                          key="IsCustomized"
                          id="IsCustomized"
                          label="IsCustomized"
                          param={this.state.IsCustomized}
                          onChange={(e) => updateFormValue("IsCustomized", e)}
                        />
                      </TableBody>
                    </Table>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default addItemCategory;
