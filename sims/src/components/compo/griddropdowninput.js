import React, { Fragment } from "react";
import "../user/dasboard.css";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class griddropdowninput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {
    return (
      <Fragment>
       
        <Grid container spacing={0} style={{ marginBottom: 10 }}>
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
                
                <select
                  style={{ width: "100%" }}
                  className="dropdown-css"
                  id={this.props.id}
                  onChange={this.props.onChange}
                  value={this.props.value}
                  disabled={this.props.disabled}
                >
                  <option value="">Select</option>
                  {this.props.param?this.props.param.map(
                    (item, i) => (
                      <option
                        value={parseInt(item.value)}
                      >
                        {item.name} 
                      </option>
                    )
                  ):null}
                </select>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

      </Fragment>
    );
  }
}
export default griddropdowninput;
