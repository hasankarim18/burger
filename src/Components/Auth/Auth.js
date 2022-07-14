import React from 'react';
import { useFormik } from 'formik';
import classes from './Auth.module.css'
import { Label } from 'reactstrap';
const Auth = () => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const authForm = useFormik({
        initialValues: {
            email: '',
            password: '',
            consfirmPassword: ''
        },
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
                <br />
                <Label className={`${classes.label}`} htmlFor='password'>Password </Label>
                <input
                    id="password"
                    className="form-control"
                    name='password'
                    onChange={authForm.handleChange}
                    value={authForm.values.password}
                    type="password"
                    placeholder="Password must be 6 charedter long"
                />

                <br />
                <Label className={`${classes.label}`} htmlFor='confirmPassword'> Confirm Password  </Label>
                <input
                    id="confirmPassword"
                    className="form-control"
                    name='consfirmPassword'
                    onChange={authForm.handleChange}
                    value={authForm.values.consfirmPassword}
                    type="password"
                    placeholder="Confirm password"
                />
                <br />
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