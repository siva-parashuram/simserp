import React, { Fragment } from 'react';
import Grid from '@material-ui/core/Grid';
import Chart from "react-google-charts";

class salesDashView extends React.Component {
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
                    <Grid item xs={12} sm={6}>
                        <div style={{ display: 'flex', maxWidth: 900 }}>
                            <Chart
                                width={600}
                                height={300}
                                chartType="ColumnChart"
                                loader={<div>Loading Chart</div>}
                                data={[
                                    ['Products', '2021 Sales', '2020 Sales'],
                                    ['Ferro-MOM 5316', 120000, 50000],
                                    ['FASTag', 700000, 300000],
                                    ['TP NFC Bottle Tag All Surface', 500000, 100000],
                                    ['Roadstar 9535-IN', 750000, 50000],
                                    ['Tyvek RFID Wristbands', 620000, 370000],
                                ]}
                                options={{
                                    title: 'Product wise Sales of Financial Year 2020-2021',
                                    chartArea: { width: '50%' },
                                    hAxis: {
                                        title: 'Total Sales',
                                        minValue: 0,
                                    },
                                    vAxis: {
                                        title: 'Products',
                                    },
                                }}
                                legendToggle
                            />
                        </div>
                    </Grid>
                    <Grid item xs={12} sm={6}>
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

export default salesDashView;