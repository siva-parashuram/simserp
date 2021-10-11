import '../../user/dasboard.css';
import { COOKIE, getCookie } from "../../../services/cookie";
import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Badge from '@mui/material/Badge';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
 


import { styled } from '@mui/material/styles';
 


class notification extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notifications: [],
            notificationCleared: false
        };
    }



    componentDidMount() {
        this.getNotifications();
    }

    getNotifications() {
        let N = [
            { id: 1, name: "Purchase Order from", details: { by: "Siva Tec Ltd (UK)", action: "create Sales Order" }, view: true },
            { id: 2, name: "Requested for Sales Order", details: "", view: true }
        ];
        this.setState({ notifications: N });
    };

    render() {
        const StyledBadge = styled(Badge)(({ theme }) => ({
            '& .MuiBadge-badge': {
                right: -12,
                top:12,
                padding: '0 4px',
                color: '#fff',
                backgroundColor: '#f44336',
                

            },
        }));

        const StyledAccordionSummary = styled({
            root: {
                minHeight: 15,
                maxHeight: 15,
                // backgroundColor: '#009688',
                '&.Mui-expanded': {
                  minHeight: 15,
                  maxHeight: 15,
                //   backgroundColor: '#a5a5a5',
                }
            },
            expandIcon: {
                order: -1
            }
            });

        const hideThisAlert = (item, e) => {
            let notifications = this.state.notifications;
            let notificationCleared = false;
            for (let i = 0; i < notifications.length; i++) {

                if (item.id === notifications[i].id) {
                    notifications[i].view = false;
                }

            }
            let ct = 0;
            for (let i = 0; i < notifications.length; i++) {
                if (notifications[i].view === false) {
                    ct++;
                }
            }
            if (ct === notifications.length) {
                notificationCleared = true;
            }

            this.setState({ notifications: notifications, notificationCleared: notificationCleared });
        }


        return (
            <Fragment>
                <div style={{ marginLeft: 15, marginTop: 5 }}>
                    <Grid container spacing={1}>
                        <Grid item xs={1} sm={1}></Grid>
                        <Grid item xs={10} sm={10}>
                           
                            {this.state.notifications.length>0 && this.state.notificationCleared === false ? (
                                <Accordion defaultExpanded={true} square={true}>
                                    <AccordionSummary
                                        
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="notify-accordion-header"
                                        style={{ 
                                            minHeight: 30,
                                            maxHeight: 30,
                                            backgroundColor: '#e8eaf6', 
                                        }}
                                    >

                                        <Typography>
                                            <StyledBadge
                                                badgeContent={this.state.notifications.length}
                                            >
                                                Notifications
                                            </StyledBadge>
                                        </Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <Stack sx={{ width: '100%' }} spacing={2}>
                                            {this.state.notifications.map((item, i) => (
                                                <Fragment>
                                                    {item.view === true ? <Alert 
                                                    className="notification-alert" 
                                                    severity="info" 
                                                    onClose={(e) => hideThisAlert(item, e)} >
                                                        {item.name} 
                                                        {
                                                        item.details.action==="" || item.details.action==null?"":(<Fragment> <b>{item.details.by}</b> - <a href="">{item.details.action}</a></Fragment>) }                                                   
                                                    
                                                    </Alert> : null}

                                                </Fragment>
                                            ))}
                                        </Stack>
                                        <br />
                                    </AccordionDetails>
                                </Accordion>
                            ) : null}

                        </Grid>
                        <Grid item xs={1} sm={1}></Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
export default notification;