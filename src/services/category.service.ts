import httpService from './http.service'

const categoryEndpoint = 'category/'

const categoryService = {
    getCategoriesWithProducts: async () => {
        const { data } = await httpService.get(`${categoryEndpoint}all`)
        return data
    },
}

export default categoryService
