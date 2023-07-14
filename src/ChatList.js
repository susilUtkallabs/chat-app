import { Avatar, Divider, Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import AuthState from "./contexts/authState.context";
import Conversation from '../src/services/conversation.service';

const ChatList = () => {
    
    const {myProfile} = useContext(AuthState);

    const [conversations, setConversations] = useState(null);

    useEffect(()=>{
        //iife
        (async()=>{
            const res = await Conversation.getConversation(1, 100);
            res.map((item)=>{
                item.users.filter((removeMyId)=>{
                   return removeMyId._id !== myProfile?._id;
                });
            });
            setConversations(res);
        })()
    }, []);
    console.log(conversations);
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
                    conversations?.map((conversation, index)=>{
                        <ListItem button key={index}>
                            <ListItemIcon>
                                <Avatar alt={conversation?.name} src="https://material-ui.com/static/images/avatar/1.jpg" />
                            </ListItemIcon>
                            <ListItemText primary={conversation?.name}>{conversation?.name}</ListItemText>
                            <ListItemText secondary="online" align="right"></ListItemText>
                        </ListItem>
                    })
                }
                {/* <ListItem button key="Asit">
                    <ListItemIcon>
                        <Avatar alt="Asit Bhai" src="https://material-ui.com/static/images/avatar/1.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Asit Bhai">Asit Bhai</ListItemText>
                    <ListItemText secondary="online" align="right"></ListItemText>
                </ListItem>
                <ListItem button key="Amrit">
                    <ListItemIcon>
                        <Avatar alt="Amrit" src="https://material-ui.com/static/images/avatar/6.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Amrit">Amrit</ListItemText>
                </ListItem>
                <ListItem button key="Arnabjyoti">
                    <ListItemIcon>
                        <Avatar alt="Arnabjyoti Roy" src="https://material-ui.com/static/images/avatar/2.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Arnabjyoti Roy">Arnabjyoti Roy</ListItemText>
                </ListItem> */}
            </List>
        </Grid>
    )
}

export default ChatList;