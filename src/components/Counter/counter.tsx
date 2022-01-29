import React from 'react'
import './counter.scss'

// @ts-ignore
const Counter = ({ addProduct, deleteProduct, count }) => (
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
