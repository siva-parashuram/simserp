import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import * as CF from "../../../services/functions/customfunctions";

import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";

import BackdropLoader from "../../compo/backdrop";
import SuccessSnackBar from "../../compo/successSnackbar";
import ErrorSnackBar from "../../compo/errorSnackbar";
import TopFixedRow3 from "../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../compo/breadcrumb";

import SIB from "../../compo/gridtextboxinput";
import SDTI from "../../compo/griddateinput";
import SDIB from "../../compo/griddropdowninput";



export default function License({ }) {
    let history = useHistory();
    const [ProgressLoader, setProgressLoader] = React.useState(false);
    const [SuccessPrompt, setSuccessPrompt] = React.useState(false);
    const [ErrorPrompt, setErrorPrompt] = React.useState(false);
    const [ErrorMessageProps, setErrorMessageProps] = React.useState("");

    const [typoTitle, settypoTitle] = React.useState("");
    const [urlparams, seturlparams] = React.useState("");
    
    

    useEffect(() => {
        let params = CF.GET_URL_PARAMS();
        var url = new URL(window.location.href);
        const type = url.searchParams.get("type");
        let branchId = url.searchParams.get("branchId");
        if (type === "add") {
            settypoTitle("Add");
            setProgressLoader(true);
        } else {
            settypoTitle("Edit");
        }


    }, []);


    const breadcrumbHtml = (
        <Fragment>
            <Breadcrumb
                backOnClick={history.goBack}
                linkHref={URLS.URLS.userDashboard + urlparams}
                linkTitle="Dashboard"
                masterHref={URLS.URLS.proformaMaster + urlparams}
                masterLinkTitle="Purchase Invoice"
                typoTitle={typoTitle}
                level={2}
            />
        </Fragment>
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
            <BackdropLoader open={!ProgressLoader} />
            <ErrorSnackBar
                ErrorPrompt={ErrorPrompt}
                closeErrorPrompt={closeErrorPrompt}
                ErrorMessageProps={ErrorMessageProps}
            />
            <SuccessSnackBar
                SuccessPrompt={SuccessPrompt}
                closeSuccessPrompt={closeSuccessPrompt}
            />

            <TopFixedRow3
                breadcrumb={breadcrumbHtml}
                buttongroup={null}
            />

            <Grid container spacing={0} >
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <Grid className="table-adjust" container spacing={0}>
                        <Grid item xs={12} sm={12} md={8} lg={8}>

                        </Grid>
                        <Grid item xs={12} sm={12} md={4} lg={4}>

                        </Grid>
                    </Grid>
                </Grid>
            </Grid>

        </Fragment>
    )
}