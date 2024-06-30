import React, { useState } from 'react'
import { Title } from '../components/Title'
import { Button } from '../components/Button'

export const Registro: React.FC = () => {
  // const { status } = useSession();
  const [errors, setErrors] = useState<string[]>([])
  const [message, setMessage] = useState<string[]>([])
  const [name, setName] = useState<string>('test')
  const [email, setEmail] = useState<string>('test@test.com')
  const [password, setPassword] = useState<string>('123123')
  // const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setErrors([])

    const responseRegister = await fetch(
      `http://localhost:3006/api/v1/auth/register`,
      // `${process.env.REACT_APP_BACKEND_URL}/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          password
        })
      }
    )

    const responseAPI = await responseRegister.json()

    if (!responseRegister.ok) {
      // Verificar si responseAPI.message es un string
      console.log(responseAPI.message)
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
    }
    /*
     const responseNextAuth = await signIn("credentials", {
       email,
       password,
       redirect: false,
     });
 
     if (responseNextAuth?.error) {
       setErrors(responseNextAuth.error.split(","));
       return;
     }
 
     if (status === "loading") {
       return <div className="loader-container"><div className="loader"></div> <div className="loader2"></div></div>;
     }
 
     router.push("/dashboard");
     */
  }

  return (
    <>
      <div>
        <div className='flex justify-between text-center mb-6'>
          <Title as='h2'>Crear cuenta</Title>
        </div>
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit} className='font-sans space-y-4 w-80'>
            <div>
              <label
                htmlFor='name'
                className='block text-gray-700 text-md font-bold mb-2'>
                Nombre
              </label>
              <input
                type='text'
                placeholder='John Doe'
                name='name'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='email'
                className='block text-gray-700 text-md font-bold mb-2'>
                Correo electrónico
              </label>
              <input
                type='email'
                placeholder='email@email.com'
                name='email'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div>
              <label
                htmlFor='password'
                className='block text-gray-700 text-md font-bold mb-2'>
                Contraseña
              </label>
              <input
                type='password'
                placeholder='******'
                name='password'
                className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
            <div className='flex flex-col'>
              <Button type='submit' className='w-full'>
                Crear
              </Button>
            </div>
          </form>
        </div>

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
