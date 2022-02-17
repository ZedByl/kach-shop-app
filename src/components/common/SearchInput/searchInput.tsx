import React, { ChangeEventHandler, FC, MouseEventHandler } from 'react'
import './searchInput.scss'
import filter from '../../../assets/filter.svg'

interface SearchInputProps {
    onChange: ChangeEventHandler<HTMLInputElement>
    onSubmit?: MouseEventHandler<HTMLDivElement>
    search: string
}

const SearchInput: FC<SearchInputProps> = ({ onChange, search, onSubmit }) => (
    <div className="search">
        <span className="search__preview">Поиск&nbsp;по&nbsp;названию</span>
        <input
          className="search__input"
          type="text"
          onChange={ onChange }
          value={ search }
        />
        { onSubmit && <div
          className="search__filer__button"
          onClick={ onSubmit }
                      >
            <img
              src={ filter }
              alt="filter"
            />
            Фильтры
        </div> }
    </div>
)

export default SearchInput
