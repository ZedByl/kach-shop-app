import React, { FC } from 'react'
import './checkBoxField.scss'

interface CheckBoxFieldProps {
    name: string,
    value: boolean,
    onChange: any,
    children?: any,
    error: string
}

const CheckBoxField: FC<CheckBoxFieldProps> = ({
                                                   name, value, onChange, children, error,
                                               }) => {
    const handleChange = () => {
        onChange({ name, value: !value })
    }
    return (
        <div className="check__box-field">
            <input
              className={ error ? 'check__box-field__input-invalid' : 'check__box-field__input' }
              type="checkbox"
              value=""
              id={ name }
              onChange={ handleChange }
              checked={ value }
            />
            <label
              className="check__box-field__title "
              htmlFor={ name }
            >
                { children }
            </label>
            { error && <div className="invalid">{ error }</div> }
        </div>
    )
}

export default CheckBoxField
