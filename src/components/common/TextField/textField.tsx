import React, { FC } from 'react'
import './textField.scss'
import InputMask from 'react-input-mask'

interface TextFieldProps {
    label: string,
    name: string,
    value: string | number,
    onChange: any,
    error?: string,
    type?: string,
    placeholder?: string,
    mask?: string,
    autoComplete?: string
}

const TextField: FC<TextFieldProps> = ({
                                           label,
                                           name,
                                           value,
                                           onChange,
                                           error,
                                           type,
                                           placeholder,
                                           mask,
                                           autoComplete,
                                       }) => {
    const handleChange = ({ target }: any) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className="text-field">
            <label
              className="text-field__title"
              htmlFor={ name }
            > { label }</label>
            <div>
                { mask ? (
                    <InputMask
                      mask={ mask }
                      type={ type || 'text' }
                      id={ name }
                      name={ name }
                      value={ value }
                      onChange={ handleChange }
                      className={ error ? 'text-field__input-invalid' : 'text-field__input' }
                      autoComplete={ autoComplete }
                    />
                ) : (
                    <input
                      type={ type || 'text' }
                      id={ name }
                      name={ name }
                      value={ value }
                      onChange={ handleChange }
                      className={ error ? 'text-field__input-invalid' : 'text-field__input' }
                      placeholder={ placeholder || '' }
                    />) }
            </div>
            { error && <div className="invalid">{ error }</div> }
        </div>
    )
}

export default TextField
