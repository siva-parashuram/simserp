import React, { Fragment } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

  import userDashboard from './user/userDashboard'; 
  import RouteWithSubRoutes from "./RouteWithSubRoutes";

class CompanyList extends React.Component {

    

    componentDidMount() {

    }
    openDashboard() {
        console.log("About to open Dashboard");
        console.log("In CompanyList > ", this.state);
        var url = "";
        const newWindow = window.open(url, '_blank')
        if (newWindow) newWindow.opener = null
    }

    render() {

        const userDashboard = () => (
            <Switch>
              <Route exact path='/userDashboard' component={userDashboard} />
            </Switch>
          )
    

        return (
            <Fragment>
            <Router>
                <ButtonGroup
                    orientation="vertical"
                    color="primary"
                    aria-label=" vertical outlined primary button group"
                >
                    {
                        this.props.state.userCompanyList.map((item, i) => (
                            <Button
                                key={"comp_" + i}
                                size="small"
                                id={"comp_" + item.compID}
                                style={{ textAlign: 'left' }}
                                // onClick={(e) => this.openDashboard(item.compID)}
                            >
                            <Link to="/userDashboard"> {item.compName}</Link>
                               
                            </Button>
                        ))

                    }


                </ButtonGroup>

                

                </Router>
            </Fragment>
        );
    }
}

export default CompanyList;