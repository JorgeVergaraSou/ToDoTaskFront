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
  },
  verPublicacion: {
    url: (id?: string) => (id ? `/verpublicacion/${id}` : '/verpublicacion/:idPost')
  },
  leermensaje: {
    url: '/leermensaje'
  },
  postpropios: {
    url: '/postpropios'
  }
}