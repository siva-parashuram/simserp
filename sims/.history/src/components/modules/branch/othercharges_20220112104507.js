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
import SuccessSnackBar from "../../compo/successSnackbar";
import ErrorSnackBar from "../../compo/errorSnackbar";
import MasterDataGrid from "../../compo/masterdatagrid";
import Tableskeleton from "../../compo/tableskeleton";
import SIB from "../../compo/gridtextboxinput";
import SSIB from "../../compo/gridswitchinput";

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

export default function Othercharges({ BranchID }) {


    const [ProgressLoader, setProgressLoader] = React.useState(false);

    const [SuccessPrompt, setSuccessPrompt] = React.useState(false);
    const [ErrorPrompt, setErrorPrompt] = React.useState(false);
    const [ErrorMessageProps, setErrorMessageProps] = React.useState("");
    const [selectionModel, setselectionModel] = React.useState(0);
    const [columns, setcolumns] = React.useState(APIURLS.branchOtherChargesColumn);
    const [pagination, setpagination] = React.useState(PG);
    const [ChargesList, setChargesList] = React.useState([]);


    const [ChargeID, setChargeID] = React.useState(0);
    const [BID, setBID] = React.useState(0);
    const [Type, setType] = React.useState(0);
    const [Code, setCode] = React.useState("");
    const [CAcID, setCAcID] = React.useState(0);
    const [DebitOrCredit, setDebitOrCredit] = React.useState(false);
    const [IsActive, setIsActive] = React.useState(false);
    const [Description, setDescription] = React.useState("");



    useEffect(() => {
        getChargesDetailList();

    }, []);

    const getChargesDetailList = () => {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };
        let Url = APIURLS.APIURL.GetBranchOtherChargesByBranchID;

        let Data = {
            ValidUser: ValidUser,
            BranchID: BranchID
        };
        axios
            .post(Url, Data, { headers })
            .then((response) => {
                console.log("response > ",response);
                if (response.status === 200) {
                    setChargesList(response.data);
                    setProgressLoader(true);
                } else {
                    setErrorPrompt(true);
                    setProgressLoader(true);
                }

            }).catch((error) => {
                setErrorPrompt(true);
                setProgressLoader(true);
            });
    }
    const handleRowClick = (e) => {
        console.log("----------handleRowClick--------> ");
        try {
            let index = e[0];
            let item = ChargesList[index - 1];
            console.log("handleRowClick > item > ", item);
            if (item) {
                setChargeID(item.ChargeID);
                setDescription(item.Description);
                setselectionModel(index);
            }


        } catch (e) {
            console.log("handleRowClick > error > ", e);
        }
    }

    const handleCreate = () => {
        setChargeID(0);
        setBID(BranchID);
        setDescription("");
        setselectionModel(0);
    }

    const handlePageChange = (event, newPage) => {
        let pagination = this.state.pagination;
        pagination.page = newPage;
        this.setState({ pagination: pagination });
    };

    const CHKisProperData=()=>{
        let isProperData=false;


        return isProperData;
    }

    const handleSave = () => {
        console.log("---------------HEYYYYYYYY----------"); 
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json",
        };

        let BLD = {
            
            BranchID: parseInt(BranchID),
            Description: Description,
        };
        console.log("BLD > ",BLD);

        let Url = "";
        let Data = {};

        let isProperData=false;
        isProperData=CHKisProperData();

        if (isProperData === true) {

            if (parseInt(ChargeID) === 0) {
                Data = {
                    ValidUser: ValidUser,
                    BranchLicenseDetail: BLD
                };
                Url = APIURLS.APIURL.CreateBranchLicenseDetail;
                axios
                    .post(Url, Data, { headers })
                    .then((response) => {
                        if (response.status === 200 || response.status === 201) {
                            getChargesDetailList();
                            setSuccessPrompt(true);
                            setProgressLoader(true);
                        } else {
                            setErrorPrompt(true);
                            setProgressLoader(true);
                        }
                    }).catch((error) => {
                        setErrorPrompt(true);
                        setProgressLoader(true);
                    });

            } else {
                Data = {
                    ValidUser: ValidUser,
                    BranchLicenseDetail: BLD
                };
                Url = APIURLS.APIURL.UpdateBranchLicenseDetail;
                axios
                    .post(Url, Data, { headers })
                    .then((response) => {
                        if (response.status === 200 || response.status === 201) {
                            getChargesDetailList();
                            setSuccessPrompt(true);
                            setProgressLoader(true);
                        } else {
                            setErrorPrompt(true);
                            setProgressLoader(true);
                        }
                    }).catch((error) => {
                        setErrorPrompt(true);
                        setProgressLoader(true);
                    });
            }
        } else {
            setErrorPrompt(true);
            setErrorMessageProps("Improper Data");
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
            <SuccessSnackBar
                SuccessPrompt={SuccessPrompt}
                closeSuccessPrompt={(e) => setSuccessPrompt(false)}
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
                                    onClick={(e) => handleCreate()}
                                // disabled={this.state.disabledCreatebtn}
                                >
                                    {APIURLS.buttonTitle.add.name}
                                </Button>


                            </ButtonGroup>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={12} lg={12}>
                            {ChargesList.length > 0 ? (
                                <Fragment>
                                    <MasterDataGrid
                                        selectionModel={selectionModel}
                                        rows={ChargesList}
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
                                            onClick={(e) => handleSave(e)}
                                            // onClick={(e) => alert("Hiii")}

                                        >
                                            {APIURLS.buttonTitle.save.name}
                                        </Button>
                                    </ButtonGroup>
                                </Grid>
                            </Grid>
                            <br />
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={12} lg={12}>
                                   

                                    <SIB
                                        id="Code"
                                        label="Code"
                                        variant="outlined"
                                        size="small"
                                        value={Code}
                                        // isMandatory={true}
                                        onChange={(e) => setCode(e.target.value)}
                                    />
                                    
                                    <SIB
                                        multiline={true}
                                        rows={4}
                                        id="Description"
                                        label="Description"
                                        variant="outlined"
                                        size="small"
                                        value={Description}
                                        isMandatory={true}
                                        onChange={(e) => setDescription(e.target.value)}
                                    />

<br/><br/><br/><br/><br/><br/>
                                    <SSIB
                                        key="IsActive"
                                        id="IsActive"
                                        label="Active?"
                                        param={IsActive}
                                        onChange={(e) => setIsActive(e.target.value)}
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