import React, { Fragment } from "react";
import "../user/dasboard.css";
import Switch from "@mui/material/Switch";

class customswitchinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {
    return (
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
    );
  }
}
export default customswitchinput;
