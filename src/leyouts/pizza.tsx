import React from 'react'
import { cards } from '../api'
import ProductList from '../components/ProductList/productList'

const Pizza = () => (
    <>
        <ProductList
          numberCard={ cards }
          titleBlock="Пицца"
        />
    </>
)

export default Pizza
