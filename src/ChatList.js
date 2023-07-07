import { Avatar, Divider, Grid, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import React from "react";

const ChatList = () => {
    
    return (
        <Grid item xs={2} marginTop={9}>
            <List>
                <ListItem button key="Susil Kumar Behera">
                    <ListItemIcon>
                        <Avatar alt="Susil Kumar Behera" src="https://material-ui.com/static/images/avatar/5.jpg" />
                    </ListItemIcon>
                    <ListItemText primary="Susil Kumar Behera"></ListItemText>
                </ListItem>
            </List>
            <Divider />
            {/* <Grid item xs={12} style={{ padding: '10px' }}>
                        <TextField id="outlined-basic-email" label="Search" variant="outlined" fullWidth />
                    </Grid>
            <Divider /> */}
            <List>
                <ListItem button key="Asit">
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
                </ListItem>
            </List>
        </Grid>
    )
}

export default ChatList;