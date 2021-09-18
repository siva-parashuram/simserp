import React from "react";
import { Switch,Route,BrowserRouter as Router } from "react-router-dom";
import * as URLS from "./constants";
 
 
import LoginPage from "../components/login";

import userDashboard from "../components/user/userDashboard"; 
import testReport from "../components/reports/testReport";
import companyMaster from "../components/modules/admin/companyMaster"; 
import addNewCompany from "../components/modules/company/addnewcompany";
import editCompany from "../components/modules/company/editcompany";
import report1 from "../components/modules/reports/report1";
import countryMaster from "../components/modules/country/countryMaster";
import addCountry from "../components/modules/country/addcountry";
import editCountry from "../components/modules/country/editcountry";
import stateMaster from "../components/modules/country/statemaster";
import addState from "../components/modules/country/addstate";
import editState from "../components/modules/country/editstate";
import adddestination from "../components/modules/country/adddestination";
import editDestination from "../components/modules/country/editdestination";
import userMaster from "../components/modules/user/usermaster";
import addUser from "../components/modules/user/adduser";
import editUser from "../components/modules/user/edituser";

let routes = ({ location, ...rest }) => {
  return (
    <Router>
       
    <Switch>
    <Route path={URLS.URLS.LoginPage} exact  component={LoginPage} />
    <Route path={URLS.URLS.userDashboard}  component={userDashboard} />
    <Route path={URLS.URLS.testReport}  component={testReport} />

    {/*  Company Routes  */}
    <Route path={URLS.URLS.companyMaster}  component={companyMaster} />
    <Route path={URLS.URLS.addNewCompany}  component={addNewCompany} />
    <Route path={URLS.URLS.editCompany}  component={editCompany} />

  {/*  Country Routes  */}
    <Route path={URLS.URLS.countryMaster}  component={countryMaster} />
    <Route path={URLS.URLS.addCountry}  component={addCountry} />
    <Route path={URLS.URLS.editCountry}  component={editCountry} />

     {/*  State Routes  */}
     <Route path={URLS.URLS.stateMaster}  component={stateMaster} />
     <Route path={URLS.URLS.addState}  component={addState} />
     <Route path={URLS.URLS.editState}  component={editState} />

     <Route path={URLS.URLS.addDestination}  component={adddestination} />
     <Route path={URLS.URLS.editDestination}  component={editDestination} />


        {/*  User Master Routes  */}
        <Route path={URLS.URLS.userMaster}  component={userMaster} />
        <Route path={URLS.URLS.addUser}  component={addUser} />
        <Route path={URLS.URLS.editUser}  component={editUser} />

    <Route path={URLS.URLS.report1}  component={report1} />
    </Switch>   
    </Router>
  );
};
export default routes;