import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserProvider';
import { PostProps } from '../interfaces/post.interface';

export const NuevaTarea: React.FC<PostProps> = ({ onCloseModal }) => {
  const { token } = useContext(UserContext)!;
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
  
  
    try {
      const responseNewPet = await fetch(
        `http://localhost:3008/task/task/newTask`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
          },
          body: JSON.stringify({
            title,
            description
            
          })
        }
      );
  
      const responseText = await responseNewPet.text();
      const responseAPI = JSON.parse(responseText);
  
      if (!responseNewPet.ok) {
        if (typeof responseAPI.message === 'string') {
          setMessage(responseAPI.message.split(','));
        } else if (Array.isArray(responseAPI.message)) {
          setMessage(responseAPI.message);
        } else {
          setMessage(Object.values(responseAPI.message));
        }
        return;
      } else {
        alert(responseAPI.message);
        onCloseModal();
      }
    } catch (error) {
      console.error("Error handling API response:", error);
      // Manejar errores de red u otros errores que puedan ocurrir
    }
  };
  

  return (
    <>
     <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg space-y-4">
     <div className='mb-3'>
            <label
              htmlFor='breed-title'
              className='block text-gray-700 text-md font-bold mb-2'>
              Título
            </label>
            <input
              type='text'
              placeholder='Título de la tarea'
              name='title'
              className='form-control shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
  <div>
    <textarea
      placeholder="Tarea"
      name="content"
      className="form-control mb-2 w-full border border-gray-300 rounded-lg p-2"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
    />
  </div>


  <div>
    <button
      type="submit"
      className="btn btn-primary bg-orange-600 text-white font-bold py-2 px-4 rounded-lg"
    >
      Nueva Tarea
    </button>
  </div>
</form>

{message.length > 0 && (
  <div className="alert alert-success mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
    <ul className="mb-0">
      {message.map((msg) => (
        <li key={msg}>{msg}</li>
      ))}
    </ul>
  </div>
)}

{errors.length > 0 && (
  <div className="alert alert-danger mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
    <ul className="mb-0">
      {errors.map((error) => (
        <li key={error}>{error}</li>
      ))}
    </ul>
  </div>
)}

    </>
  );
};