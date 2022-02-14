import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from './index'

interface BasketEntities {
    id: string,
    image: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

const basketSlice = createSlice({
    name: 'basket',
    initialState: {
        entities: [] as Array<BasketEntities>,
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
            state.entities = state.entities.filter((product) => product.id !== actions.payload.id)
            localStorage.removeItem('basket')
        },
        incrementCount: (state, actions) => {
            const newCounters = [...state.entities]
            const indexBasket = newCounters.findIndex((index) => index.id === actions.payload)
            newCounters[indexBasket].count++ // eslint-disable-line
            localStorage.setItem('basket', JSON.stringify(state.entities))
        },
        decrementCount: (state, actions) => {
            const newCounters = [...state.entities]
            const indexBasket = newCounters.findIndex((index) => index.id === actions.payload)
            if (newCounters[indexBasket].count !== 0) {
                newCounters[indexBasket].count-- // eslint-disable-line
                localStorage.setItem('basket', JSON.stringify(state.entities))
            }
            if (newCounters[indexBasket].count === 0) {
                state.entities = state.entities.filter((product) => product.id !== actions.payload)
                localStorage.setItem('basket', JSON.stringify(state.entities))
            }
        },
        clearBasketCounter: (state) => {
            state.entities = []
        },
    },
})

const { reducer: basketReducer, actions } = basketSlice
const { initialProduct, addProduct, incrementCount, decrementCount, clearBasketCounter } = actions // eslint-disable-line

export const getProduct = (payload: Array<BasketEntities>) => (dispatch: any) => {
    dispatch(initialProduct(payload))
}

export const setProductCart = (payload: BasketEntities) => (dispatch: any) => {
    dispatch(addProduct(payload))
}

export const incrementCountProduct = (payload: string) => (dispatch: any) => {
    dispatch(incrementCount(payload))
}
export const decrementCountProduct = (payload: string) => (dispatch: any) => {
    dispatch(decrementCount(payload))
}

export const getCountProduct = (productId: string) => (state: any) => {
    if (state.basket.entities) {
        // @ts-ignore
        return state.basket.entities.find((p: object) => p.id === productId)
    }
    return null
}

export const clearBasket = () => (dispatch: AppDispatch) => {
    dispatch(clearBasketCounter())
}

export const getProductItems = () => (state: any) => state.basket.entities

export default basketReducer
