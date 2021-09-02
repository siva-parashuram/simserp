import './loginPage.css';
import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as URLS from "../routes/constants";


class CompanyList extends React.Component {
    constructor(props) {
    super(props);
    this.wrapper = React.createRef();
  }

    componentDidMount() {

    }

    render() {
        const useStyles = makeStyles((theme) =>
            createStyles({
                root: {
                    '& .MuiTextField-root': {
                        margin: theme.spacing(1),
                        width: '25ch',

                    },
                },
                heading: {
                    fontSize: theme.typography.pxToRem(15),
                    fontWeight: theme.typography.fontWeightRegular,
                }, button: {
                    margin: theme.spacing(1)
                    
                }
            }),
        );


        const openBranchDashboard=(url,branchId,compName,branchName)=>{
              console.log("openBranchDashboard > url > ",url);
              url=url+"?branchId="+branchId+"&compName="+compName+"&branchName="+branchName;
            //   window.open(url,"Siva Group",'width=800,resizable=no, height=700, menubar=no, toolbar=no, location=no');
            let randomnumber = Math.floor((Math.random()*100)+1); 
            window.open(url,"_blank",'PopUp',randomnumber,'scrollbars=1,menubar=0, toolbar=no,resizable=1,width=500,height=400');
        }

        return (
            <Fragment>
            {console.log("this.props.state > ",this.props.state)}
            {console.log("this.props.state.userCompanyList > ",this.props.state.userCompanyList)}
                {
                   
                    this.props.state.userCompanyList.map((item, i) => (
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
                                        key={"branch_btn_" + branchItem.branchName}
                                        size="small"
                                        variant="outlined"
                                        className="branchListButton"
                                        onClick={(e)=>openBranchDashboard(URLS.URLS.userDashboard,branchItem.branchID,item.compName,branchItem.branchName)}
                                    >
                                        
                                        {branchItem.branchName}
                                    </Button> 
                                    </Fragment>
                                    ))}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </Fragment>
                    ))
                }
            </Fragment>
        );
    }
}

export default CompanyList;