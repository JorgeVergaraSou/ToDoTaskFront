import { useContext } from 'react';
import { Contact } from '../interfaces/contact.interface';
import { UserContext } from './UserProvider';

const API_URL = 'http://localhost:3006'; // Cambia esto por la URL de tu backend

export const fetchContacts = async (token: string | null): Promise<Contact[]> => {
  if (!token) {
    throw new Error('Token no válido');
  }

  const response = await fetch(`${API_URL}/api/v1/contact`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
  });

  if (!response.ok) {
    throw new Error('Error al obtener los contactos');
  }

  const data = await response.json();
  return data as Contact[];
};
