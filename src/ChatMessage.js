import React from "react";
import { Divider, Fab, Grid, List, ListItem, ListItemText, TextField } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const ChatMessage = () => {
    return (
        <Grid item xs={7} marginTop={9}>
            <List>
                <ListItem key="1" className="rightSideChat">
                    <Grid container className="chat-bubble chat-bubble--right">
                        <Grid item xs={12}>
                            <ListItemText align="right" primary="Hey man, What's up ?"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="right" secondary="09:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="2">
                    <Grid container className="chat-bubble chat-bubble--left">
                        <Grid item xs={12}>
                            <ListItemText align="left" primary="Hey, Iam Good! What about you ?"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="left" secondary="09:31"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
                <ListItem key="3" className="rightSideChat">
                    <Grid container className="chat-bubble chat-bubble--right">
                        <Grid item xs={12}>
                            <ListItemText align="right" primary="Cool. i am good, let's catch up!"></ListItemText>
                        </Grid>
                        <Grid item xs={12}>
                            <ListItemText align="right" secondary="10:30"></ListItemText>
                        </Grid>
                    </Grid>
                </ListItem>
            </List>
            <Divider />
            <Grid container style={{ padding: '20px' }}>
                <Grid item xs={11}>
                    <TextField
                        placeholder="Type Something"
                        InputProps={{
                            style: {
                                borderRadius: "40px",
                            }
                        }}
                        fullWidth />
                </Grid>
                <Grid xs={1} align="right">
                    <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                </Grid>
            </Grid>
        </Grid>
    )
}

export default ChatMessage;