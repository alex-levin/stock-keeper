import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Redirect } from 'react-router';
import {
    PagingState,
    IntegratedPaging,
    SortingState,
    IntegratedSorting,
    SelectionState
} from '@devexpress/dx-react-grid';
import {
    Grid,
    Table,
    TableHeaderRow,
    PagingPanel,
    TableColumnResizing,
    TableSelection
} from '@devexpress/dx-react-grid-material-ui';

const headCells = [
    {
        id: 'symbol',
        label: 'Symbol',
        numeric: false,
        disablePadding: false,
        align: 'left'
    },
    {
        id: 'open',
        label: 'Open',
        numeric: true,
        disablePadding: false,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'high',
        label: 'High',
        numeric: true,
        disablePadding: false,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'low',
        label: 'Low',
        numeric: true,
        disablePadding: false,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'close',
        label: 'Close',
        numeric: true,
        disablePadding: false,
        align: 'right',
        format: (value) => value.toFixed(2)
    },
    {
        id: 'volume',
        label: 'Volume',
        numeric: true,
        disablePadding: false,
        align: 'right',
        format: (value) => value.toFixed(2)
    }
];

function createData(symbol, open, high, low, close, volume) {
    return { symbol, open, high, low, close, volume };
}

const data = [
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
        height: '75vh',
        marginTop: 50,
        margin: 'auto',
        marginBottom: 50
    },
    container: {
        maxHeight: 440
    }
});

export default function StockTableDevExtreme() {
    const [columns] = useState([
        { name: 'symbol', title: 'Symbol' },
        { name: 'open', title: 'Open' },
        { name: 'high', title: 'High' },
        { name: 'low', title: 'Low' },
        { name: 'close', title: 'Close' },
        { name: 'volume', title: 'Volume' }
    ]);
    const [rows] = useState(data);
    const [defaultColumnWidths] = useState([
        { columnName: 'symbol', width: 180 },
        { columnName: 'open', width: 180 },
        { columnName: 'high', width: 180 },
        { columnName: 'low', width: 180 },
        { columnName: 'close', width: 180 },
        { columnName: 'volume', width: 180 }
    ]);
    const [selection, setSelection] = useState([-1]);
    const [redirect, setRedirect] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState(null);

    const classes = useStyles();

    const selectRow = (selectedIndexes) => {
        let selIndex = selectedIndexes[selectedIndexes.length - 1];
        setSelection([selIndex]);
        if (selIndex >= 0) {
            let row = data.filter((stock, index) => {
                return index === selIndex;
            })[0];
            setSelectedSymbol(row.symbol);
            setRedirect(true);
        }
    };

    if (!redirect) {
        return (
            <Paper className={classes.root}>
                <Grid rows={rows} columns={columns}>
                    <PagingState defaultCurrentPage={0} pageSize={10} />
                    <IntegratedPaging />
                    <SortingState
                        defaultSorting={[
                            { columnName: 'symbol', direction: 'asc' }
                        ]}
                    />
                    <IntegratedSorting />
                    <SelectionState
                        selection={selection}
                        onSelectionChange={selectRow}
                    />
                    <Table />
                    <TableColumnResizing
                        defaultColumnWidths={defaultColumnWidths}
                    />
                    <TableHeaderRow showSortingControls />
                    <TableSelection
                        selectByRowClick
                        showSelectionColumn={false}
                    />
                    <PagingPanel />
                </Grid>
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
