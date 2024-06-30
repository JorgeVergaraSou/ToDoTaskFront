import React, { useEffect, useState } from 'react'
import { Especies, TypePost, routes } from '../constants'
import { BreedType, PostResponseType } from '../types/MascotasTypes'
import { Title } from '../components/Title'
import { Button } from '../components/Button'
import { useNavigate } from 'react-router-dom'

export const CrearMascota: React.FC = () => {
  const navigate = useNavigate()
  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState<string[]>([])
  //const [loading, setLoading] = useState(true);
  //const [error, setError] = useState<string | null>(null);
  const [selectedTypePost, setSelectedTypePost] = useState('')
  const [title, setTitle] = useState<string>('')
  const [content, setContent] = useState<string>('')
  const [idPost, setIdPost] = useState<number>(0)
  const [namePet, setnamePet] = useState<string>('')
  const [age, setAge] = useState<string>('')
  const [pet, setPets] = useState<string>('')
  const [breed, setBreed] = useState<string>('')
  const [breeds, setBreeds] = useState<BreedType[]>([])
  const [description, setDescription] = useState<string>('')
  const [image, setImage] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cargaPublicacion, setCargaPublicacion] = useState<boolean>(true)
  const token = localStorage.getItem('token')

  const handleSubmitPublicacion = async (event: {
    preventDefault: () => void
  }) => {
    event.preventDefault()
    setErrors([])
    console.log(selectedTypePost)

    try {
      const responseNewPost = await fetch(
        `http://localhost:3006/api/v1/posts/newPost`,
        // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          },
          body: JSON.stringify({
            selectedTypePost,
            title,
            content
          })
        }
      )

      const responsePostAPI: PostResponseType = await responseNewPost.json()

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
      console.log(responsePostAPI)
      setIdPost(responsePostAPI.idPost)
      setCargaPublicacion(false)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error)
    }
  }

  const handleSubmitMascota = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setErrors([])
    console.log(breed)
    const responseNewPet = await fetch(
      `http://localhost:3006/api/v1/pets/newPet`,
      // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + token
        },
        body: JSON.stringify({
          namePet,
          age,
          breed,
          pet,
          description,
          image,
          idPost
        })
      }
    )

    const responsePetAPI = await responseNewPet.json()

    if (!responseNewPet.ok) {
      // Verificar si responsePetAPI.message es un string
      console.log(responsePetAPI.message)
      if (typeof responsePetAPI.message === 'string') {
        setMessage(responsePetAPI.message.split(','))
      } else if (Array.isArray(responsePetAPI.message)) {
        // Si responsePetAPI.message es un array, asumimos que ya contiene mensajes separados
        setMessage(responsePetAPI.message)
      } else {
        // Si responsePetAPI.message es un objeto, tratamos de obtener sus valores
        setMessage(Object.values(responsePetAPI.message))
      }
      return
    } else {
      const dataCreatedPet = responsePetAPI.data
      console.log(dataCreatedPet)
      navigate(routes.pets.url)
      // levantar modal
      // en modal cambiar estado de variable
    }

    if (status === 'loading') {
      return (
        <div className='loader-container'>
          <div className='loader'></div> <div className='loader2'></div>
        </div>
      )
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

  return (
    <>
      <div className='flex justify-between text-center mb-6'>
        <Title as='h2'>{`${
          cargaPublicacion ? 'Datos de Publicacion' : 'Datos de mascota'
        }`}</Title>
      </div>
      <div className='flex justify-center'>
        {cargaPublicacion && (
          <form
            onSubmit={handleSubmitPublicacion}
            className='font-sans space-y-4 w-80'>
            <div className='mb-3'>
              <label
                htmlFor='post-type'
                className='block text-gray-700 text-md font-bold mb-2'>
                Tipo de publicacion
              </label>
              <select
                className='form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                onChange={(event) => setSelectedTypePost(event.target.value)}
                name='post-type'>
                <option value={0} defaultChecked>
                  Seleccione...
                </option>
                {TypePost.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label
                htmlFor='post-title'
                className='block text-gray-700 text-md font-bold mb-2'>
                Titulo
              </label>
              <input
                type='text'
                placeholder='Lorem ipsum...'
                name='post-title'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='post-content'
                className='block text-gray-700 text-md font-bold mb-2'>
                Contenido
              </label>
              <textarea
                placeholder='Lorem ipsum...'
                name='post-content'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={content}
                onChange={(event) => setContent(event.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <Button type='submit' className='w-full'>
                Enviar
              </Button>
            </div>
          </form>
        )}
        {!cargaPublicacion && (
          <form
            onSubmit={handleSubmitMascota}
            className='font-sans space-y-4 w-80'>
            <div className='mb-3'>
              <label
                htmlFor='pet-name'
                className='block text-gray-700 text-md font-bold mb-2'>
                Nombre
              </label>
              <input
                type='text'
                placeholder='Nombre'
                name='pet-name'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={namePet}
                onChange={(event) => setnamePet(event.target.value)}
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='pet-specie'
                className='block text-gray-700 text-md font-bold mb-2'>
                Especie
              </label>
              <select
                className='form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                onChange={(event) => setPets(event.target.value)}
                name='pet-specie'>
                <option value={0} defaultChecked>
                  Seleccione...
                </option>
                {Especies.map((especie) => (
                  <option key={especie} value={especie}>
                    {especie}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label
                htmlFor='pet-type'
                className='block text-gray-700 text-md font-bold mb-2'>
                Raza
              </label>
              <select
                className='form-select shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                onChange={(event) => setBreed(event.target.value)}
                name='pet-type'>
                <option value={0} defaultChecked>
                  Seleccione...
                </option>
                {breeds.map((breed) => (
                  <option key={breed.nameBreed} value={breed.nameBreed}>
                    {breed.nameBreed}
                  </option>
                ))}
              </select>
            </div>

            <div className='mb-3'>
              <label
                htmlFor='pet-age'
                className='block text-gray-700 text-md font-bold mb-2'>
                Edad
              </label>
              <input
                type='number'
                placeholder='5'
                name='pet-age'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={age}
                onChange={(event) => setAge(event.target.value)}
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='pet-description'
                className='block text-gray-700 text-md font-bold mb-2'>
                Descripcion
              </label>
              <textarea
                placeholder='Lorem ipsum...'
                name='pet-description'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={description}
                onChange={(event) => setDescription(event.target.value)}
              />
            </div>

            <div className='mb-3'>
              <label
                htmlFor='pet-image'
                className='block text-gray-700 text-md font-bold mb-2'>
                Imagen
              </label>
              <input
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                name='pet-image'
                type='file'
                id='formFile'
              />
            </div>
            <div className='flex flex-col'>
              <Button type='submit' className='w-full'>
                Enviar
              </Button>
            </div>
          </form>
        )}
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
