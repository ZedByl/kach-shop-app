import { createAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import productService from '../services/products.service'
import { AppDispatch } from './index'

interface BasketEntities {
    id: string,
    image?: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

const productsSlice = createSlice({
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
        addProduct: (state, action) => {
            state.entities.push(action.payload)
        },
        updateProduct: (state, action) => {
            // @ts-ignore
            // eslint-disable-next-line no-underscore-dangle,max-len
            state.entities = state.entities.map((product) => (product._id === action.payload._id ? action.payload : product))
        },
        removeProduct: (state, action) => {
            // @ts-ignore
            // eslint-disable-next-line no-underscore-dangle
            state.entities = state.entities.filter((product) => product._id !== action.payload)
        },
    },
})

const { reducer: productsReducer, actions } = productsSlice
const {
    productsRequested,
    productsRequestFiled,
    productsReceved,
    addProduct,
    updateProduct,
    removeProduct,
} = actions

const createProductsRequested = createAction('products/createProductsRequested')
const updateProductsRequested = createAction('products/updateProductsRequested')

export const loadProductsList = () => async (dispatch: AppDispatch) => {
    dispatch(productsRequested())
    try {
        const { content } = await productService.getProducts()
        dispatch(productsReceved(content))
    } catch (error) {
        // @ts-ignore
        dispatch(productsRequestFiled(error.message))
    }
}

export const createProduct = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(createProductsRequested())
    try {
        const { content } = await productService.create(payload)
        dispatch(addProduct(content))
        toast.success(`Товар ${content.title} создан`)
    } catch (error) {
        // @ts-ignore
        dispatch(productsRequestFiled(error.message))
        toast.error('Что-то пошло не так')
    }
}

export const changeProduct = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(updateProductsRequested())
    try {
        const { content } = await productService.updateProduct(payload)
        dispatch(updateProduct(content))
        toast.success(`Товар ${content.title} изменён`)
    } catch (error) {
        // @ts-ignore
        dispatch(productsRequestFiled(error.message))
        toast.error('Что-то пошло не так')
    }
}

export const deleteProduct = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(updateProductsRequested())
    try {
        await productService.removeProduct(payload)
        dispatch(removeProduct(payload))
        toast.success('Товар удален')
    } catch (error) {
        // @ts-ignore
        dispatch(productsRequestFiled(error.message))
        toast.error('Что-то пошло не так')
    }
}

export const getProductsList = () => (state: any) => state.products.entities

export const getStatusLoadingProducts = () => (state: any) => state.products.isLoading

export default productsReducer
