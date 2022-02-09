import React, { useState } from 'react'
import './accountSettings.scss'
import { useDispatch, useSelector } from 'react-redux'
import SettingsPersonalData from '../SettingsPersonalData/settingsPersonalData'
import SettingsPassword from '../SettingsPassword/settingsPassword'
import { validator } from '../../utils/validator'
import { getCurrentUserData, updateUserData, updateUserPassword } from '../../store/user'

interface DataAccount {
    name: string,
    email: string,
    phone: string,
    dateOfBirth: string
}

interface DataPassword {
    oldPassword: string,
    newPassword: string,
    confirmThePassword: string
}

const AccountSettings = () => {
    const currentUser = useSelector(getCurrentUserData())
    const dispatch = useDispatch()
    const [dataAccount, setDataAccount] = useState<DataAccount>({
        name: currentUser.name || '',
        email: currentUser.email || '',
        phone: currentUser.phone || '',
        dateOfBirth: currentUser.dateOfBirth || '',
    })
    const [dataPassword, setDataPassword] = useState<DataPassword>({
        oldPassword: '',
        newPassword: '',
        confirmThePassword: '',
    })
    const [errorsAccount, setErrorsAccount] = useState<any>({})
    const [errorsPassword, setErrorsPassword] = useState<any>({})

    const validatorConfigDataAccount = {
        email: {
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
    }
    const validatorConfigResetPassword = {
        oldPassword: {
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
        newPassword: {
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
            confirmTheNewPassword: {
                message: 'Новый пароль должен отличаться от старого',
            },
        },
        confirmThePassword: {
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
            confirmThePassword: {
                message: 'Пароли не совпадают',
            },
        },
    }
    const validateDataAccount = () => {
        const errors = validator(dataAccount, validatorConfigDataAccount)
        setErrorsAccount(errors)
        return Object.keys(errors).length === 0
    }
    const validateResetPassword = () => {
        const errors = validator(dataPassword, validatorConfigResetPassword)
        setErrorsPassword(errors)
        return Object.keys(errors).length === 0
    }
    const isValidDataAccount = Object.keys(errorsAccount).length === 0
    const isValidPassword = Object.keys(errorsPassword).length === 0
    const handleSubmitDataAccount = async (e: any) => {
        e.preventDefault()
        const isValid = validateDataAccount()
        if (!isValid) return
        await dispatch(updateUserData(dataAccount))
    }

    const handleSubmitResetPassword = (e: any) => {
        e.preventDefault()
        const isValid = validateResetPassword()
        if (!isValid) return
        dispatch(updateUserPassword(dataPassword))
    }

    const handleChangeAccountData = (target: { name: string; value: string }) => {
        setDataAccount((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }
    const handleChangePasswordData = (target: { name: string; value: string }) => {
        setDataPassword((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }

    return (
        <div className="account-settings">
            <SettingsPersonalData
              data={ dataAccount }
              onChange={ handleChangeAccountData }
              isValid={ isValidDataAccount }
              onSubmit={ handleSubmitDataAccount }
              errors={ errorsAccount }
            />
            <SettingsPassword
              onChange={ handleChangePasswordData }
              data={ dataPassword }
              isValid={ isValidPassword }
              onSubmit={ handleSubmitResetPassword }
              errors={ errorsPassword }
            />
        </div>
    )
}

export default AccountSettings
