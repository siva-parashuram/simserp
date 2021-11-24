import axios from "axios";

import { COOKIE, getCookie } from "../../services/cookie";
import * as APIURLS from "../../routes/apiconstant";
import * as URLS from "../../routes/constants";
//-------------------------------Axios API data fetching reusable function is below-----------------------------------------------

export const getRoles = () => {
  this.setState({ ProgressLoader: false });
  let rows = [];
  let ValidUser = APIURLS.ValidUser;
  ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
  ValidUser.Token = getCookie(COOKIE.TOKEN);
  const headers = {
    "Content-Type": "application/json",
  };
  let GetRolesUrl = APIURLS.APIURL.GetRoles;

  axios
    .post(GetRolesUrl, ValidUser, { headers })
    .then((response) => {
      if (response.status === 200) {
        let data = response.data;
        rows = data;
        return rows;
        //this.setState({ roles: rows, ProgressLoader: true });
      } else {
      }
    })
    .catch((error) => {
      // this.setState({ modules: [], ProgressLoader: true });
      return [];
    });
};

//-------------------------------All reusable custom functions are below-----------------------------------------------

export const removeDuplicates = (inputArray, parameter) => {
  let newArray = [];
  for (let i = 0; i < inputArray.length; i++) {
    let chk = false;
    for (let j = 0; j < newArray.length; j++) {
      if (newArray[j][parameter] === inputArray[i][parameter]) {
        chk = true;
        break;
      } else {
        continue;
      }
    }
    if (chk === false) {
      newArray.push(inputArray[i]);
    }
  }
  return newArray;
};


export const chkDuplicateName = (inputArray, parameter, value) => {
  let duplicateExist = false;
  try{
    for (let i = 0; i < inputArray.length; i++) {
      let v = inputArray[i][parameter];
      v = v.toLowerCase();
      console.log("chkDuplicateName > v > ",v);
      console.log("chkDuplicateName > value > ",value.toLowerCase());
      if (v === value.toLowerCase()) {
        duplicateExist = true;
      }
    }
  }catch(err){}
  return duplicateExist;
};

export const chkDuplicateButExcludeName = (inputArray, parameter,oldValue, value) => {
  let duplicateExist = false;
  try{
    for (let i = 0; i < inputArray.length; i++) {
      let v = inputArray[i][parameter];
      v = v.toLowerCase();
      console.log("chkDuplicateName > v > ",v);
      console.log("chkDuplicateName > value > ",value.toLowerCase());
      if (v === value.toLowerCase() && v!==oldValue.toLowerCase()) {
        duplicateExist = true;
      }
  }
 
  } catch(err){}
  return duplicateExist;
};

export const chkIfNumber=(value)=>{
  let isNumber=false;
  isNumber=!isNaN(+value);  
  return isNumber;
}
export const chkIfBlankOrEmpty = (value) => {
  let isEmpty = false;
  value.trim() === "" ? isEmpty = true : isEmpty = false;
  return isEmpty;
}
export const toString=(value)=>{
  return value?value.trim().toString():value;
}
export const toInt=(value)=>{
  return parseInt(value);
}
export const toFloat=(value)=>{
  return parseFloat(value);
}

export const validateEmail = (input) => {
  let valid=true;
  let  mailformat = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let value=mailformat.test(input)
  if(value===true){
    valid=true;
  }else{
    valid=false;
  }
return valid;
}
 
