import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
 
import { DataGrid } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';




  let rows = [
    {
        id:1,
        sno: 1,
        country: "India",                
                    
      },
      {
        id:2,
        sno: 2,
        country: "US",
      }
  ];


 
 

class datagridtest extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
           countryData:rows,
           showSavedAlert:false,
           updatedValue:{
             id:0,
             country:""
           }
        };
         
    
      }

    componentDidMount() {
        
    }

    



    render() {

        const useStyles = makeStyles((theme) => ({
           

        }));

        const columns = [
          { field: 'sno', headerName: 'sno', type: 'number', width: 100, editable: false },
          { field: 'country', headerName: 'country', width:300,  editable: true }          
          
          
        ];
       
      
       

          const editRowChange=(e)=>{    
                 console.log("e > ",e);
                 var keys = Object.keys( e );  
                 if(keys.length===0){
                  this.setState({showSavedAlert:true});
                  console.log("updatedValue > ",this.state.updatedValue);
                  processSave();
                 
                 }else{
                  console.log("================================================");
                  console.log("this.state.countryData > ",this.state.countryData);                 
                  let value=e[keys[0]].country;                  
                  let index=parseInt(keys[0]);               
                  let countryD=this.state.countryData;
                  let Stateobj=countryD[index-1];      
                  console.log("keys > ",keys);
                  console.log("Stateobj > ",Stateobj);
                  console.log("================================================");         
                  Stateobj.country=value.value; 
                  this.setState({countryData:countryD,updatedValue:{id:Stateobj.id,country:Stateobj.country}});
                 }
          }

          const processSave=()=>{
            //process post request and hideSaved Alert
            this.setState({showSavedAlert:false});
           
           
          }


          const checkTableData=(e)=>{
              console.log("checkTableData this.state.countryData > ",this.state.countryData);

          }

          


        return (
            <div style={{ height: 300, width: '100%' }}>
             
                     
             
            <DataGrid   rows={this.state.countryData} columns={columns} onEditRowsModelChange={editRowChange}  />


            
     
            {this.state.showSavedAlert===true?(
              <Alert severity="success">Saved</Alert> 
            ):null}

            </div>
        );
    }
}

export default datagridtest;