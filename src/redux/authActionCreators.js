import * as actionTypes from './actionTypes'
import axios from 'axios'
import { url, sign_up, sign_in, api_key } from './url'





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
        .then(res => console.log(res))
        .catch(err => console.log(err))
}