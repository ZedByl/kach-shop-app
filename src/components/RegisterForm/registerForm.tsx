import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { validator } from '../../utils/validator'
import TextField from '../TextField/textField'
import { signUp } from '../../store/user'
import history from '../../utils/history'

// @ts-ignore
const RegisterForm = ({ onSubmit }) => {
    const dispatch = useDispatch()
    const [data, setData] = useState({
        email: '',
        name: '',
        phone: '',
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
            isEmail: {
                message: 'Email введен некорректно',
            },
        },
        name: {
            isRequired: {
                message: 'Имя обязательно для заполнения',
            },
            min: {
                message: 'Имя должено состаять миниму из 3 символов',
                value: 3,
            },
        },
        phone: {
            isRequired: {
                message: 'Телефон обязателен для заполнения',
            },
            number: {
                message: 'Нужно вводить только цифры',
            },
            min: {
                message: 'Телефон должено состаять миниму из 11 цифр',
                value: 11,
            },
        },
        password: {
            isRequired: {
                message: 'Пароль обязательна для заполнения',
            },
            isCapitalSymbol: {
                message: 'Пароль должен содержать хотя бы одну заглавную букву',
            },
            isContainDigit: {
                message: 'Пароль должен содержать хотя бы одно число',
            },
            min: {
                message: 'Пароль должен состаять миниму из 8 символов',
                value: 8,
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

    const handleSubmit = async (e: any) => {
        e.preventDefault()
        const isValid = validate()
        if (!isValid) return
        // @ts-ignore
        const redirect = history.location.state ? history.location.state : '/'
        await dispatch(signUp({ payload: data, redirect }))
    }
    return (
        <div className="login__wrapper">
            <div className="login__title">Регистрация</div>
            <div className="login__description">Сможете быстро оформлять заказы, использовать бонусы</div>
            <TextField
              label="Электронная почта"
              name="email"
              value={ data.email }
              onChange={ handleChange }
                // @ts-ignore
              error={ errors.email }
            />
            <TextField
              label="Имя"
              name="name"
              value={ data.name }
              onChange={ handleChange }
                // @ts-ignore
              error={ errors.name }
            />
            <TextField
              label="Телефон"
              name="phone"
              value={ data.phone }
              onChange={ handleChange }
                // @ts-ignore
              error={ errors.phone }
            />
            <TextField
              label="Пароль"
              type="password"
              name="password"
              value={ data.password }
              onChange={ handleChange }
                // @ts-ignore
              error={ errors.password }
            />
            <div
              className={ isValid ? 'login__button' : 'login__button-invalid' }
              onClick={ handleSubmit }
                // @ts-ignore
              disabled={ !isValid }
            >
                Зарегистрироваться
            </div>
            <div className="login__disclaimer">Продолжая, вы соглашаетесь со сбором и обработкой
                персональных
                данных
                и пользовательским соглашением
            </div>
            <div className="login__register">
                Уже есть аккаунт?
                <a
                  role="button"
                  className="login__register__link"
                  onClick={ onSubmit }
                >
                    { ' ' }
                    Войдите
                </a>
            </div>
        </div>
    )
}

export default RegisterForm
