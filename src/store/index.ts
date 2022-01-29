import basketReducer from './basket'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
    basket: basketReducer,
})

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    })
}
