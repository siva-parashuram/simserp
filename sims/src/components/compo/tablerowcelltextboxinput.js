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
            <TableRow>   {console.log("this.props > ",this.props)}
                <TableCell align="left" className="no-border-table">{this.props.label}</TableCell>
                <TableCell align="left" className="no-border-table">
                <TextField
                    type={this.props.type}
                    id={this.props.id}
                    variant={this.props.variant}
                    size={this.props.size}
                    onChange={this.props.onChange}
                    fullWidth
                    value={this.props.value}
                    InputProps={this.props.InputProps}
                    error={this.props.error}
                    helperText={this.props.helperText}
                    />
                </TableCell>
            </TableRow>
        )
    }

}
export default tablerowcelltextboxinput;
 
