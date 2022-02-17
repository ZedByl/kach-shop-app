import React, { useEffect, useState } from 'react'
import './basket.scss'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { getCurrentUserData, getIsLogIn } from '../../store/user'
import { getProductItems } from '../../store/basket'
import BasketCard from '../../components/ui/BasketCard/basketCard'
import BasketDelivery from '../../components/ui/BasketDelivery/basketDelivery'
import { validator } from '../../utils/validator'
import { createOrder } from '../../store/order'
import { Card } from '../../models/ICard'

const Basket = () => {
    const dispatch = useAppDispatch()
    const currentUser = useAppSelector(getCurrentUserData())
    const items = useAppSelector(getProductItems())
    const isLogginedIn = useAppSelector(getIsLogIn())

    const totalPrice = items.reduce((acc: number, product: Card): number => acc + product.price * product.count, 0) // eslint-disable-line
    const [data, setData] = useState({
        userId: '',
        name: '',
        email: '',
        phone: '',
        street: '',
        house: '',
        entrance: '',
        floor: '',
        apartment: '',
        intercom: '',
        pay: 'Наличные',
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
        if (currentUser && isLogginedIn) {
            setData((prevState) => ({
                ...prevState,
                userId: currentUser._id,
                name: currentUser.name,
                email: currentUser.email,
                phone: currentUser.phone,
                street: currentUser.street || '',
                house: currentUser.house || '',
                entrance: currentUser.entrance || '',
                floor: currentUser.floor || '',
                apartment: currentUser.apartment || '',
                intercom: currentUser.intercom || '',
                itemsProduct: items,
                totalPrice,
            }))
        }
    }, [currentUser])
    useEffect(() => {
        validate()
    }, [data])
    const isValid = Object.keys(errors).length === 0
    const handleCheckout = (e: any) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        dispatch(createOrder(data))
    }

    return (
        <div className="cart">
            <div className="cart__inner">
                { items.length > 0
                    ? <>
                        <div className="cart__heading">Ваш заказ</div>
                        <div className="cart__order">
                            { items.map((card: Card) => (
                                <BasketCard
                                  key={ card._id }
                                  card={ card }
                                />
                            )) }
                        </div>
                        <div className="cart__total-price">
                            Итог: { totalPrice } ₽
                        </div>
                        <BasketDelivery
                          onChange={ handleChange }
                          data={ data }
                          isLoggined={ isLogginedIn }
                            // @ts-ignore
                          errors={ errors }
                        />
                        <div className="cart__checkout">
                            <div className="cart__name">Оформить заказ</div>
                            <div className="cart__checkout__content">
                                <div className="cart__checkout__total-price">
                                    Итог: { totalPrice } ₽
                                </div>
                                <div
                                  className={ isValid ? 'cart__checkout__button' : 'cart__checkout__button-invalid' }
                                  onClick={ handleCheckout }
                                >Оформить заказ
                                </div>
                            </div>
                        </div>
                    </>
                    : <div className="cart__empty">Корзина пуста</div>
                }
            </div>
        </div>
    )
}

export default Basket
