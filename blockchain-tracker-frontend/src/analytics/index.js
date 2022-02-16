import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box, Button} from "@mui/material";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import {useState} from "react";
import Dialogue from "../component/dialogue";
import {analytics} from "./function";
import {DataGrid} from "@mui/x-data-grid";

const columns = [
    { field: 'time', headerName: 'time', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'net_worth', headerName: 'net_worth',  type: 'number', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_price', headerName: 'GBP_price',  type: 'number', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_value', headerName: 'GBP_value',   type: 'number', sortable: true, width: 90, align: 'center', headerAlign: 'center'},
    { field: 'GBP_quantity', headerName: 'GBP_quantity',  type: 'number', width: 160, align: 'center', headerAlign: 'center'},
    { field: 'GBP_token_value', headerName: 'GBP_token_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_daily_token_return_value', headerName: 'GBP_daily_token_return_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_daily_return_quantity', headerName: 'GBP_daily_return_quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_daily_return_value', headerName: 'GBP_daily_return_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_accumulative_return', headerName: 'GBP_accumulative_return', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_price', headerName: 'USDT_price', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_value', headerName: 'USDT_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_quantity', headerName: 'USDT_quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_token_value', headerName: 'USDT_token_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_daily_token_return_value', headerName: 'USDT_daily_token_return_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_daily_return_quantity', headerName: 'USDT_daily_return_quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_daily_return_value', headerName: 'USDT_daily_return_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_accumulative_return', headerName: 'USDT_accumulative_return', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_price', headerName: 'BTC_price', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_value', headerName: 'BTC_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_quantity', headerName: 'BTC_quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_token_value', headerName: 'BTC_token_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_daily_token_return_value', headerName: 'BTC_daily_token_return_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_daily_return_quantity', headerName: 'BTC_daily_return_quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_daily_return_value', headerName: 'BTC_daily_return_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_accumulative_return', headerName: 'BTC_accumulative_return', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
];

const rows = [
    { id: 1, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 2, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 3, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 4, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 5, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 6, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 7, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 8, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
    { id: 9, time: '2021-12-03 20:00', net_worth: 123.12,
        GBP_price: 123.12, GBP_value: 123.12, GBP_quantity: 123.12, GBP_token_value: 123.12, GBP_daily_token_return_value: 123.12, GBP_daily_return_quantity: 123.12, GBP_daily_return_value : 123.12, GBP_accumulative_return: 123.12,
        USDT_price: 123.12, USDT_value: 123.12, USDT_quantity: 123.12, USDT_token_value: 123.12, USDT_daily_token_return_value: 123.12, USDT_daily_return_quantity: 123.12, USDT_daily_return_value : 123.12, USDT_accumulative_return: 123.12,
        BTC_price: 123.12, BTC_value: 123.12, BTC_quantity: 123.12, BTC_token_value: 123.12, BTC_daily_token_return_value: 123.12, BTC_daily_return_quantity: 123.12, BTC_daily_return_value : 123.12, BTC_accumulative_return: 123.12,
    },
];

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
}

export default Analytics;