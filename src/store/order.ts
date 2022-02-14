import { createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { AppDispatch } from './index'
import history from '../utils/history'
import orderService from '../services/order.service'
import { removeBasket } from '../services/localStorage.service'
import { clearBasket } from './basket'

interface CardOrder {
    _id: string,
    number: number,
    date: number,
    totalPrice: number,
    status: string,
    pay: string,
    street: string,
    house?: string,
    entrance?: string,
    floor?: string,
    apartment?: string,
    intercom?: string,
    itemsProduct: Array<Card>,
}

interface Card {
    id: string,
    image?: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

const orderSlice = createSlice({
    name: 'orders',
    initialState: {
        entities: [] as Array<CardOrder>,
        isLoading: false,
        error: null,
    },
    reducers: {
        orderRequested: (state) => {
            state.isLoading = true
        },
        orderReceved: (state, action) => {
            state.entities = action.payload
            state.isLoading = false
        },
        orderRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        addOrder: (state, action) => {
            state.entities.unshift(action.payload)
            state.isLoading = false
        },
    },
})

const { reducer: orderReducer, actions } = orderSlice

const {
    orderRequested,
    orderRequestFiled,
    orderReceved,
    addOrder,
} = actions

export const loadOrderListByUser = (payload: Array<string>) => async (dispatch: AppDispatch) => {
    dispatch(orderRequested())
    try {
        const { content } = await orderService.getAllOrders(payload)
        dispatch(orderReceved(content))
    } catch (error) {
        // @ts-ignore
        dispatch(orderRequestFiled(error.message))
    }
}

export const createOrder = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(orderRequested())
    try {
        const { content } = await orderService.create(payload)
        dispatch(addOrder(content))
        removeBasket()
        dispatch(clearBasket())
        history.push('/checkout')
    } catch (error: any) {
        const { status, message } = error.response.data
        if (status === 400) {
            toast.error(message)
        } else {
            dispatch(orderRequestFiled(error.response.data))
            toast.error('Что-то пошло не так')
        }
    }
}

export const getOrdersUser = () => (state: any) => state.orders.entities

export const getOrderStatusLoading = () => (state: any) => state.orders.isLoading

export default orderReducer
