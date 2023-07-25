import React, { useContext, useEffect, useState } from "react";
import { Divider, Fab, Grid, List, ListItem, ListItemText, TextField, Typography } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import AuthState from "./contexts/authState.context";
import MessageService from '../src/services/message.service';
import MessageState from "./contexts/messageState.context";

const ChatMessage = () => {

    const { myProfile } = useContext(AuthState);
    const { showMessage,sendMessageSubmit, sendMessage, setSendMessage} = useContext(MessageState);
    

    const formatedDate = (dateString) => {
       return new Date(dateString).toLocaleString(
            "en-US",
              {
                hour: '2-digit', 
                minute: '2-digit'
              }
          );
    } 

    return (
        <Grid item xs={7}>
            <List className="messageArea">
                {
                    showMessage !== ""
                        ?
                        showMessage?.map((item) => (
                            <ListItem key={item._id} className={item.sender_id == myProfile?._id ? "rightSideChat" : ""}>
                                <Grid container className={item.sender_id == myProfile?._id ? "chat-bubble chat-bubble--right" : "chat-bubble chat-bubble--left"}>
                                    <Grid item xs={12}>
                                        <ListItemText align={item.sender_id == myProfile?._id ? "right" : "left"} primary={item.text}></ListItemText>
                                    </Grid>
                                    <Grid item xs={12}>
                                        <ListItemText align={item.sender_id == myProfile?._id ? "right" : "left"} secondary={ formatedDate(item.created_at)}></ListItemText>
                                    </Grid>
                                </Grid>
                            </ListItem>
                        ))
                        :
                        <Typography textAlign={'center'}>Select a chat</Typography>
                }
            </List>
            <Divider />

            <form onSubmit={sendMessageSubmit}>
                <Grid container style={{ padding: '20px' }}>
                    <Grid item xs={11}>
                        <TextField
                            placeholder="Type Something"
                            InputProps={{
                                style: {
                                    borderRadius: "40px",
                                }
                            }}
                            value={sendMessage}
                            onChange={(e) => setSendMessage(e.target.value)}
                            fullWidth required />
                    </Grid>
                    <Grid xs={1} align="right">
                        <Fab color="primary" aria-label="add" type="submit"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </form>
        </Grid>
    )
}

export default ChatMessage;