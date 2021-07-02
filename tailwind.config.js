module.exports = {
    purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {    
            colors: {
                blue: {
                    blue1: '#323D9F',
                    blue2: '#101227'
                },
            },

            width: {
                w300: '300px',
                w400: '400px',
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
  }
  