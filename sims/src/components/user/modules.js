import './dasboard.css';
import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { COOKIE, getCookie } from "../../services/cookie"; 
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


class modules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: "",
            urlparams: "",
            moduleList:[
                {
                    moduleName:"Admin",
                    subMenus:[
                        {name:"Company Master",link:"companyMaster"},
                        {name:"Country Master",link:"countryMaster"},
                        {name:"State Master",link:"stateMaster"},
                        {name:"Module Master",link:"moduleMaster"}
                    ]
                },
                {
                    moduleName:"Reports",
                    subMenus:[{name:"Report 1",link:"report1"}]
                }
            ]
        };
    }

    componentDidMount() {
        if (
            getCookie(COOKIE.USERID) != null
        ) {
            this.setState({ isLoggedIn: true });
            var url = new URL(window.location.href);
            var branchId = url.searchParams.get("branchId");
            var branchName = url.searchParams.get("branchName");
            var compName = url.searchParams.get("compName");
            let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
            this.setState({
                branchName: branchName,
                branchId: branchId,
                compName: compName,
                urlparams: urlparams,
            });             
        } else {
            this.setState({ isLoggedIn: false });
        }
    }
    render() {


        return (
            <Fragment >
                <Fragment>
                {this.state.moduleList.map((item, i) => (
                    <Accordion key={"side-menu"+i} className="menu-accordion">
                    <AccordionSummary
                        key={"side-menu-AS"+i}
                        expandIcon={<ExpandMoreIcon style={{ color: '#616161' }} />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography style={{ color: '#616161' }}> {item.moduleName} </Typography>
                    </AccordionSummary>
                    <AccordionDetails  key={"side-menu-AD"+i} style={{ color: '#616161' }}>
                        <List  key={"side-menu-L"+i} component="nav" aria-label="" style={{ width: '100%' }}>
                        {item.subMenus.map((subitem,j)=>(
                            <ListItem  key={"side-menu-LI"+j} button>
                                <Link  key={"side-menu-LIL"+j} className="LINK" to={subitem.link + this.state.urlparams}>
                                    <ArrowForwardIosIcon  key={"side-menu-LILI"+i} style={{ fontSize: 15 }} /> {subitem.name}
                                </Link>
                            </ListItem>
                        ))}                           
                        
                        </List>
                    </AccordionDetails>
                </Accordion>   
                ))}
                    
                </Fragment>
            </Fragment>
        );
    }
}

export default modules;