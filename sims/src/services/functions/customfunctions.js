import * as APIURLS from "../../routes/apiconstant";


//remove particular opened branch by branch id
export const UPDATE_BRANCH_OPEN_REMOVE = (branchId) => {
    
  let BRANCH_OPEN = localStorage.getItem('BRANCH_OPEN');
  if (BRANCH_OPEN) {
    var BRANCH_OPENArray = BRANCH_OPEN.split(",").map(Number);
    var newBRANCH_OPEN = [];
    for (let i = 0; i < BRANCH_OPENArray.length; i++) {
      if (parseInt(BRANCH_OPENArray[i]) === parseInt(branchId)) {

      } else {
        newBRANCH_OPEN.push(BRANCH_OPENArray[i]);
      }
    }
    localStorage.setItem('BRANCH_OPEN', newBRANCH_OPEN.toString());
  }
}

//remove all the branch list opened. Specialy when logout is clicked.
export const EMPTY_BRANCH_OPEN = () => {
  var newBRANCH_OPEN = [];
  localStorage.setItem('BRANCH_OPEN', newBRANCH_OPEN.toString());
}

export const CHECK_IF_BRANCH_IS_OPEN = (branchId) => {
  let isPresent = false;
  let BRANCH_OPEN = localStorage.getItem('BRANCH_OPEN');
  console.log("CHECK_IF_BRANCH_IS_OPEN > BRANCH_OPEN > ",BRANCH_OPEN);

  try{
    var BRANCH_OPEN_ARRAY =[];
    if(BRANCH_OPEN){
      BRANCH_OPEN_ARRAY=BRANCH_OPEN.split(",").map(Number);
    }     
    for (let i = 0; i < BRANCH_OPEN_ARRAY.length; i++) {
      if (BRANCH_OPEN_ARRAY[i] === parseInt(branchId)) {
        isPresent = true;
        break;
      }
    }
  }catch(ex){
    console.log("CHECK_IF_BRANCH_IS_OPEN > EX > ",ex);
  }
 
  return isPresent;
}

export const ADD_NEW_BRANCH_OPEN = (branchId) => {
  
  let BRANCH_OPEN = localStorage.getItem('BRANCH_OPEN');
  try{
    var BRANCH_OPEN_ARRAY =[];
    if(BRANCH_OPEN){
      BRANCH_OPEN_ARRAY=BRANCH_OPEN.split(",").map(Number);
      BRANCH_OPEN_ARRAY.push(branchId);
      localStorage.setItem('BRANCH_OPEN', BRANCH_OPEN_ARRAY.toString()); 
    }else{
      BRANCH_OPEN_ARRAY.push(branchId);
      localStorage.setItem('BRANCH_OPEN', BRANCH_OPEN_ARRAY.toString()); 
    } 
  }catch(ex){
    console.log("CHECK_IF_BRANCH_IS_OPEN > EX > ",ex);
  } 
}
 

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


/*-------------------------------------------------------------------------------------------------------------*/

export const FILE_UPLOAD_FORMDATA = (ValidUser,e, category,companyId,branchId) => {
  const formData = new FormData();
  formData.append('UserID', parseInt(ValidUser.UserID));
  formData.append('Token', ValidUser.Token);
  let file = e.target.files[0];
  switch (category) {
      case "company":
          formData.append('CompanyId', companyId);
          formData.append('BranchID', 0);
          formData.append('Transaction', APIURLS.TrasactionType.default);
          formData.append('TransactionNo', "");
          formData.append('FileData', file);
          break;
      case "branch":
          formData.append('CompanyId', companyId);
          formData.append('BranchID', branchId);
          formData.append('Transaction', APIURLS.TrasactionType.default);
          formData.append('TransactionNo', "");
          formData.append('FileData', file);
          break;

  }
  return formData;
}





/*-----------------------------------------------------ED---------------------------------------------------------- */

export const encrypt=()=>{
  let keys="a0b1c!2d3l_mno@pqre4$f5g*6h7i8j9ks-tuvw#xyz";


}

 


/*--------------------------------------------------------------------------------------------------------------- */


 
