import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './Main.css';
import Register from '../Register/Register';
import NavBar from '../NavBar/NavBar';
import StockChart from '../StockChart/StockChart';
import StockTable from '../StockTable/StockTable';

function App() {
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
                        <StockTable />
                    </Route>
                </Switch>
            </div>
        </Router>
    );
}

export default App;
