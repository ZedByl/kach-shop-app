import React from 'react'
import ReactDOM from 'react-dom'
import 'bootstrap/dist/css/bootstrap.css'
import './index.css'
import { Router } from 'react-router-dom'
import { Provider } from 'react-redux'
import App from './App'
import { createStore } from './store'
import history from './utils/history'

const store = createStore()

ReactDOM.render(
    <React.StrictMode>
        <Provider store={ store }>
            <Router history={ history }>
                <App />
            </Router>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root'),
)
