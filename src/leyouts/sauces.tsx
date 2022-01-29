import React from 'react'
import { sauces } from '../api'
import ProductList from '../components/ProductList/productList'

const Sauces = () => (
    <>
        <ProductList
          numberCard={ sauces }
          titleBlock="Соусы"
        />
    </>
)
export default Sauces
