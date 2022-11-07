import React, { useState, useEffect } from 'react';
import { Box, Grid, Typography, Card, TextField, Button, Link } from "@mui/material";
import axios from "axios";
import swal from "sweetalert";
import { useNavigate } from "react-router-dom";
import { baseUrl, regex, error } from "./constants";


export default function SignIn() {
    const initialValues = { email: "", password: "" }
    const [formValues, setFormValues] = useState(initialValues);
    const [isSubmit, setIsSubmit] = useState(false);
    const initialError = { email: "", password: "" }
    const [formErrors, SetFormErrors] = useState(initialError);
    const [emailFocus, setEmailFocus] = useState(false);
    const [passwordFocus, setPasswordFocus] = useState(false);
    const [validateError, setValidateError] = useState();
    let navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value } = e.target;
        const oldFormValues = { ...formValues };
        setFormValues({ ...formValues, [name]: value })

    }
    useEffect(() => {

        if (emailFocus || passwordFocus) {
            validate(formValues);


        }
    }, [formValues.email, formValues.password]);
    const handleSubmit = async (e) => {
        e.preventDefault();

        const validateErrors = validate(formValues);
        setIsSubmit(true);
        if (!validateErrors) {
            axios({
                method: "post",
                url: `/login`,
                data: formValues,
            })
                .then((res) => {
                    if (res.data.message == "logged in successfully") {
                        swal({
                            title: "Good job!",
                            text: "Successfully Log In!",
                            icon: "success",
                            button: "ok",
                        });
                        navigate("/mainPage")
                    }
                    else {
                        swal({
                            title: "Invalid!",
                            text: "Invalid User!",
                            icon: "warning",
                            button: "ok",
                        });
                    }
                })
                .catch((err) => {
                    console.log("erro : ", err)
                    swal({
                        title: "Wrong!",
                        text: "Something went wrong!",
                        icon: "success",
                        button: "ok",
                    });
                });
            setFormValues(initialValues)

        }
    }

    const validate = (values) => {
        let isError = false;
        const errors = {}
        if (!values.email) {
            isError = true;
            errors.email = error.requiredError;
        } else if (!regex.emailRegex.test(values.email)) {
            isError = true;
            errors.email = error.emailError;
        }
        if (!values.password) {
            isError = true;
            errors.password = error.requiredError;
        } else if (!regex.passwordRegex.test(values.password)) {
            isError = true;
            errors.password = error.passwordError;
        }
        SetFormErrors(errors);
        return isError
    }
    return (
        <>
            <Box className="background">
                <Grid container spacing={0} direction="column" alignItems="center" justifyContent="center">
                    <Card sx={{ marginTop: '129px', padding: '47px' }} >
                        <Grid item xs={12}>
                            <Typography sx={{ textAlign: 'center', fontSize: '30px', fontFamily: 'sans-serif', fontWeight: '800', paddingTop: '12px' }} variant='h2'>Login</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1' >Email</Typography>
                            <TextField sx={{}} id="email" label="Enter email address" variant="outlined" name="email" required onChange={handleChange} value={formValues.email} onFocus={() => setEmailFocus(true)} />
                            <Typography sx={{ textAlign: 'left', color: 'red' }} variant='body2' >{formErrors.email}</Typography>
                            <Typography sx={{ textAlign: 'left', fontSize: '15px', paddingTop: '12px', fontWeight: '600' }} variant='subtitle1' >Password</Typography>
                            <TextField sx={{}} id="password" label="Enter your Password" variant="outlined" name="password" required onChange={handleChange} value={formValues.password} onFocus={() => setPasswordFocus(true)} />
                            <Typography sx={{ textAlign: 'left', color: 'red' }} variant='body2' >{formErrors.password}</Typography>
                            <Typography sx={{ textAlign: 'left', marginTop: '9px', fontSize: '13px' }}><Link >Forgot Password</Link></Typography>
                        </Grid>
                        <Grid item xs={12} style={{ textAlign: "center" }}>
                            <Button sx={{ marginTop: '20px', fontWeight: 'bold' }} variant="contained" onClick={handleSubmit}>Log In</Button>
                        </Grid>
                    </Card>
                </Grid>
            </Box>
        </>
    );
}
