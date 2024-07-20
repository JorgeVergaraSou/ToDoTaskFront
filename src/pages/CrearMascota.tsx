import React, { useState, useContext } from 'react';
import { UserContext } from '../components/UserProvider';
import TypePetSelect from '../components/PetSelected';
import { PetEnum } from '../utils/pets.enum';
import { SelectBreeds } from '../components/Breeds';

interface CrearMascotaProps {
  idPost: number | null;
  setIdPost: (id: number | null) => void;
  onCloseModal: () => void;
}

export const CrearMascota: React.FC<CrearMascotaProps> = ({ idPost, onCloseModal }) => {
  const { token } = useContext(UserContext)!;
  const [errors, setErrors] = useState<string[]>([]);
  const [message, setMessage] = useState<string[]>([]);
  const [namePets, setNamePets] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [selectedPet, setSelectedPet] = useState<PetEnum>(PetEnum.SELECCION);
  const handleTypePetChange = (typePet: PetEnum) => {
    setSelectedPet(typePet);
  };

  const [selectedBreed, setSelectedBreed] = useState<string>('');
/*
  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    setErrors([]);

    const formData = new FormData();
    formData.append('namePet', namePets);
    formData.append('pet', selectedPet);
    formData.append('age', age);
    formData.append('description', description);
    formData.append('breed', selectedBreed);

    if (image) {
      formData.append('image', image);
    }
    if (idPost !== null) {
      formData.append('idPost', idPost.toString());
    }

    const responseNewPet = await fetch(
      `http://localhost:3006/api/v1/pets/newPet`,
      {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: formData,
      }
    );

    const responseAPI = await responseNewPet.json();

    if (!responseNewPet.ok) {

      if (typeof responseAPI.message === 'string') {
        setMessage(responseAPI.message.split(','));
      } else if (Array.isArray(responseAPI.message)) {
        setMessage(responseAPI.message);
      } else {
        setMessage(Object.values(responseAPI.message));
      }
      return;
    }
    else {
      alert(responseAPI.message)
      onCloseModal();
    }
  };*/
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrors([]);
  
    const formData = new FormData();
    formData.append('namePet', namePets);
    formData.append('pet', selectedPet);
    formData.append('age', age);
    formData.append('description', description);
    formData.append('breed', selectedBreed);
  
    if (image) {
      formData.append('image', image);
    }
    if (idPost !== null) {
      formData.append('idPost', idPost.toString());
    }
  
    try {
      const responseNewPet = await fetch(
        `http://localhost:3006/api/v1/pets/newPet`,
        {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${token}`
          },
          body: formData,
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
  <div>
    <input
      type="text"
      placeholder="Nombre mascota"
      name="namePets"
      className="form-control mb-2 w-full border border-gray-300 rounded-lg p-2"
      value={namePets}
      onChange={(event) => setNamePets(event.target.value)}
    />
  </div>

  <div>
    <label htmlFor="typePost" className="block text-sm font-medium text-orange-600">Tipo de Mascota</label>
    <div className="mt-1 w-full border border-gray-300 rounded-lg p-2">
      <TypePetSelect selectedPet={selectedPet} onChange={handleTypePetChange} />
    </div>
  </div>

  <div>
    <div className="mt-1 w-full border border-gray-300 rounded-lg p-2">
      <SelectBreeds selectedBreed={selectedBreed} setSelectedBreed={setSelectedBreed} />
    </div>
  </div>

  <div>
    <input
      type="number"
      placeholder="Edad"
      name="age"
      className="form-control mb-2 w-full border border-gray-300 rounded-lg p-2"
      value={age}
      onChange={(event) => setAge(event.target.value)}
    />
  </div>

  <div>
    <textarea
      placeholder="Contenido"
      name="content"
      className="form-control mb-2 w-full border border-gray-300 rounded-lg p-2"
      value={description}
      onChange={(event) => setDescription(event.target.value)}
    />
  </div>

  <div className="mb-3">
    <label htmlFor="formFile" className="block text-sm font-medium text-orange-600">Foto</label>
    <input className="form-control w-full border border-gray-300 rounded-lg p-2" type="file" onChange={(event) => setImage(event.target.files?.[0] || null)} />
  </div>

  <div>
    <button
      type="submit"
      className="btn btn-primary bg-orange-600 text-white font-bold py-2 px-4 rounded-lg"
    >
      Crear Mascota
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