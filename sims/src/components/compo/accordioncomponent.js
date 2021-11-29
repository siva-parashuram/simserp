import React, { Fragment } from 'react';
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Typography from "@material-ui/core/Typography";
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import '../user/dasboard.css';


class accordioncomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }
    componentDidMount() { }
    render() {
        
        const HtmlTooltip = styled(({ className, ...props }) => (
            <Tooltip {...props} classes={{ popper: className }} />
          ))(({ theme }) => ({
            [`& .${tooltipClasses.tooltip}`]: {
              backgroundColor: '#e0f2f1',
              color: 'rgba(0, 0, 0, 0.87)',
              maxWidth: 220,
              fontSize: theme.typography.pxToRem(12),
              border: '1px solid #dadde9',
            },
          }));

        return (
            <Fragment>
                <HtmlTooltip title={this.props.tooltip?this.props.tooltip:this.props.typography} placement="right">
                <Accordion
                    key={this.props.accordionKey}
                    expanded={this.props.expanded}
                    className="accordionD"
                >

                    <AccordionSummary
                        className="accordion-Header-Design"
                        expandIcon={<ExpandMoreIcon onClick={this.props.onClick} />}
                        aria-controls="panel1a-content"
                        id={this.props.id}
                        style={{ minHeight: "40px", maxHeight: "40px" }}
                        onClick={this.props.onClick}
                    >
                        <Typography
                            key={this.props.typographyKey}
                            className="accordion-Header-Title"
                        >{this.props.typography}</Typography>
                    </AccordionSummary>
                    <AccordionDetails
                    style={this.props.style}
                    key={this.props.accordiondetailsKey} className="AccordionDetails-css">                        
                        {this.props.html}
                    </AccordionDetails>
                </Accordion>
                </HtmlTooltip>
               
            </Fragment>
        )
    }

}
export default accordioncomponent;

