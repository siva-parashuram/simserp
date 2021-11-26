import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BadgeIcon from '@mui/icons-material/Badge';


const domain = "http://192.168.10.200:8080/";

export const APIURL = {
  FileDownloadTEST: domain + "api/Common/FileDownload",
  FTPUPLOAD: domain + "api/Common/FileUpload",
  FTPFILELIST: domain + "api/Common/ListOfFilesFromFTP",
  Login: domain + "api/users/login",
  Logout: domain + "api/users/Logout",
  addNewCompany: domain + "api/Company/CreateCompany",
  GetCompanies: domain + "api/Company/GetCompanies",
  GetCompany: domain + "api/Company/GetCompany",
  UpdateCompany: domain + "api/Company/UpdateCompany",
  getTempData: domain + "api/TempData/getTempData",
  DeleteCompany: domain + "api/Company/DeleteCompany",
  GetCountries: domain + "api/Country/GetCountries",
  CreateCountry: domain + "api/Country/CreateCountry",
  DeleteCountry: domain + "api/Country/DeleteCountry",
  UpdateCountry: domain + "api/Country/UpdateCountry",
  GetCountry: domain + "api/Country/GetCountry",
  GetZones: domain + "api/Zone/GetZones",
  GetState: domain + "api/State/GetState",
  GetStateByCountryId: domain + "api/State/GetStateByCountryId",
  GetStates: domain + "api/State/GetStates",
  CreateState: domain + "api/State/CreateState",
  UpdateState: domain + "api/State/UpdateState",
  GetDestinationByCountryId: domain + "api/Destination/GetDestinationByCountryId",
  GetDestinations: domain + "api/Destination/GetDestinations",
  GetDestination: domain + "api/Destination/GetDestination",
  UpdateDestination: domain + "api/Destination/UpdateDestination",
  CreateDestination: domain + "api/Destination/CreateDestination",
  GetDestinationByCountryIdAndStateId: domain + "api/Destination/GetDestinationByCountryIdAndStateId",
  GetUsers: domain + "api/users/GetUsers",
  AddUser: domain + "api/users/CreateUser",
  GetUser: domain + "api/users/GetUser",
  UpdateUser: domain + "api/users/UpdateUser",
  GetBraches: domain + "api/Branch/GetBraches",
  GetBranch: domain + "api/Branch/GetBranch",
  UpdateBranch: domain + "api/Branch/UpdateBranch",
  CreateBranch: domain + "api/Branch/CreateBranch",
  CreateUserBranchMapping: domain + "api/UserBranchMapping/CreateUserBranchMapping",
  GetUserBranchMappedByUserID: domain + "api/UserBranchMapping/GetUserBranchMappedByUserID",
  CreateModule: domain + "api/Module/CreateModule",
  UpdateModule: domain + "api/Module/UpdateModule",
  GetModules: domain + "api/Module/GetModules",
  GetModule: domain + "api/Module/GetModule",
  CreatePage: domain + "api/Page/CreatePage",
  GetPages: domain + "api/Page/GetPages",
  GetPageByModuleId: domain + "api/Page/GetPageByModuleId",
  UpdatePage: domain + "api/Page/UpdatePage",
  UpdateModuleIdByPageID: domain + "api/Page/UpdateModuleIdByPageID",
  UpdatePageByModuleIdAndPageID: domain + "api/Page/UpdatePageByModuleIdAndPageID",
  GetRoles: domain + "api/Role/GetRoles",
  CreateRole: domain + "api/Role/CreateRole",
  GetRoleDetailByRoleId: domain + "api/RoleDetail/GetRoleDetailByRoleId",
  CreateRoleDetail: domain + "api/RoleDetail/CreateRoleDetail",
  GetAllUserPermission: domain + "api/UserPermission/GetAllUserPermission",
  GetUserPermissionByUserIDAndBranchID: domain + "api/UserPermission/GetUserPermissionByUserIDAndBranchID",
  CreateUserPermission: domain + "api/UserPermission/CreateUserPermission",
  GetUserPermissionByRoleId: domain + "api/UserPermission/GetUserPermissionByRoleId",
  GetWareHouses: domain + "api/WareHouse/GetWareHouses",
  CreateWareHouse: domain + "api/WareHouse/CreateWareHouse",
  UpdateWareHouse: domain + "api/WareHouse/UpdateWareHouse",
  GetWareHouse: domain + "api/WareHouse/GetWareHouse",
  GetCurrencies: domain + "api/Currency/GetCurrencies",
  CreateCurrency: domain + "api/Currency/CreateCurrency",
  CreateNoSeries: domain + "api/NoSeriesDetails/CreateNoSeries",
  GetAllNoSeriesByBranchId: domain + "api/NoSeriesDetails/GetAllNoSeriesByBranchId",
  GetNoSeriesByNoSeriesId: domain + "api/NoSeriesDetails/GetNoSeriesByNoSeriesId",
  UpdateNoSeries: domain + "api/NoSeriesDetails/UpdateNoSeries",
  CreateItem: domain + "api/ItemMaster/CreateItem",
  UpdateItem: domain + "api/ItemMaster/UpdateItem",
  GetAllItems: domain + "api/ItemMaster/GetAllItems",
  GetItem: domain + "api/ItemMaster/GetItem",
  CreateItemDepartment: domain + "api/ItemMaster/CreateItemDepartment",
  GetItemDepartments: domain + "api/ItemMaster/GetItemDepartments",
  GetItemDepartment: domain + "api/ItemMaster/GetItemDepartment",
  UpdateItemDepartment: domain + "api/ItemMaster/UpdateItemDepartment",
  CreateItemSuperCategory: domain + "api/ItemMaster/CreateItemSuperCategory",
  GetItemSuperCategories: domain + "api/ItemMaster/GetItemSuperCategories",
  GetItemSuperCategory: domain + "api/ItemMaster/GetItemSuperCategory",
  UpdateItemSuperCategory: domain + "api/ItemMaster/UpdateItemSuperCategory",
  CreateItemMainCategory: domain + "api/ItemMaster/CreateItemMainCategory",
  GetItemMainCategories: domain + "api/ItemMaster/GetItemMainCategories",
  GetItemMainCategory: domain + "api/ItemMaster/GetItemMainCategory",
  UpdateItemMainCategory: domain + "api/ItemMaster/UpdateItemMainCategory",
  CreateItemCategory: domain + "api/ItemMaster/CreateItemCategory",
  GetItemCategories: domain + "api/ItemMaster/GetItemCategories",
  GetItemCategory: domain + "api/ItemMaster/GetItemCategory",
  UpdateItemCategory: domain + "api/ItemMaster/UpdateItemCategory",
  GetItemTypeByCatID: domain + "api/ItemMaster/GetItemTypeByCatID",
  CreateItemPostingGroup: domain + "api/Posting/CreateItemPostingGroup",
  GetAllItemPostingGroup: domain + "api/Posting/GetAllItemPostingGroup",
  UpdateItemPostingGroup: domain + "api/Posting/UpdateItemPostingGroup",
  GetAllGeneralPostingGroup: domain + "api/Posting/GetAllGeneralPostingGroup",
  CreateGeneralPostingGroup: domain + "api/Posting/CreateGeneralPostingGroup",
  UpdateGeneralPostingGroup: domain + "api/Posting/UpdateGeneralPostingGroup",
  CreateCustomerPostingGroup: domain + "api/Posting/CreateCustomerPostingGroup",
  CreateSupplierPostingGroup: domain + "api/Posting/CreateSupplierPostingGroup",
  GetAllSupplierPostingGroup: domain + "api/Posting/GetAllSupplierPostingGroup",

  GetAllCustomerPostingGroup: domain + "api/Posting/GetAllCustomerPostingGroup",
  CreateChartOfAccount: domain + "api/ChartOfAccount/CreateChartOfAccount",
  GetChartOfAccounts: domain + "api/ChartOfAccount/GetChartOfAccounts",
  GetChartOfAccount: domain + "api/ChartOfAccount/GetChartOfAccount",
  UpdateChartOfAccount: domain + "api/ChartOfAccount/UpdateChartOfAccount",
  CreateCustomer: domain + "api/Customer/CreateCustomer",
  GetAllCustomer: domain + "api/Customer/GetAllCustomer",
  GetCustomer: domain + "api/Customer/GetCustomer",
  UpdateCustomer: domain + "api/Customer/UpdateCustomer",
  GetAllCustomerContact: domain + "api/Customer/GetAllCustomerContact",
  CreateCustomerContact: domain + "api/Customer/CreateCustomerContact",
  GetCustomerContact: domain + "api/Customer/GetCustomerContact",
  CreateCustomerAddress: domain + "api/Customer/CreateCustomerAddress",
  GetAllCustomerAddress: domain + "api/Customer/GetAllCustomerAddress",
  GetCustomerAddress: domain + "api/Customer/GetCustomerAddress",
  GetAllCustomerAddressByCustID: domain + "api/Customer/GetAllCustomerAddressByCustID",
  GetAllCustomerContactByCustID: domain + "api/Customer/GetAllCustomerContactByCustID",
  UpdateCustomerAddress: domain + "api/Customer/UpdateCustomerAddress",
  UpdateCustomerContact: domain + "api/Customer/UpdateCustomerContact",
  GetAllPaymentTerms: domain + "api/Customer/GetAllPaymentTerms",
  CreatePaymentTerms: domain + "api/Customer/CreatePaymentTerms",
  UpdatePaymentTerms: domain + "api/Customer/UpdatePaymentTerms",
  GetAllCustomerCategory: domain + "api/Customer/GetAllCustomerCategory",
  CreateCustomerCategory: domain + "api/Customer/CreateCustomerCategory",
  UpdateCustomerCategory: domain + "api/Customer/UpdateCustomerCategory",
  GetAllSalesPerson: domain + "api/Customer/GetAllSalesPerson",
  UpdateSalesPerson: domain + "api/Customer/UpdateSalesPerson",
  GetAllUOM: domain + "api/Common/GetAllUOM",
  Add_UpdateCustomerPrice: domain + "api/Customer/Add_UpdateCustomerPrice",
  GetCustomerPriceByCustID: domain + "api/Customer/GetCustomerPriceByCustID",
  CreateCustomerBranchMapping: domain + "api/Customer/CreateCustomerBranchMapping",
  GetCustomerBranchMappingByCustID: domain + "api/Customer/GetCustomerBranchMappingByCustID",

  GetAllSupplier: domain + "api/Supplier/GetAllSupplier",
  UpdateSupplier: domain + "api/Supplier/UpdateSupplier",
  CreateSupplier: domain + "api/Supplier/CreateSupplier",
  GetSupplier: domain + "api/Supplier/GetSupplier",
  GetAllNoSeriesByBranchId: domain + "api/NoSeriesDetails/GetAllNoSeriesByBranchId",
  GetMasterDocumentNumber: domain + "api/Common/GetMasterDocumentNumber",
  CreateSupplierBranchMapping: domain + "api/Supplier/CreateSupplierBranchMapping",
  GetSupplierBranchMappingBySuplID: domain + "api/Supplier/GetSupplierBranchMappingBySuplID",
  GetAllSupplierAddressBySuplID: domain + "api/Supplier/GetAllSupplierAddressBySuplID",
  CreateSupplierAddress: domain + "api/Supplier/CreateSupplierAddress",
  UpdateSupplierAddress: domain + "api/Supplier/UpdateSupplierAddress",
  GetSupplierAddress: domain + "api/Supplier/GetSupplierAddress",
  Add_UpdateSupplierPrice: domain + "api/Supplier/Add_UpdateSupplierPrice",
  GetSupplierPriceBySuplID: domain + "api/Supplier/GetSupplierPriceBySuplID"
};

