import * as actionTypes from './actionTypes'
import axios from 'axios'
import { url, sign_up, sign_in, api_key } from './url'


export const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        payload: {
            token: token,
            userId: userId
        }
    }
}


export const auth = (email, password, mode) => dispatch => {
    const authData = {
        email: email,
        password: password,
        returnSecureToken: true
    }

    let auth_url = null

    if (mode === 'SignUp') {
        auth_url = sign_up
    } else {
        auth_url = sign_in
    }


    axios.post(auth_url + api_key, authData)
        .then(res => {
            if (res.status === 200) {

                dispatch(authSuccess(res.data.idToken, res.data.localId))
                localStorage.setItem('token', res.data.idToken)
                localStorage.setItem('userId', res.data.localId)

                const expirationTime = new Date((new Date().getTime() + res.data.expiresIn * 1000))

                localStorage.setItem('expirationTime', expirationTime)
            }
        })
        .catch(err => console.log(err))
}


export const logout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('expirationTime')
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}


export const authCheck = () => dispatch => {
    const token = localStorage.getItem('token')

    if (!token) {
        // logout
        dispatch(logout())
    } else {
        const expirationTime = new Date(localStorage.getItem('expirationTime'))
        if (expirationTime <= new Date()) {
            // logout 
            dispatch(logout())
        } else {
            const userId = localStorage.getItem('userId')
            // keep login 
            dispatch(authSuccess(token, userId))
        }
    }

}