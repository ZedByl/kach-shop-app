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
    name: 'products',
    initialState: {
        entities: [] as Array<BasketEntities>,
        isLoading: true,
        error: null,
    },
    reducers: {
        productsRequested: (state) => {
            state.isLoading = true
        },
        productsReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        productsRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
    },
})

const { reducer: productsReducer, actions } = commentsSlice
const { productsRequested, productsRequestFiled, productsReceved } = actions

export const loadProductsList = () => async (dispatch: any) => {
    dispatch(productsRequested())
    const data: any = []
    try {
        dispatch(productsReceved(data))
    } catch (error) {
        // @ts-ignore
        dispatch(productsRequestFiled(error.message))
    }
}

export default productsReducer
