import React, { FC } from 'react'
import './counter.scss'

interface PropsCounter {
    addProduct: () => void,
    deleteProduct: () => void,
    count: number
}

const Counter: FC<PropsCounter> = ({ addProduct, deleteProduct, count }) => (
        <div className="counter">
            <div
              className="counter__button"
              onClick={ deleteProduct }
            >
                &minus;
            </div>
            <div className="counter__count">{ count }</div>
            <div
              className="counter__button"
              onClick={ addProduct }
            >
                +
            </div>
        </div>
    )

export default Counter
