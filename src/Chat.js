import React, { useContext, useEffect } from "react";
import Header from "./Header";
import { Divider, Grid } from "@mui/material";
import { getLocalStorageLoginToken } from "./utils/localStorage.utils";
import { LOCAL_STORAGE_LOGIN_TOKEN } from "./constants/constants";
import { useNavigate } from "react-router-dom";
import ChatList from "./ChatList";
import ChatMessage from "./ChatMessage";
import ChatProfile from "./ChatProfile";
import AuthState from "./contexts/authState.context";

const Chat = () => {
    
    return (
        <>
            <Header />
            <Grid container>
                <ChatList />
                <ChatMessage />
                <ChatProfile />
            </Grid>
        </>
    )
}

export default Chat;