import React, { FC } from 'react'
import './productList.scss'
import ProductCard from '../ProductCard/ProductCard'

interface Cards {
    id: string,
    image: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

interface CardsProps {
    numberCard: Array<Cards>,
    titleBlock: string
}

const ProductList: FC<CardsProps> = ({ numberCard, titleBlock }) => (
    <div>
        <div className="product-list__title">{ titleBlock }</div>
        <div className="product-list__cards">
            { numberCard && numberCard.map((card) => (
                <ProductCard
                  key={ card.id }
                  card={ card }
                />
            )) }
        </div>
    </div>
)

export default ProductList
