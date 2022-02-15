import * as React from 'react';
import Button from '@mui/material/Button';
import {useState} from "react";
import Header from "../header";
import useStyles from "../styles";
import StyledTextField from "../component/input";
import {signup} from "./function";
import {Box, Grid, Typography} from "@mui/material";
import Dialogue from "../component/dialogue";

const title = "SIGN UP";
const subtitle = "Your new adventure starts here";

function Signup() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    async function handleClick() {
        const credentials = {
            email: "test@gmail.com",
            password: "test"
        }
        const result = await signup(credentials);
        //TODO: modify this to match with actual signup response
        if (result === null) {
            setOpen(true)
            setEmail('')
            setPassword('')
        }
    }

    return <div>
        <Header visitor={true} search={false}/>
        <Box className={classes.background}>
            <Grid className={classes.grid} container direction={"row"}>
                <Grid item container xs={6} direction={"column"}>
                    <Typography color={"white"} variant="h5">{title}</Typography>
                    <Typography color={"#868383"} variant="body">{subtitle}</Typography>
                </Grid>
                <Grid item container direction={"column"} xs={6}>
                    <StyledTextField className={classes.input} value={email} placeholder={'Email'} size={"small"} onChange={(e) => setEmail(e.target.value)}/>
                    <StyledTextField className={classes.input} value={password} placeholder={'Password'} size={"small"} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    <Button variant="contained" onClick={() => handleClick()}>SIGNUP</Button>
                </Grid>
            </Grid>
        </Box>
        <Dialogue open={open} setOpen={setOpen} title={"Blockchain Tracker"} content={"signup successful"}/>
    </div>
}

export default Signup;