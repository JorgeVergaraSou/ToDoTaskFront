import React, { useState } from 'react';

const CrearMascota: React.FC<{ postId: number | null }> = ({ postId }) => {
    const [name, setName] = useState<string>("");
    const [breed, setBreed] = useState<string>("");
    const [age, setAge] = useState<string>("");
    const [imageFile, setImageFile] = useState<File | null>(null); // Cambiar el estado para almacenar el archivo en lugar del nombre

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (postId === null) {
            console.error("No se puede crear la mascota sin un postId");
            return;
        }

        if (!imageFile) {
            console.error("La imagen es requerida");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('breed', breed);
        formData.append('age', age);
        formData.append('image', imageFile); // Agregar el archivo de imagen en lugar del nombre
        formData.append('postId', postId.toString());

        const response = await fetch(`http://localhost:3006/api/v1/pets/createPet`, {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            console.log("Mascota creada exitosamente");
        } else {
            console.error("Error al crear la mascota");
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Nombre:</label>
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </div>
            <div>
                <label>Raza:</label>
                <input
                    type="text"
                    value={breed}
                    onChange={(event) => setBreed(event.target.value)}
                />
            </div>
            <div>
                <label>Edad:</label>
                <input
                    type="text"
                    value={age}
                    onChange={(event) => setAge(event.target.value)}
                />
            </div>
            <div>
                <label>Imagen:</label>
                <input
                    type="file"
                    onChange={(event) => {
                        if (event.target.files && event.target.files.length > 0) {
                            setImageFile(event.target.files[0]);
                        }
                    }}
                />
            </div>
            <button type="submit">Crear Mascota</button>
        </form>
    );
};

export default CrearMascota;
