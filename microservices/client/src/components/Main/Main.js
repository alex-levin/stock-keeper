import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Main.css';
import Register from '../Register/Register';
import NavBar from '../NavBar/NavBar';
import StockChart from '../StockChart/StockChart';
import StockTable from '../StockTable/StockTable';
import { DataTable } from '../StockTable/DataTable';
import StockTableMaterialUI from '../StockTable/StockTableMaterialUI';
import StockTableMaterialUIResizeCols from '../StockTable/StockTableMaterialUIResizeCols';
import StockTableDevExtreme from '../StockTable/StockTableDevExtreme';

function App() {
    const headers = [
        {
            key: 1,
            label: 'Symbol',
            property: 'symbol',
            sortable: true,
            align: 'left',
            minWidth: 170
        },
        {
            key: 2,
            label: 'Open',
            property: 'open',
            sortable: true,
            align: 'left',
            format: (value) => value.toFixed(2),
            minWidth: 170
        },
        {
            key: 3,
            label: 'High',
            property: 'high',
            sortable: true,
            align: 'left',
            format: (value) => value.toFixed(2),
            minWidth: 170
        },
        {
            key: 4,
            label: 'Low',
            property: 'low',
            sortable: true,
            align: 'left',
            format: (value) => value.toFixed(2),
            minWidth: 170
        },
        {
            key: 5,
            label: 'Close',
            property: 'close',
            sortable: true,
            align: 'left',
            format: (value) => value.toFixed(2),
            minWidth: 170
        },
        {
            key: 6,
            label: 'Volume',
            property: 'volume',
            sortable: true,
            align: 'left',
            format: (value) => value.toFixed(2),
            minWidth: 170
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

    return (
        <Router>
            <div>
                <NavBar />
            </div>
            <div className="main">
                <Switch>
                    <Route exact path="/">
                        <div
                            style={{
                                color: 'white'
                            }}
                        >
                            Welcome to Stock Keeper!
                        </div>
                    </Route>
                    <Route path="/register">
                        <Register />
                    </Route>
                    <Route
                        path="/chart"
                        render={(props) => <StockChart {...props} />}
                    />
                    <Route path="/stocks">
                        <StockTableDevExtreme />
                        {/* <StockTableMaterialUI /> */}
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
