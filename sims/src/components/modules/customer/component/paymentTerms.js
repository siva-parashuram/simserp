import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import SwitchInput from "../../../compo/tablerowcellswitchinput";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import TablePagination from "@mui/material/TablePagination";
import AutorenewIcon from "@mui/icons-material/Autorenew";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from '@material-ui/core/TextField';
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Loader from "../../../compo/loader";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";

class paymentTerms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      initialCss: "",
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      listPaymentTerms: null,
      paymentTermsData: [],
      updatePaymentTerms: {},
      createNew: false,
      PaymentTerms: {
        PaymentTermID: 0,
        Code: "",
        Description: "",
        DueDays: "",
      },
    };
  }

  componentDidMount() {
    this.getPaymentTerms();
  }

  getPaymentTerms = () => {

    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllPaymentTerms;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        this.setState({ paymentTermsData: data, ProgressLoader: true }, () => {
          this.setState({ listPaymentTerms: this.listPaymentTerms() });
        });
      })
      .catch((error) => {
        this.setState({ paymentTermsData: [], ProgressLoader: true }, () => {
          this.setState({ listPaymentTerms: this.listPaymentTerms() });
        });
      });


  }

  handleRowClick = (e, item, id) => {
    try {
      this.setState({
        updatePaymentTerms: item
      });
      this.removeIsSelectedRowClasses();
      document.getElementById(id).classList.add("selectedRow");
    } catch (ex) { }
  };

  removeIsSelectedRowClasses = () => {
    try {
      for (let i = 0; i < this.state.paymentTermsData.length; i++) {
        document.getElementById("row_" + i).className = "";
      }
    } catch (ex) { }
  };

  listPaymentTerms = () => {
    let o = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={10} lg={10}>
            <Button className="action-btns" style={{ marginLeft: 5, marginBottom: 10 }} onClick={(e) => this.addNew(e)}>
              <span style={{ paddingLeft: 7, paddingRight: 5 }}> {APIURLS.buttonTitle.new} </span>
            </Button>
          </Grid>

        </Grid>

        <div style={{ height: 350, width: '100%', overflowY: 'scroll' }}>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={12} lg={12}>

              <Table
                stickyHeader
                size="small"
                className=""
                aria-label="item List table"
              >
                <TableHead className="table-header-background">
                  <TableRow>
                    <TableCell className="table-header-font">#</TableCell>
                    <TableCell className="table-header-font" align="left">
                      Code
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      Description
                    </TableCell>
                    <TableCell className="table-header-font" align="left">
                      DueDays
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="tableBody">
                  {this.state.paymentTermsData.map((item, i) => (
                    <TableRow
                      id={"row_" + i}
                      className={this.state.initialCss}
                      hover
                      key={i}
                      onClick={(event) =>
                        this.handleRowClick(event, item, "row_" + i)
                      }
                    >
                      <TableCell align="left">
                        {i + 1}
                      </TableCell>
                      <TableCell align="left">
                        {item.Code}
                      </TableCell>
                      <TableCell align="left">
                        {item.Description}
                      </TableCell>
                      <TableCell align="left">
                        {item.DueDays}
                      </TableCell>
                    </TableRow>
                  ))}

                </TableBody>
              </Table>


            </Grid>
          </Grid>
        </div>

      </Fragment>
    );
    return o;
  }








  updateFormValue = (param, e, index) => {
    console.log("updateFormValue > index > ", index);
    let paymentTermsData = this.state.paymentTermsData;

    switch (param) {
      case "Code":
        for (let i = 0; i < paymentTermsData.length; i++) {
          if (i === index) {
            console.log("paymentTermsData[i] > ", paymentTermsData[i]);
            paymentTermsData[i][param] = e.target.value;
          }
        }
        this.setParams(paymentTermsData);
        break;
      case "Description":
        for (let i = 0; i < paymentTermsData.length; i++) {
          if (i === index) {
            console.log("paymentTermsData[i] > ", paymentTermsData[i]);
            paymentTermsData[i][param] = e.target.value;
          }
        }
        this.setParams(paymentTermsData);
        break;
      case "DueDays":
        for (let i = 0; i < paymentTermsData.length; i++) {
          if (i === index) {
            console.log("paymentTermsData[i] > ", paymentTermsData[i]);
            paymentTermsData[i][param] = CF.toInt(e.target.value);
          }
        }
        this.setParams(paymentTermsData);
        break;
      default:
        break;
    }


  }

  setParams = (object) => {
    this.setState({ paymentTermsData: object }, () => {
      this.setState({ listPaymentTerms: this.listPaymentTerms() });
    });
  };


  saveTermsList = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    //  let Url = APIURLS.APIURL.CreateCustomerContact;
    let reqData = {
      ValidUser: ValidUser,
      paymentTermsData: this.state.paymentTermsData,
    };

    console.log("reqData > ", reqData);

  }

  render() {






    const createPaymentTerm = (
      <Grid container spacing={0}>
        <Grid style={{ paddingTop: 10 }} container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button style={{ marginLeft: 5 }} onClick={(e) => { }}>
              {APIURLS.buttonTitle.add}
            </Button>
          </Grid>
          <Grid xs={12} sm={12} md={10} lg={10}>
            &nbsp;
          </Grid>
        </Grid>

        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2}>
              <Grid xs={12}>
                <Accordion
                  key="paymentTerms-General-Details"
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
                      General Details
                    </Typography>
                  </AccordionSummary>

                  <AccordionDetails key="" className="AccordionDetails-css">
                    <Grid container spacing={0}>
                      <Grid item xs={12} sm={12} md={9} lg={9}>



                        <TableContainer>
                          <Table
                            stickyHeader
                            size="small"
                            className="accordion-table"
                            aria-label="paymentTerms List table"
                          >
                            <TableBody className="tableBody">
                              <TextboxInput
                                id="Code"
                                label="Code"
                                variant="outlined"
                                size="small"
                                isMandatory={true}
                              />
                              <TextboxInput
                                id="Description"
                                label="Description"
                                variant="outlined"
                                size="small"
                              />
                              <TextboxInput
                                id="DueDays"
                                label="Due Days"
                                variant="outlined"
                                size="small"
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
        </Grid>
      </Grid>
    );

    const handleAccordionClick = (val, e) => {
      if (val === "GeneralDetailsExpanded") {
        this.state.GeneralDetailsExpanded === true
          ? this.setState({ GeneralDetailsExpanded: false })
          : this.setState({ GeneralDetailsExpanded: true });
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

        <div style={{ height: 20 }}>&nbsp;</div>

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            <Grid style={{ marginLeft: 15 }} container spacing={0}>
              <Grid item xs={12} sm={12} md={9} lg={9}>
                {this.state.listPaymentTerms}
              </Grid>
              
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={4}>
                <div 
                // style={{ marginLeft: 10, marginTop: 45 }}
                >
                  <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={8} lg={8}>
                      <div style={{ marginTop: -12, marginLeft: 1 }}>
                        <h4>Detail view</h4>
                      </div>
                    </Grid>
                    <Grid item xs={12} sm={12} md={4} lg={4}>
                      <div>
                        {this.state.createNew === true ? (
                          <Button
                            className="action-btns"
                            style={{ marginLeft: 10 }}
                          // onClick={(e) => this.UpdateCustomerAddress(e)}
                          >
                            {APIURLS.buttonTitle.save}
                          </Button>
                        ) : (
                          <Button
                            className="action-btns"
                            style={{ marginLeft: 10 }}
                            onClick={(e) => this.UpdateCustomerAddress(e)}
                          >
                            {APIURLS.buttonTitle.save}
                          </Button>
                        )}

                      </div>
                    </Grid>
                  </Grid>
                  <Grid container spacing={0}>
                  <Grid item xs={12} sm={12} md={12} lg={12}>
                  <div
                        style={{
                          height: 500,
                          marginTop: 10,
                          overflowX: "hidden",
                          overflowY: "scroll",
                          width: "100%",
                          backgroundColor: "#ffffff",
                        }}
                      >
                        <div style={{height:20}}>&nbsp;</div>
                        <Table
                            stickyHeader
                            size="small"
                            className="accordion-table"
                            aria-label="paymentTerms List table"
                          >
                            <TableBody className="tableBody">
                              <TextboxInput
                                id="Code"
                                label="Code"
                                variant="outlined"
                                size="small"
                                isMandatory={true}
                              />
                              <TextboxInput
                                id="Description"
                                label="Description"
                                variant="outlined"
                                size="small"
                              />
                              <TextboxInput
                                id="DueDays"
                                label="Due Days"
                                variant="outlined"
                                size="small"
                              />
                            </TableBody>
                          </Table>
                        <div style={{height:20}}>&nbsp;</div>
                      </div>
                  </Grid>
                  </Grid>
                </div>
              </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default paymentTerms;
