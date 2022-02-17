import React, { FC } from 'react'
import './productList.scss'
import ProductCard from '../ProductCard/ProductCard'
import { Card } from '../../../models/ICard'

interface CardsProps {
    numberCard: Array<Card>,
    titleBlock: string
    idCategory: string
}

const ProductList: FC<CardsProps> = ({ numberCard, titleBlock, idCategory }) => (
    <div>
        <div
          className="product-list__title"
          id={ idCategory }
        >{ titleBlock }</div>
        <div className="product-list__cards">
            { numberCard && numberCard.map((card) => (
                <ProductCard
                  key={ card._id }
                  card={ card }
                />
            )) }
        </div>
    </div>
)

export default ProductList
