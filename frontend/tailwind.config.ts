import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
          'custom-radial-gradient': 'radial-gradient(121.73% 121.49% at 100% -3.39%, #1F4247 0%, #0D1D23 56.18%, #09141A 100%)',
          'custom-button-auth': 'linear-gradient(108.32deg, rgba(98, 205, 203, 0.5) 24.88%, rgba(69, 153, 219, 0.5) 78.49%)',
          'custom-variant-auth': 'linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)',
      },
      width: {
        '327px': '327px',
      },
      height: {
        '51px': '51px',
      },
      borderRadius: {
        'custom': '9px 9px 9px 9px',
      },
      colors:{
        'variant-text': 'linear-gradient(74.08deg, #94783E -6.8%, #F3EDA6 16.76%, #F8FAE5 30.5%, #FFE2BE 49.6%, #D5BE88 78.56%, #F8FAE5 89.01%, #D5BE88 100.43%)',
      }
    },
  },
  plugins: [],
}
export default config
