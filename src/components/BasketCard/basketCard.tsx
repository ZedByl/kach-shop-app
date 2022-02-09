import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Counter from '../Counter/counter'
import { decrementCountProduct, getCountProduct, incrementCountProduct } from '../../store/basket' // eslint-disable-line

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
        <div className="cart__item">
            <div className="cart__item__inner">
                <div className="cart__item__img-wrapper">
                    <img
                      src={ card.image }
                      className="cart__item__img"
                      alt="..."
                    />
                </div>
                <div className="cart__item__content">
                    <div className="cart__item__title">{ card.title }</div>
                    <div className="cart__item__description">{ card.body }</div>
                </div>
                <div className="cart__item__amount">
                    <Counter
                      addProduct={ () => handleIncrementProduct(card.id) }
                      deleteProduct={ () => handleDecrementProduct(card.id) }
                      count={ count }
                    />
                </div>
                <div className="cart__item__price">{ card.price * card.count } ₽</div>
            </div>
        </div>
    )
}
export default BasketCard
