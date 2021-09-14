import './dasboard.css';
import React from 'react';
import { COOKIE,  getCookie } from "../../services/cookie";


import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


import Modules from "./modules";

class nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userInitial:"",
            branchName: "",
            branchId: "",
            compName: "",
            anchorEl: null,
            open: false
        };
    }

    componentDidMount() {
        let token = getCookie(COOKIE.USERID);
        let FIRSTNAME = getCookie(COOKIE.FIRSTNAME);

        let initialName = FIRSTNAME.charAt(0).toUpperCase();
            var url = new URL(window.location.href);
            let branchId = url.searchParams.get("branchId");
            let branchName = url.searchParams.get("branchName");
            let compName = url.searchParams.get("compName");
            console.log("===========================================");
            console.log("branchId > ",branchId);
            console.log("branchName > ",branchName);
            console.log("compName > ",compName);
            console.log("===========================================");
        
        if (token === "null" || token == null || compName==="" || compName==null || branchName==="" || branchName==null|| branchId==="" || branchId==null) {
            this.setState({ isLoggedIn: false });             
        } else {   


            this.setState({
                branchName: branchName,
                branchId: branchId,
                compName: compName,
                userInitial:initialName,
            });          
        }
    }

    render() {
        const drawerWidth = 240;
        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
            IconsAlign: {
                justifyContent: "flex-end",
                alignItems: "flex-end"
            },
            appBar: {
                width: `calc(100% - ${drawerWidth}px)`,
                marginLeft: drawerWidth,
            }

        }));

        const processDialogClose = () => {
            this.setState({ FullScreenDialog: false })
        };

        const menuClick = event => {
            try {
                this.state.anchorEl
                    ? this.setState({ anchorEl: null })
                    : this.setState({ anchorEl: event.currentTarget });
            } catch (err) {
                console.log("Error > ", err);
            }
        };

        const menuClose = event => {
            this.setState({ anchorEl: null });
        };
        

        const closeWindow = e => {
            window.close();
        }

        return (
            <div className="">
                <AppBar className="navDiv" position="fixed">
                    <Toolbar variant="dense">
                        <Grid
                            justifyContent="space-between"  
                            container
                            spacing={10}
                        >
                            <Grid item>
                                <div className="comName-nav">
                                    <span>{this.state.branchName}</span>
                                </div>                               
                            </Grid>
                            <Grid item>
                                <Avatar 
                                aria-label="recipe" 
                                style={{ backgroundColor: '#39b54a',height:30,width:30 }} 
                                className="nav-avatar-pointer" 
                                aria-haspopup="true" 
                                aria-controls="logout-menu" 
                                onClick={menuClick} 
                                >
                                     {this.state.userInitial}
                                </Avatar>                                
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>
                <Menu
                    className="nav-avatar-menu"
                    key="u-l-m"
                    id="logout-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={menuClose}
                    PaperProps={{
                        style: {
                            width: '15ch',
                            marginLeft: 0,
                            marginTop: 20
                        },
                    }}
                >
                    <MenuItem className="nav-avatar-menu-item" key="windowClose" onClick={closeWindow}>Exit</MenuItem>
                </Menu>
                <Dialog fullScreen open={this.state.FullScreenDialog} onClose={processDialogClose} >
                    <AppBar className={useStyles.appBar} style={{ width: '100%', margin: 0, }}>
                        <Toolbar>
                            <IconButton edge="start" color="inherit" onClick={processDialogClose} aria-label="close">
                                <CloseIcon />
                            </IconButton>
                            <Typography variant="h6" className={useStyles.title}>
                                Modules
                            </Typography>

                        </Toolbar>
                    </AppBar>
                    <div style={{ marginTop: 50, marginLeft: 50 }}>
                        <Modules />
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default nav;