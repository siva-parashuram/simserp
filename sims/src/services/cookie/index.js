// "use strict";

/**************************************
 * operations related to cookie
 ***************************************/

var cookie = {  
  TOKEN:"TOKEN",
  FIRSTNAME: "FIRSTNAME",
  LASTNAME: "LASTNAME", 
  USERID: "USERID",
  LOGINID: "LOGINID",
  CHANGEPASSWORD: "CHANGEPASSWORD",
  LOGO: "LOGO",
  BRANCH_NAME: "BRANCH_NAME",
  ISADMIN:'ISADMIN',
  LOGINTIME:'LOGINTIME',
  COMPANYNAME:'',
  BRANCHID:'',
  BRANCHNAME:'' ,
  COMPANYLIST:[],
  BRANCH_OPEN:[]
};

// create cookie by name with specific path, domain and expiry time (if paased)
function createCookie(name, value, hours, path, domain) {
  //var cookie = name + "=" + escape(value) + ";";
  var cookie = name + "=" + value + ";";
  // if (expires) {
  //   // If it's a date
  //   if (expires instanceof Date) {
  //     // If it isn't a valid date
  //     if (isNaN(expires.getTime())) expires = new Date();
  //   } else
  //     expires = new Date(
  //       new Date().getTime() + parseInt(expires) * 1000 * 60 * 60
  //     );
  //   cookie += "expires=" + expires.toGMTString() + ";";
  // }
  var expires = "";
  if (hours) {
    var date = new Date();
    date.setTime(date.getTime() + hours * 60 * 60 * 1000);
    expires = "; expires=" + date.toGMTString();
  } else {
    expires = "";
  }
  cookie += expires + ";";

  if (path) cookie += "path=" + path + ";";
  if (domain) cookie += "domain=" + domain + ";";

  if (typeof window !== "undefined") {
    document.cookie = cookie;
  }
}

// get cookie value from name
function getCookie(name) {
  var nameEQ = name + "=";
  var ca;
  if (typeof window !== "undefined") {
    ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
  }
  return null;
}

// delete specific cookie by name
function deleteCookie(name, path, domain) {
  // If the cookie exists
  if (getCookie(name)) {
    //createCookie(name, '', -1, path, domain);
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:01 GMT;path=/";
  }
}

module.exports = {
  COOKIE: cookie,
  createCookie: createCookie,
  getCookie: getCookie,
  deleteCookie: deleteCookie,
};
