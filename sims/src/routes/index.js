import React from "react";
import { Switch, Redirect, Route,BrowserRouter as Router } from "react-router-dom";
import * as URLS from "./constants";
 
//Auth Layouts
import LoginPage from "../components/login";
 
 
//List Of Pages
import userDashboard from "../components/user/userDashboard";
 
import testReport from "../components/reports/testReport";



let routes = ({ location, ...rest }) => {
  return (
    <Router>
       
    <Switch>
    <Route path={URLS.URLS.LoginPage} exact  component={LoginPage} />
    <Route path={URLS.URLS.userDashboard}  component={userDashboard} />
    <Route path={URLS.URLS.testReport}  component={testReport} />
    </Switch>
    
      { /*
      <RouteWithLayout
        exact
        path={URLS.URLS.userDashboard}
        layout={DashboardLayout}
        title="User Dashboard"
        location={location}
        component={userDashboard}
        {...rest}
      />

      */
    }
      
      
     
      
      {/* {<Redirect from="/*" to="/page-not-found" />} */}
    </Router>
  );
};
export default routes;