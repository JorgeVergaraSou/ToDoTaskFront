import React, { useState } from 'react'
import { Title } from '../components/Title'
import { Button } from '../components/Button'

interface ContactForm {
  name: string
  email: string
  message: string
}

export const Contacto: React.FC = () => {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    message: ''
  })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    // Aquí puedes enviar el formData a tu API o realizar otras operaciones
    console.log(formData)
  }

  return (
    <>
      <div className='flex justify-between text-center mb-6'>
        <Title as='h2'>Contacto</Title>
      </div>
      <div className='flex justify-center'>
        <form onSubmit={handleSubmit} className='font-sans space-y-4 w-80'>
          <div className='mb-3'>
            <label
              htmlFor='name'
              className='block text-gray-700 text-md font-bold mb-2'>
              Nombre
            </label>
            <input
              type='text'
              id='name'
              name='name'
              value={formData.name}
              onChange={handleChange}
              required
              placeholder='John Doe'
              className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='email'
              className='block text-gray-700 text-md font-bold mb-2'>
              Correo electrónico
            </label>
            <input
              type='email'
              id='email'
              name='email'
              value={formData.email}
              onChange={handleChange}
              required
              placeholder='email@email.com'
              className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='mb-3'>
            <label
              htmlFor='message'
              className='block text-gray-700 text-md font-bold mb-2'>
              Mensaje
            </label>
            <textarea
              id='message'
              name='message'
              value={formData.message}
              onChange={handleChange}
              required
              placeholder='Lorem ipsum...'
              className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            />
          </div>
          <div className='flex flex-col'>
            <Button type='submit' className='w-full'>
              Enviar
            </Button>
          </div>
        </form>
      </div>
    </>
  )
}
