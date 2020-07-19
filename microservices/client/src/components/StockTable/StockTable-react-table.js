import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router';
import { useTable } from 'react-table';
import styled from 'styled-components';

const useStyles = makeStyles({
    root: {
        width: '80vw',
        height: '75vh',
        marginTop: 50,
        margin: 'auto',
        marginBottom: 50
    },
    container: {
        maxHeight: 440
    }
});

const Styles = styled.div`
    padding: 1rem;
    table {
        background-color: white;
        width: 100%;
        border-spacing: 0;
        border: 1px solid #aab7b8;
        tr {
            :last-child {
                td {
                    border-bottom: 0;
                }
            }
            :nth-child(even) {
                background-color: #f2f2f2;
            }
        }
        th,
        td {
            margin: 0;
            padding: 0.5rem;
            border-bottom: 1px solid #aab7b8;
            border-right: 1px solid #aab7b8;
            :last-child {
                border-right: 0;
            }
        }
    }
`;

function Table({ columns, data }) {
    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({
        columns,
        data
    });

    // Render the UI for your table
    return (
        <table {...getTableProps()}>
            <thead>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row, i) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
}

export default function StockTable() {
    const columns = React.useMemo(() => [
        {
            Header: 'Symbol',
            accessor: 'symbol'
        },
        {
            Header: 'Open',
            accessor: 'open'
        },
        {
            Header: 'High',
            accessor: 'high'
        },
        {
            Header: 'Low',
            accessor: 'low'
        },
        {
            Header: 'Close',
            accessor: 'close'
        },
        {
            Header: 'Volume',
            accessor: 'volume'
        }
    ]);

    function createData(symbol, open, high, low, close, volume) {
        return { symbol, open, high, low, close, volume };
    }

    // https://react-table.tanstack.com/docs/quick-start
    const data = React.useMemo(() => [
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
    ]);

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

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow
    } = useTable({ columns, data });

    if (!redirect) {
        return (
            <div className={classes.root}>
                <Styles>
                    <Table columns={columns} data={data} />
                </Styles>
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
