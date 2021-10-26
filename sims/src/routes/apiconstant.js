// const domain="http://192.168.10.106:44356/";
const domain="http://192.168.10.200:8080/";
export const APIURL = {   
    FileDownloadTEST:domain+"api/Common/FileDownload",
    FTPUPLOAD:domain+"api/Common/FileUpload", 
    FTPFILELIST:domain+"api/Common/ListOfFilesFromFTP",
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
    GetZones:domain+"api/Zone/GetZones",
    GetSate:domain+"api/State/GetSate",
    GetStateByCountryId:domain+"api/State/GetStateByCountryId",
    GetStates:domain+"api/State/GetStates",
    CreateState:domain+"api/State/CreateState",
    UpdateState:domain+"api/State/UpdateState",
    GetDestinationByCountryId:domain+"api/Destination/GetDestinationByCountryId",
    GetDestinations:domain+"api/Destination/GetDestinations",
    GetDestination:domain+"api/Destination/GetDestination",
    UpdateDestination:domain+"api/Destination/UpdateDestination",
    CreateDestination:domain+"api/Destination/CreateDestination",
    GetDestinationByCountryIdAndStateId:domain+"api/Destination/GetDestinationByCountryIdAndStateId",
    GetUsers:domain+"api/users/GetUsers",
    AddUser:domain+"api/users/CreateUser",
    GetUser:domain+"api/users/GetUser",
    UpdateUser:domain+"api/users/UpdateUser",
    GetBraches:domain+"api/Branch/GetBraches",
    GetBranch:domain+"api/Branch/GetBranch",
    UpdateBranch:domain+"api/Branch/UpdateBranch",
    CreateBranch:domain+"api/Branch/CreateBranch",
    CreateUserBranchMapping:domain+"api/UserBranchMapping/CreateUserBranchMapping",
    GetUserBranchMappedByUserID:domain+"api/UserBranchMapping/GetUserBranchMappedByUserID",
    CreateModule:domain+"api/Module/CreateModule",
    UpdateModule:domain+"api/Module/UpdateModule",
    GetModules:domain+"api/Module/GetModules",
    GetModule:domain+"api/Module/GetModule",
    CreatePage:domain+"api/Page/CreatePage",
    GetPages:domain+"api/Page/GetPages",
    GetPageByModuleId:domain+"api/Page/GetPageByModuleId",
    UpdatePage:domain+"api/Page/UpdatePage",
    UpdateModuleIdByPageID:domain+"api/Page/UpdateModuleIdByPageID",
    UpdatePageByModuleIdAndPageID:domain+"api/Page/UpdatePageByModuleIdAndPageID",
    GetRoles:domain+"api/Role/GetRoles",
    CreateRole:domain+"api/Role/CreateRole",
    GetRoleDetailByRoleId:domain+"api/RoleDetail/GetRoleDetailByRoleId",
    CreateRoleDetail:domain+"api/RoleDetail/CreateRoleDetail",
    GetAllUserPermission:domain+"api/UserPermission/GetAllUserPermission",
    GetUserPermissionByUserIDAndBranchID:domain+"api/UserPermission/GetUserPermissionByUserIDAndBranchID",
    CreateUserPermission:domain+"api/UserPermission/CreateUserPermission",
    GetUserPermissionByRoleId:domain+"api/UserPermission/GetUserPermissionByRoleId",
    GetWareHouses:domain+"api/WareHouse/GetWareHouses",
    CreateWareHouse:domain+"api/WareHouse/CreateWareHouse",
    UpdateWareHouse:domain+"api/WareHouse/UpdateWareHouse",
    GetWareHouse:domain+"api/WareHouse/GetWareHouse",
    GetCurrencies:domain+"api/Currency/GetCurrencies", 
    CreateCurrency:domain+"api/Currency/CreateCurrency",
    CreateNoSeries:domain+"api/NoSeriesDetails/CreateNoSeries",
    GetAllNoSeriesByBranchId:domain+"api/NoSeriesDetails/GetAllNoSeriesByBranchId",
    GetNoSeriesByNoSeriesId:domain+"api/NoSeriesDetails/GetNoSeriesByNoSeriesId",
    UpdateNoSeries:domain+"api/NoSeriesDetails/UpdateNoSeries",
    CreateItem:domain+"api/ItemMaster/CreateItem",
    UpdateItem:domain+"api/ItemMaster/UpdateItem",
    GetAllItems:domain+"api/ItemMaster/GetAllItems",
    GetItem:domain+"api/ItemMaster/GetItem",
  };

  export const CTimeOut = 10; 
  export const DFormat = "MM/DD/YYYY";

  export let ItemType=[
    {
      name:"Finish Good",
      value:0
    },{
      name:"Raw Material",
      value:1
    },{
      name:"Work In Progres",
      value:2
    }
  ];

 

  export const TrasactionType={
    PO:"",
    SO:"",
    
    default:""
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


export let page={  
    PageId: 0,
    ModuleId: 0,
    PageName: null,
    PageLink: null,
    Description: null, 
};

export let UpdateModuleIdByPageID = {
  validUser: ValidUser,
  page: null
};

export let CreateModuleData={
  validUser: null,
  Module: null
};

export let CreateRoleData={
  validUser:null,
  Role:null
};

export let GetRoleDetailByRoleIdData={
  validUser: null,
  RoleId: null,
  RoleDetailList: null
};

export let CreateRoleDetailData={
  validUser: null,
  RoleId: null,
  RoleDetailLists: null
};

export let userPermissionLists = {
  UserId: 0,
  RoleId: 0,
  PageId: 0,
  BranchId: 0,
  IsCreate: false,
  IsUpdate: false,
  IsDelete: false,
  IsView: false,
  IsPrint: false,
  CreationDate: null,
}

export let GetAllUserPermissionData={
  validUser: null,
  BranchId: null,
  UserId: null,
  // userPermissionLists :null
  };


 
