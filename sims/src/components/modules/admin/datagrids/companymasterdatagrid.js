import '../../../user/dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../../../services/cookie";
import * as URLS from "../../../../routes/constants";

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

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
 

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
import * as APIURLS from "../../../../routes/apiconstant";

import axios from "axios";

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
            UpdateCompany:true,
            urlparams:""
        };


    }

    componentDidMount() {
        this.getCompanyList();
        this.setColumns();
        var url = new URL(window.location.href);
        var branchId = url.searchParams.get("branchId");
        var branchName = url.searchParams.get("branchName");
        var compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({            
            urlparams: urlparams,
        });   
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
        /*
        let rows = [
            {
                id: 226,
                sno: 1,
                company: "Siva Goa",
                address: "N-6, Verna Industrial Area, Phase IV, Verna,Goa - 403722, INDIA",
                branchList:[{branchID:1,branchName:"Siva IOT"}]
            },
            {
                id: 115,
                sno: 2,
                company: "Siva Tec Ltd",
                address: "Unit 3, Princes Drive Industrial Estate, Princes Drive, Kenilworth, Warwickshire, CV8 2FD, UK.",
                branchList:[{branchID:2,branchName:"Siva Teck UK"}]
            }
        ];
*/

        let rows=[];

        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
          "Content-Type": "application/json"
        };
        let GetCompaniesUrl = APIURLS.APIURL.GetCompanies;       
       
        axios.post(GetCompaniesUrl, ValidUser, { headers })
          .then(response => {           
            let data=response.data;
            console.log("getCompanyList > response > data > ",data);
            rows=data;
            this.setState({ masterCompanyData:rows,companyData: rows });
          }
          ).catch(error => {            
            console.log("error > ",error);
          });

        
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
                    if(
                     masterCompanyData[i].companyName!=null?masterCompanyData[i].companyName.toLowerCase().includes(key):null || 
                     masterCompanyData[i].address!=null?masterCompanyData[i].address.toLowerCase().includes(key):null ||
                     masterCompanyData[i].companyId!=null?masterCompanyData[i].companyId.toString().toLowerCase().includes(key):null
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
            console.log("openCompanyDetail > e > ",e);
            console.log("openCompanyDetail > item > ",item);
           
        }

        const handleClose = (reason) => {
            if(reason==='YES'){
                this.setState({companyDialogStatus:false});
            }
            
          };

        const updateCompanyMasterDetail=(key,e)=>{
             console.log("updateCompanyMasterDetail > key > ",key);
             console.log("updateCompanyMasterDetail > e > ",e.target);
        }  

        return (
            <div style={{ height: 300, width: '100%' }}>
            <div style={{ height: 20 }}> </div>
            <div style={{marginLeft:2}}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                Dashboard
                            </Link>
                            <Typography color="textPrimary">   Company master</Typography>
                        </Breadcrumbs>

                    </Grid>
                </Grid>
                </div>
                <div style={{ height: 20 }}> </div>              
                   
               
                <div style={{ marginLeft: 2 }}>
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
                            <Button 
                            style={{marginLeft:5}} 
                            startIcon={<AddIcon />} 
                           // onClick={(e)=>createNewCompanyRow()}
                            >
                            <a className="button-link" href={URLS.URLS.addNewCompany+this.state.urlparams}>
                              New
                            </a>
                            
                            </Button>
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
                                            <TableCell className="table-header-font">#</TableCell>
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
                                                    <a className="LINK tableLink" href={URLS.URLS.editCompany+this.state.urlparams+"&compID="+item.companyId} onClick={(e)=>openCompanyDetail(e,item)}>C{item.companyId}</a>
                                                </TableCell>
                                                <TableCell align="left">
                                                    <a className="LINK tableLink" href={URLS.URLS.editCompany+this.state.urlparams+"&compID="+item.companyId} onClick={(e)=>openCompanyDetail(e,item)}>{item.companyName}</a>
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
                    <Grid xs={4}>
                     <div style={{marginLeft:10,marginTop:20}}>

                     <Grid container spacing={0}>
                        <Grid xs={12}>
                         <h4>Branch Lists</h4>
                        </Grid>
                        <Grid xs={12}>
                        <Table stickyHeader size="small" className="" aria-label="company List table">
                        <TableHead className="table-header-background">
                            <TableRow>
                                <TableCell className="table-header-font">#</TableCell>
                                <TableCell className="table-header-font" align="left">Branch</TableCell>
                                
                            </TableRow>
                        </TableHead>
                        <TableBody className="tableBody">
                            {this.state.companyData.map((item, i) => (
                                <TableRow 
                                id={"row_"+i}
                                className={this.state.initialCss}
                                hover
                                key={i}
                                //onClick={(event) => handleRowClick(event,item,"row_"+i)}
                                >
                                    <TableCell align="left">
                                        <a className="LINK tableLink" href={URLS.URLS.editCompany+this.state.urlparams+"&compID="+item.id} onClick={(e)=>openCompanyDetail(e,item)}>{item.id}</a>
                                    </TableCell>
                                    <TableCell align="left">
                                        <a className="LINK tableLink" href={URLS.URLS.editCompany+this.state.urlparams+"&compID="+item.id} onClick={(e)=>openCompanyDetail(e,item)}>{item.company}</a>
                                    </TableCell>
                                     
                                </TableRow>
   
                            ))}
   
   
                        </TableBody>
                    </Table>
                
                        </Grid>
                     </Grid>

                    
                     </div>
                    </Grid>
                </Grid>


                <Dialog
                open={this.state.companyDialogStatus}
                onClose={(e)=>handleClose("NO")}
                fullWidth="lg"
                maxWidth="lg"
                style={{marginTop:-100}}
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
                  {this.state.UpdateCompany===true?(<span style={{fontSize:12,color:'#9e9e9e'}}> Edit</span>):(<span style={{fontSize:12,color:'#9e9e9e'}}> Add New</span>)}
                </DialogTitle>
                <DialogContent dividers>
               
                    <DialogContentText id="company-information">
                       {this.state.UpdateCompany===true?(
                           
                           <div style={{marginTop:10}}>
                            <div style={{ height: 50,marginLeft:10 }}>
                            Saving...
                            </div>
                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="CompanyName"
                                                label="Company Name"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => updateCompanyMasterDetail('CompanyName', e)}
                                                fullWidth />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="Address"
                                                label="Address"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => updateCompanyMasterDetail('Address', e)}
                                                fullWidth 
                                                multiline
                                                rows={4}
                                                />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="Address2"
                                                label="Address 2"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => updateCompanyMasterDetail('Address2', e)}
                                                fullWidth 
                                                multiline
                                                rows={4}
                                                />
                                        </Grid>
                                        <Grid item xs={4}>
                                            <TextField
                                                id="Address3"
                                                label="Address 3"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => updateCompanyMasterDetail('Address3', e)}
                                                fullWidth 
                                                multiline
                                                rows={4}
                                                />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <InputLabel id="Country-select-label">Country</InputLabel>
                                            <Select
                                                variant="outlined"
                                                labelId="Country-select-label"
                                                id="countrySelect"
                                                // value={}
                                                // onChange={handleChange}
                                                label="Country"
                                                fullWidth
                                            >
                                                <MenuItem value="-">
                                                    <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>India</MenuItem>
                                                <MenuItem value={20}>UK</MenuItem>
                                                <MenuItem value={30}>UAE</MenuItem>
                                            </Select>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <InputLabel id="State-select-label">State</InputLabel>
                                        <Select
                                            variant="outlined"
                                            labelId="State-select-label"
                                            id="stateSelect"
                                            // value={}
                                            // onChange={handleChange}
                                            label="State"
                                            fullWidth
                                        >
                                            <MenuItem value="-">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Goa</MenuItem>
                                            <MenuItem value={20}>Gujrat</MenuItem>
                                            <MenuItem value={30}>Delhi</MenuItem>
                                        </Select>
                                        </Grid>
                                        <Grid item xs={3}>
                                        <InputLabel id="City-select-label">City</InputLabel>
                                        <Select
                                            variant="outlined"
                                            labelId="City-select-label"
                                            id="citySelect"
                                            // value={}
                                            // onChange={handleChange}
                                            label="City"
                                            fullWidth
                                        >
                                            <MenuItem value="-">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Margao</MenuItem>
                                            <MenuItem value={20}>Noida</MenuItem>
                                            <MenuItem value={30}>Fujera</MenuItem>
                                        </Select>
                                        </Grid>
                                        <Grid item xs={2}>
                                            <TextField
                                            style={{marginTop:30}}
                                            id="Postcode"
                                            label="Post Code"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => updateCompanyMasterDetail('Postcode', e)}
                                            fullWidth />
                                        </Grid>
                                    </Grid>

                                    <Grid container spacing={3}>
                                        <Grid item xs={3}>
                                            <TextField
                                                id="PhoneNo"
                                                label="Phone No"
                                                variant="outlined"
                                                size="small"
                                                onChange={(e) => updateCompanyMasterDetail('PhoneNo', e)}
                                                fullWidth />
                                        </Grid>
                                        <Grid item xs={3}>
                                        <TextField
                                            id="Website"
                                            label="Website"
                                            variant="outlined"
                                            size="small"
                                            onChange={(e) => updateCompanyMasterDetail('Website', e)}
                                            fullWidth />
                                    </Grid>
                                    </Grid>
                           </div>
                       ):(
                           <div style={{marginTop:-15}}>                             

                           <Grid container spacing={3}>
                           <Grid item xs={4}>
                               <TextField
                                   id="CompanyName"
                                   label="Company Name"
                                   variant="outlined"
                                   size="small"
                                   onChange={(e) => updateCompanyMasterDetail('CompanyName', e)}
                                   fullWidth />
                           </Grid>
                       </Grid>

                       <Grid container spacing={3}>
                           <Grid item xs={4}>
                               <TextField
                                   id="Address"
                                   label="Address"
                                   variant="outlined"
                                   size="small"
                                   onChange={(e) => updateCompanyMasterDetail('Address', e)}
                                   fullWidth 
                                   multiline
                                   rows={4}
                                   />
                           </Grid>
                           <Grid item xs={4}>
                               <TextField
                                   id="Address2"
                                   label="Address 2"
                                   variant="outlined"
                                   size="small"
                                   onChange={(e) => updateCompanyMasterDetail('Address2', e)}
                                   fullWidth 
                                   multiline
                                   rows={4}
                                   />
                           </Grid>
                           <Grid item xs={4}>
                               <TextField
                                   id="Address3"
                                   label="Address 3"
                                   variant="outlined"
                                   size="small"
                                   onChange={(e) => updateCompanyMasterDetail('Address3', e)}
                                   fullWidth 
                                   multiline
                                   rows={4}
                                   />
                           </Grid>
                       </Grid>

                       <Grid container spacing={3}>
                           <Grid item xs={3}>
                               <InputLabel id="Country-select-label">Country</InputLabel>
                               <Select
                                   variant="outlined"
                                   labelId="Country-select-label"
                                   id="countrySelect"
                                   // value={}
                                   // onChange={handleChange}
                                   label="Country"
                                   fullWidth
                               >
                                   <MenuItem value="-">
                                       <em>None</em>
                                   </MenuItem>
                                   <MenuItem value={10}>India</MenuItem>
                                   <MenuItem value={20}>UK</MenuItem>
                                   <MenuItem value={30}>UAE</MenuItem>
                               </Select>
                           </Grid>
                           <Grid item xs={3}>
                           <InputLabel id="State-select-label">State</InputLabel>
                           <Select
                               variant="outlined"
                               labelId="State-select-label"
                               id="stateSelect"
                               // value={}
                               // onChange={handleChange}
                               label="State"
                               fullWidth
                           >
                               <MenuItem value="-">
                                   <em>None</em>
                               </MenuItem>
                               <MenuItem value={10}>Goa</MenuItem>
                               <MenuItem value={20}>Gujrat</MenuItem>
                               <MenuItem value={30}>Delhi</MenuItem>
                           </Select>
                           </Grid>
                           <Grid item xs={3}>
                           <InputLabel id="City-select-label">City</InputLabel>
                           <Select
                               variant="outlined"
                               labelId="City-select-label"
                               id="citySelect"
                               // value={}
                               // onChange={handleChange}
                               label="City"
                               fullWidth
                           >
                               <MenuItem value="-">
                                   <em>None</em>
                               </MenuItem>
                               <MenuItem value={10}>Margao</MenuItem>
                               <MenuItem value={20}>Noida</MenuItem>
                               <MenuItem value={30}>Fujera</MenuItem>
                           </Select>
                           </Grid>
                           <Grid item xs={2}>
                               <TextField
                               style={{marginTop:30}}
                               id="Postcode"
                               label="Post Code"
                               variant="outlined"
                               size="small"
                               onChange={(e) => updateCompanyMasterDetail('Postcode', e)}
                               fullWidth />
                           </Grid>
                       </Grid>

                       <Grid container spacing={3}>
                           <Grid item xs={3}>
                               <TextField
                                   id="PhoneNo"
                                   label="Phone No"
                                   variant="outlined"
                                   size="small"
                                   onChange={(e) => updateCompanyMasterDetail('PhoneNo', e)}
                                   fullWidth />
                           </Grid>
                           <Grid item xs={3}>
                           <TextField
                               id="Website"
                               label="Website"
                               variant="outlined"
                               size="small"
                               
                               fullWidth />
                       </Grid>
                       </Grid>
                       <Grid container spacing={3}>
                       <Grid item xs={6}>
                          &nbsp;
                        </Grid>
                        <Grid item xs={6} style={{textAlign:'right'}}>
                            <Button variant="outlined" style={{backgroundColor:'#9e9e9e'}} size="small">Create</Button>
                        </Grid>
                       </Grid>              
                          
                       
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