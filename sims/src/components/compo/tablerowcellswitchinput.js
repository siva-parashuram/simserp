import React, { Fragment } from 'react';
import '../user/dasboard.css';
import Switch from "@mui/material/Switch";
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';




class tablerowcellswitchinput extends React.Component {
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
                </TableCell>
                <TableCell align="left" className="no-border-table">
                    
                    <Switch                    
                        key={this.props.key}
                        id={this.props.id}
                        size="small"
                        checked={
                            this.props.param
                                ? this.props.param === true
                                    ? "checked"
                                    : "unchecked"
                                : null
                        }
                        onChange={this.props.onChange}
                    />
                     
                    
                </TableCell>
            </TableRow>
        )
    }

}
export default tablerowcellswitchinput;

