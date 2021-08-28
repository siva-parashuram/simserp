import './dasboard.css';
import React from 'react'; 
import { makeStyles } from '@material-ui/core/styles';
import { COOKIE, getCookie } from "../../services/cookie"; 
import Nav from "./nav";
import Row1 from "./row1";
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Drawer from "./drawer";


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
      var url = new URL(window.location.href);
      let branchId = url.searchParams.get("branchId");
      let branchName = url.searchParams.get("branchName");
      let compName = url.searchParams.get("compName");
      this.setState({
        branchName: branchName,
        branchId: branchId,
        compName: compName
      });
    } else {
      this.setState({ isLoggedIn: false });
    }

    this.interval = setInterval(() => {
      let token = getCookie(COOKIE.USERID);
      if (token === "null" || token == null) {
        this.setState({ isLoggedIn: false });
      }
    }, 1000);
  }

  render() {   
    const useStyles = makeStyles((theme) => ({
      root: {
        display: 'flex',
      },
      appBar: {
        zIndex: theme.zIndex.drawer + 1,
      },
    }));
    return (
      <div className={useStyles.root}>
        <CssBaseline />
        <Nav />        
        <Drawer/>
        <main className={useStyles.content}>
          <Toolbar />
          <div style={{ marginLeft: 250 }}>
            <Row1 />
          </div>
        </main>
      </div>
    );
  }
}

export default userDashboard;