import React, { useState, useContext } from 'react';
import Modal from 'react-modal';

import { UserContext } from '../components/UserProvider'; // Importa el contexto de usuario
import TypePostSelect from '../components/TypePostSelect';
import { Title } from '../components/Title';

// Inicializar react-modal con el elemento raíz de la aplicación (si no se ha hecho ya en otro lugar)
Modal.setAppElement('#root');

export const NuevoPost: React.FC = () => {
    const { token } = useContext(UserContext)!; // Obtén el token del contexto de usuario
    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // Estado para controlar el modal
    const [idPost, setIdPost] = useState<number | null>(null); // Estado para guardar el ID del post creado


    const validateForm = () => {
        const newErrors: string[] = [];

        if (title.trim() === "") {
            newErrors.push("El título no puede estar vacío");
        }

        if (content.trim() === "") {
            newErrors.push("El contenido no puede estar vacío");
        }



        setErrors(newErrors);
        return newErrors.length === 0;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setErrors([]);

        if (!validateForm()) {
            return;
        }

        try {
            const responseNewPost = await fetch(
                `http://localhost:3006/api/v1/posts/newPost`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}` // Incluir el token en los headers de la solicitud
                    },
                    body: JSON.stringify({
                        title,
                        content,
                        
                    }),
                }
            );

            const responseAPI = await responseNewPost.json();

            if (!responseNewPost.ok) {
                console.log(responseAPI.message);
                if (typeof responseAPI.message === 'string') {
                    setMessage(responseAPI.message.split(","));
                } else if (Array.isArray(responseAPI.message)) {
                    setMessage(responseAPI.message);
                } else {
                    setMessage(Object.values(responseAPI.message));
                }
                return;
            }

            setIdPost(responseAPI.idPost); // Asumiendo que el ID del post creado está en responseAPI.idPost
            setModalIsOpen(true); // Abrir el modal al crear el post

            // RESETEAR FORM AL ENVIAR
            setTitle("");
            setContent("");
            
            setErrors([]);
            setMessage([]);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
    };
/*

*/

    return (
        <>
        <div className="container mx-auto px-4">
        <div className='flex justify-center text-center mb-6'>
        <Title as='h2' className="text-blue-600">Crea tu publicación</Title>
      </div>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-4'>
            <div className='mb-4'>            {errors.length > 0 && (
                <div className="alert alert-danger mt-2 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                    <ul className="mb-0">
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {message.length > 0 && (
                <div className="alert alert-success mt-2 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                    <ul className="mb-0">
                        {message.map((msg) => (
                            <li key={msg}>{msg}</li>
                        ))}
                    </ul>
                </div>
            )}</div>
           
            <div className='mb-4'>
                <form onSubmit={handleSubmit} className="space-y-4">

                    <div>
                        <label htmlFor="Título" className="block text-sm font-medium text-orange-600">Título</label>
                        <input
                            type="text"
                            placeholder=""
                            name="title"
                            className="form-control mb-2 w-full border border-gray-300 rounded-lg p-2"
                            value={title}
                            onChange={(event) => setTitle(event.target.value)}
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder="Contenido"
                            name="content"
                            className="form-control mb-2 w-full border border-gray-300 rounded-lg p-2"
                            value={content}
                            onChange={(event) => setContent(event.target.value)}
                        />
                    </div>
                    <div>
                        <button type="submit" className="btn btn-primary bg-orange-600 text-white font-bold py-2 px-4 rounded-lg">
                            Nueva Publicación
                        </button>
                    </div>
                </form>
            </div>
            <div className='mb-4'></div>
</div>






            </div>

        </>
    );
};
