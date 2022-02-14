import Typography from "@mui/material/Typography";
import * as React from "react";
import { Box, Button } from "@mui/material";
import SimCardDownloadIcon from '@mui/icons-material/SimCardDownload';

function Report({selectedAddress}) {
    return<div style={{ height: 500, width: '100%', color: 'grey'}}>
        <Box sx={{display: 'flex', marginTop: '20px'}}>
            <Typography sx={{ mt: 2, mb: 2, flex: 1, fontWeight: 'bold', color: 'white' }} variant="h6">Address Information: {selectedAddress}</Typography>
            <Button variant="outlined" startIcon={<SimCardDownloadIcon />} sx={{backgroundColor: 'white', color: 'black', fontWeight: 'bold', height: '30px', padding: '10px 10px', alignSelf: 'center', marginRight: '50px', '&:hover' : { background: 'darkgrey' }}}>
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