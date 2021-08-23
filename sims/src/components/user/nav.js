import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography'; 
import IconButton from '@material-ui/core/IconButton'; 
import Avatar from '@material-ui/core/Avatar';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import Dialog from '@material-ui/core/Dialog';
import MenuIcon from '@material-ui/icons/Menu';


class nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           
        };
         
    
      }

    componentDidMount() {
        console.log("COOKIE.ID_TOKEN > ", getCookie(COOKIE.ID_TOKEN));
        if (
            getCookie(COOKIE.ID_TOKEN) != null
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
            }

        }));

      


        return (
            <div  className={useStyles.root}>
                <AppBar  className="navDiv" position="absolute" style={{ width: '100%', margin: 0, backgroundColor: '#000000' }}>
                    <Toolbar variant="dense">   
                                 
                        <IconButton
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                // onClick={processDialogOpen}
                                color="inherit"
                                className="alignSectionItems"
                            >
                                <Avatar aria-label="recipe" style={{backgroundColor:'#00acc1 '}}>
                                    S
                                </Avatar>
                            </IconButton>
                    </Toolbar>
                </AppBar>

 


            </div>
        );
    }
}

export default nav;