import "./dasboard.css";
import { COOKIE, getCookie, deleteCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";
import React, { Fragment, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import NotificationsIcon from "@mui/icons-material/Notifications";
import Logincheck from "./logincheck";
import PowerSettingsNewSharpIcon from "@mui/icons-material/PowerSettingsNewSharp";
import Avatar from "@mui/material/Avatar";
import Badge from '@mui/material/Badge';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import Popover from '@mui/material/Popover';

import Chatapp from "../modules/chat/chatapp";

import { styled } from '@mui/material/styles';
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

export default function ButtonAppBar() {
  const classes = useStyles();
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

  const openMessage = Boolean(MessageanchorEl);
  const id = openMessage ? 'simple-popover' : undefined;


  const handleClick = (event) => {
    setnotificationCount(0);
  };


  useEffect(() => {
    if (getCookie(COOKIE.USERID) != null) {
      let token = getCookie(COOKIE.TOKEN);
      let FIRSTNAME = getCookie(COOKIE.FIRSTNAME);
      let initialName = FIRSTNAME.charAt(0).toUpperCase();
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      let branchBtnId = url.searchParams.get("branchBtnId");

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
    window.close();
  };

  return (
    <Fragment>
      <div className={classes.root}>
        <CssBaseline />
        <AppBar className="navDiv" position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {branchName}
            </Typography>

            <IconButton

            >
              <StyledMessageBadge
                badgeContent={messageNotificationCount}
                aria-describedby={id} onClick={handleMessageClick}
              >
                <ChatBubbleOutlineIcon />
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
            {/* <Avatar className='nav-avatar' sx={{ bgcolor: 'rgb(19, 163, 38)', fontSize: 18, color: 'white', width: 24, height: 24, marginLeft: 2 }}>{userInitial}</Avatar> */}

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




      </div>
      <Logincheck />
    </Fragment>
  );
}
