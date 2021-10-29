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
import ButtonGroup from "@mui/material/ButtonGroup";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import EditIcon from "@mui/icons-material/Edit";

import { COOKIE, getCookie } from "../../../../services/cookie";
import * as APIURLS from "../../../../routes/apiconstant";
import * as URLS from "../../../../routes/constants";
import "../../../user/dasboard.css";

import ErrorSnackBar from "../../../compo/errorSnackbar";
import SuccessSnackBar from "../../../compo/successSnackbar";
import Loader from "../../../compo/loader";
import Breadcrumb from "../../../compo/breadcrumb";
import Dualtabcomponent from "../../../compo/dualtabcomponent";
import Accordioncomponent from "../../../compo/accordioncomponent";
import Sectiontitle from "../../../compo/sectiontitle";

import TextboxInput from "../../../compo/tablerowcelltextboxinput";

class postingGroupMaster extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      urlparams: "",
      ProgressLoader: true,
      ErrorPrompt: false,
      SuccessPrompt: false,
      editurl: "",
      accordion1: false,
      accordion2: false,
      accordion3: false,
      ItemPostingGroupList: [],
      ItemPostingGroup: {
        ItemPostingGroupID: 0,
        Code: "",
        Description: ""
      }



    };
  }

  componentDidMount() {
    this.getAllItemPostingGroup();
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



  getAllItemPostingGroup = () => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };
    let Url = APIURLS.APIURL.GetAllItemPostingGroup;
    axios
      .post(Url, ValidUser, { headers })
      .then((response) => {
        let data = response.data;
        console.log("data > ", data);
        this.setState({ ItemPostingGroupList: data });
      })
      .catch((error) => { });
  }

  render() {
    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      window.location = url;
    };

    const updateFormValue = (parent, key, e) => {
      let stateParent = {};
      switch (parent) {
        case "ItemPostingGroup":
          switch (key) {
            case "Code":
              stateParent = this.state.ItemPostingGroup;
              stateParent[key] = e.target.value;
              setStateParam({}, parent, stateParent);
              break;
            case "Description":
              stateParent = this.state.ItemPostingGroup;
              stateParent[key] = e.target.value;
              setStateParam({}, parent, stateParent);
              break;
            default:
              break;
          }
          break;

        default:
          break;
      }
      if (parent === "ItemPostingGroup") {

      }
    }

    const setStateParam = (validations, key, value) => {
      console.log("validations > ", validations);
      console.log("key > ", key);
      console.log("value > ", value);
      if (
        Object.keys(validations).length === 0 &&
        validations.constructor === Object
      ) {
        console.log("validations is Empty ");
        this.setState({ [key]: value });
      } else {
        if (validations.validate) {
          !validations.isEmpty
            ? validations.isNumber
              ? this.setState({ [key]: value })
              : this.setState({ [key]: 0 })
            : this.setState({ [key]: 0 });
        } else {
          this.setState({ [key]: value });
        }
      }
    };


    const createItemPostingGroup = (e) => {
      this.setState({ ProgressLoader: false });
      let ValidUser = APIURLS.ValidUser;
      ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
      ValidUser.Token = getCookie(COOKIE.TOKEN);
      const headers = {
        "Content-Type": "application/json",
      };
      let Url = APIURLS.APIURL.CreateItemPostingGroup;
      let reqData = {
        validUser: ValidUser,
        ItemPostingGroup: this.state.ItemPostingGroup
      };
      console.log("createItemPostingGroup > reqData > ", reqData);
      axios
        .post(Url, reqData, { headers })
        .then((response) => {
          if (response.status === 200 || response.status === 201) {
            let ItemPostingGroup = {
              ItemPostingGroupID: 0,
              Code: "",
              Description: ""
            };
            let data = response.data;
            console.log("data > ", data);
            this.setState({ ProgressLoader: true, SuccessPrompt: true, ItemPostingGroup: ItemPostingGroup });
            this.getAllItemPostingGroup();
          } else {
            this.setState({ ProgressLoader: true, ErrorPrompt: true });
          }

        })
        .catch((error) => {
          this.setState({ ProgressLoader: true, ErrorPrompt: true });
        });
    }

    const updateList=(parent,key,item, e)=>{}

    const tableItemPostingGroup = (
      <Fragment>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={6} lg={6}>
            <Table
              stickyHeader
              size="small"
              className=""
              aria-label="Item-catagory List table"
              style={{ marginTop: 20 }}
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
                </TableRow>
              </TableHead>
              <TableBody className="tableBody">
                {this.state.ItemPostingGroupList.map((item, i) => (
                  <TableRow>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell align="left">
                      <input
                        className="table-text-field"
                        id={"itemPostingGroup_code_" + item.itemPostingGroupID}
                        size="small"
                        defaultValue={item.code}
                       onKeyUp={(e) => updateList("ItemPostingGroupList","code" ,item, e)}
                      />

                    </TableCell>
                    <TableCell align="left">
                      <input
                        className="table-text-field"
                        id={"itemPostingGroup_description_" + item.itemPostingGroupID}
                        size="small"
                        defaultValue={item.description}
                        onKeyUp={(e) => updateList("ItemPostingGroupList","description" ,item, e)}
                      />

                    </TableCell>
                  </TableRow>
                ))}

              </TableBody>
            </Table>
          </Grid>
        </Grid>
      </Fragment>
    );
    const tableGeneralPostingGroup = (
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
    const tableGeneralPostingGroupSetup = (
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
      <Grid container spacing={0} style={{ marginTop: 20 }}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button style={{ marginLeft: 5 }}
            onClick={(e) => createItemPostingGroup(e)}
          >
            Create
          </Button>
        </Grid>

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
                  id="codeItemPostingGroup"
                  label="Code"
                  variant="outlined"
                  size="small"
                  value={this.state.ItemPostingGroup.Code}
                  onChange={(e) =>
                    updateFormValue("ItemPostingGroup", "Code", e)
                  }
                />
                <TextboxInput
                  id="descriptionItemPostingGroup"
                  label="Description"
                  variant="outlined"
                  size="small"
                  value={this.state.ItemPostingGroup.Description}
                  onChange={(e) =>
                    updateFormValue("ItemPostingGroup", "Description", e)
                  }
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );

    const formGeneralPostingGroup = (
      <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button style={{ marginLeft: 5 }} onClick={(e) => { }}>
            Create
          </Button>
        </Grid>
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
                  id="GeneralPostingGroupID"
                  label="General Posting Group ID"
                  variant="outlined"
                  size="small"
                  value={this.state.GeneralPostingGroupID}
                />
                <TextboxInput
                  id="codeGeneralPostingGroup"
                  label="Code"
                  variant="outlined"
                  size="small"
                  value={this.state.codeGeneralPostingGroup}
                />
                <TextboxInput
                  id="descriptionGeneralPostingGroup"
                  label="Description"
                  variant="outlined"
                  size="small"
                  value={this.state.descriptionGeneralPostingGroup}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );
    const formGeneralPostingGroupSetup = (
      <Grid container spacing={0}>
        <Grid xs={12} sm={12} md={8} lg={8}>
          <Button style={{ marginLeft: 5 }} onClick={(e) => { }}>
            Create
          </Button>
        </Grid>
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
                  id="GeneralPostingGroupID"
                  label="General Posting Group ID"
                  variant="outlined"
                  size="small"
                  value={this.state.GeneralPostingGroupID}
                />
                <TextboxInput
                  id="ItemPostingGroupID"
                  label="Item Posting Group ID"
                  variant="outlined"
                  size="small"
                  value={this.state.ItemPostingGroupID}
                />
                <DropdownInput
                  id="SalesAccount"
                  label="Sales Account"
                  // onChange={(e) => updateFormValue("SalesAccount", e)}
                  // options={}
                  value={this.state.SalesAccount}
                />
                <DropdownInput
                  id="SalesCNAccount"
                  label="SalesCNAccount"
                  // onChange={(e) => updateFormValue("SalesCNAccount", e)}
                  // options={}
                  value={this.state.SalesCNAccount}
                />
                <DropdownInput
                  id="SalesDNAccount"
                  label="SalesDNAccount"
                  // onChange={(e) => updateFormValue("SalesDNAccount", e)}
                  // options={}
                  value={this.state.SalesDNAccount}
                />
                <DropdownInput
                  id="PurchaseAccount"
                  label="Purchase Account"
                  // onChange={(e) => updateFormValue("PurchaseAccount", e)}
                  // options={}
                  value={this.state.PurchaseAccount}
                />
                <DropdownInput
                  id="PurchaseCNAccount"
                  label="PurchaseCNAccount"
                  // onChange={(e) => updateFormValue("PurchaseCNAccount", e)}
                  // options={}
                  value={this.state.PurchaseCNAccount}
                />
                <DropdownInput
                  id="PurchaseDNAccount"
                  label="PurchaseDNAccount"
                  // onChange={(e) => updateFormValue("PurchaseDNAccount", e)}
                  // options={}
                  value={this.state.PurchaseDNAccount}
                />
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    );

    const section1 = (
      <Fragment>

        <Grid container spacing={0} style={{ marginTop: 20, marginBottom: 20 }}>
          <Grid item xs={12} sm={12} md={12} lg={12}>
            <Dualtabcomponent
              tab1name="List"
              tab2name="New"
              tab1Html={tableItemPostingGroup}
              tab2Html={formItemPostingGroup}
            />
          </Grid>
        </Grid>

      </Fragment>
    );

    const section2 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableGeneralPostingGroup}
            tab2Html={formGeneralPostingGroup}
          />
        </Grid>
      </Grid>
    );

    const section3 = (
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={11} lg={11}>
          <Dualtabcomponent
            tab1name="List"
            tab2name="New"
            tab1Html={tableGeneralPostingGroupSetup}
            tab2Html={formGeneralPostingGroupSetup}
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

          <div style={{ marginLeft: 50, marginRight: 50 }}>
            <Sectiontitle title="Item" />
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  style={{ backgroundColor: '#fafafa' }}
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
                  accordionKey="a-2"
                  expanded={this.state.accordion2}
                  onClick={(e) => handleAccordionClick("accordion2", e)}
                  id="accordion2"
                  typographyKey="General-Posting-Group"
                  typography="General Posting Group"
                  accordiondetailsKey="accordion2"
                  html={section2}
                />
              </Grid>
              <Grid xs={12} sm={12} md={11} lg={11}>
                <Accordioncomponent
                  accordionKey="a-3"
                  expanded={this.state.accordion3}
                  onClick={(e) => handleAccordionClick("accordion3", e)}
                  id="accordion3"
                  typographyKey="General-Posting-Group-Setup"
                  typography="General Posting Group Setup"
                  accordiondetailsKey="accordion3"
                  html={section3}
                />
              </Grid>
            </Grid>
            <Sectiontitle title="Supplier" />

            <Sectiontitle title="Customer" />
          </div>

          <Grid className="table-adjust" container spacing={0}>
            <Grid xs={12} sm={12} md={4} lg={4}></Grid>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <Grid container spacing={0}>
                <Grid xs={12} sm={12} md={11} lg={11}>
                 
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
