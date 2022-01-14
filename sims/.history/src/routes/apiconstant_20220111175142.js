import { Fragment } from "react";
import moment from "moment";
import AddIcon from "@material-ui/icons/Add";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from '@mui/icons-material/Save';
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import BadgeIcon from '@mui/icons-material/Badge';
import PreviewIcon from '@mui/icons-material/Preview';
import PrintIcon from '@mui/icons-material/Print';
import VisibilityIcon from '@mui/icons-material/Visibility';
import SendIcon from '@mui/icons-material/Send';
import AirplanemodeActiveIcon from '@mui/icons-material/AirplanemodeActive';
import AirplanemodeInactiveIcon from '@mui/icons-material/AirplanemodeInactive';
import FaceIcon from '@mui/icons-material/Face';
import FaceRetouchingOffIcon from '@mui/icons-material/FaceRetouchingOff';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import WarehouseIcon from '@mui/icons-material/Warehouse';
import NextPlanIcon from '@mui/icons-material/NextPlan';
import UndoIcon from '@mui/icons-material/Undo';
import FormatLineSpacingIcon from '@mui/icons-material/FormatLineSpacing';
import ClearIcon from '@mui/icons-material/Clear';
import FilterListIcon from '@mui/icons-material/FilterList';
import MergeTypeIcon from '@mui/icons-material/MergeType';
import KeyIcon from '@mui/icons-material/Key';
import PolicyIcon from '@mui/icons-material/Policy';
import PaymentsIcon from '@mui/icons-material/Payments';

import Chip from '@mui/material/Chip';
import Link from "@material-ui/core/Link";

import * as CF from "../services/functions/customfunctions";
import * as URLS from "../routes/constants";

// const domain = "http://192.168.10.200:8080/";
 const domain = "http://49.248.147.178:8082/";

