import React, { Fragment } from 'react';
import '../user/dasboard.css';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
 

 
class tablerowcelldropdowninput extends React.Component {
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
                    <select
                        className="dropdown-css"
                        id={this.props.id}
                        label={this.props.label}
                        fullWidth
                        value={parseInt(this.props.value)}
                        onChange={this.props.onChange}
                    >
                        <option value="-">
                            None
                        </option>
                        {
                            this.props.options.map((item, i) => (
                                <option value={item.value}>
                                    {item.name}
                                </option>
                            ))
                        }
                    </select>
                </TableCell>
            </TableRow>
        )
    }

}
export default tablerowcelldropdowninput;
 
