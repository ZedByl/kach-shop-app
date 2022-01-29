import React from 'react'
import { desserts } from '../api'
import ProductList from '../components/ProductList/productList'

const Desserts = () => (
    <>
        <ProductList
          numberCard={ desserts }
          titleBlock="Десерты"
        />
    </>
)

export default Desserts
