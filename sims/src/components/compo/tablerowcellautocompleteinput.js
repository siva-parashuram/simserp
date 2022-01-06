import React, { Fragment } from "react";
import "../user/dasboard.css";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

import Autocomplete from "@mui/material/Autocomplete";

class tablerowcellautocompleteinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {
    const defaultProps = {
      options: this.props.options,
      getOptionLabel: (option) => option.name,
    };
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
              <Autocomplete
                {...defaultProps}
                className="autocomplete-css"
                style={{ width: "100%" }}
                underlineShow={false}
                disablePortal
                id={this.props.id}
                options={this.props.options}
                onChange={this.props.onChange}
                value={this.props.value}
                renderInput={(params) => <TextField
                  className="AutocompletetextFieldCss"
                  variant="standard"
                  size="small"
                  style={{ borderBottomStyle: 'none', marginTop: -5, backgroundColor: this.props.backgroundColor, fontSize: 14 }}
                  {...params} />}
              />
            </Grid>

          </Grid>


        </TableCell>
      </TableRow>
    );
  }
}
export default tablerowcellautocompleteinput;
