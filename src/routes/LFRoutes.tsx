import { Layout } from '../components/components'
import { basePathName, routes } from '../constants'
import { Perfil } from '../pages/Perfil'
import {
  Contacto,
  CrearMascota,
  CrearRaza,
  Inicio,
  Login,
  Mascotas,
  Publicacion,
  Nosotros,
  NuevoPost,
  Registro,
  LeerMensajes
} from '../pages/pages'

export interface RoutesType {
  element: React.ReactElement
  path: string
  key: string
}

const LFRoutes: RoutesType[] = [
  {
    element: (
      <Layout>
        <Inicio />
      </Layout>
    ),
    path: basePathName,
    key: routes.home.url
  },
  {
    element: (
      <Layout>
        <Inicio />
      </Layout>
    ),
    path: routes.home.url,
    key: routes.home.url
  },
  {
    element: (
      <Layout>
        <Contacto />
      </Layout>
    ),
    path: routes.contact.url,
    key: routes.contact.url
  },
  {
    element: (
      <Layout>
        <Mascotas />
      </Layout>
    ),
    path: routes.pets.url,
    key: routes.pets.url
  },
  {
    element: (
      <Layout>
        <CrearMascota />
      </Layout>
    ),
    path: routes.nuevamascota.url,
    key: routes.nuevamascota.url
  },
  {
    element: (
      <Layout>
        <CrearRaza />
      </Layout>
    ),
    path: routes.nuevaraza.url,
    key: routes.nuevaraza.url
  },
  {
    element: (
      <Layout>
        <NuevoPost />
      </Layout>
    ),
    path: routes.nuevopost.url,
    key: routes.nuevopost.url
  },
  {
    element: (
      <Layout>
        <Publicacion />
      </Layout>
    ),
    path: routes.verPublicacion.url(':idPost'),
    key: routes.verPublicacion.url(':idPost')
  },
  {
    element: (
      <Layout>
        <Nosotros />
      </Layout>
    ),
    path: routes.about.url,
    key: routes.about.url
  },
  {
    element: (
      <Layout>
        <Registro />
      </Layout>
    ),
    path: routes.registration.url,
    key: routes.registration.url
  },
  {
    element: (
      <Layout>
        <Login />
      </Layout>
    ),
    path: routes.login.url,
    key: routes.login.url
  },
  {
    element: (
      <Layout>
        <Perfil />
      </Layout>
    ),
    path: routes.profile.url,
    key: routes.profile.url
  },
  {
    element: (
      <Layout>
        <LeerMensajes />
      </Layout>
    ),
    path: routes.leermensaje.url,
    key: routes.leermensaje.url
  }
]

export default LFRoutes
