import * as React from 'react';
import Header from "../header";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';
import AssessmentIcon from '@mui/icons-material/Assessment';
import DataUsageIcon from '@mui/icons-material/DataUsage';
import {Grid, IconButton} from "@mui/material";
import {makeStyles} from "@mui/styles";
import Analytics from "../analytics";
import {useState} from "react";
import Report from "../report";
import Search from "../search";
import Overview from "../overview";

const useStyles = makeStyles({
    background: {
        backgroundColor: "black",
        width: "100vw",
        height: "100vh",
    }
})

function Home() {
    const classes = useStyles();
    const [page, setPage] = useState(0);

    return <div className={classes.background}>
        <Header visitor={false} search={true}/>
        <Grid container>
            <Grid container item xs={1} direction={'column'} sx={{backgroundColor: 'black', alignItems: 'start'}}>
                <IconButton onClick={() => setPage(0)}>
                    <DashboardIcon sx={{marginTop: '10px', marginLeft: '15px', color: 'white'}} fontSize={'medium'}/>
                </IconButton>
                <IconButton onClick={() => setPage(1)}>
                    <ScreenSearchDesktopIcon sx={{marginTop: '10px', marginLeft: '15px', color: 'white'}} fontSize={'medium'}/>
                </IconButton>
                <IconButton onClick={() => setPage(2)}>
                    <DataUsageIcon sx={{marginTop: '10px', marginLeft: '15px', color: 'white'}} fontSize={'medium'}/>
                </IconButton>
                <IconButton onClick={() => setPage(3)}>
                    <AssessmentIcon sx={{marginTop: '10px', marginLeft: '15px', color: 'white'}} fontSize={'medium'}/>
                </IconButton>
            </Grid>
            <Grid container item xs={11} direction={'column'} sx={{backgroundColor: 'green', marginTop: '10px'}}>
                <Grid item xs={12}>
                    { page === 0 ? <Overview/> : page === 1 ? <Search/> : page === 2 ? <Analytics/> : <Report/> }
                </Grid>
            </Grid>
        </Grid>
    </div>
}

export default Home;