import React, { FC } from 'react'
import './textField.scss'

interface TextFieldProps {
    label: string,
    name: string,
    value: string | number,
    onChange: any,
    error?: string,
    type?: string,
    maxlength?: string,
    placeholder?: string
}

const TextField: FC<TextFieldProps> = ({
                                           label,
                                           name,
                                           value,
                                           onChange,
                                           error,
                                           type,
                                           maxlength,
                                           placeholder,
                                       }) => {
    // @ts-ignore
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className="text-field">
            <label
              className="text-field__title"
              htmlFor={ name }
            > { label }</label>
            <div>
                <input
                  type={ type || 'text' }
                  id={ name }
                  name={ name }
                  value={ value }
                  onChange={ handleChange }
                  className={ error ? 'text-field__input-invalid' : 'text-field__input' }
                    // @ts-ignore
                  maxLength={ maxlength || '' }
                  placeholder={ placeholder || '' }
                />
            </div>
            { error && <div className="invalid">{ error }</div> }
        </div>
    )
}

export default TextField
