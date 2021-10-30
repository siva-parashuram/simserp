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
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import Picker from 'emoji-picker-react';



const appTitle="Colleagues Online";
 

class chatapp extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id:undefined,
            EmojianchorEl:false,
            openEmojiBlock:false,
            data: [],
            chats:[],
            chatboxtitle:appTitle,
            showChatList:true,
            startChat:false,
            inputMessage:"",
            emojiObject:"",
        }
    }
    componentDidMount() {
        this.getChatUsers();
    }

    getChatUsers = () => {
        let cu = [
            {
                userid:1,
                name: "Samih Kuttan",
                lastMessage: "Hey how are you",
                time: "10/30/2021 11:00AM",
                newIncoming:false
            },
            {
                userid:2,
                name: "Raj",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:true
            },
            {
                userid:3,
                name: "Varun",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:true
            },
            {
                userid:4,
                name: "Chang",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:true
            },
            {
                userid:5,
                name: "Lin Yii",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:false
            },
            {
                userid:6,
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:false
            },
            {
                userid:7,
                name: "Richard",
                lastMessage: "Hi",
                time: "10/19/2021 09:30AM",
                newIncoming:false
            },
            {
                userid:8,
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
            },
            {
                type:"outgoing",
                message: "I am preparing. ",
                date:"10/30/2021",
                time: "11:05AM",
            }, 
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
                message: "Let you know once its done.",
                date:"10/30/2021",
                time: "11:05AM",
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
            }, {
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
                    sx={{ width: '100%', height: 330, width: 300, maxWidth: 360, bgcolor: 'background.paper' }}>
                    <div style={{height:300,overflowY:'scroll' }}>
                    {this.state.chats.map((item, i) => (
                        <Fragment>
                            <div style={{ marginLeft: 10, marginRight: 10}}>
                                {item.type === "incoming" ? (
                                    <div style={{ textAlign: 'left', marginBottom: 2 }}>
                                        <div style={{marginBottom:-2,marginLeft:5}}>
                                            <span style={{fontSize:10,color:'#b0bec5'}}>{item.time}</span>
                                        </div>
                                        <Chip 
                                        style={{minWidth:90,textAlign:'left',backgroundColor:'#26a69a',color:'#000000'}} 
                                        label={item.message} />
                                    </div>
                                ) : null}
                                {item.type === "outgoing" ? (
                                    <div style={{ textAlign: 'right', marginBottom: 2 }}>
                                         <div style={{marginBottom:-2,marginRight:5}}>
                                             <span style={{fontSize:10,color:'#b0bec5'}}>{item.time}</span>
                                         </div>
                                        <Chip style={{minWidth:90,textAlign:'left',backgroundColor:'#e0f2f1',borderStyle:'none'}} label={item.message} variant="outlined" />
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
                        <div style={{ textAlign: 'center', marginTop: 7, marginLeft: 2 }}>
                            {this.state.EmojianchorEl === true ? (
                                <KeyboardArrowDownIcon
                                    className="onhoverPointer"
                                    sx={{ fontSize: 25, color: '#004d40' }}
                                    onClick={(e) => handleEmojiBtnClick()}
                                />
                            ) : (
                                <SentimentSatisfiedIcon
                                    className="onhoverPointer"
                                    sx={{ fontSize: 25, color: '#004d40' }}
                                    onClick={(e) => handleEmojiBtnClick()}
                                />
                            )}
                           
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
                                onChange={(e)=>setTypedMessage(e)}
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


        const emojiSection=(
            <Fragment>
                <div style={{height:200,overflowY:'scroll', backgroundColor:'#eceff1'}}>
                   <Picker onEmojiClick={(e)=>onEmojiClick(e)}  />
                </div>
            </Fragment>
        );

        const onEmojiClick=(event, emojiObject)=>{
            this.setState({emojiObject:""}); 
            console.log("onEmojiClick > event >",event);
            console.log("onEmojiClick > event.target >",event.target);
            console.log("onEmojiClick > event.unified >",event.unified);
            
            console.log("onEmojiClick > emojiObject >",emojiObject);
            this.setState({emojiObject:event.target}); 

        };

        const setMessageType=()=>{
            // inputMessage
            let newMessage="";
            newMessage=this.state.inputMessage+this.state.emojiObject;
            this.setState({inputMessage:newMessage}); 
        }

        const setTypedMessage=(e)=>{
            this.setState({inputMessage:e.target.value}); 
        }

        const startChat=(item)=>{
            this.getChats(item);
            this.setState({chatboxtitle:item.name,startChat:true,showChatList:false});
        }

        const showChatList=()=>{
            this.setState({chats:[],chatboxtitle:appTitle,startChat:false,showChatList:true});
        }

        const handleEmojiBtnClick = (event) => {
           console.log("handleEmojiBtnClick > ",this.state);
            if(this.state.EmojianchorEl===true){
                this.setState({id:undefined,EmojianchorEl:false});
               
            }
            if(this.state.EmojianchorEl===false){
                this.setState({id:'simple-popover',EmojianchorEl:true});
            }
            console.log("handleEmojiBtnClick > ",this.state);
          };
        
          const handleEmojiBlockClose = () => {
             this.setState({EmojianchorEl:null,id:undefined});
          };


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
                        {this.state.EmojianchorEl===true?(
                            <Fragment>
                                {emojiSection}
                            </Fragment>
                        ):null}
                        {inputMessageSection}
                    </Fragment>
                ):null}

                
                
                
            </Fragment>
        )
    }

}
export default chatapp;

