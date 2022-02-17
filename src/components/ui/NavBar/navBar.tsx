import React, { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './navBar.scss'
import { useAppSelector } from '../../../hooks/redux'
import { getProductItems } from '../../../store/basket'
import logo from '../../../assets/logo.svg'
import user from '../../../assets/user.svg'
import { getIsLogIn } from '../../../store/user'
import { getCategoryList } from '../../../store/category'
import { countTotalPrice } from '../../../utils/countTotalPrice'

const NavBar: FC = () => {
    const items = useAppSelector(getProductItems())
    const isLoggedIn = useAppSelector(getIsLogIn())
    const categories = useAppSelector(getCategoryList())
    const totalPrice = countTotalPrice(items)
    const { pathname } = useLocation()
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
                    { categories && categories.map((category: any) => (
                        <li
                          className="header__menu__item"
                          key={ category.categoryId }
                        >
                            <div className="header__menu__link">
                                { pathname !== '/' ? <Link to="/">{ category.title }</Link>
                                    : <a href={ `#${category.categoryId}` }>{ category.title }</a> }
                            </div>
                        </li>
                    )) }
                </ul>
                <div className="header__buttons">
                    <div className="header__button"><Link
                      to="/basket"
                                                    >{ totalPrice ? `${totalPrice} ₽` : 'Корзина' }</Link></div>
                    <div className="header__button header__button_outline">
                        { isLoggedIn ? (
                            <Link to="/account"><img
                              src={ user }
                              alt=""
                              className="header__user__svg"
                                                />Профиль</Link>
                        ) : (<Link to="/login"><img
                          src={ user }
                          alt=""
                          className="header__user__svg"
                                               />Войти в аккаунт</Link>) }
                    </div>
                </div>
            </div>
        </header>
    )
}
export default NavBar
