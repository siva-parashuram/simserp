// const domain="http://103.86.176.85:81/";
const domain="http://192.168.10.200:8080/";
export const APIURL = {
    // Login: domain+"WebService.asmx/Login",
    Login: domain+"api/users/login",
    Logout:domain+"api/users/Logout",
    addNewCompany:domain+"api/Company/CreateCompany",
    GetCompanies:domain+"api/Company/GetCompanies",
    GetCompany:domain+"api/Company/GetCompany",
    UpdateCompany:domain+"api/Company/UpdateCompany",
    getTempData:domain+"api/TempData/getTempData",
    DeleteCompany:domain+"api/Company/DeleteCompany",
    GetCountries:domain+"api/Country/GetCountries",
    CreateCountry:domain+"api/Country/CreateCountry",
    DeleteCountry:domain+"api/Country/DeleteCountry",
    UpdateCountry:domain+"api/Country/UpdateCountry",
    GetCountry:domain+"api/Country/GetCountry",
    GetZones:domain+"api/Zone/GetZones"
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
