import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';
import { routes } from '../constants';
import { Title } from '../components/Title';
import { Button } from '../components/Button';


export const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Context:', context);
    if (!context?.user) {
      navigate(routes.login.url);
    }
  }, [context, navigate]);

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, token, handleLogout } = context;

  return (
    <>
      <div>
        <div className='flex justify-between text-center mb-6'>
          <Title as='h3'>Bienvenido {user?.role}: {user?.name} </Title>
        </div>
        {user?.role === 'admin' && ( // Verifica si el usuario tiene el rol de administrador
            <><button
            className='text-center border-tertiary-grade2 border-2 text-tertiary-grade2 hover:bg-tertiary-grade2 hover:text-secondary-grade3 font-semibold rounded-3xl p-2 transition-all duration-500 ease-in-out'
            type='button'
            onClick={() => {
              navigate(routes.nuevaraza.url);
            } }>
            Agregar raza
          </button>   <button
            className='text-center border-tertiary-grade2 border-2 text-tertiary-grade2 hover:bg-tertiary-grade2 hover:text-secondary-grade3 font-semibold rounded-3xl p-2 transition-all duration-500 ease-in-out'
            type='button'
            onClick={() => {
              navigate(routes.leermensaje.url);
            } }>
              Leer Mensajes
            </button>
            </>
          )}
          <button
            className='text-center border-tertiary-grade2 border-2 text-tertiary-grade2 hover:bg-tertiary-grade2 hover:text-secondary-grade3 font-semibold rounded-3xl p-2 transition-all duration-500 ease-in-out'
            type='button'
            onClick={() => {
              navigate(routes.postpropios.url);
            } }>
              Tus Publicaciones
            </button>
            <Button
              type='button'
              onClick={() => {
                handleLogout();
                navigate(routes.login.url);
              }}>
              Cerrar sesión
            </Button>


      </div>
    </>
  );
};
