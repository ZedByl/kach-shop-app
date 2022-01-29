import React, { FC } from 'react'
import './basketCard.scss'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../Counter/counter'
import { decrementCountProduct, getCountProduct, incrementCountProduct } from '../../store/basket' // eslint-disable-line

interface Card {
    id: string,
    new: boolean,
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

const BasketCard: FC<ProductCardProps> = ({ card }) => {
    const dispatch = useDispatch()
    const countProduct = useSelector(getCountProduct(card.id))
    const count = countProduct ? countProduct.count : ''
    const handleIncrementProduct = (id: string) => {
        dispatch(incrementCountProduct(id))
    }
    const handleDecrementProduct = (id: string) => {
        dispatch(decrementCountProduct(id))
    }
    return (
        <div className="basket-card__wrapper">
            <div className="basket-card">
                <div className="basket-card__left">
                    <img
                      src={ card.image }
                      className="basket-card__image"
                      alt="..."
                    />
                    <h5 className="basket-card__title">{ card.title }</h5>
                </div>
                <div className="basket-card__right">
                    <Counter
                      addProduct={ () => handleIncrementProduct(card.id) }
                      deleteProduct={ () => handleDecrementProduct(card.id) }
                      count={ count }
                    />
                    <span className="basket-card__price">{ card.price * card.count } ₽</span>
                </div>
            </div>
        </div>
    )
}
export default BasketCard