export const APIURL = {
  ListOfDirectoryFromFTP:domain+"api/Common/ListOfDirectoryFromFTP", 
  ListOfFilesFromFTP:domain+"api/Common/ListOfFilesFromFTP",
  FileDownload: domain + "api/Common/FileDownload",
  FTPUPLOAD: domain + "api/Common/FileUpload",
  FTPFILELIST: domain + "api/Common/ListOfFilesFromFTP",
  DELETEFTPFILE:domain+"api/Common/DeleteFileFromFTP",
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
  CreateBranchLicenseDetail:domain+"api/BranchLicenseDetail/CreateBranchLicenseDetail",
  UpdateBranchLicenseDetail:domain+"api/BranchLicenseDetail/UpdateBranchLicenseDetail",
  GetBranchLicenseDetail:domain+"api/BranchLicenseDetail/GetBranchLicenseDetail",
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
  GetWareHouseByBranchID:domain +"api/WareHouse/GetWareHouseByBranchID",
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
  GetGSTGroup:domain+"api/Taxation/GetGSTGroup",
  CreateItemDepartment: domain + "api/ItemMaster/CreateItemDepartment",
  GetItemDepartments: domain + "api/ItemMaster/GetItemDepartments",
  GetItemDepartment: domain + "api/ItemMaster/GetItemDepartment",
  UpdateItemDepartment: domain + "api/ItemMaster/UpdateItemDepartment",
  UpdateItemSuperCategoryRestrictedBranch:domain+"api/ItemMaster/UpdateItemSuperCategoryRestrictedBranch",
  CreateItemSuperCategory: domain + "api/ItemMaster/CreateItemSuperCategory",
  GetItemSuperCategories: domain + "api/ItemMaster/GetItemSuperCategories",
  GetItemSuperCategory: domain + "api/ItemMaster/GetItemSuperCategory",
  UpdateItemSuperCategory: domain + "api/ItemMaster/UpdateItemSuperCategory",
  GetItemSuperCategoryRestrictedBranchID:domain+"api/ItemMaster/GetItemSuperCategoryRestrictedBranchID",
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
  GetSpecification:domain + "api/Common/GetSpecification",
  Add_UpdateCustomerPrice: domain + "api/Customer/Add_UpdateCustomerPrice",
  GetCustomerPriceByCustID: domain + "api/Customer/GetCustomerPriceByCustID",
  CreateCustomerBranchMapping: domain + "api/Customer/CreateCustomerBranchMapping",
  GetCustomerBranchMappingByCustID: domain + "api/Customer/GetCustomerBranchMappingByCustID",
  GetAllSupplier: domain + "api/Supplier/GetAllSupplier",
  UpdateSupplier: domain + "api/Supplier/UpdateSupplier",
  CreateSupplier: domain + "api/Supplier/CreateSupplier",
  GetSupplier: domain + "api/Supplier/GetSupplier",
  GetSuppliersByBranchID:domain + "api/Supplier/GetSuppliersByBranchID",
  GetAllNoSeriesByBranchId: domain + "api/NoSeriesDetails/GetAllNoSeriesByBranchId",
  GetMasterDocumentNumber: domain + "api/Common/GetMasterDocumentNumber",
  GetDocumentNumber: domain +"api/Common/GetDocumentNumber",
  CreateSupplierBranchMapping: domain + "api/Supplier/CreateSupplierBranchMapping",
  GetSupplierBranchMappingBySuplID: domain + "api/Supplier/GetSupplierBranchMappingBySuplID",
  GetAllSupplierAddressBySuplID: domain + "api/Supplier/GetAllSupplierAddressBySuplID",
  CreateSupplierAddress: domain + "api/Supplier/CreateSupplierAddress",
  UpdateSupplierAddress: domain + "api/Supplier/UpdateSupplierAddress",
  GetSupplierAddress: domain + "api/Supplier/GetSupplierAddress",
  Add_UpdateSupplierPrice: domain + "api/Supplier/Add_UpdateSupplierPrice",
  GetSupplierPriceBySuplID: domain + "api/Supplier/GetSupplierPriceBySuplID",
  GetMODTax:domain +"api/Common/GetMODTax",
  GetShipmentMode:domain+"api/Common/GetShipmentMode",
  GetDimensions:domain+"api/Dimension/GetDimensions",
  Add_Update_PO:domain+"api/PO/Add_Update_PO",
  GetPOByBranchID:domain+"api/PO/GetPOByBranchID",
  GetPOByPOID:domain+"api/PO/GetPOByPOID",
  Add_Update_PurchaseOrderAuthorize:domain+"api/PO/Add_Update_PurchaseOrderAuthorize",
  Add_Update_MRN:domain+"api/PO/Add_Update_MRN",
  GetMRNByBranchID:domain+"api/PO/GetMRNByBranchID",
  GetMRNByMRNID:domain+"api/PO/GetMRNByMRNID",
  MRN_Post:domain+"api/po/MRN_Post",
  Add_Update_GIT:domain+"api/PO/Add_Update_GIT",
  GetGITByBranchID:domain+"api/PO/GetGITByBranchID",
  GetGITByGITID:domain+"api/PO/GetGITByGITID",
  GITAuthorize:domain+"api/PO/GITAuthorize",
  GetPIByBranchID:domain+"api/PO/GetPIByBranchID",
  GetMRNBySuplID:domain+"api/PO/GetMRNBySuplID",
  Add_Update_PI:domain+"api/PO/Add_Update_PI",
  GetPIByPIID:domain+"api/PO/GetPIByPIID",
  PI_Post:domain+"api/po/PI_Post",
  GetPIVoucherByPIID:domain+"api/po/GetPIVoucherByPIID",
};

export const CTimeOut = 10;
export const DFormat = "MM/DD/YYYY";

export const pagination = {
  page: 0,
  rowsPerPage: 12,
};


