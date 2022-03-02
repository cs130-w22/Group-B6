import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    Avatar,
    Box,
    Button,
    Grid,
    IconButton,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography
} from "@mui/material";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import HouseIcon from '@mui/icons-material/House';
import RefreshIcon from '@mui/icons-material/Refresh';
import {trackedAddresses} from "./function";
import Dialogue from "../component/dialogue";

function Overview({setSelectedAddress, selectedAddress, token}) {
    const [addresses, setAddresses] = useState([]);
    const [open, setOpen] = useState(false)
    const [mount, setMount] = useState(false)

    useEffect(() => {
        // declare the data fetching function
        const fetchData = async () => {
            const result = await trackedAddresses();
            setAddresses(result)
        }

        if (token !== '') {
            fetchData().catch(console.error);
        }
        setMount(true)
        // code to run on component mount
    }, [mount])

    async function handleUpdate() {
        if (token === '') {
            setOpen(true)
            return
        }
        setAddresses(await trackedAddresses());
    }

    return <Grid item xs={12} md={6}>
        <Dialogue open={open} setOpen={setOpen} title={"Blockchain Tracker"} content={"login first to see tracked addresses"}/>
        <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'white' }} variant="h6">Selected Address:</Typography>
        <ListItem key={selectedAddress}>
            <ListItemAvatar>
                <Avatar sx={{background: 'white'}}>
                    <HouseIcon  sx={{color: 'black'}}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText sx={{color: 'white'}}> {selectedAddress} </ListItemText>
        </ListItem>
        <Box sx={{display: 'flex'}}>
            <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'white' }} variant="h6">Tracked Addresses</Typography>
            <Button variant="outlined" startIcon={<RefreshIcon />}
                    onClick={() => handleUpdate()}
                    sx={{
                        backgroundColor: 'white',
                        color: 'black',
                        height: '30px',
                        alignSelf: 'center',
                        alignContent: 'center',
                        textAlign: 'center',
                        marginLeft: '20px',
                        marginTop: '10px',
                        '&:hover' : {
                            background: 'darkgrey'
                        }
                    }}>UPDATE</Button>
        </Box>
        <List>
            {
                addresses.map((address) =>
                    <ListItem key={address}>
                        <ListItemAvatar>
                            <Avatar sx={{background: 'grey'}}>
                                <HouseIcon  sx={{color: 'black'}}/>
                            </Avatar>
                        </ListItemAvatar>
                        <ListItemText sx={{color: 'white'}}> {address} </ListItemText>
                        <IconButton edge="end" aria-label="delete" onClick={(e) => setSelectedAddress(address)}>
                            <GpsFixedIcon  sx={{color: 'white'}}/>
                        </IconButton>
                    </ListItem>
                )
            }
        </List>
    </Grid>
}

export default Overview;