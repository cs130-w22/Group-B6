import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box, Button} from "@mui/material";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import {useState} from "react";
import Dialogue from "../component/dialogue";
import {analytics} from "./function";

function Analytics({selectedAddress, token}) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');

    async function handleClick(selectedAddress) {
        if (token === '') {
            setContent("login first to generate report")
            setOpen(true)
            return
        }

        //TODO: need to also check if selected address is from tracked address
        if (selectedAddress === '') {
            setContent("please select a tracked address to generate report")
            setOpen(true)
            return
        }

        const data = {
            token: token,
            address: selectedAddress
        }

        const result = await analytics(data);
        result === null ? setContent("analytics data generated") : setContent("internal system error")
        setOpen(true)
    }

    return<div style={{ height: 500, width: '100%', color: 'grey'}}>
        <Dialogue open={open} setOpen={setOpen} title={"Blockchain Tracker"} content={content}/>
        <Box sx={{display: 'flex', marginTop: '20px'}}>
            <Typography sx={{ mt: 2, mb: 2, flex: 1, fontWeight: 'bold', color: 'white' }} variant="h6">Address Information: {selectedAddress}</Typography>
            <Button onClick={() => handleClick()} variant="outlined" startIcon={<DataUsageIcon />} sx={{backgroundColor: 'white', color: 'black', fontWeight: 'bold', height: '30px', padding: '10px 10px', alignSelf: 'center', marginRight: '50px', '&:hover' : { background: 'darkgrey' }}}>
                ANALYTICS DATA
            </Button>
        </Box>
        <Typography paragraph sx={{marginRight: '50px', marginTop: '30px'}}>
            sasasas sasasas sasasas sasasas sasasassasasas sa
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas sa
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas sa
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas sa
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas sa
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
            sasasas sasasas sasasas sasasas sasasassasasas s
        </Typography>
    </div>
}

export default Analytics;