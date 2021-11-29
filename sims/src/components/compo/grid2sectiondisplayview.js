import React, { Fragment } from "react";
import "../user/dasboard.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";

class grid2sectiondisplayview extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {
    return (
      <Fragment>
        <Grid container spacing={0} style={{ marginBottom: 3 }}>
          <Grid item xs={5} sm={5} md={4} lg={4}>
            <Grid container spacing={0}>
              <Grid item xs={12} sm={12} md={12} lg={12}>
                <span className="themeFont">
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
                <div style={{ textAlign: 'right' }}>
                  <span className="GridLabelValue">
                    {this.props.value}
                  </span>
                </div>

              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
export default grid2sectiondisplayview;
