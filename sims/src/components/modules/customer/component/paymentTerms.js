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

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";
import * as CF from "../../../../services/functions/customfunctions";

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
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      PaymentTerms: {
        PaymentTermID:0,
        Code: "",
        Description: "",
        DueDays:"",
      },
    };
  }

  componentDidMount() {}

  render() {
    const listPaymentTerms = (
      <Table
        stickyHeader
        size="small"
        className=""
        aria-label="paymentTerms List table"
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

    const createPaymentTerm = (
      <Grid container spacing={0}>
        <Grid style={{ paddingTop: 10 }} container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Button style={{ marginLeft: 5 }} onClick={(e) => {}}>
            {APIURLS.buttonTitle.add}

            </Button>
          </Grid>
        </Grid>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={8} lg={8}>
            <Grid container spacing={2}>
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
          </Grid>
        </Grid>
      </Grid>
    );

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

        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={10} lg={10}>
            <Grid style={{ marginLeft: 15 }} container spacing={0}>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <Dualtabcomponent
                  tab1name="List"
                  tab2name="New"
                  tab1Html={listPaymentTerms}
                  tab2Html={createPaymentTerm}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default paymentTerms;
