import React, { useState } from 'react'
import './accountUser.scss'
import { Link } from 'react-router-dom'
import AccountCard from '../AccountCard/accountCard'
import AccountSettings from '../AccountSettings/accountSettings'
import { useAppSelector } from '../../hooks/redux'
import { getCurrentUserData } from '../../store/user'
import Loader from '../Loader/loader'
import { getOrdersUser } from '../../store/order'

const AccountUser = () => {
    const currentUser = useAppSelector(getCurrentUserData())
    const ordersUser = useAppSelector(getOrdersUser())
    const type = 'historyOrder'
    const [formType, setFormType] = useState(
        type === 'historyOrder' ? type : 'settings',
    )
    const toggleFormType = () => {
        setFormType((prevState: string) => (prevState === 'historyOrder' ? 'settings' : 'historyOrder'))
    }
    return (
        <>
            { currentUser ? <div className="account">
                <div className="account__inner">
                    <div className="account__header">
                        <h2 className="section-heading">Мой аккаунт</h2>
                        <div className="account__header-buttons">
                            <div
                              className={ `account__header-button${formType === 'historyOrder' ? ' active-button' : ''}` }
                              onClick={ toggleFormType }
                            >История заказов
                            </div>
                            <div
                              className={ `account__header-button${formType === 'settings' ? ' active-button' : ''}` }
                              onClick={ toggleFormType }
                            >Настройки
                            </div>
                            { currentUser.role === 'admin'
                                && <Link
                                  to="/admin"
                                  className="account__header-button"
                                   >
                                    Админка
                                </Link> }
                            <Link
                              to="/logout"
                              className="account__header-button"
                            >Выйти
                            </Link>
                        </div>
                    </div>

                    { formType === 'historyOrder'
                        ? <div className="account__cards">
                            { ordersUser.length > 0 ? ordersUser.map((item: any) => (
                                <AccountCard
                                  key={ item.number }
                                  card={ item }
                                />
                            )) : <h2 className="account__cards__not-orders">У вас пока нет заказов</h2> }
                        </div> : <AccountSettings /> }
                </div>
            </div> : <Loader /> }
        </>
    )
}

export default AccountUser
