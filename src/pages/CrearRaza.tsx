import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { routes } from '../constants'
import { BreedType, PostResponseType, UserType } from '../types/MascotasTypes'
import { Title } from '../components/Title'
import { Button } from '../components/Button'

export const CrearRaza: React.FC = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState<string[]>([])
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<string | null>(null);
  const [pet, setPets] = useState<string>('')
  const [breedName, setBreedName] = useState<string>('')
  const [breeds, setBreeds] = useState<BreedType[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const token = localStorage.getItem('token')
  const user: UserType = JSON.parse(localStorage.getItem('user')!)

  const handleSubmitBreed = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setErrors([])
    console.log(breedName)

    try {
      const responseNewBreed = await fetch(
        `http://localhost:3006/api/v1/breeds`,
        // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            nameBreed: breedName
          })
        }
      )

      const responseBreedAPI: PostResponseType = await responseNewBreed.json()

      // if (!responsePostAPI.ok) {
      //   // Verificar si responsePetAPI.message es un string
      //   console.log(responsePostAPI)
      //   console.log(responsePostAPI.message)
      //   if (typeof responsePostAPI.message === 'string') {
      //     setMessage(responsePostAPI.message.split(','))
      //   } else if (Array.isArray(responsePostAPI.message)) {
      //     // Si responsePetAPI.message es un array, asumimos que ya contiene mensajes separados
      //     setMessage(responsePostAPI.message)
      //   } else {
      //     // Si responsePetAPI.message es un objeto, tratamos de obtener sus valores
      //     setMessage(Object.values(responsePostAPI.message))
      //   }
      //   return
      // }
      console.log(responseBreedAPI)
      navigate(routes.pets.url)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const responsePost = await fetch(
          `http://localhost:3006/api/v1/breeds`,
          {
            // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
          }
        )
        if (!responsePost.ok) {
          throw new Error('Error al obtener los datos')
        }
        const dataPost: BreedType[] = await responsePost.json()
        setBreeds(dataPost)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchBreeds()
  }, [])

  useEffect(() => {
    console.log(user.role)
  }, [user])

  return (
    <>
      <div className='flex justify-between text-center mb-6'>
        <Title as='h2'>Agregar raza</Title>
      </div>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmitBreed} className='font-sans space-y-4 w-80'>
          <div className='mb-3'>
            <label
              htmlFor='breed-title'
              className='block text-gray-700 text-md font-bold mb-2'>
              Nombre
            </label>
            <input
              type='text'
              placeholder='Nombre de la raza'
              name='breed-title'
              className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={breedName}
              onChange={(event) => setBreedName(event.target.value)}
            />
          </div>
          <div className='flex flex-col'>
            <Button type='submit' className='w-full'>
              Enviar
            </Button>
          </div>
        </form>
        {message.length > 0 && (
          <div className='alert alert-danger mt-2'>
            <ul className='mb-0'>
              {message.map((msg) => (
                <li key={msg}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {errors.length > 0 && (
          <div className='alert alert-danger mt-2'>
            <ul className='mb-0'>
              {errors.map((error) => (
                <li key={error}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  )
}
