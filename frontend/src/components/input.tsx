import React from 'react'

type inputProps = {
    type: "text" | "email" | "password";
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    children?: React.ReactNode;
}

const Input = ({ children, type, placeholder, value, onChange }: inputProps) => {
  return (
    <input 
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input">
            {children}
    </input>
  )
}

export default Input