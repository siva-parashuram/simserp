import React, { Fragment, useState } from "react";
import "../../user/dasboard.css";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


import _ from 'lodash';

export default (props) => {
  const [value, setValue] = useState(props.value);
  const prop = _.omit(props, ['onChange', 'value', 'defaultValue']);

  return (
    <Fragment>

      <Grid container spacing={0} style={{ marginBottom: 10 }}>
        <Grid item xs={5} sm={5} md={4} lg={4}>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={12} lg={12}>
              <span className="themeFont" style={{ color: '#212121' }}>
                {props.label}
                {props.isMandatory ? (
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
                  props.disabled === true ?
                    { width: '100%', fontSize: 14, backgroundColor: '#f5f5f5' } :
                    { width: '100%', fontSize: 14 }

                }
                className="textFieldCss"
                type={props.type}
                id={props.id}
                variant={props.variant}
                size={props.size}
                defaultValue={props.defaultValue}
                error={props.error}
                helperText={props.helperText}
                disabled={props.disabled}
                maxlength={props.maxlength}
                multiline={props.multiline}
                rows={props.rows}
                InputProps={props.InputProps}
                value={value? value : props.value}
                onChange={e => { setValue(e.target.value); }}
                onBlur={props.onChange}

              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

    </Fragment>
  );
};


