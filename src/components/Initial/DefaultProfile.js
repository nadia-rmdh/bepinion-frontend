import React from 'react'
import { color } from "./HexProfileColor"

export const DefaultProfile = ({ init, size, className }) => {
    const toString = init + '';
    const initial = toString?.split('')[0];
    const background = color[initial.toLowerCase()];
    return (
        <div className={`d-flex justify-content-center align-items-center px-0 text-light ${className}`}>
            <div className={`mx-auto round-100 border-0 text-center d-flex justify-content-center align-items-center`} style={{ backgroundColor: background, width: size, height: size }}>
                <strong className="text-uppercase">{initial}</strong>
            </div>
        </div>
    )
}