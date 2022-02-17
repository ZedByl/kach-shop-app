export const useFilterByPrice = (data: any[], prices: any) => {
    const sortedArray: any[] = []

    data.forEach((category: any) => {
        const filteredProducts = category.products.filter(
            ({ price }: any) => prices.minPrice <= parseInt(price, 10)
                && parseInt(price, 10) <= prices.maxPrice,
        )
        // eslint-disable-next-line no-unused-expressions
        filteredProducts.length && sortedArray.push({ ...category, products: filteredProducts })
    })

    return sortedArray
}
