import * as React from 'react';
import {Avatar, Grid, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography} from "@mui/material";
import GpsFixedIcon from '@mui/icons-material/GpsFixed';
import HouseIcon from '@mui/icons-material/House';

const addresses = ['1x123', '1x124', '1x125']

function Overview({setSelectedAddress, selectedAddress}) {
    return <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'white' }} variant="h6">Selected Address:</Typography>
        <ListItem key={selectedAddress}>
            <ListItemAvatar>
                <Avatar sx={{background: 'white'}}>
                    <HouseIcon  sx={{color: 'black'}}/>
                </Avatar>
            </ListItemAvatar>
            <ListItemText sx={{color: 'white'}}> {selectedAddress} </ListItemText>
        </ListItem>
        <Typography sx={{ mt: 4, mb: 2, fontWeight: 'bold', color: 'white' }} variant="h6">Tracked Addresses</Typography>
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