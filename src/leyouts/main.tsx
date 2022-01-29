import React from 'react'
import ProductList from '../components/ProductList/productList'
import {
 cards, sushi, snacks, desserts, sauces,
} from '../api'

const Main = () => {
    console.log('main')
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

export default Main
