import "./dasboard.css";
import React, { useState, useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
// import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Tabs, { tabsClasses } from '@mui/material/Tabs';

import { Link } from "react-router-dom";

import { COOKIE, getCookie } from "../../services/cookie";
import * as APIURLS from "../../routes/apiconstant";
import axios from "axios";

import Grid from "@material-ui/core/Grid";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import * as Customfunctions from "../../services/functions/customfunctions";
import Tableskeleton from "../compo/tableskeleton"; 

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
    "aria-controls": `scrollable-auto-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function ScrollableTabsButtonAuto() {
  const classes = useStyles();
  const [value, setValue] = React.useState(null);
  const [urlparams, seturlparams] = React.useState("");
  const [moduleList, setmoduleList] = React.useState([]);
  const [branchName, setbranchName] = React.useState("");
  const [MenuBarBranchId, setMenuBarBranchId] = React.useState(0);
  const [userPermissionLists, setuserPermissionLists] = React.useState([]);
  const [masterMenuData, setmasterMenuData] = React.useState([]);
  const [moduleHeader, setmoduleHeader] = React.useState([]);
  const [moduleLinks, setmoduleLinks] = React.useState([]);

  useEffect(() => {
    getUrlParams();
  }, []);

  const handleChange = (event, newValue) => {};

  const handleTabClick = (event, newValue) => {
    if (value === newValue) {
      setValue(null);
    } else {
      setValue(newValue);
    }
  };

  const handleTabClickNull = () => {
    setValue(null);
  };

  const getUrlParams = () => {
    var url = new URL(window.location.href);
    var branchId = url.searchParams.get("branchId");
    var branchName = url.searchParams.get("branchName");
    var compName = url.searchParams.get("compName");
    let urlparams =
      "?branchId=" +
      branchId +
      "&compName=" +
      compName +
      "&branchName=" +
      branchName;
    seturlparams(urlparams);
    setbranchName(branchName);
    setMenuBarBranchId(branchId);
    getModuleList(branchId);
  };

  const getModuleList = (branchId) => {
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
      "Content-Type": "application/json",
    };

    let data = {
      validUser: ValidUser,
      BranchId: parseInt(branchId),
      UserId: parseInt(getCookie(COOKIE.USERID)),
      userPermissionLists: userPermissionLists,
    };

    let URL = APIURLS.APIURL.GetUserPermissionByUserIDAndBranchID;

    axios
      .post(URL, data, { headers })
      .then((response) => {
        let D = response.data;

        if (response.status === 200) {
          setmasterMenuData(D);
          processData(D);
        }
      })
      .catch((error) => {});

    let moduleList = [
      {
        moduleName: "Admin",
        pages: [
          { pageName: "Company Master", pageLink: "companyMaster" },
          { pageName: "Country Master", pageLink: "countryMaster" },
          { pageName: "State Master", pageLink: "stateMaster" },
          { pageName: "User Master", pageLink: "userMaster" },
          { pageName: "Branch Master", pageLink: "branchMaster" },
          { pageName: "Module Master", pageLink: "moduleMaster" },
          { pageName: "Role Master", pageLink: "roleMaster" },
          { pageName: "Warehouse Master", pageLink: "warehouseMaster" },
        ],
      },
    ];
    // setmoduleList(moduleList);
  };

  const processData = (D) => {
    let data = D.userPermissionLists;

    let moduleHeader = [];
    for (let i = 0; i < data.length; i++) {
      if (data[i].isChecked === true) {
        let mh = {
          moduleID: data[i].moduleID,
          name: data[i].name,
          pages: [],
        };
        moduleHeader.push(mh);
      }
    }

    moduleHeader = Customfunctions.removeDuplicates(moduleHeader, "moduleID");

    for (let i = 0; i < data.length; i++) {
      let ml = {
        pageId: data[i].pageId,
        pageLink: data[i].pageLink,
        pageName: data[i].pageName,
        isCreate: data[i].isCreate,
        isDelete: data[i].isDelete,
        isPrint: data[i].isPrint,
        isUpdate: data[i].isUpdate,
        isView: data[i].isView,
      };
      for (let j = 0; j < moduleHeader.length; j++) {
        if (data[i].moduleID === moduleHeader[j].moduleID) {
          if (data[i].isChecked === true) {
            moduleHeader[j].pages.push(ml);
          }
        }
      }
    }

    moduleHeader.sort(function (a, b) {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    })
    setmoduleHeader(moduleHeader);
    setmoduleList(moduleHeader);
  };

  return moduleList.length > 0 ? (
    <div className={classes.root}>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={12} md={12} lg={12}>
          <div>
            <Tabs
             
              value={value}
              onChange={handleChange}
              indicatorColor="primary"
              textColor="primary"
              variant="scrollable"
              scrollButtons
              sx={{
                [`& .${tabsClasses.scrollButtons}`]: {
                  '&.Mui-disabled': { opacity: 0.3 },
                },
              }}
              allowScrollButtonsMobile              
              aria-label="Menu Bar Navigation"              
              className="menubar-tab-height"
            >
              <Fragment>
                  {moduleList.map((item, i) => (
                <Tab
                  
                  disableRipple={true}
                  className="menubar-tab-app-bar"
                  onClick={(e) => handleTabClick(e, i)}        
                  // onMouseOver={(e) => handleTabClick(e, i)} 
                  // onMouseEnter ={(e) => handleTabClick(e, i)}      
                      
                  label={item.name}
                  {...a11yProps(i)}
                  wrapped={true}
                />
              ))}
                </Fragment>
              
            </Tabs>
          </div>
          {moduleList.map((item, i) => (
            <TabPanel
              value={value}
              index={i}
              style={{ backgroundColor: "#eceff1" }}
              
            >
              <Grid container spacing={0}>
                {item.pages
                  ? item.pages.map((pages, j) => (
                      <Fragment>
                        <Link
                          key={"side-menu-LIL" + pages.pageId}
                          className="menubar-link"
                          to={pages.pageLink + urlparams}
                          // onClick={(e) => handleTabClickNull()} 
                        >
                          {pages.pageName}
                        </Link>
                      </Fragment>
                    ))
                  : null}
              </Grid>
            </TabPanel>
          ))}
        </Grid>
      </Grid>
    </div>
  ) : null;
}
