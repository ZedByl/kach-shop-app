import axios from 'axios'
import localStorageService from './localStorage.service'

interface DataAuth {
    name?: string,
    email: string,
    password: string,
    phone?: string,
}

const httpAuth = axios.create({
    baseURL: 'http://localhost:8080/api/',
    // params: {
    //     key: process.env.REACT_APP_FIREBASE_KEY,
    // },
})

const authService = {
    register: async ({
                         email, password, name, phone,
                     }: DataAuth) => {
        const { data } = await httpAuth.post('auth/signUp', {
            name,
            email,
            phone,
            password,
            returnSecureToken: true,
        })
        return data
    },
    logIn: async ({ email, password }: DataAuth) => {
        const { data } = await httpAuth.post('auth/signInWithPassword', {
            email,
            password,
            returnSecureToken: true,
        })
        return data
    },
    refresh: async () => {
        // eslint-disable-next-line import/no-named-as-default-member
        const refreshToken = localStorageService.getRefreshToken()
        const { data } = await httpAuth.post('auth/token', {
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
        })
        return data
    },
}

export default authService
