import React, { useState } from 'react'
import { Title } from '../components/Title'
import { Button } from '../components/Button'

export const Contacto: React.FC = () => {
  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState<string[]>([])
  const [name, setName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [messageSend, setMessageSend] = useState<string>('')

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault()
    setErrors([])

    const responseContact = await fetch(
      `http://localhost:3006/api/v1/contact`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          messageSend,

        })
      }
    )

    const responseAPI = await responseContact.json()
    console.log(responseAPI);
    

    if (!responseContact.ok) {
      // Verificar si responseAPI.message es un string
    
      if (typeof responseAPI.message === 'string') {
        setMessage(responseAPI.message.split(','))
      } else if (Array.isArray(responseAPI.message)) {
        // Si responseAPI.message es un array, asumimos que ya contiene mensajes separados
        setMessage(responseAPI.message)
      } else {
        // Si responseAPI.message es un objeto, tratamos de obtener sus valores
        setMessage(Object.values(responseAPI.message))
      }
      return
    }else {
      if (typeof responseAPI.message === 'string') {
        setMessage(responseAPI.message.split(','))
      } else if (Array.isArray(responseAPI.message)) {
        // Si responseAPI.message es un array, asumimos que ya contiene mensajes separados
        setMessage(responseAPI.message)
      } else {
        // Si responseAPI.message es un objeto, tratamos de obtener sus valores
        setMessage(Object.values(responseAPI.message))
      }
      alert(responseAPI.message);
      setName('');
      setEmail('');
      setMessageSend('');
    }

  };

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
             
              name='name'
              value={name}
              onChange={(event) => setName(event.target.value)}
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
              
              name='email'
              value={email}
              onChange={(event) => setEmail(event.target.value)}
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
              
              name='message'
              value={messageSend}
              onChange={(event) => setMessageSend(event.target.value)}
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
