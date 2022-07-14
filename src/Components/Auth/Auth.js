import React, { useState } from 'react';
import { useFormik } from 'formik';
import classes from './Auth.module.css'
import { Label, Alert } from 'reactstrap';
const Auth = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)


    const showPasswordHandler = () => {
        setShowPassword(!showPassword)
    }
    const showConfirmPasswordHandler = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    const validate = values => {

        const errors = {}

        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
        } else if (!values.password) {
            errors.password = 'Required'
        } else if (values.password.length < 6) {
            errors.password = 'Password mush be at least 6 charecter long'
        } else if (values.password != values.consfirmPassword) {
            errors.consfirmPassword = 'Password did not match'
        }


        return errors
    }

    const authForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            consfirmPassword: ''
        },
        validate,
        onSubmit: values => {
            console.log(values)
        }
    })

    return (
        <div className="col-12 col-sm-10 col-md-7 pt-5 text-start" >
            <form onSubmit={authForm.handleSubmit}>
                <Label className={`${classes.label}`} htmlFor="email">Email Address</Label>
                <input
                    className="form-control"
                    id="email"
                    name="email"
                    type="email"
                    onChange={authForm.handleChange}
                    value={authForm.values.email}
                    placeholder="Your Eamil"

                />
                {authForm.errors.email ? <Alert color="warning" > {authForm.errors.email}  </Alert> : ''}
                <br />
                <Label className={`${classes.label}`} htmlFor='password'>Password </Label>
                <input
                    id="password"
                    className="form-control"
                    name='password'
                    onChange={authForm.handleChange}
                    value={authForm.values.password}
                    type={!showPassword ? 'password' : 'text'}
                    placeholder="Password must be 6 charedter long"
                />

                <input
                    style={{ dispaly: "inline-block", margin: "2px" }}
                    id="showPassword"
                    onClick={showPasswordHandler} type="checkbox" />
                <label
                    style={{ dispaly: "inline-block", margin: "2px" }}
                    htmlFor='showPassword'> Show password</label>

                {authForm.errors.password ? <Alert color="warning" > {authForm.errors.password}  </Alert> : ''}
                <br /> <br />
                <Label className={`${classes.label}`} htmlFor='confirmPassword'> Confirm Password  </Label>
                <input
                    id="confirmPassword"
                    className="form-control"
                    name='consfirmPassword'
                    onChange={authForm.handleChange}
                    value={authForm.values.consfirmPassword}
                    type={!showConfirmPassword ? 'password' : 'text'}
                    placeholder="Confirm password"
                />
                <input
                    style={{ dispaly: "inline-block", margin: "2px" }}
                    id="showConfirmPassword"
                    onClick={showConfirmPasswordHandler}
                    type="checkbox" />

                <label
                    style={{ dispaly: "inline-block", margin: "2px" }}
                    htmlFor='showConfirmPassword'>Show Confirm password</label>
                {authForm.errors.consfirmPassword ? <Alert color="warning" > {authForm.errors.consfirmPassword}  </Alert> : ''}
                <br /> <br />
                <div className="text-start" >
                    <button
                        className={`${classes.button} btn`}
                        type="submit">
                        Login
                    </button>
                </div>

            </form>
        </div>

    );
};

export default Auth