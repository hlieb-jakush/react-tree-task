import React from 'react'
import './Button.css'

interface ButtonProps {
    className?: string,
    id?: string,
    children?: React.ReactNode,
    onClick: () => void
}

const Button = ({ className, id, children, onClick }: ButtonProps) => {
    return (
        <button className={`button ${className ? className : ''}`} onClick={onClick} id={id}>{children}</button>
    )
}

export default Button