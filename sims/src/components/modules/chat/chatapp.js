import '../../user/dasboard.css';
import React, { Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import ChatIcon from '@mui/icons-material/Chat';


import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';



const appTitle="Colleagues Online";

class chatapp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chats:[],
            chatboxtitle:appTitle,
            showChatList:true,
            startChat:false
        }
    }
    componentDidMount() {
        this.getChatUsers();
    }

    getChatUsers = () => {
        let cu = [
            {
                name: "Samih Kuttan",
                lastMessage: "Hey how are you",
                time: "10/30/2021 11:00AM",
            },
            {
                name: "Raj",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
            },
            {
                name: "Varun",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
            },
            {
                name: "Chang",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
            },
            {
                name: "Lin Yii",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
            },
            {
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
            },
            {
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
            },
            {
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
            }

        ];
        this.setState({ data: cu });

    }

    getChats = (item) => {
        let chats = [
            {
                type:"incoming",
                message: "Hi",
                date:"10/30/2021",
                time: "11:00AM",
            },
            {
                type:"incoming",
                message: "Is invoice generated?",
                date:"10/30/2021",
                time: "11:00AM",
            },
            {
                type:"outgoing",
                message: "I am preparing. ",
                date:"10/30/2021",
                time: "11:05AM",
            }, 
            {
                type:"outgoing",
                message: "Let you know once its done.",
                date:"10/30/2021",
                time: "11:05AM",
            }
       

        ];
        this.setState({ chats: chats });

    }

    render() {

        

        const StyledInputBase = styled(InputBase)(({ theme }) => ({
            color: 'inherit',
            '& .MuiInputBase-input': {
                padding: theme.spacing(1, 1, 1, 0),
                // vertical padding + font size from searchIcon
                paddingLeft: `calc(1em + ${theme.spacing(4)})`,
               transition: theme.transitions.create('width'),
                width: '100%',
                [theme.breakpoints.up('sm')]: {
                    width: '12ch',
                    '&:focus': {
                        width: '20ch',
                    },
                },
            },
        }));

        const chatAppBar = (
            <Box sx={{width: '100%', flexGrow: 1 }}>
                <AppBar position="static" style={{backgroundColor:'#004d40'}}>
                    <Toolbar>    
                        {this.state.startChat===true?(
                            <IconButton
                            size="small"
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            sx={{ mr: 2 }}
                            onClick={(e)=>showChatList()}
                        >
                            <ArrowBackIcon />
                        </IconButton>
                        ):null}
                        
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                        >
                          {this.state.chatboxtitle}
                        </Typography>                        
                    </Toolbar>
                </AppBar>
            </Box>
        );

        const userList = (
            <Fragment>                             
                <List
                    dense={true}
                    sx={{ width: '100%', height: 450, width: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
                    {this.state.data.map((item, i) => (
                        <Fragment>
                            <ListItem
                                secondaryAction={
                                    <IconButton
                                     edge="end" 
                                     aria-label="chat"
                                     onClick={(e)=>startChat(item)}
                                     >
                                        <ChatIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemAvatar>
                                    <Avatar>
                                        {item.name.toString().charAt(0)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={item.name}
                                    secondary={
                                        <Fragment>
                                            <span>{item.lastMessage}</span>
                                            <span><br />{item.time}</span>
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))}
                </List>
            </Fragment>
        );

        const displayChats = (
            <Fragment>
                <List
                    dense={true}
                    sx={{ width: '100%', height: 450, width: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
                    {this.state.chats.map((item, i) => (
                        <Fragment>
                             <h6>{item.message}</h6>
                        </Fragment>
                    ))}
                </List>
            </Fragment>
        );


        const startChat=(item)=>{
            this.getChats(item);
            this.setState({chatboxtitle:item.name,startChat:true,showChatList:false});
        }

        const showChatList=()=>{
            this.setState({chats:[],chatboxtitle:appTitle,startChat:false,showChatList:true});
        }


        return (
            <Fragment>
                 <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {chatAppBar}
                        </Grid>
                    </Grid>
                {this.state.showChatList===true?(
                    <Fragment>                   
                    <Grid container spacing={0}>
                        <Grid item xs={12} sm={12} md={12} lg={12}>
                            {userList}
                        </Grid>
                    </Grid>
                </Fragment>
                ):null}
                
                {this.state.startChat===true?(
                    <Fragment>
                        {displayChats}
                    </Fragment>
                ):null}
                
                
            </Fragment>
        )
    }

}
export default chatapp;

