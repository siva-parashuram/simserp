import React, { Fragment } from 'react';
import '../user/dasboard.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
  
class tablerowcelltextboxinput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <TableRow>   
                <TableCell align="left" className="no-border-table">{this.props.label}</TableCell>
                <TableCell align="left" className="no-border-table">
                <TextField
                className="textFieldCss"
                    style={{minWidth:"80%"}}
                    type="date"
                    id={this.props.id}
                    variant={this.props.variant}
                    // size={this.props.size}
                    onChange={this.props.onChange}
                   
                    value={this.props.value}
                    defaultValue={this.props.defaultValue}
                    // InputProps={{
                    //     className: "textFieldCss",
                    //   }} 
                    error={this.props.error}
                    helperText={this.props.helperText}
                    />
                </TableCell>
            </TableRow>
        )
    }

}
export default tablerowcelltextboxinput;
 
