import '../../../user/dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../../../services/cookie";


import { makeStyles } from '@material-ui/core/styles';

import { DataGrid } from '@material-ui/data-grid';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

 

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputAdornment from '@material-ui/core/InputAdornment';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import DeleteIcon from '@material-ui/icons/Delete'; 
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

let columns = [


];

let rows = [

];


const initialCss="";


class companymasterdatagrid extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            columns: columns,
            masterCompanyData:rows,
            companyData: rows,
            showSavedAlert: false,
            updatedValue: {
                id: 0,
                company: ""
            },
            selectedCompanyId: 0,
            initialCss:initialCss,
            DeleteDisabled:true,
            companyDialogStatus:false,
            UpdateCompany:true
        };


    }

    componentDidMount() {
        this.getCompanyList();
        this.setColumns();
    }

    handleCheckboxChange = (e, id) => {
        console.log("handleCheckboxChange > e > ", e);
        console.log("handleCheckboxChange > e.target > ", e.target);
        var elementCheckedChk = document.getElementById(id).checked;
        console.log("handleCheckboxChange > elementCheckedChk > ", elementCheckedChk);
        if (elementCheckedChk === true) {
            document.getElementById(id).checked = true;
        }
        if (elementCheckedChk === false) {
            document.getElementById(id).checked = false;
        }

    };

    setColumns() {
        let columns = [           
            { field: 'sno', headerName: 'sno', type: 'number', width: 100, editable: false, headerClassName: 'tbl-hdr-css', },
            { field: 'company', headerName: 'company', width: 300, editable: true, headerClassName: 'tbl-hdr-css', }
        ];

        this.setState({ columns: columns });
    }

    getCompanyList() {
        let rows = [
            {
                id: 226,
                sno: 1,
                company: "Siva Goa",
                address: "N-6, Verna Industrial Area, Phase IV, Verna,Goa - 403722, INDIA",
            },
            {
                id: 115,
                sno: 2,
                company: "Siva Tec Ltd",
                address: "Unit 3, Princes Drive Industrial Estate, Princes Drive, Kenilworth, Warwickshire, CV8 2FD, UK.",
            }
        ];
        this.setState({ masterCompanyData:rows,companyData: rows });
    }




    render() {

 

        const processSave = () => {
            //process post request and hideSaved Alert

            setTimeout(function () {
                this.setState({ showSavedAlert: false });
            }.bind(this), 3000);

        }


     
        
        const handleRowClick= (e,item,id) => {
            console.log("handleRowClick > e > ", e);
            console.log("handleRowClick > item > ", item);
            this.setState({DeleteDisabled:false});
            removeIsSelectedRowClasses();
            document.getElementById(id).classList.add('selectedRow');
        }

        const removeIsSelectedRowClasses=()=>{
            for(let i=0;i<this.state.companyData.length;i++){
                document.getElementById('row_'+i).className = '';                 
            }
        }

        const searchInput= (e) => {
            removeIsSelectedRowClasses();
            console.log("searchInput > e > ", e);
            console.log("searchInput > e.target > ", e.target);
            console.log("searchInput > e.value > ", e.value);
            let key=document.getElementById("searchBox").value;
            console.log("searchInput > key > ",key);
            sortAsPerKey(key);
            
        }

        const sortAsPerKey=(key)=>{
            key=key.toLowerCase();
            let rows=[];
            let masterCompanyData=this.state.masterCompanyData;
            if(key==="" || key ==null){
                this.setState({companyData:masterCompanyData}); 
            }else{
               
            for(let i=0;i<masterCompanyData.length;i++){
                    if(masterCompanyData[i].company.toLowerCase().includes(key) || 
                     masterCompanyData[i].address.toLowerCase().includes(key) ||
                     masterCompanyData[i].id.toString().toLowerCase().includes(key)
                     ){
                        rows.push(masterCompanyData[i]);
                    }           
            }
           this.setState({companyData:rows}); 
            }
                       
        }

        const createNewCompanyRow=()=>{
             this.setState({UpdateCompany:false,companyDialogStatus:true});
        }

        const openCompanyDetail=(e,item)=>{
            this.setState({UpdateCompany:true,companyDialogStatus:true});
        }

        const handleClose = (reason) => {
            if(reason==='YES'){
                this.setState({companyDialogStatus:false});
            }
            
          };

        return (
            <div style={{ height: 300, width: '100%' }}>
                <div style={{ height: 20 }}></div>
                <div style={{ marginLeft: 10 }}>
                    <Grid container spacing={0}>
                        <Grid xs={2}>
                        <TextField 
                        id="searchBox" 
                        placeholder="Search"
                        variant="outlined" 
                        size="small"
                        
                        InputProps={{
                            startAdornment: (
                              <InputAdornment position="start">
                                <SearchIcon />
                              </InputAdornment>
                            ),
                          }}
                        onKeyUp={searchInput}
                        fullWidth 
                        />
                        </Grid>
                        <Grid xs={1}>
                            <Button style={{marginLeft:5}} startIcon={<AddIcon />} 
                            onClick={(e)=>createNewCompanyRow()}
                            >New</Button>
                        </Grid>
                        <Grid xs={1}>
                            <Button style={{marginLeft:-20}} startIcon={<DeleteIcon  />} disabled={this.state.DeleteDisabled}>Delete</Button>
                        </Grid>
                        
                    </Grid>
                </div>
                <Grid container spacing={0}>
                    <Grid xs={8}>
                        <div style={{ marginTop: 20 }}>
                            <TableContainer component={Paper} style={{ maxHeight: 440 }}>
                                <Table stickyHeader size="small" className="" aria-label="company List table">
                                    <TableHead className="table-header-background">
                                        <TableRow>
                                            <TableCell className="table-header-font">No</TableCell>
                                            <TableCell className="table-header-font" align="left">Company Name</TableCell>
                                            <TableCell className="table-header-font" align="left">Address</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody className="tableBody">
                                        {this.state.companyData.map((item, i) => (
                                            <TableRow 
                                            id={"row_"+i}
                                            className={this.state.initialCss}
                                            hover
                                            key={i}
                                            onClick={(event) => handleRowClick(event,item,"row_"+i)}
                                            >
                                                <TableCell align="left">
                                                    <a className="LINK tableLink" href="javascript:Void(0);" onClick={(e)=>openCompanyDetail(e,item)}>{item.id}</a>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <a className="LINK tableLink" href="javascript:Void(0);" onClick={(e)=>openCompanyDetail(e,item)}>{item.company}</a>
                                                </TableCell>
                                                <TableCell align="left">
                                                    {item.address}
                                                </TableCell>
                                            </TableRow>

                                        ))}


                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </div>
                    </Grid>
                    <Grid xs={3}></Grid>
                </Grid>


                <Dialog
                open={this.state.companyDialogStatus}
                onClose={(e)=>handleClose("NO")}
                fullWidth="lg"
                maxWidth="lg"
                style={{marginTop:-450}}
                disableEscapeKeyDown
                >
                 
                    <IconButton
                     aria-label="close" 
                     onClick={(e)=>handleClose("YES")} 
                     style={{position:'absolute',marginLeft:1220}}>
                        <CloseIcon />
                    </IconButton>
                
                <DialogTitle id="company-dialog-title" onClose={(e)=>handleClose("YES")}>
                  Company Information |   
                  
                  {this.state.UpdateCompany===true?(<span style={{fontSize:12,color:'#9e9e9e'}}> Update</span>):(<span style={{fontSize:12,color:'#9e9e9e'}}> Add New</span>)}
                </DialogTitle>
                <DialogContent dividers>
                    <DialogContentText id="company-information">
                       {this.state.UpdateCompany===true?(
                           <div style={{marginTop:-15}}>
                               <h5>Updating company information</h5>
                           </div>
                       ):(
                           <div style={{marginTop:-15}}>
                                <h5>Adding New company information</h5>
                           </div>
                       )}
                         
                    </DialogContentText>
                </DialogContent>
                 
                
                </Dialog>






            </div>
        );
    }
}

export default companymasterdatagrid;