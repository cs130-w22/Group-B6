import * as React from 'react';
import { makeStyles } from "@mui/styles";
import {
    AppBar,
    Box, Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    InputBase,
    Toolbar,
    Typography
} from "@mui/material";
import { IconButton } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import FaceIcon from '@mui/icons-material/Face';
import InsightsIcon from '@mui/icons-material/Insights';
import SearchIcon from '@mui/icons-material/Search';
import {Link} from "react-router-dom";
import {useState} from "react";
import HowToRegIcon from '@mui/icons-material/HowToReg';
import DialogContentText from "@mui/material/DialogContentText";
import {logout, validate} from "./function";
import Dialogue from "../component/dialogue";

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

function LogoutDialogue({open, setOpen, setToken}) {
    const handleClose = () => {
        setOpen(false);
    };

    async function handleLogoutClick(){
        await logout();
        setOpen(false);
        setToken('');
    }

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" sx={{fontWeight: 'bold', backgroundColor: 'darkgrey', width: '600px'}}>
            {"Blockchain Tracker"}
        </DialogTitle>
        <DialogContent sx={{backgroundColor: 'darkgrey'}}>
            <DialogContentText id="alert-dialog-description">
                Are you sure you want to logout?
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'darkgrey'}}>
            <Button onClick={handleClose} sx={{color: 'black'}}>CANCEL</Button>
            <Button onClick={handleLogoutClick} autoFocus sx={{color: 'black'}}>CONFIRM</Button>
        </DialogActions>
    </Dialog>
}

function Header({visitor, search, setSelectedAddress, setToken}) {
    const classes = useStyles();
    const [address, setAddress] = useState('')
    const [open, setOpen] = useState(false)
    const [open2, setOpen2] = useState(false)

    async function handleClick() {
        //TODO: check if address is valid against db
        /**
         *   const data = {
         *             address : address
         *         }
         *         const result = await validate(data)
         *         if (result === null) {
         *             setOpen2(true)
         *         } else {
         *             setSelectedAddress(address);
         *         }
         */
        setSelectedAddress(address);
    }

    return (
        <div>
            <Dialogue open={open2} setOpen={setOpen2} title={"Blockchain Tracker"} content={"invalid address"}/>
            <LogoutDialogue open={open} setOpen={setOpen} setToken={setToken}/>
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
                    { visitor && <IconButton href={"/signup"}><HowToRegIcon/></IconButton> }
                    { visitor && <IconButton href={"/login"}><LoginIcon/></IconButton> }
                    { !visitor && <IconButton onClick={() => setOpen(true)}><FaceIcon/></IconButton> }
                </Toolbar>
            </AppBar>
        </div>
    )
}

export default Header;