export const buttonTitle = {
  print:{
    name: "Print",
    icon: <PrintIcon />,
  },
  send:{
    name: "Send",
    icon: <SendIcon />,
  },
  preview: {
    name: "Preview",
    icon: <PreviewIcon />,
  },
  view: {
    name: "View",
    icon: <VisibilityIcon />,
  },
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
    name:"Assign Branch",
    icon:<AccountTreeIcon/>,
  },
  restrictBranch:{
    name:"Restrict Branch",
    icon:<KeyIcon/>,
  },
  assignRole:{
    name:"Assign Role",
    icon:<BadgeIcon/>
  },
  address:{
    name:"Address",
    icon:<ContactMailIcon/>
  },
  branchmapping:{
    name:"Branch Mapping",
    icon:<WarehouseIcon/>
  },
  supplierprice:{
    name:"Supplier Price",
    icon:<AttachMoneyIcon/>
  },
  release:{
    name:"Release",
    icon:<NextPlanIcon/>
  },
  reopen:{
    name:"Re-Open",
    icon:<UndoIcon/>
  },
  addline:{
    name:"Add line",
    icon:<FormatLineSpacingIcon/>
  },
  clear:{
    name:"Clear",
    icon:<ClearIcon/>
  }, 
  post:{
    name:"Post",
    icon:<NextPlanIcon/>
  },
  fetchMRN:{
    name:"Fetch MRN",
    icon:<FilterListIcon/>
  },
  combine: {
    name: "Merge & Update List",
    icon: <MergeTypeIcon />,
  },
  voucher:{
    name: "Voucher",
    icon: <PrintIcon />,
  },
  license: {
    name: "License",
    icon: <PolicyIcon />,
  },
  charges: {
    name: "Charges",
    icon: <PaymentsIcon />,
  },
};



export const PackingUOM = [
  { name: "Kgs", value: 0 },
  { name: "pallets", value: 1 },
  { name: "Liters", value: 2 },
  { name: "CTN", value: 3 },
  { name: "NOs", value: 3 },
];


export const SupplierClasification = [
  { name: "N/A", value: 0 },
  { name: "MSME", value: 1 }
];

export const PageType = [
  { name: "Master", value: 1 },
  { name: "Transaction", value: 2 },
  { name: "Analysis", value: 3 },
  { name: "Report", value: 4 },
];


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
    name: "Work In Progress",
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
  PO: "PO",
  MRN: "MRN",
  GIT:"GIT",
  PI:"PI",
  SO: "SO",
  Supplier:"Supplier",
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
  PageName: "",
  PageLink: "",
  Description: "",
  PageType:0,
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


/*---------------------PO Constatnts---------------------- */

export let POType=[
  {value:0,name:"Stock"},
  {value:1,name:"Non Stock"},
  {value:2,name:"Service"},
  {value:3,name:"Sample"},
  {value:4,name:"Trading"}
];

/*------------------------------------------- */


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
    headerName: 'Name',
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
    field: 'Name',
    headerName: 'Name',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'Code',
    headerName: 'Code',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'GSTCode',
    headerName: 'GST Code',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  }

   
];

export const userMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 50,
    headerClassName: 'table-header-font'
  },
  {
    field: 'LoginID',
    headerName: 'Login ID',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'FirstName',
    headerName: 'First Name',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'LastName',
    headerName: 'Last Name',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'EmailID',
    headerName: 'Email',
    width: 200,
    editable: false,
    headerClassName: 'table-header-font'
  },  
  
  {
    field: 'IsActive',
    headerName: 'Status',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
           {params.value===true?(
             <Fragment>
              <FaceIcon  size="small" sx={{ color: '#4caf50' }}/>
             </Fragment>
           ):(
            <Fragment>
            <FaceRetouchingOffIcon size="small" sx={{ color: '#f44336' }}/>    
            </Fragment>
           )}
      </Fragment>
    ),
  },
  
];

export const branchLicenseColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 50,
    headerClassName: 'table-header-font'
  },
  {
    field: 'LicenseNo',
    headerName: 'License No.',
    width: 120,
    editable: false,
    headerClassName: 'table-header-font'
  }, {
    field: 'BondNo',
    headerName: 'Bond No.',
    width: 120,
    editable: false,
    headerClassName: 'table-header-font'
  },{
    field: 'StartDate',
    headerName: 'Start Date',
    width: 250,
    editable: false,
    headerClassName: 'table-header-font'
  },{
    field: 'EndDate',
    headerName: 'End Date',
    width: 250,
    editable: false,
    headerClassName: 'table-header-font'
  },,{
    field: 'Description',
    headerName: 'Description',
    width: 250,
    editable: false,
    headerClassName: 'table-header-font'
  }
];

export const branchMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 50,
    headerClassName: 'table-header-font'
  },
  {
    field: 'Name',
    headerName: 'Branch Name',
    width: 250,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'ShortName',
    headerName: 'Short Name',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'Address',
    headerName: 'Address',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  },
  {
    field: 'PhoneNo',
    headerName: 'PhoneNo',
    width: 160,
    editable: false,
    headerClassName: 'table-header-font'
  }
];

