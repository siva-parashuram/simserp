import React, { Fragment } from 'react';
import logo from '../logo.png';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Send from '@material-ui/icons/Send';
import axios from "axios";
 
class login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userID: '',
      password: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {

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

          },
        },
      }),
    );




    const handleClick = (e) => {
      console.log("state : ", this.state);
      const data = { 
        ID: this.state.userID,
        PWD:this.state.password 
      };
      const headers = { 
        "Content-Type": "application/json"
      };
      axios.post('http://103.86.176.85:81/WebService.asmx/Login', data, { headers })
          .then(response => {
            console.log("response > ",response);
          }
          ).catch(error => {
            
            console.error('There was an error!', error);
        });

    };

    return (
      <Fragment>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>&nbsp;</div>
        <div>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        <div>&nbsp;</div>
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
            // color="primary"
            className={useStyles.button}
            endIcon={<Send />}
            style={{ background: '#1a237e', color: '#fff' }}
            onClick={handleClick}
          >
            LOGIN
          </Button>
        </div>
      </Fragment>
    );
  }
}

export default login;