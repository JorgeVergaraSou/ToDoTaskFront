import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../interfaces/post.interface';

export const Publicacion: React.FC = () => {
  const { idPost } = useParams<{ idPost: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const responsePost = await fetch(`http://localhost:3006/api/v1/posts/${idPost}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        if (!responsePost.ok) {
          throw new Error('Error al obtener los datos');
        }
        const dataPost = await responsePost.json();
        setPost(dataPost);
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

    fetchPost();
  }, [idPost]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!post) {
    return <p>No se encontró la publicación.</p>;
  }

  return (
    <>
      <div>
        <h1 className='text-2xl font-bold mb-4'>{post.title}</h1>
        <div className='centradito'>
          {post.pets && post.pets.length > 0 && post.pets[0].image ? (
            <img
              src={`http://localhost:3006/uploads/${post.pets[0].image}`}
              
              width={150}
              height={150}
              alt='Imagen de la mascota'
            />
          ) : (
            post.pets && post.pets.length > 0 && !post.pets[0].image && (
              <p>Sin foto disponible</p>
            )
          )}
          <div className='card-body'>
            <h5 className='card-title'>{post.title}</h5>
            <p className='card-text'>{post.content}</p>
          </div>
        </div>
      </div>
    </>
  );
};
