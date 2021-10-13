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
            <TableRow>   
                <TableCell align="left" className="no-border-table">{this.props.label}</TableCell>
                <TableCell align="left" className="no-border-table">
                    <select
                        className="dropdown-css"
                        id={this.props.id}
                        label={this.props.label}
                        fullWidth
                        value={isNaN(this.props.value) ? this.props.value : parseInt(this.props.value)}
                        onChange={this.props.onChange}
                    >
                        {this.props.value === null ? (
                            <option value="0">
                                None
                            </option>
                        ) : (
                            <option value="0">
                                None
                            </option>
                        )}

                        {
                            this.props.options.map((item, i) => (
                                <option value={item.value}>
                                    {item.text}
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

