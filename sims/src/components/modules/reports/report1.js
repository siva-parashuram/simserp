import React, { Fragment } from 'react';
import Drawer from "../../user/drawer";
import Nav from "../../user/nav";
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../../services/cookie";
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";
import axios from "axios";


import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

import LinearProgress from '@material-ui/core/LinearProgress';


import datagridtest from "../../../components/user/datagridtest"
import { ContactsOutlined } from '@material-ui/icons';
 
 
let col=[
 /*   {
        field: 'id', headerName: 'id',  width: 100, editable: false 
    },
    {
        field: 'custName', headerName: 'custName',  width: 100, editable: false 
    },
    {
        field: 'fy', headerName: 'fy',  width: 100, editable: false 
    },
    {
        field: 'invVal', headerName: 'invVal',  width: 100, editable: false 
    }*/
];
 
let masterData=[
    
];
  

 

class report1 extends React.Component {
    
    constructor(props) {
        
        super(props);
        this.state = {
            ProgressLoader:false,
            masterData: masterData,
            customers:[],
            tableHeader:[]
        };
    }

    componentDidMount() {
        this.getReport();

    }

   

    getReport() {
        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let GetTempDataUrl = APIURLS.APIURL.getTempData;

        axios.get(GetTempDataUrl)
            // axios.get(GetTempDataUrl, ValidUser, { headers })
            .then(response => {
                if (response.status === 200) {
                   // console.log("response -> ", response);
                    let data=response.data;
                    let masterData=[];
                    for(let i=0;i<10000;i++){
                        //console.log("i > ",i);
                        let D={
                            id:i,
                            baseVal: data[i]['baseVal'],
                            ccode: data[i]['ccode'],
                            cid: data[i]['cid'],
                            compId: data[i]['compId'],
                            currId: data[i]['currId'],
                            custId: data[i]['custId'],
                            custName: data[i]['custName'],
                            fcval: data[i]['fcval'],
                            fy: data[i]['fy'],
                            invDt: data[i]['invDt'],
                            invVal: data[i]['invVal'],
                            mccode: data[i]['mccode'],
                            mcid: data[i]['mcid'],
                            pcode: data[i]['pcode'],
                            pid: data[i]['pid'],
                            qty: data[i]['qty'],
                        }
                        masterData.push(D);
                        
                    }
                    
                   this.setState({ masterData: masterData });
                   this.getCompanies();
                    
                }

            }
            ).catch(error => {
                console.log("error > ", error);
            });
    }

   

    getCompanies(){
        let masterData=this.state.masterData;
        console.log("masterData > ",masterData);
        let customers=[];
        let FYs=[];
           for(let i=0;i<masterData.length;i++){
                let C={
                    custId:masterData[i]['custId'],
                    custName:masterData[i]['custName'],
                };
                
                if(customers.filter(value=> value.custId==C.custId).length > 0){
                   // console.log("True");
                }else{
                    // console.log("False");
                    customers.push(C);
                }
                if(FYs.filter(value=> value==masterData[i].fy).length > 0){
                   // console.log("True");
                }else{
                    //console.log("False");
                    FYs.push(masterData[i].fy);
                }                
           }

          

           console.log("============================");
           console.log("tableHeader : ",FYs);
           console.log("customers : ",customers);
           console.log("============================");
           this.setState({customers:customers,tableHeader:FYs,ProgressLoader:true});
    }

    getTotalByFY(fy,item){
        let masterData=this.state.masterData; 
       
        let total=0.00;
        for(let i=0;i<masterData.length;i++){
            if(masterData[i]['fy']==fy  && masterData[i]['custId']==item.custId){
                console.log("FY --> ",masterData[i]['fy']);
                console.log("masterData[i] --> ",masterData[i]);
                total=parseFloat(total)+parseFloat(masterData[i]['fcval']);
            }
        }

        return total.toFixed(2);
    }

    getEntireTotalByFY(fy){
        let masterData=this.state.masterData; 
        let customers=this.state.customers;  
        let total=0.00;
        for(let c=0;c<customers.length;c++){
            for(let i=0;i<masterData.length;i++){
                if(masterData[i]['fy']==fy  && masterData[i]['custId']==customers[c].custId){
                    console.log("FY --> ",masterData[i]['fy']);
                    console.log("masterData[i] --> ",masterData[i]);
                    total=parseFloat(total)+parseFloat(masterData[i]['fcval']);
                }
            }
        }
        

        return total.toFixed(2);
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
                <div className="marginTop">
                    <Drawer />
                </div>
                <main className={useStyles.content}>
                    <Toolbar />
                    <div style={{ marginLeft: 250, marginTop: 50 }}>
                    
                    
                   
                    {this.state.ProgressLoader===false?(<div style={{marginTop:-20,marginLeft:-10}}><LinearProgress style={{backgroundColor: '#ffeb3b'}} /> </div>):null} 
                        <h1>Report Test</h1>
                        

                        <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                            <Table stickyHeader  size="small" className="" aria-label="company List table">
                                <TableRow>
                                <TableCell className="table-header-font">Customer Name</TableCell>  
                                {this.state.tableHeader.map((item, i) => (                                  
                                    <TableCell className="table-header-font">{item}</TableCell>                                   
                                ))}                                   
                                </TableRow>
                                <TableBody className="tableBody">
                                    {this.state.customers.map((item, i) => (                                       
                                        <TableRow key={"customer"+i}>                                       
                                            <TableCell className="table-header-font">{item.custName}</TableCell>
                                            {this.state.tableHeader.map((fy, i) => (                                  
                                                <TableCell className="table-header-font">{this.getTotalByFY(fy,item)}</TableCell>                                   
                                            ))}  
                                        </TableRow>
                                    ))}  
                                    
                                    <TableRow  key={"total"}>                                       
                                    <TableCell className="table-header-font"><b>TOTAL</b></TableCell>
                                    
                                    {this.state.tableHeader.map((fy, i) => (                                  
                                        <TableCell className="table-header-font">{this.getEntireTotalByFY(fy)}</TableCell>                                   
                                    ))}  
                                    </TableRow>
                                    
                                </TableBody>
                            </Table>
                        </TableContainer>
                       

                    </div>
                </main>
            </Fragment>
        )
    }

} export default report1;