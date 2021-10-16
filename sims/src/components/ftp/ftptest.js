import React, { Fragment } from "react";
import axios from "axios";


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
            formData.append('compId', compId);
            console.log("processFileAttach > formData > ", formData);

            const url = "https://192.168.10.106:44356/api/Branch/FileUpload";
            const headers = {
                "Content-Type": "application/json",
            };
            axios
                .post(url, formData, { headers })
                .then((response) => {
          
                })
                .catch((error) => {
                    console.log("error > ", error);
                });
        }

        return (
            <Fragment>
                <h1>Testing...</h1>
                <input type="text" id="compid" placeholder="CompanyID" /><br />
                <input type="file" onChange={(e) => processFileAttach(e)} /><br />
                <button onClick={() => Save()}>Save</button>
            </Fragment>
        )
    }

}
export default ftptest;