import * as React from 'react';
import { makeStyles } from "@mui/styles";
import {AppBar, Box, InputBase, Toolbar, Typography} from "@mui/material";
import { IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';
import InsightsIcon from '@mui/icons-material/Insights';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import {useState} from "react";

const useStyles = makeStyles({
    title: {
        color: "#212121",
        fontWeight: ["bold", "!important"],
        flex: 1,
        paddingLeft: "10px",
        paddingRight: "20px"
    },
    link: {
        color: "black",
        textDecoration: "none"
    }
})

function Header({visitor, search, setSelectedAddress}) {
    const classes = useStyles();
    const [address, setAddress] = useState('');

    function handleClick(){
        setSelectedAddress(address);
        setAddress('');
    }

    return (
        <AppBar position="static" variant="simple">
            <Toolbar>
                <InsightsIcon/>
                <Typography to={"/"} className={classes.title} variant="h6">
                    <Link className={classes.link} to={"/home"}>Blockchain Tracker</Link>
                </Typography>
                {
                    search &&
                    <Box bgcolor={"darkgrey"} marginRight={"20px"}>
                        <IconButton type="submit" sx={{ p: '10px' }} aria-label="search" onClick={() => handleClick()}><SearchIcon /></IconButton>
                        <InputBase sx={{ ml: 1, flex: 1, width: 500}} value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Search Addresses..." inputProps={{ 'aria-label': 'Search Addresses...' }}/>
                    </Box>
                }
                <IconButton href={visitor ? "/login" : "/login"}>
                    { visitor ?  <LoginIcon/> :  <FaceIcon/> }
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}

export default Header;