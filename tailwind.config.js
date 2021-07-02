module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {    
        colors: {
          blue: {
            blue1: '#3D6CB9',
            blue2: '#2F89FC'
          },
          red: {
            red1: '#FF4747'
          },
          gray: {
            gray: '#363C42',
            gray1: '#1E1E1E',
            gray2: '#272B2F',
            gray3: '#3D434B',
            gray4: '#838383',
            gray5: '#DADADA',
            gray6: '#575E66',
            gray7: '#B5B5B5',
            gray8: '#EAEAEA',
            graydark: '#444C53',
            graylight: '#95999B',
            graybg: '#272B2F',
          },
          green:{
            green1: '#00BA5C',
            green2: '#68E3B7',
          },
          orange:{
              orange2: '#FF9132',
          },
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }
  