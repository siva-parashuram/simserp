// const domain="http://103.86.176.85:81/";
const domain="http://192.168.10.200:8080/";
export const APIURL = {
    // Login: domain+"WebService.asmx/Login",
    Login: domain+"api/users/login",
    Logout:domain+"api/users/Logout",
    addNewCompany:domain+"api/Company/CreateCompany",
    GetCompanies:domain+"api/Company/GetCompanies",
  };


  export let ValidUser={
    UserID: null,
    Token :null
  };

  export let company={
    "CompanyID":null,
    "CompanyName": null,
    "Address": null,
    "Address2": null,
    "Address3": null,
    "City": null,
    "Postcode": null,
    "CountryID": null,
    "StateID": null,
    "PhoneNo": null,
    "Website": null,
    "CreationDate": null
};
