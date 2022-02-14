import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
    getCurrentUserData, getIsLogIn, loadCurrentUser,
} from '../../store/user'
import { getStatusLoadingProducts, loadProductsList } from '../../store/products'
import Loader from '../Loader/loader'
import { loadOrderListByUser } from '../../store/order'

const AppLoader = ({ children }: any) => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(getIsLogIn())
    const productStatus = useAppSelector(getStatusLoadingProducts())
    const currentUser = useAppSelector(getCurrentUserData())
    useEffect(() => {
        dispatch(loadProductsList())
        if (isLoggedIn) dispatch(loadCurrentUser())
    }, [isLoggedIn])
    useEffect(() => {
        if (currentUser) {
            dispatch(loadOrderListByUser(currentUser.orders))
        }
    }, [currentUser])

    if (productStatus) return <Loader />
    return children
}

export default AppLoader