export const poMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },{
    field: 'No',
    headerName: 'No',
    width:200,
    headerClassName: 'table-header-font'
  },{
    field: 'PODate',
    headerName: 'PO.Date',
    width: 125,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
       {moment(params.value).format("MM/DD/YYYY")}
      </Fragment>
    ),
  }
  ,{
    field: 'Status',
    headerName: 'Status',
    width: 130,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
          {params.value === 0 ? (<Chip label="Open" color="success"  size="small" />) : null}
            {/* {params.value === 1 ? (<Chip label="Open" size="small" />) : null} */}
            {params.value === 2 ? (<Chip label="Released" color="primary" size="small" />) : null}
            {params.value === 3 ? (<Chip label="Complete MRN" color="secondary" size="small" />) : null}
            {params.value === 4 ? (<Chip label="Partial MRN" color="warning" size="small" />) : null}
            {params.value === 5 ? (<Chip label="Short Close" color="success" size="small" />) : null}
          
          {/* {params.row.Pick === "PO" ? (  
         
          <Fragment>
            {params.value === 1 ? (<Chip label="Open" size="small" />) : null}
            {params.value === 2 ? (<Chip label="Released" color="primary" size="small" />) : null}
            {params.value === 3 ? (<Chip label="Complete MRN" color="secondary" size="small" />) : null}
            {params.value === 4 ? (<Chip label="Partial MRN" color="warning" size="small" />) : null}
            {params.value === 5 ? (<Chip label="Short Close" color="success" size="small" />) : null}
          </Fragment>
        ) : null}
        {params.row.Pick === "GIT" ? (
          <Fragment>
            {params.value === 0 ? (<Chip label="Open" size="small" />) : null}
            {params.value === 1 ? (<Chip label="Released" color="success" size="small" />) : null}
          </Fragment>
        ) : null} */}
      
      </Fragment>
    ),
  }
  ,{
    field: 'SupplierName',
    headerName: 'Supplier Name',
    width: 250,
    headerClassName: 'table-header-font'
  },{
    field: 'CountryName',
    headerName: 'Country',
    width: 130,
    headerClassName: 'table-header-font'
  },{
    field: 'IsImport',
    headerName: 'Import?',
    width: 125,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
           {params.value===true?(
             <Fragment>
               <AirplanemodeActiveIcon sx={{ color: '#009688' }}/>
             </Fragment>
           ):(
            <Fragment>
              <AirplanemodeInactiveIcon sx={{ color: '#cddc39' }}/>              
            </Fragment>
           )}
      </Fragment>
    ),
  },{
    field: 'Code',
    headerName: 'Currency',
    width: 130,
    headerClassName: 'table-header-font'
  },{
    field: 'FCValue',
    headerName: 'FC Value',
    width: 150,
    headerClassName: 'table-header-font'
  },{
    field: 'ExchRate',
    headerName: 'Exch Rate',
    width: 150,
    headerClassName: 'table-header-font'
  },
  {
    field: 'BaseValue',
    headerName: 'Base Value',
    width: 150,
    headerClassName: 'table-header-font'
  },{
    field: 'ContactPerson',
    headerName: 'Contact Person',
    width: 180,
    headerClassName: 'table-header-font'
  },


];

