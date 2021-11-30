import React, { Fragment } from "react";
import "../../../user/dasboard.css";
import * as APIURLS from "../../../../routes/apiconstant";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@mui/material/ButtonGroup";

import * as URLS from "../../../../routes/constants";
import TopFixedRow3 from "../../../compo/breadcrumbbtngrouprow";
import Breadcrumb from "../../../compo/breadcrumb";

class viewpo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() { }
  render() {

    const breadcrumbHtml = (
      <Fragment>
        <Breadcrumb
          linkHref={URLS.URLS.userDashboard + this.state.urlparams}
          linkTitle="PO-10001"
          typoTitle="View"
          level={1}
        />
      </Fragment>
    );

    const buttongroupHtml = (
      <Fragment>
        <ButtonGroup
          size="small"
          variant="text"
          aria-label="Action Menu Button group"
        >

          <Button
            startIcon={APIURLS.buttonTitle.send.icon}
            className="action-btns"
            
          >
            {APIURLS.buttonTitle.send.name}
          </Button>

          <Button
            startIcon={APIURLS.buttonTitle.print.icon}
            className="action-btns"
          >
            {APIURLS.buttonTitle.print.name}
          </Button>


        </ButtonGroup>
      </Fragment>
    );

    return (
      <Fragment>
        <div style={{ marginLeft: 20, marginRight: 20 }}>
          <div style={{ height: 5 }}>&nbsp;</div>

          <TopFixedRow3
            breadcrumb={breadcrumbHtml}
            buttongroup={buttongroupHtml}
          />
          
          <div style={{ marginLeft: 25, marginRight: 25,height:400 }}>
          <Grid container spacing={0}>
            HI! Main content displays here
          </Grid>
          </div>

         
        </div>
      </Fragment>
    );
  }
}
export default viewpo;
