import { createContext } from 'react'
import { UserContextType } from '../types/MascotasTypes'

export const UserContext = createContext<UserContextType | undefined>(undefined)
