import React, { FC, useState } from 'react'
import './filerByPrice.scss'

interface FilterByPriceProps {
    onGetPriceInterval: any
}

const FilterByPrice: FC<FilterByPriceProps> = ({ onGetPriceInterval }) => {
    const [minPrice, setMinPrice] = useState(1)
    const [maxPrice, setMaxPrice] = useState(9999)
    return (
        <div className="filter-price">
            <div className="filter-price__title">Цена</div>
            <input
              className="filter-price__input"
              onChange={ ({ target }) => setMinPrice(+target.value) }
              type="number"
              value={ minPrice }
            />
            <input
              className="filter-price__input"
              onChange={ ({ target }) => setMaxPrice(+target.value) }
              type="number"
              value={ maxPrice }
            />
            <div
              className="filter-price__button"
              onClick={ () => onGetPriceInterval(minPrice, maxPrice) }
            >
                Показать
            </div>
        </div>
    )
}

export default FilterByPrice
