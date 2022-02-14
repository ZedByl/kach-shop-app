import React from 'react'
import { withRouter } from 'react-router-dom'
import ProductList from '../components/ProductList/productList'
import {
    cards, sushi, snacks, desserts, sauces,
} from '../api'
import { useAppSelector } from '../hooks/redux'
import { getProductsList } from '../store/products'

const Main = () => {
    const productList = useAppSelector(getProductsList())
    console.log(productList)
    return (
        <>
            <ProductList
              numberCard={ cards }
              titleBlock="Пицца"
            />
            <ProductList
              numberCard={ sushi }
              titleBlock="Суши"
            />
            <ProductList
              numberCard={ snacks }
              titleBlock="Закуски"
            />
            <ProductList
              numberCard={ desserts }
              titleBlock="Десерты"
            />
            <ProductList
              numberCard={ sauces }
              titleBlock="Соусы"
            />
        </>
    )
}

export default withRouter(Main)
