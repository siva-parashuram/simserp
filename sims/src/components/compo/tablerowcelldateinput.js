import React, { Fragment } from 'react';
import '../user/dasboard.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TextField from '@material-ui/core/TextField';
 
 /*
<TextField
type="date"
id={"startdate" + item.id}
variant="outlined"
size="small"
defaultValue={item.StartDate}
onChange={(e) => updateStartDate(e.value, item)}
onKeyDown={(e) => updateListValue("startdate", item, 'startdate' + item.id, 'startno' + item.id, e)}
style={{ width: 125 }}
InputProps={{
    className: "textFieldCss"
}}
/>
*/

 
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
                    type="date"
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
 
