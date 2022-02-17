import React from 'react'
import './addProduct.scss'
import FormProduct from '../FormProduct/formProduct'
import { createProduct } from '../../../store/products'

const AddProduct = () => (
    <div className="add-products">
        <div className="add-products__wrapper">
            <div className="admin__title">Добавить новый товар</div>
            <FormProduct
              onSubmit={ createProduct }
              titleButton="Добавить товар"
            />
        </div>
    </div>
)

export default AddProduct
