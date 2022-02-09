import React, { FC, useState } from 'react'
import arrow from '../../assets/arrow.svg'
import pizza from '../../assets/pizza.png'
import { displayDate } from '../../utils/displayDate'

interface CardOrder {
    id: string,
    number: number,
    date: number,
    totalPrice: number,
    status: string,
    pay: string,
    street: string,
    house: string,
    entrance: string,
    floor: string,
    apartment: string,
    intercom: string,
    itemsProduct: Array<Card>,
}

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

interface ProductCardProps {
    card: CardOrder
}

const AccountCard: FC<ProductCardProps> = ({ card }) => {
    const [activeInfo, setActiveInfo] = useState(false)
    const toggleArrow = () => {
        setActiveInfo((prevState) => !prevState)
    }
    return (
        <>
            <div
              className={ `account__card account__card_success ${activeInfo ? 'account__card_active' : ''}` }
            >
                <div className="account__card__inner">
                    <div
                      className="account__card__row account__card__row_top account__card__row_space-between"
                    >
                        <div className="account__card__info">
                            <div className="account__card__info__label">Заказ</div>
                            <div
                              className="account__card__info__text"
                            >№{ card.number }<span>{ displayDate(card.date) }</span>
                            </div>
                        </div>
                        <div className="account__card__info">
                            <div className="account__card__info__label">Сумма заказа</div>
                            <div className="account__card__info__text">{ card.totalPrice } ₽</div>
                        </div>
                        <div className="account__card__info">
                            <div className="account__card__info__label">Статус</div>
                            <div className="account__card__info__text">{ card.status }</div>
                        </div>
                        <div className="account__card__info">
                            <div className="account__card__info__label">Оплачено</div>
                            <div className="account__card__info__text">{ card.pay }</div>
                        </div>
                        <div className="account__card__info">
                            <div
                              className="account__card__info__button"
                              onClick={ toggleArrow }
                            >
                                <img
                                  src={ arrow }
                                  alt=""
                                  className="icon__arrow"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="account__card__row account__card__row_space-between account__card_border">
                        <div className="account__card__text">
                            { card.street } { card.house }, { card.apartment }, { card.floor },
                            домофон { card.intercom }
                        </div>
                        <div className="account__card__order-items">
                            <img
                              className="account__card__order-item"
                              src={ pizza }
                              alt=""
                            />
                            <img
                              className="account__card__order-item"
                              src={ pizza }
                              alt=""
                            />
                            <img
                              className="account__card__order-item"
                              src={ pizza }
                              alt=""
                            />
                        </div>
                    </div>
                    <div className="account__card__hidden account__card_border">
                        <div className="account__card__row">
                            { card.itemsProduct && card.itemsProduct.map((product: Card) => (
                                <div
                                  key={ product.id }
                                  className="account__card__item"
                                >
                                    <div className="account__card__item__col">
                                        <div className="account__card__item__img-wrapper">
                                            <img
                                              className="account__card__item__img"
                                              src={ pizza }
                                              alt=""
                                            />
                                        </div>
                                        <div className="account__card__item__title">{ product.title }
                                        </div>
                                    </div>
                                    <div className="account__card__item__description">{ product.body }
                                    </div>
                                    <div className="account__card__item__amount">{ product.count } товар</div>
                                    <div className="account__card__item__price">{ product.price * product.count } ₽
                                    </div>
                                </div>
                            )) }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AccountCard
