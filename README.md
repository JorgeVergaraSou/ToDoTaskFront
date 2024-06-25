# Lost and Found Pets

Bienvenido al repositorio de "Lost and Found Pets", un proyecto diseñado para ayudar a encontrar mascotas perdidas y a sus dueños. Este proyecto utiliza React para la interfaz de usuario y Vite para el entorno de desarrollo, todo ello con soporte para TypeScript para mejorar la calidad del código.

## Características

- **Interfaz de Usuario**: Una sencilla pero efectiva interfaz de usuario diseñada para facilitar la búsqueda y el reporte de mascotas perdidas.
- **Soporte para TypeScript**: Mejora la seguridad del tipo en el código y facilita la detección temprana de errores.
- **Rápida Recarga con Vite**: Un entorno de desarrollo rápido que mejora la productividad al recargar automáticamente los cambios realizados en el código.

## Requisitos

Antes de comenzar, asegúrate de tener Node.js (versión 12 o superior) instalado en tu sistema.

## Instalación

Para instalar las dependencias necesarias y ejecutar el proyecto localmente, sigue estos pasos:

1. Clona este repositorio:
   https://github.com/GVictoria90/petslostfront

2. Instala las dependencias: npm install
   
3. Inicia el servidor de desarrollo: npm run start

   Esto iniciará el servidor de desarrollo utilizando Vite, y podrás acceder al proyecto en `http://localhost:5173`.

## Dependencias

Este proyecto utiliza las siguientes dependencias principales:

- **React**: Biblioteca para construir interfaces de usuario.
- **Vite**: Herramienta de desarrollo rápida para compilar y servir aplicaciones web modernas.
- **TypeScript**: Superset de JavaScript que añade tipado estático a tu código.
- **Tailwind CSS**: Libreria para dar estilo a la interfaz de usuario.

  ## Configuración de Tailwind CSS

Para configurar Tailwind CSS en tu proyecto, sigue estos pasos:

1. Instala Tailwind CSS y sus dependencias:
   npm install -D tailwindcss postcss autoprefixer npx tailwindcss init -p

2. Añade las rutas de tus archivos de plantilla en tu archivo `tailwind.config.js`:

3. Agrega las directivas de Tailwind a tu archivo CSS principal (por ejemplo, `./src/index.css`):
   css @tailwind base; @tailwind components; @tailwind utilities;
   - Ahora puedes empezar a usar clases de Tailwind CSS en tu proyecto.

## Contribución

Las contribuciones son bienvenidas Por favor, lee el archivo `CONTRIBUTING.md` para obtener más información sobre cómo puedes participar en el desarrollo de este proyecto.

## Licencia

Este proyecto está licenciado bajo la MIT License - mira el archivo `LICENSE` para detalles.
