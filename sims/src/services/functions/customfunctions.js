import axios from "axios";
//-------------------------------Axios API data fetching reusable function is below-----------------------------------------------

 export  const   Axios = async(url=null, data=null, headers=null) => {
    console.log("Axios > url > ",url);
        console.log("Axios > data > ",data);
        console.log("Axios > headers > ",headers);
        let responseData = null;
        await axios.post(url, data, { headers })
            .then(response => {
                console.log("Axios > response > ",response);  
                responseData = response
                 return responseData;
            }
            ).catch(error => {
                responseData = "E";
                return responseData;
            }); 
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