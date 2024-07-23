import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Title } from '../components/Title';
import { UserContext } from '../components/UserProvider';
import { routes } from '../constants';
import { User } from '../interfaces/user.interface';
import { LoginResponseType, ProfileResponseType } from '../types/MascotasTypes';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const { user, handleLogin, handleLogout } = useContext(UserContext)!;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');

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
    );

    if (promiseLogin.status === 200) {
      const responseLogin: LoginResponseType = await promiseLogin.json();
     
      localStorage.setItem('token', responseLogin.token);

      const promiseProfile = await fetch(
        `http://localhost:3006/api/v1/auth/profile`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + responseLogin.token
          }
        }
      );

      if (promiseProfile.status === 200) {
        const responseProfile: ProfileResponseType = await promiseProfile.json();
 
        const loggedUser: User = {
          email: responseProfile.email,
          role: responseProfile.role,
          idUser: responseProfile.idUser,
          iat: Boolean(responseProfile.isActive),
          name: responseProfile.name,
          exp: 0
        };

        handleLogin(loggedUser, responseLogin.token); // Pasar el usuario y el token
        
        setError('¡Inicio de sesión exitoso!');
        navigate(routes.profile.url);
      } else {
        setError('Error al obtener el perfil');
      }
    } else {
      setError('Nombre de usuario o contraseña incorrectos');
    }
  };

  useEffect(() => {
    if (user) {
      navigate(routes.profile.url);
    }
  }, [user, navigate]);

  return (
    <>
    <div className="container mx-auto px-4">
      <div className='flex justify-center text-center mb-6'>
        <Title as='h2' className="text-blue-600">Iniciar sesión</Title>
      </div>
      <div className='flex justify-center mb-6'>
        {error && <p className="text-red-500">{error}</p>}
      </div>
      <div id='login' className='flex justify-center'>
        <form onSubmit={handleSubmit} className='font-sans space-y-4 w-full max-w-lg'>
          <div className='grid grid-cols-1 md:grid-cols-1 gap-4 justify-center'>

            <div className='m-auto'>
            <label
                htmlFor='email'
                className='block text-blue-600 text-md font-bold mb-2'>
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
              <label
                htmlFor='password'
                className='block text-blue-600 text-md font-bold mb-2'>
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
                            <Button type='submit' className='w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
                Iniciar sesión
              </Button>
              <Button
                type='button'
                className='w-full bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded mt-2'
                onClick={() => {
                  console.log('click');
                  console.log(routes.registration.url);
                  navigate(routes.registration.url);
                }}>
                Crear cuenta
              </Button>
            </div>

          </div>
        </form>
      </div>
    </div>
  </>
  
  );
};
