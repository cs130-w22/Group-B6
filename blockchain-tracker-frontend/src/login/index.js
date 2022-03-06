import {Box, Button, Grid, Typography} from "@mui/material";
import {useState} from "react";
import Header from "../header";
import {login} from "./function";
import { Navigate } from 'react-router-dom';
import useStyles from "../styles";
import StyledTextField from "../component/input";
import Dialogue from "../component/dialogue";

const title = "LOGIN";
const subtitle = "Your new adventure starts here";

function Login({token, setToken}) {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [open, setOpen] = useState(false);

    async function handleClick() {
        const credentials = {
            username: email,
            password: password
        }
        const result = await login(credentials);
        if (result) {
            setOpen(true);
            setToken("token")
        }
    }

    if (token && open === false) {
        return <Navigate to={"/explore"}/>
    }

    return <div>
        <Header visitor={true} search={false}/>
        <Dialogue open={open} setOpen={setOpen} title={"Blockchain Tracker"} content={"login successful"}/>
        <Box className={classes.background}>
            <Grid className={classes.grid} container direction={"row"}>
                <Grid item container xs={6} direction={"column"}>
                    <Typography color={"white"} variant="h5">{title}</Typography>
                    <Typography color={"#868383"} variant="body">{subtitle}</Typography>
                </Grid>
                <Grid item container direction={"column"} xs={6}>
                    <StyledTextField className={classes.input} value={email} placeholder="Email" size={"small"} onChange={(e) => setEmail(e.target.value)}/>
                    <StyledTextField className={classes.input} value={password} placeholder="Password" size={"small"} type={"password"} onChange={(e) => setPassword(e.target.value)}/>
                    <Button onClick={() => handleClick()} variant="contained">LOGIN</Button>
                </Grid>
            </Grid>
        </Box>
    </div>
}

export default Login;