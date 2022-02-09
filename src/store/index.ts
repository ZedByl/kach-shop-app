import basketReducer from './basket'
import userReducer from './user'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
    basket: basketReducer,
    user: userReducer,
})

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    })
}