export const CTimeOut = 10;
export const DFormat = "MM/DD/YYYY";

export const pagination = {
  page: 0,
  rowsPerPage: 12,
};


export const buttonTitle = {
  add: {
    name: "Add",
    icon: <AddIcon />,
  },
  edit: {
    name: "Edit",
    icon: <EditIcon />,
  },
  update: {
    name: "Update",
    icon: <EditIcon />,
  },
  new: {
    name: "New",
    icon: <EditIcon />,
  },
  save: {
    name: "Save",
    icon: <SaveIcon />,
  },
  assignBranch:{
    name:"Assign branch",
    icon:<AccountTreeIcon/>,
  },
  assignRole:{
    name:"Assign role",
    icon:<BadgeIcon/>
  }
};





export const POItemType = [
  { name: "Item", value: 0 },
  { name: "G/L Account", value: 1 },
  { name: "Fixed Asset", value: 2 },
  { name: "Charge", value: 3 },
];


export const TypeOfEnterprise = [
  { name: "A-Micro(M)", value: 1 },
  { name: "B-Small(M)", value: 2 },
  { name: "C-Medium(M)", value: 3 },
  { name: "D-Micro(S)", value: 4 },
  { name: "E-Small(S)", value: 5 },
  { name: "F-Medium(S)", value: 6 },

];



