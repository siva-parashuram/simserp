import React, { Fragment } from "react";
import "../user/dasboard.css";

import Grid from "@material-ui/core/Grid";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

class gridautocompletedropdowninput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {

    const defaultProps = {
      options: this.props.options,
      getOptionLabel: (option) => option.label,
    };

    return (
      <Fragment>
        <Grid container spacing={0} style={{ marginBottom: 10 }}>
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="themeFont" style={{ color: "#212121" }}>
                  {this.props.label}
                  {this.props.isMandatory ? (
                    <span style={{ color: "red" }}> *</span>
                  ) : null}
                </span>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={5} sm={5} md={8} lg={8}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <Autocomplete
                  style={{ width: "100%" }}
                  className="autocomplete-css"
                  underlineShow={false}
                  disabled={this.props.disabled}
                  disablePortal
                  id={this.props.id}
                  options={this.props.options}
                  onChange={this.props.onChange}
                  value={this.props.value}
                  renderInput={(params) => (
                    <TextField
                      className="AutocompletetextFieldCss"
                      variant="standard"
                      size="small"
                      style={{ borderBottomStyle: "none", marginTop: -5 }}
                      {...params}
                    />
                  )}
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default gridautocompletedropdowninput;
