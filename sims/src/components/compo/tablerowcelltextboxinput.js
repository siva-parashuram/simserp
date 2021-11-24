import React, { Fragment } from "react";
import "../user/dasboard.css";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class tablerowcelltextboxinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {}
  render() {
    return (
      <TableRow>
        <TableCell align="left" className="no-border-table" 
        // style={{maxWidth:100}} 
        >
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={10} lg={10}>
            {this.props.label}
          {this.props.isMandatory ? (
            <span style={{ color: "red" }}> *</span>
          ) : null}
            </Grid>
            <Grid item xs={12} sm={12} md={2} lg={2}></Grid>
          </Grid>
          
        </TableCell>
        <TableCell align="left" className="no-border-table">
          
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
            <TextField
             style={{ minWidth: '100%', maxWidth:'100%',width:'100%', fontSize:14}}
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
            </Grid>  
                     
          </Grid>


        </TableCell>
      </TableRow>
    );
  }
}
export default tablerowcelltextboxinput;
