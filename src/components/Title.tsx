import React from 'react'
import { twMerge } from 'tailwind-merge'

interface TitleProps extends React.HTMLAttributes<HTMLHeadingElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export const Title: React.FC<TitleProps> = ({ as: Tag = 'h1', ...props }) => {
  return (
    <Tag
      {...props}
      className={twMerge(
        `font-caveat font-semibold mb-2 text-center`,
        props?.className
      )}>
      {props.children}
    </Tag>
  )
}
