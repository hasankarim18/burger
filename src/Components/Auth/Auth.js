import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import classes from './Auth.module.css'
import { Label, Alert } from 'reactstrap';
import { auth } from '../../redux/authActionCreators';
import { connect } from 'react-redux'
import { useNavigate } from "react-router-dom";
import Spinner from '../Spinner/Spinner'

const mapStateToProps = state => {
    return {
        token: state.token,
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg
    }
}


const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode) => dispatch(auth(email, password, mode))
    }
}



const Auth = (props) => {
    // Pass the useFormik() hook initial form values and a submit function that will
    // be called when the form is submitted

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [mode, setMode] = useState('SignUp')

    let navigate = useNavigate()

    useEffect(() => {

        if (props.token) {
            navigate("/", { replace: true })
        }

    }, [props.token])

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
        } else if (mode === 'SignUp') {
            if (values.password != values.consfirmPassword) {
                errors.consfirmPassword = 'Password did not match'
            }
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
            props.auth(values.email, values.password, mode)
        }
    })



    const modeChange = () => {
        if (mode === 'SignUp') {
            setMode('Login')
        } else if (mode === 'Login') {
            setMode('SignUp')
        }

    }

    let form = null
    let err = null

    if (props.authFailedMsg) {
        err = <Alert color="warning" > {props.authFailedMsg} </Alert>
    }

    if (props.authLoading) {
        form = <Spinner />
    }

    else {
        form = <div className="col-12 col-sm-10 col-md-7 pt-5 text-start" >
            <div>
                <button onClick={modeChange} className={`${classes.signup}`} >
                    Switch to {mode === 'SignUp' ? 'Login' : 'SignUp'}
                </button>
            </div>
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
                {
                    mode === 'SignUp' ?

                        <div>
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
                        </div>
                        : ''
                }



                <br /> <br />
                <div className="text-start" >
                    <button
                        className={`${classes.button} btn`}
                        type="submit">
                        {mode === 'SignUp' ? <span>SignUp</span> : <span>Login</span>}
                    </button>
                </div>

            </form>
        </div>
    }


    return (
        <div className="row justify-content-center">
            {err}
            {form}
        </div>

    );
};

export default connect(mapStateToProps, mapDispatchToProps)(Auth)