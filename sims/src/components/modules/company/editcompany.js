import React, { Fragment } from 'react';
import '../../user/dasboard.css';
import * as URLS from "../../../routes/constants";
import Nav from "../../user/nav";
import Drawer from "../../user/drawer";
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles'; 
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

class editcompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",           
          };   
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let compID = url.searchParams.get("compID");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({           
            urlparams: urlparams,
        });
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
            <Fragment>
            <Nav />        
            <Drawer/>
            <main className={useStyles.content}>
              <Toolbar />
              <div style={{ marginLeft: 250 }}>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                <Link color="inherit" href={URLS.URLS.userDashboard+this.state.urlparams} >
                   Dashboard
                </Link>
                <Link color="inherit" href={URLS.URLS.companyMaster+this.state.urlparams}>
                   Company master
                </Link>
                <Typography color="textPrimary">Edit Company</Typography>
                </Breadcrumbs>                 
                </Grid>
              </Grid>             
                   <h1>Hey looking to Edit company?</h1>
              </div>
            </main>
            </Fragment>
        );
    }


}
export default editcompany;