import React, { FC } from 'react'
import './textAriaField.scss'

interface TextAria {
    label?: string,
    name: string,
    value: string,
    onChange: any,
    placeholder?: string
}

const TextAreaField: FC<TextAria> = ({
                                         label, name, value, onChange, placeholder,
                                     }) => {
    // @ts-ignore
    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value })
    }

    return (
        <div className="text-aria">
            { label && <label
              className="text-aria__label"
              htmlFor={ name }
                       > { label }</label> }
            <div>
                <textarea
                  id={ name }
                  name={ name }
                  value={ value }
                  onChange={ handleChange }
                  placeholder={ placeholder }
                  className="text-aria__input"
                />
            </div>
        </div>
    )
}

export default TextAreaField
