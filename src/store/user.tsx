import { createAction, createSlice } from '@reduxjs/toolkit'
import { toast } from 'react-toastify'
import { AppDispatch, AppStore } from './index'
import authService from '../services/auth.service'
import {
    getAccessToken, getUserId, setTokens, removeAuthData,
    setAdmin,
} from '../services/localStorage.service'
import userService from '../services/user.service'
import history from '../utils/history'
import config from '../config.json'

const initialState = getAccessToken() ? {
    data: null,
    isLoading: true,
    error: null,
    auth: { userId: getUserId() },
    isLogginedIn: true,
    dataLoaded: false,
} : {
    data: null,
    isLoading: false,
    error: null,
    auth: null,
    isLogginedIn: false,
    dataLoaded: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        userRequested: (state) => {
            state.isLoading = true
        },
        userReceved: (state, action) => {
            state.data = action.payload
            state.isLoading = false
            state.dataLoaded = true
        },
        userRequestFiled: (state, action) => {
            state.error = action.payload
            state.isLoading = false
        },
        authRequestSuccess: (state, action) => {
            state.auth = action.payload.userId
            state.isLogginedIn = true
        },
        authRequestFailed: (state, action) => {
            state.error = action.payload
        },
        userLogOut: (state) => {
            state.data = null
            state.isLogginedIn = false
            state.auth = null
            state.dataLoaded = false
        },
        userUpdateSeccessed: (state, action) => {
            state.data = { ...action.payload }
            state.isLoading = false
        },
    },
})

const { reducer: userReducer, actions } = userSlice

const {
    authRequestSuccess,
    authRequestFailed,
    userRequested,
    userReceved,
    userRequestFiled,
    userLogOut,
    userUpdateSeccessed,
} = actions

const authRequested = createAction('user/authRequested')
const userUpdateRequested = createAction('user/userUpdateRequested')
const userPasswordUpdateRequested = createAction('user/userPasswordUpdateRequested')

export const logIn = ({ payload, redirect }: any) => async (dispatch: AppDispatch) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
        const data = await authService.logIn({ email, password })
        dispatch(authRequestSuccess({ userId: data.userId }))
        if (email === config.apiEndpoint) setAdmin(email)
        setTokens(data)
        history.push(redirect)
    } catch (error: any) {
        const { status, message } = error.response.data
        if (status === 400) {
            toast.error(message)
            dispatch(authRequestFailed(message))
        } else {
            dispatch(authRequestFailed(error.response.data))
            toast.error('Что-то пошло не так')
        }
    }
}

export const signUp = ({ payload, redirect }: any) => async (dispatch: AppDispatch) => {
    const {
        email, password, name, phone,
    } = payload
    dispatch(authRequested())
    try {
        const data = await authService.register({
            email, password, name, phone,
        })
        setTokens(data)
        dispatch(authRequestSuccess({ userId: data.userId }))
        history.push(redirect)
    } catch (error: any) {
        const { message, status } = await error.response.data
        if (status === 400) {
            dispatch(authRequestFailed(message))
            toast.error(message)
        } else {
            dispatch(authRequestFailed(error))
            toast.error('Что-то пошло не так')
        }
    }
}

export const loadCurrentUser = () => async (dispatch: AppDispatch) => {
    dispatch(userRequested())
    try {
        const { content } = await userService.getCurrentUser()
        dispatch(userReceved(content))
    } catch (error) {
        dispatch(userRequestFiled(error))
    }
}

export const updateUserData = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(userUpdateRequested())
    try {
        const { content } = await userService.update(payload)
        dispatch(userUpdateSeccessed(content))
        toast.success('Данные пользователя обновлены')
    } catch (error: any) {
        const { status, message } = error.response.data
        if (status === 400) {
            dispatch(userRequestFiled(message))
            toast.error(message)
        } else {
            dispatch(userRequestFiled(error.response.data))
            toast.error('Что-то пошло не так')
        }
    }
}

export const updateUserPassword = (payload: any) => async (dispatch: AppDispatch) => {
    dispatch(userPasswordUpdateRequested())
    try {
        const { content } = await authService.resetPassword(payload)
        dispatch(userUpdateSeccessed(content[0]))
        setTokens(content[1])
        toast.success('Пароль успешно изменен')
    } catch (error: any) {
        const { status, message } = error.response.data
        if (status === 400) {
            toast.error(message)
        } else {
            dispatch(userRequestFiled(error.response.data))
            toast.error('Что-то пошло не так')
        }
    }
}

export const logOut = () => (dispatch: AppDispatch) => {
    removeAuthData()
    dispatch(userLogOut())
    history.push('/')
}

export const getIsLogIn = () => (state: AppStore) => state.user.isLogginedIn

export const getUserLoadingStatus = () => (state: AppStore) => state.user.isLoading

export const getCurrentUserData = () => (state: AppStore) => state.user.data

export default userReducer
