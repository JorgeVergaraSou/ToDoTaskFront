import React, { createContext, useState, useEffect, ReactNode } from 'react'
import { User, UserContextType } from '../types/MascotasTypes'

const UserContext = createContext<UserContextType | undefined>(undefined)