import React from "react";
import { Route, Redirect } from "react-router-dom";
import { CTimeOut } from "../services/api/constants";

import * as URLS from "./constants.js";

import {
  COOKIE,
  createCookie,
  deleteCookie,
  getCookie,
} from "../services/cookie";

/**
 *
 * @param {Object} Route parameters
 * @description Route parameters must contain layout, component and other props. Layout has to be the master oage.
 */
export default ({ layout, component, roles, ...rest }) => {
  let cookie = getCookie(COOKIE.USERID);
  // //role = getCookie(COOKIE.ROLE);

  //var decoded = token ? JWT(token) : "";
  //var role = decoded ? decoded.roles[0] : "";
  if (!cookie) {
    deleteCookie(COOKIE.USERID);

    return <Redirect to={URLS.URLS.LoginPage} />;
  } else {
    createCookie(COOKIE.USERID, getCookie(COOKIE.USERID), CTimeOut);

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
