import React, { useState } from 'react'
import './login.scss'
import { useParams } from 'react-router-dom'
import LoginForm from '../../components/LoginForm/loginForm'
import RegisterForm from '../../components/RegisterForm/registerForm'

const Login = () => {
    // @ts-ignore
    const { type } = useParams()
    const [formType, setFormType] = useState(
        type === 'register' ? type : 'login',
    )
    const toggleFormType = () => {
        setFormType((prevState: string) => (prevState === 'register' ? 'login' : 'register'))
    }
    return (
        <div className="login">
            { formType === 'register'
                ? <RegisterForm onSubmit={ toggleFormType } />
                : <LoginForm onSubmit={ toggleFormType } /> }
        </div>
    )
}

export default Login
