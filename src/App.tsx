import React, { FC } from 'react'
import { Switch, Route } from 'react-router-dom'
import Main from './leyouts/main'
import Login from './leyouts/login'
import NavBar from './components/NavBar/navBar'
import Basket from './leyouts/basket'
import Pizza from './leyouts/pizza'
import Sushi from './leyouts/sushi'
import './App.scss'
import Snacks from './leyouts/snacks'
import Desserts from './leyouts/desserts'
import Sauces from './leyouts/sauces'

const App: FC = () => (
    <div className="container">
        <div className="wrapper">
            <NavBar />
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
            </Switch>
        </div>
    </div>

)

export default App
