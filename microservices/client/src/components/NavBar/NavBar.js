import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
    menuButton: {
        marginRight: theme.spacing(2)
    },
    title: {
        flexGrow: 1,
        textTransform: 'none'
    }
}));

const BootstrapButton = withStyles({
    root: {
        textTransform: 'none'
    }
})(Button);

const StyledButton = withStyles({
    label: {
        textTransform: 'capitalize'
    }
})(Button);

const ButtonAppBar = () => {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="menu"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Stock Keeper
                    </Typography>
                    <StyledButton color="inherit" component={Link} to="/stocks">
                        Stocks
                    </StyledButton>
                    <StyledButton color="inherit" component={Link} to="/login">
                        Login
                    </StyledButton>
                    <StyledButton color="inherit" component={Link} to="/logout">
                        Logout
                    </StyledButton>
                    <StyledButton
                        color="inherit"
                        component={Link}
                        to="/register"
                    >
                        Register
                    </StyledButton>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default ButtonAppBar;
