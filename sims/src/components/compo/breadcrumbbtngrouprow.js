import React, { Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import '../user/dasboard.css';


class breadcrumbbtngrouprow extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                <div className="breadcrumb-height" style={{ marginTop: -5 }}>
                    <Grid container spacing={0}>
                        <Grid item xs={8} sm={8} md={4} lg={4} >
                            <div style={{ marginTop: 8 }}>
                                {this.props.breadcrumb}
                            </div>
                        </Grid>
                        <Grid item xs={4} sm={4} md={8} lg={8}>
                            <div style={{
                                marginLeft: 10,
                                marginTop: 1, paddingTop: 5,
                            }}>
                                <div style={{
                                        borderLeftStyle: "solid",
                                        borderLeftColor: "#bdbdbd",
                                        borderLeftWidth: 1,
                                    }}
                                >
                                    {this.props.buttongroup}
                                </div>
                            </div>
                        </Grid>
                    </Grid>
                    
                </div>
                <div style={{
                    height:22
                }}>&nbsp;</div>
                 
            </Fragment>
        )
    }

}
export default breadcrumbbtngrouprow;

