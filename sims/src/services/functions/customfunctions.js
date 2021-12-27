import * as APIURLS from "../../routes/apiconstant";

export const SET_BRANCH_WINDOW_PARAMS=(urlParameters)=>{   
  let params = new URLSearchParams(urlParameters);  
  let _BranchInitialParams="_initialParams"+"_"+urlParameters.branchId;
  localStorage.setItem(_BranchInitialParams, "?"+params.toString());
  return params.toString();
}

export const SETPARAMS=(initialParams,keyArray)=>{   
  let params = new URLSearchParams(initialParams);
  for(let i=0;i<keyArray.length;i++){
    params.set(keyArray[i].key, keyArray[i].value);
  }  
  params.toString();
  return params; 
}

export const GET_URL_PARAMS = () => {
  let initialParams = "";
  try {
    var url = new URL(window.location.href);
    var bid = url.searchParams.get("bid");
    initialParams = localStorage.getItem('_initialParams_' + bid);
    if(initialParams===null || initialParams==='undefined' || initialParams ===undefined){
      var bid = url.searchParams.get("branchId");
      initialParams = localStorage.getItem('_initialParams_' + bid);
    }
    initialParams.toString();
  } catch (e) { }

  return initialParams;
}

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

export const numberInWords = (s) => {// System for American Numbering 
  var th_val = ['', 'thousand', 'million', 'billion', 'trillion'];
  // System for uncomment this line for Number of English 
  // var th_val = ['','thousand','million', 'milliard','billion'];

  var dg_val = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  var tn_val = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  var tw_val = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  s = s.toString();
  s = s.replace(/[\, ]/g, '');
  if (s != parseFloat(s))
    return 'not a number ';
  var x_val = s.indexOf('.');
  if (x_val == -1)
    x_val = s.length;
  if (x_val > 15)
    return 'too big';
  var n_val = s.split('');
  var str_val = '';
  var sk_val = 0;
  for (var i = 0; i < x_val; i++) {
    if ((x_val - i) % 3 == 2) {
      if (n_val[i] == '1') {
        str_val += tn_val[Number(n_val[i + 1])] + ' ';
        i++;
        sk_val = 1;
      } else if (n_val[i] != 0) {
        str_val += tw_val[n_val[i] - 2] + ' ';
        sk_val = 1;
      }
    } else if (n_val[i] != 0) {
      str_val += dg_val[n_val[i]] + ' ';
      if ((x_val - i) % 3 == 0)
        str_val += 'hundred ';
      sk_val = 1;
    }
    if ((x_val - i) % 3 == 1) {
      if (sk_val)
        str_val += th_val[(x_val - i - 1) / 3] + ' ';
      sk_val = 0;
    }
  }
  if (x_val != s.length) {
    var y_val = s.length;
    str_val += 'point ';
    for (var i = x_val + 1; i < y_val; i++)
      str_val += dg_val[n_val[i]] + ' ';
  }
  return str_val.replace(/\s+/g, ' ');
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


 