export const MRNMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },{
    field: 'No',
    headerName: 'No',
    width: 180,
    headerClassName: 'table-header-font'
  },{
    field: 'PODate',
    headerName: 'PO.Date',
    width: 125,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
       {moment(params.value).format("MM/DD/YYYY")}
      </Fragment>
    ),
  }
  ,{
    field: 'Status',
    headerName: 'Status',
    width: 115,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
       {params.value===0?(<Chip label="Open" size="small"/>):null}
       {params.value===1?(<Chip label="Post"  color="success"  size="small"/>):null}
      </Fragment>
    ),
  }
  ,{
    field: 'SupplierName',
    headerName: 'Supplier Name',
    width: 250,
    headerClassName: 'table-header-font'
  },{
    field: 'CountryName',
    headerName: 'Country',
    width: 130,
    headerClassName: 'table-header-font'
  },{
    field: 'IsImport',
    headerName: 'Import?',
    width: 125,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
           {params.value===true?(
             <Fragment>
               <AirplanemodeActiveIcon sx={{ color: '#009688' }}/>
             </Fragment>
           ):(
            <Fragment>
              <AirplanemodeInactiveIcon sx={{ color: '#cddc39' }}/>              
            </Fragment>
           )}
      </Fragment>
    ),
  },{
    field: 'Code',
    headerName: 'Currency',
    width: 130,
    headerClassName: 'table-header-font'
  },{
    field: 'FCValue',
    headerName: 'FC Value',
    width: 150,
    headerClassName: 'table-header-font'
  },{
    field: 'ExchRate',
    headerName: 'Exch Rate',
    width: 150,
    headerClassName: 'table-header-font'
  },
  {
    field: 'BaseValue',
    headerName: 'Base Value',
    width: 150,
    headerClassName: 'table-header-font'
  }


];

export const GITMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },{
    field: 'No',
    headerName: 'No',
    width: 180,
    headerClassName: 'table-header-font'
  },{
    field: 'PONo',
    headerName: 'PO No.',
    width: 180,
    headerClassName: 'table-header-font'
  },{
    field: 'PODate',
    headerName: 'PO.Date',
    width: 125,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
       {moment(params.value).format("MM/DD/YYYY")}
      </Fragment>
    ),
  }
  ,{
    field: 'Status',
    headerName: 'Status',
    width: 115,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
         {params.value===0?(<Chip label="Open" size="small"/>):null}
       {params.value===1?(<Chip label="Released"  color="success"  size="small"/>):null}
       {params.value===2?(<Chip label="Finish"  color="primary"  size="small"/>):null}
      </Fragment>
    ),
  }
  ,{
    field: 'SupplierName',
    headerName: 'Supplier Name',
    width: 250,
    headerClassName: 'table-header-font'
  },{
    field: 'CountryName',
    headerName: 'Country',
    width: 130,
    headerClassName: 'table-header-font'
  },{
    field: 'IsImport',
    headerName: 'Import?',
    width: 125,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
           {params.value===true?(
             <Fragment>
               <AirplanemodeActiveIcon sx={{ color: '#009688' }}/>
             </Fragment>
           ):(
            <Fragment>
              <AirplanemodeInactiveIcon sx={{ color: '#cddc39' }}/>              
            </Fragment>
           )}
      </Fragment>
    ),
  },{
    field: 'Code',
    headerName: 'Currency',
    width: 130,
    headerClassName: 'table-header-font'
  },{
    field: 'FCValue',
    headerName: 'FC Value',
    width: 150,
    headerClassName: 'table-header-font'
  },{
    field: 'ExchRate',
    headerName: 'Exch Rate',
    width: 150,
    headerClassName: 'table-header-font'
  },
  {
    field: 'BaseValue',
    headerName: 'Base Value',
    width: 150,
    headerClassName: 'table-header-font'
  }


];


export const superCategoryMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },{
    field: 'code',
    headerName: 'Code',
    width: 150,
    headerClassName: 'table-header-font'
  },
  {
    field: 'description',
    headerName: 'Description',
    width: 180,
    headerClassName: 'table-header-font'
  },{
    field: 'itemType',
    headerName: 'Type',
    width: 150,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
        {getItemTypeName(params.value)}
      </Fragment>
    )
  }
  ,
  {
    field: 'hsncode',
    headerName: 'HSN',
    width: 120,
    headerClassName: 'table-header-font'
  },{
    field: 'isActive',
    headerName: 'Status',
    width: 120,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
        {params.value === true ? (
          <span style={{ color: "green" }}>Active</span>
        ) : (
          <span style={{ color: "red" }}>In-Active</span>
        )}
      </Fragment>
    )
  }
];

