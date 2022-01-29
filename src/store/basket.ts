import { createSlice } from '@reduxjs/toolkit'

interface BasketEntities {
    id: string,
    new: boolean,
    image: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

const commentsSlice = createSlice({
    name: 'basket',
    initialState: {
        entities: [] as Array<BasketEntities>,
    },
    reducers: {
        addProduct: (state, action) => {
            state.entities.push(action.payload)
        },
        deleteProduct: (state, actions) => {
            state.entities = state.entities.filter((product) => product.id !== actions.payload.id)
        },
        incrementCount: (state, actions) => {
            const newCounters = [...state.entities]
            const indexBasket = newCounters.findIndex((index) => index.id === actions.payload)
            newCounters[indexBasket].count++ // eslint-disable-line
        },
        decrementCount: (state, actions) => {
            const newCounters = [...state.entities]
            const indexBasket = newCounters.findIndex((index) => index.id === actions.payload)
            if (newCounters[indexBasket].count !== 0) newCounters[indexBasket].count-- // eslint-disable-line
            if (newCounters[indexBasket].count === 0) {
                state.entities = state.entities.filter((product) => product.id !== actions.payload)
            }
        },
    },
})

const { reducer: basketReducer, actions } = commentsSlice
const { addProduct, incrementCount, decrementCount } = actions // eslint-disable-line

export const setProductCart = (payload: BasketEntities) => (dispatch: any) => {
    dispatch(addProduct(payload))
}

export const incrementCountProduct = (payload: string) => (dispatch: any) => {
    dispatch(incrementCount(payload))
}
export const decrementCountProduct = (payload: string) => (dispatch: any) => {
    dispatch(decrementCount(payload))
}

// eslint-disable-next-line consistent-return
export const getCountProduct = (productId: string) => (state: any) => {
    if (state.basket.entities) {
        // @ts-ignore
        return state.basket.entities.find((p: object) => p.id === productId)
    }
    return null
}

export const getProductItems = () => (state: any) => state.basket.entities

export default basketReducer
