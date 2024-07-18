import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';
import { routes } from '../constants';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import { Post } from '../interfaces/post.interface';

export const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    console.log('Context:', context);
    if (!context?.user) {
      navigate(routes.login.url);
    }
  }, [context, navigate]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responsePost = await fetch(`http://localhost:3006/api/v1/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          }
        });
        if (!responsePost.ok) {
          throw new Error('Error al obtener los datos');
        }
        const dataPost = await responsePost.json();
        setPosts(dataPost);
        console.log(dataPost);
        
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An unknown error occurred');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);


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
            </button></>
          )}
        <div className='flex flex-col justify-center '>
          <div className='font-sans space-y-4 w-80 m-auto'>

            <Button
              type='button'
              onClick={() => {
                handleLogout();
                navigate(routes.login.url);
              }}>
              Cerrar sesión
            </Button>
          </div>
        </div>
        <div className='grid gap-x-2 gap-y-4 grid-cols-3'>
      {posts && posts.map((post) => (
  <div className='border-cuaternary-grade2 border-2 p-3 rounded-lg flex flex-col justify-between h-full' key={post.idPost} id={`post-${post.idPost}`}>
    {post.pets[0] && post.pets[0].image && (
      <img
        src={`http://localhost:3006/uploads/${post.pets[0].image}`} // Asegúrate de que la URL sea correcta
        width={150}
        height={150}
        alt='Imagen de la mascota'
        className='mb-4'
      />
    )}
    <div className='flex flex-col justify-between flex-grow'>
      <div className='mt-auto'>
        <div>
          <h5 className='card-title font-bold mb-1'>{post.title}</h5>
          <p className='card-text mb-4'>{post.content}</p>
        </div>
        <div className='flex justify-center'>
        <button
                    className='text-center border-tertiary-grade2 border-2 text-tertiary-grade2 hover:bg-tertiary-grade2 hover:text-secondary-grade3 font-semibold rounded-3xl p-2 transition-all duration-500 ease-in-out'
                    type='button'
                    onClick={() => {
                      navigate(routes.verPublicacion.url(post.idPost));
                    }}>
                    Ver publicación
                  </button>
        </div>
      </div>
    </div>
  </div>
))}

      </div>
      </div>
    </>
  );
};
