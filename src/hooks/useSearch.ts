import { useSearchTitle } from './useSearchTitle'
import { useFilterByPrice } from './useFilterByPrice'

export const useSearch = (data: [], prices: any) => {
    const { search, setSearch, sortedArray } = useSearchTitle(data)
    const sorted = useFilterByPrice(sortedArray, prices)

    return {
        setSearch,
        search,
        sorted,
    }
}
