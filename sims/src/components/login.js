import './loginPage.css';
import React, { Fragment } from 'react';
import Sivamap from '../siva-map.jpg';
import logo from '../logo.png';
import * as APIURLS from "../routes/apiconstant";
import * as CF from "../services/functions/customfunctions";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import LinearProgress from '@material-ui/core/LinearProgress';
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import LogoutIcon from '@mui/icons-material/Logout';
import Tooltip from '@mui/material/Tooltip';
import Paper from '@mui/material/Paper';

import ArrowForward from '@material-ui/icons/ArrowForward';
import Typography from '@mui/material/Typography';
import axios from "axios";
import CompanyList from './companyList';

import * as URLS from "../routes/constants";
import { COOKIE, createCookie, deleteCookie, getCookie } from "../services/cookie";


let clientlog = "";
let companiesList = [

];

class login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      token: "",
      ErrorMessage: "",
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
      clientlog: "",
      status: '',
      disableLoginBtn: false
    };
    this.handleChange = this.handleChange.bind(this);

  }

  logoutUser = () => {
    deleteCookie(COOKIE.USERID, null);
    deleteCookie(COOKIE.TOKEN, null);
    deleteCookie(COOKIE.USERID, null);
    deleteCookie(COOKIE.ISADMIN, null);
    deleteCookie(COOKIE.FIRSTNAME, null);
    this.removeSavedState();
    this.setState({ anchorEl: null, isLoggedIn: false });
    window.location.reload();
  }

  loadState = () => {
    try {
      const serializedState = localStorage.getItem('loginState');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (e) {
      return undefined;
    }
  };

  saveState = (state) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('loginState', serializedState);
    } catch (e) {
      // Ignore write errors;
    }
  };

  removeSavedState = () => {
    try {
      localStorage.setItem('loginState', null);
    } catch (e) {
      // Ignore write errors;
    }
  }


  componentDidMount() {
    let getLocalIP = this.getLocalIP();
    this.setState({ clientlog: getLocalIP });
    let token = getCookie(COOKIE.TOKEN);
    if (token === "null" || token == null) {
      this.setState({ isLoggedIn: false });
      this.props.history.push(URLS.URLS.LoginPage);
    } else {
      try {
        let loginState = this.loadState();

        this.setState({
          ErrorPrompt: loginState.ErrorPrompt,
          isLoggedIn: true,
          data: loginState.data,
          userID: loginState.userID,
          password: loginState.password,
          userInitial: loginState.userInitial,
          name: loginState.name,
          userCompanyList: loginState.userCompanyList,
          loader: 'hideLoginScreenLoader',
          anchorEl: loginState.anchorEl,
          open: loginState.open,
          clientlog: loginState.clientlog
        });


      } catch (ex) {
        // this.logoutUser();
      }
    }

    this.interval = setInterval(() => {
      let token = getCookie(COOKIE.USERID);
      if (token === "null" || token == null) {
        if (this.state.isLoggedIn === false) { } else {
          this.setState({ isLoggedIn: false, disableLoginBtn: false });

          this.props.history.push(URLS.URLS.LoginPage);
        }
      }

    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }



  getLocalIP() {
    let D = "";
    axios.get('https://www.cloudflare.com/cdn-cgi/trace')
      .then(function (response) {
        D = response.data;
        clientlog = D;
      })
      .catch(function (error) {
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

  clearCookie=()=>{
    deleteCookie(COOKIE.USERID, null);
    deleteCookie(COOKIE.TOKEN, null);
    deleteCookie(COOKIE.USERID, null);
    deleteCookie(COOKIE.ISADMIN, null);
    deleteCookie(COOKIE.FIRSTNAME, null);
    deleteCookie(COOKIE.BRANCH_OPEN, null);
  }

  render() {
    const handleClick = (e) => {
      if (this.state.userID === "" || this.state.password === "") { } else {
        this.setState({ loader: 'showLoginScreenLoader', disableLoginBtn: true });
        const data = {
          loginId: this.state.userID,
          password: this.state.password,
          ClientInfo: clientlog
        };

        const headers = {
          "Content-Type": "application/json"
        };
        let loginUrl = APIURLS.APIURL.Login;

        axios.post(loginUrl, data, { headers })
          .then(response => {
            console.log("response > ", response);
            if (response.status === 200) {
              if (response.data.head.status === "OK") {
                let data = response.data;
                setAllCookiesAndParams(data);
              } else {
                if (response.data.head.status === "DL") {
                  let data = response.data;
                  setAllCookiesAndParams(data);
                }

                if (response.data.head.status === "UU") {
                  this.setState({
                    loader: 'hideLoginScreenLoader',
                    ErrorPrompt: true,
                    disableLoginBtn: false,
                    ErrorMessage: "Unknown User"
                  });
                }

                if (response.data.head.status === "NA") {
                  this.setState({
                    loader: 'hideLoginScreenLoader',
                    ErrorPrompt: true,
                    disableLoginBtn: false,
                    ErrorMessage: "User not Active"
                  });
                }

              }
            } else {
              this.setState({
                loader: 'hideLoginScreenLoader',
                ErrorPrompt: true,
                disableLoginBtn: false,
                ErrorMessage: "Something went wrong."
              });
            }

          }
          ).catch(error => {
            console.log("error > ", error);
            this.setState({ loader: 'hideLoginScreenLoader', ErrorPrompt: true, disableLoginBtn: false });
          });

      }
    };
    const logoutUser = (e) => {
      processLogout(getCookie(COOKIE.USERID), this.state.token);

    }

    const processLogout = (userID, token) => {
      const data = {
        "UserID": parseInt(userID),
        "Token": token
      };

      const headers = {
        "Content-Type": "application/json"
      };
      let logoutUrl = APIURLS.APIURL.Logout;
      axios.post(logoutUrl, data, { headers })
        .then(response => {
          this.setState({ disableLoginBtn: false });
          this.setState({ anchorEl: null, isLoggedIn: false, userID: "", password: "" }, () => {
            deleteCookie(COOKIE.USERID, null);
            deleteCookie(COOKIE.TOKEN, null);
            deleteCookie(COOKIE.USERID, null);
            deleteCookie(COOKIE.ISADMIN, null);
            deleteCookie(COOKIE.FIRSTNAME, null);
            deleteCookie(COOKIE.BRANCH_OPEN, null);
            this.removeSavedState();
            CF.EMPTY_BRANCH_OPEN();  //remove all BRANCH OPEN WINDOWS from storage

          });
        }
        ).catch(error => {

        });
    }

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

    const setAllCookiesAndParams = (data) => {

      let name = data.head.firstName;
      let initialName = data.head.firstName.charAt(0).toUpperCase();

      createCookie(COOKIE.TOKEN, data.head.token, APIURLS.CTimeOut);
      createCookie(COOKIE.USERID, data.head.userID, APIURLS.CTimeOut);
      createCookie(COOKIE.ISADMIN, data.head.isAdmin, APIURLS.CTimeOut);
      createCookie(COOKIE.FIRSTNAME, data.head.firstName, APIURLS.CTimeOut);


      let companyList = data.companies.companyList;
      this.setState({ userCompanyList: companyList }, function () {
        this.setState({
          token: data.head.token,
          loader: 'hideLoginScreenLoader',
          data: data,
          userInitial: initialName,
          name: name,
          status: data.head.status,
          isLoggedIn: true
        }, () => {
          this.saveState(this.state);
        });

      });

    }

    return (
      <Fragment>
        <Grid container spacing={0} >
          <Grid item xs={12} sm={12} md={3} lg={3} >
            <Grid container spacing={0} >
              <Grid item xs={12} sm={12} md={12} lg={12} >
                <Container style={{ textAlign: 'center', marginTop: this.state.isLoggedIn ? 50 : 140 }} maxWidth="sm">
                  <center>
                    <div style={{ height: 50 }}></div>
                    <div>
                      <img src={logo} className="App-logo" alt="logo" />
                    </div>
                    <div>&nbsp;</div>
                    {this.state.isLoggedIn ?
                      <div>
                        <Paper>
                          <Card variant="outlined" className="card-companyList">
                            <CardHeader
                              style={{ textAlign: 'left', color: '#01579b' }}
                              avatar={
                                <Avatar
                                  aria-label="recipe"
                                  style={{ backgroundColor: '#0072bc' }}
                                >
                                  {this.state.userInitial}
                                </Avatar>
                              }
                              action={
                                <Tooltip title="Log Out" placement="right">
                                  <IconButton key="action-btn"
                                    aria-label="settings"
                                    aria-controls="logout-menu"
                                    aria-haspopup="true"
                                    onClick={logoutUser}
                                  >
                                    <LogoutIcon />
                                  </IconButton>
                                </Tooltip>
                              }
                              title={"Hi " + this.state.name}
                              subheader="Welcome to SIMS"
                            />
                            <Divider />
                            <CardContent style={{ textAlign: 'center', marginTop: 5, }}>
                              <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={12} lg={12}>
                                  {this.state.status === "DL" ? (
                                    <span>You are already logged in. Kindly logout and login again or <span 
                                      class="exit-link-login"
                                      onClick={(e)=>this.clearCookie()}
                                      > Exit</span> </span>
                                  ) : (<CompanyList state={this.state} />)}
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Paper>
                      </div>
                      :
                      <div>
                        <div>
                          <TextField
                            className=""
                            required
                            id="userID"
                            // label="User ID"
                            variant="outlined"
                            size="small"
                            placeholder="User ID"
                            onChange={this.handleChange}
                          />
                        </div>
                        <div>&nbsp;</div>
                        <div>
                          <TextField
                            className=""
                            required
                            id="password"
                            // label="Password"
                            type="password"
                            variant="outlined"
                            size="small"
                            placeholder="Password"
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
                            disabled={this.state.disableLoginBtn}
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
                      <Alert onClose={closeErrorPrompt} severity="warning">Error! {this.state.ErrorMessage}</Alert>
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
                  </center>
                </Container>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={9} lg={9}>
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Box>
                  <img src={Sivamap} className="siva-map-img" alt="logo" />
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

export default login;
