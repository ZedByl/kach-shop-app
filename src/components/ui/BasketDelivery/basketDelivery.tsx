import React, { FC } from 'react'
import TextField from '../../common/TextField/textField'
import RadioField from '../../common/RadioField/radioField'
import TextAreaField from '../../common/TextAriaField/textAriaField'
import './basketDelivery.scss'

interface BasketDeliveryProps {
    data: Data,
    onChange: any,
    errors: ErrorPreview,
    isLoggined: boolean
}

interface Data {
    name: string,
    email: string,
    phone: string,
    street: string,
    house: string,
    entrance: string,
    floor: string,
    apartment: string,
    intercom: string,
    pay: string,
    comment: string,
}

type ErrorPreview = Omit<Data, 'pay' | 'comment' | 'house' | 'entrance' | 'floor' | 'apartment' | 'intercom'>;

const BasketDelivery: FC<BasketDeliveryProps> = ({
                                                     data, onChange, errors, isLoggined,
                                                 }) => (
    <>
        { !isLoggined && <div className="basket__delivery__block">
            <div className="basket__delivery__name">О вас</div>
            <div className="basket__delivery__data">
                <TextField
                  label="Имя*"
                  name="name"
                  value={ data.name }
                  onChange={ onChange }
                  error={ errors.name }
                />
                <TextField
                  label="Телефон*"
                  name="phone"
                  value={ data.phone }
                  onChange={ onChange }
                  error={ errors.phone }
                  mask="+7 999 999-99-99"
                  type="tel"
                  autoComplete="tel"
                  placeholder="+7 999 999-99-99"
                />
                <TextField
                  label="Почта"
                  name="email"
                  value={ data.email }
                  onChange={ onChange }
                  error={ errors.email }
                />
            </div>
        </div> }
        <div className="basket__delivery__block">
            <div className="basket__delivery__name">Доставка</div>
            <div className="basket__delivery__header">
                <TextField
                  label="Улица*"
                  name="street"
                  value={ data.street }
                  onChange={ onChange }
                  error={ errors.street }
                />
            </div>
            <div className="basket__delivery__body">
                <TextField
                  label="Дом"
                  name="house"
                  value={ data.house }
                  onChange={ onChange }
                />
                <TextField
                  label="Подъезд"
                  name="entrance"
                  value={ data.entrance }
                  onChange={ onChange }
                />
                <TextField
                  label="Этаж"
                  name="floor"
                  value={ data.floor }
                  onChange={ onChange }
                />
                <TextField
                  label="Квартира"
                  name="apartment"
                  value={ data.apartment }
                  onChange={ onChange }
                />
                <TextField
                  label="Домофон"
                  name="intercom"
                  value={ data.intercom }
                  onChange={ onChange }
                />
            </div>
        </div>
        <div className="basket__delivery__block">
            <div className="basket__delivery__name">Оплата</div>
            <RadioField
              options={ [
                    { name: 'Наличные', value: 'Наличные' },
                    { name: 'Карта', value: 'Карта' },
                    { name: 'Apple Pay', value: ' Apple Pay' },
                ] }
              value={ data.pay }
              name="pay"
              onChange={ onChange }
            />
        </div>
        <div className="basket__delivery__block">
            <div className="basket__delivery__name">Комментарий</div>
            <TextAreaField
              name="comment"
              onChange={ onChange || '' }
              value={ data.comment }
              placeholder="Есть уточнения?"
            />
        </div>
    </>
)

export default BasketDelivery
