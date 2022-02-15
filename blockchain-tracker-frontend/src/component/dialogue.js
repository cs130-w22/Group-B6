import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import * as React from "react";

function Dialogue({title, content, open, setOpen}) {
    const handleClose = () => {
        setOpen(false);
    };

    return <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
    >
        <DialogTitle id="alert-dialog-title" sx={{fontWeight: 'bold', backgroundColor: 'darkgrey', width: '500px'}}>
            {title}
        </DialogTitle>
        <DialogContent sx={{backgroundColor: 'darkgrey'}}>
            <DialogContentText id="alert-dialog-description" sx={{color: 'black'}}>
                {content}
            </DialogContentText>
        </DialogContent>
        <DialogActions sx={{backgroundColor: 'darkgrey'}}>
            <Button onClick={handleClose} sx={{color: 'black'}}>close</Button>
        </DialogActions>
    </Dialog>
}

export default Dialogue;