import './dasboard.css';
import React from 'react'; 
import { COOKIE, deleteCookie, getCookie } from "../../services/cookie";
 

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
            branchName: "",
            branchId: "",
            compName: "",
            anchorEl: null,
            open: false
        };
    }

    componentDidMount() {
        let token = getCookie(COOKIE.USERID);

        if (token === "null" || token == null) {
            this.setState({ isLoggedIn: false });
            // document.write("Login Expired!");
        } else {
            //set cookie here
            let initialName = "A";
            let Name = "Admin";

            var url = new URL(window.location.href);
            let branchId = url.searchParams.get("branchId");
            let branchName = url.searchParams.get("branchName");
            let compName = url.searchParams.get("compName");
            this.setState({
                branchName: branchName,
                branchId: branchId,
                compName: compName
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


        const processDialogOpen = () => {
            this.setState({ FullScreenDialog: true })
        };

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

        const logoutUser = (e) => {
            deleteCookie(COOKIE.USERID, null);
            this.setState({ anchorEl: null, isLoggedIn: false })
            // this.props.history.push(URLS.URLS.LoginPage);
            window.location.reload();
        }

        const closeWindow = e => {
            window.close();
        }



        return (
            <div className="navDiv">
                <AppBar className="navDiv" position="fixed">
                    <Toolbar variant="dense">
                        <Grid
                            justify="space-between" // Add it here :)
                            container
                            spacing={24}
                        >
                            <Grid item>
                            {/*
                                <Typography variant="h6" style={{marginTop:11}}>
                                    <span style={{
                                        marginLeft: 240, letterSpacing: 3,
                                        fontWeight: 500, textDecorationLine: 'underline',
                                        textDecorationColor: '#39b54a'
                                    }}> {this.state.branchName}</span>
                                </Typography>
                                */}
                            </Grid>
                            <Grid item>
                                { /*                                                      
                                <Button style={{marginTop:7}} color="inherit">Logout</Button>
                            */}
                                <IconButton key="action-btn" aria-label="settings" aria-controls="logout-menu" aria-haspopup="true" onClick={menuClick} style={{ marginRight: -20 }} >
                                    <Avatar aria-label="recipe" style={{ backgroundColor: '#39b54a' }} >
                                        A
                                    </Avatar>
                                </IconButton>
                            </Grid>
                        </Grid>
                    </Toolbar>
                </AppBar>

                <Menu
                    key="u-l-m"
                    id="logout-menu"
                    anchorEl={this.state.anchorEl}
                    keepMounted
                    open={Boolean(this.state.anchorEl)}
                    onClose={menuClose}
                    PaperProps={{
                        style: {
                            width: '15ch',
                            marginLeft: 5,
                            marginTop: 40
                        },
                    }}
                >
                    <MenuItem key="windowClose" onClick={closeWindow}>
                        Exit

                    </MenuItem>
                    {/*
                    <MenuItem key="logout" onClick={logoutUser} >
                      <span style={{textAlign:'right',alignItems:'right'}}>Log out</span>
                    </MenuItem>
                    */}
                </Menu>



                <Dialog fullScreen open={this.state.FullScreenDialog} onClose={processDialogClose} >
                    <AppBar className={useStyles.appBar} style={{ width: '100%', margin: 0,  }}>
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