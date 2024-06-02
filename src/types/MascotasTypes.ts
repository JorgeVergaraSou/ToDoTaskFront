import { User } from '../interfaces/user.interface'

// Define an interface for the context
export interface UserContextType {
  user: User | null
  handleLogin: (loggedInUser: User) => void
  handleLogout: () => void
}

export interface LoginResponseType {
  token: string
  email: string
}

export interface ProfileResponseType {
  idUser: number
  name: string
  email: string
  role: string
  isActive: number
  softDeleteDate: string
  createdAt: string
  updateAt: string
}
