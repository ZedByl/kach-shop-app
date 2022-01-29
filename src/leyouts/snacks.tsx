import React from 'react'
import { snacks } from '../api'
import ProductList from '../components/ProductList/productList'

const Snacks = () => (
    <>
        <ProductList
          numberCard={ snacks }
          titleBlock="Закуски"
        />
    </>
)

export default Snacks
