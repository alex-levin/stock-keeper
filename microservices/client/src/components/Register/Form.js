import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const Form = (props) => {
    //   const {
    //     values: { username, password, confirmPassword },
    //     errors,
    //     touched,
    //     handleChange,
    //     isValid,
    //     setFieldTouched
    //   } = props;

    const change = (name, e) => {
        e.persist();
        // handleChange(e);
        // setFieldTouched(name, true, false);
    };

    return (
        <form
            onSubmit={() => {
                alert('Submitted!');
            }}
        >
            <TextField
                id="username"
                name="username"
                // helperText={touched.username ? errors.username : ''}
                // error={touched.username && Boolean(errors.username)}
                label="Username"
                fullWidth
                // value={username}
                onChange={change.bind(null, 'username')}
            />
            <TextField
                id="password"
                name="password"
                // helperText={touched.password ? errors.password : ''}
                // error={touched.password && Boolean(errors.password)}
                label="Password"
                fullWidth
                type="password"
                // value={password}
                onChange={change.bind(null, 'password')}
            />
            <TextField
                id="confirmPassword"
                name="confirmPassword"
                // helperText={
                //     touched.confirmPassword ? errors.confirmPassword : ''
                // }
                // error={
                //     touched.confirmPassword && Boolean(errors.confirmPassword)
                // }
                label="Confirm Password"
                fullWidth
                type="password"
                // value={confirmPassword}
                onChange={change.bind(null, 'confirmPassword')}
            />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                // disabled={!isValid}
                style={{ marginTop: '2%', marginLeft: '80%' }}
            >
                Submit
            </Button>
        </form>
    );
};

export default Form;
