import React, { useEffect, useState } from 'react'
import TextField from '../TextField/textField'
import { validator } from '../../utils/validator'

// @ts-ignore
const LoginForm = ({ onSubmit }) => {
    const [data, setData] = useState({
        email: '',
        password: '',
    })
    const [errors, setErrors] = useState({})
    const handleChange = (target: any) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }
    const validatorConfig = {
        email: {
            isRequired: {
                message: 'Электронная почта обязательна для заполнения',
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязателкн для заполнения',
            },
        },
    }
    const validate = () => {
        const errors = validator(data, validatorConfig)
        setErrors(errors)
        return Object.keys(errors).length === 0
    }
    useEffect(() => {
        validate()
    }, [data])
    const isValid = Object.keys(errors).length === 0
    const handleSubmit = (e: any) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        console.log(data)
    }
    return (
        <div className="login__wrapper">
            <div className="login__title">Вход в аккаунт</div>
            <div className="login__description">Сможете быстро оформлять заказы, использовать бонусы</div>
            <TextField
              label="Емейл"
              name="email"
              value={ data.email }
              onChange={ handleChange }
                // @ts-ignore
              error={ errors.email }
            />
            <TextField
              label="Пароль"
              name="password"
              type="password"
              value={ data.password }
              onChange={ handleChange }
              maxlength="11"
                // @ts-ignore
              error={ errors.password }
            />
            <div
              className={ isValid ? 'login__button' : 'login__button-invalid' }
              onClick={ handleSubmit }
                // @ts-ignore
              disabled={ !isValid }
            >
                Войти
            </div>
            <div className="login__register">
                Ещё нет аккаунта?
                <a
                  role="button"
                  className="login__register__link"
                  onClick={ onSubmit }
                >
                    { ' ' }
                    Зарегистрируйтесь
                </a>
            </div>
        </div>
    )
}

export default LoginForm