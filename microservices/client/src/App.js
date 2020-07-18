import React from 'react';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import purple from '@material-ui/core/colors/purple';
import green from '@material-ui/core/colors/green';
import Main from './components/Main/Main';

const theme = createMuiTheme({
    palette: {
        primary: {
            light: '#757ce8',
            main: '#009688',
            dark: '#002884',
            contrastText: '#fff'
        },
        secondary: {
            light: '#ff7961',
            main: '#f44336',
            dark: '#ba000d',
            contrastText: '#000'
        }
    }
});

function App() {
    return (
        <div>
            <MuiThemeProvider theme={theme}>
                <Main />
            </MuiThemeProvider>
        </div>
    );
}

export default App;
