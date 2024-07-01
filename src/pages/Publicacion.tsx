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
      <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center">{post.title}</h1>
        <div className="space-y-4">
          <div className="flex flex-col space-y-2">
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-md font-bold">Nombre:</label>
              <span className="text-xl font-medium">{post.pets[0].namePet}</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-md font-bold">Edad:</label>
              <span className="text-xl font-medium">{post.pets[0].age}</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-md font-bold">Soy un:</label>
              <span className="text-xl font-medium">{post.pets[0].pet}</span>
            </div>
            <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-md font-bold">Descripción:</label>
              <span className="text-xl font-medium">{post.pets[0].description}</span>
            </div>
          </div>
          {post.pets && post.pets.length > 0 && post.pets[0].image ? (
            <div className="text-center">
              <img
                src={`http://localhost:3006/uploads/${post.pets[0].image}`}
                width={550}
                height={550}
                alt="Imagen de la mascota"
                className="rounded-lg mx-auto"
              />
            </div>
          ) : (
            post.pets && post.pets.length > 0 && !post.pets[0].image && (
              <p className="text-gray-500 text-center">Sin foto disponible</p>
            )
          )}
          <div className="flex justify-between items-center">
              <label className="block text-gray-700 text-md font-bold">Publicado</label>
              <span className="text-xl font-medium">{new Date(post.pets[0].createdAt).toLocaleDateString()}</span>
            </div>
        </div>
      </div>
    </>
  );
  
  
};
