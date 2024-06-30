//import { useEffect, useState } from 'react'
import imgUrl from '@images/Mascotas.png'
import { HomeCard } from '../components/HomeCard'

export const Inicio: React.FC = () => {
  return (
    <>
      <div>
        <section id='info-section' className='my-4 md:flex md:justify-center'>
          <div className='md:w-1/3 flex justify-center items-center mb-4 md:mb-0'>
            <img
              className='img-fluid mx-auto w-52 h-52'
              src={imgUrl}
              alt='logo'
            />
          </div>
          <div className='md:w-2/3'>
            <HomeCard
              title={'¡Bienvenidos a Lost & Founds Pets!'}
              imageUrl={''}
              visibleText={`Estás en el lugar indicado si estás buscando a tu compañero peludo
              perdido o si querés ayudar a reunir a una mascota con su familia.`}
              hiddenText={`En Lost & Founds Pets!, estamos dedicados a conectar a las
              mascotas perdidas con sus dueños amorosos. Nuestro objetivo es
              proporcionar un espacio seguro y confiable donde puedas compartir
              información sobre mascotas perdidas y encontradas en tu comunidad.`}
            />
          </div>
        </section>
        <section id='lost-section' className='my-4 md:flex md:justify-center'>
          <div className='md:w-2/3'>
            <HomeCard
              title={'¿Perdiste a tu preciado amigo de cuatro patas?'}
              imageUrl={''}
              visibleText={`Publicá detalles sobre tu mascota perdida, incluyendo una
            descripción, fotos y la ubicación donde fue vista por última vez.`}
              hiddenText={`Nuestra comunidad está lista para ayudarte a difundir la información
            y reunirte con tu peludo amigo lo antes posible.`}
            />
          </div>
          <div className='md:w-1/3'></div>
        </section>
        <section id='found-section' className='my-4 md:flex md:justify-center'>
          <div className='md:w-1/3'></div>
          <div className='md:w-2/3'>
            <HomeCard
              title={'¿Encontraste una mascota perdida?'}
              imageUrl={''}
              visibleText={`Publicá los detalles sobre la mascota que encontraste para ayudar a
            reunirla con su hogar.`}
              hiddenText={`Juntos, podemos hacer que cada mascota
            perdida regrese a casa de manera segura.`}
            />
          </div>
        </section>
        <section id='care-section' className='my-4 md:flex md:justify-center'>
          <div className='md:w-2/3'>
            <HomeCard
              title={'Cuidado de mascotas'}
              imageUrl={''}
              visibleText={`Además de servir como plataforma de reunión para mascotas perdidas,
            también ofrecemos información valiosa sobre cuidado de mascotas.`}
              hiddenText={`Mantenete al día con nuestro calendario de vacunación y castraciones
            para garantizar la salud y el bienestar de tu mascota.`}
            />
          </div>
          <div className='md:w-1/3'></div>
        </section>
        <div>
          <h2 className='font-caveat text-3xl font-semibold mb-2 text-center'>
            {`¡Súmate y ayudemos a que eso suceda!`}
          </h2>
        </div>
      </div>
    </>
  )
}
