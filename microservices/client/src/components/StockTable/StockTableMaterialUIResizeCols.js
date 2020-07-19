import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import { Redirect } from 'react-router';
import { Slider } from './Slider';
import './styles.css';

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

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

function EnhancedTableHead(props) {
    const { classes, order, orderBy, onRequestSort } = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    classes: PropTypes.object.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired
};

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

export default function StockTableMaterialUIResizeCols() {
    const [order, setOrder] = React.useState('asc');
    const [orderBy, setOrderBy] = React.useState('symbol');
    const [redirect, setRedirect] = useState(false);
    const [selectedSymbol, setSelectedSymbol] = useState(null);

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

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
                <TableContainer className={classes.container}>
                    <Table>
                        <EnhancedTableHead
                            classes={classes}
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                        />
                        <TableBody>
                            {stableSort(rows, getComparator(order, orderBy))
                                .slice(
                                    page * rowsPerPage,
                                    page * rowsPerPage + rowsPerPage
                                )
                                .map((row, index) => {
                                    return (
                                        <TableRow
                                            key={row.symbol}
                                            onClick={() => {
                                                setSelectedSymbol(row.symbol);
                                                setRedirect(true);
                                            }}
                                        >
                                            {headCells.map((column) => {
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
