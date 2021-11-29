import React, { Fragment } from "react";
import "../user/dasboard.css"; 
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class gridtextboxinput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {
    return ( 
      <Fragment>

        <Grid container spacing={0} style={{marginBottom:10}}>
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="themeFont" style={{ color: '#212121' }}>
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
                 
                <TextField
                  style={
                    this.props.disabled===true? 
                    {width: '100%', fontSize: 14,backgroundColor:'#f5f5f5' }:
                    {width: '100%', fontSize: 14 }
                    
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
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Fragment>
    );
  }
}
export default gridtextboxinput;
