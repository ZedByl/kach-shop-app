import React, { useState } from 'react'
import { useAppSelector } from '../../hooks/redux'
import history from '../../utils/history'
import { getAdmin } from '../../services/localStorage.service'
import EditProduct from '../../components/ui/EditProducts/editProduct'
import AddProduct from '../../components/ui/AddProduct/addProduct'
import { getProductsList } from '../../store/products'
import { Card } from '../../models/ICard'
import config from '../../config.json'

const Admin = () => {
    const adminUser = getAdmin()
    if (adminUser !== config.adminEmail) {
        history.push('/')
    }
    const listProduct = useAppSelector(getProductsList())
    const type = 'allProducts'
    const [formType, setFormType] = useState(
        type === 'allProducts' ? type : 'addProduct',
    )
    const toggleFormType = () => {
        setFormType((prevState: string) => (prevState === 'allProducts' ? 'addProduct' : 'allProducts'))
    }
    return (
        <div className="account">
            <div className="account__inner">
                <div className="account__header">
                    <h2 className="section-heading">Панель управления</h2>
                    <div className="account__header-buttons">
                        <div
                          className={ `account__header-button${formType === 'allProducts' ? ' active-button' : ''}` }
                          onClick={ toggleFormType }
                        >
                            Все товары
                        </div>
                        <div
                          className={ `account__header-button${formType === 'addProduct' ? ' active-button' : ''}` }
                          onClick={ toggleFormType }
                        >
                            Добавить блюдо
                        </div>
                    </div>
                </div>

                { formType === 'allProducts'
                    ? <div className="account__cards">
                        {/* eslint-disable-next-line react/jsx-key */ }
                        { listProduct && listProduct.map((item: Card) => (
                            <EditProduct
                              key={ item._id }
                              card={ item }
                            />
                        )) }
                    </div> : <AddProduct /> }
            </div>
        </div>
    )
}

export default Admin
