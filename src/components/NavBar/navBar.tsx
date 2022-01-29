import React, { FC } from 'react'
import { Link } from 'react-router-dom'
import './navBar.scss'
import { useSelector } from 'react-redux'
import { getProductItems } from '../../store/basket'

const NavBar: FC = () => {
    const items = useSelector(getProductItems())
    // @ts-ignore
    const totalPrice = items.reduce((acc: number, product: object) => acc + product.price * product.count, 0) // eslint-disable-line
    return (
        <nav className="topline__wrapper">
            <div className="topline">
                <div className="topline__left">
                    <div className="topline__logo-block">
                        <Link to="/">Лого</Link>
                    </div>
                    <ul className="topline__projects-wrap">
                        <li>
                            <Link to="/pizza">Пицца</Link>
                        </li>
                        <li>
                            <Link to="/sushi">Суши</Link>
                        </li>
                        <li>
                            <Link to="/snacks">Закуски</Link>
                        </li>
                        <li>
                            <Link to="/desserts">Десерты</Link>
                        </li>
                        <li>
                            <Link to="/sauces">Соусы</Link>
                        </li>
                    </ul>
                </div>
                <ul className="topline__right">
                    <li className="topline__register">
                        <Link to="/basket">
                            { totalPrice ? `${totalPrice} ₽` : 'Корзина' }
                        </Link>
                    </li>
                    <li className="topline__login">
                        <Link to="/login">
                            Войти в аккаунт
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}
export default NavBar
