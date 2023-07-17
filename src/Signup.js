import React, { useContext, useEffect, useState } from "react";
import { Box, Button, FormControl, FormControlLabel, FormLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import KeyIcon from '@mui/icons-material/Key';
import { useFormik } from "formik";
import { signUpSchema } from "./schemas";
import AuthService from "./services/auth.service";
import AuthState from "./contexts/authState.context";


const initialValues = {
    name: "",
    email: "",
    gender: "",
    contactNumber: "",
    password: "",
    confirm_password: ""
}

const Signup = () => {

    const { passwordVisible, setPasswordVisible, errorMessage, setErrorMessage  } = useContext(AuthState);

    const [signUp, setSignUp] = useState({
        name : "",
        email : "",
        contactNumber: "",
        gender: "",
        password : ""
    });

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setPasswordVisible(!passwordVisible);
    }

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
        initialValues: initialValues,
        validationSchema: signUpSchema,
        onSubmit: async (values, action) => {
            try{
                const res = await AuthService.signUpApi(values);
                navigate('/login');
                action.resetForm();
            }catch(error){
                setErrorMessage(error);
            }
        },
    });

    return (
        <div className="container">
            <div className="top"></div>
            <div className="bottom"></div>
            <div className="center">
                <form autoComplete='off' onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection={"column"} maxWidth={400} borderRight={"5px #ccc"} boxShadow={"5px 5px 10px #ccc"} padding={3} borderRadius={5} >
                        <Typography variant="h5" textAlign={'center'}>SIGNUP</Typography>

                        <TextField type="text" variant="outlined" placeholder="Name" name="name" label="Name" margin="normal" value={values.name} onChange={handleChange} onBlur={handleBlur} required></TextField>

                        {errors.name && touched.name ? <p className='errorColor'>{errors.name}</p> : null}

                        <TextField type="email" variant="outlined" placeholder="Email" name="email" label="Email" margin="normal" value={values.email} onChange={handleChange} onBlur={handleBlur} required></TextField>

                        {errors.email && touched.email ? <p className='errorColor'>{errors.email}</p> : null}

                        <FormControl>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup aria-label="gender" name="gender" value={values.gender}
                            onChange={handleChange} onBlur={handleBlur} row>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                                <FormControlLabel value="other" control={<Radio />} label="Other" />
                            </RadioGroup>
                        </FormControl>

                        {errors.gender && touched.gender ? <p className='errorColor'>{errors.gender}</p> : null}

                        <TextField 
                            variant="outlined"
                            placeholder="Phone Number"
                            name="contactNumber"
                            label="Phone Number"
                            margin="normal"
                            value={values.contactNumber}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required></TextField>

                        {errors.contactNumber && touched.contactNumber ? <p className='errorColor'>{errors.contactNumber}</p> : null}

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

                        {errors.password && touched.password ? <p className='errorColor'>{errors.password}</p> : null}

                        <TextField
                            type="password"
                            variant="outlined"
                            placeholder="Confirm Password"
                            margin="normal"
                            label="Confirm Password"
                            name="confirm_password"
                            value={values.confirm_password}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            required
                        ></TextField>

                        {errors.confirm_password && touched.confirm_password ? <p className='errorColor'>{errors.confirm_password}</p> : null}

                        <Button startIcon={<KeyIcon />} type="submit" variant="contained" color="primary" sx={{ marginTop: 2 }}>Signup</Button>

                        {errorMessage && <p className="errorColor">{errorMessage}</p>}

                        <Link to="/login" className="linkStyle">Already have an account ? Login here</Link>
                    </Box>
                </form>
            </div>
        </div>
    )
}

export default Signup;