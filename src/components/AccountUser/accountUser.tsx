import React, { useState } from 'react'
import './accountUser.scss'
import { Link } from 'react-router-dom'
import AccountCard from '../AccountCard/accountCard'
import { order } from '../../api'
import AccountSettings from '../AccountSettings/accountSettings'

const AccountUser = () => {
    const type = 'historyOrder'
    const [formType, setFormType] = useState(
        type === 'historyOrder' ? type : 'settings',
    )
    const toggleFormType = () => {
        setFormType((prevState: string) => (prevState === 'historyOrder' ? 'settings' : 'historyOrder'))
    }
    return (
        <>
            <div className="account">
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
                            <Link
                              to="/logout"
                              className="account__header-button"
                            >Выйти
                            </Link>
                        </div>
                    </div>

                    { formType === 'historyOrder'
                        ? <div className="account__cards">
                            { order && order.map((item) => (
                                <AccountCard
                                  key={ item.id }
                                  card={ item }
                                />
                            )) }
                        </div> : <AccountSettings /> }
                </div>
            </div>
        </>
    )
}

export default AccountUser
