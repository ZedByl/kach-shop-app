import React from 'react'
import history from '../utils/history'
import { getAdmin } from '../services/localStorage.service'

const Admin = () => {
    const currentUser = getAdmin()
    console.log(process.env.REACT_APP_EMAIL_ADMIN)
    if (currentUser !== process.env.REACT_APP_EMAIL_ADMIN) {
        history.push('/')
    }
    return (
        <div>
            admin
        </div>
    )
}

export default Admin
