import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { logout } from '../../redux/authActionCreators'
import { connect } from 'react-redux'

const mapDispatchToProps = dispatch => {
    return {
        logout: () => dispatch(logout())
    }
}

const Logout = (props) => {

    let navigate = useNavigate()

    useEffect(() => {
        // props.logout()
        //  navigate('/')
    }, [])

    return props.logout()
}

export default connect(null, mapDispatchToProps)(Logout)