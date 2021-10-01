import axios from "axios";

import { COOKIE, getCookie } from "../../services/cookie";
import * as APIURLS from "../../routes/apiconstant";
import * as URLS from "../../routes/constants";
//-------------------------------Axios API data fetching reusable function is below-----------------------------------------------

export const getRoles=()=>{
    this.setState({ ProgressLoader: false });
    let rows = [];
    let ValidUser = APIURLS.ValidUser;
    ValidUser.UserID = parseInt(getCookie(COOKIE.USERID));
    ValidUser.Token = getCookie(COOKIE.TOKEN);
    const headers = {
        "Content-Type": "application/json"
    };
    let GetRolesUrl = APIURLS.APIURL.GetRoles;

    axios.post(GetRolesUrl, ValidUser, { headers })
        .then(response => {
            console.log("getRoles > response > ", response);
            if (response.status === 200) {
                let data = response.data;
                rows = data;
                return rows;
                //this.setState({ roles: rows, ProgressLoader: true });
            } else {

            }
        }
        ).catch(error => {
            console.log("getRoles > error > ", error);
            // this.setState({ modules: [], ProgressLoader: true });
            return [];
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