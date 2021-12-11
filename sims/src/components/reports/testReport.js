
import "./invoice.css";
import React, { Fragment } from 'react';
import readXlsxFile from 'read-excel-file'

class testReport extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            ItemRows:[]
        };


    }

    componentDidMount() {


    }


    importExcel=(e)=>{
        if(e.target.files[0]){
            let file = e.target.files[0];
            let chk=this.Validate(file.name);
    
            if (chk) {
                let ItemRows = [];
                readXlsxFile(file).then((rows) => {
                    for (let i = 1; i < rows.length; i++) {
                        let itemRow = {
                            name: rows[i][0],
                            age: rows[i][1],
                            gender: rows[i][2],
                        };
                        ItemRows.push(itemRow);
                    }
                    
                    this.setState({ItemRows:ItemRows});
                })
                
            }else{
                return false;
            }
        }

    }


     Validate=(filename)=> {
        var _validFileExtensions = [".xlsx", ".xls"];   
        var sFileName = filename;
        if (sFileName.length > 0) {
            var blnValid = false;
            for (var j = 0; j < _validFileExtensions.length; j++) {
                var sCurExtension = _validFileExtensions[j];
                if (sFileName.substr(sFileName.length - sCurExtension.length, sCurExtension.length).toLowerCase() == sCurExtension.toLowerCase()) {
                    blnValid = true;
                    break;
                }
            }
            
            if (!blnValid) {
                alert("Sorry, " + sFileName + " is invalid, allowed extensions are: " + _validFileExtensions.join(", "));
                return false;
            }
        }
      
        return true;
    }



    render() {


        return (
            <Fragment>
                <h4>Testing Excel import...</h4>

               
                <input 
                type="file" 
                id="input" 
                onChange={(e)=>this.importExcel(e)}
                />
<br/>
                  <hr/>

                {this.state.ItemRows.map((item, i) => (
                    <tr>
                        <td>{i+1}</td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                        <td>{item.name}</td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                        <td>{item.age}</td>
                        <td>&nbsp;</td><td>&nbsp;</td>
                        <td>{item.gender}</td>
                    </tr>
                ))}
              <hr/>

            </Fragment>
        );
    }
}

export default testReport;