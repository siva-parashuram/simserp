 

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









/*-----------------------------------------------------ED---------------------------------------------------------- */

export const encrypt=()=>{
  let keys="a0b1c!2d3l_mno@pqre4$f5g*6h7i8j9ks-tuvw#xyz";
  

}

getHash=(keys)=>{
  var hash = 0, i, chr;
  if (this.length === 0) return hash;
  for (i = 0; i < this.length; i++) {
    chr   = this.charCodeAt(i);
    hash  = ((hash << 5) - hash) + chr;
    hash |= 0; // Convert to 32bit integer
  }
  return hash;
}


/*--------------------------------------------------------------------------------------------------------------- */


 
