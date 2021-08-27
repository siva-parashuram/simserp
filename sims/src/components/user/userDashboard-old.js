import './dasboard.css';
import React, { Fragment } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import { makeStyles } from '@material-ui/core/styles';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";

import * as URLS from "../../routes/constants";
import Nav from "./nav";
import Row1 from "./row1";
import BreadCrumb from "./BreadCrumb";

import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';

import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Modules from "./modules";


class userDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };


  }

  componentDidMount() {

    if (
      getCookie(COOKIE.USERID) != null
    ) {
      this.setState({ isLoggedIn: true });
    } else {
      this.setState({ isLoggedIn: false });


    }

    this.interval = setInterval(() => {
      let token = getCookie(COOKIE.USERID);
      if (token == "null" || token == null) {
        this.setState({ isLoggedIn: false });
      }
    }, 1000);

  }






  render() {
    const drawerWidth = 300;
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },
      appBar: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
      drawer: {
        width: drawerWidth,
        flexShrink: 0,
      },
      drawerPaper: {
        width: drawerWidth,
      },
      // necessary for content to be below app bar
      toolbar: theme.mixins.toolbar,
      content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },

    }));

    const closeWindow = e => {
      window.close();
    }

    return (
      <div  className="navDiv">
      <CssBaseline />
        
        {this.state.isLoggedIn ? (
          <Fragment>
            
               <Nav/>
            
          <Drawer
          className={useStyles.drawer}
          variant="permanent"
          classes={{
            paper: useStyles.drawerPaper,
          }}
          anchor="left"
        >

        <List>
          {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
            <ListItem button key={text}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List>
          
        </Drawer>
        <main className={useStyles.content}>
           <div className={useStyles.toolbar}>
          
           </div>
         
        </main>
          </Fragment>
        ) : (<div>
          <Alert severity="error">
            <AlertTitle> Login Expired!</AlertTitle>
            Please Close & Login Again.<strong>
              <a href="javscript:Void(0);" onClick={closeWindow} style={{ color: '#006064' }}>Close Window</a>
            </strong>
          </Alert>
        </div>)}

      </div>

    );
  }
}

export default userDashboard;