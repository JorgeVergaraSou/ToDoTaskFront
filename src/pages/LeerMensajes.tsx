import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';
import { routes } from '../constants';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { Contact } from '../interfaces/contact.interface';
import { fetchContacts } from '../components/Contact';

export const LeerMensajes: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!context?.user) {
      navigate(routes.login.url);
    } else {
      if (context.token) {
        fetchMessages(context.token); // Llamar a fetchMessages solo si hay un token válido
      } else {
        setError('Token no válido');
        setLoading(false);
      }
    }
  }, [context, navigate]);

  const fetchMessages = async (token: string) => {
    try {
      setLoading(true);
      console.log('Fetching messages...');
      const data = await fetchContacts(token);
      console.log('Received data:', data);
      setContacts(data);
    } catch (error) {
      setError('Error al obtener los mensajes');
      console.error('Fetch error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (!context) {
    return <div>Loading...</div>;
  }

  const { user, handleLogout } = context;

  return (
    <>
      <div>
        <div className='flex justify-between text-center mb-6'>
          <Title as='h3'>Bienvenido {user?.role}: {user?.name}</Title>
        </div>

        <div className='flex flex-col justify-center'>
          <div className='font-sans space-y-4 w-80 m-auto'>
            {loading ? (
              <p>Cargando mensajes...</p>
            ) : error ? (
              <p>Error: {error}</p>
            ) : (
              <div>
                {contacts.map(contact => (
                  <div key={contact.idContact} className='border p-2 mb-2'>
                    <p><strong>Nombre:</strong> {contact.name}</p>
                    <p><strong>Email:</strong> {contact.email}</p>
                    <p><strong>Mensaje:</strong> {contact.messageSend}</p>
                    
                  </div>
                ))}
              </div>
            )}
            <Button
              type='button'
              onClick={() => {
                handleLogout();
                navigate(routes.login.url);
              }}
            >
              Cerrar sesión
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};
