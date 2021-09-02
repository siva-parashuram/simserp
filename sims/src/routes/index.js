import React from "react";
import { Switch,Route,BrowserRouter as Router } from "react-router-dom";
import * as URLS from "./constants";
 
 
import LoginPage from "../components/login";

import userDashboard from "../components/user/userDashboard"; 
import testReport from "../components/reports/testReport";
import companyMaster from "../components/modules/admin/companyMaster";



let routes = ({ location, ...rest }) => {
  return (
    <Router>
       
    <Switch>
    <Route path={URLS.URLS.LoginPage} exact  component={LoginPage} />
    <Route path={URLS.URLS.userDashboard}  component={userDashboard} />
    <Route path={URLS.URLS.testReport}  component={testReport} />
    <Route path={URLS.URLS.companyMaster}  component={companyMaster} />
    </Switch>   
    </Router>
  );
};
export default routes;