export const mainCategoryMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },{
    field: 'SuperCatCode',
    headerName: 'Super Category',
    width: 170,
    headerClassName: 'table-header-font'
  }
  ,{
    field: 'Code',
    headerName: 'Code',
    width: 150,
    headerClassName: 'table-header-font'
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 180,
    headerClassName: 'table-header-font'
  }
  ,
  {
    field: 'HSNCode',
    headerName: 'HSN',
    width: 120,
    headerClassName: 'table-header-font'
  },{
    field: 'IsActive',
    headerName: 'Status',
    width: 120,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
        {params.value === true ? (
          <span style={{ color: "green" }}>Active</span>
        ) : (
          <span style={{ color: "red" }}>In-Active</span>
        )}
      </Fragment>
    )
  }
];

export const CategoryMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },{
    field: 'MainCatCode',
    headerName: 'Main Category',
    width: 170,
    headerClassName: 'table-header-font'
  }
  ,{
    field: 'Code',
    headerName: 'Code',
    width: 150,
    headerClassName: 'table-header-font'
  },
  {
    field: 'Description',
    headerName: 'Description',
    width: 180,
    headerClassName: 'table-header-font'
  }
  ,
  {
    field: 'HSNCode',
    headerName: 'HSN',
    width: 120,
    headerClassName: 'table-header-font'
  },{
    field: 'IsActive',
    headerName: 'Status',
    width: 120,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
        {params.value === true ? (
          <span style={{ color: "green" }}>Active</span>
        ) : (
          <span style={{ color: "red" }}>In-Active</span>
        )}
      </Fragment>
    )
  }
];

export const itemMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },{
    field: 'ItemType',
    headerName: 'Type',
    width: 120,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
       {params.row.ItemTypeName}
      </Fragment>
    )
  },{
    field: 'No',
    headerName: 'No',
    width: 100,
    headerClassName: 'table-header-font',
    renderCell:(params) => (
      <Fragment>
        <Link
          className="LINK tableLink"
          color="inherit"
           href={URLS.URLS.editItem + CF.GET_URL_PARAMS() + "&edititemId=" + params.row.ItemID}  
        >   
           {params.value}
        </Link>
       
      </Fragment>
    )
  },{
    field: 'CatCode',
    headerName: 'Category',
    width: 130,
    headerClassName: 'table-header-font'
  }  
  ,{
    field: 'Code',
    headerName: 'Code',
    width: 150,
    headerClassName: 'table-header-font'
  },{
    field: 'Alias',
    headerName: 'Alias',
    width: 150,
    headerClassName: 'table-header-font'
  },{
    field: 'Description1',
    headerName: 'Description',
    width: 250,
    headerClassName: 'table-header-font'
  }

];


export const supplierMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  },
  {
    field: 'No',
    headerName: 'No',
    width: 100,
    headerClassName: 'table-header-font',
  },
  {
    field: 'Name',
    headerName: 'Name',
    width: 200,
    headerClassName: 'table-header-font',
  },
  {
    field: 'CountryName',
    headerName: 'Country',
    width: 120,
    headerClassName: 'table-header-font',
  },
  {
    field: 'CurrCode',
    headerName: 'Currency',
    width: 120,
    headerClassName: 'table-header-font',
  }
  ,
  {
    field: 'EmailID',
    headerName: 'Email',
    width: 200,
    headerClassName: 'table-header-font',
  }
  ,
  {
    field: 'ContactPerson',
    headerName: '	Contact',
    width: 200,
    headerClassName: 'table-header-font',
  }
];
 
export const numberingMasterColumn=[
  {
    field: 'id',
    headerName: '#',
    width: 10,
    headerClassName: 'table-header-font'
  }, {
    field: 'Code',
    headerName: 'Code',
    width: 180,
    headerClassName: 'table-header-font'
  },{
    field: 'Description',
    headerName: 'Description',
    width: 180,
    headerClassName: 'table-header-font'
  },{
    field: 'StartNo',
    headerName: 'Starting No',
    width: 180,
    headerClassName: 'table-header-font'
  },{
    field: 'LastNo',
    headerName: 'Ending No',
    width: 180,
    headerClassName: 'table-header-font'
  },

  
];


const getItemTypeName = (value) => {
  const ItemType = [
    {
      name: "Finish Good",
      value: 0
    }, {
      name: "Raw Material",
      value: 1
    }, {
      name: "Work In Progress",
      value: 2
    }
  ];
  for (let i = 0; i < ItemType.length; i++) {
    if (ItemType[i].value === value) {
      return ItemType[i].name;
      break;
    }
  }
}

