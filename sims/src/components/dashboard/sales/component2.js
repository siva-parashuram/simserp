import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Chart from "react-google-charts";

class component2 extends React.Component {
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
                <Grid container spacing={0}>
                    <Grid item xs={12} sm={12} md={6} lg={6}>
                        <Chart
                            width={'600px'}
                            height={'300px'}
                            chartType="PieChart"
                            loader={<div>Loading Chart</div>}
                            data={[
                                ['Products', 'Sold Quantities'],
                                ['Roadstar 9535-IN', 11],
                                ['TP NFC Bottle Tag All Surface', 2],
                                ['Tyvek RFID Wristbands', 2],
                                ['TP NFC Bottle Tag All Surface', 2],
                                ['FASTag', 7],
                            ]}
                            options={{
                                title: 'Products Sold Synopsis',
                                // Just add this option
                                is3D: true,
                            }}
                            rootProps={{ 'data-testid': '2' }}
                        />
                    </Grid>
                </Grid>


            </Fragment>
        );
    }

}

export default component2;