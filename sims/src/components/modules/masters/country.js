import React, { Fragment } from 'react';


class country extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            urlparams: "",
        };
        this.wrapper = React.createRef();    
      }

      componentDidMount() {
        var url = new URL(window.location.href);
        let branchId = url.searchParams.get("branchId");
        let branchName = url.searchParams.get("branchName");
        let compName = url.searchParams.get("compName");
        
        let urlparams = "?branchId=" + branchId + "&compName=" + compName + "&branchName=" + branchName;
        this.setState({
          urlparams: urlparams,
           
        });
      }
}
export default country;