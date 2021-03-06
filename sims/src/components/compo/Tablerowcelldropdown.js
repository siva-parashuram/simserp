import React, { Fragment } from 'react';
import '../user/dasboard.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';



class tablerowcelldropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <TableRow>
            <TableCell align="left" className="no-border-table">
              {this.props.label}
              {this.props.isMandatory?( <span style={{color:'red'}}> *</span> ):null}
              </TableCell>
            <TableCell align="left" className="no-border-table">
              <select
                 className="dropdown-css"
                style={{minWidth: "100%",height:"30px"}}
                id={this.props.id}
                label={this.props.label}
                defaultValue={isNaN(this.props.value) ? this.props.value : parseInt(this.props.value)}
                value={isNaN(this.props.value) ? this.props.value : parseInt(this.props.value)}
                onChange={this.props.onChange} 
                disabled={this.props.disabled}
                error={this.props.error}
                helperText={this.props.helperText}
                // InputProps={{
                //   className: "dropdown-css",
                // }} 
                
              >
                <option value="-1" >Select</option>
                {this.props.options?this.props.options.map((item, i) => (
                   <option
                   value={parseInt(item.value)}
                   
                 >
                   {item.name} 
                 </option>
                )):null} 
              </select>
            </TableCell>
          </TableRow>
        )
    }

}
export default tablerowcelldropdown;

