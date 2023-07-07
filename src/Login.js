import { Box, Button, IconButton, InputAdornment, TextField, Typography } from "@mui/material";
import React, { useContext, useEffect } from "react";
import LockIcon from '@mui/icons-material/Lock';
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { loginSchema } from "./schemas";
import AuthService from "./services/auth.service";
import AuthState from "./contexts/authState.context";

const initialValues = {
    email: "",
    password: ""
}

const Login = () => {

    const { passwordVisible, setPasswordVisible, errorMessage, setErrorMessage, setLoggedUser } = useContext(AuthState);

    // const [login, setLogin] = useState({
    //     email : "",
    //     password : ""
    // });

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            try {
                const res = await AuthService.loginApi(values);
                setLoggedUser(res);
                navigate('/');
            } catch (error) {
                setErrorMessage(error);
            }
        },
    });

    useEffect(() => {
        const timeout = setTimeout(() => {
            setErrorMessage("");
        }, 3000);
        return () => clearTimeout(timeout);
    }, [errorMessage]);

    return (
        <div className="container">
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="center">
                <form autoComplete="off" onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection={"column"} maxWidth={400} borderRight={"5px #ccc"} boxShadow={"5px 5px 10px #ccc"} padding={5} borderRadius={5} >
                        <Typography variant="h5" textAlign={'center'}>LOGIN</Typography>

                        <TextField type="email"
                            variant="outlined"
                            placeholder="Email"
                            label="Email"
                            margin="normal"
                            name="email"
                            value={values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required></TextField>

                        {errors && errors.email && touched.email ? <p className="errorColor">{errors.email}</p> : null}

                        <TextField
                            type={passwordVisible ? 'text' : 'password'}
                            variant="outlined"
                            placeholder="Password"
                            margin="normal"
                            label="Password"
                            name="password"
                            value={values.password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleClickShowPassword}>
                                            {passwordVisible ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                )
                            }}
                        ></TextField>

                        {errors && errors.password && touched.password ? <p className="errorColor">{errors.password}</p> : null}

                        <Button startIcon={<LockIcon />} type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Login</Button>

                        {errorMessage && <p className="errorColor">{errorMessage}</p>}

                        <Link to="/signup" className="linkStyle">Don't have an account ? Register here</Link>
                    </Box>
                </form>
            </div>
        </div>
    )
}

export default Login;