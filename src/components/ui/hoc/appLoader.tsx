import React, { FC, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    getCurrentUserData, getIsLogIn, loadCurrentUser,
} from '../../../store/user'
import Loader from '../../common/Loader/loader'
import { loadOrderListByUser } from '../../../store/order'
import { getStatusLoadingCategory, loadCategoryList } from '../../../store/category'
import { loadProductsList } from '../../../store/products'

const AppLoader: FC = ({ children }: any) => {
    const dispatch = useAppDispatch()
    const isLoggedIn = useAppSelector(getIsLogIn())
    const categoryStatus = useAppSelector(getStatusLoadingCategory())
    const currentUser = useAppSelector(getCurrentUserData())
    useEffect(() => {
        dispatch(loadCategoryList())
        dispatch(loadProductsList())
        if (isLoggedIn) dispatch(loadCurrentUser())
    }, [isLoggedIn])
    useEffect(() => {
        if (currentUser) {
            dispatch(loadOrderListByUser(currentUser.orders))
        }
    }, [currentUser])

    if (categoryStatus) return <Loader absolute={ true } />
    return children
}

export default AppLoader
