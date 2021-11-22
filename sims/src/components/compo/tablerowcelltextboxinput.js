import React, { Fragment } from "react";
import "../user/dasboard.css";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";

class tablerowcelltextboxinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <TableRow>
        <TableCell align="left" className="no-border-table">
          {this.props.label}
          {this.props.isMandatory ? (
            <span style={{ color: "red" }}> *</span>
          ) : null}
        </TableCell>
        <TableCell align="left" className="no-border-table">
          <TextField
             style={{ minWidth: "80%"}}
            className="textFieldCss"
            // style={this.props.style}
            type={this.props.type}
            id={this.props.id}
            variant={this.props.variant}
            size={this.props.size}
            onChange={this.props.onChange}
            defaultValue={this.props.value}
            value={this.props.value}
            error={this.props.error}
            helperText={this.props.helperText}
            disabled={this.props.disabled}
           
            maxlength={this.props.maxlength}
          />
        </TableCell>
      </TableRow>
    );
  }
}
export default tablerowcelltextboxinput;
