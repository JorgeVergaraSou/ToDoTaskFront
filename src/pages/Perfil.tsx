import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../components/UserProvider';
import { routes } from '../constants';
import { Title } from '../components/Title';
import { Button } from '../components/Button';
import Modal from 'react-modal';
import { NuevaTarea } from './NuevaTarea';
import { Post } from '../interfaces/post.interface';

Modal.setAppElement('#root');

export const Perfil: React.FC = () => {
  const navigate = useNavigate();
  const context = useContext(UserContext);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [posts, setPosts] = useState<Post[] | null>(null);
  useEffect(() => {
    console.log('Context:', context);
    if (!context?.user) {
      navigate(routes.login.url);
    }
  }, [context, navigate]);

  /* llamando tareas */
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responsePost = await fetch(`http://localhost:3008/task/task/allTasks`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
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
  /** fin llamada tareas */

  if (!context) {
    return <div>Loading...</div>;
  }
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setModalIsOpen(true);
  };

  const { user, token, handleLogout } = context;
  const handleModalClose = () => {
    setModalIsOpen(false);
  };
  return (
    <>
      <div>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className='flex justify-between text-center mb-6'>
          <Title as='h3'>Bienvenido {user?.role}: {user?.name} </Title>
        </div>

        <div>
          <button type="submit" className="btn btn-primary bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
            Nueva Tarea
          </button>
        </div>

        <Modal
          isOpen={modalIsOpen}
          onRequestClose={() => setModalIsOpen(false)}
          contentLabel="Nueva Tarea"
          className="fixed inset-0 flex items-center justify-center p-4"
          overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
        >
          <NuevaTarea onCloseModal={handleModalClose} setErrorMsg={function (value: React.SetStateAction<string | null>): void {
            throw new Error('Function not implemented.');
          }} />
          <button onClick={() => setModalIsOpen(false)} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Cerrar</button>
        </Modal>

        <Button
          type='button'
          onClick={() => {
            handleLogout();
            navigate(routes.login.url);
          }}>
          Cerrar sesión
        </Button>

</form>
      </div>
    </>
  );
};
