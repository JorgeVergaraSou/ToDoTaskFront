import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '../components/Button'
import { Title } from '../components/Title'
import { UserContext } from '../components/UserProvider'
import { routes } from '../constants'
import { User } from '../interfaces/user.interface'
import { LoginResponseType, ProfileResponseType } from '../types/MascotasTypes'

export const Login: React.FC = () => {
  const navigate = useNavigate()
  const { user, handleLogin, handleLogout } = useContext(UserContext)!
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [users, setUsers] = useState([])
  const [error, setError] = useState('')
  const [errors, setErrors] = useState<string[]>([])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors([])
    // const user = users.find(u => u.name === username && u.password === password)

    const promiseLogin = await fetch(
      `http://localhost:3006/api/v1/auth/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: email,
          password
        })
      }
    )
    if (promiseLogin.status === 200) {
      const responseLogin: LoginResponseType = await promiseLogin.json()
      console.log(responseLogin)
      localStorage.setItem('token', responseLogin.token)

      const promiseProfile = await fetch(
        `http://localhost:3006/api/v1/auth/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + responseLogin.token
          }
        }
      )

      const responseProfile: ProfileResponseType = await promiseProfile.json()
      console.log(responseProfile)

      if (promiseProfile.status === 200) {
        const loggedUser: User = {
          email: responseProfile.email,
          role: responseProfile.role,
          idUser: responseProfile.idUser,
          iat: Boolean(responseProfile.isActive),
          name: responseProfile.name,
          exp: 0
        }
        handleLogin(loggedUser) // Pass the user object
        setError('¡Inicio de sesión exitoso!')
        navigate(routes.profile.url)
      }
    } else {
      setError('Nombre de usuario o contraseña incorrectos')
    }
  }

  useEffect(() => {
    user ? navigate(routes.profile.url) : ''
  }, [user, navigate])

  return (
    <>
      <div>
        <div className='flex justify-between text-center mb-6'>
          <Title as='h2'>Iniciar sesión</Title>
        </div>
        <div id='login' className='flex justify-center'>
          <form onSubmit={handleSubmit} className='font-sans space-y-4 w-80'>
            <div className='mb-3'>
              <label
                htmlFor='email'
                className='block text-gray-700 text-md font-bold mb-2'>
                Correo electrónico
              </label>
              <input
                name='email'
                id='email'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='text'
                placeholder='email@email.com'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label
                htmlFor='password'
                className='block text-gray-700 text-md font-bold mb-2'>
                Contraseña
              </label>
              <input
                name='password'
                id='password'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                type='password'
                placeholder='******'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p>{error}</p>}
            <div className='flex flex-col'>
              <Button type='submit' className='w-full'>
                Iniciar sesión
              </Button>
              <Button
                type='button'
                className='w-full'
                onClick={() => {
                  console.log('click')
                  console.log(routes.registration.url)
                  navigate(routes.registration.url)
                }}>
                Crear cuenta
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}
