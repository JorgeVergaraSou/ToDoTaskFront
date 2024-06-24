import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
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
        <div id='login'>
          <h2 className='text-center'>Iniciar sesión</h2>
          <form onSubmit={handleSubmit}>
            <div className='mb-3'>
              <label htmlFor='email' className='form-label'>
                Email
              </label>
              <input
                name='email'
                id='email'
                className='form-control'
                type='text'
                placeholder='Email'
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className='mb-3'>
              <label htmlFor='password' className='form-label'>
                Contraseña
              </label>
              <input
                name='password'
                id='password'
                className='form-control'
                type='password'
                placeholder='Contraseña'
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {error && <p>{error}</p>}
            <button type='submit' className='btn btn-primary'>
              Iniciar sesión
            </button>
            <button
              className='btn btn-primary mx-1'
              type='button'
              onClick={() => {
                navigate(routes.registration.url)
              }}>
              Crear cuenta
            </button>
          </form>
        </div>
        {/* <div id='register'>
          <h5 className='text-center'>¿Aun no estas registrado?</h5>
          <button
            className='btn btn-primary mx-1'
            type='button'
            onClick={() => {
              navigate(routes.registration.url)
            }}
          >
            Crear cuenta
          </button>
        </div> */}
      </div>
    </>
  )
}
