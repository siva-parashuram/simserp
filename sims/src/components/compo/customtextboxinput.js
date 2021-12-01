import React, { Fragment } from "react";
import "../user/dasboard.css";
import TextField from "@material-ui/core/TextField";

class customtextboxinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {
    return (
      <TextField
        style={
          this.props.disabled === true ?
            { width: '100%', fontSize: 14, backgroundColor: '#f5f5f5' } :
            { width: '100%', fontSize: 14, backgroundColor: '#fff' }

        }
        className="textFieldCss"
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
        multiline={this.props.multiline}
        rows={this.props.rows}
      />
    );
  }
}
export default customtextboxinput;
