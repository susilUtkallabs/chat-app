import { Avatar, Divider, Grid, List, ListItem, ListItemIcon, ListItemText, Typography } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthState from "./contexts/authState.context";
import Conversation from '../src/services/conversation.service';
import MessageService from '../src/services/message.service';
import MessageState from "./contexts/messageState.context";

const ChatList = () => {

    const { myProfile} = useContext(AuthState);
    const { messages, setMessages, conversations, setConversations, selectedIndex, setSelectedIndex ,showMessage, setShowMessage} = useContext(MessageState);

    useEffect(() => {
        (async () => {
            const res = await Conversation.getConversation(1, 100);
            setConversations(res);
        })()
    }, []);

    // const setChatIndex = async (conversationGroupId)=>{
    //     setSelectedIndex(conversationGroupId);
    //     const findConversationId = conversations?.filter((conversation) => conversation?._id === selectedIndex)
    //     if(!findConversationId){
    //         const res = await MessageService.getMessage(1, 100, conversationGroupId);
    //         setShowMessage(res);
    //     }
    // }   

    useEffect(()=>{

        if (Object.keys(messages).includes(selectedIndex)) {
            setShowMessage(messages[selectedIndex].messages);
            return;
          }

        const fetchMessages = async()=>{
            const res = await MessageService.getMessage(1, 100, selectedIndex);
            setMessages((prev) => {
                prev[selectedIndex] = res;
                return prev;
            });
            if(selectedIndex !== "")setShowMessage(res.messages);
        }
        fetchMessages();

    },[selectedIndex, messages]);

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
            <List>
            {
                conversations?.map((conversation, index) => {
                    const chatList = conversation.users?.find((user) => user?._id !== myProfile?._id)
                    
                    if (!chatList) return null
                    return (
                        <ListItem button key={index} onClick={()=>{setSelectedIndex(conversation?._id)}}>
                            <ListItemIcon>
                                <Avatar alt={chatList?.name} src={`https://material-ui.com/static/images/avatar/${index}.jpg`} />
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