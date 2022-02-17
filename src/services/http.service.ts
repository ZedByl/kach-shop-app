import axios from 'axios'
import { toast } from 'react-toastify'
import configFile from '../config.json'
import {
    getTokenExpiresDate, getRefreshToken, setTokens, getAccessToken,
} from './localStorage.service'
import authService from './auth.service'

const http = axios.create({
    baseURL: configFile.apiEndpoint,
})

interface transformData {
    _id: string
}

http.interceptors.request.use(
    async (config) => {
        const expiresDate = getTokenExpiresDate()
        const refreshToken = getRefreshToken()
        // @ts-ignore
        if (refreshToken && expiresDate < Date.now()) {
            const data = await authService.refresh()
            setTokens(data)
        }
        const accessToken = getAccessToken()
        if (accessToken) {
            // eslint-disable-next-line no-param-reassign
            config.params = { ...config.params, auth: accessToken }
            // eslint-disable-next-line no-param-reassign
            config.headers = { ...config.headers, authorization: accessToken }
        }
        return config
    },
    (error) => Promise.reject(error),
)

function transormData(data: transformData) {
    return data && !data._id
        ? Object.keys(data).map((key) => ({
            // @ts-ignore
            ...data[key],
        }))
        : data
}

http.interceptors.response.use(
    (res) => {
        // eslint-disable-next-line no-param-reassign
        res.data = { content: transormData(res.data) }
        return res
    },
    (error) => {
        const expectedErrors = error.response
            && error.response.status >= 400
            && error.response.status < 500

        if (!expectedErrors) {
            console.log(error)
            toast.error('Somthing was wrong. Try it later')
        }
        return Promise.reject(error)
    },
)
const httpService = {
    get: http.get,
    post: http.post,
    put: http.put,
    delete: http.delete,
    patch: http.patch,
}
export default httpService
