import React, { ReactNode, createContext, useEffect, useState } from 'react'
import { User } from '../interfaces/user.interface'
import { UserContextType } from '../types/MascotasTypes'

// Create the context with the defined interface
const UserContext = createContext<UserContextType | undefined>(undefined)

// UserProvider component that wraps children components to provide user context
const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)

  // Function to handle login
  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser)
    console.log(loggedInUser)    
    localStorage.setItem('user', JSON.stringify(loggedInUser))
  }

  // Function to handle logout
  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('user')
  }

  // Check for a stored user on page load
  useEffect(() => {
    const storedUser = localStorage.getItem('user')
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  // Provide the user context to child components
  return (
    <UserContext.Provider value={{ user, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  )
}

export { UserContext, UserProvider }

