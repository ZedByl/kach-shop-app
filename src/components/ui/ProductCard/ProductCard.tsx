import React, { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../../hooks/redux'
import {
    decrementCountProduct,
    getCountProduct,
    getProductItems,
    incrementCountProduct,
    setProductCart,
} from '../../../store/basket'
import Counter from '../../common/Counter/counter'
import './productCard.scss'
import { Card } from '../../../models/ICard'

interface ProductCardProps {
    card: Card
}

const ProductCard: FC<ProductCardProps> = ({ card }) => {
    const dispatch = useAppDispatch()
    const items = useAppSelector(getProductItems())
    const isItemInBasket = items.some((item: Card) => item._id === card._id)
    const countProduct = useAppSelector(getCountProduct(card._id))
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
                                addProduct={ () => handleIncrementProduct(card._id) }
                                deleteProduct={ () => handleDecrementProduct(card._id) }
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
