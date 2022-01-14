import React, { Fragment, useEffect, useMemo } from "react";
import moment from "moment";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";

import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";

import BackdropLoader from "../../compo/backdrop";
import ErrorSnackBar from "../../compo/errorSnackbar";
import MasterDataGrid from "../../compo/masterdatagrid";
import Tableskeleton from "../../compo/tableskeleton";
import SIB from "../../compo/gridtextboxinput";
import SDTI from "../../compo/griddateinput";

let PG = {
    page: 0,
    rowsPerPage: 10,
};

let BLD = {
    ID: 0,
    BranchID: 0,
    StartDate: "",
    EndDate: "",
    BondNo: "",
    LicenseNo: "",
    Description: ""
   
};

export default function License({ BranchID }) {

    
    const [ProgressLoader, setProgressLoader] = React.useState(false);
    const [ErrorPrompt, setErrorPrompt] = React.useState(false);
    const [ErrorMessageProps, setErrorMessageProps] = React.useState("");
    const [selectionModel, setselectionModel] = React.useState(1);
    const [columns, setcolumns] = React.useState(APIURLS.branchMasterColumn);
    const [pagination, setpagination] = React.useState(PG);
    const [LicenseList, setLicenseList] = React.useState([]);

    
    const [ID, setID] = React.useState(0);
    const [StartDate, setStartDate] = React.useState("");
    const [EndDate, setEndDate] = React.useState("");
    const [BondNo, setBondNo] = React.useState("");
    const [LicenseNo, setLicenseNo] = React.useState("");
    const [Description, setDescription] = React.useState("");



    useEffect(() => {
        getLicenseDetailList();
    }, []);

    const getLicenseDetailList = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetBranchLicenseDetails;
        let BLDobj=BLD;
        BLDobj.BranchID=BranchID;

        let Data = {
            ValidUser: ValidUser,
            BranchLicenseDetail: BLD
        };
        axios
            .post(Url, Data, { headers })
            .then((response) => {

            }).catch((error) => {
                setErrorPrompt(true);
                setProgressLoader(true);
            });
    }


    const handleRowClick = (e) => {
        try {
            let index = e[0];
            let item = this.state.branchData[index - 1];
            this.setState({
                item: item,
                selectionModel: index
            });
        } catch (e) { }
    }


    const handlePageChange = (event, newPage) => {
        let pagination = this.state.pagination;
        pagination.page = newPage;
        this.setState({ pagination: pagination });
    };



    const handleSave = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
          };

        let BLD = {
            ID: parseInt(ID),
            BranchID: parseInt(BranchID),
            StartDate: moment(StartDate).format("MM/DD/YYYY"),
            EndDate: moment(EndDate).format("MM/DD/YYYY"),
            BondNo: BondNo,
            LicenseNo: LicenseNo,
            Description: Description,
        };

        let Url ="";
        let Data={};

        if (parseInt(ID) > 0) {
            Data = {
                ValidUser: ValidUser,
                BranchLicenseDetail: BLD
            };
            Url = APIURLS.APIURL.CreateBranchLicenseDetail;
            axios
                .post(Url, Data, { headers })
                .then((response) => {
                    if (response.status === 200 || response.status === 201) {

                    } else {
                        setErrorPrompt(true);
                        setProgressLoader(true);
                    }
                }).catch((error) => {
                    setErrorPrompt(true);
                    setProgressLoader(true);
                });

        } else {
            // update
        }
    }


    return (
        <Fragment>
            <BackdropLoader open={!ProgressLoader} />
            <ErrorSnackBar
                ErrorPrompt={ErrorPrompt}
                closeErrorPrompt={() => setErrorPrompt(false)}
                ErrorMessageProps={ErrorMessageProps}
            />

            <Grid container spacing={0}>
                <Grid item xs={12} sm={12} md={8} lg={8}>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                            <ButtonGroup
                                size="small"
                                variant="text"
                                aria-label="Action Menu Button group"
                            >

                                <Button
                                    startIcon={APIURLS.buttonTitle.add.icon}
                                    className="action-btns"
                                // onClick={handleCreate}
                                // disabled={this.state.disabledCreatebtn}
                                >
                                    {APIURLS.buttonTitle.add.name}
                                </Button>


                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                            {LicenseList.length > 0 ? (
                                <Fragment>
                                    <MasterDataGrid
                                        selectionModel={selectionModel}
                                        rows={LicenseList}
                                        columns={columns}
                                        pagination={pagination}
                                        onSelectionModelChange={(e) => handleRowClick(e)}
                                        onPageChange={handlePageChange}
                                    />
                                </Fragment>
                            ) : (
                                <Tableskeleton />
                            )}
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={4} lg={4}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={1} lg={1}> </Grid>
                        <Grid item xs={12} sm={12} md={11} lg={11}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={12} lg={12}>
                                    <ButtonGroup
                                        size="small"
                                        variant="text"
                                        aria-label="Action Menu Button group"
                                    >
                                        <Button
                                            startIcon={APIURLS.buttonTitle.save.icon}
                                            className="action-btns"
                                            onClick={() => handleSave()}

                                        >
                                            {APIURLS.buttonTitle.save.name}
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={12} lg={12}>
                                    <SDTI
                                        isMandatory={true}
                                        id="StartDate"
                                        label="Start Date"
                                        variant="outlined"
                                        size="small"
                                        value={StartDate}
                                        onChange={(e) => setStartDate(e.target.value)}
                                    />

                                    <SDTI
                                        isMandatory={true}
                                        id="EndDate"
                                        label="End Date"
                                        variant="outlined"
                                        size="small"
                                        value={EndDate}
                                        onChange={(e) => setEndDate(e.target.value)}
                                    />

                                    <SIB
                                        id="BondNo"
                                        label="Bond No."
                                        variant="outlined"
                                        size="small"
                                        value={BondNo}
                                        isMandatory={true}
                                        onChange={(e) => setBondNo(e.target.value)}
                                    />
                                    <SIB
                                        id="LicenseNo"
                                        label="License No."
                                        variant="outlined"
                                        size="small"
                                        value={LicenseNo}
                                        isMandatory={true}
                                        onChange={(e) => setLicenseNo(e.target.value)}
                                    />
                                    <SIB
                                        id="Description"
                                        label="Description"
                                        variant="outlined"
                                        size="small"
                                        value={Description}
                                        isMandatory={true}
                                        onChange={(e) => setDescription(e.target.value)}
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