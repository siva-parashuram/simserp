import React, { Fragment } from "react";
import "../user/dasboard.css";


import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

class customautocompletecomponent extends React.Component {
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
          style={{ borderBottomStyle: 'none', marginTop: -5 }}
          {...params} />}
      />
    );
  }
}
export default customautocompletecomponent;
