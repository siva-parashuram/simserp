import '../../user/dasboard.css';
import React, { Fragment } from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CardActions from '@material-ui/core/CardActions';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';

class activities extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            FullScreenDialog: false
        };


    }

    componentDidMount() {

    }

    render() {
        return (
            <Fragment>
                <Card className="dash-activity-card" raised={false}>
                    <CardContent>
                        <Typography color="textSecondary" style={{ fontSize: 12 }} gutterBottom>
                            Sales This Month
                        </Typography>
                        <div style={{ height: 20 }}></div>
                        <Typography variant="h5" component="h2" className="dashComp-card-h5">
                            &#8377; 1,90,000
                        </Typography>
                        <Divider />
                        <div style={{ height: 20 }}></div>
                        <CardActions>
                            <ChevronRightIcon />
                            <a href="#" className="LINK">See More</a>
                        </CardActions>
                    </CardContent>
                </Card>
            </Fragment>
        );
    }
}

export default activities;