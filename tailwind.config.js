/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: ['Poppins', 'sans-serif'],
      caveat: ['"Caveat Brush"', 'cursive']
    },
    extend: {
      // Flex
      flexBasis: {
        '33': '33.3333%',
      },
      backgroundImage: {
        'two-dogs': "url('/public/img/Dos-perros.png')",
        'four-pets': "url('/img/Cuatro-mascotas.png')",
      },
      backgroundPosition: {
        'two-dogs-mobile': '50% 50%',
        'two-dogs-desk': '30% 45%',
      },
      backgroundSize: {
        '40%': '40%'
      },
      colors: {
        primary: {
          grade1: '#BA4D10',
          grade2: '#E96E29',
          grade3: '#FC8F51',
          grade4: '#FFA775',
          grade5: '#FFC2A0'
        },
        secondary: {
          grade1: '#14427A',
          grade2: '#255A99',
          grade3: '#3E6DA5',
          grade4: '#5F8ABE',
          grade5: '#8FB1D9'
        },
        tertiary: {
          grade1: '#BA7810',
          grade2: '#E99E29',
          grade3: '#FCBA51',
          grade4: '#FFC975',
          grade5: '#FFDAA0'
        },
        cuaternary: {
          grade1: '#0A7A5B',
          grade2: '#1B9976',
          grade3: '#35A586',
          grade4: '#57BEA2',
          grade5: '#88D9C3'
        }
      },
      animation: {
        'underline-slide': 'underlineSlide 0.5s ease-out'
      },
      keyframes: {
        underlineSlide: {
          '0%': { textDecorationLine: 'none' },
          '50%': {
            textDecorationLine: 'underline',
            textDecorationStart: 'center'
          },
          '100%': {
            textDecorationLine: 'underline',
            textDecorationStart: '0%',
            textDecorationEnd: '100%'
          }
        }
      }
    }
  },
  plugins: []
}
