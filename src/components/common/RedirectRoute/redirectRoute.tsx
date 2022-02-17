import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/redux'
import { getOrderStatusLoading, getOrdersUser } from '../../../store/order'
import Loader from '../Loader/loader'

const RedirectRoute = ({ component: Component, children, ...rest }: any) => {
    const isOrder = useAppSelector(getOrdersUser())
    const isLoadingOrder = useAppSelector(getOrderStatusLoading())
    if (isLoadingOrder) return <Loader />
    return (
        <Route
          { ...rest }
          render={ (props) => {
                if (isOrder.length === 0) {
                    return (
                        <Redirect
                          to={ '/basket' }
                        />
                    )
                }
                return Component ? <Component { ...props } /> : children
            } }
        />
    )
}

export default RedirectRoute
