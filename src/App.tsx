import React, { FC, useEffect } from 'react'
import { Switch, Route } from 'react-router-dom'
import { useDispatch } from 'react-redux'
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
import Admin from './leyouts/admin'
import AppLoader from './components/hoc/appLoader'
import LogOut from './leyouts/logout'
import ProtectedRoute from './components/RedirectRoute/redirectRoute'

const App: FC = () => {
    const dispatch = useDispatch()
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
                    <Switch>
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
                        <Route
                          path="/"
                          exact
                          component={ Main }
                        />
                    </Switch>
                </div>
                <Footer />
            </AppLoader>
        </div>
    )
}

export default App
