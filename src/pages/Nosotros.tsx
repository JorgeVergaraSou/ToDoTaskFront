import React from 'react'
import { Title } from '../components/Title'

export const Nosotros: React.FC = () => {
  return (
    <>
      <div className='flex justify-between text-center mb-6'>
        <Title as='h2'>Sobre Nosotros</Title>
      </div>
      <div className='my-4'>
        <p className='font-sans'>
          En Lost and Found Pets nos dedicamos a ayudar a reunir a las mascotas
          con sus dueños y a encontrar nuevos hogares para los animales
          perdidos. Con la experiencia en el cuidado y bienestar animal, nos
          especializamos en brindar atención integral a pequeños y grandes
          animales.
        </p>
        <p className='font-sans'>
          Además, contamos con laboratorios clínicos e instrumentos de
          diagnóstico de última generación para detectar, tratar y prevenir
          enfermedades y lesiones en todas las etapas de la vida de las
          mascotas.
        </p>
      </div>
    </>
  )
}
