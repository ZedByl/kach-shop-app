import React, { FC, useState } from 'react'
import arrow from '../../../assets/arrow.svg'
import { displayDate } from '../../../utils/displayDate'
import { countProduct } from '../../../utils/countProduct'
import { CardOrder, Card } from '../../../models/ICard'

interface ProductCardProps {
    card: CardOrder
}

const AccountCard: FC<ProductCardProps> = ({ card }) => {
    const orders = card.itemsProduct
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
                            <div className="account__card__info__label">Оплата</div>
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
                            { card.itemsProduct && card.itemsProduct.map((product: Card) => (
                                <img
                                  className="account__card__order-item"
                                  src={ product.image }
                                  key={ product._id }
                                  alt=""
                                />
                            )) }
                        </div>
                    </div>
                    <div className="account__card__hidden account__card_border">
                        <div className="account__card__row">
                            { orders && orders.map((product: Card) => (
                                <div
                                  key={ product._id }
                                  className="account__card__item"
                                >
                                    <div className="account__card__item__col">
                                        <div className="account__card__item__img-wrapper">
                                            <img
                                              className="account__card__item__img"
                                              src={ product.image }
                                              alt=""
                                            />
                                        </div>
                                        <div className="account__card__item__title">{ product.title }
                                        </div>
                                    </div>
                                    <div className="account__card__item__description">{ product.body }
                                    </div>
                                    <div className="account__card__item__amount">{ countProduct(product.count) }</div>
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