export const ContactType = [
  { name: "Sales", value: 0 },
  { name: "Shipping", value: 1 },
  { name: "Account", value: 2 },
  { name: "Internal", value: 3 },
];

export const AddressType = [
  { name: "Billing", value: 0 },
  { name: "Shipping", value: 1 },
  { name: "Notify", value: 2 },
];

export const CreditRating = [
  { name: "A", value: 0 },
  { name: "B", value: 1 },
  { name: "C", value: 2 },
  { name: "D", value: 3 }
];


export const GSTSupplierType = [
  { name: "N/A", value: 0 },
  { name: "Registered", value: 1 },
  { name: "Unregistered", value: 2 },
  { name: "Export", value: 3 },
  { name: "Deemed Export", value: 4 },
  { name: "Exempted", value: 5 },
  { name: "SEZ", value: 6 }
];
export const GSTCutomerType = [
  { name: "N/A", value: 0 },
  { name: "Registered", value: 1 },
  { name: "Unregistered", value: 2 },
  { name: "Export", value: 3 },
  { name: "Deemed Export", value: 4 },
  { name: "Exempted", value: 5 },
  { name: "SEZ", value: 6 }
];

export const ACType = [
  { name: "Posting", value: 0 },
  { name: "Heading", value: 1 },
  { name: "Total", value: 2 },
  { name: "Begin-Total", value: 3 },
  { name: "End-Total", value: 4 },
];

