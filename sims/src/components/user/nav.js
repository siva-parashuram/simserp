import "./dasboard.css";
import { COOKIE, getCookie } from "../../services/cookie";
import * as CF from "../../services/functions/customfunctions";
import React, { Fragment, useEffect } from "react";
import { styled } from '@mui/material/styles';
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@material-ui/core/Grid";

import Avatar from "@mui/material/Avatar";
import Badge from '@mui/material/Badge';
import Popover from '@mui/material/Popover';

import PowerSettingsNewSharpIcon from "@mui/icons-material/PowerSettingsNewSharp";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import AddToDriveIcon from '@mui/icons-material/AddToDrive';
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import Slide from '@mui/material/Slide';

import Logincheck from "./logincheck";
import Chatapp from "../modules/chat/chatapp";
import Fms from "../modules/fms/fms";


const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));
const StyledBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 1,
    padding: '0 4px',
    color: '#fff',
    backgroundColor: '#f44336',

  },
}));

const StyledMessageBadge = styled(Badge)(({ theme }) => ({
  '& .MuiBadge-badge': {
    right: -3,
    top: 1,
    padding: '0 4px',
    color: '#fff',
    backgroundColor: '#009688',

  },
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ButtonAppBar({ navBranchNameTitle }) {
  const classes = useStyles();
  const [name, setname] = React.useState("");
  const [branchName, setbranchName] = React.useState("");
  const [branchId, setbranchId] = React.useState("");
  const [compName, setcompName] = React.useState("");
  const [userInitial, setuserInitial] = React.useState("");
  const [isLoggedIn, setisLoggedIn] = React.useState(true);
  const [firstname, setfirstname] = React.useState("");
  const [greetings, setgreetings] = React.useState("");
  const [branchBtnId, setbranchBtnId] = React.useState("");
  const [token, settoken] = React.useState("");
  const [notificationCount, setnotificationCount] = React.useState(1);
  const [messageNotificationCount, setmessageNotificationCount] = React.useState(1);
  const [MessageanchorEl, setMessageAnchorEl] = React.useState(null);
  const [FMSDialog, setFMSDialog] = React.useState(false);

  const openMessage = Boolean(MessageanchorEl);
  const id = openMessage ? 'simple-popover' : undefined;


  const handleClick = (event) => {
    setnotificationCount(0);
  };


  useEffect(() => {
    let params = CF.GET_URL_PARAMS();
    if (getCookie(COOKIE.USERID) != null) {

      let token = getCookie(COOKIE.TOKEN);
      let FIRSTNAME = getCookie(COOKIE.FIRSTNAME);
      let initialName = FIRSTNAME.charAt(0).toUpperCase();
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      let branchBtnId = url.searchParams.get("branchBtnId");
      let name = url.searchParams.get("name");

      if (
        token === "null" ||
        compName === "null" ||
        branchName === "null" ||
        branchId === "null" ||
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
        setname(name);
        setbranchName(branchName);
        setbranchId(branchId);
        setcompName(compName);
        setuserInitial(initialName);
        setfirstname(FIRSTNAME);
        setbranchBtnId(branchBtnId);
        settoken(token);
      }
    } else {
      window.location.href = "/loginExpired";
    }
  }, []);



  const handleMessageClick = (event) => {
    setMessageAnchorEl(event.currentTarget);
  };

  const handleMessageClose = () => {
    setMessageAnchorEl(null);
  };


  const closeWindow = (e) => {
    CF.UPDATE_BRANCH_OPEN_REMOVE(branchId);
    window.close();
  };

  const updateBRANCH_OPEN = (branchId) => {
    let BRANCH_OPEN = localStorage.getItem('BRANCH_OPEN');
    if (BRANCH_OPEN) {
      var BRANCH_OPENArray = BRANCH_OPEN.split(",").map(Number);
      var newBRANCH_OPEN = [];
      for (let i = 0; i < BRANCH_OPENArray.length; i++) {
        if (BRANCH_OPENArray[i] === parseInt(branchId)) {

        } else {
          newBRANCH_OPEN.push(BRANCH_OPENArray[i]);
        }
      }
      localStorage.setItem('BRANCH_OPEN', newBRANCH_OPEN.toString());
    }
  }



  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className="navDiv" position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {/* {branchName} - {name} */} {navBranchNameTitle}
            </Typography>

            <IconButton onClick={(e)=>setFMSDialog(true)}>
              <AddToDriveIcon style={{ color: "white" }}/>
            </IconButton>

            <IconButton>
              <StyledMessageBadge
                badgeContent={messageNotificationCount}
                aria-describedby={id} onClick={handleMessageClick}
              >
                <ChatBubbleOutlineIcon style={{ color: "white" }}/>
              </StyledMessageBadge>

            </IconButton>

            <IconButton
              onClick={handleClick}
            >
              <StyledBadge
                badgeContent={notificationCount}
              >
                <NotificationsIcon style={{ color: "white" }} />
              </StyledBadge>
            </IconButton>

            <IconButton><PowerSettingsNewSharpIcon style={{ color: "white" }} onClick={closeWindow} /></IconButton>

          </Toolbar>
        </AppBar>


        <Popover
          style={{ marginTop: 15 }}
          id={id}
          open={openMessage}
          anchorEl={MessageanchorEl}
          onClose={handleMessageClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',

          }}
        >
          <Chatapp />
        </Popover>

        <Dialog
          fullWidth={true}
          maxWidth="xl"
          TransitionComponent={Transition}
          className="dialog-prompt-activity"
          open={FMSDialog}
          aria-labelledby="fms-dialog-title"
          aria-describedby="fms-dialog-description"
        >
          <DialogTitle id="fms-dialog-title" className="dialog-area">
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={8} lg={8}>
                <IconButton
                  aria-label="ArrowBackIcon"
                >
                  <ArrowBackIcon onClick={(e) => setFMSDialog(false)} />
                </IconButton> 
                Siva File Repository
              </Grid>
            </Grid>

          </DialogTitle>
          <DialogContent className="dialog-area">            
            <Fms/>
          </DialogContent>
        </Dialog>


      </div>
      <Logincheck />
    </Fragment>
  );
}
