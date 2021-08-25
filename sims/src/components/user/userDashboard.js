import './dasboard.css';
import React, { Fragment } from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
 
import * as URLS from "../../routes/constants";
import Nav from "./nav"; 
import Row1 from "./row1"; 
import BreadCrumb from "./BreadCrumb";


class userDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {     
      isLoggedIn: false,       
    };
    

  }

      componentDidMount() {
         
        if (
          getCookie(COOKIE.USERID) != null 
        ) {
          this.setState({ isLoggedIn: true });
        }else{
          this.setState({ isLoggedIn: false });
          
          
        }

        this.interval = setInterval(() => {          
          let token = getCookie(COOKIE.USERID);
          if (token == "null" || token == null) { 
            this.setState({ isLoggedIn: false });
          }         
        }, 1000);

      }


      

    

    render() {    
      
      const closeWindow=e=>{
        window.close();
      }

        return (
             <div className="navDiv">
              {this.state.isLoggedIn?(
                <div>
                  <Nav />
                   <BreadCrumb data={{ parentBreadcrumb:false, breadcrumb1:false}}/>
                  <Row1/>
                </div>               
              ):(<div>
                 <Alert severity="error">
                 <AlertTitle> Login Expired!</AlertTitle>
                    Please Close & Login Again.<strong>
                    <a href="javscript:Void(0);" onClick={closeWindow} style={{color:'#006064'}}>Close Window</a>
                  </strong>
                </Alert>
                </div>)}
               
             </div>
             
        );
    }
}

export default userDashboard;