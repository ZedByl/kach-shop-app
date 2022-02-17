import React, { FC } from 'react'
import './loader.scss'

interface PropsLoader {
    absolute?: boolean
}

const Loader: FC<PropsLoader> = ({ absolute }) => (
    <div className={ `lds-roller ${absolute ? 'lds-roller-absolute' : ''}` }>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
    </div>
)

export default Loader
