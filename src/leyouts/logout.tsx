import React, { useEffect } from 'react'
import { useAppDispatch } from '../hooks/redux'
import { logOut } from '../store/user'

const LogOut = () => {
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(logOut())
    }, [])
    return <h1>Loading</h1>
}

export default LogOut
