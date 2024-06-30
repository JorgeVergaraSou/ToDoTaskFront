import React from 'react'
import {
  AiOutlineFacebook,
  AiOutlineInstagram,
  AiOutlinePhone,
  AiOutlineWhatsApp
} from 'react-icons/ai'

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className='flex justify-center bg-secondary-grade1'>
      <div className='flex justify-between items-center h-20 px-4 gap-4'>
        <div className='text-primary-grade1 font-semibold font-sans'>
          &copy; {currentYear} All rights reserved
        </div>
        <div className='flex space-x-4'>
          <a
            href='https://www.instagram.com'
            target='_blank'
            rel='noopener noreferrer'>
            <AiOutlineInstagram
              size={24}
              className='text-primary-grade1 font-semibold font-sans'
            />
          </a>
          <a
            href='https://www.facebook.com'
            target='_blank'
            rel='noopener noreferrer'>
            <AiOutlineFacebook
              size={24}
              className='text-primary-grade1 font-semibold font-sans'
            />
          </a>
          <a
            href='https://wa.me/your-number'
            target='_blank'
            rel='noopener noreferrer'>
            <AiOutlineWhatsApp
              size={24}
              className='text-primary-grade1 font-semibold font-sans'
            />
          </a>
          <a href='tel:+1234567890' target='_blank' rel='noopener noreferrer'>
            <AiOutlinePhone
              size={24}
              className='text-primary-grade1 font-semibold font-sans'
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
