import React from 'react';
import { PetEnum } from '../utils/pets.enum'

interface PetSelectProps {
  selectedPet: PetEnum;
  onChange: (typePet: PetEnum) => void;
}

const TypePetSelect: React.FC<PetSelectProps> = ({ selectedPet, onChange }) => {
  return (
    <select
      value={selectedPet}
      onChange={(event) => onChange(event.target.value as PetEnum)}
    >
      {Object.values(PetEnum).map((typePet) => (
        <option key={typePet} value={typePet}>
          {typePet}
        </option>
      ))}
    </select>
  );
};

export default TypePetSelect;
