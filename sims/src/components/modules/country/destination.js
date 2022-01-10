import React, { Fragment } from "react";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableContainer from "@material-ui/core/TableContainer";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";

import TablePagination from "@mui/material/TablePagination";

import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Adddestination from "./adddestination";
import Pagination from "../../compo/paginationcomponent";


class destination extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pagination: {
        page: 0,
        rowsPerPage: 5,
      },
      urlparams: "",
      ProgressLoader: false,
      destinations: [],
      CountryID:0,
    };
  }

  componentDidMount() {
    let params = CF.GET_URL_PARAMS();
    var url = new URL(window.location.href);
    let branchId = url.searchParams.get("branchId");
    let branchName = url.searchParams.get("branchName");
    let compName = url.searchParams.get("compName");
    let CountryID=this.props.CountryID?parseInt(this.props.CountryID):0; 
    console.log("Destination > this.props.CountryID > ",this.props.CountryID);
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    this.setState({
      urlparams: params,
      CountryID:CountryID
    });
  }

  render() {
    const updatePostcode = (id, e) => {
      document.getElementById(id).value = e.target.value;
    };

    const getPageData = (data) => {
      let rows = data;
      let page = parseInt(this.state.pagination.page);
      let rowsPerPage = parseInt(this.state.pagination.rowsPerPage);
      return rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    };

    const handlePageChange = (event, newPage) => {
      let pagination = this.state.pagination;
      pagination.page = newPage;
      this.setState({ pagination: pagination });
    };

    const openPage = (url) => {
      this.setState({ ProgressLoader: false });
      console.log("openPage > url > ",url)
       window.location = url;
    };

    return (
      <Fragment>

        <div style={{marginTop:-10}}>
          <Grid container spacing={0}>
            <Grid xs={12} sm={12} md={4} lg={4}>
              <h5 className="destination-title">Destinations</h5>
            </Grid>
           
            <Grid xs={12} sm={12} md={2} lg={2}>   
            <div  style={{marginTop:16}}>
            <ButtonGroup
                size="small"
                variant="text"
                aria-label="Action Menu Button group"
              >               
                <Button
                  startIcon={APIURLS.buttonTitle.add.icon}
                  className="action-btns"
                  onClick={(e) => openPage(URLS.URLS.addDestination + this.state.urlparams+"&CountryID="+this.props.CountryID)}
                >
                  {APIURLS.buttonTitle.add.name}
                </Button>

              </ButtonGroup>
              </div>
            </Grid>
            <Grid xs={12} sm={12} md={6} lg={6}>  </Grid>
          </Grid>
          
          
            <Grid container spacing={0}>
              <Grid xs={12} sm={12} md={12} lg={12}>
                 
                    <Fragment>
                      <TableContainer sx={{ maxHeight: 400 }}>
                        <Table
                          stickyHeader
                          size="small"
                          className=""
                          aria-label="Destination & Postcode List table"
                        >
                          <TableHead className="table-header-background">
                            <TableRow>
                              <TableCell className="table-header-font">
                                #
                              </TableCell>
                              <TableCell
                                className="table-header-font"
                                align="left"
                              >
                                Destination
                              </TableCell>
                              <TableCell
                                className="table-header-font"
                                align="left"
                              >
                                PostCode
                              </TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody className="tableBody">
                            {this.props.destinations
                              ? getPageData(this.props.destinations).map(
                                (item, i) => (
                                  <TableRow>
                                    <TableCell>
                                    {i + 1}
                                    </TableCell>
                                    <TableCell>
                                      <a
                                        className="LINK tableLink"
                                        href={
                                          URLS.URLS.editDestination +
                                          this.state.urlparams +
                                          "&&destinationId=" +
                                          item.DestinationID +
                                          "&&countryId=" +
                                          this.props.CountryID
                                        }
                                      >
                                        {item.DestinationName} 
                                      </a>
                                    </TableCell>
                                    <TableCell>
                                      {item.Postcode}
                                    </TableCell>
                                  </TableRow>
                                )
                              )
                              : null}
                          </TableBody>
                        </Table>
                      </TableContainer>

                  {this.props.destinations ? (
                    <Pagination
                      data={this.props.destinations}
                      pagination={this.state.pagination}
                      onPageChange={handlePageChange}
                    />
                  ) : null}
                     
                    </Fragment>
                  
             
              </Grid>
            </Grid>
           
        </div>
      </Fragment>
    );
  }
}
export default destination;
