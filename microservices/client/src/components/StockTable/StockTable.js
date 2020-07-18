import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Redirect } from 'react-router';

import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

const columns = [
    { id: 'symbol', label: 'Symbol', minWidth: 170 },
    { id: 'open', label: 'Open', minWidth: 170 },
    {
        id: 'high',
        label: 'High',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'low',
        label: 'Low',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'close',
        label: 'Close',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'volume',
        label: 'Volume',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toFixed(2)
    }
];

const defaultColDef = {
    sortable: true,
    resizable: true
};

const gridOptions = {
    columnDefs: [
        {
            headerName: 'Symbol',
            field: 'symbol'
        },
        {
            headerName: 'Open',
            field: 'open'
        },
        {
            headerName: 'High',
            field: 'high'
        },
        {
            headerName: 'Low',
            field: 'low'
        },
        {
            headerName: 'Close',
            field: 'close'
        },
        {
            headerName: 'Volume',
            field: 'volume'
        }
    ]
};

function createData(symbol, open, high, low, close, volume) {
    return { symbol, open, high, low, close, volume };
}

const rows = [
    createData('GD', 149.51, 149.6, 147.02, 148.47, 800965),
    createData('PFI', 34.95, 34.99, 34.38, 34.51, 25443888),
    createData('MSFT', 208.83, 208.84, 208.85, 208.86, 29732453),
    createData('GOOG', 1480.06, 1506.45, 1503.45, 1501.41, 1518133),
    createData('IBM', 121.25, 121.45, 122.54, 135.21, 3110345),
    createData('TSLA', 1276.69, 1377.79, 1266.04, 1371.58, 19561403),
    createData('MRNA', 94.85, 95.15, 92.3, 94.1, 97123456),
    createData('GILD', 77.51, 78.2, 76.1, 77.23, 6123456),
    createData('SAM', 630.78, 630.23, 631.45, 632.45, 89123456),
    createData('UA', 9.18, 9.23, 9.14, 9.12, 3123456),
    createData('NTFLX', 527.69, 528.32, 530.16, 527.13, 24123456),
    createData('AMZN', 2999.69, 2998.79, 2997.04, 2998.58, 4123456),
    createData('DD', 149.51, 149.6, 147.02, 148.47, 800965),
    createData('JNJ', 34.95, 34.99, 34.38, 34.51, 25443888),
    createData('VOO', 208.83, 208.84, 208.85, 208.86, 29732453),
    createData('MCD', 1480.06, 1506.45, 1503.45, 1501.41, 1518133),
    createData('F', 121.25, 121.45, 122.54, 135.21, 3110345),
    createData('CAR', 1276.69, 1377.79, 1266.04, 1371.58, 19561403),
    createData('UT', 94.85, 95.15, 92.3, 94.1, 97123456),
    createData('BO', 77.51, 78.2, 76.1, 77.23, 6123456),
    createData('FB', 630.78, 630.23, 631.45, 632.45, 89123456),
    createData('AAPL', 9.18, 9.23, 9.14, 9.12, 3123456),
    createData('APA', 527.69, 528.32, 530.16, 527.13, 24123456),
    createData('KO', 2999.69, 2998.79, 2997.04, 2998.58, 4123456)
];

const useStyles = makeStyles({
    root: {
        width: '80vw',
        height: '70vh',
        marginTop: 50,
        margin: 'auto',
        marginBottom: 50
    },
    container: {
        maxHeight: 440
    }
});

export default function StockTable() {
    const [redirect, setRedirect] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState(null);

    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const handleOnClick = () => {
        // some action...
        // then redirect
        this.setState({ redirect: true });
    };

    const onGridReady = (params) => {
        gridApi = params.api;
        // this.gridColumnApi = params.columnApi;

        // const httpRequest = new XMLHttpRequest();
        // const updateData = (data) => {
        //     this.setState({ rowData: data });
        // };
    };

    let gridApi = {};

    const onSelectionChanged = () => {
        var selectedRows = gridApi.getSelectedRows();
        // document.querySelector('#selectedRows').innerHTML =
        //     selectedRows.length === 1 ? selectedRows[0].athlete : '';
        console.log(selectedRows[0]);
        setSelectedSymbol(selectedRows[0].symbol);
        setRedirect(true);
    };

    if (!redirect) {
        return (
            <div className="ag-theme-alpine">
                <div className={classes.root}>
                    <AgGridReact
                        pagination={true}
                        paginationPageSize={10}
                        defaultColDef={defaultColDef}
                        onGridReady={onGridReady}
                        rowSelection="single"
                        gridOptions={gridOptions}
                        onSelectionChanged={onSelectionChanged}
                        rowData={rows}
                    ></AgGridReact>
                </div>
            </div>
        );
    } else {
        return (
            <Redirect
                to={{
                    pathname: '/chart',
                    state: {
                        symbol: selectedSymbol
                    }
                }}
            />
        );
    }
}
