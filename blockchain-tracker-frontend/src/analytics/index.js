import Typography from "@mui/material/Typography";
import * as React from "react";
import {Box, Button} from "@mui/material";
import DataUsageIcon from '@mui/icons-material/DataUsage';
import {useState} from "react";
import Dialogue from "../component/dialogue";
import {analytics} from "./function";
import {DataGrid} from "@mui/x-data-grid";

const columns = [
    { field: 'Time', headerName: 'Time', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'Networth', headerName: 'Networth',  type: 'number', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_price', headerName: 'GBP_price',  type: 'number', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_value', headerName: 'GBP_value',   type: 'number', sortable: true, width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_quantity', headerName: 'GBP_quantity',  type: 'number', width: 160, align: 'center', headerAlign: 'center'},
    { field: 'GBP_token_value', headerName: 'GBP_token_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'GBP_daily_token_return_value', headerName: 'GBP_daily_token_return_value', sortable: true, type: 'number', width: 250, align: 'center', headerAlign: 'center'},
    { field: 'GBP_daily_return_quantity', headerName: 'GBP_daily_return_quantity', sortable: true, type: 'number', width: 250, align: 'center', headerAlign: 'center'},
    { field: 'GBP_daily_return_value', headerName: 'GBP_daily_return_value', sortable: true, type: 'number', width: 200, align: 'center', headerAlign: 'center'},
    { field: 'GBP_accumulative_return', headerName: 'GBP_accumulative_return', sortable: true, type: 'number', width: 200, align: 'center', headerAlign: 'center'},
    { field: 'USDT_price', headerName: 'USDT_price', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_value', headerName: 'USDT_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_quantity', headerName: 'USDT_quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'USDT_token_value', headerName: 'USDT_token_value', sortable: true, type: 'number', width: 160, align: 'center', headerAlign: 'center'},
    { field: 'USDT_daily_token_return_value', headerName: 'USDT_daily_token_return_value', sortable: true, type: 'number', width: 250, align: 'center', headerAlign: 'center'},
    { field: 'USDT_daily_return_quantity', headerName: 'USDT_daily_return_quantity', sortable: true, type: 'number', width: 250, align: 'center', headerAlign: 'center'},
    { field: 'USDT_daily_return_value', headerName: 'USDT_daily_return_value', sortable: true, type: 'number', width: 200, align: 'center', headerAlign: 'center'},
    { field: 'USDT_accumulative_return', headerName: 'USDT_accumulative_return', sortable: true, type: 'number', width: 200, align: 'center', headerAlign: 'center'},
    { field: 'BTC_price', headerName: 'BTC_price', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_value', headerName: 'BTC_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_quantity', headerName: 'BTC_quantity', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_token_value', headerName: 'BTC_token_value', sortable: true, type: 'number', width: 130, align: 'center', headerAlign: 'center'},
    { field: 'BTC_daily_token_return_value', headerName: 'BTC_daily_token_return_value', sortable: true, type: 'number', width: 250, align: 'center', headerAlign: 'center'},
    { field: 'BTC_daily_return_quantity', headerName: 'BTC_daily_return_quantity', sortable: true, type: 'number', width: 200, align: 'center', headerAlign: 'center'},
    { field: 'BTC_daily_return_value', headerName: 'BTC_daily_return_value', sortable: true, type: 'number', width: 200, align: 'center', headerAlign: 'center'},
    { field: 'BTC_accumulative_return', headerName: 'BTC_accumulative_return', sortable: true, type: 'number', width: 200, align: 'center', headerAlign: 'center'},
];

function Analytics({selectedAddress, token}) {
    const [open, setOpen] = useState(false);
    const [content, setContent] = useState('');
    const [data, setData] = useState([]);

    async function handleClick() {
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

        var data = new FormData();
        data.append("address", selectedAddress);
        const result = await analytics(data);

        if (result !== null) {
            setContent("analytics data generated");
            const indexed = result.map((item, index) => Object.assign(item, { id : index }))
            setData(indexed)
        } else {
            setContent("internal system error")
        }
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
            rows={data}
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