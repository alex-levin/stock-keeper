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
    { id: 'open', label: 'Open', minWidth: 100 },
    {
        id: 'high',
        label: 'High',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
    },
    {
        id: 'low',
        label: 'Low',
        minWidth: 170,
        align: 'right',
        format: (value) => value.toLocaleString('en-US')
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

const columnDefs = [
    {
        headerName: 'Symbol',
        resizable: true,
        field: 'symbol'
    },
    {
        headerName: 'Open',
        resizable: true,
        field: 'open'
    },
    {
        headerName: 'High',
        resizable: true,
        field: 'high'
    },
    {
        headerName: 'Low',
        resizable: true,
        field: 'low'
    },
    {
        headerName: 'Close',
        resizable: true,
        field: 'close'
    },
    {
        headerName: 'Volume',
        resizable: true,
        field: 'volume'
    }
];

function createData(symbol, open, high, low, close, volume) {
    return { symbol, open, high, low, close, volume };
}

const rows = [
    createData('GD', 149.51, 149.6, 147.02, 148.47, 800965),
    createData('PFI', 34.95, 34.99, 34.38, 34.51, 25443888),
    createData('MSFT', 208.83, 208.84, 208.85, 208.86, 29732453),
    createData('GOOG', 1480.06, 1506.45, 1503.45, 1501.41, 1518133),
    createData('IBM', 121.25, 121.45, 122.54, 135.21, 3110345),
    createData('TSLA', 1276.69, 1377.79, 1266.04, 1371.58, 19561403)
];

const useStyles = makeStyles({
    root: {
        width: '90%',
        marginTop: 50,
        margin: 'auto',
        marginBottom: 50
    },
    container: {
        maxHeight: 440
    }
});

export default function StickyHeadTable() {
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
            <Paper className={classes.root}>
                {/*
                <TableContainer className={classes.container}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                {columns.map((column) => (
                                    <TableCell
                                        key={column.id}
                                        align={column.align}
                                        style={{
                                            minWidth: column.minWidth
                                        }}
                                    >
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row) => {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            tabIndex={-1}
                                            key={row.symbol}
                                            onClick={() => {
                                                setSelectedSymbol(row.symbol);
                                                setRedirect(true);
                                            }}
                                        >
                                            {columns.map((column) => {
                                                const value = row[column.id];
                                                return (
                                                    <TableCell
                                                        key={column.id}
                                                        align={column.align}
                                                    >
                                                        {column.format &&
                                                        typeof value ===
                                                            'number'
                                                            ? column.format(
                                                                  value
                                                              )
                                                            : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[10, 25, 100]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                />
                
                */}

                <div
                    className="ag-theme-alpine"
                    style={{
                        height: '400px',
                        width: '100%'
                    }}
                >
                    <AgGridReact
                        onGridReady={onGridReady}
                        rowSelection="single"
                        columnDefs={columnDefs}
                        onSelectionChanged={onSelectionChanged}
                        rowData={rows}
                    ></AgGridReact>
                </div>
            </Paper>
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
