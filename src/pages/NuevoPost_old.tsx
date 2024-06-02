import React, { useState } from 'react';

export const NuevoPost: React.FC = () => {

    const [errors, setErrors] = useState<string[]>([]);
    const [message, setMessage] = useState<string[]>([]);
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [typePost, setTypePost] = useState<number>(0); 

    const validateForm = () => {
        const newErrors: string[] = [];

        if (title.trim() === "") {
            newErrors.push("El título no puede estar vacío");
        }

        if (content.trim() === "") {
            newErrors.push("El contenido no puede estar vacío");
        }

        if (typePost === 0) {
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
                    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvcmdlQHRlc3QuY29tIiwicm9sZSI6InVzZXIiLCJpZFVzZXIiOjIsImlhdCI6MTcxNjY3OTUwOCwiZXhwIjoxNzE2NjgzMTA4fQ.tYOHK1sT31MG0vDAgiC2sR_gUsQIesZSqgCF_0xnBSQ`,  
                },
                body: JSON.stringify({
                    title,
                    content,
                    typePost, 
                }),
            }
        );

        const responseAPI = await responseNewPost.json();
console.log(responseAPI);

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
        } else{
            alert(responseAPI.idPost)
            if (typeof responseAPI.message === 'string') {
                setMessage(responseAPI.message.split(","));
            } else if (Array.isArray(responseAPI.message)) {
                setMessage(responseAPI.message);
            } else {
                setMessage(Object.values(responseAPI.message));
            }
        }
    };

    return (
        <>
            <h1>Crea tu publicación</h1>
            <div className="centradito">
                <form onSubmit={handleSubmit}>
                    <span>Tipo de publicación</span>
                    <select
                        className="form-select"
                        value={typePost} 
                        onChange={(event) => setTypePost(Number(event.target.value))} 
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
                    <span>Contenido</span>
                    <textarea
                        placeholder=""
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
        </>
    );
};
