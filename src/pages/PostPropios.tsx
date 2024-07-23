import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post, PostProps } from '../interfaces/post.interface';
import { UserContext } from '../components/UserProvider';
import { useNavigate } from 'react-router-dom';
import { routes } from '../constants';
import { Title } from '../components/Title';
import { DeletePost } from '../components/DeletePost';


export const PostPropios: React.FC = () => {
    const navigate = useNavigate();
    const context = useContext(UserContext);
    const [posts, setPosts] = useState<Post[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { user, token, handleLogout } = context!;

    const [selectedPostId, setSelectedPostId] = useState<string | null>(null);

    const handleDeletePost = (idPost: string) => {
        setSelectedPostId(idPost);
    }
    useEffect(() => {
        console.log('Context:', context);
        if (!context?.user) {
            navigate(routes.login.url);
        }
    }, [context, navigate]);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const responsePost = await fetch(`http://localhost:3006/api/v1/posts/postByUser`, {
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error}</p>;
    }

    if (!posts) {
        return <p>No se encontró la publicación.</p>;
    }

    return (
        <>
                <div className='flex justify-center text-center mb-6'>
        <Title as='h2' className="text-blue-600">Tus Publicaciones</Title>
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

                                    <button
                                        className='text-center border-tertiary-grade2 border-2 text-tertiary-grade2 hover:bg-tertiary-grade2 hover:text-secondary-grade3 font-semibold rounded-3xl p-2 transition-all duration-500 ease-in-out'
                                        type='button'
                                        onClick={() => {
                                           
                                            handleDeletePost(post.idPost);
                                        }}>
                                        Borrar Publicación
                                    </button>
                                    {selectedPostId && <DeletePost idPost={selectedPostId} />}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </>
    );


};
