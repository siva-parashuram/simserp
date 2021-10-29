import React, { Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import '../user/dasboard.css';


class sectiontitle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <div >
                            <div style={{marginTop:"40px"}} className="dash-row-header dash-header">
                                <h1 className="dash-row-header-title">{this.props.title}</h1>
                            </div>
                        </div>
                    </Grid>
                </Grid>
            </Fragment>
        )
    }

}
export default sectiontitle;

