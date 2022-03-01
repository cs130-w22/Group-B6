import Typography from "@mui/material/Typography";
import * as React from "react";
import { Box, Button } from "@mui/material";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';
import {useState} from "react";
import {track} from "../search/function";
import Dialogue from "../component/dialogue";

function Report({selectedAddress, token}) {
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

        const result = await track(data);
        result === null ? setContent("report generated") : setContent("internal system error")
        setOpen(true)
    }

    return<div style={{ height: 500, width: '100%', color: 'grey'}}>
        <Dialogue open={open} setOpen={setOpen} title={"Blockchain Tracker"} content={content}/>
        <Box sx={{display: 'flex', marginTop: '20px'}}>
            <Typography sx={{ mt: 2, mb: 2, flex: 1, fontWeight: 'bold', color: 'white' }} variant="h6">Address Information: {selectedAddress}</Typography>
            <Button onClick={()=> handleClick(selectedAddress)} variant="outlined" startIcon={<SimCardDownloadIcon />} sx={{backgroundColor: 'white', color: 'black', fontWeight: 'bold', height: '30px', padding: '10px 10px', alignSelf: 'center', marginRight: '50px', '&:hover' : { background: 'darkgrey' }}}>
                GENERATE REPORT
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

export default Report;