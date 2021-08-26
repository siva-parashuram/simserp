import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
 
import Grid from '@material-ui/core/Grid';

import Button from '@material-ui/core/Button';


 import Datagridtest from "./datagridtest";

class nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            FullScreenDialog:false
        };
         
    
      }

    componentDidMount() {
        
    }



    render() {

        const useStyles = makeStyles((theme) => ({
           

        }));

      
        
      

        const showInvoice=()=>{
            console.log("hey...> ",URLS.URLS.testReport);
          //  this.props.history.push(URLS.URLS.testReport);
             window.open(URLS.URLS.testReport+"?id=101", "","width=900,height=500");
        }

          


        return (
            <div  className={useStyles.root}>

            <div style={{marginTop:70}}>
            
            </div>

            <Grid container spacing={3}>
             <Grid item xs={7}></Grid>
            </Grid>                
                <Grid container spacing={3}>
                <Grid item xs={7}>                 
                    <div style={{height:300}}>
                    <h4 className="row-1-grid-title"> </h4>
                </div> 
                </Grid>
                <Grid item xs={5}>                
                    <div style={{height:300}}>
                      <h4  className="row-1-grid-title"> </h4>
                      <Datagridtest/>
                     {/*   <Button variant="contained" onClick={showInvoice} >Show Invoice</Button> */   }                   
                    </div>                    
                </Grid>
                </Grid>
                <div>
              </div>


            </div>
        );
    }
}

export default nav;