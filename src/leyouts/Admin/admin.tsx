import React, { useState } from 'react'
import history from '../../utils/history'
import { getAdmin } from '../../services/localStorage.service'
import './admin.scss'
import TextField from '../../components/TextField/textField'
import SelectField from '../../components/SelectField/selectField'

interface Data {
    image: string,
    title: string,
    body: string,
    type: string,
    price: number,
}

const Admin = () => {
    const currentUser = getAdmin()
    console.log(process.env.REACT_APP_EMAIL_ADMIN)
    if (currentUser !== process.env.REACT_APP_EMAIL_ADMIN) {
        history.push('/')
    }
    const [data, setData] = useState<Data>({
        image: '',
        title: '',
        body: '',
        type: '',
        price: 0,
    })
    const [errors] = useState({})
    const handleChange = (target: any) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }
    const select = [
        { value: 'pizza', label: 'Пицца' },
        { value: 'sushi', label: 'Суши' },
        { value: 'desserts', label: 'Десерты' },
    ]
    return (
        <div className="admin">
            <div className="admin__wrapper">
                <div className="admin__title">Добавить новый товар</div>
                <TextField
                  label="Название"
                  name="title"
                  value={ data.title }
                  onChange={ handleChange }
                    // @ts-ignore
                  error={ errors.title }
                />
                <TextField
                  label="Состав"
                  name="body"
                  value={ data.body }
                  onChange={ handleChange }
                    // @ts-ignore
                  error={ errors.title }
                />
                <SelectField
                  label="Выбери тип товара"
                  defaultOption="Choose..."
                  name="type"
                  options={ select }
                  onChange={ handleChange }
                  value={ data.type }
                    // @ts-ignore
                  error={ errors.type }
                />
                <TextField
                  label="Цена в рублях"
                  name="price"
                  type="number"
                  value={ data.price }
                  onChange={ handleChange }
                    // @ts-ignore
                  error={ errors.price }
                />
                <TextField
                  label="Ссылка на картинку (костыль пока не реализованно хранилище)"
                  name="image"
                  value={ data.image }
                  onChange={ handleChange }
                    // @ts-ignore
                  error={ errors.image }
                />
                <div
                  className="admin__button-invalid"
                >
                    Добавить товар
                </div>
            </div>
        </div>
    )
}

export default Admin
