import React, { Fragment } from 'react'; 
import '../../user/dasboard.css';
import Grid from '@material-ui/core/Grid';


class companyMasterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      compIDpassed:false 
    };
  }

  componentDidMount() {
    let companyID=this.props.data;
    console.log("In companyMasterDetails > companyID > ",companyID);
    if(companyID===0 || companyID==="null" || companyID==null){
        this.setState({compIDpassed:false});
    }else{
        this.setState({compIDpassed:true});
    }
  }

  render() {
   

    return (
      <div>
        {this.state.compIDpassed==true?(
            <div>
                <h3>Hi</h3>
            </div>
        ):null}
      </div>
    );
  }


}
export default companyMasterDetails;