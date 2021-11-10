import React, { Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from "@material-ui/core/Button";
import InfoIcon from '@mui/icons-material/Info';
import AddIcon from "@material-ui/icons/Add";
import '../user/dasboard.css';


class dualtabcomponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tab1UnderlineBtnCss: "btn-bottom-border-color",
            tab2UnderlineBtnCss: "",
            showTab1: true,
            showTab2: false,
        }
    }
    componentDidMount() { }
    render() {
        const customTabButton = (e, params) => {
            if (params === "tab1") {
                this.setState({ showTab1: true, showTab2: false, tab1UnderlineBtnCss: "btn-bottom-border-color", tab2UnderlineBtnCss: "" });
            }
            if (params === "tab2") {
                this.setState({ showTab1: false, showTab2: true, tab2UnderlineBtnCss: "btn-bottom-border-color", tab1UnderlineBtnCss: "" });
            }
        }

        return (
            <Fragment>
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={12} lg={12} style={{ backgroundColor: '#fff' }}>
                        <ButtonGroup variant="text" aria-label="text button group">
                            <Button
                                startIcon={<InfoIcon />}
                                className={this.state.tab1UnderlineBtnCss}
                                onClick={(e) => customTabButton(e, "tab1")}>{this.props.tab1name}</Button>
                            <Button
                                startIcon={<AddIcon />}
                                className={this.state.tab2UnderlineBtnCss}
                                onClick={(e) => customTabButton(e, "tab2")}>{this.props.tab2name}</Button>
                        </ButtonGroup>
                    </Grid>
                </Grid>
                <div style={{height:10}}>&nbsp;</div>   
                <Grid container spacing={0}>
                    {this.state.showTab1 === true ? (
                        <Fragment>
                            {this.props.tab1Html}
                        </Fragment>
                    ) : null}
                    {this.state.showTab2 === true ? (
                        <Fragment>
                            {this.props.tab2Html}
                        </Fragment>
                    ) : null}
                </Grid>
            </Fragment>
        )
    }

}
export default dualtabcomponent;

