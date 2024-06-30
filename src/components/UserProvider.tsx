import React, { ReactNode, createContext, useEffect, useState } from 'react';
import { User } from '../interfaces/user.interface';
import { UserContextType } from '../types/MascotasTypes';

const UserContext = createContext<UserContextType | undefined>(undefined);

const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const handleLogin = (loggedInUser: User, userToken: string) => {
    setUser(loggedInUser);
    setToken(userToken);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
    localStorage.setItem('token', userToken);    
  };

  const handleLogout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('user');
    localStorage.removeItem('token');
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    console.log('Stored user:', storedUser);
    console.log('Stored token:', storedToken);
    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, token, handleLogin, handleLogout }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
