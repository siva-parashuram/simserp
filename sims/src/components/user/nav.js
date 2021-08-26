import './dasboard.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import MenuIcon from '@material-ui/icons/Menu';
import AppsIcon from '@material-ui/icons/Apps';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Typography from '@material-ui/core/Typography'; 
import { FormatUnderlined } from '@material-ui/icons';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';


import Modules from "./modules";

class nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            branchName: "",
            branchId:"",
            compName:""
        };
    }

    componentDidMount() {
        let token = getCookie(COOKIE.USERID);

        if (token == "null" || token == null) {
            this.setState({ isLoggedIn: false });           
            // document.write("Login Expired!");
        } else {
            //set cookie here
            let initialName = "A";
            let Name = "Admin";
           
            var url = new URL(window.location.href);
            let branchId=url.searchParams.get("branchId");
            let branchName=url.searchParams.get("branchName");
            let compName=url.searchParams.get("compName");
            this.setState({
                branchName: branchName,
                branchId:branchId,
                compName:compName
            });
        }


        


    }


    render() {

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
            }

        }));

           
        const processDialogOpen = () => {            
            this.setState({ FullScreenDialog: true })
          };

          const processDialogClose = () => {
            this.setState({ FullScreenDialog: false })
        };



        return (
            <div className={useStyles.root}>
                <AppBar className="navDiv" position="fixed" style={{ width: '100%', margin: 0, backgroundColor: '#0072bc' }}>
                    <Toolbar variant="dense">
                        
                        <Grid
                        justify="space-between" // Add it here :)
                        container 
                        spacing={24}
                        >

                        <Grid item>
                            <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu" 
                                onClick={processDialogOpen}>
                                <AppsIcon />  <span style={{marginLeft:20,letterSpacing:3,fontWeight:500,textDecorationLine: 'underline',textDecorationColor:'#39b54a'}}>{this.state.branchName} 
                                </span>                         
                            </IconButton>
                        </Grid>
                            <Grid item>  
                            { /*                                                      
                                <Button style={{marginTop:7}} color="inherit">Logout</Button>
                            */}
                               <IconButton  style={{marginRight:-20}} >
                               <Avatar  aria-label="recipe" style={{ backgroundColor: '#39b54a' }} >
                                 A
                               </Avatar> 
                               </IconButton>
                                
                            </Grid>
                            
                        </Grid>
                        
                        
                    </Toolbar> 
                </AppBar>

                

                <Dialog fullScreen open={this.state.FullScreenDialog} onClose={processDialogClose} >
                  <AppBar className={useStyles.appBar} style={{ width: '100%', margin: 0, backgroundColor: '#00838f ' }}>  
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={processDialogClose} aria-label="close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className={useStyles.title}>
                        Modules
                      </Typography>
                     
                    </Toolbar>
                  </AppBar>
                   <div style={{marginTop:50,marginLeft:50}}>
                     <Modules/>
                   </div>
                </Dialog>




            </div>
        );
    }
}

export default nav;