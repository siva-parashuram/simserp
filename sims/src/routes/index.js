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

    <Route path={URLS.URLS.report1}  component={report1} />
    </Switch>   
    </Router>
  );
};
export default routes;