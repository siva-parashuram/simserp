import './loginPage.css';
import React, { Fragment } from 'react';
import logo from '../logo.png';
import * as APIURLS from "../routes/apiconstant";

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import Snackbar from '@material-ui/core/Snackbar';
// import Alert from '@material-ui/lab/Alert';
import MuiAlert from '@material-ui/lab/Alert';

import ArrowForward from '@material-ui/icons/ArrowForward';
import axios from "axios";
import CompanyList from './companyList';

import * as URLS from "../routes/constants";
import { COOKIE, createCookie, deleteCookie, getCookie } from "../services/cookie";
import { FlashOnRounded } from '@material-ui/icons';

let clientlog="";
let companiesList=[
 
];

class login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      ErrorPrompt: false,
      isLoggedIn: false,
      data: {},
      userID: '',
      password: '',
      userInitial: '',
      name: '',
      userCompanyList: companiesList,
      loader: 'hideLoginScreenLoader',
      anchorEl: null,
      open: false,
      clientlog:""
    };
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    console.log("===================================");   
    let getLocalIP = this.getLocalIP();
    this.setState({clientlog:getLocalIP});
    console.log("===================================");

    let token = getCookie(COOKIE.USERID);

    if (token === "null" || token == null) {
      this.setState({ isLoggedIn: false });
      this.props.history.push(URLS.URLS.LoginPage);
    } else {
      console.log("Onload TOKEN PRESENT> ");
      // let initialName = "A";
      // let Name = "Admin";
      // this.setState({ isLoggedIn: true, userInitial: initialName, name: Name });
    }

    this.interval = setInterval(() => {
      let token = getCookie(COOKIE.USERID);
      if (token === "null" || token == null) {
        if (this.state.isLoggedIn === false) { } else {
          this.setState({ isLoggedIn: false });
          this.props.history.push(URLS.URLS.LoginPage);
        }
      }

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }
 


  getLocalIP() {
    let D ="";
    axios.get('https://www.cloudflare.com/cdn-cgi/trace')
      .then(function (response) {       
        console.log("getLocalIP > response >", response);
         D = response.data;
         clientlog=D;
         
      })
      .catch(function (error) {        
        console.log("getLocalIP > error >", error);
      })
      .then(function () {        
      });

      return D;  
  }


  

  handleChange(event) {
    let id = event.target.id;
    if (id === "userID") {
      this.setState({ userID: event.target.value });
    }
    if (id === "password") {
      this.setState({ password: event.target.value });
    }
  }

  render() {
    const handleClick = (e) => {
      if (this.state.userID === "" || this.state.password === "") { } else {
        this.setState({ loader: 'showLoginScreenLoader' });        
        const data = {
          loginId: this.state.userID,
          password: this.state.password,
          ClientInfo:clientlog
        };        
        
        const headers = {
          "Content-Type": "application/json"
        };
        let loginUrl = APIURLS.APIURL.Login;       
       
        axios.post(loginUrl, data, { headers })
          .then(response => {
            console.log("response > ", response);
            if (response.status === 200) {
              if (response.data.UID === 0) {
                this.setState({ loader: 'hideLoginScreenLoader', ErrorPrompt: true });
                document.getElementById("password").value=null;
                console.log("Error credentials");                
              } else {
                let data=response.data;
                setAllCookiesAndParams(data);               
              }
            } else {
              this.setState({ loader: 'hideLoginScreenLoader', ErrorPrompt: true });
              document.getElementById("password").value=null;
              this.setState({ loader: 'hideLoginScreenLoader' });
              console.error('status !=200 ', response);
            }
          }
          ).catch(error => {            
            this.setState({ loader: 'hideLoginScreenLoader', ErrorPrompt: true });            
            console.error('There was an error!', error);
          });
           
      }
    };
    const logoutUser = (e) => {
      deleteCookie(COOKIE.USERID, null);
      this.setState({ anchorEl: null, isLoggedIn: false });      
      window.location.reload();
    }
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

    const closeErrorPrompt = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      this.setState({ ErrorPrompt: false });
    }

    function Alert(props) {
      return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const setAllCookiesAndParams=(data) =>{
      
      let name = data.head.firstName;
      let initialName =  data.head.firstName.charAt(0).toUpperCase();     
       
      
      createCookie(COOKIE.TOKEN, data.head.token);
      createCookie(COOKIE.USERID, data.head.userID); 
      createCookie(COOKIE.ISADMIN, data.head.isAdmin);
      createCookie(COOKIE.FIRSTNAME, data.head.firstName);
      console.log("setAllCookiesAndParams > data > ",data);
      console.log("setAllCookiesAndParams > data.companies > ",data.companies);
      console.log("setAllCookiesAndParams > data.companies.companyList > ",data.companies.companyList);

      
      let companyList=data.companies.companyList;
      console.log("---> setAllCookiesAndParams > companyList > ",companyList);
      this.setState({ userCompanyList:companyList }, function () {
        this.setState({ loader: 'hideLoginScreenLoader',data: data, userInitial: initialName, name: name ,isLoggedIn: true});       
      });
   
    }

    return (
      <Fragment>
        <Container style={{ textAlign: 'center', marginTop: 120 }} maxWidth="sm">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>&nbsp;</div>
          {this.state.isLoggedIn ?
            <div>
              <Paper>
                <Card variant="outlined">
                  <CardHeader
                    style={{ textAlign: 'left', color: '#01579b' }}
                    avatar={
                      <Avatar aria-label="recipe" style={{ backgroundColor: '#0072bc' }} >
                        {this.state.userInitial}
                      </Avatar>
                    }
                    action={
                      <IconButton key="action-btn" aria-label="settings" aria-controls="logout-menu" aria-haspopup="true" onClick={menuClick}>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title={"Hi " + this.state.name}
                    subheader="Choose your Company"
                  />
                  <Divider />
                  <CardContent style={{ textAlign: 'center', marginTop: 5, }}>
                    <CompanyList state={this.state} />
                  </CardContent>
                </Card>
              </Paper>
            </div>
            :
            <div>
              <div>
                <TextField
                  required
                  id="userID"
                  label="User ID"
                  variant="outlined"
                  size="small"
                  onChange={this.handleChange}
                />
              </div>
              <div>&nbsp;</div>
              <div>
                <TextField
                  required
                  id="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  size="small"
                  onChange={this.handleChange}
                />
              </div>
              <div>&nbsp;</div>
              <div>
                <Button
                  variant="contained"                  
                  endIcon={<ArrowForward />}
                  style={{ background: '#0072bc', color: '#fff' }}
                  onClick={handleClick}
                >
                  LOGIN
                </Button>
              </div>

            </div>
          }
          <div>&nbsp;</div>
          <div className={this.state.loader}>
            <LinearProgress />
          </div>

          <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
            <Alert onClose={closeErrorPrompt} severity="error">Login Failed!</Alert>
          </Snackbar>

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
                marginLeft: 50
              },
            }}
          >
         
            <MenuItem key="logout" onClick={logoutUser}>Log out</MenuItem>
          </Menu>
        </Container>
      </Fragment>
    );
  }
}

export default login;
