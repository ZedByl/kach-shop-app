import React, { FC, useEffect } from 'react'
import { Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAppDispatch } from './hooks/redux'
import Main from './leyouts/main'
import Login from './leyouts/Login/login'
import NavBar from './components/NavBar/navBar'
import Basket from './leyouts/Basket/basket'
import Pizza from './leyouts/pizza'
import Sushi from './leyouts/sushi'
import './App.scss'
import Snacks from './leyouts/snacks'
import Desserts from './leyouts/desserts'
import Sauces from './leyouts/sauces'
import Footer from './components/Footer/footer'
import AccountUser from './components/AccountUser/accountUser'
import { getProduct } from './store/basket'
import Admin from './leyouts/Admin/admin'
import AppLoader from './components/hoc/appLoader'
import LogOut from './leyouts/logout'
import ProtectedRoute from './components/RedirectRoute/protectedRoute'

import 'react-toastify/dist/ReactToastify.css'
import RedirectRoute from './components/RedirectRoute/redirectRoute'
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
    // TODO 1 доделать добавление товара и отобразить все товары в админ панели бек + фронт
    // TODO 2 сделать заказ бек + фронт
    // TODO 3 отобразить исторю заказов
    // TODO 4 сделать фильтрацию по товарам
    // TODO 5 вынести интерефейсы, допилить типизацию, причесать проект
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
                    <Route
                      path="/pizza"
                      component={ Pizza }
                    />
                    <Route
                      path="/sushi"
                      component={ Sushi }
                    />
                    <Route
                      path="/snacks"
                      component={ Snacks }
                    />
                    <Route
                      path="/desserts"
                      component={ Desserts }
                    />
                    <Route
                      path="/sauces"
                      component={ Sauces }
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
