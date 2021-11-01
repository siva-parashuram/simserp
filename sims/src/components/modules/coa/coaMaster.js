import '../../user/dasboard.css';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

import axios from "axios";
import React, { Fragment } from 'react';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import Grid from '@material-ui/core/Grid';
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";

import Loader from "../../compo/loader";
import Breadcrumb from "../../compo/breadcrumb";
import Tableskeleton from "../../compo/tableskeleton";

class coaMaster extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            ProgressLoader: false,
            editBtnDisable: true,
            initialCss: "",
            urlparams: "",
            editurl: "",
            COAList: []
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
        this.setState({ urlparams: urlparams });
        this.getCOAList();
    }

    getCOAList() {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);

        let Url = APIURLS.APIURL.GetChartOfAccounts;
        const headers = {
            "Content-Type": "application/json",
        };
        axios
            .post(Url, ValidUser, { headers })
            .then((response) => {
                let data = response.data;
                console.log("data > ", data);
                 this.setState({COAList:data});
                this.setState({ ProgressLoader: true });
            })
            .catch((error) => { });

    }

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
                                    typoTitle="Chart Of Accounts"
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
                                            openPage(URLS.URLS.addCoa + this.state.urlparams + "&type=add")
                                        }
                                    >
                                        NEW
                                    </Button>
                                    <Button className="action-btns"
                                        startIcon={<EditIcon />}
                                        onClick={(e) =>
                                            openPage(URLS.URLS.editCoa + this.state.urlparams + "&type=edit")
                                        }
                                    // disabled={this.state.editBtnDisable}
                                    >
                                        Edit
                                    </Button>
                                </ButtonGroup>
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className="breadcrumb-bottom"></div>
                <Grid className="table-adjust" container spacing={0}>
                    <Grid xs={12} sm={12} md={8} lg={8}>
                        <Grid container spacing={0}>
                            <Grid xs={12} sm={12} md={10} lg={10}>
                                <Table stickyHeader size="small" className="" aria-label="table">
                                    <TableHead className="table-header-background">
                                        <TableRow>
                                            <TableCell className="table-header-font">#</TableCell>
                                            <TableCell className="table-header-font" align="left">AcNo</TableCell>
                                            <TableCell className="table-header-font" align="left">Name</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="tableBody">
                                        {this.state.COAList.map((item, i) => (
                                            <TableRow>                                                 
                                                <TableCell align="left">{i+1} </TableCell>
                                                <TableCell align="left">{item.ACNo}  </TableCell>
                                                <TableCell align="left">{item.Name} </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>

            </Fragment>
        )
    }

}

export default coaMaster;