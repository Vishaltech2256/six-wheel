/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
        xl: '2.5rem',
        '2xl': '3rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      colors: {
        // Coastal Luxury Palette based on user's reference:
        // 1. Deep Ocean Teal #0C4E66
        ocean: {
          DEFAULT: '#0C4E66',
          50: '#F0F7FA',
          100: '#D9ECF3',
          200: '#B2D8E6',
          300: '#7BBBD3',
          400: '#4098BD',
          500: '#1F79A0',
          600: '#0C4E66',
          700: '#093E52',
          800: '#072E3D',
          900: '#05222D',
          950: '#03141C',
        },
        // 2. Coastal Cerulean #407F9E
        cerulean: {
          DEFAULT: '#407F9E',
          light: '#5C9CB9',
          dark: '#2E637D',
          subtle: 'rgba(64, 127, 158, 0.15)',
        },
        // 3. Pale Shell Sand / Rose Ivory #E2CACA
        shell: {
          DEFAULT: '#E2CACA',
          light: '#F5ECEC',
          dark: '#CCAFAF',
          subtle: 'rgba(226, 202, 202, 0.15)',
        },
        // 4. Warm Terracotta Sand #D7A896
        sand: {
          DEFAULT: '#D7A896',
          50: '#FAF4F2',
          100: '#F5EBE6',
          200: '#EBD5CC',
          300: '#E0BCAD',
          400: '#D7A896',
          500: '#C78F7B',
          600: '#AF725D',
          700: '#8E5845',
          800: '#6E4232',
          900: '#4E2E22',
        },
        // 5. Golden Amber / Caramel Ochre #B57C51 (Primary Luxury Accent)
        amber: {
          DEFAULT: '#B57C51',
          hover: '#9F683F',
          light: '#CD976E',
          pale: '#F6EAE1',
          dark: '#7A4D2B',
          subtle: 'rgba(181, 124, 81, 0.15)',
        },
        // Backward-compatible semantic aliases mapped to the new palette:
        gold: {
          DEFAULT: '#B57C51', // Golden Amber
          hover: '#9F683F',
          light: '#CD976E',
          pale: '#F6EAE1',
          dark: '#7A4D2B',
          subtle: 'rgba(181, 124, 81, 0.15)',
        },
        navy: {
          DEFAULT: '#05222D', // Deep Ocean base
          50: '#F0F7FA',
          100: '#D9ECF3',
          200: '#B2D8E6',
          300: '#7BBBD3',
          400: '#4098BD',
          500: '#1F79A0',
          600: '#0C4E66',
          700: '#093E52',
          800: '#072E3D',
          900: '#05222D',
          950: '#03141C',
        },
        charcoal: {
          DEFAULT: '#072E3D',
          50: '#F2F6F8',
          100: '#E1EBEF',
          200: '#C2D5DE',
          300: '#9DBBC9',
          400: '#719CB0',
          500: '#497A91',
          600: '#32596C',
          700: '#21404F',
          800: '#122B37',
          900: '#072E3D',
          950: '#041B24',
        },
        ivory: {
          DEFAULT: '#FAF7F4',
          50: '#FFFFFF',
          100: '#FAF7F4',
          200: '#F5ECEC',
          300: '#E2CACA', // Shell Sand
          400: '#D7A896',
        },
        stone: {
          DEFAULT: '#9BB2BF', // Oceanic soft stone
          light: '#BFD0DA',
          dark: '#678191',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.25em',
        luxury: '0.2em',
      },
      borderRadius: {
        subtle: '2px',
        refined: '4px',
      },
      boxShadow: {
        'luxury-sm': '0 2px 8px -2px rgba(3, 20, 28, 0.08)',
        'luxury-md': '0 8px 24px -4px rgba(3, 20, 28, 0.25), 0 2px 6px -2px rgba(3, 20, 28, 0.15)',
        'luxury-lg': '0 20px 48px -8px rgba(3, 20, 28, 0.4), 0 4px 12px -2px rgba(3, 20, 28, 0.2)',
        'luxury-gold': '0 8px 24px -4px rgba(181, 124, 81, 0.25)',
        'luxury-ocean': '0 8px 24px -4px rgba(12, 78, 102, 0.35)',
      },
      keyframes: {
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'spin-slow': 'spin-slow 24s linear infinite',
        'fade-in': 'fade-in 0.6s cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
