import React, { useContext, useState } from "react";
import { Avatar, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AuthState from "./contexts/authState.context";
import SearchService from '../src/services/user.service';
import ConversationService from '../src/services/conversation.service';

const ChatProfile = () => {

    const { profile, setProfile, myProfile,errorMessage, setErrorMessage } = useContext(AuthState);

    const [searchUser, setSearchUser] = useState(null);
    const [randomProfileImage, setRandomProfileImage] = useState(null);
    const [newFriend , setNewFriend] = useState(null);

    const searchProfile = async (e) => {
        e.preventDefault();
        const res = await SearchService.searchUser(searchUser);
        setProfile(res);
        setNewFriend(profile?._id);

        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 5) + 1;
        } while (randomNumber === 5);
        setRandomProfileImage(`https://material-ui.com/static/images/avatar/${randomNumber}.jpg`);
    }
   
    const createFriend = async (e) => {
        e.preventDefault();
        try {
            const res = await ConversationService.postConversation(newFriend);
        } catch (error) {
            setErrorMessage(error);
        }
    }
    
    return (
        <Grid item xs={3}>
            <Typography variant="h5" sx={{ ml: 3 }} className="header-message"></Typography>
            <Grid item style={{ padding: '10px' }}>
                <form onSubmit={searchProfile}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        InputProps={{
                            style: {
                                borderRadius: "40px",
                            },
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        value={searchUser}
                        onChange={(e) => setSearchUser(e.target.value)}
                        fullWidth />
                </form>
            </Grid>
            {errorMessage && <p className="errorColor">{errorMessage}</p>}
            <Grid item xs={4} sx={{ margin: 'auto' }}>
                <Avatar
                    alt="Remy Sharp"
                    src={randomProfileImage == null ? "https://material-ui.com/static/images/avatar/5.jpg" : randomProfileImage}
                    sx={{ width: 136, height: 136 }}
                />
            </Grid>

            <Typography fontSize={'1.5rem'} align={'center'} className="header-message">{profile?.name}</Typography>
            <Typography fontSize={'0.7rem'} align={'center'} className="header-message">{profile?.pingId}</Typography>

            {
                profile?._id !== myProfile?._id
                    ?
                    <Grid container marginTop={3}>
                        <Grid item xs={4} sx={{ margin: 'auto', textAlign: 'center' }}>
                            <form onSubmit={ createFriend }>
                                <IconButton color="primary" type="submit">
                                    <MessageIcon style={{ fontSize: '4rem' }} />
                                    <TextField type="hidden" value={newFriend} onChange={newFriend} />
                                </IconButton>
                                <Typography variant="h6" className="header-message">Chat</Typography>
                            </form>
                        </Grid>
                        <Divider orientation="vertical" flexItem />
                        <Grid item xs={4} sx={{ margin: 'auto', textAlign: 'center' }}>
                            <IconButton color="primary" >
                                <VideocamIcon style={{ fontSize: '4rem' }} />
                            </IconButton>
                            <Typography variant="h6" className="header-message">Video Call</Typography>
                        </Grid>
                    </Grid>
                    :
                    ""
            }

            <Stack direction="row" alignItems="center" gap={1} margin={2}>
                <Person2OutlinedIcon />
                <Typography variant="body1">View Friends</Typography>
            </Stack>
            <Stack direction="row" alignItems="center" gap={1} margin={2}>
                <FavoriteBorderOutlinedIcon />
                <Typography variant="body1">Add to Favourite</Typography>
            </Stack>
        </Grid>
    )
}

export default ChatProfile;