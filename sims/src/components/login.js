import './loginPage.css';
import React, { Fragment } from 'react';
import logo from '../logo.png';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
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



import { red } from '@material-ui/core/colors';
import ArrowForward from '@material-ui/icons/ArrowForward';
import axios from "axios";
import CompanyList from './companyList';



import * as URLS from "../routes/constants";
import { COOKIE, createCookie, deleteCookie, getCookie } from "../services/cookie";

class login extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      data: {},
      userID: '',
      password: '',
      userInitial: '',
      name: '',    
      userCompanyList: [
        { compID: 1, compName: "Siva Goa", branch: [{ branchID: 1, name: "Siva IOT Goa" }, { branchID: 2, name: "Siva kandla" }, { branchID: 3, name: "Siva Noida" }] },
        { compID: 2, compName: "Siva Tec", branch: [{ branchID: 4, name: "Siva ITek UK" }] }
      ],
      loader: 'hideLoginScreenLoader',
      anchorEl: null,
      open: false
    };
    this.handleChange = this.handleChange.bind(this);

  }

  componentDidMount() {
    console.log("Onload state > ", this.state);
    console.log("Onload getCookie(COOKIE.ID_TOKEN) > ", getCookie(COOKIE.ID_TOKEN));
    let token=getCookie(COOKIE.ID_TOKEN);
    console.log("Onload token > ", token);


    if(token=="null" || token==null){
      this.setState({ isLoggedIn: false });
      this.props.history.push(URLS.URLS.LoginPage);
    }else{
      console.log("Onload TOKEN PRESENT> ");
      let initialName = "A";
      let Name = "Admin";
      this.setState({ isLoggedIn: true, userInitial: initialName, name: Name });
    }

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
    const useStyles = makeStyles((theme: Theme) =>
      createStyles({
        root: {
          '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',

          }, avatar: {
            backgroundColor: red[500],
          },
        },
      }),
    );

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
              let data = response.data;
              let name = data.Name;
              let initialName = name.charAt(0);
              this.setState({ data: data, userInitial: initialName, isLoggedIn: true }, function () {              
                this.setState({ loader: 'hideLoginScreenLoader' });
              });
              createCookie(COOKIE.ID_TOKEN, "ABC", 3);
              createCookie(COOKIE.ISLOGGEDIN, true, 3);
              createCookie(COOKIE.USERID, this.state.userID, 3);
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
      deleteCookie(COOKIE.ID_TOKEN, null);     
      this.setState({ anchorEl: null,isLoggedIn: false })
      this.props.history.push(URLS.URLS.LoginPage);
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

    return (
      <Fragment>
        <Container style={{ textAlign: 'center', marginTop: 120 }} maxWidth="sm">
          <div>
            <img src={logo} className="App-logo" alt="logo" />
          </div>
          <div>&nbsp;</div>          
          {this.state.isLoggedIn ?
            <div>
              <Card variant="outlined">
                <CardHeader
                  style={{ textAlign: 'left', color: '#01579b' }}
                  avatar={
                    <Avatar aria-label="recipe">
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
                  className={useStyles.button}
                  endIcon={<ArrowForward />}
                  style={{ background: '#1a237e', color: '#fff' }}
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
            <MenuItem  key="logout" onClick={logoutUser}>Log out</MenuItem>
          </Menu>
        </Container>
      </Fragment>
    );
  }
}

export default login;
