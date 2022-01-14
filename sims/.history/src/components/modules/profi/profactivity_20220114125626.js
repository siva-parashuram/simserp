import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
import axios from "axios";
import "../../user/dasboard.css";
import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";

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

let history = useHistory();

export default function License({ }) {
    const [ProgressLoader, setProgressLoader] = React.useState(false);
    const [SuccessPrompt, setSuccessPrompt] = React.useState(false);
    const [ErrorPrompt, setErrorPrompt] = React.useState(false);
    const [ErrorMessageProps, setErrorMessageProps] = React.useState("");

    const [typoTitle, settypoTitle] = React.useState("");
    

    useEffect(() => {

    }, []);


    const breadcrumbHtml = (
        <Fragment>
            <Breadcrumb
                backOnClick={this.props.history.goBack}
                linkHref={URLS.URLS.userDashboard + this.state.urlparams}
                linkTitle="Dashboard"
                masterHref={URLS.URLS.proformaMaster + this.state.urlparams}
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

        </Fragment>
    )
}