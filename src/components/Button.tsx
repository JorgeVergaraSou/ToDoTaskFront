import React from 'react'
import { twMerge } from 'tailwind-merge'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

export const Button: React.FC<ButtonProps> = ({ ...props }) => {
  return (
    <button
      {...props}
      className={twMerge(
        `mt-3 font-sans self-center text-center border-tertiary-grade2 border-2 text-tertiary-grade2 hover:bg-tertiary-grade2 hover:text-secondary-grade3 font-semibold rounded-3xl p-2 transition-all duration-500 ease-in-out`,
        props?.className
      )}
      onClick={props.onClick}>
      {props.children}
    </button>
  )
}
