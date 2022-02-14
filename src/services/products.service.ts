import httpService from './http.service'

const productEndpoint = 'product/'

const productService = {
    create: async (payload: any) => {
        const { data } = await httpService.post(productEndpoint, payload)
        return data
    },
    getProducts: async () => {
        const { data } = await httpService.get(productEndpoint)
        return data
    },
    updateProduct: async (payload: any) => {
        const { data } = await httpService.patch(
            // eslint-disable-next-line no-underscore-dangle
            productEndpoint + payload._id,
            payload,
        )
        return data
    },
    removeProduct: async (productId: any) => {
        const { data } = await httpService.delete(productEndpoint + productId)
        return data
    },
}

export default productService
