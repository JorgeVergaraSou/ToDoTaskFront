import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { UserContext } from '../components/UserProvider'
import { routes } from '../constants'

export const Perfil: React.FC = () => {
  const navigate = useNavigate()
  const { user, handleLogout } = useContext(UserContext)!

  useEffect(() => {
    !user ? navigate(routes.login.url) : ''
  }, [user, navigate])
  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mb-4'>Bienvenido {user?.email}</h1>
        <p>
          <span>Rol: </span>
          {user?.role}
        </p>
        <p>
          <span>Usuario: </span>
          {user?.name}
        </p>
        <button
          className={`btn btn-primary mx-1${user?.role === 'admin' ? '' : ' hidden'}`}
          type='button'
          onClick={() => {
            navigate(routes.nuevaraza.url)
          }}>
          Crear nueva raza
        </button>
        <button
          className='btn btn-primary mx-1'
          type='button'
          onClick={() => {
            handleLogout()
            navigate(routes.login.url)
          }}>
          Cerrar sesión
        </button>
      </div>
    </>
  )
}
