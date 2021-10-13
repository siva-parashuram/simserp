import '../../user/dasboard.css';
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import InfoIcon from '@mui/icons-material/Info';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import moment from "moment";
import branchlogo from "../../../logo.png";

class branchquickdetails extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
           showDetails:true,
           showAttachments:false,
           detailsUnderlineBtnCss:"btn-bottom-border-color",  //btn-bottom-border-color
           attachmentUnderlineBtnCss:""
        };
    }
    render() {
        const customTabButton=(e,params)=>{
            if(params==="details"){
                this.setState({showDetails:true,showAttachments:false,detailsUnderlineBtnCss:"btn-bottom-border-color",attachmentUnderlineBtnCss:""});
            }
            if(params==="attachments"){
                this.setState({showDetails:false,showAttachments:true,attachmentUnderlineBtnCss:"btn-bottom-border-color",detailsUnderlineBtnCss:""});
            }
        }

        const openPage=(url)=>{
            console.log("url > ",url);
             
            this.setState({ProgressLoader:false});
            window.location = url;
        }

        return (
            <Fragment>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{backgroundColor:'#fff'}}>
                    <ButtonGroup variant="text" aria-label="text button group">                        
                        <Button 
                        startIcon={<InfoIcon />}
                        className={this.state.detailsUnderlineBtnCss}
                        onClick={(e)=>customTabButton(e,"details")}>Details</Button>
                        <Button 
                        startIcon ={<AttachFileIcon/>}
                        className={this.state.attachmentUnderlineBtnCss}                       
                        onClick={(e)=>customTabButton(e,"attachments")}>Attachments</Button> 
                        <Button 
                        // startIcon ={<AttachFileIcon/>}                                               
                        onClick={(e)=>openPage(this.props.new)}>New</Button> 
                        <Button 
                        // startIcon ={<AttachFileIcon/>}                                               
                        onClick={(e)=>openPage(this.props.edit)}>Edit</Button>  
                                          
                    </ButtonGroup>
                    </Grid>                   
                </Grid>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={11} lg={11} style={{ backgroundColor: '#fff' }}>
                        <div style={{ height: 20 }}></div>
                    </Grid>
                </Grid>               
                <Grid container spacing={0}>
                    {this.state.showDetails===true?(
                          <Grid xs={12} sm={12} md={11} lg={11} style={{backgroundColor:'#fff'}} >
                          {console.log("props > branchItem > ",this.props.branchItem)}
                         <TableContainer>
                             <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                                 <TableBody className="tableBody">
                                 <TableRow>
                                         <TableCell align="left" className="no-border-table">&nbsp;</TableCell>
                                         <TableCell align="right" className="no-border-table">
                                             <img className="mini-branch-logo-css" src={branchlogo} />
                                         </TableCell>
                                     </TableRow>
                                 <TableRow>
                                         <TableCell align="left" className="no-border-table">Effective Date</TableCell>
                                         <TableCell align="right" className="no-border-table"> {this.props.branchItem.effectiveDate?moment(this.props.branchItem.effectiveDate).format("MM/DD/YYYY"):"-"}</TableCell>
                                     </TableRow>
                                     <TableRow>
                                         <TableCell align="left" className="no-border-table">Name</TableCell>
                                         <TableCell align="right" className="no-border-table">{this.props.branchItem.name}</TableCell>
                                     </TableRow>
                                     <TableRow>
                                         <TableCell align="left" className="no-border-table">Address</TableCell>
                                         <TableCell align="right" className="no-border-table">{this.props.branchItem.address} {this.props.branchItem.address2} {this.props.branchItem.address3}</TableCell>
                                     </TableRow>
                                     <TableRow>
                                         <TableCell align="left" className="no-border-table">Phone No</TableCell>
                                         <TableCell align="right" className="no-border-table">{this.props.branchItem.phoneNo}</TableCell>
                                     </TableRow>
                                     <TableRow>
                                         <TableCell align="left" className="no-border-table">Website</TableCell>
                                         <TableCell align="right" className="no-border-table">{this.props.branchItem.website}</TableCell>
                                     </TableRow>
                                     
                                 </TableBody>
                             </Table>
                         </TableContainer>
                     </Grid>
                    ):null}
                    {this.state.showAttachments===true?(
                        <Grid xs={12} sm={12} md={11} lg={11} style={{backgroundColor:'#fff'}} >
                         
                       <TableContainer>
                           <Table stickyHeader size="small" className="accordion-table" aria-label="table">
                               <TableBody className="tableBody">
                                   <TableRow>
                                       <TableCell align="left" className="no-border-table">Attachment 1</TableCell>                                        
                                   </TableRow>
                                   <TableRow>
                                       <TableCell align="left" className="no-border-table">Attachment 2</TableCell>                                        
                                   </TableRow>                                    
                               </TableBody>
                           </Table>
                       </TableContainer>
                   </Grid>
                    ):null}
                  
                </Grid>
            </Fragment>
        )
    }
}
export default branchquickdetails;