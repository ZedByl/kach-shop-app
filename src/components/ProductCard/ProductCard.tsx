import React, { FC } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    decrementCountProduct, getCountProduct, getProductItems, incrementCountProduct, setProductCart // eslint-disable-line
} from '../../store/basket'
import Counter from '../Counter/counter'

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
        <div className="card w-25 mr-2">
            <img
              src={ card.image }
              className="card-img-top"
              alt="..."
            />
            <div className="card-body">
                <h5 className="card-title">{ card.title }</h5>
                <p className="card-text">{ card.body }</p>
                <div className="d-flex justify-content-between">
                    { !isItemInBasket
                        ? <button
                            className="btn btn-primary"
                            onClick={ handleAddProduct }
                          >
                            Выбрать
                        </button>
                        : <Counter
                            addProduct={ () => handleIncrementProduct(card.id) }
                            deleteProduct={ () => handleDecrementProduct(card.id) }
                            count={ count }
                          /> }
                    <p>от { card.price }&#8381;</p>
                </div>
            </div>
        </div>
    )
}

export default ProductCard
