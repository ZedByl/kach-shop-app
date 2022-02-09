import { createAction, createSlice } from '@reduxjs/toolkit'
import authService from '../services/auth.service'
import {
    getAccessToken, getUserId, setTokens, removeAuthData,
    setAdmin,
} from '../services/localStorage.service'
import userService from '../services/user.service'
import { generateAuthError } from '../utils/generateAuthError'
import history from '../utils/history'

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
    },
})

const { reducer: userReducer, actions } = userSlice

const {
    authRequestSuccess, authRequestFailed, userRequested, userReceved, userRequestFiled, userLogOut,
} = actions

const authRequested = createAction('user/authRequested')

export const logIn = ({ payload, redirect }: any) => async (dispatch: any) => {
    const { email, password } = payload
    dispatch(authRequested())
    try {
        const data = await authService.logIn({ email, password })
        dispatch(authRequestSuccess({ userId: data.userId }))
        if (email === process.env.REACT_APP_EMAIL_ADMIN) setAdmin(email)
        setTokens(data)
        history.push(redirect)
    } catch (error) {
        // @ts-ignore
        const { code, message } = error.response.data.error
        if (code === 400) {
            const errorMessage = generateAuthError(message)
            dispatch(authRequestFailed(errorMessage))
        } else {
            dispatch(authRequestFailed(error))
        }
    }
}

export const signUp = ({ payload, redirect }: any) => async (dispatch: any) => {
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
    } catch (error) {
        // @ts-ignore
        dispatch(authRequestFailed(error.message))
    }
}

export const loadCurrentUser = () => async (dispatch: any) => {
    dispatch(userRequested())
    try {
        const { content } = await userService.getCurrentUser()
        dispatch(userReceved(content))
    } catch (error) {
        dispatch(userRequestFiled(error))
    }
}

export const logOut = () => (dispatch: any) => {
    removeAuthData()
    dispatch(userLogOut())
    history.push('/')
}

export const getIsLogIn = () => (state: any) => state.user.isLogginedIn

export const getUserLoadingStatus = () => (state: any) => state.user.isLoading

export const getCurrentUserData = () => (state: any) => state.user.data

export default userReducer
