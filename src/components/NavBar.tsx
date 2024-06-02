import React, { useContext, useEffect, useState } from 'react'
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai'
import imgUrl from '../assets/logoRounded.png'
import { routes } from '../constants'
import { NavButton, UserContext } from './components'
import { twMerge } from 'tailwind-merge'

export const NavBar: React.FC = () => {
  const { user } = useContext(UserContext)!
  // State to manage the navbar's visibility
  const [nav, setNav] = useState(false)

  // Toggle function to handle the navbar's display
  const handleNav = () => {
    setNav(!nav)
  }

  // Array containing navigation items
  const navItems = [
    { id: 1, text: 'Mascotas', url: routes.pets.url },
    { id: 2, text: 'Nosotros', url: routes.about.url },
    { id: 3, text: 'Contacto', url: routes.contact.url },
    {
      id: 5,
      text: 'Login',
      logedInText: 'Perfil',
      url: routes.login.url,
      logedInUrl: routes.profile.url
    }
  ]

  useEffect(() => {
    console.log(user)
  }, [user])

  return (
    <div className='bg-gray-900 text-white'>
      <div className='flex justify-between items-center h-24 max-w-[1240px] mx-auto px-4'>
        {/* Logo */}
        <div className='text-orange-500'>
          <NavButton to={routes.home.url}>
            {/* <!-- Heroicon - Chip Outline --> */}
            <img
              className='img-fluid mx-auto w-8 h-8'
              src={imgUrl}
              alt='logo'
            />
          </NavButton>
        </div>
        {/* Desktop Navigation */}
        <ul className='hidden md:flex font-bold justify-between mb-0 h-full'>
          {navItems.map(item => (
            <li key={item.id} className='h-full flex items-center'>
              <NavButton
                to={user && item.logedInUrl ? item.logedInUrl : item.url}
                text={user && item.logedInText ? item.logedInText : item.text}
                className='h-full flex items-center px-5 py-6 hover:bg-orange-600 cursor-pointer duration-300 text-orange-600 hover:text-white'
              />
            </li>
          ))}
        </ul>

        {/* Mobile Navigation Icon */}
        <div onClick={handleNav} className='block md:hidden cursor-pointer z-50'>
          {nav ? <AiOutlineClose size={24} /> : <AiOutlineMenu size={24} />}
        </div>

        {/* Mobile Navigation Menu */}
        <ul
          className={
            twMerge('fixed ease-in-out w-[100%] top-0 duration-500 p-0 ', 
              nav
                ? 'md:hidden left-0 h-full border-r border-r-gray-900 bg-gray-900'
                : 'bottom-0 left-[-100%]'
            )
          }
        >
          {/* Mobile Logo */}
          <div className='flex justify-center items-center my-4 w-16 h-16 m-auto'>
            <NavButton to={routes.home.url} onClick={handleNav} className='w-16 h-16'>
              <img
                className='img-fluid mx-auto w-16 h-16'
                src={imgUrl}
                alt='logo'
              />
            </NavButton>
          </div>

          {/* Mobile Navigation Items */}
          {navItems.map(item => (
            <li key={item.id} className='font-bold'>
              <NavButton
                to={user && item.logedInUrl ? item.logedInUrl : item.url}
                onClick={handleNav}
                text={user && item.logedInText ? item.logedInText : item.text}
                className='block p-6 hover:bg-orange-600 cursor-pointer duration-300 text-orange-600 hover:text-white text-center'                
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
