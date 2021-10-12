import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import LinearProgress from "@material-ui/core/LinearProgress";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import Tablerowcelltextboxinput from "../../compo/tablerowcelltextboxinput";

import "../../user/dasboard.css";
import Header from "../../user/userheaderconstants";
 
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

class addcountry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: false,
      GeneralDetailsExpanded: true,
      Validations: {
        countryName: { errorState: false, errorMsg: "" },
        address: { errorState: false, errorMsg: "" },
        country: { errorState: false, errorMsg: "" },
      },
      country: {
        CountryId: 0,
        CreationDate: null,
        Name: "",
        ThreeDitgitCode: "",
        TwoDitgitCode: "",
        ZoneID: 0,
        UserID: 0,
      },
      zones: [],
      selectedZone: null,
      ErrorPrompt: false,
      SuccessPrompt: false,
    };
  }

  componentDidMount() {
    this.getZones();
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

  getZones() {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let GetZonesUrl = APIURLS.APIURL.GetZones;

    axios
      .post(GetZonesUrl, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("getZones > response > data > ", data);
        this.setState({ zones: data, ProgressLoader: true });
      })
      .catch((error) => {
        console.log("error > ", error);
      });
  }

  render() {
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

    const updateFormValue = (id, e) => {
      if (id === "Name") {
        let country = this.state.country;
        country.Name = e.target.value;
        this.setState({ country: country });
      }
      if (id === "TwoDitgitCode") {
        let country = this.state.country;
        country.TwoDitgitCode = e.target.value;
        this.setState({ country: country });
      }
      if (id === "ThreeDitgitCode") {
        let country = this.state.country;
        country.ThreeDitgitCode = e.target.value;
        this.setState({ country: country });
      }
      if (id === "ZoneID") {
        let country = this.state.country;
        country.ZoneID = e.target.value;

        this.setState({ country: country, selectedZone: e.target.value });
      }
    };

    const handleCreate = () => {
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      let country = this.state.country;
      const handleCreateData = {
        validUser: ValidUser,
        country: country,
      };
      const headers = {
        "Content-Type": "application/json",
      };
      let CreateCountryUrl = APIURLS.APIURL.CreateCountry;

      axios
        .post(CreateCountryUrl, handleCreateData, { headers })
        .then((response) => {
          let data = response.data;
          console.log("handleCreate > response > data > ", data);
        })
        .catch((error) => {
          console.log("error > ", error);
        });
    };

    const closeErrorPrompt = (event, reason) => {
      if (reason === "clickaway") {
        return;
      }
      this.setState({ SuccessPrompt: false });
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
        <Header/>
        {this.state.ProgressLoader === false ? (
          <div style={{ marginTop: -8, marginLeft: -10 }}>
            <LinearProgress style={{ backgroundColor: "#ffeb3b" }} />{" "}
          </div>
        ) : null}

        <Snackbar
          open={this.state.SuccessPrompt}
          autoHideDuration={3000}
          onClose={closeSuccessPrompt}
        >
          <Alert onClose={closeSuccessPrompt} severity="success">
            Success!
          </Alert>
        </Snackbar>

        <Snackbar
          open={this.state.ErrorPrompt}
          autoHideDuration={3000}
          onClose={closeErrorPrompt}
        >
          <Alert onClose={closeErrorPrompt} severity="error">
            Error!
          </Alert>
        </Snackbar>
        <div className="breadcrumb-height">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Breadcrumbs className="style-breadcrumb" aria-label="breadcrumb">
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
                  href={URLS.URLS.countryMaster + this.state.urlparams}
                >
                  Country Master
                </Link>
                <Typography color="textPrimary">Add New Country</Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>
          <Grid container spacing={3}>
            <Grid className="style-buttons" xs={1}>
              <Button style={{ marginLeft: 5 }} onClick={handleCreate}>
                Create
              </Button>
            </Grid>
          </Grid>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={6} md={6} lg={6}>
              <Accordion
                key="country-General-Details"
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
                <AccordionDetails key="">
                  <TableContainer>
                    <Table
                      stickyHeader
                      size="small"
                      className="accordion-table"
                      aria-label="company List table"
                    >
                      <TableBody className="tableBody">
                        <Tablerowcelltextboxinput
                          id="Name"
                          label="Country Name"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("Name", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 50,
                          }}
                          error={this.state.Validations.countryName.errorState}
                          helperText={
                            this.state.Validations.countryName.errorMsg
                          }
                        />

                        <Tablerowcelltextboxinput
                          id="TwoDitgitCode"
                          label="Two Digit Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) => updateFormValue("TwoDitgitCode", e)}
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 20,
                          }}
                        />

                        <Tablerowcelltextboxinput
                          id="ThreeDitgitCode"
                          label="Three Digit Code"
                          variant="outlined"
                          size="small"
                          onChange={(e) =>
                            updateFormValue("ThreeDitgitCode", e)
                          }
                          InputProps={{
                            className: "textFieldCss",
                            maxlength: 20,
                          }}
                        />

                        <TableRow>
                          <TableCell align="left" className="no-border-table">
                            Zone
                          </TableCell>
                          <TableCell align="left" className="no-border-table">
                            <select
                              className="dropdown-css"
                              id="ZoneID"
                              label="Zone"
                              fullWidth
                              value={parseInt(this.state.selectedZone)}
                              onChange={(e) => updateFormValue("ZoneID", e)}
                            >
                              {this.state.zones.map((item, i) => (
                                <option value={item.zoneId}>
                                  {item.description}({item.code})
                                </option>
                              ))}
                            </select>
                          </TableCell>
                        </TableRow>
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
export default addcountry;
