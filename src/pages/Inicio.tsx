//import { useEffect, useState } from 'react'
import imgUrl from '../assets/logoRounded.png';

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
            <h1 className='text-2xl font-bold mb-4 text-center'>
              ¡Bienvenidos a Lost & Founds Pets!
            </h1>
            <p>
              Estás en el lugar indicado si estás buscando a tu compañero peludo
              perdido o si querés ayudar a reunir a una mascota con su familia.
              En Lost & Founds Pets!, estamos dedicados a conectar a
              las mascotas perdidas con sus dueños amorosos. Nuestro objetivo es
              proporcionar un espacio seguro y confiable donde puedas compartir
              información sobre mascotas perdidas y encontradas en tu comunidad.
            </p>
          </div>
        </section>
        <section id='lost-section' className='my-4'>
          <h2 className='text-lg font-bold mb-1'>
            ¿Perdiste a tu preciado amigo de cuatro patas?
          </h2>
          <p>
            Publicá detalles sobre
            tu mascota perdida, incluyendo una descripción, fotos y la ubicación
            donde fue vista por última vez. Nuestra comunidad está lista para
            ayudarte a difundir la información y reunirte con tu peludo amigo lo
            antes posible.
          </p>
        </section>
        <section id='found-section' className='my-4'>
          <h2 className='text-lg font-bold mb-1'>
            ¿Encontraste una mascota perdida?
          </h2>
          <p>
            Publicá los detalles sobre la mascota que encontraste para ayudar a
            reunirla con su hogar. Juntos, podemos hacer que cada mascota
            perdida regrese a casa de manera segura.
          </p>
        </section>
        <section id='care-section' className='my-4'>
          <h2 className='text-lg font-bold mb-1'>Cuidado de mascotas</h2>
          <p>
            Además de servir como plataforma de reunión para mascotas perdidas,
            también ofrecemos información valiosa sobre cuidado de mascotas.
            Mantenete al día con nuestro calendario de vacunación y castraciones
            para garantizar la salud y el bienestar de tu mascota.
          </p>
        </section>
        <p>
          En Lost & Founds Pets!, creemos que
          cada mascota perdida tiene un camino de regreso a casa. ¡Súmate y
          ayudemos a que eso suceda!
        </p>
      </div>

    </>
  );
};
