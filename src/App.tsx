import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Body } from './components/Body'
import { Footer, Header } from './components/components'

// Inicializar react-modal con el elemento raíz de la aplicación
// Modal.setAppElement('#root')
const App: React.FC = () => (
  <div className='flex flex-col min-h-screen'>
    <BrowserRouter>
      <Header />
      <Body />
      <Footer />
    </BrowserRouter>
  </div>
)

export default App
