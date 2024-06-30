import React, { useEffect, useState } from 'react';
import { Breed } from '../interfaces/breeds.interface';

interface SelectBreedsProps {
  selectedBreed: string;
  setSelectedBreed: (breed: string) => void;
}

export const SelectBreeds: React.FC<SelectBreedsProps> = ({ selectedBreed, setSelectedBreed }) => {
  const [breeds, setBreeds] = useState<Breed[]>([]);

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const responseBreed = await fetch('http://localhost:3006/api/v1/breeds', {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!responseBreed.ok) {
          throw new Error('Error al obtener los datos');
        }
        const dataBreeds = await responseBreed.json();
        setBreeds(dataBreeds);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBreeds();
  }, []);

  const handleChangeBreed = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedBreed(event.target.value);
  };

  return (
    <select value={selectedBreed} onChange={handleChangeBreed}>
      <option value="" disabled>Seleccione una raza</option>
      {breeds.map((breed) => (
        <option key={breed.idBreed} value={breed.nameBreed}>
          {breed.nameBreed}
        </option>
      ))}
    </select>
  );
};

export default SelectBreeds;
