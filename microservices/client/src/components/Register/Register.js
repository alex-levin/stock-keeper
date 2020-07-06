import React, { useState } from 'react';
// import { Formik } from 'formik';
// import * as Yup from 'yup';
import withStyles from '@material-ui/core/styles/withStyles';
import Paper from '@material-ui/core/Paper';
import Form from './Form';

const styles = (theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        mx: 'auto',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: `${theme.spacing(5)}px ${theme.spacing(5)}px ${theme.spacing(
            5
        )}px`
    },
    container: {
        margin: 'auto',
        maxWidth: `${theme.spacing(100)}px`
    }
});

// const validationSchema = Yup.object({
//     username: Yup.string('Enter a username')
//         .min(3, 'Username must contain at least 3 characters')
//         .required('Username is required'),
//     password: Yup.string('')
//         .min(8, 'Password must contain at least 8 characters')
//         .required('Enter your password'),
//     confirmPassword: Yup.string('Enter your password')
//         .required('Confirm your password')
//         .oneOf([Yup.ref('password')], 'Password does not match')
// });

const Register = (props) => {
    // Declare a new state variable, which we'll call "count"
    const [shadowDepth, setShadow] = useState(0);

    const values = { username: '', confirmPassword: '', password: '' };

    const onMouseOver = () => setShadow(4);

    const onMouseOut = () => setShadow(0);

    return (
        <React.Fragment>
            <div className={`${props.classes.container}`}>
                <Paper
                    onMouseOver={onMouseOver}
                    onMouseOut={onMouseOut}
                    elevation={shadowDepth}
                    className={`${props.classes.paper}`}
                >
                    <h1>Register</h1>
                    <Form
                        render={(props) => <Form {...props} />}
                        initialValues={values}
                        //validationSchema={validationSchema}
                        validateOnMount={true}
                    />
                </Paper>
            </div>
        </React.Fragment>
    );
};

export default withStyles(styles)(Register);
