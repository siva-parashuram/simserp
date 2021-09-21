import './dasboard.css';
import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

import { Link } from "react-router-dom";

import { COOKIE, getCookie } from "../../services/cookie";
import * as APIURLS from "../../routes/apiconstant";
import axios from "axios";

import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`scrollable-auto-tabpanel-${index}`}
            aria-labelledby={`scrollable-auto-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `scrollable-auto-tab-${index}`,
        'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
        width: '100%',
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function ScrollableTabsButtonAuto() {
    const classes = useStyles();
    const [value, setValue] = React.useState(null);
    const [urlparams, seturlparams] = React.useState("");
    const [moduleList, setmoduleList] = React.useState([]);
    const [branchName, setbranchName] = React.useState("");


    useEffect(() => {
        getModuleList();
        getUrlParams();
        console.log('On Load Event of UseEffect !');
    }, []);

    const handleChange = (event, newValue) => {
        // console.log("event > ",event);
        // console.log("even.target > ",event.target);
        // console.log("newValue > ",newValue);
        // console.log("value > ",value);
        // if(value===newValue){
        //     setValue(newValue);
        // }else{
        //     setValue(null);
        // }

    };

    const handleTabClick = (event, newValue) => {
        if (value === newValue) {
            setValue(null);
        } else {
            setValue(newValue);
        }
    };

    const getUrlParams = () => {
        var url = new URL(window.location.href);
        var branchId = url.searchParams.get("branchId");
        var branchName = url.searchParams.get("branchName");
        var compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        seturlparams(urlparams);
        setbranchName(branchName);
    }

    const getModuleList = () => { 

        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };

        let moduleList = [
            {
                moduleName: "Home",
                subMenus: [
                    { name: "Dashboard", link: "userDashboard" },
                    
                   
                ]
            },
            {
                moduleName: "Admin",
                subMenus: [
                    { name: "Company Master", link: "companyMaster" },
                    { name: "Country Master", link: "countryMaster" },
                    { name: "State Master", link: "stateMaster" },
                    { name: "User Master", link: "userMaster" },
                    { name: "Branch Master", link: "branchMaster" },
                    { name: "Module Master", link: "moduleMaster" },
                    

                ]
            }
        ]
        setmoduleList(moduleList);



    }


    return (
        <div className={classes.root}>
            <Grid container spacing={1}>
                 
                <Grid item xs={12} sm={12} md={12} lg={12}>
                    <div >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="Menu Bar Navigation"
                            
                        >
                            {
                                moduleList.map((item, i) => (
                                    <Tab
                                    disableRipple={true}
                                    className="menubar-tab-app-bar" 
                                    onClick={(e) => handleTabClick(e, i)} 
                                     icon={<ExpandMoreIcon className="menubar-tab-icon-position" />} 
                                    label={item.moduleName}  
                                    {...a11yProps(i)} />
                                ))
                            }

                        </Tabs>
                    </div>
                    {
                        moduleList.map((item, i) => (
                            <TabPanel value={value} index={i} style={{ backgroundColor: '#eceff1' }}>
                                <Grid container spacing={0}>
                                    {
                                        item.subMenus.map((subMenusitem, j) => (
                                            <Fragment>
                                                <div>
                                                    <Link key={"side-menu-LIL" + j} className="menubar-link" to={subMenusitem.link + urlparams}>
                                                        {subMenusitem.name}
                                                    </Link>
                                                </div>
                                                <div style={{ width: 30 }}></div>
                                            </Fragment>

                                        ))
                                    }
                                </Grid>
                            </TabPanel>

                        ))
                    }
                </Grid>
            </Grid>


        </div>
    );
}
