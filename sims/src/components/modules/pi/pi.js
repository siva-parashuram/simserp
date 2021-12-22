import React, { Fragment } from 'react';
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import IconButton from "@mui/material/IconButton";
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";
import BackdropLoader from "../../compo/backdrop";
import MasterDataGrid from "../../compo/masterdatagrid";
import Dualtabcomponent from '../../compo/dualtabcomponent';

import PoMrnMaster from '../po/poMrnMaster';
import Attachmentmaster from '../../ftp/attachment/attachmentmaster';


class pi extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            Dialog: {
                DialogTitle: "",
                DialogStatus: false,
                DialogContent: null,
            },
            pagination: {
                page: 1,
                rowsPerPage: APIURLS.pagination.rowsPerPage,
            },
            ProgressLoader: false,
            editBtnDisable: true,
            initialCss: "",
            urlparams: "",
            item: null,
            editUrl: null,
            BranchID: 0,
            columns: APIURLS.MRNMasterColumn,
            PODataList: [],
            selectionModel: [1],
        }
    }
    componentDidMount() {
        var url = new URL(window.location.href);
        let params = CF.GET_URL_PARAMS();
        console.log("Menusection params > ", params);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = params;
        // "?branchId=" +
        // branchId +
        // "&compName=" +
        // compName +
        // "&branchName=" +
        // branchName;
        this.setState({ urlparams: urlparams, BranchID: branchId, editBtnDisable: false }, () => {
            this.getPIList();
        });
    }

    getPIList = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = CF.toInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetPIByBranchID;
        let reqData = {
            ValidUser: ValidUser,
            PI: {
                BranchID: CF.toInt(this.state.BranchID)
               
            }
        };
        axios
            .post(Url, reqData, { headers })
            .then((response) => {
                let data = response.data;
                console.log("data > ", data);
                let newData = [];
                for (let i = 0; i < data.length; i++) {
                    data[i].id = i + 1;
                    newData.push(data[i]);
                }
                this.setState({ PODataList: newData, ProgressLoader: true }, () => {
                    if (newData.length > 0) {
                        this.handleRowClick([1]);
                    }
                });
            })
            .catch((error) => {
                console.log("Error > ", error);
                this.setState({ PODataList: [], ProgressLoader: true });
            });
    };


    handleRowClick = (e) => {
        try {
            console.log("handleRowClick > e > ", e);
            let index = e[0];
            console.log("handleRowClick > index > ", index);
            let item = this.state.PODataList[index - 1];
            console.log("handleRowClick > item > ", item);


            let editUrl =
                URLS.URLS.editPI +
                this.state.urlparams +
                "&editPIID=" +
                item.PIID +
                "&type=edit";
            this.setState({
                item: item,
                editUrl: editUrl,
                selectionModel: index,
            });

        } catch (e) {
            console.log("Error : ", e);
        }
    }



    render() {
        const openPage = (url) => {
            // this.setState({ ProgressLoader: false });
            console.log("url > ", url);
            window.location = url;
        };

        const handlePageChange = (event, newPage) => {
            let pagination = this.state.pagination;
            pagination.page = newPage;
            this.setState({ pagination: pagination });
        };




        const breadcrumbHtml = (
            <Fragment>
                <Breadcrumb
                    backOnClick={this.props.history.goBack}
                    linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                    linkTitle="Dashboard"
                    typoTitle="Purchase Invoice"
                    level={1}
                />
            </Fragment>
        );

        const buttongroupHtml = (
            <Fragment>
                <ButtonGroup
                    size="small"
                    variant="text"
                    aria-label="Action Menu Button group"
                >

                    <Button

                        startIcon={APIURLS.buttonTitle.add.icon}
                        className="action-btns"
                        onClick={(e) => openPage(URLS.URLS.addPI + this.state.urlparams + "&type=add")}
                        disabled={this.state.DisableCreatebtn}
                    >
                        {APIURLS.buttonTitle.add.name}
                    </Button>

                    <Button className="action-btns"
                        startIcon={APIURLS.buttonTitle.edit.icon}
                        onClick={(e) =>
                            openPage(this.state.editUrl)
                        }
                        disabled={this.state.PODataList.length > 0 ? this.state.editBtnDisable : true}
                    >
                        {APIURLS.buttonTitle.edit.name}
                    </Button>
                </ButtonGroup>
            </Fragment>
        );

        return (
            <Fragment>
                <BackdropLoader open={!this.state.ProgressLoader} />
                <TopFixedRow3
                    breadcrumb={breadcrumbHtml}
                    buttongroup={buttongroupHtml}
                />

                <Grid className="table-adjust" container spacing={0}>
                    <Grid xs={12} sm={12} md={8} lg={8}>
                        <Fragment>
                            {console.log("this.state.PODataList > ", this.state.PODataList)}
                            {this.state.PODataList.length > 0 ? (
                                <Fragment>
                                    <MasterDataGrid
                                        selectionModel={this.state.selectionModel}
                                        rows={this.state.PODataList}
                                        columns={this.state.columns}
                                        pagination={this.state.pagination}
                                        disableSelectionOnClick={false}
                                        onSelectionModelChange={(e) => this.handleRowClick(e)}
                                        onPageChange={handlePageChange}
                                    />
                                </Fragment>
                            ) : (
                                <Fragment>
                                    {this.state.PODataList.length === 0 ? (
                                        <MasterDataGrid
                                            selectionModel={this.state.selectionModel}
                                            rows={[]}
                                            columns={this.state.columns}
                                            pagination={this.state.pagination}
                                            disableSelectionOnClick={false}
                                            onSelectionModelChange={(e) => this.handleRowClick(e)}
                                            onPageChange={handlePageChange}
                                        />
                                    ) : null}

                                </Fragment>

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
                                        <Dualtabcomponent
                                            tab1name="Details"
                                            tab2name="Attachments"
                                            tab1Html={
                                                <Fragment>
                                                    <Grid container spacing={0}>
                                                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >
                                                            <TableContainer>
                                                                <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                                                    <TableBody className="tableBody">
                                                                        <TableRow>
                                                                            <TableCell align="left" className="no-border-table">No.</TableCell>
                                                                            <TableCell align="right" className="no-border-table"> -</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell align="left" className="no-border-table">PO No.</TableCell>
                                                                            <TableCell align="right" className="no-border-table">-</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell align="left" className="no-border-table">PO Date.</TableCell>
                                                                            <TableCell align="right" className="no-border-table">-</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell align="left" className="no-border-table">Supplier Name</TableCell>
                                                                            <TableCell align="right" className="no-border-table">-</TableCell>
                                                                        </TableRow>
                                                                        <TableRow>
                                                                            <TableCell align="left" className="no-border-table">Type</TableCell>
                                                                            <TableCell align="right" className="no-border-table">-</TableCell>
                                                                        </TableRow>

                                                                    </TableBody>
                                                                </Table>
                                                            </TableContainer>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={0}>
                                                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                                                            <div style={{ height: 20 }}></div>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={0} style={{ marginLeft: 15 }}>
                                                        <Grid item xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                                                            <Grid container spacing={1} >
                                                                <Grid item xs={12} sm={12} md={3} lg={3}  >
                                                                    <div key="paymentPendingLink" to="#" className="card-link">
                                                                        <Card className="dash-activity-card2" raised={false}>
                                                                            <CardContent>
                                                                                <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                                                    Raised <br />MRN
                                                                                </Typography>
                                                                                <Typography >
                                                                                    870
                                                                                </Typography>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={3} lg={3}  >
                                                                    <div key="paymentPendingLink" to="#" className="card-link">
                                                                        <Card className="dash-activity-card2" raised={false}>
                                                                            <CardContent>
                                                                                <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                                                    Processed <br /> MRN
                                                                                </Typography>
                                                                                <Typography>
                                                                                    850
                                                                                </Typography>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                </Grid>
                                                                <Grid item xs={12} sm={12} md={3} lg={3}  >
                                                                    <div key="paymentPendingLink" to="#" className="card-link">
                                                                        <Card className="dash-activity-card2" raised={false}>
                                                                            <CardContent>
                                                                                <Typography color="textSecondary" style={{ fontSize: 12, color: '#fff' }} noWrap={false} gutterBottom>
                                                                                    Pending  <br />MRN
                                                                                </Typography>
                                                                                <Typography>
                                                                                    20
                                                                                </Typography>
                                                                            </CardContent>
                                                                        </Card>
                                                                    </div>
                                                                </Grid>
                                                            </Grid>
                                                        </Grid>
                                                    </Grid>
                                                    <Grid container spacing={0}>
                                                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                                                            <div style={{ height: 20 }}></div>
                                                        </Grid>
                                                    </Grid>
                                                </Fragment>
                                            }
                                            tab2Html={
                                                <Fragment>
                                                    <Grid container spacing={0}>
                                                        <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }} >

                                                            <Attachmentmaster
                                                                branchId={parseInt(this.state.BranchID)}
                                                                rowClicked={false}
                                                                category="mrn"
                                                                type="info"
                                                                filelist={[]}
                                                                companyId={1}
                                                                upload={true}
                                                                fileuploaded={false}
                                                                fileUploadonChange={null}
                                                            />
                                                        </Grid>
                                                    </Grid>
                                                </Fragment>
                                            }
                                        />
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
export default pi;

