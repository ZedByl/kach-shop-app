import React, { useEffect, useState } from 'react'
import './basket.scss'
import { useSelector } from 'react-redux'
import { getProductItems } from '../store/basket'
import BasketCard from '../components/BasketCard/basketCard'
import BasketDelivery from '../components/BasketDelivery/basketDelivery'
import { validator } from '../utils/validator'

interface Card {
    id: string,
    new: boolean,
    image: string,
    title: string,
    body: string,
    type: string,
    price: number,
    count: number
}

const Basket = () => {
    const items = useSelector(getProductItems())
    // @ts-ignore
    const totalPrice = items.reduce((acc: number, product: object) => acc + product.price * product.count, 0) // eslint-disable-line
    const [data, setData] = useState({
        name: '',
        email: '',
        phone: '',
        street: '',
        house: '',
        entrance: '',
        floor: '',
        apartment: '',
        intercom: '',
        pay: 'cash',
        comment: '',
        itemsProduct: items,
        totalPrice,
    })
    const [errors, setErrors] = useState({})
    const handleChange = (target: { name: string; value: string }) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }
    const validatorConfig = {
        email: {
            isEmail: {
                message: 'Email введен некорректно',
            },
        },
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения',
            },
            min: {
                message: 'Имя должено состаять миниму из 3 символов',
                value: 3,
            },
        },
        phone: {
            isRequired: {
                message: 'Телефон обязателен для заполнения',
            },
            number: {
                message: 'Нужно вводить только цифры',
            },
            min: {
                message: 'Телефон должено состаять миниму из 11 цифр',
                value: 11,
            },
        },
        street: {
            isRequired: {
                message: 'Улица обязательна для заполнения',
            },
        },
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    useEffect(() => {
        validate()
    }, [data])
    const isValid = Object.keys(errors).length === 0
    const handleCheckout = (e: any) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }

    return (
        <div className="basket">
            { items.length > 0
                ? <>
                    <div className="basket__title">Ваш заказ</div>
                    <div className="basket__cards">
                        { items.map((card: Card) => (
                            <BasketCard
                              key={ card.id }
                              card={ card }
                            />
                        )) }
                    </div>
                    <div className="basket__total-price">
                        Итог: { totalPrice } ₽
                    </div>
                    <div className="basket__delivery">
                        <BasketDelivery
                          onChange={ handleChange }
                          data={ data }
                            // @ts-ignore
                          errors={ errors }
                        />
                    </div>
                    <div className="basket__checkout">
                        <div className="basket__name">Оформить заказ</div>
                        <div className="basket__checkout__content">
                            <div className="basket__checkout__total-price">
                                Итог: { totalPrice } ₽
                            </div>
                            <div
                              className={ isValid ? 'basket__checkout__button' : 'basket__checkout__button-invalid' }
                              onClick={ handleCheckout }
                                // @ts-ignore
                              disabled={ !isValid }
                            >Оформить заказ
                            </div>
                        </div>
                    </div>
                </>
                : <div className="basket__empty">Корзина пуста</div>
            }
        </div>
    )
}

export default Basket
