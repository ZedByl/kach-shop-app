import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
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

const App: FC = () => (
    <div className="container">
        <NavBar />
        <div className="wrapper">
            <Switch>
                <Route
                  path="/"
                  exact
                  component={ Main }
                />
                <Route
                  path="/login"
                  component={ Login }
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
                <Route
                  path="/account"
                  component={ AccountUser }
                />
            </Switch>
        </div>
        <Footer />
    </div>

)

export default App
