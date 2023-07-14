import React, { useContext, useState } from "react";
import { Avatar, Divider, Grid, IconButton, InputAdornment, Stack, TextField, Typography } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import VideocamIcon from '@mui/icons-material/Videocam';
import MessageIcon from '@mui/icons-material/Message';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import AuthState from "./contexts/authState.context";
import SearchService from '../src/services/user.service';

const ChatProfile = () => {

    const { profile, setProfile } = useContext(AuthState);

    const [searchUser, setSearchUser] = useState(null);
    const [randomImage, setRandomImage] = useState(null);

    const searchProfile = async (e) => {
        e.preventDefault();
        const res = await SearchService.searchUser(searchUser);
        console.log(res);
        setProfile(res);
        let randomNumber;
        do {
            randomNumber = Math.floor(Math.random() * 5) + 1;
        } while (randomNumber === 5);
        setRandomImage(`https://material-ui.com/static/images/avatar/${randomNumber}.jpg`);
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
            <Grid item xs={4} sx={{ margin: 'auto' }}>
                <Avatar
                    alt="Remy Sharp"
                    src={randomImage == null ? "https://material-ui.com/static/images/avatar/5.jpg" : randomImage}
                    sx={{ width: 136, height: 136 }}
                />
            </Grid>
            <Typography fontSize={'1.5rem'} align={'center'} className="header-message">{profile?.name}</Typography>
            <Grid container marginTop={3}>
                <Grid item xs={4} sx={{ margin: 'auto', textAlign: 'center' }}>
                    <IconButton color="primary">
                        <MessageIcon style={{ fontSize: '4rem' }} />
                    </IconButton>
                    <Typography variant="h6" className="header-message">Chat</Typography>
                </Grid>
                <Divider orientation="vertical" flexItem />
                <Grid item xs={4} sx={{ margin: 'auto', textAlign: 'center' }}>
                    <IconButton color="primary" >
                        <VideocamIcon style={{ fontSize: '4rem' }} />
                    </IconButton>
                    <Typography variant="h6" className="header-message">Video Call</Typography>
                </Grid>
            </Grid>
            {/* <Typography className="header-message" margin={2}><VideocamIcon />View Friends</Typography>
            <Typography className="header-message" margin={2}>Add to Favourite</Typography> */}
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