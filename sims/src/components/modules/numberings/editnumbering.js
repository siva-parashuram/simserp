import React, { Fragment } from 'react';
import axios from "axios";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Button from '@material-ui/core/Button';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TextField from '@material-ui/core/TextField';


import LinearProgress from '@material-ui/core/LinearProgress';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';

import { COOKIE, getCookie } from "../../../services/cookie";
import * as APIURLS from "../../../routes/apiconstant";
import * as URLS from "../../../routes/constants";
import '../../user/dasboard.css';
import Nav from "../../user/nav";
import Menubar from "../../user/menubar";

import moment from "moment";



class editnumbering extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            lastLno:null,
            urlparams: "",
            GeneralDetailsExpanded: true,
            NumberingsListExpanded: false,
            ProgressLoader: true,
            initialCss: "",
            branchId: 0,
            numberings: [],
            startdate: "2021-10-06",
            noSeries: {  
                NoSeriesId: 0,
                Code: null,
                Description: null,
                BranchId: 0,
                UserId: 0,
                CreationDate: null,
            },
            noSeriesDetailList: {
                id: 1,
                NoSeriesId: 0,
                Lno: 1,
                StartDate: null,
                Prefix: null,
                StartNo: 0,
                Suffix: null,
                Increment: 0,
                LastNo: 0,
                LastNoDate: null,
            }
        }
    }

    componentDidMount() {
        let USERID = getCookie(COOKIE.USERID);
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let noSeriesId = url.searchParams.get("noSeriesId");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
            branchId: branchId
        });
        this.getNumberingList(branchId, USERID, noSeriesId);
    }

    getNumberingList(branchId, USERID, noSeriesId) {

        let ValidUser = APIURLS.ValidUser;
        ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
        ValidUser.Token = getCookie(COOKIE.TOKEN);
        const headers = {
            "Content-Type": "application/json"
        };
        let Url = APIURLS.APIURL.GetNoSeriesByNoSeriesId;

        let data = {
            ValidUser: ValidUser,
            NoSeriesId: parseInt(noSeriesId)
        };
        axios.post(Url, data, { headers })
            .then(response => {
                let data = response.data;
                console.log("getList > response > data > ", data);
                if (response.status === 200) {
                    let d = {
                        NoSeriesId: data.noSeries.noSeriesId,
                        Code: data.noSeries.code,
                        Description: data.noSeries.description,
                        BranchId: data.noSeries.branchId,
                        UserId: data.noSeries.userId,
                        CreationDate: data.noSeries.creationDate,
                    };
                    let noSeries = d;

                    let noSeriesDetailList = [];
                    for (let i = 0; i < data.noSeriesDetailList.length; i++) {
                        let l = {
                            id: i,
                            NoSeriesId: data.noSeriesDetailList[i].noSeriesId,
                            Lno: data.noSeriesDetailList[i].lno,
                            StartDate: moment(data.noSeriesDetailList[i].startDate).format("YYYY-MM-DD"),
                            Prefix: data.noSeriesDetailList[i].prefix,
                            StartNo: data.noSeriesDetailList[i].startNo,
                            Suffix: data.noSeriesDetailList[i].suffix,
                            Increment: data.noSeriesDetailList[i].increment,
                            LastNo: data.noSeriesDetailList[i].lastNo,
                            LastNoDate: data.noSeriesDetailList[i].lastNoDate,
                        };
                        noSeriesDetailList.push(l);
                    }

                    let lastLno=noSeriesDetailList.at(-1).Lno;

                    this.setState({
                        lastLno:lastLno,
                        noSeries: noSeries,
                        numberings: noSeriesDetailList,
                        ProgressLoader: true
                    });
                } else {
                    this.setState({
                        numberings: [],
                        ProgressLoader: true,
                        ErrorPrompt: true
                    });
                }

            }
            ).catch(error => {
                console.log("error > ", error);
                this.setState({
                    numberings: [],
                    ProgressLoader: true,
                    ErrorPrompt: true
                });
            });


        //    let noSeries=this.state.noSeries;
        //    noSeries.BranchId=parseInt(branchId);
        //    noSeries.UserId=parseInt(USERID);

        // this.setState({ numberings: N,noSeries:noSeries });
    }





    render() {


        const handleAccordionClick = (val, e) => {

            if (val === "GeneralDetailsExpanded") {
                this.state.GeneralDetailsExpanded === true ? this.setState({ GeneralDetailsExpanded: false }) : this.setState({ GeneralDetailsExpanded: true })
            }
            if (val === "NumberingsListExpanded") {
                this.state.NumberingsListExpanded === true ? this.setState({ NumberingsListExpanded: false }) : this.setState({ NumberingsListExpanded: true })
            }
        }

        const updateFormValue = (id, e) => {
            console.log("In updateFormValue");
            let noSeries = this.state.noSeries;
            if (id === "Code") {
                noSeries.Code = e.target.value;
                this.setState({ noSeries: noSeries });
            }
            if (id === "Description") {
                noSeries.Description = e.target.value;
                this.setState({ noSeries: noSeries });
            }


        }

        const updateStartDate = (date, item) => {
            let numberings = this.state.numberings;
            for (let i = 0; i < numberings.length; i++) {
                if (numberings[i].id === item.id) {
                    numberings[i].StartDate = date;
                }
            }
            this.setState({ numberings: numberings });
        }

        const updateListValue = (param, item, id, nextid, e) => {
            // console.log("In updateFormValue");
            // console.log(" > id > ", id);
            // console.log(" > nextid > ", nextid);
            // console.log(" > e > ", e);
            // console.log(" > e.key > ", e.key);
            if (e.key === 'Enter') {
                // console.log('do validate');
                let value = document.getElementById(id).value;
                // console.log('> value > ', value);
                if (value === "" || value === null) {
                    // alert("Cannot be blank!");                    
                } else {
                    // console.log('In OK > value > ', value);

                    updateNumberingListState(param, item, id, e);

                    if (nextid === "newline") {
                        // alert("Creating next Line.");
                        creatNewLine();
                    } else {
                        document.getElementById(nextid).focus();
                    }
                }
            }

        }

        const updateNumberingListState = (param, item, id, e) => {
            let numberings = this.state.numberings;
            console.log('====================================');
            console.log('updateNumberingListState > item : ', item);
            console.log('updateNumberingListState > id : ', id);
            console.log('updateNumberingListState > e : ', e);
            console.log('updateNumberingListState > e.target : ', e.target);
            console.log('updateNumberingListState > e.target.value : ', e.target.value);
            console.log('====================================');
            for (let i = 0; i < numberings.length; i++) {
                if (numberings[i].id === item.id) {
                    if (param === "Increment") {
                        numberings[i][param] = parseInt(e.target.value);
                    } else {
                        numberings[i][param] = e.target.value;
                    }

                }
            }
            this.setState({ numberings: numberings });
        }

        const creatNewLine = () => {
            let N = this.state.numberings;
            let newLno=N.at(-1).Lno+1;
            let newID = N.length + 1;
            let numberings = {
                id: newID,
                NoSeriesId: parseInt(this.state.noSeries.NoSeriesId) ,
                Lno: newLno,
                StartDate: null,
                Prefix: null,
                StartNo: null,
                Suffix: null,
                Increment: null,
                LastNo: null,
                LastNoDate: null,
            };

            N.push(numberings);
            this.setState({ numberings: N }, () => {
                document.getElementById("startdate" + newID).focus();
            });

        }

        const deleteEntry = (e, item) => {
            let numberings = this.state.numberings;
            let newNumberings = [];
            for (let i = 0; i < numberings.length; i++) {
                if (numberings[i].id === item.id) {

                } else {
                    newNumberings.push(numberings[i]);
                }
            }
            this.setState({ numberings: newNumberings });

        }

        const formatData = () => {
            let noSeriesDetailList = this.state.numberings;

            for (let i = 0; i < noSeriesDetailList.length; i++) {
                noSeriesDetailList[i].startdate = moment(noSeriesDetailList[i].startdate).format("MM/DD/YYYY");
            }

            return noSeriesDetailList;
        }

        const handleUpdate = (e) => {
            this.setState({ ProgressLoader: false });
            let ValidUser = APIURLS.ValidUser;
            ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
            ValidUser.Token = getCookie(COOKIE.TOKEN);

            let noSeries = this.state.noSeries;
            let noSeriesDetailList = formatData();
            let BranchId = this.state.branchId;
            const data = {
                validUser: ValidUser,
                noSeries: noSeries,
                BranchId: parseInt(BranchId),
                noSeriesDetailList: noSeriesDetailList
            };
            const headers = {
                "Content-Type": "application/json"
            };
            let Url = APIURLS.APIURL.UpdateNoSeries;
            console.log("handleCreateData >   ", data);


            axios.post(Url, data, { headers })
                .then(response => {
                    let data = response.data;
                    console.log("handleCreate > response > data > ", data);
                    if (response.status === 200 || response.status === 201) {
                        this.setState({ ProgressLoader: true, SuccessPrompt: true });
                    } else {
                        this.setState({ ProgressLoader: true, ErrorPrompt: true });
                    }

                }
                ).catch(error => {
                    console.log("error > ", error);
                    this.setState({ ProgressLoader: true, ErrorPrompt: true });
                });


        }


        const closeErrorPrompt = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({ ErrorPrompt: false });
        }

        const closeSuccessPrompt = (event, reason) => {
            if (reason === 'clickaway') {
                return;
            }
            this.setState({ SuccessPrompt: false });
        }

        function Alert(props) {
            return <MuiAlert elevation={6} variant="filled" {...props} />;
        }

        return (
            <Fragment>
                <Nav />
                <Menubar />

                {this.state.ProgressLoader === false ? (<div style={{ marginTop: 0, marginLeft: -10 }}><LinearProgress style={{ backgroundColor: '#ffeb3b' }} /> </div>) : null}

                <Snackbar open={this.state.SuccessPrompt} autoHideDuration={3000} onClose={closeSuccessPrompt}>
                    <Alert onClose={closeSuccessPrompt} severity="success">Success!</Alert>
                </Snackbar>

                <Snackbar open={this.state.ErrorPrompt} autoHideDuration={3000} onClose={closeErrorPrompt}>
                    <Alert onClose={closeErrorPrompt} severity="error">Error!</Alert>
                </Snackbar>

                <div style={{ marginLeft: 10, marginTop: 10 }}>
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <Breadcrumbs aria-label="breadcrumb">
                                <Link color="inherit" className="backLink" onClick={this.props.history.goBack}>
                                    Back
                                </Link>
                                <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                    Dashboard
                                </Link>
                                <Link color="inherit" href={URLS.URLS.numberingMaster + this.state.urlparams} >
                                    Numbering Master
                                </Link>
                                <Typography color="textPrimary">Add Numbering </Typography>
                            </Breadcrumbs>

                        </Grid>
                    </Grid>
                    <Grid container spacing={3}>
                        <Grid xs={1}>
                            <Button
                                style={{ marginLeft: 5 }}
                                onClick={(e) => handleUpdate(e)}
                            >
                                Update
                            </Button>
                        </Grid>
                    </Grid>
                    <div style={{ height: 20 }}></div>
                    <Grid container spacing={0}>
                        <Grid xs={12} sm={12} md={10} lg={10}>
                            <Accordion key="numbering-General-Details" expanded={this.state.GeneralDetailsExpanded} >
                                <AccordionSummary
                                    className="accordion-Header-Design"
                                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("GeneralDetailsExpanded", e)} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ minHeight: 20, height: '100%' }}
                                >
                                    <Typography key="" className="accordion-Header-Title">General Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails key="">
                                    <TableContainer>
                                        <Table stickyHeader size="small" className="accordion-table" aria-label="company List table">
                                            <TableBody className="tableBody">
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b>Code</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="Code"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Code', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}
                                                            value={this.state.noSeries["Code"]}

                                                        />
                                                    </TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" className="no-border-table">
                                                        <b> Description</b>
                                                    </TableCell>
                                                    <TableCell align="left" className="no-border-table">
                                                        <TextField
                                                            id="Description"
                                                            variant="outlined"
                                                            size="small"
                                                            onChange={(e) => updateFormValue('Description', e)}
                                                            fullWidth
                                                            InputProps={{
                                                                className: "textFieldCss",
                                                                maxlength: 50
                                                            }}
                                                            value={this.state.noSeries.Description}
                                                        />
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>

                                </AccordionDetails>
                            </Accordion>
                            <Accordion key="numbering-list-Details" expanded={this.state.NumberingsListExpanded} >
                                <AccordionSummary
                                    className="accordion-Header-Design"
                                    expandIcon={<ExpandMoreIcon onClick={(e) => handleAccordionClick("NumberingsListExpanded", e)} />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                    style={{ minHeight: 20, height: '100%' }}
                                >
                                    <Typography key="" className="accordion-Header-Title">Numberings Details</Typography>
                                </AccordionSummary>
                                <AccordionDetails key="">
                                    <Grid container spacing={1}>
                                        <Grid xs={12} sm={12} md={12} lg={12}>
                                            <table>
                                                <thead>
                                                    <tr style={{ textAlign: 'center' }} >
                                                        <td className="table-header-font">&nbsp;</td>
                                                        <td className="table-header-font">Start Date</td>
                                                        <td className="table-header-font">Start No</td>
                                                        <td className="table-header-font">Suffix</td>
                                                        <td className="table-header-font">Prefix</td>
                                                        <td className="table-header-font">Increment</td>
                                                        <td className="table-header-font">Last No</td>
                                                        <td className="table-header-font">&nbsp;</td>
                                                    </tr>
                                                </thead>
                                                <tbody>

                                                    {this.state.numberings.map(
                                                        (item, i) => (
                                                            <tr>

                                                                <td><ArrowRightIcon /></td>
                                                                <td>

                                                                    <TextField
                                                                        type="date"
                                                                        id={"startdate" + item.id}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        defaultValue={item.StartDate}
                                                                        onChange={(e) => updateStartDate(e.value, item)}
                                                                        onKeyDown={(e) => updateListValue("startdate", item, 'startdate' + item.id, 'startno' + item.id, e)}
                                                                        style={{ width: 125 }}
                                                                        InputProps={{
                                                                            className: "textFieldCss"
                                                                        }}

                                                                    />
                                                                </td>
                                                                <td>
                                                                    <TextField
                                                                        type="number"
                                                                        id={"startno" + item.id}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        onKeyUp={(e)=>updateNumberingListState("startno", item, "startno" + item.id, e)}
                                                                        onKeyDown={(e) => updateListValue("startno", item, 'startno' + item.id, 'suffix' + item.id, e)}
                                                                        style={{ width: 120 }}
                                                                        InputProps={{
                                                                            className: "textFieldCss"
                                                                        }}
                                                                        defaultValue={item.StartNo}
    
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <TextField
                                                                        id={"suffix" + item.id}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        onKeyUp={(e)=>updateNumberingListState("suffix", item, "suffix" + item.id, e)}
                                                                        onKeyDown={(e) => updateListValue("suffix", item, 'suffix' + item.id, 'prefix' + item.id, e)}
                                                                        style={{ width: 120 }}
                                                                        InputProps={{
                                                                            className: "textFieldCss"
                                                                        }}
                                                                        defaultValue={item.Suffix}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <TextField
                                                                        id={"prefix" + item.id}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        onKeyUp={(e)=>updateNumberingListState("prefix", item, "prefix" + item.id, e)}
                                                                        onKeyDown={(e) => updateListValue("prefix", item, 'prefix' + item.id, 'Increment' + item.id, e)}
                                                                        style={{ width: 120 }}
                                                                        InputProps={{
                                                                            className: "textFieldCss"
                                                                        }}
                                                                        defaultValue={item.Prefix}
                                                                    />
                                                                </td>
                                                                <td>
                                                                    <TextField
                                                                        type="number"
                                                                        id={"Increment" + item.id}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        onKeyUp={(e)=>updateNumberingListState("Increment", item, "Increment" + item.id, e)}
                                                                        onKeyDown={(e) => updateListValue("Increment", item, 'Increment' + item.id, 'newline', e)}
                                                                        style={{ width: 120 }}
                                                                        InputProps={{
                                                                            className: "textFieldCss"
                                                                        }}
                                                                        defaultValue={item.Increment}
                                                                    />
                                                                </td>
                                                                <td>
                                                                
                                                                    <TextField
                                                                        type="number"
                                                                        id={"lastno" + item.id}
                                                                        variant="outlined"
                                                                        size="small"
                                                                        style={{ width: 120 }}
                                                                        InputProps={{
                                                                            className: "textFieldCss",

                                                                        }}
                                                                        disabled={true}
                                                                        value={item.LastNo}
                                                                    />
                                                                </td>
                                                                <td>
                                                                

                                                                    {item.Lno > this.state.lastLno ? <DeleteForeverIcon
                                                                        fontSize="small"
                                                                        className="table-delete-icon"
                                                                        onClick={(e) => deleteEntry(e, item)}
                                                                    /> : null}

                                                                    {i === this.state.numberings.length - 1 ? (
                                                                        <AddIcon
                                                                            fontSize="small"
                                                                            className="table-add-icon"
                                                                            onClick={(e) => creatNewLine()}
                                                                        />
                                                                    ) : null}

                                                                </td>
                                                            </tr>

                                                        )
                                                    )}
                                                </tbody>
                                            </table>
                                        </Grid>
                                    </Grid>
                                </AccordionDetails>
                            </Accordion>

                        </Grid>
                        <Grid xs={12} sm={12} md={7} lg={7}>
                            <Grid container spacing={0}>
                                <Grid xs={12} sm={12} md={11} lg={11}>

                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </div>
            </Fragment>
        )
    }

}
export default editnumbering;