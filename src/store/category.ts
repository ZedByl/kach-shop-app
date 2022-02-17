import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch } from './index'
import categoryService from '../services/category.service'

interface BasketEntities {
    id: string,
    image?: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

const categorySlice = createSlice({
    name: 'categories',
    initialState: {
        entities: [] as Array<BasketEntities>,
        isLoading: true,
        error: null,
    },
    reducers: {
        categoryRequested: (state) => {
            state.isLoading = true
        },
        categoryReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        categoryRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
    },
})

const { reducer: categoryReducer, actions } = categorySlice
const {
    categoryRequested,
    categoryRequestFiled,
    categoryReceved,
} = actions

export const loadCategoryList = () => async (dispatch: AppDispatch) => {
    dispatch(categoryRequested())
    try {
        const { content } = await categoryService.getCategoriesWithProducts()
        dispatch(categoryReceved(content))
    } catch (error: any) {
        dispatch(categoryRequestFiled(error.message))
    }
}

export const getCategoryList = () => (state: any) => state.categories.entities

export const getStatusLoadingCategory = () => (state: any) => state.categories.isLoading

export default categoryReducer
