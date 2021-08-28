import './dasboard.css';
import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { COOKIE, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


class modules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            urlparams: "",
        };
    }

    componentDidMount() {
        if (
            getCookie(COOKIE.USERID) != null
        ) {
            this.setState({ isLoggedIn: true });
            var url = new URL(window.location.href);
            var branchId = url.searchParams.get("branchId");
            var branchName = url.searchParams.get("branchName");
            var compName = url.searchParams.get("compName");
            let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
            this.setState({
                branchName: branchName,
                branchId: branchId,
                compName: compName,
                urlparams: urlparams,
            });             
        } else {
            this.setState({ isLoggedIn: false });
        }
    }
    render() {


        return (
            <Fragment >
                <Fragment>
                    <Accordion className="menu-accordion">
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon style={{ color: '#616161' }} />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography style={{ color: '#616161' }}>Admin</Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ color: '#616161' }}>
                            <List component="nav" aria-label="" style={{ width: '100%' }}>
                                <ListItem button>
                                    <Link className="LINK" to={URLS.URLS.companyMaster + this.state.urlparams}>
                                        <ArrowForwardIosIcon style={{ fontSize: 15 }} /> Company Master
                                    </Link>
                                </ListItem>
                                <ListItem button>
                                    <ArrowForwardIosIcon style={{ fontSize: 15 }} /> Sub Menu 2
                                </ListItem>
                            </List>
                        </AccordionDetails>
                    </Accordion>
                </Fragment>
            </Fragment>
        );
    }
}

export default modules;