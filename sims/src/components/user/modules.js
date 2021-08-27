import './dasboard.css';
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Typography from '@material-ui/core/Typography';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';


class modules extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userID: ""
        };


    }

    componentDidMount() {

    }



    render() {
        const useStyles = makeStyles((theme) => ({


        }));


        const handleAccordion=(menu1)=>{

        }

        return (
            <Fragment >
            
                <Accordion className="menu-accordion">
                    <AccordionSummary
                        expandIcon={<ExpandMoreIcon style={{color:'#616161'}}/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography style={{color:'#616161'}}>This is Menu Header</Typography>
                    </AccordionSummary>
                    <AccordionDetails  style={{color:'#616161'}}>
                        <List component="nav" aria-label="" style={{ width: '100%' }}>
                            <ListItem button>
                               <ArrowForwardIosIcon style={{fontSize:15}}/> Sub Menu 1
                            </ListItem>
                            <ListItem button>
                            <ArrowForwardIosIcon style={{fontSize:15}}/> Sub Menu 2
                            </ListItem>
                        </List>
                    </AccordionDetails>
                </Accordion>


            </Fragment>
        );
    }
}

export default modules;