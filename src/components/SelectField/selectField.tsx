import React, { FC } from 'react'
import './selectionField.scss'

interface SelectFieldProps {
    label: string,
    value: string,
    onChange: any,
    error: string,
    options: Array<Option>,
    name: string,
    defaultOption: string
}

interface Option {
    value: string,
    label: string
}

const SelectField: FC<SelectFieldProps> = ({
                                               label,
                                               value,
                                               onChange,
                                               defaultOption,
                                               options,
                                               error,
                                               name,
                                           }) => {
    const handleChange = ({ target }: any) => {
        onChange({ name: target.name, value: target.value })
    }
    const getInputClasses = () => `form-select${error ? ' invalid' : ''}`

    return (
        <div className="selection__field">
            <label
              htmlFor="validationCustom04"
              className="selection__field__title"
            >
                { label }
            </label>
            <select
              className={ getInputClasses() }
              id="validationCustom04"
              name={ name }
              value={ value }
              onChange={ handleChange }
            >
                <option
                  disabled
                  value=""
                >
                    { defaultOption }
                </option>
                { options
                    && options.map((option) => (
                        <option
                          value={ option.value }
                          key={ option.value }
                        >
                            { option.label }
                        </option>
                    )) }
            </select>
            { error && <div className="invalid">{ error }</div> }
        </div>
    )
}

export default SelectField
