import './dasboard.css';
import { COOKIE, getCookie,deleteCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";
import React, { useEffect } from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
 
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

import Logincheck from "./logincheck";
 

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
}));

export default function ButtonAppBar() {
    const classes = useStyles();
    const [branchName, setbranchName] = React.useState("");
    const [branchId, setbranchId] = React.useState("");
    const [compName, setcompName] = React.useState("");
    const [userInitial, setuserInitial] = React.useState("");
    const [isLoggedIn, setisLoggedIn] = React.useState(true);
    const [firstname, setfirstname] = React.useState("");
    const [greetings, setgreetings] = React.useState("");
    const [branchBtnId,setbranchBtnId] = React.useState("");
    const [token,settoken] = React.useState("");

    
    useEffect(() => {
        console.log('On Load Event of UseEffect !');
        let token = getCookie(COOKIE.USERID);
        let FIRSTNAME = getCookie(COOKIE.FIRSTNAME);

        let initialName = FIRSTNAME.charAt(0).toUpperCase();
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let branchBtnId= url.searchParams.get("branchBtnId");
        console.log("===========================================");
        console.log("branchId > ", branchId);
        console.log("branchName > ", branchName);
        console.log("compName > ", compName);
        console.log("===========================================");

        if (
            token === "null" || compName === "null" || branchName === "null" || branchId === "null" ||
            token == null ||
            compName === "" ||
            compName == null ||
            branchName === "" ||
            branchName == null ||
            branchId === "" ||
            branchId == null
        ) {
            alert("Branch details Not found");
            setisLoggedIn(false);
            window.close();
        } else {
            setbranchName(branchName);
            setbranchId(branchId);
            setcompName(compName);
            setuserInitial(initialName);
            setfirstname(FIRSTNAME);
            setbranchBtnId(branchBtnId);
            settoken(token);

        }

    }, []);


  

    const closeWindow = e => {     
        // let currentbranchBtnId= getCookie(COOKIE.branchBtnId);
        // let chkBranchWindow="_"+"_"+branchId; 
        // if(===branchBtnId) 
      //  
        window.close();
        
    }

    return (
        <div className={classes.root}>
        <CssBaseline />           
            <AppBar className="navDiv" position="static">
                <Toolbar>
                    <Typography variant="h6" className={classes.title}>
                        {branchName}
                    </Typography>
                    <IconButton
                        aria-label="close"
                        className={classes.margin}
                        style={{ color: '#fff' }}
                        onClick={closeWindow}
                    >
                        <CloseIcon />
                    </IconButton>                    
                </Toolbar>
            </AppBar>
            <Logincheck/>
        </div>
    );
}
