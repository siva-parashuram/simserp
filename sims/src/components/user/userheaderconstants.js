import './dasboard.css';
import React, { Fragment } from 'react'; 
import Nav from "./nav"; 
import Menusection from "./menusection";
class userheaderconstatnts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Fragment>
        {/* <div className="fixedElement">
          <Nav navBranchNameTitle={this.props.branchName}/>
        </div> */}
        <div style={{ marginTop: 48 }}></div>
        {/* <Menusection /> */}
      </Fragment>
    );
  }
}

export default userheaderconstatnts;