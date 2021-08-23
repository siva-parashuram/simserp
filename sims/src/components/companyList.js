import React, { Fragment } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

import * as URLS from "../routes/constants";


class CompanyList extends React.Component {

    componentDidMount() {

    }

    render() {
        const useStyles = makeStyles((theme: Theme) =>
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
                    margin: theme.spacing(1),
                }
            }),
        );

        return (
            <Fragment>
                {
                    this.props.state.userCompanyList.map((item, i) => (
                        <>
                            <Accordion key={"branch_" + i}>
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ backgroundColor: '#00838f ', color: '#fff' }}
                                >
                                    <Typography className={useStyles.heading}>{item.compName}</Typography>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography>
                                        <Button
                                            key={"branch_btn_" + i}
                                            size="small"
                                            variant="outlined"
                                            className={useStyles.button}
                                            startIcon={<ArrowForwardIosIcon fontSize="small" />}
                                        >
                                            <Link to={URLS.URLS.userDashboard} target="_blank">   {item.compName} </Link>
                                        </Button>
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>
                        </>
                    ))
                }
            </Fragment>
        );
    }
}

export default CompanyList;