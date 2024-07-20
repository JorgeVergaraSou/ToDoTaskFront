import React, { useState, useContext } from 'react';
import Modal from 'react-modal';
import { CrearMascota } from './CrearMascota';
import { typePostEnum } from '../utils/title.enum';
import { UserContext } from '../components/UserProvider'; // Importa el contexto de usuario
import TypePostSelect from '../components/TypePostSelect';

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
    const [selectedTypePost, setSelectedTypePost] = useState<typePostEnum>(typePostEnum.SELECCION);

    const handleTypePostChange = (typePost: typePostEnum) => {
        setSelectedTypePost(typePost);
    };

    const validateForm = () => {
        const newErrors: string[] = [];

        if (title.trim() === "") {
            newErrors.push("El título no puede estar vacío");
        }

        if (content.trim() === "") {
            newErrors.push("El contenido no puede estar vacío");
        }

        if (selectedTypePost === typePostEnum.SELECCION) {
            newErrors.push("Debe seleccionar un tipo de publicación");
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
                        selectedTypePost,
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
            setSelectedTypePost(typePostEnum.SELECCION);
            setErrors([]);
            setMessage([]);
        } catch (error) {
            console.error('Error al enviar la solicitud:', error);
        }
    };

    const handleModalClose = () => {
        setModalIsOpen(false);
    };

    return (
        <>
            <h1 className="text-3xl font-bold text-blue-600 mb-4">Crea tu publicación</h1>
            <div className="centradito bg-white p-6 rounded-lg shadow-lg">
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label htmlFor="typePost" className="block text-sm font-medium text-orange-600">Tipo de Publicación</label>
                        <div className="mt-1 w-full border border-gray-300 rounded-lg p-2">
                            <TypePostSelect selectedTypePost={selectedTypePost} onChange={handleTypePostChange} />
                        </div>
                    </div>
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

            {errors.length > 0 && (
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
            )}

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                contentLabel="Crear Mascota"
                className="fixed inset-0 flex items-center justify-center p-4"
                overlayClassName="fixed inset-0 bg-gray-500 bg-opacity-75"
            >
                <CrearMascota idPost={idPost} setIdPost={setIdPost} onCloseModal={handleModalClose} />
                <button onClick={() => setModalIsOpen(false)} className="mt-4 bg-blue-600 text-white font-bold py-2 px-4 rounded-lg">Cerrar</button>
            </Modal>




        </>
    );
};
