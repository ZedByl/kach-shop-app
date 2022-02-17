import React, { FC, useState } from 'react'
import pen from '../../../assets/pen.svg'
import TextField from '../../common/TextField/textField'

interface SettingsPassword {
    onChange: any,
    data: DataPassword,
    onSubmit: any,
    isValid: boolean,
    errors: DataPassword
}

interface DataPassword {
    oldPassword: string,
    newPassword: string,
    confirmThePassword: string
}

const SettingsPassword: FC<SettingsPassword> = ({
                                                    data, onChange, errors, onSubmit, isValid,
                                                }) => {
    const [activePassword, setActivePassword] = useState(false)
    const toggleActivePassword = () => {
        setActivePassword((prevState) => !prevState)
    }
    return (
        <div className="account-settings__card">
            <div className="account-settings__card__inner">
                <div className="account-settings__card__header">
                    <div
                      className="account-settings__card__title"
                    >{ activePassword ? 'Изменить пароль' : 'Пароль' }</div>
                    <div
                      className="account-settings__card__button"
                      onClick={ toggleActivePassword }
                    >
                        <img
                          src={ pen }
                          alt="pen"
                          className="account-settings__card__button-icon"
                        />
                        Изменить
                    </div>
                </div>
                <div
                  className={ `account-settings__card__hidden${activePassword ? ' account-settings__card__hidden_active' : ''}` }
                >
                    <div className="account-settings__card__hidden__inner">
                        <div className="account-settings__card__hidden-input">
                            <TextField
                              label="Старый пароль*"
                              name="oldPassword"
                              type="password"
                              value={ data.oldPassword }
                              error={ errors.oldPassword }
                              onChange={ onChange }
                            />
                        </div>
                        <div className="account-settings__card__hidden-input">
                            <TextField
                              label="Новый пароль*"
                              name="newPassword"
                              type="password"
                              value={ data.newPassword }
                              error={ errors.newPassword }
                              onChange={ onChange }
                            />
                        </div>
                        <div className="account-settings__card__hidden-input">
                            <TextField
                              label="Подтверидете пароль*"
                              name="confirmThePassword"
                              type="password"
                              value={ data.confirmThePassword }
                              error={ errors.confirmThePassword }
                              onChange={ onChange }
                            />
                        </div>
                    </div>
                    <div
                      className={ `account-settings__card__hidden-button${isValid ? '' : ' disable'}` }
                      onClick={ onSubmit }
                    >
                        Сохранить изменения
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SettingsPassword
