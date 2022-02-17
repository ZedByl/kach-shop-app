import React, { FC, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch } from './hooks/redux'
import Main from './leyouts/main'
import Login from './leyouts/Login/login'
import NavBar from './components/ui/NavBar/navBar'
import Basket from './leyouts/Basket/basket'
import './App.scss'
import Footer from './components/ui/Footer/footer'
import AccountUser from './leyouts/AccountUser/accountUser'
import { getProduct } from './store/basket'
import Admin from './leyouts/Admin/admin'
import AppLoader from './components/ui/hoc/appLoader'
import LogOut from './leyouts/logout'
import ProtectedRoute from './components/common/RedirectRoute/protectedRoute'

import 'react-toastify/dist/ReactToastify.css'
import RedirectRoute from './components/common/RedirectRoute/redirectRoute'
import Checkout from './leyouts/Checkout/checkout'

const App: FC = () => {
    const dispatch = useAppDispatch()
    // @ts-ignore
    const basket: string = localStorage.getItem('basket')
    let productBasket = JSON.parse(basket)
    if (productBasket === null) productBasket = []
    useEffect(() => {
        dispatch(getProduct(productBasket))
    }, [])
    return (
        <div className="container">
            <AppLoader>
                <NavBar />
                <div className="wrapper">
                    <Route
                      path="/login"
                      component={ Login }
                    />
                    <Route
                      path="/logout"
                      component={ LogOut }
                    />
                    <Route
                      path="/basket"
                      component={ Basket }
                    />
                    <ProtectedRoute
                      path="/account"
                      component={ AccountUser }
                    />
                    <ProtectedRoute
                      path="/admin"
                      component={ Admin }
                    />
                    <RedirectRoute
                      path="/checkout"
                      component={ Checkout }
                    />
                    <Route
                      path="/"
                      exact
                      component={ Main }
                    />
                </div>
                <Footer />
            </AppLoader>

            <ToastContainer />
        </div>
    )
}

export default App
