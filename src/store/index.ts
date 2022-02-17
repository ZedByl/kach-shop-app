import basketReducer from './basket'
import userReducer from './user'
import productsReducer from './products'
import orderReducer from './order'
import categoryReducer from './category'

const { combineReducers, configureStore } = require('@reduxjs/toolkit')

const rootReducer = combineReducers({
    basket: basketReducer,
    user: userReducer,
    products: productsReducer,
    orders: orderReducer,
    categories: categoryReducer,
})

export function createStore() {
    return configureStore({
        reducer: rootReducer,
    })
}

export type RootState = ReturnType<typeof rootReducer>
export type AppStore = ReturnType<typeof createStore>
export type AppDispatch = AppStore['dispatch']
