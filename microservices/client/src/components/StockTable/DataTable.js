import React, { useState, useEffect } from 'react';
import orderBy from 'lodash/orderBy';
import { makeStyles } from '@material-ui/core/styles';
import Icon from '@material-ui/core/Icon';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { Slider } from './Slider';
import './styles.css';

/*
  data = [{prop1: someValue, prop2: someValue}, {prop1: someValue, prop2: someValue} ...] 
  
  dataKeyProperty = data property that has a unique identifier. Index will be used by default

  headers = [ 
    {
      key: 1, 
      label: 'label', 
      property: 'name', 
      sortable: true, 
      align: 'left', 
      headerFormatter: (header) => { return [whatever you want] }
      dataFormatter: (dataValue, entireRow) = { return [whatever you want] }
    }, 
    ...]

  - key is a unique identifier. label will be used by default.
  - property is the data property associated with the header. You can omit if there's no
      associated property, e.g. for a cell with controls in it 
  - align is 'left' by default
  - headerFormatter is an optional function that can be used as a renderer
  - dataFormatter is an optional function used to format the data in that column

  onRowClick, onColumnClick, and onCellClick are respective callbacks
    - onRowClick: (row) => { ... }
    - onColumnClick: (header) => { ... }
    - onCellClick: (value, row) => { ... }

  styleFunction allows you to add css classes: (theme => ({ ... returned CSS object ... })

  Additional properties with their defaults: 

  - sortAscendingIcon = 'arrow_drop_up',
  - sortDescendingIcon = 'arrow_drop_down',
  - selectedRowColor = 'grey',
  - rowColor = 'white'
  - containerClass = ''
*/

const noop = () => {};

const defaultStyleFunction = (theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto'
    },
    table: {
        minWidth: 650,
        tableLayout: 'fixed'
    }
});

export const DataTable = ({
    data,
    dataKeyProperty,
    onRowClick = noop,
    onColumnClick = noop,
    onCellClick = noop,
    styleFunction = defaultStyleFunction,
    headers = [],
    sortAscendingIcon = 'arrow_drop_up',
    sortDescendingIcon = 'arrow_drop_down',
    selectedRowColor = 'grey',
    rowColor = 'white',
    containerClass = ''
}) => {
    const [rows, setRows] = useState(data);
    const [selectedRow, setSelectedRow] = useState();
    const [headerToSortBy, setHeaderToSortBy] = useState('');
    const [sortAscending, setSortAscending] = useState(true);
    const [headingWidths, setHeadingWidths] = useState(
        headers.map(() => '100px')
    );
    const useStyles = makeStyles(styleFunction);
    const classes = useStyles();

    useEffect(() => {
        setRows(
            orderBy(
                data,
                headerToSortBy.property,
                sortAscending ? 'asc' : 'desc'
            )
        );
    }, [data, headerToSortBy.property, sortAscending]);

    const handleHeaderClick = (header) => {
        onColumnClick(header);
        if (!header.sortable) {
            return;
        }
        if (header === headerToSortBy) {
            setSortAscending((state) => !state);
        }
        // setHeaderToSortBy(header);
    };

    const handleRowClick = (row) => {
        setSelectedRow(row);
        onRowClick(row);
    };

    const getCells = (row) => {
        return headers.map((header, index) => {
            return (
                <TableCell
                    className={`${classes.tableCell} ${classes.tabelCell}-${header.label}`}
                    onClick={() =>
                        onCellClick(header.property, row[header.property], row)
                    }
                    key={header.property || index}
                    align={header.align || 'left'}
                >
                    {header.dataFormatter
                        ? header.dataFormatter(
                              row[header.property] || null,
                              row
                          )
                        : row[header.property]}
                </TableCell>
            );
        });
    };

    const handleSlide = (delta, id) => {
        console.log(delta, id);
        const oldWidth = Number(headingWidths[id].split('px')[0]);
        const newWidth = oldWidth + delta;
        console.log('oldWidth', oldWidth, 'newWidth', newWidth);
        if (newWidth > 30 && newWidth < 200) {
            setHeadingWidths((oldHeaderWidths) => {
                return [
                    ...oldHeaderWidths.slice(0, id),
                    newWidth + 'px',
                    ...oldHeaderWidths.slice(id + 1)
                ];
            });
        }
    };

    return (
        <div className={`data-table-container ${containerClass}`}>
            <Table className={classes.table}>
                <TableHead className={classes.tableHead}>
                    <TableRow className={classes.tableHeadRow}>
                        {headers.map((header, index) => (
                            <TableCell
                                style={{
                                    width: headingWidths[index] || '',
                                    border: '1px black solid'
                                }}
                                className={`data-table-header-cell ${classes.tableHeadCell} ${classes.tableHeadCell}-${header.label}`}
                                key={header.key || header.label}
                                onClick={() => handleHeaderClick(header)}
                                align={header.align || 'left'}
                            >
                                <div className="data-table-header-content-container">
                                    <span className="data-table-header-content">
                                        {header.headerFormatter
                                            ? header.headerFormatter(header)
                                            : header.label}
                                        <Icon
                                            style={{
                                                visibility:
                                                    header.sortable &&
                                                    header.label ===
                                                        headerToSortBy.label
                                                        ? 'visible'
                                                        : 'hidden'
                                            }}
                                            className={classes.sortIcon}
                                        >
                                            {sortAscending
                                                ? sortAscendingIcon
                                                : sortDescendingIcon}
                                        </Icon>
                                    </span>
                                    <span>
                                        <Slider
                                            onSlide={handleSlide}
                                            id={index}
                                        />
                                    </span>
                                </div>
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                <TableBody className={classes.tableBody}>
                    {rows.map((row, index) => (
                        <TableRow
                            className={classes.tableRow}
                            style={{
                                background:
                                    row === selectedRow
                                        ? selectedRowColor
                                        : rowColor
                            }}
                            key={row[dataKeyProperty] || index}
                            onClick={() => handleRowClick(row)}
                        >
                            {getCells(row)}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};
