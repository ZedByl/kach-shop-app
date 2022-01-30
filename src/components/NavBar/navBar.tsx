import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './navBar.scss'
import { useSelector } from 'react-redux'
import { getProductItems } from '../../store/basket'
import logo from '../../assets/logo.svg'

const NavBar: FC = () => {
    const items = useSelector(getProductItems())
    // @ts-ignore
    const totalPrice = items.reduce((acc: number, product: object) => acc + product.price * product.count, 0) // eslint-disable-line
    return (
        <header className="header">
            <div className="header__inner">
                <div className="header__logo">
                    <Link to="/">
                        <img
                          src={ logo }
                          alt=""
                          className="header__logo__svg"
                        />
                        <span className="header__logo__text">Куда пицца</span>
                    </Link>
                </div>
                <ul className="header__menu">
                    <li className="header__menu__item">
                        <div className="header__menu__link"><Link to="/pizza">Пицца</Link></div>
                    </li>
                    <li className="header__menu__item">
                        <div className="header__menu__link"><Link to="/sushi">Суши</Link></div>
                    </li>
                    <li className="header__menu__item">
                        <div className="header__menu__link"><Link to="/snacks">Закуски</Link></div>
                    </li>
                    <li className="header__menu__item">
                        <div className="header__menu__link"><Link to="/desserts">Десерты</Link></div>
                    </li>
                    <li className="header__menu__item">
                        <div className="header__menu__link"><Link to="/sauces">Соусы</Link></div>
                    </li>
                </ul>
                <div className="header__buttons">
                    <div className="header__button"><Link
                      to="/basket"
                                                    >{ totalPrice ? `${totalPrice} ₽` : 'Корзина' }</Link></div>
                    <div className="header__button header__button_outline"><Link to="/login">Войти в аккаунт</Link>
                    </div>
                </div>
            </div>
        </header>
    )
}
export default NavBar
