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
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";

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
import BackdropLoader from "../../../compo/backdrop";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";
import Inputcustom from "../../../compo/inputcustom";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";
import { Divider } from "@material-ui/core";

class salesPerson extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      GeneralDetailsExpanded: true,
      SalesPerson: {
        SalesPersonID: 0,
        Code: "",
        Name: "",
        JobTitle: "",
        EmailID: "",
        PhoneNo: "",
        IsActive: false,
        CommsionPecentage: "",
      },
    };
  }

  componentDidMount() {}

  render() {
    const listSalesPerson = (
      <Table
        stickyHeader
        size="small"
        className=""
        aria-label="CustomerCategory List table"
      >
        <TableHead className="table-header-background">
          <TableRow>
            <TableCell className="table-header-font">#</TableCell>
            <TableCell className="table-header-font" align="left">
              Name
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody className="tableBody"></TableBody>
      </Table>
    );

    const createSalesPerson = (
      <Grid container spacing={0}>
        <Grid style={{ paddingTop: 10 }} container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button style={{ marginLeft: 5 }} onClick={(e) => {}}>
              {APIURLS.buttonTitle.add}
            </Button>
          </Grid>
        </Grid>
        <div style={{ height: 10 }}>&nbsp;</div>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={10} lg={10}>
            <Grid container spacing={0}>
              <Grid item xs={12}>
                <Accordion
                  key="SalesPerson-General-Details"
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
                      <Grid item xs={12} sm={12} md={5} lg={5}>
                        <TableContainer>
                          <Table
                            stickyHeader
                            size="small"
                            className="accordion-table"
                            aria-label="SalesPerson List table"
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
                                id="Name"
                                label="Name"
                                variant="outlined"
                                size="small"
                                isMandatory={true}
                              />
                              <TextboxInput
                                id="JobTitle"
                                label="Job Title"
                                variant="outlined"
                                size="small"
                              />
                              <TextboxInput
                                id="EmailID"
                                label="EmailID"
                                variant="outlined"
                                size="small"
                              />
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                      <Grid item xs={12} sm={12} md={5} lg={5}>
                        <TableContainer>
                          <Table
                            stickyHeader
                            size="small"
                            className="accordion-table"
                            aria-label="SalesPerson List table"
                          >
                            <TableBody className="tableBody">
                              <TextboxInput
                                type="number"
                                id="PhoneNo"
                                label="Phone No"
                                variant="outlined"
                                size="small"
                              />
                              <SwitchInput
                                key="IsActive"
                                id="IsActive"
                                label="IsActive"
                                param={this.state.SalesPerson.IsActive}
                                // onChange={(e) => updateFormValue("IsActive", e)}
                              />
                              <TextboxInput
                                id="CommsionPecentage"
                                label="Commsion Pecentage"
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
        <BackdropLoader open={!this.state.ProgressLoader} />

        <ErrorSnackBar
          ErrorPrompt={this.state.ErrorPrompt}
          closeErrorPrompt={closeErrorPrompt}
        />
        <SuccessSnackBar
          SuccessPrompt={this.state.SuccessPrompt}
          closeSuccessPrompt={closeSuccessPrompt}
        />

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Grid style={{ marginLeft: 15 }} container spacing={0}>
              <Grid item xs={12} sm={12} md={10} lg={10}>
                <Dualtabcomponent
                  tab1name="List"
                  tab2name="New"
                  tab1Html={listSalesPerson}
                  tab2Html={createSalesPerson}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default salesPerson;
