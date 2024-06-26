export const basePathName = '/'

export const routes = {
  root: { url: basePathName },
  home: {
    url: '/inicio'
  },
  contact: {
    url: '/contacto'
  },
  login: {
    url: '/login'
  },
  nuevamascota: {
    url: '/nuevamascota'
  },
  nuevaraza: {
    url: '/nuevaraza'
  },
  nuevopost: {
    url: '/nuevopost'
  },
  pets: {
    url: '/mascotas'
  },
  registration: {
    url: '/registro'
  },
  about: {
    url: '/nosotros'
  },
  profile: {
    url: '/perfil'
  }
}

export const Especies = ['Gato', 'Perro', 'Ave', 'Reptil']

export const TypePost = [
  'Busco mascota perdida',
  'Ofrezco mascota en adopcion',
  'Quiero adoptar mascota',
  'Encontré mascota perdida'
]
