import React, { FC } from 'react'
import './radioField.scss'

interface radioFieldProps {
    label?: string,
    name: string,
    value: string,
    options: Array<Option>,
    onChange: any
}

interface Option {
    name: string,
    value: string
}

const RadioField: FC<radioFieldProps> = ({
                                             options, name, onChange, value, label,
                                         }) => {
    const handleChange = ({ target }: any) => {
        onChange({ name: target.name, value: target.value })
    }
    return (
        <div className="radio-field">
            { label && <label className="radio-field__label">{ label }</label> }
            <div>
                { options.map((option: Option) => (
                    <div
                      key={ `${option.name}_${option.value}` }
                      className="radio-field__form"
                    >
                        <input
                          className="radio-field__form-input"
                          type="radio"
                          name={ name }
                          id={ `${option.name}_${option.value}` }
                          checked={ option.value === value }
                          value={ option.value }
                          onChange={ handleChange }
                        />
                        <label
                          className="radio-field__form-label"
                          htmlFor={ `${option.name}_${option.value}` }
                        >
                            { option.name }
                        </label>
                    </div>
                )) }
            </div>
        </div>
    )
}

export default RadioField
