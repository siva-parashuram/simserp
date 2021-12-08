import './loginPage.css';
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';


import Dialog from "@mui/material/Dialog";
import DialogActions from '@mui/material/DialogActions';
import DialogContentText from '@mui/material/DialogContentText';
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import { COOKIE, createCookie, deleteCookie, getCookie } from "../services/cookie";
import * as APIURLS from "../routes/apiconstant";
import * as URLS from "../routes/constants";
import * as CF from "../services/functions/customfunctions";

class CompanyList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            DialogStatus:false,
            branchName:null,
            url:null,
            compID:null, 
            compName:null, 
            branchName:null,
            name:null,
            branchId:null,
        }
    }

    componentDidMount() { }

    handleDialogClose=()=>{
        this.setState({DialogStatus:false});
    }

    resetBranchWindowOpen=()=>{
        CF.UPDATE_BRANCH_OPEN_REMOVE(this.state.branchId);     
        
     //   CF.ADD_NEW_BRANCH_OPEN(this.state.branchId);      
        // this.openBranchWindow(this.state.url, this.state.branchId, this.state.compID, this.state.compName, this.state.branchName, this.state.name);
        this.handleDialogClose();
    }

     openBranchWindow = (url, branchId, compID, compName, branchName, name) => {
        let branchBtnId = ("branchBtn_" + compID + "_" + branchId).toString();
        url = url + "?branchBtnId=" + branchBtnId + "&branchId=" + branchId + "&compID=" + compID + "&compName=" + compName + "&branchName=" + name;
        let randomnumber = Math.floor((Math.random() * 100) + 1);
        // window.open(url, '', 'fullscreen=yes');
        window.open(url,"_blank",'PopUp',randomnumber,'scrollbars=1,menubar=0, toolbar=no,resizable=1,width=500,height=400');
    }

    render() {

        const openBranchDashboard = (url, branchId, compID, compName, branchName, name) => {
            this.setState({
                branchId: branchId,
                url: url,
                compID: compID,
                compName: compName,
                branchName: branchName,
                name: name,
            });
            let isPresent = false;             
            isPresent=CF.CHECK_IF_BRANCH_IS_OPEN(branchId);
            console.log("isPresent > ",isPresent);
            if (isPresent === true) {
               //show prompt of branch  window already open
              
               this.setState({DialogStatus:true});
            } else {
                //if branch is not present add the branch id which is opening to storage and open the window
                CF.ADD_NEW_BRANCH_OPEN(branchId);
                this.openBranchWindow(url, branchId, compID, compName, branchName, name);
            }
        }

       



        const disableBranchButton = (branchBtnId) => {
            let BRANCH_OPEN = getCookie(COOKIE.BRANCH_OPEN);
            let branch = {
                branchBtnId: branchBtnId
            }
            if (BRANCH_OPEN === null) {
                BRANCH_OPEN = [];
                BRANCH_OPEN.push(branch);
                createCookie(COOKIE.BRANCH_OPEN, BRANCH_OPEN, APIURLS.CTimeOut);
                document.getElementById(branchBtnId).disabled = true;
            } else {
                BRANCH_OPEN.push(branch);
                createCookie(COOKIE.BRANCH_OPEN, BRANCH_OPEN, APIURLS.CTimeOut);
                document.getElementById(branchBtnId).disabled = true;
            }
        }

        return (
            <Fragment>

                {
                    this.props.state.userCompanyList ? this.props.state.userCompanyList.map((item, i) => (
                        <Fragment key={"branch__Frag1_" + item.compName}>
                            <Accordion key={"branch_" + item.compName}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ backgroundColor: '#39b54a  ', color: '#000' }}
                                >
                                    <Typography key={"branch__Typography1_" + item.compName} className="CompanyNameHeader">{item.compName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails key={"branch__AccordionDetails_" + i}>
                                    <Typography key={"branch__Typography_" + item.compName}>
                                        {item.branchList.map((branchItem, j) => (
                                            <Fragment key={"branch__Frag_" + j + branchItem.branchName}>
                                                <Button
                                                    id={"branchBtn_" + item.compID + "_" + branchItem.branchID}
                                                    key={"branch_btn_" + branchItem.branchName}
                                                    size="small"
                                                    variant="outlined"
                                                    className="branchListButton"
                                                    onClick={(e) => openBranchDashboard(URLS.URLS.userDashboard, branchItem.branchID, item.compID, item.compName, branchItem.branchName, branchItem.name)}
                                                >
                                                    {branchItem.branchName}
                                                </Button>
                                            </Fragment>
                                        ))}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Fragment>
                    )) : ""
                }


                <Dialog
                    open={this.state.DialogStatus}
                    onClose={() => this.handleDialogClose()}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        <span style={{ color: 'red' }}><div style={{marginTop:5}}><InsertEmoticonIcon /></div> Hi.This might be an operational mistake! </span>
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            <p style={{ color: 'rgb(1, 87, 155)' }}>
                             I guess your branch Window is already Open!
                            </p>

                            <p> 
                                Do you want to restart the session for <span><u><b>{this.state.branchName}</b></u></span>? 
                            </p>
                         
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleDialogClose()}>No</Button>
                        <Button onClick={() => this.resetBranchWindowOpen()} autoFocus>
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>


            </Fragment>
        );
    }
}

export default CompanyList;