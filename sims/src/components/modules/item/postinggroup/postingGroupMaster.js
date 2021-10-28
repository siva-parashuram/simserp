import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";

import Button from "@material-ui/core/Button";
import AddIcon from "@material-ui/icons/Add";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import ButtonGroup from "@mui/material/ButtonGroup";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";

import Loader from "../../../compo/loader";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";

class postingGroupMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      editurl: "",
      accordion1: false,
      accordion2: false,
      accordion3: false,
      ItemPostingGroupID: 0,
      Code: "",
      Description: "",
    };
  }

  componentDidMount() {
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

  render() {
    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const tableItemPostingGroup = (
      <Table
        stickyHeader
        size="small"
        className=""
        aria-label="Item-catagory List table"
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

    const formItemPostingGroup = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <TableContainer>
            <Table
              stickyHeader
              size="small"
              className="accordion-table"
              aria-label="company List table"
            >
              <TableBody className="tableBody">
                <TextboxInput
                  id="ItemPostingGroupID"
                  label="Item Posting Group ID"
                  variant="outlined"
                  size="small"
                  value={this.state.ItemPostingGroupID}
                />
                <TextboxInput
                  id="Code"
                  label="Code"
                  variant="outlined"
                  size="small"
                  value={this.state.Code}
                />
                <TextboxInput
                  id="Description"
                  label="Description"
                  variant="outlined"
                  size="small"
                  value={this.state.Description}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );

    const section1 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableItemPostingGroup}
            tab2Html={formItemPostingGroup}
          />
        </Grid>
      </Grid>
    );

    const section2 = (
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={11} lg={11}>
            <Dualtabcomponent
              tab1name="List"
              tab2name="New"
              tab1Html={tableItemPostingGroup}
              tab2Html={formItemPostingGroup}
            />
          </Grid>
        </Grid>
      );

    const handleAccordionClick = (val, e) => {
      if (val === "accordion1") {
        this.state.accordion1 === true
          ? this.setState({ accordion1: false })
          : this.setState({ accordion1: true });
      }
      if (val === "accordion2") {
        this.state.accordion2 === true
          ? this.setState({ accordion2: false })
          : this.setState({ accordion2: true });
      }
      if (val === "accordion3") {
        this.state.accordion3 === true
          ? this.setState({ accordion3: false })
          : this.setState({ accordion3: true });
      }
    };

    return (
      <Fragment>
        <Loader ProgressLoader={this.state.ProgressLoader} />

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
                  typoTitle="Posting Group Setup"
                  level={1}
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
                  <Button className="action-btns" startIcon={<AddIcon />}>
                    New
                  </Button>
                  <Button className="action-btns" startIcon={<EditIcon />}>
                    Edit
                  </Button>
                </ButtonGroup>
              </div>
            </Grid>
          </Grid>
          <div className="breadcrumb-bottom"></div>

          <div className="New-link-bottom"></div>
          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}>
                  <Accordioncomponent
                    accordionKey="a-1"
                    expanded={this.state.accordion1}
                    onClick={(e) => handleAccordionClick("accordion1", e)}
                    id="accordion1"
                    typographyKey="Item-Posting-Group"
                    typography="Item Posting Group"
                    accordiondetailsKey="accordion1"
                    html={section1}
                  />
                </Grid>
                <Grid xs={12} sm={12} md={11} lg={11}>
                  <Accordioncomponent
                    accordionKey="a-1"
                    expanded={this.state.accordion2}
                    onClick={(e) => handleAccordionClick("accordion2", e)}
                    id="accordion2"
                    typographyKey="General-Posting-Group"
                    typography="General Posting Group"
                    accordiondetailsKey="accordion2"
                    html={section2}
                  />
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}>
                  <Accordioncomponent
                    accordionKey="a-2"
                    expanded={this.state.accordion2}
                    onClick={(e) => handleAccordionClick("accordion2", e)}
                    id="accordion2"
                    typographyKey="a-t-2"
                    typography="Dummy Accordion Title 2"
                    accordiondetailsKey="a-d-2"
                    html={section1}
                  /> */}
                </Grid>
              </Grid>
            </Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}>
                  <Accordioncomponent
                    accordionKey="a-3"
                    expanded={this.state.accordion3}
                    onClick={(e) => handleAccordionClick("accordion3", e)}
                    id="accordion3"
                    typographyKey="a-t-3"
                    typography="Dummy Accordion Title 3"
                    accordiondetailsKey="a-d-3"
                    html={section1}
                  />
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </Fragment>
    );
  }
}
export default postingGroupMaster;
