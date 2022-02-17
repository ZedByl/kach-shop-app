import React, { ChangeEventHandler, MouseEventHandler, useState } from 'react'
import { withRouter } from 'react-router-dom'
import ProductList from '../components/ui/ProductList/productList'
import { useAppSelector } from '../hooks/redux'
import { getCategoryList } from '../store/category'
import SearchInput from '../components/common/SearchInput/searchInput'
import FilterByPrice from '../components/common/FilterByPrice/filterByPrice'
import { useSearch } from '../hooks/useSearch'

const Main = () => {
    const categories = useAppSelector(getCategoryList())
    const [isOpenFiltered, setIsOpenFiltered] = useState(false)
    const [prices, setPrices] = useState({
        minPrice: 1,
        maxPrice: 9999,
    })
    const { search, setSearch, sorted } = useSearch(categories, prices)

    const handleSearchQuery: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
        setSearch(target.value.toLocaleLowerCase())
    }
    const onGetPriceInterval: (minPrice: number, maxPrice: number) =>
        void = (minPrice: number, maxPrice: number) => {
        setPrices({ minPrice, maxPrice })
    }
    const handleOpenFiltered: MouseEventHandler<HTMLDivElement> = () => {
        setIsOpenFiltered((prevState) => !prevState)
    }

    return (
        <>
            <div className="search__product">
                <SearchInput
                  onChange={ handleSearchQuery }
                  onSubmit={ handleOpenFiltered }
                  search={ search }
                />
                <div className={ `search__hidden__filter ${isOpenFiltered ? 'active__filer' : ''}` }>
                    <FilterByPrice onGetPriceInterval={ onGetPriceInterval } />
                </div>
            </div>
            { !sorted?.length
                ? <div>Ничего не найдено</div>
                : sorted.map((category: any) => (
                    <ProductList
                      key={ category.categoryId }
                      numberCard={ category.products }
                      titleBlock={ category.title }
                      idCategory={ category.categoryId }
                    />
                )) }
        </>
    )
}

export default withRouter(Main)
