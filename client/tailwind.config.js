/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        limeAccent: '#CEFF65',
        pitchBlack:'#080808',
      },
      fontSize:{
        'course-details-heading-small':['26px','36px'],
        'course-details-heading-large':['36px','44px'],
        'home-heading-small':['28px','34px'],
        'home-heading-large':['48px','56px'],
        'default':['15px','21px']

      },
      gridTemplateColumns:{
        'auto':'repeat(auto-fit,minmax(200px,1fr))'
      },
      spacing:{
        'section-height':'500px'
      },
      maxWidth:{
        'course-card':'424px',
      },
      boxShadow: {
        'custom-card': `
          -7px 7px 15px 0px #ceff65,   /* Bottom-left diagonal */
          7px 7px 15px 0px #ceff65,    /* Bottom-right diagonal */
          0px 10px 15px 0px #ceff65    /* Bottom */
        `,
      },
      
    },
  },
  plugins: [],
}
