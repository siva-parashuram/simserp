import './dasboard.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { COOKIE, createCookie, deleteCookie, getCookie } from "../../services/cookie";
import * as URLS from "../../routes/constants";

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

class nav extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    componentDidMount() {
        let token = getCookie(COOKIE.USERID);
        if (token == "null" || token == null) {
            this.setState({ isLoggedIn: false });
            this.props.history.push(URLS.URLS.LoginPage);
        } else {
            //set cookie here
            let initialName = "A";
            let Name = "Admin";

        }
    }


    render() {

        const useStyles = makeStyles((theme) => ({
            root: {
                flexGrow: 1,
            },
            menuButton: {
                marginRight: theme.spacing(2),
            },
            title: {
                flexGrow: 1,
            },
            IconsAlign: {
                justifyContent: "flex-end",
                alignItems: "flex-end"
            }

        }));



        return (
            <div className={useStyles.root}>
                <AppBar className="navDiv" position="absolute" style={{ width: '100%', margin: 0, backgroundColor: '#0072bc' }}>
                    <Toolbar variant="dense">

                        <IconButton
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            // onClick={processDialogOpen}
                            color="inherit"
                            className="alignSectionItems"
                        >
                            <Avatar aria-label="recipe" style={{ backgroundColor: '#00acc1 ' }}>
                                S
                            </Avatar>
                        </IconButton>
                    </Toolbar> 
                </AppBar>




            </div>
        );
    }
}

export default nav;