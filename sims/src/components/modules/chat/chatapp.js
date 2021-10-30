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
 
import Chip from '@mui/material/Chip';
 
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Badge from '@mui/material/Badge';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import SendIcon from '@mui/icons-material/Send';
import SentimentSatisfiedIcon from '@mui/icons-material/SentimentSatisfied';



const appTitle="Colleagues Online";

class chatapp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            chats:[],
            chatboxtitle:appTitle,
            showChatList:true,
            startChat:false,
            inputMessage:"",
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
                newIncoming:false
            },
            {
                name: "Raj",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:true
            },
            {
                name: "Varun",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:true
            },
            {
                name: "Chang",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:true
            },
            {
                name: "Lin Yii",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:false
            },
            {
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:false
            },
            {
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:false
            },
            {
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:false
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
                <AppBar className="chatAppBar" position="static" style={{backgroundColor:'#004d40'}}>
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
                    sx={{ width: '100%', height: 450, width: 300, maxWidth: 360, bgcolor: 'background.paper',overflowY:'hidden' }}>
                    <div style={{height:450,overflowY:'scroll' }}>
                    {this.state.data.map((item, i) => (
                        <Fragment>
                            <ListItem
                            className="onhoverPointer"
                                secondaryAction={
                                    <IconButton
                                     edge="end" 
                                     aria-label="chat"
                                     onClick={(e)=>startChat(item)}
                                     >
                                        <ChatIcon />
                                    </IconButton>
                                }
                                onClick={(e)=>startChat(item)}
                            >
                                <ListItemAvatar>
                                   {item.newIncoming===true?(
                                    <Badge color="secondary" overlap="circular" badgeContent=" " variant="dot">
                                        <Avatar
                                            onClick={(e) => startChat(item)}
                                        >
                                            {item.name.toString().charAt(0)}
                                        </Avatar>
                                    </Badge>
                                   ):(
                                    <Avatar
                                    onClick={(e) => startChat(item)}
                                >
                                    {item.name.toString().charAt(0)}
                                </Avatar>
                                   )}

                                    
                                   
                                </ListItemAvatar>
                                <ListItemText
                                    primary={
                                        <Fragment>
                                            {item.newIncoming === true ? (
                                                <span><b>{item.name}</b></span>
                                            ) : (
                                                <span>{item.name}</span>
                                            )}

                                        </Fragment>
                                    }
                                    secondary={
                                        <Fragment>
                                            {item.newIncoming === true ? (
                                                <Fragment>
                                                    <b>
                                                        <span>{item.lastMessage}</span>
                                                        <span><br />{item.time}</span>
                                                    </b>
                                                </Fragment>
                                            ) : (
                                                <Fragment>
                                                    <span>{item.lastMessage}</span>
                                                    <span><br />{item.time}</span>
                                                </Fragment>
                                            )}
                                           
                                        </Fragment>
                                    }
                                />
                            </ListItem>
                            <Divider variant="inset" component="li" />
                        </Fragment>
                    ))}
                    </div>
                </List>
            </Fragment>
        );

        const displayChats = (
            <Fragment>
                <List
                    dense={true}
                    sx={{ width: '100%', height: 450, width: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
                    <div style={{height:400,overflowY:'scroll' }}>
                    {this.state.chats.map((item, i) => (
                        <Fragment>
                            <div style={{ marginLeft: 10, marginRight: 10}}>
                                {item.type === "incoming" ? (
                                    <div style={{ textAlign: 'left', marginBottom: 2 }}>
                                        <Chip label={item.message} />
                                    </div>
                                ) : null}
                                {item.type === "outgoing" ? (
                                    <div style={{ textAlign: 'right', marginBottom: 2 }}>
                                        <Chip label={item.message} variant="outlined" />
                                    </div>
                                ) : null}
                            </div>
                        </Fragment>
                    ))}
                    </div>
                </List>
            </Fragment>
        );

        const inputMessageSection = (
            <Fragment>
               
                <Grid container spacing={0}>
                    <Grid xs={12} sm={12} md={1} lg={1}>
                      <div style={{textAlign:'center',marginTop:7,marginLeft:2}}>
                           <SentimentSatisfiedIcon  className="onhoverPointer" sx={{ fontSize: 25,color:'#004d40' }} />
                           </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={9} lg={9}>
                        <div style={{ marginLeft: 5 }}>
                            <TextareaAutosize                                
                                aria-label="Input Message Box"
                                placeholder="Type..."
                                defaultValue={this.state.inputMessage}
                                style={{ width: 200, height: 40 }}
                                className="inputMessageBox"
                            />
                        </div>
                    </Grid>
                    <Grid xs={12} sm={12} md={2} lg={2}>
                        <IconButton aria-label="delete">
                            <SendIcon fontSize="inherit" />
                        </IconButton>
                    </Grid>
                </Grid>
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
                 {chatAppBar}
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
                        {inputMessageSection}
                    </Fragment>
                ):null}
                
                
            </Fragment>
        )
    }

}
export default chatapp;

