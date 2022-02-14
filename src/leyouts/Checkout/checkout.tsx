import React from 'react'
import './checkout.scss'
import checkout from '../../assets/checkout.png'
import { useAppSelector } from '../../hooks/redux'
import { getOrdersUser } from '../../store/order'

const Checkout = () => {
    const currentOrder = useAppSelector(getOrdersUser())
    return (
        <div className="checkout">
            <div className="checkout__wrapper">
                <div className="checkout__header">
                    <img
                      src={ checkout }
                      alt="checkout"
                    />
                </div>
                <div className="checkout__body">
                    <div className="checkout__body-title">Заказ №{ currentOrder[0].number } принят</div>
                    <div className="checkout__body-description">
                        Спасибо за заказ!
                        Примерное время доставки 45 минут.
                        Обратите внимание,
                        что если вы не авторизованы,
                        то этот экран пропадет после перезагрузки страницы.
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Checkout
