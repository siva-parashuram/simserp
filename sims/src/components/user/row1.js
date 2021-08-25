import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'; 
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MenuIcon from '@material-ui/icons/Menu';

import Button from '@material-ui/core/Button';


import TestReport from "../reports/testReport";

class nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FullScreenDialog:false
        };
         
    
      }

    componentDidMount() {
        
        if (
            getCookie(COOKIE.USERID) != null
        ) {

        } else {
            this.props.history.push(URLS.URLS.LoginPage);

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
            },paper: {
                padding: theme.spacing(2),
                textAlign: 'center',
                color: theme.palette.text.secondary,
              },

        }));

      

         
        const processDialogOpen = () => {            
            this.setState({ FullScreenDialog: true })
          };

          const processDialogClose = () => {
            this.setState({ FullScreenDialog: false })
        };

        const showInvoice=()=>{
            console.log("hey...> ",URLS.URLS.testReport);
          //  this.props.history.push(URLS.URLS.testReport);
             window.open(URLS.URLS.testReport+"?id=101", "","width=900,height=500");
        }

          


        return (
            <div  className={useStyles.root}>

            <div style={{marginTop:70}}>
            <IconButton edge="start" className={useStyles.menuButton} color="inherit" aria-label="menu" onClick={processDialogOpen}>
                <MenuIcon />
            </IconButton>
            </div>

            <Grid container spacing={3}>
             <Grid item xs={7}></Grid>
            </Grid>
                
                <Grid container spacing={3}>
                <Grid item xs={7}>                 
                    <div style={{height:300}}>
                    <h4 className="row-1-grid-title">Insights from last month</h4>
                </div> 
                </Grid>
                <Grid item xs={5}>                
                    <div style={{height:300}}>
                      <h4  className="row-1-grid-title">Actions Links</h4>
                        <Button variant="contained" onClick={showInvoice} >Show Invoice</Button>
                       
                    </div> 
                   
                </Grid>
                </Grid>

                <div>                
                <Dialog fullScreen open={this.state.FullScreenDialog} onClose={processDialogClose} >
                  <AppBar className={useStyles.appBar} style={{ width: '100%', margin: 0, backgroundColor: '#00838f ' }}>  
                    <Toolbar>
                      <IconButton edge="start" color="inherit" onClick={processDialogClose} aria-label="close">
                        <CloseIcon />
                      </IconButton>
                      <Typography variant="h6" className={useStyles.title}>
                      Module Lists
                      </Typography>
                     
                    </Toolbar>
                  </AppBar>
                   <div>
                    <h4>
                     Hey.... coming soon
                    </h4>
                   </div>
                </Dialog>
              </div>


            </div>
        );
    }
}

export default nav;