import React, { Fragment } from 'react';
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Divider } from '@material-ui/core';

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import Dualtabcomponent from '../../compo/dualtabcomponent';



class poMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProgressLoader: true,
            editBtnDisable: true,
            initialCss: "",
            urlparams: "",
            editUrl: "",
            PODataList: []
        }
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
        this.setState({ urlparams: urlparams });
    }

   

    handleRowClick = (e, item, id) => {

        let editUrl =
            URLS.URLS.editPO +
            this.state.urlparams +
            "&editPOID=" +
            item.POID;
        editUrl = editUrl + "&type=edit";
        this.setState({
            POID: item.POID,
            editUrl: editUrl,
            editBtnDisable:false,
        });
       
        this.removeIsSelectedRowClasses();
        document.getElementById(id).classList.add("selectedRow");

    };
  
       removeIsSelectedRowClasses = () => {
        for (let i = 0; i < this.state.customerData.length; i++) {
          document.getElementById("row_" + i).className = "";
        }
      };

    render() {

        


        const openPage = (url) => {
            this.setState({ ProgressLoader: false });
            window.location = url;
        };


        

        return (
            <Fragment>
                <Loader ProgressLoader={this.state.ProgressLoader} />

                <div className="breadcrumb-height">
                    <Grid container spacing={1}>
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
                                    typoTitle="Purchase Order Master"
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
                                    <Button
                                        className="action-btns"
                                        startIcon={<AddIcon />}
                                        onClick={(e) =>
                                            openPage(URLS.URLS.addPO + this.state.urlparams + "&type=add")
                                        }
                                    >
                                        {APIURLS.buttonTitle.add}
                                    </Button>
                                    <Button className="action-btns"
                                        startIcon={<EditIcon />}
                                        onClick={(e) =>
                                            openPage(this.state.editUrl)
                                        }
                                        disabled={this.state.editBtnDisable}
                                    >
                                        {APIURLS.buttonTitle.edit}
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="breadcrumb-bottom"></div>
                <Grid className="table-adjust" container spacing={0}>
                    <Grid xs={12} sm={12} md={8} lg={8}>
                    <Fragment>
                {this.state.PODataList.length >= 0 ? (
                    <Fragment>
                        <TableContainer style={{ maxHeight: 440 }}>
                            <Table
                                stickyHeader
                                size="small"
                                className=""
                                aria-label="item List table"
                            >
                                <TableHead className="table-header-background">
                                    <TableRow>                                        
                                        <TableCell className="table-header-font">No</TableCell>
                                        <TableCell className="table-header-font" align="left">
                                            PO Date
                                        </TableCell>
                                        <TableCell className="table-header-font" align="left">
                                            Supplier
                                        </TableCell>                                      
                                        <TableCell className="table-header-font" align="left">
                                            Status
                                        </TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody className="tableBody">
                                    

                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Fragment>
                ) : (
                    <Tableskeleton />
                )}
            </Fragment>
                    </Grid>
                    <Grid xs={12} sm={12} md={4} lg={4}>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={1} lg={1}>
                                &nbsp;
                            </Grid>
                            <Grid xs={12} sm={12} md={11} lg={11}>
                            <Grid container spacing={0}>                            
                            <Grid xs={12} sm={12} md={11} lg={11}>
                                 
                            </Grid>
                        </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }

}
export default poMaster;

