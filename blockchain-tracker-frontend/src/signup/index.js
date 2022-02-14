import {makeStyles} from "@mui/styles";
import {Box, Button, Grid, inputLabelClasses, outlinedInputClasses, TextField, Typography} from "@mui/material";
import {useState} from "react";
import styled from "@emotion/styled";
import Header from "../header";

const useStyles = makeStyles({
    background: {
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
    },
    grid: {
        paddingTop: "40vh",
        paddingLeft: "20vw",
        paddingRight: "20vw",
    },
    input: {
        marginBottom: "7px !important",
    }
})

const StyledTextField = styled(TextField)({
    [`& .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "grey"
    },
    [`&:hover .${outlinedInputClasses.root} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "grey"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.notchedOutline}`]: {
        borderColor: "grey"
    },
    [`& .${outlinedInputClasses.input}`]: {
        color: "white"
    },
    [`&:hover .${outlinedInputClasses.input}`]: {
        color: "grey"
    },
    [`& .${outlinedInputClasses.root}.${outlinedInputClasses.focused} .${outlinedInputClasses.input}`]: {
        color: "grey"
    },
    [`& .${inputLabelClasses.outlined}`]: {
        color: "grey"
    },
    [`&:hover .${inputLabelClasses.outlined}`]: {
        color: "grey"
    },
    [`& .${inputLabelClasses.outlined}.${inputLabelClasses.focused}`]: {
        color: "grey"
    }
});

const title = "SIGN UP";
const subtitle = "Your new adventure starts here";

function Signup() {
    const classes = useStyles();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

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
                    <Button variant="contained">SIGNUP</Button>
                </Grid>
            </Grid>
        </Box>
    </div>
}

export default Signup;