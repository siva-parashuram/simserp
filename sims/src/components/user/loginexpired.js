import './dasboard.css';
import React, { Fragment } from 'react';

class loginexpired extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() { }

    render() {
        const closewindow = () => {
            window.close();
        }
        return (
            <Fragment >
                <h4>Login Expired! Close and log in again</h4>
                <a
                    href="#"
                    onClick={closewindow}>
                    Close</a>
            </Fragment>
        );
    }
}
export default loginexpired;