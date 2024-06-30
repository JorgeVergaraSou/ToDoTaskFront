import React from 'react'
import { Link, LinkProps } from 'react-router-dom'
import { twMerge } from 'tailwind-merge'

interface NavButtonProps extends LinkProps {
  text?: string
}

export const NavButton: React.FC<NavButtonProps> = ({ text, ...props }) => {
  return (
    <Link
      {...props}
      className={twMerge('nav-button font-sans no-underline', props.className)}>
      {text}
      {props.children}
    </Link>
  )
}
