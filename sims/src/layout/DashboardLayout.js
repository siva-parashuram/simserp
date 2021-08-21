import React, { Component } from "react";
import DocumentTitle from "react-document-title";

 
 

 

class DashboardLayout extends Component {
  render() {
    let { title } = this.props;
    return (
      <DocumentTitle title={title}>
       <div>
          <h4>Dashboard</h4>
       </div>
      </DocumentTitle>
    );
  }
}

export default DashboardLayout;
