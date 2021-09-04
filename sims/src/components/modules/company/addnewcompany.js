import React, { Fragment } from 'react';
import '../../user/dasboard.css';
import * as URLS from "../../../routes/constants";
import * as APIURLS from "../../../routes/apiconstant";  
import { COOKIE, getCookie } from "../../../services/cookie";
import Nav from "../../user/nav";
import Drawer from "../../user/drawer";
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import axios from "axios";

class addnewcompany extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
        };
        this.wrapper = React.createRef();
    }

    componentDidMount() {
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
            urlparams: urlparams,
        });
    }

    render() {
        const useStyles = makeStyles((theme) => ({
            root: {
                display: 'flex',
            },
            appBar: {
                zIndex: theme.zIndex.drawer + 1,
            },
        }));


        const handleCreateCompanyClick = (e) => {

            let companyName=document.getElementById("companyName").value;
            let address = document.getElementById("Address").value;
            let address2 = document.getElementById("Address2").value;
            let address3 = document.getElementById("Address3").value;
            let country = document.getElementById("countrySelect").value;
            let state = document.getElementById("stateSelect").value;
            let city = document.getElementById("citySelect").value;
            let postcode = document.getElementById("Postcode").value;
            let phoneno = document.getElementById("PhoneNo").value;
            let website = document.getElementById("Website").value;

            let user={
                loginId:  getCookie(COOKIE.USERID),
                token: getCookie(COOKIE.TOKEN)
            };

            let companyDetails={
                "companyId": 0,
                "companyName": companyName,
                "address": address,
                "address2": address2,
                "address3": address3,
                "city": city,
                "postcode": postcode,
                "countryId": country,
                "stateId": state,
                "phoneNo": phoneno,
                "website": website,
                // "creationDate": null
            
            };

            console.log("companyName > ",companyName);
            console.log("address > ",address);
            console.log("address2 > ",address2);
            console.log("address3 > ",address3);
            console.log("country > ",country);
            console.log("state > ",state);
            console.log("city > ",city);
            console.log("postcode > ",postcode);
            console.log("phoneno > ",phoneno);
            console.log("website > ",website);

            let chkFields = true;
            if (chkFields === false) { } else {

                const data = {
                   user:user,
                   companyDetails:companyDetails
                };

                const headers = {
                    "Content-Type": "application/json"
                };
                let addNewCompanyUrl = APIURLS.APIURL.addNewCompany;
                console.log("In handleCreateCompanyClick > addNewCompanyUrl > ", addNewCompanyUrl);
                console.log("In handleCreateCompanyClick > data > ", data);
                /*
                                axios.post(loginUrl, data, { headers })
                                    .then(response => {
                                        console.log("response > ", response);
                                        if (response.status === 200) {
                
                                        } else {
                
                
                                        }
                                    }
                                    ).catch(error => {
                
                                    });
                */
            }
        };


        return (
            <Fragment>
                <Nav />
                <Drawer />
                <main className={useStyles.content}>
                    <Toolbar />
                    <div style={{ marginLeft: 250 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link color="inherit" href={URLS.URLS.userDashboard + this.state.urlparams} >
                                        Dashboard
                                    </Link>
                                    <Link color="inherit" href={URLS.URLS.companyMaster + this.state.urlparams}>
                                        Company master
                                    </Link>
                                    <Typography color="textPrimary">Add New Company</Typography>
                                </Breadcrumbs>

                            </Grid>
                        </Grid>

                        <div style={{ height: 50 }}></div>

                        <Grid container spacing={3}>
                            <Grid item xs={8}>
                                <Grid container spacing={3}>
                                    <Grid item xs={5}>
                                        <TextField
                                            id="companyName"
                                            label="Company Name"
                                            variant="outlined"
                                            size="small"
                                            // onChange={(e) => updateCompanyMasterDetail('Address', e)}
                                            fullWidth

                                        />
                                    </Grid>
                                </Grid>


                                <Grid container spacing={3}>

                                    <Grid item xs={4}>
                                        <TextField
                                            id="Address"
                                            label="Address"
                                            variant="outlined"
                                            size="small"
                                            // onChange={(e) => updateCompanyMasterDetail('Address', e)}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="Address2"
                                            label="Address 2"
                                            variant="outlined"
                                            size="small"
                                            // onChange={(e) => updateCompanyMasterDetail('Address2', e)}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <TextField
                                            id="Address3"
                                            label="Address 3"
                                            variant="outlined"
                                            size="small"
                                            // onChange={(e) => updateCompanyMasterDetail('Address3', e)}
                                            fullWidth
                                            multiline
                                            rows={4}
                                        />
                                    </Grid>
                                </Grid>


                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <InputLabel id="Country-select-label">Country</InputLabel>
                                        <Select
                                            variant="outlined"
                                            labelId="Country-select-label"
                                            id="countrySelect"
                                            // value={}
                                            // onChange={handleChange}
                                            label="Country"
                                            fullWidth
                                        >
                                            <MenuItem value="-">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>India</MenuItem>
                                            <MenuItem value={20}>UK</MenuItem>
                                            <MenuItem value={30}>UAE</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <InputLabel id="State-select-label">State</InputLabel>
                                        <Select
                                            variant="outlined"
                                            labelId="State-select-label"
                                            id="stateSelect"
                                            // value={}
                                            // onChange={handleChange}
                                            label="State"
                                            fullWidth
                                        >
                                            <MenuItem value="-">
                                                <em>None</em>
                                            </MenuItem>
                                            <MenuItem value={10}>Goa</MenuItem>
                                            <MenuItem value={20}>Gujrat</MenuItem>
                                            <MenuItem value={30}>Delhi</MenuItem>
                                        </Select>
                                    </Grid>
                                    <Grid item xs={3}>
                                    <TextField
                                            id="citySelect"
                                            label="City"
                                            variant="outlined"
                                            size="small"
                                            // onChange={(e) => updateCompanyMasterDetail('Address', e)}
                                            fullWidth

                                        />
                                       
                                    </Grid>
                                    <Grid item xs={2}>
                                        <TextField
                                            style={{ marginTop: 30 }}
                                            id="Postcode"
                                            label="Post Code"
                                            variant="outlined"
                                            size="small"
                                            // onChange={(e) => updateCompanyMasterDetail('Postcode', e)}
                                            fullWidth />
                                    </Grid>
                                </Grid>


                                <Grid container spacing={3}>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="PhoneNo"
                                            label="Phone No"
                                            variant="outlined"
                                            size="small"
                                            // onChange={(e) => updateCompanyMasterDetail('PhoneNo', e)}
                                            fullWidth />
                                    </Grid>
                                    <Grid item xs={3}>
                                        <TextField
                                            id="Website"
                                            label="Website"
                                            variant="outlined"
                                            size="small"

                                            fullWidth />
                                    </Grid>
                                </Grid>
                                <Grid container spacing={3}>
                                    <Grid item xs={6}>
                                        &nbsp;
                                    </Grid>
                                    <Grid item xs={6} style={{ textAlign: 'right' }}>
                                        <Button
                                            variant="outlined"
                                            style={{ backgroundColor: '#9e9e9e' }}
                                            size="small"
                                            onClick={handleCreateCompanyClick}
                                        >Create</Button>
                                    </Grid>
                                </Grid>

                            </Grid>
                            <Grid item xs={4}>
                                Hi2
                            </Grid>
                        </Grid>

                    </div>
                </main>
            </Fragment>
        );
    }


}
export default addnewcompany;