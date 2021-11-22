import React from "react";
import {
  Switch,
  Route,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import * as URLS from "./constants";

import LoginPage from "../components/login";

import userDashboard from "../components/user/userDashboard";
import testReport from "../components/reports/testReport";
import companyMaster from "../components/modules/company/companyMaster";
import addNewCompany from "../components/modules/company/addnewcompany";
import editCompany from "../components/modules/company/editcompany";
import report1 from "../components/modules/reports/report1";
import countryMaster from "../components/modules/country/countryMaster";
import addCountry from "../components/modules/country/addcountry";
import editCountry from "../components/modules/country/editcountry";
import stateMaster from "../components/modules/country/statemaster";
import addState from "../components/modules/country/addstate";
import editState from "../components/modules/country/editstate";
import adddestination from "../components/modules/country/adddestination";
import editDestination from "../components/modules/country/editdestination";
import userMaster from "../components/modules/user/usermaster";
import addUser from "../components/modules/user/adduser";
import editUser from "../components/modules/user/edituser";
import branchMaster from "../components/modules/branch/branchmaster";
import editBranch from "../components/modules/branch/editbranch";
import salesPerson from "../components/modules/customer/component/salesPerson";
import addBranch from "../components/modules/branch/addbranch";
import loginExpired from "../components/user/loginexpired";
import moduleMaster from "../components/modules/modules/modulemaster";
import addModule from "../components/modules/modules/addmodule";
import editModule from "../components/modules/modules/editmodule";
import rolemaster from "../components/modules/role/rolemaster";
import addRole from "../components/modules/role/addrole";
import warehousemaster from "../components/modules/warehouse/warehouseMaster";
import addWarehouse from "../components/modules/warehouse/addwarehouse";
import editWarehouse from "../components/modules/warehouse/editwarehouse";
import numberingMaster from "../components/modules/numberings/numberingmaster";
import addNumbering from "../components/modules/numberings/addnumbering";
import editNumbering from "../components/modules/numberings/editnumbering";
import currencyMaster from "../components/modules/currency/currencymaster";
import addCurrency from "../components/modules/currency/addcurrency";
import itemMaster from "../components/modules/item/itemMaster";
import addItem from "../components/modules/item/addItem";
import editItem from "../components/modules/item/editItem";
import itemCategoryMaster from "../components/modules/item/category/itemCategoryMaster";
import addItemCategory from "../components/modules/item/category/addItemCategory";
import editItemCategory from "../components/modules/item/category/editItemCategory";
import itemMainCategoryMaster from "../components/modules/item/category/itemMainCategoryMaster";
import addItemMainCategory from "../components/modules/item/category/addItemMainCategory";
import editItemMainCategory from "../components/modules/item/category/editItemMainCategory";
import itemSuperCategoryMaster from "../components/modules/item/category/itemSuperCategoryMaster";
import addItemSuperCategory from "../components/modules/item/category/addItemSuperCategory";
import editItemSuperCategory from "../components/modules/item/category/editItemSuperCategory";
import itemDepartmentMaster from "../components/modules/item/department/itemDepartmentMaster";
import addItemDepartment from "../components/modules/item/department/addItemDepartment";
import editItemDepartment from "../components/modules/item/department/editItemDepartment";
import postingGroupMaster from "../components/modules/item/postinggroup/postingGroupMaster";
import coaMaster from "../components/modules/coa/coaMaster";
import coaactivity from "../components/modules/coa/coaactivity";
import customerMaster from "../components/modules/customer/customerMaster";
import customeractivity from "../components/modules/customer/customeractivity";
import supplierMaster from "../components/modules/supplier/supplierMaster";
import supplieractivity from "../components/modules/supplier/supplieractivity";
import poMaster from "../components/modules/po/poMaster";
import poactivity from "../components/modules/po/poactivity";
import gstMaster from "../components/modules/gst/gstmaster";
import gstactivity from "../components/modules/gst/gstactivity";


import pageNotFound from "../../src/pagenotfound";
import testformat from "../components/modules/accounts/reports/testformat";
import Ftptest from "../components/ftp/ftptest";
import Header from "../components/user/userheaderconstants";

let routes = ({ location, ...rest }) => {
  return (
    <Router>
      {window.location.pathname === "/" ||
      window.location.pathname === "/loginExpired" ? null : (
        <Header />
      )}
      <div style={{ marginLeft: 10 }}>
        <Switch>
          <Route path={URLS.URLS.LoginPage} exact component={LoginPage} />
          <Route path={URLS.URLS.userDashboard} component={userDashboard} />
          <Route path={URLS.URLS.testReport} component={testReport} />

          {/*  Company Routes  */}
          <Route path={URLS.URLS.companyMaster} component={companyMaster} />
          <Route path={URLS.URLS.addNewCompany} component={addNewCompany} />
          <Route path={URLS.URLS.editCompany} component={editCompany} />

          {/*  Country Routes  */}
          <Route path={URLS.URLS.countryMaster} component={countryMaster} />
          <Route path={URLS.URLS.addCountry} component={addCountry} />
          <Route path={URLS.URLS.editCountry} component={editCountry} />

          {/*  State Routes  */}
          <Route path={URLS.URLS.stateMaster} component={stateMaster} />
          <Route path={URLS.URLS.addState} component={addState} />
          <Route path={URLS.URLS.editState} component={editState} />

          <Route path={URLS.URLS.addDestination} component={adddestination} />
          <Route path={URLS.URLS.editDestination} component={editDestination} />

          {/*  User Master Routes  */}
          <Route path={URLS.URLS.userMaster} component={userMaster} />
          <Route path={URLS.URLS.addUser} component={addUser} />
          <Route path={URLS.URLS.editUser} component={editUser} />

          {/* branch Routes*/}
          <Route path={URLS.URLS.branchMaster} component={branchMaster} />
          <Route path={URLS.URLS.editBranch} component={editBranch} />
          <Route path={URLS.URLS.addBranch} component={addBranch} />

          {/* Module Routes*/}
          <Route path={URLS.URLS.moduleMaster} component={moduleMaster} />
          <Route path={URLS.URLS.addModule} component={addModule} />
          <Route path={URLS.URLS.editModule} component={editModule} />
          <Route path={URLS.URLS.roleMaster} component={rolemaster} />
          <Route path={URLS.URLS.addRole} component={addRole} />

          {/* Warehouse Routes*/}
          <Route path={URLS.URLS.warehouseMaster} component={warehousemaster} />
          <Route path={URLS.URLS.addWarehouse} component={addWarehouse} />
          <Route path={URLS.URLS.editWarehouse} component={editWarehouse} />
          <Route path={URLS.URLS.loginExpired} component={loginExpired} />
          <Route path={URLS.URLS.numberingMaster} component={numberingMaster} />
          <Route path={URLS.URLS.addNumbering} component={addNumbering} />
          <Route path={URLS.URLS.editNumbering} component={editNumbering} />

          <Route path={URLS.URLS.currencyMaster} component={currencyMaster} />
          <Route path={URLS.URLS.addCurrency} component={addCurrency} />

          {/* Chart of Account */}
          <Route path={URLS.URLS.itemMaster} component={itemMaster} />
          <Route path={URLS.URLS.addItem} component={addItem} />
          <Route path={URLS.URLS.editItem} component={editItem} />
          <Route
            path={URLS.URLS.itemCategoryMaster}
            component={itemCategoryMaster}
          />
          <Route path={URLS.URLS.addItemCategory} component={addItemCategory} />
          <Route
            path={URLS.URLS.editItemCategory}
            component={editItemCategory}
          />
          <Route
            path={URLS.URLS.itemMainCategoryMaster}
            component={itemMainCategoryMaster}
          />
          <Route
            path={URLS.URLS.addItemMainCategory}
            component={addItemMainCategory}
          />
          <Route
            path={URLS.URLS.editItemMainCategory}
            component={editItemMainCategory}
          />
          <Route
            path={URLS.URLS.itemSuperCategoryMaster}
            component={itemSuperCategoryMaster}
          />
          <Route
            path={URLS.URLS.addItemSuperCategory}
            component={addItemSuperCategory}
          />
          <Route
            path={URLS.URLS.editItemSuperCategory}
            component={editItemSuperCategory}
          />
          <Route
            path={URLS.URLS.itemDepartmentMaster}
            component={itemDepartmentMaster}
          />
          <Route
            path={URLS.URLS.addItemDepartment}
            component={addItemDepartment}
          />
          <Route
            path={URLS.URLS.editItemDepartment}
            component={editItemDepartment}
          />
          <Route
            path={URLS.URLS.postingGroupMaster}
            component={postingGroupMaster}
          />

          {/* Chart of Account */}
          <Route path={URLS.URLS.coa} component={coaMaster} />
          <Route path={URLS.URLS.addCoa} component={coaactivity} />
          <Route path={URLS.URLS.editCoa} component={coaactivity} />

          {/* Customers */}
          <Route path={URLS.URLS.customerMaster} component={customerMaster} />
          <Route path={URLS.URLS.addCustomer} component={customeractivity} />
          <Route path={URLS.URLS.editCustomer} component={customeractivity} />

          {/* Supplier */}
          <Route path={URLS.URLS.supplierMaster} component={supplierMaster} />
          <Route path={URLS.URLS.addSupplier} component={supplieractivity} />
          <Route path={URLS.URLS.editSupplier} component={supplieractivity} />

          {/* Purchase Order */}
          <Route path={URLS.URLS.poMaster} component={poMaster} />
          <Route path={URLS.URLS.addPO} component={poactivity} />

          {/* Gst */}
          <Route path={URLS.URLS.gstMaster} component={gstMaster} />
          <Route path={URLS.URLS.addGst} component={gstactivity} />
          <Route path={URLS.URLS.editGst} component={gstactivity} />


          <Route path={URLS.URLS.testformat} component={testformat} />
          <Route path={URLS.URLS.Ftptest} component={Ftptest} />

          <Route component={pageNotFound} />
        </Switch>
      </div>
    </Router>
  );
};
export default routes;
