import React, { Fragment } from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';
import { Route, BrowserRouter as Router, Link, Switch } from "react-router-dom";

import * as URLS from "../routes/constants";


class CompanyList extends React.Component {


    componentDidMount() {

    }

    render() {

        return (
            <Fragment>
               

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
                                >
                                    <Link to={URLS.URLS.userDashboard} target="_blank"> {item.compName}</Link>
                                </Button>
                            ))

                        }


                    </ButtonGroup>

                    

                



            </Fragment>
        );
    }
}

export default CompanyList;