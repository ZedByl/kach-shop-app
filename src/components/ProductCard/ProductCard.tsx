import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    decrementCountProduct, getCountProduct, getProductItems, incrementCountProduct, setProductCart // eslint-disable-line
} from '../../store/basket'
import Counter from '../Counter/counter'
import './productCard.scss'

interface Card {
    id: string,
    image: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

interface ProductCardProps {
    card: Card
}

const ProductCard: FC<ProductCardProps> = ({ card }) => {
    const dispatch = useDispatch()
    const items = useSelector(getProductItems())
    const isItemInBasket = items.some((item: Card) => item.id === card.id)
    const countProduct = useSelector(getCountProduct(card.id))
    const count = countProduct ? countProduct.count : ''
    const handleAddProduct = (e: { stopPropagation: () => void }) => {
        e.stopPropagation()
        if (!isItemInBasket) dispatch(setProductCart(card))
    }
    const handleIncrementProduct = (id: string) => {
        dispatch(incrementCountProduct(id))
    }
    const handleDecrementProduct = (id: string) => {
        dispatch(decrementCountProduct(id))
    }
    return (
        <div className="card">
            <div className="card__inner">
                <div className="card__img-wrapper">
                    <img
                      src={ card.image }
                      className="card__img"
                      alt="..."
                    />
                </div>
                <div className="card__content">
                    <div className="card__title">{ card.title }</div>
                    <div className="card__description">{ card.body }</div>
                    <div className="card__bottom-row">
                        { !isItemInBasket
                            ? <div
                                className="card__btn"
                                onClick={ handleAddProduct }
                              >
                                Выбрать
                            </div>
                            : <Counter
                                addProduct={ () => handleIncrementProduct(card.id) }
                                deleteProduct={ () => handleDecrementProduct(card.id) }
                                count={ count }
                              /> }
                        <div className="card__price">от { card.price }&#8381;</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
