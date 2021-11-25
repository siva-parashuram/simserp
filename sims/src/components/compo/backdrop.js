import React, { Fragment } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import '../user/dasboard.css';


class backdrop extends React.Component {
    constructor(props) {
        super(props);
        this.state = {}
    }
    componentDidMount() { }
    render() {
        return (
            <Fragment>
                <Backdrop
                    sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                    open={this.props.open}

                >
                    <CircularProgress color="inherit" />
                </Backdrop>
            </Fragment>
        )
    }

}
export default backdrop;

