import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
 
import { DataGrid } from '@material-ui/data-grid';
 


const columns = [
    { field: 'sno', headerName: 'sno', type: 'number', width: 100, editable: false },
    { field: 'country', headerName: 'country', width:300,  editable: true }          
    
    
  ];

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
           countryData:rows
        };
         
    
      }

    componentDidMount() {
        
    }



    render() {

        const useStyles = makeStyles((theme) => ({
           

        }));

         
       
       

          const editRowChange=(e)=>{    
                 console.log("e > ",e);
                  var keys = Object.keys( e );  
/*
                  let value=e[keys[0]].country;                  
                  let index=parseInt(keys[0]);               
                  let countryD=this.state.countryData;
                  let Stateobj=countryD[index-1];               
                  Stateobj.country=value.value;              
                */
                // countryD.map(function(item,i) {
                //      console.log("item > ",item);
                // });
                
                //  this.setState({countryData:countryD});

          }


          const checkTableData=(e)=>{
              console.log("checkTableData this.state.countryData > ",this.state.countryData);

          }

          


        return (
            <div style={{ height: 300, width: '100%' }}>
             
            
               
            <DataGrid   rows={this.state.countryData} columns={columns} /*onEditRowsModelChange={editRowChange}*/  />
     
             <a href="javascript:Void(0)" onClick={checkTableData}>Check Now</a> 

            </div>
        );
    }
}

export default datagridtest;