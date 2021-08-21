import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CTimeOut } from "../services/api/constants";
 
import * as URLS from "./constants.js";

import { COOKIE, createCookie, deleteCookie, getCookie } from "../services/cookie"; 

/**
 *
 * @param {Object} Route parameters
 * @description Route parameters must contain layout, component and other props. Layout has to be the master oage.
 */
 export default ({ layout, component, roles, ...rest }) => {
  let cookie = getCookie(COOKIE.ID_TOKEN);
  // //role = getCookie(COOKIE.ROLE);
 
  //var decoded = token ? JWT(token) : "";
  //var role = decoded ? decoded.roles[0] : "";
  if (!cookie ) {
    deleteCookie(COOKIE.ID_TOKEN);
    console.log("Routing cookie empty...");
    return <Redirect to={URLS.URLS.LoginPage} />;
    
  } 
  else {
    createCookie(COOKIE.ID_TOKEN, getCookie(COOKIE.ID_TOKEN), CTimeOut);
    console.log("Routing properly...");
    return (
      <Route
        {...rest}
        render={(props) =>
          React.createElement(
            layout,
            { ...props, ...rest },
            React.createElement(component, { ...props, ...rest })
          )
        }
      />
    );
  }
};

