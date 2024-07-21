import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Title } from '../components/Title';
import { Button } from '../components/Button';

export const Registro: React.FC = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const [name, setName] = useState<string>('test');
  const [email, setEmail] = useState<string>('test@test.com');
  const [password, setPassword] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
    setMessage([]);

    const responseRegister = await fetch(`http://localhost:3006/api/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name,
        email,
        password
      })
    });

    const responseAPI = await responseRegister.json();

    if (!responseRegister.ok) {
      if (typeof responseAPI.message === 'string') {
        setMessage([responseAPI.message]);
      } else if (Array.isArray(responseAPI.message)) {
        setMessage(responseAPI.message);
      } else if (responseAPI.message && typeof responseAPI.message === 'object') {
        setMessage(Object.values(responseAPI.message));
      }
    } else {
      // Registro exitoso
      setMessage(['Registro exitoso. Serás redirigido al inicio de sesión.']);
      setTimeout(() => {
        navigate('/login'); // Redirigir a la página de inicio de sesión después de 2 segundos
      }, 2000);
    }
  };

  return (
    <>
      <div className="container mx-auto px-4">
        <div className='flex justify-center text-center mb-6'>
          <Title as='h2' className="text-blue-600">Crear cuenta</Title>
        </div>
        <div className='flex justify-center'>
          <form onSubmit={handleSubmit} className='font-sans space-y-4 w-full max-w-lg'>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
              <div className='mb-3'>
                <label htmlFor='name' className='block text-blue-600 text-md font-bold mb-2'>
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
              <div className='mb-3'>
                <label htmlFor='email' className='block text-blue-600 text-md font-bold mb-2'>
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
              <div className='mb-3'>
                <label htmlFor='password' className='block text-blue-600 text-md font-bold mb-2'>
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
            </div>
            <div className='flex flex-col'>
              <Button type='submit' className='w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded'>
                Crear
              </Button>
            </div>
          </form>
        </div>

        {message.length > 0 && (
          <div className='alert alert-danger mt-2'>
            <ul className='mb-0'>
              {message.map((msg, index) => (
                <li key={index}>{msg}</li>
              ))}
            </ul>
          </div>
        )}

        {errors.length > 0 && (
          <div className='alert alert-danger mt-2'>
            <ul className='mb-0'>
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>

  );
};
