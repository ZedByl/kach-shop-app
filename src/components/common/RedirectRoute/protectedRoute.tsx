import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useAppSelector } from '../../../hooks/redux'
import { getIsLogIn } from '../../../store/user'

const ProtectedRoute = ({ component: Component, children, ...rest }: any) => {
    const isLogginedIn = useAppSelector(getIsLogIn())

    return (
        <Route
          { ...rest }
          render={ (props) => {
                if (!isLogginedIn) {
                    return (
                        <Redirect
                          to={ {
                                pathname: '/login',
                                state: props.location.pathname,
                            } }
                        />
                    )
                }
                return Component ? <Component { ...props } /> : children
            } }
        />
    )
}

export default ProtectedRoute
