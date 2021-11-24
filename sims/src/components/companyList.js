import './loginPage.css';
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'; 
 
import { COOKIE, createCookie, deleteCookie, getCookie } from "../services/cookie";
import * as APIURLS from "../routes/apiconstant";
import * as URLS from "../routes/constants";


class CompanyList extends React.Component {
    constructor(props) {
        super(props);
        this.state={}
    }

    componentDidMount() {}

    render() {
      
        const openBranchDashboard=(url,branchId,compID,compName,branchName)=>{  
            let isPresent=false;
            isPresent=checkIfBranchIsOpen(branchId);
            if(isPresent===true){
                alert("One instance is Already Running!");
            }else{
                let branchBtnId=("branchBtn_"+compID+"_"+branchId).toString();    
                //disableBranchButton(branchBtnId);                 
                url=url+"?branchBtnId="+branchBtnId+"&branchId="+branchId+"&compID="+compID+"&compName="+compName+"&branchName="+branchName;            
                let randomnumber = Math.floor((Math.random()*100)+1); 
                window.open(url,'','fullscreen=yes');
               // window.open(url,"_blank",'PopUp',randomnumber,'scrollbars=1,menubar=0, toolbar=no,resizable=1,width=500,height=400');
            }            
        }

        const checkIfBranchIsOpen=(branchId)=>{
            let isPresent=false;
            let BRANCH_OPEN=localStorage.getItem('BRANCH_OPEN');
            console.log("checkIfBranchIsOpen > BRANCH_OPEN > ",BRANCH_OPEN);
            if(BRANCH_OPEN===null || BRANCH_OPEN==="" || BRANCH_OPEN==="null"){
                BRANCH_OPEN=[];
                BRANCH_OPEN.push(branchId);
                if(BRANCH_OPEN.toString()==="0"){}else{
                    localStorage.setItem('BRANCH_OPEN', BRANCH_OPEN.toString());
                }
                
            }else{
                var existingBRANCH_OPEN = BRANCH_OPEN.split(",").map(Number);
                console.log("checkIfBranchIsOpen > existingBRANCH_OPEN > ",existingBRANCH_OPEN);
                
                for(let i=0;i<existingBRANCH_OPEN.length;i++){
                    if(existingBRANCH_OPEN[i]===parseInt(branchId)){
                        isPresent=true;
                        break;
                    }
                }
                if(isPresent===true){
                    // console.log("checkIfBranchIsOpen > branchId Already EXIST > ",branchId);
                }else{
                    existingBRANCH_OPEN.push(branchId);
                    localStorage.setItem('BRANCH_OPEN', existingBRANCH_OPEN.toString());
                    
                }
            }           
           return isPresent;
        }

        const disableBranchButton=(branchBtnId)=>{
            let BRANCH_OPEN=getCookie(COOKIE.BRANCH_OPEN);
            let branch={
                branchBtnId:branchBtnId
            }            
            if(BRANCH_OPEN===null){
                BRANCH_OPEN=[];
                BRANCH_OPEN.push(branch);
                createCookie(COOKIE.BRANCH_OPEN, BRANCH_OPEN,APIURLS.CTimeOut);
                document.getElementById(branchBtnId).disabled = true;
            }else{
                BRANCH_OPEN.push(branch);
                createCookie(COOKIE.BRANCH_OPEN, BRANCH_OPEN,APIURLS.CTimeOut);
                document.getElementById(branchBtnId).disabled = true;
            }            
        }

        return (
            <Fragment>  
              
                {
                   
                    this.props.state.userCompanyList?this.props.state.userCompanyList.map((item, i) => (
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
                                    {item.branchList.map((branchItem,j)=>(
                                        <Fragment key={"branch__Frag_"+j + branchItem.branchName}>
                                        <Button
                                        id={"branchBtn_"+item.compID+"_"+branchItem.branchID}
                                        key={"branch_btn_" + branchItem.branchName}
                                        size="small"
                                        variant="outlined"
                                        className="branchListButton"
                                        onClick={(e)=>openBranchDashboard(URLS.URLS.userDashboard,branchItem.branchID,item.compID,item.compName,branchItem.branchName)}
                                    >                                        
                                        {branchItem.branchName}
                                    </Button> 
                                    </Fragment>
                                    ))}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Fragment>
                    )):""
                }
            </Fragment>
        );
    }
}

export default CompanyList;