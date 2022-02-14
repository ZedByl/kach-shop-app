import React, { FC, useState } from 'react'
import { useAppDispatch } from '../../hooks/redux'
import { Card } from '../../models/ICard'
import './editProduct.scss'
import FormProduct from '../FormProduct/formProduct'
import { changeProduct, deleteProduct } from '../../store/products'

interface CardProps {
    card: Card
}

const EditProduct: FC<CardProps> = ({ card }) => {
    const dispatch = useAppDispatch()
    const [open, setOpen] = useState(false)
    const handleDelete = () => {
        // eslint-disable-next-line no-underscore-dangle
        dispatch(deleteProduct(card._id))
    }

    const handleOpen = () => {
        setOpen((prevState) => !prevState)
    }
    return (
        <div className="edit-product__item">
            <div className="edit-product__item__inner">
                <div className="edit-product__item__img-wrapper">
                    <img
                      src={ card.image }
                      className="edit-product__item__img"
                      alt="..."
                    />
                </div>
                <div className="edit-product__item__content">
                    <div className="edit-product__item__title">{ card.title }</div>
                    <div className="edit-product__item__description">{ card.body }</div>
                </div>
                <div className="edit-product__item__buttons">
                    <div
                      className="edit-product__item__buttons-edit"
                      onClick={ handleOpen }
                    >
                        Редактировать
                    </div>
                    <div
                      className="edit-product__item__buttons-remove"
                      onClick={ handleDelete }
                    >
                        Удалить
                    </div>
                </div>
            </div>
            <div className={ `edit-product__item__hidden ${open ? 'edit-product__item__hidden-active' : ''}` }>
                <FormProduct
                  onSubmit={ changeProduct }
                  titleButton="Сохранить изменеия"
                  card={ card }
                />
            </div>
        </div>
    )
}

export default EditProduct
