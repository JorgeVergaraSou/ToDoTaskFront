import React, { useState } from 'react';
import CrearMascota from './CrearMascota_old1'; // Asumiendo que CrearMascota está en el mismo directorio
import Modal from 'react-modal';

// Inicializar react-modal con el elemento raíz de la aplicación (si no se ha hecho ya en otro lugar)
Modal.setAppElement('#root');

export const NuevoPost: React.FC = () => {

    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [postType, setPostType] = useState<number>(0); // Estado para el valor del select
    const [modalIsOpen, setModalIsOpen] = useState<boolean>(false); // Estado para controlar el modal
    const [postId, setPostId] = useState<number | null>(null); // Estado para guardar el ID del post creado

    const validateForm = () => {
        const newErrors: string[] = [];

        if (title.trim() === "") {
            newErrors.push("El título no puede estar vacío");
        }

        if (content.trim() === "") {
            newErrors.push("El contenido no puede estar vacío");
        }

        if (postType === 0) {
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

        const responseNewPost = await fetch(
            `http://localhost:3006/api/v1/posts/newPost`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    title,
                    content,
                    postType, // Incluir el valor del select en el cuerpo de la solicitud
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

        setPostId(responseAPI.id); // Asumiendo que el ID del post creado está en responseAPI.id
        setModalIsOpen(true); // Abrir el modal al crear el post
    };

    return (
        <>
            <h1>Crea tu publicación</h1>
            <div className="centradito">
                <form onSubmit={handleSubmit}>
                    <span>Tipo de publicación</span>
                    <select
                        className="form-select"
                        value={postType} // Establecer el valor del select al estado
                        onChange={(event) => setPostType(Number(event.target.value))} // Actualizar el estado cuando se cambie el select
                    >
                        <option value={0}>SELECCIONE OPCIÓN</option>
                        <option value={1}>MASCOTA PERDIDA</option>
                        <option value={2}>OFREZCO MASCOTA EN ADOPCIÓN</option>
                        <option value={3}>QUIERO ADOPTAR</option>
                    </select>
                    <span>Título</span>
                    <input
                        type="text"
                        placeholder=""
                        name="title"
                        className="form-control mb-2"
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
                    />
                    <textarea
                        placeholder="Contenido"
                        name="content"
                        className="form-control mb-2"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                    />
                    <button type="submit" className="btn btn-primary">
                        Nueva Publicación
                    </button>
                </form>
            </div>

            {errors.length > 0 && (
                <div className="alert alert-danger mt-2">
                    <ul className="mb-0">
                        {errors.map((error) => (
                            <li key={error}>{error}</li>
                        ))}
                    </ul>
                </div>
            )}

            {message.length > 0 && (
                <div className="alert alert-danger mt-2">
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
            >
                <CrearMascota postId={postId} />
                <button onClick={() => setModalIsOpen(false)}>Cerrar</button>
            </Modal>
        </>
    );
};
