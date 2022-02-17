import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, AppStore } from './index'
import { Card } from '../models/ICard'

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        entities: [] as Array<Card>,
    },
    reducers: {
        initialProduct: (state, action) => {
            state.entities = action.payload
        },
        addProduct: (state, action) => {
            state.entities.push(action.payload)
            localStorage.setItem('basket', JSON.stringify(state.entities))
        },
        deleteProduct: (state, actions) => {
            state.entities = state.entities.filter((product) => product._id !== actions.payload.id)
            localStorage.removeItem('basket')
        },
        incrementCount: (state, actions) => {
            const newCounters = [...state.entities]
            const indexBasket = newCounters.findIndex((index) => index._id === actions.payload)
            newCounters[indexBasket].count++
            localStorage.setItem('basket', JSON.stringify(state.entities))
        },
        decrementCount: (state, actions) => {
            const newCounters = [...state.entities]
            const indexBasket = newCounters.findIndex((index) => index._id === actions.payload)
            if (newCounters[indexBasket].count !== 0) {
                newCounters[indexBasket].count--
                localStorage.setItem('basket', JSON.stringify(state.entities))
            }
            if (newCounters[indexBasket].count === 0) {
                state.entities = state.entities.filter((product) => product._id !== actions.payload)
                localStorage.setItem('basket', JSON.stringify(state.entities))
            }
        },
        clearBasketCounter: (state) => {
            state.entities = []
        },
    },
})

const { reducer: basketReducer, actions } = basketSlice
const {
    initialProduct,
    addProduct,
    incrementCount,
    decrementCount,
    clearBasketCounter,
} = actions

export const getProduct = (payload: Array<Card>) => (dispatch: AppDispatch) => {
    dispatch(initialProduct(payload))
}

export const setProductCart = (payload: Card) => (dispatch: AppDispatch) => {
    dispatch(addProduct(payload))
}

export const incrementCountProduct = (payload: string) => (dispatch: AppDispatch) => {
    dispatch(incrementCount(payload))
}
export const decrementCountProduct = (payload: string) => (dispatch: AppDispatch) => {
    dispatch(decrementCount(payload))
}

export const getCountProduct = (productId: string) => (state: AppStore) => {
    if (state.basket.entities) {
        return state.basket.entities.find((p: Card) => p._id === productId)
    }
    return null
}

export const clearBasket = () => (dispatch: AppDispatch) => {
    dispatch(clearBasketCounter())
}

export const getProductItems = () => (state: AppStore) => state.basket.entities

export default basketReducer
