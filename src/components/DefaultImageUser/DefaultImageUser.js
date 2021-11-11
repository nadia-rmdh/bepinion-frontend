import React from 'react'
import { color } from "./HexProfileColor"

export const DefaultImageUser = ({ text, role, size, className }) => {
    const splitName = text?.split(' ') ?? [];
    const first = splitName.length > 0 ? splitName[0].split('')[0] : '';
    const second = splitName.length > 1 ? splitName[1].split('')[0] : '';
    const initialRole = role?.split('')[0];
    const background = color[initialRole.toLowerCase()];
    console.log(text)
    return (
        <div className={`d-flex justify-content-center align-items-center px-0 text-light ${className}`}>
            <div className={`mx-auto round-100 border-0 text-center d-flex justify-content-center align-items-center`} style={{ backgroundColor: background, width: size, height: size }}>
                <strong className="text-uppercase">{first}{second}</strong>
            </div>
        </div>
    )
}