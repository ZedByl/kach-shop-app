import React, { FC, useEffect, useState } from 'react'
import { useAppDispatch } from '../../../hooks/redux'
import { Product } from '../../../models/IProduct'
import { validator } from '../../../utils/validator'
import TextField from '../../common/TextField/textField'
import SelectField from '../../common/SelectField/selectField'
import { Card } from '../../../models/ICard'

interface DataProps {
    onSubmit: any,
    titleButton: string,
    card?: Card
}

const FormProduct: FC<DataProps> = ({ onSubmit, titleButton, card }) => {
    const dispatch = useAppDispatch()
    const [data, setData] = useState<Product>({
        image: card?.image || '',
        title: card?.title || '',
        body: card?.body || '',
        type: card?.type || '',
        price: card?.price || '',
    })
    const [errors, setErrors] = useState({})
    const handleChange = (target: any) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value,
        }))
    }
    const select = [
        { value: '620bed4f83b8e6ba941a37ed', label: 'Пицца' },
        { value: '620bed9683b8e6ba941a37ee', label: 'Суши' },
        { value: '620bedac83b8e6ba941a37ef', label: 'Десерты' },
        { value: '620bedc383b8e6ba941a37f0', label: 'Закуски' },
        { value: '620bedd583b8e6ba941a37f1', label: 'Соусы' },
    ]
    const validatorConfig = {
        title: {
            isRequired: {
                message: 'Название обязательно для заполнения',
            },
        },
        price: {
            isRequired: {
                message: 'Цена обязательна для заполнения',
            },
        },
        type: {
            isRequired: {
                message: 'Тип обязателен для заполнения',
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
        dispatch(onSubmit({ ...data, _id: card?._id }))
        setData({
            image: '',
            title: '',
            body: '',
            type: '',
            price: '',
        })
    }
    return (
        <>
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
              className={ isValid ? 'add-products__button' : 'add-products__button-invalid' }
              onClick={ handleSubmit }
            >
                { titleButton }
            </div>
        </>
    )
}

export default FormProduct
