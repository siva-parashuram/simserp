import './dasboard.css';
import React from 'react';
// import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
// import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
 

// import Modules from "./modules";
 

class nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FullScreenDialog: false
        };


    }

    componentDidMount() {

    }



    render() {

        const useStyles = makeStyles((theme) => ({


        }));





        // const showInvoice = () => {
        //     console.log("hey...> ", URLS.URLS.testReport);
        //     //  this.props.history.push(URLS.URLS.testReport);
        //     window.open(URLS.URLS.testReport + "?id=101", "", "width=900,height=500");
        // }


        return (
            <div className={useStyles.root}>                 
                    <Grid container spacing={2}>
                        <Grid item xs={9}>
                           Hi 1
                        </Grid>
                        <Grid item xs={3} className="rightGridSection">
                           <div >
                               HI 2
                           </div>   
                        
                        </Grid>                         
                    </Grid>                 
            </div>
        );
    }
}

export default nav;