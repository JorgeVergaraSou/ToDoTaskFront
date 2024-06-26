import React, { useEffect, useState } from 'react'
import { Post } from '../interfaces/post.interface'
//import { Card } from '../components/components'

export const Publicaciones: React.FC = () => {
  const [posts, setPosts] = useState<Post[] | null>(null)
  //const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responsePost = await fetch(`http://localhost:3006/api/v1/posts`, {
          // const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/posts`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          }
        })
        if (!responsePost.ok) {
          throw new Error('Error al obtener los datos')
        }
        const dataPost = await responsePost.json()
        setPosts(dataPost)
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message)
        } else {
          setError('An unknown error occurred')
        }
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  if (loading) {
    return <p>Loading...</p>
  }

  if (error) {
    return <p>Error: {error}</p>
  }

  return (
    <>
      <h1 className='text-2xl font-bold mb-4'>Mascotas</h1>
      <div className='centradito'>
        {posts &&
          posts.map((post) => (
            <div className='card' key={post.idPost} style={{ width: '18rem' }}>
              <img
                src={`/img/${post.pets[0].image}`}
                width={150}
                height={150}
                alt='Imagen de la mascota'
              />
              <div className='card-body'>
                <h5 className='card-title'>{post.title}</h5>
                <p className='card-text'>{post.content}</p>
                <a href='#' className='btn btn-primary'>
                  Ver publicación
                </a>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}
