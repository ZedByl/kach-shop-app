import httpService from './http.service'

const orderEndpoint = 'order/'

const orderService = {
    create: async (payload: any) => {
        const { data } = await httpService.post(orderEndpoint, payload)
        return data
    },
    getOrder: async (payload: any) => {
        const { data } = await httpService.get(orderEndpoint + payload)
        return data
    },
    getAllOrders: async (payload: any) => {
        const { data } = await httpService.post(`${orderEndpoint}all`, payload)
        return data
    },
}

export default orderService
