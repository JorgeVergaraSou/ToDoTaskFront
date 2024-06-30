import React from 'react';
import { typePostEnum } from '../utils/title.enum'

interface TypePostSelectProps {
  selectedTypePost: typePostEnum;
  onChange: (typePost: typePostEnum) => void;
}

const TypePostSelect: React.FC<TypePostSelectProps> = ({ selectedTypePost, onChange }) => {
  return (
    <select
      value={selectedTypePost}
      onChange={(event) => onChange(event.target.value as typePostEnum)}
    >
      {Object.values(typePostEnum).map((typePost) => (
        <option key={typePost} value={typePost}>
          {typePost}
        </option>
      ))}
    </select>
  );
};

export default TypePostSelect;
