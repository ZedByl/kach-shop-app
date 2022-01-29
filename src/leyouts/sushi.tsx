import React from 'react'
import { sushi } from '../api'
import ProductList from '../components/ProductList/productList'

const Sushi = () => (
    <>
        <ProductList
          numberCard={ sushi }
          titleBlock="Суши"
        />
    </>
)
export default Sushi
