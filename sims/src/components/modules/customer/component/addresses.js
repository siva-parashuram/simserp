import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";

import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import DropdownInput from "../../../compo/Tablerowcelldropdown";
import SwitchInput from "../../../compo/tablerowcellswitchinput";

import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

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

class addresses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ErrorPrompt: false,
      SuccessPrompt: false,
      ProgressLoader: true,
      CustomerAddress: {
        AddressID: 0,
        CustID: 0,
        AddressType: 0,
        Code: "",
        Name: "",
        Address: "",
        Address2: "",
        Address3: "",
        City: "",
        PostCode: "",
        CountryID: 0,
        StateID: 0,
        ContactPerson: "",
        PhoneNo: "",
        EmailID: "",
        VATNo: "",
        GSTNo: "",
        EORINo: "",
        TSSNo: "",
        IsBlock: false,
        IncoID: 0,
        ShipmentModeID: 0,
        PostOfDischarge: "",
        FinalDestination: "",
        SpecialInstruction: "",
      },
    };
  }

  componentDidMount() { }

  render() {
    const listCustomerAddresses = (
      <Fragment>
        <div style={{ height: 300, overflowY: 'scroll', width: '100%' }}>
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
            <TableBody className="tableBody">

            </TableBody>
          </Table>
        </div>
      </Fragment>
    );

    const createCustomerAddress = (
      <Grid container spacing={0}>
        <Grid style={{ paddingTop: 10 }} container spacing={0}>
        <Grid xs={12} sm={12} md={2} lg={2}>
            <Button className="action-btns" style={{ marginLeft: 10 }} onClick={(e) => { }}>
              {APIURLS.buttonTitle.add}
            </Button>
          </Grid>
        <Grid xs={12} sm={12} md={10} lg={10}>
           &nbsp;
          </Grid>
          
        </Grid>
        <div style={{ height: 10 }}>&nbsp;</div>
        <Grid container spacing={0}>
          <Grid xs={12} sm={12} md={12} lg={12}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TableContainer>
                  <Table
                    stickyHeader
                    size="small"
                    className="accordion-table"
                    aria-label="customerAddress List table"
                  >
                    <TableBody className="tableBody">
                      <DropdownInput
                        id="AddressType"
                        label="AddressType"
                      // onChange={ }
                      // options={}
                      />
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
                      />
                      <TextboxInput
                        id="Address"
                        label="Address"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="Address2"
                        label="Address2"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="Address3"
                        label="Address3"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="City"
                        label="City"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="PostCode"
                        label="PostCode"
                        variant="outlined"
                        size="small"
                      />
                      <DropdownInput
                        id="CountryID"
                        label="Country"
                      // onChange={ }
                      // options={}
                      />
                      <DropdownInput
                        id="StateID"
                        label="State"
                      // onChange={ }
                      // options={}
                      />
                      <TextboxInput
                        id="ContactPerson"
                        label="Contact Person"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="Address3"
                        label="Address3"
                        variant="outlined"
                        size="small"
                      />
                    </TableBody>
                  </Table>
                </TableContainer>
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={6}>
                <TableContainer>
                  <Table
                    stickyHeader
                    size="small"
                    className="accordion-table"
                    aria-label="customerAddress List table"
                  >
                    <TableBody className="tableBody">
                      <TextboxInput
                        id="EmailID"
                        label="Email ID"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="VATNo"
                        label="VATNo"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="GSTNo"
                        label="GSTNo"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="EORINo"
                        label="EORINo"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="TSSNo"
                        label="TSSNo"
                        variant="outlined"
                        size="small"
                      />
                      <SwitchInput
                        key="IsBlock"
                        id="IsBlock"
                        label="IsBlock"
                        param={this.state.CustomerAddress.IsBlock}
                      // onChange={(e) => updateFormValue("IsBlock", e)}
                      />
                      <DropdownInput
                        id="IncoID"
                        label="IncoID"
                      // onChange={ }
                      // options={}
                      />
                      <DropdownInput
                        id="ShipmentModeID"
                        label="ShipmentModeID"
                      // onChange={ }
                      // options={}
                      />
                      <TextboxInput
                        id="PostOfDischarge"
                        label="Post Of Discharge"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="FinalDestination"
                        label="Final Destination"
                        variant="outlined"
                        size="small"
                      />
                      <TextboxInput
                        id="SpecialInstruction"
                        label="Special Instruction"
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
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Dualtabcomponent
              tab1name="List"
              tab2name="New"
              tab1Html={listCustomerAddresses}
              tab2Html={createCustomerAddress}
            />
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default addresses;
