import { createAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import productService from '../services/products.service'
import { AppDispatch, AppStore } from './index'
import { Basket } from '../models/IBascet'

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        entities: [] as Array<Basket>,
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
            state.entities = state.entities.map((product: Basket) => (
                product._id === action.payload._id ? action.payload : product
            ))
        },
        removeProduct: (state, action) => {
            state.entities = state.entities.filter((product: Basket) => (
                product._id !== action.payload))
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
    } catch (error: any) {
        dispatch(productsRequestFiled(error.message))
    }
}

export const createProduct = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(createProductsRequested())
    try {
        const { content } = await productService.create(payload)
        dispatch(addProduct(content))
        toast.success(`Товар ${content.title} создан`)
    } catch (error: any) {
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
    } catch (error: any) {
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
    } catch (error: any) {
        dispatch(productsRequestFiled(error.message))
        toast.error('Что-то пошло не так')
    }
}

export const getProductsList = () => (state: AppStore) => state.products.entities

export default productsReducer
