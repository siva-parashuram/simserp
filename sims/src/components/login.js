import './loginPage.css';
import React, { Fragment } from 'react';
import logo from '../logo.png';

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
      userCompanyList: [
        { compID: 1, compName: "Siva Goa", branch: [{ branchID: 1, name: "Siva Goa" }, { branchID: 2, name: "Siva kandla" }, { branchID: 3, name: "Siva Noida" }] },
        { compID: 2, compName: "Siva Tec", branch: [{ branchID: 4, name: "Siva  UK" }] }
      ],
      loader: 'hideLoginScreenLoader',
      anchorEl: null,
      open: false
    };
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    console.log("===================================");    
    let browserName=this.getBrowser();
    let getLocalIP=this.getLocalIP();
    console.log("browserName > ",browserName);
    console.log("getIP > ",getLocalIP);
    let os = navigator.userAgent.slice(13).split(';');
    os= os[0];
    console.log("os > ",os);     
    console.log("===================================");

    let token = getCookie(COOKIE.USERID); 

    if (token == "null" || token == null) {
      this.setState({ isLoggedIn: false });
      this.props.history.push(URLS.URLS.LoginPage);
    } else {
      console.log("Onload TOKEN PRESENT> ");
      let initialName = "A";
      let Name = "Admin";
      this.setState({ isLoggedIn: true, userInitial: initialName, name: Name });
    }

    this.interval = setInterval(() => {
      let token = getCookie(COOKIE.USERID);
      if (token == "null" || token == null) {
        if (this.state.isLoggedIn == false) { } else {
          this.setState({ isLoggedIn: false });
          this.props.history.push(URLS.URLS.LoginPage);
        }
      }

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getBrowser() {
    let Bname = "";
    if ((navigator.userAgent.indexOf("Opera") || navigator.userAgent.indexOf('OPR')) != -1) {
      Bname = 'Opera';
    } else if (navigator.userAgent.indexOf("Chrome") != -1) {
      Bname = 'Chrome';
    } else if (navigator.userAgent.indexOf("Safari") != -1) {
      Bname = 'Safari';
    } else if (navigator.userAgent.indexOf("Firefox") != -1) {
      Bname = 'Firefox';
    } else if ((navigator.userAgent.indexOf("MSIE") != -1) || (!!document.documentMode == true)) {
      Bname = 'IE';//crap
    } else {
      Bname = 'Unknown';
    }
    return Bname;
  }


  getLocalIP() {
    axios.get('https://www.cloudflare.com/cdn-cgi/trace')    
    .then(function (response) {
      // handle success
      console.log("getLocalIP > response >",response);
      let D=response.data;
      console.log("getLocalIP > D >",D);
      // let data = D.trim().split('\n').reduce(function(obj, pair) {
      //   pair = pair.split('=');
      //   console.log("getLocalIP > pair >",pair);
       
      // }, {});
    })
    .catch(function (error) {
      // handle error
      console.log("getLocalIP > error >",error);
    })
    .then(function () {
      // always executed
    });
  }


  onloadEvent() {
    console.log("Hey I am here...");
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
          ID: this.state.userID,
          PWD: this.state.password
        };
        const headers = {
          "Content-Type": "application/json"

        };
        axios.post('http://103.86.176.85:81/WebService.asmx/Login', data, { headers })
          .then(response => {
            console.log("response > ", response);
            if (response.status === 200) {

              if (response.data.UID === 0) {
                this.setState({ loader: 'hideLoginScreenLoader', ErrorPrompt: true });
                console.log("Error credentials");
              } else {
                let data = response.data;
                let name = this.state.userID;
                let initialName = name.charAt(0);
                this.setState({ data: data, userInitial: initialName, name: name, isLoggedIn: true }, function () {
                  this.setState({ loader: 'hideLoginScreenLoader' });
                  setAllCookies(data);
                });


              }

            } else {
              this.setState({ loader: 'hideLoginScreenLoader' });
              console.error('status !=200 ', response);
            }
          }
          ).catch(error => {
            this.setState({ loader: 'hideLoginScreenLoader' });
            console.error('There was an error!', error);
          });
      }
    };
    const logoutUser = (e) => {
      deleteCookie(COOKIE.USERID, null);
      this.setState({ anchorEl: null, isLoggedIn: false })
      // this.props.history.push(URLS.URLS.LoginPage);
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

    function setAllCookies(data) {
      createCookie(COOKIE.USERID, "123");
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
                  // className={useStyles.button}
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
            <MenuItem key="profile">Profile</MenuItem>
            <MenuItem key="logout" onClick={logoutUser}>Log out</MenuItem>
          </Menu>
        </Container>
      </Fragment>
    );
  }
}

export default login;
