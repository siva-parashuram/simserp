import React, { Fragment } from 'react';
import "./dasboard.css";
import * as Customfunctions from "../../services/functions/customfunctions";
import { COOKIE, getCookie } from "../../services/cookie";
import * as APIURLS from "../../routes/apiconstant";
import { Link } from "react-router-dom";

import Grid from "@material-ui/core/Grid";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@material-ui/core/Button";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import axios from "axios";
import { Divider } from '@material-ui/core';


const drawerWidth = 240;

class menusection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
            branchName: "",
            branchId: "",
            masterMenuData: [],
            moduleHeader: [],
            moduleLinks: [],
            userPermissionLists: [],
            DrawerAnchor: false,
            pages: [],
            selectedModuleName: null,

        }
    }
    componentDidMount() {
        this.getUrlParams();
    }


    getUrlParams = () => {
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
        this.setState({
            urlparams: urlparams,
            branchName: branchName,
            branchId: branchId
        });
        this.getModuleList(branchId);
    };

    getModuleList = (branchId) => {
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
            userPermissionLists: [],
        };

        let URL = APIURLS.APIURL.GetUserPermissionByUserIDAndBranchID;

        axios
            .post(URL, data, { headers })
            .then((response) => {
                let D = response.data;

                if (response.status === 200) {
                    this.setState({ masterMenuData: D });
                    this.processData(D);
                }
            })
            .catch((error) => { });
    };


    processData = (D) => {
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

        this.setState({
            moduleHeader: moduleHeader,
            moduleLinks: moduleHeader
        });


    };


    render() {

        const toggleDrawer = (item) => {
            console.log("toggleDrawer > item > ", item);
            this.setState({ pages: item.pages, selectedModuleName: item.name });
            let DrawerAnchor = this.state.DrawerAnchor;
            if (DrawerAnchor === null) {
                this.setState({ DrawerAnchor: true });
            } else {
                DrawerAnchor === true ? this.setState({ DrawerAnchor: false }) : this.setState({ DrawerAnchor: true });
            }

        }

        const closeDrawer = () => {
            let DrawerAnchor = this.state.DrawerAnchor;
            DrawerAnchor === true ? this.setState({ DrawerAnchor: false }) : this.setState({ DrawerAnchor: true });
        }

        const openPage = (url) => {
            this.setState({ DrawerAnchor: false }, (e) => {
                window.location = url;
            });

        }

        const menuList = (
            <Fragment>
               
                <List dense={true} style={{ backgroundColor: "#eceff1" }}>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={2} lg={2}>
                            <IconButton aria-label="delete"  style={{ textAlign: 'left', marginTop: 8 }}>
                                <ArrowBackIcon onClick={(e) => closeDrawer(e)} /> 
                            </IconButton>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={10} lg={10}>
                            <div style={{ height: 50 }}>
                                <div style={{ textAlign: 'left', marginTop: 10 }}>
                                    <h3>{this.state.selectedModuleName}</h3>
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                           
                            {this.state.pages.map((pages, j) => (
                        <Fragment>
                            <ListItem>                               
                            <span
                                key={"side-menu-LIL" + pages.pageId}
                                className="menubar-link"
                                onClick={(e) => openPage(pages.pageLink + this.state.urlparams)}
                            >
                                {pages.pageName}
                            </span>
                            </ListItem>
                            <Divider />
                        </Fragment>
                    ))}
                        </Grid>
                    </Grid>
                   
                </List>
            </Fragment>
        );


        return (
            <Fragment>
                <div style={{ marginLeft: 13, marginTop: 8 }}>
                    <Grid container spacing={1}>
                        <Grid xs={12} sm={12} md={1} lg={1} >
                            <div className="menusection-div1">
                                <div style={{ marginTop: 8 }}>
                                    <span style={{ marginRight: 10 }}>
                                        <b>{getCookie(COOKIE.FIRSTNAME)} </b>
                                    </span>
                                </div>
                            </div>
                        </Grid>
                        <Grid xs={12} sm={12} md={9} lg={9}>
                            <div style={{ marginTop: 8, marginLeft: 10 }}>
                                <ButtonGroup
                                    size="small"
                                    variant="text"
                                    aria-label="Action Menu Button group"
                                >
                                   

                                    {this.state.moduleHeader.map((item, i) => (
                                        <Fragment>
                                            <Button
                                                disableFocusRipple={true}
                                                disableRipple={true}
                                                disableElevation={true}
                                                size="medium"
                                                className="menusection-action-btns"
                                                // endIcon={<KeyboardArrowDownIcon />}
                                                onClick={(e) => toggleDrawer(item)}
                                            >
                                                {item.name}
                                            </Button>

                                        </Fragment>

                                    ))}

                                </ButtonGroup>




                            </div>
                        </Grid>
                    </Grid>
                </div>

                <Drawer
                    open={this.state.DrawerAnchor}
                    onClose={(e) => closeDrawer(e)}
                    sx={{

                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
                    }}

                >
                    {menuList}
                    
                </Drawer>

            </Fragment>
        )
    }

}
export default menusection;

