import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
 
import Grid from '@material-ui/core/Grid';

 


 

class modules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID:""
        };
         
    
      }

    componentDidMount() {
        
    }



    render() {

        const useStyles = makeStyles((theme) => ({
           

        }));
 

          


        return (
            <div  className={useStyles.root}>
 

            <Grid container spacing={3}>
             <Grid item xs={7}>
             <h4 style={{color:'#000'}}>
                     Hey.... coming soon
                    </h4>
             </Grid>
            </Grid>              
                 
               
            </div>
        );
    }
}

export default modules;