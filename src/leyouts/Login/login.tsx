import React, { useState } from 'react'
import './login.scss'
import { useParams, withRouter } from 'react-router-dom'
import LoginForm from '../../components/ui/LoginForm/loginForm'
import RegisterForm from '../../components/ui/RegisterForm/registerForm'

const Login = () => {
    const { type }: any = useParams()
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

export default withRouter(Login)
