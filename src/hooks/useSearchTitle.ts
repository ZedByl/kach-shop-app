import React, { useState } from 'react'

interface userSearchResult {
    search: string
    setSearch: React.Dispatch<React.SetStateAction<string>>
    sortedArray: any[]
}

export const useSearchTitle = (data: any[] = []): userSearchResult => {
    const [search, setSearch] = useState<string>('')
    const sortedArray: any[] = []

    data.forEach((category: any) => {
        const filteredProducts = category.products.filter(
            ({ title }: any) => title.toLowerCase().includes(search),
        )
        return filteredProducts.length
            && sortedArray.push({ ...category, products: filteredProducts })
    })

    return {
        search,
        setSearch,
        sortedArray,
    }
}
