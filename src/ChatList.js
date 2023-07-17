import { Avatar, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthState from "./contexts/authState.context";
import Conversation from '../src/services/conversation.service';
import MessageService from '../src/services/message.service';

const ChatList = () => {

    const { myProfile, showMessage, setShowMessage,conversations, setConversations, errorMessage, setErrorMessage} = useContext(AuthState);

    const [selectedChatIndex, setSelectedChatIndex] = useState("");
    const [randomImage, setRandomImage] = useState(null);

    useEffect(() => {
        //iife
        (async () => {
            const res = await Conversation.getConversation(1, 100, selectedChatIndex);
            setConversations(res);
        })()
    }, []);

    const setChatIndex = async (conversationGroupId)=>{
        const res = await MessageService.getMessage(1, 100, conversationGroupId);
        setShowMessage(res);
    }   

    return (
        <Grid item xs={2} className="chatSection">
            <List>
                <ListItem button key="Susil Kumar Behera">
                    <ListItemIcon>
                        <Avatar alt="Susil Kumar Behera" src="https://material-ui.com/static/images/avatar/5.jpg" />
                    </ListItemIcon>
                    <ListItemText primary={myProfile?.name}></ListItemText>
                </ListItem>
            </List>
            <Divider />
            {/* <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
            <Divider /> */}
            <List>
                {
                    conversations?.map((conversation, index) => {
                        const chatList = conversation.users?.find((user) => user?._id !== myProfile?._id)
                        
                        if (chatList == "") return <Typography>No friends found</Typography>
                            return (
                                <ListItem button key={index} onClick={()=>setChatIndex(conversation?._id)}>
                                    <ListItemIcon>
                                        <Avatar alt={chatList?.name} src="https://material-ui.com/static/images/avatar/1.jpg" />
                                    </ListItemIcon>
                                    <ListItemText primary={chatList?.name}>{chatList?.name}</ListItemText>
                                </ListItem>
                            )
                    })
                }
            </List>
        </Grid>
    )
}

export default ChatList;