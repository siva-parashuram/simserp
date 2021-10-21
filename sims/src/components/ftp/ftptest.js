import React, { Fragment } from "react";
import axios from "axios";
import * as APIURLS from "../../routes/apiconstant";
import { saveAs } from 'file-saver';


class ftptest extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() { }

    render() {
        const formData = new FormData()
        // formData.append('fileUpload', file);

        const processFileAttach = (e) => {
            console.log("processFileAttach > e > ", e);
            let data = e.target.files;
            console.log("processFileAttach > data > ", data);
            let file = data[0];
            console.log("processFileAttach > file > ", file);
            formData.append('FileData', file);

        }


        const Save = () => {
            let compId = document.getElementById("compid").value;
            console.log("processFileAttach > compId > ", compId);
            formData.append('CompanyId', compId);
            console.log("processFileAttach > formData > ", formData);

            const url = APIURLS.APIURL.FileDownloadTEST;
            const headers = {
                "Content-Type": "application/json",
            };



            const d = new FormData();
            d.append('companyId', 1);
            d.append('BranchID', 0);
            d.append('Transaction', "");
            d.append('TransactionNo', "");
            d.append('FileName', "banner.png");
            d.append('UserID', 1);
            d.append('Token', 'xk1 amf53ym1BffD');

            var xmlHttp = new XMLHttpRequest();
            xmlHttp.onreadystatechange = function () {
                if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
                    console.log("xmlHttp.responseText ", xmlHttp);
                    
                    console.log("xmlHttp.response", xmlHttp.response );
                    
                   

                  
                    var blob = new Blob([xmlHttp.response], {type: "application/octet-stream"}); //{ type: "application/octet-stream" }
                    

                }
            }
            xmlHttp.open("post", url);
            xmlHttp.send(d);

            /*  type: mime
            axios
                .post(url, d, { headers })
                .then((response) => {
                    console.log("response", response);

                    let reader = new FileReader();
                   
                   
                    var blob = new Blob([response.data], {type: "application/octet-stream"}); //{ type: "application/octet-stream" }
                    console.log("blob > ", blob);
                    var url = window.URL || window.webkitURL;
                    let link = url.createObjectURL(blob);
                    document.getElementById("download-link").href = link;
                    document.getElementById("view-img").src=link;

                     
                   //saveAs(blob, "banner.png");
   


                   
                })
                .catch((error) => {
                    console.log("error > ", error);
                });
*/

        }

        return (
            <Fragment>
                <h1>Testing...</h1>
                <input type="text" id="compid" placeholder="CompanyID" /><br />
                <input type="file" onChange={(e) => processFileAttach(e)} /><br />
                <button onClick={() => Save()}>Save</button>

                <br />
                <a id="download-link" href="" download="banner.png">Download here</a>
                <hr />
                <br />

                <img id="view-img" src="" />
            </Fragment>
        )
    }

}
export default ftptest;