import React from 'react'
import './accountUser.scss'
import AccountCard from '../AccountCard/accountCard'
import { order } from '../../api'

const AccountUser = () => (
    <>
        <div className="account">
            <div className="account__inner">
                <h2 className="section-heading">Мой аккаунт</h2>
                <div className="account__cards">
                    { order && order.map((item) => (
                        <AccountCard
                          key={ item.id }
                          card={ item }
                        />
                    )) }
                </div>
            </div>
        </div>
    </>
)

export default AccountUser
