import React, { useEffect, useState } from 'react'
import { Especies, TypePost } from '../constants'
import { BreedType, PostResponseType } from '../types/MascotasTypes'

export const CrearMascota: React.FC = () => {
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
      {cargaPublicacion && (
        <form onSubmit={handleSubmitPublicacion}>
          <div>
            <h1>Datos de Publicacion</h1>
          </div>

          <div className='mb-3'>
            <label htmlFor='post-type'>Tipo de publicacion</label>
            <select
              className='form-select'
              onChange={(event) => setSelectedTypePost(event.target.value)}
              name='post-type'>
              <option value={0} defaultChecked>
                SELECCIONE OPCIÓN
              </option>
              {TypePost.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='post-title'>Titulo</label>
            <input
              type='text'
              placeholder='Nombre'
              name='post-title'
              className='form-control'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='post-content'>Contenido</label>
            <textarea
              placeholder='Contenido...'
              name='post-content'
              className='form-control'
              value={content}
              onChange={(event) => setContent(event.target.value)}
            />
          </div>

          <button type='submit' className='btn btn-primary'>
            Enviar
          </button>
        </form>
      )}
      {!cargaPublicacion && (
        <form onSubmit={handleSubmitMascota}>
          <div>
            <h1>Datos de mascota</h1>
          </div>
          <div className='mb-3'>
            <label htmlFor='pet-name'>Nombre</label>
            <input
              type='text'
              placeholder='Nombre'
              name='pet-name'
              className='form-control'
              value={namePet}
              onChange={(event) => setnamePet(event.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='pet-specie'>Especie</label>
            <select
              className='form-select'
              onChange={(event) => setPets(event.target.value)}
              name='pet-specie'>
              <option value={0} defaultChecked>
                SELECCIONE OPCIÓN
              </option>
              {Especies.map((especie) => (
                <option key={especie} value={especie}>
                  {especie}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='pet-type'>Raza</label>
            <select
              className='form-select'
              onChange={(event) => setBreed(event.target.value)}
              name='pet-type'>
              <option value={0} defaultChecked>
                SELECCIONE OPCIÓN
              </option>
              {breeds.map((breed) => (
                <option key={breed.nameBreed} value={breed.nameBreed}>
                  {breed.nameBreed}
                </option>
              ))}
            </select>
          </div>

          <div className='mb-3'>
            <label htmlFor='pet-type'>Edad</label>
            <input
              type='number'
              placeholder='5'
              name='pet-age'
              className='form-control'
              value={age}
              onChange={(event) => setAge(event.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='pet-description'>Descripcion</label>
            <textarea
              placeholder='Descripcion...'
              name='pet-description'
              className='form-control'
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            />
          </div>

          <div className='mb-3'>
            <label htmlFor='formFile'>Default file input example</label>
            <input className='form-control' type='file' id='formFile' />
          </div>

          <button type='submit' className='btn btn-primary'>
            Enviar
          </button>
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
    </>
  )
}
