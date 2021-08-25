 
import React, { Fragment } from 'react';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link'; 

class BreadCrumb extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          parentBreadcrumb:false,  
          breadcrumb1:false
        };   
      }

    componentDidMount() {
       let data= this.props.data;
       console.log("data > ",data);
       if(data.parentBreadcrumb)this.setState({parentBreadcrumb:true});
       if(data.breadcrumb1)this.setState({breadcrumb1:true});
    }

    render() {
        function handleClick(event) {
            event.preventDefault();
            console.info('You clicked a breadcrumb.');
          }

        return (
            <div style={{marginTop:50}}>
                <Breadcrumbs aria-label="breadcrumb">
                {this.state.parentBreadcrumb?(
                    <Link color="inherit" href="/" onClick={handleClick} >
                        Dashboard
                    </Link>
                ):null}
                
                { this.state.breadcrumb1?(
                    <Typography color="textPrimary">Link1</Typography>
                ):null}           
                
            </Breadcrumbs>              
            </div>
        );
    }
}

export default BreadCrumb;