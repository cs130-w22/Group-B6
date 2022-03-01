import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {Box, Button, Typography} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {query, track} from "./function";
import Dialogue from "../component/dialogue";
import {useState} from "react";
import ScreenSearchDesktopIcon from '@mui/icons-material/ScreenSearchDesktop';

const columns = [
    { field: 'time', headerName: 'Time', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'network', headerName: 'Network', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'protocol', headerName: 'Protocol', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'category', headerName: 'Category',  sortable: true, width: 90, align: 'center', headerAlign: 'center'},
    { field: 'name', headerName: 'Name', width: 160, align: 'center', headerAlign: 'center'},
    { field: 'price', headerName: 'Price', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'quantity', headerName: 'Quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'value', headerName: 'Value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
];

const rows = [
    { id: 1, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETH', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 2, time: '2021-12-02 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETH', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 3, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 4, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 5, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 6, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 7, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 8, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 9, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 10, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
    { id: 11, time: '2021-12-03 20:00', network: 'ethereum', protocol: 'N/A', category: 'wallet', name: 'ETC', price: 4168.06, quantity: 0.086, value: 356.719 },
];

function Search({selectedAddress, token}) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');

    async function handleSearch(selectedAddress) {
        if (selectedAddress === '') {
            setContent("can't lookup empty address")
            setOpen(true)
            return
        }
        const data = {
            address: selectedAddress
        }
        const result = await query(data);
        console.log(result)
        result === null ? setContent("address information ready") : setContent("internal server error")
        setOpen(true)
    }

    async function handleTrack(selectedAddress) {
        if (token === '') {
            setContent("login first to track an address")
            setOpen(true)
            return
        }

        if (selectedAddress === '') {
            setContent("please search for a valid address")
            setOpen(true)
            return
        }

        const data = {
            token: token,
            address: selectedAddress
        }

        const result = await track(data);
        result === null ? setContent("start tracking") : setContent("you already tracked this address")
        setOpen(true)
    }

    return (
        <div style={{ height: '100%', width: '100%', color: 'grey'}}>
            <Dialogue open={open} setOpen={setOpen} title={"Blockchain Tracker"} content={content}/>
            <Box sx={{display: 'flex', marginTop: '20px'}}>
                <Typography sx={{ mt: 2, mb: 2, flex: 1, fontWeight: 'bold', color: 'white' }} variant="h6">Address Information: {selectedAddress}</Typography>
                <Button variant="outlined" startIcon={<ScreenSearchDesktopIcon />}
                        onClick={() => handleSearch(selectedAddress)}
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            fontWeight: 'bold',
                            height: '30px',
                            padding: '10px 10px',
                            alignSelf: 'center',
                            marginRight: '50px',
                            '&:hover' : {
                                background: 'darkgrey'
                            }
                        }}
                >LOOKUP ADDRESS</Button>
                <Button variant="outlined" startIcon={<AddIcon />}
                        onClick={() => handleTrack(selectedAddress)}
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            fontWeight: 'bold',
                            height: '30px',
                            padding: '10px 10px',
                            alignSelf: 'center',
                            marginRight: '50px',
                            '&:hover' : {
                                background: 'darkgrey'
                            }
                        }}
                >TRACK ADDRESS</Button>
            </Box>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSize={10}
                rowsPerPageOptions={[10]}
                disableSelectionOnClick={true}
                disableColumnSelector={true}
                sx={{
                    color: 'black',
                    marginTop: '30px',
                    marginRight: '50px',
                    borderColor: 'grey',
                    borderRadius: '4px',
                    borderWidth: 'thin',
                    backgroundColor: 'black',
                    height: '70vh',
                    '& .MuiDataGrid-cell:hover': {
                        color: 'white',
                    },
                    '& .MuiTablePagination-displayedRows': {
                        color: 'white',
                    },
                    '& .MuiDataGrid-cell': {
                        color: 'darkgrey',
                        borderColor: 'grey'
                    },
                    '& .MuiDataGrid-columnHeaderTitle': {
                        color: 'grey',
                    },
                    '& .MuiDataGrid-iconSeparator': {
                        color: 'grey',
                    },
                    '& .MuiSvgIcon-root': {
                        color: 'darkgrey',
                    },
                    '& .MuiDataGrid-menuIcon': {
                        color: 'white',
                    },
                    '& .MuiDataGrid-columnHeaders': {
                        color: 'white',
                    },
                    '& .MuiFormLabel-root-MuiInputLabel-root': {
                        color: 'white',
                    }
                }}
            />
        </div>
    );
}

export default Search