export const IncomeBalance = [
  { name: "Income", value: 0 },
  { name: "Balance", value: 1 }

];

export const ACCategory = [
  { name: "Assets", value: 0 },
  { name: "Liabilities", value: 1 },
  { name: "Equiity", value: 2 },
  { name: "Income", value: 3 },
  { name: "Cost of Goods Sold", value: 4 },
  { name: "Expense", value: 5 },
];

export const DebitCredit = [
  { name: "Both", value: 0 },
  { name: "Debit", value: 1 },
  { name: "Credit", value: 2 }
];

export const ItemType = [
  {
    name: "Finish Good",
    value: 0
  }, {
    name: "Raw Material",
    value: 1
  }, {
    name: "Work In Progres",
    value: 2
  }
];

export const CostingMethod = [
  {
    name: "FIFO",
    value: 0
  },
  {
    name: "LIFO",
    value: 1
  },
  {
    name: "Average",
    value: 2
  },
  {
    name: "Standard",
    value: 3
  }
];

export const Replenishment = [
  {
    name: "Production Order",
    value: 0
  },
  {
    name: "Purchase",
    value: 1
  },
  {
    name: "Assembly",
    value: 2
  },
];

export const ManufacturingPolicy = [
  {
    name: "Make-to-Stock",
    value: 0
  },
  {
    name: "Make-to-Order",
    value: 1
  },
];

//-------To be chnaged and linked with DB
export const ItemPostingGroup = [
  {
    name: "Paper",
    value: 1
  },
  {
    name: "Ink",
    value: 2
  },
  {
    name: "FG",
    value: 2
  },
];



export const TrasactionType = {
  PO: "",
  SO: "",

  default: ""
};


export let ValidUser = {
  UserID: null,
  Token: null
};

export let company = {
  "CompanyID": null,
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
  "CreationDate": null,
  "IsActive": false
};




export let page = {
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

export let CreateModuleData = {
  validUser: null,
  Module: null
};

export let CreateRoleData = {
  validUser: null,
  Role: null
};

export let GetRoleDetailByRoleIdData = {
  validUser: null,
  RoleId: null,
  RoleDetailList: null
};

export let CreateRoleDetailData = {
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

export let GetAllUserPermissionData = {
  validUser: null,
  BranchId: null,
  UserId: null,
  // userPermissionLists :null
};


/* -------------------------------DATAGRID COLUMNS CONSTANT--------------------------------------------------------------- */

export const companyMasterColumn = [
  {
    field: 'id',
    headerName: '#',
    width: 50,
    headerClassName: 'table-header-font'
  },
  {
    field: 'CompanyName',
    headerName: 'Company Name',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'Address',
    headerName: 'Address',
    width: 350,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'PhoneNo',
    headerName: 'Phone No',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'Website',
    headerName: 'Website',
    width: 150,
    editable: false,
    headerClassName: 'table-header-font'
  },

];

export const  stateMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 50,
    headerClassName: 'table-header-font'
  },
  {
    field: 'name',
    headerName: 'Name',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'code',
    headerName: 'Code',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'gstcode',
    headerName: 'Gst Code',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  }

  //     
];

